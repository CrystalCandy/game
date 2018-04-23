/*
作者:
    panyuxiong
    
创建时间：
    2014.07.15(星期二)

意图：
        处理活动的消息

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
//邮件列表
var Message_G2C_EMAIL_RECV = (function (_super) {
    __extends(Message_G2C_EMAIL_RECV, _super);
    function Message_G2C_EMAIL_RECV() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EMAIL_RECV.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mail_list = [];
        this.fireEvent = true;
    };
    Message_G2C_EMAIL_RECV.prototype.pack = function (writer) {
    };
    Message_G2C_EMAIL_RECV.prototype.unpack = function (reader) {
        this.mail_list = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var mail = {};
            mail.id = reader.readUInt(); //邮件ID
            mail.title = reader.readUInt(); //邮件标题
            mail.name = reader.readString(); //邮件名称
            mail.send_time = reader.readUInt(); //邮件发送时间
            mail.valid_time = reader.readUInt(); //邮件的有效时间
            mail.context = reader.readString(); //邮件的内容
            mail.mail_type = reader.readUInt(); //邮件类型
            mail.status = reader.readUInt(); //邮件状态
            mail.item = table_load(reader.readString()); //奖励物品
            mail.momey = table_load(reader.readString()); //奖励金钱
            mail.pet = table_load(reader.readString()); //奖励宠物
            //this.mail_list[i] = mail
            this.mail_list.push(mail);
        }
    };
    return Message_G2C_EMAIL_RECV;
}(MessageBase));
__reflect(Message_G2C_EMAIL_RECV.prototype, "Message_G2C_EMAIL_RECV");
var Message_C2G_EMAIL_READ = (function (_super) {
    __extends(Message_C2G_EMAIL_READ, _super);
    function Message_C2G_EMAIL_READ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EMAIL_READ.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_C2G_EMAIL_READ.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_EMAIL_READ.prototype.unpack = function (reader) {
    };
    return Message_C2G_EMAIL_READ;
}(MessageBase));
__reflect(Message_C2G_EMAIL_READ.prototype, "Message_C2G_EMAIL_READ");
var Message_G2C_EMAIL_READ = (function (_super) {
    __extends(Message_G2C_EMAIL_READ, _super);
    function Message_G2C_EMAIL_READ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EMAIL_READ.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
        this.staust = 0;
    };
    Message_G2C_EMAIL_READ.prototype.pack = function (writer) {
    };
    Message_G2C_EMAIL_READ.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
        this.staust = reader.readUInt();
    };
    return Message_G2C_EMAIL_READ;
}(MessageBase));
__reflect(Message_G2C_EMAIL_READ.prototype, "Message_G2C_EMAIL_READ");
var Message_C2G_EMAIL_GET_ANNEX = (function (_super) {
    __extends(Message_C2G_EMAIL_GET_ANNEX, _super);
    function Message_C2G_EMAIL_GET_ANNEX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EMAIL_GET_ANNEX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_C2G_EMAIL_GET_ANNEX.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_EMAIL_GET_ANNEX.prototype.unpack = function (reader) {
    };
    return Message_C2G_EMAIL_GET_ANNEX;
}(MessageBase));
__reflect(Message_C2G_EMAIL_GET_ANNEX.prototype, "Message_C2G_EMAIL_GET_ANNEX");
var Message_C2G_EMAIL_REMOVE = (function (_super) {
    __extends(Message_C2G_EMAIL_REMOVE, _super);
    function Message_C2G_EMAIL_REMOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EMAIL_REMOVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mailId = 0;
    };
    Message_C2G_EMAIL_REMOVE.prototype.pack = function (writer) {
        writer.writeUInt(this.mailId);
    };
    Message_C2G_EMAIL_REMOVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_EMAIL_REMOVE;
}(MessageBase));
__reflect(Message_C2G_EMAIL_REMOVE.prototype, "Message_C2G_EMAIL_REMOVE");
var Message_G2C_EMAIL_REMOVE = (function (_super) {
    __extends(Message_G2C_EMAIL_REMOVE, _super);
    function Message_G2C_EMAIL_REMOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EMAIL_REMOVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mailId = null;
    };
    Message_G2C_EMAIL_REMOVE.prototype.pack = function (writer) {
    };
    Message_G2C_EMAIL_REMOVE.prototype.unpack = function (reader) {
        this.mailId = reader.readUInt();
    };
    return Message_G2C_EMAIL_REMOVE;
}(MessageBase));
__reflect(Message_G2C_EMAIL_REMOVE.prototype, "Message_G2C_EMAIL_REMOVE");
var Message_C2G_EMAIL_ALL = (function (_super) {
    __extends(Message_C2G_EMAIL_ALL, _super);
    function Message_C2G_EMAIL_ALL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EMAIL_ALL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_EMAIL_ALL.prototype.pack = function (writer) {
    };
    Message_C2G_EMAIL_ALL.prototype.unpack = function (reader) {
    };
    return Message_C2G_EMAIL_ALL;
}(MessageBase));
__reflect(Message_C2G_EMAIL_ALL.prototype, "Message_C2G_EMAIL_ALL");
//# sourceMappingURL=MailMessage.js.map