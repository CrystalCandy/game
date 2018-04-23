// TypeScript file
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
var UIChatViewer = (function (_super) {
    __extends(UIChatViewer, _super);
    function UIChatViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIChatViewer.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mRootWnd = params[0];
        this.mLayoutNode = params[1];
        this.name = params[2];
        var x = params[3] || 0;
        var y = params[4] || 0;
        this.mParent = params[5];
        this.maxRow = 4;
        this.mElemList = {};
        this.visible = false;
        // var elemInfo = [
        //     { ["name"]: "group_chat", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },
        //     { ["name"]: "rd_chat_content", ["title"]: null, ["event_name"]: null, ["fun_index"]: null },
        //     { ["name"]: "btn_chat", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShowChatFrame },
        // ];
        // UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = this.name, _a["title"] = null, _a["x"] = x, _a["y"] = y, _a["event_name"] = null, _a["fun_index"] = null, _a["touchEnabled"] = false, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "UIchat_bg", _b["parent"] = this.name, _b["title"] = null, _b["font"] = null, _b["image"] = "zjm_shuRuDi01", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 640, _b["h"] = 120, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "rd_chat_content", _c["parent"] = this.name, _c["title"] = "", _c["font"] = "ht_20_lc", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["percentWidth"] = 100, _c["percentHeight"] = 100, _c),
            (_d = {}, _d["index_type"] = gui.Scroller, _d["name"] = "rd_chat_scroll", _d["viewport"] = "rd_chat_content", _d["parent"] = this.name, _d["x"] = 80, _d["y"] = 15, _d["w"] = 440, _d["h"] = 90, _d["event_name"] = null, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = "btn_chat", _e["parent"] = this.name, _e["title"] = "", _e["font"] = "ht_20_lc", _e["image"] = "zjm_liaoTian01", _e["color"] = gui.Color.white, _e["x"] = 530, _e["y"] = 16, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickShowChatFrame, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mParent);
        this.mElemList["rd_chat_content"].setRowDistance(4);
        var _a, _b, _c, _d, _e;
        // this.mElemList["UIchat_bg"]:SetLayer(gui.Window.LayerTop)
        // this.mElemList["UIchat_bg"]:SetMessagePass(true)        
    };
    UIChatViewer.prototype.onClickShowChatFrame = function (event) {
        TLog.Debug("onClickShowChatFrame");
        var wnd = WngMrg.getInstance().showWindow("ChatInChannelFrame");
    };
    //将约定格式组装成超链接xml
    UIChatViewer.prototype.analyzeHyperLink = function (content, colorToUse, channelID) {
        var color = colorToUse || "navajowhite";
        var param = {};
        param.no_change_font = true;
        param.default_color = color;
        param.defalut_font = "ht_18_cc";
        //跨服频道字体增大
        if (channelID == channelType.SERVER) {
            param.defalut_font = "ht_20_cc_stroke_ublack";
        }
        else {
            param.defalut_font = "ht_18_cc";
        }
        //param.link_parser = ContentParseLinkHandler
        return XmlConverter.parseText(content, param);
    };
    UIChatViewer.prototype.refreshFrame = function () {
        // this.mElemList["UIchat_bg"]:SetWH(640, 80)
        // this.mElemList["UIchat_rd"]:SetWH(this.defaultW, this.defaultH)
        var rd = this.mElemList["rd_chat_content"];
        rd.clear();
        var channelEx = (_a = {},
            _a[channelType.WORLD] = ["navajowhite", Localize_cns("CHANNEL_WORLD")],
            _a[channelType.TEAM] = ["deepskyblue", Localize_cns("CHANNEL_TEAM")],
            _a[channelType.FACTION] = ["lime", Localize_cns("CHANNEL_FACTION")],
            _a[channelType.UNION] = ["white", Localize_cns("MAIN_TXT5")],
            _a[channelType.CHAT] = ["pink", Localize_cns("CHANNEL_CHAT")],
            _a[channelType.SYSTEM] = ["cyan", Localize_cns("CHANNEL_SYSTEM")],
            _a);
        var packets = ChannelMrg.getInstance().getMsgPacket();
        var list = [];
        for (var i = packets.length - 1; i >= 0; i--) {
            if (list.length >= this.maxRow) {
                break;
            }
            if (channelEx[packets[i].packet["channel"]]) {
                JsUtil.arrayInstert(list, 0, packets[i].packet);
            }
        }
        var flag = false;
        for (var k = 0; k < list.length; k++) {
            var packet = list[k];
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
                var name_1 = "";
                if (packet["channel"] == channelType.SYSTEM) {
                    name_1 = Localize_cns("MAOHAO");
                }
                else if (packet["roleId"] == GetHeroProperty("id")) {
                    name_1 = Localize_cns("SELF") + Localize_cns("MAOHAO");
                }
                else {
                    if (packet["channel"] == channelType.UNION && packet.factionID) {
                        var factionName = ClubSystem.getInstance().GetUnionFactonName(packet.factionID);
                        name_1 = String.format(Localize_cns("MAIN_TXT6"), factionName) + packet.name + Localize_cns("MAOHAO");
                    }
                    else {
                        name_1 = packet["name"] + Localize_cns("MAOHAO");
                    }
                }
                name_1 = channelEx[packet["channel"]][1] + name_1;
                var content = "#little_space" + "#" + channelEx[packet["channel"]][0] + name_1 + "#rf" + packet.data;
                var font = {};
                font.no_change_font = true;
                font.default_color = "navajowhite";
                font.defalut_font = "ht_18_cc";
                var xml = this.analyzeHyperLink(content, channelEx[packet["channel"]][0], packet["channel"]);
                rd.addXmlString(xml);
                flag = true;
            }
        }
        //刷新红点
        var btn = this.mElemList["btn_chat"];
        this.mRootWnd.hideDotTipsUI(btn);
        var unreadCount = FriendSystem.getInstance().getFriendUnReadMsgCount(-1);
        if (unreadCount > 0) {
            this.mRootWnd.createDotTipsUI(btn, false);
        }
        else {
        }
        DelayEvecuteFunc(0, function () {
            UiUtil.updateScrollerV(this.mElemList["rd_chat_scroll"], -1);
        }, this);
        var _a;
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
    };
    UIChatViewer.prototype.setVisible = function (visible) {
        if (visible == null) {
            return;
        }
        if (this.visible == visible) {
            return;
        }
        this.visible = visible;
        if (visible == true) {
            RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.refreshFrame, this);
            RegisterEvent(EventDefine.FRIEND_UNREAD_UPDATE, this.refreshFrame, this);
            this.refreshFrame();
        }
        else {
            UnRegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.refreshFrame, this);
            UnRegisterEvent(EventDefine.FRIEND_UNREAD_UPDATE, this.refreshFrame, this);
        }
        this.mElemList[this.name].visible = visible;
    };
    return UIChatViewer;
}(TClass));
__reflect(UIChatViewer.prototype, "UIChatViewer");
//# sourceMappingURL=UIChatViewer.js.map