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
var WeekCardWindow = (function (_super) {
    __extends(WeekCardWindow, _super);
    function WeekCardWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeekCardWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    WeekCardWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "week_card_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onWeekClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 3; i++) {
            this.mElemList["week_rd" + i].setAlignFlag(gui.Flag.H_CENTER);
        }
        this.mElemList["week_card_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a;
    };
    WeekCardWindow.prototype.onUnLoad = function () {
    };
    WeekCardWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_WEEK_CARD, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab4"].visible = true;
        RpcProxy.call("C2G_WeekCardInfo"); //周卡信息
        this.onRefresh();
    };
    WeekCardWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_WEEK_CARD, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab4"].visible = false;
        this.mElemList["week_card_rd"].visible = false;
    };
    WeekCardWindow.prototype.onRefresh = function () {
        this.mElemList["week_card_rd"].visible = false;
        var weekCardInfo = PaySystem.getInstance().getWeekCardInfo();
        if (weekCardInfo == undefined) {
            return;
        }
        this.state = -1;
        for (var i = 1; i < 3; i++) {
            var text = Localize_cns("WELFARE_TXT" + (i + 15));
            AddRdContent(this.mElemList["week_rd" + i], text, "ht_20_cc", "black");
        }
        var isBuy = PaySystem.getInstance().isWeekCardActive();
        var isGet = false;
        if (weekCardInfo.isGet == 1) {
            isGet = true;
        }
        this.mElemList["week_card_btn"].enabled = true;
        if (isBuy) {
            this.mElemList["week_card_rd"].visible = true;
            if (isGet) {
                this.mElemList["week_card_btn"].text = Localize_cns("WELFARE_TXT5");
                this.mElemList["week_card_btn"].enabled = false;
                this.state = 3;
            }
            else {
                this.mElemList["week_card_btn"].text = Localize_cns("WELFARE_TXT4");
                this.state = 2;
            }
            var weekCardTime = getSaveRecord(opSaveRecordKey.weekCard) || 0;
            var shengyuTime = weekCardTime - GetServerTime();
            var t = simple_transform_time(shengyuTime);
            var text = String.format(Localize_cns("WELFARE_TXT29"), t.hours, t.mins);
            AddRdContent(this.mElemList["week_card_rd"], text, "ht_20_cc", "black");
        }
        else {
            this.mElemList["week_card_btn"].text = Localize_cns("WELFARE_TXT19");
            this.state = 1;
        }
    };
    //领取购买操作
    WeekCardWindow.prototype.onWeekClick = function () {
        if (this.state == 1) {
            PaySystem.getInstance().payFromId(1001);
        }
        else if (this.state == 2) {
            RpcProxy.call("C2G_WeekhCardPrize");
        }
    };
    return WeekCardWindow;
}(BaseCtrlWnd));
__reflect(WeekCardWindow.prototype, "WeekCardWindow");
//# sourceMappingURL=WeekCardWindow.js.map