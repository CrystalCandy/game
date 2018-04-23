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
//登陆连接
//连接游戏服
var RuntimeConnectionWorker = (function (_super) {
    __extends(RuntimeConnectionWorker, _super);
    function RuntimeConnectionWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuntimeConnectionWorker.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.userData = params[0];
    };
    RuntimeConnectionWorker.prototype.destory = function () {
    };
    RuntimeConnectionWorker.prototype.send = function () {
        var message = GetMessage(LoginOpcodes.C2L_ROLE_SELECT);
        message.playerId = this.userData.id;
        SendLoginMessage(message);
    };
    return RuntimeConnectionWorker;
}(TClass));
__reflect(RuntimeConnectionWorker.prototype, "RuntimeConnectionWorker");
//# sourceMappingURL=RuntimeConnectionWorker.js.map