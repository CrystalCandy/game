// TypeScript file
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
//-----------------------------------------------------------------------------
//申请建立链接
var Message_C2L_CONNECT = (function (_super) {
    __extends(Message_C2L_CONNECT, _super);
    function Message_C2L_CONNECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_CONNECT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.STRING, "name");
    };
    return Message_C2L_CONNECT;
}(MessageBase));
__reflect(Message_C2L_CONNECT.prototype, "Message_C2L_CONNECT");
//申请建立链接
var Message_L2C_CONNECT = (function (_super) {
    __extends(Message_L2C_CONNECT, _super);
    function Message_L2C_CONNECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_CONNECT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT16, "result");
    };
    return Message_L2C_CONNECT;
}(MessageBase));
__reflect(Message_L2C_CONNECT.prototype, "Message_L2C_CONNECT");
//-----------------------------------------------------------------------------
//申请查询服务器状态
var Message_C2L_STATE = (function (_super) {
    __extends(Message_C2L_STATE, _super);
    function Message_C2L_STATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_STATE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return Message_C2L_STATE;
}(MessageBase));
__reflect(Message_C2L_STATE.prototype, "Message_C2L_STATE");
//服务器状态返回
var Message_L2C_STATE = (function (_super) {
    __extends(Message_L2C_STATE, _super);
    function Message_L2C_STATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_STATE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT8, "state");
    };
    return Message_L2C_STATE;
}(MessageBase));
__reflect(Message_L2C_STATE.prototype, "Message_L2C_STATE");
//-----------------------------------------------------------------------------
//申请获取服务器版本
var Message_C2L_VERSION = (function (_super) {
    __extends(Message_C2L_VERSION, _super);
    function Message_C2L_VERSION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_VERSION.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return Message_C2L_VERSION;
}(MessageBase));
__reflect(Message_C2L_VERSION.prototype, "Message_C2L_VERSION");
//服务器版本返回
var Message_L2C_VERSION = (function (_super) {
    __extends(Message_L2C_VERSION, _super);
    function Message_L2C_VERSION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_VERSION.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.STRING, "version");
    };
    return Message_L2C_VERSION;
}(MessageBase));
__reflect(Message_L2C_VERSION.prototype, "Message_L2C_VERSION");
//-----------------------------------------------------------------------------
//申请获得认证码
var Message_C2L_VERVIFY_CODE = (function (_super) {
    __extends(Message_C2L_VERVIFY_CODE, _super);
    function Message_C2L_VERVIFY_CODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_VERVIFY_CODE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return Message_C2L_VERVIFY_CODE;
}(MessageBase));
__reflect(Message_C2L_VERVIFY_CODE.prototype, "Message_C2L_VERVIFY_CODE");
//获取验证码
var Message_L2C_VERVIRY_CODE = (function (_super) {
    __extends(Message_L2C_VERVIRY_CODE, _super);
    function Message_L2C_VERVIRY_CODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_VERVIRY_CODE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return Message_L2C_VERVIRY_CODE;
}(MessageBase));
__reflect(Message_L2C_VERVIRY_CODE.prototype, "Message_L2C_VERVIRY_CODE");
//-----------------------------------------------------------------------------
var Message_C2L_ROLE_SELECT = (function (_super) {
    __extends(Message_C2L_ROLE_SELECT, _super);
    function Message_C2L_ROLE_SELECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_ROLE_SELECT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.UINT32, "playerId");
    };
    return Message_C2L_ROLE_SELECT;
}(MessageBase));
__reflect(Message_C2L_ROLE_SELECT.prototype, "Message_C2L_ROLE_SELECT");
var Message_L2C_ROLE_SELECT = (function (_super) {
    __extends(Message_L2C_ROLE_SELECT, _super);
    function Message_L2C_ROLE_SELECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_ROLE_SELECT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Message_L2C_ROLE_SELECT.prototype.unpack = function (reader) {
        this.result = reader.readUnsignedShort();
        if (this.result == 0) {
            this.ip = reader.readString();
            this.port = reader.readUnsignedShort();
            this.sessionId = reader.readString();
        }
    };
    return Message_L2C_ROLE_SELECT;
}(MessageBase));
__reflect(Message_L2C_ROLE_SELECT.prototype, "Message_L2C_ROLE_SELECT");
//-----------------------------------------------------------------------------
var Message_C2L_ROLE_LIST = (function (_super) {
    __extends(Message_C2L_ROLE_LIST, _super);
    function Message_C2L_ROLE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2L_ROLE_LIST.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return Message_C2L_ROLE_LIST;
}(MessageBase));
__reflect(Message_C2L_ROLE_LIST.prototype, "Message_C2L_ROLE_LIST");
var Message_L2C_ROLE_LIST = (function (_super) {
    __extends(Message_L2C_ROLE_LIST, _super);
    function Message_L2C_ROLE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_ROLE_LIST.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Message_L2C_ROLE_LIST.prototype.unpack = function (reader) {
        this.RoleList = [];
        var role_num = reader.readUnsignedShort();
        for (var i = 0; i < role_num; i++) {
            var roleInfo = LoginRole.createObj();
            roleInfo.read(reader);
            this.RoleList.push(roleInfo);
        }
    };
    return Message_L2C_ROLE_LIST;
}(MessageBase));
__reflect(Message_L2C_ROLE_LIST.prototype, "Message_L2C_ROLE_LIST");
//-----------------------------------------------------------------------------
var Message_C2L_ROLE_CREATE = (function (_super) {
    __extends(Message_C2L_ROLE_CREATE, _super);
    function Message_C2L_ROLE_CREATE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "";
        _this.role = 10001;
        _this.sex = 0;
        return _this;
    }
    Message_C2L_ROLE_CREATE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.STRING, "name");
        this.addWriteProtocol(MessageProtocol.UINT16, "role");
        this.addWriteProtocol(MessageProtocol.UINT8, "sex");
    };
    return Message_C2L_ROLE_CREATE;
}(MessageBase));
__reflect(Message_C2L_ROLE_CREATE.prototype, "Message_C2L_ROLE_CREATE");
//-----------------------------------------------------------------------------
var Message_L2C_ROLE_CREATE = (function (_super) {
    __extends(Message_L2C_ROLE_CREATE, _super);
    function Message_L2C_ROLE_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_ROLE_CREATE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Message_L2C_ROLE_CREATE.prototype.unpack = function (reader) {
        this.result = reader.readUnsignedShort();
        if (this.result == 0) {
            this.roleInfo = LoginRole.createObj();
            this.roleInfo.read(reader);
        }
    };
    return Message_L2C_ROLE_CREATE;
}(MessageBase));
__reflect(Message_L2C_ROLE_CREATE.prototype, "Message_L2C_ROLE_CREATE");
//-----------------------------------------------------------------------------
var Message_L2C_QUEUE_UPDATE = (function (_super) {
    __extends(Message_L2C_QUEUE_UPDATE, _super);
    function Message_L2C_QUEUE_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_L2C_QUEUE_UPDATE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT32, "position");
    };
    return Message_L2C_QUEUE_UPDATE;
}(MessageBase));
__reflect(Message_L2C_QUEUE_UPDATE.prototype, "Message_L2C_QUEUE_UPDATE");
//# sourceMappingURL=LoginOpMessage.js.map