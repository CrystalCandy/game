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
var Club_FuBenWnd = (function (_super) {
    __extends(Club_FuBenWnd, _super);
    function Club_FuBenWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Club_FuBenWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.auto = true;
    };
    Club_FuBenWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "dungeon_left_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.changeIndexClicked, _a),
            (_b = {}, _b["name"] = "dungeon_left_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.changeIndexClicked, _b),
            (_c = {}, _c["name"] = "monster_level_text", _c["title"] = "", _c["font"] = "ht_24_cc", _c["color"] = gui.Color.saddlebrown, _c)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["team_ctrl"] = UITeamGroup.newObj(this.mLayoutNode, this, this.mElemList["team_group"], this.mParentWnd.mLayoutPaths[1], "team_com");
        var group = this.mElemList["dungeon_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 30, 0, group.width - 60, group.height, group, UIScrollList.DIR_HORIZON);
        for (var i = 0; i < 6; i++) {
            this.mElemList["itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, 80 * i, 0, this.mElemList["item_reward_wnd"]);
        }
        this.mElemList["help_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["fight_count_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.select = 0;
        var _a, _b, _c;
    };
    Club_FuBenWnd.prototype.onUnLoad = function () {
    };
    Club_FuBenWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        //RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        //RegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group3"].visible = true;
        this.mElemList["title"].text = Localize_cns("CLUB_TXT6");
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.FactInstZones);
        this.refreshFrame();
    };
    Club_FuBenWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        //UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        //UnRegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group3"].visible = false;
        this.mElemList["team_ctrl"].hideWnd();
    };
    Club_FuBenWnd.prototype.refreshFrame = function () {
        this.updateDungeonWnd(); //副本信息
        this.updateTeamWnd(); //组队
    };
    Club_FuBenWnd.prototype.updateDungeonWnd = function () {
        this.scroll.clearItemList();
        var list = [];
        for (var i in GameConfig.FactionMapConfig) {
            JsUtil.arrayInstert(list, GameConfig.FactionMapConfig[i]);
        }
        table_sort(list, function (a, b) {
            return a.index - b.index;
        });
        this.list = list;
        this.scroll.saveViewXY();
        var group = this.mElemList["dungeon_group"];
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, 185, group.height, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
            if (this.select == i) {
                //几率掉落
                this.updateRatePrize(this.list[this.select]);
                var wndname = window_1.name;
                this.mElemList[wndname + "_select"].visible = true;
            }
        }
        this.scroll.refreshScroll();
        this.scroll.restoreViewXY();
        var record = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactInstZones) || {};
        var helpTime = record.helpCount || 0;
        var helpLimit = defaultValue.CLUB_FUBEN_HELP_COUNT;
        var str = String.format(Localize_cns("CLUB_TXT114"), helpTime, helpLimit);
        AddRdContent(this.mElemList["help_rd"], str, "ht_13_cc", "ublack", 3);
        var prizeCount = record.prizeCount || 0;
        var prizeLimit = defaultValue.CLUB_FUBEN_FIGHT_COUNT;
        str = String.format(Localize_cns("CLUB_TXT116"), prizeCount, prizeLimit);
        AddRdContent(this.mElemList["fight_count_rd"], str, "ht_22_cc", "ublack", 3);
    };
    Club_FuBenWnd.prototype.updateTeamWnd = function () {
        var ctrl = this.mElemList["team_ctrl"];
        ctrl.showWnd();
        ctrl.setTeamActivityData([OrdinaryActivityIndex.FactInstZones, this.select + 1]);
        ctrl.setHandler(UITeamGroup.CHECK_QUICK_JOIN, this.checkCardFight, this);
        ctrl.setHandler(UITeamGroup.CHECK_CREATE_TEAM, this.checkCardFight, this);
    };
    Club_FuBenWnd.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "bh_fuBenDi01", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onSelectFuben, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_name", _b["parent"] = name + "_bg", _b["title"] = "", _b["font"] = "ht_24_cc", _b["color"] = gui.Color.ublack, _b["x"] = 0, _b["y"] = 11, _b["w"] = w, _b["h"] = 30, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_actor_wnd", _c["parent"] = name + "_bg", _c["x"] = (w - 120) / 2, _c["y"] = 80, _c["w"] = 120, _c["h"] = 150, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_open_lv", _d["parent"] = name + "_bg", _d["title"] = "", _d["font"] = "ht_24_cc", _d["color"] = gui.Color.red, _d["x"] = 0, _d["y"] = 201, _d["w"] = w, _d["h"] = 30, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = name + "_tip1", _e["parent"] = name + "_bg", _e["image"] = "bh_text04", _e["x"] = (w - 157) / 2, _e["y"] = 200, _e["w"] = 157, _e["h"] = 31, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.Grid9Image, _f["name"] = name + "_tip2", _f["parent"] = name + "_bg", _f["image"] = "gk_text01", _f["x"] = (w - 99) / 2, _f["y"] = 201, _f["w"] = 99, _f["h"] = 28, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Group, _g["name"] = name + "_prize_wnd", _g["x"] = (w - 166) / 2, _g["y"] = 220, _g["w"] = 166, _g["h"] = 80, _g),
            (_h = {}, _h["index_type"] = gui.Grid9Image, _h["name"] = name + "_select", _h["title"] = null, _h["font"] = null, _h["image"] = "ty_xuanZhongKuang01", _h["bAdapteWindow"] = true, _h["color"] = null, _h["x"] = -15, _h["y"] = -15, _h["w"] = w + 25, _h["h"] = h + 25, _h["messageFlag"] = true, _h),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_select"].visible = false;
        this.mElemList[name + "_open_lv"].visible = false;
        this.mElemList[name + "_actor_view"] = UIActorView.newObj(this.mLayoutNode, name + "_actor_view", 60, 100, this.mElemList[name + "_actor_wnd"]);
        for (var i = 0; i < 2; i++) {
            this.mElemList[name + "_itembox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_itembox_" + i, 16 + i * 70, 11, this.mElemList[name + "_prize_wnd"], 0.8);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    Club_FuBenWnd.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        this.mElemList[name + "_name"].text = data.name;
        //actorview
        var modelId = GetMonsterModel(data.monsterNpc);
        this.mElemList[name + "_actor_view"].updateByPlayer(modelId);
        var prize = data.first;
        var record = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactInstZones) || {};
        var passList = record.passList || [];
        var ispass = passList[data.Index - 1];
        if (ispass) {
            this.mElemList[name + "_open_lv"].visible = false;
            this.mElemList[name + "_tip1"].visible = false;
            this.mElemList[name + "_tip2"].visible = true;
            prize = data.fixPrize;
        }
        else {
            //开启等级
            var clubInfo = ClubSystem.getInstance().getCurClubInfo();
            if (data.level > clubInfo.level) {
                this.mElemList[name + "_open_lv"].visible = true;
                this.mElemList[name + "_tip1"].visible = false;
                this.mElemList[name + "_tip2"].visible = false;
                this.mElemList[name + "_open_lv"].text = String.format(Localize_cns("CLUB_TXT113"), data.level);
            }
            else {
                this.mElemList[name + "_open_lv"].visible = false;
                this.mElemList[name + "_tip1"].visible = true;
                this.mElemList[name + "_tip2"].visible = false;
            }
        }
        var itemList = AnalyPrizeFormat(prize);
        for (var i = 0; i < 2; i++) {
            var v = itemList[i];
            if (v) {
                this.mElemList[name + "_itembox_" + i].updateByEntry(v[0], v[1]);
            }
        }
    };
    Club_FuBenWnd.prototype.updateRatePrize = function (data) {
        var prize = data.prizeShow;
        var prizeList = AnalyPrizeFormat(prize);
        for (var i = 0; i < 6; i++) {
            var v = prizeList[i];
            if (v) {
                this.mElemList["itemBox_" + i].updateByEntry(v[0], v[1]);
            }
        }
        this.mElemList["monster_level_text"].text = data.name;
    };
    Club_FuBenWnd.prototype.onSelectFuben = function (event) {
        var name = event.target.name;
        var index = tonumber(name.replace(/[^0-9]/ig, ""));
        var data = this.list[index];
        for (var i = 0; i < size_t(this.list); i++) {
            var group = this.mElemList["dungeon_group"];
            var window_2 = this.scroll.getItemWindow(i, 185, group.height, 0, 0, 0);
            var wndname = window_2.name;
            this.mElemList[wndname + "_select"].visible = false;
            if (index == i) {
                this.mElemList[wndname + "_select"].visible = true;
            }
        }
        this.select = index;
        //几率掉落
        this.updateRatePrize(data);
    };
    Club_FuBenWnd.prototype.changeIndexClicked = function (args) {
    };
    Club_FuBenWnd.prototype.checkCardFight = function () {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        var clubLv = clubInfo.level;
        var config = this.list[this.select];
        if (config.level > clubLv) {
            var str = String.format(Localize_cns("CLUB_TXT115"), config.level);
            MsgSystem.addTagTips(str);
            return false;
        }
        return true;
    };
    return Club_FuBenWnd;
}(BaseCtrlWnd));
__reflect(Club_FuBenWnd.prototype, "Club_FuBenWnd");
//# sourceMappingURL=Club_FuBenWnd.js.map