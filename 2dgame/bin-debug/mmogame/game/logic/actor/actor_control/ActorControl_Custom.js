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
var ActorControl_Custom = (function (_super) {
    __extends(ActorControl_Custom, _super);
    function ActorControl_Custom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ActorControl_Custom.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.customCallback = args[0];
        this.customObj = args[1];
        var totalTime = args[2];
        this.param = args[3];
        this.setMaxTime(totalTime);
    };
    //子类复写 析构函数
    ActorControl_Custom.prototype.destory = function () {
    };
    ActorControl_Custom.prototype.onBegin = function (actor) {
    };
    ActorControl_Custom.prototype.onUpdate = function (actor, delay) {
        if (!this.customCallback || !this.customObj) {
            return true;
        }
        return this.customCallback.call(this.customObj, this.delayTime / this.maxTime, this.param, actor);
    };
    ActorControl_Custom.prototype.onFinish = function (actor) {
    };
    return ActorControl_Custom;
}(ActorControlBase));
__reflect(ActorControl_Custom.prototype, "ActorControl_Custom");
//# sourceMappingURL=ActorControl_Custom.js.map