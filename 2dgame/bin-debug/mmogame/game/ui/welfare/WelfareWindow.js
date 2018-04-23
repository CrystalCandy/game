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
var WelfareWindow = (function (_super) {
    __extends(WelfareWindow, _super);
    function WelfareWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WelfareWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    WelfareWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "welfare_go_label", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.goClick, _a),
            (_b = {}, _b["name"] = "welfare_get_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.welfareGetClick, _b),
            (_c = {}, _c["name"] = "welfare_rule", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.welfareRuleClick, _c),
            (_d = {}, _d["name"] = "reward_btn1", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.rewardClick, _d),
            (_e = {}, _e["name"] = "reward_btn2", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.rewardClick, _e),
            (_f = {}, _f["name"] = "reward_btn3", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.rewardClick, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 4; i++) {
            this.mElemList["actorview" + i] = UIActorView.newObj(this.mLayoutNode, "actorview" + i, 0, 0, this.mElemList["group_actorview" + i]);
        }
        this.mElemList["welfare_itemBox"] = UIItemBox.newObj(this.mElemList, "welfare_itemBox", 0, 0, this.mElemList["welfare_item_group"], 0.9);
        this.mElemList["world_level_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d, _e, _f;
    };
    WelfareWindow.prototype.onUnLoad = function () {
    };
    WelfareWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.XIYOU_WELFARE, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab6"].visible = true;
        RpcProxy.call("C2G_XiyouWelfareInfo");
        this.onRefreshIndex();
        //this.onRefresh()
        //this.onRefreshView()	//模型
    };
    WelfareWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.XIYOU_WELFARE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab6"].visible = false;
        for (var i = 1; i < 4; i++) {
            var actorView = this.mElemList["actorview" + i];
            actorView.clearView();
        }
    };
    WelfareWindow.prototype.onRefreshIndex = function () {
        var jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0;
        //jifenNum = 100
        var recordList = getSaveRecord(opSaveRecordKey.onRefresh) || [];
        this.index = 1;
        if (jifenNum > 30 && recordList[100]) {
            this.index = 2;
        }
        if (jifenNum > 60 && recordList[101]) {
            this.index = 3;
        }
        this.onRefresh();
    };
    WelfareWindow.prototype.onRefresh = function () {
        var welfareInfo = ActivitySystem.getInstance().getXiyouWelfareInfo();
        if (welfareInfo == null) {
            return;
        }
        var recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || [];
        var config = GameConfig.XiyouWelfareConfig; //西游配置
        var configIndex = tonumber(this.index) + 99;
        var curConfig = config[configIndex];
        var curLevel = GetHeroProperty("level") || 0;
        var worldLevel = welfareInfo.level;
        //let levelRd = String.format(Localize_cns("WELFARE_TXT27"),worldLevel)
        AddRdContent(this.mElemList["world_level_rd"], tostring(worldLevel), "ht_20_cc_stroke", "white");
        var itemList = null;
        var getRmb = false;
        if (curLevel < worldLevel - 3) {
            var maxLevel = 1;
            for (var i = 0; i < size_t(curConfig.prize2); i++) {
                var info = curConfig.prize2[i];
                var level = info[0];
                var prize = info[1];
                if (curLevel > level) {
                    itemList = info;
                }
            }
        }
        else {
            itemList = curConfig.prize1;
            getRmb = true;
        }
        if (getRmb) {
            var itemInfo = AnalyPrizeFormat(itemList);
            this.mElemList["welfare_itemBox"].updateByEntry(itemInfo[0][0], itemInfo[0][1]);
        }
        else {
            var itemInfo = AnalyPrizeFormat(itemList[1]);
            this.mElemList["welfare_itemBox"].updateByEntry(itemInfo[0][0], itemInfo[0][1]);
        }
        //let jifenNum = 100 //GetActivity(ActivityDefine.Boss).getXiYouLiLianPoint()
        var jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0;
        //jifenNum = 100
        this.mElemList["today_jifen"].text = String.format(Localize_cns("WELFARE_TXT26"), jifenNum);
        UiUtil.updateProgress(this.mElemList["exp_progress"], jifenNum, 100);
        for (var i = 1; i < 4; i++) {
            var select = this.mElemList["reward_btn_select" + i];
            var yilingqu = this.mElemList["reward_yilingqu" + i];
            var configIndex1 = i + 99;
            yilingqu.visible = false;
            if (recordList[configIndex1]) {
                yilingqu.visible = true;
            }
            select.visible = false;
            if (i == this.index) {
                select.visible = true;
            }
        }
        var canGet = true;
        var isGet = false;
        if (curConfig.score > jifenNum) {
            canGet = false;
        }
        if (recordList[configIndex]) {
            isGet = true;
        }
        this.mElemList["welfare_get_btn"].text = Localize_cns("INVEST_TXT6"); //领取
        this.mElemList["welfare_get_btn"].enabled = false; //没置灰
        if (canGet) {
            this.mElemList["welfare_get_btn"].enabled = true;
            if (isGet) {
                this.mElemList["welfare_get_btn"].text = Localize_cns("INVEST_TXT7"); //已领取
                this.mElemList["welfare_get_btn"].enabled = false;
            }
        }
        this.onRefreshView(welfareInfo.playerInfo);
    };
    //刷新模型
    WelfareWindow.prototype.onRefreshView = function (playerInfo) {
        for (var i = 1; i < 4; i++) {
            var roleInfo = playerInfo[i - 1];
            var roleGroup = this.mElemList["role" + i];
            roleGroup.visible = false;
            if (roleInfo) {
                roleGroup.visible = true;
                this.mElemList["welfare_name" + i].text = roleInfo.name;
                this.mElemList["welfare_level" + i].text = "Lv." + roleInfo.level;
                var model = GetProfessionModel(roleInfo.vocation, roleInfo.sexId);
                var actorView = this.mElemList["actorview" + i];
                //actorView.updateByPlayer(model)
                actorView.updateByPlayerAppearInfo(roleInfo);
            }
        }
    };
    WelfareWindow.prototype.goClick = function () {
        var wnd = WngMrg.getInstance().getWindow("DailyFrame");
        wnd.showWithIndex(3);
    };
    WelfareWindow.prototype.welfareGetClick = function () {
        var index = tonumber(this.index) + 99;
        RpcProxy.call("C2G_XiyouWelfarePrize", index);
    };
    WelfareWindow.prototype.welfareRuleClick = function () {
        var wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame");
        wnd.showWithActivity("XiyouWelfareRule");
    };
    WelfareWindow.prototype.rewardClick = function (args) {
        var name = args.target.name;
        var index = tonumber(name.replace(/[^0-9]/ig, ""));
        if (this.index == index) {
            return;
        }
        this.index = index;
        this.onRefresh();
    };
    return WelfareWindow;
}(BaseCtrlWnd));
__reflect(WelfareWindow.prototype, "WelfareWindow");
//# sourceMappingURL=WelfareWindow.js.map