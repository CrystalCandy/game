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
var Fight_ScaleAction = (function (_super) {
    __extends(Fight_ScaleAction, _super);
    function Fight_ScaleAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ScaleAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster");
        this.srcScale = checkNull(this.elemInfo.param2, 1);
        this.dstScale = checkNull(this.elemInfo.param3, 1);
        this.targetNameList = splitString(this.targetName, ",");
    };
    Fight_ScaleAction.prototype.updateTransform = function () {
        var callback = function (actor, index) {
            var s = this.srcScale + this.timeProcess * (this.dstScale - this.srcScale);
            actor.setScale(s);
        };
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
    };
    Fight_ScaleAction.prototype.onPlay = function () {
        this.updateTransform();
    };
    Fight_ScaleAction.prototype.onTick = function () {
        this.updateTransform();
    };
    Fight_ScaleAction.prototype.onFinish = function () {
        var callback = function (actor, index) {
            actor.setScale(this.dstScale);
        };
        this.iteratorActorList(callback, this.targetNameList);
    };
    return Fight_ScaleAction;
}(Fight_BaseAction));
__reflect(Fight_ScaleAction.prototype, "Fight_ScaleAction");
//# sourceMappingURL=Fight_ScaleAction.js.map