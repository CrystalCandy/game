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
/*
作者:
   li_an
    
创建时间：
   2014.2.11(周二)

意图：
   好友消息

公共接口：
   
*/
var FriendMessageHandler = (function (_super) {
    __extends(FriendMessageHandler, _super);
    function FriendMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.register(opCodes.G2C_FRIEND_LIST, this.onRecvG2C_FRIEND_LIST, this); //更新好友列表
        this.register(opCodes.G2C_APPLY_FRIEND_ADD, this.onRecvG2C_APPLY_FRIEND_ADD, this); //好友申请	
        this.register(opCodes.G2C_APPLY_FRIEND_INFO, this.onRecvG2C_APPLY_FRIEND_INFO, this); //好友申请列表
        this.register(opCodes.G2C_APPLY_FRIEND_ADD_AGREE, this.onRecvG2C_APPLY_FRIEND_ADD_AGREE, this); //好友申请同意
        this.register(opCodes.G2C_FRIEND_SINGLE_INFO, this.onRecvG2C_FRIEND_SINGLE_INFO, this); //陌生人第一次发信息过来
        this.register(opCodes.G2C_FRIEND_DEL, this.onRecvG2C_FRIEND_DEL, this);
        //接收对话
        //this.register(opCodes.G2C_FRIEND_SEND_MESSAGE_ONE,this.onRecvG2C_FRIEND_SEND_MESSAGE_ONE,this)
        //聊天中的陌生人
        this.register(opCodes.G2C_STRANGER_INFO, this.onRecvG2C_STRANGER_INFO, this);
        //未读离线信息数量
        this.register(opCodes.G2C_FRIEND_OFFLINE_MESSAGE_COUNT, this.onRecvG2C_FRIEND_OFFLINE_MESSAGE_COUNT, this);
        this.register(opCodes.G2C_FRIEND_ONLINE, this.onRecvG2C_FRIEND_ONLINE, this); //好友上线
        this.register(opCodes.G2C_FRIEND_OFFLINE, this.onRecvG2C_FRIEND_OFFLINE, this); //好友下线
        this.register(opCodes.G2C_FRIEND_RECOMMEND_FRIENDS, this.onRecvG2C_FRIEND_RECOMMEND_FRIENDS, this); //好友推荐
        //this.register(opCodes.G2C_PLAYER_GET_CARD, 	this.onRecvG2C_PLAYER_GET_CARD, this)  
        //黑名单
        this.register(opCodes.G2C_ROLE_RESONPD_BLACK_ROLE, this.onRecvG2C_ROLE_RESONPD_BLACK_ROLE, this); //好友推荐
        //屏蔽申请好友
        this.register(opCodes.G2C_REJECT_FRIEND_ADD, this.onRecvG2C_REJECT_FRIEND_ADD, this);
        //已赠送体力返回
        this.register(opCodes.G2C_FRIEND_GIVE_ITEM, this.onRecvG2C_FRIEND_GIVE_ITEM, this);
        //某个好友的信息更新
        this.register(opCodes.G2C_FRIEND_UPPDATE_INFO, this.onRecvG2C_FRIEND_UPPDATE_INFO, this);
        this.register(opCodes.G2C_FRIEND_FIND, this.onRecvG2C_FRIEND_FINDO, this);
        //好友群聊
        //this.register(opCodes.G2C_CHAT_GROUP_CREATE, 	this.onRecvG2C_CHAT_GROUP_CREATE, this)  //创建讨论组
        //this.register(opCodes.G2C_CHAT_GROUP_UPDATE_INFO, 	this.onRecvG2C_CHAT_GROUP_UPDATE_INFO, this)  //更新讨论组信息
        //this.register(opCodes.G2C_CHAT_GROUP_QUERY_MEMBERS, 	this.onRecvG2C_CHAT_GROUP_QUERY_MEMBERS, this)  //获取所有成员
        //this.register(opCodes.G2C_CHAT_GROUP_INVITE_JOIN, 	this.onRecvG2C_CHAT_GROUP_INVITE_JOIN, this)  //邀请XX加入
        //this.register(opCodes.G2C_CHAT_GROUP_AGREE_JOIN, 	this.onRecvG2C_CHAT_GROUP_AGREE_JOIN, this)  //同意加入
        //this.register(opCodes.G2C_CHAT_GROUP_QUIT, 	this.onRecvG2C_CHAT_GROUP_QUIT, this)  //退出
        //this.register(opCodes.G2C_CHAT_GROUP_EXPELEE, 	this.onRecvG2C_CHAT_GROUP_EXPELEE, this)  //开除
        ////this.register(opCodes.G2C_CHAT_GROUP_CHAT, 	this.onRecvG2C_CHAT_GROUP_CHAT, this)  //聊天
        //this.register(opCodes.G2C_CHAT_GROUP_LIST, 	this.onRecvG2C_CHAT_GROUP_LIST, this)  //聊天组列表
        //this.register(opCodes.G2C_NO_TROUBLE_SETTING, 	this.onRecvG2C_NO_TROUBLE_SETTING, this)  //聊天组列表
        //this.register(opCodes.G2C_SELECT_NO_TROUBLE_SETTING, 	this.onRecvG2C_SELECT_NO_TROUBLE_SETTING, this)  //聊天组列表
        //this.register(opCodes.G2C_CHAT_GROUP_CHAT, 	this.onRecvG2C_CHAT_GROUP_CHAT, this)  //聊天组列表
        //this.register(opCodes.G2C_CHAT_GROUP_INVITE_LIST, 	this.onRecvG2C_CHAT_GROUP_INVITE_LIST, this)  //聊天组列表
        //this.register(opCodes.G2C_CHAT_GROUP_REALSE,   this.onRecvG2C_CHAT_GROUP_REALSE, this)
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_FINDO = function (dispatcher, message) {
        var index = 1;
    };
    //收到离线未读信息数量
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_OFFLINE_MESSAGE_COUNT = function (dispatcher, message) {
        FriendSystem.getInstance().setUnReadCountList(message.friend_msg_count);
        FireEvent(EventDefine.OFFLINE_CHAT_MSG, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_STRANGER_INFO = function (dispatcher, message) {
        var chat_stranger = message.chat_stranger;
        FriendSystem.getInstance().addChatStranger(chat_stranger);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_DEL = function (dispatcher, message) {
        var friendIdToDelete = message.friendIdToDelete;
        FriendSystem.getInstance().deleteFriendInfo(friendIdToDelete);
    };
    //好友列表
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_LIST = function (dispatcher, message) {
        var friendList = message.friend_list;
        //FriendSystem.getInstance().updateApplyStrangerList(friendList)
        FriendSystem.getInstance().updateFriendInfoList(friendList);
    };
    FriendMessageHandler.prototype.onRecvG2C_APPLY_FRIEND_ADD = function (dispatcher, message) {
        var tempFriend = message.tempFriend;
        FriendSystem.getInstance().onApplyFriendAdd(tempFriend);
    };
    FriendMessageHandler.prototype.onRecvG2C_APPLY_FRIEND_INFO = function (dispatcher, message) {
        var stranger_list = message.stranger_list;
        FriendSystem.getInstance().updateApplyStrangerList(stranger_list);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_ONLINE = function (dispatcher, message) {
        var friendId = message.friendId;
        FriendSystem.getInstance().friendOnline(friendId);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_OFFLINE = function (dispatcher, message) {
        var friendId = message.friendId;
        FriendSystem.getInstance().friendOffline(friendId);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_RECOMMEND_FRIENDS = function (dispatcher, message) {
        var recommendList = message.recommendList;
        //TLog.Debug_r(recommendList)
        //io.read()
        FriendSystem.getInstance().setRecommendFriendList(recommendList);
        FireEvent(EventDefine.RECOMMEND_FRIEND, RecommendFriendEvent.newObj(recommendList));
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_SINGLE_INFO = function (dispatcher, message) {
        var tempFriend = message.tempFriend;
        if (tempFriend != null) {
            FriendSystem.getInstance().addChatStranger(tempFriend);
            FireEvent(EventDefine.SEARCH_PLAYER_RESULT, SearchPlayerInfoEvent.newObj(tempFriend, message.getSendType));
        }
    };
    FriendMessageHandler.prototype.onRecvG2C_APPLY_FRIEND_ADD_AGREE = function (dispatcher, message) {
        var friendIdToDelete = message.friendIdToDelete;
        var friendInfo = message.friendInfo;
        FriendSystem.getInstance().removeApply(friendIdToDelete);
        //表非空，则同意成为好友,则返回该好友信息
        if (friendInfo.roleName != null) {
            friendInfo.roleId = friendIdToDelete;
            FriendSystem.getInstance().addFriendInfo(friendInfo);
        }
        //表为空，则拒绝该申请0
    };
    //接收到信息
    //onRecvG2C_FRIEND_SEND_MESSAGE_ONE(dispatcher,message){
    //	let messageInfo=message.messageInfo
    //	FriendSystem.getInstance().addMessageInfo(messageInfo)
    //	FriendSystem.getInstance().pushIconMsg()
    //}
    //名片
    // onRecvG2C_PLAYER_GET_CARD(dispatcher,message){
    // 	FireEvent(EventDefine.PLAYER_CARD_GET, PlayerCardGetEvent.newObj(message.playerID,message.playerCardInfo))
    // }
    //黑名单
    FriendMessageHandler.prototype.onRecvG2C_ROLE_RESONPD_BLACK_ROLE = function (dispatcher, message) {
        FriendSystem.getInstance().setBlackList(message.blackList);
        FireEvent(EventDefine.BLACK_INFO_LIST, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_REJECT_FRIEND_ADD = function (dispatcher, message) {
        FriendSystem.getInstance().setApplyStatue(message.getServerAddType);
        FireEvent(EventDefine.SERVER_APPLY_STATUS, null);
    };
    //群聊
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_UPDATE_INFO = function (dispatcher, message) {
        FriendSystem.getInstance().setChatGroupInfo(message.messagetable);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_QUERY_MEMBERS = function (dispatcher, message) {
        FriendSystem.getInstance().setChatMenberList(message.members, message.groupid);
        FireEvent(EventDefine.CHAT_GROUP_QUERY_MEMBERS, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_INVITE_JOIN = function (dispatcher, message) {
        FriendSystem.getInstance().setChatGroupInvitationInfo(message.messageList);
        FireEvent(EventDefine.CHAT_GROUP_INVITE_JOIN, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_AGREE_JOIN = function (dispatcher, message) {
        FriendSystem.getInstance().removeListRecord(message.groupId);
        FireEvent(EventDefine.CHAT_GROUP_AGREE_JOIN, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_QUIT = function (dispatcher, message) {
        //     FriendSystem.getInstance().SetDeleteGroupId(message.groupId)
        FriendSystem.getInstance().deleteChatInfoByID(-1 * message.groupId);
        FireEvent(EventDefine.CHAT_GROUP_QUIT, message.groupId);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_EXPELEE = function (dispatcher, message) {
        FriendSystem.getInstance().removeFromChatMenberListById(message.groupid);
        FireEvent(EventDefine.CHAT_GROUP_EXPELEE, message.groupid);
    };
    // onRecvG2C_CHAT_GROUP_CHAT(dispatcher,message){
    // 	FriendSystem.getInstance().addMessageInfo(message.groupContent)
    // 	FireEvent(EventDefine.CHAT_GROUP_CHAT, FriendChatGroupEvent.newObj(message.groupContent))	
    // 	FriendSystem.getInstance().pushGroupIconMsg(message.groupContent.fromFriendId)
    // }
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_LIST = function (dispatcher, message) {
        FriendSystem.getInstance().setChatGroupList(message.GroupList);
        message.GroupList = {};
        message.GroupCount = 0;
        var grouplist = FriendSystem.getInstance().getChatGroupList();
        var messageInfoList = FriendSystem.getInstance().getMessageInfoList();
        var isNotExistList = {};
        for (var _k in messageInfoList) {
            var k = tonumber(_k);
            var v = messageInfoList[k];
            if (k < 0) {
                JsUtil.arrayInstert(isNotExistList, k);
            }
        }
        for (var _k in messageInfoList) {
            var k = tonumber(_k);
            var v = messageInfoList[k];
            for (var i in grouplist) {
                var n = grouplist[i];
                if (n["groupid"] == -1 * k) {
                    for (var j in isNotExistList) {
                        var m = isNotExistList[j];
                        if (m == k) {
                            JsUtil.arrayRemove(isNotExistList, j);
                        }
                    }
                }
            }
        }
        for (var k in isNotExistList) {
            var v = isNotExistList[k];
            FriendSystem.getInstance().deleteChatInfoByID(v);
        }
        FireEvent(EventDefine.CHAT_GROUP_LIST, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_CREATE = function (dispatcher, message) {
        FireEvent(EventDefine.CHAT_GROUP_CREATE, message.groupId);
    };
    FriendMessageHandler.prototype.onRecvG2C_NO_TROUBLE_SETTING = function (dispatcher, message) {
        FireEvent(EventDefine.NO_TROUBLE_SETTING, null);
    };
    // onRecvG2C_SELECT_NO_TROUBLE_SETTING(dispatcher,message){
    //       FireEvent(EventDefine.NO_TROUBLE_SETTING,FriendSelectNoTrouble.newObj(message.groupList))
    // } 
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_INVITE_LIST = function (dispatcher, message) {
        //FriendSystem.getInstance().SetInviteList(message.inviteList)
        //FireEvent(EventDefine.CHAT_GROUP_INVITE_LIST,null)
        //if(size_t(message.inviteList) > 0 ){ 
        // 		FriendSystem.getInstance().pushIconMsg(4)
        //
        //} 
    };
    FriendMessageHandler.prototype.onRecvG2C_CHAT_GROUP_REALSE = function (dispatcher, message) {
        //FriendSystem.getInstance().SetReleaseId(message.groupId)
        FriendSystem.getInstance().deleteChatInfoByID(-1 * message.groupId);
        FireEvent(EventDefine.CHAT_GROUP_REALSE, message.groupId);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_GIVE_ITEM = function (dispatcher, message) {
        FriendSystem.getInstance().setSentPowerList(message.friendIdList);
        FireEvent(EventDefine.SENT_POWER_LIST, null);
    };
    FriendMessageHandler.prototype.onRecvG2C_FRIEND_UPPDATE_INFO = function (dispatcher, message) {
        FriendSystem.getInstance().updateOneFriendInfo(message.friendInfo);
    };
    return FriendMessageHandler;
}(MessageHandler));
__reflect(FriendMessageHandler.prototype, "FriendMessageHandler");
//# sourceMappingURL=FriendMessageHandler.js.map