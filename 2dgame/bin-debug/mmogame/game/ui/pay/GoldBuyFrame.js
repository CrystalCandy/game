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
var GoldBuyFrame = (function (_super) {
    __extends(GoldBuyFrame, _super);
    function GoldBuyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoldBuyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/GoldBuyLayout.exml"];
        this.open_type = opItemUnit.FUNDS;
    };
    GoldBuyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "buy_btn", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickBuy, _a),
            (_b = {}, _b["name"] = "btn_close", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_close_top", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c;
    };
    GoldBuyFrame.prototype.onUnLoad = function () {
    };
    GoldBuyFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.JINGSHI_CHANGE_LIST_UPDATA, this.onRefresh, this);
        //查询
        var msg = GetMessage(opCodes.C2G_ACTIVE_DUIHUAN_SELECT);
        msg.index = this.open_type;
        SendGameMessage(msg, true);
        this.mLayoutNode.visible = true;
    };
    GoldBuyFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.JINGSHI_CHANGE_LIST_UPDATA, this.onRefresh, this);
        this.mLayoutNode.visible = false;
    };
    GoldBuyFrame.prototype.onRefresh = function (args) {
        var info = args.msg;
        this.costDiamond = info.cost;
        var rd1 = this.mElemList["info_rtxt"];
        var rd2 = this.mElemList["exchange_rtxt"];
        rd1.setAlignFlag(gui.Flag.H_CENTER);
        rd2.setAlignFlag(gui.Flag.H_CENTER);
        var limitCount = VipSystem.getInstance().getGoldOrPowerLimit(this.open_type);
        var heroInfo = GetHeroPropertyInfo();
        var gold = 0;
        for (var _ = 0; _ < opBuyFundsLevelConfig.length; _++) {
            var v = opBuyFundsLevelConfig[_];
            var minLevel = v[0];
            var maxLevel = v[1];
            var cost = v[2];
            if (heroInfo.level >= minLevel && heroInfo.level <= maxLevel) {
                gold = cost;
                break;
            }
        }
        AddRdContent(rd1, String.format(Localize_cns("PAY_GOLD_POWER_TIPS1"), limitCount), "ht_24_lc_stroke_zongse", "white");
        AddRdContent(rd2, String.format(Localize_cns("PAY_GOLD_POWER_SWOP1"), info.cost, gold), "ht_28_cc_stroke_zongse", "white");
        this.getGold = gold;
        this.mElemList["surplus_txt"].text = (String.format(Localize_cns("PAY_GOLD_POWER_SURPLUS"), info.count));
    };
    GoldBuyFrame.prototype.onClickBuy = function () {
        if (this.costDiamond > GetHeroProperty("gold")) {
            var t = {
                onDialogCallback: function (result, userData) {
                    if (result) {
                        var wnd = WngMrg.getInstance().getWindow("PayFrame");
                        //wnd.showWithIndex(2)
                    }
                }
            };
            MsgSystem.confirmDialog(Localize_cns("PAY_TXT17"), t, null);
            return;
        }
        var tipsTxt = null;
        var confirmType = null;
        tipsTxt = String.format(Localize_cns("PAY_TXT18"), this.costDiamond, this.getGold);
        confirmType = ConfirmFrom.BUY_GOLD;
        var t = {
            onDialogCallback: function (result, userData) {
                if (result) {
                    var msg = GetMessage(opCodes.C2G_ACTIVE_DUIHUAN);
                    msg.index = opItemUnit.FUNDS;
                    SendGameMessage(msg);
                    GameSound.getInstance().playEffect(SystemSound.effect_jiaoyi);
                }
            }
        };
        return MsgSystem.confirmDialog(tipsTxt, t, confirmType);
    };
    return GoldBuyFrame;
}(BaseWnd));
__reflect(GoldBuyFrame.prototype, "GoldBuyFrame");
//# sourceMappingURL=GoldBuyFrame.js.map