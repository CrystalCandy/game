// TypeScript file
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
var GameTimer = (function (_super) {
    __extends(GameTimer, _super);
    function GameTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mTimerCount = 0;
        _this.mTimerCache = {};
        _this.mTimerCacheAdd = {};
        _this.mTimerCacheRemove = {};
        _this.mTimerIndex = 100;
        _this._lastTime = 0;
        _this._bLock = false;
        return _this;
    }
    GameTimer.prototype.setTimer = function (listener, thisObject, delay) {
        var data = { listener: listener, thisObject: thisObject, delay: 0, originDelay: delay };
        this.mTimerCount++;
        if (this.mTimerCount == 1) {
            this._lastTime = egret.getTimer();
            egret.startTick(this.intervalUpdate, this);
        }
        this.mTimerIndex++;
        if (this._bLock) {
            this.mTimerCacheAdd[this.mTimerIndex] = data;
        }
        else {
            this.mTimerCache[this.mTimerIndex] = data;
        }
        return this.mTimerIndex;
    };
    GameTimer.prototype.killTimer = function (key) {
        //key如果是null会造成异常
        if (key == null)
            return false;
        if (this.mTimerCacheAdd[key]) {
            delete this.mTimerCacheAdd[key];
        }
        if (this._bLock) {
            //加入移除列表
            if (this.mTimerCache[key]) {
                //this.mTimerCacheRemove.push(key);
                this.mTimerCacheRemove[key] = true;
            }
            return;
        }
        //TLog.Assert(this.mTimerCache[key] != null);
        if (this.mTimerCache[key]) {
            this.mTimerCount--;
            delete this.mTimerCache[key];
            if (this.mTimerCount == 0) {
                egret.stopTick(this.intervalUpdate, this);
            }
            return true;
        }
        return false;
    };
    GameTimer.prototype.intervalUpdate = function (timeStamp) {
        var dt = timeStamp - this._lastTime;
        this._lastTime = timeStamp;
        //假如列表
        for (var key in this.mTimerCacheAdd) {
            this.mTimerCache[key] = this.mTimerCacheAdd[key];
        }
        this.mTimerCacheAdd = {};
        for (var key in this.mTimerCacheRemove) {
            this.killTimer(key);
        }
        this.mTimerCacheRemove = {};
        this._bLock = true;
        for (var key in this.mTimerCache) {
            //已经被删除了，标志不会再调用
            if (this.mTimerCacheRemove[key]) {
                continue;
            }
            var data = this.mTimerCache[key];
            data.delay += dt;
            if (data.delay >= data.originDelay) {
                var _delay = data.delay;
                data.delay = 0;
                data.listener.call(data.thisObject, _delay);
            }
        }
        this._bLock = false;
        return false;
    };
    GameTimer.prototype.destory = function () {
        // var bLock = this._bLock;
        // this._bLock = true;
        // for (var key in this.mTimerCache) {
        //     var key2: any = key;
        //     this.killTimer(<number>key2);
        // }
        // this._bLock = false;
        // this.intervalUpdate(this._lastTime);
        this.mTimerCount = 0;
        this.mTimerCache = {};
        this.mTimerCacheAdd = {};
        this.mTimerCacheRemove = {};
        egret.stopTick(this.intervalUpdate, this);
    };
    return GameTimer;
}(TClass));
__reflect(GameTimer.prototype, "GameTimer");
function SetTimer(listener, thisObject, delay, runFirst) {
    if (runFirst) {
        listener.call(thisObject, 0);
    }
    return GameTimer.getInstance().setTimer(listener, thisObject, delay);
}
function KillTimer(key) {
    return GameTimer.getInstance().killTimer(key);
}
function DestoryTimer() {
    GameTimer.destoryInstance();
}
function GetCurMillSec() {
    return core.getCpuTime();
}
//返回系统时间，以秒为单位
function GetOSTime() {
    var d = new Date();
    return Math.floor(d.getTime() / 1000);
}
function GetOSDate(t) {
    var d = new Date();
    if (t != null) {
        d.setTime(t * 1000); //接受毫秒时间
    }
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate(); //日期
    var wday = d.getDay(); //javascript(0-6)0是周日，6是周六
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    return { year: year, month: month, day: day, hour: hour, min: min, sec: sec, wday: wday };
}
//# sourceMappingURL=Timer.js.map