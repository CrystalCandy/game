/*
作者:
   li_an
    
创建时间：
   2014.2.11(周二)

意图：
   好友消息

公共接口：
   
*/
//}
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
//class Message_C2G_FRIEND_LIST extends MessageBase{
//public initObj(...args:any[]):void {
//
//}
//
//pack( writer){
//
//}
//
//unpack( reader){
//
//}
//
var Message_G2C_FRIEND_LIST = (function (_super) {
    __extends(Message_G2C_FRIEND_LIST, _super);
    function Message_G2C_FRIEND_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friend_list = {};
    };
    Message_G2C_FRIEND_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_LIST.prototype.unpack = function (reader) {
        var friend_list = {};
        var friendCount = reader.readUInt();
        for (var i = 1; i <= friendCount; i++) {
            var friendInfo = FriendInfo.newObj();
            friendInfo.read(reader);
            friend_list[friendInfo.roleId] = friendInfo;
        }
        this.friend_list = friend_list;
    };
    return Message_G2C_FRIEND_LIST;
}(MessageBase));
__reflect(Message_G2C_FRIEND_LIST.prototype, "Message_G2C_FRIEND_LIST");
var Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT = (function (_super) {
    __extends(Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT, _super);
    function Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friend_msg_count = [];
        //this.fireEvent = true
        this.isdump = true;
    };
    Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT.prototype.unpack = function (reader) {
        var friend_msg_count = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var friendInfo = FriendInfo.newObj();
            friendInfo.read(reader);
            var packet = {};
            packet.friendInfo = friendInfo;
            packet.channel = reader.readUChar();
            packet.data = reader.readString();
            JsUtil.arrayInstert(friend_msg_count, packet);
        }
        this.friend_msg_count = friend_msg_count;
    };
    return Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT;
}(MessageBase));
__reflect(Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT.prototype, "Message_G2C_FRIEND_OFFLINE_MESSAGE_COUNT");
var Message_G2C_APPLY_FRIEND_INFO = (function (_super) {
    __extends(Message_G2C_APPLY_FRIEND_INFO, _super);
    function Message_G2C_APPLY_FRIEND_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_APPLY_FRIEND_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.stranger_list = [];
        this.fireEvent = true;
    };
    Message_G2C_APPLY_FRIEND_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_APPLY_FRIEND_INFO.prototype.unpack = function (reader) {
        var stranger_list = [];
        var strangerCount = reader.readUInt();
        for (var i = 1; i <= strangerCount; i++) {
            var strangerInfo = FriendInfo.newObj();
            strangerInfo.read(reader);
            JsUtil.arrayInstert(stranger_list, strangerInfo);
        }
        this.stranger_list = stranger_list;
    };
    return Message_G2C_APPLY_FRIEND_INFO;
}(MessageBase));
__reflect(Message_G2C_APPLY_FRIEND_INFO.prototype, "Message_G2C_APPLY_FRIEND_INFO");
var Message_C2G_FRIEND_FIND = (function (_super) {
    __extends(Message_C2G_FRIEND_FIND, _super);
    function Message_C2G_FRIEND_FIND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_FIND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.searchName = "";
        this.sendType = null;
    };
    Message_C2G_FRIEND_FIND.prototype.pack = function (writer) {
        writer.writeString(this.searchName);
        writer.writeUInt(this.sendType);
    };
    Message_C2G_FRIEND_FIND.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_FIND;
}(MessageBase));
__reflect(Message_C2G_FRIEND_FIND.prototype, "Message_C2G_FRIEND_FIND");
var Message_C2G_APPLY_FRIEND_ADD = (function (_super) {
    __extends(Message_C2G_APPLY_FRIEND_ADD, _super);
    function Message_C2G_APPLY_FRIEND_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_APPLY_FRIEND_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId = null;
    };
    Message_C2G_APPLY_FRIEND_ADD.prototype.pack = function (writer) {
        writer.writeUInt(this.playerId);
    };
    Message_C2G_APPLY_FRIEND_ADD.prototype.unpack = function (reader) {
    };
    return Message_C2G_APPLY_FRIEND_ADD;
}(MessageBase));
__reflect(Message_C2G_APPLY_FRIEND_ADD.prototype, "Message_C2G_APPLY_FRIEND_ADD");
var Message_G2C_APPLY_FRIEND_ADD = (function (_super) {
    __extends(Message_G2C_APPLY_FRIEND_ADD, _super);
    function Message_G2C_APPLY_FRIEND_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_APPLY_FRIEND_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.tempFriend = null;
        this.fireEvent = true;
    };
    Message_G2C_APPLY_FRIEND_ADD.prototype.pack = function (writer) {
    };
    Message_G2C_APPLY_FRIEND_ADD.prototype.unpack = function (reader) {
        var friendInfo = FriendInfo.newObj();
        friendInfo.read(reader);
        this.tempFriend = friendInfo;
    };
    return Message_G2C_APPLY_FRIEND_ADD;
}(MessageBase));
__reflect(Message_G2C_APPLY_FRIEND_ADD.prototype, "Message_G2C_APPLY_FRIEND_ADD");
var Message_C2G_APPLY_FRIEND_ADD_AGREE = (function (_super) {
    __extends(Message_C2G_APPLY_FRIEND_ADD_AGREE, _super);
    function Message_C2G_APPLY_FRIEND_ADD_AGREE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_APPLY_FRIEND_ADD_AGREE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendId = null;
        this.isAgree = null;
    };
    Message_C2G_APPLY_FRIEND_ADD_AGREE.prototype.pack = function (writer) {
        writer.writeUInt(this.friendId);
        writer.writeUInt(this.isAgree);
    };
    Message_C2G_APPLY_FRIEND_ADD_AGREE.prototype.unpack = function (reader) {
    };
    return Message_C2G_APPLY_FRIEND_ADD_AGREE;
}(MessageBase));
__reflect(Message_C2G_APPLY_FRIEND_ADD_AGREE.prototype, "Message_C2G_APPLY_FRIEND_ADD_AGREE");
var Message_G2C_APPLY_FRIEND_ADD_AGREE = (function (_super) {
    __extends(Message_G2C_APPLY_FRIEND_ADD_AGREE, _super);
    function Message_G2C_APPLY_FRIEND_ADD_AGREE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_APPLY_FRIEND_ADD_AGREE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendIdToDelete = null;
        this.friendInfo = null;
    };
    Message_G2C_APPLY_FRIEND_ADD_AGREE.prototype.pack = function (writer) {
    };
    Message_G2C_APPLY_FRIEND_ADD_AGREE.prototype.unpack = function (reader) {
        //this.friendIdToDelete=reader.readUInt()
        var friendInfo = FriendInfo.newObj();
        friendInfo.read(reader);
        this.friendInfo = friendInfo;
        this.friendIdToDelete = friendInfo.roleId;
    };
    return Message_G2C_APPLY_FRIEND_ADD_AGREE;
}(MessageBase));
__reflect(Message_G2C_APPLY_FRIEND_ADD_AGREE.prototype, "Message_G2C_APPLY_FRIEND_ADD_AGREE");
var Message_C2G_FRIEND_DEL = (function (_super) {
    __extends(Message_C2G_FRIEND_DEL, _super);
    function Message_C2G_FRIEND_DEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_DEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendIdToDelete = null;
    };
    Message_C2G_FRIEND_DEL.prototype.pack = function (writer) {
        writer.writeUInt(this.friendIdToDelete);
    };
    Message_C2G_FRIEND_DEL.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_DEL;
}(MessageBase));
__reflect(Message_C2G_FRIEND_DEL.prototype, "Message_C2G_FRIEND_DEL");
var Message_G2C_FRIEND_DEL = (function (_super) {
    __extends(Message_G2C_FRIEND_DEL, _super);
    function Message_G2C_FRIEND_DEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_DEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendIdToDelete = null;
    };
    Message_G2C_FRIEND_DEL.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_DEL.prototype.unpack = function (reader) {
        this.friendIdToDelete = reader.readUInt();
    };
    return Message_G2C_FRIEND_DEL;
}(MessageBase));
__reflect(Message_G2C_FRIEND_DEL.prototype, "Message_G2C_FRIEND_DEL");
var Message_G2C_FRIEND_ONLINE = (function (_super) {
    __extends(Message_G2C_FRIEND_ONLINE, _super);
    function Message_G2C_FRIEND_ONLINE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_ONLINE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendId = null;
    };
    Message_G2C_FRIEND_ONLINE.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_ONLINE.prototype.unpack = function (reader) {
        var friendId = reader.readUInt();
        this.friendId = friendId;
    };
    return Message_G2C_FRIEND_ONLINE;
}(MessageBase));
__reflect(Message_G2C_FRIEND_ONLINE.prototype, "Message_G2C_FRIEND_ONLINE");
var Message_G2C_FRIEND_OFFLINE = (function (_super) {
    __extends(Message_G2C_FRIEND_OFFLINE, _super);
    function Message_G2C_FRIEND_OFFLINE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_OFFLINE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendId = null;
    };
    Message_G2C_FRIEND_OFFLINE.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_OFFLINE.prototype.unpack = function (reader) {
        var friendId = reader.readUInt();
        this.friendId = friendId;
    };
    return Message_G2C_FRIEND_OFFLINE;
}(MessageBase));
__reflect(Message_G2C_FRIEND_OFFLINE.prototype, "Message_G2C_FRIEND_OFFLINE");
var Message_C2G_FRIEND_RECOMMEND_FRIENDS = (function (_super) {
    __extends(Message_C2G_FRIEND_RECOMMEND_FRIENDS, _super);
    function Message_C2G_FRIEND_RECOMMEND_FRIENDS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_RECOMMEND_FRIENDS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FRIEND_RECOMMEND_FRIENDS.prototype.pack = function (writer) {
    };
    Message_C2G_FRIEND_RECOMMEND_FRIENDS.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_RECOMMEND_FRIENDS;
}(MessageBase));
__reflect(Message_C2G_FRIEND_RECOMMEND_FRIENDS.prototype, "Message_C2G_FRIEND_RECOMMEND_FRIENDS");
var Message_G2C_FRIEND_RECOMMEND_FRIENDS = (function (_super) {
    __extends(Message_G2C_FRIEND_RECOMMEND_FRIENDS, _super);
    function Message_G2C_FRIEND_RECOMMEND_FRIENDS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_RECOMMEND_FRIENDS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recommendList = [];
    };
    Message_G2C_FRIEND_RECOMMEND_FRIENDS.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_RECOMMEND_FRIENDS.prototype.unpack = function (reader) {
        var recommendList = [];
        var count = reader.readUInt();
        TLog.Debug("Message_G2C_FRIEND_RECOMMEND_FRIENDS", count);
        for (var i = 1; i <= count; i++) {
            var friendInfo = FriendInfo.newObj();
            friendInfo.read(reader);
            JsUtil.arrayInstert(recommendList, friendInfo);
        }
        this.recommendList = recommendList;
    };
    return Message_G2C_FRIEND_RECOMMEND_FRIENDS;
}(MessageBase));
__reflect(Message_G2C_FRIEND_RECOMMEND_FRIENDS.prototype, "Message_G2C_FRIEND_RECOMMEND_FRIENDS");
var Message_C2G_DELETE_RECOMMEND_FRIEND = (function (_super) {
    __extends(Message_C2G_DELETE_RECOMMEND_FRIEND, _super);
    function Message_C2G_DELETE_RECOMMEND_FRIEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_DELETE_RECOMMEND_FRIEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.deleteID = null;
    };
    Message_C2G_DELETE_RECOMMEND_FRIEND.prototype.pack = function (writer) {
        writer.writeUInt(this.deleteID);
    };
    Message_C2G_DELETE_RECOMMEND_FRIEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_DELETE_RECOMMEND_FRIEND;
}(MessageBase));
__reflect(Message_C2G_DELETE_RECOMMEND_FRIEND.prototype, "Message_C2G_DELETE_RECOMMEND_FRIEND");
var Message_G2C_DELETE_RECOMMEND_FRIEND = (function (_super) {
    __extends(Message_G2C_DELETE_RECOMMEND_FRIEND, _super);
    function Message_G2C_DELETE_RECOMMEND_FRIEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_DELETE_RECOMMEND_FRIEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.deleteID= null
    };
    Message_G2C_DELETE_RECOMMEND_FRIEND.prototype.pack = function (writer) {
        //writer.writeUInt(this.deleteID)
    };
    Message_G2C_DELETE_RECOMMEND_FRIEND.prototype.unpack = function (reader) {
    };
    return Message_G2C_DELETE_RECOMMEND_FRIEND;
}(MessageBase));
__reflect(Message_G2C_DELETE_RECOMMEND_FRIEND.prototype, "Message_G2C_DELETE_RECOMMEND_FRIEND");
var Message_G2C_FRIEND_SINGLE_INFO = (function (_super) {
    __extends(Message_G2C_FRIEND_SINGLE_INFO, _super);
    function Message_G2C_FRIEND_SINGLE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_SINGLE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.tempFriend = null;
        this.getSendType = null;
    };
    Message_G2C_FRIEND_SINGLE_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_SINGLE_INFO.prototype.unpack = function (reader) {
        this.tempFriend = StrangerInfo.newObj();
        this.tempFriend.roleId = reader.readUInt();
        this.tempFriend.roleName = reader.readString();
        this.tempFriend.vocation = reader.readUInt();
        this.tempFriend.sexId = reader.readUChar();
        this.tempFriend.factionName = reader.readString();
        this.tempFriend.level = reader.readUInt();
        //this.tempFriend.VipLevel=reader.readUInt()
    };
    return Message_G2C_FRIEND_SINGLE_INFO;
}(MessageBase));
__reflect(Message_G2C_FRIEND_SINGLE_INFO.prototype, "Message_G2C_FRIEND_SINGLE_INFO");
var Message_C2G_FRIEND_SEND_MESSAGE_ONE = (function (_super) {
    __extends(Message_C2G_FRIEND_SEND_MESSAGE_ONE, _super);
    function Message_C2G_FRIEND_SEND_MESSAGE_ONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_SEND_MESSAGE_ONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.receiverId = null;
        this.data = null;
    };
    Message_C2G_FRIEND_SEND_MESSAGE_ONE.prototype.pack = function (writer) {
        writer.writeUInt(this.receiverId);
        writer.writeString(this.data);
    };
    Message_C2G_FRIEND_SEND_MESSAGE_ONE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_SEND_MESSAGE_ONE;
}(MessageBase));
__reflect(Message_C2G_FRIEND_SEND_MESSAGE_ONE.prototype, "Message_C2G_FRIEND_SEND_MESSAGE_ONE");
var Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS = (function (_super) {
    __extends(Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS, _super);
    function Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.succeed = 0;
    };
    Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS.prototype.unpack = function (reader) {
        this.succeed = reader.readUInt();
    };
    return Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS;
}(MessageBase));
__reflect(Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS.prototype, "Message_G2C_FRIEND_SEND_MESSAGE_SUCCESS");
var Message_G2C_STRANGER_INFO = (function (_super) {
    __extends(Message_G2C_STRANGER_INFO, _super);
    function Message_G2C_STRANGER_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_STRANGER_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chat_stranger = null;
    };
    Message_G2C_STRANGER_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_STRANGER_INFO.prototype.unpack = function (reader) {
        var chat_stranger = FriendInfo.newObj();
        chat_stranger.read(reader);
        this.chat_stranger = chat_stranger;
    };
    return Message_G2C_STRANGER_INFO;
}(MessageBase));
__reflect(Message_G2C_STRANGER_INFO.prototype, "Message_G2C_STRANGER_INFO");
var Message_C2G_PLAYER_SET_CARD = (function (_super) {
    __extends(Message_C2G_PLAYER_SET_CARD, _super);
    function Message_C2G_PLAYER_SET_CARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAYER_SET_CARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.str_QQ = null;
        this.str_WeChat = null;
        this.isShow = null;
        this.str_Phone = null;
    };
    Message_C2G_PLAYER_SET_CARD.prototype.pack = function (writer) {
        writer.writeUInt(this.isShow);
        writer.writeString(this.str_QQ);
        writer.writeString(this.str_WeChat);
        writer.writeString(this.str_Phone);
    };
    Message_C2G_PLAYER_SET_CARD.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAYER_SET_CARD;
}(MessageBase));
__reflect(Message_C2G_PLAYER_SET_CARD.prototype, "Message_C2G_PLAYER_SET_CARD");
var Message_G2C_PLAYER_SET_CARD = (function (_super) {
    __extends(Message_G2C_PLAYER_SET_CARD, _super);
    function Message_G2C_PLAYER_SET_CARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PLAYER_SET_CARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //没数据返回，有返回就是成功 
    };
    Message_G2C_PLAYER_SET_CARD.prototype.pack = function (writer) {
        writer.writeString(this.str_QQ);
        writer.writeString(this.str_WeChat);
    };
    Message_G2C_PLAYER_SET_CARD.prototype.unpack = function (reader) {
    };
    return Message_G2C_PLAYER_SET_CARD;
}(MessageBase));
__reflect(Message_G2C_PLAYER_SET_CARD.prototype, "Message_G2C_PLAYER_SET_CARD");
var Message_C2G_PLAYER_GET_CARD = (function (_super) {
    __extends(Message_C2G_PLAYER_GET_CARD, _super);
    function Message_C2G_PLAYER_GET_CARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAYER_GET_CARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerName = null; //名字或者ID
    };
    Message_C2G_PLAYER_GET_CARD.prototype.pack = function (writer) {
        writer.writeString(this.playerName);
    };
    Message_C2G_PLAYER_GET_CARD.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAYER_GET_CARD;
}(MessageBase));
__reflect(Message_C2G_PLAYER_GET_CARD.prototype, "Message_C2G_PLAYER_GET_CARD");
var Message_G2C_PLAYER_GET_CARD = (function (_super) {
    __extends(Message_G2C_PLAYER_GET_CARD, _super);
    function Message_G2C_PLAYER_GET_CARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PLAYER_GET_CARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerID = null; //名字或者ID
        this.playerCardInfo = null;
    };
    Message_G2C_PLAYER_GET_CARD.prototype.pack = function (writer) {
    };
    Message_G2C_PLAYER_GET_CARD.prototype.unpack = function (reader) {
        this.playerID = reader.readUInt();
        var str = reader.readString();
        //TLog.Debug(str)
        this.playerCardInfo = table_load(str);
    };
    return Message_G2C_PLAYER_GET_CARD;
}(MessageBase));
__reflect(Message_G2C_PLAYER_GET_CARD.prototype, "Message_G2C_PLAYER_GET_CARD");
var Message_C2G_ROLE_ADD_BLACK_ROLE = (function (_super) {
    __extends(Message_C2G_ROLE_ADD_BLACK_ROLE, _super);
    function Message_C2G_ROLE_ADD_BLACK_ROLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_ADD_BLACK_ROLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerID = null;
        this.playerName = null;
    };
    Message_C2G_ROLE_ADD_BLACK_ROLE.prototype.pack = function (writer) {
        writer.writeUInt(this.playerID);
        writer.writeString(this.playerName);
    };
    Message_C2G_ROLE_ADD_BLACK_ROLE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_ADD_BLACK_ROLE;
}(MessageBase));
__reflect(Message_C2G_ROLE_ADD_BLACK_ROLE.prototype, "Message_C2G_ROLE_ADD_BLACK_ROLE");
var Message_C2G_ROLE_REMOVE_BLACK_ROLE = (function (_super) {
    __extends(Message_C2G_ROLE_REMOVE_BLACK_ROLE, _super);
    function Message_C2G_ROLE_REMOVE_BLACK_ROLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_REMOVE_BLACK_ROLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerID = null;
    };
    Message_C2G_ROLE_REMOVE_BLACK_ROLE.prototype.pack = function (writer) {
        writer.writeUInt(this.playerID);
    };
    Message_C2G_ROLE_REMOVE_BLACK_ROLE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_REMOVE_BLACK_ROLE;
}(MessageBase));
__reflect(Message_C2G_ROLE_REMOVE_BLACK_ROLE.prototype, "Message_C2G_ROLE_REMOVE_BLACK_ROLE");
var Message_C2G_ROLE_REQUEST_BLACK_ROLE = (function (_super) {
    __extends(Message_C2G_ROLE_REQUEST_BLACK_ROLE, _super);
    function Message_C2G_ROLE_REQUEST_BLACK_ROLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_REQUEST_BLACK_ROLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_REQUEST_BLACK_ROLE.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_REQUEST_BLACK_ROLE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_REQUEST_BLACK_ROLE;
}(MessageBase));
__reflect(Message_C2G_ROLE_REQUEST_BLACK_ROLE.prototype, "Message_C2G_ROLE_REQUEST_BLACK_ROLE");
var Message_G2C_ROLE_RESONPD_BLACK_ROLE = (function (_super) {
    __extends(Message_G2C_ROLE_RESONPD_BLACK_ROLE, _super);
    function Message_G2C_ROLE_RESONPD_BLACK_ROLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_RESONPD_BLACK_ROLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.blackList = null;
    };
    Message_G2C_ROLE_RESONPD_BLACK_ROLE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_RESONPD_BLACK_ROLE.prototype.unpack = function (reader) {
        this.blackList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_RESONPD_BLACK_ROLE;
}(MessageBase));
__reflect(Message_G2C_ROLE_RESONPD_BLACK_ROLE.prototype, "Message_G2C_ROLE_RESONPD_BLACK_ROLE");
var Message_C2G_REJECT_FRIEND_ADD = (function (_super) {
    __extends(Message_C2G_REJECT_FRIEND_ADD, _super);
    function Message_C2G_REJECT_FRIEND_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_REJECT_FRIEND_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.sendStatus = null;
    };
    Message_C2G_REJECT_FRIEND_ADD.prototype.pack = function (writer) {
        writer.writeUShort(this.sendStatus);
    };
    Message_C2G_REJECT_FRIEND_ADD.prototype.unpack = function (reader) {
    };
    return Message_C2G_REJECT_FRIEND_ADD;
}(MessageBase));
__reflect(Message_C2G_REJECT_FRIEND_ADD.prototype, "Message_C2G_REJECT_FRIEND_ADD");
var Message_C2G_REJECT_FRIEND_ADD_STATE = (function (_super) {
    __extends(Message_C2G_REJECT_FRIEND_ADD_STATE, _super);
    function Message_C2G_REJECT_FRIEND_ADD_STATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_REJECT_FRIEND_ADD_STATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_REJECT_FRIEND_ADD_STATE.prototype.pack = function (writer) {
    };
    Message_C2G_REJECT_FRIEND_ADD_STATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_REJECT_FRIEND_ADD_STATE;
}(MessageBase));
__reflect(Message_C2G_REJECT_FRIEND_ADD_STATE.prototype, "Message_C2G_REJECT_FRIEND_ADD_STATE");
var Message_G2C_REJECT_FRIEND_ADD = (function (_super) {
    __extends(Message_G2C_REJECT_FRIEND_ADD, _super);
    function Message_G2C_REJECT_FRIEND_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_REJECT_FRIEND_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.getServerAddType = null;
    };
    Message_G2C_REJECT_FRIEND_ADD.prototype.pack = function (writer) {
    };
    Message_G2C_REJECT_FRIEND_ADD.prototype.unpack = function (reader) {
        this.getServerAddType = reader.readUShort();
    };
    return Message_G2C_REJECT_FRIEND_ADD;
}(MessageBase));
__reflect(Message_G2C_REJECT_FRIEND_ADD.prototype, "Message_G2C_REJECT_FRIEND_ADD");
var Message_C2G_CHAT_GROUP_CREATE = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_CREATE, _super);
    function Message_C2G_CHAT_GROUP_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_CHAT_GROUP_CREATE.prototype.pack = function (writer) {
    };
    Message_C2G_CHAT_GROUP_CREATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_CREATE;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_CREATE.prototype, "Message_C2G_CHAT_GROUP_CREATE");
