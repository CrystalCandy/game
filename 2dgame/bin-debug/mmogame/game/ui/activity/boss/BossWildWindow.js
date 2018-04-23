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
var BossWildWindow = (function (_super) {
    __extends(BossWildWindow, _super);
    function BossWildWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossWildWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    BossWildWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        // var elemInfo = [
        //     { ["name"]: "ug_pokedex_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPokedex }, //图鉴
        //     { ["name"]: "ug_force_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickForceBtn },
        //     { ["name"]: "ug_btn_show", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShow },
        //     { ["name"]: "ug_btn_embattle", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEmbattle },
        //     { ["name"]: "ug_btn_natural", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNatural },
        //     { ["name"]: "ug_btn_changename", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChangeName },
        //     { ["name"]: "up_add_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAddition },
        //     { ["name"]: "upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
        //     { ["name"]: "auto_upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAutoUpgrade }, //自动升级
        //     { ["name"]: "active_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickActive },
        // ];
        // UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        var group = this.mElemList["yewai_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "yewai_scroll", 0, 0, group.width, group.height, group);
    };
    BossWildWindow.prototype.onUnLoad = function () {
    };
    BossWildWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["yewai_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16");
        this.applyActInfo();
        this.refreshFrame();
    };
    BossWildWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["yewai_group"].visible = false;
    };
    BossWildWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_iconbg", _b["title"] = null, _b["font"] = null, _b["image"] = "boss_bossDi01", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 40, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = eui.Image, _d["name"] = name + "_refreshed", _d["title"] = null, _d["font"] = null, _d["image"] = "boss_text04", _d["color"] = gui.Color.white, _d["x"] = 60, _d["y"] = 170, _d["w"] = 0, _d["h"] = 0, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + "_block", _e["title"] = null, _e["font"] = null, _e["image"] = "boss_text01", _e["color"] = gui.Color.white, _e["x"] = 40, _e["y"] = 60, _e["w"] = 0, _e["h"] = 0, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = name + "_escape", _f["title"] = null, _f["font"] = null, _f["image"] = "boss_text05", _f["color"] = gui.Color.white, _f["x"] = 60, _f["y"] = 170, _f["w"] = 0, _f["h"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
            (_g = {}, _g["index_type"] = gui.Grid9Image, _g["name"] = name + "_namebg", _g["title"] = null, _g["font"] = null, _g["image"] = "ty_textDi07", _g["autoScale"] = true, _g["color"] = gui.Color.white, _g["x"] = 180, _g["y"] = 5, _g["w"] = 200, _g["h"] = 45, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = null, _g),
            (_h = {}, _h["index_type"] = eui.Label, _h["name"] = name + "_name", _h["title"] = Localize_cns("ROLE_TXT32"), _h["font"] = "ht_20_cc_stroke", _h["color"] = gui.Color.white, _h["x"] = 180, _h["y"] = 15, _h["w"] = 200, _h["h"] = 25, _h["fun_index"] = null, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = gui.Grid9Image, _j["name"] = name + "_refreshTipsBg", _j["title"] = null, _j["font"] = null, _j["image"] = "ty_textDi08", _j["autoScale"] = true, _j["color"] = gui.Color.white, _j["x"] = 180, _j["y"] = 55, _j["w"] = 350, _j["h"] = 55, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = null, _j),
            (_k = {}, _k["index_type"] = eui.Label, _k["name"] = name + "_refreshTips", _k["title"] = Localize_cns("FORGE_LEVEL_EFFECT_NEXT"), _k["font"] = "ht_20_lc", _k["color"] = gui.Color.black, _k["x"] = 185, _k["y"] = 55, _k["w"] = 340, _k["h"] = 55, _k["fun_index"] = null, _k["messageFlag"] = true, _k),
            (_l = {}, _l["index_type"] = gui.Grid9Image, _l["name"] = name + "_fleeTipsBg", _l["title"] = null, _l["font"] = null, _l["image"] = "ty_textDi08", _l["autoScale"] = true, _l["color"] = gui.Color.white, _l["x"] = 180, _l["y"] = 115, _l["w"] = 350, _l["h"] = 30, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = null, _l),
            (_m = {}, _m["index_type"] = eui.Label, _m["name"] = name + "_fleeTips", _m["title"] = Localize_cns("BOSS_TXT41"), _m["font"] = "ht_20_lc", _m["color"] = gui.Color.black, _m["x"] = 185, _m["y"] = 117, _m["w"] = 340, _m["h"] = 25, _m["fun_index"] = null, _m["messageFlag"] = true, _m),
            (_o = {}, _o["index_type"] = eui.Label, _o["name"] = name + "_nextTime", _o["title"] = String.format(Localize_cns("BOSS_TXT15"), "00:00"), _o["font"] = "ht_20_lc", _o["color"] = gui.Color.green, _o["x"] = 190, _o["y"] = 160, _o["w"] = 200, _o["h"] = 25, _o["fun_index"] = null, _o["messageFlag"] = true, _o),
            (_p = {}, _p["index_type"] = eui.Label, _p["name"] = name + "_et", _p["title"] = String.format(Localize_cns("BOSS_TXT18"), 90), _p["font"] = "ht_20_rc", _p["color"] = gui.Color.brown, _p["x"] = 300, _p["y"] = 160, _p["w"] = 230, _p["h"] = 25, _p["fun_index"] = null, _p["messageFlag"] = true, _p),
            (_q = {}, _q["index_type"] = gui.Button, _q["name"] = name + "_enter", _q["title"] = Localize_cns("BOSS_TXT17"), _q["font"] = "ht_20_cc_stroke", _q["image"] = "ty_tongYongBt3", _q["autoScale"] = true, _q["color"] = gui.Color.white, _q["x"] = 420, _q["y"] = 150, _q["w"] = 100, _q["h"] = 50, _q["event_name"] = egret.TouchEvent.TOUCH_TAP, _q["fun_index"] = this.onClickEnter, _q),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 100, 170, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(3001);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    };
    BossWildWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WildBoss);
        // {
        //         npcList: {[npcIndex]:[refreshTime, status]},         [下次刷新的时间戳，opBossActivityConfig[OrdinaryActivityIndex.WildBoss]]
        // }
        var npcList = {};
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList;
        }
        this.mElemList[name + "_refreshed"].visible = false;
        this.mElemList[name + "_block"].visible = false;
        this.mElemList[name + "_escape"].visible = false;
        this.mElemList[name + "_et"].visible = false;
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_nextTime"].visible = false;
        // this.mElemList[name + "_res_fight"].visible = false
        var monsterModelId = GetMonsterModel(config.entryId);
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId);
        var monName = "";
        var conf = GameConfig.MonsterConfig[config.entryId];
        if (conf) {
            monName = conf.Name;
        }
        this.mElemList[name + "_name"].text = monName + "(" + config.level + ")";
        this.mElemList[name + "_refreshTips"].text = Localize_cns("BOSS_TXT40") + config.refreshDes;
        if (GetHeroProperty("level") < config.level) {
            this.mElemList[name + "_et"].text = String.format(Localize_cns("BOSS_TXT18"), config.level);
            return;
        }
        var bossConfig = npcList[config.index];
        if (!bossConfig) {
            return;
        }
        this.mElemList[name + "_nextTime"].visible = true;
        this.mElemList[name + "_nextTime"].text = String.format(Localize_cns("BOSS_TXT15"), getFormatTimeSec(bossConfig[0]));
        if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].killStatus) {
            this.mElemList[name + "_block"].visible = true;
            this.mElemList[name + "_enter"].visible = true;
        }
        else if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].runStatus) {
            this.mElemList[name + "_escape"].visible = true;
        }
        else if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].existStatus) {
            this.mElemList[name + "_refreshed"].visible = true;
            this.mElemList[name + "_enter"].visible = true;
        }
        this.controlDataTable[name + "_enter"] = config.index;
        // for (let i = 0; i < 3; i++) {
        //     let entryId = config.itemShow[i]
        //     if (entryId == null) {
        //         this.mElemList[name + "itemBox" + i].setVisible(false)
        //     } else {
        //         this.mElemList[name + "itemBox" + i].setVisible(true)
        //         this.mElemList[name + "itemBox" + i].updateByEntry(entryId)
        //     }
        // }
    };
    BossWildWindow.prototype.refreshFrame = function () {
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var k in GameConfig.BossWildConfig) {
            var v = GameConfig.BossWildConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.level - b.level; });
        var group = this.mElemList["yewai_scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 210, 0, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    BossWildWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WildBoss);
    };
    BossWildWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    /////////////////////////////////////////////////
    BossWildWindow.prototype.onClickEnter = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var index = this.controlDataTable[name];
        var wnd = WngMrg.getInstance().getWindow("BossWildFrame");
        wnd.showWildFrame(index);
    };
    return BossWildWindow;
}(BaseCtrlWnd));
__reflect(BossWildWindow.prototype, "BossWildWindow");
//# sourceMappingURL=BossWildWindow.js.map