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
var LoginRegisterFrame = (function (_super) {
    __extends(LoginRegisterFrame, _super);
    function LoginRegisterFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginRegisterFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/login/LoginRegisterLayout.exml"];
    };
    LoginRegisterFrame.prototype.onLoad = function () {
        //this.createLayerNode();
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.setDoModal(true);
        this.initSkinElemList();
        this.mElemList["btn_close"] = this.mLayoutNode.getComponent("btn_close");
        this.mElemList["btn_close_top"] = this.mLayoutNode.getComponent("btn_close_top");
        this.mElemList["btn_register"] = this.mLayoutNode.getComponent("btn_register");
        this.mElemList["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.mElemList["btn_close_top"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.mElemList["btn_register"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegisterBtnClick, this);
        this.mLayoutNode.horizontalCenter = 0;
        this.mLayoutNode.verticalCenter = 0;
    };
    LoginRegisterFrame.prototype.onUnLoad = function () {
    };
    LoginRegisterFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.hideWnd, this);
    };
    LoginRegisterFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.LOGIN_ACCOUNT_AUTH_SUCC, this.hideWnd, this);
    };
    LoginRegisterFrame.prototype.onRegisterBtnClick = function (event) {
        var btn = event.target;
        var info = LoginSystem.getInstance().getInputUser();
        var acc_string = info.username;
        var pwd_string = info.password;
        if (StringUtil.isEmpty(acc_string) ||
            StringUtil.isEmpty(pwd_string)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_USER_CFM"));
            return;
        }
        //todo:yangguiming
        if (!GAME_DEBUG) {
            //账号或密码只能包含6-20位的字母或数字
            if (!StringUtil.isAlphaNumber(acc_string) ||
                acc_string.length < 6 || acc_string.length > 20) {
                MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_USER_FORMAT_CFM"));
                return;
            }
            if (!StringUtil.isAlphaNumber(pwd_string) ||
                pwd_string.length < 6 || pwd_string.length > 20) {
                MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_PSW_FORMAT_CFM"));
                return;
            }
        }
        var newAccInfo = (_a = {}, _a["ACC"] = acc_string, _a["PWD"] = pwd_string, _a);
        var loginSystem = LoginSystem.getInstance();
        loginSystem.startOfficiailRegister(newAccInfo);
        var _a;
    };
    LoginRegisterFrame.prototype.onReturn = function () {
        var loginFrame = WngMrg.getInstance().getWindow("LoginFrame");
        loginFrame.doCommand("command_switchState", LoginFrame.STATE_AUTH);
        this.hideWnd();
    };
    return LoginRegisterFrame;
}(BaseWnd));
__reflect(LoginRegisterFrame.prototype, "LoginRegisterFrame");
//# sourceMappingURL=LoginRegisterFrame.js.map