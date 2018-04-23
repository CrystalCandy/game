/*
作者:
    ChenPeng
    
创建时间：
    2017.06.05(星期一)

意图：
    部下战力变化
    
公共接口：
    
*/
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
var PetCombatForceTipsFrame = (function (_super) {
    __extends(PetCombatForceTipsFrame, _super);
    function PetCombatForceTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetCombatForceTipsFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.delta = 0;
        //PetCombatForceToShow
        //RegisterEvent(EventDefine.INIT_ALL_PET_COMBATFORCE, this.onInit, this)
        RegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this);
    };
    PetCombatForceTipsFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this);
    };
    PetCombatForceTipsFrame.prototype.showCombatForceChange = function (args) {
        //let old = this.combatForceRecord[petEntry] || 0
        var delta = args.delta; //petInfo.combateForce - old
        this.delta = delta;
        //this.combatForceRecord[petEntry] = petInfo.combateForce
        if (delta != 0) {
            if (this.isVisible()) {
                this.hideWnd();
            }
            return this.showWnd();
        }
    };
    PetCombatForceTipsFrame.prototype.onLoad = function () {
        var width = 474, height = 90;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.setLayer(3 /* Top */);
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group", _a["horizontalCenter"] = 0, _a["y"] = 0, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "addOrSub", _b["parent"] = "group", _b["title"] = null, _b["font"] = null, _b["image"] = "", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 15, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = gui.BatchImage, _c["name"] = "combatForceChanged", _c["parent"] = "group", _c["title"] = null, _c["font"] = null, _c["image"] = "", _c["color"] = null, _c["x"] = 190, _c["y"] = 13, _c["event_name"] = null, _c["fun_index"] = null, _c),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var data = (_d = {}, _d["startX"] = 83, _d["startY"] = 500, _d["endX"] = 83, _d["endY"] = 350, _d["moveType"] = "inertional", _d);
        this.showResultAction = MoveAction.newObj(this.mLayoutNode, 1000, data, this.hideWnd, this);
        var _a, _b, _c, _d;
        // let label:eui.Label = this.mElemList["combatForceChanged"]
        // label.size = 40;
    };
    PetCombatForceTipsFrame.prototype.onUnLoad = function () {
        //this.effect.deleteObj()
        //UnRegisterEvent(EventDefine.INIT_ALL_PET_COMBATFORCE, this.onInit, this)
        UnRegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this);
    };
    PetCombatForceTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        //this.showResultAction.stop()
        this.showResultAction.run();
        this.refreshFrame();
    };
    PetCombatForceTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        this.showResultAction.stop();
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////-
    PetCombatForceTipsFrame.prototype.refreshFrame = function () {
        var batchImage = this.mElemList["combatForceChanged"];
        //let absVal = Math.abs(this.delta)
        var delta = Math.abs(this.delta);
        var deltaStr = delta + "";
        if (delta <= defaultValue.FORCE_EXPRESS_VALUE) {
            //delta = tostring(delta * 100) +"%"
            var allForce = GetHeroProperty("allCombatForce") || 1;
            deltaStr = Math.ceil(delta / allForce * 100) + "%";
        }
        if (this.delta < 0) {
            var head = this.mElemList["addOrSub"];
            head.source = ("zhanLiJian");
            //this.mElemList["bg"].source = "ty_zhanLiDi03"
            batchImage.beginDraw();
            //batchImage.drawImage("zhanLiJia")
            batchImage.drawNumberString("zhanLiJian0", deltaStr);
            batchImage.endDraw();
        }
        else {
            var head = this.mElemList["addOrSub"];
            head.source = ("zhanLiJia");
            //this.mElemList["bg"].source = "ty_zhanLiDi02"
            batchImage.beginDraw();
            //batchImage.drawImage("zhanLiJia")
            batchImage.drawNumberString("zhanLiJia0", deltaStr);
            batchImage.endDraw();
        }
        // let absVal = Math.abs(this.delta)
        // if(this.delta > 0){
        //     let label:eui.Label = this.mElemList["combatForceChanged"]
        //     label.text = String.format(Localize_cns("FIGHT_ZHANLI_ADD"), "+" + absVal) 
        //     label.textColor = gui.Color.orange;
        // }else if(this.delta < 0){
        //     let label:eui.Label = this.mElemList["combatForceChanged"]
        //     label.text = String.format(Localize_cns("FIGHT_ZHANLI_REDUCE"), "-" + absVal) 
        //     label.textColor = gui.Color.lime;
        // }
    };
    return PetCombatForceTipsFrame;
}(BaseWnd));
__reflect(PetCombatForceTipsFrame.prototype, "PetCombatForceTipsFrame");
//# sourceMappingURL=PetCombatForceTipsFrame.js.map