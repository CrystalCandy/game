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
// TypeScript file
var BossMainFrame = (function (_super) {
    __extends(BossMainFrame, _super);
    function BossMainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossMainFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/boss/BossMainLayout.exml"];
    };
    BossMainFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        // this.setAlignCenter(true, true)
        this.setFullScreen(true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_close", _a["title"] = null, _a["color"] = gui.Color.white, _a["right"] = 0, _a["top"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "btn_back", _b["title"] = null, _b["color"] = gui.Color.white, _b["right"] = 0, _b["bottom"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "geren_check", wnd: BossSingleWindow.newObj(this.mLayoutNode, this), check: this.geRenCheck, obj: this },
            { name: "quanmin_check", wnd: BossGlobalWindow.newObj(this.mLayoutNode, this), check: this.quanMinCheck, obj: this },
            { name: "yewai_check", wnd: BossWildWindow.newObj(this.mLayoutNode, this), check: this.quanMinCheck, obj: this },
            { name: "shengshijie_check", wnd: BossBefallWindow.newObj(this.mLayoutNode, this), check: this.quanMinCheck, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    BossMainFrame.prototype.onUnLoad = function () {
    };
    BossMainFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.tabWndList.setWndVisible(true);
        this.onRefresh();
    };
    BossMainFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        this.tabWndList.setWndVisible(false);
        this.curTabIndex = null;
    };
    BossMainFrame.prototype.onRefresh = function () {
        if (this.curTabIndex) {
            this.tabWndList.changeTabWithIndex(this.curTabIndex);
        }
    };
    BossMainFrame.prototype.updateWnd = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.updateWnd();
        }
    };
    //////////////////////////////////////////
    BossMainFrame.prototype.geRenCheck = function () {
        return true;
    };
    BossMainFrame.prototype.quanMinCheck = function () {
        return true;
    };
    /////////////////////////////////////////////公共接口//////////////////////////////
    BossMainFrame.prototype.showBossFrame = function (bossIndex) {
        if (bossIndex) {
            this.curTabIndex = bossIndex;
        }
        this.showWnd();
    };
    return BossMainFrame;
}(BaseWnd));
__reflect(BossMainFrame.prototype, "BossMainFrame");
//# sourceMappingURL=BossMainFrame.js.map