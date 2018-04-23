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
/*
作者:
    yangguiming
    
创建时间：
   2013.9.24(周二)

意图：
   冒泡聊天

公共接口：
   
*/
var ChatBubbleFrame = (function (_super) {
    __extends(ChatBubbleFrame, _super);
    function ChatBubbleFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatBubbleFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerOwner = null;
        this.content = null;
        this.showTime = 6000;
        this.holdTime = 5500;
    };
    ChatBubbleFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    ChatBubbleFrame.prototype.onUnLoad = function () {
        this.closeFrame();
        //this.mRootWindow.ReleaseFrame(this.mLayoutNode)
        //this.mLayoutNode = null
    };
    ChatBubbleFrame.prototype.onShow = function () {
        //if(this.content ){
        //	//RegisterEvent(EventDefine.MAP_VIEWPORTCHANGE, this.onMapViewportChange, this)
        //	//RegisterEvent(EventDefine.PLAYER_MOVE, this.onPlayerMove, this)
        //	
        this.mLayoutNode.visible = true;
        //	this.showMsg(this.content)
        //}
    };
    ChatBubbleFrame.prototype.onHide = function () {
        this.closeFrame();
        //UnRegisterEvent(EventDefine.MAP_VIEWPORTCHANGE, this.onMapViewportChange, this)
        //UnRegisterEvent(EventDefine.PLAYER_MOVE, this.onPlayerMove, this)
        //this.mLayoutNode.visible = (false)
    };
    ChatBubbleFrame.prototype.onReset = function () {
        this.hideWnd();
    };
    ChatBubbleFrame.prototype.createFrame = function () {
        var width = 169, height = 90;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.mLayoutNode.horizontalCenter = 0;
        this.mLayoutNode.bottom = height;
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.touchEnabled = false;
        this.width = width - 15;
        this.mElemList = {};
        var elemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["title"] = "", _a["font"] = "ht_20_cc", _a["image"] = "NPCduiHuaKuang", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "displayer", _b["title"] = "", _b["font"] = "ht_20_cc", _b["image"] = "", _b["color"] = gui.Color.white, _b["x"] = 15, _b["y"] = 10, _b["w"] = this.width, _b["h"] = height - 50, _b["event_name"] = gui.RichDisplayer.RichDisplayerTranslateEvent, _b["fun_index"] = this.OnDialogTranslateWord, _b)
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    ChatBubbleFrame.prototype.showMsg = function (msg) {
        //if(this.mTimeId ){
        //	return
        //}
        var rd = this.mElemList["displayer"];
        this.setFrameAlpha(1);
        if (!this.mTimeId) {
            this.mTimeId = SetTimer(this.onVpTickEvent, this, 0);
        }
        this.tick = 0;
        UiUtil.setWH(rd, this.width, rd.height);
        rd.clear();
        //	rd.SetDisplayRect(0, 0, 220, 200)
        var font = {};
        font.default_color = "black";
        font.defalut_font = "ht_20_cc";
        if (this.isXml) {
            rd.addXmlString(msg);
        }
        else {
            var parseLinkHandler = function (linkContent) {
                return null;
            };
            font.link_parser = parseLinkHandler;
            rd.addXmlString(XmlConverter.parseText(msg, font));
        }
        //rd.AddXmlString(msg)
        var height = rd.getLogicHeight();
        height = height < 60 && 60 || height;
        var width = rd.getLogicWidth();
        if (width == 0) {
            return this.hideWnd();
        }
        UiUtil.setWH(this.mLayoutNode, 169, height + 40);
        UiUtil.setWH(rd, width + 5, height + 10);
        UiUtil.setWH(this.mElemList["bg"], this.mLayoutNode.width, this.mLayoutNode.height);
        //this.mLayoutNode.SetAlignMode(Core.Flag.CENTER_BOTTOM, 0, -200)
        this.mLayoutNode.bottom = 170;
        this.mLayoutNode.horizontalCenter = 0;
        if (FightSystem.getInstance().isFight() == true) {
            var mapPos = this.owner.getMapXY();
            var screenPos = SceneManager.getInstance().mapXYtoScreenXY(mapPos.x, mapPos.y);
            var sw = this.mLayoutNode.width;
            if (screenPos.x + sw / 2 > 640) {
                //this.mLayoutNode.SetAlignMode(Core.Flag.CENTER_BOTTOM, 640 - screenPos.x - sw / 2, -200)
                this.mLayoutNode.horizontalCenter = 640 - screenPos.x - sw / 2;
                //this.mLayoutNode.bottom = 200
            }
        }
    };
    ChatBubbleFrame.prototype.setShowMsg = function (content, obj, isXml, showTime) {
        if (content == "") {
            return this.hideWnd();
        }
        this.content = content;
        this.owner = obj;
        this.isXml = checkNull(isXml, false);
        this.showTime = showTime || 6000;
        this.holdTime = this.showTime * 11 / 12;
        this.showWnd();
        this.showMsg(content);
    };
    ChatBubbleFrame.prototype.onVpTickEvent = function (delayTime) {
        this.tick = this.tick + delayTime;
        if (this.tick >= this.showTime) {
            this.hideWnd();
        }
        else if (this.tick >= this.holdTime) {
            this.setFrameAlpha(1 - (this.tick - this.holdTime) / (this.showTime - this.holdTime));
        }
    };
    ChatBubbleFrame.prototype.setFrameAlpha = function (alpha) {
        //this.mLayoutNode.SetFrameAlphaColor(255 * alpha, 255, 255, 255)
        this.mLayoutNode.alpha = alpha;
    };
    ChatBubbleFrame.prototype.closeFrame = function () {
        if (this.mTimeId) {
            KillTimer(this.mTimeId);
        }
        this.mTimeId = null;
        this.tick = 0;
        this.content = null;
        this.mLayoutNode.visible = (false);
    };
    //onMapViewportChange( args){
    //	if(! this.mLayoutNode ){
    //		return
    //	}
    //	this.setFramePos()
    //}
    ChatBubbleFrame.prototype.OnDialogTranslateWord = function (args) {
        var word = args.getTranslateWord();
        args.setTranslateWord(TaskExecutor.getInstance().executeGetReplaceWord(word, 0));
    };
    return ChatBubbleFrame;
}(BaseWnd));
__reflect(ChatBubbleFrame.prototype, "ChatBubbleFrame");
//# sourceMappingURL=ChatBubbleFrame.js.map