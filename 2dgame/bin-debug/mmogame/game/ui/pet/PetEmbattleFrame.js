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
var PetEmbattleFrame = (function (_super) {
    __extends(PetEmbattleFrame, _super);
    function PetEmbattleFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetEmbattleFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetEmbattleLayout.exml"];
        this.posList = {};
    };
    PetEmbattleFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btnBattle", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickBattle, _b),
            (_c = {}, _c["name"] = "btnPrepare1", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickParpare1, _c),
            (_d = {}, _d["name"] = "btnPrepare2", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickParpare2, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var mElemInfo = [];
        for (var i = 0; i < 3; i++) {
            this.mElemList["petBox_" + i] = UIPetBox.newObj(this.mLayoutNode, "petBox_" + i, 19, 5, this.mElemList["pos_wnd" + i]);
            this.mElemList["petBox_" + i].setClickEnable(false);
        }
        var _a, _b, _c, _d;
    };
    PetEmbattleFrame.prototype.onUnLoad = function () {
    };
    PetEmbattleFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    PetEmbattleFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    PetEmbattleFrame.prototype.refreshFrame = function () {
        //0代表没有出战，1代表出战 2代表备战1 3代表备战2
        var posList = PetSystem.getInstance().getEmbattlePosList();
        this.posList = posList;
        for (var i = 0; i < 3; i++) {
            var petInfo = posList[i + 1];
            if (petInfo) {
                this.mElemList["petBox_" + i].setVisible(true);
                this.mElemList["petBox_" + i].updateByEntry(petInfo.entryid);
                var namelab = this.mElemList["name" + i];
                if (petInfo.name == null || petInfo.name == "") {
                    namelab.text = PetSystem.getInstance().getPetName(petInfo.entryid);
                }
                else {
                    namelab.text = petInfo.name;
                }
                namelab.textColor = GetQualityColorStr(petInfo.quality);
                this.mElemList["lv" + i].text = "Lv." + petInfo.stage;
            }
            else {
                this.mElemList["petBox_" + i].setVisible(false);
                this.mElemList["name" + i].text = "";
                this.mElemList["lv" + i].text = "";
            }
        }
    };
    PetEmbattleFrame.prototype.onClickBattle = function () {
        RpcProxy.call("C2G_ACTOR_PET_COMBAT_SET", this.petId, opPetCombatPos.Battle);
        this.hideWnd();
    };
    PetEmbattleFrame.prototype.onClickParpare1 = function () {
        RpcProxy.call("C2G_ACTOR_PET_COMBAT_SET", this.petId, opPetCombatPos.Prepare1);
        this.hideWnd();
    };
    PetEmbattleFrame.prototype.onClickParpare2 = function () {
        RpcProxy.call("C2G_ACTOR_PET_COMBAT_SET", this.petId, opPetCombatPos.Prepare2);
        this.hideWnd();
    };
    ///////////////////////////////////
    PetEmbattleFrame.prototype.showWithPetId = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetEmbattleFrame;
}(BaseWnd));
__reflect(PetEmbattleFrame.prototype, "PetEmbattleFrame");
//# sourceMappingURL=PetEmbattleFrame.js.map