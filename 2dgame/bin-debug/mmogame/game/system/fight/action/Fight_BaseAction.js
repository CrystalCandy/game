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
var Fight_BaseAction = (function (_super) {
    __extends(Fight_BaseAction, _super);
    function Fight_BaseAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Fight_BaseAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //因为action由result托管，可以在构造函数中获取实例
        this.fightResult = args[0];
        var elemConfig = args[1];
        this.actionConfig = elemConfig;
        this.elemInfo = elemConfig.content;
        this.elemName = elemConfig.name;
        this.elemStartCondition = elemConfig.startCondition;
        this.elemFinishCondition = elemConfig.finishCondition;
        this.bAutoSendAttack = false;
        //var targetName = 		elemConfig.content.param1
        //this.targetList = this.fightResult.getActorIdListFromResult(targetName)
        this.casterActor = this.fightResult.getActionObjectByName("caster")[0];
        this.setTimeStamp(elemConfig.startTime, elemConfig.during || MaxActionTime); //设置时间轴
        this.bLastFrameDelay = false; //末帧静止
        this.bLastFrameLoop = false; //末帧循环
        this.bAttackFrame = false;
    };
    //子类复写 析构函数
    Fight_BaseAction.prototype.destory = function () {
    };
    Fight_BaseAction.prototype.getCasterActor = function () {
        //调用这函数的，要保证actor存在
        TLog.Assert(this.casterActor != null);
        return this.casterActor;
    };
    Fight_BaseAction.prototype.getTargetActor = function () {
        var targetId = this.fightResult.result.target;
        return GetFightActor(targetId);
    };
    Fight_BaseAction.prototype.play = function () {
        var ret = _super.prototype.play.call(this);
        if (ret) {
            this.bAttackFrame = false;
            this.sendEvent("begin");
            if (this.casterActor == null) {
                this.finish();
                return ret;
            }
        }
        return ret;
    };
    Fight_BaseAction.prototype.finish = function () {
        var ret = _super.prototype.finish.call(this);
        if (ret) {
            if (this.bAutoSendAttack) {
                if (!this.bAttackFrame) {
                    this.sendEvent("attack");
                    this.bAttackFrame = true;
                }
            }
            this.sendEvent("finish");
        }
        return ret;
    };
    Fight_BaseAction.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (this.elemStartCondition) {
            JsUtil.objectForEach(this.elemStartCondition, function (v) {
                v.finish = false;
            });
        }
        if (this.elemFinishCondition) {
            JsUtil.objectForEach(this.elemFinishCondition, function (v) {
                v.finish = false;
            });
        }
    };
    Fight_BaseAction.prototype.sendEvent = function (event_name) {
        if (StringUtil.isEmpty(this.elemName) == false) {
            this.sendEventBase(this.elemName, event_name);
        }
    };
    Fight_BaseAction.prototype.recElemResult = function (event) {
        if (!this.bBegin && this.checkBegin(event)) {
            this.play();
        }
        if (!this.bFinish && this.checkFinish(event)) {
            this.finish();
        }
    };
    Fight_BaseAction.prototype.checkBegin = function (event) {
        if (this.elemStartCondition.length == 0) {
            return false;
        }
        this.elemStartCondition.forEach(function (v) {
            if (v.elem_name == null || v.elem_name == event.elem_name) {
                if (v.event_name == null || v.event_name == event.event_name) {
                    v.finish = true;
                }
            }
        });
        for (var i = 0; i < this.elemStartCondition.length; i++) {
            var v = this.elemStartCondition[i];
            if (v.finish == null || v.finish == false) {
                return false;
            }
        }
        return true;
    };
    Fight_BaseAction.prototype.checkFinish = function (event) {
        if (this.elemFinishCondition.length == 0) {
            return false;
        }
        this.elemFinishCondition.forEach(function (v) {
            if (v.elem_name == null || v.elem_name == event.elem_name) {
                if (v.event_name == null || v.event_name == event.event_name) {
                    v.finish = true;
                }
            }
        });
        for (var i = 0; i < this.elemFinishCondition.length; i++) {
            var v = this.elemFinishCondition[i];
            if (v.finish == null || v.finish == false) {
                return false;
            }
        }
        return true;
    };
    Fight_BaseAction.prototype.getActionObjectList = function (targetNameList) {
        var objList = [];
        for (var i = 0; i < targetNameList.length; i++) {
            var name = targetNameList[i];
            var l = this.fightResult.getActionObjectByName(name);
            objList = objList.concat(l);
        }
        return objList.concat();
    };
    Fight_BaseAction.prototype.iteratorActorList = function (callback, targetNameList) {
        var objectList = this.getActionObjectList(targetNameList);
        if (objectList.length == 0) {
            return false;
        }
        for (var i = 0; i < objectList.length; i++) {
            var object = objectList[i];
            callback.call(this, object, i);
        }
        return true;
    };
    Fight_BaseAction.prototype.setAutoSendAttack = function (b) {
        this.bAutoSendAttack = b;
    };
    Fight_BaseAction.prototype.handleAnimNotify = function (notify, actor) {
        if (notify == "end") {
            if (!this.bLastFrameDelay && !this.bLastFrameLoop) {
                this.finish();
                return;
            }
        }
        if (notify == "attack") {
            this.bAttackFrame = true;
            this.sendEvent("attack");
        }
        this.sendEvent(notify);
    };
    //根据施法者面向，获得相对位置	
    Fight_BaseAction.prototype.getOffsetByCaster = function (offsetx, offsety, dir) {
        //编辑器以左边为准，右边的话要翻转，dir为0或1，0表示y值不用随站位取相反数
        if (this.casterActor == null || this.casterActor.getSide() == fightSide.FIGHT_RIGHT) {
            return newPos(offsetx, offsety);
        }
        else {
            dir = dir || 0;
            if (dir) {
                return newPos(-offsetx, -offsety);
            }
            return newPos(-offsetx, offsety);
        }
    };
    Fight_BaseAction.prototype.getRotateByCaster = function (angle) {
        //编辑器以左边为准，右边的话要翻转
        if (this.casterActor == null || this.casterActor.getSide() == fightSide.FIGHT_RIGHT) {
            return angle;
        }
        else {
            return -angle;
        }
    };
    Fight_BaseAction.prototype.getAbsoluteXYByCaster = function (x, y) {
        var viewSize = SceneManager.getInstance().getCameraViewSize();
        var centerX = FIGHT_CENTER_X;
        var centerY = FIGHT_CENTER_Y;
        //编辑器以左边为准，右边的话要翻转
        if (this.casterActor == null || this.casterActor.getSide() == fightSide.FIGHT_RIGHT) {
            return newPos(x, y);
        }
        else {
            var point = MathUtil.fliplr(FIGHT_MAP_ANGLE, centerX, centerY, x, y);
            return point;
        }
    };
    return Fight_BaseAction;
}(Fight_BaseElem));
__reflect(Fight_BaseAction.prototype, "Fight_BaseAction");
//# sourceMappingURL=Fight_BaseAction.js.map