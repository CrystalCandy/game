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
var GoodsAsseceFrame = (function (_super) {
    __extends(GoodsAsseceFrame, _super);
    function GoodsAsseceFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoodsAsseceFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/GoodsAsseceLayout.exml"];
        this.itemId = -1;
        this.index = -1;
        this.price = 100;
    };
    GoodsAsseceFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //	this.mLayoutNode.width = 514
        //	this.mLayoutNode.height = 332
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_buy", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onBuyClick, _c),
            (_d = {}, _d["name"] = "btn_charge", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onChargeClick, _d),
            (_e = {}, _e["name"] = "btn_plus", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onPlusClick, _e),
            (_f = {}, _f["name"] = "btn_plus10", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onPlus10Click, _f),
            (_g = {}, _g["name"] = "btn_cut", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onCutClick, _g),
            (_h = {}, _h["name"] = "btn_cut10", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onCut10Click, _h),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 5, this.mElemList["group_item"]);
        this.mElemList["rd_whole"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_access"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    GoodsAsseceFrame.prototype.onUnLoad = function () {
    };
    GoodsAsseceFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    GoodsAsseceFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.itemId = -1;
        this.shopEntry = null;
    };
    GoodsAsseceFrame.prototype.onRefresh = function () {
        //common
        if (this.itemId > 0) {
            this.mElemList["itemBox"].updateByEntry(this.itemId);
        }
        else {
            return;
        }
        var color = GetItemFontColor(this.itemId);
        var nameStr = "#" + color + GameConfig.itemConfig[this.itemId].name;
        var isBuy = false;
        //
        var item = GameConfig.itemConfig[this.itemId];
        this.shopEntry = item.shopEntry;
        isBuy = this.shopEntry == 0 ? false : true;
        if (!isBuy) {
            this.mLayoutNode.height = 332;
        }
        else {
            this.mLayoutNode.height = 608;
            this.num = this.num || 1;
            //this.shopEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName)
            var itemList = ShopSystem.getInstance().getShopItemList(this.shopEntry);
            for (var k in itemList) {
                var item_1 = itemList[k];
                if (item_1.itemEntry == this.itemId) {
                    this.index = tonumber(k);
                }
            }
            var item_2 = itemList[this.index];
            this.price = item_2.price / item_2.buyNumber;
            this.unit = item_2.money;
            //rd_name
            var money = this.price;
            nameStr += "#br#br" + GetMoneyIcon(this.unit) + "#lime" + money;
            //rd_access
            AddRdContent(this.mElemList["rd_access"], Localize_cns("ACCESS_TXT10"), "ht_24_cc");
            this.onRefreshWholeMoney(this.num);
        }
        this.mLayoutNode.width = 514;
        this.mElemList["group_1"].visible = isBuy;
        AddRdContent(this.mElemList["rd_name"], nameStr, "ht_24_cc");
    };
    GoodsAsseceFrame.prototype.onRefreshWholeMoney = function (num) {
        //label_num
        this.mElemList["label_num"].text = num;
        //rd_whole
        var wholeMoney = num * this.price;
        var wholeStr = GetMoneyIcon(this.unit) + wholeMoney;
        AddRdContent(this.mElemList["rd_whole"], wholeStr, "ht_24_cc", "ublack");
    };
    ///////------------响应事件
    GoodsAsseceFrame.prototype.onChargeClick = function () {
        ExecuteMainFrameFunction("chongzhi");
        this.hideWnd();
    };
    GoodsAsseceFrame.prototype.onBuyClick = function () {
        var itemList = ShopSystem.getInstance().getShopItemList(this.shopEntry);
        var item = itemList[this.index];
        var money = GetHeroMoney(this.unit);
        if (money < this.num * this.price) {
            var tips = this.unit == 2 ? Localize_cns("LUCKY_TXT3") : Localize_cns("LUCKY_TXT4");
            MsgSystem.addTagTips(tips);
            return;
        }
        RpcProxy.call("C2G_SHOP_BUT_ITEM", this.shopEntry, item.Index, this.num);
    };
    GoodsAsseceFrame.prototype.onPlusClick = function () {
        var money = GetHeroMoney(this.unit);
        if (money < (this.num + 1) * this.price)
            return;
        this.num = this.num + 1;
        this.onRefreshWholeMoney(this.num);
    };
    GoodsAsseceFrame.prototype.onPlus10Click = function () {
        var money = GetHeroMoney(this.unit);
        if (money < (this.num + 10) * this.price)
            return;
        this.num = this.num + 10;
        this.onRefreshWholeMoney(this.num);
    };
    GoodsAsseceFrame.prototype.onCutClick = function () {
        this.num = this.num - 1;
        if (this.num <= 1)
            this.num = 1;
        this.onRefreshWholeMoney(this.num);
    };
    GoodsAsseceFrame.prototype.onCut10Click = function () {
        this.num = this.num - 10;
        if (this.num <= 1)
            this.num = 1;
        this.onRefreshWholeMoney(this.num);
    };
    GoodsAsseceFrame.prototype.onShowWnd = function (entryId, num) {
        this.itemId = entryId;
        this.num = num;
        this.showWnd();
    };
    return GoodsAsseceFrame;
}(BaseWnd));
__reflect(GoodsAsseceFrame.prototype, "GoodsAsseceFrame");
//# sourceMappingURL=GoodsAsseceFrame.js.map