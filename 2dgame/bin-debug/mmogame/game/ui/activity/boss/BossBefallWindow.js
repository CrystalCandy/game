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
var BossBefallWindow = (function (_super) {
    __extends(BossBefallWindow, _super);
    function BossBefallWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossBefallWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    BossBefallWindow.prototype.onLoad = function () {
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
        var group = this.mElemList["jie_scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group);
    };
    BossBefallWindow.prototype.onUnLoad = function () {
    };
    BossBefallWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["jie_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16");
        this.refreshFrame();
        this.applyActInfo();
    };
    BossBefallWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["jie_group"].visible = false;
    };
    BossBefallWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Image, _a["name"] = name + "_bg", _a["title"] = null, _a["fillMode"] = egret.BitmapFillMode.SCALE, _a["image"] = "boss_shengSiJieDi01", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width + 30, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_iconbg", _b["title"] = null, _b["font"] = null, _b["image"] = "boss_bossDi01", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 10, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_iconGroup", _c["title"] = null, _c["font"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 10, _c["h"] = 10, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = name + "_namebg", _d["title"] = null, _d["font"] = null, _d["image"] = "ty_textDi07", _d["autoScale"] = true, _d["color"] = gui.Color.white, _d["x"] = 180, _d["y"] = 25, _d["w"] = 200, _d["h"] = 45, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_name", _e["title"] = Localize_cns("ROLE_TXT32"), _e["font"] = "ht_20_cc_stroke", _e["color"] = gui.Color.white, _e["x"] = 180, _e["y"] = 35, _e["w"] = 200, _e["h"] = 25, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "_record", _f["title"] = Localize_cns("BOSS_TXT19"), _f["font"] = "ht_24_lc", _f["color"] = gui.Color.cyan, _f["x"] = 190, _f["y"] = 90, _f["w"] = 200, _f["h"] = 25, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "_et", _g["title"] = Localize_cns("BOSS_TXT20"), _g["font"] = "ht_24_cc", _g["color"] = gui.Color.white, _g["x"] = 350, _g["y"] = 90, _g["w"] = 230, _g["h"] = 25, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = name + "_enter", _h["title"] = Localize_cns("BOSS_TXT7"), _h["font"] = "ht_24_cc_stroke", _h["image"] = "ty_tongYongBt3", _h["autoScale"] = true, _h["color"] = gui.Color.white, _h["x"] = 400, _h["y"] = 60, _h["w"] = 140, _h["h"] = 55, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickEnter, _h),
            (_j = {}, _j["index_type"] = eui.Label, _j["name"] = name + "_finish", _j["title"] = Localize_cns("BOSS_TXT21"), _j["font"] = "ht_24_cc", _j["color"] = gui.Color.cyan, _j["x"] = 400, _j["y"] = 120, _j["w"] = 140, _j["h"] = 25, _j["fun_index"] = null, _j["messageFlag"] = true, _j),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        // this.mElemList[name +"_enter"].visible = false
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 100, 140, this.mElemList[name + "_iconGroup"]);
        this.mElemList[name + "_icon"].updateByPlayer(3001);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    BossBefallWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.LifeAndDeathBoss);
        // {
        //         maxIndex: 历史最大进度
        //         remainCount: 剩余帮助次数,
        //         prizeRecord: {[bossIndex]:value (0x1领取了战斗 0x2领取了宝箱奖励)}   opLifeAndDeathPrizeValueConfig
        // }
        var maxIndex = -1;
        var prizeRecord = {};
        if (actInfo && actInfo.prizeRecord) {
            maxIndex = actInfo.maxIndex;
            prizeRecord = actInfo.prizeRecord;
        }
        var bossConfig = config[0];
        //模型
        var monsterModelId = GetMonsterModel(bossConfig.entryId);
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId);
        //劫名称
        this.mElemList[name + "_name"].text = bossConfig.chapterName;
        //按钮逻辑
        var allPassFlag = true; //当前章是否全通（当天）
        var flag = false; //是否可进入
        for (var i = 0; i < config.length; i++) {
            var v = config[i];
            if (allPassFlag == true) {
                if (!prizeRecord[config.index]) {
                    allPassFlag = false;
                }
                else {
                    var value = prizeRecord[config.index];
                    if ((value & opLifeAndDeathPrizeValueConfig.fightPrize) != opLifeAndDeathPrizeValueConfig.fightPrize) {
                        allPassFlag = false;
                    }
                }
            }
            if (flag == false) {
                if (v.index <= maxIndex + 1) {
                    flag = true;
                }
            }
        }
        if (flag == true) {
            this.mElemList[name + "_enter"].visible = true;
            this.mElemList[name + "_et"].visible = false;
            this.controlDataTable[name + "_enter"] = bossConfig.chapterIndex;
        }
        else {
            this.mElemList[name + "_enter"].visible = false;
            this.mElemList[name + "_et"].visible = true;
        }
        this.mElemList[name + "_finish"].visible = allPassFlag;
    };
    BossBefallWindow.prototype.refreshFrame = function () {
        var list = [];
        var l = {};
        for (var _ in GameConfig.BossBefallConfig) {
            var v = GameConfig.BossBefallConfig[_];
            l[v.chapterIndex] = checkNull(l[v.chapterIndex], []);
            table_insert(l[v.chapterIndex], v);
        }
        for (var _ in l) {
            var v = l[_];
            table_sort(v, function (a, b) { return a.index - b.index; });
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a[0].chapterIndex - b[0].chapterIndex; });
        var group = this.mElemList["jie_scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 170, 0, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    BossBefallWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.LifeAndDeathBoss);
    };
    BossBefallWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    ///////////////////////////////////////////////////////////
    BossBefallWindow.prototype.onClickEnter = function (args) {
        var name = args.target.name;
        if (!this.controlDataTable[name]) {
            return;
        }
        var chapterIndex = this.controlDataTable[name];
        var wnd = WngMrg.getInstance().getWindow("BossBefallFrame");
        wnd.showWithChapter(chapterIndex);
    };
    return BossBefallWindow;
}(BaseCtrlWnd));
__reflect(BossBefallWindow.prototype, "BossBefallWindow");
//# sourceMappingURL=BossBefallWindow.js.map