var Message_G2C_CHAT_GROUP_CREATE = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_CREATE, _super);
    function Message_G2C_CHAT_GROUP_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = 0;
    };
    Message_G2C_CHAT_GROUP_CREATE.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_CREATE.prototype.unpack = function (reader) {
        this.groupId = reader.readUInt();
    };
    return Message_G2C_CHAT_GROUP_CREATE;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_CREATE.prototype, "Message_G2C_CHAT_GROUP_CREATE");
var Message_G2C_CHAT_GROUP_UPDATE_INFO = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_UPDATE_INFO, _super);
    function Message_G2C_CHAT_GROUP_UPDATE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_UPDATE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupid = null;
        this.masterid = null;
        this.mastername = "";
        this.masterbody = "";
        this.createtime = "";
        this.lastchat = null;
    };
    Message_G2C_CHAT_GROUP_UPDATE_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_UPDATE_INFO.prototype.unpack = function (reader) {
        this.groupid = reader.readUInt();
        this.masterid = reader.readUInt();
        this.mastername = reader.readString();
        this.masterbody = reader.readString();
        this.createtime = reader.readString();
        this.lastchat = reader.readUInt();
        this.messagetable = [];
        JsUtil.arrayInstert(this.messagetable, this.groupid);
        JsUtil.arrayInstert(this.messagetable, this.masterid);
        JsUtil.arrayInstert(this.messagetable, this.mastername);
        JsUtil.arrayInstert(this.messagetable, this.masterbody);
        JsUtil.arrayInstert(this.messagetable, this.createtime);
        JsUtil.arrayInstert(this.messagetable, this.lastchat);
    };
    return Message_G2C_CHAT_GROUP_UPDATE_INFO;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_UPDATE_INFO.prototype, "Message_G2C_CHAT_GROUP_UPDATE_INFO");
