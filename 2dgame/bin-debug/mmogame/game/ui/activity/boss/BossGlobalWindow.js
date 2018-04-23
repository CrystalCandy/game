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
var BossGlobalWindow = (function (_super) {
    __extends(BossGlobalWindow, _super);
    function BossGlobalWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossGlobalWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.timerList = {};
    };
    BossGlobalWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "quanming_restore_left", _a["title"] = String.format(Localize_cns("BOSS_TXT9"), "00:00"), _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["name"] = "quanmin_boss_set", _b["title"] = Localize_cns("BOSS_TXT10"), _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickSetting, _b),
            (_c = {}, _c["name"] = "quanmin_chall_add", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickAdd, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["quanmin_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        AddRdContent(this.mElemList["quanmin_chall_countrd"], String.format(Localize_cns("BOSS_TXT8"), "11/123"), "ht_22_cc", "black");
        var _a, _b, _c;
    };
    BossGlobalWindow.prototype.onUnLoad = function () {
    };
    BossGlobalWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["quanmin_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT2");
        this.applyActInfo();
        this.refreshFrame();
    };
    BossGlobalWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["quanmin_group"].visible = false;
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    BossGlobalWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_iconbg", _b["title"] = null, _b["font"] = null, _b["image"] = "boss_bossDi01", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 20, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.ProgressBar, _d["name"] = name + "_hp_imb", _d["title"] = "", _d["font"] = null, _d["image"] = "boss_loadingDi01", _d["thumbImage"] = "boss_loading01", _d["color"] = gui.Color.white, _d["x"] = 5, _d["y"] = 150, _d["w"] = 174, _d["h"] = 21, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + "_block", _e["title"] = null, _e["font"] = null, _e["image"] = "boss_fengYin01", _e["color"] = gui.Color.white, _e["x"] = 10, _e["y"] = 70, _e["w"] = 0, _e["h"] = 0, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.Grid9Image, _f["name"] = name + "_namebg", _f["title"] = null, _f["font"] = null, _f["image"] = "ty_textDi07", _f["autoScale"] = true, _f["color"] = gui.Color.white, _f["x"] = 180, _f["y"] = 5, _f["w"] = 200, _f["h"] = 45, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "_name", _g["title"] = Localize_cns("ROLE_TXT32"), _g["font"] = "ht_20_cc_stroke", _g["color"] = gui.Color.white, _g["x"] = 180, _g["y"] = 15, _g["w"] = 200, _g["h"] = 25, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = eui.Label, _h["name"] = name + "_left", _h["title"] = Localize_cns("BOSS_TXT11"), _h["font"] = "ht_20_lc", _h["color"] = gui.Color.green, _h["x"] = 190, _h["y"] = 50, _h["w"] = 200, _h["h"] = 25, _h["fun_index"] = null, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = eui.Label, _j["name"] = name + "_itemtl", _j["title"] = Localize_cns("BOSS_TXT6"), _j["font"] = "ht_20_lc", _j["color"] = gui.Color.black, _j["x"] = 190, _j["y"] = 75, _j["w"] = 200, _j["h"] = 25, _j["fun_index"] = null, _j["messageFlag"] = true, _j),
            (_k = {}, _k["index_type"] = gui.Button, _k["name"] = name + "_enter", _k["title"] = Localize_cns("BOSS_TXT7"), _k["font"] = "ht_20_cc_stroke", _k["image"] = "ty_tongYongBt6", _k["autoScale"] = true, _k["color"] = gui.Color.white, _k["x"] = 435, _k["y"] = 110, _k["w"] = 100, _k["h"] = 50, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onClickFight, _k),
            (_l = {}, _l["index_type"] = eui.Group, _l["name"] = name + "_res_group", _l["x"] = 380, _l["y"] = 0, _l["w"] = 50, _l["h"] = 50, _l["event_name"] = null, _l["fun_index"] = null, _l),
            (_m = {}, _m["index_type"] = eui.Label, _m["name"] = name + "_res_time", _m["parent"] = name + "_res_group", _m["title"] = String.format(Localize_cns("BOSS_TXT13"), "00:00"), _m["font"] = "ht_20_lc", _m["color"] = gui.Color.black, _m["x"] = 20, _m["y"] = 10, _m["w"] = 200, _m["h"] = 25, _m),
            (_o = {}, _o["index_type"] = eui.Image, _o["name"] = name + "_res_consumIcon", _o["parent"] = name + "_res_group", _o["image"] = "ty_bangHuiIcon01", _o["x"] = 70, _o["y"] = 80, _o["w"] = 30, _o["h"] = 30, _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = null, _o["autoScale"] = true, _o),
            (_p = {}, _p["index_type"] = eui.Label, _p["name"] = name + "_res_consum", _p["parent"] = name + "_res_group", _p["title"] = "X20", _p["font"] = "ht_20_lc", _p["color"] = gui.Color.black, _p["x"] = 100, _p["y"] = 85, _p["w"] = 200, _p["h"] = 25, _p["fun_index"] = null, _p["messageFlag"] = true, _p),
            (_q = {}, _q["index_type"] = eui.Label, _q["name"] = name + "_openTips", _q["title"] = Localize_cns("BOSS_TXT39"), _q["font"] = "ht_20_cc", _q["color"] = gui.Color.black, _q["x"] = 430, _q["y"] = 80, _q["w"] = 120, _q["h"] = 25, _q["fun_index"] = null, _q["messageFlag"] = true, _q),
            (_r = {}, _r["index_type"] = gui.Button, _r["name"] = name + "_res_fight", _r["parent"] = name + "_res_group", _r["title"] = Localize_cns("BOSS_TXT14"), _r["font"] = "ht_20_cc_stroke", _r["image"] = "ty_tongYongBt6", _r["autoScale"] = true, _r["color"] = gui.Color.white, _r["x"] = 41, _r["y"] = 115, _r["w"] = 120, _r["h"] = 50, _r["event_name"] = egret.TouchEvent.TOUCH_TAP, _r["fun_index"] = this.onClickRestore, _r),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 180 + 80 * i, 100, window);
        }
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 150, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(20001);
        this.mElemList[name + "_enter"].visible = false;
        // num = MathUtil.clamp(num, 0, maxNum)
        var imb = this.mElemList[name + "_hp_imb"];
        UiUtil.updateProgress(imb, 50, 100);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    };
    BossGlobalWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss);
        // {
        //         npcList: {[npcIndex]:{refreshTime: 123 否则为0, plrCount: 123 争夺人数, hpPercent: 0.5 boss血量百分比}},
        //         fightCount: 总战斗次数,
        //         refreshTime: 我的次数刷新时间,
        //         remainCount: 我的剩余战斗次数,
        // }
        var npcList = {};
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList;
        }
        this.mElemList[name + "_res_group"].visible = false;
        this.mElemList[name + "_openTips"].visible = false;
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_hp_imb"].visible = false;
        this.mElemList[name + "_block"].visible = false;
        // this.mElemList[name + "_res_fight"].visible = false
        var monsterModelId = GetMonsterModel(config.entryId);
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId);
        var monName = "";
        var conf = GameConfig.MonsterConfig[config.entryId];
        if (conf) {
            monName = conf.Name;
        }
        this.mElemList[name + "_name"].text = monName + "(" + config.level + ")";
        for (var i = 0; i < 3; i++) {
            var entryId = config.itemShow[i];
            if (entryId == null) {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
            else {
                this.mElemList[name + "itemBox" + i].setVisible(true);
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId);
            }
        }
        var bossConfig = npcList[config.index];
        if (!bossConfig) {
            return;
        }
        //刷新时间（次数）
        if (bossConfig.refreshTime > 0) {
            this.mElemList[name + "_left"].text = Localize_cns("BOSS_TXT12");
            this.mElemList[name + "_block"].visible = true;
            //消耗复活怪物
            var count = 0;
            if (config.consum[0]) {
                count = config.consum[0][1];
            }
            this.mElemList[name + "_res_consum"].text = "X" + count;
            this.mElemList[name + "_res_consumIcon"].source = "item_20002";
            if (bossConfig.refreshTime >= GetServerTime()) {
                this.mElemList[name + "_res_group"].visible = true;
                this.controlDataTable[name + "_res_fight"] = config.index;
                var tick = function (delay) {
                    var leftTime = bossConfig.refreshTime - GetServerTime();
                    if (leftTime >= 0) {
                        this.mElemList[name + "_res_time"].text = String.format(Localize_cns("BOSS_TXT13"), getFormatDiffTime(leftTime));
                    }
                    else {
                        this.applyActInfo();
                        if (this.timerList[name]) {
                            KillTimer(this.timerList[name]);
                            this.timerList[name] = null;
                        }
                    }
                };
                if (!this.timerList[name]) {
                    this.timerList[name] = SetTimer(tick, this, 200, true);
                }
            }
        }
        else {
            var imb = this.mElemList[name + "_hp_imb"];
            imb.visible = true;
            UiUtil.updateProgress(imb, bossConfig.hpPercent * 10000, 10000);
            if (GetHeroProperty("level") < config.level) {
                this.mElemList[name + "_openTips"].visible = true;
                this.mElemList[name + "_openTips"].text = String.format(Localize_cns("BOSS_TXT39"), config.level);
            }
            else {
                this.mElemList[name + "_enter"].visible = true;
                this.mElemList[name + "_left"].text = String.format(Localize_cns("BOSS_TXT11"), bossConfig.plrCount);
            }
        }
        this.controlDataTable[name + "_enter"] = config.index;
    };
    BossGlobalWindow.prototype.refreshFrame = function () {
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var k in GameConfig.BossGlobalConfig) {
            var v = GameConfig.BossGlobalConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.level - b.level; });
        var group = this.mElemList["quanmin_scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 190, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        //挑战次数
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss);
        var leftCount = 0;
        var refreshTime = 0;
        if (actInfo) {
            leftCount = actInfo.remainCount;
            refreshTime = actInfo.refreshTime;
        }
        AddRdContent(this.mElemList["quanmin_chall_countrd"], String.format(Localize_cns("BOSS_TXT8"), leftCount + "/" + 10), "ht_22_cc", "black");
        this.mElemList["quanmin_chall_add"].visible = leftCount <= 0;
        if (refreshTime > 0) {
            var tick = function (delay) {
                var leftTime = refreshTime - GetServerTime();
                if (leftTime < 0) {
                    leftTime = 0;
                    this.applyActInfo();
                    if (this.timerList["freshTime"]) {
                        KillTimer(this.timerList["freshTime"]);
                        this.timerList["freshTime"] = null;
                    }
                }
                this.mElemList["quanming_restore_left"].text = String.format(Localize_cns("BOSS_TXT9"), getFormatDiffTime(leftTime));
            };
            this.timerList["freshTime"] = SetTimer(tick, this, 200, true);
        }
        else {
            this.mElemList["quanming_restore_left"].text = "";
        }
    };
    BossGlobalWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WorldPlayerBoss);
    };
    BossGlobalWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    ////////////////////////////////////////////////////////////////////////////////////
    BossGlobalWindow.prototype.onClickSetting = function () {
        WngMrg.getInstance().showWindow("BossGlobalRemindFrame");
    };
    BossGlobalWindow.prototype.onClickFight = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
        var index = this.controlDataTable[name];
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.WorldPlayerBoss, index);
    };
    BossGlobalWindow.prototype.onClickRestore = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var index = this.controlDataTable[name];
        RpcProxy.call("C2G_ReviveActivityBoss", OrdinaryActivityIndex.WorldPlayerBoss, index);
    };
    BossGlobalWindow.prototype.onClickAdd = function (args) {
        RpcProxy.call("C2G_BuyActivityRemainFightCount", OrdinaryActivityIndex.WorldPlayerBoss, {});
    };
    return BossGlobalWindow;
}(BaseCtrlWnd));
__reflect(BossGlobalWindow.prototype, "BossGlobalWindow");
//# sourceMappingURL=BossGlobalWindow.js.map