
//const PRELOAD_GROUP:string = "preload";;

declare var  g_VersionData;
declare var  g_isCrossOrgin;

class VersionUpdatePrecedure extends BasePrecedure implements core.ZipItemCallback{

	mThemeLoaded:boolean = false;
	mPreConfigLoaded:boolean = false;
	//mImageSetLoaded:boolean = false;  
	//private loadingView: LoadingUI;
	//预加载zip
	mPreloadZipList:string[] = ["config_login.zip"]
	mFinishZipCount:number = 0;
	

	private initParam(){
		
		if(egret.getDefinitionByName("g_VersionData") == null){
			g_VersionData = {}
		}
		g_VersionData.clientVer = checkNull(g_VersionData.clientVer , "1.0.0")
		g_VersionData.clientUpdateUrl = checkNull(g_VersionData.clientUpdateUrl , "")
		g_VersionData.resourceVer = checkNull(g_VersionData.resourceVer , "1.0.0")
		g_VersionData.resourceUpdateUrl = checkNull(g_VersionData.resourceUpdateUrl , "")
		g_VersionData.resReviewUpdateUrl = checkNull(g_VersionData.resReviewUpdateUrl , "")
		

		if(egret.getDefinitionByName("g_isCrossOrgin") == null){
			g_isCrossOrgin = false;
		}
	}

	public onActive(lastId):void{
		this.initParam()

		let rootUrl = g_VersionData.resourceUpdateUrl;
			
		//设置根目录
		IGlobal.resManager.setRootPath("resource/");

		//H5跨域
		if(g_isCrossOrgin){
			IGlobal.resManager.startH5CrossOrigin(rootUrl)
		}
		//加载配置文件
		//IGlobal.resManager.loadConfig("preload.res.json",  this);

		IGlobal.resManager.fetchVersion(this.onVersionCallback, this)

	}


	public onDeactive(currentId):void{
		
	}

	onVersionCallback(result:number, usrData){
		LoadingUI.show();
		LoadingUI.setProgress(0,0)

		this.mFinishZipCount = 0;
		for(let v of this.mPreloadZipList){
			IGlobal.resManager.addZipPacket(v, this)
		}
		
		//let controller = RES.getVersionController()
		//TLog.Debug("runtimeType:"+ egret.Capabilities.runtimeType + "test:"+controller.getVirtualUrl("resource/data/armature/effect/2002_attckEffect03/2002_attckEffect03_ske.json"))
	}

	onZipItemLoad(key, result:number):void{
		this.mFinishZipCount ++;

		if(this.mFinishZipCount >= this.mPreloadZipList.length){
			this.loadResConfig()
		}
	}



	loadResConfig(){
		IGlobal.guiManager.loadTheme("ui/ui_theme.thm.json", (name:string)=>{
				this.mThemeLoaded = true;
				this.onPreloadFinish();
			}, this);

		

		let thisObj = this;
		let count = 0;
		//加载配置文件
		let t:core.ResItemCallback = {
			onResItemLoad(res:core.ResItem):void{
				count++;

				if(res.getKey() == "launch.json"){
					IGlobal.config.initWithJson(res.getData());
				}else if(res.getKey() == "sdkconfig.json"){
					IGlobal.gameSdk.initSdk(res.getData());
					//IGlobal.sdkHelper.initWithJson(res.getData());
				}

				if(count >= 2){
					thisObj.mPreConfigLoaded = true;
					thisObj.onPreloadFinish();
				}
			},
			onResItemError(key:string):void{

			}
		}

		IGlobal.resManager.loadResAsyn("launch.json", t)
		IGlobal.resManager.loadResAsyn("sdkconfig.json", t)
	}


	// public onResConfigResult(result:number):void{
	// 	IGlobal.guiManager.loadTheme("ui/ui_theme.thm.json", (name:string)=>{
	// 			this.mThemeLoaded = true;
	// 			this.onPreloadFinish();
	// 		}, this);
		
	// 	//预加载版本更新和登陆阶段的图片
	// 	IGlobal.resManager.loadGroup(PRELOAD_GROUP, this);
	// 	//IGlobal.resManager.loadGroup(IMAGESET_GROUP, this);
	// }

	// public onResGroupResult(groupName:string, result:number):void{
	// 	if(groupName == PRELOAD_GROUP){
	// 		this.mPregroupLoaded = true;	
	// 	}

	// 	this.onPreloadFinish();
	// }
	
	// public onResGroupProgress(groupName:string, loaded:number, all:number):void{
	// 	// if(PRELOAD_GROUP == groupName){
	// 	// 	this.loadingView.setProgress(loaded, all);
	// 	// }
	// }

	// public onResGroupItemError(groupName:string, resName:string):void{

	// }

	initReport(){
		let bReport = (GAME_MODE == GAME_NORMAL) && !GAME_DEBUG
		if(bReport == false)
			return;

		let url = IGlobal.sdkHelper.getStringConfigDef("ReportUrl", "")
		if(url == "" || url == "ReportUrl" ){//openxlive的sdk写错了，如果找不到就返回key
			TLog.Error("game.initReport url==null")
			return
		}
		//let url = LaunchHelper.getInstance().getLogicErrorUrl()
		//if(url== "" ){
		//	TLog.Error("game.initReport url==null")
		//	return
		//}
		
		let qdKey 	= IGlobal.sdkHelper.getStringConfigDef("QD_Key", "")
		//let luaVersion = GetCacheResVer()
		let luaVersion = "1.0.0"
		
		TLog.Debug("game.initReport %s version:%s", url, luaVersion)
		
		IGlobal.errorReport.setReportEnable(bReport)
		IGlobal.errorReport.setReportUrl(url)
		IGlobal.errorReport.addUserParam("qdKey", qdKey)
		IGlobal.errorReport.addUserParam("luaVersion", luaVersion)

		// if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
		// 	IGlobal.errorReport.addUserParam("pf", "web")
		// }else{
		// 	IGlobal.errorReport.addUserParam("pf", "native")
		// }
		IGlobal.errorReport.addUserParam("pf", egret.Capabilities.runtimeType + "_" + egret.Capabilities.os)
	}

	public onPreloadFinish():void{
		if(!this.mThemeLoaded || !this.mPreConfigLoaded){
			return;
		}
		IGlobal.resManager.setSearchZipFirst( IGlobal.config.getBoolean("seachPkgFirst", true) )

		//如果非打包时候，才搜索语言
		if(IGlobal.resManager.getZipPacketCount() == 0){
			let lanuageData = IGlobal.config.getData("language")
			let lanuage = "zh-cn"
			if (lanuageData != null){
				lanuage = lanuageData.key
			}

			IGlobal.resManager.setLanguagePath(String.format("language/%s/", lanuage))

			let addPathList = lanuageData.include || [];
			for(let path of addPathList){
				IGlobal.resManager.addLanguageIncludePath(path)
			}

			let excludePathList = lanuageData.exclude || [];
			for(let path of excludePathList){
				IGlobal.resManager.addLanguageExcludePath(path)
			}
		}

		//LoadingUI.hide();
		
		//初始化配置文件
		// IGlobal.config.initWithJson(IGlobal.resManager.getRes("launch_json"));
		// IGlobal.sdkHelper.initWithJson(IGlobal.resManager.getRes("sdkconfig_json"));

		g_GameStart();
		this.initReport();
	} 


}