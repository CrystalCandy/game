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
var ChatBubbleSelectFrame = (function (_super) {
    __extends(ChatBubbleSelectFrame, _super);
    function ChatBubbleSelectFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatBubbleSelectFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ChatBubbleSelectLayout.exml"];
    };
    ChatBubbleSelectFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "selectText", _a["title"] = Localize_cns("CHAT_PLEASE_SELECT_BUBBLE"), _a["font"] = "ht_22_cc_stroke", _a["color"] = gui.Color.white, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_close", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var listbox = this.mElemList["scroll"];
        listbox.itemRenderer = itemRender.BubbleSelectItem;
        var _a, _b, _c;
    };
    ChatBubbleSelectFrame.prototype.onUnLoad = function () {
    };
    ChatBubbleSelectFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    ChatBubbleSelectFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    ChatBubbleSelectFrame.prototype.onRefresh = function () {
        // let list:any = {
        // 	[1] : {"hy_duiHuaDi01", "", 0},
        // 	[2] = {"hy_VIPduiHuaDi04", "hy_VIPduiHua04", 1},
        // 	[3] = {"hy_VIPduiHuaDi01", "hy_VIPduiHua01", 3},
        // 	[4] = {"hy_VIPduiHuaDi05", "hy_VIPduiHua05", 5},
        // 	[5] = {"hy_VIPduiHuaDi02", "hy_VIPduiHua02", 8},
        // 	[6] = {"hy_VIPduiHuaDi03", "hy_VIPduiHua03", 12},
        // }
        var list = VipSystem.getInstance().getSortChatBubbleList();
        var bubbleList = [];
        for (var i in list) {
            var t = {};
            //t.index = Number(i)
            t.data = list[i];
            t.self = this;
            JsUtil.arrayInstert(bubbleList, t);
        }
        var listbox = this.mElemList["scroll"];
        UiUtil.updateList(listbox, bubbleList);
    };
    return ChatBubbleSelectFrame;
}(BaseWnd));
__reflect(ChatBubbleSelectFrame.prototype, "ChatBubbleSelectFrame");
var itemRender;
(function (itemRender) {
    var BubbleSelectItem = (function (_super) {
        __extends(BubbleSelectItem, _super);
        function BubbleSelectItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var Info = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "item_bg", _a["x"] = 0, _a["y"] = 0, _a["w"] = 500, _a["h"] = 100, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = _this.onClickUseBubble, _a),
                (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bubble_bg", _b["parent"] = "item_bg", _b["image"] = "", _b["x"] = 0, _b["y"] = 40, _b["w"] = 500, _b["h"] = 60, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "bubble_icon", _c["parent"] = "item_bg", _c["image"] = "", _c["x"] = 20, _c["y"] = 0, _c["w"] = 109, _c["h"] = 54, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "use_tips", _d["parent"] = "bubble_bg", _d["title"] = "", _d["font"] = "ht_24_cc_stroke", _d["color"] = gui.Color.white, _d["x"] = 25, _d["y"] = 0, _d["w"] = 475, _d["h"] = 60, _d["messageFlag"] = true, _d),
                (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "can_not_use", _e["x"] = 0, _e["y"] = 0, _e["w"] = 500, _e["h"] = 100, _e["event_name"] = gui.TouchEvent.TOUCH_SHORT, _e["fun_index"] = _this.onClickUseBubbleBlock, _e),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            return _this;
            var _a, _b, _c, _d, _e;
        }
        BubbleSelectItem.prototype.dataChanged = function () {
            //let index = this.data.index
            var v = this.data.data;
            this.mElemList["use_tips"].visible = (true);
            this.mElemList["can_not_use"].visible = (true);
            var imgName = v.imgName;
            var text = v.desc;
            this.mElemList["bubble_bg"].source = imgName[0];
            this.mElemList["bubble_icon"].source = imgName[1];
            this.mElemList["use_tips"].text = text;
            var quest = v.quest;
            if (size_t(quest) != 0) {
                if (quest[0] && quest[0] == "vip") {
                    if (GetHeroProperty("VIP_level") >= quest[1]) {
                        this.mElemList["use_tips"].visible = (false);
                        this.mElemList["can_not_use"].visible = (false);
                    }
                }
                else if (quest[0] && quest[0] == "item") {
                    var list = ChannelMrg.getInstance().getUnlockBubbleList();
                    for (var _ in list) {
                        var bv = list[_];
                        if (bv == v.index) {
                            this.mElemList["use_tips"].visible = (false);
                            this.mElemList["can_not_use"].visible = (false);
                        }
                    }
                }
            }
            else {
                this.mElemList["use_tips"].visible = (false);
                this.mElemList["can_not_use"].visible = (false);
            }
        };
        BubbleSelectItem.prototype.onClickUseBubble = function (args) {
            //let index = this.data.index
            var v = this.data.data;
            if (tonumber(GetHeroProperty("chatBubbleType") || 0) != v.index) {
                var message = GetMessage(opCodes.C2G_CHANNEL_WINDOW_TYPE);
                message.chatBubbleType = v.index;
                SendGameMessage(message);
            }
            var self = this.data.self;
            if (self) {
                self.hideWnd();
            }
        };
        BubbleSelectItem.prototype.onClickUseBubbleBlock = function (args) {
            MsgSystem.addTagTips(Localize_cns("CHAT_BUBBLE_ERROR"));
        };
        return BubbleSelectItem;
    }(eui.ItemRenderer));
    itemRender.BubbleSelectItem = BubbleSelectItem;
    __reflect(BubbleSelectItem.prototype, "itemRender.BubbleSelectItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=ChatBubbleSelectFrame.js.map