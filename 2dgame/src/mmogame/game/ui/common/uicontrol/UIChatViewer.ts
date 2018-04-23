// TypeScript file


class UIChatViewer extends TClass {
    mRootWnd: BaseWnd;
    mLayoutNode: gui.LayoutNode;
    
    mElemList: any;
    maxRow: number;
    visible: boolean;

    mParent:egret.DisplayObjectContainer

    name:string;

    public initObj(...params: any[]) {

        this.mRootWnd = params[0]
        this.mLayoutNode = params[1]

        this.name = params[2]
        let x = params[3] || 0
        let y = params[4] || 0

        this.mParent = params[5]

        this.maxRow = 4;
        this.mElemList = {};

        this.visible = false;

        // var elemInfo = [
        //     { ["name"]: "group_chat", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },
        //     { ["name"]: "rd_chat_content", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },
        //     { ["name"]: "btn_chat", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShowChatFrame },


        // ];
        // UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);


        let mElemInfo: any = [
            { ["index_type"]: eui.Group, ["name"]: this.name, ["title"]: null, ["x"]: x, ["y"]: y, ["event_name"]: null, ["fun_index"]: null, ["touchEnabled"]: false },
            { ["index_type"]: gui.Grid9Image, ["name"]: "UIchat_bg", ["parent"]: this.name, ["title"]: null, ["font"]: null, ["image"]: "zjm_shuRuDi01", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 640, ["h"]: 120,  ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },


            { ["index_type"]: gui.RichDisplayer, ["name"]: "rd_chat_content", ["parent"]: this.name, ["title"]: "", ["font"]: "ht_20_lc", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["percentWidth"] : 100 ,["percentHeight"] : 100	 },
            {["index_type"] : gui.Scroller,	     ["name"] : "rd_chat_scroll",         ["viewport"]:"rd_chat_content",	 ["parent"]: this.name, 	["x"] : 80, ["y"] : 15,		 			["w"] : 440 ,["h"] : 90		,["event_name"] : null, ["fun_index"] :null, ["messageFlag"]: true},		

            { ["index_type"]: gui.Button, ["name"]: "btn_chat", ["parent"]: this.name, ["title"]: "", ["font"]: "ht_20_lc", ["image"]: "zjm_liaoTian01", ["color"]: gui.Color.white, ["x"]: 530, ["y"]: 16,  ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShowChatFrame },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this,  this.mParent)
        this.mElemList["rd_chat_content"].setRowDistance(4)
        // this.mElemList["UIchat_bg"]:SetLayer(gui.Window.LayerTop)
        // this.mElemList["UIchat_bg"]:SetMessagePass(true)        
    }



    onClickShowChatFrame(event: egret.TouchEvent) {
        TLog.Debug("onClickShowChatFrame")
        let wnd = WngMrg.getInstance().showWindow("ChatInChannelFrame")
    }

    //将约定格式组装成超链接xml
    analyzeHyperLink(content, colorToUse, channelID) {
        let color = colorToUse || "navajowhite"

        let param: any = {}
        param.no_change_font = true
        param.default_color = color
        param.defalut_font = "ht_18_cc"

        //跨服频道字体增大
        if (channelID == channelType.SERVER) {
            param.defalut_font = "ht_20_cc_stroke_ublack"
        } else {
            param.defalut_font = "ht_18_cc"
        }

        //param.link_parser = ContentParseLinkHandler
        return XmlConverter.parseText(content, param)
    }