var Message_C2G_CHAT_GROUP_QUERY_MEMBERS = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_QUERY_MEMBERS, _super);
    function Message_C2G_CHAT_GROUP_QUERY_MEMBERS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_QUERY_MEMBERS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = 0;
    };
    Message_C2G_CHAT_GROUP_QUERY_MEMBERS.prototype.pack = function (writer) {
        writer.writeUInt(this.groupId);
    };
    Message_C2G_CHAT_GROUP_QUERY_MEMBERS.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_QUERY_MEMBERS;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_QUERY_MEMBERS.prototype, "Message_C2G_CHAT_GROUP_QUERY_MEMBERS");
var Message_G2C_CHAT_GROUP_QUERY_MEMBERS = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_QUERY_MEMBERS, _super);
    function Message_G2C_CHAT_GROUP_QUERY_MEMBERS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_QUERY_MEMBERS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.members = [];
        this.membersCount = 0;
    };
    Message_G2C_CHAT_GROUP_QUERY_MEMBERS.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_QUERY_MEMBERS.prototype.unpack = function (reader) {
        this.members = [];
        this.membersCount = 0;
        this.membersCount = reader.readUInt();
        this.groupid = reader.readUInt();
        for (var i = 1; i <= this.membersCount; i++) {
            var list = {};
            list["memberId"] = reader.readUInt();
            list["memberbody"] = reader.readUInt();
            list["memberlv"] = reader.readUInt();
            list["memberVipLevel"] = reader.readUInt();
            list["membergroupPost"] = reader.readUInt();
            list["memberlogoutTime"] = reader.readUInt();
            list["membername"] = reader.readString();
            list["menberyuanfen"] = reader.readUInt();
            list["faction"] = reader.readString();
            JsUtil.arrayInstert(this.members, list);
        }
    };
    return Message_G2C_CHAT_GROUP_QUERY_MEMBERS;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_QUERY_MEMBERS.prototype, "Message_G2C_CHAT_GROUP_QUERY_MEMBERS");
