var SERVERLIST_TAG = 1
var NOTICE_TAG = 2


enum StateType {
	GOOD = 1,
	BUSY = 2,
	FULL = 3,
	UNABLE = 4,
}

var ServerConfig = [];

class LoginSystem extends BaseSystem implements core.IHttpCallback {

	serverListCallback: ()=>void;
	selectedServerIndex: number;
	targetserverid: number;
	_authType: string;

	tempUserName: string;
	tempPassWord: string;
	lastSelectedServerIndex: number;
	retryBridgeAuthTimes: number;

	bQuickLogin: boolean;
	bAutoLogin: boolean;


	mRoleList: LoginRole[];
	loginRoleInfo: LoginRole;
	saveLastLoginRoleID: number;


	noticeContent: any;
	noticeCallback: Function;

	mServerRoleList:any[];

	public initObj(...params: any[]): void {
		this.targetserverid = -1;
		this.serverListCallback = null;
		this.selectedServerIndex = -1;

		this.bQuickLogin = false;
		this.bAutoLogin = false;

		this.retryBridgeAuthTimes = 0;
		this.saveLastLoginRoleID = 0;

		this.mRoleList = [];

		this.noticeContent = null;

		this.mServerRoleList = []
	}

	destory() {

	}

	setAutoLogin(b) {
		this.bAutoLogin = b;
	}

	isAutoLogin() {
		return this.bAutoLogin;
	}

	setQuickLogin(b: boolean): void {
		this.bQuickLogin = b
	}

	isQuickLogin(): boolean {
		return this.bQuickLogin;
	}

	//获取公告
	requestNotice(callback: () => void) {
		//callback();

		//锁定屏幕
		FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.newObj(true, Localize_cns("LOGIN_GET_NOTICE_INFO"), true))
		this.noticeCallback = callback

		//更新公告 modify:yangguiming
		let qd_key = SdkHelper.getInstance().getStringConfigDef("QD_Key")

		let urlMap: any = {
			// ["openxlive"] : "http://center.wp.nwzr.net/nwzr/common/get_update_notice.php",
			// ["tongios"]		:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["haimaios"]	:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["xyzsios"]		:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["aisiios"]		:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["downjoyios"]:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["itoolios"]	:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["kyios"]			:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["bdios"]			:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",
			// ["baijinios"]	:	"http://center.ios.nwzr.net/nwzr/common/get_update_notice.php",		
			// ["baijin"]	  :	"http://center.tw.nwzr.net/nwzr/common/get_update_notice.php",		
			// ["flyfish"]   : "http://center.tw.nwzr.net/nwzr/common/get_update_notice.php",
		}

		let noticeUrl = urlMap[qd_key] || ""
		if (noticeUrl == "") {
			noticeUrl = SdkHelper.getInstance().getStringConfigDef("PublicNoticeUpdateUrl")
		}

