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
var RoleFATFrame = (function (_super) {
    __extends(RoleFATFrame, _super);
    function RoleFATFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleFATFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleFATLayout.exml"];
        this.tabIndex = -1;
    };
    RoleFATFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_unreal", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onUnrealClick, _c),
            (_d = {}, _d["name"] = "btn_left", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onLeftClick, _d),
            (_e = {}, _e["name"] = "btn_right", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onRightClick, _e),
            (_f = {}, _f["name"] = "btn_search", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onSearchClick, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_TOP);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, -2, this.mElemList["group_rd2"]);
        //this.mElemList["btn_unreal"].visible = false;
        for (var i = 1; i <= 5; i++) {
            this.mElemList["group" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkin, this);
        }
        var tabInfoList = [
            { name: "fashion", wnd: RoleFunTitleWindow.newObj(this.mLayoutNode, this) },
            { name: "title", wnd: RoleFunTitleWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        this.actor = UIActorView.newObj(this.mLayoutNode, "actor", 0, 0, this.mElemList["actor"]);
        var _a, _b, _c, _d, _e, _f;
    };
    RoleFATFrame.prototype.onUnLoad = function () {
        var actorView = this.mElemList["actor"];
        actorView.clearView();
    };
    RoleFATFrame.prototype.onShow = function () {
        //  RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    RoleFATFrame.prototype.onHide = function () {
        //  UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ///----------响应事件
    RoleFATFrame.prototype.onLeftClick = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.onLeftClick(event);
        }
    };
    RoleFATFrame.prototype.onRightClick = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.onRightClick(event);
        }
    };
    RoleFATFrame.prototype.onSearchClick = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.onSearchClick(event);
        }
    };
    RoleFATFrame.prototype.onUnrealClick = function (event) {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.onUnrealClick(event);
        }
    };
    RoleFATFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    RoleFATFrame.prototype.onClickSkin = function (event) {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.onClickSkin(event);
        }
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    RoleFATFrame.prototype.refreshDotTipsImp = function () {
        this.refreshIconDot();
    };
    RoleFATFrame.prototype.refreshIconDot = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.refreshIconDot(event);
        }
    };
    return RoleFATFrame;
}(BaseWnd));
__reflect(RoleFATFrame.prototype, "RoleFATFrame");
//# sourceMappingURL=RoleFATFrame.js.map