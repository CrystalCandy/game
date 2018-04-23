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
var CopyMainFrame = (function (_super) {
    __extends(CopyMainFrame, _super);
    function CopyMainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyMainFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/copy/CopyMainLayout.exml"];
    };
    CopyMainFrame.prototype.onLoad = function () {
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
            { name: "cailiao_check", wnd: CopyMaterialWindow.newObj(this.mLayoutNode, this), check: this.cailiaoCheck, obj: this },
            { name: "longwang_check", wnd: CopyDragonWindow.newObj(this.mLayoutNode, this), check: this.longwangCheck, obj: this },
            { name: "leiyin_check", wnd: CopyTempleWindow.newObj(this.mLayoutNode, this), check: this.leiYinCheck, obj: this },
            { name: "tianting_check", wnd: CopyHeavenWindow.newObj(this.mLayoutNode, this), check: this.tianTingCheck, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    CopyMainFrame.prototype.onUnLoad = function () {
    };
    CopyMainFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.tabWndList.setWndVisible(true);
        this.onRefresh();
    };
    CopyMainFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        this.tabWndList.setWndVisible(false);
        this.curTabIndex = null;
    };
    CopyMainFrame.prototype.onRefresh = function () {
        if (this.curTabIndex) {
            this.tabWndList.changeTabWithIndex(this.curTabIndex);
        }
    };
    CopyMainFrame.prototype.updateWnd = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.updateWnd();
        }
    };
    //////////////////////////////////////////
    CopyMainFrame.prototype.cailiaoCheck = function () {
        return true;
    };
    CopyMainFrame.prototype.longwangCheck = function () {
        return true;
    };
    CopyMainFrame.prototype.leiYinCheck = function () {
        return true;
    };
    CopyMainFrame.prototype.tianTingCheck = function () {
        return true;
    };
    /////////////////////////////////////////////公共接口//////////////////////////////
    CopyMainFrame.prototype.showBossFrame = function (copyIndex) {
        if (copyIndex) {
            this.curTabIndex = copyIndex;
        }
        this.showWnd();
    };
    return CopyMainFrame;
}(BaseWnd));
__reflect(CopyMainFrame.prototype, "CopyMainFrame");
//# sourceMappingURL=CopyMainFrame.js.map