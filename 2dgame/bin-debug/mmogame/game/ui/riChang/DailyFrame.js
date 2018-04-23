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
var DailyFrame = (function (_super) {
    __extends(DailyFrame, _super);
    function DailyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/DailyLayout.exml"];
        this.tabIndex = -1;
    };
    DailyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab0", wnd: DailyXiangYaoWindow.newObj(this.mLayoutNode, this), check: this.xiangYaoClick, obj: this },
            { name: "tab1", wnd: DailyZuDuiWindow.newObj(this.mLayoutNode, this), check: this.zuDuiClick, obj: this },
            { name: "tab2", wnd: DailySanBaiWindow.newObj(this.mLayoutNode, this), check: this.sanBaiClick, obj: this },
            { name: "tab3", wnd: DailyXiYouWindow.newObj(this.mLayoutNode, this), check: this.xiYouClick, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    DailyFrame.prototype.onUnLoad = function () {
    };
    DailyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        this.mLayoutNode.setDoModal(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    DailyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
        this.mLayoutNode.setDoModal(false);
    };
    DailyFrame.prototype.updateWnd = function () {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            wnd.updateWnd();
        }
    };
    ////---------------检查
    DailyFrame.prototype.xiangYaoClick = function () {
        return true;
    };
    DailyFrame.prototype.zuDuiClick = function () {
        return true;
    };
    DailyFrame.prototype.sanBaiClick = function () {
        return true;
    };
    DailyFrame.prototype.xiYouClick = function () {
        return true;
    };
    ////////////////////外部显示
    DailyFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return DailyFrame;
}(BaseWnd)); // TypeScript file
__reflect(DailyFrame.prototype, "DailyFrame");
//# sourceMappingURL=DailyFrame.js.map