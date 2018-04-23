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
var BossSingleWindow = (function (_super) {
    __extends(BossSingleWindow, _super);
    function BossSingleWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossSingleWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    BossSingleWindow.prototype.onLoad = function () {
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
        var group = this.mElemList["geren_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
    };
    BossSingleWindow.prototype.onUnLoad = function () {
    };
    BossSingleWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["geren_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT1");
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.PersonBoss);
        this.refreshFrame();
    };
    BossSingleWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["geren_group"].visible = false;
    };
    BossSingleWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_iconbg", _b["title"] = null, _b["font"] = null, _b["image"] = "boss_bossDi01", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 20, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = name + "_namebg", _d["title"] = null, _d["font"] = null, _d["image"] = "ty_textDi07", _d["autoScale"] = true, _d["color"] = gui.Color.white, _d["x"] = 180, _d["y"] = 5, _d["w"] = 200, _d["h"] = 45, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_name", _e["title"] = Localize_cns("ROLE_TXT32"), _e["font"] = "ht_20_cc_stroke", _e["color"] = gui.Color.white, _e["x"] = 180, _e["y"] = 15, _e["w"] = 200, _e["h"] = 25, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "_left", _f["title"] = Localize_cns("BOSS_TXT5"), _f["font"] = "ht_20_lc", _f["color"] = gui.Color.green, _f["x"] = 190, _f["y"] = 50, _f["w"] = 200, _f["h"] = 25, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "_itemtl", _g["title"] = Localize_cns("BOSS_TXT6"), _g["font"] = "ht_20_lc", _g["color"] = gui.Color.black, _g["x"] = 190, _g["y"] = 75, _g["w"] = 200, _g["h"] = 25, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = eui.Label, _h["name"] = name + "_openTips", _h["title"] = Localize_cns("BOSS_TXT39"), _h["font"] = "ht_20_cc", _h["color"] = gui.Color.black, _h["x"] = 430, _h["y"] = 80, _h["w"] = 120, _h["h"] = 25, _h["fun_index"] = null, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = eui.Image, _j["name"] = name + "_finish", _j["title"] = null, _j["font"] = null, _j["image"] = "boss_text01", _j["color"] = gui.Color.white, _j["x"] = 435, _j["y"] = 40, _j["w"] = 0, _j["h"] = 0, _j["event_name"] = null, _j["fun_index"] = null, _j["messageFlag"] = true, _j),
            (_k = {}, _k["index_type"] = gui.Button, _k["name"] = name + "_enter", _k["title"] = Localize_cns("BOSS_TXT7"), _k["font"] = "ht_20_cc_stroke", _k["image"] = "ty_tongYongBt6", _k["autoScale"] = true, _k["color"] = gui.Color.white, _k["x"] = 435, _k["y"] = 110, _k["w"] = 100, _k["h"] = 50, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onClickFight, _k),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 180 + 85 * i, 100, window);
        }
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 150, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(20001);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    };
    BossSingleWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.PersonBoss);
        var npcList = {};
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList;
        }
        this.mElemList[name + "_finish"].visible = false;
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_openTips"].visible = false;
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
        //剩余次数
        var count = config.chance;
        if (npcList[config.index]) {
            count = count - npcList[config.index];
        }
        this.mElemList[name + "_left"].text = Localize_cns("BOSS_TXT5") + count;
        //可挑战、已杀怪、未开启
        if (GetHeroProperty("level") < config.level) {
            this.mElemList[name + "_openTips"].visible = true;
            this.mElemList[name + "_openTips"].text = String.format(Localize_cns("BOSS_TXT39"), config.level);
        }
        else if (count <= 0) {
            this.mElemList[name + "_finish"].visible = true;
        }
        else {
            this.mElemList[name + "_enter"].visible = true;
        }
        this.controlDataTable[name + "_enter"] = config.index;
    };
    BossSingleWindow.prototype.refreshFrame = function () {
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var k in GameConfig.BossSingleConfig) {
            var v = GameConfig.BossSingleConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.level - b.level; });
        var group = this.mElemList["geren_scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 190, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    BossSingleWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    ////////////////////////////////////////////////////////////////////////////////////
    BossSingleWindow.prototype.onClickFight = function (args) {
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
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.PersonBoss, index);
    };
    return BossSingleWindow;
}(BaseCtrlWnd));
__reflect(BossSingleWindow.prototype, "BossSingleWindow");
//# sourceMappingURL=BossSingleWindow.js.map