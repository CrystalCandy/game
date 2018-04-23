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
var ActorControlBase = (function (_super) {
    __extends(ActorControlBase, _super);
    function ActorControlBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ActorControlBase.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.maxTime = 0;
        this.delayTime = 0;
        this.callback = null;
        this.thisObj = null;
        this.mFinish = false;
        this.mBegin = false;
    };
    //子类复写 析构函数
    ActorControlBase.prototype.destory = function () {
    };
    ActorControlBase.prototype.setFinishCallback = function (callback, thisObj) {
        this.callback = callback;
        this.thisObj = thisObj;
    };
    ActorControlBase.prototype.begin = function (actor) {
        if (this.mBegin == true) {
            return;
        }
        this.mBegin = true;
        this.mFinish = false;
        this.onBegin(actor);
    };
    ActorControlBase.prototype.finish = function (actor) {
        if (!this.mBegin || this.mFinish) {
            return;
        }
        this.mFinish = true;
        this.onFinish(actor);
        if (this.callback) {
            this.callback.call(this.thisObj, actor);
        }
    };
    ActorControlBase.prototype.isBegin = function () {
        return this.mBegin;
    };
    ActorControlBase.prototype.isFinish = function () {
        return this.mFinish;
    };
    ActorControlBase.prototype.update = function (actor, delay) {
        if (this.mBegin == false || this.mFinish) {
            return;
        }
        this.delayTime = this.delayTime + delay;
        if (this.maxTime > 0) {
            if (this.delayTime > this.maxTime) {
                this.finish(actor);
                return true;
            }
        }
        if (this.onUpdate(actor, delay)) {
            this.finish(actor);
            return true;
        }
        return false;
    };
    ActorControlBase.prototype.setMaxTime = function (maxTime) {
        this.maxTime = maxTime;
    };
    ////////////////////////////////////////////////////////////////////////
    //必须继承
    ActorControlBase.prototype.onBegin = function (actor) {
    };
    ActorControlBase.prototype.onUpdate = function (actor, delay) {
    };
    ActorControlBase.prototype.onFinish = function (actor) {
    };
    return ActorControlBase;
}(TClass));
__reflect(ActorControlBase.prototype, "ActorControlBase");
//# sourceMappingURL=ActorControlBase.js.map