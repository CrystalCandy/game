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
var MonthCardWindow = (function (_super) {
    __extends(MonthCardWindow, _super);
    function MonthCardWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthCardWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MonthCardWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_month_card", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onMonthClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 8; i++) {
            this.mElemList["month_rd" + i].setAlignFlag(gui.Flag.H_CENTER);
        }
        this.mElemList["month_card_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a;
    };
    MonthCardWindow.prototype.onUnLoad = function () {
    };
    MonthCardWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab3"].visible = true;
        this.mElemList["btn_month_card"].visible = true;
        RpcProxy.call("C2G_MonthCardInfo"); //月卡信息
        this.onRefresh();
    };
    MonthCardWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab3"].visible = false;
        this.mElemList["btn_month_card"].visible = false;
        this.mElemList["month_card_rd"].visible = false;
    };
    MonthCardWindow.prototype.onRefresh = function () {
        var monthCardInfo = PaySystem.getInstance().getMonthCardInfo();
        this.mElemList["month_card_rd"].visible = false;
        if (monthCardInfo == undefined) {
            return;
        }
        for (var i = 1; i < 8; i++) {
            var text = Localize_cns("WELFARE_TXT" + (i + 8));
            AddRdContent(this.mElemList["month_rd" + i], text, "ht_20_cc", "black");
        }
        var isBuy = PaySystem.getInstance().isMonthCardActive();
        this.state = 1;
        var isGet = false;
        if (monthCardInfo.isGet == 1) {
            isGet = true;
        }
        this.mElemList["btn_month_card"].enabled = true;
        if (isBuy) {
            this.mElemList["month_card_rd"].visible = true;
            if (isGet) {
                this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT5");
                this.mElemList["btn_month_card"].enabled = false;
            }
            else {
                this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT4");
                this.state = 2;
            }
            var moncarCardTime = getSaveRecord(opSaveRecordKey.monthCard) || 0;
            var shengyuTime = moncarCardTime - GetServerTime();
            var t = simple_transform_time(shengyuTime);
            var text = String.format(Localize_cns("WELFARE_TXT29"), t.hours, t.mins);
            AddRdContent(this.mElemList["month_card_rd"], text, "ht_20_cc", "black");
        }
        else {
            this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT19");
        }
    };
    MonthCardWindow.prototype.onMonthClick = function () {
        //G2C_MonthCardInfo "过期时间,是否领取奖励"
        if (this.state == 1) {
            PaySystem.getInstance().payFromId(1000);
        }
        else if (this.state == 2) {
            RpcProxy.call("C2G_MonthCardPrize");
        }
        // let isBuy = PaySystem.getInstance().isMonthCardActive()
        // let isGet = false
        // if(isBuy){
        // 	if(isGet){
        // 		//tip 不过都置灰了
        // 	}else{
        // 	}
        // }else{
        // }
    };
    return MonthCardWindow;
}(BaseCtrlWnd));
__reflect(MonthCardWindow.prototype, "MonthCardWindow");
//# sourceMappingURL=MonthCardWindow.js.map