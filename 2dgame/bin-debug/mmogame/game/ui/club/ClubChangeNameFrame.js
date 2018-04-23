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
// TypeScript file
var ClubChangeNameFrame = (function (_super) {
    __extends(ClubChangeNameFrame, _super);
    function ClubChangeNameFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubChangeNameFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubChangeNameLayout.exml"];
    };
    ClubChangeNameFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_ok", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickOk, _c),
            (_d = {}, _d["name"] = "btn_cancel", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickCancel, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["cost_rd"].setAlignFlag(gui.Flag.H_CENTER);
        AddRdContent(this.mElemList["cost_rd"], "#YUANBAO#space_10" + opFactionBaseOptions.CHANGE_NAME_MONEY, "ht_24_cc", "lime");
        var _a, _b, _c, _d;
    };
    ClubChangeNameFrame.prototype.onUnLoad = function () {
    };
    ClubChangeNameFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
    };
    ClubChangeNameFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ClubChangeNameFrame.prototype.onClickOk = function () {
        var content = this.mElemList["input_box"].text;
        if (content == null || content == "") {
            MsgSystem.addTagTips("CHAT_ERROR_NEIRONGBUNENGWEIKONG");
            return;
        }
        RpcProxy.call("C2G_FactionName", content);
        this.hideWnd();
    };
    ClubChangeNameFrame.prototype.onClickCancel = function () {
        this.hideWnd();
    };
    return ClubChangeNameFrame;
}(BaseWnd));
__reflect(ClubChangeNameFrame.prototype, "ClubChangeNameFrame");
//# sourceMappingURL=ClubChangeNameFrame.js.map