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
var Fight_ActorAttackAction = (function (_super) {
    __extends(Fight_ActorAttackAction, _super);
    function Fight_ActorAttackAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ActorAttackAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_ActorAttackAction.prototype.onEnterState = function (actor) {
        var loop = true;
        if (this.bLastFrameDelay) {
            loop = false;
        }
        if (actor.isAttackState()) {
            var animSpeed = actor.getAnimSpeed();
            actor.changeAction(this.action, animSpeed, loop);
            return true;
        }
        return actor.changeAttackState(this.action, loop);
    };
    Fight_ActorAttackAction.prototype.onLeaveState = function (actor) {
        //进入和退出的state必须是同一个，否则不能进入idle
        if (actor.isAttackState()) {
            actor.changeIdleState();
        }
    };
    return Fight_ActorAttackAction;
}(Fight_ActorPlayAnimAction));
__reflect(Fight_ActorAttackAction.prototype, "Fight_ActorAttackAction");
//# sourceMappingURL=Fight_ActorAttackAction.js.map