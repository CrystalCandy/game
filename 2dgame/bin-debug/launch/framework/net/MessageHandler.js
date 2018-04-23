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
var MessageHandler = (function (_super) {
    __extends(MessageHandler, _super);
    function MessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageHandler.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mHandles = {};
    };
    MessageHandler.prototype.register = function (messageId, functionRef, objectRef) {
        this.mHandles[messageId] = { functionRef: functionRef, objectRef: objectRef };
    };
    MessageHandler.prototype.onTcpConnect = function (dispatch, message) {
    };
    MessageHandler.prototype.onTcpClose = function (dispatch, message) {
    };
    MessageHandler.prototype.acceptMessage = function (dispatch, message) {
        var handleInfo = this.mHandles[message.messageId];
        if (handleInfo) {
            var functionRef = handleInfo.functionRef;
            var thisObj = handleInfo.objectRef;
            functionRef.call(thisObj, dispatch, message);
        }
        if (message.fireEvent) {
            FireEvent(EventDefine.GET_MESSAGE, NetMessageEvent.newObj(message));
        }
    };
    MessageHandler.prototype.canAcceptMessage = function (messageId) {
        return !!this.mHandles[messageId];
    };
    return MessageHandler;
}(TClass));
__reflect(MessageHandler.prototype, "MessageHandler");
//# sourceMappingURL=MessageHandler.js.map