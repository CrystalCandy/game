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
var CopyMaterialWindow = (function (_super) {
    __extends(CopyMaterialWindow, _super);
    function CopyMaterialWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyMaterialWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    CopyMaterialWindow.prototype.onLoad = function () {
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
        var group = this.mElemList["cailiao_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "cailiao_scroll", 0, 0, group.width, group.height, group);
    };
    CopyMaterialWindow.prototype.onUnLoad = function () {
    };
    CopyMaterialWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["cailiao_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT1");
        this.applyActInfo();
        this.refreshFrame();
    };
    CopyMaterialWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["cailiao_group"].visible = false;
    };
    CopyMaterialWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_namebg", _b["title"] = null, _b["font"] = null, _b["image"] = "fb_biaoTiDi01", _b["autoScale"] = true, _b["color"] = gui.Color.white, _b["x"] = 20, _b["y"] = 5, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_name", _c["title"] = Localize_cns("ROLE_TXT32"), _c["font"] = "ht_20_cc_stroke", _c["color"] = gui.Color.white, _c["x"] = 20, _c["y"] = 10, _c["w"] = 263, _c["h"] = 25, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = name + "_leftTime", _d["font"] = "ht_20_rc", _d["color"] = gui.Color.brown, _d["x"] = 300, _d["y"] = 15, _d["w"] = 240, _d["h"] = 25, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "_enter", _e["title"] = Localize_cns("COPY_TXT6"), _e["font"] = "ht_24_cc_stroke", _e["image"] = "ty_tongYongBt3", _e["autoScale"] = true, _e["color"] = gui.Color.white, _e["x"] = 350, _e["y"] = 60, _e["w"] = 150, _e["h"] = 60, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickFight, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = name + "_consumIcon", _f["image"] = "ty_zuanShiIcon01", _f["x"] = 390, _f["y"] = 40, _f["w"] = 0, _f["h"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f["autoScale"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "_consum", _g["title"] = "X30", _g["font"] = "ht_20_lc", _g["color"] = gui.Color.black, _g["x"] = 425, _g["y"] = 45, _g["w"] = 200, _g["h"] = 25, _g["fun_index"] = null, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = name + "_sweap", _h["title"] = Localize_cns("COPY_TXT7"), _h["font"] = "ht_24_cc_stroke", _h["image"] = "ty_tongYongBt3", _h["autoScale"] = true, _h["color"] = gui.Color.white, _h["x"] = 350, _h["y"] = 75, _h["w"] = 150, _h["h"] = 60, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickSweap, _h),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        this.mElemList[name + "_leftTime"].setAlignFlag(gui.Flag.CENTER_CENTER);
        AddRdContent(this.mElemList[name + "_leftTime"], String.format(Localize_cns("COPY_TXT5"), "#red" + 90), "ht_22_cc", "ublack");
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_sweap"].enabled = false;
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 25 + 85 * i, 50, window);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    CopyMaterialWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.MaterialBoss);
        // {
        //         prizeRecord: {[npcIndex]:count 挑战/扫荡过的次数},
        //         totallCount: 总挑战/扫荡次数,
        // }
        var count = 0;
        if (actInfo) {
            if (actInfo.prizeRecord[config.index]) {
                count = actInfo.prizeRecord[config.index];
            }
        }
        this.mElemList[name + "_enter"].visible = false;
        this.mElemList[name + "_enter"].enabled = true;
        this.mElemList[name + "_sweap"].visible = false;
        this.mElemList[name + "_sweap"].enabled = true;
        this.mElemList[name + "_consumIcon"].visible = false;
        this.mElemList[name + "_consum"].visible = false;
        this.mElemList[name + "_name"].text = config.title + "(" + config.level + ")";
        var list = AnalyPrizeFormat(config.itemShow || []);
        for (var i = 0; i < 3; i++) {
            if (!list[i]) {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
            else {
                var _a = list[i], entryId = _a[0], count_1 = _a[1];
                this.mElemList[name + "itemBox" + i].setVisible(true);
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, count_1);
            }
        }
        this.controlDataTable[name + "_enter"] = config.index;
        if (GetHeroProperty("level") < config.level) {
            this.mElemList[name + "_enter"].enabled = false;
            this.mElemList[name + "_enter"].visible = true;
            AddRdContent(this.mElemList[name + "_leftTime"], String.format(Localize_cns("BOSS_TXT39"), config.level), "ht_18_cc", "ublack");
        }
        else {
            AddRdContent(this.mElemList[name + "_leftTime"], "", "ht_18_cc", "ublack");
            if (count < config.chance) {
                if (GetHeroProperty("level") - config.level < config.sweepLevel) {
                    this.mElemList[name + "_enter"].visible = true;
                }
                else {
                    this.mElemList[name + "_sweap"].visible = true;
                    this.mElemList[name + "_sweap"].text = Localize_cns("COPY_TXT13");
                    this.controlDataTable[name + "_sweap"] = [1, config.index]; //1表示免费扫荡
                }
            }
            else {
                count = count - config.chance;
                //[0]=1,[5]=1,[6]=2     表示达到指定vip等级后当天可购买次数+x (1 2)
                var enableCount = 0;
                var nextVip = -1;
                var nextAddCount = -1;
                this.mElemList[name + "_consumIcon"].visible = true;
                this.mElemList[name + "_consum"].visible = true;
                this.mElemList[name + "_consum"].text = "X" + config.rmb;
                for (var i = 0; i <= defaultValue.DEFALUT_VIP_MAX_LEVEL; i++) {
                    if (i <= GetHeroProperty("VIP_level")) {
                        enableCount = enableCount + checkNull(config.vipCount[i], 0);
                    }
                    else {
                        if (config.vipCount[i]) {
                            nextVip = i;
                            nextAddCount = config.vipCount[i];
                            break;
                        }
                    }
                }
                if (count < enableCount) {
                    AddRdContent(this.mElemList[name + "_leftTime"], String.format(Localize_cns("COPY_TXT5"), enableCount - count), "ht_18_cc", "ublack");
                    this.mElemList[name + "_sweap"].visible = true;
                    this.mElemList[name + "_sweap"].text = Localize_cns("COPY_TXT7");
                    this.controlDataTable[name + "_sweap"] = [2, config.index]; //2表示购买扫荡
                }
                else {
                    if (nextVip >= 0) {
                        AddRdContent(this.mElemList[name + "_leftTime"], String.format(Localize_cns("COPY_TXT14"), nextVip, nextAddCount), "ht_18_cc", "ublack");
                        this.mElemList[name + "_sweap"].visible = true;
                        this.mElemList[name + "_sweap"].enabled = false;
                        this.mElemList[name + "_sweap"].text = Localize_cns("COPY_TXT7");
                    }
                    else {
                        AddRdContent(this.mElemList[name + "_leftTime"], Localize_cns("COPY_TXT15"), "ht_18_cc", "ublack");
                        this.mElemList[name + "_sweap"].visible = true;
                        this.mElemList[name + "_sweap"].enabled = false;
                        this.mElemList[name + "_sweap"].text = Localize_cns("COPY_TXT7");
                    }
                }
            }
        }
    };
    CopyMaterialWindow.prototype.refreshFrame = function () {
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var k in GameConfig.CopyMaterialConfig) {
            var v = GameConfig.CopyMaterialConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.level - b.level; });
        var group = this.mElemList["cailiao_scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 150, 0, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    CopyMaterialWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.MaterialBoss);
    };
    CopyMaterialWindow.prototype.updateWnd = function () {
        return this.refreshFrame();
    };
    //////////////////////////////////////////////////////////////////////////
    CopyMaterialWindow.prototype.onClickFight = function (args) {
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
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.MaterialBoss, index);
    };
    CopyMaterialWindow.prototype.onClickSweap = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        var _a = this.controlDataTable[name], sType = _a[0], index = _a[1];
        if (sType == 2) {
            if (!GameConfig.CopyMaterialConfig[index]) {
                return;
            }
            if (GetHeroProperty("gold") < GameConfig.CopyMaterialConfig[index].rmb) {
                return MsgSystem.addTagTips(Localize_cns("COPY_TXT16"));
            }
        }
        RpcProxy.call("C2G_SweepBossActivity", OrdinaryActivityIndex.MaterialBoss, index);
    };
    return CopyMaterialWindow;
}(BaseCtrlWnd));
__reflect(CopyMaterialWindow.prototype, "CopyMaterialWindow");
//# sourceMappingURL=CopyMaterialWindow.js.map