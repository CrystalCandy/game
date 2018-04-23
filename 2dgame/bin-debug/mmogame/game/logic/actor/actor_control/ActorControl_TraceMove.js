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
var ActorControl_TraceMove = (function (_super) {
    __extends(ActorControl_TraceMove, _super);
    function ActorControl_TraceMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ActorControl_TraceMove.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.speed = args[0];
        TLog.Assert(this.speed > 0);
        this.traceActorId = args[1]; //获取actor的id
        this.traceActorFunc = args[2]; //获取actor的函数
        this.toOffx = args[3] || 0;
        this.toOffy = args[4] || 0;
    };
    //子类复写 析构函数
    ActorControl_TraceMove.prototype.destory = function () {
    };
    ActorControl_TraceMove.prototype.onBegin = function (actor) {
        var traceTarget = this.traceActorFunc(this.traceActorId);
        if (traceTarget) {
            var fromPoint = actor.getMapXY();
            var toPoint = traceTarget.getMapXY();
            var to_x = toPoint.x + this.toOffx;
            var to_y = toPoint.y + this.toOffy;
            this.lastDirX = to_x - fromPoint.x;
            this.lastDirY = 0;
        }
    };
    ActorControl_TraceMove.prototype.onUpdate = function (actor, delay) {
        var traceTarget = this.traceActorFunc(this.traceActorId);
        if (traceTarget == null) {
            return true;
        }
        var fp = actor.getMapXY();
        var tp = traceTarget.getMapXY();
        var to_x = tp.x + this.toOffx;
        var to_y = tp.y + this.toOffy;
        if (MathUtil.checkScope(fp.x, fp.y, to_x, to_y, 10)) {
            return true;
        }
        var vec = newPos(to_x - fp.x, to_y - fp.y);
        var norVec = MathUtil.pNormalize(vec);
        var x_speed = norVec.x * this.speed / 1000; //毫秒
        var y_speed = norVec.y * this.speed / 1000; //毫秒
        var cur_x = fp.x + x_speed * delay;
        var cur_y = fp.y + y_speed * delay;
        if (actor.isMoveAutoRotate()) {
            var rotateAngle = MathUtil.pGetAngle(newPos(this.lastDirX, this.lastDirY), newPos(x_speed, y_speed));
            actor.rotateAngle(rotateAngle);
        }
        this.lastDirX = x_speed;
        this.lastDirY = y_speed;
        actor.setMapXY(cur_x, cur_y);
        return false;
    };
    ActorControl_TraceMove.prototype.onFinish = function (actor) {
        var traceTarget = this.traceActorFunc(this.traceActorId);
        if (traceTarget) {
            var cp = traceTarget.getMapXY();
            var cur_x = cp.x + this.toOffx;
            var cur_y = cp.y + this.toOffy;
            actor.setMapXY(cur_x, cur_y);
        }
    };
    return ActorControl_TraceMove;
}(ActorControlBase));
__reflect(ActorControl_TraceMove.prototype, "ActorControl_TraceMove");
//# sourceMappingURL=ActorControl_TraceMove.js.map