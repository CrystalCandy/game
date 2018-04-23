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
var WorkUnit = (function (_super) {
    __extends(WorkUnit, _super);
    function WorkUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    WorkUnit.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mWorkQueue = null;
    };
    //子类复写 析构函数
    WorkUnit.prototype.destory = function () {
    };
    WorkUnit.prototype.onAddToWorkQueue = function (queue) {
        this.mWorkQueue = queue;
    };
    //返回true表示完成
    //返回false，则在完成后回调notifyComplete
    WorkUnit.prototype.onExcute = function () {
        return false;
    };
    WorkUnit.prototype.notifyExcuteComplete = function () {
        this.mWorkQueue.onWorkUnitComplete(this);
    };
    return WorkUnit;
}(TClass));
__reflect(WorkUnit.prototype, "WorkUnit");
//资源加载的workQueue，这里的资源加载是无序的
var ResWorkUnit = (function (_super) {
    __extends(ResWorkUnit, _super);
    function ResWorkUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResWorkUnit.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mConfigList = {};
        if (params[0] && params[1] && params[2]) {
            this.addRes(params[0], params[1], params[2], params[3]);
        }
    };
    ResWorkUnit.prototype.destory = function () {
        this.mConfigList = null;
    };
    ResWorkUnit.prototype.addRes = function (path, callback, thisObj, userData) {
        path = path.replace(/\\/g, "/");
        this.mConfigList[path] = { func: callback, thisObj: thisObj, userData: userData };
    };
    ResWorkUnit.prototype.onExcute = function () {
        var _this = this;
        var all = Object.keys(this.mConfigList).length;
        if (all == 0) {
            //this.notifyExcuteComplete();
            return true;
        }
        var count = 0;
        var callback = {
            onResItemLoad: function (res) {
                var info = _this.mConfigList[res.getKey()];
                if (info) {
                    info.func.call(info.thisObj, res.getData(), info.userData);
                }
                count++;
                if (count >= all) {
                    _this.notifyExcuteComplete();
                }
            },
            onResItemError: function (key) {
                count++; //表单出错
                if (count >= all) {
                    _this.notifyExcuteComplete();
                }
            }
        };
        for (var k in this.mConfigList) {
            var info = this.mConfigList[k];
            IGlobal.resManager.loadResAsyn(k, callback, core.ResourceType.TYPE_TEXT);
        }
        return false;
    };
    return ResWorkUnit;
}(WorkUnit));
__reflect(ResWorkUnit.prototype, "ResWorkUnit");
var CallbackWorkUnit = (function (_super) {
    __extends(CallbackWorkUnit, _super);
    function CallbackWorkUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallbackWorkUnit.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.callback = params[0];
        this.thisObj = params[1];
        this.userData = params[2];
    };
    //子类复写 析构函数
    CallbackWorkUnit.prototype.destory = function () {
    };
    CallbackWorkUnit.prototype.onExcute = function () {
        this.callback.call(this.thisObj, this.userData);
        return true;
    };
    return CallbackWorkUnit;
}(WorkUnit));
__reflect(CallbackWorkUnit.prototype, "CallbackWorkUnit");
var ZipWorkUnit = (function (_super) {
    __extends(ZipWorkUnit, _super);
    function ZipWorkUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ZipWorkUnit.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.path = params[0];
    };
    //子类复写 析构函数
    ZipWorkUnit.prototype.destory = function () {
    };
    ZipWorkUnit.prototype.onExcute = function () {
        IGlobal.resManager.addZipPacket(this.path, this);
        return false;
    };
    ZipWorkUnit.prototype.onZipItemLoad = function (key, result) {
        this.notifyExcuteComplete();
    };
    return ZipWorkUnit;
}(WorkUnit));
__reflect(ZipWorkUnit.prototype, "ZipWorkUnit", ["core.ZipItemCallback"]);
//================================================================================
var WorkQueue = (function (_super) {
    __extends(WorkQueue, _super);
    function WorkQueue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allCount = 0;
        _this.finishCount = 0;
        return _this;
    }
    //子类复写 初始化函数
    WorkQueue.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mQueue = [];
        this.mCallback = null;
        this.step = 1;
    };
    //子类复写 析构函数
    WorkQueue.prototype.destory = function () {
        if (this.scheduleEntryID) {
            KillTimer(this.scheduleEntryID);
            this.scheduleEntryID = null;
        }
    };
    WorkQueue.prototype.addWorkUnit = function (workUnit, bFirst) {
        if (bFirst == null)
            bFirst = false;
        workUnit.onAddToWorkQueue(this);
        if (bFirst) {
            this.mQueue.unshift(workUnit);
        }
        else {
            this.mQueue.push(workUnit);
        }
        this.allCount++;
        //this.allCount = this.mQueue.length;
    };
    WorkQueue.prototype.addWorkUnitFirst = function (workUnit) {
        this.addWorkUnit(workUnit, true);
    };
    WorkQueue.prototype.setCallback = function (callback) {
        this.mCallback = callback;
    };
    WorkQueue.prototype.clear = function () {
        this.allCount = 0;
        this.finishCount = 0;
        this.mQueue.length = 0;
    };
    WorkQueue.prototype.onWorkUnitComplete = function (workUnit) {
        if (this.mCallback) {
            this.finishCount++;
            var cur = this.finishCount;
            // var remain = this.mQueue.length;
            // var cur = this.allCount - remain;
            this.mCallback.onUpdateWorkQueue(workUnit, cur, this.allCount);
            workUnit.deleteObj();
        }
        this.next();
    };
    WorkQueue.prototype.start = function () {
        if (this.allCount <= 0) {
            TLog.Warn("WorkQueue.start Queue_size == 0");
            if (this.mCallback) {
                this.mCallback.onBeginWorkQueue(0);
                this.mCallback.onUpdateWorkQueue(null, 0, 0);
                this.mCallback.onEndWorkQueue();
            }
            return;
        }
        if (this.mCallback) {
            this.mCallback.onBeginWorkQueue(this.allCount);
        }
        this.next();
    };
    WorkQueue.prototype.next = function () {
        var workUnit = this.mQueue.shift();
        if (workUnit == null) {
            if (this.mCallback) {
                this.mCallback.onEndWorkQueue();
            }
            KillTimer(this.scheduleEntryID);
            this.scheduleEntryID = null;
            return;
        }
        var bComplete = workUnit.onExcute();
        if (bComplete) {
            workUnit.notifyExcuteComplete();
        }
    };
    return WorkQueue;
}(TClass));
__reflect(WorkQueue.prototype, "WorkQueue");
//# sourceMappingURL=WorkQueue.js.map