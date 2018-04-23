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
var PetUpgradeWindow = (function (_super) {
    __extends(PetUpgradeWindow, _super);
    function PetUpgradeWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetUpgradeWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.petId = 0;
    };
    PetUpgradeWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "ug_pokedex_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickPokedex, _a),
            (_b = {}, _b["name"] = "ug_force_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickForceBtn, _b),
            (_c = {}, _c["name"] = "ug_btn_show", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickShow, _c),
            (_d = {}, _d["name"] = "ug_btn_embattle", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickEmbattle, _d),
            (_e = {}, _e["name"] = "ug_btn_natural", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickNatural, _e),
            (_f = {}, _f["name"] = "ug_btn_changename", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickChangeName, _f),
            (_g = {}, _g["name"] = "up_add_btn", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickAddition, _g),
            (_h = {}, _h["name"] = "upgrade_btn", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickUpgrade, _h),
            (_j = {}, _j["name"] = "auto_upgrade_btn", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onClickAutoUpgrade, _j),
            (_k = {}, _k["name"] = "active_btn", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onClickActive, _k),
            (_l = {}, _l["name"] = "top_left_btn", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onClickLeft, _l),
            (_m = {}, _m["name"] = "top_right_btn", _m["title"] = null, _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.onClickRight, _m),
            (_o = {}, _o["name"] = "card_gain", _o["title"] = null, _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = this.onClickGain, _o),
            (_p = {}, _p["name"] = "ug_skill_txt", _p["messageFlag"] = true, _p),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["up_actor_view"] = UIActorView.newObj(this.mLayoutNode, "up_actor_view", 60, 150, this.mElemList["ug_actor_wnd"]);
        this.mElemList["gain_box"] = UIGainBox.newObj(this.mLayoutNode, "gain_box", 0, 0, this.mElemList["unactive_exp_wnd"]);
        var group = this.mElemList["skill_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        this.mElemList["skillBox"] = UISkillBox.newObj(this.mLayoutNode, "skillBox", 0, 0, this.mElemList["ug_skill_bg"]);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 180, 40, this.mElemList["unactive_exp_wnd"]);
        this.mElemList["elem_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["ug_name_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["exp_material_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["ug_sum_pet"].setAlignFlag(gui.Flag.RIGHT);
        this.mElemList["ug_sign_wnd"].visible = false;
        this.mElemList["ug_level_wnd"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    };
    PetUpgradeWindow.prototype.onUnLoad = function () {
        if (this.showTimer) {
            GameTimer.getInstance().killTimer(this.showTimer);
            this.showTimer = null;
        }
    };
    PetUpgradeWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this);
        this.mElemList["top_group"].visible = true;
        this.mElemList["upgrade_group"].visible = true;
        this.mElemList["title"].text = Localize_cns("PET_TXT1");
        this.refreshFrame();
    };
    PetUpgradeWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this);
        this.mElemList["top_group"].visible = false;
        this.mElemList["upgrade_group"].visible = false;
    };
    PetUpgradeWindow.prototype.refreshFrame = function () {
        if (this.petId <= 0) {
            this.petId = this.mParentWnd.selectId;
        }
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        var unlock = false;
        //宠物激活
        if (petNetInfo) {
            unlock = true;
        }
        //更新战力
        var force = petNetInfo ? petNetInfo.force : GetForceMath(GetPetProperty(this.petId));
        DrawNumberStringImage(this.mElemList["ug_force_num"], "zhanLi_", "z" + force, 0, 0, -3);
        //更新类型（金木水火土）
        var elemType = petConfigInfo.type;
        var elemStr = GetElemIcon(elemType);
        var elemValue = petConfigInfo.typeNum;
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack");
        //未激活和等级
        if (unlock) {
            this.mElemList["ug_sign_wnd"].visible = false;
            this.mElemList["ug_level_wnd"].visible = true;
            this.mElemList["ug_level_txt"].text = petNetInfo.stage + Localize_cns("PET_TXT9");
        }
        else {
            this.mElemList["ug_sign_wnd"].visible = true;
            this.mElemList["ug_level_wnd"].visible = false;
        }
        //更新模型
        this.updateActorModel();
        //更新品质和名称
        var quality = petConfigInfo.quality;
        var sr = petConfigInfo.sr;
        var icon = GetPetSRIcon(sr);
        var name = petConfigInfo.name;
        if (unlock && petNetInfo.name != null && petNetInfo.name != "") {
            name = petNetInfo.name;
        }
        AddRdContent(this.mElemList["ug_name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white");
        //更新技能
        if (unlock) {
            this.mElemList["active_up_wnd"].visible = true;
            this.mElemList["skill_wnd"].visible = false;
            //更新上阵按钮的状态
            var combatPos = petNetInfo.combatpos || opPetCombatPos.Rest;
            var btn = this.mElemList["ug_btn_embattle"];
            if (combatPos == opPetCombatPos.Rest) {
                btn.text = Localize_cns("PET_SIGN_TXT2");
                btn.source = "ty_tongYongBt8";
            }
            else {
                btn.text = Localize_cns("PET_SIGN_TXT1");
                btn.source = "ty_tongYongBt7";
            }
            //更新主动技能
            this.mElemList["skillBox"].updatePetSkill(petConfigInfo.skillid);
        }
        else {
            this.mElemList["active_up_wnd"].visible = false;
            this.mElemList["skill_wnd"].visible = true;
            var activeSkillId = petConfigInfo.skillid;
            var passiveSkillList = petConfigInfo.passiveskill;
            var skillList = [];
            JsUtil.arrayInstert(skillList, activeSkillId);
            for (var i in passiveSkillList) {
                JsUtil.arrayInstert(skillList, passiveSkillList[i]);
            }
            var scroll_1 = this.scroll;
            scroll_1.clearItemList();
            for (var k = 0; k < size_t(skillList); k++) {
                var skillId = skillList[k];
                var window_1 = scroll_1.getItemWindow(k, 90, 90, 0, 0);
                this.initItemWindow(window_1);
                this.refreshItemWindow(window_1, skillId, k);
            }
            scroll_1.refreshScroll();
        }
        //更新总战力和激活宠物总数
        force = s_GetSumPetForce() || GetForceMath(GetSumPetProperty());
        AddRdContent(this.mElemList["ug_sum_force"], Localize_cns("PET_TXT17") + force, "ht_22_cc", "ublack");
        var activeList = PetSystem.getInstance().getPetActiveList();
        var count = size_t(activeList);
        AddRdContent(this.mElemList["ug_sum_pet"], Localize_cns("PET_TXT18") + count, "ht_22_cc", "ublack");
        //更新加成按钮
        if (unlock) {
            this.mElemList["up_add_btn"].visible = true;
        }
        else {
            this.mElemList["up_add_btn"].visible = false;
        }
        if (unlock) {
            this.mElemList["active_exp_wnd"].visible = true;
            this.mElemList["unactive_exp_wnd"].visible = false;
            //更新经验进度条
            var key = cellOptionsName[cellOptionsIndex.Pet - 1];
            var stage = petNetInfo.stage;
            var maxExp = GameConfig.FunUpgradeStageConfig[key][stage].maxexp;
            var curExp = petNetInfo.stageexp;
            UiUtil.updateProgress(this.mElemList["ug_exp_pro"], curExp, maxExp);
            //更新升级消耗材料
            var material = FunSystem.getInstance().getFunUpgradeMaterial(cellOptionsIndex.Pet, stage);
            var str = Localize_cns("PET_TXT4") + "#space_10";
            var ownCount = ItemSystem.getInstance().getItemCount(material.itemId);
            var itemColor = ownCount >= material.itemNum ? "#lime" : "#red";
            str = str + GetTagIcon(material.itemId) + itemColor + ownCount + "/" + material.itemNum + "#space_10";
            var moneyColor = GetHeroProperty("funds") >= material.money ? "#lime" : "#red"; //暂时用金币代替
            str = str + GetMoneyIcon(material.moneyUni) + moneyColor + material.money;
            AddRdContent(this.mElemList["exp_material_rd"], str, "ht_24_cc", "ublack");
        }
        else {
            this.mElemList["active_exp_wnd"].visible = false;
            this.mElemList["unactive_exp_wnd"].visible = true;
            //更新未激活和材料
            var itemId = petConfigInfo.itemid;
            var itemName = ItemSystem.getInstance().getItemName(itemId);
            var itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0;
            var needCount = petConfigInfo.itemnum;
            var color = GetQualityColorStr(quality);
            this.mElemList["itemBox"].updateByEntry(itemId);
            var itemColor = itemCount >= needCount ? "#lime" : "#red";
            AddRdContent(this.mElemList["active_card_rd"], "#" + color + itemName + Localize_cns("PET_TXT23") + itemColor + "（" + itemCount + "/" + needCount + "）", "ht_24_cc", "ublack", 10);
            if (itemCount == 0) {
                this.mElemList["active_btn"].visible = false;
                this.mElemList["card_gain"].visible = true;
            }
            else {
                this.mElemList["active_btn"].visible = true;
                this.mElemList["card_gain"].visible = false;
            }
        }
        this.checkAutoUpgrade(this.mElemList["auto_upgrade_btn"]);
    };
    PetUpgradeWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        this.mElemList["skillBox_" + name] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + name, 0, 0, window, 0.9);
    };
    PetUpgradeWindow.prototype.refreshItemWindow = function (window, skillId, k) {
        var name = window.name;
        this.mElemList["skillBox_" + name].updatePetSkill(skillId);
    };
    PetUpgradeWindow.prototype.updateActorModel = function () {
        var modeID = GetPetModel(this.petId);
        var actorview = this.mElemList["up_actor_view"];
        var actor = actorview.updateByPlayer(modeID);
    };
    /////////////////////////////响应函数/////////////////////////////
    PetUpgradeWindow.prototype.onClickPokedex = function (event) {
        WngMrg.getInstance().showWindow("PetListFrame");
    };
    PetUpgradeWindow.prototype.onClickForceBtn = function (event) {
        var wnd = WngMrg.getInstance().getWindow("PetAttributeFrame");
        wnd.showPetAttributeWithId(this.petId);
    };
    //展示
    PetUpgradeWindow.prototype.onClickShow = function (event) {
        if (this.showTimer) {
            GameTimer.getInstance().killTimer(this.showTimer);
            this.showTimer = null;
        }
        RpcProxy.call("C2G_ACTOR_PET_SHOW", this.petId);
        var limit = 60;
        this.mElemList["ug_btn_show"].touchEnabled = false;
        this.mElemList["ug_btn_show"].source = "ty_tongYongBt8";
        this.mElemList["ug_btn_show"].text = limit + "s";
        this.showTimer = GameTimer.getInstance().setTimer(function (delay) {
            limit = limit - 1;
            this.mElemList["ug_btn_show"].text = limit + "s";
            if (limit <= 0) {
                GameTimer.getInstance().killTimer(this.showTimer);
                this.showTimer = null;
                this.mElemList["ug_btn_show"].source = "ty_tongYongBt7";
                this.mElemList["ug_btn_show"].text = Localize_cns("ZHANSHI");
                this.mElemList["ug_btn_show"].touchEnabled = true;
                limit = 60; //注意重置时间
            }
        }, this, 1000);
    };
    //上阵 休息
    PetUpgradeWindow.prototype.onClickEmbattle = function (event) {
        var info = PetSystem.getInstance().getPetInfo(this.petId);
        if (info) {
            var combatPos = info.combatpos || opPetCombatPos.Rest;
            if (combatPos == opPetCombatPos.Rest) {
                var wnd = WngMrg.getInstance().getWindow("PetEmbattleFrame");
                wnd.showWithPetId(this.petId);
            }
            else {
                //直接休息           
                RpcProxy.call("C2G_ACTOR_PET_COMBAT_SET", this.petId, opPetCombatPos.Rest);
            }
        }
    };
    //资质
    PetUpgradeWindow.prototype.onClickNatural = function (event) {
        var wnd = WngMrg.getInstance().getWindow("PetNaturlFrame");
        wnd.onShowWithPetId(this.petId);
    };
    //改名
    PetUpgradeWindow.prototype.onClickChangeName = function (event) {
        var wnd = WngMrg.getInstance().getWindow("PetChangeNameFrame");
        wnd.onShowWithPetId(this.petId);
    };
    //属性加成
    PetUpgradeWindow.prototype.onClickAddition = function (event) {
        var wnd = WngMrg.getInstance().getWindow("PetAttrAddFrame");
        wnd.showPetAttrAddWithId(this.petId);
    };
    PetUpgradeWindow.prototype.onClickUpgrade = function (event) {
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        //消耗材料
        var itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].itemid;
        var ownItemCount = ItemSystem.getInstance().getItemCount(itemId);
        var needItemCount = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].itemnum;
        //消耗货币
        var moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].moneyunit;
        var ownMoney = GetHeroMoney(moneyUnit);
        var costMoney = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].money;
        //判断货币是否足够
        if (ownMoney < costMoney) {
            //直接弹出对应的货币购买界面
            MsgSystem.addTagTips("NO_MONEY");
            this.mElemList["auto_upgrade_btn"].text = Localize_cns("PET_AUTO_UPGRADE");
            this.mElemList["auto_upgrade_btn"].selected = false;
            this.mElemList["upgrade_btn"].enabled = true;
            return;
        }
        //判断材料是否足够
        if (ownItemCount < needItemCount) {
            //弹出材料购买界面
            var quickWnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
            quickWnd.onShowWnd(itemId, true);
            this.mElemList["auto_upgrade_btn"].text = Localize_cns("PET_AUTO_UPGRADE");
            this.mElemList["auto_upgrade_btn"].selected = false;
            this.mElemList["upgrade_btn"].enabled = true;
        }
        else {
            var autoBuy = this.mElemList["auto_box"].selected ? 1 : 0;
            RpcProxy.call("C2G_ACTOR_PET_UPGRADE", this.petId, autoBuy);
        }
    };
    PetUpgradeWindow.prototype.onClickAutoUpgrade = function (event) {
        var btn = event.target;
        btn.selected = !btn.selected;
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        btn.level = petNetInfo.stage || 0;
        if (btn.selected) {
            btn.text = Localize_cns("STOP");
            this.mElemList["upgrade_btn"].enabled = false;
        }
        else {
            btn.text = Localize_cns("PET_AUTO_UPGRADE");
            this.mElemList["upgrade_btn"].enabled = true;
        }
        this.checkAutoUpgrade(btn);
    };
    PetUpgradeWindow.prototype.checkAutoUpgrade = function (btn) {
        if (btn.selected) {
            var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
            var curLv = petNetInfo.stage || 0;
            var oldLv = btn.level || 0;
            if (curLv == oldLv) {
                this.onClickUpgrade(null);
            }
            else {
                btn.text = Localize_cns("PET_AUTO_UPGRADE");
                this.mElemList["upgrade_btn"].enabled = true;
                btn.selected = false;
            }
        }
    };
    //激活
    PetUpgradeWindow.prototype.onClickActive = function (event) {
        RpcProxy.call("C2G_ACTOR_PET_UNLOCK", this.petId);
    };
    PetUpgradeWindow.prototype.onClickLeft = function () {
        this.mParentWnd.petListBox.leftMove();
    };
    PetUpgradeWindow.prototype.onClickRight = function () {
        this.mParentWnd.petListBox.rightMove();
    };
    PetUpgradeWindow.prototype.onClickGain = function () {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        if (petNetInfo) {
            return;
        }
        else {
            var itemId = petConfigInfo.itemId;
            var wnd = WngMrg.getInstance().getWindow("QuickGainFrame");
            var itemConfig = [["item", itemId], ["PetFrame"]];
            wnd.showQuickGainFrame(itemConfig);
        }
    };
    /////////////////////////////////////////////////////////////
    PetUpgradeWindow.prototype.refreshFrameWithIndex = function (petId) {
        this.petId = petId;
        this.refreshFrame();
    };
    return PetUpgradeWindow;
}(BaseCtrlWnd));
__reflect(PetUpgradeWindow.prototype, "PetUpgradeWindow");
//# sourceMappingURL=PetUpgradeWindow.js.map