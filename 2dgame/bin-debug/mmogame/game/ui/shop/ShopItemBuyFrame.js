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
var ShopItemBuyFrame = (function (_super) {
    __extends(ShopItemBuyFrame, _super);
    function ShopItemBuyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopItemBuyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ShopItemBuyLayout.exml"];
        this.num = 1;
    };
    ShopItemBuyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 532;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_buy", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onBtnBuyClick, _c),
            (_d = {}, _d["name"] = "btn_add", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onAddClick, _d),
            (_e = {}, _e["name"] = "btn_add10", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onAddClick, _e),
            (_f = {}, _f["name"] = "btn_add50", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onAddClick, _f),
            (_g = {}, _g["name"] = "btn_reduce", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onReduceClick, _g),
            (_h = {}, _h["name"] = "btn_reduce10", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onReduceClick, _h),
            (_j = {}, _j["name"] = "btn_reduce50", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onReduceClick, _j),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 2, this.mElemList["group_item"]);
        this.mElemList["rd_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    ShopItemBuyFrame.prototype.onUnLoad = function () {
    };
    ShopItemBuyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    ShopItemBuyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ShopItemBuyFrame.prototype.onRefresh = function () {
        this.num = 1;
        ////装备跟非装备
        if (this.shopEntry >= 5 && this.shopEntry <= 16) {
            this.mElemList["group_equip"].visible = true;
        }
        else {
            this.mElemList["group_equip"].visible = false;
        }
        var tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos];
        var itemId = tempConfig.itemEntry;
        var itemConfig = GameConfig.itemConfig[itemId];
        var name = itemConfig.name;
        var count = tempConfig.buyNumber;
        var quality = tempConfig.quality;
        var limitTice = ShopSystem.getInstance().getLimitTwice(this.shopEntry, this.pos);
        var hadBuy = 0;
        var tempInfo = ShopSystem.getInstance().getShopPosInfo(this.shopEntry, this.pos);
        if (tempInfo != null) {
            hadBuy = tempInfo.count;
        }
        //item
        this.mElemList["itemBox"].updateByEntry(itemId, count, quality);
        var nameStr = Localize_cns("SHOP_TXT4");
        if (limitTice != 0) {
            nameStr = "#green(" + hadBuy + "/" + limitTice + ")";
        }
        AddRdContent(this.mElemList["rd_name"], name + "#br#br" + nameStr, "ht_20_cc", "black");
        //描述
        var des = itemConfig.description || Localize_cns("SHOP_TXT7");
        AddRdContent(this.mElemList["rd_des"], des, "ht_20_cc", "black");
        //num
        this.onRefreshSelectNum();
    };
    ShopItemBuyFrame.prototype.onRefreshSelectNum = function () {
        this.mElemList["label_num"].text = this.num;
        var tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos];
        var count = tempConfig.buyNumber;
        var costIcon;
        if (tempConfig.money != null) {
            costIcon = GetMoneyIcon(tempConfig.money);
        }
        else {
            costIcon = GetTagIcon(tempConfig.unit);
        }
        //价格
        var totalPrice = tempConfig.price * count * this.num;
        AddRdContent(this.mElemList["rd_cost"], Localize_cns("SHOP_TIPS_TXT2") + costIcon + "X" + totalPrice, "ht_20_cc", "black");
    };
    //////////////响应
    ShopItemBuyFrame.prototype.onAddClick = function (args) {
        var btnName = args.target.name;
        var tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos];
        var count = tempConfig.buyNumber;
        var limitTice = ShopSystem.getInstance().getLimitTwice(this.shopEntry, this.pos);
        if (this.num > limitTice && limitTice != 0)
            return;
        var had;
        var cost; //= tempConfig.price * count * this.num
        if (tempConfig.money != 0) {
            had = GetHeroMoney(tempConfig.money);
        }
        else {
            had = ItemSystem.getInstance().getItemCount(tempConfig.unit);
        }
        if (had <= 0)
            return;
        if (btnName == "btn_add") {
            cost = tempConfig.price * count * (this.num + 1);
            if (had < cost)
                return;
            if (limitTice != 0) {
                if (this.num + 1 > limitTice)
                    return;
            }
            this.num += 1;
            this.onRefreshSelectNum();
        }
        else if (btnName == "btn_add10") {
            cost = tempConfig.price * count * (this.num + 10);
            if (had < cost)
                return;
            if (limitTice != 0) {
                if (this.num + 10 > limitTice)
                    return;
            }
            this.num += 10;
            this.onRefreshSelectNum();
        }
        else if (btnName == "btn_add50") {
            cost = tempConfig.price * count * (this.num + 50);
            if (had < cost)
                return;
            if (limitTice != 0) {
                if (this.num + 50 > limitTice)
                    return;
            }
            this.num += 50;
            this.onRefreshSelectNum();
        }
    };
    ShopItemBuyFrame.prototype.onReduceClick = function (args) {
        var btnName = args.target.name;
        if (btnName == "btn_reduce") {
            if ((this.num - 1) <= 0)
                return;
            this.num -= 1;
            this.onRefreshSelectNum();
        }
        else if (btnName == "btn_reduce10") {
            if ((this.num - 10) <= 0)
                return;
            this.num -= 10;
            this.onRefreshSelectNum();
        }
        else if (btnName == "btn_reduce50") {
            if ((this.num - 50) <= 0)
                return;
            this.num -= 50;
            this.onRefreshSelectNum();
        }
    };
    ShopItemBuyFrame.prototype.onBtnBuyClick = function () {
        var tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos];
        var had;
        var count = tempConfig.buyNumber;
        var cost = tempConfig.price * count * this.num;
        var id = tempConfig.unit;
        var unit = tempConfig.money;
        if (unit != 0) {
            had = GetHeroMoney(unit);
            if (had < cost) {
                var formatStr = "";
                if (unit == 2) {
                    formatStr = Localize_cns("BIND_YUANBAO");
                }
                else if (unit == 3) {
                    formatStr = Localize_cns("YUANBAO");
                }
                else if (unit == 1) {
                    formatStr = Localize_cns("JINBI");
                }
                MsgSystem.addTagTips(String.format(Localize_cns("SHOP_TIPS_TXT1"), formatStr));
                return;
            }
        }
        else {
            had = ItemSystem.getInstance().getItemCount(id);
            if (had < cost) {
                var name_1 = GameConfig.itemConfig[id].name;
                MsgSystem.addTagTips(String.format(Localize_cns("SHOP_TIPS_TXT1"), name_1));
                return;
            }
        }
        // "C2G_SHOP_BUT_ITEM":"uint32;uint32;uint32",
        RpcProxy.call("C2G_SHOP_BUT_ITEM", this.shopEntry, this.pos, this.num);
        this.hideWnd();
    };
    ////----------------接口
    ShopItemBuyFrame.prototype.onShowWnd = function (shopEntry, index) {
        this.shopEntry = shopEntry;
        this.pos = index;
        this.showWnd();
    };
    return ShopItemBuyFrame;
}(BaseWnd));
__reflect(ShopItemBuyFrame.prototype, "ShopItemBuyFrame");
//# sourceMappingURL=ShopItemBuyFrame.js.map