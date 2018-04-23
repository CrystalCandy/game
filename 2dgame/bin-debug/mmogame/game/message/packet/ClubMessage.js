/*
作者:
    徐贤
    
创建时间：
   2011.03.6(周三)

意图：
   帮派消息 、军团战消息

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
// 创建帮派协议
var Message_C2G_FACTION_CREATE = (function (_super) {
    __extends(Message_C2G_FACTION_CREATE, _super);
    function Message_C2G_FACTION_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubName = null;
        this.clubTarget = null;
        this.useUnit = null;
        this.icon = null;
    };
    Message_C2G_FACTION_CREATE.prototype.pack = function (writer) {
        writer.writeString(this.clubName);
        writer.writeString(this.clubTarget);
        writer.writeUInt(this.icon);
    };
    Message_C2G_FACTION_CREATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_CREATE;
}(MessageBase));
__reflect(Message_C2G_FACTION_CREATE.prototype, "Message_C2G_FACTION_CREATE");
var Message_G2C_FACTION_SELF_UPDATE = (function (_super) {
    __extends(Message_G2C_FACTION_SELF_UPDATE, _super);
    function Message_G2C_FACTION_SELF_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_SELF_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubId = null;
        this.clubName = null;
        this.clubPost = null;
    };
    Message_G2C_FACTION_SELF_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_SELF_UPDATE.prototype.unpack = function (reader) {
        this.clubId = reader.readUInt();
        if (this.clubId != 0) {
            this.clubName = reader.readString();
            this.clubPost = reader.readChar();
        }
    };
    return Message_G2C_FACTION_SELF_UPDATE;
}(MessageBase));
__reflect(Message_G2C_FACTION_SELF_UPDATE.prototype, "Message_G2C_FACTION_SELF_UPDATE");
var Message_G2C_FACTION_INFO_REFRESH = (function (_super) {
    __extends(Message_G2C_FACTION_INFO_REFRESH, _super);
    function Message_G2C_FACTION_INFO_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_INFO_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubInfo = null;
    };
    Message_G2C_FACTION_INFO_REFRESH.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_INFO_REFRESH.prototype.unpack = function (reader) {
        this.clubInfo = ClubInfo.newObj();
        this.clubInfo.read(reader);
    };
    return Message_G2C_FACTION_INFO_REFRESH;
}(MessageBase));
__reflect(Message_G2C_FACTION_INFO_REFRESH.prototype, "Message_G2C_FACTION_INFO_REFRESH");
var Message_C2G_FACTION_INFO_REFRESH = (function (_super) {
    __extends(Message_C2G_FACTION_INFO_REFRESH, _super);
    function Message_C2G_FACTION_INFO_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_INFO_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_INFO_REFRESH.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_INFO_REFRESH.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_INFO_REFRESH;
}(MessageBase));
__reflect(Message_C2G_FACTION_INFO_REFRESH.prototype, "Message_C2G_FACTION_INFO_REFRESH");
var Message_C2G_FACTION_ATTENDANCE = (function (_super) {
    __extends(Message_C2G_FACTION_ATTENDANCE, _super);
    function Message_C2G_FACTION_ATTENDANCE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_ATTENDANCE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_ATTENDANCE.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_ATTENDANCE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_ATTENDANCE;
}(MessageBase));
__reflect(Message_C2G_FACTION_ATTENDANCE.prototype, "Message_C2G_FACTION_ATTENDANCE");
var Message_C2G_FACTION_INFO = (function (_super) {
    __extends(Message_C2G_FACTION_INFO, _super);
    function Message_C2G_FACTION_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_C2G_FACTION_INFO.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_FACTION_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_INFO;
}(MessageBase));
__reflect(Message_C2G_FACTION_INFO.prototype, "Message_C2G_FACTION_INFO");
var Message_G2C_FACTION_INFO = (function (_super) {
    __extends(Message_G2C_FACTION_INFO, _super);
    function Message_G2C_FACTION_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubInfoList = [];
    };
    Message_G2C_FACTION_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_INFO.prototype.unpack = function (reader) {
        this.clubInfoList = [];
        var count = reader.readUShort();
        for (var i = 1; i <= count; i++) {
            var info = ClubInfo.newObj();
            info.read(reader);
            JsUtil.arrayInstert(this.clubInfoList, info);
        }
    };
    return Message_G2C_FACTION_INFO;
}(MessageBase));
__reflect(Message_G2C_FACTION_INFO.prototype, "Message_G2C_FACTION_INFO");
var Message_C2G_FACTION_SINGLE_INFO = (function (_super) {
    __extends(Message_C2G_FACTION_SINGLE_INFO, _super);
    function Message_C2G_FACTION_SINGLE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_SINGLE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubId = null;
    };
    Message_C2G_FACTION_SINGLE_INFO.prototype.pack = function (writer) {
        writer.writeUInt(this.clubId);
    };
    Message_C2G_FACTION_SINGLE_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_SINGLE_INFO;
}(MessageBase));
__reflect(Message_C2G_FACTION_SINGLE_INFO.prototype, "Message_C2G_FACTION_SINGLE_INFO");
var Message_C2G_FACTION_APPAY = (function (_super) {
    __extends(Message_C2G_FACTION_APPAY, _super);
    function Message_C2G_FACTION_APPAY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_APPAY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubId = null;
        this.applyReason = null;
    };
    Message_C2G_FACTION_APPAY.prototype.pack = function (writer) {
        writer.writeUInt(this.clubId);
        writer.writeString(this.applyReason);
    };
    Message_C2G_FACTION_APPAY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_APPAY;
}(MessageBase));
__reflect(Message_C2G_FACTION_APPAY.prototype, "Message_C2G_FACTION_APPAY");
var Message_C2G_FACTION_CANCLE_APPLY = (function (_super) {
    __extends(Message_C2G_FACTION_CANCLE_APPLY, _super);
    function Message_C2G_FACTION_CANCLE_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_CANCLE_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubId = null;
    };
    Message_C2G_FACTION_CANCLE_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.clubId);
    };
    Message_C2G_FACTION_CANCLE_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_CANCLE_APPLY;
}(MessageBase));
__reflect(Message_C2G_FACTION_CANCLE_APPLY.prototype, "Message_C2G_FACTION_CANCLE_APPLY");
var Message_C2G_FACTION_APPLY_REFRESH = (function (_super) {
    __extends(Message_C2G_FACTION_APPLY_REFRESH, _super);
    function Message_C2G_FACTION_APPLY_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_APPLY_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_APPLY_REFRESH.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_APPLY_REFRESH.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_APPLY_REFRESH;
}(MessageBase));
__reflect(Message_C2G_FACTION_APPLY_REFRESH.prototype, "Message_C2G_FACTION_APPLY_REFRESH");
var Message_G2C_FACTION_APPLY_REFRESH = (function (_super) {
    __extends(Message_G2C_FACTION_APPLY_REFRESH, _super);
    function Message_G2C_FACTION_APPLY_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_APPLY_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.applyList = [];
        this.count = null;
        this.fireEvent = true;
    };
    Message_G2C_FACTION_APPLY_REFRESH.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_APPLY_REFRESH.prototype.unpack = function (reader) {
        this.applyList = [];
        var count = reader.readUShort();
        this.count = count;
        for (var i = 1; i <= count; i++) {
            var info = ApplyRoleInfo.newObj();
            info.read(reader);
            JsUtil.arrayInstert(this.applyList, info);
        }
    };
    return Message_G2C_FACTION_APPLY_REFRESH;
}(MessageBase));
__reflect(Message_G2C_FACTION_APPLY_REFRESH.prototype, "Message_G2C_FACTION_APPLY_REFRESH");
var Message_C2G_FACTION_NOTICE = (function (_super) {
    __extends(Message_C2G_FACTION_NOTICE, _super);
    function Message_C2G_FACTION_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.notice = null;
    };
    Message_C2G_FACTION_NOTICE.prototype.pack = function (writer) {
        writer.writeString(this.notice);
    };
    Message_C2G_FACTION_NOTICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_NOTICE;
}(MessageBase));
__reflect(Message_C2G_FACTION_NOTICE.prototype, "Message_C2G_FACTION_NOTICE");
var Message_G2C_FACTION_NOTICE = (function (_super) {
    __extends(Message_G2C_FACTION_NOTICE, _super);
    function Message_G2C_FACTION_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.notice = null;
    };
    Message_G2C_FACTION_NOTICE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_NOTICE.prototype.unpack = function (reader) {
        this.notice = reader.readString();
    };
    return Message_G2C_FACTION_NOTICE;
}(MessageBase));
__reflect(Message_G2C_FACTION_NOTICE.prototype, "Message_G2C_FACTION_NOTICE");
var Message_C2G_FACTION_CHECK = (function (_super) {
    __extends(Message_C2G_FACTION_CHECK, _super);
    function Message_C2G_FACTION_CHECK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_CHECK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.applyId = null;
        this.isYes = null;
    };
    Message_C2G_FACTION_CHECK.prototype.pack = function (writer) {
        writer.writeUInt(this.applyId);
        writer.writeChar(this.isYes);
    };
    Message_C2G_FACTION_CHECK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_CHECK;
}(MessageBase));
__reflect(Message_C2G_FACTION_CHECK.prototype, "Message_C2G_FACTION_CHECK");
var Message_C2G_FACTION_MEMBER_REFRESH = (function (_super) {
    __extends(Message_C2G_FACTION_MEMBER_REFRESH, _super);
    function Message_C2G_FACTION_MEMBER_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_MEMBER_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_MEMBER_REFRESH.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_MEMBER_REFRESH.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_MEMBER_REFRESH;
}(MessageBase));
__reflect(Message_C2G_FACTION_MEMBER_REFRESH.prototype, "Message_C2G_FACTION_MEMBER_REFRESH");
var Message_G2C_FACTION_MEMBER_REFRESH = (function (_super) {
    __extends(Message_G2C_FACTION_MEMBER_REFRESH, _super);
    function Message_G2C_FACTION_MEMBER_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_MEMBER_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.menberList = null;
    };
    Message_G2C_FACTION_MEMBER_REFRESH.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_MEMBER_REFRESH.prototype.unpack = function (reader) {
        this.menberList = [];
        var count = reader.readUShort();
        for (var i = 1; i <= count; i++) {
            var menberInfo = ClubRoleInfo.newObj();
            menberInfo.read(reader);
            //menberInfo.donateCount = reader.readUInt() //当前捐赠次数
            //menberInfo.historyCount = reader.readUInt()  //历史捐赠次数
            JsUtil.arrayInstert(this.menberList, menberInfo);
        }
    };
    return Message_G2C_FACTION_MEMBER_REFRESH;
}(MessageBase));
__reflect(Message_G2C_FACTION_MEMBER_REFRESH.prototype, "Message_G2C_FACTION_MEMBER_REFRESH");
var Message_C2G_FACTION_INTRODUCTION = (function (_super) {
    __extends(Message_C2G_FACTION_INTRODUCTION, _super);
    function Message_C2G_FACTION_INTRODUCTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_INTRODUCTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.strTarget = null;
    };
    Message_C2G_FACTION_INTRODUCTION.prototype.pack = function (writer) {
        writer.writeString(this.strTarget);
    };
    Message_C2G_FACTION_INTRODUCTION.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_INTRODUCTION;
}(MessageBase));
__reflect(Message_C2G_FACTION_INTRODUCTION.prototype, "Message_C2G_FACTION_INTRODUCTION");
var Message_G2C_FACTION_INTRODUCTION = (function (_super) {
    __extends(Message_G2C_FACTION_INTRODUCTION, _super);
    function Message_G2C_FACTION_INTRODUCTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_INTRODUCTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.strTarget = null;
        this.legionID = null;
    };
    Message_G2C_FACTION_INTRODUCTION.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_INTRODUCTION.prototype.unpack = function (reader) {
        this.legionID = reader.readUInt();
        this.strTarget = reader.readString();
    };
    return Message_G2C_FACTION_INTRODUCTION;
}(MessageBase));
__reflect(Message_G2C_FACTION_INTRODUCTION.prototype, "Message_G2C_FACTION_INTRODUCTION");
var Message_C2G_FACTION_LEAVE = (function (_super) {
    __extends(Message_C2G_FACTION_LEAVE, _super);
    function Message_C2G_FACTION_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_LEAVE;
}(MessageBase));
__reflect(Message_C2G_FACTION_LEAVE.prototype, "Message_C2G_FACTION_LEAVE");
var Message_C2G_FACTION_POST = (function (_super) {
    __extends(Message_C2G_FACTION_POST, _super);
    function Message_C2G_FACTION_POST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_POST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = null;
        this.postId = null;
    };
    Message_C2G_FACTION_POST.prototype.pack = function (writer) {
        writer.writeUInt(this.roleId);
        writer.writeChar(this.postId);
    };
    Message_C2G_FACTION_POST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_POST;
}(MessageBase));
__reflect(Message_C2G_FACTION_POST.prototype, "Message_C2G_FACTION_POST");
var Message_C2G_FACTION_FIRE = (function (_super) {
    __extends(Message_C2G_FACTION_FIRE, _super);
    function Message_C2G_FACTION_FIRE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_FIRE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = null;
    };
    Message_C2G_FACTION_FIRE.prototype.pack = function (writer) {
        writer.writeUInt(this.roleId);
    };
    Message_C2G_FACTION_FIRE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_FIRE;
}(MessageBase));
__reflect(Message_C2G_FACTION_FIRE.prototype, "Message_C2G_FACTION_FIRE");
var Message_G2C_FACTION_FIRE = (function (_super) {
    __extends(Message_G2C_FACTION_FIRE, _super);
    function Message_G2C_FACTION_FIRE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_FIRE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = null;
    };
    Message_G2C_FACTION_FIRE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_FIRE.prototype.unpack = function (reader) {
    };
    return Message_G2C_FACTION_FIRE;
}(MessageBase));
__reflect(Message_G2C_FACTION_FIRE.prototype, "Message_G2C_FACTION_FIRE");
var Message_C2G_FACTION_INVITE = (function (_super) {
    __extends(Message_C2G_FACTION_INVITE, _super);
    function Message_C2G_FACTION_INVITE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_INVITE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.name = null;
    };
    Message_C2G_FACTION_INVITE.prototype.pack = function (writer) {
        writer.writeString(this.name);
    };
    Message_C2G_FACTION_INVITE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_INVITE;
}(MessageBase));
__reflect(Message_C2G_FACTION_INVITE.prototype, "Message_C2G_FACTION_INVITE");
var Message_G2C_FACTION_SINGLE_MEMBER_REFRESH = (function (_super) {
    __extends(Message_G2C_FACTION_SINGLE_MEMBER_REFRESH, _super);
    function Message_G2C_FACTION_SINGLE_MEMBER_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_SINGLE_MEMBER_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubRoleInfo = null;
    };
    Message_G2C_FACTION_SINGLE_MEMBER_REFRESH.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_SINGLE_MEMBER_REFRESH.prototype.unpack = function (reader) {
        this.clubRoleInfo = ClubRoleInfo.newObj();
        this.clubRoleInfo.read(reader);
    };
    return Message_G2C_FACTION_SINGLE_MEMBER_REFRESH;
}(MessageBase));
__reflect(Message_G2C_FACTION_SINGLE_MEMBER_REFRESH.prototype, "Message_G2C_FACTION_SINGLE_MEMBER_REFRESH");
var Message_C2G_FACTION_CLEAR_APPLY = (function (_super) {
    __extends(Message_C2G_FACTION_CLEAR_APPLY, _super);
    function Message_C2G_FACTION_CLEAR_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_CLEAR_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubRoleInfo = null;
    };
    Message_C2G_FACTION_CLEAR_APPLY.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_CLEAR_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_CLEAR_APPLY;
}(MessageBase));
__reflect(Message_C2G_FACTION_CLEAR_APPLY.prototype, "Message_C2G_FACTION_CLEAR_APPLY");
var Message_C2G_FACTION_ENTER_OTHER_MAP = (function (_super) {
    __extends(Message_C2G_FACTION_ENTER_OTHER_MAP, _super);
    function Message_C2G_FACTION_ENTER_OTHER_MAP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_ENTER_OTHER_MAP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubId = null;
    };
    Message_C2G_FACTION_ENTER_OTHER_MAP.prototype.pack = function (writer) {
        writer.writeUInt(this.clubId);
    };
    Message_C2G_FACTION_ENTER_OTHER_MAP.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_ENTER_OTHER_MAP;
}(MessageBase));
__reflect(Message_C2G_FACTION_ENTER_OTHER_MAP.prototype, "Message_C2G_FACTION_ENTER_OTHER_MAP");
var Message_G2C_ROLE_APPLY_FACTION_LIST = (function (_super) {
    __extends(Message_G2C_ROLE_APPLY_FACTION_LIST, _super);
    function Message_G2C_ROLE_APPLY_FACTION_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_APPLY_FACTION_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.apply_list = {};
    };
    Message_G2C_ROLE_APPLY_FACTION_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_APPLY_FACTION_LIST.prototype.unpack = function (reader) {
        this.apply_list = table_load(reader.readString());
    };
    return Message_G2C_ROLE_APPLY_FACTION_LIST;
}(MessageBase));
__reflect(Message_G2C_ROLE_APPLY_FACTION_LIST.prototype, "Message_G2C_ROLE_APPLY_FACTION_LIST");
var Message_C2G_FACTION_ITEM_CHOOSE = (function (_super) {
    __extends(Message_C2G_FACTION_ITEM_CHOOSE, _super);
    function Message_C2G_FACTION_ITEM_CHOOSE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_ITEM_CHOOSE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.menberId = 0;
        this.itemId = 0;
        this.count = 0;
    };
    Message_C2G_FACTION_ITEM_CHOOSE.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
        writer.writeUInt(this.menberId);
        writer.writeUInt(this.count);
    };
    Message_C2G_FACTION_ITEM_CHOOSE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_ITEM_CHOOSE;
}(MessageBase));
__reflect(Message_C2G_FACTION_ITEM_CHOOSE.prototype, "Message_C2G_FACTION_ITEM_CHOOSE");
var Message_G2C_FACTION_ITEM_CHOOSE = (function (_super) {
    __extends(Message_G2C_FACTION_ITEM_CHOOSE, _super);
    function Message_G2C_FACTION_ITEM_CHOOSE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_ITEM_CHOOSE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.Times = 0;
        this.itemId = 0;
    };
    Message_G2C_FACTION_ITEM_CHOOSE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_ITEM_CHOOSE.prototype.unpack = function (reader) {
        this.Times = reader.readUInt();
        this.itemId = reader.readUInt();
    };
    return Message_G2C_FACTION_ITEM_CHOOSE;
}(MessageBase));
__reflect(Message_G2C_FACTION_ITEM_CHOOSE.prototype, "Message_G2C_FACTION_ITEM_CHOOSE");
var Message_C2G_FACTION_WAREHOUSE_APPLY = (function (_super) {
    __extends(Message_C2G_FACTION_WAREHOUSE_APPLY, _super);
    function Message_C2G_FACTION_WAREHOUSE_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_WAREHOUSE_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_C2G_FACTION_WAREHOUSE_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_FACTION_WAREHOUSE_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_WAREHOUSE_APPLY;
}(MessageBase));
__reflect(Message_C2G_FACTION_WAREHOUSE_APPLY.prototype, "Message_C2G_FACTION_WAREHOUSE_APPLY");
var Message_G2C_FACTION_WAREHOUSE_APPLY = (function (_super) {
    __extends(Message_G2C_FACTION_WAREHOUSE_APPLY, _super);
    function Message_G2C_FACTION_WAREHOUSE_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_WAREHOUSE_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_G2C_FACTION_WAREHOUSE_APPLY.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_WAREHOUSE_APPLY.prototype.unpack = function (reader) {
        this.itemId = reader.readUInt();
    };
    return Message_G2C_FACTION_WAREHOUSE_APPLY;
}(MessageBase));
__reflect(Message_G2C_FACTION_WAREHOUSE_APPLY.prototype, "Message_G2C_FACTION_WAREHOUSE_APPLY");
var Message_C2G_FACTION_WAREHOUSE_CANCEL = (function (_super) {
    __extends(Message_C2G_FACTION_WAREHOUSE_CANCEL, _super);
    function Message_C2G_FACTION_WAREHOUSE_CANCEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_WAREHOUSE_CANCEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_C2G_FACTION_WAREHOUSE_CANCEL.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_FACTION_WAREHOUSE_CANCEL.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_WAREHOUSE_CANCEL;
}(MessageBase));
__reflect(Message_C2G_FACTION_WAREHOUSE_CANCEL.prototype, "Message_C2G_FACTION_WAREHOUSE_CANCEL");
var Message_G2C_FACTION_WAREHOUSE_CANCEL = (function (_super) {
    __extends(Message_G2C_FACTION_WAREHOUSE_CANCEL, _super);
    function Message_G2C_FACTION_WAREHOUSE_CANCEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_WAREHOUSE_CANCEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_G2C_FACTION_WAREHOUSE_CANCEL.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_WAREHOUSE_CANCEL.prototype.unpack = function (reader) {
        this.itemId = reader.readUInt();
    };
    return Message_G2C_FACTION_WAREHOUSE_CANCEL;
}(MessageBase));
__reflect(Message_G2C_FACTION_WAREHOUSE_CANCEL.prototype, "Message_G2C_FACTION_WAREHOUSE_CANCEL");
var Message_C2G_FACTION_ALLOCA_RECORD = (function (_super) {
    __extends(Message_C2G_FACTION_ALLOCA_RECORD, _super);
    function Message_C2G_FACTION_ALLOCA_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_ALLOCA_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_ALLOCA_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_ALLOCA_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_ALLOCA_RECORD;
}(MessageBase));
__reflect(Message_C2G_FACTION_ALLOCA_RECORD.prototype, "Message_C2G_FACTION_ALLOCA_RECORD");
var Message_G2C_FACTION_ALLOCA_RECORD = (function (_super) {
    __extends(Message_G2C_FACTION_ALLOCA_RECORD, _super);
    function Message_G2C_FACTION_ALLOCA_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_ALLOCA_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.allotRecordList = [];
    };
    Message_G2C_FACTION_ALLOCA_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_ALLOCA_RECORD.prototype.unpack = function (reader) {
        this.allotRecordList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var recordInfo = {};
            recordInfo = table_load(reader.readString());
            JsUtil.arrayInstert(this.allotRecordList, recordInfo);
        }
    };
    return Message_G2C_FACTION_ALLOCA_RECORD;
}(MessageBase));
__reflect(Message_G2C_FACTION_ALLOCA_RECORD.prototype, "Message_G2C_FACTION_ALLOCA_RECORD");
var Message_C2G_FACTION_WAREHOUSE_LIST = (function (_super) {
    __extends(Message_C2G_FACTION_WAREHOUSE_LIST, _super);
    function Message_C2G_FACTION_WAREHOUSE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_WAREHOUSE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_WAREHOUSE_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_WAREHOUSE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_WAREHOUSE_LIST;
}(MessageBase));
__reflect(Message_C2G_FACTION_WAREHOUSE_LIST.prototype, "Message_C2G_FACTION_WAREHOUSE_LIST");
// class Message_G2C_FACTION_WAREHOUSE_LIST extends MessageBase {
//     list: Item[];
//     public initObj(...args: any[]): void {
//         this.list = []
//     }
//     pack(writer) {
//     }
//     unpack(reader) {
//         let num = reader.readUInt()
//         this.list = []
//         for (let i = 1; i <= num; i++) {
//             let info = ItemInfo.newObj()
//             info.read(reader)
//             let item = Item.newObj(info)
//             table_insert(this.list, item)
//         }
//     }
// }
//申请军团购买记录列表
var Message_C2G_FACTION_BUY_RECORD = (function (_super) {
    __extends(Message_C2G_FACTION_BUY_RECORD, _super);
    function Message_C2G_FACTION_BUY_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_BUY_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_BUY_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_BUY_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_BUY_RECORD;
}(MessageBase));
__reflect(Message_C2G_FACTION_BUY_RECORD.prototype, "Message_C2G_FACTION_BUY_RECORD");
var Message_G2C_FACTION_BUY_RECORD = (function (_super) {
    __extends(Message_G2C_FACTION_BUY_RECORD, _super);
    function Message_G2C_FACTION_BUY_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_BUY_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buyRecordList = [];
    };
    Message_G2C_FACTION_BUY_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_BUY_RECORD.prototype.unpack = function (reader) {
        this.buyRecordList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var recordInfo = {};
            recordInfo = table_load(reader.readString());
            JsUtil.arrayInstert(this.buyRecordList, recordInfo);
        }
    };
    return Message_G2C_FACTION_BUY_RECORD;
}(MessageBase));
__reflect(Message_G2C_FACTION_BUY_RECORD.prototype, "Message_G2C_FACTION_BUY_RECORD");
var Message_C2G_FACTION_QUERY_INTRODUCT = (function (_super) {
    __extends(Message_C2G_FACTION_QUERY_INTRODUCT, _super);
    function Message_C2G_FACTION_QUERY_INTRODUCT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_QUERY_INTRODUCT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.legionID = null;
    };
    Message_C2G_FACTION_QUERY_INTRODUCT.prototype.pack = function (writer) {
        writer.writeUInt(this.legionID);
    };
    Message_C2G_FACTION_QUERY_INTRODUCT.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_QUERY_INTRODUCT;
}(MessageBase));
__reflect(Message_C2G_FACTION_QUERY_INTRODUCT.prototype, "Message_C2G_FACTION_QUERY_INTRODUCT");
var Message_G2C_APPLY_ADD_UNION = (function (_super) {
    __extends(Message_G2C_APPLY_ADD_UNION, _super);
    function Message_G2C_APPLY_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_APPLY_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.unionFactionID = null;
        this.unionFactionName = null;
        this.unionFactionMemberCount = null;
        this.unionFactionLevel = null;
    };
    Message_G2C_APPLY_ADD_UNION.prototype.pack = function (writer) {
    };
    Message_G2C_APPLY_ADD_UNION.prototype.unpack = function (reader) {
        this.unionFactionID = reader.readUInt();
        this.unionFactionName = reader.readString();
        this.unionFactionMemberCount = reader.readUInt();
        this.unionFactionLevel = reader.readUInt();
    };
    return Message_G2C_APPLY_ADD_UNION;
}(MessageBase));
__reflect(Message_G2C_APPLY_ADD_UNION.prototype, "Message_G2C_APPLY_ADD_UNION");
var Message_C2G_APPLY_ADD_UNION = (function (_super) {
    __extends(Message_C2G_APPLY_ADD_UNION, _super);
    function Message_C2G_APPLY_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_APPLY_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addLegionID = null;
    };
    Message_C2G_APPLY_ADD_UNION.prototype.pack = function (writer) {
        writer.writeUInt(this.addLegionID);
    };
    Message_C2G_APPLY_ADD_UNION.prototype.unpack = function (reader) {
    };
    return Message_C2G_APPLY_ADD_UNION;
}(MessageBase));
__reflect(Message_C2G_APPLY_ADD_UNION.prototype, "Message_C2G_APPLY_ADD_UNION");
var Message_C2G_AGREEN_ADD_UNION = (function (_super) {
    __extends(Message_C2G_AGREEN_ADD_UNION, _super);
    function Message_C2G_AGREEN_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_AGREEN_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.factionID = null;
    };
    Message_C2G_AGREEN_ADD_UNION.prototype.pack = function (writer) {
        writer.writeUInt(this.factionID);
    };
    Message_C2G_AGREEN_ADD_UNION.prototype.unpack = function (reader) {
    };
    return Message_C2G_AGREEN_ADD_UNION;
}(MessageBase));
__reflect(Message_C2G_AGREEN_ADD_UNION.prototype, "Message_C2G_AGREEN_ADD_UNION");
var Message_G2C_AGREEN_ADD_UNION = (function (_super) {
    __extends(Message_G2C_AGREEN_ADD_UNION, _super);
    function Message_G2C_AGREEN_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_AGREEN_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_AGREEN_ADD_UNION.prototype.pack = function (writer) {
    };
    Message_G2C_AGREEN_ADD_UNION.prototype.unpack = function (reader) {
    };
    return Message_G2C_AGREEN_ADD_UNION;
}(MessageBase));
__reflect(Message_G2C_AGREEN_ADD_UNION.prototype, "Message_G2C_AGREEN_ADD_UNION");
var Message_C2G_REFUSE_ADD_UNION = (function (_super) {
    __extends(Message_C2G_REFUSE_ADD_UNION, _super);
    function Message_C2G_REFUSE_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_REFUSE_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.factionID = null;
    };
    Message_C2G_REFUSE_ADD_UNION.prototype.pack = function (writer) {
        writer.writeUInt(this.factionID);
    };
    Message_C2G_REFUSE_ADD_UNION.prototype.unpack = function (reader) {
    };
    return Message_C2G_REFUSE_ADD_UNION;
}(MessageBase));
__reflect(Message_C2G_REFUSE_ADD_UNION.prototype, "Message_C2G_REFUSE_ADD_UNION");
var Message_G2C_REFUSE_ADD_UNION = (function (_super) {
    __extends(Message_G2C_REFUSE_ADD_UNION, _super);
    function Message_G2C_REFUSE_ADD_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_REFUSE_ADD_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_REFUSE_ADD_UNION.prototype.pack = function (writer) {
    };
    Message_G2C_REFUSE_ADD_UNION.prototype.unpack = function (reader) {
    };
    return Message_G2C_REFUSE_ADD_UNION;
}(MessageBase));
__reflect(Message_G2C_REFUSE_ADD_UNION.prototype, "Message_G2C_REFUSE_ADD_UNION");
var Message_C2G_LEAVE_UNION = (function (_super) {
    __extends(Message_C2G_LEAVE_UNION, _super);
    function Message_C2G_LEAVE_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_LEAVE_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_LEAVE_UNION.prototype.pack = function (writer) {
    };
    Message_C2G_LEAVE_UNION.prototype.unpack = function (reader) {
    };
    return Message_C2G_LEAVE_UNION;
}(MessageBase));
__reflect(Message_C2G_LEAVE_UNION.prototype, "Message_C2G_LEAVE_UNION");
var Message_G2C_LEAVE_UNION = (function (_super) {
    __extends(Message_G2C_LEAVE_UNION, _super);
    function Message_G2C_LEAVE_UNION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_LEAVE_UNION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_LEAVE_UNION.prototype.pack = function (writer) {
    };
    Message_G2C_LEAVE_UNION.prototype.unpack = function (reader) {
    };
    return Message_G2C_LEAVE_UNION;
}(MessageBase));
__reflect(Message_G2C_LEAVE_UNION.prototype, "Message_G2C_LEAVE_UNION");
var Message_C2G_UNION_INFO = (function (_super) {
    __extends(Message_C2G_UNION_INFO, _super);
    function Message_C2G_UNION_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNION_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNION_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNION_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNION_INFO;
}(MessageBase));
__reflect(Message_C2G_UNION_INFO.prototype, "Message_C2G_UNION_INFO");
var Message_G2C_UNION_INFO = (function (_super) {
    __extends(Message_G2C_UNION_INFO, _super);
    function Message_G2C_UNION_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNION_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.myUnionInfo = null;
    };
    Message_G2C_UNION_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNION_INFO.prototype.unpack = function (reader) {
        this.myUnionInfo = table_load(reader.readString());
    };
    return Message_G2C_UNION_INFO;
}(MessageBase));
__reflect(Message_G2C_UNION_INFO.prototype, "Message_G2C_UNION_INFO");
var Message_C2G_FACTION_BUILD_INFO = (function (_super) {
    __extends(Message_C2G_FACTION_BUILD_INFO, _super);
    function Message_C2G_FACTION_BUILD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_BUILD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_BUILD_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_BUILD_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_BUILD_INFO;
}(MessageBase));
__reflect(Message_C2G_FACTION_BUILD_INFO.prototype, "Message_C2G_FACTION_BUILD_INFO");
var Message_G2C_FACTION_BUILD_INFO = (function (_super) {
    __extends(Message_G2C_FACTION_BUILD_INFO, _super);
    function Message_G2C_FACTION_BUILD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_BUILD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = null;
    };
    Message_G2C_FACTION_BUILD_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_BUILD_INFO.prototype.unpack = function (reader) {
        this.list = {};
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var info = {};
            info.bType = reader.readUInt(); //建筑类型
            info.level = reader.readUInt(); //建筑等级
            info.schedule = reader.readUInt(); //建筑当前贡献度
            //JsUtil.arrayInstert(this.list,info)		
            this.list[info.bType] = info;
        }
    };
    return Message_G2C_FACTION_BUILD_INFO;
}(MessageBase));
__reflect(Message_G2C_FACTION_BUILD_INFO.prototype, "Message_G2C_FACTION_BUILD_INFO");
var Message_C2G_FACTION_BUILD_DONATE = (function (_super) {
    __extends(Message_C2G_FACTION_BUILD_DONATE, _super);
    function Message_C2G_FACTION_BUILD_DONATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_BUILD_DONATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buildType = 0;
        this.itemList = {};
    };
    Message_C2G_FACTION_BUILD_DONATE.prototype.pack = function (writer) {
        writer.writeUInt(this.buildType);
        writer.writeString(table_save(this.itemList));
    };
    Message_C2G_FACTION_BUILD_DONATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_BUILD_DONATE;
}(MessageBase));
__reflect(Message_C2G_FACTION_BUILD_DONATE.prototype, "Message_C2G_FACTION_BUILD_DONATE");
var Message_C2G_FACTION_BUILD_POINT = (function (_super) {
    __extends(Message_C2G_FACTION_BUILD_POINT, _super);
    function Message_C2G_FACTION_BUILD_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_BUILD_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_BUILD_POINT.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_BUILD_POINT.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_BUILD_POINT;
}(MessageBase));
__reflect(Message_C2G_FACTION_BUILD_POINT.prototype, "Message_C2G_FACTION_BUILD_POINT");
var Message_G2C_FACTION_BUILD_POINT = (function (_super) {
    __extends(Message_G2C_FACTION_BUILD_POINT, _super);
    function Message_G2C_FACTION_BUILD_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_BUILD_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buildPoint = 0;
    };
    Message_G2C_FACTION_BUILD_POINT.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_BUILD_POINT.prototype.unpack = function (reader) {
        this.buildPoint = reader.readUInt();
    };
    return Message_G2C_FACTION_BUILD_POINT;
}(MessageBase));
__reflect(Message_G2C_FACTION_BUILD_POINT.prototype, "Message_G2C_FACTION_BUILD_POINT");
var Message_C2G_FACTION_SKILL_INFO = (function (_super) {
    __extends(Message_C2G_FACTION_SKILL_INFO, _super);
    function Message_C2G_FACTION_SKILL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_SKILL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_SKILL_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_SKILL_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_SKILL_INFO;
}(MessageBase));
__reflect(Message_C2G_FACTION_SKILL_INFO.prototype, "Message_C2G_FACTION_SKILL_INFO");
var Message_G2C_FACTION_SKILL_INFO = (function (_super) {
    __extends(Message_G2C_FACTION_SKILL_INFO, _super);
    function Message_G2C_FACTION_SKILL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_SKILL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pointRecord = 0;
        this.list = {};
    };
    Message_G2C_FACTION_SKILL_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_SKILL_INFO.prototype.unpack = function (reader) {
        this.pointRecord = reader.readUInt();
        this.list = table_load(reader.readString());
        //TLog.Debug("************************")
        //TLog.Debug(this.pointRecord)
        //io.read()
    };
    return Message_G2C_FACTION_SKILL_INFO;
}(MessageBase));
__reflect(Message_G2C_FACTION_SKILL_INFO.prototype, "Message_G2C_FACTION_SKILL_INFO");
var Message_C2G_FACTION_SKILL_LEVEL_UP = (function (_super) {
    __extends(Message_C2G_FACTION_SKILL_LEVEL_UP, _super);
    function Message_C2G_FACTION_SKILL_LEVEL_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_SKILL_LEVEL_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillType = 0;
    };
    Message_C2G_FACTION_SKILL_LEVEL_UP.prototype.pack = function (writer) {
        writer.writeUInt(this.skillType);
    };
    Message_C2G_FACTION_SKILL_LEVEL_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_SKILL_LEVEL_UP;
}(MessageBase));
__reflect(Message_C2G_FACTION_SKILL_LEVEL_UP.prototype, "Message_C2G_FACTION_SKILL_LEVEL_UP");
var Message_C2G_UNIONPVP_GROUP_INFO = (function (_super) {
    __extends(Message_C2G_UNIONPVP_GROUP_INFO, _super);
    function Message_C2G_UNIONPVP_GROUP_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_GROUP_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_GROUP_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_GROUP_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_GROUP_INFO;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_GROUP_INFO.prototype, "Message_C2G_UNIONPVP_GROUP_INFO");
var Message_G2C_UNIONPVP_GROUP_INFO = (function (_super) {
    __extends(Message_G2C_UNIONPVP_GROUP_INFO, _super);
    function Message_G2C_UNIONPVP_GROUP_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_GROUP_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_GROUP_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_GROUP_INFO.prototype.unpack = function (reader) {
        this.info = {};
        this.info.myUnion = []; //我方联盟
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var legionInfo = {};
            legionInfo.id = reader.readUInt(); //id
            legionInfo.logo = reader.readUInt(); //logo
            legionInfo.name = reader.readString(); //name
            JsUtil.arrayInstert(this.info.myUnion, legionInfo);
        }
        this.info.enemyUnion = []; //敌方联盟
        count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var legionInfo = {};
            legionInfo.id = reader.readUInt(); //id
            legionInfo.logo = reader.readUInt(); //logo
            legionInfo.name = reader.readString(); //name
            JsUtil.arrayInstert(this.info.enemyUnion, legionInfo);
        }
        this.info.myUnionCount = reader.readUInt(); //我方参与人数
        this.info.enemyUnionCount = reader.readUInt(); //敌方参与人数
        this.info.myUnionScore = reader.readUInt(); //我方积分
        this.info.enemyUnionScore = reader.readUInt(); //敌方积分
        this.info.myScore = reader.readUInt(); //我的积分
        this.info.mySide = reader.readUInt(); //左右
    };
    return Message_G2C_UNIONPVP_GROUP_INFO;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_GROUP_INFO.prototype, "Message_G2C_UNIONPVP_GROUP_INFO");
var Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST = (function (_super) {
    __extends(Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST, _super);
    function Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkIndex = null; //1 我方 2敌方
        //opUnionConfig.factScore = 1,              //查看军团成员积分
        //opUnionConfig.unionScore = 2,             //查看联盟成员积分
    };
    Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.checkIndex);
    };
    Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST.prototype, "Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST");
var Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST = (function (_super) {
    __extends(Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST, _super);
    function Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.infoList = null;
        this.checkType = null;
    };
    Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST.prototype.unpack = function (reader) {
        this.infoList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var memberInfo = {};
            memberInfo.score = reader.readUInt(); //积分
            memberInfo.id = reader.readUInt(); //id
            memberInfo.name = reader.readString(); //name
            memberInfo.body = reader.readUInt(); //body
            memberInfo.level = reader.readUInt(); //lv
            JsUtil.arrayInstert(this.infoList, memberInfo);
        }
        this.checkType = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST.prototype, "Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST");
var Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST = (function (_super) {
    __extends(Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST, _super);
    function Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkIndex = null; //1 我方 2敌方
        //opUnionConfig.myNodeScore = 1,            //查看我方成员积分
        //opUnionConfig.otherNodeScore = 2,         //查看敌方成员积分
    };
    Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.checkIndex);
    };
    Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype, "Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST");
var Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST = (function (_super) {
    __extends(Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST, _super);
    function Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
        this.checkType = null;
    };
    Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype.unpack = function (reader) {
        this.info = {};
        this.info.myTotalScore = reader.readUInt(); //我方总积分
        this.info.enemyTotalScore = reader.readUInt(); //敌方总结分
        var count = reader.readUInt();
        this.info.list = {};
        for (var i = 1; i <= count; i++) {
            var memberInfo = {};
            memberInfo.score = reader.readUInt(); //积分
            memberInfo.id = reader.readUInt(); //id
            memberInfo.name = reader.readString(); //name
            memberInfo.body = reader.readUInt(); //body
            memberInfo.level = reader.readUInt(); //lv
            JsUtil.arrayInstert(this.info.list, memberInfo);
        }
        this.checkType = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST.prototype, "Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST");
var Message_G2C_UNIONPVP_SCORE = (function (_super) {
    __extends(Message_G2C_UNIONPVP_SCORE, _super);
    function Message_G2C_UNIONPVP_SCORE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_SCORE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_SCORE.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_SCORE.prototype.unpack = function (reader) {
        this.info = {};
        this.info.leftScore = reader.readUInt();
        this.info.rightScore = reader.readUInt();
        this.info.mySide = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_SCORE;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_SCORE.prototype, "Message_G2C_UNIONPVP_SCORE");
var Message_C2G_UNIONPVP_ENTER = (function (_super) {
    __extends(Message_C2G_UNIONPVP_ENTER, _super);
    function Message_C2G_UNIONPVP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_ENTER.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_ENTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_ENTER;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_ENTER.prototype, "Message_C2G_UNIONPVP_ENTER");
var Message_G2C_UNIONPVP_ENTER = (function (_super) {
    __extends(Message_G2C_UNIONPVP_ENTER, _super);
    function Message_G2C_UNIONPVP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.battleIndex = null;
    };
    Message_G2C_UNIONPVP_ENTER.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_ENTER.prototype.unpack = function (reader) {
        this.battleIndex = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_ENTER;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_ENTER.prototype, "Message_G2C_UNIONPVP_ENTER");
var Message_C2G_UNIONPVP_PICK_FLAG = (function (_super) {
    __extends(Message_C2G_UNIONPVP_PICK_FLAG, _super);
    function Message_C2G_UNIONPVP_PICK_FLAG() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_PICK_FLAG.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = null;
    };
    Message_C2G_UNIONPVP_PICK_FLAG.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_UNIONPVP_PICK_FLAG.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_PICK_FLAG;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_PICK_FLAG.prototype, "Message_C2G_UNIONPVP_PICK_FLAG");
var Message_C2G_UNIONPVP_OPEN_FLAG = (function (_super) {
    __extends(Message_C2G_UNIONPVP_OPEN_FLAG, _super);
    function Message_C2G_UNIONPVP_OPEN_FLAG() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_OPEN_FLAG.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_OPEN_FLAG.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_OPEN_FLAG.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_OPEN_FLAG;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_OPEN_FLAG.prototype, "Message_C2G_UNIONPVP_OPEN_FLAG");
var Message_C2G_UNIONPVP_CREATE_FIGHT = (function (_super) {
    __extends(Message_C2G_UNIONPVP_CREATE_FIGHT, _super);
    function Message_C2G_UNIONPVP_CREATE_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_CREATE_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId = null;
    };
    Message_C2G_UNIONPVP_CREATE_FIGHT.prototype.pack = function (writer) {
        writer.writeUInt(this.playerId);
    };
    Message_C2G_UNIONPVP_CREATE_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_CREATE_FIGHT;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_CREATE_FIGHT.prototype, "Message_C2G_UNIONPVP_CREATE_FIGHT");
var Message_C2G_UNIONPVP_LEAVE = (function (_super) {
    __extends(Message_C2G_UNIONPVP_LEAVE, _super);
    function Message_C2G_UNIONPVP_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_LEAVE;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_LEAVE.prototype, "Message_C2G_UNIONPVP_LEAVE");
var Message_G2C_UNIONPVP_LEAVE = (function (_super) {
    __extends(Message_G2C_UNIONPVP_LEAVE, _super);
    function Message_G2C_UNIONPVP_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_LEAVE.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_LEAVE.prototype.unpack = function (reader) {
        this.info = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_LEAVE;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_LEAVE.prototype, "Message_G2C_UNIONPVP_LEAVE");
var Message_C2G_UNIONPVP_GAME_STAGE = (function (_super) {
    __extends(Message_C2G_UNIONPVP_GAME_STAGE, _super);
    function Message_C2G_UNIONPVP_GAME_STAGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_GAME_STAGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_GAME_STAGE.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_GAME_STAGE.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_GAME_STAGE;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_GAME_STAGE.prototype, "Message_C2G_UNIONPVP_GAME_STAGE");
var Message_G2C_UNIONPVP_GAME_STAGE = (function (_super) {
    __extends(Message_G2C_UNIONPVP_GAME_STAGE, _super);
    function Message_G2C_UNIONPVP_GAME_STAGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_GAME_STAGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.status = null;
    };
    Message_G2C_UNIONPVP_GAME_STAGE.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_GAME_STAGE.prototype.unpack = function (reader) {
        this.status = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_GAME_STAGE;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_GAME_STAGE.prototype, "Message_G2C_UNIONPVP_GAME_STAGE");
var Message_C2G_UNIONPVP_CHANGE_MAP = (function (_super) {
    __extends(Message_C2G_UNIONPVP_CHANGE_MAP, _super);
    function Message_C2G_UNIONPVP_CHANGE_MAP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_CHANGE_MAP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = null;
    };
    Message_C2G_UNIONPVP_CHANGE_MAP.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_UNIONPVP_CHANGE_MAP.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_CHANGE_MAP;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_CHANGE_MAP.prototype, "Message_C2G_UNIONPVP_CHANGE_MAP");
var Message_C2G_UNIONPVP_FLAG_INFO = (function (_super) {
    __extends(Message_C2G_UNIONPVP_FLAG_INFO, _super);
    function Message_C2G_UNIONPVP_FLAG_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_FLAG_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_FLAG_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_FLAG_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_FLAG_INFO;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_FLAG_INFO.prototype, "Message_C2G_UNIONPVP_FLAG_INFO");
var Message_G2C_UNIONPVP_FLAG_INFO = (function (_super) {
    __extends(Message_G2C_UNIONPVP_FLAG_INFO, _super);
    function Message_G2C_UNIONPVP_FLAG_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_FLAG_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_FLAG_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_FLAG_INFO.prototype.unpack = function (reader) {
        this.info = {};
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var roomIndex = reader.readUInt();
            var smallCount = reader.readUInt();
            var bigCount = reader.readUInt();
            JsUtil.arrayInstert(this.info, [i, smallCount, bigCount]);
        }
    };
    return Message_G2C_UNIONPVP_FLAG_INFO;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_FLAG_INFO.prototype, "Message_G2C_UNIONPVP_FLAG_INFO");
var Message_C2G_UNIONPVP_SECOND_FIGHT_INFO = (function (_super) {
    __extends(Message_C2G_UNIONPVP_SECOND_FIGHT_INFO, _super);
    function Message_C2G_UNIONPVP_SECOND_FIGHT_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_SECOND_FIGHT_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_SECOND_FIGHT_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_SECOND_FIGHT_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_SECOND_FIGHT_INFO;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_SECOND_FIGHT_INFO.prototype, "Message_C2G_UNIONPVP_SECOND_FIGHT_INFO");
var Message_G2C_UNIONPVP_SECOND_FIGHT_INFO = (function (_super) {
    __extends(Message_G2C_UNIONPVP_SECOND_FIGHT_INFO, _super);
    function Message_G2C_UNIONPVP_SECOND_FIGHT_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_SECOND_FIGHT_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.superInfo = null;
    };
    Message_G2C_UNIONPVP_SECOND_FIGHT_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_SECOND_FIGHT_INFO.prototype.unpack = function (reader) {
        this.superInfo = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var playerInfo = {};
            playerInfo.pos = reader.readUInt();
            playerInfo.score = reader.readUInt();
            playerInfo.id = reader.readUInt();
            playerInfo.name = reader.readString();
            playerInfo.body = reader.readUInt();
            playerInfo.level = reader.readUInt();
            playerInfo.status = reader.readUInt();
            JsUtil.arrayInstert(this.superInfo, playerInfo);
        }
    };
    return Message_G2C_UNIONPVP_SECOND_FIGHT_INFO;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_SECOND_FIGHT_INFO.prototype, "Message_G2C_UNIONPVP_SECOND_FIGHT_INFO");
var Message_C2G_UNIONPVP_SET_MEMBER = (function (_super) {
    __extends(Message_C2G_UNIONPVP_SET_MEMBER, _super);
    function Message_C2G_UNIONPVP_SET_MEMBER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_SET_MEMBER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.memberId = null;
        this.setPos = null;
    };
    Message_C2G_UNIONPVP_SET_MEMBER.prototype.pack = function (writer) {
        writer.writeUInt(this.setPos);
        writer.writeUInt(this.memberId);
    };
    Message_C2G_UNIONPVP_SET_MEMBER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_SET_MEMBER;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_SET_MEMBER.prototype, "Message_C2G_UNIONPVP_SET_MEMBER");
var Message_C2G_UNIONPVP_CANCEL_SET_MEMBER = (function (_super) {
    __extends(Message_C2G_UNIONPVP_CANCEL_SET_MEMBER, _super);
    function Message_C2G_UNIONPVP_CANCEL_SET_MEMBER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_CANCEL_SET_MEMBER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.memberId = null;
        this.setPos = null;
    };
    Message_C2G_UNIONPVP_CANCEL_SET_MEMBER.prototype.pack = function (writer) {
        writer.writeUInt(this.setPos);
        writer.writeUInt(this.memberId);
    };
    Message_C2G_UNIONPVP_CANCEL_SET_MEMBER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_CANCEL_SET_MEMBER;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_CANCEL_SET_MEMBER.prototype, "Message_C2G_UNIONPVP_CANCEL_SET_MEMBER");
var Message_C2G_UNIONPVP_SET_STATUS = (function (_super) {
    __extends(Message_C2G_UNIONPVP_SET_STATUS, _super);
    function Message_C2G_UNIONPVP_SET_STATUS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_SET_STATUS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.status = null; //1准备 0不准备
    };
    Message_C2G_UNIONPVP_SET_STATUS.prototype.pack = function (writer) {
        writer.writeUInt(this.status);
    };
    Message_C2G_UNIONPVP_SET_STATUS.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_SET_STATUS;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_SET_STATUS.prototype, "Message_C2G_UNIONPVP_SET_STATUS");
var Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT = (function (_super) {
    __extends(Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT, _super);
    function Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT.prototype, "Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT");
var Message_G2C_UNIONPVP_FAIRY_GUARD_LIST = (function (_super) {
    __extends(Message_G2C_UNIONPVP_FAIRY_GUARD_LIST, _super);
    function Message_G2C_UNIONPVP_FAIRY_GUARD_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_FAIRY_GUARD_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.myFairyList = null;
    };
    Message_G2C_UNIONPVP_FAIRY_GUARD_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_FAIRY_GUARD_LIST.prototype.unpack = function (reader) {
        this.myFairyList = table_load(reader.readString());
        //fairyList = {[roomIndex]:npcId, [roomIndex]:npcId}
    };
    return Message_G2C_UNIONPVP_FAIRY_GUARD_LIST;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_FAIRY_GUARD_LIST.prototype, "Message_G2C_UNIONPVP_FAIRY_GUARD_LIST");
var Message_G2C_UNIONPVP_ROOM_INDEX = (function (_super) {
    __extends(Message_G2C_UNIONPVP_ROOM_INDEX, _super);
    function Message_G2C_UNIONPVP_ROOM_INDEX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_ROOM_INDEX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.curRoomIndex = null;
    };
    Message_G2C_UNIONPVP_ROOM_INDEX.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_ROOM_INDEX.prototype.unpack = function (reader) {
        this.curRoomIndex = reader.readUInt();
    };
    return Message_G2C_UNIONPVP_ROOM_INDEX;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_ROOM_INDEX.prototype, "Message_G2C_UNIONPVP_ROOM_INDEX");
var Message_C2G_UNIONPVP_SECOND_ALL_INFO = (function (_super) {
    __extends(Message_C2G_UNIONPVP_SECOND_ALL_INFO, _super);
    function Message_C2G_UNIONPVP_SECOND_ALL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_SECOND_ALL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_SECOND_ALL_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_SECOND_ALL_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_SECOND_ALL_INFO;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_SECOND_ALL_INFO.prototype, "Message_C2G_UNIONPVP_SECOND_ALL_INFO");
var Message_G2C_UNIONPVP_SECOND_ALL_INFO = (function (_super) {
    __extends(Message_G2C_UNIONPVP_SECOND_ALL_INFO, _super);
    function Message_G2C_UNIONPVP_SECOND_ALL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_SECOND_ALL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_SECOND_ALL_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_SECOND_ALL_INFO.prototype.unpack = function (reader) {
        this.info = {};
        this.info.leftList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var playerInfo = {};
            playerInfo.pos = reader.readUInt();
            playerInfo.score = reader.readUInt();
            playerInfo.id = reader.readUInt();
            playerInfo.name = reader.readString();
            playerInfo.body = reader.readUInt();
            playerInfo.level = reader.readUInt();
            playerInfo.status = reader.readUInt();
            JsUtil.arrayInstert(this.info.leftList, playerInfo);
        }
        this.info.rightList = [];
        count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var playerInfo = {};
            playerInfo.pos = reader.readUInt();
            playerInfo.score = reader.readUInt();
            playerInfo.id = reader.readUInt();
            playerInfo.name = reader.readString();
            playerInfo.body = reader.readUInt();
            playerInfo.level = reader.readUInt();
            playerInfo.status = reader.readUInt();
            JsUtil.arrayInstert(this.info.rightList, playerInfo);
        }
    };
    return Message_G2C_UNIONPVP_SECOND_ALL_INFO;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_SECOND_ALL_INFO.prototype, "Message_G2C_UNIONPVP_SECOND_ALL_INFO");
var Message_C2G_UNIONPVP_APPLY_LIST_INFO = (function (_super) {
    __extends(Message_C2G_UNIONPVP_APPLY_LIST_INFO, _super);
    function Message_C2G_UNIONPVP_APPLY_LIST_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_APPLY_LIST_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_APPLY_LIST_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_APPLY_LIST_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_APPLY_LIST_INFO;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_APPLY_LIST_INFO.prototype, "Message_C2G_UNIONPVP_APPLY_LIST_INFO");
var Message_G2C_UNIONPVP_APPLY_LIST_INFO = (function (_super) {
    __extends(Message_G2C_UNIONPVP_APPLY_LIST_INFO, _super);
    function Message_G2C_UNIONPVP_APPLY_LIST_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONPVP_APPLY_LIST_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
    };
    Message_G2C_UNIONPVP_APPLY_LIST_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONPVP_APPLY_LIST_INFO.prototype.unpack = function (reader) {
        this.info = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var unionInfo = table_load(reader.readString());
            JsUtil.arrayInstert(this.info, unionInfo);
        }
    };
    return Message_G2C_UNIONPVP_APPLY_LIST_INFO;
}(MessageBase));
__reflect(Message_G2C_UNIONPVP_APPLY_LIST_INFO.prototype, "Message_G2C_UNIONPVP_APPLY_LIST_INFO");
var Message_C2G_UNIONPVP_USE_ITEM = (function (_super) {
    __extends(Message_C2G_UNIONPVP_USE_ITEM, _super);
    function Message_C2G_UNIONPVP_USE_ITEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_USE_ITEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemUid = null;
    };
    Message_C2G_UNIONPVP_USE_ITEM.prototype.pack = function (writer) {
        writer.writeUInt(this.itemUid);
    };
    Message_C2G_UNIONPVP_USE_ITEM.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_USE_ITEM;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_USE_ITEM.prototype, "Message_C2G_UNIONPVP_USE_ITEM");
var Message_C2G_UNIONPVP_APPLY = (function (_super) {
    __extends(Message_C2G_UNIONPVP_APPLY, _super);
    function Message_C2G_UNIONPVP_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONPVP_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_UNIONPVP_APPLY.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONPVP_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONPVP_APPLY;
}(MessageBase));
__reflect(Message_C2G_UNIONPVP_APPLY.prototype, "Message_C2G_UNIONPVP_APPLY");
var Message_C2G_UNIONMTX_CREATE = (function (_super) {
    __extends(Message_C2G_UNIONMTX_CREATE, _super);
    function Message_C2G_UNIONMTX_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_CREATE.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_CREATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_CREATE;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_CREATE.prototype, "Message_C2G_UNIONMTX_CREATE");
var Message_G2C_UNIONMTX_CREATE = (function (_super) {
    __extends(Message_G2C_UNIONMTX_CREATE, _super);
    function Message_G2C_UNIONMTX_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.openState = 0;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_CREATE.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_CREATE.prototype.unpack = function (reader) {
        this.openState = reader.readUInt();
    };
    return Message_G2C_UNIONMTX_CREATE;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_CREATE.prototype, "Message_G2C_UNIONMTX_CREATE");
var Message_C2G_UNIONMTX_ENTER = (function (_super) {
    __extends(Message_C2G_UNIONMTX_ENTER, _super);
    function Message_C2G_UNIONMTX_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapindex = 0;
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_ENTER.prototype.pack = function (writer) {
        writer.writeUInt(this.mapindex);
    };
    Message_C2G_UNIONMTX_ENTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_ENTER;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_ENTER.prototype, "Message_C2G_UNIONMTX_ENTER");
var Message_G2C_UNIONMTX_ENTER = (function (_super) {
    __extends(Message_G2C_UNIONMTX_ENTER, _super);
    function Message_G2C_UNIONMTX_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapIndex = 0;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_ENTER.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_ENTER.prototype.unpack = function (reader) {
        this.mapIndex = reader.readUInt();
    };
    return Message_G2C_UNIONMTX_ENTER;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_ENTER.prototype, "Message_G2C_UNIONMTX_ENTER");
var Message_C2G_UNIONMTX_LEAVE = (function (_super) {
    __extends(Message_C2G_UNIONMTX_LEAVE, _super);
    function Message_C2G_UNIONMTX_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_LEAVE;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_LEAVE.prototype, "Message_C2G_UNIONMTX_LEAVE");
var Message_G2C_UNIONMTX_LEAVE = (function (_super) {
    __extends(Message_G2C_UNIONMTX_LEAVE, _super);
    function Message_G2C_UNIONMTX_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapIndex = 0;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_LEAVE.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_LEAVE.prototype.unpack = function (reader) {
        this.mapIndex = reader.readUInt();
    };
    return Message_G2C_UNIONMTX_LEAVE;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_LEAVE.prototype, "Message_G2C_UNIONMTX_LEAVE");
var Message_C2G_UNIONMTX_FIGHT = (function (_super) {
    __extends(Message_C2G_UNIONMTX_FIGHT, _super);
    function Message_C2G_UNIONMTX_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_FIGHT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_UNIONMTX_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_FIGHT;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_FIGHT.prototype, "Message_C2G_UNIONMTX_FIGHT");
var Message_C2G_UNIONMTX_QUERY = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY, _super);
    function Message_C2G_UNIONMTX_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY.prototype, "Message_C2G_UNIONMTX_QUERY");
var Message_G2C_UNIONMTX_QUERY = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY, _super);
    function Message_G2C_UNIONMTX_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY.prototype.unpack = function (reader) {
        this.info = {};
        var t = {};
        t.starttime = reader.readUInt();
        t.map1close = reader.readUShort(); //(1表示已经破)
        t.map2close = reader.readUShort();
        t.map3close = reader.readUShort();
        t.map4close = reader.readUShort();
        t.map5close = reader.readUShort();
        t.map6close = reader.readUShort();
        this.info = t;
    };
    return Message_G2C_UNIONMTX_QUERY;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY.prototype, "Message_G2C_UNIONMTX_QUERY");
var Message_C2G_UNIONMTX_QUERY_MTX = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY_MTX, _super);
    function Message_C2G_UNIONMTX_QUERY_MTX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY_MTX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapindex = 0;
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY_MTX.prototype.pack = function (writer) {
        writer.writeUInt(this.mapindex);
    };
    Message_C2G_UNIONMTX_QUERY_MTX.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY_MTX;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY_MTX.prototype, "Message_C2G_UNIONMTX_QUERY_MTX");
var Message_G2C_UNIONMTX_QUERY_MTX = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY_MTX, _super);
    function Message_G2C_UNIONMTX_QUERY_MTX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY_MTX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY_MTX.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY_MTX.prototype.unpack = function (reader) {
        this.info = {};
        var t = {};
        t.mapindex = reader.readUInt(); //(阵眼开启名)
        t.allkillcount = reader.readUInt(); //联盟已杀死的小怪
        t.mykillcount = reader.readUInt(); //自己总共杀死的小怪
        t.playercount = reader.readUInt(); //阵眼中的玩家数量
        t.bossAppearTime = reader.readUInt(); //阵眼守护者出现
        t.buffid = reader.readUInt(); //魔法id
        this.info = t;
    };
    return Message_G2C_UNIONMTX_QUERY_MTX;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY_MTX.prototype, "Message_G2C_UNIONMTX_QUERY_MTX");
var Message_C2G_UNIONMTX_QUERY_TCH = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY_TCH, _super);
    function Message_C2G_UNIONMTX_QUERY_TCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY_TCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY_TCH.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_QUERY_TCH.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY_TCH;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY_TCH.prototype, "Message_C2G_UNIONMTX_QUERY_TCH");
var Message_G2C_UNIONMTX_QUERY_TCH = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY_TCH, _super);
    function Message_G2C_UNIONMTX_QUERY_TCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY_TCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY_TCH.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY_TCH.prototype.unpack = function (reader) {
        this.info = {};
        var t = {};
        t.nextappeartime = reader.readUInt(); //强化师下一次出现的时间
        t.appear = reader.readUInt(); //强化师是否出现
        t.curHp = reader.readUInt(); //强化师当前的血量
        t.maxHp = reader.readUInt(); //强化石的最大血量
        this.info = t;
    };
    return Message_G2C_UNIONMTX_QUERY_TCH;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY_TCH.prototype, "Message_G2C_UNIONMTX_QUERY_TCH");
var Message_C2G_UNIONMTX_QUERY_BOSS = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY_BOSS, _super);
    function Message_C2G_UNIONMTX_QUERY_BOSS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY_BOSS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY_BOSS.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_QUERY_BOSS.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY_BOSS;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY_BOSS.prototype, "Message_C2G_UNIONMTX_QUERY_BOSS");
var Message_G2C_UNIONMTX_QUERY_BOSS = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY_BOSS, _super);
    function Message_G2C_UNIONMTX_QUERY_BOSS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY_BOSS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bossInfo = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY_BOSS.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY_BOSS.prototype.unpack = function (reader) {
        this.bossInfo = {};
        var t = {};
        t.nextfighttime = reader.readUInt(); //Boss下一次出现的时间
        t.open = reader.readUInt(); //是否可以打boss
        t.curcount = reader.readUInt(); //当前挑战boss的数量
        t.maxcount = reader.readUInt(); //可挑战boss的最大数量
        //t.maxHp = reader.readUInt()            //最大血量
        this.bossInfo = t;
    };
    return Message_G2C_UNIONMTX_QUERY_BOSS;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY_BOSS.prototype, "Message_G2C_UNIONMTX_QUERY_BOSS");
var Message_C2G_UNIONMTX_RANKDATA = (function (_super) {
    __extends(Message_C2G_UNIONMTX_RANKDATA, _super);
    function Message_C2G_UNIONMTX_RANKDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_RANKDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_RANKDATA.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_RANKDATA.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_RANKDATA;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_RANKDATA.prototype, "Message_C2G_UNIONMTX_RANKDATA");
var Message_G2C_UNIONMTX_RANKDATA = (function (_super) {
    __extends(Message_G2C_UNIONMTX_RANKDATA, _super);
    function Message_G2C_UNIONMTX_RANKDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_RANKDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rankInfo = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_RANKDATA.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_RANKDATA.prototype.unpack = function (reader) {
        this.rankInfo = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.roleid = reader.readUInt(); //角色的ID
            t.body = reader.readUInt(); //角色头像
            t.rolename = reader.readString(); //角色的名字
            t.attackhp = reader.readUInt(); //角色的伤害
            JsUtil.arrayInstert(this.rankInfo, t);
        }
        //		t.roleid = 0           //角色的ID
        //		t.body = 18000             //角色头像
        //		t.rolename = "asa"   //角色的名字
        //		t.attackhp = 10000          //角色的伤害
        //		JsUtil.arrayInstert(this.rankInfo,t)
    };
    return Message_G2C_UNIONMTX_RANKDATA;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_RANKDATA.prototype, "Message_G2C_UNIONMTX_RANKDATA");
var Message_C2G_UNIONMTX_TEACHER_FIGHT = (function (_super) {
    __extends(Message_C2G_UNIONMTX_TEACHER_FIGHT, _super);
    function Message_C2G_UNIONMTX_TEACHER_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_TEACHER_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_TEACHER_FIGHT.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_TEACHER_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_TEACHER_FIGHT;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_TEACHER_FIGHT.prototype, "Message_C2G_UNIONMTX_TEACHER_FIGHT");
var Message_C2G_UNIONMTX_BOSS_FIGHT = (function (_super) {
    __extends(Message_C2G_UNIONMTX_BOSS_FIGHT, _super);
    function Message_C2G_UNIONMTX_BOSS_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_BOSS_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_BOSS_FIGHT.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_BOSS_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_BOSS_FIGHT;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_BOSS_FIGHT.prototype, "Message_C2G_UNIONMTX_BOSS_FIGHT");
var Message_C2G_UNIONMTX_REGISTER = (function (_super) {
    __extends(Message_C2G_UNIONMTX_REGISTER, _super);
    function Message_C2G_UNIONMTX_REGISTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_REGISTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_REGISTER.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_REGISTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_REGISTER;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_REGISTER.prototype, "Message_C2G_UNIONMTX_REGISTER");
var Message_C2G_UNIONMTX_UNREGISTER = (function (_super) {
    __extends(Message_C2G_UNIONMTX_UNREGISTER, _super);
    function Message_C2G_UNIONMTX_UNREGISTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_UNREGISTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_UNREGISTER.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_UNREGISTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_UNREGISTER;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_UNREGISTER.prototype, "Message_C2G_UNIONMTX_UNREGISTER");
var Message_C2G_UNIONMTX_PROMOTE_MCH = (function (_super) {
    __extends(Message_C2G_UNIONMTX_PROMOTE_MCH, _super);
    function Message_C2G_UNIONMTX_PROMOTE_MCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_PROMOTE_MCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_PROMOTE_MCH.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_PROMOTE_MCH.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_PROMOTE_MCH;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_PROMOTE_MCH.prototype, "Message_C2G_UNIONMTX_PROMOTE_MCH");
var Message_G2C_UNIONMTX_PROMOTE_MCH = (function (_super) {
    __extends(Message_G2C_UNIONMTX_PROMOTE_MCH, _super);
    function Message_G2C_UNIONMTX_PROMOTE_MCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_PROMOTE_MCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.code = 0;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_PROMOTE_MCH.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_PROMOTE_MCH.prototype.unpack = function (reader) {
        this.code = reader.readUInt();
    };
    return Message_G2C_UNIONMTX_PROMOTE_MCH;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_PROMOTE_MCH.prototype, "Message_G2C_UNIONMTX_PROMOTE_MCH");
var Message_C2G_UNIONMTX_QUERY_MCH = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY_MCH, _super);
    function Message_C2G_UNIONMTX_QUERY_MCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY_MCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY_MCH.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_QUERY_MCH.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY_MCH;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY_MCH.prototype, "Message_C2G_UNIONMTX_QUERY_MCH");
var Message_G2C_UNIONMTX_QUERY_MCH = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY_MCH, _super);
    function Message_G2C_UNIONMTX_QUERY_MCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY_MCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.machineInfo = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY_MCH.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY_MCH.prototype.unpack = function (reader) {
        this.machineInfo = {};
        var t = {};
        t.level = reader.readUInt(); //等级
        t.curgold = reader.readUInt(); //当前拥有晶石
        this.machineInfo = t;
    };
    return Message_G2C_UNIONMTX_QUERY_MCH;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY_MCH.prototype, "Message_G2C_UNIONMTX_QUERY_MCH");
var Message_C2G_UNIONMTX_QUERY_SRANK = (function (_super) {
    __extends(Message_C2G_UNIONMTX_QUERY_SRANK, _super);
    function Message_C2G_UNIONMTX_QUERY_SRANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_UNIONMTX_QUERY_SRANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_UNIONMTX_QUERY_SRANK.prototype.pack = function (writer) {
    };
    Message_C2G_UNIONMTX_QUERY_SRANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_UNIONMTX_QUERY_SRANK;
}(MessageBase));
__reflect(Message_C2G_UNIONMTX_QUERY_SRANK.prototype, "Message_C2G_UNIONMTX_QUERY_SRANK");
var Message_G2C_UNIONMTX_QUERY_SRANK = (function (_super) {
    __extends(Message_G2C_UNIONMTX_QUERY_SRANK, _super);
    function Message_G2C_UNIONMTX_QUERY_SRANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_UNIONMTX_QUERY_SRANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.unionRank = null;
        this.isdump = true;
    };
    Message_G2C_UNIONMTX_QUERY_SRANK.prototype.pack = function (writer) {
    };
    Message_G2C_UNIONMTX_QUERY_SRANK.prototype.unpack = function (reader) {
        this.unionRank = [];
        var count = reader.readUShort();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.fationList = [];
            t.unionid = reader.readUInt(); //联盟ID
            t.attackhp = reader.readString(); //总伤害
            t.hightattackid = reader.readUInt(); //最高伤害id
            t.hightattackname = reader.readString(); //最高伤害名字
            t.num = reader.readUShort(); //联盟内军团数
            for (var i_1 = 1; i_1 <= t.num, 1; i_1++) {
                var s = {};
                s.factionid = reader.readUInt(); //军团ID
                s.factionicon = reader.readUInt(); //军团头像
                s.factionname = reader.readString(); //军团名字
                JsUtil.arrayInstert(t.fationList, s);
            }
            JsUtil.arrayInstert(this.unionRank, t);
        }
        //  this.unionRank = {}
        //	for(let i = 1; i <= 7,1;i++){ 
        //		let t:any = {}
        //		t.fationList = {}
        //		t.unionid = 10                       //联盟ID
        //		t.attackhp = 1000                      //总伤害
        //		t.hightattackid = 0                 //最高伤害id
        //		t.hightattackname = "as"          //最高伤害名字
        //		t.num = 2
        //		for(let i = 1; i <= 3,1;i++){	
        //			let s:any = {}
        //		  s.factionid = 1                       //军团ID
        //		  s.factionicon = 2                     //军团头像
        //		  s.factionname = "awsassa"               //军团名字
        //			JsUtil.arrayInstert(t.fationList,s)
        //		}
        //		JsUtil.arrayInstert(this.unionRank,t)
        //	}
    };
    return Message_G2C_UNIONMTX_QUERY_SRANK;
}(MessageBase));
__reflect(Message_G2C_UNIONMTX_QUERY_SRANK.prototype, "Message_G2C_UNIONMTX_QUERY_SRANK");
var Message_C2G_FACTION_ITEM_TASK_REQUEST = (function (_super) {
    __extends(Message_C2G_FACTION_ITEM_TASK_REQUEST, _super);
    function Message_C2G_FACTION_ITEM_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_ITEM_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_FACTION_ITEM_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_ITEM_TASK_REQUEST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_ITEM_TASK_REQUEST;
}(MessageBase));
__reflect(Message_C2G_FACTION_ITEM_TASK_REQUEST.prototype, "Message_C2G_FACTION_ITEM_TASK_REQUEST");
var Message_G2C_FACTION_ITEM_TASK_REQUEST = (function (_super) {
    __extends(Message_G2C_FACTION_ITEM_TASK_REQUEST, _super);
    function Message_G2C_FACTION_ITEM_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_ITEM_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.coolDown = 0; //冻结时间
        this.cancelDiamond = 0; //取消任务所需晶石
        this.sumCount = 0; //军团总次数
        this.myCount = 0; //自己完成次数
        this.isdump = true;
    };
    Message_G2C_FACTION_ITEM_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_ITEM_TASK_REQUEST.prototype.unpack = function (reader) {
        this.coolDown = reader.readUInt();
        this.cancelDiamond = reader.readUInt();
        this.sumCount = reader.readUInt();
        this.myCount = reader.readUInt();
    };
    return Message_G2C_FACTION_ITEM_TASK_REQUEST;
}(MessageBase));
__reflect(Message_G2C_FACTION_ITEM_TASK_REQUEST.prototype, "Message_G2C_FACTION_ITEM_TASK_REQUEST");
var Message_C2G_FACTION_TASK_COUNT_RANK = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_COUNT_RANK, _super);
    function Message_C2G_FACTION_TASK_COUNT_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_COUNT_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isdump = true;
    };
    Message_C2G_FACTION_TASK_COUNT_RANK.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_COUNT_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_COUNT_RANK;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_COUNT_RANK.prototype, "Message_C2G_FACTION_TASK_COUNT_RANK");
var Message_G2C_FACTION_TASK_COUNT_RANK = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_COUNT_RANK, _super);
    function Message_G2C_FACTION_TASK_COUNT_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_COUNT_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rankList = [];
        this.isdump = true;
    };
    Message_G2C_FACTION_TASK_COUNT_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_COUNT_RANK.prototype.unpack = function (reader) {
        var list = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.id = reader.readUInt();
            t.name = reader.readString();
            t.level = reader.readUShort();
            t.body = reader.readUShort();
            t.tCount = reader.readUInt();
            JsUtil.arrayInstert(list, t);
        }
        this.rankList = list;
    };
    return Message_G2C_FACTION_TASK_COUNT_RANK;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_COUNT_RANK.prototype, "Message_G2C_FACTION_TASK_COUNT_RANK");
var Message_C2G_RED_ENVELOPE_LIST = (function (_super) {
    __extends(Message_C2G_RED_ENVELOPE_LIST, _super);
    function Message_C2G_RED_ENVELOPE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RED_ENVELOPE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RED_ENVELOPE_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_RED_ENVELOPE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_RED_ENVELOPE_LIST;
}(MessageBase));
__reflect(Message_C2G_RED_ENVELOPE_LIST.prototype, "Message_C2G_RED_ENVELOPE_LIST");
var Message_G2C_RED_ENVELOPE_LIST = (function (_super) {
    __extends(Message_G2C_RED_ENVELOPE_LIST, _super);
    function Message_G2C_RED_ENVELOPE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RED_ENVELOPE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = null;
    };
    Message_G2C_RED_ENVELOPE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_RED_ENVELOPE_LIST.prototype.unpack = function (reader) {
        this.list = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var info = table_load(reader.readString());
            JsUtil.arrayInstert(this.list, info);
        }
    };
    return Message_G2C_RED_ENVELOPE_LIST;
}(MessageBase));
__reflect(Message_G2C_RED_ENVELOPE_LIST.prototype, "Message_G2C_RED_ENVELOPE_LIST");
var Message_C2G_RED_ENVELOPE_RECORD = (function (_super) {
    __extends(Message_C2G_RED_ENVELOPE_RECORD, _super);
    function Message_C2G_RED_ENVELOPE_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RED_ENVELOPE_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RED_ENVELOPE_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_RED_ENVELOPE_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_RED_ENVELOPE_RECORD;
}(MessageBase));
__reflect(Message_C2G_RED_ENVELOPE_RECORD.prototype, "Message_C2G_RED_ENVELOPE_RECORD");
var Message_G2C_RED_ENVELOPE_RECORD = (function (_super) {
    __extends(Message_G2C_RED_ENVELOPE_RECORD, _super);
    function Message_G2C_RED_ENVELOPE_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RED_ENVELOPE_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = null;
    };
    Message_G2C_RED_ENVELOPE_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_RED_ENVELOPE_RECORD.prototype.unpack = function (reader) {
        this.list = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var info = table_load(reader.readString());
            JsUtil.arrayInstert(this.list, info);
        }
    };
    return Message_G2C_RED_ENVELOPE_RECORD;
}(MessageBase));
__reflect(Message_G2C_RED_ENVELOPE_RECORD.prototype, "Message_G2C_RED_ENVELOPE_RECORD");
var Message_C2G_RED_ENVELOPE_SEND = (function (_super) {
    __extends(Message_C2G_RED_ENVELOPE_SEND, _super);
    function Message_C2G_RED_ENVELOPE_SEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RED_ENVELOPE_SEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rmbNum = null;
    };
    Message_C2G_RED_ENVELOPE_SEND.prototype.pack = function (writer) {
        writer.writeUInt(this.rmbNum);
    };
    Message_C2G_RED_ENVELOPE_SEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_RED_ENVELOPE_SEND;
}(MessageBase));
__reflect(Message_C2G_RED_ENVELOPE_SEND.prototype, "Message_C2G_RED_ENVELOPE_SEND");
var Message_C2G_RED_ENVELOPE_GET = (function (_super) {
    __extends(Message_C2G_RED_ENVELOPE_GET, _super);
    function Message_C2G_RED_ENVELOPE_GET() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RED_ENVELOPE_GET.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.uid = null;
    };
    Message_C2G_RED_ENVELOPE_GET.prototype.pack = function (writer) {
        writer.writeUInt(this.uid);
    };
    Message_C2G_RED_ENVELOPE_GET.prototype.unpack = function (reader) {
    };
    return Message_C2G_RED_ENVELOPE_GET;
}(MessageBase));
__reflect(Message_C2G_RED_ENVELOPE_GET.prototype, "Message_C2G_RED_ENVELOPE_GET");
var Message_C2G_FACTIONWAR_AUTO_APPLY = (function (_super) {
    __extends(Message_C2G_FACTIONWAR_AUTO_APPLY, _super);
    function Message_C2G_FACTIONWAR_AUTO_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONWAR_AUTO_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.autoStatus = 0;
    };
    Message_C2G_FACTIONWAR_AUTO_APPLY.prototype.pack = function (writer) {
        writer.writeUChar(this.autoStatus);
    };
    Message_C2G_FACTIONWAR_AUTO_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONWAR_AUTO_APPLY;
}(MessageBase));
__reflect(Message_C2G_FACTIONWAR_AUTO_APPLY.prototype, "Message_C2G_FACTIONWAR_AUTO_APPLY");
var Message_G2C_FACTIONWAR_AUTO_APPLY = (function (_super) {
    __extends(Message_G2C_FACTIONWAR_AUTO_APPLY, _super);
    function Message_G2C_FACTIONWAR_AUTO_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONWAR_AUTO_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.autoStatus = 0;
    };
    Message_G2C_FACTIONWAR_AUTO_APPLY.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONWAR_AUTO_APPLY.prototype.unpack = function (reader) {
        this.autoStatus = reader.readUChar();
    };
    return Message_G2C_FACTIONWAR_AUTO_APPLY;
}(MessageBase));
__reflect(Message_G2C_FACTIONWAR_AUTO_APPLY.prototype, "Message_G2C_FACTIONWAR_AUTO_APPLY");
//////////////////////////公会任务//////////////////////////-
//请求积分排行
var Message_C2G_FACTION_TASK_POINT_RANK = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_POINT_RANK, _super);
    function Message_C2G_FACTION_TASK_POINT_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_POINT_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TASK_POINT_RANK.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_POINT_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_POINT_RANK;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_POINT_RANK.prototype, "Message_C2G_FACTION_TASK_POINT_RANK");
var Message_G2C_FACTION_TASK_POINT_RANK = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_POINT_RANK, _super);
    function Message_G2C_FACTION_TASK_POINT_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_POINT_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rankList = {};
        this.myRank = 0;
    };
    Message_G2C_FACTION_TASK_POINT_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_POINT_RANK.prototype.unpack = function (reader) {
        var count = reader.readUChar();
        this.rankList = [];
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.rankIndex = reader.readUInt();
            t.playerId = reader.readUInt();
            t.playerName = reader.readString();
            t.playerPro = reader.readUInt();
            t.playerSex = reader.readUChar();
            t.historyPoint = reader.readUInt();
            t.todayPoint = reader.readUInt();
            JsUtil.arrayInstert(this.rankList, t);
        }
        this.myRank = reader.readUInt();
    };
    return Message_G2C_FACTION_TASK_POINT_RANK;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_POINT_RANK.prototype, "Message_G2C_FACTION_TASK_POINT_RANK");
var Message_C2G_FACTION_TASK_INFO_UPDATA = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_INFO_UPDATA, _super);
    function Message_C2G_FACTION_TASK_INFO_UPDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_INFO_UPDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TASK_INFO_UPDATA.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_INFO_UPDATA.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_INFO_UPDATA;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_INFO_UPDATA.prototype, "Message_C2G_FACTION_TASK_INFO_UPDATA");
var Message_G2C_FACTION_TASK_INFO_UPDATA = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_INFO_UPDATA, _super);
    function Message_G2C_FACTION_TASK_INFO_UPDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_INFO_UPDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskInfo = {};
        this.todayPoint = 0;
        this.historyPoint = 0;
        //this.clubPoint = 0
        this.clubWeekPoint = 0;
    };
    Message_G2C_FACTION_TASK_INFO_UPDATA.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_INFO_UPDATA.prototype.unpack = function (reader) {
        this.taskInfo = {};
        this.taskInfo.taskIndex = reader.readUInt(); //index
        this.taskInfo.process = reader.readUInt(); //进度
        this.taskInfo.target = reader.readUInt(); //目标
        this.taskInfo.isFinish = reader.readUChar(); //完成标识
        this.taskInfo.isGet = reader.readUChar(); //领取标识
        this.taskInfo.isGroup = reader.readUChar(); //0个人1集体
        this.todayPoint = reader.readUShort(); //当天积分
        this.historyPoint = reader.readUInt(); //个人历史积分
        //this.clubPoint = reader.readUInt()//公会总积分
        this.clubWeekPoint = reader.readUInt(); //公会周积分
    };
    return Message_G2C_FACTION_TASK_INFO_UPDATA;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_INFO_UPDATA.prototype, "Message_G2C_FACTION_TASK_INFO_UPDATA");
var Message_C2G_FACTION_TASK_INFO_LIST = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_INFO_LIST, _super);
    function Message_C2G_FACTION_TASK_INFO_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_INFO_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isGroup = 0; //0个人 1集体
    };
    Message_C2G_FACTION_TASK_INFO_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.isGroup);
    };
    Message_C2G_FACTION_TASK_INFO_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_INFO_LIST;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_INFO_LIST.prototype, "Message_C2G_FACTION_TASK_INFO_LIST");
var Message_G2C_FACTION_TASK_INFO_LIST = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_INFO_LIST, _super);
    function Message_G2C_FACTION_TASK_INFO_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_INFO_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskList = {};
        this.todayPoint = 0;
        this.historyPoint = 0;
        //this.clubPoint = 0
        this.clubWeekPoint = 0;
    };
    Message_G2C_FACTION_TASK_INFO_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_INFO_LIST.prototype.unpack = function (reader) {
        this.taskList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.taskIndex = reader.readUInt(); //index
            t.process = reader.readUInt(); //进度
            t.target = reader.readUInt(); //目标
            t.isFinish = reader.readUChar(); //完成标识
            t.isGet = reader.readUChar(); //领取标识
            t.isGroup = reader.readUChar(); //0个人1集体
            JsUtil.arrayInstert(this.taskList, t);
        }
        this.todayPoint = reader.readUShort(); //当天积分
        this.historyPoint = reader.readUInt(); //个人历史积分
        //this.clubPoint = reader.readUInt()//公会总积分
        this.clubWeekPoint = reader.readUInt(); //公会周积分
    };
    return Message_G2C_FACTION_TASK_INFO_LIST;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_INFO_LIST.prototype, "Message_G2C_FACTION_TASK_INFO_LIST");
var Message_C2G_FACTION_TASK_GET_POINT = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_GET_POINT, _super);
    function Message_C2G_FACTION_TASK_GET_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_GET_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskIndex = 0;
        this.choose = 0;
    };
    Message_C2G_FACTION_TASK_GET_POINT.prototype.pack = function (writer) {
        writer.writeUInt(this.taskIndex);
        writer.writeUChar(this.choose);
    };
    Message_C2G_FACTION_TASK_GET_POINT.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_GET_POINT;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_GET_POINT.prototype, "Message_C2G_FACTION_TASK_GET_POINT");
var Message_C2G_FACTION_TASK_POINT_PRIZE = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_POINT_PRIZE, _super);
    function Message_C2G_FACTION_TASK_POINT_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_POINT_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeIndex = 0;
    };
    Message_C2G_FACTION_TASK_POINT_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.prizeIndex);
    };
    Message_C2G_FACTION_TASK_POINT_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_POINT_PRIZE;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_POINT_PRIZE.prototype, "Message_C2G_FACTION_TASK_POINT_PRIZE");
// class Message_C2G_FACTION_ENTER_TREA_HOUSE extends MessageBase{
// public initObj(...args:any[]):void {
// }
// pack( writer){
// }
// unpack( reader){
// }
// //藏宝阁列表
// }
// class Message_G2C_FACTION_TREASURE_LIST extends MessageBase{
//     treasureList
// public initObj(...args:any[]):void {
// 	this.treasureList = {}
// }
// pack( writer){
// }
// unpack( reader){
// 	this.treasureList = []
// 	let count = reader.readUShort()
// 	for(let i = 1; i <=  count;i++){
// 		let t:any = {}
// 		t.itemEntryId = reader.readUInt()
// 		t.count = reader.readUShort()
// 		JsUtil.arrayInstert(this.treasureList, t)
// 	}	
// }
// //藏宝阁分配记录
// }
var Message_C2G_FACTION_TREA_HOUSE_RECORD = (function (_super) {
    __extends(Message_C2G_FACTION_TREA_HOUSE_RECORD, _super);
    function Message_C2G_FACTION_TREA_HOUSE_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TREA_HOUSE_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TREA_HOUSE_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TREA_HOUSE_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TREA_HOUSE_RECORD;
}(MessageBase));
__reflect(Message_C2G_FACTION_TREA_HOUSE_RECORD.prototype, "Message_C2G_FACTION_TREA_HOUSE_RECORD");
var Message_G2C_FACTION_TREA_HOUSE_RECORD = (function (_super) {
    __extends(Message_G2C_FACTION_TREA_HOUSE_RECORD, _super);
    function Message_G2C_FACTION_TREA_HOUSE_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TREA_HOUSE_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recordList = {};
    };
    Message_G2C_FACTION_TREA_HOUSE_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TREA_HOUSE_RECORD.prototype.unpack = function (reader) {
        this.recordList = [];
        var count = reader.readUChar();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t[1] = reader.readString();
            t[2] = reader.readUInt();
            t[3] = reader.readUShort();
            t[4] = reader.readUInt();
            JsUtil.arrayInstert(this.recordList, t);
        }
    };
    return Message_G2C_FACTION_TREA_HOUSE_RECORD;
}(MessageBase));
__reflect(Message_G2C_FACTION_TREA_HOUSE_RECORD.prototype, "Message_G2C_FACTION_TREA_HOUSE_RECORD");
var Message_C2G_FACTION_TREA_HOUSE_ALLOCA = (function (_super) {
    __extends(Message_C2G_FACTION_TREA_HOUSE_ALLOCA, _super);
    function Message_C2G_FACTION_TREA_HOUSE_ALLOCA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TREA_HOUSE_ALLOCA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
        this.menberId = 0;
        this.count = 0;
    };
    Message_C2G_FACTION_TREA_HOUSE_ALLOCA.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
        writer.writeUInt(this.menberId);
        writer.writeUShort(this.count);
    };
    Message_C2G_FACTION_TREA_HOUSE_ALLOCA.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TREA_HOUSE_ALLOCA;
}(MessageBase));
__reflect(Message_C2G_FACTION_TREA_HOUSE_ALLOCA.prototype, "Message_C2G_FACTION_TREA_HOUSE_ALLOCA");
var Message_C2G_FACTION_TASK_RANK_INFO = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_RANK_INFO, _super);
    function Message_C2G_FACTION_TASK_RANK_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_RANK_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TASK_RANK_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_RANK_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_RANK_INFO;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_RANK_INFO.prototype, "Message_C2G_FACTION_TASK_RANK_INFO");
var Message_G2C_FACTION_TASK_RANK_INFO = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_RANK_INFO, _super);
    function Message_G2C_FACTION_TASK_RANK_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_RANK_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.facWeekPoint = 0;
        this.firstFacName = "";
    };
    Message_G2C_FACTION_TASK_RANK_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_RANK_INFO.prototype.unpack = function (reader) {
        this.facWeekPoint = reader.readUInt();
        this.firstFacName = reader.readString();
    };
    return Message_G2C_FACTION_TASK_RANK_INFO;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_RANK_INFO.prototype, "Message_G2C_FACTION_TASK_RANK_INFO");
//公会任务结算排行
var Message_C2G_FACTION_TASK_RANK_PRIZE = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_RANK_PRIZE, _super);
    function Message_C2G_FACTION_TASK_RANK_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_RANK_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TASK_RANK_PRIZE.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_RANK_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_RANK_PRIZE;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_RANK_PRIZE.prototype, "Message_C2G_FACTION_TASK_RANK_PRIZE");
var Message_G2C_FACTION_TASK_RANK_PRIZE = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_RANK_PRIZE, _super);
    function Message_G2C_FACTION_TASK_RANK_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_RANK_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rankResultList = [];
    };
    Message_G2C_FACTION_TASK_RANK_PRIZE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_RANK_PRIZE.prototype.unpack = function (reader) {
        this.rankResultList = [];
        var count = reader.readUShort();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.rankIndex = reader.readUChar();
            t.clubId = reader.readUInt();
            JsUtil.arrayInstert(this.rankResultList, t);
        }
    };
    return Message_G2C_FACTION_TASK_RANK_PRIZE;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_RANK_PRIZE.prototype, "Message_G2C_FACTION_TASK_RANK_PRIZE");
//# sourceMappingURL=ClubMessage.js.map