var Message_C2G_CHAT_GROUP_INVITE_JOIN = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_INVITE_JOIN, _super);
    function Message_C2G_CHAT_GROUP_INVITE_JOIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_INVITE_JOIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = null;
        this.inviteList = {};
    };
    Message_C2G_CHAT_GROUP_INVITE_JOIN.prototype.pack = function (writer) {
        writer.writeUInt(this.groupId);
        writer.writeString(table_save(this.inviteList));
    };
    Message_C2G_CHAT_GROUP_INVITE_JOIN.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_INVITE_JOIN;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_INVITE_JOIN.prototype, "Message_C2G_CHAT_GROUP_INVITE_JOIN");
var Message_G2C_CHAT_GROUP_INVITE_JOIN = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_INVITE_JOIN, _super);
    function Message_G2C_CHAT_GROUP_INVITE_JOIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_INVITE_JOIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bodyId = null;
        this.inviteName = "";
        this.chatGroupid = null;
        this.chatGroupName = "";
    };
    Message_G2C_CHAT_GROUP_INVITE_JOIN.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_INVITE_JOIN.prototype.unpack = function (reader) {
        this.bodyId = reader.readUInt();
        this.inviteName = reader.readString();
        this.chatGroupid = reader.readUInt();
        this.chatGroupName = reader.readString();
        this.messageList = [];
        JsUtil.arrayInstert(this.messageList, this.bodyId);
        JsUtil.arrayInstert(this.messageList, this.inviteName);
        JsUtil.arrayInstert(this.messageList, this.chatGroupid);
        JsUtil.arrayInstert(this.messageList, this.chatGroupName);
    };
    return Message_G2C_CHAT_GROUP_INVITE_JOIN;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_INVITE_JOIN.prototype, "Message_G2C_CHAT_GROUP_INVITE_JOIN");
