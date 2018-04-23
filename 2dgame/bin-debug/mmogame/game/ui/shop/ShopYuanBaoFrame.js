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
var ShopYuanBaoFrame = (function (_super) {
    __extends(ShopYuanBaoFrame, _super);
    function ShopYuanBaoFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopYuanBaoFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ShopLayout.exml"];
        this.tabIndex = -1;
    };
    ShopYuanBaoFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab1", wnd: ShopYuanBaoFunWindow.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: ShopYuanBaoFunWindow.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: ShopYuanBaoFunWindow.newObj(this.mLayoutNode, this) },
            { name: "tab4", wnd: ShopYuanBaoFunWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var groupNameList = [
            ShopSystem.SHOP_YUANBAO, ShopSystem.SHOP_BANGYUAN, ShopSystem.SHOP_CHONGWU, ShopSystem.SHOP_XIANLV
        ];
        for (var i = 1; i <= 4; i++) {
            var entry = ShopSystem.getInstance().getShopEntryByGroupName(groupNameList[i - 1]);
            this.mElemList["tab" + i].label = ShopSystem.getInstance().getShopNameByEntry(entry);
        }
        var _a, _b;
    };
    ShopYuanBaoFrame.prototype.onUnLoad = function () {
    };
    ShopYuanBaoFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    ShopYuanBaoFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ShopYuanBaoFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return ShopYuanBaoFrame;
}(BaseWnd));
__reflect(ShopYuanBaoFrame.prototype, "ShopYuanBaoFrame");
//# sourceMappingURL=ShopYuanBaoFrame.js.map