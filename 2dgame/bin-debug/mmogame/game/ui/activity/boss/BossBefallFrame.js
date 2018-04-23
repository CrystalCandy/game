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
var BossBefallFrame = (function (_super) {
    __extends(BossBefallFrame, _super);
    function BossBefallFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossBefallFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.chapterIndex = 1;
        this.curCheckIndex = 0;
        this.mLayoutPaths = ["layouts/boss/BossBefallLayout.exml", "layouts/team/TeamGroupLayout.exml"];
    };
    BossBefallFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_close", _a["title"] = null, _a["color"] = gui.Color.white, _a["right"] = 0, _a["top"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "btn_back", _b["title"] = null, _b["color"] = gui.Color.white, _b["right"] = 0, _b["bottom"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = "sweap_btn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickSweap, _c),
            (_d = {}, _d["index_type"] = gui.Button, _d["name"] = "oneKey_sweap_btn", _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickOnekeySweap, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = "pre_btn", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickPre, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "next_btn", _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickNext, _f),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["team_ctrl"] = UITeamGroup.newObj(this.mLayoutNode, this, this.mElemList["team_group"], this.mLayoutPaths[1], "team_com");
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        for (var i = 0; i < 6; i++) {
            this.mElemList["rare_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "rare_itemBox" + i, 80 + 80 * i, 12, this.mElemList["item_group"]);
        }
        this.mElemList["tips_rd"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e, _f;
    };
    BossBefallFrame.prototype.onUnLoad = function () {
    };
    BossBefallFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        // let ctrl = <UITeamGroup>this.mElemList["team_ctrl"]
        // ctrl.showWnd()
        this.onRefresh();
    };
    BossBefallFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        this.mElemList["team_ctrl"].hideWnd();
    };
    BossBefallFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "boss_bossDi02", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 185, _a["h"] = 311, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickCard, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_name", _b["title"] = String.format(Localize_cns("BOSS_TXT33"), "一", 3), _b["font"] = "ht_22_cc", _b["color"] = gui.Color.ublack, _b["x"] = 0, _b["y"] = 12, _b["w"] = 185, _b["h"] = 25, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Image, _d["name"] = name + "_finish", _d["image"] = "boss_text01", _d["font"] = "ht_22_lc", _d["color"] = gui.Color.black, _d["x"] = 40, _d["y"] = 120, _d["w"] = 0, _d["h"] = 0, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + "_firstIcon", _e["image"] = "bh_text04", _e["font"] = "ht_22_lc", _e["color"] = gui.Color.black, _e["x"] = 14, _e["y"] = 200, _e["w"] = 0, _e["h"] = 0, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "_cantFightTips", _f["title"] = Localize_cns("BOSS_TXT47"), _f["font"] = "ht_20_cc_stroke", _f["color"] = gui.Color.lime, _f["x"] = 0, _f["y"] = 210, _f["w"] = 185, _f["h"] = 25, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "_staticPrizeTips", _g["title"] = Localize_cns("BOSS_TXT49"), _g["font"] = "ht_20_cc_stroke", _g["color"] = gui.Color.lime, _g["x"] = 0, _g["y"] = 210, _g["w"] = 185, _g["h"] = 25, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = name + "_gain", _h["title"] = Localize_cns("BOSS_TXT34"), _h["font"] = "ht_22_cc_stroke", _h["image"] = "ty_tongYongBt3", _h["color"] = gui.Color.white, _h["x"] = 30, _h["y"] = 230, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickGain, _h),
            (_j = {}, _j["index_type"] = gui.Grid9Image, _j["name"] = name + "_check", _j["title"] = null, _j["font"] = null, _j["image"] = "ty_xuanZhongKuang01", _j["autoScale"] = true, _j["color"] = gui.Color.white, _j["x"] = -18, _j["y"] = -15, _j["w"] = 215, _j["h"] = 340, _j["messageFlag"] = true, _j),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 200, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(20001);
        //[0] [1]为首通奖励  [2]为领取宝箱后固定显示
        var posList = [30, 100, 65];
        for (var i = 0; i < 3; i++) {
            var x = posList[i];
            this.mElemList[name + "_item" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_item" + i, x, 235, window, 0.7);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    BossBefallFrame.prototype.refreshItemWindow = function (window, config, index) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.LifeAndDeathBoss);
        // {
        //         maxIndex: 历史最大进度
        //         remainCount: 剩余帮助次数,
        //         prizeRecord: {[bossIndex]:value (0x1领取了战斗 0x2领取了宝箱奖励)}   opLifeAndDeathPrizeValueConfig
        // }
        var maxIndex = -1;
        var prizeRecord = {};
        var remainCount = 0;
        if (actInfo && actInfo.prizeRecord) {
            maxIndex = actInfo.maxIndex;
            prizeRecord = actInfo.prizeRecord;
            remainCount = actInfo.remainCount;
        }
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "_item" + i].setVisible(false);
        }
        this.mElemList[name + "_finish"].visible = false;
        this.mElemList[name + "_gain"].visible = false;
        this.mElemList[name + "_staticPrizeTips"].visible = false;
        this.mElemList[name + "_firstIcon"].visible = false;
        this.mElemList[name + "_cantFightTips"].visible = false;
        this.mElemList[name + "_name"].text = config.read;
        //模型
        var monsterModelId = GetMonsterModel(config.entryId);
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId);
        var value = prizeRecord[config.index];
        if (config.index == maxIndex + 1) {
            this.mElemList[name + "_firstIcon"].visible = true;
            var list = AnalyPrizeFormat(config.firstItemShow || []);
            for (var i = 0; i < 2; i++) {
                var _a = list[i], entryId = _a[0], count = _a[1];
                this.mElemList[name + "_item" + i].setVisible(true);
                this.mElemList[name + "_item" + i].updateByEntry(entryId, count);
            }
        }
        else if (config.index <= maxIndex) {
            if ((value & opLifeAndDeathPrizeValueConfig.fightPrize) == opLifeAndDeathPrizeValueConfig.fightPrize) {
                this.mElemList[name + "_finish"].visible = true;
                if ((value & opLifeAndDeathPrizeValueConfig.boxPrize) != opLifeAndDeathPrizeValueConfig.boxPrize) {
                    this.mElemList[name + "_gain"].visible = true;
                    this.controlDataTable[name + "_gain"] = config;
                }
                else {
                    var list = AnalyPrizeFormat(config.afterBoxItemShow || []);
                    var _b = list[0], entryId = _b[0], count = _b[1];
                    this.mElemList[name + "_item2"].setVisible(true);
                    this.mElemList[name + "_item2"].updateByEntry(entryId, count);
                }
            }
            else {
                this.mElemList[name + "_staticPrizeTips"].visible = true;
                var list = AnalyPrizeFormat(config.afterBoxItemShow || []);
                var _c = list[0], entryId = _c[0], count = _c[1];
                this.mElemList[name + "_item2"].setVisible(true);
                this.mElemList[name + "_item2"].updateByEntry(entryId, count);
                this.controlDataTable[name + "_sweap"] = true; //用于refreshCheckCard，表示可以扫荡操作
            }
        }
        else {
            this.mElemList[name + "_cantFightTips"].visible = true;
            var list = AnalyPrizeFormat(config.firstItemShow || []);
            for (var i = 0; i < 2; i++) {
                var _d = list[i], entryId = _d[0], count = _d[1];
                this.mElemList[name + "_item" + i].setVisible(true);
                this.mElemList[name + "_item" + i].updateByEntry(entryId, count);
            }
            this.controlDataTable[name + "_cannotFight"] = true; //用于refreshCheckCard，表示可以不能打
        }
        this.controlDataTable["bossCardList"] = checkNull(this.controlDataTable["bossCardList"], []);
        table_insert(this.controlDataTable["bossCardList"], [window, config]);
        this.controlDataTable[name + "_bg"] = this.controlDataTable["bossCardList"].length - 1;
        // AnalyPrizeFormat
        if (index == 0) {
            AddRdContent(this.mElemList["tips_rd"], String.format(Localize_cns("BOSS_TXT50"), remainCount, 10), "ht_18_cc", "ublack", 5);
        }
    };
    BossBefallFrame.prototype.onRefresh = function () {
        var list = [];
        for (var _ in GameConfig.BossBefallConfig) {
            var v = GameConfig.BossBefallConfig[_];
            if (v.chapterIndex == this.chapterIndex) {
                table_insert(list, v);
            }
        }
        table_sort(list, function (a, b) { return a["index"] - b["index"]; });
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, 185, group.height, 50, 5, 3);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, k);
        }
        //章节标题
        this.mElemList["label_wndName"].text = "";
        var config = list[0];
        if (config) {
            this.mElemList["label_wndName"].text = config.chapterName;
        }
        this.refreshCheckCard();
    };
    BossBefallFrame.prototype.refreshCheckCard = function () {
        if (!this.controlDataTable["bossCardList"]) {
            return;
        }
        this.curCheckIndex = this.curCheckIndex % this.controlDataTable["bossCardList"].length;
        var _a = this.controlDataTable["bossCardList"][this.curCheckIndex], _ = _a[0], c = _a[1];
        var checkBossIndex = c.index;
        var ctrl = this.mElemList["team_ctrl"];
        if (TeamIsState(OrdinaryActivityIndex.LifeAndDeathBoss) == true) {
            var info = TeamSystem.getInstance().getTeamActData();
            checkBossIndex = info[1];
        }
        var config = null;
        var wName = "";
        for (var i = 0; i < this.controlDataTable["bossCardList"].length; i++) {
            var _b = this.controlDataTable["bossCardList"][i], window_2 = _b[0], v = _b[1];
            var name_1 = window_2.name;
            if (i == this.curCheckIndex) {
                this.mElemList[name_1 + "_check"].visible = true;
            }
            else {
                this.mElemList[name_1 + "_check"].visible = false;
            }
            if (v.index == checkBossIndex) {
                config = v;
                wName = name_1;
            }
        }
        //
        if (!config) {
            return;
        }
        if (this.controlDataTable[wName + "_sweap"]) {
            this.mElemList["sweap_group"].visible = true;
            ctrl.hideWnd();
            this.controlDataTable["sweap_btn"] = config;
            this.controlDataTable["oneKey_sweap_btn"] = config;
        }
        else {
            this.mElemList["sweap_group"].visible = false;
            ctrl.showWnd();
            ctrl.setTeamActivityData([OrdinaryActivityIndex.LifeAndDeathBoss, config.index]);
            ctrl.setHandler(UITeamGroup.CHECK_QUICK_JOIN, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config]);
            ctrl.setHandler(UITeamGroup.CHECK_CREATE_TEAM, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config]);
        }
        var list = AnalyPrizeFormat(config.itemShow || []);
        for (var i = 0; i < 6; i++) {
            if (list[i]) {
                this.mElemList["rare_itemBox" + i].setVisible(true);
                var _c = list[i], entryId = _c[0], count = _c[1];
                this.mElemList["rare_itemBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList["rare_itemBox" + i].setVisible(false);
            }
        }
        this.mElemList["cur_name"].text = config.read;
    };
    BossBefallFrame.prototype.checkCardFight = function (param) {
        var flag = param[0], config = param[1];
        if (flag == true) {
            MsgSystem.addTagTips(Localize_cns("BOSS_TXT51"));
            return false;
        }
        else {
            if (GetHeroProperty("level") < config.level) {
                MsgSystem.addTagTips(String.format(Localize_cns("BOSS_TXT52"), config.level));
                return false;
            }
        }
        return true;
    };
    //////////////////////////////////////////
    BossBefallFrame.prototype.onClickGain = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var config = this.controlDataTable[name];
        var list = AnalyPrizeFormat(config.boxShow || []);
        var callBack = function (config) {
            RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.LifeAndDeathBoss, [config.index]);
        };
        var wnd = WngMrg.getInstance().getWindow("ItemBoxPreviewFrame");
        wnd.showPreviewFrame(list, opItemUnit.CURRENCY, 500, callBack, this, config);
    };
    BossBefallFrame.prototype.onClickSweap = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var config = this.controlDataTable[name];
        var index = config.index;
        RpcProxy.call("C2G_SweepBossActivity", OrdinaryActivityIndex.LifeAndDeathBoss, index);
    };
    BossBefallFrame.prototype.onClickOnekeySweap = function (args) {
        RpcProxy.call("C2G_SweepBossActivityEx", OrdinaryActivityIndex.LifeAndDeathBoss, []);
    };
    BossBefallFrame.prototype.onClickCard = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var index = this.controlDataTable[name];
        if (index == this.curCheckIndex) {
            return;
        }
        this.curCheckIndex = index;
        this.refreshCheckCard();
    };
    BossBefallFrame.prototype.onClickPre = function (args) {
        this.scroll.moveRelativeItemWindow(-3, true);
    };
    BossBefallFrame.prototype.onClickNext = function (args) {
        this.scroll.moveRelativeItemWindow(3, true);
    };
    //////////////////////////////////////////////////////////////////////////////
    BossBefallFrame.prototype.setChapter = function (chapterIndex) {
        this.chapterIndex = chapterIndex;
    };
    BossBefallFrame.prototype.showWithChapter = function (chapterIndex) {
        this.showWnd();
        this.doCommand("setChapter", chapterIndex);
    };
    return BossBefallFrame;
}(BaseWnd));
__reflect(BossBefallFrame.prototype, "BossBefallFrame");
//# sourceMappingURL=BossBefallFrame.js.map