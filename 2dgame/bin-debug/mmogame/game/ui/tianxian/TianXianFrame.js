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
var TianXianFrame = (function (_super) {
    __extends(TianXianFrame, _super);
    function TianXianFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianXianFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/tianxian/TianXianLayout.exml"];
        this.tabIndex = -1;
    };
    TianXianFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "TianXian", wnd: TianXian_GoddessWnd.newObj(this.mLayoutNode, this) },
            { name: "TianXianWeapon", wnd: TianXian_ArtifactWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: TianXian_PelletWnd.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: TianXian_MeridianWnd.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        this.actor = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"]);
        var _a, _b;
    };
    TianXianFrame.prototype.onUnLoad = function () {
        var actorView = this.mElemList["actorview"];
        actorView.clearView();
    };
    TianXianFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    TianXianFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    TianXianFrame.prototype.refreshDotTipsImp = function () {
        FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
    };
    TianXianFrame.prototype.getDotTipsArgsImp = function (checkParam) {
        var args = {};
        args.index = this.tabWndList.getTabIndex();
        args.type = this.tabWndList.getCurrentWnd().type;
        return args;
    };
    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    TianXianFrame.prototype.showWithIndex = function (index) {
        if (index == null) {
            index = 0;
        }
        this.tabIndex = index;
        this.showWnd();
    };
    return TianXianFrame;
}(BaseWnd));
__reflect(TianXianFrame.prototype, "TianXianFrame");
//# sourceMappingURL=TianXianFrame.js.map