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
var ActorCmdComponent = (function (_super) {
    __extends(ActorCmdComponent, _super);
    function ActorCmdComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    ActorCmdComponent.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.owner = params[0];
        this.realActor = this.owner.realActor;
        this.handlerList = {};
    };
    //子类复写 析构函数
    ActorCmdComponent.prototype.destory = function () {
    };
    ActorCmdComponent.prototype.addCommandHandler = function (cmdId, functionRef) {
        if (this.handlerList[cmdId]) {
            TLog.Warn("ActorCmdComponent.addCommandHandler %d already exsit", cmdId);
            return;
        }
        this.handlerList[cmdId] = functionRef;
    };
    ActorCmdComponent.prototype.onCommand = function (cmdId, param1, param2) {
        if (this.handlerList[cmdId]) {
            this.handlerList[cmdId].call(this, param1, param2);
        }
    };
    ActorCmdComponent.prototype.onAppearChange = function () {
    };
    return ActorCmdComponent;
}(TClass));
__reflect(ActorCmdComponent.prototype, "ActorCmdComponent");
//# sourceMappingURL=ActorCmdComponent.js.map