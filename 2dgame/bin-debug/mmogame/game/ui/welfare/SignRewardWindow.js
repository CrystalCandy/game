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
var SignRewardWindow = (function (_super) {
    __extends(SignRewardWindow, _super);
    function SignRewardWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignRewardWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.isCreatScrollList = false;
    };
    SignRewardWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_sign_get", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onSignGetClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["reward_list"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        this.mElemList["sign_itemBox"] = UIItemBox.newObj(this.mElemList, "sign_itemBox", 0, 0, this.mElemList["sign_reward_item_group"], 0.9);
        var _a;
    };
    SignRewardWindow.prototype.onUnLoad = function () {
    };
    SignRewardWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab1"].visible = true;
        // RpcProxy.call("C2G_SendOperatePlayerData",PayActivityIndex.INVEST_PLAN)
        this.onRefresh();
    };
    SignRewardWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab1"].visible = false;
    };
    SignRewardWindow.prototype.onRefresh = function () {
        var meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao);
        // if(meiRiInfo == null){
        // 	return
        // }
        var startTime = meiRiInfo.starttime;
        var day = meiRiInfo.times; //个人登陆
        if (day == 0) {
            day = 1;
        }
        var trueDay = day;
        var getPrize = meiRiInfo.getPrize;
        this.getPrize = getPrize;
        var serverDay = GetServerDay() || 0; //开服多少天
        if (serverDay == 0) {
            serverDay = 1;
        }
        var meiriConfig = GameConfig.meiRiQianDaoConfig;
        var gerenConfig = meiriConfig[1];
        var gerenLength = size_t(gerenConfig);
        var quanfuConfig = meiriConfig[2];
        var quanfuLength = size_t(quanfuConfig);
        if (day != gerenLength && day > gerenLength) {
            day = gerenLength % day;
        }
        if (serverDay != quanfuLength && serverDay > quanfuLength) {
            serverDay = quanfuLength % serverDay;
        }
        var quanfuInfo = quanfuConfig[serverDay];
        var rewardInfo = [
            (_a = {}, _a["index"] = dailyPrizeType.dailyLogin, _a),
            (_b = {}, _b["index"] = dailyPrizeType.vipLogin, _b),
            (_c = {}, _c["index"] = dailyPrizeType.rechangeLogin, _c),
        ];
        this.nameToIndex = [];
        for (var i = 0; i < size_t(rewardInfo); i++) {
            var v = quanfuInfo;
            var index = rewardInfo[i].index;
            var window_1 = this.scroll.getItemWindow(i, 565, 145, 0, 0, 5);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, index);
        }
        this.scroll.refreshScroll();
        this.scroll.restoreViewXY();
        var signCanGet = false;
        if (getPrize[dailyPrizeType.accumulateLogin] == 0) {
            signCanGet = true;
        }
        else {
            day = day - 1;
            trueDay = trueDay - 1;
        }
        var gerenInfo = gerenConfig[day];
        var prizeList = gerenInfo.award;
        var itemList = AnalyPrizeFormat(prizeList)[0];
        this.mElemList["sign_itemBox"].updateByEntry(itemList[0], itemList[1]);
        this.mElemList["btn_sign_get"].enabled = false;
        if (signCanGet) {
            this.mElemList["btn_sign_get"].text = Localize_cns("WELFARE_TXT4");
            this.mElemList["btn_sign_get"].enabled = true;
        }
        else {
            this.mElemList["btn_sign_get"].text = Localize_cns("WELFARE_TXT5");
        }
        var curSignDay = trueDay;
        // if(signCanGet){
        // 	curSignDay = curSignDay - 1
        // }
        this.mElemList["sign_day_text"].text = String.format(Localize_cns("WELFARE_TXT2"), curSignDay);
        this.mElemList["sign_day_git_text"].text = String.format(Localize_cns("WELFARE_TXT2"), curSignDay);
        var _a, _b, _c;
    };
    SignRewardWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = 555, height = 135;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 5, _a["y"] = 5, _a["w"] = width, _a["h"] = height, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "bg1", _b["parent"] = name + "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_uiDi03", _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "tip_bg", _c["parent"] = name + "bg", _c["title"] = null, _c["font"] = null, _c["image"] = "fldt_biaoTiDi01", _c["color"] = null, _c["x"] = 10, _c["y"] = 10, _c["w"] = 336, _c["h"] = 32, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "tip", _d["parent"] = name + "tip_bg", _d["title"] = "", _d["font"] = "ht_24_cc", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 336, _d["h"] = 32, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "getBtn", _e["title"] = "", _e["font"] = "ht_20_cc_stroke", _e["image"] = "ty_tongYongBt3", _e["color"] = gui.Color.white, _e["x"] = 395, _e["y"] = 40, _e["w"] = 117, _e["h"] = 51, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClick, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = name + "btnTips", _f["parent"] = name + "getBtn", _f["title"] = "", _f["font"] = "ht_20_lc", _f["image"] = "zjm_hongDian01", _f["color"] = gui.Color.white, _f["x"] = 77, _f["y"] = 0, _f["w"] = 40, _f["h"] = 40, _f["event_name"] = null, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mElemList, name + "itemBox" + i, i * 85 + 15, 50, this.mElemList[name + "bg"], 0.9);
        }
        var _a, _b, _c, _d, _e, _f;
    };
    SignRewardWindow.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        var itemList = AnalyPrizeFormat(data.award);
        for (var i = 0; i < 4; i++) {
            var itemInfo = itemList[i];
            if (itemInfo) {
                this.mElemList[name + "itemBox" + i].updateByEntry(itemInfo[0], itemInfo[1]);
            }
            else {
                this.mElemList[name + "itemBox" + i].updateByEntry(-1);
            }
        }
        var canGet = false;
        if (index == dailyPrizeType.dailyLogin) {
            this.mElemList[name + "tip"].text = Localize_cns("WELFARE_TXT6");
            canGet = this.checkSignReward();
        }
        else if (index == dailyPrizeType.vipLogin) {
            this.mElemList[name + "tip"].text = Localize_cns("WELFARE_TXT20");
            canGet = this.checkVipReward();
        }
        else if (index == dailyPrizeType.rechangeLogin) {
            this.mElemList[name + "tip"].text = Localize_cns("WELFARE_TXT21");
            canGet = this.checkPayReward();
        }
        var isGet = false;
        if (this.getPrize[index] == 1) {
            isGet = true;
        }
        this.mElemList[name + "getBtn"].enabled = false;
        this.mElemList[name + "btnTips"].visible = false;
        if (isGet) {
            this.mElemList[name + "getBtn"].text = Localize_cns("WELFARE_TXT5");
        }
        else {
            this.mElemList[name + "getBtn"].text = Localize_cns("WELFARE_TXT4");
            if (canGet) {
                this.mElemList[name + "getBtn"].enabled = true;
                this.mElemList[name + "btnTips"].visible = true;
            }
        }
        this.nameToIndex[name + "getBtn"] = index;
    };
    SignRewardWindow.prototype.checkSignReward = function () {
        return true;
    };
    SignRewardWindow.prototype.checkVipReward = function () {
        var curVip = VipSystem.getInstance().GetVipLevel();
        if (curVip >= 4) {
            return true;
        }
        return false;
    };
    SignRewardWindow.prototype.checkPayReward = function () {
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        if (dailyPayCount > 0) {
            return true;
        }
        return false;
    };
    //个人的
    SignRewardWindow.prototype.onSignGetClick = function () {
        RpcProxy.call("C2G_DailySignPrize", dailyPrizeType.accumulateLogin);
    };
    SignRewardWindow.prototype.onClick = function (args) {
        var name = args.target.name;
        if (this.nameToIndex[name] == null) {
            return;
        }
        var index = this.nameToIndex[name];
        var num = tonumber(index);
        RpcProxy.call("C2G_DailySignPrize", num);
    };
    return SignRewardWindow;
}(BaseCtrlWnd));
__reflect(SignRewardWindow.prototype, "SignRewardWindow");
//# sourceMappingURL=SignRewardWindow.js.map