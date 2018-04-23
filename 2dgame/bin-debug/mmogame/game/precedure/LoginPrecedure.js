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
var LoginPrecedure = (function (_super) {
    __extends(LoginPrecedure, _super);
    function LoginPrecedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginPrecedure.prototype.onActive = function (lastId) {
        this.mLoginFrame = WngMrg.getInstance().getWindow("LoginFrame");
        this.mLoginFrame.showWnd();
        //
        RegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.onAccountAuthSucc, this);
        RegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, this.onAccountAuthFailed, this);
        RegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, this.onRequestShowAuth, this);
        RegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_SDK_AUTH, this.onRequestShowSdkAuth, this);
        RegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_ROLESPEC, this.onRequestShowRoleSpec, this);
        RegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_REGISTER, this.onRequestShowRegister, this);
        RegisterEvent(EventDefine.LOGIN_REQUEST_RESTART, this.onRequestRestart, this);
        FireEvent(EventDefine.PRECEDURE_ACTIVE, PrecedureEvent.createObj(this.id));
        //getSkipSelectServer
        //if(g_CrossServerInfo == null ){
        //	this.startLogin()
        //}else{
        if (g_CrossServerInfo != null) {
            //this.mLoginFrame.showWnd();
            //let logoWnd = WngMrg.getInstance().getWindow("LoginLogoFrame")
            if (g_CrossServerInfo.state == CS_BEGIN) {
                this.mLoginFrame.showLoadingWithMsg(Localize_cns("CROSS_SERVER_TIPS1"));
                //this.startLoginCrossServer()
                LoginSystem.getInstance().startBridgeAuth();
            }
            else {
                this.mLoginFrame.showLoadingWithMsg(Localize_cns("CROSS_SERVER_TIPS2"));
                LoginSystem.getInstance().setQuickLogin(true);
                this.startLogin();
            }
            return;
        }
        //let gs:GameSdk = GameSdk.getInstance();
        //let skipServer = gs.getSkipSelectServer();
        //let skipAuth = gs.getSkipAccountAuth();
        //if (skipServer && skipAuth){
        //	this.startServerInfo();
        //	//LoginSystem.getInstance().startBridgeAuth();
        //	return;
        //}
        //this.mLoginFrame.showWnd();
        this.startLogin();
    };
    LoginPrecedure.prototype.onDeactive = function (currentId) {
        this.mLoginFrame = null;
        UnRegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.onAccountAuthSucc, this);
        UnRegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_FAILED, this.onAccountAuthFailed, this);
        UnRegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_AUTH, this.onRequestShowAuth, this);
        UnRegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_SDK_AUTH, this.onRequestShowSdkAuth, this);
        UnRegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_ROLESPEC, this.onRequestShowRoleSpec, this);
        UnRegisterEvent(EventDefine.LOGIN_REQUEST_SHOW_REGISTER, this.onRequestShowRegister, this);
        UnRegisterEvent(EventDefine.LOGIN_REQUEST_RESTART, this.onRequestRestart, this);
        if (currentId == PRECEDURE_GAME) {
            LoginNetDispatcher.getInstance().disconnect();
        }
        FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.createObj(this.id));
    };
    LoginPrecedure.prototype.startLogin = function () {
        var loginSystem = LoginSystem.getInstance();
        var wngMgr = WngMrg.getInstance();
        if (loginSystem.isQuickLogin()) {
            this.startNoticeInfo();
        }
        else {
            //play sound
            //WngMrg.getInstance():showWindow("LoginLogoFrame")
            this.mLoginFrame.doCommand("command_switchState", LoginFrame.STATE_LOGO);
            var timeId = 0;
            var nextTick = function () {
                KillTimer(timeId);
                var authInfo = GameAccount.getInstance().getAuthorInfo();
                if (authInfo == null) {
                    this.startAccountAuth();
                }
                else {
                    this.startNoticeInfo();
                }
            };
            timeId = SetTimer(nextTick, this, 0);
        }
    };
    LoginPrecedure.prototype.startAccountAuth = function () {
        LoginSystem.getInstance().startAccountAuth();
    };
    LoginPrecedure.prototype.startNoticeInfo = function () {
        var loginSystem = LoginSystem.getInstance();
        if (loginSystem.isQuickLogin() || loginSystem.isAutoLogin()) {
            this.startServerInfo();
        }
        else {
            if (!GAME_DEBUG) {
                var self = this;
                var serverListCallback = function () {
                    self.startServerInfo();
                    var noticeContent = LoginSystem.getInstance().getNoticeContent();
                    if (size_t(noticeContent) != 0) {
                        var wnd = WngMrg.getInstance().getWindow("UpdateNoticeFrame");
                        wnd.setUpdateList(noticeContent);
                        wnd.showWnd();
                    }
                };
                loginSystem.requestNotice(serverListCallback);
            }
            else {
                this.startServerInfo();
            }
        }
    };
    LoginPrecedure.prototype.startServerInfo = function () {
        var loginSystem = LoginSystem.getInstance();
        var bCheckServerList = LaunchHelper.getInstance().isCheckServerList();
        var self = this;
        if (bCheckServerList) {
            var serverListCallback = function () {
                self.showLoginFrame();
            };
            loginSystem.requestServerList(serverListCallback);
        }
        else {
            var loginSettingFile = "loginSetting.json";
            var callback = {
                onResItemLoad: function (res) {
                    var jsonInfo = JsUtil.JsonDecode(res.getData());
                    loginSystem.parseServerListFromJson(jsonInfo);
                    self.showLoginFrame();
                },
                onResItemError: function (key) {
                    //this.showLoginFrame();
                }
            };
            IGlobal.resManager.loadResAsyn(loginSettingFile, callback, core.ResourceType.TYPE_TEXT);
        }
    };
    LoginPrecedure.prototype.showLoginFrame = function () {
        //var loginSystem:LoginSystem = LoginSystem.getInstance();
        //let gs:GameSdk = GameSdk.getInstance();
        //let skipServer = gs.getSkipSelectServer();
        //let skipAuth = gs.getSkipAccountAuth();
        //if (skipServer && skipAuth){		
        //	loginSystem.startBridgeAuth();
        //}
        var loginSystem = LoginSystem.getInstance();
        if (loginSystem.isQuickLogin() || loginSystem.isAutoLogin()) {
            loginSystem.setAutoLogin(false);
            loginSystem.startBridgeAuth();
        }
        if (!loginSystem.isQuickLogin()) {
            this.mLoginFrame.doCommand("command_switchState", LoginFrame.STATE_RENCENT);
            var bCheckUpdate = LaunchHelper.getInstance().isCheckServerList();
            if (bCheckUpdate) {
                var roleList = LoginSystem.getInstance().getServerRoleList();
                if (roleList.length == 0) {
                    var serverinfo = LoginSystem.getInstance().getRecentLoginServerInfo();
                    if (LoginSystem.getInstance().checkBridgeServerInfo(serverinfo)) {
                        LoginSystem.getInstance().startBridgeAuth();
                    }
                }
            }
        }
    };
    LoginPrecedure.prototype.onAccountAuthSucc = function (args) {
        this.startNoticeInfo();
    };
    LoginPrecedure.prototype.onAccountAuthFailed = function (args) {
        FireEvent(EventDefine.MSG_WAIT_END, null);
        var callback = {
            onDialogCallback: function (result, userData) {
                LoginSystem.getInstance().startAccountAuth();
            }
        };
        MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_GET_AUTH_FAILED"), callback);
    };
    LoginPrecedure.prototype.onRequestShowAuth = function (args) {
        //请求打开账号认证界面
        this.mLoginFrame.doCommand("command_switchState", LoginFrame.STATE_AUTH);
    };
    LoginPrecedure.prototype.onRequestShowSdkAuth = function (args) {
        //请求打开SDK选择登陆界面(qq / 微信)
        //WngMrg.getInstance().showWindow("LoginSdkAuthFrame")
    };
    //创建角色
    LoginPrecedure.prototype.onRequestShowRoleSpec = function (args) {
        WngMrg.getInstance().showWindow("LoginCreateRoleFrame");
    };
    LoginPrecedure.prototype.onRequestShowRegister = function (args) {
        this.mLoginFrame.doCommand("command_switchState", LoginFrame.STATE_REGISTER);
    };
    LoginPrecedure.prototype.onRequestRestart = function (args) {
        //this.startLogin()
        if (g_CrossServerInfo == null) {
            this.startLogin();
        }
        else {
            if (g_CrossServerInfo.state == CS_BEGIN) {
                this.mLoginFrame.showLoadingWithMsg(Localize_cns("CROSS_SERVER_TIPS1"));
                //this.startLoginCrossServer()
                LoginSystem.getInstance().startBridgeAuth();
            }
            else {
                this.mLoginFrame.showLoadingWithMsg(Localize_cns("CROSS_SERVER_TIPS2"));
                LoginSystem.getInstance().setQuickLogin(true);
                this.startLogin();
            }
        }
    };
    return LoginPrecedure;
}(BasePrecedure));
__reflect(LoginPrecedure.prototype, "LoginPrecedure");
//# sourceMappingURL=LoginPrecedure.js.map