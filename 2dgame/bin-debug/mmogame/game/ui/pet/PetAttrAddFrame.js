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
var PetAttrAddFrame = (function (_super) {
    __extends(PetAttrAddFrame, _super);
    function PetAttrAddFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetAttrAddFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/Pet/PetAttrAddLayout.exml"];
        this.petId = -1;
    };
    PetAttrAddFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    PetAttrAddFrame.prototype.onUnLoad = function () {
    };
    PetAttrAddFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    PetAttrAddFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetAttrAddFrame.prototype.refreshFrame = function () {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        //更新战力
        var force = GetForceMath(GetSumPetProperty());
        DrawNumberStringImage(this.mElemList["force_num"], "zhanLi_", "z" + force, 0, 0, -3);
        var str = "";
        //更新激活总属性
        var effect = GetSumPetLvProperty();
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack");
        //更新资质总属性
        var effect = GetSumPetGrowProperty();
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["grow_hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["grow_att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["grow_def_rd"], str, "ht_24_cc", "ublack");
        //更新模型
        this.updateActorModel();
    };
    PetAttrAddFrame.prototype.updateActorModel = function () {
        var modeID = GetPetModel(this.petId);
        var actorview = this.mElemList["actor_view"];
        var actor = this.Player || Player.newObj();
        actor.loadModel(modeID);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 60);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(1);
    };
    PetAttrAddFrame.prototype.showPetAttrAddWithId = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetAttrAddFrame;
}(BaseWnd));
__reflect(PetAttrAddFrame.prototype, "PetAttrAddFrame");
//# sourceMappingURL=PetAttrAddFrame.js.map