/*
作者:
    LiRong
    
创建时间：
    2014.08.29(星期五)

意图：
    好友聊天、陌生人聊天

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
var MaxWidthOneRow = 306;
var ChatWndHeight = 100;
var ChatInChannel_ChatWnd = (function (_super) {
    __extends(ChatInChannel_ChatWnd, _super);
    function ChatInChannel_ChatWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatInChannel_ChatWnd.prototype.initObj = function () {
        // 信息框，由外面传进来的参数设定
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.needToInit = true;
        this.duiHuaNum = {};
        this.duiHuaHeight = {};
        this.friendId = -1;
        this.chatIndex = 0;
        this.inputType = 1; //1 文字 2 语言
        this.totalWndNumber = 0;
    };
    ChatInChannel_ChatWnd.prototype.onLoad = function () {
        //this.mElemList = ui_util.SetLookAndFeelWindow("Frame/Template02", this.mLayoutNode, 600, 850, 0, 0)
        //this.mElemList["return"]:SubscribeEvent(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this)
        //this.mElemList["return"]:SetXY(5, 17)
        //this.mLayoutNode.setDoModal(true)
        //this.mLayoutNode.SetLayer(gui.Window.LayerTop)
        this.mElemList = this.mParentWnd.mElemList;
        this.parentWnd = this.mElemList["friendRootWnd"];
        if (this.parentWnd) {
            this.parentWnd.visible = (false);
        }
        var elemInfo = [
            (_a = {}, _a["name"] = "plrInfoBtn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickFriendMenu, _a),
            (_b = {}, _b["name"] = "findFriend", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickFindFriend, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.friendsScroll = UIScrollList.newObj(this.mLayoutNode, "friendsScroll", 0, 0, 140, 510, this.mElemList["group_friends"]);
        this.chatListScroll = UIScrollList.newObj(this.mLayoutNode, "chatListScroll", 0, 0, 400, 555, this.mElemList["group_friendschat"]);
        var _a, _b;
    };
    ChatInChannel_ChatWnd.prototype.onUnLoad = function () {
    };
    ChatInChannel_ChatWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.MESSAGE_UPDATE, this.onMessageCome, this);
        RegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refreshFrame, this);
        RegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.onSearchResule, this);
        //RegisterEvent(EventDefine.SYSTEM_IME_SHOW,this.onImeShow,this)
        //RegisterEvent(EventDefine.SYSTEM_IME_HIDE,this.onImeHide,this)
        //RegisterEvent(EventDefine.SYSTEM_RECORD_STOP, this.onStopVoiceRecord, this)
        //RegisterEvent(EventDefine.SYSTEM_RECORD_START, this.onStartVoiceRecord, this)
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP,this.onClickVoiceWnd,this)
        //this.showAction.run()
        this.parentWnd.visible = (true);
        this.needToInit = true;
        this.refreshFrame();
        //this.changeInputByType()
        //this.mLayoutNode.setDoModal(true)
        //TestIme()
    };
    ChatInChannel_ChatWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.MESSAGE_UPDATE, this.onMessageCome, this);
        UnRegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.onSearchResule, this);
        //UnRegisterEvent(EventDefine.SYSTEM_IME_SHOW,this.onImeShow,this)
        //UnRegisterEvent(EventDefine.SYSTEM_IME_HIDE,this.onImeHide,this)
        //UnRegisterEvent(EventDefine.SYSTEM_RECORD_STOP, this.onStopVoiceRecord, this)
        //UnRegisterEvent(EventDefine.SYSTEM_RECORD_START, this.onStartVoiceRecord, this)
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP,this.onClickVoiceWnd,this)
        //this.showAction.stop()
        //this.hideAction.stop()
        this.parentWnd.visible = (false);
        //this.mLayoutNode.setDoModal(false)
        // RemoteImage.clearGroup("ChatInChannel_ChatWnd1")
        // RemoteImage.clearGroup("ChatInChannel_ChatWnd2")
    };
    ChatInChannel_ChatWnd.prototype.refreshFrame = function () {
        this.controlDataTable = {};
        this.refreshFriends();
        this.refreshChat();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////-
    //刷新好友
    ChatInChannel_ChatWnd.prototype.refreshFriends = function () {
        //FriendSystem.getInstance().removeIconMsgInfoByType("MESSAGE_ONE")
        MsgSystem.removeIconMsgByType(IconMsgType.FRIEND_CHAT);
        var sortFrindList = [];
        //正在聊天的
        var messageInfoList = FriendSystem.getInstance().getMessageInfoList();
        var showCount = 0;
        for (var roleId in messageInfoList) {
            //let messageInfo:MessageInfo = messageInfoList[_]
            var friendInfo = FriendSystem.getInstance().getChatPlayerInfo(tonumber(roleId));
            if (friendInfo) {
                JsUtil.arrayInstert(sortFrindList, friendInfo);
            }
        }
        //好友
        var friendList = FriendSystem.getInstance().getFriendInfoList();
        for (var roleId in friendList) {
            var friendInfo = friendList[roleId];
            if (messageInfoList[roleId] == null) {
                JsUtil.arrayInstert(sortFrindList, friendInfo);
            }
        }
        var strangerList = FriendSystem.getInstance().getChatStrangerList();
        for (var roleId in strangerList) {
            var friendInfo = strangerList[roleId];
            if (messageInfoList[roleId] == null) {
                JsUtil.arrayInstert(sortFrindList, friendInfo);
            }
        }
        friendList = FriendSystem.getInstance().getFriendInfoList();
        for (var roleId in messageInfoList) {
            var friendInfo = messageInfoList[roleId];
            if (messageInfoList[roleId] == null) {
                JsUtil.arrayInstert(sortFrindList, friendInfo);
            }
        }
        //排序(先在线，再等级)
        table_sort(sortFrindList, function (a, b) {
            //let acount = FriendSystem.getInstance().getFriendUnReadMsgCount(a.roleId)
            //let bcount = FriendSystem.getInstance().getFriendUnReadMsgCount(b.roleId)
            //if(acount != bcount ){
            //	return acount > bcount
            //} 
            var aLastChat = FriendSystem.getInstance().getFriendLastChat(a.roleId);
            var bLastChat = FriendSystem.getInstance().getFriendLastChat(b.roleId);
            var aLastTime = aLastChat && aLastChat.time || -1;
            var bLastTime = bLastChat && bLastChat.time || -1;
            if (aLastTime != bLastTime) {
                return bLastTime - aLastTime;
            }
            if (a.isOnline != b.isOnline) {
                return b.isOnline - a.isOnline;
            }
            if (a.level != b.level) {
                return b.level - a.level;
            }
            return b.roleId - a.roleId;
        });
        if (this.friendId < 0 && sortFrindList.length > 0) {
            var v = sortFrindList[0];
            this.friendId = v.roleId;
            this.friendName = v.roleName;
            this.needToInit = true;
        }
        if (this.friendId > 0) {
            FriendSystem.getInstance().setFriendMsgCountZero(this.friendId);
        }
        // RemoteImage.clearGroup("ChatInChannel_ChatWnd1")
        // RemoteImage.clearGroup("ChatInChannel_ChatWnd2")
        var selectIndex = -1;
        var scroll = this.friendsScroll;
        scroll.clearItemList();
        for (var k = 0; k < sortFrindList.length; k++) {
            var v = sortFrindList[k];
            var window_1 = scroll.getItemWindow(k, 135, 115, 0, 0);
            this.initItemWindow(window_1, k);
            this.refreshItemWindow(window_1, v);
            if (v.roleId == this.friendId) {
                selectIndex = k;
            }
        }
        scroll.refreshScroll();
        if (this.needToInit) {
            if (selectIndex >= 0) {
                scroll.moveToScrollIndex(selectIndex);
            }
        }
    };
    ChatInChannel_ChatWnd.prototype.initItemWindow = function (window, i) {
        var name = window.name;
        var width = window.width, height = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "selectbg", _a["title"] = null, _a["font"] = null, _a["image"] = "lt_xuanZhongDi", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickFriendChat, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "petboxbg", _b["title"] = null, _b["font"] = null, _b["image"] = null, _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name + "weiduBg", _c["title"] = "", _c["font"] = "ht_18_cc", _c["image"] = "hy_textHongDi01", _c["color"] = gui.Color.white, _c["x"] = 100, _c["y"] = 0, _c["w"] = 37, _c["h"] = 37, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "weidu", _d["title"] = "", _d["font"] = "ht_18_cc", _d["image"] = "hy_textHongDi01", _d["color"] = gui.Color.white, _d["x"] = 100, _d["y"] = 0, _d["w"] = 37, _d["h"] = 37, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = name + "namebg", _e["title"] = null, _e["font"] = null, _e["image"] = "ty_UIBg01", _e["color"] = gui.Color.white, _e["x"] = 10, _e["y"] = height - 30, _e["w"] = 120, _e["h"] = 32, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "name_level", _f["parent"] = name + "namebg", _f["title"] = "", _f["font"] = "ht_18_cc", _f["image"] = null, _f["color"] = gui.Color.white, _f["x"] = 0, _f["y"] = 0, _f["w"] = 120, _f["h"] = 20, _f["event_name"] = null, _f["fun_index"] = null, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var petBox = UIPetBox.newObj(this.mLayoutNode, name + "player_icon", 10, 0, this.mElemList[name + "petboxbg"], 0.8, "ChatInChannel_ChatWnd1");
        petBox.setPetHintEnable(false);
        //let mElemInfo:any = {
        //										
        //									}
        //petBox.createElem(mElemInfo, this.mElemList, this)
        this.mElemList[name + "player_icon"] = petBox;
        var _a, _b, _c, _d, _e, _f;
        //this.mElemList[name + "selectbg"]:SetLayer(gui.Window.LayerBottom)
        //this.mElemList[name+"selectfg"]:SetLayer(gui.Window.LayerTop)
    };
    ChatInChannel_ChatWnd.prototype.refreshItemWindow = function (window, v) {
        var name = window.name;
        var weiDuNum = FriendSystem.getInstance().getFriendUnReadMsgCount(v.roleId);
        if (weiDuNum > 99) {
            weiDuNum = 99 + "+";
        }
        this.mElemList[name + "weidu"].text = (weiDuNum);
        this.mElemList[name + "weidu"].visible = (weiDuNum > 0);
        this.mElemList[name + "weiduBg"].visible = (weiDuNum > 0);
        this.mElemList[name + "name_level"].text = (v.roleName);
        this.mElemList[name + "selectbg"].source = (v.roleId == this.friendId && "lt_xuanZhongDi" || "");
        //this.mElemList[name +"selectfg"].visible = (false)
        //this.mElemList[name +"player_icon"]:setPetTipsListner(this.onClickFriendChat, this, v)
        this.mElemList[name + "player_icon"].updateVocSexHead(v.vocation, v.sexId, v.icon, v["VipLevel"]);
        if (v.isOnline == 1) {
            this.mElemList[name + "player_icon"].setEnable(true);
        }
        else {
            this.mElemList[name + "player_icon"].setEnable(false);
        }
        this.controlDataTable[name + "selectbg"] = v;
        //TLog.Debug(v)
    };
    ChatInChannel_ChatWnd.prototype.onClickFriendChat = function (args) {
        var friendInfo = this.controlDataTable[args.target.name];
        if (friendInfo == null) {
            return;
        }
        if (friendInfo.roleId == this.friendId) {
            return;
        }
        this.showWithFriendInfo(friendInfo.roleId, friendInfo.roleName);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////-
    //刷新对话内容
    ChatInChannel_ChatWnd.prototype.refreshChat = function () {
        var friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId);
        if (friendInfo) {
            TLog.Debug(friendInfo);
            var nameLevel = "";
            if (friendInfo) {
                nameLevel = friendInfo.roleName;
                if (friendInfo.level >= 0) {
                    nameLevel = nameLevel + " " + "Lv " + friendInfo.level;
                }
            }
            this.mElemList["nameLabel"].text = (nameLevel);
        }
        else {
            this.mElemList["nameLabel"].text = ("");
        }
        if (this.needToInit) {
            //this.resetAllChatWnd()
            if (!this.duiHuaNum[this.friendId]) {
                this.duiHuaNum[this.friendId] = 1;
            }
            if (!this.duiHuaHeight[this.friendId]) {
                this.duiHuaHeight[this.friendId] = 0;
            }
            this.initOffLineRecord();
            this.needToInit = false;
        }
    };
    // resetAllChatWnd() {
    // 	this.chatIndex = 0
    // }
    ChatInChannel_ChatWnd.prototype.initOffLineRecord = function () {
        TLog.Debug("ChatInChannel_ChatWnd.initOffLineRecord");
        this.saveVoiceList = {};
        var messageList = FriendSystem.getInstance().getFriendMessage(this.friendId);
        var friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId);
        //TLog.Debug(messageList)
        if (messageList) {
            var sortFunc = function (a, b) {
                return a.time - b.time;
            };
            table_sort(messageList, sortFunc);
        }
        // for (let i = 1; i <= this.totalWndNumber, 1; i++) {
        // 	let wndName = "chat_wnd"+i
        // 	let wnd = this.mElemList[wndName]
        // 	if (wnd) {
        // 		wnd.visible = (false)
        // 		let rd = wnd.mElemList["chat"]
        // 		if (rd) {
        // 			rd.SetWH(400, 30)
        // 		}
        // 	}
        // }
        this.chatIndex = 0;
        this.chatListScroll.clearItemList();
        var totalH = 0;
        for (var k in messageList) {
            var v = messageList[k];
            var wnd = this.creatOneChatWnd();
            this.updateChatWnd(wnd, v);
            // let wndName = "chat_wnd"+this.chatIndex
            // let wnd = this.mElemList[wndName]
            // if (!wnd) {
            // 	wnd = this.creatOneChatWnd(wndName, v)
            // 	//this.Chatlist.AddItem(wnd)	
            // } else {
            // 	this.updateChatWnd(wnd, v)
            // }
            // //wnd.visible = (true)
            // totalH = wnd.GetY()
            //TLog.Debug("this.Chatlist:ShowItemRow",this.chatIndex)	
        }
        this.chatListScroll.moveToScrollIndex(this.chatIndex - 1);
        //TLog.Debug("this.Chatlist:ScrollToXY", totalH, this.Chatlist.width, this.chatIndex * ChatWndHeight)
        // this.Chatlist.SetViewWH(this.Chatlist.width, totalH + 180)
        // this.Chatlist.ScrollToXY(0, totalH, false)
        //this.Chatlist.ShowItemRow(this.chatIndex)	
    };
    ChatInChannel_ChatWnd.prototype.creatOneChatWnd = function () {
        var chatWnd = this.chatListScroll.getItemWindow(this.chatIndex, 400, ChatWndHeight, 0, 0);
        this.chatIndex = this.chatIndex + 1;
        this.totalWndNumber = this.totalWndNumber + 1;
        // 	let mElemInfo: any = { 
        // 	{["index_type"] : gui.ControlType.Window, ["name"] : wndName, ["x"] : 0, ["y"] : (this.totalWndNumber - 1) * ChatWndHeight + 10, ["w"] : 530, ["h"] : ChatWndHeight, ["event_name"] : null, ["fun_index"] : null },
        // }
        // ui_util.CreateElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.Chatlist)
        //let chatWnd = this.mElemList[wndName]
        var wndName = chatWnd.name;
        chatWnd.mElemList = {};
        var info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "chat_bg", _a["image"] = null, _a["x"] = 120, _a["y"] = 40, _a["w"] = 300, _a["h"] = 60, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "chat_bgimg", _b["parent"] = "chat_bg", _b["image"] = "hy_duiHuaDi01", _b["x"] = 0, _b["y"] = 0, _b["percentWidth"] = 100, _b["percentHeight"] = 100, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickChatBg, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = "chat_top_icon", _c["image"] = "hy_VIPduiHua02", _c["x"] = 116, _c["y"] = -9, _c["w"] = 109, _c["h"] = 54, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "chat", _d["title"] = "", _d["font"] = "ht_24_lc", _d["color"] = gui.Color.white, _d["x"] = 150, _d["y"] = 50, _d["w"] = 260, _d["h"] = 30, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickChatBg, _d),
        ];
        UiUtil.createElem(info, this.mLayoutNode, chatWnd.mElemList, this, chatWnd);
        chatWnd.mElemList["player_icon"] = UIPetBox.newObj(this.mLayoutNode, wndName + "player_icon", 0, 0, chatWnd, 0.7, "ChatInChannel_ChatWnd2");
        chatWnd.mElemList["player_icon"].setPetHintEnable(false);
        //chatWnd.mElemList["vip_level"]:SetHandleMessageFlag(true)
        chatWnd.mElemList["chat"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this);
        return chatWnd;
        var _a, _b, _c, _d;
    };
    ChatInChannel_ChatWnd.prototype.onClickChatBg = function (args) {
        //tolua.cast(args, "gui::GUIMouseEvent")
        //TLog.Debug("ChatInChannel_ChatWnd.onClickChatBg",args.window.name,args.window.GetParent().GetParent().GetParent().name)
        if (args.target) {
            var parentWindow = args.target.parent; //:GetParent()
            if (parentWindow) {
                var windowName = parentWindow.name;
                var voiceID = this.saveVoiceList[windowName];
                if (voiceID) {
                    //TLog.Debug("GameSound.getInstance().playRecord",voiceID)
                    GameSound.getInstance().playRecord(voiceID);
                }
            }
        }
    };
    ChatInChannel_ChatWnd.prototype.updateChatWnd = function (chatWnd, messageInfo) {
        //TLog.Debug("ChatInChannel_ChatWnd.updateChatWnd")
        //TLog.Debug(debug.traceback())
        //TLog.Debug(messageInfo)
        chatWnd.visible = (true);
        //this.controlDataTable[chatWnd.name]={messageInfo.fromFriendId,messageInfo.isSelfSend}
        var voiceIconName = "#VOICE_ICON_LEFT";
        if (messageInfo.isSelfSend) {
            voiceIconName = "#VOICE_ICON_RIGHT";
        }
        var chatBubbleList = VipSystem.getInstance().getSortChatBubbleList();
        var chatBubbleType = checkNull(messageInfo.chatBubbleType, 1);
        var chatBg = "hy_duiHuaDi01", chatTopIcon = "";
        for (var i = 0; i < chatBubbleList.length; i++) {
            var v = chatBubbleList[i];
            if (chatBubbleType == v.index) {
                chatBg = v.imgName[0];
                chatTopIcon = v.imgName[1];
                break;
            }
        }
        chatWnd.mElemList["chat_bgimg"].source = (chatBg);
        chatWnd.mElemList["chat_top_icon"].source = (chatTopIcon);
        //TLog.Debug("===============ChatInChannel_ChatWnd.updateChatWnd", messageInfo.chatBubbleType)
        var fontInfo = {};
        fontInfo.default_color = "black";
        fontInfo.defalut_font = "ht_20_lc";
        fontInfo.no_change_font = true;
        var xml;
        if (messageInfo.MsgType) {
            var typeToShow = channelOption.VOICE;
            var voiceID = tonumber(messageInfo.data);
            var targetId = messageInfo.MsgType;
            var context = Localize_cns("CHAT_TYPE_VOICE");
            var voiceTime = messageInfo.MsgType;
            var str = "";
            while (voiceTime && voiceTime > 0) {
                str = str + "#little_space";
                voiceTime = voiceTime - 1;
            }
            str = str + "#black|" + typeToShow + ";" + voiceID + ";" + targetId + ";" + context + "|" + messageInfo.MsgType + "\"";
            var strLink = str;
            var xmlLink = voiceIconName + "|" + typeToShow + ";" + voiceID + ";" + targetId + ";" + context + "|";
            if (voiceIconName == "#VOICE_ICON_LEFT") {
                xmlLink = xmlLink + strLink;
            }
            else {
                xmlLink = strLink + xmlLink;
            }
            xml = XmlConverter.parseText(xmlLink, fontInfo); //this.analyzeHyperLink(xmlLink)
            //TLog.Debug("~~",xml,xmlLink,context)
            this.saveVoiceList[chatWnd.name] = tonumber(messageInfo.data);
        }
        else {
            var str = messageInfo.data;
            xml = this.analyzeHyperLink(str);
        }
        //TLog.Debug(xml,messageInfo.data)
        //TLog.Debug("get rd",rd.width,rd.height)	
        var rd = chatWnd.mElemList["chat"];
        var rd_bg = chatWnd.mElemList["chat_bg"];
        var rd_bgimg = chatWnd.mElemList["chat_bgimg"];
        rd.clear();
        rd.addXmlString(xml);
        var w = rd.getLogicWidth() + 2;
        var h = rd.getLogicHeight() + 2;
        var addH = 0;
        if (h > 72) {
            addH = 36;
        }
        h = MathUtil.clamp(h, 53, ChatWndHeight + addH);
        if (w > 260) {
            w = 260;
        }
        UiUtil.setWH(rd, w, h);
        var bg_w = w + 43;
        if (bg_w < 130) {
            bg_w = 130;
        }
        UiUtil.setWH(rd_bg, bg_w + 10, h);
        UiUtil.setWH(chatWnd, chatWnd.width, ChatWndHeight + addH);
        // let index = tonumber(string.match(chatWnd.name, "(%d+)"))
        // let prechatWnd = this.mElemList["chat_wnd"+(index - 1)]
        // if (prechatWnd) {
        // 	let pcw_y, pcw_h = prechatWnd.GetY(), prechatWnd.height
        // 	let ncw_y = pcw_y + pcw_h + 10
        // 	chatWnd.SetXY(chatWnd.GetX(), ncw_y)
        // } else {
        // 	chatWnd.SetXY(chatWnd.GetX(), (index - 1) * ChatWndHeight + 10)
        // }
        if (messageInfo.isSelfSend) {
            //TLog.Debug("isself")
            //rd_bg:SetFilpX(true)
            var vocation = GetHeroProperty("vocation");
            var sexId = GetHeroProperty("sexId");
            var viplevel = GetHeroProperty("VIP_level");
            // let homeinfo = HomepageSystem.getInstance().getSelfHomepageInfo()
            var icon = "1";
            // if (homeinfo != null && homeinfo.icon != null) {
            // 	icon = homeinfo.icon
            // }
            //chatWnd.mElemList["player_icon"].setPetHintEnable(false)
            chatWnd.mElemList["player_icon"].updateVocSexHead(vocation, sexId, icon, viplevel);
            chatWnd.mElemList["player_icon"].setXY(310, 0);
            UiUtil.setXY(rd, 338 - rd_bg.width, 50);
            UiUtil.setXY(rd_bg, 328 - rd_bg.width, 40);
            UiUtil.setXY(chatWnd.mElemList["chat_top_icon"], rd_bg.x, 0);
            rd_bgimg.scaleX = -1;
        }
        else {
            //rd_bg:SetFilpX(false)
            var friendInfo = FriendSystem.getInstance().getChatPlayerInfo(messageInfo.fromFriendId);
            if (friendInfo) {
                //TLog.Debug(friendInfo)
                //let qualityName = ProfessionSystem.getInstance().getProfessionQualityImage(friendInfo.vocation)
                //let imageName = ProfessionSystem.getInstance().getProfessionIcon(friendInfo.vocation, friendInfo.sexId)
                //chatWnd.mElemList["player_icon"].source = (imageName)
                //chatWnd.mElemList["player_kuang"].source = (qualityName)
                //chatWnd.mElemList["player_kuang"]:SetXY(0, 0)
                var icon = messageInfo.icon;
                if (icon == null) {
                    icon = friendInfo.icon;
                }
                var VipLevel = messageInfo.VipLevel;
                if (VipLevel == null) {
                    VipLevel = friendInfo.VipLevel;
                }
                //chatWnd.mElemList["player_icon"]:setPetTipsListner(this.onShowMenuList, this, {friendInfo.roleId, friendInfo.roleName})
                chatWnd.mElemList["player_icon"].setPetHintEnable(false);
                chatWnd.mElemList["player_icon"].updateVocSexHead(friendInfo.vocation, friendInfo.sexId, icon, VipLevel);
                chatWnd.mElemList["player_icon"].setXY(0, 0);
                UiUtil.setXY(rd, 133, 50);
                UiUtil.setXY(rd_bg, 101, 40);
                UiUtil.setXY(chatWnd.mElemList["chat_top_icon"], rd_bg.x + rd_bg.width - 109, 0);
            }
            else {
                TLog.Error("get friendInfo err  is null !!! ");
                //this.hideWnd()
            }
            rd_bgimg.scaleX = 1;
        }
        rd_bgimg.anchorOffsetX = rd_bg.width / 2;
        rd_bgimg.anchorOffsetY = rd_bg.height / 2;
        rd_bgimg.x = rd_bg.width / 2;
        rd_bgimg.y = rd_bg.height / 2;
    };
    ChatInChannel_ChatWnd.prototype.analyzeHyperLink = function (content) {
        var color = "white";
        var param = {};
        param.no_change_font = true;
        param.default_color = color;
        param.defalut_font = "ht_20_cc_stroke";
        param.link_parser = ContentParseLinkHandler;
        return XmlConverter.parseText(content, param);
    };
    ChatInChannel_ChatWnd.prototype.onClickHyperLink = function (args) {
        var link = args.getHyperlink();
        var _a = StringUtil.stringMatch(link, /(\d);(\d+);(\d+);(.+)/), linkType = _a[0], playerId = _a[1], targetId = _a[2], name = _a[3];
        linkType = tonumber(linkType);
        //TLog.Debug("ChatInChannel_ChatWnd.onClickHyperLink",linkType,playerId,targetId,link)
        if (linkType == channelOption.ITEM) {
            var message = GetMessage(opCodes.C2G_CHANNEL_PET_ITEM);
            message.playerId = tonumber(playerId);
            message.rage = 2;
            message.uId = tonumber(targetId);
            SendGameMessage(message);
        }
        else if (linkType == channelOption.PET) {
            var message = GetMessage(opCodes.C2G_CHANNEL_PET_ITEM);
            message.playerId = tonumber(playerId);
            message.rage = 1;
            message.uId = tonumber(targetId);
            SendGameMessage(message);
        }
        else if (linkType == channelOption.VOICE) {
            var voiceID = tonumber(playerId);
            if (voiceID) {
                GameSound.getInstance().playRecord(voiceID, false, tonumber(targetId));
            }
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ChatInChannel_ChatWnd.prototype.onClickFriendMenu = function (args) {
        if (this.friendId < 0) {
            return;
        }
        var spacex = args.stageX;
        var spacey = args.stageY;
        //let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId)
        var wnd = WngMrg.getInstance().getWindow("MainPlayerFrame");
        wnd.showMainPlayerFrame(spacex, spacey, this.friendId, this.friendName);
    };
    ChatInChannel_ChatWnd.prototype.onClickFindFriend = function (args) {
        WngMrg.getInstance().showWindow("FindFriendFrame");
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ChatInChannel_ChatWnd.prototype.onMessageCome = function (args) {
        this.refreshFrame();
        var messageInfo = args.messageInfo;
        if (messageInfo && messageInfo.fromFriendId != this.friendId) {
            return;
        }
        var wnd = this.creatOneChatWnd();
        this.updateChatWnd(wnd, messageInfo);
        this.chatListScroll.moveToScrollIndex(this.chatIndex - 1);
        // //TLog.Debug("ChatInChannel_ChatWnd.onMessageCome")
        // //TLog.Debug(messageInfo)
        // this.chatIndex = this.chatIndex + 1
        // let wndName = "chat_wnd"+this.chatIndex
        // let wnd = this.mElemList[wndName]
        // if (!wnd) {
        // 	wnd = this.creatOneChatWnd(wndName)
        // 	//this.Chatlist.AddItem(wnd)	
        // } else {
        // 	this.updateChatWnd(wnd, messageInfo)
        // }
        // //this.Chatlist.ShowItemRow(this.chatIndex)	
        // let totalH = wnd.GetY()
        // //TLog.Debug("this.Chatlist:ShowItemRow",this.chatIndex)	
        // this.Chatlist.SetViewWH(this.Chatlist.width, totalH + 180)
        // this.Chatlist.ScrollToXY(0, totalH, false)
    };
    ChatInChannel_ChatWnd.prototype.onSearchResule = function (args) {
        //this.refreshFriends()
        this.showWithFriendInfo(args.playerInfo.roleId);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ChatInChannel_ChatWnd.prototype.onVoiceStart = function (args) {
        if (this.friendId < 0) {
            MsgSystem.addTagTips(Localize_cns("CHAT_TXT6"));
            return false;
        }
        var friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId);
        if (friendInfo == null || friendInfo.isOnline != 1) {
            MsgSystem.addTagTips(Localize_cns("CHAT_TXT7"));
            return false;
        }
        return true;
    };
    ChatInChannel_ChatWnd.prototype.sendVoiceRecord = function (args) {
        if (args.recordBuffer && args.size && args.size > 0) {
            var id = GetHeroPropertyInfo().id;
            if (this.friendId) {
                id = this.friendId;
            }
            else {
                TLog.Error("onStopVoiceRecord Error  this.friendName is null ");
            }
            var message = GetMessage(opCodes.C2G_CHANNEL_VOICE);
            message.channel = channelType.CHAT;
            message.roleId = id;
            message.recordBuffer = args.recordBuffer;
            message.recordSize = args.size;
            message.recordTime = args.recordTime;
            SendGameMessage(message);
            var voiceID = GameSound.getInstance().prepareRecord(args.recordBuffer, args.size);
            //let homeinfo = HomepageSystem.getInstance().getHomepageInfo()
            var vipLevel = VipSystem.getInstance().GetVipLevel();
            var messageInfo = MessageInfo.newObj(this.friendId, voiceID, GetServerTime(), this.friendName, vipLevel, GetHeroProperty("chatBubbleType"));
            messageInfo.MsgType = args.recordTime; //语音
            messageInfo.isSelfSend = true; //自己发出
            messageInfo.readState = 1; //已读
            messageInfo.setIconInfo("", GetHeroProperty("vocation"), GetHeroProperty("sexId"));
            FriendSystem.getInstance().addMessageInfo(messageInfo);
        }
    };
    ChatInChannel_ChatWnd.prototype.sendChatMessage = function (content) {
        TLog.Debug("ChatInChannel_ChatWnd.sendChatMessage", content, this.friendId);
        if (content == null) {
            MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_NEIRONGBUNENGWEIKONG"));
            return false;
        }
        if (this.friendId < 0) {
            MsgSystem.addTagTips(Localize_cns("CHAT_TXT6"));
            return false;
        }
        if (content.length > 90) {
            MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_TOO_LONG"));
            return false;
        }
        content = WordFilter.filtWord(content);
        var name = GetHeroPropertyInfo().id;
        if (this.friendId) {
            name = this.friendId;
        }
        else {
            TLog.Error("ChatInChannel_ChatWnd.onClickSendMessage err  this.friendName is null ");
            return false;
        }
        var message = GetMessage(opCodes.C2G_CHANNEL_SEND);
        message.channel = channelType.CHAT;
        message.data = content;
        message.name = name;
        SendGameMessage(message);
        //let homeinfo = HomepageSystem.getInstance().getHomepageInfo()
        //构造一个不需要显示的聊天入口
        var vipLevel = VipSystem.getInstance().GetVipLevel();
        var messageInfo = MessageInfo.newObj(this.friendId, content, GetServerTime(), this.friendName, vipLevel, GetHeroProperty("chatBubbleType"));
        messageInfo.isSelfSend = true; //自己发出
        messageInfo.readState = 1; //已读
        messageInfo.setIconInfo("", GetHeroProperty("vocation"), GetHeroProperty("sexId"));
        FriendSystem.getInstance().addMessageInfo(messageInfo);
        return true;
    };
    //显示界面
    ChatInChannel_ChatWnd.prototype.showWithFriendInfo = function (friendId, friendName) {
        //TLog.Debug("ChatInChannel_ChatWnd.showChatInChannel_ChatWnd",friendId,friendName,friendBody)
        this.friendId = friendId;
        this.friendName = friendName;
        //this.friendBody = friendBody
        this.needToInit = true;
        if (this.isVisible()) {
            this.refreshFrame();
        }
        else {
            this.showWnd();
        }
    };
    return ChatInChannel_ChatWnd;
}(BaseCtrlWnd));
__reflect(ChatInChannel_ChatWnd.prototype, "ChatInChannel_ChatWnd");
//# sourceMappingURL=ChatInChannel_ChatWnd.js.map