var Message_C2G_CHAT_GROUP_AGREE_JOIN = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_AGREE_JOIN, _super);
    function Message_C2G_CHAT_GROUP_AGREE_JOIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_AGREE_JOIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = null;
        this.agree = null;
    };
    Message_C2G_CHAT_GROUP_AGREE_JOIN.prototype.pack = function (writer) {
        writer.writeUInt(this.groupId);
        writer.writeUInt(this.agree);
    };
    Message_C2G_CHAT_GROUP_AGREE_JOIN.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_AGREE_JOIN;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_AGREE_JOIN.prototype, "Message_C2G_CHAT_GROUP_AGREE_JOIN");
var Message_G2C_CHAT_GROUP_AGREE_JOIN = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_AGREE_JOIN, _super);
    function Message_G2C_CHAT_GROUP_AGREE_JOIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_AGREE_JOIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = null;
    };
    Message_G2C_CHAT_GROUP_AGREE_JOIN.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_AGREE_JOIN.prototype.unpack = function (reader) {
        this.groupId = reader.readUInt();
    };
    return Message_G2C_CHAT_GROUP_AGREE_JOIN;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_AGREE_JOIN.prototype, "Message_G2C_CHAT_GROUP_AGREE_JOIN");
var Message_C2G_CHAT_GROUP_QUIT = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_QUIT, _super);
    function Message_C2G_CHAT_GROUP_QUIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_QUIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = 0;
    };
    Message_C2G_CHAT_GROUP_QUIT.prototype.pack = function (writer) {
        writer.writeUInt(this.groupId);
    };
    Message_C2G_CHAT_GROUP_QUIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_QUIT;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_QUIT.prototype, "Message_C2G_CHAT_GROUP_QUIT");
