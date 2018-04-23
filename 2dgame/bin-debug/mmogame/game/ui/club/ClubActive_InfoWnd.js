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
var ClubActive_InfoWnd = (function (_super) {
    __extends(ClubActive_InfoWnd, _super);
    function ClubActive_InfoWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubActive_InfoWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ClubActive_InfoWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var ElemInfo = [
            (_a = {}, _a["name"] = "upgrade_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickUpgrade, _a),
            (_b = {}, _b["name"] = "preview", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickPreview, _b),
        ];
        UiUtil.initElem(ElemInfo, this.mElemList, this.mElemList, this);
        for (var i = 0; i < 3; i++) {
            this.mElemList["Info_ItemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "Info_ItemBox_" + i, 0, 0, this.mElemList["info_prize_wnd"]);
            this.mElemList["Info_ItemBox_" + i].setVisible(false);
        }
        var group = this.mElemList["task_list_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "task_scroll", 10, 5, group.width - 20, group.height - 10, group);
        this.mElemList["club_active_level_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b;
    };
    ClubActive_InfoWnd.prototype.onUnLoad = function () {
    };
    ClubActive_InfoWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this);
        this.mElemList["info_wnd"].visible = true;
        RpcProxy.call("C2G_FactionPlayerActiveInfo");
        this.refreshFrame();
    };
    ClubActive_InfoWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this);
        this.mElemList["info_wnd"].visible = false;
    };
    ClubActive_InfoWnd.prototype.refreshFrame = function () {
        var activeData = ClubSystem.getInstance().getClubActiveInfo();
        if (activeData == null)
            return;
        var curActiveLevel = activeData.level;
        var curLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel];
        var nextLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel + 1];
        if (curLvConfig == null)
            return;
        AddRdContent(this.mElemList["club_active_level_rd"], String.format(Localize_cns("CLUB_TXT29"), curActiveLevel), "ht_24_cc_stroke", "white");
        var curEffects = table_effect(curLvConfig.effects);
        var str = "";
        for (var k in curEffects) {
            var proName = GetPropertyName(k);
            var proValue = curEffects[k];
            str = str + proName + "+" + proValue + "#br";
        }
        AddRdContent(this.mElemList["cur_rd"], str, "ht_24_cc", "ublack", 3);
        str = "";
        if (nextLvConfig) {
            var nextEffects = table_effect(nextLvConfig.effects);
            for (var k in nextEffects) {
                var proName = GetPropertyName(k);
                var proValue = nextEffects[k];
                str = str + proName + "+" + proValue + "#br";
            }
        }
        AddRdContent(this.mElemList["next_rd"], str, "ht_24_cc", "lime", 3);
        //经验
        UiUtil.updateProgress(this.mElemList["exp_progress"], activeData.exp, curLvConfig.exp);
        //奖励
        for (var i = 0; i < 3; i++) {
            var prizeList = AnalyPrizeFormat(curLvConfig.prize);
            if (prizeList[i]) {
                this.mElemList["Info_ItemBox_" + i].updateByEntry(prizeList[i][0], prizeList[i][1]);
                this.mElemList["Info_ItemBox_" + i].setVisible(true);
            }
        }
        var taskCfgList = [];
        var taskConfig = GameConfig.FactionActiveTaskConfig;
        for (var k in taskConfig) {
            var config = taskConfig[k];
            taskCfgList.push(config);
        }
        this.scroll.clearItemList();
        this.list = taskCfgList;
        var group = this.mElemList["task_list_group"];
        for (var i = 0; i < size_t(taskCfgList); i++) {
            var v = taskCfgList[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 20, 61, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    ClubActive_InfoWnd.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_taskName", _b["title"] = "", _b["font"] = "ht_22_lc", _b["color"] = gui.Color.ublack, _b["x"] = 20, _b["y"] = 15, _b["w"] = 150, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_taskCount", _c["title"] = "", _c["font"] = "ht_22_lc", _c["color"] = gui.Color.lime, _c["x"] = 195, _c["y"] = 15, _c["w"] = 80, _c["h"] = 30, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_taskExp", _d["title"] = "", _d["font"] = "ht_22_lc", _d["color"] = gui.Color.cyan, _d["x"] = 330, _d["y"] = 15, _d["w"] = 80, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_compState", _e["title"] = Localize_cns("FINISHED"), _e["font"] = "ht_22_cc", _e["color"] = gui.Color.ublack, _e["x"] = 420, _e["y"] = 15, _e["w"] = 120, _e["h"] = 30, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "_linkBtn", _f["title"] = Localize_cns("TASK_PANEL_QIANWANG"), _f["font"] = "ht_22_cc_stroke", _f["image"] = "ty_tongYongBt6", _f["color"] = gui.Color.white, _f["x"] = 450, _f["y"] = 10, _f["w"] = 86, _f["h"] = 41, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onGoOrGetClick, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f;
    };
    ClubActive_InfoWnd.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        var taskId = data.ID;
        var activeData = ClubSystem.getInstance().getClubActiveInfo();
        var activeTaskData = activeData.taskData;
        var count = checkNull(activeTaskData[taskId], 0);
        this.mElemList[name + "_taskName"].text = data.name;
        this.mElemList[name + "_taskCount"].text = String.format("%d/%d", count, data.maxCount);
        this.mElemList[name + "_taskExp"].text = data.exp;
        if (count >= data.maxCount) {
            this.mElemList[name + "_compState"].visible = true;
            this.mElemList[name + "_linkBtn"].visible = false;
        }
        else {
            this.mElemList[name + "_compState"].visible = false;
            this.mElemList[name + "_linkBtn"].visible = true;
        }
    };
    ClubActive_InfoWnd.prototype.onGoOrGetClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var config = this.list[index];
        var link = config.finish[0];
        ExecuteMainFrameLink(link[0], link[1]);
    };
    ClubActive_InfoWnd.prototype.onClickUpgrade = function () {
        var activeData = ClubSystem.getInstance().getClubActiveInfo();
        var curActiveLevel = activeData.level;
        var curLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel];
        if (activeData.exp >= curLvConfig.exp) {
            RpcProxy.call("C2G_FactionPlayerActiveLevelUp");
        }
        else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT91"));
        }
    };
    ClubActive_InfoWnd.prototype.onClickPreview = function () {
        WngMrg.getInstance().showWindow("ClubActivePrizeFrame");
    };
    return ClubActive_InfoWnd;
}(BaseCtrlWnd));
__reflect(ClubActive_InfoWnd.prototype, "ClubActive_InfoWnd");
//# sourceMappingURL=ClubActive_InfoWnd.js.map