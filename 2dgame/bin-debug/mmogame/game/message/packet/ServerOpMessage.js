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
// TypeScript file
//心跳ping
var Message_CMSG_PING = (function (_super) {
    __extends(Message_CMSG_PING, _super);
    function Message_CMSG_PING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_CMSG_PING.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.temp = 0;
        this.addWriteProtocol(MessageProtocol.UINT32, "index");
        this.addWriteProtocol(MessageProtocol.UINT32, "temp");
    };
    return Message_CMSG_PING;
}(MessageBase));
__reflect(Message_CMSG_PING.prototype, "Message_CMSG_PING");
//心跳pong
var Message_SMSG_PONG = (function (_super) {
    __extends(Message_SMSG_PONG, _super);
    function Message_SMSG_PONG() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_PONG.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT32, "ping");
        this.addReadProtocol(MessageProtocol.UINT32, "serverTime");
    };
    return Message_SMSG_PONG;
}(MessageBase));
__reflect(Message_SMSG_PONG.prototype, "Message_SMSG_PONG");
//游戏服务器登陆请求（请求后如果成功，就真正进入游戏了）
var Message_CMSG_LOGIN = (function (_super) {
    __extends(Message_CMSG_LOGIN, _super);
    function Message_CMSG_LOGIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_CMSG_LOGIN.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.STRING, "hostname");
        this.addWriteProtocol(MessageProtocol.STRING, "accountId");
        this.addWriteProtocol(MessageProtocol.STRING, "sessionId");
    };
    return Message_CMSG_LOGIN;
}(MessageBase));
__reflect(Message_CMSG_LOGIN.prototype, "Message_CMSG_LOGIN");
//游戏服务器登陆相应（除了返回这个，同时还会发送角色信息，进入地图信息，AOI信息等等）
var Message_SMSG_LOGIN = (function (_super) {
    __extends(Message_SMSG_LOGIN, _super);
    function Message_SMSG_LOGIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_LOGIN.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT16, "result");
        this.addReadProtocol(MessageProtocol.UINT32, "serverTime");
    };
    return Message_SMSG_LOGIN;
}(MessageBase));
__reflect(Message_SMSG_LOGIN.prototype, "Message_SMSG_LOGIN");
//用户服务器登陆请求
var Message_CMSG_LOGIN_USER = (function (_super) {
    __extends(Message_CMSG_LOGIN_USER, _super);
    function Message_CMSG_LOGIN_USER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_CMSG_LOGIN_USER.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.STRING, "hostname");
        this.addWriteProtocol(MessageProtocol.STRING, "verify");
        this.addWriteProtocol(MessageProtocol.STRING, "username");
        this.addWriteProtocol(MessageProtocol.STRING, "password");
        this.addWriteProtocol(MessageProtocol.STRING, "accoutId");
        this.addWriteProtocol(MessageProtocol.STRING, "token");
    };
    return Message_CMSG_LOGIN_USER;
}(MessageBase));
__reflect(Message_CMSG_LOGIN_USER.prototype, "Message_CMSG_LOGIN_USER");
//用户服务器通知登陆
var Message_SMSG_LOGIN_USER = (function (_super) {
    __extends(Message_SMSG_LOGIN_USER, _super);
    function Message_SMSG_LOGIN_USER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_LOGIN_USER.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Message_SMSG_LOGIN_USER.prototype.unpack = function (reader) {
        this.result = reader.readUnsignedShort();
        if (this.result == 0) {
            //登陆session
            this.accountId = reader.readString();
            this.sessionId = reader.readString();
            this.serverTime = reader.readUnsignedInt();
            this.position = reader.readUnsignedInt();
        }
    };
    return Message_SMSG_LOGIN_USER;
}(MessageBase));
__reflect(Message_SMSG_LOGIN_USER.prototype, "Message_SMSG_LOGIN_USER");
//踢出服务器
var Message_SMSG_LOGOUT = (function (_super) {
    __extends(Message_SMSG_LOGOUT, _super);
    function Message_SMSG_LOGOUT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_LOGOUT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT16, "result");
    };
    return Message_SMSG_LOGOUT;
}(MessageBase));
__reflect(Message_SMSG_LOGOUT.prototype, "Message_SMSG_LOGOUT");
//# sourceMappingURL=ServerOpMessage.js.map