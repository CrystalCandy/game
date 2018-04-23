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
var LoginFrame = (function (_super) {
    __extends(LoginFrame, _super);
    function LoginFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/login/LoginLayout.exml"];
    };
    LoginFrame.prototype.onLoad = function () {
        //this.createLayerNode();
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreenRaw(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_entergame", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onEnterGame, _a),
            (_b = {}, _b["name"] = "group_recent", _b["title"] = null, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["name"] = "label_account", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onAccountClick, _c),
            (_d = {}, _d["name"] = "label_serverName", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onServerListClick, _d),
            (_e = {}, _e["name"] = "group_auth", _e["title"] = null, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["name"] = "edit_account", _f["title"] = null, _f["event_name"] = null, _f["fun_index"] = null, _f),
            (_g = {}, _g["name"] = "edit_password", _g["title"] = null, _g["event_name"] = null, _g["fun_index"] = null, _g),
            (_h = {}, _h["name"] = "btn_auth", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onAuthBtnClick, _h),
            (_j = {}, _j["name"] = "btn_close", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onBtnAuthClose, _j),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    LoginFrame.prototype.onUnLoad = function () {
    };
    LoginFrame.prototype.onShow = function () {
        this.lastLoginTime = -1;
        this.lastLoginCount = 0;
        this.mLayoutNode.visible = true;
        this.command_switchState(LoginFrame.STATE_LOGO);
        RegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.refreshUI, this);
        RegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, this.refreshUI, this);
        RegisterEvent(EventDefine.LOADING_GAME_RESOURCE_BEGIN, this.onLoadBegin, this);
        RegisterEvent(EventDefine.LOADING_GAME_RESOURCE_UPDATE, this.onLoadUpdate, this);
        RegisterEvent(EventDefine.LOADING_GAME_RESOURCE_FINISH, this.onLoadFinish, this);
        RegisterEvent(EventDefine.LOGIN_LOGO_HIDE_BEGIN, this.onAnimLogoHide, this);
        this.refreshUI();
        //this.checkSkipAuthServer()
    };
    LoginFrame.prototype.checkSkipAuthServer = function () {
        var skipAuth = (IGlobal.gameSdk.getBoolConfigDef("IsReLogin", true) == false);
        //let skipServer = IGlobal.gameSdk.getSkipSelectServer();
        // if (skipAuth == true && skipServer == true){
        //     this.mElemList['group_recent'].visible = false
        //     let event;
        //     this.onEnterGame(event)
        //     return
        // }
        this.mElemList['group_recent'].visible = true;
        this.mElemList['group_account'].visible = (!skipAuth);
        //this.mElemList['group_server'].visible = (!skipServer)
        if (skipAuth == true) {
            this.mElemList['group_server'].y = 65;
            this.mElemList['btn_entergame'].y = 144;
        }
        else {
            this.mElemList['group_server'].y = 51;
            this.mElemList['group_account'].y = 115;
            this.mElemList['btn_entergame'].y = 178;
        }
    };
    LoginFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.refreshUI, this);
        UnRegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, this.refreshUI, this);
        UnRegisterEvent(EventDefine.LOADING_GAME_RESOURCE_BEGIN, this.onLoadBegin, this);
        UnRegisterEvent(EventDefine.LOADING_GAME_RESOURCE_UPDATE, this.onLoadUpdate, this);
        UnRegisterEvent(EventDefine.LOADING_GAME_RESOURCE_FINISH, this.onLoadFinish, this);
        UnRegisterEvent(EventDefine.LOGIN_LOGO_HIDE_BEGIN, this.onAnimLogoHide, this);
        if (this.fireStayTimerId) {
            KillTimer(this.fireStayTimerId);
            this.fireStayTimerId = null;
        }
        if (this.animTimerId) {
            KillTimer(this.animTimerId);
            this.animTimerId = null;
        }
        if (this.bFireFinishEvent) {
            FireEvent(EventDefine.LOGIN_LOGO_HIDE_FINISH, null);
        }
        this.loadingMsg = null;
    };
    LoginFrame.prototype.refreshUI = function () {
        this.mElemList["label_version"].text = "V" + g_VersionData.resourceVer;
        var recentLoginServerInfo = LoginSystem.getInstance().getRecentLoginServerInfo();
        if (recentLoginServerInfo) {
            var textinfo = LoginSystem.getInstance().getServerStateText(recentLoginServerInfo);
            // this.mElemList["label_serverStat"].text = textinfo.text;
            // this.mElemList["label_serverStat"].textColor = textinfo.color;
            //this.mElemList["icon_serverStat"].source = textinfo.image;
            //this.mElemList["icon_serverNew"].visible = !!recentLoginServerInfo.IsNew;
            this.mElemList["label_serverName"].text = recentLoginServerInfo.ServerName;
            this.mElemList["label_serverName"].textColor = gui.Color.cyan;
        }
        var userLoginName = GameAccount.getInstance().getUserLoginName();
        if (userLoginName) {
            this.mElemList["label_account"].text = userLoginName;
        }
    };
    //刷新UI数据
    LoginFrame.prototype.refreshAuthData = function () {
        var userName = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "username", "");
        var passWord = IGlobal.setting.getCommonSetting(UserSetting.TYPE_STRING, "password", "");
        this.mElemList["edit_account"].text = (userName);
        this.mElemList["edit_password"].text = (passWord);
    };
    LoginFrame.prototype.command_switchState = function (param1, param2) {
        this.mElemList["group_recent"].visible = false;
        this.mElemList["group_auth"].visible = false;
        this.mElemList["group_loading"].visible = false;
        this.mLayoutNode.setLayer(1 /* Normal */);
        if (this.animTimerId) {
            KillTimer(this.animTimerId);
            this.animTimerId = null;
        }
        this.mElemList["image_bg"].source = "dl_dengLuDi01";
        var state = param1;
        switch (state) {
            case LoginFrame.STATE_LOGO:
                {
                }
                break;
            case LoginFrame.STATE_AUTH:
                {
                    this.mElemList["group_auth"].visible = true;
                    this.refreshAuthData();
                }
                break;
            case LoginFrame.STATE_RENCENT:
                {
                    this.mElemList["group_recent"].visible = true;
                    this.checkSkipAuthServer();
                }
                break;
            case LoginFrame.STATE_REGISTER:
                {
                    WngMrg.getInstance().showWindow("LoginRegisterFrame");
                }
                break;
            case LoginFrame.STATE_LOADING:
                {
                    // if (this.animTimerId == null) {
                    //     this.during = 0
                    //     this.animTimerId = SetTimer(this.animRotate, this, 100)
                    // }
                    this.mElemList["image_bg"].source = "dl_dengLuDi02";
                    this.mElemList["group_loading"].visible = true;
                    this.mLayoutNode.setLayer(3 /* Top */);
                }
                break;
        }
    };
    // animRotate(dt) {
    //     this.during = this.during + dt
    //     let Circle_frame = this.mElemList["Circle_frame"]
    //     let rotate = Math.floor(this.during * 0.3) % 360
    //     Circle_frame.rotation = rotate;
    // }
    LoginFrame.prototype.onAccountClick = function (event) {
        var mode = IGlobal.sdkHelper.getSdkMode();
        if (mode == SdkMode.Officiail) {
            this.command_switchState(LoginFrame.STATE_AUTH);
        }
        else {
            //todo:yangguiming
        }
    };
    LoginFrame.prototype.onServerListClick = function (event) {
        WngMrg.getInstance().showWindow("LoginServerListFrame");
    };
    LoginFrame.prototype.onAuthBtnClick = function (event) {
        var acc_string = this.mElemList["edit_account"].text;
        var pwd_string = this.mElemList["edit_password"].text;
        if (StringUtil.isEmpty(acc_string) || StringUtil.isEmpty(pwd_string)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_USER_CFM"));
            return;
        }
        LoginSystem.getInstance().startOfficiailHttpAccountAuth(acc_string, pwd_string);
    };
    LoginFrame.prototype.onBtnAuthClose = function (event) {
        var authorInfo = GameAccount.getInstance().getAuthorInfo();
        if (authorInfo == null)
            return;
        this.command_switchState(LoginFrame.STATE_RENCENT);
    };
    LoginFrame.prototype.onEnterGame = function (event) {
        var serverInfo = LoginSystem.getInstance().getRecentLoginServerInfo();
        if (serverInfo == null) {
            MsgSystem.addTagTips(Localize_cns("LOGIN_ERROR7"));
            return;
        }
        if (serverInfo.State == StateType.UNABLE) {
            MsgSystem.addTagTips(Localize_cns("LOGIN_ERROR7"));
            return;
        }
        //检查版本号
        // var bCheckUpdate = LaunchHelper.getInstance():isCheckUpdate()
        // if(bCheckUpdate){
        //     local serverVer = serverInfo.Version
        //     local resVer = GetCacheResVer()
        //     local ret, bNeedUpdate = CompareVersion(resVer, serverVer)
        //     if  bNeedUpdate then
        //         MsgSystem:ConfirmDialog_YES(Localize_cns("LOGIN_SERVER_VER_ERROR"))
        //         return
        //     end
        // }
        if (this.lastLoginTime > 0) {
            var currentTime = core.getCpuTime();
            if (currentTime - this.lastLoginTime < 3000) {
                this.lastLoginCount = this.lastLoginCount + 1;
                if (this.lastLoginCount >= 2) {
                    MsgSystem.addTagTips(Localize_cns("LOGIN_SERVER_TOO_OFTEN"));
                }
                return;
            }
        }
        this.lastLoginTime = core.getCpuTime();
        this.lastLoginCount = 0;
        //连接桥登陆
        LoginSystem.getInstance().startBridgeAuth();
    };
    LoginFrame.prototype.setProgressSlot = function (percent) {
    };
    LoginFrame.prototype.onLoadBegin = function (args) {
        this.command_switchState(LoginFrame.STATE_LOADING);
        this.setProgressSlot(0);
        if (this.loadingMsg != null) {
            this.mElemList["label_loading"].text = (this.loadingMsg);
            this.setProgressSlot(100);
        }
    };
    LoginFrame.prototype.onLoadUpdate = function (args) {
        if (args.all == 0) {
            this.loadProgress = 1;
        }
        else {
            this.loadProgress = args.cur / args.all;
        }
        var progress = Math.floor(this.loadProgress * 100);
        this.setProgressSlot(progress);
        if (this.loadingMsg == null) {
            var str = String.format(Localize_cns("LOGIN_ADD_MEMERY_CONTENT"), progress + "%");
            this.mElemList["label_loading"].text = (str);
        }
    };
    LoginFrame.prototype.onLoadFinish = function (args) {
        this.loadProgress = 1;
        //this.addMemeryFrame.SetVisible(false)	
        //if(this.addMemeryRotateTimer ){
        //	KillTimer(this.addMemeryRotateTimer)
        //	this.addMemeryRotateTimer = null
        //}	
    };
    LoginFrame.prototype.onAnimLogoHide = function (args) {
        this.bFireFinishEvent = args.userData;
        this.delayHideWnd();
    };
    LoginFrame.prototype.delayHideWnd = function () {
        function nextTick(dt) {
            this.hideWnd();
        }
        this.fireStayTimerId = SetTimer(nextTick, this, 1000);
    };
    LoginFrame.prototype.showLoadingWithMsg = function (msg) {
        this.loadingMsg = msg;
        this.showWnd();
        this.doCommand("command_switchState", LoginFrame.STATE_LOGO);
        this.doCommand("onLoadBegin");
    };
    LoginFrame.STATE_LOGO = 0; //背景图
    LoginFrame.STATE_AUTH = 1; //授权信息
    LoginFrame.STATE_RENCENT = 2; //最近登陆
    LoginFrame.STATE_REGISTER = 3; //注册
    LoginFrame.STATE_LOADING = 4; //loading
    return LoginFrame;
}(BaseWnd));
__reflect(LoginFrame.prototype, "LoginFrame");
//# sourceMappingURL=LoginFrame.js.map