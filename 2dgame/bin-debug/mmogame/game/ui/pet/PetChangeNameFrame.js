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
var PetChangeNameFrame = (function (_super) {
    __extends(PetChangeNameFrame, _super);
    function PetChangeNameFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetChangeNameFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetChangeNameLayout.exml"];
    };
    PetChangeNameFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "cancel_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
            (_d = {}, _d["name"] = "sure_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickSure, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d;
    };
    PetChangeNameFrame.prototype.onUnLoad = function () {
    };
    PetChangeNameFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
    };
    PetChangeNameFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    PetChangeNameFrame.prototype.onClickSure = function (args) {
        var content = this.mElemList["edit_input"].text;
        //验证
        if (WordFilter.checkword(content)) {
            RpcProxy.call("C2G_ACTOR_PET_RENAME", this.petId, content);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("UNION_TEXT22"));
        }
        this.hideWnd();
    };
    PetChangeNameFrame.prototype.onShowWithPetId = function (petId) {
        this.petId = petId;
        this.showWnd();
    };
    return PetChangeNameFrame;
}(BaseWnd));
__reflect(PetChangeNameFrame.prototype, "PetChangeNameFrame");
//# sourceMappingURL=PetChangeNameFrame.js.map