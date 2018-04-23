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
var ShopEquipFunWindow = (function (_super) {
    __extends(ShopEquipFunWindow, _super);
    function ShopEquipFunWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopEquipFunWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ShopEquipFunWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.scroll = this.mParentWnd.scroll;
        if (this.scroll == null) {
            var group = this.mElemList["group_scroll"];
            this.scroll = UIScrollList.newObj(this.mLayoutNode, "tempScroll", 0, 0, group.width, group.height, group);
        }
        this.mParentWnd.scroll = this.scroll;
        this.select = 0;
    };
    ShopEquipFunWindow.prototype.onUnLoad = function () {
    };
    ShopEquipFunWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = true;
        this.mElemList["group_equip"].visible = false;
        this.onRefresh();
    };
    ShopEquipFunWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = false;
    };
    ShopEquipFunWindow.prototype.onRefresh = function () {
        var groupNameList = [
            ShopSystem.SHOP_ZHUANGBEI, ShopSystem.SHOP_LEIYIN, ShopSystem.SHOP_BANGHUI, ShopSystem.FULI_BANGHUI
        ];
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var groupName = groupNameList[index];
        //显示头部 ----消耗品 通关条件等
        this.mElemList["rd_access"].visible = false;
        this.mElemList["group_richang"].visible = false;
        if (index == 3) {
            this.mElemList["rd_limit"].visible = false;
        }
        else {
            this.mElemList["rd_limit"].visible = true;
            var hadLimit = ShopSystem.getInstance().getHeroJudge(opJudgeJieSuo.GAMECASENUM);
            var limitStr = Localize_cns("SHOP_HAD_TXT1") + hadLimit;
            if (index == 2) {
                limitStr = Localize_cns("SHOP_HAD_TXT2");
            }
            AddRdContent(this.mElemList["rd_limit"], "#lime" + limitStr, "ht_20_cc");
        }
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
    ShopEquipFunWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 2; i++) {
            var x = 290 * (i - 1);
            this.mElemList[name + "_shopBox" + i] = UIShopBox.newObj(this.mLayoutNode, name + "_shopBox" + i, x, 0, window);
        }
    };
    ShopEquipFunWindow.prototype.refreshItemWindow = function (window, config, index) {
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
    return ShopEquipFunWindow;
}(BaseCtrlWnd));
__reflect(ShopEquipFunWindow.prototype, "ShopEquipFunWindow");
//# sourceMappingURL=ShopEquipFunWindow.js.map