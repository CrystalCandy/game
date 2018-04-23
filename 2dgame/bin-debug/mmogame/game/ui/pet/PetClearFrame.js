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
var PetClearFrame = (function (_super) {
    __extends(PetClearFrame, _super);
    function PetClearFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetClearFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetClearLayout.exml"];
        this.petId = -1;
        this.lockList = [];
    };
    PetClearFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "wash_btn", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickLowWash, _a),
            (_b = {}, _b["name"] = "high_wash_btn", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickHighWash, _b),
            (_c = {}, _c["name"] = "exchange_btn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickExchange, _c),
            (_d = {}, _d["name"] = "btn_close", _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.hideWnd, _d),
            (_e = {}, _e["name"] = "btn_close_top", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.hideWnd, _e),
            (_f = {}, _f["name"] = "auto", _f["color"] = gui.Color.saddlebrown, _f)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        AddRdContent(this.mElemList["clear_tips_rd"], Localize_cns("PET_TXT7"), "ht_20_cc", "ublack", 3);
        for (var i = 0; i < 6; i++) {
            var checkBox = this.mElemList["lt_check" + i];
            checkBox.addEventListener(egret.TouchEvent.CHANGE, this.onClickCheckBox, this);
            this.mElemList["skillBox_lt_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_lt_" + i, 0, 0, this.mElemList["lt_wnd" + i]);
            this.mElemList["rt_check" + i].touchEnabled = false;
            this.mElemList["skillBox_rt_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_rt_" + i, 0, 0, this.mElemList["rt_wnd" + i]);
        }
        this.mElemList["prop_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["high_prop_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["skill_lock_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d, _e, _f;
    };
    PetClearFrame.prototype.onUnLoad = function () {
    };
    PetClearFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshItem, this)
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    PetClearFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshItem, this)
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
    };
    PetClearFrame.prototype.refreshFrame = function () {
        if (this.petId <= 0)
            return;
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        //当前技能列表
        var curList = petConfigInfo.passiveskill;
        if (petNetInfo.passskilllist && size_t(petNetInfo.passskilllist) > 0) {
            curList = petNetInfo.passskilllist;
        }
        //洗练技能列表
        var washList = petNetInfo.washskilllist || [];
        for (var i = 0; i < 6; i++) {
            //当前技能
            if (curList[i]) {
                var skillId = curList[i];
                this.mElemList["skillBox_lt_" + i].updatePetSkill(skillId);
                this.mElemList["lt_check" + i].visible = true;
                var info = SkillSystem.getInstance().getPetSkillInfo(skillId);
                var quality = info.quality;
                var color = SkillSystem.getInstance().getSkillColor(quality);
                var sName = SkillSystem.getInstance().getSkillName(skillId);
                var sDes = SkillSystem.getInstance().getSkillDes(skillId);
                var str = "#" + color + sName + "#br#saddlebrown" + sDes;
                AddRdContent(this.mElemList["lt_rd" + i], str, "ht_20_cc", "saddlebrown", 5);
            }
            else {
                this.mElemList["lt_check" + i].visible = false;
                this.mElemList["skillBox_lt_" + i].lock();
                AddRdContent(this.mElemList["lt_rd" + i], Localize_cns("NOT_OPEN"), "ht_20_cc", "saddlebrown");
            }
            //洗练技能
            if (washList[i]) {
                var skillId = washList[i];
                this.mElemList["skillBox_rt_" + i].updatePetSkill(skillId);
                this.mElemList["rt_check" + i].visible = true;
                var info = SkillSystem.getInstance().getPetSkillInfo(skillId);
                var quality = info.quality;
                var color = SkillSystem.getInstance().getSkillColor(quality);
                var sName = SkillSystem.getInstance().getSkillName(skillId);
                var sDes = SkillSystem.getInstance().getSkillDes(skillId);
                var str = "#" + color + sName + "#br#saddlebrown" + sDes;
                AddRdContent(this.mElemList["rt_rd" + i], str, "ht_24_cc", "ublack", 5);
            }
            else {
                this.mElemList["rt_check" + i].visible = false;
                this.mElemList["skillBox_rt_" + i].lock();
                AddRdContent(this.mElemList["rt_rd" + i], Localize_cns("NOT_OPEN"), "ht_24_cc", "ublack");
            }
        }
        //锁定
        this.refreshLockWnd();
        //消耗材料
        this.refreshItem();
    };
    //更新材料
    PetClearFrame.prototype.refreshItem = function () {
        var washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId];
        var lowId = washConfig.itemid;
        var highId = washConfig.highitemid;
        var lowCount = ItemSystem.getInstance().getItemCount(lowId);
        var lowLimit = washConfig.itemnum;
        var highCount = ItemSystem.getInstance().getItemCount(highId);
        var highLimit = washConfig.highitemnum;
        var lowcolor = lowCount >= lowLimit ? "#lime" : "#red";
        var highcolor = highCount >= highLimit ? "#lime" : "#red";
        AddRdContent(this.mElemList["prop_rd"], GetTagIcon(lowId) + lowcolor + lowCount + "/" + lowLimit, "ht_22_cc", "saddlebrown");
        AddRdContent(this.mElemList["high_prop_rd"], GetTagIcon(highId) + highcolor + highCount + "/" + highLimit, "ht_22_cc", "saddlebrown");
    };
    //更新锁定技能数量
    PetClearFrame.prototype.refreshLockWnd = function () {
        this.lockList = [];
        var checkCount = 0;
        for (var i = 0; i < 6; i++) {
            var checkBox = this.mElemList["lt_check" + i];
            if (checkBox.selected) {
                checkCount = checkCount + 1;
                JsUtil.arrayInstert(this.lockList, i);
            }
            this.mElemList["rt_check" + i].source = checkBox.icon;
        }
        var cost = elemWashSkillOptions[cellOptionsIndex.PetSkill].LockSpend[checkCount - 1] || 0;
        AddRdContent(this.mElemList["skill_lock_rd"], String.format(Localize_cns("PET_TXT8"), checkCount, cost), "ht_22_cc", "ublack");
    };
    //////////////////////////////////////////////////
    PetClearFrame.prototype.onClickCheckBox = function (egret) {
        this.refreshLockWnd();
    };
    //低级洗练
    PetClearFrame.prototype.onClickLowWash = function (args) {
        var washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId];
        var lowId = washConfig.itemid;
        var lowCount = ItemSystem.getInstance().getItemCount(lowId);
        var lowLimit = washConfig.itemnum;
        if (lowCount < lowLimit) {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"));
            return;
        }
        var autoBuy = this.mElemList["auto_check"].selected ? 1 : 0;
        RpcProxy.call("C2G_ACTOR_PET_SKILL_WASH", this.petId, 0, autoBuy, this.lockList);
    };
    //高级洗练
    PetClearFrame.prototype.onClickHighWash = function (args) {
        var washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId];
        var highId = washConfig.highitemid;
        var highCount = ItemSystem.getInstance().getItemCount(highId);
        var highLimit = washConfig.highitemnum;
        if (highCount < highLimit) {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"));
            return;
        }
        var autoBuy = this.mElemList["auto_check"].selected ? 1 : 0;
        RpcProxy.call("C2G_ACTOR_PET_SKILL_WASH", this.petId, 1, autoBuy, this.lockList);
    };
    //替换技能
    PetClearFrame.prototype.onClickExchange = function (args) {
        RpcProxy.call("C2G_ACTOR_PET_SKILL_ACCEPT", this.petId);
    };
    //////////////////////////////////////////////////
    PetClearFrame.prototype.showClearWithPet = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetClearFrame;
}(BaseWnd));
__reflect(PetClearFrame.prototype, "PetClearFrame");
//# sourceMappingURL=PetClearFrame.js.map