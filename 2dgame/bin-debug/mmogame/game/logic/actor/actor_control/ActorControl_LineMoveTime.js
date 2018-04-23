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
var ActorControl_LineMoveTime = (function (_super) {
    __extends(ActorControl_LineMoveTime, _super);
    function ActorControl_LineMoveTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorControl_LineMoveTime.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var time_ = args[0];
        this.m_from_x = args[1];
        this.m_from_y = args[2];
        this.m_to_x = args[3];
        this.m_to_y = args[4];
        this.m_x_speed = (this.m_to_x - this.m_from_x) / time_;
        this.m_y_speed = (this.m_to_y - this.m_from_y) / time_;
        this.m_cur_x = this.m_from_x;
        this.m_cur_y = this.m_from_y;
        this.setMaxTime(time_);
    };
    ActorControl_LineMoveTime.prototype.destory = function () {
    };
    ActorControl_LineMoveTime.prototype.onBegin = function (actor) {
        if (actor.isMoveAutoRotate()) {
            var rotateAngle = MathUtil.pGetAngle(newPos(this.m_x_speed, 0), newPos(this.m_x_speed, this.m_y_speed));
            actor.rotateAngle(rotateAngle);
        }
    };
    ActorControl_LineMoveTime.prototype.onUpdate = function (actor, delay) {
        this.m_cur_x = this.m_from_x + this.m_x_speed * this.delayTime;
        this.m_cur_y = this.m_from_y + this.m_y_speed * this.delayTime;
        actor.setMapXY(this.m_cur_x, this.m_cur_y);
        return false;
    };
    ActorControl_LineMoveTime.prototype.onFinish = function (actor) {
        this.m_cur_x = this.m_to_x;
        this.m_cur_y = this.m_to_y;
        actor.setMapXY(this.m_cur_x, this.m_cur_y);
    };
    return ActorControl_LineMoveTime;
}(ActorControlBase));
__reflect(ActorControl_LineMoveTime.prototype, "ActorControl_LineMoveTime");
//# sourceMappingURL=ActorControl_LineMoveTime.js.map