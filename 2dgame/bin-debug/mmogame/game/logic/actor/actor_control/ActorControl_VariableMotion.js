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
var ActorControl_VariableMotion = (function (_super) {
    __extends(ActorControl_VariableMotion, _super);
    function ActorControl_VariableMotion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ActorControl_VariableMotion.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.speed = args[0];
        TLog.Assert(this.speed > 0);
        this.fromPos = newPos(args[1], args[2]);
        this.toPos = newPos(args[3], args[4]);
        var getPointList = args[5];
        var thisObj = args[6];
        var userData = args[7];
        TLog.Assert(userData != null);
        var point_list = [this.toPos];
        var speed_list = {};
        if (getPointList) {
            var info = getPointList.call(thisObj, userData[0], userData[1]);
            point_list = info[0];
            speed_list = info[1];
        }
        //生成曲线
        this.line_list = [];
        this.line_index = 0;
        this.line_delay = 0;
        this.lastDirX = this.toPos.x - this.fromPos.x;
        this.lastDirY = 0;
        var lineCount = point_list.length - 1;
        for (var i = 0; i < lineCount; i++) {
            var sp = point_list[i]; //start point
            var ep = point_list[i + 1]; // } point
            var dp = MathUtil.pSub(ep, sp);
            var length = MathUtil.pGetLength(dp);
            var segment = {};
            segment.sp = sp;
            segment.ep = ep;
            var speed = speed_list[i] || this.speed;
            //print("111111111111111111", speed)
            segment.time = length / speed * 1000; //转成毫秒
            segment.x_speed = dp.x / length * speed / 1000;
            segment.y_speed = dp.y / length * speed / 1000;
            this.line_list.push(segment);
        }
    };
    //子类复写 析构函数
    ActorControl_VariableMotion.prototype.destory = function () {
    };
    ActorControl_VariableMotion.prototype.onBegin = function (actor) {
        var segment = this.line_list[0];
        if (segment) {
            this.updateRotate(actor, segment.x_speed, segment.y_speed);
        }
    };
    ActorControl_VariableMotion.prototype.updateRotate = function (actor, curDirX, curDirY) {
        //设置旋转
        if (actor.isMoveAutoRotate()) {
            var rotateAngle = MathUtil.pGetAngle(newPos(this.lastDirX, this.lastDirY), newPos(curDirX, curDirY));
            actor.rotateAngle(rotateAngle);
        }
    };
    ActorControl_VariableMotion.prototype.onUpdate = function (actor, delay) {
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
    ActorControl_VariableMotion.prototype.onFinish = function (actor) {
        actor.setMapXY(this.toPos.x, this.toPos.y);
    };
    return ActorControl_VariableMotion;
}(ActorControlBase));
__reflect(ActorControl_VariableMotion.prototype, "ActorControl_VariableMotion");
//# sourceMappingURL=ActorControl_VariableMotion.js.map