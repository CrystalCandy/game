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
var BossWildFrame = (function (_super) {
    __extends(BossWildFrame, _super);
    function BossWildFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossWildFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.timerList = {};
        this.mLayoutPaths = ["layouts/boss/BossWildLayout.exml"];
    };
    BossWildFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true);
        var mElemInfo = [
            (_a = {}, _a["name"] = "btn_fight", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickFight, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "btn_close", _b["title"] = null, _b["color"] = gui.Color.white, _b["right"] = 0, _b["top"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = "btn_back", _c["title"] = null, _c["color"] = gui.Color.white, _c["right"] = 0, _c["bottom"] = 0, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        // let mElemInfo: any = [
        // 	{["index_type"]: gui.ProgressBar,   ["name"]: "boss_pro", ["title"]: "", ["font"]: null, ["image"]: "boss_loadingDi01", ["thumbImage"]: "boss_loading01", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 300, ["w"]: 174, ["h"]: 21, },
        // ]
        // UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
        // let imb = this.mElemList["boss_pro"]
        // UiUtil.updateProgress(imb, 50, 100)
        this.mElemList["boss_model"] = UIActorView.newObj(this.mLayoutNode, "boss_model", 100, 100, this.mElemList["boss_model_group"]);
        this.mElemList["boss_model"].updateByPlayer(20001);
        this.mElemList["belong_to_rd"].setAlignFlag(gui.Flag.H_CENTER);
        AddRdContent(this.mElemList["boss_level_rd"], Localize_cns("BOSS_TXT28"), "ht_20_cc", "ublack");
        AddRdContent(this.mElemList["enter_request_rd"], Localize_cns("BOSS_TXT29"), "ht_20_cc", "ublack");
        AddRdContent(this.mElemList["escape_time_rd"], Localize_cns("BOSS_TXT30"), "ht_20_cc", "ublack");
        AddRdContent(this.mElemList["belong_to_rd"], Localize_cns("BOSS_TXT31"), "ht_20_cc", "white");
        AddRdContent(this.mElemList["rule_rd"], Localize_cns("BOSS_TXT32"), "ht_18_cc", "ublack");
        for (var i = 0; i < 5; i++) {
            this.mElemList["normal_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "normal_itemBox" + i, 150 + 85 * i, 10, this.mElemList["item_group"]);
        }
        for (var i = 0; i < 5; i++) {
            this.mElemList["rare_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "rare_itemBox" + i, 150 + 85 * i, 95, this.mElemList["item_group"]);
        }
        var _a, _b, _c;
    };
    BossWildFrame.prototype.onUnLoad = function () {
    };
    BossWildFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    BossWildFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    BossWildFrame.prototype.refreshFrame = function () {
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
        if (this.bossIndex == null) {
            return;
        }
        var bossInfo = GetActivity(ActivityDefine.Boss).getActBossInfo(OrdinaryActivityIndex.WildBoss, this.bossIndex);
        // {occupierData: [plrId, name, sex, roleEntryId, overTime], status: opBossActivityConfig[OrdinaryActivityIndex.WildBoss], runTime: runTime}
        if (bossInfo == null) {
            return;
        }
        var config = GameConfig.BossWildConfig[this.bossIndex];
        if (config == null) {
            return;
        }
        //boss模型
        var monsterModelId = GetMonsterModel(config.entryId);
        this.mElemList["boss_model"].updateByPlayer(monsterModelId);
        //boss名字
        var monName = "";
        var conf = GameConfig.MonsterConfig[config.entryId];
        if (conf) {
            monName = conf.Name;
        }
        this.mElemList["boss_name"].text = monName;
        AddRdContent(this.mElemList["boss_level_rd"], String.format(Localize_cns("BOSS_TXT28"), config.level), "ht_20_cc", "ublack");
        //进入条件
        if (bossInfo.status == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].killStatus) {
            AddRdContent(this.mElemList["enter_request_rd"], String.format(Localize_cns("BOSS_TXT29"), "#red" + Localize_cns("BOSS_TXT43")), "ht_20_cc", "ublack");
            AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT45")), "ht_20_cc", "ublack");
        }
        else {
            AddRdContent(this.mElemList["enter_request_rd"], String.format(Localize_cns("BOSS_TXT29"), Localize_cns("BOSS_TXT44")), "ht_20_cc", "ublack");
            if (bossInfo.status == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].runStatus) {
                AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT46")), "ht_20_cc", "ublack");
            }
            else {
                var runTime = bossInfo.runTime;
                var tick = function (delay) {
                    var leftTime = runTime - GetServerTime();
                    if (leftTime >= 0) {
                        AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), getFormatDiffTimeSimple(leftTime)), "ht_20_cc", "ublack");
                    }
                    else {
                        AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT46")), "ht_20_cc", "ublack");
                        if (this.timerList["escape"]) {
                            KillTimer(this.timerList["escape"]);
                            this.timerList["escape"] = null;
                        }
                    }
                };
                if (!this.timerList["escape"]) {
                    this.timerList["escape"] = SetTimer(tick, this, 200, true);
                }
            }
        }
        for (var i = 0; i < 5; i++) {
            if (config.itemShow[i]) {
                this.mElemList["normal_itemBox" + i].setVisible = true;
                this.mElemList["normal_itemBox" + i].updateByEntry(config.itemShow[i]);
            }
            else {
                this.mElemList["normal_itemBox" + i].setVisible = false;
            }
        }
        for (var i = 0; i < 5; i++) {
            if (config.rareItemShow[i]) {
                this.mElemList["rare_itemBox" + i].setVisible = true;
                this.mElemList["rare_itemBox" + i].updateByEntry(config.rareItemShow[i]);
            }
            else {
                this.mElemList["rare_itemBox" + i].setVisible = false;
            }
        }
        //当前归属
        if (bossInfo.occupierData && size_t(bossInfo.occupierData) > 0) {
            var iconName = GetActorImageName(bossInfo.occupierData[3], bossInfo.occupierData[2]);
            this.mElemList["rule_icon"].source = iconName;
            var overTime = bossInfo.occupierData[4];
            var plrName = bossInfo.occupierData[1];
            var tick = function (delay) {
                var leftTime = overTime - GetServerTime();
                if (leftTime >= 0) {
                    AddRdContent(this.mElemList["belong_to_rd"], String.format(Localize_cns("BOSS_TXT31"), plrName + "(" + getFormatDiffTimeSimple(leftTime) + ")"), "ht_20_cc_stroke", "white");
                }
                else {
                    AddRdContent(this.mElemList["belong_to_rd"], String.format(Localize_cns("BOSS_TXT31"), plrName), "ht_20_cc_stroke", "white");
                    if (this.timerList["belong"]) {
                        KillTimer(this.timerList["belong"]);
                        this.timerList["belong"] = null;
                    }
                }
            };
            if (!this.timerList["belong"]) {
                this.timerList["belong"] = SetTimer(tick, this, 200, true);
            }
        }
        else {
            this.mElemList["rule_icon"].source = "";
            AddRdContent(this.mElemList["belong_to_rd"], "", "ht_20_cc_stroke", "white");
        }
    };
    BossWildFrame.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    //////////////////////////////////////////
    BossWildFrame.prototype.geRenCheck = function () {
        return true;
    };
    BossWildFrame.prototype.quanMinCheck = function () {
        return true;
    };
    BossWildFrame.prototype.onClickFight = function (args) {
        if (this.bossIndex == null) {
            return;
        }
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.WildBoss, this.bossIndex);
    };
    ////////////////////////////公共接口
    BossWildFrame.prototype.showWildFrame = function (bossIndex) {
        if (bossIndex != null) {
            this.bossIndex = bossIndex;
            this.showWnd();
            RpcProxy.call("C2G_GetBossIndexData", OrdinaryActivityIndex.WildBoss, bossIndex);
        }
    };
    return BossWildFrame;
}(BaseWnd));
__reflect(BossWildFrame.prototype, "BossWildFrame");
//# sourceMappingURL=BossWildFrame.js.map