/*
作者:
   li_an
    
创建时间：
   2014.2.11(周二)

意图：
   处理好友的信息数据
  
公共接口：
    getPlayerByGroupId( groupId){ //根据组Id获取组玩家
  getSearchResult(){          		//获取好友查找结果
    getPlayerById( playerId){ 		 // 根据Id获取玩家
    getOnlineFriendList(){ 					//获取在线的好友
    getNewChatMessage(){ 						//获取最新信息
    getFriendChatRecord( friendId){ //获取好友聊天记录
    getFriendshipById( friendId){		 //获取好友度
    searchPlayerByName( name){ 				//根据名字来查找
    addFriendToGroup( playerId, group){//添加玩家进某个组
    moveFriendToGroup( friendId, groupId){//玩家移组（拉黑）
    refreshPlayerInfo( playerId){					//刷新玩家信息
    setWindowChatClick( flag){ 						//设置点击发送聊天
    timeTransfer( sendtime){							//对话时间转化
  checkIsMyFriendByID( palyerID){							//玩家是否好友
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
var MAX_PLAYER_CHAT_COUNT = 50;
var FriendSystem = (function (_super) {
    __extends(FriendSystem, _super);
    function FriendSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chatClick = false;
        _this.curMessageIndex = 0;
        _this.saveApplyStatus = 0;
        _this.playerFairyInfo = null;
        _this.playerDefendInfo = null;
        _this.playerRideInfo = null;
        return _this;
    }
    FriendSystem.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.onClear();
        //let dsds =table_load("return {{["readState"]:0,["time"]:1421288453,["isSelfSend"]:false,["data"]:"1",["fromFriendId"]:50,},}//|")
        //TLog.Debug_r(dsds)
        //io.read()
        RegisterEvent(EventDefine.CHAT_VOICE_RECORD, this.onRevVoiceMessage, this);
        RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onRevChannelMessage, this);
        RegisterEvent(EventDefine.CHAT_VOICE_RECORD_ID, this.onRevVoiceIDMessage, this);
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onLoginReadResource, this);
        RegisterEvent(EventDefine.OFFLINE_CHAT_MSG, this.onRevOffLineMessage, this);
        RegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.showPlayerInfo, this);
        RegisterEvent(EventDefine.NO_TROUBLE_SETTING, this.noTroublePushGroupIconMsg, this);
    };
    FriendSystem.prototype.destory = function () {
        UnRegisterEvent(EventDefine.CHAT_VOICE_RECORD, this.onRevVoiceMessage, this);
        UnRegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onRevChannelMessage, this);
        UnRegisterEvent(EventDefine.CHAT_VOICE_RECORD_ID, this.onRevVoiceIDMessage, this);
        UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onLoginReadResource, this);
        UnRegisterEvent(EventDefine.OFFLINE_CHAT_MSG, this.onRevOffLineMessage, this);
        UnRegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.showPlayerInfo, this);
        UnRegisterEvent(EventDefine.NO_TROUBLE_SETTING, this.noTroublePushGroupIconMsg, this);
    };
    FriendSystem.prototype.onLoginReadResource = function () {
        TLog.Debug("FriendSystem.prepareResource");
        //读取本地记录
        var key = "saveMessageData.txt";
        var readData = ReadFromFile(key);
        //this.chatRecord = Config.getInstance().getRoleSetting("string",key,"NULL")
        if (readData.length == 0) {
            this.chatRecord = (_a = {},
                _a["count"] = 0,
                _a["index"] = 0,
                _a);
        }
        else {
            this.chatRecord = table_load(readData);
            if (!this.chatRecord) {
                this.chatRecord = (_b = {},
                    _b["count"] = 0,
                    _b["index"] = 0,
                    _b);
            }
        }
        this.curMessageIndex = this.chatRecord.index;
        this.chatStrangerList = {};
        key = "strangerList.txt";
        var readStrangerData = ReadFromFile(key);
        var readStrangerList = {};
        if (readStrangerData.length == 0) {
            readStrangerList = {};
        }
        else {
            readStrangerList = table_load(readStrangerData);
        }
        //TLog.Debug_r(readStrangerList)
        for (var _i = 0; _i < this.chatRecord.count; _i++) {
            var key_1 = "chat" + "_" + tostring(_i) + ".txt";
            var chatInfoData = ReadFromFile(key_1);
            if (chatInfoData.length != 0) {
                var chatInfo = table_load(chatInfoData);
                //TLog.Debug("read",_i,key)
                //TLog.Debug_r(chatInfo)
                //modify:yangguiming chatInfo可能null
                if (chatInfo && chatInfo.fromFriendId != null && chatInfo.fromFriendId > 10) {
                    this.messageList[_i] = chatInfo;
                    var playerID = chatInfo.fromFriendId;
                    if (readStrangerList[playerID] && playerID > 10) {
                        this.chatStrangerList[playerID] = readStrangerList[playerID];
                    }
                }
            }
            else {
                TLog.Error("read file  Error  %s is null!", key_1);
            }
        }
        //TLog.Debug_r(this.messageList)
        //io.read()
        key = "strangerList.txt";
        var saveData = table_save(this.chatStrangerList);
        WriteIntoFile(key, saveData, true);
        this.messageInfoList = {};
        for (var _i in this.messageList) {
            var _v = this.messageList[_i];
            if (!this.messageInfoList[_v.fromFriendId]) {
                this.messageInfoList[_v.fromFriendId] = [];
            }
            JsUtil.arrayInstert(this.messageInfoList[_v.fromFriendId], _v);
        }
        //申请服务器黑名单列表
        this.sendMsgToGetBlackList();
        var _a, _b;
    };
    FriendSystem.prototype.prepareResource = function (workQueue) {
        //workQueue.addWorkUnit(createClosureWorkUnit( function(this)
        //                 FriendTaskConfig=readCSV("data\\config\\FriendTask.csv")
        //    }, this) 
        //)
    };
    FriendSystem.prototype.onClear = function () {
        //TLog.Debug("FriendSystem.onClear")
        this.friendList = {};
        this.applyStrangerList = {};
        this.resultPlayer = {};
        this.chatRecord = {};
        this.newMessage = {};
        this.newRecordIndex = 0;
        this.unReadCount = {};
        this.chatClick = false;
        this.messageInfoList = {};
        this.chatStrangerList = {};
        //this.IconMsgList = []
        this.messageList = [];
        this.curMessageIndex = 0;
        this.recordVoiceTimerLlist = {};
        this.blackLit = {};
        this.saveApplyStatus = 0;
        this.playerFairyInfo = null;
        this.playerDefendInfo = null;
        this.ChatGroupInfo = {};
        this.ChatGroupInvitationInfo = [];
        this.ChatGroupList = {};
        this.GroupChatRecord = [];
        this.InviteList = {};
        this.ChatMenberList = {};
        this.playerRideInfo = null;
        this.recommendFriendList = [];
        this.sentPowerList = null;
        //this.blackLit= {
        //	{1001, "test1"},
        //	{1002, "test2"},
        //}
        //
        //
        //for(let index = 1; index <=  2;index++){
        //	let id = 1000 + index
        //
        //	let messageList:any = {}
        //	this.messageInfoList[id] = messageList
        //	for(let i = 1; i <=  10;i++){
        //		let chatInfo:any = {}
        //		chatInfo.fromFriendId=id
        //		chatInfo.data= Localize_cns("BROKENHISTORY_TXT51")
        //		chatInfo.time=0
        //		chatInfo.readState = 0   //未读
        //		chatInfo.isSelfSend= (i%2==1)  //非自己发出去
        //		chatInfo.VipLevel = 2
        //		chatInfo.msgType = null
        //		chatInfo.extentData = null
        //		JsUtil.arrayInstert(messageList, chatInfo)
        //	}
        //	this.messageList = messageList
        //	
        //	let friend=FriendInfo.newObj()
        //	friend.roleId=id
        //	friend.roleName="test"  +index
        //	friend.level=10
        //	friend.factionName=""
        //	friend.vocation=18000
        //	friend.sexId=1
        //	friend.friendShip=30
        //	friend.groupId=0
        //	friend.state=0
        //	friend.isOnline=0
        //	this.friendList[id]=friend
        //	
        //	this.recommendFriendList[id] = friend
        //	//this.applyStrangerList[id]=friend
        //}
    };
    FriendSystem.prototype.setUnReadCountList = function (list) {
        this.unReadCount = list || {};
    };
    //获取未读消息数量
    FriendSystem.prototype.getFriendUnReadMsgCount = function (friendId) {
        if (friendId && friendId > 0) {
            var count = 0;
            for (var _i in this.messageList) {
                var _v = this.messageList[_i];
                if (_v.fromFriendId == friendId && _v.readState == 0) {
                    count = count + 1;
                }
            }
            return count;
        }
        else {
            var count = 0;
            for (var _i in this.messageList) {
                var _v = this.messageList[_i];
                if (_v.readState == 0) {
                    count = count + 1;
                }
            }
            return count;
        }
    };
    //置零，全部读完
    FriendSystem.prototype.setFriendMsgCountZero = function (friendId) {
        for (var _i in this.messageList) {
            var _v = this.messageList[_i];
            if (_v.fromFriendId == friendId && _v.readState == 0) {
                this.messageList[_i].readState = 1;
                var key = "chat" + "_" + tostring(_i) + ".txt";
                var saveData = table_save(this.messageList[_i]);
                WriteIntoFile(key, saveData, true);
            }
        }
        FireEvent(EventDefine.FRIEND_UNREAD_UPDATE, null);
    };
    //添加聊天陌生人信息
    FriendSystem.prototype.addChatStranger = function (chatStranger) {
        this.chatStrangerList[chatStranger.roleId] = chatStranger;
        //let key ="role"..tostring(chatStranger.roleId)
        //let saveData = table_save(chatStranger)
        //Config.getInstance().setRoleSetting("string", key, saveData)
        var key = "strangerList.txt";
        var saveData = table_save(this.chatStrangerList);
        WriteIntoFile(key, saveData, true);
    };
    //获得聊天中陌生人的信息
    FriendSystem.prototype.getChatStranger = function (chatStrangerId) {
        //TLog.Debug_r(this.chatStrangerList)
        var strangerInfo = this.chatStrangerList[chatStrangerId];
        if (!strangerInfo) {
            TLog.Debug("FriendSystem.getChatStranger %d ! exsit", chatStrangerId);
            return null;
        }
        strangerInfo.isOnline = strangerInfo.isOnline || 0;
        strangerInfo.level = checkNull(strangerInfo.level, -1);
        return strangerInfo;
    };
    FriendSystem.prototype.getChatStrangerList = function () {
        return this.chatStrangerList;
    };
    //已成为好友，从陌生人表中删除
    FriendSystem.prototype.removeChatStranger = function (chatStrangerId) {
        if (this.chatStrangerList[chatStrangerId]) {
            delete this.chatStrangerList[chatStrangerId];
            var key = "strangerList.txt";
            var saveData = table_save(this.chatStrangerList);
            WriteIntoFile(key, saveData, true);
        }
    };
    FriendSystem.prototype.getChatPlayerInfo = function (plrId) {
        var friendInfo = this.getFriendInfo(plrId);
        if (friendInfo) {
            return friendInfo;
        }
        var stangerInfo = this.getChatStranger(plrId);
        if (stangerInfo) {
            return stangerInfo;
        }
        return null;
    };
    //////////陌生人
    FriendSystem.prototype.addApplyStranger = function (strangerInfo) {
        if (this.applyStrangerList[tonumber(strangerInfo.roleId)]) {
            TLog.Warn("FriendSystem.addApplyStranger %d alreadey exsit", strangerInfo.roleId);
        }
        this.applyStrangerList[tonumber(strangerInfo.roleId)] = strangerInfo;
    };
    //获取申请列表
    FriendSystem.prototype.getApplyStrangerList = function () {
        return this.applyStrangerList;
    };
    //更新陌生人列表
    FriendSystem.prototype.updateApplyStrangerList = function (strangerList) {
        this.applyStrangerList = {};
        for (var _ in strangerList) {
            var v = strangerList[_];
            this.addApplyStranger(v);
        }
        FireEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, null);
    };
    FriendSystem.prototype.getApplyStrangerCount = function () {
        var count = 0;
        for (var _ in this.applyStrangerList) {
            var v = this.applyStrangerList[_];
            count = count + 1;
        }
        return count;
    };
    ////////-好友//////////////////
    FriendSystem.prototype.addFriendInfo = function (friendInfo) {
        if (this.friendList[friendInfo.roleId]) {
            TLog.Warn("FriendSystem.addFriendInfo %d alreadey exsit", friendInfo.roleId);
        }
        this.friendList[friendInfo.roleId] = friendInfo;
        this.removeChatStranger(friendInfo.roleId);
        FireEvent(EventDefine.FRIEND_LIST_UPDATE, null);
        if (this.checkPlayerInBlack(friendInfo.roleId)) {
            this.removePlayerBlackList(friendInfo.roleId);
        }
    };
    //获取好友列表
    FriendSystem.prototype.getFriendInfoList = function () {
        return this.friendList;
    };
    //获得好友信息
    FriendSystem.prototype.getFriendInfo = function (friendId) {
        if (!this.friendList[friendId]) {
            TLog.Warn("FriendSystem.getFriendInfo %d ! exsit", friendId);
            return null;
        }
        return this.friendList[friendId];
    };
    //传入好友列表，更新陌生人列表
    FriendSystem.prototype.updateFriendInfoList = function (friendList) {
        this.friendList = {};
        this.friendList = friendList;
        //更新陌生人列表，删除已经成为好友的陌生人
        for (var _ in this.friendList) {
            var v = this.friendList[_];
            this.removeChatStranger(v.id);
        }
    };
    //删除好友，发到服务器
    FriendSystem.prototype.deleteFriend = function (friendId) {
        var msg = GetMessage(opCodes.C2G_FRIEND_DEL);
        msg.friendIdToDelete = friendId;
        SendGameMessage(msg);
    };
    //删除好友，成为陌生人
    //服务器返回删除成功，更新列表
    FriendSystem.prototype.deleteFriendInfo = function (friendId) {
        if (friendId == 0) {
            return;
        }
        else {
            if (this.friendList[friendId]) {
                //成为陌生人
                this.addChatStranger(this.friendList[friendId]);
                delete this.friendList[friendId];
                FireEvent(EventDefine.FRIEND_LIST_UPDATE, null);
            }
        }
    };
    //会话
    FriendSystem.prototype.addMessageInfo = function (messageInfo) {
        TLog.Debug("FriendSystem.addMessageInfo", messageInfo.VipLevel, messageInfo.fromFriendId, messageInfo.roleName, messageInfo.chatBubbleType);
        //TLog.Debug_r(messageInfo)
        //io.read()
        //let chatInfo:any = {}
        //chatInfo.fromFriendId=messageInfo.fromFriendId
        //chatInfo.data=messageInfo.data
        //chatInfo.time=messageInfo.time
        //chatInfo.readState = 0   //未读
        //chatInfo.isSelfSend=false  //非自己发出去
        //chatInfo.VipLevel = messageInfo.VipLevel
        //chatInfo.icon = messageInfo.icon
        //chatInfo.msgType = messageInfo.MsgType
        //chatInfo.extentData = messageInfo.extentData || null
        if (!messageInfo.isSelfSend) {
            var friendInfo = this.getFriendInfo(messageInfo.fromFriendId);
            if (!friendInfo) {
                var chat_stranger = StrangerInfo.newObj(messageInfo.fromFriendId, messageInfo.roleName, messageInfo.vocation, messageInfo.icon, messageInfo.sexId, messageInfo.VipLevel, -1);
                this.addChatStranger(chat_stranger);
            }
        }
        this.curMessageIndex = this.curMessageIndex + 1;
        if (this.curMessageIndex > MAX_PLAYER_CHAT_COUNT) {
            this.curMessageIndex = this.curMessageIndex - MAX_PLAYER_CHAT_COUNT;
        }
        this.messageList[this.curMessageIndex] = messageInfo;
        this.chatRecord["count"] = this.messageList.length;
        this.chatRecord["index"] = this.curMessageIndex;
        this.messageInfoList = {};
        for (var _i in this.messageList) {
            var _v = this.messageList[_i];
            if (!this.messageInfoList[_v.fromFriendId]) {
                this.messageInfoList[_v.fromFriendId] = [];
            }
            JsUtil.arrayInstert(this.messageInfoList[_v.fromFriendId], _v);
        }
        //写记录	
        var key = "saveMessageData.txt";
        var chatRecordData = table_save(this.chatRecord);
        WriteIntoFile(key, chatRecordData, true);
        key = "chat" + "_" + tostring(this.curMessageIndex) + ".txt";
        var saveData = table_save(messageInfo);
        WriteIntoFile(key, saveData, true);
        //消息队列更新
        FireEvent(EventDefine.MESSAGE_UPDATE, MessageComeEvent.newObj(messageInfo));
    };
    //获得整个信息列表
    FriendSystem.prototype.getMessageInfoList = function () {
        return this.messageInfoList;
    };
    //获得最新消息
    FriendSystem.prototype.getFriendLastChat = function (friendId) {
        //TLog.Debug("FriendSystem.getFriendLastChat",friendId)
        var chatList = [];
        if (this.messageInfoList[friendId]) {
            chatList = this.messageInfoList[friendId];
        }
        //TLog.Debug_r(chatList)
        function sortFunc(a, b) {
            return b.time - a.time;
        }
        table_sort(chatList, sortFunc);
        //TLog.Debug_r(chatList)
        //io.read()
        if (chatList[0]) {
            return chatList[0];
        }
        else {
            return null;
        }
    };
    //获得某个好友的会话列表
    FriendSystem.prototype.getFriendMessage = function (friendId) {
        var chatList = [];
        if (this.messageInfoList[friendId]) {
            //TLog.Debug_r (this.messageInfoList[friendId])
            //TLog.Debug("~~~~~~~~~~~~",this.chatRecord[friendId])
            chatList = this.messageInfoList[friendId];
        }
        return chatList;
    };
    //
    //获取在线的好友
    FriendSystem.prototype.getOnlineFriendList = function () {
        var onlineFriendList = [];
        //TLog.Debug_r(this.friendList)
        for (var i in this.friendList) {
            var v = this.friendList[i];
            if (v.isOnline == 1) {
                JsUtil.arrayInstert(onlineFriendList, v);
            }
        }
        return onlineFriendList;
    };
    //玩家上线
    FriendSystem.prototype.friendOnline = function (friendId) {
        //TLog.Debug("FriendSystem.friendOnline",friendId,this.friendList[friendId])
        //TLog.Debug_r(this.friendList)
        if (!this.friendList[friendId]) {
            return;
        }
        this.friendList[friendId].isOnline = 1;
        FireEvent(EventDefine.FRIEND_ONOFF_LINE, FriendOnOffLineEvent.newObj(friendId, 1));
    };
    //玩家下线
    FriendSystem.prototype.friendOffline = function (friendId) {
        if (!this.friendList[friendId]) {
            return;
        }
        this.friendList[friendId].isOnline = 0;
        FireEvent(EventDefine.FRIEND_ONOFF_LINE, FriendOnOffLineEvent.newObj(friendId, 0));
    };
    //
    //根据名字来查找
    FriendSystem.prototype.searchPlayerByName = function (name, sendType) {
        //TLog.Debug("FriendSystem.searchPlayerByName",name,type(name))
        var msg = GetMessage(opCodes.C2G_FRIEND_FIND);
        msg.searchName = name;
        msg.sendType = sendType || 1;
        SendGameMessage(msg);
    };
    //申请添加好友
    FriendSystem.prototype.addFriend = function (playerId) {
        var msg = GetMessage(opCodes.C2G_APPLY_FRIEND_ADD);
        msg.playerId = playerId;
        SendGameMessage(msg);
    };
    //删除申请
    FriendSystem.prototype.removeApply = function (strangerId) {
        if (this.applyStrangerList[tonumber(strangerId)]) {
            delete this.applyStrangerList[tonumber(strangerId)];
        }
        FireEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, null);
    };
    FriendSystem.prototype.setRecommendFriendList = function (list) {
        this.recommendFriendList = list;
    };
    FriendSystem.prototype.getRecommendFriendList = function () {
        var list = [];
        var count = 0;
        for (var _i in this.recommendFriendList) {
            var _info = this.recommendFriendList[_i];
            count = count + 1;
            if (count > 2) {
                break;
            }
            JsUtil.arrayInstert(list, _info);
        }
        return list;
    };
    FriendSystem.prototype.removeRecommendFriendByID = function (ID) {
        var removeIndex = null;
        for (var _i in this.recommendFriendList) {
            var _info = this.recommendFriendList[_i];
            if (_info.roleId == ID) {
                removeIndex = _i;
            }
        }
        if (removeIndex) {
            JsUtil.arrayRemove(this.recommendFriendList, removeIndex);
            FireEvent(EventDefine.RECOMMEND_FRIEND, RecommendFriendEvent.newObj(this.recommendFriendList));
        }
    };
    FriendSystem.prototype.deleteChatInfoByID = function (friendId) {
        TLog.Debug("FriendSystem.deleteChatInfoByID", friendId);
        if (this.messageInfoList[friendId]) {
            delete this.messageInfoList[friendId];
        }
        var removeList = [];
        for (var _i in this.messageList) {
            var _msgInfo = this.messageList[_i];
            if (_msgInfo.fromFriendId == friendId) {
                JsUtil.arrayInstert(removeList, _i);
            }
        }
        var removeCount = removeList.length;
        for (var _i in removeList) {
            var _v = removeList[_i];
            delete this.messageList[_v];
        }
        var newList = this.messageList;
        this.messageList = [];
        var index = 0;
        for (var _i in newList) {
            var _v = newList[_i];
            JsUtil.arrayInstert(this.messageList, _v);
            index = index + 1;
            var key_2 = "chat" + "_" + tostring(index) + ".txt";
            var saveData = table_save(_v);
            WriteIntoFile(key_2, saveData, true);
        }
        this.chatRecord["count"] = this.messageList.length;
        this.chatRecord["index"] = index;
        this.curMessageIndex = index;
        //TLog.Debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        //TLog.Debug_r(this.messageList)
        //io.read()
        //写记录	
        var key = "saveMessageData.txt";
        var chatRecordData = table_save(this.chatRecord);
        WriteIntoFile(key, chatRecordData, true);
        FireEvent(EventDefine.MESSAGE_UPDATE, null);
    };
    //判断是不是好友
    FriendSystem.prototype.checkIsMyFriendByID = function (playerID) {
        if (this.friendList[playerID]) {
            return true;
        }
        else {
            return false;
        }
    };
    FriendSystem.prototype.onApplyFriendAdd = function (tempFriend) {
        if (this.checkPlayerInBlack(tempFriend.roleId)) {
            return;
        }
        this.addApplyStranger(tempFriend);
        FireEvent(EventDefine.APPLY_TO_FRIEND, null);
        var wnd = WngMrg.getInstance().getWindow("FriendsFrame");
        if (wnd.isVisible()) {
            return;
        }
        if (MsgSystem.isIconTypeExsit(IconMsgType.FRIEND_APPLY) == true) {
            return;
        }
        var _this = this;
        var cbObj = {
            onIconMsgCallBack: function (id, userData) {
                wnd.showWithIndex("shenqing");
                return true;
            }
        };
        MsgSystem.addIconMsg(cbObj, null, IconMsgType.FRIEND_APPLY);
        FireEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, null);
    };
    FriendSystem.prototype.pushIconMsg = function (index) {
        //推送好友会话
        //let windowindex = checkNull(index, 1)
        var exsit = MsgSystem.isIconTypeExsit(IconMsgType.FRIEND_CHAT);
        if (exsit) {
            return;
        }
        var cbObj = {
            onIconMsgCallBack: function (id, userData) {
                ChatWithPlayer(-1);
                return false;
            }
        };
        MsgSystem.addIconMsg(cbObj, null, IconMsgType.FRIEND_CHAT);
    };
    FriendSystem.prototype.onRevChannelMessage = function (args) {
        //收到通道消息	
        //io.read()
        //TLog.Debug("FriendSystem.onRevChannelMessage ",channel)
        //TLog.Debug_r(args)
        var msgInfo = args.packet;
        var channel = msgInfo.channel;
        if (channel == channelType.CHAT && (!this.checkPlayerInBlack(msgInfo.roleId))) {
            var messageInfo = MessageInfo.newObj(msgInfo.roleId, msgInfo.data, GetServerTime(), msgInfo.name, msgInfo.VipLevel, msgInfo.chatBubbleType);
            messageInfo.setIconInfo(msgInfo.icon, msgInfo.vocation, msgInfo.sexId);
            this.addMessageInfo(messageInfo);
            this.pushIconMsg();
        }
    };
    //收到声音消息
    FriendSystem.prototype.onRevVoiceMessage = function (args) {
        if (args.buf && args.size) {
            //TLog.Debug_r(args)
            if (args.channel == channelType.CHAT) {
                var voiceID = GameSound.getInstance().prepareRecord(args.buf, args.size);
                var messageInfo = MessageInfo.newObj(args.id, voiceID, GetServerTime(), args.name, args.VipLevel, args.chatBubbleType);
                messageInfo.setIconInfo(args.icon, args.vocation, args.sexId);
                messageInfo.MsgType = args.recordTime || 10; //语音
                this.addMessageInfo(messageInfo);
                this.pushIconMsg();
            }
            else {
                var voiceID = GameSound.getInstance().prepareRecord(args.buf, args.size, true);
                //io.read()			
                var packet = {};
                packet.channel = args.channel;
                packet.roleId = args.id;
                packet.data = voiceID;
                packet.MsgType = args.recordTime || 10; //语音 
                packet.name = args.name;
                packet.vocation = args.vocation;
                packet.sexId = args.sexId;
                packet.VipLevel = args.VipLevel;
                packet.time = GetServerTime();
                packet.chatBubbleType = args.chatBubbleType;
                packet.factionID = args.factionID || null;
                if (args.id && (!this.checkPlayerInBlack(args.id))) {
                    ChannelMrg.getInstance().addChannelMsg(packet.channel, packet);
                    //FireEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, ChatRecvChannelMsgEvent.newObj(packet))
                }
            }
        }
    };
    FriendSystem.prototype.onRevVoiceIDMessage = function (args) {
        //TLog.Debug("FriendSystem.onRevVoiceIDMessage")
        if (args.voiceID && args.channel && args.id) {
            this.recordVoiceTimerLlist[args.voiceID] = args.recordTime;
            var packet = {};
            packet.channel = args.channel;
            packet.roleId = args.id; //GetHeroProperty("id") // 
            packet.data = args.voiceID;
            packet.MsgType = 1; //语音
            if (args.recordTime && args.recordTime > 0) {
                packet.MsgType = args.recordTime;
            }
            packet.name = args.name;
            packet.vocation = args.vocation;
            packet.sexId = args.sexId;
            packet.VipLevel = args.VipLevel;
            packet.time = GetServerTime();
            packet.voiceID = args.voiceID;
            packet.chatBubbleType = args.chatBubbleType;
            if (!this.checkPlayerInBlack(args.id)) {
                FireEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, ChatRecvChannelMsgEvent.newObj(packet));
            }
        }
    };
    FriendSystem.prototype.getVoiceTimeByID = function (voiceID) {
        if (this.recordVoiceTimerLlist[voiceID]) {
            return this.recordVoiceTimerLlist[voiceID];
        }
        return null;
    };
    // removeIconMsgInfoByType(removeType) {
    // 	// typs value :  "MAIL_LIST"  "MESSAGE_ONE"
    // 	if (removeType == "MAIL_LIST" || removeType == "MESSAGE_ONE") {
    // 		let removePos = null
    // 		for (let _i in this.IconMsgList) {
    // 			let _info = this.IconMsgList[_i]
    // 			if (_info.iconType == removeType) {
    // 				removePos = _i
    // 				break
    // 			}
    // 		}
    // 		if (removePos) {
    // 			let removeInfo = JsUtil.arrayRemove(this.IconMsgList, removePos)
    // 			if (removeInfo.iconID) {
    // 				MsgSystem.removeIconMsg(removeInfo.iconID)
    // 			}
    // 		}
    // 	}
    // }
    FriendSystem.prototype.sendMsgToGetBlackList = function () {
        var message = GetMessage(opCodes.C2G_ROLE_REQUEST_BLACK_ROLE);
        SendGameMessage(message);
    };
    FriendSystem.prototype.setBlackList = function (list) {
        this.blackLit = list;
    };
    FriendSystem.prototype.getBlackList = function (list) {
        return this.blackLit;
    };
    FriendSystem.prototype.removePlayerBlackList = function (playerID) {
        for (var _i in this.blackLit) {
            var _v = this.blackLit[_i];
            if (_v[0] == playerID) {
                var message = GetMessage(opCodes.C2G_ROLE_REMOVE_BLACK_ROLE);
                message.playerID = playerID;
                SendGameMessage(message);
                return;
            }
        }
        return MsgSystem.addTagTips(Localize_cns("NO_BLACK_PLAYER"));
    };
    FriendSystem.prototype.addPlayerBlackList = function (playerID, playerName) {
        for (var _i in this.blackLit) {
            var _v = this.blackLit[_i];
            if (_v[0] == playerID) {
                this.removePlayerBlackList(playerID);
                return; //MsgSystem.addTagTips(Localize_cns("HAD_ADD_BLACK"))
            }
        }
        //let userData:any = {}
        //userData.playerID = playerID
        //userData.playerName = playerName
        //let t:any = {}
        //t.function DialogCallBack(_, result,userData){
        //	if(result ){
        var message = GetMessage(opCodes.C2G_ROLE_ADD_BLACK_ROLE);
        message.playerID = playerID;
        message.playerName = playerName;
        SendGameMessage(message);
        //	}
        //}
        //MsgSystem.confirmDialog(Localize_cns("ADD_BLACK_TIPS"), t,userData)
    };
    FriendSystem.prototype.checkPlayerInBlack = function (playerID) {
        for (var _i in this.blackLit) {
            var _v = this.blackLit[_i];
            if (_v[0] == playerID) {
                return true;
            }
        }
        return false;
    };
    //////////////////////////屏蔽好友申请//////////////////-
    FriendSystem.prototype.sendMsgToGetApplyStatus = function () {
        var message = GetMessage(opCodes.C2G_REJECT_FRIEND_ADD_STATE);
        SendGameMessage(message);
    };
    FriendSystem.prototype.setMsgToSetApplyStatue = function (status) {
        var message = GetMessage(opCodes.C2G_REJECT_FRIEND_ADD);
        message.sendStatus = status;
        SendGameMessage(message);
    };
    FriendSystem.prototype.setApplyStatue = function (status) {
        this.saveApplyStatus = status;
    };
    FriendSystem.prototype.getApplyStatue = function (list) {
        return this.saveApplyStatus;
    };
    //////////////////////////屏蔽好友申请 }//////////////////-
    //////////////////////////离线消息 ////////////
    FriendSystem.prototype.onRevOffLineMessage = function (args) {
        var msgList = this.unReadCount;
        if (msgList && type(msgList) == "object") {
            for (var i in msgList) {
                var msgInfo = msgList[i];
                var channel = msgInfo.channel;
                var data = msgInfo.data;
                var friendInfo = msgInfo.friendInfo;
                var playerID = friendInfo.roleId;
                if (channel == channelType.CHAT && (!this.checkPlayerInBlack(playerID)) && !this.checkPlayerInBlack(playerID)) {
                    var messageInfo = MessageInfo.newObj(friendInfo.roleId, data, GetServerTime(), friendInfo.name, friendInfo.VipLevel, friendInfo.chatBubbleType);
                    messageInfo.setIconInfo(friendInfo.icon, friendInfo.vocation, friendInfo.sexId);
                    this.addMessageInfo(messageInfo);
                    this.pushIconMsg();
                }
            }
            if (msgList.length > 0) {
                //GuideSystem.getInstance().clearBtnTips("friendMsg")	
                //GuideSystem.getInstance().showBtnList("friendMsg")
            }
        }
    };
    FriendSystem.prototype.showPlayerInfo = function (args) {
        var sendType = args.sendType;
        var wnd = WngMrg.getInstance().getWindow("FriendsFrame");
        if (wnd.isVisible()) {
            var resultWnd = WngMrg.getInstance().getWindow("FriendFindResultFrame");
            resultWnd.showWithPlayerInfo(args.playerInfo);
            return;
        }
        //let openInfo = false
        //if(sendType == 1 ){  //天空之塔
        //	openInfo=true
        //}else if(sendType == 2 ){ //竞技场
        //	openInfo=true
        //}else if(sendType == 3 ){  //其他默认关卡
        //	openInfo=true
        //}else if(sendType == 4 ){  //矿洞
        //	openInfo=true
        //}
        ////TLog.Debug("FriendsFrame.showPlayerInfo",sendType)	
        //let window = WngMrg.getInstance().getWindow("PlayerAllInfoFrame")
        //window.showPlayerInfo(args.playerInfo,openInfo,sendType)
    };
    FriendSystem.prototype.setPlayerFairyInfo = function (fairyInfo) {
        this.playerFairyInfo = fairyInfo;
    };
    FriendSystem.prototype.getPlayerFairyInfo = function () {
        return this.playerFairyInfo;
    };
    FriendSystem.prototype.setPlayerWingInfo = function (defendInfo) {
        this.playerDefendInfo = defendInfo;
    };
    FriendSystem.prototype.getPlayerDefendInfo = function () {
        return this.playerDefendInfo;
    };
    FriendSystem.prototype.setPlayerRideInfo = function (info) {
        this.playerRideInfo = info;
    };
    FriendSystem.prototype.getPlayerRideInfo = function () {
        return this.playerRideInfo;
    };
    //御灵//////////////////-
    // setYulingInfo(level, skillData) {
    // 	this.yulingLevel = level
    // 	this.yulingSkillData = skillData
    // }
    // getYulingInfo() {
    // 	let nowValueList = []
    // 	let nowHPValue = 0
    // 	let nowMagicValue = 0
    // 	let nowPhysicValue = 0
    // 	let skillToLevelList = []
    // 	for (let i = 294; i <= 301; i++) {
    // 		let level = this.getYulingSkillLevelList(i)
    // 		skillToLevelList[i] = level
    // 	}
    // 	for (let i = 294; i <= 301; i++) {
    // 		for (let k in GameConfig.SacrificeConfig[i]) {
    // 			let v = GameConfig.SacrificeConfig[i][k]
    // 			if (v.level <= skillToLevelList[i]) {
    // 				nowHPValue = nowHPValue + v.effect[0][1]
    // 				nowMagicValue = nowMagicValue + v.effect[1][1]
    // 				nowPhysicValue = nowPhysicValue + v.effect[2][1]
    // 			}
    // 		}
    // 	}
    // 	nowHPValue = nowHPValue * 100
    // 	nowMagicValue = nowMagicValue * 100
    // 	nowPhysicValue = nowPhysicValue * 100
    // 	JsUtil.arrayInstert(nowValueList, nowHPValue)
    // 	JsUtil.arrayInstert(nowValueList, nowMagicValue)
    // 	JsUtil.arrayInstert(nowValueList, nowPhysicValue)
    // 	return [this.yulingLevel, this.yulingSkillData, nowValueList]
    // }
    // getYulingSkillLevelList(index) {
    // 	let level = 0
    // 	let curCanActiva = null
    // 	for (let k in this.yulingSkillData) {
    // 		let v = this.yulingSkillData[k]
    // 		if (v[2] && v[2] == opSacrificeStatus.CAN) {
    // 			curCanActiva = k
    // 		}
    // 	}
    // 	if (this.yulingLevel < defaultValue.SACRIFICE_MAX_LEVEL) {
    // 		if (index < curCanActiva) {
    // 			level = this.yulingLevel + 1
    // 		} else {
    // 			level = this.yulingLevel
    // 		}
    // 	} else {
    // 		level = defaultValue.SACRIFICE_MAX_LEVEL
    // 	}
    // 	return level
    // }
    //////////////////////////////////////////////////////////////
    FriendSystem.prototype.setChatGroupInfo = function (groupinfo) {
        this.ChatGroupInfo = groupinfo;
    };
    FriendSystem.prototype.getChatGroupInfo = function () {
        return this.ChatGroupInfo;
    };
    FriendSystem.prototype.setChatGroupInvitationInfo = function (inviteinfo) {
        //    this.ChatGroupIvitationInfo.inviteId=groupinfo.inviteId
        //    this.ChatGroupIvitationInfo.inviteName=groupinfo.inviteName
        //    this.ChatGroupIvitationInfo.chatGroupid=groupinfo.chatGroupid
        //    this.ChatGroupIvitationInfo.chatGroupName=groupinfo.chatGroupName
        JsUtil.arrayInstert(this.ChatGroupInvitationInfo, inviteinfo);
    };
    FriendSystem.prototype.getChatGroupInvitationInfo = function () {
        return this.ChatGroupInvitationInfo;
    };
    FriendSystem.prototype.removeChatApplyList = function (args) {
        for (var k in this.ChatGroupInvitationInfo) {
            var v = this.ChatGroupInvitationInfo[k];
            if (v[2] == args) {
                JsUtil.arrayRemove(this.ChatGroupInvitationInfo, k);
            }
        }
    };
    FriendSystem.prototype.setChatGroupList = function (listinfo) {
        this.ChatGroupList = {};
        this.ChatGroupList = listinfo;
    };
    FriendSystem.prototype.getChatGroupList = function () {
        return this.ChatGroupList;
    };
    FriendSystem.prototype.setChatMenberList = function (menberinfo, groupId) {
        this.exitGroupid = 0;
        this.ChatMenberList = menberinfo;
        this.exitGroupid = groupId;
    };
    FriendSystem.prototype.getChatMenberList = function (groupId) {
        return this.ChatMenberList || {};
    };
    FriendSystem.prototype.clearChatMenberList = function () {
        this.ChatMenberList = {};
        this.exitGroupid = 0;
    };
    FriendSystem.prototype.removeFromChatMenberListById = function (id) {
        if (this.ChatMenberList) {
            for (var k in this.ChatMenberList) {
                var v = this.ChatMenberList[k];
                if (v["memberId"] == id) {
                    JsUtil.arrayRemove(this.ChatMenberList, id);
                }
            }
        }
    };
    FriendSystem.prototype.getExitGroupId = function () {
        return this.exitGroupid || 0;
    };
    FriendSystem.prototype.addGroupRecord = function (info) {
        JsUtil.arrayInstert(this.GroupChatRecord, info);
    };
    FriendSystem.prototype.GetGroupRecordLast = function () {
        return this.GroupChatRecord[size_t(this.GroupChatRecord)];
    };
    FriendSystem.prototype.GetGroupRecordList = function () {
        return this.GroupChatRecord;
    };
    FriendSystem.prototype.SetInviteList = function (inviteinfo) {
        this.InviteList = inviteinfo;
    };
    FriendSystem.prototype.GetInviteList = function () {
        return this.InviteList;
    };
    FriendSystem.prototype.removeListRecord = function (args) {
        for (var k in this.InviteList) {
            var v = this.InviteList[k];
            if (v[2] == args) {
                JsUtil.arrayRemove(this.InviteList, k);
            }
        }
    };
    FriendSystem.prototype.SetDeleteGroupId = function (idinfo) {
        this.DeleteGroupId = 0;
        this.DeleteGroupId = idinfo;
    };
    FriendSystem.prototype.GetDeleteGroupId = function () {
        return this.DeleteGroupId;
    };
    //解散id
    FriendSystem.prototype.SetReleaseId = function (releaseId) {
        this.releaseId = 0;
        this.releaseId = releaseId;
    };
    FriendSystem.prototype.GetReleaseId = function () {
        return this.releaseId;
    };
    FriendSystem.prototype.pushGroupIconMsg = function (groupId) {
        var wnd = WngMrg.getInstance().getWindow("FriendsFrame");
        if (wnd.isVisible()) {
            return;
        }
        var message = GetMessage(opCodes.C2G_SELECT_NO_TROUBLE_SETTING);
        SendGameMessage(message);
        this.revMsgGroupid = groupId || 0;
    };
    FriendSystem.prototype.noTroublePushGroupIconMsg = function (args) {
        var wnd = WngMrg.getInstance().getWindow("FriendsFrame");
        if (wnd.isVisible()) {
            return;
        }
        if (size_t(args.noTrouleList) > 0) {
            for (var _k in args.noTrouleList) {
                var k = tonumber(_k);
                var v = args.noTrouleList[k];
                if (-1 * k == this.revMsgGroupid) {
                    return;
                }
            }
        }
        this.pushIconMsg(2);
    };
    //赠送体力
    FriendSystem.prototype.handselPowerToFriend = function (friendIdList) {
        var message = GetMessage(opCodes.C2G_FRIEND_GIVE_ITEM);
        //message.friendId = friendId
        message.friendIdList = friendIdList;
        SendGameMessage(message);
    };
    FriendSystem.prototype.setSentPowerList = function (sentPowerList) {
        this.sentPowerList = sentPowerList;
    };
    FriendSystem.prototype.getSentPowerList = function (sentPowerList) {
        return this.sentPowerList || {};
    };
    //某个好友的信息更新
    FriendSystem.prototype.updateOneFriendInfo = function (friendInfo) {
        var friendId = friendInfo.roleId;
        if (!this.friendList[friendId]) {
            return;
        }
        this.friendList[friendId] = friendInfo;
        FireEvent(EventDefine.FRIEND_LIST_UPDATE, null);
    };
    return FriendSystem;
}(BaseSystem));
__reflect(FriendSystem.prototype, "FriendSystem");
//# sourceMappingURL=FriendSystem.js.map