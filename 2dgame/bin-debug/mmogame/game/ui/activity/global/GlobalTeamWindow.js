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
var GlobalTeamWindow = (function (_super) {
    __extends(GlobalTeamWindow, _super);
    function GlobalTeamWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalTeamWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.curCheckIndex = 0;
    };
    GlobalTeamWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var mElemInfo = [
            (_a = {}, _a["name"] = "kfzd_left_count", _a["title"] = Localize_cns("GLOBAL_TXT3"), _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "kfzd_pre_btn", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickPre, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = "kfzd_next_btn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickNext, _c),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["team_ctrl"] = UITeamGroup.newObj(this.mLayoutNode, this, this.mElemList["kfzd_team_group"], this.mParentWnd.mLayoutPaths[1], "team_com");
        var group = this.mElemList["kfzd_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        for (var i = 0; i < 6; i++) {
            this.mElemList["kfzd_rare_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "kfzd_rare_itemBox" + i, 80 + 80 * i, 12, this.mElemList["kfzd_item_group"]);
        }
        var _a, _b, _c;
        // this.mElemList["tips_rd"].setAlignFlag(gui.Flag.CENTER_CENTER);
    };
    GlobalTeamWindow.prototype.onUnLoad = function () {
    };
    GlobalTeamWindow.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mElemList["kfzd_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("GLOBAL_TXT2");
        this.refreshFrame();
        this.applyActInfo();
    };
    GlobalTeamWindow.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mElemList["kfzd_group"].visible = false;
        this.mElemList["team_ctrl"].hideWnd();
    };
    GlobalTeamWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "boss_bossDi02", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 185, _a["h"] = 311, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickCard, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_name", _b["title"] = String.format(Localize_cns("BOSS_TXT33"), "一", 3), _b["font"] = "ht_22_cc", _b["color"] = gui.Color.ublack, _b["x"] = 0, _b["y"] = 12, _b["w"] = 185, _b["h"] = 25, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Image, _d["name"] = name + "_firstIcon", _d["image"] = "bh_text04", _d["font"] = "ht_22_lc", _d["color"] = gui.Color.black, _d["x"] = 14, _d["y"] = 200, _d["w"] = 0, _d["h"] = 0, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_cantFightTips", _e["title"] = Localize_cns("GLOBAL_TXT4"), _e["font"] = "ht_20_cc_stroke", _e["color"] = gui.Color.red, _e["x"] = 0, _e["y"] = 210, _e["w"] = 185, _e["h"] = 25, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "_staticPrizeTips", _f["title"] = Localize_cns("BOSS_TXT49"), _f["font"] = "ht_20_cc_stroke", _f["color"] = gui.Color.lime, _f["x"] = 0, _f["y"] = 210, _f["w"] = 185, _f["h"] = 25, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = gui.Grid9Image, _g["name"] = name + "_check", _g["title"] = null, _g["font"] = null, _g["image"] = "ty_xuanZhongKuang01", _g["autoScale"] = true, _g["color"] = gui.Color.white, _g["x"] = -18, _g["y"] = -15, _g["w"] = 215, _g["h"] = 340, _g["messageFlag"] = true, _g),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 200, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(20001);
        //[0] [1]为首通奖励  通关奖励（重复挑战）
        var posList = [30, 100];
        for (var i = 0; i < 2; i++) {
            var x = posList[i];
            this.mElemList[name + "_item" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_item" + i, x, 235, window, 0.7);
        }
        var _a, _b, _c, _d, _e, _f, _g;
    };
    GlobalTeamWindow.prototype.refreshItemWindow = function (window, config, index) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ServerTeam);
        // {
        //         remainCount: 剩余收益次数,
        //         npcIndexList: {[npcIndex]:1
        // }
        var npcIndexList = {};
        var remainCount = 0;
        if (actInfo && actInfo.npcIndexList) {
            npcIndexList = actInfo.npcIndexList;
            remainCount = actInfo.remainCount;
        }
        for (var i = 0; i < 2; i++) {
            this.mElemList[name + "_item" + i].setVisible(false);
        }
        // this.mElemList[name + "_finish"].visible = false
        // this.mElemList[name + "_gain"].visible = false
        this.mElemList[name + "_staticPrizeTips"].visible = false;
        this.mElemList[name + "_firstIcon"].visible = false;
        this.mElemList[name + "_cantFightTips"].visible = false;
        this.mElemList[name + "_name"].text = config.read;
        //模型
        var monsterModelId = GetMonsterModel(config.entryId);
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId);
        //状态分析
        if (config.level > GetHeroProperty("level")) {
            this.mElemList[name + "_cantFightTips"].visible = true;
            var list = AnalyPrizeFormat(config.firstItemShow || []);
            for (var i = 0; i < 2; i++) {
                if (list[i]) {
                    var _a = list[i], entryId = _a[0], count = _a[1];
                    this.mElemList[name + "_item" + i].setVisible(true);
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count);
                }
            }
            this.controlDataTable[name + "_canFightTips"] = true; //true表示不能挑战
        }
        else if (npcIndexList[config.index]) {
            this.mElemList[name + "_staticPrizeTips"].visible = true;
            var list = AnalyPrizeFormat(config.fixedItemShow || []);
            for (var i = 0; i < 2; i++) {
                if (list[i]) {
                    var _b = list[i], entryId = _b[0], count = _b[1];
                    this.mElemList[name + "_item" + i].setVisible(true);
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count);
                }
            }
        }
        else {
            this.mElemList[name + "_firstIcon"].visible = true;
            var list = AnalyPrizeFormat(config.firstItemShow || []);
            for (var i = 0; i < 2; i++) {
                if (list[i]) {
                    var _c = list[i], entryId = _c[0], count = _c[1];
                    this.mElemList[name + "_item" + i].setVisible(true);
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count);
                }
            }
        }
        this.controlDataTable["bossCardList"] = checkNull(this.controlDataTable["bossCardList"], []);
        table_insert(this.controlDataTable["bossCardList"], [window, config]);
        this.controlDataTable[name + "_bg"] = this.controlDataTable["bossCardList"].length - 1;
        // AnalyPrizeFormat
        if (index == 0) {
            this.mElemList["kfzd_left_counter"].text = remainCount + "/10";
        }
    };
    GlobalTeamWindow.prototype.refreshFrame = function () {
        var list = [];
        for (var _ in GameConfig.GlobalTeamConfig) {
            var v = GameConfig.GlobalTeamConfig[_];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a["index"] - b["index"]; });
        // let list = [1, 1, 1, 1, ,1 ,1 ,1 ,1 ,1 ,1]
        var group = this.mElemList["kfzd_scroll_group"];
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
        this.refreshCheckCard();
    };
    GlobalTeamWindow.prototype.refreshCheckCard = function () {
        if (!this.controlDataTable["bossCardList"]) {
            return;
        }
        this.curCheckIndex = this.curCheckIndex % this.controlDataTable["bossCardList"].length;
        var _a = this.controlDataTable["bossCardList"][this.curCheckIndex], _ = _a[0], c = _a[1];
        var checkBossIndex = c.index;
        var ctrl = this.mElemList["team_ctrl"];
        if (TeamIsState(OrdinaryActivityIndex.ServerTeam) == true) {
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
        ctrl.showWnd();
        ctrl.setTeamActivityData([OrdinaryActivityIndex.ServerTeam, config.index]);
        ctrl.setHandler(UITeamGroup.CHECK_QUICK_JOIN, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config]);
        ctrl.setHandler(UITeamGroup.CHECK_CREATE_TEAM, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config]);
        var list = AnalyPrizeFormat(config.itemShow || []);
        for (var i = 0; i < 6; i++) {
            if (list[i]) {
                this.mElemList["kfzd_rare_itemBox" + i].setVisible(true);
                var _c = list[i], entryId = _c[0], count = _c[1];
                this.mElemList["kfzd_rare_itemBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList["kfzd_rare_itemBox" + i].setVisible(false);
            }
        }
        this.mElemList["kfzd_cur_name"].text = config.read;
    };
    GlobalTeamWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ServerTeam);
    };
    GlobalTeamWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    ///////////////////////////////////////////////////////////
    GlobalTeamWindow.prototype.checkCardFight = function (param) {
        var flag = param[0], config = param[1];
        if (flag == true) {
            MsgSystem.addTagTips(String.format(Localize_cns("GLOBAL_TXT4"), config.level));
            return false;
        }
        return true;
    };
    //////////////////////////////////////////
    GlobalTeamWindow.prototype.onClickCard = function (args) {
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
    GlobalTeamWindow.prototype.onClickPre = function (args) {
        this.scroll.moveRelativeItemWindow(-3, true);
    };
    GlobalTeamWindow.prototype.onClickNext = function (args) {
        this.scroll.moveRelativeItemWindow(3, true);
    };
    return GlobalTeamWindow;
}(BaseCtrlWnd));
__reflect(GlobalTeamWindow.prototype, "GlobalTeamWindow");
//# sourceMappingURL=GlobalTeamWindow.js.map