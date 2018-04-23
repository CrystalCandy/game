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
var PetNaturlFrame = (function (_super) {
    __extends(PetNaturlFrame, _super);
    function PetNaturlFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetNaturlFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetNaturlLayout.exml"];
        this.isAuto = false;
    };
    PetNaturlFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "up_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickUpgrade, _c),
            (_d = {}, _d["name"] = "auto_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickAutoUpgrade, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 0, this.mElemList["item_wnd"]);
        this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d;
    };
    PetNaturlFrame.prototype.onUnLoad = function () {
    };
    PetNaturlFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    PetNaturlFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetNaturlFrame.prototype.refreshFrame = function () {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        //资质
        var growCount = petNetInfo.growexp;
        var growInfo = PetSystem.getInstance().getPetGrowInfo(this.petId);
        //更新资质战力
        var force = GetForceMath(GetPetGrowProperty(this.petId));
        this.mElemList["force_num"].beginDraw();
        this.mElemList["force_num"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["force_num"].endDraw();
        //更新类型（金木水火土）
        var elemType = petConfigInfo.type;
        var elemStr = GetElemIcon(elemType);
        var elemValue = petConfigInfo.typeNum;
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack");
        //更新资质等级
        var level = PetSystem.getInstance().getPetGrowLevel(this.petId, growCount);
        this.mElemList["level_txt"].text = Localize_cns("NATURL_" + level);
        //更新品质和名称
        var quality = petConfigInfo.quality;
        var sr = petConfigInfo.sr;
        var icon = GetPetSRIcon(sr);
        var name = petNetInfo.name || petConfigInfo.name;
        AddRdContent(this.mElemList["name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white");
        //actor_view
        this.updateActorModel();
        var str = "";
        //资质属性
        var effect = GetPetGrowProperty(this.petId);
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]];
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]];
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack");
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]];
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack");
        //更新进度条
        UiUtil.updateProgress(this.mElemList["exp_progress"], growCount, level);
        //更新消耗材料
        var itemId = growInfo.itemid;
        this.mElemList["itemBox"].updateByEntry(itemId);
        var itemName = ItemSystem.getInstance().getItemName(itemId);
        var itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0;
        var needCount = growInfo.itemnum;
        var color = GetQualityColorStr(quality);
        var itemcolor = itemCount >= needCount ? "#lime" : "#red";
        AddRdContent(this.mElemList["card_rd"], "#" + color + itemName + Localize_cns("PET_TXT23") + itemcolor + "（" + itemCount + "/" + needCount + "）", "ht_24_cc", "ublack", 10);
        if (this.isAuto && itemCount > 0) {
            this.sendUpgradeRequest();
        }
    };
    PetNaturlFrame.prototype.updateActorModel = function () {
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
        actor.setDir(3);
    };
    PetNaturlFrame.prototype.onClickUpgrade = function (args) {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        var itemId = petConfigInfo.itemid;
        var itemName = ItemSystem.getInstance().getItemName(itemId);
        var itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0;
        if (itemCount > 0) {
            this.sendUpgradeRequest();
        }
        else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"));
        }
    };
    PetNaturlFrame.prototype.onClickAutoUpgrade = function (args) {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.petId);
        var itemId = petConfigInfo.itemid;
        var itemName = ItemSystem.getInstance().getItemName(itemId);
        var itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0;
        if (itemCount > 0) {
            this.isAuto = true;
            this.sendUpgradeRequest();
        }
        else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"));
        }
    };
    PetNaturlFrame.prototype.sendUpgradeRequest = function () {
        RpcProxy.call("C2G_ACTOR_PET_GROW_UP", this.petId);
    };
    ///////////////////////////////////
    PetNaturlFrame.prototype.onShowWithPetId = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetNaturlFrame;
}(BaseWnd));
__reflect(PetNaturlFrame.prototype, "PetNaturlFrame");
//# sourceMappingURL=PetNaturlFrame.js.map