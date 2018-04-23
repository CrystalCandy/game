// TypeScript file
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
var PayStageUpFrame = (function (_super) {
    __extends(PayStageUpFrame, _super);
    function PayStageUpFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayStageUpFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/payActivity/PayStageUpLayout.exml"];
        this.mActivityIndex = PayActivityIndex.STAGE_UP;
    };
    PayStageUpFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_pay", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickGetPrize, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var parent = this.mElemList["group_prize"];
        for (var i = 0; i < 6; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mElemList, "itemBox" + i, 0, 0, parent);
            //this.mElemList[name + "itemBox" + i].updateByEntry(SpecailItemId.FUNDS, 1000)
        }
        var rd = this.mElemList["rd_payinfo"];
        rd.setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
    };
    PayStageUpFrame.prototype.onUnLoad = function () {
    };
    PayStageUpFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        this.mDeadLine = GetTomorrowTime(GetServerTime());
        this.mTimerId = SetTimer(this.onTimerCallback, this, 1000, true);
        RpcProxy.call("C2G_SendOperatePlayerData", this.mActivityIndex);
    };
    PayStageUpFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        if (this.mTimerId) {
            KillTimer(this.mTimerId);
            this.mTimerId = null;
        }
        this.mLayoutNode.visible = false;
    };
    PayStageUpFrame.prototype.onTimerCallback = function (dt) {
        var nowTime = GetServerTime();
        if (nowTime > this.mDeadLine) {
            this.mDeadLine = GetTomorrowTime(GetServerTime());
        }
        var diff = this.mDeadLine - nowTime;
        if (diff < 0)
            diff = 0;
        var str = String.format(Localize_cns("ACTIVITY_PAY_TXT15"), getFormatDiffTime(diff));
        this.mElemList["label_time"].text = str;
    };
    PayStageUpFrame.prototype.refreshFrame = function () {
        //local sendData = {realDayIndex,  getReward} --{真实的第几天,  今日是否领取0没有1领取了}
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex);
        if (playerInfo == null)
            return;
        var loginDay = playerInfo[0];
        var getReward = playerInfo[1];
        var config = GameConfig.StageUpConfig[loginDay];
        if (config == null)
            return;
        var prize_list = AnalyPrizeFormat(config.prize);
        for (var i = 0; i < 6; i++) {
            var itemBox = this.mElemList["itemBox" + i];
            var prize = prize_list[i];
            if (prize) {
                itemBox.setVisible(true);
                itemBox.updateByEntry(prize[0], prize[1]);
            }
            else {
                itemBox.setVisible(false);
            }
        }
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        var rmb = GetRmbFromGold(dailyPayCount);
        AddRdContent(this.mElemList["rd_payinfo"], String.format(Localize_cns("ACTIVITY_PAY_TXT14"), rmb), "ht_24_cc_stroke", "white");
        var btn = this.mElemList["btn_pay"];
        btn.enabled = true;
        this.mElemList["group_time"].visible = true;
        if (dailyPayCount < opLimitTimeActive.stageUpNeedMoney) {
            btn.text = Localize_cns("ACTIVITY_PAY_TXT16");
        }
        else {
            if (getReward == 0) {
                btn.text = Localize_cns("ACTIVITY_PAY_TXT17");
            }
            else {
                btn.enabled = false;
                btn.text = Localize_cns("ACTIVITY_PAY_TXT7");
                this.mElemList["group_time"].visible = false;
            }
        }
    };
    PayStageUpFrame.prototype.onClickGetPrize = function (args) {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex);
        if (playerInfo == null)
            return;
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        if (dailyPayCount < opLimitTimeActive.stageUpNeedMoney) {
            ExecuteMainFrameFunction("chongzhi");
            return;
        }
        var name = args.target.name;
        RpcProxy.call("C2G_GetOperateActivityPrize", this.mActivityIndex, {});
    };
    return PayStageUpFrame;
}(BaseWnd));
__reflect(PayStageUpFrame.prototype, "PayStageUpFrame");
//# sourceMappingURL=PayStageUpFrame.js.map