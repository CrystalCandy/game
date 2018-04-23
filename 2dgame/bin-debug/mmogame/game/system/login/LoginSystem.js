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
var SERVERLIST_TAG = 1;
var NOTICE_TAG = 2;
var StateType;
(function (StateType) {
    StateType[StateType["GOOD"] = 1] = "GOOD";
    StateType[StateType["BUSY"] = 2] = "BUSY";
    StateType[StateType["FULL"] = 3] = "FULL";
    StateType[StateType["UNABLE"] = 4] = "UNABLE";
})(StateType || (StateType = {}));
var ServerConfig = [];
var LoginSystem = (function (_super) {
    __extends(LoginSystem, _super);
    function LoginSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginSystem.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.targetserverid = -1;
        this.serverListCallback = null;
        this.selectedServerIndex = -1;
        this.bQuickLogin = false;
        this.bAutoLogin = false;
        this.retryBridgeAuthTimes = 0;
        this.saveLastLoginRoleID = 0;
        this.mRoleList = [];
        this.noticeContent = null;
        this.mServerRoleList = [];
    };
    LoginSystem.prototype.destory = function () {
    };
    LoginSystem.prototype.setAutoLogin = function (b) {
        this.bAutoLogin = b;
    };
    LoginSystem.prototype.isAutoLogin = function () {
        return this.bAutoLogin;
    };
    LoginSystem.prototype.setQuickLogin = function (b) {
        this.bQuickLogin = b;
    };
    LoginSystem.prototype.isQuickLogin = function () {
        return this.bQuickLogin;
    };
    //获取公告
    LoginSystem.prototype.requestNotice = function (callback) {
        //callback();
        //锁定屏幕
        FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.newObj(true, Localize_cns("LOGIN_GET_NOTICE_INFO"), true));
        this.noticeCallback = callback;
        //更新公告 modify:yangguiming
        var qd_key = SdkHelper.getInstance().getStringConfigDef("QD_Key");
        var urlMap = {};
        var noticeUrl = urlMap[qd_key] || "";
        if (noticeUrl == "") {
            noticeUrl = SdkHelper.getInstance().getStringConfigDef("PublicNoticeUpdateUrl");
        }
        //let serverinfo = LoginSystem.getInstance().getRecentLoginServerInfo()
        var zoneId = 0; //serverinfo.ServerID
        var allUrl = noticeUrl + "?platform=" + qd_key + "&zoneid=" + zoneId;
        TLog.Debug(allUrl);
        //let noticeUrl = SdkHelper.getInstance().getStringConfigDef("noticeUrl")
        if (noticeUrl == "") {
            FireEvent(EventDefine.MSG_WAIT_END, null);
            if (this.noticeCallback) {
                this.noticeCallback();
            }
        }
        else {
            IGlobal.httpClient.send(allUrl, this, NOTICE_TAG);
        }
    };
    LoginSystem.prototype.getServerRoleList = function () {
        return this.mServerRoleList;
    };
    LoginSystem.prototype.requestServerList = function (callback) {
        FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(true, Localize_cns("LOGIN_GET_SERVERLIST_INFO"), true));
        var serverListUrl = SdkHelper.getInstance().getStringConfigDef("ServerUrl");
        var authorInfo = GameAccount.getInstance().getAuthorInfo();
        //h5的code随便设
        var localCode = "1";
        serverListUrl = serverListUrl + "&code=" + localCode + "&openid=" + authorInfo.userId;
        TLog.Debug("saveLocalServerInfo", serverListUrl);
        IGlobal.httpClient.send(serverListUrl, this, SERVERLIST_TAG);
        this.serverListCallback = callback;
    };
    LoginSystem.prototype.parseJson = function (jsonInfo) {
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
            var serverInfo = {};
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
    };
    LoginSystem.prototype.setTargetServerId = function (id) {
        this.targetserverid = id;
    };
    LoginSystem.prototype.parseDomainListFromJson = function (jsonInfo) {
        // //TLog.Debug("parseDomainListFromJson")
        // for(let _ in jsonInfo){
        // 		let v = jsonInfo[_]
        // 	//ServerDomainList[ip]=domain
        // 	ServerDomainList[v[2]] = v[1]
        // }
        // //TLog.Debug_r(ServerDomainList)
    };
    LoginSystem.prototype.parseServerListFromJson = function (jsonInfo) {
        var _this = this;
        var serverList = this.parseJson(jsonInfo);
        ServerConfig.length = 0;
        var index = 0;
        this.selectedServerIndex = -1;
        this.lastSelectedServerIndex = -1;
        var lastServerName = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "lastServerName", "");
        var targetserverindex = -1;
        serverList.forEach(function (serverInfo) {
            var newInfo = {};
            newInfo.ServerID = serverInfo.id;
            newInfo.ServerName = serverInfo.title;
            newInfo.NickName = serverInfo.connectName;
            newInfo.IP = serverInfo.ip;
            newInfo.PORT = serverInfo.port;
            newInfo.State = serverInfo.state;
            newInfo.IsRecommend = serverInfo.recommend != 0;
            newInfo.IsNew = (serverInfo.isnew != 0);
            newInfo.Version = serverInfo.version;
            newInfo.oServerName = serverInfo.otitle; //原来的名字
            if (_this.lastSelectedServerIndex == -1 && lastServerName != "") {
                if (lastServerName == newInfo.ServerName) {
                    _this.lastSelectedServerIndex = index;
                }
                else if (newInfo.oServerName && lastServerName == newInfo.oServerName) {
                    _this.lastSelectedServerIndex = index;
                }
            }
            if (_this.targetserverid == newInfo.ServerID) {
                targetserverindex = index;
            }
            index = index + 1;
            ServerConfig.push(newInfo);
        });
        //默认选一次登录的服
        //如果第一次登陆，则选第一个服
        if (this.lastSelectedServerIndex == -1) {
            index = 0;
            for (var i = 0; i < ServerConfig.length; i++) {
                var serverInfo = ServerConfig[i];
                if (serverInfo.IsRecommend) {
                    this.lastSelectedServerIndex = index;
                    this.selectedServerIndex = index;
                    break;
                }
                index = index + 1;
            }
        }
        if (this.lastSelectedServerIndex == -1) {
            this.selectedServerIndex = 0;
            this.lastSelectedServerIndex = this.selectedServerIndex;
        }
        if (targetserverindex == -1) {
            this.setSelectedServerIndex(this.lastSelectedServerIndex);
        }
        else {
            this.selectedServerIndex = targetserverindex;
            this.setSelectedServerIndex(targetserverindex);
        }
    };
    LoginSystem.prototype.getInputUser = function () {
        var info = {};
        info.username = this.tempUserName;
        info.password = this.tempPassWord;
        return info;
    };
    LoginSystem.prototype.checkBridgeServerInfo = function (serverInfo) {
        if (GAME_DEBUG) {
            return true;
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
    };
    LoginSystem.prototype.changeLoginPrecedure = function () {
        var preMgr = PrecedureManager.getInstance();
        if (preMgr.getCurrentPrecedureId() == PRECEDURE_LOGIN) {
            FireEvent(EventDefine.LOGIN_REQUEST_RESTART, null);
        }
        else {
            PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOGIN);
        }
    };
    LoginSystem.prototype.startBridgeAuth = function () {
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
    };
    LoginSystem.prototype.retBridgeHttpAuth = function (url, args) {
        var retCode = parseInt(args.code);
        if (retCode == -1) {
            //MsgSystem:ConfirmDialog_YES(Localize_cns("NET_ERROR1") .. args.errorCode)
            this.retryBridgeAuthTimes = 0;
            FireEvent(EventDefine.MSG_WAIT_END, null);
            this.onQuickLoginError(Localize_cns("NET_ERROR1") + args.code);
            return;
        }
        if (retCode == 0) {
            this.retryBridgeAuthTimes = 0;
            var authorInfo = GameAccount.getInstance().getAuthorInfo();
            var bridgeInfo = {};
            bridgeInfo.identityId = args["identityId"];
            bridgeInfo.identityName = args["identityName"];
            bridgeInfo.tstamp = args["tstamp"];
            bridgeInfo.sign = args["sign"];
            bridgeInfo.remarks = args["remarks"];
            bridgeInfo.qdKey = authorInfo.qdKey;
            bridgeInfo.code1 = authorInfo.code1;
            bridgeInfo.code2 = authorInfo.code2;
            bridgeInfo.deviceid = authorInfo.deviceid;
            GameAccount.getInstance().setBrigeInfo(bridgeInfo);
            this.startLoginConnection();
        }
        else {
            var msg = args.msg || "";
            TLog.Error("LoginSystem.retBridgeHttpAuth %s", String.format(Localize_cns("LOGIN_ERROR2"), retCode, msg));
            if (this.retryBridgeAuthTimes >= 2) {
                msg = String.format("msg:%s url:%s", msg, url);
                //MsgSystem:ConfirmDialog_YES( string.format( Localize_cns("LOGIN_ERROR2"), retCode, msg ))
                FireEvent(EventDefine.MSG_WAIT_END, null);
                this.onQuickLoginError(String.format(Localize_cns("LOGIN_ERROR2"), retCode, msg));
            }
            else {
                //重新验证
                this.setAutoLogin(true);
                this.startAccountAuth();
            }
        }
    };
    LoginSystem.prototype.startOfficiailRegister = function (args) {
        var officiailHttpRegisterWorker = OfficiailHttpRegisterWorker.createObj(args, this, this.retOfficiailRegister);
        officiailHttpRegisterWorker.send();
    };
    LoginSystem.prototype.retOfficiailRegister = function (args) {
        if (args.code == 0) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR5"));
            this.startOfficiailHttpAccountAuth(args.accInfo.ACC, args.accInfo.PWD);
        }
        else {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR1"));
        }
    };
    LoginSystem.prototype.startLoginConnection = function () {
        if (g_CrossServerInfo && g_CrossServerInfo.state == CS_BEGIN) {
            GameAccount.getInstance().setLoginIpAndPort(g_CrossServerInfo.ip, g_CrossServerInfo.port);
            GameAccount.getInstance().setLoginHostName(g_CrossServerInfo.nickName);
        }
        else {
            var serverInfo = this.getRecentLoginServerInfo();
            GameAccount.getInstance().setLoginIpAndPort(serverInfo.IP, serverInfo.PORT);
            GameAccount.getInstance().setLoginHostName(serverInfo.NickName);
        }
        var loginConnectionWorker = LoginConnectionWorker.createObj();
        loginConnectionWorker.send();
    };
    LoginSystem.prototype.startAccountAuth = function () {
        TLog.Debug("LoginSystem.startAccountAuth");
        var mode = IGlobal.sdkHelper.getSdkMode();
        if (mode == SdkMode.Officiail) {
            var username = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "username", "");
            var password = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "password", "");
            if (username == "") {
                FireEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, null);
                return;
            }
            this._authType = "Officiail";
            this.startOfficiailHttpAccountAuth(username, password);
        }
        else {
            this._authType = "auto";
            this.startThirdPartySDKAuth();
        }
    };
    // 第三方SDK验证
    LoginSystem.prototype.startThirdPartySDKAuth = function () {
        TLog.Debug("LoginSystem.startThirdPartySDKAuth", this._authType);
        var thirdPartySdkAuthWorker = ThirdPartySdkAuthWorker.newObj("type=" + this._authType);
        thirdPartySdkAuthWorker.setRetCallBack(this, this.retThirdPartySDKAuth);
        thirdPartySdkAuthWorker.sendAuthRequest();
        //锁定屏幕
        if (this._authType != "logout") {
            var showWaitting = IGlobal.sdkHelper.getStringConfigDef("LoginShowWait", "1");
            if (showWaitting == "1") {
                FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.newObj(true, Localize_cns("LOGIN_GET_ACCOUNT_INFO"), true));
            }
        }
    };
    LoginSystem.prototype.retThirdPartySDKAuth = function (code, infoParamsString) {
        SDKAnalyzer(SdkEventDefine.ACCOUNT_AUTH_FINISH, this._authType);
        TLog.Debug("LoginSystem.retThirdPartySDKAuth", code, infoParamsString);
        //解锁屏幕
        FireEvent(EventDefine.MSG_WAIT_END, null);
        if (code != 0) {
            GameAccount.getInstance().setAuthorInfo(null);
            //如果没有提示信息，则不弹窗
            if (infoParamsString != "") {
                MsgSystem.addTagTips(String.format(Localize_cns("SDK_LOGIN_ERROR"), code, infoParamsString));
            }
            //这里要加代码 提示，登陆失败，再次调用sdk登陆
            FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, null);
            return;
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
        var authorInfo = core.GameSdkUtil.splitHttpParams(infoParamsString);
        if (authorInfo.userId == null) {
            authorInfo.userId = authorInfo.openid;
        }
        if (authorInfo.qdKey == null) {
            authorInfo.qdKey = "";
        }
        if (authorInfo.qdName == null) {
            authorInfo.qdName = "";
        }
        if (authorInfo.code1 == null) {
            authorInfo.code1 = "";
        }
        if (authorInfo.code2 == null) {
            authorInfo.code2 = "";
        }
        if (authorInfo.deviceid == null) {
            authorInfo.deviceid = "pc";
        }
        if (authorInfo.gameKey == null) {
            authorInfo.gameKey = "";
        }
        if (authorInfo.gameName == null) {
            authorInfo.gameName = "";
        }
        GameAccount.getInstance().setAuthorInfo(authorInfo);
        SDKAnalyzer(SdkEventDefine.SDK_LOGIN_SCRIPT_FINISH, this._authType);
        FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, null);
    };
    LoginSystem.prototype.startOfficiailHttpAccountAuth = function (userName, passWord) {
        FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(true, Localize_cns("LOGIN_GET_ACCOUNT_INFO"), true));
        var appId = IGlobal.sdkHelper.getStringConfigDef("AppId");
        var clientId = IGlobal.sdkHelper.getStringConfigDef("ClientId");
        var userLocalData = {
            UserName: userName,
            PassWord: passWord,
            AppId: appId,
            ClientId: clientId,
        };
        var officiailHttpAccountAuthWorker = OfficiailHttpAccountAuthWorker.createObj(userLocalData, this, this.retOfficiailHttpAccountAuth);
        officiailHttpAccountAuthWorker.send();
        this.tempUserName = userName;
        this.tempPassWord = passWord;
    };
    LoginSystem.prototype.retOfficiailHttpAccountAuth = function (url, args) {
        FireEvent(EventDefine.MSG_WAIT_END, null);
        var retCode = parseInt(args.code);
        if (0 == retCode) {
            if (this.tempUserName != args.accountId) {
                TLog.Error("retOfficiailHttpAccountAuth self.tempUserName:%s ~= args.accountId:%s", this.tempUserName, args.accountId);
                return;
            }
            var gameKey = IGlobal.sdkHelper.getStringConfigDef("GameKey");
            var gameName = IGlobal.sdkHelper.getStringConfigDef("GameName");
            var qdKey = IGlobal.sdkHelper.getStringConfigDef("QD_Key");
            var code1 = IGlobal.sdkHelper.getStringConfigDef("QD_Code1");
            var code2 = IGlobal.sdkHelper.getStringConfigDef("QD_Code2");
            var authorInfo = {};
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
            GameAccount.getInstance().setAuthorInfo(authorInfo);
            IGlobal.setting.setCommonSetting(UserSetting.TYPE_STRING, "username", this.tempUserName);
            IGlobal.setting.setCommonSetting(UserSetting.TYPE_STRING, "password", this.tempPassWord);
            FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, null);
        }
        else if (6 == retCode) {
            //当时一个新账号的时候询问是否直接注册
            FireEvent(EventDefine.LOGIN_REQUEST_SHOW_REGISTER, null);
        }
        else {
            if (3 == retCode) {
                MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_ERROR6"));
                FireEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, null);
            }
            else {
                MsgSystem.addTagTips(String.format(Localize_cns("LOGIN_ERROR3"), retCode));
                FireEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, null);
            }
            GameAccount.getInstance().setAuthorInfo(null);
            this.tempUserName = "";
            this.tempPassWord = "";
        }
    };
    LoginSystem.prototype.onHttpResponse = function (url, data, userData) {
        FireEvent(EventDefine.MSG_WAIT_END, null);
        if (SERVERLIST_TAG == userData) {
            var jsonInfo = JsUtil.JsonDecode(data);
            if (jsonInfo["code"] != null && jsonInfo["data"] != null) {
                this.parseServerListFromJson(jsonInfo["data"]);
                if (jsonInfo['domainlist'] != null) {
                    this.parseDomainListFromJson(jsonInfo['domainlist']);
                }
            }
            else {
                this.parseServerListFromJson(jsonInfo);
            }
            this.mServerRoleList = [];
            if (jsonInfo["registerlist"]) {
                this.mServerRoleList = jsonInfo["registerlist"];
            }
            if (this.serverListCallback) {
                this.serverListCallback();
            }
        }
        else if (NOTICE_TAG == userData) {
            var jsonInfo = JsUtil.JsonDecodeSafeFormat(data);
            this.setNoticeContent(jsonInfo);
            if (this.noticeCallback) {
                this.noticeCallback();
            }
        }
    };
    LoginSystem.prototype.onHttpError = function (url, userData) {
        TLog.Error("onHttpError %s userData:%d", url, userData);
        FireEvent(EventDefine.MSG_WAIT_END, null);
        if (SERVERLIST_TAG == userData) {
            //再刷一次
            var _this_1 = this;
            var t = {
                onDialogCallback: function (result, userData) {
                    if (result == true) {
                        _this_1.requestServerList(_this_1.serverListCallback);
                    }
                }
            };
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_GET_SERVERLIST_FAILED"), t, null);
        }
        else if (NOTICE_TAG == userData) {
            if (this.noticeCallback) {
                this.noticeCallback();
            }
        }
    };
    LoginSystem.prototype.getRecentLoginServerInfo = function () {
        var idx = this.getSelectedServerIndex();
        return ServerConfig[idx];
    };
    LoginSystem.prototype.getServerConfigInfo = function (idx) {
        return ServerConfig[idx];
    };
    LoginSystem.prototype.setSelectedServerIndex = function (index) {
        var serverInfo = this.getServerConfigInfo(index);
        if (serverInfo == null) {
            return;
        }
        this.selectedServerIndex = index;
        FireEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, null);
    };
    LoginSystem.prototype.getSelectedServerIndex = function () {
        return this.selectedServerIndex;
    };
    LoginSystem.prototype.getLastSelectedServerIndex = function () {
        return this.lastSelectedServerIndex;
    };
    LoginSystem.prototype.onQuickLoginError = function (msg) {
        if (!this.bQuickLogin) {
            var callback = null;
            if (g_CrossServerInfo) {
                var t_1 = {
                    onDialogCallback: function (result, userData) {
                        if (result == false) {
                            return;
                        }
                        ConfirmFinishCrossServer();
                    }
                };
                callback = t_1;
            }
            MsgSystem.confirmDialog_YES(msg, callback);
            FireEvent(EventDefine.MSG_WAIT_END, null);
            return;
        }
        var self = this;
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == false)
                    return;
                self.setQuickLogin(true);
                self.changeLoginPrecedure();
            }
        };
        MsgSystem.confirmDialog_YES(msg, t);
    };
    LoginSystem.prototype.getServerStateText = function (serverInfo) {
        function getTempInfo(text, image, color) {
            var info = {};
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
    };
    LoginSystem.prototype.onRoleListUpdate = function (roleList) {
        this.mRoleList = roleList;
    };
    LoginSystem.prototype.onAddRoleInfo = function (roleInfo) {
        this.mRoleList.push(roleInfo);
    };
    LoginSystem.prototype.getRoleInfoByIndex = function (index) {
        return this.mRoleList[index];
    };
    LoginSystem.prototype.getRoleInfoList = function () {
        return this.mRoleList;
    };
    LoginSystem.prototype.getLoginRoleInfo = function () {
        return this.loginRoleInfo;
    };
    LoginSystem.prototype.startGameConnectionWithLastRole = function () {
        this.startGameConnection(this.loginRoleInfo);
    };
    LoginSystem.prototype.startGameConnection = function (info) {
        var roleInfo = info || this.getRoleInfoList()[0];
        this.loginRoleInfo = roleInfo;
        IGlobal.setting.setRoleName(roleInfo.id + "");
        this.setLastLoginRoleID(roleInfo.id);
        var runtimeConnectionWorker = RuntimeConnectionWorker.createObj(roleInfo);
        runtimeConnectionWorker.send();
    };
    LoginSystem.prototype.getLastLoginRoleID = function () {
        this.saveLastLoginRoleID = 0;
        var key = "LastLoginRoleID";
        this.saveLastLoginRoleID = IGlobal.setting.getCommonSetting(UserSetting.TYPE_NUMBER, key, 0);
        //TLog.Debug("LoginSystem.getLastLoginRoleID",this.saveLastLoginRoleID)
        return this.saveLastLoginRoleID;
    };
    LoginSystem.prototype.setLastLoginRoleID = function (roleID) {
        this.saveLastLoginRoleID = roleID;
        var key = "LastLoginRoleID";
        IGlobal.setting.setCommonSetting(UserSetting.TYPE_NUMBER, key, this.saveLastLoginRoleID);
        //TLog.Debug("LoginSystem.setLastLoginRoleID",roleID)
    };
    LoginSystem.prototype.setNoticeContent = function (content) {
        this.noticeContent = content;
    };
    LoginSystem.prototype.getNoticeContent = function () {
        return this.noticeContent;
    };
    return LoginSystem;
}(BaseSystem));
__reflect(LoginSystem.prototype, "LoginSystem", ["core.IHttpCallback"]);
//# sourceMappingURL=LoginSystem.js.map