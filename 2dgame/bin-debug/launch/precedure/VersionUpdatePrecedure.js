//const PRELOAD_GROUP:string = "preload";;
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var VersionUpdatePrecedure = (function (_super) {
    __extends(VersionUpdatePrecedure, _super);
    function VersionUpdatePrecedure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mThemeLoaded = false;
        _this.mPreConfigLoaded = false;
        //mImageSetLoaded:boolean = false;  
        //private loadingView: LoadingUI;
        //预加载zip
        _this.mPreloadZipList = ["config_login.zip"];
        _this.mFinishZipCount = 0;
        return _this;
    }
    VersionUpdatePrecedure.prototype.initParam = function () {
        if (egret.getDefinitionByName("g_VersionData") == null) {
            g_VersionData = {};
        }
        g_VersionData.clientVer = checkNull(g_VersionData.clientVer, "1.0.0");
        g_VersionData.clientUpdateUrl = checkNull(g_VersionData.clientUpdateUrl, "");
        g_VersionData.resourceVer = checkNull(g_VersionData.resourceVer, "1.0.0");
        g_VersionData.resourceUpdateUrl = checkNull(g_VersionData.resourceUpdateUrl, "");
        g_VersionData.resReviewUpdateUrl = checkNull(g_VersionData.resReviewUpdateUrl, "");
        if (egret.getDefinitionByName("g_isCrossOrgin") == null) {
            g_isCrossOrgin = false;
        }
    };
    VersionUpdatePrecedure.prototype.onActive = function (lastId) {
        this.initParam();
        var rootUrl = g_VersionData.resourceUpdateUrl;
        //设置根目录
        IGlobal.resManager.setRootPath("resource/");
        //H5跨域
        if (g_isCrossOrgin) {
            IGlobal.resManager.startH5CrossOrigin(rootUrl);
        }
        //加载配置文件
        //IGlobal.resManager.loadConfig("preload.res.json",  this);
        IGlobal.resManager.fetchVersion(this.onVersionCallback, this);
    };
    VersionUpdatePrecedure.prototype.onDeactive = function (currentId) {
    };
    VersionUpdatePrecedure.prototype.onVersionCallback = function (result, usrData) {
        LoadingUI.show();
        LoadingUI.setProgress(0, 0);
        this.mFinishZipCount = 0;
        for (var _i = 0, _a = this.mPreloadZipList; _i < _a.length; _i++) {
            var v = _a[_i];
            IGlobal.resManager.addZipPacket(v, this);
        }
        //let controller = RES.getVersionController()
        //TLog.Debug("runtimeType:"+ egret.Capabilities.runtimeType + "test:"+controller.getVirtualUrl("resource/data/armature/effect/2002_attckEffect03/2002_attckEffect03_ske.json"))
    };
    VersionUpdatePrecedure.prototype.onZipItemLoad = function (key, result) {
        this.mFinishZipCount++;
        if (this.mFinishZipCount >= this.mPreloadZipList.length) {
            this.loadResConfig();
        }
    };
    VersionUpdatePrecedure.prototype.loadResConfig = function () {
        var _this = this;
        IGlobal.guiManager.loadTheme("ui/ui_theme.thm.json", function (name) {
            _this.mThemeLoaded = true;
            _this.onPreloadFinish();
        }, this);
        var thisObj = this;
        var count = 0;
        //加载配置文件
        var t = {
            onResItemLoad: function (res) {
                count++;
                if (res.getKey() == "launch.json") {
                    IGlobal.config.initWithJson(res.getData());
                }
                else if (res.getKey() == "sdkconfig.json") {
                    IGlobal.gameSdk.initSdk(res.getData());
                    //IGlobal.sdkHelper.initWithJson(res.getData());
                }
                if (count >= 2) {
                    thisObj.mPreConfigLoaded = true;
                    thisObj.onPreloadFinish();
                }
            },
            onResItemError: function (key) {
            }
        };
        IGlobal.resManager.loadResAsyn("launch.json", t);
        IGlobal.resManager.loadResAsyn("sdkconfig.json", t);
    };
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
    VersionUpdatePrecedure.prototype.initReport = function () {
        var bReport = (GAME_MODE == GAME_NORMAL) && !GAME_DEBUG;
        if (bReport == false)
            return;
        var url = IGlobal.sdkHelper.getStringConfigDef("ReportUrl", "");
        if (url == "" || url == "ReportUrl") {
            TLog.Error("game.initReport url==null");
            return;
        }
        //let url = LaunchHelper.getInstance().getLogicErrorUrl()
        //if(url== "" ){
        //	TLog.Error("game.initReport url==null")
        //	return
        //}
        var qdKey = IGlobal.sdkHelper.getStringConfigDef("QD_Key", "");
        //let luaVersion = GetCacheResVer()
        var luaVersion = "1.0.0";
        TLog.Debug("game.initReport %s version:%s", url, luaVersion);
        IGlobal.errorReport.setReportEnable(bReport);
        IGlobal.errorReport.setReportUrl(url);
        IGlobal.errorReport.addUserParam("qdKey", qdKey);
        IGlobal.errorReport.addUserParam("luaVersion", luaVersion);
        // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
        // 	IGlobal.errorReport.addUserParam("pf", "web")
        // }else{
        // 	IGlobal.errorReport.addUserParam("pf", "native")
        // }
        IGlobal.errorReport.addUserParam("pf", egret.Capabilities.runtimeType + "_" + egret.Capabilities.os);
    };
    VersionUpdatePrecedure.prototype.onPreloadFinish = function () {
        if (!this.mThemeLoaded || !this.mPreConfigLoaded) {
            return;
        }
        IGlobal.resManager.setSearchZipFirst(IGlobal.config.getBoolean("seachPkgFirst", true));
        //如果非打包时候，才搜索语言
        if (IGlobal.resManager.getZipPacketCount() == 0) {
            var lanuageData = IGlobal.config.getData("language");
            var lanuage = "zh-cn";
            if (lanuageData != null) {
                lanuage = lanuageData.key;
            }
            IGlobal.resManager.setLanguagePath(String.format("language/%s/", lanuage));
            var addPathList = lanuageData.include || [];
            for (var _i = 0, addPathList_1 = addPathList; _i < addPathList_1.length; _i++) {
                var path = addPathList_1[_i];
                IGlobal.resManager.addLanguageIncludePath(path);
            }
            var excludePathList = lanuageData.exclude || [];
            for (var _a = 0, excludePathList_1 = excludePathList; _a < excludePathList_1.length; _a++) {
                var path = excludePathList_1[_a];
                IGlobal.resManager.addLanguageExcludePath(path);
            }
        }
        //LoadingUI.hide();
        //初始化配置文件
        // IGlobal.config.initWithJson(IGlobal.resManager.getRes("launch_json"));
        // IGlobal.sdkHelper.initWithJson(IGlobal.resManager.getRes("sdkconfig_json"));
        g_GameStart();
        this.initReport();
    };
    return VersionUpdatePrecedure;
}(BasePrecedure));
__reflect(VersionUpdatePrecedure.prototype, "VersionUpdatePrecedure", ["core.ZipItemCallback"]);
//# sourceMappingURL=VersionUpdatePrecedure.js.map