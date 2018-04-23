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
var Fight_RotateAction = (function (_super) {
    __extends(Fight_RotateAction, _super);
    function Fight_RotateAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_RotateAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster");
        this.srcValue = checkNull(this.elemInfo.param2, 0);
        this.dstValue = checkNull(this.elemInfo.param3, 0);
        this.bFilpX = checkNull(this.elemInfo.param4, false);
        this.bFilpY = checkNull(this.elemInfo.param5, false);
        this.targetNameList = splitString(this.targetName, ",");
        this.srcValue = this.getRotateByCaster(this.srcValue);
        this.dstValue = this.getRotateByCaster(this.dstValue);
    };
    Fight_RotateAction.prototype.updateTransform = function () {
        var callback = function (actor, index) {
            var s = this.srcValue + this.timeProcess * (this.dstValue - this.srcValue);
            actor.setRotate(s);
            actor.setFlipXY(this.bFilpX, this.bFilpY);
        };
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
    };
    Fight_RotateAction.prototype.onPlay = function () {
        this.updateTransform();
    };
    Fight_RotateAction.prototype.onTick = function () {
        this.updateTransform();
    };
    Fight_RotateAction.prototype.onFinish = function () {
        var callback = function (actor, index) {
            actor.setRotate(this.dstValue);
        };
        this.iteratorActorList(callback, this.targetNameList);
    };
    return Fight_RotateAction;
}(Fight_BaseAction));
__reflect(Fight_RotateAction.prototype, "Fight_RotateAction");
//# sourceMappingURL=Fight_RotateAction.js.map