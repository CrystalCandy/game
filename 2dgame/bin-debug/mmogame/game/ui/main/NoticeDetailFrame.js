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
var NoticeDetailFrame = (function (_super) {
    __extends(NoticeDetailFrame, _super);
    function NoticeDetailFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoticeDetailFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/NoticeDetailLayout.exml"];
    };
    NoticeDetailFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.setDoModal(true);
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    NoticeDetailFrame.prototype.onUnLoad = function () {
    };
    NoticeDetailFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.GAME_DISCONNECT, this.onGameDisconnect, this);
        this.mLayoutNode.visible = true;
        //如果url是空值，或者不支持webview，则刷新richdisplay
        if (this.url == "" || SdkHelper.getInstance().showWebView(this.url, true) == false) {
            this.refreshUpdateContent();
        }
        else {
            var rd = this.mElemList["content"];
            var w = rd.width;
            var h = rd.height;
            //SdkHelper.getInstance().setWebViewRect(this.mElemList["content"], 0, 0, w, h)
            this.mElemList["title"].text = (this.title);
        }
    };
    NoticeDetailFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.GAME_DISCONNECT, this.onGameDisconnect, this);
        this.mLayoutNode.visible = false;
        this.url = "";
        //SdkHelper.getInstance().hideWebView()
    };
    NoticeDetailFrame.prototype.refreshUpdateContent = function () {
        this.mElemList["title"].text = (this.title);
        var rd = this.mElemList["content"];
        rd.clear();
        var contentList = splitString(this.content, "\n");
        for (var _ = 0; _ < contentList.length; _++) {
            var str = contentList[_];
            AddRdContent(rd, str, "ht_24_cc", "oldlace", 3, null, null, true);
        }
    };
    /////////////////////////////////////////////////////////////////////////
    NoticeDetailFrame.prototype.showWithTitle = function (title, content, url) {
        this.title = title || "";
        this.content = content || "";
        this.url = url || "";
        this.showWnd();
    };
    //防止断开连接后，关闭不了连接
    NoticeDetailFrame.prototype.onGameDisconnect = function (args) {
        this.hideWnd();
    };
    return NoticeDetailFrame;
}(BaseWnd));
__reflect(NoticeDetailFrame.prototype, "NoticeDetailFrame");
//# sourceMappingURL=NoticeDetailFrame.js.map