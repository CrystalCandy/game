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
var GlobalMainFrame = (function (_super) {
    __extends(GlobalMainFrame, _super);
    function GlobalMainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalMainFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/global/GlobalMainLayout.exml", "layouts/team/TeamGroupLayout.exml"];
    };
    GlobalMainFrame.prototype.onLoad = function () {
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
            { name: "team_check", wnd: GlobalTeamWindow.newObj(this.mLayoutNode, this), check: this.teamCheck, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    GlobalMainFrame.prototype.onUnLoad = function () {
    };
    GlobalMainFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.tabWndList.setWndVisible(true);
        this.onRefresh();
    };
    GlobalMainFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        this.tabWndList.setWndVisible(false);
        this.curTabIndex = null;
    };
    GlobalMainFrame.prototype.onRefresh = function () {
        if (this.curTabIndex) {
            this.tabWndList.changeTabWithIndex(this.curTabIndex);
        }
    };
    GlobalMainFrame.prototype.updateWnd = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.updateWnd();
        }
    };
    //////////////////////////////////////////
    GlobalMainFrame.prototype.teamCheck = function () {
        return true;
    };
    /////////////////////////////////////////////公共接口//////////////////////////////
    GlobalMainFrame.prototype.showGlobalFrame = function (bossIndex) {
        if (bossIndex) {
            this.curTabIndex = bossIndex;
        }
        this.showWnd();
    };
    return GlobalMainFrame;
}(BaseWnd));
__reflect(GlobalMainFrame.prototype, "GlobalMainFrame");
//# sourceMappingURL=GlobalMainFrame.js.map