		//let serverinfo = LoginSystem.getInstance().getRecentLoginServerInfo()
		let zoneId = 0 //serverinfo.ServerID
		let allUrl = noticeUrl + "?platform=" + qd_key + "&zoneid=" + zoneId
		TLog.Debug(allUrl)
		//let noticeUrl = SdkHelper.getInstance().getStringConfigDef("noticeUrl")
		if (noticeUrl == "") {
			FireEvent(EventDefine.MSG_WAIT_END, null)
			if (this.noticeCallback) {
				this.noticeCallback()
			}
		} else {
			IGlobal.httpClient.send(allUrl, this, NOTICE_TAG)
		}
	}

	getServerRoleList(){
		return this.mServerRoleList
	}

	requestServerList(callback: () => void) {
		FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(true, Localize_cns("LOGIN_GET_SERVERLIST_INFO"), true))
		var serverListUrl = SdkHelper.getInstance().getStringConfigDef("ServerUrl");

		
		let authorInfo = GameAccount.getInstance().getAuthorInfo()

		//h5的code随便设
		let localCode = "1"
		
		serverListUrl = serverListUrl + "&code="+ localCode + "&openid="+authorInfo.userId
		TLog.Debug("saveLocalServerInfo", serverListUrl)
		
		IGlobal.httpClient.send(serverListUrl, this, SERVERLIST_TAG)
		this.serverListCallback = callback;
	}


	parseJson(jsonInfo): any[] {
		var serverList = [];

		if (jsonInfo == null) {
			TLog.Error("LoginSystem.parseJson null");
			return serverList;
		}

		//StateType = {
		//  GOOD = 1,
		//  BUSY = 2,
		//  FULL = 3,
		//  UNABLE = 4,
		//}			
		//1,				2[服务器名]	3					4				5							6[用来排序]	7[1表示推荐]　8[1表示新服]	9 StateType
		//serverId, serverName, ip, 					port, 	connectName, 	orders, 	recommend, 		new, 				crowd 
		//["2",			"主干",			"10.0.0.254",	"7739",	"trunk",				"1",		"0",					"1",				"2"],

		for (var i in jsonInfo) {
			var jsonServerInfo = jsonInfo[i];

			var serverInfo: any = {};
			serverInfo.id = parseInt(jsonServerInfo[0]);
			serverInfo.title = jsonServerInfo[1];
			serverInfo.ip = jsonServerInfo[2];
			serverInfo.port = parseInt(jsonServerInfo[3]);
			serverInfo.connectName = jsonServerInfo[4];
			serverInfo.orders = parseInt(jsonServerInfo[5]);
			serverInfo.recommend = parseInt(jsonServerInfo[6]);
			serverInfo.isnew = parseInt(jsonServerInfo[7]);
			serverInfo.state = parseInt(jsonServerInfo[8]);
			serverInfo.version = jsonServerInfo[9] || "";
			serverInfo.otitle = jsonServerInfo[10] || "";

			serverList.push(serverInfo);
			//table.insert(serverList, serverInfo);
		}

		return serverList;
	}

	setTargetServerId(id: number): void {
		this.targetserverid = id;
	}

	parseDomainListFromJson(jsonInfo){
		// //TLog.Debug("parseDomainListFromJson")
		// for(let _ in jsonInfo){
		// 		let v = jsonInfo[_]
		
		// 	//ServerDomainList[ip]=domain
		// 	ServerDomainList[v[2]] = v[1]
		// }
		// //TLog.Debug_r(ServerDomainList)
	}

	parseServerListFromJson(jsonInfo: string): void {
		var serverList = this.parseJson(jsonInfo);

		ServerConfig.length = 0;

		var index = 0;
		this.selectedServerIndex = -1;
		this.lastSelectedServerIndex = -1;

		var lastServerName = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "lastServerName", "");
		let targetserverindex = -1;
		serverList.forEach(serverInfo => {
			var newInfo: any = {};
			newInfo.ServerID = serverInfo.id;
			newInfo.ServerName = serverInfo.title;
			newInfo.NickName = serverInfo.connectName;
			newInfo.IP = serverInfo.ip;
			newInfo.PORT = serverInfo.port;
			newInfo.State = serverInfo.state;
			newInfo.IsRecommend = serverInfo.recommend != 0;
			newInfo.IsNew = (serverInfo.isnew != 0);
			newInfo.Version = serverInfo.version;
			newInfo.oServerName = serverInfo.otitle;   //原来的名字

			if (this.lastSelectedServerIndex == -1 && lastServerName != "") {
				if (lastServerName == newInfo.ServerName) {
					this.lastSelectedServerIndex = index;
				} else if (newInfo.oServerName && lastServerName == newInfo.oServerName) {
					this.lastSelectedServerIndex = index;
				}
			}
			if (this.targetserverid == newInfo.ServerID) {
				targetserverindex = index;
			}
			index = index + 1;
			ServerConfig.push(newInfo);
		});

		//默认选一次登录的服
		//如果第一次登陆，则选第一个服
		if (this.lastSelectedServerIndex == -1) {//如果没有找到，则找第一个推荐的
			index = 0

			for (var i = 0; i < ServerConfig.length; i++) {
				var serverInfo = ServerConfig[i];
				if (serverInfo.IsRecommend) {//推荐的
					this.lastSelectedServerIndex = index
					this.selectedServerIndex = index
					break
				}
				index = index + 1
			}

		}

		if (this.lastSelectedServerIndex == -1) {//再找不到就第二个好了
			this.selectedServerIndex = 0;
			this.lastSelectedServerIndex = this.selectedServerIndex;
		}

		if (targetserverindex == -1) {
			this.setSelectedServerIndex(this.lastSelectedServerIndex);
		} else {
			this.selectedServerIndex = targetserverindex;
			this.setSelectedServerIndex(targetserverindex);
		}
	}


	getInputUser(): any {
		var info: any = {};
		info.username = this.tempUserName;
		info.password = this.tempPassWord;
		return info;
	}


	checkBridgeServerInfo(serverInfo: any): boolean {
		if (GAME_DEBUG) {
			return true
		}

		if (serverInfo == null) {
			MsgSystem.addTagTips(Localize_cns("LOGIN_ERROR7"));
			return false;
		}

		if (serverInfo.State == StateType.UNABLE) {
			MsgSystem.addTagTips(Localize_cns("LOGIN_ERROR7"));
			return false;
		}

		var bCheckUpdate = LaunchHelper.getInstance().isCheckUpdate();
		if (!bCheckUpdate)
			return true;

		var bCheckServerList = LaunchHelper.getInstance().isCheckServerList();
		if (bCheckServerList) {
			// var serverVer = serverInfo.Version
			// var resVer = GetCacheResVer()
			// var ret, bNeedUpdate = CompareVersion(resVer, serverVer)
			// if  bNeedUpdate then
			// 	MsgSystem:ConfirmDialog_YES(Localize_cns("LOGIN_SERVER_VER_ERROR"))
			// 	return false
			// end
		}

		return true;

	}

	changeLoginPrecedure() {
		var preMgr: PrecedureManager = PrecedureManager.getInstance();
		if (preMgr.getCurrentPrecedureId() == PRECEDURE_LOGIN) {
			FireEvent(EventDefine.LOGIN_REQUEST_RESTART, null);
		} else {
			PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOGIN);
		}
	}

	startBridgeAuth(): void {
		var serverinfo = this.getRecentLoginServerInfo();
		if (!this.checkBridgeServerInfo(serverinfo)) {
			if (this.bQuickLogin) {
				this.setQuickLogin(false);
				this.changeLoginPrecedure();
			}
		}

		this.retryBridgeAuthTimes = this.retryBridgeAuthTimes + 1;
		FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(true, Localize_cns("LOGIN_CONNECTING"), true));

		var bridgeHttpAuthWorker = BridgeHttpAuthWorker.createObj(serverinfo, this, this.retBridgeHttpAuth);
		bridgeHttpAuthWorker.send();
	}


	retBridgeHttpAuth(url: string, args: any) {
		var retCode = parseInt(args.code);

		if (retCode == -1) {
			//MsgSystem:ConfirmDialog_YES(Localize_cns("NET_ERROR1") .. args.errorCode)
			this.retryBridgeAuthTimes = 0;
			FireEvent(EventDefine.MSG_WAIT_END, null)
			this.onQuickLoginError(Localize_cns("NET_ERROR1") + args.code)
			return
		}

		if (retCode == 0) {
			this.retryBridgeAuthTimes = 0;
			var authorInfo = GameAccount.getInstance().getAuthorInfo();
			var bridgeInfo: any = {}
			bridgeInfo.identityId = args["identityId"]
			bridgeInfo.identityName = args["identityName"]
			bridgeInfo.tstamp = args["tstamp"]
			bridgeInfo.sign = args["sign"]
			bridgeInfo.remarks = args["remarks"]
			bridgeInfo.qdKey = authorInfo.qdKey
			bridgeInfo.code1 = authorInfo.code1
			bridgeInfo.code2 = authorInfo.code2
			bridgeInfo.deviceid = authorInfo.deviceid

			GameAccount.getInstance().setBrigeInfo(bridgeInfo);

			this.startLoginConnection();
		} else {

			var msg = args.msg || "";
			TLog.Error("LoginSystem.retBridgeHttpAuth %s", String.format(Localize_cns("LOGIN_ERROR2"), retCode, msg));

			if (this.retryBridgeAuthTimes >= 2) {
				msg = String.format("msg:%s url:%s", msg, url);
				//MsgSystem:ConfirmDialog_YES( string.format( Localize_cns("LOGIN_ERROR2"), retCode, msg ))
				FireEvent(EventDefine.MSG_WAIT_END, null)
				this.onQuickLoginError(String.format(Localize_cns("LOGIN_ERROR2"), retCode, msg));
			} else {
				//重新验证
				this.setAutoLogin(true)
				this.startAccountAuth()
			}
		}

	}

	startOfficiailRegister(args: any) {
		var officiailHttpRegisterWorker = OfficiailHttpRegisterWorker.createObj(args, this, this.retOfficiailRegister);
		officiailHttpRegisterWorker.send();
	}

	retOfficiailRegister(args: any) {
		if (args.code == 0) {
			MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR5"))
			this.startOfficiailHttpAccountAuth(args.accInfo.ACC, args.accInfo.PWD)
		} else {
			MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR1"))
		}
	}

	startLoginConnection() {
		if (g_CrossServerInfo && g_CrossServerInfo.state == CS_BEGIN) {
			GameAccount.getInstance().setLoginIpAndPort(g_CrossServerInfo.ip, g_CrossServerInfo.port)
			GameAccount.getInstance().setLoginHostName(g_CrossServerInfo.nickName)
		} else {
			let serverInfo = this.getRecentLoginServerInfo()
			GameAccount.getInstance().setLoginIpAndPort(serverInfo.IP, serverInfo.PORT)
			GameAccount.getInstance().setLoginHostName(serverInfo.NickName)
		}


		var loginConnectionWorker = LoginConnectionWorker.createObj();
		loginConnectionWorker.send();
	}


	startAccountAuth(): void {
		TLog.Debug("LoginSystem.startAccountAuth")
		let mode = IGlobal.sdkHelper.getSdkMode();
		if (mode == SdkMode.Officiail) {
			var username = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "username", "");
			var password = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "password", "");
			if (username == "") {
				FireEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, null);
				return
			}
			this._authType = "Officiail";
			this.startOfficiailHttpAccountAuth(username, password);
		} else {
			this._authType = "auto"
			this.startThirdPartySDKAuth();
		}
	}

	// 第三方SDK验证
	startThirdPartySDKAuth() {
		TLog.Debug("LoginSystem.startThirdPartySDKAuth", this._authType)
		let thirdPartySdkAuthWorker: ThirdPartySdkAuthWorker = ThirdPartySdkAuthWorker.newObj("type=" + this._authType)
		thirdPartySdkAuthWorker.setRetCallBack(this, this.retThirdPartySDKAuth)
		thirdPartySdkAuthWorker.sendAuthRequest()

		//锁定屏幕
		if (this._authType != "logout") {
			let showWaitting = IGlobal.sdkHelper.getStringConfigDef("LoginShowWait", "1")
			if (showWaitting == "1") {
				FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.newObj(true, Localize_cns("LOGIN_GET_ACCOUNT_INFO"), true))
			}
		}
	}

	retThirdPartySDKAuth(code, infoParamsString) {
		SDKAnalyzer(SdkEventDefine.ACCOUNT_AUTH_FINISH, this._authType)
		TLog.Debug("LoginSystem.retThirdPartySDKAuth", code, infoParamsString)

		//解锁屏幕
		FireEvent(EventDefine.MSG_WAIT_END, null)


		if (code != 0) {
			GameAccount.getInstance().setAuthorInfo(null)

			//如果没有提示信息，则不弹窗
			if (infoParamsString != "") {
				MsgSystem.addTagTips(String.format(Localize_cns("SDK_LOGIN_ERROR"), code, infoParamsString))
			}
			//这里要加代码 提示，登陆失败，再次调用sdk登陆
			FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, null)
			return
		}
		// let showSelect = Core.IGameSdk.inst.GetStringConfigDef("ShowLoginSelect", "0")
		// if (showSelect == "1") {
		// 	//let qd_key = Core.IGameSdk.inst.GetStringConfigDef("QD_Key", "")
		// 	//if(qd_key == "TCYYB" ){//应用宝　保存用哪中方式登陆　别的sdk不需要我们做
		// 	Core.IConfig.instance.SetString("login", "to", this._authType, "sdkLogin.ini")
		// 	Core.IConfig.instance.AutoSave()
		// }

		//如果是接入SDK的话，登陆是在一开始就已经完成，所以只要检查有没有openid之类就可以了
		// let openid = GameMain.getInstance().getFromCmdLine("openid");
		// let noice = GameMain.getInstance().getFromCmdLine("noice");
		// let sign = GameMain.getInstance().getFromCmdLine("sign");
		// if (openid != null && noice != null && sign != null) {
		// 	let openkey = GameMain.getInstance().getFromCmdLine("openkey");
		// 	let appid = GameMain.getInstance().getFromCmdLine("appid");
		// 	//这三样都有，就已经是经过 sdk登陆了
		// 	var gameKey = IGlobal.sdkHelper.getStringConfigDef("GameKey");
		// 	var gameName = IGlobal.sdkHelper.getStringConfigDef("GameName");
		// 	var qdKey = IGlobal.sdkHelper.getStringConfigDef("QD_Key");
		// 	var code1 = IGlobal.sdkHelper.getStringConfigDef("QD_Code1");
		// 	var code2 = IGlobal.sdkHelper.getStringConfigDef("QD_Code2")
		// 	var authorInfo: any = {};
		// 	authorInfo.userId = openid; //账号ID，目前和userName废弃
		// 	authorInfo.userName = openid;
		// 	authorInfo.sign = sign;
		// 	authorInfo.tstamp = noice;
		// 	authorInfo.loginKey = openkey;
		// 	authorInfo.code1 = qdKey;
		// 	authorInfo.code2 = code2;
		// 	authorInfo.qdKey = qdKey;
		// 	authorInfo.deviceid = "pc";
		// 	authorInfo.gameKey = gameKey;
		// 	authorInfo.gameName = gameName
		// 	GameAccount.getInstance().setAuthorInfo(authorInfo)
		// 	FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, null);
		// }

		let authorInfo = core.GameSdkUtil.splitHttpParams(infoParamsString)
		if (authorInfo.userId == null) {
			authorInfo.userId = authorInfo.openid
		}
		if (authorInfo.qdKey == null) {
			authorInfo.qdKey = ""
		}
		if (authorInfo.qdName == null) {
			authorInfo.qdName = ""
		}
		if (authorInfo.code1 == null) {
			authorInfo.code1 = ""
		}
		if (authorInfo.code2 == null) {
			authorInfo.code2 = ""
		}
		if (authorInfo.deviceid == null) {
			authorInfo.deviceid = "pc"
		}
		if (authorInfo.gameKey == null) {
			authorInfo.gameKey = ""
		}
		if (authorInfo.gameName == null) {
			authorInfo.gameName = ""
		}

		GameAccount.getInstance().setAuthorInfo(authorInfo)

		SDKAnalyzer(SdkEventDefine.SDK_LOGIN_SCRIPT_FINISH, this._authType)
		FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, null)
	}



	startOfficiailHttpAccountAuth(userName: string, passWord: string): void {
		FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(true, Localize_cns("LOGIN_GET_ACCOUNT_INFO"), true));

		var appId = IGlobal.sdkHelper.getStringConfigDef("AppId");
		var clientId = IGlobal.sdkHelper.getStringConfigDef("ClientId");

		var userLocalData = {
			UserName: userName,
			PassWord: passWord,
			AppId: appId,
			ClientId: clientId,
		}

		var officiailHttpAccountAuthWorker: OfficiailHttpAccountAuthWorker = OfficiailHttpAccountAuthWorker.createObj(userLocalData, this, this.retOfficiailHttpAccountAuth);
		officiailHttpAccountAuthWorker.send();

		this.tempUserName = userName;
		this.tempPassWord = passWord;
	}

	retOfficiailHttpAccountAuth(url: string, args: any): void {
		FireEvent(EventDefine.MSG_WAIT_END, null);

		var retCode = parseInt(args.code);
		if (0 == retCode) {

			if (this.tempUserName != args.accountId) {
				TLog.Error("retOfficiailHttpAccountAuth self.tempUserName:%s ~= args.accountId:%s", this.tempUserName, args.accountId);
				return
			}

			var gameKey = IGlobal.sdkHelper.getStringConfigDef("GameKey");
			var gameName = IGlobal.sdkHelper.getStringConfigDef("GameName");
			var qdKey = IGlobal.sdkHelper.getStringConfigDef("QD_Key");
			var code1 = IGlobal.sdkHelper.getStringConfigDef("QD_Code1");
			var code2 = IGlobal.sdkHelper.getStringConfigDef("QD_Code2");

			var authorInfo: any = {};
			authorInfo.userId = args.accountId; //账号ID，目前和userName废弃
			authorInfo.userName = args.accountName;
			authorInfo.sign = args.sign;
			authorInfo.tstamp = args.timeStamp;
			authorInfo.loginKey = args.loginKey;
			authorInfo.code1 = qdKey;
			authorInfo.code2 = code2;
			authorInfo.qdKey = qdKey;
			authorInfo.deviceid = "pc";
			authorInfo.gameKey = gameKey;
			authorInfo.gameName = gameName;

			GameAccount.getInstance().setAuthorInfo(authorInfo)

			IGlobal.setting.setCommonSetting(UserSetting.TYPE_STRING, "username", this.tempUserName);
			IGlobal.setting.setCommonSetting(UserSetting.TYPE_STRING, "password", this.tempPassWord);


			FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, null);

		} else if (6 == retCode) {
			//当时一个新账号的时候询问是否直接注册
			FireEvent(EventDefine.LOGIN_REQUEST_SHOW_REGISTER, null);
		} else {
			if (3 == retCode) {
				MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR6"))
				FireEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, null);
			} else {
				MsgSystem.addTagTips(String.format(Localize_cns("LOGIN_ERROR3"), retCode));
				FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, null);
			}
			GameAccount.getInstance().setAuthorInfo(null);
			this.tempUserName = "";
			this.tempPassWord = "";
		}
	}

	onHttpResponse(url: string, data: any, userData: any) {
		FireEvent(EventDefine.MSG_WAIT_END, null);
		if (SERVERLIST_TAG == userData) {
			var jsonInfo = JsUtil.JsonDecode(data);

			if(jsonInfo["code"] != null && jsonInfo["data"] != null){
				this.parseServerListFromJson(jsonInfo["data"]);

				if(jsonInfo['domainlist'] != null){
					this.parseDomainListFromJson(jsonInfo['domainlist'])
				}
			}else{
				this.parseServerListFromJson(jsonInfo);
			}

			this.mServerRoleList = []
			if(jsonInfo["registerlist"] ){
				this.mServerRoleList = jsonInfo["registerlist"]
			}

			if (this.serverListCallback) {
				this.serverListCallback();
			}
		} else if (NOTICE_TAG == userData) {
			var jsonInfo = JsUtil.JsonDecodeSafeFormat(data);
			this.setNoticeContent(jsonInfo);

			if (this.noticeCallback) {
				this.noticeCallback()
			}
		}
	}

	onHttpError(url: string, userData: any) {
		TLog.Error("onHttpError %s userData:%d", url, userData);
		FireEvent(EventDefine.MSG_WAIT_END, null)
		if (SERVERLIST_TAG == userData) {
			//再刷一次
			let _this = this;
			let t: IDialogCallback = {
				onDialogCallback(result: boolean, userData): void {
					if (result == true) {
						_this.requestServerList(_this.serverListCallback)
					}
				}
			}
			MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_GET_SERVERLIST_FAILED"), t, null)

		} else if (NOTICE_TAG == userData) {
			if (this.noticeCallback) {
				this.noticeCallback()
			}
		}
	}



	getRecentLoginServerInfo() {
		var idx = this.getSelectedServerIndex();
		return ServerConfig[idx];
	}

	getServerConfigInfo(idx: number) {
		return ServerConfig[idx];
	}

	setSelectedServerIndex(index) {
		var serverInfo = this.getServerConfigInfo(index)
		if (serverInfo == null) {
			return;
		}

		this.selectedServerIndex = index;

		FireEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, null);
	}

	getSelectedServerIndex(): number {
		return this.selectedServerIndex
	}

	getLastSelectedServerIndex() {
		return this.lastSelectedServerIndex;
	}


	onQuickLoginError(msg: string) {
		if (!this.bQuickLogin) {
			let callback: IDialogCallback = null;
			if (g_CrossServerInfo) {
				let t: IDialogCallback = {
					onDialogCallback(result: boolean, userData): void {
						if (result == false) {
							return
						}

						ConfirmFinishCrossServer()
					}
				}
				callback = t;
			}

			MsgSystem.confirmDialog_YES(msg, callback);
			FireEvent(EventDefine.MSG_WAIT_END, null);
			return;
		}

		var self = this;
		var t: IDialogCallback = {
			onDialogCallback(result: boolean, userData): void {
				if (result == false)
					return;
				self.setQuickLogin(true);
				self.changeLoginPrecedure();
			}
		}
		MsgSystem.confirmDialog_YES(msg, t);
	}

	getServerStateText(serverInfo: any): any {
		function getTempInfo(text, image, color): any {
			var info: any = {};
			info.text = text;
			info.image = image;
			info.color = color;
			return info;
		}

		if (serverInfo == null || serverInfo.State == StateType.UNABLE) {
			return getTempInfo(Localize_cns("WEIHU"), "dl_zhuangTai_icon03", gui.Color.gray);
		}

		// if (serverInfo.State == StateType.BUSY) {
		// 	return getTempInfo(Localize_cns("FANMANG"), "dl_zhuangTai_icon01", gui.Color.lime);
		// }

		if (serverInfo.State == StateType.FULL) {
			return getTempInfo(Localize_cns("BAOMAN"), "dl_zhuangTai_icon02", gui.Color.red);
		}

		return getTempInfo(Localize_cns("LIUCHANG"), "dl_zhuangTai_icon01", gui.Color.lime);
	}


	onRoleListUpdate(roleList: LoginRole[]) {
		this.mRoleList = roleList;
	}

	onAddRoleInfo(roleInfo: LoginRole) {
		this.mRoleList.push(roleInfo);
	}

	getRoleInfoByIndex(index: number): LoginRole {
		return this.mRoleList[index];
	}

	getRoleInfoList(): LoginRole[] {
		return this.mRoleList;
	}

	getLoginRoleInfo() {
		return this.loginRoleInfo;
	}

	startGameConnectionWithLastRole() {
		this.startGameConnection(this.loginRoleInfo);
	}

	startGameConnection(info?: LoginRole): void {
		var roleInfo: LoginRole = info || this.getRoleInfoList()[0];
		this.loginRoleInfo = roleInfo;
		IGlobal.setting.setRoleName(roleInfo.id + "");
		this.setLastLoginRoleID(roleInfo.id)

		var runtimeConnectionWorker = RuntimeConnectionWorker.createObj(roleInfo);
		runtimeConnectionWorker.send();
	}


	getLastLoginRoleID() {
		this.saveLastLoginRoleID = 0
		let key = "LastLoginRoleID"
		this.saveLastLoginRoleID = IGlobal.setting.getCommonSetting(UserSetting.TYPE_NUMBER, key, 0)
		//TLog.Debug("LoginSystem.getLastLoginRoleID",this.saveLastLoginRoleID)
		return this.saveLastLoginRoleID
	}
	setLastLoginRoleID(roleID) {
		this.saveLastLoginRoleID = roleID
		let key = "LastLoginRoleID"
		IGlobal.setting.setCommonSetting(UserSetting.TYPE_NUMBER, key, this.saveLastLoginRoleID)
		//TLog.Debug("LoginSystem.setLastLoginRoleID",roleID)
	}


	setNoticeContent(content) {
		this.noticeContent = content
	}

	getNoticeContent() {
		return this.noticeContent
	}
}