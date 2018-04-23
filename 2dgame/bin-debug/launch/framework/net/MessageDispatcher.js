// <reference path=".MessageHandler.ts" />
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
var MessageDispatcher = (function (_super) {
    __extends(MessageDispatcher, _super);
    function MessageDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageDispatcher.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.init();
        this.mMsgHandlerList = [];
    };
    MessageDispatcher.prototype.init = function () {
        this.bEnable = true;
        this.mNetWork = core.NetSystem.getInstance().createNetWork();
        this.mNetWork.addEventListener(core.NetWork.ConnectEvent, this.onTcpConnect, this);
        this.mNetWork.addEventListener(core.NetWork.CloseEvent, this.onTcpClose, this);
        this.mNetWork.addEventListener(core.NetWork.RecvEvent, this.onTcpRecv, this);
    };
    MessageDispatcher.prototype.destory = function () {
        core.NetSystem.getInstance().closeNetWork(this.mNetWork);
        this.mNetWork.removeEventListener(core.NetWork.ConnectEvent, this.onTcpConnect, this);
        this.mNetWork.removeEventListener(core.NetWork.CloseEvent, this.onTcpClose, this);
        this.mNetWork.removeEventListener(core.NetWork.RecvEvent, this.onTcpRecv, this);
    };
    MessageDispatcher.prototype.connect = function (ip, port) {
        this.mNetWork.connect(ip, port);
    };
    MessageDispatcher.prototype.disconnect = function () {
        this.mNetWork.disconnect();
    };
    MessageDispatcher.prototype.isConnect = function () {
        return this.mNetWork.isConnect();
    };
    MessageDispatcher.prototype.sendPacket = function (message) {
        if (!this.bEnable)
            return;
        //没有被初始化
        if (message.messageId == 0) {
            TLog.Error("NetWork.sendPacket meesageId ==0");
            return;
        }
        if (message.isdump) {
            TLog.Debug("[send==>]:%s code:%d", message.classname, message.messageId);
        }
        var writer = this.mNetWork.beginPack();
        writer.writeUnsignedShort(message.messageId);
        message.pack(writer);
        this.mNetWork.endPack();
        message.dump();
    };
    MessageDispatcher.prototype.sendPacketCallback = function (callback, thisObj, userData) {
        if (!this.bEnable)
            return;
        var writer = this.mNetWork.beginPack();
        callback.call(thisObj, writer, userData);
        this.mNetWork.endPack();
    };
    MessageDispatcher.prototype.setEnable = function (bEnable) {
        this.bEnable = bEnable;
    };
    MessageDispatcher.prototype.addMessageHandle = function (handle) {
        //self.mMessageRegister:addMessageHandle(handle)
        var idx = this.mMsgHandlerList.indexOf(handle);
        if (idx == -1)
            this.mMsgHandlerList.push(handle);
    };
    MessageDispatcher.prototype.removeMessageHandle = function (handle) {
        //self.mMessageRegister:removeMessageHandle(handle)
        var idx = this.mMsgHandlerList.indexOf(handle);
        if (idx > -1) {
            handle.deleteObj();
            this.mMsgHandlerList.splice(idx, 1);
        }
    };
    MessageDispatcher.prototype.onTcpConnect = function (event) {
        var _this = this;
        var msg = TcpConnectMessage.createObj();
        msg.code = event.code;
        this.mMsgHandlerList.forEach(function (handle) {
            handle.onTcpConnect(_this, msg);
        });
    };
    MessageDispatcher.prototype.onTcpClose = function (event) {
        var _this = this;
        var msg = TcpCloseMessage.createObj(0);
        msg.code = event.code;
        this.mMsgHandlerList.forEach(function (handle) {
            handle.onTcpClose(_this, msg);
        });
    };
    MessageDispatcher.prototype.onTcpRecv = function (event) {
        var reader = event.reader;
        var msg_len = event.msgLen;
        var code = reader.readUnsignedShort();
        var message = MessageFactory.getInstance().getMessage(code);
        if (message == null) {
            TLog.Error("MessageDispatcher.onTcpRecv message code:%d not exsit", code);
            return;
        }
        message.unpack(reader);
        if (message.isdump) {
            TLog.Debug("[recv<==]: %s code:%d   msglen:%d", message.classname, code, msg_len);
            message.dump();
        }
        this.dispatchMessage(message);
    };
    MessageDispatcher.prototype.dispatchMessage = function (message) {
        var _this = this;
        this.mMsgHandlerList.forEach(function (handle) {
            if (handle.canAcceptMessage(message.messageId)) {
                handle.acceptMessage(_this, message);
            }
        });
    };
    return MessageDispatcher;
}(TClass));
__reflect(MessageDispatcher.prototype, "MessageDispatcher");
//# sourceMappingURL=MessageDispatcher.js.map