var Message_G2C_CHAT_GROUP_QUIT = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_QUIT, _super);
    function Message_G2C_CHAT_GROUP_QUIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_QUIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = 0;
    };
    Message_G2C_CHAT_GROUP_QUIT.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_QUIT.prototype.unpack = function (reader) {
        this.groupId = reader.readUInt();
    };
    return Message_G2C_CHAT_GROUP_QUIT;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_QUIT.prototype, "Message_G2C_CHAT_GROUP_QUIT");
var Message_G2C_CHAT_GROUP_EXPELEE = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_EXPELEE, _super);
    function Message_G2C_CHAT_GROUP_EXPELEE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_EXPELEE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupid = 0;
    };
    Message_G2C_CHAT_GROUP_EXPELEE.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_EXPELEE.prototype.unpack = function (reader) {
        this.groupid = reader.readUInt();
    };
    return Message_G2C_CHAT_GROUP_EXPELEE;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_EXPELEE.prototype, "Message_G2C_CHAT_GROUP_EXPELEE");
var Message_C2G_CHAT_GROUP_EXPELEE = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_EXPELEE, _super);
    function Message_C2G_CHAT_GROUP_EXPELEE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_EXPELEE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupid = 0;
        this.expeleeid = 0;
    };
    Message_C2G_CHAT_GROUP_EXPELEE.prototype.pack = function (writer) {
        writer.writeUInt(this.groupid);
        writer.writeUInt(this.expeleeid);
    };
    Message_C2G_CHAT_GROUP_EXPELEE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_EXPELEE;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_EXPELEE.prototype, "Message_C2G_CHAT_GROUP_EXPELEE");
var Message_C2G_CHAT_GROUP_CHAT = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_CHAT, _super);
    function Message_C2G_CHAT_GROUP_CHAT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_CHAT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_CHAT_GROUP_CHAT.prototype.pack = function (writer) {
    };
    Message_C2G_CHAT_GROUP_CHAT.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_CHAT;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_CHAT.prototype, "Message_C2G_CHAT_GROUP_CHAT");
