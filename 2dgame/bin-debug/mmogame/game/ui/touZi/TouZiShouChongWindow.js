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
var TouZiShouChongWindow = (function (_super) {
    __extends(TouZiShouChongWindow, _super);
    function TouZiShouChongWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouZiShouChongWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TouZiShouChongWindow.prototype.onLoad = function () {
        this.name = "Shouchong";
        this.mElemList = this.mParentWnd.mElemList;
        this.select = 0;
        this.mElemList["adv_pay_rd"].setAlignFlag(gui.Flag.CENTER_CENTER);
        for (var i = 0; i < 4; i++) {
            this.mElemList["pay_rd" + (i + 1)].setAlignFlag(gui.Flag.CENTER_CENTER);
            this.mElemList["pay_rd" + (i + 1)].touchEnabled = false;
        }
        var radioGroup = new eui.RadioButtonGroup();
        for (var i = 0; i < 4; i++) {
            var elem = this.mElemList["pay_tab" + i];
            elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
            elem.group = radioGroup;
            elem.value = i;
        }
        //奖励
        for (var i = 0; i < 6; i++) {
            this.mElemList[this.name + "itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, this.name + "itemBox_" + i, 72 * i, 0, this.mElemList["group_prize"], 0.9);
            //this.mElemList["itemBox_" + i].updateByEntry(20001)
        }
    };
    TouZiShouChongWindow.prototype.onUnLoad = function () {
    };
    TouZiShouChongWindow.prototype.onShow = function () {
        this.mElemList["group_tab_1"].visible = true;
        //RegisterEvent(EventDefine.PAY_FIRST_PAY, this.onRefresh, this)
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_charge", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onChargeClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        RpcProxy.call("C2G_SendOperatePlayerData", PayActivityIndex.FIRST_PAY); //获取玩家数据 领取之类的
        this.onRefresh();
        var _a;
    };
    TouZiShouChongWindow.prototype.onHide = function () {
        this.mElemList["group_tab_1"].visible = false;
        //UnRegisterEvent(EventDefine.PAY_FIRST_PAY, this.onRefresh, this)
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
    };
    TouZiShouChongWindow.prototype.onRefresh = function () {
        if (this.select == -1) {
            this.select = 1;
        }
        //let firstPayInfo = PaySystem.getInstance().getFristPayInfo();   //玩家领取信息
        var firstPayInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.FIRST_PAY);
        var radioBtn = this.mElemList["pay_tab" + this.select];
        radioBtn.selected = true;
        var config = GameConfig.FirstRechargeConfig;
        var prizeList = config[this.select].prize;
        var point = config[this.select].point;
        var itemList = AnalyPrizeFormat(prizeList);
        var iamgeName = "sc_zhanShiTu0" + ((tonumber(this.select)) + 1);
        this.mElemList["image_bg"].source = iamgeName;
        for (var i = 0; i < 4; i++) {
            var rmbNum = config[i].point / 10;
            var des = config[i].name;
            var str = String.format(Localize_cns("INVEST_TXT1"), rmbNum, des);
            AddRdContent(this.mElemList["pay_rd" + (i + 1)], str, "ht_20_cc_stroke", "white");
        }
        var value = config[this.select].value;
        var str1 = String.format(Localize_cns("INVEST_TXT2"), value);
        this.mElemList["label_value"].text = str1;
        for (var i = 0; i < 6; i++) {
            var v = itemList[i];
            if (v) {
                this.mElemList[this.name + "itemBox_" + i].updateByEntry(v[0], v[1]);
            }
            else {
                this.mElemList[this.name + "itemBox_" + i].updateByEntry(-1);
            }
        }
        var heroInfo = GetHeroPropertyInfo();
        var exp = heroInfo.VIP_exp;
        var vip = VipSystem.getInstance().GetVipLevel();
        var curVipExp = VipSystem.getInstance().getVipSum(vip);
        var sum = curVipExp + exp;
        var rdStr = String.format(Localize_cns("INVEST_TXT13"), sum);
        AddRdContent(this.mElemList["adv_pay_rd"], rdStr, "ht_20_cc", "white");
        var state = 0;
        var canGet = false; //是否完成任务
        var isGet = false; //是否已经领取了
        if (sum >= point) {
            canGet = true;
        }
        if (firstPayInfo && firstPayInfo[this.select]) {
            isGet = true;
        }
        if (canGet) {
            state = 2;
            this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT20");
            if (isGet) {
                state = 3;
                this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT21");
            }
        }
        else {
            state = 1;
            this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT19");
        }
        this.state = state; //当前状态
    };
    //打开充值界面or领取奖励
    TouZiShouChongWindow.prototype.onChargeClick = function () {
        //判断是否可以领取
        var index = tonumber(this.select);
        if (this.state == 1) {
            ExecuteMainFrameFunction("chongzhi");
        }
        else if (this.state == 2) {
            RpcProxy.call("C2G_GetOperateActivityPrize", PayActivityIndex.FIRST_PAY, [index]);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("INVEST_TXT21"));
        }
    };
    TouZiShouChongWindow.prototype.onTabSelected = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        if (this.select == index) {
            return;
        }
        this.select = index;
        this.onRefresh();
    };
    return TouZiShouChongWindow;
}(BaseCtrlWnd));
__reflect(TouZiShouChongWindow.prototype, "TouZiShouChongWindow");
//# sourceMappingURL=TouZiShouChongWindow.js.map