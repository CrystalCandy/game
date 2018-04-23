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
var Fight_BaseElem = (function (_super) {
    __extends(Fight_BaseElem, _super);
    function Fight_BaseElem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Fight_BaseElem.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.fightResult = null;
        //开始时间和持续时间都是表单读写好了
        this.startTime = -1;
        this.during = 0;
        this.reset();
    };
    //子类复写 析构函数
    Fight_BaseElem.prototype.destory = function () {
        this.finish();
    };
    Fight_BaseElem.prototype.reset = function () {
        if (this.bBegin == false) {
            return;
        }
        if (this.bFinish == false) {
            //print(this.classname, this.autoFinishDelayTime)
            //assert(false)
            this.finish();
        }
        this.bBegin = false;
        this.bFinish = false;
        this.autoFinishActorId = -1;
        this.timestamp = 0; //时间轴
        this.time = 0; //自开始后的时间
        this.timeProcess = 0;
    };
    Fight_BaseElem.prototype.setTimeStamp = function (startTime, during) {
        if (this.fightResult) {
            if (startTime > 0) {
                startTime = this.fightResult.getActionDuration(startTime);
            }
            during = this.fightResult.getActionDuration(during);
        }
        this.during = during;
        this.startTime = startTime;
    };
    Fight_BaseElem.prototype.play = function () {
        if (this.bFinish == true) {
            return false;
        }
        if (this.bBegin == false) {
            this.bBegin = true;
            //PROFILE_START("Fight_BaseElem.play"..this.classname)
            this.onPlay();
            //PROFILE_STOP("Fight_BaseElem.play"..this.classname)
            return true;
        }
        return false;
    };
    Fight_BaseElem.prototype.tick = function (delay) {
        this.timestamp = this.timestamp + delay;
        //检查大于开始时间
        if (this.bBegin == false) {
            if (this.startTime >= 0) {
                if (this.timestamp >= this.startTime) {
                    this.play();
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        }
        if (this.bFinish == true) {
            return;
        }
        this.time = this.time + delay;
        this.timeProcess = this.time / this.during;
        if (this.timeProcess > 1) {
            this.timeProcess = 1;
        }
        //大于结束时间，则结束
        if (this.timeProcess >= 1) {
            this.finish();
            return;
        }
        if (this.autoFinishActorId >= 0) {
            var actor = GetFightActor(this.autoFinishActorId);
            if (actor == null) {
                this.finish();
                return;
            }
        }
        this.onTick(delay);
    };
    Fight_BaseElem.prototype.finish = function () {
        if (this.bBegin == false) {
            return false;
        }
        if (this.bFinish == false) {
            this.bFinish = true;
            //PROFILE_START("Fight_BaseElem.finish"..this.classname)
            this.onFinish();
            //PROFILE_STOP("Fight_BaseElem.finish"..this.classname)
            return true;
        }
        return false;
    };
    Fight_BaseElem.prototype.sendEventBase = function (elem_name, event_name) {
        var event = {};
        event.elem_name = elem_name;
        event.event_name = event_name;
        this.fightResult.recElemResult(event);
    };
    Fight_BaseElem.prototype.isFinish = function () {
        return this.bFinish;
    };
    Fight_BaseElem.prototype.isBegin = function () {
        return this.bBegin;
    };
    Fight_BaseElem.prototype.getResult = function () {
        return this.fightResult;
    };
    // 继承函数
    Fight_BaseElem.prototype.onPlay = function () {
        //默认是直接关闭了,除非重载
        this.finish();
    };
    Fight_BaseElem.prototype.onTick = function (delay) {
    };
    Fight_BaseElem.prototype.onFinish = function () {
    };
    Fight_BaseElem.prototype.setAutoFinishActor = function (actorId) {
        this.autoFinishActorId = actorId;
    };
    return Fight_BaseElem;
}(TClass));
__reflect(Fight_BaseElem.prototype, "Fight_BaseElem");
//# sourceMappingURL=Fight_BaseElem.js.map