    refreshFrame() {
        // this.mElemList["UIchat_bg"]:SetWH(640, 80)
        // this.mElemList["UIchat_rd"]:SetWH(this.defaultW, this.defaultH)

        let rd: gui.RichDisplayer = this.mElemList["rd_chat_content"]
        rd.clear()


        let channelEx: any = {
            [channelType.WORLD]: ["navajowhite", Localize_cns("CHANNEL_WORLD")],
            [channelType.TEAM]: ["deepskyblue", Localize_cns("CHANNEL_TEAM")],
            [channelType.FACTION]: ["lime", Localize_cns("CHANNEL_FACTION")],
            [channelType.UNION]: ["white", Localize_cns("MAIN_TXT5")],
            [channelType.CHAT] : ["pink", Localize_cns("CHANNEL_CHAT")],
            [channelType.SYSTEM] : ["cyan", Localize_cns("CHANNEL_SYSTEM")],
            //[channelType.SERVER]="cyan",	
        }

        let packets:any[] = ChannelMrg.getInstance().getMsgPacket()
        let list = []
        for (let i = packets.length - 1; i >= 0; i--) {
            if (list.length >= this.maxRow) {						//最多显示4条即时信息
                break
            }

            if(channelEx[packets[i].packet["channel"]]){
                JsUtil.arrayInstert(list, 0, packets[i].packet)
            }
            
        }

        
        let flag = false
        for (let k = 0; k < list.length; k++) {
            let packet = list[k]

            //table_TLog.Debug(packet)
            if (channelEx[packet["channel"]]) {
                // if (packet["MsgType"] && GetHeroPropertyInfo() && packet.roleId) {

                //     let bCheck = GameSound.getInstance().getAutoVoicStatus()

                //     if (bCheck && packet.roleId != GetHeroPropertyInfo().id && (packet["channel"] == channelType.TEAM || packet["channel"] == channelType.FACTION)) {
                //         let voiceID = tonumber(packet["data"])
                //         let voiceTime = tonumber(packet["MsgType"])

                //         GameSound.getInstance().addAutoPlayList(voiceID, voiceTime)
                //         GameSound.getInstance().startPlayAutoList()

                //         GameSound.getInstance().playRecord(voiceID, true, voiceTime)
                //     }
                //     packet["data"] = Localize_cns("MAIN_TXT4")
                // }

                let name = ""

                if(packet["channel"] == channelType.SYSTEM){
                  name = Localize_cns("MAOHAO")  
                }else if (packet["roleId"] == GetHeroProperty("id")) {
                    name = Localize_cns("SELF") + Localize_cns("MAOHAO")
                } else {
                    if (packet["channel"] == channelType.UNION && packet.factionID) {
                        let factionName = ClubSystem.getInstance().GetUnionFactonName(packet.factionID)
                        name = String.format(Localize_cns("MAIN_TXT6"), factionName) + packet.name + Localize_cns("MAOHAO")
                    } else {
                        name = packet["name"] + Localize_cns("MAOHAO")
                    }
                }

                name = channelEx[packet["channel"]][1] + name

                let content = "#little_space" + "#" + channelEx[packet["channel"]][0] + name + "#rf" + packet.data
                let font: any = {}
                font.no_change_font = true
                font.default_color = "navajowhite"
                font.defalut_font = "ht_18_cc"

                let xml = this.analyzeHyperLink(content, channelEx[packet["channel"]][0], packet["channel"])
                rd.addXmlString(xml)
                flag = true
            }
        }

        //刷新红点
        let btn = this.mElemList["btn_chat"]
        this.mRootWnd.hideDotTipsUI(btn)
        
        let unreadCount = FriendSystem.getInstance().getFriendUnReadMsgCount(-1)
        if(unreadCount > 0 ){
            this.mRootWnd.createDotTipsUI(btn, false)
        }else{
            
        }

        DelayEvecuteFunc(0, function(){
            UiUtil.updateScrollerV(this.mElemList["rd_chat_scroll"], -1)
        },this)
        
        // if (flag == true) {
        //     let rdWidth = rd.GetLogicWidth() + 6
        //     let rdHeight = rd.GetAllRowHeight()

        //     let label = this.mElemList["UIchat_bg"]
        //     let margin = 3

        //     let count = rd.GetRowsCount()
        //     let fourRowH = rd.GetSpecifyRowHeight(count - 3, count - 1)
        //     let labelHeight = rdHeight < fourRowH && rdHeight || fourRowH
        //     labelHeight = labelHeight + 20
        //     labelHeight = labelHeight < 80 && 80 || labelHeight

        //     if (labelHeight > 120) {
        //         labelHeight = 120
        //     }

        //     label.SetWH(640, labelHeight)
        //     rd.SetWH(this.defaultW, labelHeight - 12)
        // }
    }


    setVisible(visible: boolean) {
        if (visible == null) {
            return
        }

        if (this.visible == visible) {
            return
        }

        this.visible = visible

        if (visible == true) {
            RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.refreshFrame, this)
            RegisterEvent(EventDefine.FRIEND_UNREAD_UPDATE, this.refreshFrame, this)

            this.refreshFrame()
        } else {
            UnRegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.refreshFrame, this)
            UnRegisterEvent(EventDefine.FRIEND_UNREAD_UPDATE, this.refreshFrame, this)
        }


        this.mElemList[this.name].visible = visible
    }

}