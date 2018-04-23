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
var PublicNoticeFrame = (function (_super) {
    __extends(PublicNoticeFrame, _super);
    function PublicNoticeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublicNoticeFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.messageList = [];
        this.curMsgData = null;
        //this.relateWindows = {}								//保存公告出来期间需要调整位置Y值的window（C++对象），及相关action
        this.timerList = {};
    };
    PublicNoticeFrame.prototype.onLoad = function () {
        this.createLayout();
        //RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
    };
    PublicNoticeFrame.prototype.onUnLoad = function () {
        //UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
        // for (let _ in this.relateWindows) {
        //     let action = this.relateWindows[_]
        //     action.deleteObj()
        // }
        // this.relateWindows = {}
    };
    PublicNoticeFrame.prototype.onShow = function () {
        //let isFight = FightSystem.getInstance().isFight()
        //RegisterEvent(EventDefine.PET_ENTER_HOOP,this.onEnterQuickRecruit,this)
        this.showAction.run();
        this.mLayoutNode.visible = (true);
        this.noticeFrame.visible = (true);
    };
    PublicNoticeFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.PET_ENTER_HOOP,this.onEnterQuickRecruit,this)
        this.showAction.stop();
        this.hideAction.stop();
        this.mLayoutNode.visible = (false);
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    PublicNoticeFrame.prototype.createLayout = function () {
        this.mElemList = {};
        var width = 640;
        var height = 38;
        UiUtil.setWH(this.mLayoutNode, width, height);
        var info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "gongGaoBg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_tipsDi", _a["color"] = gui.Color.darksalmon, _a["x"] = 0, _a["y"] = 0, _a["w"] = 640, _a["h"] = 50, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "gongGao", _b["title"] = Localize_cns("GONGGAO"), _b["font"] = "ht_20_lc_stroke", _b["image"] = "", _b["color"] = gui.Color.darksalmon, _b["x"] = 15, _b["y"] = 3, _b["w"] = 100, _b["h"] = 25, _b["event_name"] = null, _b["fun_index"] = null, _b),
        ];
        UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this);
        //this.mElemList["gongGaoBG"]:SetHandleMessageFlag(gui.Window.TraceMouseAll)
        var data = (_c = {}, _c["startX"] = 0, _c["startY"] = -height, _c["endX"] = 0, _c["endY"] = 0, _c["moveType"] = "inertional", _c);
        this.showAction = MoveAction.newObj(this.mLayoutNode, 200, data, null, this);
        data = (_d = {}, _d["startX"] = 0, _d["startY"] = 0, _d["endX"] = 0, _d["endY"] = -height, _d["moveType"] = "inertional", _d);
        this.hideAction = MoveAction.newObj(this.mLayoutNode, 200, data, this.hideWnd, this);
        this.noticeFrame = this.createLayoutNode("noticeFrame");
        UiUtil.setWH(this.noticeFrame, 500, 30);
        UiUtil.setXY(this.noticeFrame, 80, 8);
        this.noticeFrame.mask = new egret.Rectangle(0, 0, this.noticeFrame.width, this.noticeFrame.height); //裁剪区域
        var mElemInfo = [
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = "content", _e["title"] = null, _e["font"] = "ht_20_cc", _e["image"] = "", _e["color"] = gui.Color.springgreen, _e["x"] = 0, _e["y"] = 0, _e["w"] = 2000, _e["h"] = height, _e["event_name"] = null, _e["fun_index"] = null, _e),
        ];
        UiUtil.createElem(mElemInfo, this.noticeFrame, this.mElemList, this);
        this.noticeFrame.setLayer(3 /* Top */);
        this.mLayoutNode.addChild(this.noticeFrame);
        this.noticeFrame.visible = (true);
        //this.noticeFrame.SetClipEnable(true)
        //初始化richdisplayer
        //let rd = this.mElemList["content"]
        //rd.SetDisplayFlag(Core.Flag.V_CENTER + Core.Flag.V_REVERSE)
        //rd.SubscribeEvent(gui.IRichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this)
        this.mLayoutNode.setLayer(3 /* Top */);
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.touchChildren = false;
        var _a, _b, _c, _d, _e;
        //this.mLayoutNode.setAlignFlag(Core.Flag.CENTER_TOP, 28, 56)
        //this.mLayoutNode.SetClipEnable(true)
        //this.mLayoutNode.SetHandleMessageFlag(gui.Window.TraceMouseAll)
    };
    PublicNoticeFrame.prototype.clearMsg = function () {
        this.messageList = [];
        var msgData = this.curMsgData;
        if (msgData && msgData.showAction) {
            msgData.showAction.stop();
            msgData.showAction = null;
            this.hideWnd();
            this.curMsgData = null;
        }
    };
    PublicNoticeFrame.prototype.addNewMsg = function (text, count, priority) {
        //JsUtil.arrayInstert(this.messageList  ,data)
        //let curState = StateManager.getInstance().GetCurrentStateType()
        //if(curState!= state_type.LIVE_BASE_STATE ){
        //	return
        //}
        this.showWnd();
        if (count == null || count <= 0) {
            count = 1;
        }
        var msgData = {};
        msgData.text = text;
        msgData.count = count;
        msgData.priority = priority || 0;
        //当前无公告显示
        if (this.curMsgData == null) {
            this.showNextMsg(msgData);
        }
        else {
            var pri = 1;
            for (var k = 0; k < this.messageList.length; k++) {
                var v = this.messageList[k];
                if (v.priority < msgData.priority) {
                    pri = k + 1;
                }
                else {
                    break;
                }
            }
            JsUtil.arrayInstert(this.messageList, pri, msgData);
        }
    };
    PublicNoticeFrame.prototype.onMoveFinishCallback = function () {
        if (this.curMsgData == null) {
            TLog.Error("PublicNoticeFrame.onMoveFinishCallback");
            return;
        }
        this.curMsgData.count = this.curMsgData.count - 1;
        if (this.curMsgData.count > 0 && size_t(this.messageList) == 0) {
            this.showNextMsg(this.curMsgData);
        }
        else {
            //显示并删除最后一个
            var msgData = JsUtil.arrayRemove(this.messageList);
            this.showNextMsg(msgData);
            if (!msgData) {
                //this.hideWnd()
                this.hideAction.run();
            }
        }
    };
    PublicNoticeFrame.prototype.showNextMsg = function (msgData) {
        //let curState = StateManager.getInstance().GetCurrentStateType()
        //if(curState != state_type.LIVE_BASE_STATE ){
        //	return
        //}
        this.curMsgData = msgData;
        if (this.curMsgData == null) {
            return;
        }
        var text = this.curMsgData.text;
        if (msgData.showAction) {
            msgData.showAction.stop();
            msgData.showAction = null;
        }
        var rd = {};
        rd.no_change_font = false;
        rd.default_color = "cyan";
        rd.defalut_font = "ht_20_lc";
        rd.no_break_line = false;
        var contentY = this.mElemList["content"].y;
        //let contentH = this.mElemList["content"]:GetHeight()
        this.mElemList["content"].width = 100000;
        this.mElemList["content"].clear();
        this.mElemList["content"].addXmlString(this.analyzeHyperLink(text)); //(XmlConverter.parseText(text, rd))
        var msgWidth = this.mElemList["content"].getLogicWidth();
        this.mElemList["content"].width = msgWidth + 4;
        var frameWidth = this.noticeFrame.width;
        var data = (_a = {}, _a["startX"] = frameWidth, _a["startY"] = contentY, _a["endX"] = -(msgWidth + 4), _a["endY"] = contentY, _a["moveType"] = "inertional", _a);
        msgData.showAction = MoveAction.newObj(this.mElemList["content"], 10000, data, this.onMoveFinishCallback, this);
        msgData.showAction.run();
        var _a;
    };
    //解释和设置超链接的表现
    PublicNoticeFrame.prototype.analyzeHyperLink = function (content) {
        //let color = white
        function parseLinkHandler(linkContent) {
            var info = {};
            info.link = null;
            info.name = null;
            info.color = null;
            //窗口名，颜色
            var matchRet = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(.+)/);
            if (matchRet == null)
                return;
            var linkType = matchRet[0], wndName = matchRet[1], content = matchRet[2];
            if (!linkType || !wndName || !content) {
                return null;
            }
            info.name = content;
            info.link = StringUtil.stringReplace(linkContent, " ", "-");
            info.color = "red";
            return info;
        }
        var param = {};
        param.no_change_font = true;
        param.default_color = "cyan";
        param.defalut_font = "ht_20_lc_stroke";
        param.link_parser = parseLinkHandler;
        return XmlConverter.parseText(content, param);
    };
    return PublicNoticeFrame;
}(BaseWnd));
__reflect(PublicNoticeFrame.prototype, "PublicNoticeFrame");
//# sourceMappingURL=PublicNoticeFrame.js.map