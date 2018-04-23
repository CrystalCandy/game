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
var itemRender;
(function (itemRender) {
    var ChannelChatItem = (function (_super) {
        __extends(ChannelChatItem, _super);
        //mElemList:any;
        function ChannelChatItem() {
            var _this = _super.call(this) || this;
            _this.MaxWidthOneRow = 400;
            _this.mElemList = null;
            _this.mElemList = {};
            var x = 0;
            var y = 0;
            var w = 530;
            var h = 100;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "chat_bg_di", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = 530, _a["h"] = 115, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "chat_bg_di_bgimg", _b["parent"] = "chat_bg_di", _b["title"] = "", _b["font"] = "", _b["image"] = "lt_kuaFuDi01", _b["color"] = gui.Color.ublack, _b["x"] = 0, _b["y"] = 0, _b["percentWidth"] = 530, _b["percentHeight"] = 100, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
                (_c = {}, _c["index_type"] = eui.Group, _c["name"] = "chat_bg", _c["image"] = "", _c["x"] = 120, _c["y"] = 40, _c["w"] = 300, _c["h"] = 100, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
                (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "chat_bgimg", _d["parent"] = "chat_bg", _d["title"] = "", _d["font"] = "", _d["image"] = "hy_duiHuaDi02", _d["color"] = gui.Color.ublack, _d["x"] = 0, _d["y"] = 0, _d["percentWidth"] = 200, _d["percentHeight"] = 100, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
                (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = "chat_top_icon", _e["title"] = "", _e["font"] = "", _e["image"] = "hy_VIPduiHua02", _e["x"] = 116, _e["y"] = -9, _e["w"] = 109, _e["h"] = 54, _e["messageFlag"] = true, _e),
                (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "rd", _f["parent"] = "chat_bg", _f["title"] = "", _f["font"] = "", _f["image"] = "", _f["color"] = gui.Color.ublack, _f["x"] = 120, _f["y"] = 40, _f["w"] = 300, _f["h"] = 60, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
                (_g = {}, _g["index_type"] = eui.Image, _g["name"] = "vip_img", _g["image"] = "vipLv00", _g["x"] = 120, _g["y"] = 0, _g["w"] = 74, _g["h"] = 31, _g),
                (_h = {}, _h["index_type"] = eui.Label, _h["name"] = "name", _h["title"] = "name", _h["font"] = "ht_24_lc_stroke", _h["image"] = "", _h["color"] = gui.Color.white, _h["x"] = 120, _h["y"] = 0, _h["w"] = 340, _h["h"] = 30, _h["event_name"] = null, _h["fun_index"] = null, _h),
            ];
            UiUtil.createElem(mElemInfo, _this, _this.mElemList, _this);
            _this.mElemList["vip_img"].visible = false;
            //this.mElemList["vip_level"]:SetHandleMessageFlag(gui.Window.TraceMouseAll)
            _this.mElemList["rd"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, _this.onClickHyperLink, _this);
            _this.petBox = UIPetBox.newObj(_this, "petBox", 0, 0, _this, 0.8);
            return _this;
            var _a, _b, _c, _d, _e, _f, _g, _h;
        }
        ChannelChatItem.prototype.dataChanged = function () {
            var info = this.data;
            var h = 0;
            var rd = this.mElemList["rd"];
            rd.clear();
            rd.setRowDistance(2);
            ////先处理  以及样式 计算文字的长宽 ////////-
            //系统消息额外处理
            this.mElemList["vip_img"].visible = (false);
            var xml = "";
            var contentColor = "white";
            var extraW = 0; //气泡icon+name
            if (info.channel == channelType.SYSTEM) {
                var content = (info.data);
                xml = this.analyzeBroadcastHyperLink(content);
                this.petBox.setVisible(false);
                //this.petBox.setEnable(false)
                UiUtil.setWH(rd, 430, 60);
                //this.mElemList["vip_level"].visible = (false)
                this.mElemList["name"].visible = (true);
                this.mElemList["name"].text = (Localize_cns("MSG_SYS"));
                IGlobal.fontSet.updateTextField("ht_20_rc_stroke", this.mElemList["name"], false);
                this.mElemList["chat_bgimg"].source = ("hy_duiHuaDi02");
                this.mElemList["chat_bg_di"].visible = false;
                this.mElemList["chat_top_icon"].source = "";
            }
            else {
                this.mElemList["chat_bg_di"].visible = true;
                UiUtil.setWH(rd, this.MaxWidthOneRow, 70);
                this.petBox.setVisible(true);
                var chatBubbleList = VipSystem.getInstance().getSortChatBubbleList();
                var chatBubbleType = checkNull(info.chatBubbleType, 1);
                var chatBg = "hy_duiHuaDi01", chatTopIcon = "";
                for (var i = 0; i < chatBubbleList.length; i++) {
                    var v = chatBubbleList[i];
                    if (chatBubbleType == v.index) {
                        chatBg = v.imgName[0];
                        chatTopIcon = v.imgName[1];
                        break;
                    }
                }
                this.mElemList["chat_bgimg"].source = (chatBg);
                this.mElemList["chat_top_icon"].source = (chatTopIcon);
                if (info.roleId == GetHeroProperty("id")) {
                    this.petBox.setXY(415, 0);
                    this.mElemList["name"].visible = (false);
                    this.mElemList["chat_top_icon"].x = 318;
                    this.mElemList["chat_top_icon"].y = -9;
                    this.mElemList["chat_bgimg"].scaleX = -1;
                }
                else {
                    this.petBox.setXY(0, 0);
                    this.mElemList["name"].visible = (true);
                    this.mElemList["vip_img"].visible = (true);
                    if (this.mElemList["chat_top_icon"].source == "") {
                        var vipLevel = info.VipLevel || 0;
                        //!!!
                        if (vipLevel > 0) {
                            var viptext = "0" + vipLevel;
                            if (vipLevel > 9) {
                                viptext = "10"; //没出V10以上的
                            }
                            // this.mElemList["vip_img"].source = ("vipLv" + String.format("%02d", vipLevel))
                            this.mElemList["vip_img"].source = ("vipLv" + viptext);
                            UiUtil.setXY(this.mElemList["vip_img"], 100, 2);
                            UiUtil.setXY(this.mElemList["name"], 175, 5);
                        }
                        else {
                            this.mElemList["vip_img"].source = ("");
                            UiUtil.setXY(this.mElemList["name"], 100, 5);
                        }
                    }
                    else {
                        var vipLevel = info.VipLevel || 0;
                        //!!!
                        if (vipLevel > 0) {
                            var viptext = "0" + vipLevel;
                            if (vipLevel > 9) {
                                viptext = "10"; //没出V10以上的
                            }
                            // this.mElemList["vip_img"].source = ("vipLv" + String.format("%02d", vipLevel))
                            this.mElemList["vip_img"].source = ("vipLv" + viptext);
                            UiUtil.setXY(this.mElemList["vip_img"], 215, 5);
                            UiUtil.setXY(this.mElemList["name"], 255, 0);
                            extraW = 150;
                        }
                        else {
                            this.mElemList["vip_img"].source = ("");
                            UiUtil.setXY(this.mElemList["name"], 215, 0);
                            extraW = 110;
                        }
                    }
                    IGlobal.fontSet.updateTextField("ht_20_lc_stroke", this.mElemList["name"], false);
                    var nameStr = info.name;
                    this.mElemList["name"].text = (nameStr);
                    this.mElemList["chat_bgimg"].scaleX = 1;
                    this.mElemList["chat_top_icon"].x = 115;
                    this.mElemList["chat_top_icon"].y = -9;
                }
                this.petBox.setClickEnable(false);
                this.petBox.setEnable(true);
                this.petBox.updateRoleInfo(info.vocation, info.sexId, info.roleI);
                xml = this.analyzeHyperLink(info.data, contentColor);
            }
            rd.addXmlString(xml);
            var get_h = AdjustRdContentViewH(rd, 30);
            var rd_w = rd.getLogicWidth();
            UiUtil.setWH(rd, rd_w, get_h);
            var chat_bg = this.mElemList["chat_bg"];
            ////先处理 计算文字的长宽  }////////-
            if (info.channel == channelType.SYSTEM) {
                if (rd_w < 100 + extraW) {
                    rd_w = 100 + extraW;
                }
                h = get_h + 50;
                if (h < 110) {
                    h = 110;
                }
                else {
                    h = h + 10;
                }
                UiUtil.setXY(this.mElemList["name"], -250, 7);
                var cellh = 0;
                if (get_h <= 55) {
                    cellh = 55 - get_h;
                    get_h = 55;
                }
                UiUtil.setWH(chat_bg, 400, get_h + 10 + cellh);
                UiUtil.setXY(chat_bg, 85, 10);
                UiUtil.setXY(rd, 10, 5);
            }
            else {
                //气泡-宽度min=6,max=393,高度min=30/41,max=71/113
                //need-minw=100
                if (rd_w < 0 + extraW) {
                    rd_w = 0 + extraW;
                }
                h = get_h + 50;
                if (h < 110) {
                    h = 110;
                }
                else {
                    h = h + 10;
                }
                var cellh = 0;
                if (get_h < 45) {
                    cellh = 45 - get_h;
                    get_h = 45;
                }
                UiUtil.setWH(chat_bg, rd_w + 40, get_h + 20);
                var setRD_x = 0;
                var setBG_x = 0;
                if (info.roleId == GetHeroProperty("id")) {
                    setBG_x = 440 - (rd_w + 40);
                    setRD_x = 10;
                }
                else {
                    setBG_x = 90;
                    setRD_x = 30;
                }
                //UiUtil.setXY(chat_bg, setBG_x, 35-cellh)
                UiUtil.setXY(chat_bg, setBG_x, 35);
                UiUtil.setXY(rd, setRD_x, 12); //percent -> chat_bg
                var get_rd_w = rd.getLogicWidth();
                if (get_rd_w < 394) {
                    UiUtil.setXY(rd, setRD_x, 23);
                }
            }
            var chat_bgimg = this.mElemList["chat_bgimg"];
            chat_bgimg.anchorOffsetX = chat_bg.width / 2;
            //chat_bgimg.anchorOffsetY = chat_bg.height / 2;
            chat_bgimg.anchorOffsetY = 40;
            chat_bgimg.x = chat_bg.width / 2;
            //chat_bgimg.y = chat_bg.height / 2
            chat_bgimg.y = 40;
            //UiUtil.setWH(chat_bgimg, 200, 100)
            this.height = h;
        };
        //解释和设置超链接的表现
        ChannelChatItem.prototype.analyzeBroadcastHyperLink = function (content) {
            function parseLinkHandler(linkContent) {
                var info = {};
                info.link = null;
                info.name = null;
                info.color = null;
                //窗口名，颜色
                var _a = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(.+)/), linkType = _a[0], wndName = _a[1], content = _a[2];
                info.name = content;
                info.link = StringUtil.stringReplace(linkContent, " ", "-");
                info.color = "red";
                return info;
            }
            var param = {};
            param.no_change_font = true;
            param.default_color = "navajowhite";
            param.defalut_font = "ht_20_cc_stroke";
            param.link_parser = parseLinkHandler;
            return XmlConverter.parseText(content, param);
        };
        //将约定格式组装成超链接xml
        ChannelChatItem.prototype.analyzeHyperLink = function (content, contentColor) {
            var color = contentColor || "navajowhite";
            function parseLinkHandler(linkContent) {
                var info = {};
                info.link = null;
                info.name = null;
                info.color = null;
                var _a = StringUtil.stringMatch(linkContent, /(\d);(\d+);(\d+);(.+)/), linkType = _a[0], playerId = _a[1], targetId = _a[2], content = _a[3];
                if (!linkType || !playerId || !targetId || !content) {
                    return null;
                }
                info.name = content;
                info.link = StringUtil.stringReplace(linkContent, " ", "-");
                info.color = "orange";
                return info;
            }
            var param = {};
            param.no_change_font = true;
            param.default_color = color;
            param.defalut_font = "ht_20_cc_stroke";
            param.link_parser = parseLinkHandler;
            return XmlConverter.parseText(content, param);
        };
        //响应超链接点击
        ChannelChatItem.prototype.onClickHyperLink = function (args) {
            //tolua.cast(args, "gui::GUIHyperlinkEvent")
            var wnd = WngMrg.getInstance().getWindow("ChatInChannelFrame");
            var mCurSendChannel = wnd.mCurSendChannel;
            //跨服不响应超链接
            if (mCurSendChannel == channelType.SERVER) {
                //MsgSystem.addTagTips(Localize_cns("NOT_VIEW_ITEM_INFO"))
                return;
            }
            var linkContent = args.getHyperlink();
            if (mCurSendChannel != channelType.SYSTEM) {
                var _a = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(\d+);(.+)/), linkType = _a[0], playerId = _a[1], targetId = _a[2], content = _a[3];
                if (!linkType || !playerId || !targetId || !content) {
                    return null;
                }
                linkType = tonumber(linkType);
                TLog.Debug("FriendChatFrame.onClickHyperLink", linkType, playerId, targetId, linkContent);
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
                }
                else if (linkType == channelOption.TEAM) {
                    var _b = CheckMainFrameFunction("zudui"), flag = _b[0], str = _b[1];
                    if (flag == false) {
                        return MsgSystem.addTagTips(str);
                    }
                    var message = GetMessage(opCodes.C2G_TEAM_APPLY);
                    message.id = tonumber(playerId) || 0;
                    SendGameMessage(message);
                }
                else if (linkType == channelOption.HOMEPAGE) {
                    if (tonumber(playerId) == GetHeroProperty("id")) {
                        var wnd_1 = WngMrg.getInstance().getWindow("PersonalHomepageFrame");
                        wnd_1.showWithPlayerInfo(GetHeroProperty("id"), 1);
                    }
                    else {
                        var wnd_2 = WngMrg.getInstance().getWindow("PersonalHomepageFrame");
                        wnd_2.showWithPlayerInfo(playerId, 2);
                    }
                }
                else if (linkType == channelOption.CLUB) {
                    var clubId = tonumber(playerId) || 0;
                    var message = GetMessage(opCodes.C2G_FACTION_APPAY);
                    message.clubId = clubId;
                    message.applyReason = " ";
                    SendGameMessage(message); //-申请加入军团
                }
                else if (linkType == channelOption.CORP) {
                    var teamId = tonumber(playerId) || 0;
                    var message = GetMessage(opCodes.C2G_COMBATTEAM_JOIN);
                    message.teamId = teamId;
                    SendGameMessage(message);
                }
                if (mCurSendChannel == channelType.FACTION) {
                    if (linkType == channelOption.WND) {
                        playerId = tonumber(playerId);
                        var activity = GetActivity(ActivityDefine.Relic);
                        activity.sendMsgToGetPlayerRelicInfo(playerId, content);
                    }
                }
            }
            else {
                ExecuteNoticeCmdLink(linkContent);
            }
        };
        ChannelChatItem.prototype.onClickSearch = function (petinfo, userdata, args) {
            var wnd = WngMrg.getInstance().getWindow("ChatInChannelFrame");
            var mCurSendChannel = wnd.mCurSendChannel;
            //频道判断，跨服不能查玩家信息
            if (mCurSendChannel == channelType.SERVER) {
                MsgSystem.addTagTips(Localize_cns("CHAT_TXT2"));
                return true;
            }
            var info = this.data;
            var playerId = info.roleId;
            if (playerId == GetHeroProperty("id")) {
                MsgSystem.addTagTips(Localize_cns("CHAT_SEARCH_SELF"));
                return true;
            }
            else {
                if (playerId == 0) {
                    MsgSystem.addTagTips(Localize_cns("CHAT_TXT3"));
                    return true;
                }
                var playerName = userdata[1]; //this.controlDataTable["playerIcon"][name][2]
                var wnd_3 = WngMrg.getInstance().getWindow("MainPlayerFrame");
                wnd_3.showMainPlayerFrame(args.stageX, args.stageY, playerId);
            }
            return true;
        };
        return ChannelChatItem;
    }(eui.ItemRenderer));
    itemRender.ChannelChatItem = ChannelChatItem;
    __reflect(ChannelChatItem.prototype, "itemRender.ChannelChatItem");
})(itemRender || (itemRender = {}));
var ChatInChannelFrame = (function (_super) {
    __extends(ChatInChannelFrame, _super);
    function ChatInChannelFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatInChannelFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ChatInChannelLayout.exml"];
        this.msgMrg = ChannelMrg.getInstance();
        this.msgUnread = {}; //记录收到非当前频道消息的数量
        this.saveChatHistory = []; //机器人发言
        this.needToScroll = true; //当前频道有新发言时不立刻滚动到最新位置
        // this.saveScrollHeight = {}				//与this.needToScroll配合使用
        // this.saveScrollY = {}							//同上
        var channelList = this.msgMrg.getRegisteredChannelList();
        for (var i in channelList) {
            var channel = channelList[i];
            this.msgUnread[channel] = 0;
            // this.saveScrollY[channel] = 0
            // this.saveScrollHeight[channel] = 0
        }
        this.mCurSendChannel = this.msgMrg.getCurChannel();
        //this.deltaHeight ={}
        RegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onReceiveMessage, this);
        RegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this);
        RegisterEvent(EventDefine.ONLINE_QUESTION, this.onRecvOnLineQuestion, this);
        this.inputType = 1; //1 文字 2 语言
        this.needToResetChannel = true;
        this.saveSendTime = 0;
        this.saveTotalChatCount = 0;
        this.saveTotalHeight = 0;
        this.lastSendTime = -1;
        this.timerList = {};
        this.lastRefreshChannel = -1;
        this.clearQuestion();
    };
    ChatInChannelFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.CHAT_RECV_CHANNEL_MSG, this.onReceiveMessage, this);
        UnRegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this);
        UnRegisterEvent(EventDefine.ONLINE_QUESTION, this.onRecvOnLineQuestion, this);
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    ChatInChannelFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "edit_input", _c["font"] = "ht_24_lc", _c["color"] = gui.Color.white, _c["event_name"] = egret.TouchEvent.CHANGE, _c["fun_index"] = this.onContentChanged, _c),
            (_d = {}, _d["name"] = "btn_biaoqing", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickBiaoqing, _d),
            (_e = {}, _e["name"] = "btn_send", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickSendMsg, _e),
            (_f = {}, _f["name"] = "list_channel_scroller", _f["title"] = null, _f["event_name"] = egret.Event.CHANGE, _f["fun_index"] = this.onListScrollerChange, _f),
            (_g = {}, _g["name"] = "onlineTitle", _g["title"] = Localize_cns("CHAT_QUESTION"), _g["font"] = "ht_24_lc_stroke", _g["color"] = gui.Color.navajowhite, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
            (_h = {}, _h["name"] = "onlineTime", _h["title"] = Localize_cns("CHAT_COUNTDOWN"), _h["font"] = "ht_24_lc_stroke", _h["color"] = gui.Color.red, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = null, _h["messageFlag"] = true, _h),
            (_j = {}, _j["name"] = "chooseA", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onChooseA, _j),
            (_k = {}, _k["name"] = "chooseB", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onChooseB, _k),
            (_l = {}, _l["name"] = "chat_bubble_btn", _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onSelectChatBubble, _l),
            (_m = {}, _m["name"] = "chat_laba_btn", _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.onLabaClick, _m),
            (_o = {}, _o["name"] = "input_change_btn", _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = this.onClickChangeInput, _o),
            (_p = {}, _p["name"] = "voice_input_btn", _p["event_name"] = egret.TouchEvent.TOUCH_TAP, _p["fun_index"] = null, _p),
            (_q = {}, _q["name"] = "voice_lab", _q["font"] = "ht_24_cc_stroke_saddlebrown", _q["color"] = gui.Color.white, _q["messageFlag"] = true, _q),
            (_r = {}, _r["name"] = "btn_display", _r["event_name"] = egret.TouchEvent.TOUCH_TAP, _r["fun_index"] = this.onClickDisplayItem, _r),
        ];
        var channelList = this.msgMrg.getRegisteredChannelList();
        for (var _i = 0, channelList_1 = channelList; _i < channelList_1.length; _i++) {
            var channel = channelList_1[_i];
            elemInfo.push((_s = {}, _s["name"] = "channel" + channel, _s["title"] = null, _s["event_name"] = null, _s["fun_index"] = null, _s));
            elemInfo.push((_t = {}, _t["name"] = "unreadbg" + channel, _t["title"] = null, _t["event_name"] = null, _t["fun_index"] = null, _t));
            elemInfo.push((_u = {}, _u["name"] = "unread" + channel, _u["title"] = null, _u["event_name"] = null, _u["fun_index"] = null, _u));
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["btn_display"].visible = false;
        this.mElemList["chat_bubble_btn"].visible = false;
        this.mElemList["chat_laba_btn"].visible = false;
        //频道单选
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
        for (var _v = 0, channelList_2 = channelList; _v < channelList_2.length; _v++) {
            var channel = channelList_2[_v];
            var radioBtn = this.mElemList["channel" + channel];
            radioBtn.group = radioGroup;
            radioBtn.value = channel;
        }
        var listBox = this.mElemList["list_channel"];
        listBox.itemRenderer = itemRender.ChannelChatItem;
        //水平不滚动
        var listScroller = this.mElemList["list_channel_scroller"];
        listScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.setQuetionVisible(false);
        this.friendChatWnd = ChatInChannel_ChatWnd.newObj(this.mLayoutNode, this);
        this.friendChatWnd.loadWnd();
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    };
    ChatInChannelFrame.prototype.onUnLoad = function () {
    };
    ChatInChannelFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        // let homeinfo = HomepageSystem.getInstance().getSelfHomepageInfo()
        // if (homeinfo == null || homeinfo.icon == null) {
        // 	HomepageSystem.getInstance().reqSelfHomePageInfo()
        // }
        if (this.needToResetChannel) {
            this.resetDefaultChannel();
            this.needToResetChannel = false;
        }
        this.needToScroll = true;
        this.refreshFrame();
    };
    ChatInChannelFrame.prototype.onHide = function () {
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
        this.mLayoutNode.visible = false;
        WngMrg.getInstance().hideWindow("ChatInsertFaceFrame");
        this.friendChatWnd.hideWnd();
    };
    ChatInChannelFrame.prototype.resetDefaultChannel = function () {
        this.setSelected(channelType.WORLD);
        var edit = this.mElemList["edit_input"];
        edit.text = "";
        this.onContentChanged(null);
        this.inputType = 1; //--1 文字；2 录音
        this.changeInputByType();
        this.worldOldContent = null;
        this.mElemList["input_change_btn"].enabled = (false);
    };
    ChatInChannelFrame.prototype.onClickDisplayItem = function (args) {
        MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"));
        return;
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
    };
    ChatInChannelFrame.prototype.gotSelectFace = function (selectFace) {
        var content = "#" + selectFace;
        var edit = this.mElemList["edit_input"];
        edit.text = edit.text + content;
        this.onContentChanged();
    };
    ChatInChannelFrame.prototype.gotItemToDisplay = function (linkXml, name) {
        if (!linkXml)
            return;
        // let font: any = {}
        // font.no_change_font = true
        // font.defalut_font = "ht_20_cc_stroke"
        // font.default_color = "ublack"
        // let xml = "[" + name + "]" //XmlConverter.getLinkXml(linkXml, name) 
        // let text = this.mElemList["edit_input"].text || ""
        // this.mElemList["edit_input"].text = text + (xml)
        var content = XmlConverter.LinkSign + linkXml + XmlConverter.LinkSign;
        if (this._sendMsgImp(content)) {
            this.onContentChanged();
        }
    };
    ChatInChannelFrame.prototype.refreshFrame = function (refreshChannel) {
        if (refreshChannel == null)
            refreshChannel = -1;
        this.checkQuestionShow();
        if (this.isFriendChat(this.mCurSendChannel)) {
            this.mElemList["channelRootWnd"].visible = (false);
            this.friendChatWnd.showWnd();
            this.mElemList["sendRootWnd"].visible = (true);
        }
        else {
            this.friendChatWnd.hideWnd();
            this.mElemList["channelRootWnd"].visible = (true);
            if (this.mCurSendChannel == channelType.SYSTEM) {
                this.mElemList["sendRootWnd"].visible = (false);
            }
            else {
                this.mElemList["sendRootWnd"].visible = (true);
                this.onContentChanged();
                if (this.mCurSendChannel == channelType.WORLD) {
                    //this.inputType = 1 
                    this.changeInputByType();
                }
                else {
                    this.changeInputByType();
                }
                this.mElemList["input_change_btn"].enabled = (true);
            }
        }
        this.channelStateList = this.msgMrg.getChannelState();
        for (var k in this.channelStateList) {
            var v = this.channelStateList[k];
            this.mElemList["channel" + k].enabled = v[0];
        }
        this.msgUnread[this.mCurSendChannel] = 0;
        //this.refreshMsg(this.mCurSendChannel)
        var channelList = this.msgMrg.getRegisteredChannelList();
        for (var k = 0; k < channelList.length; k++) {
            var v = channelList[k];
            var count = this.msgUnread[v];
            if (count == null || count <= 0) {
                this.mElemList["unread" + v].visible = (false);
                this.mElemList["unreadbg" + v].visible = (false);
            }
            else {
                this.mElemList["unread" + v].visible = (true);
                this.mElemList["unreadbg" + v].visible = (true);
                if (count > 99) {
                    count == 99;
                }
                this.mElemList["unread" + v].text = count;
            }
        }
        if (refreshChannel == -1 || refreshChannel == this.mCurSendChannel) {
            this.refreshMsg(this.mCurSendChannel);
        }
    };
    ChatInChannelFrame.prototype.refreshMsg = function (channel) {
        var reset = this.lastRefreshChannel != channel;
        this.lastRefreshChannel = channel;
        var msgList = this.msgMrg.getChannelPacketList(channel);
        var listchat = this.mElemList["list_channel"];
        UiUtil.updateList(listchat, msgList, reset);
        listchat.validateNow();
        var scroller = this.mElemList["list_channel_scroller"];
        scroller.stopAnimation();
        if (this.needToScroll == true && listchat.contentHeight > scroller.height) {
            if (this.timerList["delayScrollTimer"] == null) {
                var delayScroll = function (dt) {
                    KillTimer(this.timerList["delayScrollTimer"]);
                    delete this.timerList["delayScrollTimer"];
                    listchat.scrollV = listchat.contentHeight - scroller.height;
                };
                this.timerList["delayScrollTimer"] = SetTimer(delayScroll, this, 100);
            }
        }
    };
    ChatInChannelFrame.prototype.onSelected = function (event) {
        var radioGroup = event.target;
        //console.log(radioGroup.selection);
        var radiobtn = radioGroup.selection;
        this.setSelected(radiobtn.value);
        this.msgMrg.setCurChannel(this.mCurSendChannel);
        this.refreshFrame();
    };
    ChatInChannelFrame.prototype.onClickBiaoqing = function (event) {
        var btn = event.target;
        var window = WngMrg.getInstance().getWindow("ChatInsertFaceFrame");
        window.showFaceTable(this.gotSelectFace, this, event);
        // window.loadWnd()
        // if(window.isVisible() ){
        // 	window.hideWnd()
        // }else{
        // 	window.setXY(60,650)
        // 	window.showFaceTable(this.gotSelectFace,this)
        // }
    };
    ChatInChannelFrame.prototype.onContentChanged = function (args) {
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
    };
    ChatInChannelFrame.prototype.onListScrollerChange = function (event) {
        var scroller = this.mElemList["list_channel_scroller"];
        var viewport = scroller.viewport;
        if (viewport.scrollV + scroller.height >= viewport.contentHeight) {
            this.needToScroll = true;
        }
        else {
            this.needToScroll = false;
        }
    };
    ChatInChannelFrame.prototype._sendMsgImp = function (content) {
        if (this.isFriendChat()) {
            if (this.friendChatWnd.sendChatMessage(content)) {
                return true;
            }
            return false;
        }
        if (StringUtil.isEmptyContent(content)) {
            MsgSystem.addTagTips(Localize_cns("CHAT_ERROR_NEIRONGBUNENGWEIKONG"));
            return false;
        }
        if (GAME_DEBUG) {
            var strTable = splitString(content, " ");
            if (strTable[0] == "@openfunc") {
                if (strTable[1] == "all") {
                    var errantry = 0;
                    for (var _ in GuideFuncDefine) {
                        var v = GuideFuncDefine[_];
                        GuideSystem.getInstance().opendFunc(v); //errantry = errantry + 2 ^ (v - 1)
                    }
                    //let message = GetMessage(opCodes.C2G_ROLE_NEWBIE_SETTING_RECORD)
                    //message.errantry = errantry
                    //return SendGameMessage(message)
                }
                else {
                    var wnd = WngMrg.getInstance().getWindow("ActivateButtonFrame");
                    GuideSystem.getInstance().opendFunc(strTable[1]);
                }
            }
            else if (strTable[0] == "@closefunc") {
                if (strTable[1] == "clear") {
                    var message_1 = GetMessage(opCodes.C2G_ROLE_NEWBIE_SETTING_RECORD);
                    message_1.errantry = "";
                    SendGameMessage(message_1);
                }
                else {
                    if (GameConfig.FuncDefineConfig[strTable[1]]) {
                        SetRoleFunctionSetting(GameConfig.FuncDefineConfig[strTable[1]].funcOrder, true);
                    }
                }
                return false;
            }
            else if (strTable[0] == "@playMovie") {
                MovieSystem.getInstance().beginPlay(strTable[1]);
                return false;
            }
            else if (strTable[0] == "@playFight") {
                FightSystem.getInstance().showClientFight(tonumber(strTable[1]));
                return false;
            }
            else if (strTable[0] == "@guidefunc") {
                GuideFuncSystem.getInstance().showDynamicTips(strTable[1]);
                return false;
            }
            else if (strTable[0] == "@clearTask") {
                var taskList = TaskSystem.getInstance().getTaskList();
                for (var taskId in taskList) {
                    var task = taskList[taskId];
                    var message_2 = GetMessage(opCodes.C2G_CHANNEL_SEND);
                    message_2.channel = this.mCurSendChannel;
                    message_2.data = "@task me end " + taskId;
                    SendGameMessage(message_2);
                }
            }
            else if (strTable[0] == "@guide") {
                var guideId = tonumber(strTable[1]);
                GuideSystem.getInstance().doGuideByIndex(guideId);
                this.hideWnd();
                return false;
            }
            else if (strTable[0] == "@groupcmd") {
                //let groupcmdconfig = {}
                //readCSV("data\\config\\groupcmd.csv", groupcmdconfig)
                var groupcmd = strTable[1];
                var cmdlist = GameConfig.GroupCmdConfig[groupcmd];
                for (var i = 1; i < 500; ++i) {
                    var cmdinfo = cmdlist[i];
                    if (cmdinfo == null) {
                        break;
                    }
                    var cmd = cmdinfo.cmd;
                    var message_3 = GetMessage(opCodes.C2G_CHANNEL_SEND);
                    message_3.channel = this.mCurSendChannel;
                    message_3.data = cmd;
                    SendGameMessage(message_3);
                }
                return true;
            }
        }
        var flag = this.msgMrg.checkSendCondition(content);
        if (!flag) {
            return false;
        }
        // let haveBadWord = false
        content = WordFilter.filtWord(content);
        //TLog.Debug("onClickSendMessage",content)
        var curSendTime = GetCurMillSec();
        if (this.lastSendTime > 0 && curSendTime - this.lastSendTime < 5000) {
            MsgSystem.addTagTips(Localize_cns("CHAT_SEND_TOO_FAST"));
            return false;
        }
        this.lastSendTime = curSendTime;
        if (this.mCurSendChannel == channelType.WORLD && !GAME_DEBUG) {
            if (this.worldOldContent == content) {
                MsgSystem.addTagTips(Localize_cns("CHANNEL_SAME_CONTENT_TIPS"));
                return false;
            }
            this.worldOldContent = content;
        }
        var message = GetMessage(opCodes.C2G_CHANNEL_SEND);
        message.channel = this.mCurSendChannel;
        message.data = content;
        SendGameMessage(message);
        //EasterEggSystem.getInstance().showEasterEggDialog(EasterEggTypeList.FIELD_SPECIAL_CHAT, content)
        return true;
    };
    ChatInChannelFrame.prototype.onClickSendMsg = function (event) {
        var edit = this.mElemList["edit_input"];
        var content = edit.text;
        if (this._sendMsgImp(content)) {
            edit.text = ("");
            this.onContentChanged();
            this.needToScroll = true;
        }
    };
    ChatInChannelFrame.prototype.addPacketMsg = function (packet) {
        var channel = packet.channel;
        if (this.mCurSendChannel != packet["channel"]) {
            this.msgUnread[packet["channel"]] = this.msgUnread[packet["channel"]] + 1;
        }
        if (this.isVisible() == false) {
            return;
        }
        else {
            this.refreshFrame();
        }
    };
    ChatInChannelFrame.prototype.onReceiveMessage = function (args) {
        var packet = args.packet;
        var content = packet.data;
        var channelList = this.msgMrg.getRegisteredChannelList();
        if (!table_isExsit(channelList, packet["channel"])) {
            return;
        }
        //if((packet["channel"] == channelType.UNION || packet["channel"] == channelType.WORLD || packet["channel"] == channelType.FACTION) ){
        //	return
        //}
        if (this.mCurSendChannel != packet["channel"]) {
            this.msgUnread[packet["channel"]] = this.msgUnread[packet["channel"]] + 1;
        }
        //////////////////////-头顶冒泡信息//////////////////////////-
        var dataStr = packet.data;
        if (packet["MsgType"]) {
            dataStr = Localize_cns("VOICE_MARK");
        }
        //只有世界频道才冒泡
        if (!packet.offlineChat && packet.channel == channelType.WORLD) {
            //let hideChatBubble = RoleSystem.getInstance().getSystemSetting("set_hide_paopao")
            if (packet.roleId == GetHero().getId()) {
                GetHero().doCommand(ActorCommand.AddChatBubble, dataStr, false); //this.getBubbleXml(packet), false)
            }
            else {
                var bShowPlayer = ActorManager.getInstance().getShowPlayerStatus();
                if (bShowPlayer == 1) {
                    var player = ActorManager.getInstance().getPlayer(packet.roleId);
                    if (player) {
                        player.doCommand(ActorCommand.AddChatBubble, dataStr, false); //this.getBubbleXml(packet), false)
                    }
                }
            }
        }
        //////////////////////////////////////////////////////////////
        if (this.isVisible() == false || this.isLoadComplete() == false) {
            return;
        }
        else {
            this.refreshFrame(packet["channel"]);
        }
    };
    //选择气泡
    ChatInChannelFrame.prototype.onSelectChatBubble = function (args) {
        MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"));
        return;
        // let wnd = WngMrg.getInstance().getWindow("ChatBubbleSelectFrame")
        // wnd.showWnd()
    };
    //跨服喇叭
    ChatInChannelFrame.prototype.onLabaClick = function (args) {
        MsgSystem.addTagTips(Localize_cns("HOUXUKAIFANG"));
        return;
        // let wnd = WngMrg.getInstance().getWindow("ChatBubbleSelectFrame")
        // wnd.showWnd()
    };
    //////////////////////////////////-语音相关//////////////////////////////
    ChatInChannelFrame.prototype.onClickChangeInput = function (args) {
        //频道处理，跨服不能发送语音
        if (this.mCurSendChannel == channelType.SERVER) {
            MsgSystem.addTagTips(Localize_cns("CHAT_TXT1"));
            return;
        }
        this.inputType = this.inputType % 2 + 1; //1 文字；2 录音
        this.changeInputByType();
    };
    ChatInChannelFrame.prototype.changeInputByType = function () {
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
    };
    ChatInChannelFrame.prototype.setSelected = function (channelId) {
        this.needToScroll = (this.mCurSendChannel != channelId);
        this.mCurSendChannel = channelId || this.msgMrg.getCurChannel();
        var radioBtn = this.mElemList["channel" + this.mCurSendChannel];
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
    };
    //返回登陆清空聊天内容
    ChatInChannelFrame.prototype.onPrecedureDeactive = function (args) {
        if (this.mElemList == null)
            return;
        // let channelName: any = {
        // 	[channelType.SYSTEM]: "system",
        // 	[channelType.WORLD]: "world",
        // 	[channelType.TEAM]: "team",
        // 	[channelType.FACTION]: "faction",
        // 	[channelType.UNION]: "union",
        // }
        for (var k = 0; k < this.msgMrg.getRegisteredChannelList().length; k++) {
            var v = this.msgMrg.getRegisteredChannelList()[k];
            this.msgUnread[v] = 0;
            //this.msgHeight[v] = 0
            //this.initDeltaHeight[v]=false
            //this.deltaHeight[v]=0
            //this.needToScroll[v]=false
            // this.saveScrollHeight[v] = 0
            // this.saveScrollY[v] = 0
            if (this.mElemList["unread" + v]) {
                this.mElemList["unread" + v].visible = (false);
                this.mElemList["unreadbg" + v].visible = (false);
            }
        }
        this.saveChatHistory = [];
        this.needToResetChannel = true;
        this.saveTotalHeight = 0;
        //this.tabBox.SetSelected(this.mElemList["channel"+channelType.WORLD])
        this.msgMrg.setCurChannel(channelType.WORLD);
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        this.clearQuestion();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////-
    //答题
    ChatInChannelFrame.prototype.onChooseA = function (args) {
        var message = GetMessage(opCodes.C2G_CHANNEL_SEND);
        message.channel = channelType.WORLD;
        message.data = this.answerA || "";
        SendGameMessage(message);
        this.clearQuestion();
    };
    ChatInChannelFrame.prototype.onChooseB = function (args) {
        var message = GetMessage(opCodes.C2G_CHANNEL_SEND);
        message.channel = channelType.WORLD;
        message.data = this.answerB || "";
        SendGameMessage(message);
        this.clearQuestion();
    };
    ChatInChannelFrame.prototype.setQuetionVisible = function (visible) {
        if (this.mElemList == null)
            return;
        var wnd = this.mElemList["group_question"];
        if (wnd) {
            wnd.visible = (visible);
        }
    };
    ChatInChannelFrame.prototype.clearQuestion = function () {
        if (this.questionTimer) {
            KillTimer(this.questionTimer);
            this.questionTimer = null;
        }
        this.nextTime = -1;
        this.setQuetionVisible(false);
        this.questionIndex = -1;
        this.answerA = "";
        this.answerB = "";
    };
    ChatInChannelFrame.prototype.isFriendChat = function (channel) {
        if (channel == null || channel == -1) {
            channel = this.mCurSendChannel;
        }
        return channel == channelType.CHAT;
    };
    ChatInChannelFrame.prototype.checkQuestionShow = function () {
        if (!this.questionTimer) {
            return;
        }
        var curTime = GetServerTime();
        var interval = this.nextTime - curTime;
        if (interval < 1) {
            this.clearQuestion();
            return;
        }
        if (!this.isVisible() || !this.isLoadComplete()) {
            return;
        }
        if (this.mCurSendChannel != channelType.WORLD) {
            this.setQuetionVisible(false);
            return;
        }
        if (this.answerA == "" && this.answerB == "") {
            var questionIndex = this.questionIndex;
            var question = GameConfig.OnLineQuestionConfig[questionIndex] == null && "" || GameConfig.OnLineQuestionConfig[questionIndex].topic;
            AddRdContent(this.mElemList["questionContent"], question, "ht_24_cc_stroke", "white");
            var leftAnswer = GameConfig.OnLineQuestionConfig[questionIndex].answer;
            var rightAnswer = GameConfig.OnLineQuestionConfig[questionIndex].wrong;
            var optionA = this.mElemList["chooseA"];
            var optionB = this.mElemList["chooseB"];
            if (MathUtil.random(2) == 1) {
                optionA.text = ("A. " + leftAnswer);
                optionB.text = ("B. " + rightAnswer);
                this.answerA = leftAnswer;
                this.answerB = rightAnswer;
            }
            else {
                optionA.text = ("A. " + rightAnswer);
                optionB.text = ("B. " + leftAnswer);
                this.answerA = rightAnswer;
                this.answerB = leftAnswer;
            }
        }
        this.mElemList["onlineTime"].text = (String.format(Localize_cns("CHAT_COUNTDOWN"), interval));
        this.setQuetionVisible(true);
    };
    ChatInChannelFrame.prototype.onRecvOnLineQuestion = function (args) {
        var questionIndex = args.questionIndex;
        this.questionIndex = questionIndex;
        if (!GameConfig.OnLineQuestionConfig[questionIndex]) {
            return;
        }
        if (!this.questionTimer) {
            var onOneSecondTimeOut = function (delay) {
                this.checkQuestionShow();
            };
            this.nextTime = GetServerTime() + 60;
            this.questionTimer = SetTimer(onOneSecondTimeOut, this, 1000, false);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////-
    ChatInChannelFrame.prototype._chatWithPlayer = function (playerId, playerName) {
        if (this.mCurSendChannel != channelType.CHAT) {
            this.mCurSendChannel = channelType.CHAT;
            this.setSelected(this.mCurSendChannel);
            this.msgMrg.setCurChannel(this.mCurSendChannel);
            this.refreshFrame();
        }
        this.friendChatWnd.showWithFriendInfo(playerId, playerName);
    };
    ChatInChannelFrame.prototype.chatWithPlayer = function (playerId, playerName) {
        this.showWnd();
        this.doCommand("_chatWithPlayer", playerId, playerName);
    };
    return ChatInChannelFrame;
}(BaseWnd));
__reflect(ChatInChannelFrame.prototype, "ChatInChannelFrame");
//# sourceMappingURL=ChatInChannelFrame.js.map