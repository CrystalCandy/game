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
var UpdateNoticeFrame = (function (_super) {
    __extends(UpdateNoticeFrame, _super);
    function UpdateNoticeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateNoticeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/UpdateNoticeLayout.exml"];
        this.updateList = {};
    };
    UpdateNoticeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    UpdateNoticeFrame.prototype.onUnLoad = function () {
    };
    UpdateNoticeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshUpdateContent();
    };
    UpdateNoticeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    UpdateNoticeFrame.prototype.refreshUpdateContent = function () {
        //this.showWnd()
        var rd = this.mElemList["content"];
        //rd.SetHandleMessageFlag(gui.Window.TraceAll)
        var fontInfo = {};
        fontInfo.default_color = "white";
        fontInfo.defalut_font = "ht_24_cc";
        //fontInfo.no_change_font =true
        rd.setRowDistance(6);
        rd.clear();
        if (size_t(this.updateList[0]) < 2) {
            //this.hideWnd()
            return;
        }
        var content = this.updateList[0][1] || "";
        var contentList = splitString(content, "\n");
        for (var _ = 0; _ < contentList.length; _++) {
            var str = contentList[_];
            rd.addXmlString(XmlConverter.parseText(str, fontInfo));
        }
    };
    UpdateNoticeFrame.prototype.setUpdateList = function (content) {
        this.updateList = content;
    };
    return UpdateNoticeFrame;
}(BaseWnd));
__reflect(UpdateNoticeFrame.prototype, "UpdateNoticeFrame");
//# sourceMappingURL=UpdateNoticeFrame.js.map