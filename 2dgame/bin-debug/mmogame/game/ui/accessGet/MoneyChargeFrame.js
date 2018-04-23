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
var MoneyChargeFrame = (function (_super) {
    __extends(MoneyChargeFrame, _super);
    function MoneyChargeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoneyChargeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/MoneyChargeLayout.exml"];
    };
    MoneyChargeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 447;
        this.mLayoutNode.height = 324;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_charge", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onChargeClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_money"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_cost"].setAlignFlag(gui.Flag.LEFT_CENTER);
        var _a, _b, _c;
    };
    MoneyChargeFrame.prototype.onUnLoad = function () {
    };
    MoneyChargeFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    MoneyChargeFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
    };
    MoneyChargeFrame.prototype.onRefresh = function () {
        this.item = false;
        this.twice = false;
        //rd_money
        var guankaId = CampaignSystem.getInstance().getCurOpenCampaign();
        var zhangjieId = GameConfig.CampaignConfig[guankaId]["chapterId"];
        var money = GameConfig.AutoFightMonsterConfig[zhangjieId]["funds"];
        money = money * 2 * 60 * 4;
        var moneyStr = String.format(Localize_cns("ACCESS_MONEY_GET"), money);
        AddRdContent(this.mElemList["rd_money"], moneyStr, "ht_24_cc", "ublack");
        //rd_cost
        var needId = 60045;
        var had = ItemSystem.getInstance().getItemCount(needId);
        this.item = had >= 1 ? true : false;
        var icon = GetTagIcon(needId);
        var yuanBaoStr = String.format(Localize_cns("ACCESS_MONEY_COST"), icon + had);
        AddRdContent(this.mElemList["rd_cost"], yuanBaoStr, "ht_24_cc", "ublack");
        //label_num
        var num = getSaveRecord(opSaveRecordKey.rmbGoldToFundsCount) || 0;
        var total = 5;
        var vip = GetHeroProperty("VIP_level");
        if (vip >= 4) {
            total += 2;
        }
        var twice = total - num;
        this.twice = num >= total ? false : true;
        var numStr = String.format(Localize_cns("ACCESS_TXT4"), twice);
        this.mElemList["label_num"].textColor = "ublack";
        this.mElemList["label_num"].text = numStr;
    };
    MoneyChargeFrame.prototype.onChargeClick = function () {
        if (this.item == false) {
            MsgSystem.addTagTips(Localize_cns("ACCESS_NOT_ENOUGH"));
            return;
        }
        if (this.twice == false) {
            MsgSystem.addTagTips(Localize_cns("ACCESS_NOT_TWICE"));
            return;
        }
        RpcProxy.call("C2G_EXCHANGE_FUNDS");
    };
    return MoneyChargeFrame;
}(BaseWnd));
__reflect(MoneyChargeFrame.prototype, "MoneyChargeFrame");
//# sourceMappingURL=MoneyChargeFrame.js.map