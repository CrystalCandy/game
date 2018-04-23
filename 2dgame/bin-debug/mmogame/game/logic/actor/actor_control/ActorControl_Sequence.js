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
var ActorControl_Sequence = (function (_super) {
    __extends(ActorControl_Sequence, _super);
    function ActorControl_Sequence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorControl_Sequence.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.controlList = [];
    };
    ActorControl_Sequence.prototype.destory = function () {
        this.controlList.forEach(function (v) {
            v.deleteObj();
        });
        this.controlList = null;
    };
    ActorControl_Sequence.prototype.onBegin = function (actor) {
        if (this.controlList.length == 0) {
            this.finish(actor);
            return;
        }
        this.index = 0;
        var control = this.controlList[this.index];
        control.begin(actor);
    };
    ActorControl_Sequence.prototype.onUpdate = function (actor, delay) {
        var control = this.controlList[this.index];
        control.update(actor, delay);
        if (control.isFinish()) {
            this.index = this.index + 1;
            if (this.index >= this.controlList.length) {
                return true;
            }
            var nextControl = this.controlList[this.index];
            nextControl.begin(actor);
        }
        return false;
    };
    ActorControl_Sequence.prototype.onFinish = function (actor) {
        this.controlList.forEach(function (v) {
            v.begin(actor);
            v.finish(actor);
        });
    };
    ActorControl_Sequence.prototype.addControl = function (control) {
        TLog.Assert(control != this);
        JsUtil.arrayPush(this.controlList, control);
    };
    return ActorControl_Sequence;
}(ActorControlBase));
__reflect(ActorControl_Sequence.prototype, "ActorControl_Sequence");
//# sourceMappingURL=ActorControl_Sequence.js.map