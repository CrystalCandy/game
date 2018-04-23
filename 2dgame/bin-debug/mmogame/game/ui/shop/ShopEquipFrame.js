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
var ShopEquipFrame = (function (_super) {
    __extends(ShopEquipFrame, _super);
    function ShopEquipFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopEquipFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ShopLayout.exml"];
        this.tabIndex = -1;
    };
    ShopEquipFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab1", wnd: ShopEquipWindow.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: ShopEquipFunWindow.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: ShopEquipFunWindow.newObj(this.mLayoutNode, this) },
            { name: "tab4", wnd: ShopEquipFunWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var groupNameList = [
            ShopSystem.SHOP_ZHUANGBEI, ShopSystem.SHOP_LEIYIN, ShopSystem.SHOP_BANGHUI, ShopSystem.FULI_BANGHUI
        ];
        for (var i = 1; i <= 4; i++) {
            var entry = ShopSystem.getInstance().getShopEntryByGroupName(groupNameList[i - 1]);
            this.mElemList["tab" + i].label = ShopSystem.getInstance().getShopNameByEntry(entry);
        }
        this.mElemList["rd_had"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        this.mElemList["rd_access"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_limit"].setAlignFlag(gui.Flag.LEFT_CENTER);
        var _a, _b;
    };
    ShopEquipFrame.prototype.onUnLoad = function () {
    };
    ShopEquipFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    ShopEquipFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ShopEquipFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return ShopEquipFrame;
}(BaseWnd));
__reflect(ShopEquipFrame.prototype, "ShopEquipFrame");
//# sourceMappingURL=ShopEquipFrame.js.map