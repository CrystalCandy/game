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
var ClubFrame = (function (_super) {
    __extends(ClubFrame, _super);
    function ClubFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubLayout.exml", "layouts/team/TeamGroupLayout.exml"];
    };
    ClubFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_tips", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickRule, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "radio1", wnd: Club_HallWnd.newObj(this.mLayoutNode, this) },
            { name: "radio2", wnd: Club_IncenseWnd.newObj(this.mLayoutNode, this) },
            { name: "radio3", wnd: Club_FuBenWnd.newObj(this.mLayoutNode, this) },
            { name: "radio4", wnd: Club_SkillWnd.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b, _c;
    };
    ClubFrame.prototype.onUnLoad = function () {
    };
    ClubFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    ClubFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ClubFrame.prototype.setTitle = function (str) {
        this.mElemList["title"].text = str;
    };
    ClubFrame.prototype.onClickRule = function () {
        var wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame");
        wnd.showWithActivity("");
    };
    ClubFrame.prototype.updateWnd = function () {
        if (this.isVisible() && this.tabWndList.getTabIndex() == 2) {
            this.tabWndList.getCurrentWnd().refreshFrame();
        }
    };
    ClubFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return ClubFrame;
}(BaseWnd));
__reflect(ClubFrame.prototype, "ClubFrame");
//# sourceMappingURL=ClubFrame.js.map