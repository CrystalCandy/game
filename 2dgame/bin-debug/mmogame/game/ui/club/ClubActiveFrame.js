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
var ClubActiveFrame = (function (_super) {
    __extends(ClubActiveFrame, _super);
    function ClubActiveFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubActiveFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubActiveLayout.exml"];
    };
    ClubActiveFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab1", wnd: ClubActive_InfoWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: ClubActive_PrizeWnd.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    ClubActiveFrame.prototype.onUnLoad = function () {
    };
    ClubActiveFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
        this.refreshFrame();
        RpcProxy.call("C2G_FactionPlayerActiveInfo");
    };
    ClubActiveFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ClubActiveFrame.prototype.refreshFrame = function () {
    };
    return ClubActiveFrame;
}(BaseWnd));
__reflect(ClubActiveFrame.prototype, "ClubActiveFrame");
//# sourceMappingURL=ClubActiveFrame.js.map