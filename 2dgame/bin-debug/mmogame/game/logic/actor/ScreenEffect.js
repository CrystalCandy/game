/*
作者:
    yangguiming
    
创建时间：
    2014.10.30(星期四)

意图：
  屏幕特效

公共接口：
    
*/
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
var ScreenEffect = (function (_super) {
    __extends(ScreenEffect, _super);
    function ScreenEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenEffect.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.setAnimNotifyEnable(false);
        this.setTouchEnable(false);
        this.bEnterCamera = false;
        this.screenLayer = 0;
    };
    ScreenEffect.prototype.destory = function () {
        if (this.bEnterCamera) {
            SceneManager.getInstance().removeScreenEffect(this);
        }
    };
    ScreenEffect.prototype.getActorType = function () {
        return actor_Type.ACTOR_TYPE_EFFECT;
    };
    ScreenEffect.prototype.enterMap = function (layer) {
        TLog.Assert(false); //镜头特效不能进入地图
    };
    ScreenEffect.prototype.leaveMap = function () {
        TLog.Assert(false);
    };
    ScreenEffect.prototype.onAnimOneCycle = function (action_id) {
    };
    ScreenEffect.prototype.setScreenLayer = function (layer) {
        this.screenLayer = layer;
    };
    ScreenEffect.prototype.getScreenLayer = function () {
        return this.screenLayer;
    };
    ScreenEffect.prototype.onEnterCamera = function () {
        TLog.Assert(!this.bEnterCamera);
        this.bEnterCamera = true;
    };
    ScreenEffect.prototype.onLeaveCamera = function () {
        TLog.Assert(this.bEnterCamera);
        this.bEnterCamera = false;
    };
    ScreenEffect.prototype.setPositionXY = function (x, y) {
        var sx = x + IGlobal.stageWidth / 2;
        var sy = y + IGlobal.stageHeight / 2;
        _super.prototype.setPositionXY.call(this, sx, sy);
    };
    ScreenEffect.prototype.getPositionXY = function () {
        var sp = _super.prototype.getPositionXY.call(this);
        sp.x = sp.x - IGlobal.stageWidth / 2;
        sp.y = sp.y - IGlobal.stageHeight / 2;
        return sp;
    };
    return ScreenEffect;
}(Effect));
__reflect(ScreenEffect.prototype, "ScreenEffect");
//# sourceMappingURL=ScreenEffect.js.map