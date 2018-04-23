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
var MAX_LINE_COUNT = 10;
var ActorControl_CurveMove = (function (_super) {
    __extends(ActorControl_CurveMove, _super);
    function ActorControl_CurveMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorControl_CurveMove.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var speed = args[0];
        TLog.Assert(speed > 0);
        this.fromPos = newPos(args[1], args[2]);
        this.toPos = newPos(args[3], args[4]);
        this.ctrlPos1 = newPos(args[5] || this.fromPos.x, args[6] || this.fromPos.y);
        this.ctrlPos2 = newPos(args[7] || this.fromPos.x, args[8] || this.fromPos.y);
        var lineCount = MAX_LINE_COUNT;
        if (this.ctrlPos1.x == this.fromPos.x && this.ctrlPos1.y == this.fromPos.y &&
            this.ctrlPos2.x == this.fromPos.x && this.ctrlPos2.y == this.fromPos.y) {
            lineCount = 1;
        }
        //贝塞尔曲线
        var point_list = MathUtil.bezier(this.fromPos, this.ctrlPos1, this.ctrlPos2, this.toPos, lineCount + 1);
        //生成曲线
        this.line_list = [];
        this.line_index = 0;
        this.line_delay = 0;
        this.lastDirX = this.toPos.x - this.fromPos.x;
        this.lastDirY = 0;
        //for i = 1, lineCount do
        for (var i = 0; i < lineCount; i++) {
            var sp = point_list[i]; //start point
            var ep = point_list[i + 1]; // } point
            var dp = MathUtil.pSub(ep, sp);
            var length = MathUtil.pGetLength(dp);
            var segment = {};
            segment.sp = sp;
            segment.ep = ep;
            segment.time = length / speed * 1000; //转成毫秒
            segment.x_speed = dp.x / length * speed / 1000;
            segment.y_speed = dp.y / length * speed / 1000;
            this.line_list.push(segment);
        }
    };
    ActorControl_CurveMove.prototype.onBegin = function (actor) {
        this.line_index = 0;
        var segment = this.line_list[0];
        if (segment) {
            this.updateRotate(actor, segment.x_speed, segment.y_speed);
        }
    };
    ActorControl_CurveMove.prototype.updateRotate = function (actor, curDirX, curDirY) {
        //设置旋转
        if (actor.isMoveAutoRotate()) {
            var rotateAngle = MathUtil.pGetAngle(newPos(this.lastDirX, this.lastDirY), newPos(curDirX, curDirY));
            actor.rotateAngle(rotateAngle);
        }
    };
    ActorControl_CurveMove.prototype.onUpdate = function (actor, delay) {
        var cur_x, cur_y;
        var segment = this.line_list[this.line_index];
        this.line_delay = this.line_delay + delay;
        if (this.line_delay >= segment.time) {
            cur_x = segment.ep.x;
            cur_y = segment.ep.y;
            this.line_delay = 0;
            this.line_index = this.line_index + 1;
            var next_segment = this.line_list[this.line_index];
            this.lastDirX = segment.x_speed;
            this.lastDirY = segment.y_speed;
            if (next_segment) {
                this.updateRotate(actor, next_segment.x_speed, next_segment.y_speed);
            }
        }
        else {
            cur_x = segment.sp.x + segment.x_speed * this.line_delay;
            cur_y = segment.sp.y + segment.y_speed * this.line_delay;
        }
        actor.setMapXY(cur_x, cur_y);
        if (this.line_index >= this.line_list.length) {
            return true;
        }
        return false;
    };
    ActorControl_CurveMove.prototype.onFinish = function (actor) {
        actor.setMapXY(this.toPos.x, this.toPos.y);
    };
    return ActorControl_CurveMove;
}(ActorControlBase));
__reflect(ActorControl_CurveMove.prototype, "ActorControl_CurveMove");
//# sourceMappingURL=ActorControl_CurveMove.js.map