/*
作者:
    panjunhua
    
创建时间：
   2014.9.5(周五)

意图：
    class Message_C2G_ROLE_NEWBIE_SETTING_RECORD extends MessageBase{  //指引记录

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
//指引记录
//////-发包
var Message_C2G_ROLE_NEWBIE_SETTING_RECORD = (function (_super) {
    __extends(Message_C2G_ROLE_NEWBIE_SETTING_RECORD, _super);
    function Message_C2G_ROLE_NEWBIE_SETTING_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_NEWBIE_SETTING_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.errantry = 0;
    };
    Message_C2G_ROLE_NEWBIE_SETTING_RECORD.prototype.pack = function (writer) {
        writer.writeString(this.errantry);
    };
    Message_C2G_ROLE_NEWBIE_SETTING_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_NEWBIE_SETTING_RECORD;
}(MessageBase));
__reflect(Message_C2G_ROLE_NEWBIE_SETTING_RECORD.prototype, "Message_C2G_ROLE_NEWBIE_SETTING_RECORD");
var Message_G2C_ROLE_NEWBIE_SETTING_RECORD = (function (_super) {
    __extends(Message_G2C_ROLE_NEWBIE_SETTING_RECORD, _super);
    function Message_G2C_ROLE_NEWBIE_SETTING_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_NEWBIE_SETTING_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.errantry = 0;
    };
    Message_G2C_ROLE_NEWBIE_SETTING_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_NEWBIE_SETTING_RECORD.prototype.unpack = function (reader) {
        this.errantry = reader.readString();
    };
    return Message_G2C_ROLE_NEWBIE_SETTING_RECORD;
}(MessageBase));
__reflect(Message_G2C_ROLE_NEWBIE_SETTING_RECORD.prototype, "Message_G2C_ROLE_NEWBIE_SETTING_RECORD");
var Message_C2G_ROLE_NEWBIE_CHANGE = (function (_super) {
    __extends(Message_C2G_ROLE_NEWBIE_CHANGE, _super);
    function Message_C2G_ROLE_NEWBIE_CHANGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_NEWBIE_CHANGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.errantry = 0;
        this.changeType = 0;
    };
    Message_C2G_ROLE_NEWBIE_CHANGE.prototype.pack = function (writer) {
        writer.writeUInt(this.errantry);
        writer.writeChar(this.changeType);
    };
    Message_C2G_ROLE_NEWBIE_CHANGE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_NEWBIE_CHANGE;
}(MessageBase));
__reflect(Message_C2G_ROLE_NEWBIE_CHANGE.prototype, "Message_C2G_ROLE_NEWBIE_CHANGE");
var Message_C2G_ROLE_NEWBIE_SAVE_RECORD = (function (_super) {
    __extends(Message_C2G_ROLE_NEWBIE_SAVE_RECORD, _super);
    function Message_C2G_ROLE_NEWBIE_SAVE_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_NEWBIE_SAVE_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.record = null;
    };
    Message_C2G_ROLE_NEWBIE_SAVE_RECORD.prototype.pack = function (writer) {
        var sendData = table_save(this.record);
        writer.writeString(sendData);
    };
    Message_C2G_ROLE_NEWBIE_SAVE_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_NEWBIE_SAVE_RECORD;
}(MessageBase));
__reflect(Message_C2G_ROLE_NEWBIE_SAVE_RECORD.prototype, "Message_C2G_ROLE_NEWBIE_SAVE_RECORD");
var Message_C2G_SET_SEX = (function (_super) {
    __extends(Message_C2G_SET_SEX, _super);
    function Message_C2G_SET_SEX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SET_SEX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.sexId = 0;
    };
    Message_C2G_SET_SEX.prototype.pack = function (writer) {
        writer.writeUInt(this.sexId);
    };
    Message_C2G_SET_SEX.prototype.unpack = function (reader) {
    };
    return Message_C2G_SET_SEX;
}(MessageBase));
__reflect(Message_C2G_SET_SEX.prototype, "Message_C2G_SET_SEX");
//# sourceMappingURL=GuideMessage.js.map