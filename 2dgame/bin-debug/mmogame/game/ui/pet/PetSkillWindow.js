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
var PetSkillWindow = (function (_super) {
    __extends(PetSkillWindow, _super);
    function PetSkillWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetSkillWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.petId = -1;
    };
    PetSkillWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "sk_clear_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickClear, _a),
            (_b = {}, _b["name"] = "sk_act_pic1", _b["messageFlag"] = true, _b),
            (_c = {}, _c["name"] = "sk_act_pic2", _c["messageFlag"] = true, _c),
            (_d = {}, _d["name"] = "sk_name", _d["messageFlag"] = true, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //主动技能
        this.mElemList["skillBox_Active"] = UISkillBox.newObj(this.mLayoutNode, "skillBox_Active", 0, 0, this.mElemList["sk_wnd"]);
        //被动技能
        for (var i = 0; i < 6; i++) {
            this.mElemList["skillBox_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["sk_wnd" + i]);
        }
        this.mElemList["sk_name_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d;
    };
    PetSkillWindow.prototype.onUnLoad = function () {
    };
    PetSkillWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mElemList["top_group"].visible = true;
        this.mElemList["skill_group"].visible = true;
        this.mElemList["title"].text = Localize_cns("PET_TXT1");
        this.refreshFrame();
    };
    PetSkillWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mElemList["top_group"].visible = false;
        this.mElemList["skill_group"].visible = false;
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetSkillWindow.prototype.refreshFrame = function () {
        if (this.petId <= 0) {
            this.petId = this.mParentWnd.getPetId();
        }
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId); //注意获得才会显示技能否则显示升级解锁界面
        if (petNetInfo == null) {
            return;
        }
        //更新战斗力
        var force = GetForceMath(GetPetProperty(this.petId));
        DrawNumberStringImage(this.mElemList["sk_force_num"], "zhanLi_", "z" + force, 0, 0, -3);
        //更新类型（金木水火土）
        var elemType = petConfigInfo.type;
        var elemStr = GetElemIcon(elemType);
        var elemValue = petConfigInfo.typeNum;
        AddRdContent(this.mElemList["sk_elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack");
        //神宠 名称 品质
        var quality = petConfigInfo.quality;
        var name = petConfigInfo.name;
        this.mElemList["qua_group"].visible = (quality >= opPetQuality.gold);
        var sr = petConfigInfo.sr;
        var quaIcon = GetPetSRIcon(sr);
        AddRdContent(this.mElemList["sk_name_rd"], "#" + quaIcon + name, "ht_24_cc_stroke", "white");
        //更新主动技能
        var skillId = petConfigInfo.skillid;
        var skillName = SkillSystem.getInstance().getSkillName(skillId);
        var skillDes = SkillSystem.getInstance().getSkillDes(skillId);
        this.mElemList["sk_name"].text = skillName;
        this.mElemList["skillBox_Active"].updatePetSkill(skillId);
        AddRdContent(this.mElemList["sk_des_rd"], skillDes, "ht_22_cc", "ublack", 3);
        //更新被动技能(可洗练)
        var passSkillList = petConfigInfo.passiveskill || [];
        if (petNetInfo && size_t(petNetInfo.passskilllist) > 0) {
            passSkillList = petNetInfo.passskilllist;
        }
        for (var i = 0; i < 6; i++) {
            var passSkillId = passSkillList[i];
            if (passSkillId) {
                this.mElemList["sk_pic" + i].visible = true;
                this.mElemList["sk_name" + i].visible = true;
                this.mElemList["skillBox_" + i].updatePetSkill(passSkillId);
                var skillName_1 = SkillSystem.getInstance().getSkillName(passSkillId);
                this.mElemList["sk_name" + i].text = skillName_1;
            }
            else {
                this.mElemList["skillBox_" + i].lock();
                this.mElemList["sk_pic" + i].visible = false;
                this.mElemList["sk_name" + i].visible = false;
            }
        }
        //更新星级
        var washSkillNum = petNetInfo.washskillnum || 0; //已洗练次数
        var star = PetSystem.getInstance().getPetSkillStart(washSkillNum);
        var maxStart = elemWashSkillOptions[cellOptionsIndex.PetSkill].MaxStart;
        for (var i = 0; i < maxStart; i++) {
            if (star >= i + 1) {
                this.mElemList["start" + i].source = "ty_star01";
            }
            else {
                this.mElemList["start" + i].source = "ty_starDi01";
            }
        }
        //更新模型
        this.updateActorModel();
    };
    PetSkillWindow.prototype.updateActorModel = function () {
        var modeID = GetPetModel(this.petId);
        var actorview = this.mElemList["sk_actor_view"];
        var actor = this.Player || Player.newObj();
        actor.loadModel(modeID);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 70);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(3);
    };
    PetSkillWindow.prototype.onClickClear = function (args) {
        var wnd = WngMrg.getInstance().getWindow("PetClearFrame");
        wnd.showClearWithPet(this.petId);
    };
    /////////////////////////////////////////////////////////////
    PetSkillWindow.prototype.refreshFrameWithIndex = function (petId) {
        this.petId = petId;
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        if (petNetInfo) {
            this.refreshFrame();
        }
        else {
            var wnd = this.mParentWnd.tabWndList.getWndWithIndex(0);
            wnd.refreshFrameWithIndex(petId);
        }
    };
    return PetSkillWindow;
}(BaseCtrlWnd));
__reflect(PetSkillWindow.prototype, "PetSkillWindow");
//# sourceMappingURL=PetSkillWindow.js.map