var Message_G2C_CHAT_GROUP_CHAT = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_CHAT, _super);
    function Message_G2C_CHAT_GROUP_CHAT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_CHAT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupContent = {};
    };
    Message_G2C_CHAT_GROUP_CHAT.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_CHAT.prototype.unpack = function (reader) {
        //客户端对讨论组的处理跟stranger一样，但由于讨论组id可能与正常角色的id重合，
        //所以客户端的讨论组id自动转存为负值
        var t = {};
        t.playerId = reader.readUInt(); //发言人id
        t.playerName = reader.readString(); //发言者名字
        t.body = reader.readUInt(); //发言人头像
        t.VipLevel = reader.readUInt(); //发言人vip等级
        t.channel = reader.readUChar(); //频道类型
        t.data = reader.readString(); //聊天内容
        t.serverId = reader.readUInt(); //服务器id
        t.fromFriendId = -1 * (reader.readUInt()); //讨论组id
        t.roleName = reader.readString(); //创建者名字，用于显示讨论组名称用
        t.time = GetServerTime(); //时间
        var t1 = {};
        t1.playerId = t.playerId; //发言人id
        t1.body = t.body; //发言人头像
        t1.VipLevel = t.VipLevel; //发言人vip等级
        t1.channel = t.channel; //频道类型
        t1.playerName = t.playerName; //发言人名字
        t.extentData = t1;
        this.groupContent = t;
        //this.fromFriendId=reader.readUInt()
        //this.data=reader.readString()
        //this.time=reader.readUInt()
    };
    return Message_G2C_CHAT_GROUP_CHAT;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_CHAT.prototype, "Message_G2C_CHAT_GROUP_CHAT");
var Message_C2G_CHAT_GROUP_LIST = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_LIST, _super);
    function Message_C2G_CHAT_GROUP_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_CHAT_GROUP_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_CHAT_GROUP_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_LIST;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_LIST.prototype, "Message_C2G_CHAT_GROUP_LIST");
var Message_G2C_CHAT_GROUP_LIST = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_LIST, _super);
    function Message_G2C_CHAT_GROUP_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.GroupCount = 0;
        this.GroupList = [];
    };
    Message_G2C_CHAT_GROUP_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_LIST.prototype.unpack = function (reader) {
        this.GroupCount = reader.readUInt();
        this.GroupList = [];
        for (var i = 1; i <= this.GroupCount; i++) {
            var list = {};
            list["groupid"] = reader.readUInt();
            list["createrid"] = reader.readUInt();
            list["creatername"] = reader.readString();
            list["createrbody"] = reader.readUInt();
            list["createtime"] = reader.readUInt();
            list["lasttime"] = reader.readUInt();
            JsUtil.arrayInstert(this.GroupList, list);
        }
    };
    return Message_G2C_CHAT_GROUP_LIST;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_LIST.prototype, "Message_G2C_CHAT_GROUP_LIST");
var Message_G2C_NO_TROUBLE_SETTING = (function (_super) {
    __extends(Message_G2C_NO_TROUBLE_SETTING, _super);
    function Message_G2C_NO_TROUBLE_SETTING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_NO_TROUBLE_SETTING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupList = {};
    };
    Message_G2C_NO_TROUBLE_SETTING.prototype.pack = function (writer) {
    };
    Message_G2C_NO_TROUBLE_SETTING.prototype.unpack = function (reader) {
        this.groupList = table_load(reader.readString());
    };
    return Message_G2C_NO_TROUBLE_SETTING;
}(MessageBase));
__reflect(Message_G2C_NO_TROUBLE_SETTING.prototype, "Message_G2C_NO_TROUBLE_SETTING");
var Message_C2G_NO_TROUBLE_SETTING = (function (_super) {
    __extends(Message_C2G_NO_TROUBLE_SETTING, _super);
    function Message_C2G_NO_TROUBLE_SETTING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_NO_TROUBLE_SETTING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mode = 0;
        this.GroupId = 0;
    };
    Message_C2G_NO_TROUBLE_SETTING.prototype.pack = function (writer) {
        writer.writeUInt(this.mode);
        writer.writeUInt(this.GroupId);
    };
    Message_C2G_NO_TROUBLE_SETTING.prototype.unpack = function (reader) {
    };
    return Message_C2G_NO_TROUBLE_SETTING;
}(MessageBase));
__reflect(Message_C2G_NO_TROUBLE_SETTING.prototype, "Message_C2G_NO_TROUBLE_SETTING");
var Message_G2C_SELECT_NO_TROUBLE_SETTING = (function (_super) {
    __extends(Message_G2C_SELECT_NO_TROUBLE_SETTING, _super);
    function Message_G2C_SELECT_NO_TROUBLE_SETTING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_SELECT_NO_TROUBLE_SETTING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_SELECT_NO_TROUBLE_SETTING.prototype.pack = function (writer) {
    };
    Message_G2C_SELECT_NO_TROUBLE_SETTING.prototype.unpack = function (reader) {
        this.groupList = table_load(reader.readString());
    };
    return Message_G2C_SELECT_NO_TROUBLE_SETTING;
}(MessageBase));
__reflect(Message_G2C_SELECT_NO_TROUBLE_SETTING.prototype, "Message_G2C_SELECT_NO_TROUBLE_SETTING");
var Message_C2G_SELECT_NO_TROUBLE_SETTING = (function (_super) {
    __extends(Message_C2G_SELECT_NO_TROUBLE_SETTING, _super);
    function Message_C2G_SELECT_NO_TROUBLE_SETTING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SELECT_NO_TROUBLE_SETTING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_SELECT_NO_TROUBLE_SETTING.prototype.pack = function (writer) {
    };
    Message_C2G_SELECT_NO_TROUBLE_SETTING.prototype.unpack = function (reader) {
    };
    return Message_C2G_SELECT_NO_TROUBLE_SETTING;
}(MessageBase));
__reflect(Message_C2G_SELECT_NO_TROUBLE_SETTING.prototype, "Message_C2G_SELECT_NO_TROUBLE_SETTING");
var Message_C2G_CHAT_GROUP_INVITE_LIST = (function (_super) {
    __extends(Message_C2G_CHAT_GROUP_INVITE_LIST, _super);
    function Message_C2G_CHAT_GROUP_INVITE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAT_GROUP_INVITE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_CHAT_GROUP_INVITE_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_CHAT_GROUP_INVITE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAT_GROUP_INVITE_LIST;
}(MessageBase));
__reflect(Message_C2G_CHAT_GROUP_INVITE_LIST.prototype, "Message_C2G_CHAT_GROUP_INVITE_LIST");
var Message_G2C_CHAT_GROUP_INVITE_LIST = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_INVITE_LIST, _super);
    function Message_G2C_CHAT_GROUP_INVITE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_INVITE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteCount = 0;
        this.inviteList = {};
        this.fireEvent = true;
    };
    Message_G2C_CHAT_GROUP_INVITE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_INVITE_LIST.prototype.unpack = function (reader) {
        this.inviteList = {};
        this.inviteCount = reader.readUInt();
        for (var i = 1; i <= this.inviteCount; i++) {
            var list = [];
            var body = reader.readUInt();
            var inviteName = reader.readString();
            var groupid = reader.readUInt();
            var masterName = reader.readString();
            var inviterLv = reader.readUInt();
            JsUtil.arrayInstert(list, body);
            JsUtil.arrayInstert(list, inviteName);
            JsUtil.arrayInstert(list, groupid);
            JsUtil.arrayInstert(list, masterName);
            JsUtil.arrayInstert(list, inviterLv);
            JsUtil.arrayInstert(this.inviteList, list);
        }
    };
    return Message_G2C_CHAT_GROUP_INVITE_LIST;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_INVITE_LIST.prototype, "Message_G2C_CHAT_GROUP_INVITE_LIST");
