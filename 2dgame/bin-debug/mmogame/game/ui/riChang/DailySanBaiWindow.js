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
var DailySanBaiWindow = (function (_super) {
    __extends(DailySanBaiWindow, _super);
    function DailySanBaiWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailySanBaiWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    DailySanBaiWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_oneKey", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onOneKeyClick, _a),
            (_b = {}, _b["name"] = "btn_kill", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onKillClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var k = 1; k <= 3; k++) {
            this.mElemList["group_" + k].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeClick, this);
        }
        var _a, _b;
    };
    DailySanBaiWindow.prototype.onUnLoad = function () {
    };
    DailySanBaiWindow.prototype.onShow = function () {
        this.mElemList["group_xiangYao"].visible = true;
        this.mElemList["title"].text = Localize_cns("DAILY_TXT3");
        this.onRefresh();
        RpcProxy.call("C2G_MEIRISANBAI_MonsterNum");
    };
    DailySanBaiWindow.prototype.onHide = function () {
        this.mElemList["group_xiangYao"].visible = false;
    };
    DailySanBaiWindow.prototype.updateWnd = function () {
        this.onRefresh();
    };
    DailySanBaiWindow.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getSanBaiInfo();
        //  this.mElemList["group_xiangYao"].visible = true;
        if (size_t(actInfo) == 0) {
            return;
        }
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var image = "rc_ztBg02";
        this.mElemList["image_bg"].source = image;
        for (var i = 1; i <= 3; i++) {
            if (i != (index + 1)) {
                this.mElemList["group_" + i + "_prize"].visible = false;
                this.mElemList["group_rd_" + i].visible = false;
            }
            else {
                this.mElemList["group_" + i + "_prize"].visible = true;
                this.mElemList["group_rd_" + i].visible = true;
            }
        }
        //
        var had = actInfo.curhuan;
        var twiceStr = String.format(Localize_cns("DAILY_TXT8"), had);
        AddRdContent(this.mElemList["rd_1_twice"], twiceStr, "ht_20_cc");
        var maxvalue = 300;
        had = MathUtil.clamp(had, 0, maxvalue);
        UiUtil.updateProgress(this.mElemList["progress"], had, maxvalue);
        var proStr = String.format(Localize_cns("ESCORT_TXT5"), had, maxvalue);
        this.mElemList["label_pro"].text = proStr;
        var state = actInfo.state;
        for (var k = 1; k <= 3; k++) {
            this.mElemList["image_select_" + k].visible = false;
            this.mElemList["sanbai_prize_get_" + k].visible = false;
        }
        //领取
        if (state != 0) {
            this.mElemList["sanbai_prize_get_" + state].visible = true;
        }
        //选中
        if (state != 3) {
            this.mElemList["image_select_" + (state + 1)].visible = true;
        }
        var canOneKey = (had == 300) ? true : false;
        var state1 = true;
        var state2 = false;
        var name1 = Localize_cns("DAILY_TXT9"); //"一键完成"
        var name2 = Localize_cns("DAILY_TXT13"); //"领取"
        if (had >= 100 && had < 200 && state < 1) {
            state2 = true;
        }
        else if (had >= 200 && had < 300 && state < 2) {
            state2 = true;
        }
        else if (had >= 300 && state < 3) {
            state2 = true;
        }
        if (canOneKey) {
            state1 = false;
        }
        for (var k = 1; k <= state; k++) {
            this.mElemList["sanbai_prize_get_" + k].visible = true;
        }
        if (actInfo.isVip == 1) {
            if (state != 3) {
                state2 = true;
            }
            else {
                state2 = false;
            }
            state1 = false;
        }
        this.mElemList["btn_oneKey"].text = name1;
        this.mElemList["btn_kill"].text = name2;
        this.mElemList["btn_oneKey"].enabled = state1;
        this.mElemList["btn_kill"].enabled = state2;
        //双倍奖励
        /*if(actInfo.prizeRatio == 2){
            this.mElemList["double_prize"].visible = true
        }else{
            this.mElemList["double_prize"].visible = false
        }*/
    };
    /////btn响应事件
    DailySanBaiWindow.prototype.onKillClick = function (args) {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        if (index != 2)
            return;
        RpcProxy.call("C2G_MEIRISANBAI_Get");
    };
    DailySanBaiWindow.prototype.onOneKeyClick = function (args) {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        if (index != 2)
            return;
        var actInfo = GetActivity(ActivityDefine.Boss).getSanBaiInfo();
        var tempConfig = GetActivity(ActivityDefine.Boss).getSanBaiConfigByLevel(GetHeroProperty("level"));
        if (tempConfig == null) {
            return;
        }
        var config = tempConfig[actInfo.state + 1];
        var VIP_level = GetHeroProperty("VIP_level");
        if (VIP_level < config.needVip) {
            MsgSystem.addTagTips(String.format(Localize_cns("DAILY_TXT14"), config.needVip));
            return;
        }
        var had = GetHeroMoney(config.unity);
        if (had < config.needNum) {
            MsgSystem.addTagTips(Localize_cns("COPY_TXT16"));
            return;
        }
        RpcProxy.call("C2G_MEIRISANBAI_YIJIAN");
        RpcProxy.call("C2G_MEIRISANBAI_MonsterNum");
    };
    DailySanBaiWindow.prototype.onPrizeClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var wnd = WngMrg.getInstance().getWindow("DailyPrizeTipsFrame");
        wnd.onShowWnd(tonumber(index));
    };
    return DailySanBaiWindow;
}(BaseCtrlWnd)); // TypeScript file
__reflect(DailySanBaiWindow.prototype, "DailySanBaiWindow");
//# sourceMappingURL=DailySanBaiWindow.js.map