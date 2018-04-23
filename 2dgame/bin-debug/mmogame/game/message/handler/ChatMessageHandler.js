/*
作者:
    yangguiming
    
创建时间：
   2013.6.21(周五)

意图：
   聊天系统（包括聊天频道和私聊）

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
var ChatMessageHandler = (function (_super) {
    __extends(ChatMessageHandler, _super);
    function ChatMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.register(opCodes.G2C_CHANNEL_SEND, this.onRecvG2C_CHANNEL_SEND, this); //接收频道信息
        this.register(opCodes.G2C_CHANNEL_PLAYER, this.onRecvG2C_CHANNEL_PLAYER, this); //收到玩家简单信息
        this.register(opCodes.G2C_CHANNEL_SYSTEM, this.onRecvG2C_CHANNEL_SYSTEM, this); //接受系统公告	
        this.register(opCodes.G2C_CHANNEL_PET_ITEM, this.onRecvG2C_CHANNEL_PET_ITEM, this); //查看宠物、道具信息
        this.register(opCodes.G2C_CHANNEL_VOICE, this.onRecvG2C_CHANNEL_VOICE, this); //读语音包
        this.register(opCodes.G2C_CHANNEL_VOICE_UID, this.onRecvG2C_CHANNEL_VOICE_UID, this); //语音ID发送
        this.register(opCodes.G2C_CHANNEL_GET_VOICE, this.onRecvG2C_CHANNEL_GET_VOICE, this); //语音ID发送
        this.register(opCodes.G2C_CHANNEL_RECARD_SEND, this.onRecvG2C_CHANNEL_RECARD_SEND, this);
        //在线抢答
        this.register(opCodes.G2C_QIANGDA_QUESTION, this.onRecvG2C_QIANGDA_QUESTION, this); //抢答题目
        this.register(opCodes.G2C_ROLE_CHAT_WINDOW_LIST, this.onRecvG2C_ROLE_CHAT_WINDOW_LIST, this); //已解锁气泡列表
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_SEND = function (dispatcher, message) {
        //TODO:根据不同频道，有些额外的处理？
        ChannelMrg.getInstance().addChannelMsg(message.packet["channel"], message.packet);
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_PLAYER = function (dispatcher, message) {
        var player = {};
        player = message.playerInfo;
        //let window = WngMrg.getInstance().getWindow("PlayerInfoFrame")
        //window.setFrameDataAtChat(player, "chat")
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_SYSTEM = function (dispatcher, message) {
        //MsgSystem.showPubilcNoticeMessage(message.isborad,message.sysType,message.content)
        //let wnd = WngMrg.getInstance().getWindow("PublicNoticeFrame")
        //西游不要公告
        // if (message.isborad == 1) {
        // 	MsgSystem.addPubilcMsg(message.content)
        // }
        //if (message.sysType == 1) {
        Chat_AddChannelMsg(channelType.SYSTEM, message.content);
        //}
        //FireEvent(EventDefine.CHAT_CHANNEL_MSG_BROADCAST, MSG_BROADCAST_EVENT.newObj(message.isborad,message.sysType,message.content))
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_PET_ITEM = function (dispatcher, message) {
        if (message.rage == 1) {
            var petInfo = message.info;
            //let wnd = WngMrg.getInstance().getWindow("PetPreviewFrame")
            //wnd.showWithPetInfo()
            //wnd.setRoleId(message.roleId)
            //wnd.setUnlockSkill(-1)
            //wnd.showFrameWithPetInfo(petInfo,true)
            PetSystem.getInstance().showPetTipsByInfo(petInfo);
        }
        else if (message.rage == 2) {
            var itemInfo = message.info;
            var item = Item.newObj(itemInfo);
            ItemSystem.getInstance().showItemTips(item, false);
        }
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_VOICE = function (dispatcher, message) {
        // FireEvent(EventDefine.CHAT_VOICE_RECORD, ChatVoiceRecordEvent.newObj(message.channel,message.id,message.name,message.vocation,message.size,message.buf,message.recordTime,message.VipLevel,message.chatBubbleType))
        // if(message.buf ){
        // 	Core.IAllocator.instance.Free( message.buf )
        // 	message.buf = null
        // }	
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_VOICE_UID = function (dispatcher, message) {
        var packet = {};
        packet.roleId = message.id;
        packet.name = message.name;
        packet.sexId = message.sexId;
        packet.vocation = message.vocation;
        packet.icon = message.icon;
        packet.VipLevel = message.VipLevel;
        packet.data = message.voiceID;
        packet.channel = message.channel;
        packet.chatBubbleType = message.chatBubbleType;
        packet.voiceID = message.voiceID;
        packet.MsgType = 1;
        if (message.recordTime && message.recordTime > 0) {
            packet.MsgType = message.recordTime;
        }
        ChannelMrg.getInstance().addChannelMsg(message.channel, packet);
        FireEvent(EventDefine.CHAT_VOICE_RECORD_ID, ChatVoiceIDRecordEvent.newObj(message.channel, message.id, message.name, message.vocation, message.voiceID, message.recordTime, message.VipLevel, message.chatBubbleType));
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_GET_VOICE = function (dispatcher, message) {
        // let voiceUID = message.voiceID
        // let saveID = GameSound.getInstance().prepareRecord(message.buf, message.size,true)	
        // let VoiceTime = FriendSystem.getInstance().getVoiceTimeByID(voiceUID)
        // GameSound.getInstance().playRecord(saveID,true,VoiceTime)
        // if(message.buf ){
        // 	Core.IAllocator.instance.Free( message.buf )
        // 	message.buf = null
        // }	
    };
    ChatMessageHandler.prototype.onRecvG2C_QIANGDA_QUESTION = function (dispatcher, message) {
        var questionIndex = message.questionIndex;
        var question = GameConfig.OnLineQuestionConfig[questionIndex] == null && "" || GameConfig.OnLineQuestionConfig[questionIndex].topic;
        //MsgSystem.AddPubilcMsg(Localize_cns("QIANGDA_BEGIN"), 1)
        var content = String.format(Localize_cns("CURRENT_QUESTION"), question);
        //MsgSystem.addPubilcMsg(content, 1, 100)
        Chat_AddChannelMsg(channelType.SYSTEM, content);
        //Chat_AddChannelMsg(channelType.SYSTEM, content)
        FireEvent(EventDefine.ONLINE_QUESTION, QuestionContent.newObj(questionIndex));
    };
    ChatMessageHandler.prototype.onRecvG2C_CHANNEL_RECARD_SEND = function (dispatcher, message) {
        for (var _ = 0; _ < message.recordList.length; _++) {
            var packet = message.recordList[_];
            ChannelMrg.getInstance().addChannelMsg(packet["channel"], packet);
        }
    };
    //已解锁气泡列表
    ChatMessageHandler.prototype.onRecvG2C_ROLE_CHAT_WINDOW_LIST = function (dispatcher, message) {
        ChannelMrg.getInstance().setUnlockBubbleList(message.chatBubbleList);
        FireEvent(EventDefine.CHAT_UNLOCK_BUBBLE_LIST, null);
    };
    return ChatMessageHandler;
}(MessageHandler));
__reflect(ChatMessageHandler.prototype, "ChatMessageHandler");
//# sourceMappingURL=ChatMessageHandler.js.map