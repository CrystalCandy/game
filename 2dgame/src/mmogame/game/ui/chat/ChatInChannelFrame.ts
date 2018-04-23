// TypeScript file


module itemRender {
	export class ChannelChatItem extends eui.ItemRenderer {
		MaxWidthOneRow = 400
		mElemList: any;
		petBox: UIPetBox;

		//mElemList:any;
		constructor() {
			super();
			this.mElemList = null;


			this.mElemList = {};

			let x = 0
			let y = 0
			let w = 530
			let h = 100


			let mElemInfo: any = [
				// { ["index_type"]: gui.ControlType.Label, ["name"]: "player_kuang", ["title"]: null, ["font"]: "ht_36_cc", ["image"]: "ty_pet_pinJieBg01", ["bAdapteWindow"]: true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 128 * 0.8, ["h"]: 128 * 0.8, ["event_name"]: null, ["fun_index"]: null, },
				// { ["index_type"]: gui.ControlType.Label, ["name"]: "player_icon", ["parent"]: "player_kuang", ["title"]: null, ["font"]: "ht_36_cc", ["image"]: "pet_3001", ["bAdapteWindow"]: true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 128 * 0.8, ["h"]: 128 * 0.8, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSearch, },
				// { ["index_type"]: gui.ControlType.Label, ["name"]: "player_badge", ["parent"]: "player_kuang", ["title"]: null, ["font"]: "ht_36_cc", ["image"]: "zd_huoBanBg01", ["bAdapteWindow"]: true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 88 * 0.8, ["w"]: 127 * 0.8, ["h"]: 45 * 0.8, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: gui.Window.TraceMouseAll, },

				//{["index_type"] : gui.ControlType.Label,  	["name"] : "vip_level",			["title"] : "", 		["font"] : "", 					["image"] : "VIP1", 			 					["color"] : null,											["x"] : 16,   ["y"] : 40,   ["w"] : 106,		["h"] : 20, ["event_name"] : egret.TouchEvent.TOUCH_TAP,	["fun_index"] : null,},
				
				
				{ ["index_type"]: eui.Group, ["name"]: "chat_bg_di", ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 530, ["h"]: 115, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
				{ ["index_type"]: gui.Grid9Image, ["name"]: "chat_bg_di_bgimg", ["parent"]: "chat_bg_di", ["title"]: "", ["font"]: "", ["image"]: "lt_kuaFuDi01", ["color"]: gui.Color.ublack, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 530, ["percentHeight"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },

				{ ["index_type"]: eui.Group, ["name"]: "chat_bg", ["image"]: "", ["x"]: 120, ["y"]: 40, ["w"]: 300, ["h"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
				{ ["index_type"]: gui.Grid9Image, ["name"]: "chat_bgimg", ["parent"]: "chat_bg", ["title"]: "", ["font"]: "", ["image"]: "hy_duiHuaDi02", ["color"]: gui.Color.ublack, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 200, ["percentHeight"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
				{ ["index_type"]: gui.Grid9Image, ["name"]: "chat_top_icon", ["title"]: "", ["font"]: "", ["image"]: "hy_VIPduiHua02", ["x"]: 116, ["y"]: -9, ["w"]: 109, ["h"]: 54, ["messageFlag"]: true },
				{ ["index_type"]: gui.RichDisplayer, ["name"]: "rd", ["parent"]: "chat_bg", ["title"]: "", ["font"]: "", ["image"]: "", ["color"]: gui.Color.ublack, ["x"]: 120, ["y"]: 40, ["w"]: 300, ["h"]: 60, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },

				//VIP
				{ ["index_type"]: eui.Image, ["name"]: "vip_img", ["image"]: "vipLv00", ["x"]: 120, ["y"]: 0, ["w"]: 74, ["h"]: 31 },
				{ ["index_type"]: eui.Label, ["name"]: "name", ["title"]: "name", ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 120, ["y"]: 0, ["w"]: 340, ["h"]: 30, ["event_name"]: null, ["fun_index"]: null, },
			]
			UiUtil.createElem(mElemInfo, this, this.mElemList, this)


			this.mElemList["vip_img"].visible = false;

			//this.mElemList["vip_level"]:SetHandleMessageFlag(gui.Window.TraceMouseAll)
			this.mElemList["rd"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this)
			this.petBox = UIPetBox.newObj(this, "petBox", 0, 0, this, 0.8)
		}

		protected dataChanged(): void {

			let info = this.data;

			let h = 0
			let rd = this.mElemList["rd"]
			rd.clear()
			rd.setRowDistance(2)

			////先处理  以及样式 计算文字的长宽 ////////-
			//系统消息额外处理

			this.mElemList["vip_img"].visible = (false)

			let xml = ""
			let contentColor = "white"
			let extraW = 0 //气泡icon+name
			if (info.channel == channelType.SYSTEM) {
				let content = (info.data)
				xml = this.analyzeBroadcastHyperLink(content)

				this.petBox.setVisible(false)
				//this.petBox.setEnable(false)


				UiUtil.setWH(rd, 430, 60)

				//this.mElemList["vip_level"].visible = (false)
				this.mElemList["name"].visible = (true)
				this.mElemList["name"].text = (Localize_cns("MSG_SYS"))
				

				IGlobal.fontSet.updateTextField("ht_20_rc_stroke", this.mElemList["name"], false)

				this.mElemList["chat_bgimg"].source = ("hy_duiHuaDi02")
				this.mElemList["chat_bg_di"].visible = false
				this.mElemList["chat_top_icon"].source = ""
			} else {
				this.mElemList["chat_bg_di"].visible = true
				UiUtil.setWH(rd, this.MaxWidthOneRow, 70)
				this.petBox.setVisible(true)
				let chatBubbleList = VipSystem.getInstance().getSortChatBubbleList()
				let chatBubbleType = checkNull(info.chatBubbleType, 1)
				let chatBg = "hy_duiHuaDi01", chatTopIcon = ""
				for (let i = 0; i < chatBubbleList.length; i++) {
					let v = chatBubbleList[i]

					if (chatBubbleType == v.index) {
						chatBg = v.imgName[0]
						chatTopIcon = v.imgName[1]
						break
					}
				}
				this.mElemList["chat_bgimg"].source = (chatBg)
				this.mElemList["chat_top_icon"].source = (chatTopIcon)

				if (info.roleId == GetHeroProperty("id")) {
					this.petBox.setXY(415, 0)
					this.mElemList["name"].visible = (false)
					this.mElemList["chat_top_icon"].x = 318
					this.mElemList["chat_top_icon"].y = -9
					this.mElemList["chat_bgimg"].scaleX = -1
				} else {
					this.petBox.setXY(0, 0)
					this.mElemList["name"].visible = (true)
					this.mElemList["vip_img"].visible = (true)
					if (this.mElemList["chat_top_icon"].source == "") {	//没有气泡?
						let vipLevel = info.VipLevel || 0
						//!!!
						if (vipLevel > 0) {
							let viptext = "0"+vipLevel
							if(vipLevel>9){
								viptext  = "10"	//没出V10以上的
							}
							// this.mElemList["vip_img"].source = ("vipLv" + String.format("%02d", vipLevel))
							this.mElemList["vip_img"].source = ("vipLv" + viptext)
							UiUtil.setXY(this.mElemList["vip_img"], 100, 2)
							UiUtil.setXY(this.mElemList["name"], 175, 5)
						} else {
							this.mElemList["vip_img"].source = ("")
							UiUtil.setXY(this.mElemList["name"], 100, 5)
						}
					} else {
						let vipLevel = info.VipLevel || 0

						//!!!
						if (vipLevel > 0) {
							let viptext = "0"+vipLevel
							if(vipLevel>9){
								viptext  = "10"	//没出V10以上的
							}
							// this.mElemList["vip_img"].source = ("vipLv" + String.format("%02d", vipLevel))
							this.mElemList["vip_img"].source = ("vipLv" + viptext)

							UiUtil.setXY(this.mElemList["vip_img"], 215, 5)
							UiUtil.setXY(this.mElemList["name"], 255, 0)
							extraW = 150
						} else {
							this.mElemList["vip_img"].source = ("")

							UiUtil.setXY(this.mElemList["name"], 215, 0)
							extraW = 110
						}
					}

					IGlobal.fontSet.updateTextField("ht_20_lc_stroke", this.mElemList["name"], false)
					let nameStr = info.name
					this.mElemList["name"].text = (nameStr)
					this.mElemList["chat_bgimg"].scaleX = 1


					this.mElemList["chat_top_icon"].x = 115
					this.mElemList["chat_top_icon"].y = -9
				}

				this.petBox.setClickEnable(false)
				this.petBox.setEnable(true)
				this.petBox.updateRoleInfo(info.vocation, info.sexId, info.roleI)
				xml = this.analyzeHyperLink(info.data, contentColor)
			}

			rd.addXmlString(xml)

			let get_h = AdjustRdContentViewH(rd, 30)
			let rd_w = rd.getLogicWidth()
			UiUtil.setWH(rd, rd_w, get_h)

			let chat_bg = this.mElemList["chat_bg"]
			////先处理 计算文字的长宽  }////////-
			if (info.channel == channelType.SYSTEM) {
				if (rd_w < 100 + extraW) {
					rd_w = 100 + extraW
				}
				h = get_h + 50

				if (h < 110) {
					h = 110
				} else {
					h = h + 10
				}	

				UiUtil.setXY(this.mElemList["name"], -250, 7)

				let cellh = 0
				if(get_h<=55){
					cellh = 55 - get_h
					get_h = 55
				}

				UiUtil.setWH(chat_bg, 400, get_h + 10 + cellh)
				UiUtil.setXY(chat_bg, 85, 10)

				UiUtil.setXY(rd, 10, 5)

			} else {
				//气泡-宽度min=6,max=393,高度min=30/41,max=71/113
				//need-minw=100
				if (rd_w < 0 + extraW) {
					rd_w = 0 + extraW
				}
				h = get_h + 50

				if (h < 110) {
					h = 110
				} else {
					h = h + 10
				}

				let cellh = 0

				if(get_h < 45){
					cellh = 45 - get_h
					get_h = 45
				}

				UiUtil.setWH(chat_bg, rd_w + 40, get_h + 20)
				let setRD_x = 0
				let setBG_x = 0
				if (info.roleId == GetHeroProperty("id")) {
					setBG_x = 440 - (rd_w + 40)
					setRD_x = 10
				} else {
					setBG_x = 90
					setRD_x = 30
				}

				//UiUtil.setXY(chat_bg, setBG_x, 35-cellh)
				UiUtil.setXY(chat_bg, setBG_x, 35)
				UiUtil.setXY(rd, setRD_x, 12)	//percent -> chat_bg
				let get_rd_w = rd.getLogicWidth()
				if(get_rd_w<394){
					UiUtil.setXY(rd, setRD_x, 23)
				}
			}

			let chat_bgimg = this.mElemList["chat_bgimg"]
			chat_bgimg.anchorOffsetX = chat_bg.width / 2;
			//chat_bgimg.anchorOffsetY = chat_bg.height / 2;
			chat_bgimg.anchorOffsetY = 40
			chat_bgimg.x = chat_bg.width / 2
			//chat_bgimg.y = chat_bg.height / 2
			chat_bgimg.y = 40
			//UiUtil.setWH(chat_bgimg, 200, 100)

			this.height = h;
		}

		//解释和设置超链接的表现
		analyzeBroadcastHyperLink(content) {
			function parseLinkHandler(linkContent) {
				let info: any = {}
				info.link = null
				info.name = null
				info.color = null

				//窗口名，颜色
				let [linkType, wndName, content] = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(.+)/)
				info.name = content
				info.link = StringUtil.stringReplace(linkContent, " ", "-")
				info.color = "red"
				return info
			}

			let param: any = {}
			param.no_change_font = true
			param.default_color = "navajowhite"
			param.defalut_font = "ht_20_cc_stroke"
			param.link_parser = parseLinkHandler
			return XmlConverter.parseText(content, param)
		}


		//将约定格式组装成超链接xml
		analyzeHyperLink(content, contentColor) {
			let color = contentColor || "navajowhite"
			function parseLinkHandler(linkContent) {
				let info: any = {}
				info.link = null
				info.name = null
				info.color = null
				let [linkType, playerId, targetId, content] = StringUtil.stringMatch(linkContent, /(\d);(\d+);(\d+);(.+)/)
				if (!linkType || !playerId || !targetId || !content) {
					return null
				}

				info.name = content
				info.link = StringUtil.stringReplace(linkContent, " ", "-")
				info.color = "orange"
				return info
			}

			let param: any = {}
			param.no_change_font = true
			param.default_color = color
			param.defalut_font = "ht_20_cc_stroke"
			param.link_parser = parseLinkHandler
			return XmlConverter.parseText(content, param)
		}

		//响应超链接点击
		onClickHyperLink(args: gui.GUIHyperlinkEvent) {
			//tolua.cast(args, "gui::GUIHyperlinkEvent")

			let wnd = WngMrg.getInstance().getWindow("ChatInChannelFrame")
			let mCurSendChannel = wnd.mCurSendChannel

			//跨服不响应超链接
			if (mCurSendChannel == channelType.SERVER) {
				//MsgSystem.addTagTips(Localize_cns("NOT_VIEW_ITEM_INFO"))
				return
			}

			let linkContent = args.getHyperlink()

			if (mCurSendChannel != channelType.SYSTEM) {
				let [linkType, playerId, targetId, content] = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(\d+);(.+)/)
				if (!linkType || !playerId || !targetId || !content) {
					return null
				}

				linkType = tonumber(linkType)
				TLog.Debug("FriendChatFrame.onClickHyperLink", linkType, playerId, targetId, linkContent)
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
					// let voiceID = tonumber(playerId)
					// if (mCurSendChannel == channelType.WORLD) {
					// 	let message = GetMessage(opCodes.C2G_CHANNEL_GET_VOICE)
					// 	message.channel = mCurSendChannel
					// 	message.voiceID = voiceID
					// 	SendGameMessage(message)
					// } else {
					// 	if (voiceID) {
					// 		GameSound.getInstance().playRecord(voiceID, true, tonumber(targetId))
					// 	}
					// }
				} else if (linkType == channelOption.TEAM) {								//申请加入队伍
					let [flag, str] = CheckMainFrameFunction("zudui")
					if (flag == false) {
						return MsgSystem.addTagTips(str)
					}

					let message = GetMessage(opCodes.C2G_TEAM_APPLY)
					message.id = tonumber(playerId) || 0
					SendGameMessage(message)
				} else if (linkType == channelOption.HOMEPAGE) {
					if (tonumber(playerId) == GetHeroProperty("id")) {
						let wnd = WngMrg.getInstance().getWindow("PersonalHomepageFrame")
						wnd.showWithPlayerInfo(GetHeroProperty("id"), 1)
					} else {
						let wnd = WngMrg.getInstance().getWindow("PersonalHomepageFrame")
						wnd.showWithPlayerInfo(playerId, 2)
					}
				} else if (linkType == channelOption.CLUB) {
					let clubId = tonumber(playerId) || 0
					let message = GetMessage(opCodes.C2G_FACTION_APPAY)
					message.clubId = clubId
					message.applyReason = " "
					SendGameMessage(message)	//-申请加入军团
				} else if (linkType == channelOption.CORP) {					//申请加入血盟
					let teamId = tonumber(playerId) || 0
					let message = GetMessage(opCodes.C2G_COMBATTEAM_JOIN)
					message.teamId = teamId
					SendGameMessage(message)
				}

				if (mCurSendChannel == channelType.FACTION) {
					if (linkType == channelOption.WND) {
						playerId = tonumber(playerId)
						let activity = GetActivity(ActivityDefine.Relic)
						activity.sendMsgToGetPlayerRelicInfo(playerId, content)
					}
				}
			} else {
				ExecuteNoticeCmdLink(linkContent)
			}
		}


		onClickSearch(petinfo, userdata, args) {
			let wnd = WngMrg.getInstance().getWindow("ChatInChannelFrame")
			let mCurSendChannel = wnd.mCurSendChannel

			//频道判断，跨服不能查玩家信息
			if (mCurSendChannel == channelType.SERVER) {
				MsgSystem.addTagTips(Localize_cns("CHAT_TXT2"))
				return true
			}

			let info = this.data;

			let playerId = info.roleId
			if (playerId == GetHeroProperty("id")) {
				MsgSystem.addTagTips(Localize_cns("CHAT_SEARCH_SELF"))
				return true
			} else {
				if (playerId == 0) {
					MsgSystem.addTagTips(Localize_cns("CHAT_TXT3"))
					return true
				}
				let playerName = userdata[1]//this.controlDataTable["playerIcon"][name][2]
				
				let wnd = WngMrg.getInstance().getWindow("MainPlayerFrame")
				wnd.showMainPlayerFrame(args.stageX, args.stageY, playerId)
			}
			return true
		}

	}
}

class ChatInChannelFrame extends BaseWnd {

	msgMrg: ChannelMrg;
	msgUnread: any;
	saveChatHistory: any[];

	needToScroll: boolean;
	// saveScrollHeight: any;
	// saveScrollY: any;
	mCurSendChannel: number;

	inputType: number;
	needToResetChannel: boolean;
	saveSendTime: number;
	saveTotalChatCount: number;
	saveTotalHeight: number;
	lastSendTime: number;

	channelStateList: any;

	timer: number;
	worldOldContent: string;



	questionTimer: number;
	answerA: string;
	answerB: string;
	nextTime: number;
	questionIndex: number;

	friendChatWnd: ChatInChannel_ChatWnd;

	timerList: any;
	lastRefreshChannel:number;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/ChatInChannelLayout.exml"]

		this.msgMrg = ChannelMrg.getInstance()


		this.msgUnread = {}									//记录收到非当前频道消息的数量
		this.saveChatHistory = []					//机器人发言
		this.needToScroll = true					//当前频道有新发言时不立刻滚动到最新位置
		// this.saveScrollHeight = {}				//与this.needToScroll配合使用
		// this.saveScrollY = {}							//同上

		let channelList = this.msgMrg.getRegisteredChannelList()
		for (let i in channelList) {
			let channel = channelList[i]

			this.msgUnread[channel] = 0
			// this.saveScrollY[channel] = 0
			// this.saveScrollHeight[channel] = 0
		}

		this.mCurSendChannel = this.msgMrg.getCurChannel()

		//this.deltaHeight ={}

		RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onReceiveMessage, this)
		RegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this)
		RegisterEvent(EventDefine.ONLINE_QUESTION, this.onRecvOnLineQuestion, this)

