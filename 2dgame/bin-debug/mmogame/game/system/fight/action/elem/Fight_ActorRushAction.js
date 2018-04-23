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
var Fight_ActorRushAction = (function (_super) {
    __extends(Fight_ActorRushAction, _super);
    function Fight_ActorRushAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ActorRushAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_ActorRushAction.prototype.onEnterState = function (actor) {
        return actor.changeRushState(this.action);
    };
    Fight_ActorRushAction.prototype.onLeaveState = function (actor) {
        if (actor.isRushState()) {
            actor.changeIdleState();
        }
    };
    return Fight_ActorRushAction;
}(Fight_ActorPlayAnimAction));
__reflect(Fight_ActorRushAction.prototype, "Fight_ActorRushAction");
//# sourceMappingURL=Fight_ActorRushAction.js.map