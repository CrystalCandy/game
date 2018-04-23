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
var TodayGiftsFrame = (function (_super) {
    __extends(TodayGiftsFrame, _super);
    function TodayGiftsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodayGiftsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/payActivity/TodayGiftsLayout.exml"];
        this.mActivityIndex = PayActivityIndex.DAILY_EXPENSIVE_GIFT;
    };
    TodayGiftsFrame.prototype.onLoad = function () {
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
    TodayGiftsFrame.prototype.onUnLoad = function () {
    };
    TodayGiftsFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        // this.mDeadLine = GetTomorrowTime(GetServerTime())
        // this.mTimerId = SetTimer(this.onTimerCallback, this, 1000, true);
        RpcProxy.call("C2G_SendOperatePlayerData", this.mActivityIndex);
    };
    TodayGiftsFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        // if(this.mTimerId){
        // 	KillTimer(this.mTimerId)
        // 	this.mTimerId = null;
        // }
        this.mLayoutNode.visible = false;
    };
    // onTimerCallback(dt){
    // 	let nowTime = GetServerTime()
    // 	if(nowTime > this.mDeadLine){
    // 		this.mDeadLine = GetTomorrowTime(GetServerTime())
    // 	}
    // 	let diff = this.mDeadLine - nowTime
    // 	if(diff < 0)
    // 		diff = 0
    // 	let str = String.format(Localize_cns("ACTIVITY_PAY_TXT15"), getFormatDiffTime(diff))
    // 	this.mElemList["label_time"].text = str
    // }
    TodayGiftsFrame.prototype.refreshFrame = function () {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex);
        if (playerInfo == null)
            return;
        var dayNum = playerInfo[0]; //真实的天数
        var isGet = playerInfo[1]; //0未领取 //1已领取
        var trueDay = 0;
        if (dayNum != 18 && dayNum > 18) {
            trueDay = (dayNum % 18);
        }
        else {
            trueDay = dayNum;
        }
        var config = GameConfig.DailyExpensiveGiftConfig[trueDay];
        if (config == null)
            return;
        var itemList = config.prize;
        for (var i = 0; i < 6; i++) {
            var itemBox = this.mElemList["itemBox" + i];
            var prize = itemList[i];
            if (prize) {
                itemBox.setVisible(true);
                itemBox.updateByEntry(prize[1], prize[2]);
            }
            else {
                itemBox.setVisible(false);
            }
        }
        //更新充值多少钱
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        var rmb = GetRmbFromGold(dailyPayCount);
        AddRdContent(this.mElemList["rd_payinfo"], String.format(Localize_cns("ACTIVITY_PAY_TXT14"), rmb), "ht_24_cc_stroke", "white");
        var btn = this.mElemList["btn_pay"];
        btn.enabled = true;
        if (dailyPayCount < opLimitTimeActive.stageUpNeedMoney) {
            btn.text = Localize_cns("ACTIVITY_PAY_TXT16");
        }
        else {
            btn.text = Localize_cns("ACTIVITY_PAY_TXT17");
            if (isGet) {
                btn.enabled = false;
                btn.text = Localize_cns("ACTIVITY_PAY_TXT7");
            }
        }
    };
    TodayGiftsFrame.prototype.onClickGetPrize = function (args) {
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        if (dailyPayCount < opLimitTimeActive.stageUpNeedMoney) {
            ExecuteMainFrameFunction("chongzhi");
        }
        else {
            RpcProxy.call("C2G_GetOperateActivityPrize", this.mActivityIndex, {});
        }
    };
    return TodayGiftsFrame;
}(BaseWnd));
__reflect(TodayGiftsFrame.prototype, "TodayGiftsFrame");
//# sourceMappingURL=TodayGiftsFrame.js.map