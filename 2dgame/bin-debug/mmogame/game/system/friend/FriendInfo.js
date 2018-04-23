/*
作者:
    LiRong
    
创建时间：
    2014.08.28(星期四)

意图：
    好友信息

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
var StrangerInfo = (function (_super) {
    __extends(StrangerInfo, _super);
    function StrangerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrangerInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = args[0];
        this.roleName = args[1] || "";
        this.vocation = args[2] || 0;
        this.icon = args[3] || "";
        this.sexId = args[4] || 0;
        this.VipLevel = args[5] || 0;
        this.level = args[6] || 0;
        this.isOnline = 1;
        this.factionName = "";
    };
    return StrangerInfo;
}(TClass));
__reflect(StrangerInfo.prototype, "StrangerInfo");
var FriendInfo = (function (_super) {
    __extends(FriendInfo, _super);
    function FriendInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FriendInfo.prototype.read = function (reader) {
        this.roleId = reader.readUInt();
        var friendInfo = table_load(reader.readString());
        this.roleName = friendInfo[friendTableOption.NAME];
        this.level = friendInfo[friendTableOption.LEVEL];
        this.factionName = friendInfo[friendTableOption.FACTION];
        this.vocation = friendInfo[friendTableOption.VOCATION]; //职业
        this.friendShip = friendInfo[friendTableOption.FRIENDSHIP];
        this.groupId = friendInfo[friendTableOption.GROUPID];
        this.state = friendInfo[friendTableOption.STATE];
        this.isOnline = friendInfo[friendTableOption.ISONLINE];
        this.force = friendInfo[friendTableOption.FORCE];
        this.faction = friendInfo[friendTableOption.FACTION];
        this.sexId = friendInfo[friendTableOption.SEX];
        this.icon = friendInfo[friendTableOption.ICON];
        this.VipLevel = friendInfo[friendTableOption.VIPLEVEL] || 0;
    };
    FriendInfo.prototype.write = function (writer) {
    };
    return FriendInfo;
}(StrangerInfo));
__reflect(FriendInfo.prototype, "FriendInfo");
/*
作者:
    LiRong
    
创建时间：
    2014.09.01(星期一)

意图：
    接收离线消息

公共接口：
    
*/
var MessageInfo = (function (_super) {
    __extends(MessageInfo, _super);
    function MessageInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fromFriendId = args[0] || 0;
        this.data = args[1] || "";
        this.time = args[2] || 0;
        this.roleName = args[3] || "";
        this.VipLevel = args[4] || 0;
        this.chatBubbleType = args[5] || 0;
        this.icon = "";
        this.vocation = 0;
        this.sexId = 0;
        this.isSelfSend = false;
        this.readState = 0;
        this.MsgType = null;
    };
    MessageInfo.prototype.setIconInfo = function (icon, vocation, sexId) {
        this.icon = icon || "";
        this.vocation = vocation;
        this.sexId = sexId;
    };
    return MessageInfo;
}(TClass));
__reflect(MessageInfo.prototype, "MessageInfo");
//# sourceMappingURL=FriendInfo.js.map