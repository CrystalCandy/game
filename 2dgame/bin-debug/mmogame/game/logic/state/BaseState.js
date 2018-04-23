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
var BaseState = (function (_super) {
    __extends(BaseState, _super);
    function BaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    BaseState.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mStateType = -1;
    };
    //子类复写 析构函数
    BaseState.prototype.destory = function () {
    };
    BaseState.prototype.GetStateType = function () {
        return this.mStateType;
    };
    BaseState.prototype.Activate = function () {
    };
    BaseState.prototype.Deactive = function () {
    };
    BaseState.prototype.EnableSubState = function (statetype) {
        return false;
    };
    BaseState.prototype.OnVpMouseDownEvent = function (args) {
        return this.onMouseDown(args);
    };
    BaseState.prototype.OnVpMouseMoveEvent = function (args) {
        return this.onMouseMove(args);
    };
    BaseState.prototype.OnVpMouseUpEvent = function (args) {
        return this.onMouseUp(args);
    };
    ////////////////////-子类重载//////////////////////-
    BaseState.prototype.onMouseDown = function (args) {
        return true;
    };
    BaseState.prototype.onMouseMove = function (args) {
        return true;
    };
    BaseState.prototype.onMouseUp = function (args) {
        return true;
    };
    return BaseState;
}(TClass));
__reflect(BaseState.prototype, "BaseState");
//# sourceMappingURL=BaseState.js.map