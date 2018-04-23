// TypeScript file
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
var LoginRoleListFrame = (function (_super) {
    __extends(LoginRoleListFrame, _super);
    function LoginRoleListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginRoleListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/login/LoginRoleListLayout.exml"];
    };
    LoginRoleListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreenRaw(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var parentWnd = this.mElemList["role_list_wnd"];
        var window = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, parentWnd.width, parentWnd.height - 10, parentWnd);
        this.scroll = window;
        var _a;
    };
    LoginRoleListFrame.prototype.onUnLoad = function () {
    };
    LoginRoleListFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.resetAutoLoginTimer, this);
        this.mLayoutNode.visible = true;
        this.refreshUI();
    };
    LoginRoleListFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.resetAutoLoginTimer, this);
        this.mLayoutNode.visible = false;
        this.resetAutoLoginTimer();
    };
    LoginRoleListFrame.prototype.initItemWindow = function (wnd) {
        var name = wnd.name;
        var mElemInfo1 = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "bg", _a["title"] = "", _a["font"] = null, _a["image"] = "ty_UIBg11", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = wnd.width, _a["h"] = wnd.height, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "roleInfo", _b["title"] = "name", _b["font"] = "ht_24_lc", _b["image"] = "", _b["color"] = null, _b["x"] = 25, _b["y"] = 30, _b["w"] = 200, _b["h"] = 40, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "lastLogin", _c["title"] = Localize_cns("LAST_LOGIN_ROLE"), _c["font"] = "ht_24_rc", _c["image"] = "", _c["color"] = gui.Color.red, _c["x"] = 220, _c["y"] = 30, _c["w"] = 180, _c["h"] = 40, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Button, _d["name"] = name + "sure_btn", _d["title"] = Localize_cns("LOGIN_INFO"), _d["font"] = "ht_24_cc_stroke", _d["image"] = "ty_tongYongBt01", _d["color"] = gui.Color.white, _d["x"] = 430, _d["y"] = 20, _d["w"] = 120, _d["h"] = 70, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickSure, _d),
        ];
        UiUtil.createElem(mElemInfo1, this.mLayoutNode, this.mElemList, this, wnd);
        return wnd;
        var _a, _b, _c, _d;
    };
    LoginRoleListFrame.prototype.refreshItemWindow = function (wnd, info, lastRoleId) {
        var name = wnd.name;
        this.controlDataTable[name + "sure_btn"] = info;
        var roleStr = String.format("Lv.%d %s", info.level, info.name);
        this.mElemList[name + "roleInfo"].text = (roleStr);
        this.mElemList[name + "lastLogin"].visible = (info.id == lastRoleId);
    };
    LoginRoleListFrame.prototype.refreshUI = function () {
        var list = LoginSystem.getInstance().getRoleInfoList();
        var lastRoleID = LoginSystem.getInstance().getLastLoginRoleID();
        // let list:any = {}
        // let lastRoleID = -1
        // for(let i = 1; i <=  2;i++){
        // 	let info = LoginRole.newObj()
        // 	info.id = i
        // 	info.name = "test" ..i 
        // 	info.level = i
        // 	info.body = 0
        // 	JsUtil.arrayInstert(list, info)
        // }
        this.lastRoleInfo = null;
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, 570, 110, 0, 5, 5);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, lastRoleID);
            if (lastRoleID == v.id) {
                this.lastRoleInfo = v;
            }
        }
        scroll.refreshScroll();
        //TLog.Debug("LoginRoleListFrame.refreshUI",totalHeight)
        if (this.lastRoleInfo) {
            this.startAutoLoginTimer();
        }
    };
    LoginRoleListFrame.prototype.onClickSure = function (args) {
        var wnd = args.target;
        var name = wnd.name;
        var info = this.controlDataTable[name];
        LoginSystem.getInstance().startGameConnection(info);
        this.resetAutoLoginTimer();
    };
    LoginRoleListFrame.prototype.resetAutoLoginTimer = function () {
        if (this.autoLoginTimer) {
            KillTimer(this.autoLoginTimer);
            this.autoLoginTimer = null;
        }
        if (this.mElemList["group_tips"]) {
            this.mElemList["group_tips"].visible = (false);
        }
    };
    LoginRoleListFrame.prototype.startAutoLoginTimer = function () {
        this.resetAutoLoginTimer();
        this.autoTime = 4;
        this.mElemList["group_tips"].visible = (true);
        this.autoLoginTimer = SetTimer(this.autoTimerFunc, this, 1000, true);
    };
    LoginRoleListFrame.prototype.autoTimerFunc = function (dt) {
        if (this.autoTime == 1) {
            if (this.lastRoleInfo) {
                LoginSystem.getInstance().startGameConnection(this.lastRoleInfo);
            }
            this.resetAutoLoginTimer();
            return;
        }
        else {
            this.autoTime = this.autoTime - 1;
            if (this.mElemList["group_tips"].visible) {
                var str = String.format(Localize_cns("AUTO_LOGIN_ROLE1"), this.autoTime);
                this.mElemList["tips_title"].text = (str);
            }
        }
    };
    return LoginRoleListFrame;
}(BaseWnd));
__reflect(LoginRoleListFrame.prototype, "LoginRoleListFrame");
//# sourceMappingURL=LoginRoleListFrame.js.map