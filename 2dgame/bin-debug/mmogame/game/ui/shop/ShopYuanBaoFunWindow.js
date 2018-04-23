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
var ShopYuanBaoFunWindow = (function (_super) {
    __extends(ShopYuanBaoFunWindow, _super);
    function ShopYuanBaoFunWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopYuanBaoFunWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ShopYuanBaoFunWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.scroll = this.mParentWnd.scroll;
        if (this.scroll == null) {
            var group = this.mElemList["group_scroll"];
            this.scroll = UIScrollList.newObj(this.mLayoutNode, "tempScroll", 0, 0, group.width, group.height, group);
        }
        this.mParentWnd.scroll = this.scroll;
        this.select = 0;
    };
    ShopYuanBaoFunWindow.prototype.onUnLoad = function () {
    };
    ShopYuanBaoFunWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = true;
        this.mElemList["group_equip"].visible = false;
        this.onRefresh();
    };
    ShopYuanBaoFunWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = false;
    };
    ShopYuanBaoFunWindow.prototype.onRefresh = function () {
        var groupNameList = [
            ShopSystem.SHOP_YUANBAO, ShopSystem.SHOP_BANGYUAN, ShopSystem.SHOP_CHONGWU, ShopSystem.SHOP_XIANLV
        ];
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var groupName = groupNameList[index];
        this.mElemList["rd_limit"].visible = false;
        this.mElemList["group_richang"].visible = false;
        this.mElemList["rd_access"].visible = false;
        if (index == 2) {
            this.mElemList["group_richang"].visible = true;
            this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_CENTER);
            AddRdContent(this.mElemList["rd_1"], Localize_cns("SHOP_HAD_TXT8"), "ht_20_cc");
            this.mElemList["rd_1"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick, this);
        }
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
    ShopYuanBaoFunWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 2; i++) {
            var x = 290 * (i - 1);
            this.mElemList[name + "_shopBox" + i] = UIShopBox.newObj(this.mLayoutNode, name + "_shopBox" + i, x, 0, window);
        }
    };
    ShopYuanBaoFunWindow.prototype.refreshItemWindow = function (window, config, index) {
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
    ///------------响应事件
    ShopYuanBaoFunWindow.prototype.onAccessClick = function () {
        var wnd = WngMrg.getInstance().getWindow("DailyFrame");
        wnd.showWithIndex(2);
    };
    return ShopYuanBaoFunWindow;
}(BaseCtrlWnd));
__reflect(ShopYuanBaoFunWindow.prototype, "ShopYuanBaoFunWindow");
//# sourceMappingURL=ShopYuanBaoFunWindow.js.map