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
/*
作者:
    yangguiming
    
创建时间：
   2017.02.16(周五)

意图：
   伙伴信息界面
公共接口：
   
*/
var PetPreviewFrame = (function (_super) {
    __extends(PetPreviewFrame, _super);
    function PetPreviewFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetPreviewFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetPreviewLayout.exml"];
    };
    PetPreviewFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    PetPreviewFrame.prototype.onUnLoad = function () {
    };
    PetPreviewFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.setAlignCenter(true, true);
        this.refreshFrame();
    };
    PetPreviewFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetPreviewFrame.prototype.createFrame = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //主动技能
        this.mElemList["skillBox_Active"] = UISkillBox.newObj(this.mLayoutNode, "skillBox_Active", 0, 0, this.mElemList["sk_wnd"]);
        //被动技能
        for (var i = 0; i < 6; i++) {
            this.mElemList["skillBox_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["sk_wnd" + i]);
        }
        this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b;
    };
    PetPreviewFrame.prototype.refreshFrame = function () {
        var data = PetSystem.getInstance().getPetEntryInfo(this.petId);
        //let netData = PetSystem.getInstance().getPetInfo(this.petId)
        //更新战力
        var force = GetForceMath(GetPetBaseProperty(this.petId));
        this.mElemList["force_num"].beginDraw();
        this.mElemList["force_num"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["force_num"].endDraw();
        //更新类型（金木水火土）
        var elemType = data.type;
        var elemStr = GetElemIcon(elemType);
        var elemValue = data.typeNum;
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack");
        //更新名字和品质
        var name = data.name;
        var quality = data.quality;
        var sr = data.sr;
        var icon = GetPetSRIcon(sr);
        AddRdContent(this.mElemList["name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white");
        //更新主动技能
        var skillId = data.skillid;
        var skillName = SkillSystem.getInstance().getSkillName(skillId);
        var skillDes = SkillSystem.getInstance().getSkillDes(skillId);
        this.mElemList["sk_name"].text = skillName;
        this.mElemList["skillBox_Active"].updatePetSkill(skillId);
        AddRdContent(this.mElemList["sk_des_rd"], skillDes, "ht_22_cc", "ublack", 3);
        //更新被动技能(可洗练)
        var passSkillList = data.passiveskill || [];
        // if (netData && size_t(netData.passskilllist) > 0) {
        // 	passSkillList = netData.passskilllist
        // }
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
        var str = "";
        //属性
        var effect = GetPetBaseProperty(this.petId);
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack");
        //更新模型
        this.updateActorModel();
    };
    PetPreviewFrame.prototype.updateActorModel = function () {
        var modeID = GetPetModel(this.petId);
        var actorview = this.mElemList["actor_view"];
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
    ///////////////////////////////////////////////////////////
    PetPreviewFrame.prototype.showWithPetEntry = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    PetPreviewFrame.prototype.showWithPetInfo = function (petInfo) {
        this.petId = petInfo.entryid;
        this.showWnd();
    };
    return PetPreviewFrame;
}(BaseWnd));
__reflect(PetPreviewFrame.prototype, "PetPreviewFrame");
//# sourceMappingURL=PetPreviewFrame.js.map