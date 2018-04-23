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
var PetAttributeFrame = (function (_super) {
    __extends(PetAttributeFrame, _super);
    function PetAttributeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetAttributeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetAttributeLayout.exml"];
        this.petId = -1;
    };
    PetAttributeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
    };
    PetAttributeFrame.prototype.onUnLoad = function () {
    };
    PetAttributeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    PetAttributeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetAttributeFrame.prototype.refreshFrame = function () {
        if (this.petId <= 0)
            return;
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        this.mElemList["title"].text = petConfigInfo.name + Localize_cns("PET_TXT11");
        //更新战力
        var force = GetForceMath(GetPetProperty(this.petId));
        DrawNumberStringImage(this.mElemList["force_num"], "zhanLi_", "z" + force, 0, 0, -3);
        //更新类型（金木水火土）
        var elemType = petConfigInfo.type;
        var elemStr = GetElemIcon(elemType);
        var elemValue = petConfigInfo.typeNum;
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack");
        //更新品质和名称
        var quality = petConfigInfo.quality;
        var sr = petConfigInfo.sr;
        var icon = GetPetSRIcon(sr);
        var name = petConfigInfo.name;
        if (petNetInfo && petNetInfo.name != null && petNetInfo.name != "") {
            name = petNetInfo.name;
        }
        AddRdContent(this.mElemList["name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white");
        var str = "";
        //更新升级属性
        var effect = GetPetLvProperty(this.petId);
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack");
        //更新资质属性
        var effect = GetPetGrowProperty(this.petId);
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["grow_hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["grow_att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["grow_def_rd"], str, "ht_24_cc", "ublack");
        if (petNetInfo) {
            //等级
            this.mElemList["level_wnd"].visible = true;
            this.mElemList["sign_wnd"].visible = false;
            this.mElemList["pet_level"].text = petNetInfo.stage + Localize_cns("PET_TXT9");
        }
        else {
            this.mElemList["level_wnd"].visible = false;
            this.mElemList["sign_wnd"].visible = true;
        }
        this.updateActorModel();
    };
    PetAttributeFrame.prototype.updateActorModel = function () {
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
    PetAttributeFrame.prototype.showPetAttributeWithId = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetAttributeFrame;
}(BaseWnd));
__reflect(PetAttributeFrame.prototype, "PetAttributeFrame");
//# sourceMappingURL=PetAttributeFrame.js.map