var Message_G2C_CHAT_GROUP_REALSE = (function (_super) {
    __extends(Message_G2C_CHAT_GROUP_REALSE, _super);
    function Message_G2C_CHAT_GROUP_REALSE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAT_GROUP_REALSE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.groupId = 0;
    };
    Message_G2C_CHAT_GROUP_REALSE.prototype.pack = function (writer) {
    };
    Message_G2C_CHAT_GROUP_REALSE.prototype.unpack = function (reader) {
        this.groupId = reader.readUInt();
    };
    return Message_G2C_CHAT_GROUP_REALSE;
}(MessageBase));
__reflect(Message_G2C_CHAT_GROUP_REALSE.prototype, "Message_G2C_CHAT_GROUP_REALSE");
var Message_C2G_FRIEND_INFO_REQUEST = (function (_super) {
    __extends(Message_C2G_FRIEND_INFO_REQUEST, _super);
    function Message_C2G_FRIEND_INFO_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_INFO_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FRIEND_INFO_REQUEST.prototype.pack = function (writer) {
    };
    Message_C2G_FRIEND_INFO_REQUEST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_INFO_REQUEST;
}(MessageBase));
__reflect(Message_C2G_FRIEND_INFO_REQUEST.prototype, "Message_C2G_FRIEND_INFO_REQUEST");
//赠送体力
var Message_C2G_FRIEND_GIVE_ITEM = (function (_super) {
    __extends(Message_C2G_FRIEND_GIVE_ITEM, _super);
    function Message_C2G_FRIEND_GIVE_ITEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_GIVE_ITEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.friendId = 0
        this.friendIdList = {};
    };
    Message_C2G_FRIEND_GIVE_ITEM.prototype.pack = function (writer) {
        //writer.writeUInt(this.friendId)
        writer.writeString(table_save(this.friendIdList));
    };
    Message_C2G_FRIEND_GIVE_ITEM.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_GIVE_ITEM;
}(MessageBase));
__reflect(Message_C2G_FRIEND_GIVE_ITEM.prototype, "Message_C2G_FRIEND_GIVE_ITEM");
var Message_G2C_FRIEND_GIVE_ITEM = (function (_super) {
    __extends(Message_G2C_FRIEND_GIVE_ITEM, _super);
    function Message_G2C_FRIEND_GIVE_ITEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_GIVE_ITEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendIdList = {};
    };
    Message_G2C_FRIEND_GIVE_ITEM.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_GIVE_ITEM.prototype.unpack = function (reader) {
        this.friendIdList = table_load(reader.readString());
    };
    return Message_G2C_FRIEND_GIVE_ITEM;
}(MessageBase));
__reflect(Message_G2C_FRIEND_GIVE_ITEM.prototype, "Message_G2C_FRIEND_GIVE_ITEM");
var Message_C2G_FRIEND_GIVE_ITEM_RECORD = (function (_super) {
    __extends(Message_C2G_FRIEND_GIVE_ITEM_RECORD, _super);
    function Message_C2G_FRIEND_GIVE_ITEM_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_GIVE_ITEM_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FRIEND_GIVE_ITEM_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_FRIEND_GIVE_ITEM_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_GIVE_ITEM_RECORD;
}(MessageBase));
__reflect(Message_C2G_FRIEND_GIVE_ITEM_RECORD.prototype, "Message_C2G_FRIEND_GIVE_ITEM_RECORD");
//某个好友的信息更新
var Message_G2C_FRIEND_UPPDATE_INFO = (function (_super) {
    __extends(Message_G2C_FRIEND_UPPDATE_INFO, _super);
    function Message_G2C_FRIEND_UPPDATE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_UPPDATE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendInfo = null;
    };
    Message_G2C_FRIEND_UPPDATE_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_UPPDATE_INFO.prototype.unpack = function (reader) {
        var friendInfo = FriendInfo.newObj();
        friendInfo.read(reader);
        this.friendInfo = friendInfo;
    };
    return Message_G2C_FRIEND_UPPDATE_INFO;
}(MessageBase));
__reflect(Message_G2C_FRIEND_UPPDATE_INFO.prototype, "Message_G2C_FRIEND_UPPDATE_INFO");
//# sourceMappingURL=FriendMessage.js.map