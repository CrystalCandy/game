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
var Fight_MoveAction = (function (_super) {
    __extends(Fight_MoveAction, _super);
    function Fight_MoveAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_MoveAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster");
        //any caster targetList
        this.fromPosType = checkNull(this.elemInfo.param2, "caster");
        this.fromOffx = checkNull(this.elemInfo.param3, 0);
        this.fromOffy = checkNull(this.elemInfo.param4, 0);
        this.toPosType = this.elemInfo.param5, "targetList";
        this.toOffx = checkNull(this.elemInfo.param6, 0);
        this.toOffy = checkNull(this.elemInfo.param7, 0);
        this.moveType = checkNull(this.elemInfo.param8, ENUM_FIGHT_MOVE_TYPE.MOVE_LINE_TIME);
        this.moveSpeed = checkNull(this.elemInfo.param9, 500); //每1秒移动X像素
        this.coffx1 = checkNull(this.elemInfo.param10, 0); //控制点1
        this.coffy1 = checkNull(this.elemInfo.param11, 0);
        this.coffx2 = checkNull(this.elemInfo.param12, 0); //控制点2
        this.coffy2 = checkNull(this.elemInfo.param13, 0);
        this.crandom = checkNull(this.elemInfo.param14, 0);
        this.yDir = checkNull(this.elemInfo.param14, 1);
        if (this.crandom > 0) {
            this.coffx1 = this.coffx1 + MathUtil.random(this.crandom);
            this.coffy1 = this.coffy1 + MathUtil.random(this.crandom);
            this.coffx2 = this.coffx2 + MathUtil.random(this.crandom);
            this.coffy2 = this.coffy2 + MathUtil.random(this.crandom);
        }
        //因为编辑器以攻击者在右边处理
        //所以如果角色是左边，就要调整偏移
        var fromPos;
        if (this.fromPosType != "any") {
            fromPos = this.getOffsetByCaster(this.fromOffx, this.fromOffy);
        }
        else {
            fromPos = this.getAbsoluteXYByCaster(this.fromOffx, this.fromOffy);
        }
        this.fromOffx = fromPos.x;
        this.fromOffy = fromPos.y;
        var toPos;
        if (this.toPosType != "any") {
            toPos = this.getOffsetByCaster(this.toOffx, this.toOffy);
        }
        else {
            toPos = this.getAbsoluteXYByCaster(this.toOffx, this.toOffy);
        }
        this.toOffx = toPos.x;
        this.toOffy = toPos.y;
        var pos = this.getOffsetByCaster(this.coffx1, this.coffy1);
        this.coffx1 = pos.x;
        this.coffy1 = pos.y;
        pos = this.getOffsetByCaster(this.coffx2, this.coffy2);
        this.coffx2 = pos.x;
        this.coffy2 = pos.y;
        this.targetNameList = splitString(this.targetName, ",");
        this.controlMap = {};
        if (this.fightResult) {
            this.moveSpeed = this.fightResult.getActionSpeed(this.moveSpeed);
        }
    };
    Fight_MoveAction.prototype.getMapPosByType = function (targetList, index, posType, offx, offy) {
        var targetPos = null;
        targetPos = this.casterActor.getPositionXY();
        var traceActor = null;
        var flag = true;
        if (posType == "any") {
            targetPos = SceneManager.getInstance().screenXYtoMapXY(offx, offy);
        }
        else if (posType == "targetList") {
            var targetActor = targetList[index];
            if (targetActor == null) {
                targetActor = targetList[0]; //如果为空，则选择第一个
                if (targetActor == null) {
                    targetActor = this.casterActor;
                }
            }
            //默认放在目标前方
            var _a = [70 * Math.cos(Math.PI / 2 + FIGHT_MAP_ANGLE * 2.3), 70 * Math.sin(Math.PI / 2 + FIGHT_MAP_ANGLE * 2.3)], dx = _a[0], dy = _a[1];
            var pos = this.getOffsetByCaster(dx, dy, this.yDir);
            targetPos = targetActor.getPositionXY();
            targetPos.x = targetPos.x + offx + pos.x;
            targetPos.y = targetPos.y + offy + pos.y;
            traceActor = targetActor;
        }
        else if (posType == "casterOrigin") {
            targetPos = this.fightResult.getCasterOriginXY();
            targetPos.x = targetPos.x + offx;
            targetPos.y = targetPos.y + offy;
        }
        else if (posType == "backLine") {
            var actor_list = GetFightActorList();
            var mapx = 0;
            var mapy = 0;
            var count = 0;
            for (var k in actor_list) {
                var actor = actor_list[k];
                if (actor.isDeadState() == false && actor.getSide() != this.casterActor.getSide() && actor.getPos() < 19 && actor.getPos() > 12) {
                    var pos = actor.getPositionXY();
                    mapx = mapx + pos.x;
                    mapy = mapy + pos.y;
                    count = count + 1;
                }
            }
            if (count == 0) {
                for (var k in actor_list) {
                    var actor = actor_list[k];
                    if (actor.isDeadState() == false && actor.getSide() != this.casterActor.getSide() && actor.getPos() < 13) {
                        var pos = actor.getPositionXY();
                        mapx = mapx + pos.x;
                        mapy = mapy + pos.y;
                        count = count + 1;
                    }
                }
            }
            var ox, of = this.getOffsetByCaster(50, 30, this.yDir);
            targetPos.x = mapx / count + offx - ox;
            targetPos.y = mapy / count + offy;
        }
        else if (StringUtil.stringMatch(posType, /target(\d+)/)) {
            targetList = this.fightResult.getActionObjectByName(posType);
            var targetActor = targetList[0];
            if (targetActor) {
                targetPos = targetActor.getPositionXY();
                targetPos.x = targetPos.x + offx;
                targetPos.y = targetPos.y + offy;
                traceActor = targetActor;
            }
            else {
                flag = false;
            }
        }
        else {
            //default value	
            targetPos.x = targetPos.x + offx;
            targetPos.y = targetPos.y + offy;
            traceActor = this.casterActor;
        }
        return [targetPos, traceActor, flag];
    };
    Fight_MoveAction.prototype.onPlay = function () {
        if (this.casterActor == null) {
            this.finish();
            return;
        }
        //如果是施法者还要坚持是不是冲刺状态
        if (this.targetName == "caster") {
            if (this.casterActor.isRushState() == false) {
                TLog.Error("caster isn't Rush State");
                this.finish();
                return;
            }
        }
        var objectList = this.getActionObjectList(this.targetNameList);
        if (objectList.length == 0) {
            this.finish();
            return;
        }
        this.finishMoveCount = 0;
        var thiz = this;
        var GetTraceActor = function (id) {
            return thiz.fightResult.getActionObject(id);
        };
        var targetList = this.fightResult.getActionObjectByName("targetList");
        //for index, object in ipairs(objectList) do
        for (var index = 0; index < objectList.length; index++) {
            var object = objectList[index];
            var ret = this.getMapPosByType(targetList, index, this.fromPosType, this.fromOffx, this.fromOffy);
            var ret2 = this.getMapPosByType(targetList, index, this.toPosType, this.toOffx, this.toOffy);
            var fromPos = ret[0];
            var toPos = ret2[0], traceActor = ret2[1], flag = ret2[2];
            if (flag) {
                object.setMapXY(fromPos.x, fromPos.y);
                var control = null;
                //移动方式
                if (this.moveType == ENUM_FIGHT_MOVE_TYPE.MOVE_LINE_TIME) {
                    control = ActorControl_LineMoveTime.newObj(this.during, fromPos.x, fromPos.y, toPos.x, toPos.y);
                }
                else if (this.moveType == ENUM_FIGHT_MOVE_TYPE.MOVE_TRACE) {
                    if (traceActor == null) {
                        control = ActorControl_LineMoveTime.newObj(this.during, fromPos.x, fromPos.y, toPos.x, toPos.y);
                    }
                    else {
                        control = ActorControl_TraceMove.newObj(this.moveSpeed, traceActor.getCombatId(), GetTraceActor, this.toOffx, this.toOffy);
                    }
                }
                else if (this.moveType == ENUM_FIGHT_MOVE_TYPE.MOVE_CURVE) {
                    var cx1 = this.coffx1 + fromPos.x;
                    var cy1 = this.coffy1 + fromPos.y;
                    var cx2 = this.coffx2 + fromPos.x;
                    var cy2 = this.coffy2 + fromPos.y;
                    control = ActorControl_CurveMove.newObj(this.moveSpeed, fromPos.x, fromPos.y, toPos.x, toPos.y, cx1, cy1, cx2, cy2);
                }
                else if (this.moveType == ENUM_FIGHT_MOVE_TYPE.MOVE_INSTANT) {
                    this.finishMoveCount = this.finishMoveCount + 1; //直接完成
                    object.setMapXY(toPos.x, toPos.y);
                }
                //object:faceToXY(toPos.x, toPos.y)
                if (control) {
                    control.setFinishCallback(this.onMoveFinish, this);
                    object.addControl(control);
                    this.controlMap[object.hashCode] = control;
                }
            }
            else {
                this.finishMoveCount = this.finishMoveCount + 1;
            }
        }
        if (this.finishMoveCount >= objectList.length) {
            this.finish();
        }
    };
    Fight_MoveAction.prototype.onMoveFinish = function (actor) {
        this.finishMoveCount = this.finishMoveCount + 1;
    };
    Fight_MoveAction.prototype.onTick = function (delay) {
        var targetList = this.getActionObjectList(this.targetNameList);
        if (this.finishMoveCount >= targetList.length) {
            this.finish();
            return;
        }
    };
    Fight_MoveAction.prototype.onFinish = function () {
        var _this = this;
        var targetList = this.getActionObjectList(this.targetNameList);
        targetList.forEach(function (object) {
            var control = _this.controlMap[object.hashCode];
            if (control) {
                object.removeControl(control);
                control.finish(object);
                control.deleteObj();
            }
        });
        this.controlMap = {};
    };
    return Fight_MoveAction;
}(Fight_BaseAction));
__reflect(Fight_MoveAction.prototype, "Fight_MoveAction");
//# sourceMappingURL=Fight_MoveAction.js.map