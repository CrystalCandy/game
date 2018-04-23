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
var ActorControl_ChangeScale = (function (_super) {
    __extends(ActorControl_ChangeScale, _super);
    function ActorControl_ChangeScale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorControl_ChangeScale.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var time_ = args[0];
        this.targetScale = args[1];
        this.curScale = args[2];
        this.originScale = args[2];
        this.isRestory = args[3] || false;
        this.changeSpeed = (this.targetScale - this.curScale) / time_;
        this.setMaxTime(time_);
    };
    ActorControl_ChangeScale.prototype.onBegin = function (actor) {
    };
    ActorControl_ChangeScale.prototype.onUpdate = function (actor, delay) {
        this.curScale = this.curScale + this.changeSpeed * this.delayTime;
        actor.setScale(this.curScale);
        return false;
    };
    ActorControl_ChangeScale.prototype.onFinish = function (actor) {
        if (this.isRestory) {
            actor.setScale(this.originScale);
        }
    };
    return ActorControl_ChangeScale;
}(ActorControlBase));
__reflect(ActorControl_ChangeScale.prototype, "ActorControl_ChangeScale");
//# sourceMappingURL=ActorControl_ChangeScale.js.map