		this.inputType = 1   //1 文字 2 语言
		this.needToResetChannel = true
		this.saveSendTime = 0
		this.saveTotalChatCount = 0

		this.saveTotalHeight = 0

		this.lastSendTime = -1
		this.timerList = {}

		this.lastRefreshChannel = -1

		this.clearQuestion()
	}

	destory() {
		UnRegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onReceiveMessage, this)
		UnRegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this)
		UnRegisterEvent(EventDefine.ONLINE_QUESTION, this.onRecvOnLineQuestion, this)

		if (this.timer) {
			KillTimer(this.timer)
			this.timer = null
		}
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		
		this.initSkinElemList();

		this.setAlignCenter(true, true);

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

			// { ["name"]: "group_chat", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },
			{ ["name"]: "edit_input", ["font"]: "ht_24_lc", ["color"]: gui.Color.white, ["event_name"]: egret.TouchEvent.CHANGE, ["fun_index"]: this.onContentChanged },
			{ ["name"]: "btn_biaoqing", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBiaoqing },
			{ ["name"]: "btn_send", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSendMsg },


			{ ["name"]: "list_channel_scroller", ["title"]: null, ["event_name"]: egret.Event.CHANGE, ["fun_index"]: this.onListScrollerChange },
			//{ ["name"]: "list_channel", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },


			{ ["name"]: "onlineTitle", ["title"]: Localize_cns("CHAT_QUESTION"), ["font"]: "ht_24_lc_stroke", ["color"]: gui.Color.navajowhite, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
			{ ["name"]: "onlineTime", ["title"]: Localize_cns("CHAT_COUNTDOWN"), ["font"]: "ht_24_lc_stroke", ["color"]: gui.Color.red, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },

			{ ["name"]: "chooseA", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChooseA },
			{ ["name"]: "chooseB", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChooseB },

			{ ["name"]: "chat_bubble_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSelectChatBubble },
			{ ["name"]: "chat_laba_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLabaClick },

			{ ["name"]: "input_change_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChangeInput },
			{ ["name"]: "voice_input_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["name"]: "voice_lab", ["font"]: "ht_24_cc_stroke_saddlebrown", ["color"]: gui.Color.white, ["messageFlag"]: true },

			{ ["name"]: "btn_display", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickDisplayItem },
		];

		let channelList = this.msgMrg.getRegisteredChannelList()
		for (let channel of channelList) {
			elemInfo.push({ ["name"]: "channel" + channel, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
			elemInfo.push({ ["name"]: "unreadbg" + channel, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
			elemInfo.push({ ["name"]: "unread" + channel, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
		}

		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		this.mElemList["btn_display"].visible = false
		this.mElemList["chat_bubble_btn"].visible = false
		this.mElemList["chat_laba_btn"].visible = false

		//频道单选
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
		for (let channel of channelList) {
			let radioBtn = <eui.RadioButton>this.mElemList["channel" + channel]
			radioBtn.group = radioGroup;
			radioBtn.value = channel;
		}


		var listBox: eui.List = this.mElemList["list_channel"];
		listBox.itemRenderer = itemRender.ChannelChatItem;

		//水平不滚动
		var listScroller: eui.Scroller = this.mElemList["list_channel_scroller"];
		listScroller.scrollPolicyH = eui.ScrollPolicy.OFF;



		this.setQuetionVisible(false)

		this.friendChatWnd = ChatInChannel_ChatWnd.newObj(this.mLayoutNode, this)
		this.friendChatWnd.loadWnd()


	}

	public onUnLoad(): void {

	}

	public onShow(): void {

		this.mLayoutNode.visible = true;

		// let homeinfo = HomepageSystem.getInstance().getSelfHomepageInfo()
		// if (homeinfo == null || homeinfo.icon == null) {
		// 	HomepageSystem.getInstance().reqSelfHomePageInfo()
		// }

		if (this.needToResetChannel) {
			this.resetDefaultChannel()
			this.needToResetChannel = false
		}
		this.needToScroll = true
		this.refreshFrame()
	}

	public onHide(): void {

		for (let _ in this.timerList) {
			let timer = this.timerList[_]

			KillTimer(timer)
		}
		this.timerList = {}

		this.mLayoutNode.visible = false;
		WngMrg.getInstance().hideWindow("ChatInsertFaceFrame")

		this.friendChatWnd.hideWnd()
	}

	resetDefaultChannel() {
		this.setSelected(channelType.WORLD)
		let edit = <eui.EditableText>this.mElemList["edit_input"]
		edit.text = "";
		this.onContentChanged(null)
		this.inputType = 1 //--1 文字；2 录音
		this.changeInputByType()

		this.worldOldContent = null;
		this.mElemList["input_change_btn"].enabled = (false)
	}



	onClickDisplayItem(args) {
		MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"))
		return
		//跨服不能展示
		// if (this.mCurSendChannel == channelType.SERVER) {
		// 	MsgSystem.addTagTips(Localize_cns("NOT_DISPLAY"))
		// 	return
		// }

		// let window = WngMrg.getInstance().getWindow("ChatDisplaySelectFrame")
		// window.showWndWithSelectCallback(this.gotItemToDisplay, this)
		// //window.loadWnd()
		// //window.setSelectCallBack(this.gotItemToDisplay,this)
		// //this.pushShowWnd("ItemSelectFrame",false)
		// this.inputType = 1
		// this.changeInputByType()
	}

	gotSelectFace(selectFace) {
		let content = "#" + selectFace

		let edit = <eui.EditableText>this.mElemList["edit_input"]
		edit.text = edit.text + content;
		this.onContentChanged()
	}

	gotItemToDisplay(linkXml, name) {
		if(!linkXml)
			return;
		// let font: any = {}
		// font.no_change_font = true
		// font.defalut_font = "ht_20_cc_stroke"
		// font.default_color = "ublack"

		// let xml = "[" + name + "]" //XmlConverter.getLinkXml(linkXml, name) 
		// let text = this.mElemList["edit_input"].text || ""
		// this.mElemList["edit_input"].text = text + (xml)
		let content = XmlConverter.LinkSign + linkXml + XmlConverter.LinkSign;
		if(this._sendMsgImp(content)){
			this.onContentChanged()
		}
	}

	refreshFrame(refreshChannel?:number) {
		if(refreshChannel == null)
			refreshChannel = -1

		this.checkQuestionShow()

		
		if ( this.isFriendChat(this.mCurSendChannel)) {
			this.mElemList["channelRootWnd"].visible = (false)
			this.friendChatWnd.showWnd()


			this.mElemList["sendRootWnd"].visible = (true)
		} else {
			this.friendChatWnd.hideWnd()
			this.mElemList["channelRootWnd"].visible = (true)


			if (this.mCurSendChannel == channelType.SYSTEM) {

				this.mElemList["sendRootWnd"].visible = (false)

			} else {
				this.mElemList["sendRootWnd"].visible = (true)

				this.onContentChanged()
				if (this.mCurSendChannel == channelType.WORLD) {
					//this.inputType = 1 
					this.changeInputByType()
				} else {
					this.changeInputByType()
				}
				this.mElemList["input_change_btn"].enabled = (true)
			}

		}



		this.channelStateList = this.msgMrg.getChannelState()

		for (let k in this.channelStateList) {
			let v = this.channelStateList[k];
			this.mElemList["channel" + k].enabled = v[0]
		}

		this.msgUnread[this.mCurSendChannel] = 0
		//this.refreshMsg(this.mCurSendChannel)

		let channelList = this.msgMrg.getRegisteredChannelList()
		for (let k = 0; k < channelList.length; k++) {
			let v = channelList[k]
			let count = this.msgUnread[v]
			if (count == null || count <= 0) {
				this.mElemList["unread" + v].visible = (false)
				this.mElemList["unreadbg" + v].visible = (false)

			} else {
				this.mElemList["unread" + v].visible = (true)
				this.mElemList["unreadbg" + v].visible = (true)
				if (count > 99) {
					count == 99;
				}
				this.mElemList["unread" + v].text = count;
			}
		}

		if(refreshChannel == - 1 || refreshChannel == this.mCurSendChannel){
			this.refreshMsg(this.mCurSendChannel)
		}


	}

	refreshMsg(channel: number) {

		let reset = this.lastRefreshChannel != channel
		this.lastRefreshChannel = channel

		let msgList = this.msgMrg.getChannelPacketList(channel)
		let listchat = <eui.List>this.mElemList["list_channel"]
		UiUtil.updateList(listchat, msgList, reset);
		listchat.validateNow();

		let scroller = <eui.Scroller>this.mElemList["list_channel_scroller"]
		scroller.stopAnimation();
		if (this.needToScroll == true && listchat.contentHeight > scroller.height) {

			if(this.timerList["delayScrollTimer"] == null){
				let delayScroll = function (dt) {
					KillTimer(this.timerList["delayScrollTimer"])
					delete this.timerList["delayScrollTimer"]

					listchat.scrollV = listchat.contentHeight - scroller.height;
				}
				this.timerList["delayScrollTimer"] = SetTimer(delayScroll, this, 100)
			}

		}

	}



	onSelected(event: egret.Event) {

		var radioGroup: eui.RadioButtonGroup = event.target;
		//console.log(radioGroup.selection);
		let radiobtn = radioGroup.selection


		this.setSelected(radiobtn.value);
		this.msgMrg.setCurChannel(this.mCurSendChannel)

		this.refreshFrame()
	}

	onClickBiaoqing(event: egret.TouchEvent) {

		let btn: eui.Button = event.target;

		let window = WngMrg.getInstance().getWindow("ChatInsertFaceFrame")
		window.showFaceTable(this.gotSelectFace, this, event);

		// window.loadWnd()
		// if(window.isVisible() ){
		// 	window.hideWnd()
		// }else{
		// 	window.setXY(60,650)
		// 	window.showFaceTable(this.gotSelectFace,this)
		// }
	}

	onContentChanged(args?) {
		// let content = this.mElemList["edit_input"].text
		// if (content.length == 0) {
		// 	this.mElemList["btn_send"].visible = (false)
		// 	this.mElemList["btn_display"].visible = (true)
		// 	if (this.mCurSendChannel == channelType.SERVER) {
		// 		this.mElemList["btn_display"].visible = (false)
		// 	}
		// } else {
		// 	if (this.mCurSendChannel == channelType.SERVER) {
		// 		this.mElemList["btn_send"].visible = (false)
		// 		this.mElemList["btn_display"].visible = (false)
		// 	} else {
		// 		this.mElemList["btn_send"].visible = (true)
		// 		this.mElemList["btn_display"].visible = (false)
		// 	}
		// }
	}



	onListScrollerChange(event: egret.Event) {
		let scroller = <eui.Scroller>this.mElemList["list_channel_scroller"]
		let viewport = scroller.viewport
		if (viewport.scrollV + scroller.height >= viewport.contentHeight) {
			this.needToScroll = true;
		} else {
			this.needToScroll = false;
		}
	}


	_sendMsgImp(content:string) : boolean{

		
		if (this.isFriendChat()) {
			if (this.friendChatWnd.sendChatMessage(content)) {
				return true;
			}
			return false
		}

		if (StringUtil.isEmptyContent(content)) {
			MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_NEIRONGBUNENGWEIKONG"))
			return false
		}

		if (GAME_DEBUG) {
			let strTable = splitString(content, " ")
			if (strTable[0] == "@openfunc") {
				if (strTable[1] == "all") {
					let errantry = 0
					for (let _ in GuideFuncDefine) {
						let v = GuideFuncDefine[_]
						GuideSystem.getInstance().opendFunc(v)//errantry = errantry + 2 ^ (v - 1)
					}
					//let message = GetMessage(opCodes.C2G_ROLE_NEWBIE_SETTING_RECORD)
					//message.errantry = errantry
					//return SendGameMessage(message)
				} else {
					let wnd = WngMrg.getInstance().getWindow("ActivateButtonFrame");
					GuideSystem.getInstance().opendFunc(strTable[1])
				}
			} else if (strTable[0] == "@closefunc") {
				if (strTable[1] == "clear") {
					let message = GetMessage(opCodes.C2G_ROLE_NEWBIE_SETTING_RECORD)
					message.errantry = ""
					 SendGameMessage(message)
				} else {
					if (GameConfig.FuncDefineConfig[strTable[1]]) {
						SetRoleFunctionSetting(GameConfig.FuncDefineConfig[strTable[1]].funcOrder, true)
					}
				}
				return false
			} else if (strTable[0] == "@playMovie") {
				MovieSystem.getInstance().beginPlay(strTable[1])
				return false
			} else if (strTable[0] == "@playFight") {
				FightSystem.getInstance().showClientFight(tonumber(strTable[1]))
				return false
			} else if (strTable[0] == "@guidefunc") {
				GuideFuncSystem.getInstance().showDynamicTips(strTable[1])
				return false;
			} else if (strTable[0] == "@clearTask") {
				let taskList = TaskSystem.getInstance().getTaskList()
				for (let taskId in taskList) {
					let task = taskList[taskId]

					let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
					message.channel = this.mCurSendChannel
					message.data = "@task me end " + taskId
					SendGameMessage(message)
				}
			} else if (strTable[0] == "@guide") {
				let guideId = tonumber(strTable[1])
				GuideSystem.getInstance().doGuideByIndex(guideId)
				this.hideWnd();
				return false;
			} else if (strTable[0] == "@groupcmd") {
				//let groupcmdconfig = {}
				//readCSV("data\\config\\groupcmd.csv", groupcmdconfig)
				let groupcmd = strTable[1]
				let cmdlist = GameConfig.GroupCmdConfig[groupcmd]
				for (let i = 1; i < 500; ++i) {
					let cmdinfo = cmdlist[i]
					if (cmdinfo == null) {
						break
					}
					let cmd = cmdinfo.cmd
					let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
					message.channel = this.mCurSendChannel
					message.data = cmd
					SendGameMessage(message)
				}
				return true;
			}
		}


		let flag = this.msgMrg.checkSendCondition(content)
		if (!flag) {
			return false
		}

		// let haveBadWord = false
		content = WordFilter.filtWord(content)
		//TLog.Debug("onClickSendMessage",content)

		let curSendTime = GetCurMillSec()
		if (this.lastSendTime > 0 && curSendTime - this.lastSendTime < 5000) {
			MsgSystem.addTagTips(Localize_cns("CHAT_SEND_TOO_FAST"))
			return false
		}
		this.lastSendTime = curSendTime

		if (this.mCurSendChannel == channelType.WORLD && !GAME_DEBUG) {
			if (this.worldOldContent == content) {
				MsgSystem.addTagTips(Localize_cns("CHANNEL_SAME_CONTENT_TIPS"))
				return false
			}
			this.worldOldContent = content
		}

		let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
		message.channel = this.mCurSendChannel
		message.data = content
		SendGameMessage(message)
		
		//EasterEggSystem.getInstance().showEasterEggDialog(EasterEggTypeList.FIELD_SPECIAL_CHAT, content)

		return true;

	}

	onClickSendMsg(event: egret.TouchEvent) {
		let edit = <eui.EditableText>this.mElemList["edit_input"]
		let content = edit.text;
		if( this._sendMsgImp(content) ){
			edit.text = ("")
			this.onContentChanged()
			this.needToScroll = true
		}

	}


	addPacketMsg(packet) {
		let channel = packet.channel

		if (this.mCurSendChannel != packet["channel"]) {
			this.msgUnread[packet["channel"]] = this.msgUnread[packet["channel"]] + 1
		}

		if (this.isVisible() == false) {
			return
		} else {
			this.refreshFrame()
		}
	}


	onReceiveMessage(args) {
		let packet = args.packet
		let content = packet.data

		let channelList = this.msgMrg.getRegisteredChannelList()
		if (!table_isExsit(channelList, packet["channel"])) {
			return
		}

		//if((packet["channel"] == channelType.UNION || packet["channel"] == channelType.WORLD || packet["channel"] == channelType.FACTION) ){
		//	return
		//}

		if (this.mCurSendChannel != packet["channel"]) {
			this.msgUnread[packet["channel"]] = this.msgUnread[packet["channel"]] + 1
		}

		//////////////////////-头顶冒泡信息//////////////////////////-
		let dataStr = packet.data
		if (packet["MsgType"]) {
			dataStr = Localize_cns("VOICE_MARK")
		}

		//只有世界频道才冒泡
		if (!packet.offlineChat && packet.channel == channelType.WORLD) {
			//let hideChatBubble = RoleSystem.getInstance().getSystemSetting("set_hide_paopao")
			if (packet.roleId == GetHero().getId()) {
				GetHero().doCommand(ActorCommand.AddChatBubble, dataStr, false)//this.getBubbleXml(packet), false)
			} else {

				let bShowPlayer = ActorManager.getInstance().getShowPlayerStatus()
				if (bShowPlayer == 1) {
					let player = ActorManager.getInstance().getPlayer(packet.roleId)
					if (player) {
						player.doCommand(ActorCommand.AddChatBubble, dataStr, false)//this.getBubbleXml(packet), false)
					}
				}
			}
		}

		//////////////////////////////////////////////////////////////
		if (this.isVisible() == false || this.isLoadComplete() == false) {
			return
		} else {
			this.refreshFrame(packet["channel"])
		}
	}



	//选择气泡
	onSelectChatBubble(args) {
		MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"))
		return
		// let wnd = WngMrg.getInstance().getWindow("ChatBubbleSelectFrame")
		// wnd.showWnd()
	}

	//跨服喇叭
	onLabaClick(args) {
		MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"))
		return
		// let wnd = WngMrg.getInstance().getWindow("ChatBubbleSelectFrame")
		// wnd.showWnd()
	}

	//////////////////////////////////-语音相关//////////////////////////////
	onClickChangeInput(args) {
		//频道处理，跨服不能发送语音
		if (this.mCurSendChannel == channelType.SERVER) {
			MsgSystem.addTagTips(Localize_cns("CHAT_TXT1"))
			return
		}

		this.inputType = this.inputType % 2 + 1				//1 文字；2 录音
		this.changeInputByType()
	}

	changeInputByType() {
		// this.mElemList["input_change_btn"].visible = (true)
		// if (this.inputType == 1) {
		// 	this.mElemList["input_change_btn"].source = ("lt_bt_yuYing01")
		// 	this.mElemList["edit_bg"].visible = true
		// 	this.mElemList["voice_input_btn"].visible = false
		// } else {
		// 	this.mElemList["input_change_btn"].source = ("lt_bt_wenZi01")
		// 	this.mElemList["edit_bg"].visible = false
		// 	this.mElemList["voice_input_btn"].visible = true
		// }
		//this.voiceWnd.SetVisible(false)
	}

	setSelected(channelId) {

		this.needToScroll = (this.mCurSendChannel != channelId);

		this.mCurSendChannel = channelId || this.msgMrg.getCurChannel()
		let radioBtn = <eui.RadioButton>this.mElemList["channel" + this.mCurSendChannel];
		radioBtn.selected = true;



		// this.mElemList["tab"]:SetSelected(this.mElemList["channel" + this.mCurSendChannel])
		// this.mElemList["channel" + this.mCurSendChannel]:MoveToFront()
		//this.mElemList["biaoQing_bg"]:SetVisible(false)
		//for(let _ = 0; _ < this.msgMrg.getRegisteredChannelList().length; _++){
		//let channel = this.msgMrg.getRegisteredChannelList()[_]
		//
		//	if(this.mCurSendChannel == channel ){
		//		this.mElemList["channel_tl" +channel]:SetTitleColor(gui.Color16.white)
		//	}else{
		//		this.mElemList["channel_tl" +channel]:SetTitleColor(gui.Color16.rouse)
		//	}
		//}
	}


	//返回登陆清空聊天内容
	onPrecedureDeactive(args) {
		if (this.mElemList == null)
			return;
		// let channelName: any = {
		// 	[channelType.SYSTEM]: "system",
		// 	[channelType.WORLD]: "world",
		// 	[channelType.TEAM]: "team",
		// 	[channelType.FACTION]: "faction",
		// 	[channelType.UNION]: "union",
		// }
		for (let k = 0; k < this.msgMrg.getRegisteredChannelList().length; k++) {
			let v = this.msgMrg.getRegisteredChannelList()[k]

			this.msgUnread[v] = 0
			//this.msgHeight[v] = 0
			//this.initDeltaHeight[v]=false
			//this.deltaHeight[v]=0
			//this.needToScroll[v]=false
			// this.saveScrollHeight[v] = 0
			// this.saveScrollY[v] = 0
			if (this.mElemList["unread" + v]) {
				this.mElemList["unread" + v].visible = (false)
				this.mElemList["unreadbg" + v].visible = (false)
			}
		}

		this.saveChatHistory = []

		this.needToResetChannel = true
		this.saveTotalHeight = 0
		//this.tabBox.SetSelected(this.mElemList["channel"+channelType.WORLD])
		this.msgMrg.setCurChannel(channelType.WORLD)

		if (this.timer) {
			KillTimer(this.timer)
			this.timer = null
		}

		this.clearQuestion()
	}


	//////////////////////////////////////////////////////////////////////////////////////////////-
	//答题
	onChooseA(args) {
		let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
		message.channel = channelType.WORLD
		message.data = this.answerA || ""
		SendGameMessage(message)
		this.clearQuestion()
	}

	onChooseB(args) {
		let message = GetMessage(opCodes.C2G_CHANNEL_SEND)
		message.channel = channelType.WORLD
		message.data = this.answerB || ""
		SendGameMessage(message)
		this.clearQuestion()
	}

	setQuetionVisible(visible) {
		if (this.mElemList == null)
			return;
		let wnd = this.mElemList["group_question"]
		if (wnd) {
			wnd.visible = (visible)
		}
	}

	clearQuestion() {
		if (this.questionTimer) {
			KillTimer(this.questionTimer)
			this.questionTimer = null
		}
		this.nextTime = -1
		this.setQuetionVisible(false)

		this.questionIndex = -1
		this.answerA = ""
		this.answerB = ""

	}

	isFriendChat(channel?) {
		if(channel == null || channel == -1){
			channel = this.mCurSendChannel
		}

		return channel == channelType.CHAT
	}


	checkQuestionShow() {
		if (!this.questionTimer) {
			return
		}

		let curTime = GetServerTime()
		let interval = this.nextTime - curTime
		if (interval < 1) {//剩余时间
			this.clearQuestion()
			return
		}

		if (!this.isVisible() || !this.isLoadComplete()) {
			return
		}

		if (this.mCurSendChannel != channelType.WORLD) {
			this.setQuetionVisible(false)
			return
		}

		if (this.answerA == "" && this.answerB == "") {
			let questionIndex = this.questionIndex
			let question = GameConfig.OnLineQuestionConfig[questionIndex] == null && "" || GameConfig.OnLineQuestionConfig[questionIndex].topic
			AddRdContent(this.mElemList["questionContent"], question, "ht_24_cc_stroke", "white")
			let leftAnswer = GameConfig.OnLineQuestionConfig[questionIndex].answer
			let rightAnswer = GameConfig.OnLineQuestionConfig[questionIndex].wrong

			let optionA = this.mElemList["chooseA"]
			let optionB = this.mElemList["chooseB"]

			if (MathUtil.random(2) == 1) {
				optionA.text = ("A. " + leftAnswer)
				optionB.text = ("B. " + rightAnswer)
				this.answerA = leftAnswer
				this.answerB = rightAnswer
			} else {
				optionA.text = ("A. " + rightAnswer)
				optionB.text = ("B. " + leftAnswer)
				this.answerA = rightAnswer
				this.answerB = leftAnswer
			}
		}


		this.mElemList["onlineTime"].text = (String.format(Localize_cns("CHAT_COUNTDOWN"), interval))
		this.setQuetionVisible(true)
	}


	onRecvOnLineQuestion(args) {
		let questionIndex = args.questionIndex
		this.questionIndex = questionIndex
		if (!GameConfig.OnLineQuestionConfig[questionIndex]) {
			return
		}

		if (!this.questionTimer) {
			let onOneSecondTimeOut = function (delay) {
				this.checkQuestionShow()
			}
			this.nextTime = GetServerTime() + 60
			this.questionTimer = SetTimer(onOneSecondTimeOut, this, 1000, false)
		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////-


	_chatWithPlayer(playerId, playerName) {
		if (this.mCurSendChannel != channelType.CHAT) {
			this.mCurSendChannel = channelType.CHAT
			this.setSelected(this.mCurSendChannel)
			this.msgMrg.setCurChannel(this.mCurSendChannel)
			this.refreshFrame()
		}

		this.friendChatWnd.showWithFriendInfo(playerId, playerName)
	}



	chatWithPlayer(playerId, playerName) {
		this.showWnd()
		this.doCommand("_chatWithPlayer", playerId, playerName);
	}
}