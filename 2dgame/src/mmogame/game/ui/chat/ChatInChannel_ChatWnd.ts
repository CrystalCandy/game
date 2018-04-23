/*
作者:
    LiRong
	
创建时间：
    2014.08.29(星期五) 

意图：
  	好友聊天、陌生人聊天

公共接口：

*/

let MaxWidthOneRow = 306
let ChatWndHeight = 100

class ChatInChannel_ChatWnd extends BaseCtrlWnd {

	friendsScroll: UIScrollList;
	chatListScroll: UIScrollList;

	needToInit: boolean;
	duiHuaNum: any;
	duiHuaHeight: any;
	friendId: number;
	friendName: string;
	chatIndex: number;
	inputType: number;
	totalWndNumber: number;

	parentWnd: eui.Group;

	controlDataTable: any;

	saveVoiceList: any;

	public initObj(...args: any[]): void {

		// 信息框，由外面传进来的参数设定

		this.needToInit = true
		this.duiHuaNum = {}
		this.duiHuaHeight = {}
		this.friendId = -1
		this.chatIndex = 0
		this.inputType = 1   //1 文字 2 语言

		this.totalWndNumber = 0
	}

	onLoad() {
		//this.mElemList = ui_util.SetLookAndFeelWindow("Frame/Template02", this.mLayoutNode, 600, 850, 0, 0)
		//this.mElemList["return"]:SubscribeEvent(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this)
		//this.mElemList["return"]:SetXY(5, 17)
		//this.mLayoutNode.setDoModal(true)
		//this.mLayoutNode.SetLayer(gui.Window.LayerTop)


		this.mElemList = this.mParentWnd.mElemList;
		this.parentWnd = this.mElemList["friendRootWnd"]
		if (this.parentWnd) {
			this.parentWnd.visible = (false)
		}


		var elemInfo: any[] = [

			{ ["name"]: "plrInfoBtn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFriendMenu },


			{ ["name"]: "findFriend", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFindFriend },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);




		this.friendsScroll = UIScrollList.newObj(this.mLayoutNode, "friendsScroll", 0, 0, 140, 510, this.mElemList["group_friends"])
		this.chatListScroll = UIScrollList.newObj(this.mLayoutNode, "chatListScroll", 0, 0, 400, 555, this.mElemList["group_friendschat"])


	}

	onUnLoad() {

	}

	onShow() {
		RegisterEvent(EventDefine.MESSAGE_UPDATE, this.onMessageCome, this)
		RegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refreshFrame, this)
		RegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refreshFrame, this)

		RegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.onSearchResule, this)

		//RegisterEvent(EventDefine.SYSTEM_IME_SHOW,this.onImeShow,this)
		//RegisterEvent(EventDefine.SYSTEM_IME_HIDE,this.onImeHide,this)
		//RegisterEvent(EventDefine.SYSTEM_RECORD_STOP, this.onStopVoiceRecord, this)
		//RegisterEvent(EventDefine.SYSTEM_RECORD_START, this.onStartVoiceRecord, this)
		//RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP,this.onClickVoiceWnd,this)

		//this.showAction.run()
		this.parentWnd.visible = (true)

		this.needToInit = true
		this.refreshFrame()
		//this.changeInputByType()
		//this.mLayoutNode.setDoModal(true)
		//TestIme()
	}

	onHide() {
		UnRegisterEvent(EventDefine.MESSAGE_UPDATE, this.onMessageCome, this)
		UnRegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refreshFrame, this)

		UnRegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.onSearchResule, this)

		//UnRegisterEvent(EventDefine.SYSTEM_IME_SHOW,this.onImeShow,this)
		//UnRegisterEvent(EventDefine.SYSTEM_IME_HIDE,this.onImeHide,this)
		//UnRegisterEvent(EventDefine.SYSTEM_RECORD_STOP, this.onStopVoiceRecord, this)
		//UnRegisterEvent(EventDefine.SYSTEM_RECORD_START, this.onStartVoiceRecord, this)
		//UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP,this.onClickVoiceWnd,this)
		//this.showAction.stop()
		//this.hideAction.stop()
		this.parentWnd.visible = (false)
		//this.mLayoutNode.setDoModal(false)
		// RemoteImage.clearGroup("ChatInChannel_ChatWnd1")
		// RemoteImage.clearGroup("ChatInChannel_ChatWnd2")
	}




	refreshFrame() {

		this.controlDataTable = {}
		this.refreshFriends()
		this.refreshChat()
	}




	//////////////////////////////////////////////////////////////////////////////////////////////////-
	//刷新好友
	refreshFriends() {

		//FriendSystem.getInstance().removeIconMsgInfoByType("MESSAGE_ONE")
		MsgSystem.removeIconMsgByType(IconMsgType.FRIEND_CHAT);

		let sortFrindList = []
		//正在聊天的
		let messageInfoList = FriendSystem.getInstance().getMessageInfoList()
		let showCount = 0
		for (let roleId in messageInfoList) {
			//let messageInfo:MessageInfo = messageInfoList[_]

			let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(tonumber(roleId))
			if (friendInfo) {
				JsUtil.arrayInstert(sortFrindList, friendInfo)
			}
		}

		//好友
		let friendList = FriendSystem.getInstance().getFriendInfoList()
		for (let roleId in friendList) {
			let friendInfo = friendList[roleId]

			if (messageInfoList[roleId] == null) {
				JsUtil.arrayInstert(sortFrindList, friendInfo)
			}
		}

		let strangerList = FriendSystem.getInstance().getChatStrangerList()
		for (let roleId in strangerList) {
			let friendInfo = strangerList[roleId]

			if (messageInfoList[roleId] == null) {
				JsUtil.arrayInstert(sortFrindList, friendInfo)
			}
		}



		friendList = FriendSystem.getInstance().getFriendInfoList()
		for (let roleId in messageInfoList) {
			let friendInfo = messageInfoList[roleId]

			if (messageInfoList[roleId] == null) {
				JsUtil.arrayInstert(sortFrindList, friendInfo)
			}
		}


		//排序(先在线，再等级)
		table_sort(sortFrindList, function (a, b) {
			//let acount = FriendSystem.getInstance().getFriendUnReadMsgCount(a.roleId)
			//let bcount = FriendSystem.getInstance().getFriendUnReadMsgCount(b.roleId)
			//if(acount != bcount ){
			//	return acount > bcount
			//} 
			let aLastChat = FriendSystem.getInstance().getFriendLastChat(a.roleId)
			let bLastChat = FriendSystem.getInstance().getFriendLastChat(b.roleId)
			let aLastTime = aLastChat && aLastChat.time || -1
			let bLastTime = bLastChat && bLastChat.time || -1
			if (aLastTime != bLastTime) {
				return bLastTime - aLastTime
			}


			if (a.isOnline != b.isOnline) {
				return b.isOnline - a.isOnline
			}
			if (a.level != b.level) {
				return b.level - a.level
			}

			return b.roleId - a.roleId
		})

		if (this.friendId < 0 && sortFrindList.length > 0) {
			let v = sortFrindList[0]
			this.friendId = v.roleId
			this.friendName = v.roleName
			this.needToInit = true
		}

		if (this.friendId > 0) {
			FriendSystem.getInstance().setFriendMsgCountZero(this.friendId)
		}


		// RemoteImage.clearGroup("ChatInChannel_ChatWnd1")
		// RemoteImage.clearGroup("ChatInChannel_ChatWnd2")


		let selectIndex = -1

		let scroll = this.friendsScroll
		scroll.clearItemList()
		for (let k = 0; k < sortFrindList.length; k++) {
			let v = sortFrindList[k]

			let window = scroll.getItemWindow(k, 135, 115, 0, 0)
			this.initItemWindow(window, k)
			this.refreshItemWindow(window, v)

			if (v.roleId == this.friendId) {
				selectIndex = k
			}
		}

		scroll.refreshScroll()
		if (this.needToInit) {
			if (selectIndex >= 0) {
				scroll.moveToScrollIndex(selectIndex)
			}
		}


	}



	initItemWindow(window: eui.Group, i) {
		let name = window.name
		let width = window.width, height = window.height

		let Info: any = [
			//背景
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "selectbg", ["title"]: null, ["font"]: null, ["image"]: "lt_xuanZhongDi", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFriendChat, },

			{ ["index_type"]: eui.Group, ["name"]: name + "petboxbg", ["title"]: null, ["font"]: null, ["image"]: null, ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },

			{ ["index_type"]: eui.Image, ["name"]: name + "weiduBg", ["title"]: "", ["font"]: "ht_18_cc", ["image"]: "hy_textHongDi01", ["color"]: gui.Color.white, ["x"]: 100, ["y"]: 0, ["w"]: 37, ["h"]: 37, ["event_name"]: null, ["fun_index"]: null, },
			{ ["index_type"]: eui.Label, ["name"]: name + "weidu", ["title"]: "", ["font"]: "ht_18_cc", ["image"]: "hy_textHongDi01", ["color"]: gui.Color.white, ["x"]: 100, ["y"]: 0, ["w"]: 37, ["h"]: 37, ["event_name"]: null, ["fun_index"]: null, },

			//选中前景
			//{["index_type"] : gui.ControlType.Label,					["name"] : name +"selectfg",  		["title"] : null, ["font"] : null,  ["bAdapteWindow"]:true, ["image"] : "ty_xuanZhongKuang01",	["color"] : null,		["x"] : 0, ["y"] : 0,	["w"] : width,["h"] : height,["event_name"] : null, ["fun_index"] : null,},		


			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "namebg", ["title"]: null, ["font"]: null, ["image"]: "ty_UIBg01", ["color"]: gui.Color.white, ["x"]: 10, ["y"]: height - 30, ["w"]: 120, ["h"]: 32, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
			{ ["index_type"]: eui.Label, ["name"]: name + "name_level", ["parent"]: name + "namebg", ["title"]: "", ["font"]: "ht_18_cc", ["image"]: null, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 120, ["h"]: 20, ["event_name"]: null, ["fun_index"]: null, },
		]
		UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)


		let petBox = UIPetBox.newObj(this.mLayoutNode, name + "player_icon", 10, 0, this.mElemList[name + "petboxbg"], 0.8, "ChatInChannel_ChatWnd1")
		petBox.setPetHintEnable(false)
		//let mElemInfo:any = {
		//										
		//									}
		//petBox.createElem(mElemInfo, this.mElemList, this)
		this.mElemList[name + "player_icon"] = petBox


		//this.mElemList[name + "selectbg"]:SetLayer(gui.Window.LayerBottom)
		//this.mElemList[name+"selectfg"]:SetLayer(gui.Window.LayerTop)

	}


	refreshItemWindow(window, v) {
		let name = window.name



		let weiDuNum = FriendSystem.getInstance().getFriendUnReadMsgCount(v.roleId)
		if (weiDuNum > 99) {
			weiDuNum = 99 + "+"
		}
		this.mElemList[name + "weidu"].text = (weiDuNum)
		this.mElemList[name + "weidu"].visible = (weiDuNum > 0)
		this.mElemList[name + "weiduBg"].visible = (weiDuNum > 0)

		this.mElemList[name + "name_level"].text = (v.roleName)
		this.mElemList[name + "selectbg"].source = (v.roleId == this.friendId && "lt_xuanZhongDi" || "")
		//this.mElemList[name +"selectfg"].visible = (false)

		//this.mElemList[name +"player_icon"]:setPetTipsListner(this.onClickFriendChat, this, v)
		this.mElemList[name + "player_icon"].updateVocSexHead(v.vocation, v.sexId, v.icon, v["VipLevel"])
		if (v.isOnline == 1) {
			this.mElemList[name + "player_icon"].setEnable(true)
		} else {
			this.mElemList[name + "player_icon"].setEnable(false)
		}

		this.controlDataTable[name + "selectbg"] = v

		//TLog.Debug(v)

	}


	onClickFriendChat(args: egret.TouchEvent) {

		let friendInfo = this.controlDataTable[args.target.name]

		if (friendInfo == null) {
			return
		}

		if (friendInfo.roleId == this.friendId) {
			return
		}

		this.showWithFriendInfo(friendInfo.roleId, friendInfo.roleName)
	}



	//////////////////////////////////////////////////////////////////////////////////////////////////-
	//刷新对话内容
	refreshChat() {
		let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId)
		if (friendInfo) {
			TLog.Debug(friendInfo)
			let nameLevel = ""
			if (friendInfo) {
				nameLevel = friendInfo.roleName
				if (friendInfo.level >= 0) {
					nameLevel = nameLevel + " " + "Lv " + friendInfo.level
				}
			}
			this.mElemList["nameLabel"].text = (nameLevel)
		} else {
			this.mElemList["nameLabel"].text = ("")
		}

		if (this.needToInit) {
			//this.resetAllChatWnd()

			if (!this.duiHuaNum[this.friendId]) {
				this.duiHuaNum[this.friendId] = 1
			}
			if (!this.duiHuaHeight[this.friendId]) {
				this.duiHuaHeight[this.friendId] = 0
			}
			this.initOffLineRecord()
			this.needToInit = false
		}
	}



	// resetAllChatWnd() {
	// 	this.chatIndex = 0
	// }

	initOffLineRecord() {
		TLog.Debug("ChatInChannel_ChatWnd.initOffLineRecord")
		this.saveVoiceList = {}
		let messageList = FriendSystem.getInstance().getFriendMessage(this.friendId)

		let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId)

		//TLog.Debug(messageList)

		if (messageList) {
			let sortFunc = function (a, b) {
				return a.time - b.time
			}
			table_sort(messageList, sortFunc)
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

		let totalH = 0
		for (let k in messageList) {
			let v = messageList[k]


			let wnd = this.creatOneChatWnd()
			this.updateChatWnd(wnd, v)
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
		this.chatListScroll.moveToScrollIndex(this.chatIndex -1)
		//TLog.Debug("this.Chatlist:ScrollToXY", totalH, this.Chatlist.width, this.chatIndex * ChatWndHeight)
		// this.Chatlist.SetViewWH(this.Chatlist.width, totalH + 180)
		// this.Chatlist.ScrollToXY(0, totalH, false)
		//this.Chatlist.ShowItemRow(this.chatIndex)	
	}



	creatOneChatWnd() {
		let chatWnd: any = this.chatListScroll.getItemWindow(this.chatIndex, 400, ChatWndHeight, 0, 0)
		this.chatIndex = this.chatIndex + 1

		this.totalWndNumber = this.totalWndNumber + 1
		// 	let mElemInfo: any = { 
		// 	{["index_type"] : gui.ControlType.Window, ["name"] : wndName, ["x"] : 0, ["y"] : (this.totalWndNumber - 1) * ChatWndHeight + 10, ["w"] : 530, ["h"] : ChatWndHeight, ["event_name"] : null, ["fun_index"] : null },
		// }
		// ui_util.CreateElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.Chatlist)

		//let chatWnd = this.mElemList[wndName]

		let wndName = chatWnd.name;

		chatWnd.mElemList = {}
		let info: any = [
			//背景
			{ ["index_type"]: eui.Group, ["name"]: "chat_bg", ["image"]: null, ["x"]: 120, ["y"]: 40, ["w"]: 300, ["h"]: 60, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image, ["name"]: "chat_bgimg", ["parent"]:"chat_bg",  ["image"]: "hy_duiHuaDi01", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChatBg },

			{ ["index_type"]: eui.Image, ["name"]: "chat_top_icon", ["image"]: "hy_VIPduiHua02", ["x"]: 116, ["y"]: -9, ["w"]: 109, ["h"]: 54, ["messageFlag"]: true },
			//内容
			{ ["index_type"]: gui.RichDisplayer, ["name"]: "chat", ["title"]: "", ["font"]: "ht_24_lc", ["color"]: gui.Color.white, ["x"]: 150, ["y"]: 50, ["w"]: 260, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChatBg },
		]
		UiUtil.createElem(info, this.mLayoutNode, chatWnd.mElemList, this, chatWnd)
		chatWnd.mElemList["player_icon"] = UIPetBox.newObj(this.mLayoutNode, wndName + "player_icon", 0, 0, chatWnd, 0.7, "ChatInChannel_ChatWnd2")
		chatWnd.mElemList["player_icon"].setPetHintEnable(false)
		//chatWnd.mElemList["vip_level"]:SetHandleMessageFlag(true)
		chatWnd.mElemList["chat"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this)
		return chatWnd
	}


	onClickChatBg(args: egret.TouchEvent) {
		//tolua.cast(args, "gui::GUIMouseEvent")
		//TLog.Debug("ChatInChannel_ChatWnd.onClickChatBg",args.window.name,args.window.GetParent().GetParent().GetParent().name)
		if (args.target) {
			let parentWindow = args.target.parent//:GetParent()
			if (parentWindow) {
				let windowName = parentWindow.name
				let voiceID = this.saveVoiceList[windowName]
				if (voiceID) {
					//TLog.Debug("GameSound.getInstance().playRecord",voiceID)
					GameSound.getInstance().playRecord(voiceID)
				}
			}
		}
	}

	updateChatWnd(chatWnd, messageInfo) {
		//TLog.Debug("ChatInChannel_ChatWnd.updateChatWnd")
		//TLog.Debug(debug.traceback())
		//TLog.Debug(messageInfo)
		chatWnd.visible = (true)

		//this.controlDataTable[chatWnd.name]={messageInfo.fromFriendId,messageInfo.isSelfSend}

		let voiceIconName = "#VOICE_ICON_LEFT"
		if (messageInfo.isSelfSend) {
			voiceIconName = "#VOICE_ICON_RIGHT"
		}


		let chatBubbleList = VipSystem.getInstance().getSortChatBubbleList()
		let chatBubbleType = checkNull(messageInfo.chatBubbleType, 1)
		let chatBg= "hy_duiHuaDi01", chatTopIcon = ""
		for(let i = 0; i < chatBubbleList.length; i++){
			let v = chatBubbleList[i]
	
			if(chatBubbleType == v.index ){
				chatBg = v.imgName[0]
				chatTopIcon = v.imgName[1]
				break
			}
		}
		chatWnd.mElemList["chat_bgimg"].source = (chatBg)
		chatWnd.mElemList["chat_top_icon"].source = (chatTopIcon)

		//TLog.Debug("===============ChatInChannel_ChatWnd.updateChatWnd", messageInfo.chatBubbleType)


		


		let fontInfo: any = {}
		fontInfo.default_color = "black"
		fontInfo.defalut_font = "ht_20_lc"
		fontInfo.no_change_font = true

		let xml
		if (messageInfo.MsgType) {
			let typeToShow = channelOption.VOICE
			let voiceID = tonumber(messageInfo.data)
			let targetId = messageInfo.MsgType
			let context = Localize_cns("CHAT_TYPE_VOICE")

			let voiceTime = messageInfo.MsgType
			let str = ""
			while (voiceTime && voiceTime > 0) {
				str = str + "#little_space"
				voiceTime = voiceTime - 1
			}
			str = str + "#black|" + typeToShow + ";" + voiceID + ";" + targetId + ";" + context + "|" + messageInfo.MsgType + "\""
			let strLink = str
			let xmlLink = voiceIconName + "|" + typeToShow + ";" + voiceID + ";" + targetId + ";" + context + "|"
			if (voiceIconName == "#VOICE_ICON_LEFT") {
				xmlLink = xmlLink + strLink
			} else {
				xmlLink = strLink + xmlLink
			}
			xml = XmlConverter.parseText(xmlLink, fontInfo) //this.analyzeHyperLink(xmlLink)

			//TLog.Debug("~~",xml,xmlLink,context)
			this.saveVoiceList[chatWnd.name] = tonumber(messageInfo.data)
		} else {
			let str = messageInfo.data
			xml = this.analyzeHyperLink(str)
		}
		//TLog.Debug(xml,messageInfo.data)
		//TLog.Debug("get rd",rd.width,rd.height)	
		let rd: gui.RichDisplayer = chatWnd.mElemList["chat"]
		let rd_bg: eui.Group = chatWnd.mElemList["chat_bg"]
		let rd_bgimg: gui.Grid9Image = chatWnd.mElemList["chat_bgimg"]
	

		rd.clear()
		rd.addXmlString(xml)

		let w = rd.getLogicWidth() + 2
		let h = rd.getLogicHeight() + 2
		let addH = 0
		if (h > 72) {
			addH = 36
		}
		h = MathUtil.clamp(h, 53, ChatWndHeight + addH);
		if (w > 260) {
			w = 260
		}
		UiUtil.setWH(rd, w, h)

		let bg_w = w + 43
		if (bg_w < 130) {
			bg_w = 130
		}
		UiUtil.setWH(rd_bg, bg_w + 10, h )

		UiUtil.setWH(chatWnd, chatWnd.width, ChatWndHeight + addH)


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

			let vocation = GetHeroProperty("vocation")
			let sexId = GetHeroProperty("sexId")
			let viplevel = GetHeroProperty("VIP_level")

			// let homeinfo = HomepageSystem.getInstance().getSelfHomepageInfo()
			let icon = "1"
			// if (homeinfo != null && homeinfo.icon != null) {
			// 	icon = homeinfo.icon
			// }
			//chatWnd.mElemList["player_icon"].setPetHintEnable(false)
			chatWnd.mElemList["player_icon"].updateVocSexHead(vocation, sexId, icon, viplevel)
			chatWnd.mElemList["player_icon"].setXY(310, 0)


			UiUtil.setXY(rd, 338 - rd_bg.width, 50)
			UiUtil.setXY(rd_bg, 328 - rd_bg.width, 40)
			UiUtil.setXY(chatWnd.mElemList["chat_top_icon"], rd_bg.x, 0)

			
			rd_bgimg.scaleX = -1;


		} else {
			//rd_bg:SetFilpX(false)

			let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(messageInfo.fromFriendId)
			if (friendInfo) {
				//TLog.Debug(friendInfo)
				//let qualityName = ProfessionSystem.getInstance().getProfessionQualityImage(friendInfo.vocation)
				//let imageName = ProfessionSystem.getInstance().getProfessionIcon(friendInfo.vocation, friendInfo.sexId)

				//chatWnd.mElemList["player_icon"].source = (imageName)
				//chatWnd.mElemList["player_kuang"].source = (qualityName)
				//chatWnd.mElemList["player_kuang"]:SetXY(0, 0)
				let icon = messageInfo.icon
				if (icon == null) {
					icon = friendInfo.icon
				}
				let VipLevel = messageInfo.VipLevel
				if (VipLevel == null) {
					VipLevel = friendInfo.VipLevel
				}
				//chatWnd.mElemList["player_icon"]:setPetTipsListner(this.onShowMenuList, this, {friendInfo.roleId, friendInfo.roleName})
				chatWnd.mElemList["player_icon"].setPetHintEnable(false)
				chatWnd.mElemList["player_icon"].updateVocSexHead(friendInfo.vocation, friendInfo.sexId, icon, VipLevel)
				chatWnd.mElemList["player_icon"].setXY(0, 0)


				UiUtil.setXY(rd, 133, 50)
				UiUtil.setXY(rd_bg, 101, 40)
				UiUtil.setXY(chatWnd.mElemList["chat_top_icon"], rd_bg.x + rd_bg.width - 109, 0)

			} else {
				TLog.Error("get friendInfo err  is null !!! ")
				//this.hideWnd()
			}

			
			rd_bgimg.scaleX = 1;
		}


		rd_bgimg.anchorOffsetX = rd_bg.width / 2;
		rd_bgimg.anchorOffsetY = rd_bg.height / 2;
		rd_bgimg.x = rd_bg.width / 2
		rd_bgimg.y = rd_bg .height / 2

	}



	analyzeHyperLink(content) {
		let color = "white"
		let param: any = {}
		param.no_change_font = true
		param.default_color = color
		param.defalut_font = "ht_20_cc_stroke"
		param.link_parser = ContentParseLinkHandler
		return XmlConverter.parseText(content, param)
	}

	onClickHyperLink(args: gui.GUIHyperlinkEvent) {


		let link = args.getHyperlink()
		let [linkType, playerId, targetId, name] = StringUtil.stringMatch(link, /(\d);(\d+);(\d+);(.+)/)
		linkType = tonumber(linkType)
		//TLog.Debug("ChatInChannel_ChatWnd.onClickHyperLink",linkType,playerId,targetId,link)
		if (linkType == channelOption.ITEM) {																													//物品超链接
			let message = GetMessage(opCodes.C2G_CHANNEL_PET_ITEM)
			message.playerId = tonumber(playerId)
			message.rage = 2
			message.uId = tonumber(targetId)
			SendGameMessage(message)
		} else if (linkType == channelOption.PET) {																														//宠物超链接
			let message = GetMessage(opCodes.C2G_CHANNEL_PET_ITEM)
			message.playerId = tonumber(playerId)
			message.rage = 1
			message.uId = tonumber(targetId)
			SendGameMessage(message)
		} else if (linkType == channelOption.VOICE) {
			let voiceID = tonumber(playerId)
			if (voiceID) {
				GameSound.getInstance().playRecord(voiceID, false, tonumber(targetId))
			}
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////

	onClickFriendMenu(args: egret.TouchEvent) {
		if (this.friendId < 0) {
			return
		}

		let spacex = args.stageX
		let spacey = args.stageY

		//let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId)
		let wnd = WngMrg.getInstance().getWindow("MainPlayerFrame")
		wnd.showMainPlayerFrame(spacex, spacey, this.friendId, this.friendName)
	}


	onClickFindFriend(args) {
		WngMrg.getInstance().showWindow("FindFriendFrame")
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////


	onMessageCome(args) {
		this.refreshFrame()

		let messageInfo = args.messageInfo
		if (messageInfo && messageInfo.fromFriendId != this.friendId) {
			return
		}


		let wnd = this.creatOneChatWnd()
		this.updateChatWnd(wnd, messageInfo)
		this.chatListScroll.moveToScrollIndex(this.chatIndex - 1)

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
	}

	onSearchResule(args) {

		//this.refreshFriends()
		this.showWithFriendInfo(args.playerInfo.roleId)
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////

	onVoiceStart(args) {
		if (this.friendId < 0) {
			MsgSystem.addTagTips(Localize_cns("CHAT_TXT6"))
			return false
		}

		let friendInfo = FriendSystem.getInstance().getChatPlayerInfo(this.friendId)
		if (friendInfo == null || friendInfo.isOnline != 1) {
			MsgSystem.addTagTips(Localize_cns("CHAT_TXT7"))
			return false
		}

		return true
	}

	sendVoiceRecord(args) {
		if (args.recordBuffer && args.size && args.size > 0) {
			let id = GetHeroPropertyInfo().id
			if (this.friendId) {
				id = this.friendId
			} else {
				TLog.Error("onStopVoiceRecord Error  this.friendName is null ")
			}
			let message = GetMessage(opCodes.C2G_CHANNEL_VOICE)
			message.channel = channelType.CHAT
			message.roleId = id
			message.recordBuffer = args.recordBuffer
			message.recordSize = args.size
			message.recordTime = args.recordTime
			SendGameMessage(message)

			let voiceID = GameSound.getInstance().prepareRecord(args.recordBuffer, args.size)


			//let homeinfo = HomepageSystem.getInstance().getHomepageInfo()
			let vipLevel = VipSystem.getInstance().GetVipLevel()


			let messageInfo = MessageInfo.newObj(this.friendId, voiceID, GetServerTime(), this.friendName, vipLevel, GetHeroProperty("chatBubbleType"))
			messageInfo.MsgType = args.recordTime   //语音
			messageInfo.isSelfSend = true  //自己发出
			messageInfo.readState = 1   //已读

			messageInfo.setIconInfo("", GetHeroProperty("vocation"), GetHeroProperty("sexId"))
			FriendSystem.getInstance().addMessageInfo(messageInfo)

		}
	}




	sendChatMessage(content: string) {
		TLog.Debug("ChatInChannel_ChatWnd.sendChatMessage", content, this.friendId)

		if (content == null) {
			MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_NEIRONGBUNENGWEIKONG"))
			return false
		}

		if (this.friendId < 0) {
			MsgSystem.addTagTips(Localize_cns("CHAT_TXT6"))
			return false
		}


		if (content.length > 90) {
			MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_TOO_LONG"))
			return false
		}

		content = WordFilter.filtWord(content)

		let name = GetHeroPropertyInfo().id
		if (this.friendId) {
			name = this.friendId
		} else {
			TLog.Error("ChatInChannel_ChatWnd.onClickSendMessage err  this.friendName is null ")
			return false
		}

		let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
		message.channel = channelType.CHAT
		message.data = content
		message.name = name
		SendGameMessage(message)


		//let homeinfo = HomepageSystem.getInstance().getHomepageInfo()

		//构造一个不需要显示的聊天入口
		let vipLevel = VipSystem.getInstance().GetVipLevel()
		let messageInfo = MessageInfo.newObj(this.friendId, content, GetServerTime(), this.friendName, vipLevel, GetHeroProperty("chatBubbleType"))
		messageInfo.isSelfSend = true  //自己发出
		messageInfo.readState = 1   //已读
		messageInfo.setIconInfo("", GetHeroProperty("vocation"), GetHeroProperty("sexId"))

		FriendSystem.getInstance().addMessageInfo(messageInfo)
		return true
	}



	//显示界面
	showWithFriendInfo(friendId, friendName?) {
		//TLog.Debug("ChatInChannel_ChatWnd.showChatInChannel_ChatWnd",friendId,friendName,friendBody)
		this.friendId = friendId
		this.friendName = friendName
		//this.friendBody = friendBody
		this.needToInit = true

		if (this.isVisible()) {
			this.refreshFrame()
		} else {
			this.showWnd()
		}

	}
}