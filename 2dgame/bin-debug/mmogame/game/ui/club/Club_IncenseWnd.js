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
var Club_IncenseWnd = (function (_super) {
    __extends(Club_IncenseWnd, _super);
    function Club_IncenseWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Club_IncenseWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Club_IncenseWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "worship_btn0", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.worshipClicked, _a),
            (_b = {}, _b["name"] = "worship_btn1", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.worshipClicked, _b),
            (_c = {}, _c["name"] = "worship_btn2", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.worshipClicked, _c),
            (_d = {}, _d["name"] = "reward_btn0", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.rewardClicked, _d),
            (_e = {}, _e["name"] = "reward_btn1", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.rewardClicked, _e),
            (_f = {}, _f["name"] = "reward_btn2", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.rewardClicked, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["record_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 10, 40, group.width - 20, group.height - 40, group);
        var _a, _b, _c, _d, _e, _f;
    };
    Club_IncenseWnd.prototype.onUnLoad = function () {
    };
    Club_IncenseWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this);
        this.mElemList["group2"].visible = true;
        this.mElemList["title"].text = Localize_cns("CLUB_TXT5");
        RpcProxy.call("C2G_FactionRenqiInfo");
        this.refreshFrame();
    };
    Club_IncenseWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this);
        this.mElemList["group2"].visible = false;
    };
    Club_IncenseWnd.prototype.refreshFrame = function () {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        if (clubInfo == null) {
            return;
        }
        var level = clubInfo.level;
        var renqiData = ClubSystem.getInstance().getClubRenqiInfo();
        if (renqiData == null)
            return;
        var todayRenqiExp = renqiData.renqiExp; //香火值
        var todayRenqiCount = renqiData.renqiCount; //上香次数
        var renqiRecordList = renqiData.renqiRecord; //上香记录
        var expConfig = GameConfig.FactionExpConfig[level]; //经验上限
        var incList = [];
        JsUtil.arrayInstert(incList, GameConfig.FactionRenqiCondConfig[opFactionConfig.RenqiFunds]); //现银上香
        JsUtil.arrayInstert(incList, GameConfig.FactionRenqiCondConfig[opFactionConfig.RenqiBindGold]); //绑元上香
        JsUtil.arrayInstert(incList, GameConfig.FactionRenqiCondConfig[opFactionConfig.RenqiGold]); //元宝上香
        for (var i = 0; i < 3; i++) {
            var config = incList[i];
            this.mElemList["inc_txt" + i].text = config.name;
            var str = String.format(Localize_cns("CLUB_TXT82"), config.facExp, config.facContribute, config.facRenqi);
            var color = AddRdContent(this.mElemList["inc_rd" + i], str, "ht_18_cc", "ublack", 3);
            this.mElemList["worship_rd" + i].setAlignFlag(gui.Flag.H_CENTER);
            AddRdContent(this.mElemList["worship_rd" + i], String.format(Localize_cns("CLUB_TXT34"), config.needMoney) + GetMoneyIcon(config.moneyUnit), "ht_18_cc", "gray");
        }
        var todataWorShipText = todayRenqiExp + "/" + expConfig.renqi;
        var todataWorShipCountText = todayRenqiCount + "/" + expConfig.renqiTimes;
        AddRdContent(this.mElemList["today_worship_rd"], String.format(Localize_cns("CLUB_TXT37"), todataWorShipText), "ht_20_cc", "ublack");
        AddRdContent(this.mElemList["today_worship_count_rd"], String.format(Localize_cns("CLUB_TXT38"), todataWorShipCountText), "ht_20_cc", "ublack");
        //更新进度条
        UiUtil.updateProgress(this.mElemList["exp_progress"], todayRenqiExp, expConfig.renqi);
        var isShangXiang = getSaveRecord(opSaveRecordKey.facRenqiSet) || 0;
        this.mElemList["worship_btn0"].enabled = isShangXiang == 0;
        this.mElemList["worship_btn1"].enabled = isShangXiang == 0;
        this.mElemList["worship_btn2"].enabled = isShangXiang == 0;
        var prizeCfgList = [];
        for (var k in GameConfig.FactionRenqiPrizeConfig) {
            var config = GameConfig.FactionRenqiPrizeConfig;
            prizeCfgList.push(config);
        }
        prizeCfgList.sort(function (a, b) {
            return a.ID - b.ID;
        });
        var dailyRecord = getSaveRecord(opSaveRecordKey.facDailyRenqiPrize) || [];
        for (var i = 0; i < 3; i++) {
            var config = prizeCfgList[i];
            var hadGet = dailyRecord[config.ID] == 1;
            this.mElemList["reward_btn" + i].enabled = !hadGet;
        }
        this.scroll.clearItemList();
        var group = this.mElemList["record_wnd"];
        for (var i = 0; i < size_t(renqiRecordList); i++) {
            var v = renqiRecordList[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 20, 30, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
    };
    Club_IncenseWnd.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.RichDisplayer, _a["name"] = name + "_record", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a;
    };
    Club_IncenseWnd.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        var time = data[0], plrid = data[1], pname = data[2], type = data[3];
        var timeStr = getFormatTimeEx(time);
        var typeName = "";
        if (type == opFactionConfig.RenqiFunds) {
            typeName = Localize_cns("CLUB_TXT71");
        }
        else if (type == opFactionConfig.RenqiBindGold) {
            typeName = Localize_cns("CLUB_TXT72");
        }
        else if (type == opFactionConfig.RenqiGold) {
            typeName = Localize_cns("CLUB_TXT73");
        }
        AddRdContent(this.mElemList[name + "_record"], String.format(Localize_cns("CLUB_TXT39"), timeStr, pname, typeName), "ht_20_cc", "ublack");
    };
    Club_IncenseWnd.prototype.worshipClicked = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var type = tonumber(opFactionConfig.RenqiFunds) + tonumber(index);
        var config = GameConfig.FactionRenqiCondConfig[type];
        var moneyUnit = config.moneyUnit;
        var needMoney = config.needMoney;
        var ownMoney = GetHeroMoney(moneyUnit);
        if (ownMoney < needMoney) {
            MsgSystem.addTagTips(Localize_cns("No_money"));
            return;
        }
        RpcProxy.call("C2G_FactionRenqiSet", type); //上香类型
    };
    Club_IncenseWnd.prototype.rewardClicked = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var type = tonumber(opFactionConfig.RenqiFunds) + tonumber(index);
        var config = GameConfig.FactionRenqiPrizeConfig[type];
        var needRenQi = config.renqi;
        var renqiData = ClubSystem.getInstance().getClubRenqiInfo() || {};
        var ownRenQi = renqiData.renqiExp || 0; //香火值
        var dailyRecord = getSaveRecord(opSaveRecordKey.facDailyRenqiPrize) || [];
        if (ownRenQi >= needRenQi && dailyRecord[type] != 1) {
            RpcProxy.call("C2G_FactionRenqiPrize", type); //领取奖励
        }
        else {
            MsgSystem.addTagTips(needRenQi + Localize_cns("CLUB_TXT111"));
        }
    };
    return Club_IncenseWnd;
}(BaseCtrlWnd));
__reflect(Club_IncenseWnd.prototype, "Club_IncenseWnd");
//# sourceMappingURL=Club_IncenseWnd.js.map