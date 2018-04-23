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
var MessageProtocol;
(function (MessageProtocol) {
    //布尔
    MessageProtocol[MessageProtocol["BOOLEAN"] = 0] = "BOOLEAN";
    //带符号的和不带符号的整型
    MessageProtocol[MessageProtocol["INT8"] = 1] = "INT8";
    MessageProtocol[MessageProtocol["INT16"] = 2] = "INT16";
    MessageProtocol[MessageProtocol["INT32"] = 3] = "INT32";
    MessageProtocol[MessageProtocol["UINT8"] = 4] = "UINT8";
    MessageProtocol[MessageProtocol["UINT16"] = 5] = "UINT16";
    MessageProtocol[MessageProtocol["UINT32"] = 6] = "UINT32";
    //浮点
    MessageProtocol[MessageProtocol["FLOAT32"] = 7] = "FLOAT32";
    MessageProtocol[MessageProtocol["FLOAT64"] = 8] = "FLOAT64";
    //字符串
    MessageProtocol[MessageProtocol["STRING"] = 9] = "STRING";
})(MessageProtocol || (MessageProtocol = {}));
var MessageBase = (function (_super) {
    __extends(MessageBase, _super);
    function MessageBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messageId = 0;
        return _this;
    }
    MessageBase.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.messageId = params[0] || 0;
        this.packProtocolArray = [];
        this.unpackProtocolArray = [];
        this.isdump = GAME_DEBUG && IGlobal.config.getBoolean("dumpmsg", true);
        this.fireEvent = false;
    };
    MessageBase.prototype.pack = function (writer) {
        var _this = this;
        this.packProtocolArray.forEach(function (info) {
            var type = info.type;
            var name = info.name;
            var value = _this[name];
            switch (type) {
                case MessageProtocol.BOOLEAN:
                    writer.writeBoolean(!!value);
                    break;
                case MessageProtocol.INT8:
                    writer.writeByte(value);
                    break;
                case MessageProtocol.INT16:
                    writer.writeShort(value);
                    break;
                case MessageProtocol.INT32:
                    writer.writeInt(value);
                    break;
                case MessageProtocol.UINT8:
                    writer.writeByte(value);
                    break;
                case MessageProtocol.UINT16:
                    writer.writeUnsignedShort(value);
                    break;
                case MessageProtocol.UINT32:
                    writer.writeUnsignedInt(value);
                    break;
                case MessageProtocol.FLOAT32:
                    writer.writeFloat(value);
                    break;
                case MessageProtocol.FLOAT64:
                    writer.writeDouble(value);
                    break;
                case MessageProtocol.STRING:
                    writer.writeString(value);
                    break;
            }
            _this[name] = value;
        });
    };
    MessageBase.prototype.unpack = function (reader) {
        var _this = this;
        this.unpackProtocolArray.forEach(function (info) {
            var type = info.type;
            var name = info.name;
            var value = _this[name];
            switch (type) {
                case MessageProtocol.BOOLEAN:
                    value = reader.readBoolean();
                    break;
                case MessageProtocol.INT8:
                    value = reader.readByte();
                    break;
                case MessageProtocol.INT16:
                    value = reader.readShort();
                    break;
                case MessageProtocol.INT32:
                    value = reader.readInt();
                    break;
                case MessageProtocol.UINT8:
                    value = reader.readUnsignedByte();
                    break;
                case MessageProtocol.UINT16:
                    value = reader.readUnsignedShort();
                    break;
                case MessageProtocol.UINT32:
                    value = reader.readUnsignedInt();
                    break;
                case MessageProtocol.FLOAT32:
                    value = reader.readFloat();
                    break;
                case MessageProtocol.FLOAT64:
                    value = reader.readDouble();
                    break;
                case MessageProtocol.STRING:
                    value = reader.readUTF();
                    break;
            }
            _this[name] = value;
        });
    };
    MessageBase.prototype.addWriteProtocol = function (type, name) {
        TLog.Assert(name != null, "addWriteProtocol");
        this.packProtocolArray.push({ "type": type, "name": name });
    };
    MessageBase.prototype.addReadProtocol = function (type, name) {
        TLog.Assert(name != null, "addReadProtocol");
        this.unpackProtocolArray.push({ "type": type, "name": name });
    };
    MessageBase.prototype.addResponseMsg = function (code) {
    };
    MessageBase.prototype.dump = function () {
        if (GAME_DEBUG && this.isdump) {
            this.isdump = undefined;
            TLog.Debug(JsUtil.JsonEncode(this));
            //TLog.Debug(this);
            this.isdump = true;
        }
    };
    return MessageBase;
}(TClass));
__reflect(MessageBase.prototype, "MessageBase");
var TcpConnectMessage = (function (_super) {
    __extends(TcpConnectMessage, _super);
    function TcpConnectMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TcpConnectMessage;
}(MessageBase));
__reflect(TcpConnectMessage.prototype, "TcpConnectMessage");
var TcpCloseMessage = (function (_super) {
    __extends(TcpCloseMessage, _super);
    function TcpCloseMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TcpCloseMessage;
}(MessageBase));
__reflect(TcpCloseMessage.prototype, "TcpCloseMessage");
var MessageFactory = (function (_super) {
    __extends(MessageFactory, _super);
    function MessageFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageFactory.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.messageList = {};
    };
    MessageFactory.prototype.addMessage = function (msg) {
        TLog.Assert(msg != null, "addMessage msg != null");
        if (msg == null || msg.messageId == 0) {
            TLog.Error("MessageFactory.addMessage message == nill");
            return;
        }
        this.messageList[msg.messageId] = msg;
    };
    MessageFactory.prototype.getMessage = function (msgId) {
        return this.messageList[msgId];
    };
    return MessageFactory;
}(TClass));
__reflect(MessageFactory.prototype, "MessageFactory");
function GetMessage(msgId) {
    return MessageFactory.getInstance().getMessage(msgId);
}
//# sourceMappingURL=MessageFactory.js.map