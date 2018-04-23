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
var BasePrecedure = (function (_super) {
    __extends(BasePrecedure, _super);
    function BasePrecedure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventHandle = {};
        _this.id = -1;
        return _this;
    }
    BasePrecedure.prototype.destory = function () {
    };
    BasePrecedure.prototype.registerEventHandle = function (name, funcRef, objRef) {
        this.eventHandle[name] = [funcRef, objRef];
    };
    BasePrecedure.prototype.unregisterEventHandle = function (name) {
        delete this.eventHandle[name];
    };
    BasePrecedure.prototype.onActive = function (lastId) {
    };
    BasePrecedure.prototype.onDeactive = function (currentId) {
    };
    BasePrecedure.prototype.setPrecedureId = function (id) {
        this.id = id;
    };
    BasePrecedure.prototype.getPrecedureId = function () {
        return this.id;
    };
    BasePrecedure.prototype.onEvent = function (eventName, args) {
        var handler = this.eventHandle[eventName];
        if (handler) {
            var funcRef = handler[0];
            var objRef = handler[1];
            funcRef.call(objRef, args);
        }
    };
    return BasePrecedure;
}(TClass));
__reflect(BasePrecedure.prototype, "BasePrecedure");
var PrecedureManager = (function (_super) {
    __extends(PrecedureManager, _super);
    function PrecedureManager() {
        var _this = _super.call(this) || this;
        _this.mPrecedureList = [];
        _this.mCurrentPrecedure = null;
        _this.mPrevPrecedure = null;
        return _this;
    }
    PrecedureManager.prototype.destory = function () {
        this.clear();
    };
    PrecedureManager.prototype.clear = function () {
        if (this.mCurrentPrecedure) {
            var lastId = this.mCurrentPrecedure.getPrecedureId();
            this.mCurrentPrecedure.onDeactive(-1);
            this.mCurrentPrecedure = null;
        }
        for (var k in this.mPrecedureList) {
            var v = this.mPrecedureList[k];
            v.deleteObj();
        }
        this.mPrecedureList = [];
    };
    PrecedureManager.prototype.registerPrecedure = function (id, precedure) {
        precedure.setPrecedureId(id);
        this.mPrecedureList.push(precedure);
    };
    PrecedureManager.prototype.unRegisterPrecedure = function (precedure) {
        var _this = this;
        this.mPrecedureList.forEach(function (v, k) {
            if (v == precedure) {
                _this.mPrecedureList.splice(k, 1);
                return true;
            }
        });
    };
    PrecedureManager.prototype.getCurrentPrecedureId = function () {
        if (this.mCurrentPrecedure) {
            return this.mCurrentPrecedure.getPrecedureId();
        }
        return -1;
    };
    PrecedureManager.prototype.changePrecedure = function (id) {
        if (this.getCurrentPrecedureId() == id) {
            return;
        }
        for (var k = 0; k < this.mPrecedureList.length; k++) {
            var v = this.mPrecedureList[k];
            if (id == v.getPrecedureId()) {
                this.mPrevPrecedure = this.mCurrentPrecedure;
                var lastId = -1;
                if (this.mCurrentPrecedure) {
                    lastId = this.mCurrentPrecedure.getPrecedureId();
                    this.mCurrentPrecedure.onDeactive(id);
                }
                this.mCurrentPrecedure = v;
                this.mCurrentPrecedure.onActive(lastId);
                break;
            }
        }
    };
    PrecedureManager.prototype.onEvent = function (eventname, args) {
        if (this.mCurrentPrecedure == null) {
            TLog.Error("PrecedureManager.onEvent %s  self.mCurrentPrecedure == nil", eventname);
        }
        if (this.mCurrentPrecedure) {
            this.mCurrentPrecedure.onEvent(eventname, args);
        }
    };
    return PrecedureManager;
}(TClass));
__reflect(PrecedureManager.prototype, "PrecedureManager");
//# sourceMappingURL=PrecedureManager.js.map