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
var TweenAction = (function (_super) {
    __extends(TweenAction, _super);
    function TweenAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TweenAction.prototype.onBegin = function () {
        this.curTween = this.getImpTween();
        this.curTween.call(this.finish, this);
    };
    TweenAction.prototype.onStop = function () {
        this.curTween.setPaused(true);
        this.curTween = null;
    };
    return TweenAction;
}(BaseAction));
__reflect(TweenAction.prototype, "TweenAction");
//alpha
var AlphaAction = (function (_super) {
    __extends(AlphaAction, _super);
    function AlphaAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlphaAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.alpha = this.Data.alpha || 0;
        this.alpha = this.alpha / 255;
    };
    AlphaAction.prototype.getImpTween = function () {
        return egret.Tween.get(this.window).to({ alpha: this.alpha }, this.time);
    };
    return AlphaAction;
}(TweenAction));
__reflect(AlphaAction.prototype, "AlphaAction");
////////////////////////////////////////////////////////////////////
//移动
var MoveAction = (function (_super) {
    __extends(MoveAction, _super);
    function MoveAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.startX = this.Data.startX;
        this.startY = this.Data.startY;
        this.endX = this.Data.endX;
        this.endY = this.Data.endY;
        this.moveType = this.Data.moveType || "jump";
        this.customCal = this.Data.customCal || null;
        this.calObj = this.Data.calObj;
    };
    MoveAction.prototype.getImpTween = function () {
        return egret.Tween.get(this.window).set({ x: this.startX, y: this.startY }).to({ x: this.endX, y: this.endY }, this.time);
    };
    MoveAction.prototype.setStartXY = function (x, y) {
        this.startX = x;
        this.startY = y;
    };
    MoveAction.prototype.setEndXY = function (x, y) {
        this.endX = x;
        this.endY = y;
    };
    MoveAction.prototype.setTime = function (time) {
        this.time = time;
    };
    return MoveAction;
}(TweenAction));
__reflect(MoveAction.prototype, "MoveAction");
//旋转
var RotateAction = (function (_super) {
    __extends(RotateAction, _super);
    function RotateAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RotateAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.angle = this.Data.angle;
        this.speed = this.Data.speed;
        this.nowAngle = 0;
        this.anchor = this.Data.anchor;
        if (this.anchor == null) {
            this.anchor = true;
        }
    };
    RotateAction.prototype.getImpTween = function () {
        return egret.Tween.get(this.window).to({ rotation: this.angle }, this.time);
    };
    return RotateAction;
}(TweenAction));
__reflect(RotateAction.prototype, "RotateAction");
//缩放
var ZoomAction = (function (_super) {
    __extends(ZoomAction, _super);
    function ZoomAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.scale = this.Data.scale;
        this.anchor = this.Data.anchor;
        if (this.anchor == null) {
            this.anchor = true;
        }
    };
    ZoomAction.prototype.getImpTween = function () {
        return egret.Tween.get(this.window).to({ scaleX: this.scale, scaleY: this.scale, }, this.time);
    };
    return ZoomAction;
}(TweenAction));
__reflect(ZoomAction.prototype, "ZoomAction");
//延时
var TimerAction = (function (_super) {
    __extends(TimerAction, _super);
    function TimerAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimerAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    TimerAction.prototype.onBegin = function () {
        this.timerId = SetTimer(this.finish, this, this.time);
    };
    TimerAction.prototype.onStop = function () {
        if (this.timerId) {
            KillTimer(this.timerId);
            this.timerId = null;
        }
    };
    return TimerAction;
}(BaseAction));
__reflect(TimerAction.prototype, "TimerAction");
//函数回调
var CallAction = (function (_super) {
    __extends(CallAction, _super);
    function CallAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    CallAction.prototype.onBegin = function () {
        var func = this.Data.fun;
        if (func != null) {
            //TLog.Debug("CallAction visible", this.Data.visible, this.window.GetName())
            if (this.Data.target != null) {
                func.call(this.Data.target, this.Data.data);
            }
            else {
                func.call(this.Data.data);
            }
        }
        this.finish();
    };
    CallAction.prototype.onStop = function () {
        //ui_util.RemoveController(this.window, this.id)
    };
    return CallAction;
}(BaseAction));
__reflect(CallAction.prototype, "CallAction");
//# sourceMappingURL=ImpActions.js.map