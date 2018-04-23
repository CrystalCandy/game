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
var Fight_AttackedKnockAction = (function (_super) {
    __extends(Fight_AttackedKnockAction, _super);
    function Fight_AttackedKnockAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_AttackedKnockAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = this.elemInfo.param1 || "targetList";
        this.targetNameList = splitString(this.targetName, ",");
        this.height = this.elemInfo.param2 || 100; //击飞高度
        this.riseSpeed = this.elemInfo.param3 || 400; //上升速度
        this.dropSpeed = this.elemInfo.param4 || 400; //下降速度
        this.acc = 5000; //(这里加速度跟pointCount = 10 点的数量有关系，在一定相对范围内才表现正常（未深究）)
        this.totalTime = Math.sqrt(this.height * 2 / this.acc);
        this.height = -Math.abs(this.height);
        if (this.fightResult) {
            this.riseSpeed = this.fightResult.getActionSpeed(this.riseSpeed);
            this.dropSpeed = this.fightResult.getActionSpeed(this.dropSpeed);
        }
    };
    Fight_AttackedKnockAction.prototype.onPlay = function () {
        this.controlMap = {};
        var callback = function (actor, index) {
            if (this.fightResult.isActorResultEffect(actor.getCombatId(), powerEffects.EFFECT_DODGE) == false && actor.changeKnockFlayState()) {
                var fromPos = actor.getMapXY();
                var fromX = fromPos.x, fromY = fromPos.y;
                var toX = fromX;
                var toY = fromY + this.height;
                ////上升
                //var riseControl = AcotControl_CurveMove.new(400,
                //																	fromX, fromY, toX, toY)//, this.genPointList, {this, p(fromX, fromY), p(toX, toY)})
                //
                ////下降
                //var dropControl = AcotControl_CurveMove.new(400,
                //																	toX, toY, fromX, fromY)//, this.genPointList, {this, p(toX, toY), p(fromX, fromY)})
                //上升
                var riseControl = ActorControl_VariableMotion.newObj(this.riseSpeed, fromX, fromY, toX, toY, this.genPointList, this, [newPos(fromX, fromY), newPos(toX, toY)]);
                //下降
                var dropControl = ActorControl_VariableMotion.newObj(this.dropSpeed, toX, toY, fromX, fromY, this.genPointList, this, [newPos(toX, toY), newPos(fromX, fromY)]);
                var sequenceControl = ActorControl_Sequence.newObj();
                sequenceControl.addControl(riseControl);
                sequenceControl.addControl(dropControl);
                //sequenceControl:setFinishCallback(this.onKnockFinish, this)
                actor.addControl(sequenceControl);
                actor.setAutoPerspectEnable(false); //忽视透视效果
                actor.doCommand(ActorCommand.SetShadowVisible, false, null); //隐藏阴影
                actor.setSpellPreState(null, false);
                actor.setKnockFlyContrl(sequenceControl, characterState.actionState_knockfly);
                this.controlMap[actor.hashCode] = sequenceControl;
            }
        };
        this.iteratorActorList(callback, this.targetNameList);
        if (size_t(this.controlMap) == 0) {
            this.finish();
        }
    };
    Fight_AttackedKnockAction.prototype.onTick = function (delay) {
        var bFinish = true;
        for (var k in this.controlMap) {
            var v = this.controlMap[k];
            if (v.isFinish() == false) {
                bFinish = false;
                break;
            }
        }
        if (bFinish) {
            this.finish();
        }
    };
    Fight_AttackedKnockAction.prototype.onFinish = function () {
        var callback = function (actor, index) {
            if (actor.isKnockFlyState()) {
                actor.changeIdleState();
            }
            var control = this.controlMap[actor.hashCode];
            if (control) {
                actor.removeControl(control);
                control.finish(actor);
                control.deleteObj();
            }
            actor.setKnockFlyContrl();
            actor.setAutoPerspectEnable(true);
            actor.doCommand(ActorCommand.SetShadowVisible, true, null); //隐藏阴影
            actor.setSpellPreState(null, true);
        };
        this.iteratorActorList(callback, this.targetNameList);
        this.controlMap = {};
    };
    Fight_AttackedKnockAction.prototype.genPointList = function (fromP, toP) {
        var pointCount = 10;
        var acc = this.acc;
        var T = this.totalTime;
        var t = T / pointCount;
        var ratio = (fromP.y - toP.y) / Math.abs(fromP.y - toP.y);
        var v0 = -1 * acc * T;
        var point_list = [];
        var speed_list = [];
        if (ratio < 0) {
            v0 = 0;
        }
        //for i = 0, pointCount do
        for (var i = 0; i < pointCount; i++) {
            var x = fromP.x;
            var y = fromP.y + (v0 + 0.5 * acc * t * i) * (t * i);
            if (i < pointCount) {
                var speed = v0 + (i + 0.5) * acc * t;
                //print("222222222222222", speed, fromP.y, toP.y, y)
                speed_list.push(speed);
            }
            point_list.push(newPos(x, y));
        }
        return [point_list, speed_list];
    };
    return Fight_AttackedKnockAction;
}(Fight_BaseAction));
__reflect(Fight_AttackedKnockAction.prototype, "Fight_AttackedKnockAction");
//# sourceMappingURL=Fight_AttackedKnockAction.js.map