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
var ClubExchangeFrame = (function (_super) {
    __extends(ClubExchangeFrame, _super);
    function ClubExchangeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubExchangeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubExchangeLayout.exml"];
        this.array = [];
    };
    ClubExchangeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "reset_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickReset, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 4; i++) {
            this.mElemList["itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, 0, 0, this.mElemList["item_pos" + i]);
            this.mElemList["cost_rd" + i].setAlignFlag(gui.Flag.H_CENTER);
            var btn = this.mElemList["exchange_btn" + i];
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickExchange, this);
        }
        AddRdContent(this.mElemList["reset_rd"], "#YUANBAO 180", "ht_24_cc", "saddlebrown");
        var _a, _b, _c;
    };
    ClubExchangeFrame.prototype.onUnLoad = function () {
    };
    ClubExchangeFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.CLUB_EXCHANGE, this.refreshFrame, this);
        this.mLayoutNode.setDoModal(true);
        this.mLayoutNode.visible = true;
        RpcProxy.call("C2G_FactionExchangeItemList", 0);
        this.refreshFrame();
    };
    ClubExchangeFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CLUB_EXCHANGE, this.refreshFrame, this);
        this.mLayoutNode.setDoModal(false);
        this.mLayoutNode.visible = false;
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    ClubExchangeFrame.prototype.refreshFrame = function () {
        var exchangeInfo = GetActivity(ActivityDefine.ClubMap).getExchangeData();
        var array = exchangeInfo.array || [];
        var count = exchangeInfo.count || 0;
        var time = exchangeInfo.time || 0;
        this.array = array;
        if (time == 0) {
            return;
        }
        for (var i = 0; i < 4; i++) {
            if (array[i]) {
                this.mElemList["item_wnd" + i].visible = true;
                this.refreshExchangeItem(array[i], i);
                var config = GameConfig.FactionExchangeConfig[array[i]].exchange;
                this.refreshExchangeCostItem(config, i);
            }
            else {
                this.mElemList["item_wnd" + i].visible = false;
            }
        }
        //更新倒计时和次数
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        var _this = this;
        this.timer = SetTimer(function () {
            var left = time - GetServerTime();
            if (left < 0) {
                left = 0;
                KillTimer(this.timer);
                this.timer = null;
                RpcProxy.call("C2G_FactionExchangeItemList", 0);
            }
            var str = String.format(Localize_cns("CLUB_TXT108"), getFormatDiffTime(left), count);
            AddRdContent(_this.mElemList["refresh_rd"], str, "ht_24_cc", "saddlebrown", 3);
        }, this, 200, false);
    };
    ClubExchangeFrame.prototype.refreshExchangeItem = function (itemId, index) {
        var itemName = ItemSystem.getInstance().getItemName(itemId);
        var itemQuality = ItemSystem.getInstance().getItemTemplateInfoValue(itemId, "quality");
        if (this.mElemList["itemBox_" + index]) {
            this.mElemList["itemBox_" + index].updateByEntry(itemId);
        }
        if (this.mElemList["item_name" + index]) {
            this.mElemList["item_name" + index].text = itemName;
            this.mElemList["item_name" + index].textColor = GetQualityGUIColor(itemQuality);
        }
    };
    ClubExchangeFrame.prototype.refreshExchangeCostItem = function (itemConfig, index) {
        var itemList = AnalyPrizeFormat(itemConfig);
        var str = "";
        for (var i in itemList) {
            var item = itemList[i];
            var itemId = item[0];
            var itemCount = item[1];
            var ownCount = ItemSystem.getInstance().getItemCount(itemId);
            var itemName = ItemSystem.getInstance().getItemName(itemId);
            str = itemName + "#space" + ownCount + "/" + itemCount + "#br";
        }
        if (this.mElemList["cost_rd" + index]) {
            AddRdContent(this.mElemList["cost_rd" + index], str, "ht_20_cc", "saddlebrown", 3);
        }
    };
    ClubExchangeFrame.prototype.onClickExchange = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        if (this.array[index]) {
            RpcProxy.call("C2G_FactionExchangeItem", this.array[index]);
        }
    };
    ClubExchangeFrame.prototype.onClickReset = function () {
        var callback = {
            onDialogCallback: function (result, userData) {
                if (result == true) {
                    RpcProxy.call("C2G_FactionExchangeItemList", 1);
                }
            }
        };
        MsgSystem.confirmDialog(Localize_cns("CLUB_TXT109"), callback, null);
    };
    return ClubExchangeFrame;
}(BaseWnd));
__reflect(ClubExchangeFrame.prototype, "ClubExchangeFrame");
//# sourceMappingURL=ClubExchangeFrame.js.map