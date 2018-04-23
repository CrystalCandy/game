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
var GodEquipFrame = (function (_super) {
    __extends(GodEquipFrame, _super);
    function GodEquipFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GodEquipFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/godEquip/GodEquipLayout.exml"];
        this.tabIndex = -1;
    };
    GodEquipFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var tabInfoList = [];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
    };
    GodEquipFrame.prototype.onUnLoad = function () {
    };
    GodEquipFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    GodEquipFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    GodEquipFrame.prototype.showWithIndex = function (index) {
        if (index == null) {
            index = 0;
        }
        this.tabIndex = index;
        this.showWnd();
    };
    return GodEquipFrame;
}(BaseWnd));
__reflect(GodEquipFrame.prototype, "GodEquipFrame");
//# sourceMappingURL=GodEquipFrame.js.map