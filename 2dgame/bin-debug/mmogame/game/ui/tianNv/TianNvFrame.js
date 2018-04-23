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
var TianNvFrame = (function (_super) {
    __extends(TianNvFrame, _super);
    function TianNvFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianNvFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/TianNvLayout.exml"];
        this.tabIndex = -1;
    };
    TianNvFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tiannv", wnd: TianNvTianNvWindow.newObj(this.mLayoutNode, this), check: this.onTab0Click, obj: this },
            { name: "xianqi", wnd: TianNvXianQiWindow.newObj(this.mLayoutNode, this), check: this.onTab1Click, obj: this },
            { name: "huanian", wnd: TianNvHuaNianWindow.newObj(this.mLayoutNode, this), check: this.onTab2Click, obj: this },
            { name: "lingqi", wnd: TianNvLingQiWindow.newObj(this.mLayoutNode, this), check: this.onTab3Click, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        var _a, _b;
    };
    TianNvFrame.prototype.onUnLoad = function () {
    };
    TianNvFrame.prototype.onShow = function () {
        //	RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    TianNvFrame.prototype.onHide = function () {
        //	UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ////接口
    TianNvFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    ///////////////// ///响应事件
    TianNvFrame.prototype.onTab0Click = function () {
        return true;
    };
    TianNvFrame.prototype.onTab1Click = function () {
        return true;
    };
    TianNvFrame.prototype.onTab2Click = function () {
        return true;
    };
    TianNvFrame.prototype.onTab3Click = function () {
        return true;
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    TianNvFrame.prototype.refreshDotTipsImp = function () {
        FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
    };
    TianNvFrame.prototype.getDotTipsArgsImp = function (checkParam) {
        var args = {};
        args.index = this.tabWndList.getTabIndex();
        args.type = this.tabWndList.getCurrentWnd().type;
        return args;
    };
    return TianNvFrame;
}(BaseWnd));
__reflect(TianNvFrame.prototype, "TianNvFrame");
//# sourceMappingURL=TianNvFrame.js.map