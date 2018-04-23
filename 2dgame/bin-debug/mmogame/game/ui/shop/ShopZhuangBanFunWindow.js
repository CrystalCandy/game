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
var ShopZhuangBanFunWindow = (function (_super) {
    __extends(ShopZhuangBanFunWindow, _super);
    function ShopZhuangBanFunWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopZhuangBanFunWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ShopZhuangBanFunWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.scroll = this.mParentWnd.scroll;
        if (this.scroll == null) {
            var group = this.mElemList["group_scroll"];
            this.scroll = UIScrollList.newObj(this.mLayoutNode, "tempScroll", 0, 0, group.width, group.height, group);
        }
        this.mParentWnd.scroll = this.scroll;
        this.select = 0;
    };
    ShopZhuangBanFunWindow.prototype.onUnLoad = function () {
    };
    ShopZhuangBanFunWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = true;
        this.mElemList["group_equip"].visible = false;
        this.onRefresh();
    };
    ShopZhuangBanFunWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = false;
    };
    ShopZhuangBanFunWindow.prototype.onRefresh = function () {
        var groupNameList = [
            ShopSystem.SHOP_ZHUANGBAN, ShopSystem.SHOP_PIFU, ShopSystem.SHOP_YOUQING, ShopSystem.SHOP_WEIWANG
        ];
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var groupName = groupNameList[index];
        this.mElemList["rd_access"].visible = false;
        this.mElemList["group_richang"].visible = false;
        this.mElemList["rd_limit"].visible = false;
        var hadStr = ShopSystem.getInstance().getShopCostItemStr(groupName);
        AddRdContent(this.mElemList["rd_had"], hadStr, "ht_20_cc");
        var shopEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName);
        this.type = shopEntry;
        var list = ShopSystem.getInstance().getShopItemList(shopEntry);
        this.mElemList["title"].text = ShopSystem.getInstance().getShopNameByEntry(shopEntry);
        var scroll = this.scroll;
        var showList = splitListByCount(list, 2);
        scroll.clearItemList();
        for (var k = 0; k < size_t(showList); k++) {
            var v = showList[k];
            var window_1 = scroll.getItemWindow(k, 560, 150, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, k);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    ShopZhuangBanFunWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 2; i++) {
            var x = 290 * (i - 1);
            this.mElemList[name + "_shopBox" + i] = UIShopBox.newObj(this.mLayoutNode, name + "_shopBox" + i, x, 0, window);
        }
    };
    ShopZhuangBanFunWindow.prototype.refreshItemWindow = function (window, config, index) {
        var name = window.name;
        for (var i = 1; i <= 2; i++) {
            if (config[i - 1]) {
                var pos = index * 2 + i;
                this.mElemList[name + "_shopBox" + i].updateByEntry(this.type, pos);
            }
            else {
                this.mElemList[name + "_shopBox" + i].setVisible(false);
            }
        }
    };
    return ShopZhuangBanFunWindow;
}(BaseCtrlWnd));
__reflect(ShopZhuangBanFunWindow.prototype, "ShopZhuangBanFunWindow");
//# sourceMappingURL=ShopZhuangBanFunWindow.js.map