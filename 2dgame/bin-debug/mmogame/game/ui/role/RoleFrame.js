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
var RoleFrame = (function (_super) {
    __extends(RoleFrame, _super);
    function RoleFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleLayout.exml"];
        this.tabIndex = -1;
    };
    RoleFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "equips", wnd: RoleEquipsWindow.newObj(this.mLayoutNode, this) },
            { name: "skills", wnd: RoleSkillsWindow.newObj(this.mLayoutNode, this) },
            { name: "zuoqi", wnd: RoleMountsWindow.newObj(this.mLayoutNode, this) },
            { name: "chibang", wnd: RoleWingsWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        var _a, _b;
    };
    RoleFrame.prototype.onUnLoad = function () {
    };
    RoleFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    RoleFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    RoleFrame.prototype.refreshDotTipsImp = function () {
        FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
    };
    RoleFrame.prototype.getDotTipsArgsImp = function (checkParam) {
        var args = {};
        args.index = this.tabWndList.getTabIndex();
        args.type = this.tabWndList.getCurrentWnd().type;
        return args;
    };
    RoleFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return RoleFrame;
}(BaseWnd));
__reflect(RoleFrame.prototype, "RoleFrame");
//# sourceMappingURL=RoleFrame.js.map