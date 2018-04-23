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
var ActivityListFrame = (function (_super) {
    __extends(ActivityListFrame, _super);
    function ActivityListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/active/ActivityListLayout.exml"];
        this.activityDataList = {};
    };
    ActivityListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.mElemList["scroll"] = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        this.scroll = this.mElemList["scroll"];
        this.activityInfoList = [
            (_c = {}, _c["index"] = OrdinaryActivityIndex.FactionMonster, _c["bgpic"] = "hd_huoDongIcon01", _c["progress"] = true, _c["refresh"] = this.refreshRuQin, _c["func"] = this.enterRuQin, _c),
            (_d = {}, _d["index"] = OrdinaryActivityIndex.HUSONG, _d["bgpic"] = "hd_huoDongIcon02", _d["progress"] = false, _d["prize"] = [60055, 60056, 60005], _d["refresh"] = this.refreshHuSong, _d["openIcon"] = "hd_Bt01", _d["openFunc"] = this.onOpenHuSongShop, _d["func"] = this.enterHuSong, _d),
            (_e = {}, _e["index"] = OrdinaryActivityIndex.DATI, _e["bgpic"] = "hd_huoDongIcon03", _e["progress"] = false, _e["prize"] = [60055, 60056, 60005], _e["refresh"] = this.refreshDaTi, _e["openIcon"] = "hd_Bt02", _e["openFunc"] = this.onOpenDaTiShop, _e["func"] = this.enterDaTi, _e),
        ];
        var _a, _b, _c, _d, _e;
    };
    ActivityListFrame.prototype.onUnLoad = function () {
    };
    ActivityListFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.updateWnd();
    };
    ActivityListFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    ActivityListFrame.prototype.refreshFrame = function () {
        var list = this.activityInfoList;
        //更新拥有
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, 561, 187, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll.refreshScroll();
        this.scroll.restoreViewXY();
    };
    ActivityListFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group", _a["title"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = 561, _a["h"] = 187, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_bg", _b["parent"] = name + "_group", _b["title"] = null, _b["image"] = "", _b["x"] = 0, _b["y"] = 0, _b["w"] = 561, _b["h"] = 187, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = name + "_des_rd", _c["parent"] = name + "_group", _c["x"] = 25, _c["y"] = 50, _c["w"] = 300, _c["h"] = 60, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Group, _d["name"] = name + "_item_wnd", _d["parent"] = name + "_group", _d["x"] = 25, _d["y"] = 108, _d["w"] = 216, _d["h"] = 72, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "_open_btn", _e["parent"] = name + "_group", _e["title"] = null, _e["image"] = "", _e["x"] = 422, _e["y"] = 25, _e["w"] = 101, _e["h"] = 88, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onOpenClick, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "_go_btn", _f["parent"] = name + "_group", _f["title"] = Localize_cns("ACTIVITY_GO"), _f["font"] = "ht_24_cc_stroke", _f["image"] = "ty_tongYongBt1", _f["color"] = gui.Color.white, _f["x"] = 399, _f["y"] = 118, _f["w"] = 147, _f["h"] = 55, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onTurnClick, _f),
            (_g = {}, _g["index_type"] = gui.ProgressBar, _g["name"] = name + "_imb", _g["parent"] = name + "_group", _g["title"] = "", _g["font"] = null, _g["image"] = "hd_loadingDi01", _g["thumbImage"] = "hd_loading01", _g["color"] = gui.Color.white, _g["x"] = 145, _g["y"] = 75, _g["w"] = 195, _g["h"] = 30, _g),
            (_h = {}, _h["index_type"] = eui.Label, _h["name"] = name + "_hp_percent", _h["parent"] = name + "_imb", _h["title"] = "", _h["font"] = "ht_18_cc_stroke", _h["color"] = gui.Color.white, _h["x"] = 0, _h["y"] = 0, _h["w"] = 195, _h["h"] = 30, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = eui.Group, _j["name"] = name + "_tips_wnd", _j["parent"] = name + "_group", _j["x"] = 245, _j["y"] = 70, _j["w"] = 100, _j["h"] = 40, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onRuleClick, _j),
            (_k = {}, _k["index_type"] = gui.Grid9Image, _k["name"] = name + "_tipsIcon", _k["parent"] = name + "_tips_wnd", _k["title"] = null, _k["image"] = "zjm_hongDian01", _k["x"] = 0, _k["y"] = 0, _k["w"] = 33, _k["h"] = 40, _k["messageFlag"] = true, _k),
            (_l = {}, _l["index_type"] = eui.Label, _l["name"] = name + "_tipsLab", _l["parent"] = name + "_tips_wnd", _l["title"] = Localize_cns("NOTICE_TXT4"), _l["font"] = "ht_22_cc_stroke", _l["color"] = gui.Color.lime, _l["x"] = 30, _l["y"] = 5, _l["w"] = 50, _l["h"] = 25, _l),
            (_m = {}, _m["index_type"] = eui.Rect, _m["name"] = name + "_line", _m["parent"] = name + "_tips_wnd", _m["color"] = gui.Color.lime, _m["x"] = 36, _m["y"] = 30, _m["w"] = 42, _m["h"] = 2, _m["messageFlag"] = true, _m),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, window);
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "_itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_itemBox_" + i, 72 * i, 0, this.mElemList[name + "_item_wnd"], 0.9);
        }
        this.mElemList[name + "_imb"].visible = false;
        this.mElemList[name + "_hp_percent"].visible = false;
        this.mElemList[name + "_tips_wnd"].visible = false;
        this.mElemList[name + "_open_btn"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    };
    ActivityListFrame.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        this.mElemList[name + "_bg"].source = data.bgpic;
        if (data.openIcon && data.openFunc) {
            this.mElemList[name + "_open_btn"].source = data.openIcon;
            this.mElemList[name + "_open_btn"].visible = true;
        }
        if (data.explain) {
            this.mElemList[name + "_tips_wnd"].visible = true;
        }
        if (data.progress) {
            this.mElemList[name + "_imb"].visible = true;
            this.mElemList[name + "_hp_percent"].visible = true;
        }
        //动态更新
        data.refresh.call(this, window, data);
    };
    //打开
    ActivityListFrame.prototype.onOpenClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.activityInfoList[index];
        if (data) {
            data.openFunc.call(this);
        }
    };
    //快速进入
    ActivityListFrame.prototype.onTurnClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.activityInfoList[index];
        if (data) {
            data.func.call(this);
        }
    };
    //玩法说明
    ActivityListFrame.prototype.onRuleClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.activityInfoList[index];
        if (data) {
            var wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame");
            wnd.showWithActivity(data.explain);
        }
    };
    /////////更新数据//////////////////////////////////////////////////////////////////////
    ActivityListFrame.prototype.updateWnd = function () {
        if (!this.isVisible()) {
            return;
        }
        this.updateRuQin();
        this.updateHuSong();
        this.refreshFrame();
    };
    //帮会入侵
    ActivityListFrame.prototype.updateRuQin = function () {
        var info = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactionMonster);
        this.activityDataList[OrdinaryActivityIndex.FactionMonster] = info;
    };
    //更新西游护送次数
    ActivityListFrame.prototype.updateHuSong = function () {
        var act = GetActivity(ActivityDefine.HuSong);
        var info = act.getActInfo();
        this.activityDataList[OrdinaryActivityIndex.HUSONG] = info;
    };
    //更新答题
    ActivityListFrame.prototype.updateDaTi = function () {
        this.activityDataList[OrdinaryActivityIndex.DATI] = {};
    };
    //////更新界面////////////////////////////////////////////////////////////
    ActivityListFrame.prototype.refreshRuQin = function (window, data) {
        var name = window.name;
        var clubInfo = ClubSystem.getInstance().getCurClubInfo() || {};
        var clubLv = clubInfo.level || 1;
        //物品奖励
        var prizeList = AnalyPrizeFormat(GameConfig.FactionMonsterConfig[clubLv].prize);
        for (var i = 0; i < 3; i++) {
            if (prizeList[i]) {
                var itemId = prizeList[i][0];
                var itemCount = prizeList[i][1];
                this.mElemList[name + "_itemBox_" + i].updateByEntry(itemId);
            }
        }
        //更新活动时间
        var timeConfig = GameConfig.FactionMonsterConfig[clubLv].activeTime;
        var timeSolt1 = timeConfig[0];
        var timeSolt2 = timeConfig[1];
        var serverTime = GetServerTime();
        var timeStart1 = GetTodayTime(serverTime, timeSolt1[0], timeSolt1[1]);
        var timeEnd1 = GetTodayTime(serverTime, timeSolt1[2], timeSolt1[3]);
        var timeStart2 = GetTodayTime(serverTime, timeSolt2[0], timeSolt2[1]);
        var timeEnd2 = GetTodayTime(serverTime, timeSolt2[2], timeSolt2[3]);
        var str = "";
        if (serverTime >= timeEnd1 && serverTime <= timeEnd2) {
            str = String.format(Localize_cns("ACTIVITY_TXT11"), timeSolt2[0] + ":" + String.format("%02d", timeSolt2[1]) + "~" + timeSolt2[2] + ":" + String.format("%02d", timeSolt2[3]));
        }
        else {
            str = String.format(Localize_cns("ACTIVITY_TXT11"), timeSolt1[0] + ":" + String.format("%02d", timeSolt1[1]) + "~" + timeSolt1[2] + ":" + String.format("%02d", timeSolt1[3]));
        }
        AddRdContent(this.mElemList[name + "_des_rd"], str, "ht_22_cc_stroke", "white", 6);
        //是否进帮
        if (!ClubSystem.getInstance().isJoinClub()) {
            this.mElemList[name + "_go_btn"].text = Localize_cns("CLUB_TXT110");
            UiUtil.updateProgress(this.mElemList[name + "_imb"], 1, 1);
            this.mElemList[name + "_hp_percent"].text = "100%";
            return;
        }
        //更新
        var info = this.activityDataList[data.index];
        if (!info) {
            return;
        }
        var hpPercent = info.hpPercent || 0;
        var isLinQu = info.prize || 0;
        //活动是否开启
        var isOpen = false;
        if (serverTime >= timeStart1 && serverTime <= timeEnd1) {
            isOpen = true;
        }
        else if (serverTime >= timeStart2 && serverTime <= timeEnd2) {
            isOpen = true;
        }
        if (isOpen) {
            if (hpPercent > 0) {
                this.mElemList[name + "_go_btn"].text = Localize_cns("ACTIVITY_GO");
            }
            else {
                if (isLinQu > 0) {
                    this.mElemList[name + "_go_btn"].text = Localize_cns("ACTIVITY_NOT_REFRESH");
                }
                else {
                    this.mElemList[name + "_go_btn"].text = Localize_cns("ACTIVITY_PAY_TXT6");
                }
            }
        }
        else {
            if (isLinQu > 0) {
                this.mElemList[name + "_go_btn"].text = Localize_cns("ACTIVITY_NOT_REFRESH");
            }
            else {
                this.mElemList[name + "_go_btn"].text = Localize_cns("ACTIVITY_PAY_TXT6");
            }
        }
        //boss气血
        UiUtil.updateProgress(this.mElemList[name + "_imb"], hpPercent * 100, 100);
        this.mElemList[name + "_hp_percent"].text = String.format("%d", hpPercent * 100) + "%";
    };
    ActivityListFrame.prototype.refreshHuSong = function (window, data, index) {
        var name = window.name;
        var prizeList = data.prize;
        for (var i = 0; i < 3; i++) {
            var itemId = prizeList[i];
            var itemCount = 1;
            this.mElemList[name + "_itemBox_" + i].updateByEntry(itemId);
        }
        var serverTime = GetServerTime();
        var time = simple_transform_time(serverTime);
        var timeStr = "";
        if ((time.hours >= 13 && time <= 24) || (time.hours >= 0 && time <= 1)) {
            timeStr = "23:00~01:00";
        }
        else {
            timeStr = "11:00~13:00";
        }
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo() || {};
        var hadHusong = actInfo.husongTwice || 0;
        var str = String.format(Localize_cns("ACTIVITY_TXT12"), timeStr, hadHusong + "/" + 3);
        AddRdContent(this.mElemList[name + "_des_rd"], str, "ht_22_cc_stroke", "white", 6);
    };
    ActivityListFrame.prototype.refreshDaTi = function (window, data, index) {
        var name = window.name;
        var prizeList = data.prize;
        for (var i = 0; i < 3; i++) {
            var itemId = prizeList[i];
            var itemCount = 1;
            this.mElemList[name + "_itemBox_" + i].updateByEntry(itemId);
        }
        AddRdContent(this.mElemList[name + "_des_rd"], Localize_cns("ACTIVITY_TXT13"), "ht_22_cc_stroke", "white", 6);
    };
    //////商店和排行////////////////////////////////////////////////////////////////////////////////
    ActivityListFrame.prototype.onOpenHuSongShop = function () {
        var wnd = WngMrg.getInstance().getWindow("ShopJingJiFrame");
        wnd.showWithIndex(2);
    };
    ActivityListFrame.prototype.onOpenDaTiShop = function () {
        var wnd = WngMrg.getInstance().getWindow("ShopJingJiFrame");
        wnd.showWithIndex(3);
    };
    /////进入和领奖/////////////////////////////////////////////////////////////////////////////
    ActivityListFrame.prototype.enterRuQin = function () {
        //加入帮会
        if (!ClubSystem.getInstance().isJoinClub()) {
            ExecuteMainFrameFunction("gonghui");
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
        var info = this.activityDataList[OrdinaryActivityIndex.FactionMonster];
        if (!info) {
            return;
        }
        var clubInfo = ClubSystem.getInstance().getCurClubInfo() || {};
        var clubLv = clubInfo.level || 1;
        //更新活动时间
        var timeConfig = GameConfig.FactionMonsterConfig[clubLv].activeTime;
        var timeSolt1 = timeConfig[0];
        var timeSolt2 = timeConfig[1];
        var serverTime = GetServerTime();
        var timeStart1 = GetTodayTime(serverTime, timeSolt1[0], timeSolt1[1]);
        var timeEnd1 = GetTodayTime(serverTime, timeSolt1[2], timeSolt1[3]);
        var timeStart2 = GetTodayTime(serverTime, timeSolt2[0], timeSolt2[1]);
        var timeEnd2 = GetTodayTime(serverTime, timeSolt2[2], timeSolt2[3]);
        var hpPercent = info.hpPercent || 0;
        var isLinQu = info.prize || 0;
        //活动是否开启
        var isOpen = false;
        if (serverTime >= timeStart1 && serverTime <= timeEnd1) {
            isOpen = true;
        }
        else if (serverTime >= timeStart2 && serverTime <= timeEnd2) {
            isOpen = true;
        }
        if (isOpen) {
            if (hpPercent > 0) {
                RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.FactionMonster, {});
            }
            else {
                if (isLinQu > 0) {
                }
                else {
                    RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.FactionMonster, 0);
                }
            }
        }
        else {
            if (isLinQu > 0) {
            }
            else {
                RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.FactionMonster, 0);
            }
        }
    };
    ActivityListFrame.prototype.enterHuSong = function () {
        var wnd = WngMrg.getInstance().getWindow("EscortFrame");
        wnd.showWnd();
    };
    ActivityListFrame.prototype.enterDaTi = function () {
        ExecuteMainFrameFunction("dati");
    };
    return ActivityListFrame;
}(BaseWnd));
__reflect(ActivityListFrame.prototype, "ActivityListFrame");
//# sourceMappingURL=ActivityListFrame.js.map