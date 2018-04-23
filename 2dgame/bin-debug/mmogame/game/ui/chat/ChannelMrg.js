/*
作者:
    liuziming
    
创建时间：
   2013.12.24(周二)

意图：
   处理发送频道的显示和条件判断

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
var RECORD_MAX = 5;
var PET_MAX = 2;
var ITEM_MAX = 3;
var CONTENT_MAX = 60;
// function getLinkCount(content) {
//     let list: any = {}
//     let count = 0
//     let findbegin = 1
//     let wordbegin = 1
//     let signB = string.char(3)
//     let signE = string.char(3)
//     while (true) {
//         let _, f = string.find(content, signB, findbegin)
//         if (f == null) {
//             break
//         }
//         wordbegin = f + 1
//         findbegin = f + 1
//         f = string.find(content, signE, findbegin)
//         let link = string.sub(content, wordbegin, f - 1)
//         let linkType, _, _, _ = string.match(link, "(%d);(%d+);(%d+);(.+)")
//         list[linkType] = (list[linkType] || 0) + 1
//         findbegin = f + 1
//     }
//     return list
// }
var ChannelConBase = (function (_super) {
    __extends(ChannelConBase, _super);
    function ChannelConBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelConBase.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channelType = args[0];
        this.consume = args[1] || 0;
        this.timeInterval = args[2] || 0;
        this.autoApplyRecord = checkNull(args[3], false);
        this.record = [];
        this.lastTime = null;
        this.MAX_PACKET = 50; //每个频道默认最多保存50条记录（packet-record-msg）
        this.packetList = [];
        this.typeName = Localize_cns("DANGQIAN");
    };
    ChannelConBase.prototype.checkSendCondition = function (content) {
        // let cnCount = (string.len(content) - Core.GetUtf8TextLen(content)) / 2
        // let enCount = Core.GetUtf8TextLen(content) - cnCount
        // let textLen = cnCount * 2 + enCount
        var textLen = content.length;
        var _a = this.onCheckSendCondition(), flag = _a[0], param = _a[1];
        var tips = null;
        if (!flag) {
            tips = param;
            // } else if (this.getTimeInterval() == false) {
            //     flag = false
            //     tips = String.format(Localize_cns("CHAT_SEND_TOO_FAST"), this.timeInterval)
            // 
        }
        else if (this.checkPersonalCharm() == false) {
            //每分钟获得3点
            var charmPerMin = opHomePageConfig.AutoRecoverCharm;
            var charm = GetHeroMoney(opItemUnit.HOME_PAGE_CHARM);
            var str = String.format(Localize_cns("CHAT_SEND_NO_CHARM"), charm, charmPerMin, Math.ceil(-charm / charmPerMin));
            MsgSystem.confirmDialog_YES(str);
            return false;
        }
        else if (textLen > CONTENT_MAX) {
            flag = false;
            tips = String.format(Localize_cns("CHAT_ERROR_ZIFUSHANGXIAN"), CONTENT_MAX);
        }
        if (!flag && tips != null && tips != "") {
            MsgSystem.addTagTips(tips);
        }
        return flag;
    };
    ChannelConBase.prototype.getTimeInterval = function () {
        this.curTime = GetServerTime();
        if (this.lastTime && this.curTime - this.lastTime - this.timeInterval < 0) {
            return false;
        }
        else {
            this.lastTime = this.curTime;
            return true;
        }
    };
    ChannelConBase.prototype.setRecordMessage = function (data) {
        JsUtil.arrayInstert(this.record, 0, data);
        while (size_t(this.record) > RECORD_MAX) {
            JsUtil.arrayRemove(this.record);
        }
    };
    ChannelConBase.prototype.getRecordMessage = function () {
        return this.record;
    };
    ChannelConBase.prototype.checkPersonalCharm = function () {
        return true;
    };
    ChannelConBase.prototype.getEnableState = function () {
        return [true, ""];
    };
    ChannelConBase.prototype.onCheckSendCondition = function () {
        return [true, ""];
    };
    ChannelConBase.prototype.checkChannelCondition = function () {
        var flag = this.onCheckChannelCondition();
        return flag && true;
    };
    ChannelConBase.prototype.onCheckChannelCondition = function () {
        return true;
    };
    ChannelConBase.prototype.isExceedLinkCount = function (linkType, content, MAX) {
        // let countList = getLinkCount(content)
        // if (linkType == channelOption.ITEM) {
        //     let Max = MAX || ITEM_MAX
        //     return (countList[linkType] || 0) > Max
        // } else if (linkType == channelOption.PET) {
        //     let Max = MAX || PET_MAX
        //     return (countList[linkType] || 0) > Max
        // }
        return false;
    };
    ChannelConBase.prototype.isPacketSuccess = function (packet) {
        return true;
    };
    ChannelConBase.prototype.addPacket = function (packet) {
        var flag = false;
        flag = this.isPacketSuccess(packet);
        if (flag == false) {
            return false;
        }
        if (this.packetList.length >= this.MAX_PACKET) {
            JsUtil.arrayRemove(this.packetList, 0);
        }
        JsUtil.arrayInstert(this.packetList, packet);
        return true;
    };
    ChannelConBase.prototype.findMsgPacket = function (playerId) {
        //ChannelMsgPacket
        for (var _ = 0; _ < this.packetList.length; _++) {
            var packet = this.packetList[_];
            if (packet.roleId == playerId) {
                return packet;
            }
        }
        return;
    };
    ChannelConBase.prototype.getPacketList = function () {
        return this.packetList;
    };
    ChannelConBase.prototype.clearPacketList = function () {
        this.packetList = [];
    };
    ChannelConBase.prototype.getChannelName = function () {
        return this.typeName || "ERROR";
    };
    ChannelConBase.prototype.applyChatRecord = function () {
        if (!this.autoApplyRecord) {
            return;
        }
        var message = GetMessage(opCodes.C2G_CHANNEL_RECARD_SEND);
        message.channelId = this.channelType;
        SendGameMessage(message);
    };
    return ChannelConBase;
}(TClass));
__reflect(ChannelConBase.prototype, "ChannelConBase");
//系统频道
//////////////////////////////////////////////////////////////////////////////
var ChannelSystem = (function (_super) {
    __extends(ChannelSystem, _super);
    function ChannelSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //ChannelConBase.init(this, args)
        this.minLevel = args[3] || 0;
        this.typeName = Localize_cns("XITONG");
    };
    ChannelSystem.prototype.onCheckSendCondition = function () {
        if (GetHeroProperty("level") < this.minLevel) {
            return [false, String.format(Localize_cns("CHAT_ERROR_DENGJI"), this.minLevel)];
        }
        else {
            return [true, ""];
        }
    };
    return ChannelSystem;
}(ChannelConBase));
__reflect(ChannelSystem.prototype, "ChannelSystem");
var ChannelWorld = (function (_super) {
    __extends(ChannelWorld, _super);
    function ChannelWorld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelWorld.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //ChannelConBase.init(this, args)
        this.minLevel = args[3] || 0;
        this.typeName = Localize_cns("SHIJIE");
    };
    ChannelWorld.prototype.checkPersonalCharm = function () {
        var charm = GetHeroMoney(opItemUnit.HOME_PAGE_CHARM);
        return (charm || 0) >= 0;
    };
    return ChannelWorld;
}(ChannelConBase));
__reflect(ChannelWorld.prototype, "ChannelWorld");
//队伍频道
//////////////////////////////////////////////////////////////////////////////
var ChannelTeam = (function (_super) {
    __extends(ChannelTeam, _super);
    function ChannelTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelTeam.prototype.initObj = function () {
        //ChannelConBase.init(this, args)
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.typeName = Localize_cns("DUIWU");
    };
    ChannelTeam.prototype.getEnableState = function () {
        return [HeroIsInTeam(), Localize_cns("CHAT_VOICE_TIPS8")]; //
    };
    ChannelTeam.prototype.onCheckChannelCondition = function () {
        if (!TeamSystem.getInstance().isHaveTeam()) {
            MsgSystem.addTagTips(Localize_cns("NOT_IN_ANY_TEAMS"));
            return false;
        }
        return true;
    };
    return ChannelTeam;
}(ChannelConBase));
__reflect(ChannelTeam.prototype, "ChannelTeam");
var ChannelFaction = (function (_super) {
    __extends(ChannelFaction, _super);
    function ChannelFaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelFaction.prototype.initObj = function () {
        //ChannelConBase.init(this, args)
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.typeName = Localize_cns("BANGPAI");
    };
    ChannelFaction.prototype.getEnableState = function () {
        return [GetHeroProperty("faction") != 0, Localize_cns("CHAT_VOICE_TIPS7")];
    };
    return ChannelFaction;
}(ChannelConBase));
__reflect(ChannelFaction.prototype, "ChannelFaction");
var ChannelChat = (function (_super) {
    __extends(ChannelChat, _super);
    function ChannelChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelChat.prototype.initObj = function () {
        //ChannelConBase.init(this, args)
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.typeName = Localize_cns("SILIAO");
    };
    return ChannelChat;
}(ChannelConBase));
__reflect(ChannelChat.prototype, "ChannelChat");
var ChannelNearBy = (function (_super) {
    __extends(ChannelNearBy, _super);
    function ChannelNearBy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelNearBy.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //ChannelConBase.init(this, args)
    };
    return ChannelNearBy;
}(ChannelConBase));
__reflect(ChannelNearBy.prototype, "ChannelNearBy");
var ChannelMrg = (function (_super) {
    __extends(ChannelMrg, _super);
    function ChannelMrg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelMrg.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this);
        //RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onRecvWorldMsg, this)
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this);
        this.channelList = {};
        this.curChannel = 0;
        //this.bPublicNoticeIsOn = false
        this.registerChannel(ChannelSystem.newObj(channelType.SYSTEM, 0, 6)); //系统频道
        this.registerChannel(ChannelWorld.newObj(channelType.WORLD, 0, 6, true)); //世界频道
        //this.registerChannel(ChannelSchool.newObj(channelType.SCHOOL, 3, 20))										//门派频道
        this.registerChannel(ChannelTeam.newObj(channelType.TEAM, 0, 5)); //队伍频道
        this.registerChannel(ChannelFaction.newObj(channelType.FACTION, 0, 5, true)); //帮派频道
        this.registerChannel(ChannelChat.newObj(channelType.CHAT, 0, 5)); //私聊频道
        //this.registerChannel(ChannelNearBy.newObj(channelType.NEARBY, 0, 0))//5))								//当前频道
        this.packets = [];
        this.chatPackets = [];
        this.unlockBubbleList = [];
    };
    // IsPublicNoticeOn() {
    //     return this.bPublicNoticeIsOn
    // }
    // setPublicNoticeIsOn(bIsOn) {
    //     this.bPublicNoticeIsOn = bIsOn
    // }
    ChannelMrg.prototype.registerChannel = function (channelObj) {
        var cType = channelObj.channelType;
        if (this.channelList[cType]) {
            TLog.Warn("ChannelMrg.registerChannel %d alreadey exsit", cType);
        }
        this.channelList[cType] = channelObj;
    };
    ChannelMrg.prototype.getRegisteredChannelList = function () {
        var sortChannel = [
            channelType.SYSTEM,
            channelType.WORLD,
            channelType.FACTION,
            //channelType.TEAM,
            //channelType.UNION,
            //channelType.SERVER,
            channelType.CHAT,
        ];
        var list = [];
        for (var _ = 0; _ < sortChannel.length; _++) {
            var cType = sortChannel[_];
            if (this.channelList[cType]) {
                JsUtil.arrayInstert(list, cType);
            }
        }
        return list;
    };
    ChannelMrg.prototype.getChannelState = function () {
        var stateList = {};
        for (var cType in this.channelList) {
            var channelObj = this.channelList[cType];
            stateList[cType] = channelObj.getEnableState();
        }
        return stateList;
    };
    ChannelMrg.prototype.setCurChannel = function (cType) {
        if (!this.channelList[cType]) {
            TLog.Error("ChannelMrg.setCurChannel channel:%d", cType);
            return;
        }
        this.curChannel = cType;
    };
    ChannelMrg.prototype.getCurChannel = function () {
        if (!this.channelList[this.curChannel]) {
            //TLog.Error("ChannelMrg.setCurChannel channel:%d", this.curChannel)
            this.curChannel = channelType.WORLD; //默认是当前频道
        }
        return this.curChannel;
    };
    ChannelMrg.prototype.checkSendCondition = function (content) {
        var channelObj = this.channelList[this.curChannel];
        return channelObj.checkSendCondition(content);
    };
    ChannelMrg.prototype.setCurChannelRecord = function (content) {
        var channelObj = this.channelList[this.getCurChannel()];
        channelObj.setRecordMessage(content);
    };
    ChannelMrg.prototype.getCurChannelRecord = function () {
        var channelObj = this.channelList[this.getCurChannel()];
        return channelObj.getRecordMessage();
    };
    ChannelMrg.prototype.isExceedLink = function (linkType, content, MAX) {
        var channelObj = this.channelList[this.getCurChannel()];
        return channelObj.isExceedLinkCount(linkType, content, MAX);
    };
    //超链位置信息
    ChannelMrg.prototype.openLinkWindow = function (linkType, obj) {
        if (linkType == channelOption.ITEM) {
            // let dataList: any = { ["logicItem"]: obj, ["spaceX"]: this.lastX, ["spaceY"]: this.lastY, ["superFrame"]: this }
            // ItemSystem.getInstance().showItemHint(dataList)
            ItemSystem.getInstance().showItemTips(obj);
        }
        else if (linkType == channelOption.PET) {
            var window_1 = WngMrg.getInstance().getWindow("PetInfoFrame");
            window_1.setPetInfo(obj);
        }
        else if (linkType == channelOption.PLAYER) {
            if (obj != null) {
                TLog.Debug("player is ! online");
            }
            else {
                var window_2 = WngMrg.getInstance().getWindow("ClickActorFrame");
                window_2.setFrameData(obj, "chat"); //, x + 250, y + 250, true)
            }
        }
    };
    // setWindowSpaceXY(spaceX, spaceY) {
    //     this.lastX = spaceX
    //     this.lastY = spaceY
    // }
    ChannelMrg.prototype.onPrecedureDeactive = function (args) {
        this.packets = [];
        this.chatPackets = [];
        for (var _ in this.channelList) {
            var channelObj = this.channelList[_];
            channelObj.clearPacketList();
        }
        if (this.fakeChatTimer) {
            KillTimer(this.fakeChatTimer);
            this.fakeChatTimer = null;
        }
        this.saveChatHistory = [];
    };
    ChannelMrg.prototype.onRecvWorldMsg = function (packet) {
        if (packet.channel == channelType.SYSTEM) {
            //return;
        }
        var arg = {};
        arg.packet = table_copy(packet);
        if (this.packets.length == 10) {
            JsUtil.arrayRemove(this.packets, 0);
        }
        JsUtil.arrayInstert(this.packets, arg);
        if (arg.packet["channel"] != channelType.SYSTEM) {
            if (this.chatPackets.length == 10) {
                JsUtil.arrayRemove(this.chatPackets, 0);
            }
            JsUtil.arrayInstert(this.chatPackets, arg);
        }
    };
    ChannelMrg.prototype.getMsgPacket = function () {
        return this.packets;
    };
    ChannelMrg.prototype.getMsgChatPacket = function () {
        return this.chatPackets;
    };
    ChannelMrg.prototype.getChannelObj = function (cType) {
        return this.channelList[cType];
    };
    ChannelMrg.prototype.addChannelMsg = function (cType, packet) {
        // if (FriendSystem.getInstance().checkPlayerInBlack(packet.roleId)) {
        //     return
        // }
        if (channelType.CHAT == cType) {
            this.onRecvWorldMsg(packet);
            FireEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, ChatRecvChannelMsgEvent.newObj(packet));
            return;
        }
        var channelObj = this.getChannelObj(cType);
        if (!channelObj) {
            TLog.Error("ChannelMrg.addChannelMsg channel %s is null", cType);
            return false; //表示不符合记录条件
        }
        if (channelObj.addPacket(packet) == true) {
            this.onRecvWorldMsg(packet);
            FireEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, ChatRecvChannelMsgEvent.newObj(packet));
        }
    };
    ChannelMrg.prototype.getChannelPacketList = function (cType) {
        var channelObj = this.getChannelObj(cType);
        if (!channelObj) {
            TLog.Error("ChannelMrg.getChannelPacketList %s is null", cType);
            return [];
        }
        return channelObj.getPacketList();
    };
    ChannelMrg.prototype.checkChannelCondition = function (cType) {
        var channelObj = this.getChannelObj(cType);
        if (!channelObj) {
            TLog.Error("ChannelConBase.checkChannelCondition channel %s is null", cType);
            return false; //表示不符合记录条件
        }
        return channelObj.checkChannelCondition();
    };
    ChannelMrg.prototype.getChannelName = function (cType) {
        //只有注册了的频道才会有返回
        var channel = this.getChannelObj(cType);
        var cName = "ERROR";
        if (channel) {
            cName = channel.getChannelName();
        }
        return cName;
    };
    ChannelMrg.prototype.onHeroEnterGame = function (args) {
        if (this.fakeChatTimer) {
            KillTimer(this.fakeChatTimer);
            this.fakeChatTimer = null;
        }
        var _a = CheckClientFuncLimit("fakeChat"), flag = _a[0], _ = _a[1];
        if (flag == false) {
            this.fakeChatTimer = SetTimer(this.runFakeChat, this, 45000, false);
        }
        //申请聊天记录
        for (var _1 in this.channelList) {
            var v = this.channelList[_1];
            v.applyChatRecord();
        }
    };
    ChannelMrg.prototype.runFakeChat = function () {
        //Math.randomseed(GetServerTime())
        var _a = CheckClientFuncLimit("fakeChat"), flag = _a[0], _ = _a[1];
        if (flag == true) {
            if (this.fakeChatTimer) {
                KillTimer(this.fakeChatTimer);
                this.fakeChatTimer = null;
            }
        }
        this.saveChatHistory = this.saveChatHistory || [];
        var index = MathUtil.random(size_t(GameConfig.FakeChatConfig)) - 1;
        var vocationList = [];
        for (var k in GameConfig.ProfessionModelConfig) {
            var v = GameConfig.ProfessionModelConfig[k];
            JsUtil.arrayInstert(vocationList, v.entryId);
        }
        var goToFake = MathUtil.random(3);
        if (goToFake == 3) {
            return;
        }
        var indexAvailableList = []; //可用的索引
        if (size_t(this.saveChatHistory) == size_t(GameConfig.FakeChatConfig)) {
            return;
        }
        else {
            for (var k in GameConfig.FakeChatConfig) {
                var v = GameConfig.FakeChatConfig[k];
                if (!table_isExsit(this.saveChatHistory, v.chatId)) {
                    JsUtil.arrayInstert(indexAvailableList, v.chatId);
                }
            }
            if (size_t(indexAvailableList) == 0) {
                return;
            }
            index = MathUtil.random(indexAvailableList.length) - 1;
            if (!indexAvailableList[index]) {
                return;
            }
            JsUtil.arrayInstert(this.saveChatHistory, indexAvailableList[index]);
            //Config.getInstance().setRoleSetting("string","indexHistory",table_save(indexHistory))
        }
        var content = "...";
        if (GameConfig.FakeChatConfig[(indexAvailableList[index])] != null) {
            content = GameConfig.FakeChatConfig[(indexAvailableList[index])].content;
        }
        var iconlist = ["1", "2"];
        var packet = ChannelMsgPacket.newObj();
        packet.roleId = 0;
        packet.name = ""; //name
        packet.channel = channelType.WORLD;
        packet.sexId = MathUtil.random(1, 2);
        packet.data = content;
        packet.vocation = vocationList[MathUtil.random(size_t(vocationList)) - 1] || 40000;
        packet.icon = iconlist[MathUtil.random(1, size_t(iconlist))];
        packet.name = RandomRobotName();
        this.addChannelMsg(channelType.WORLD, packet);
    };
    //已解锁气泡列表
    ChannelMrg.prototype.setUnlockBubbleList = function (args) {
        this.unlockBubbleList = args;
    };
    ChannelMrg.prototype.getUnlockBubbleList = function () {
        return this.unlockBubbleList || [];
    };
    ChannelMrg.prototype.findMsgPacket = function (playerId) {
        for (var i in this.channelList) {
            var v = this.channelList[i];
            var packet = v.findMsgPacket(playerId);
            if (packet) {
                return packet;
            }
        }
        return null;
    };
    return ChannelMrg;
}(TClass));
__reflect(ChannelMrg.prototype, "ChannelMrg");
//# sourceMappingURL=ChannelMrg.js.map