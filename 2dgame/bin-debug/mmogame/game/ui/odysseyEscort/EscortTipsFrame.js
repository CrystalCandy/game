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
var EscortTipsFrame = (function (_super) {
    __extends(EscortTipsFrame, _super);
    function EscortTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscortTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/EscortTipsLayout.exml"];
    };
    EscortTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 517;
        this.mLayoutNode.height = 332;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_sure", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onSureClick, _a),
            (_b = {}, _b["name"] = "btn_cancel", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_ps"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_tips"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
        //this.firstStr = null
        //this.secondStr = null
    };
    EscortTipsFrame.prototype.onUnLoad = function () {
    };
    EscortTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        if (this.firstStr == null) {
            return;
        }
        //rd_tips
        AddRdContent(this.mElemList["rd_tips"], this.firstStr, "ht_20_cc", "black");
        //rd_ps
        if (this.secondStr == null) {
            return;
        }
        AddRdContent(this.mElemList["rd_ps"], this.secondStr, "ht_20_cc");
    };
    EscortTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    /////////////响应
    EscortTipsFrame.prototype.onSureClick = function () {
        if (this.firstStr == Localize_cns("ESCORT_TIPS_TXT6")) {
            var unit = 2;
            if (GetHeroMoney(3) < 300 && GetHeroMoney(2) < 300) {
                MsgSystem.addTagTips(Localize_cns("COPY_TXT16"));
                return;
            }
            RpcProxy.call("C2G_QuickOverEscort");
            RpcProxy.call("C2G_GetEscortPrizeInfo");
            this.hideWnd();
        }
        else if (this.firstStr == Localize_cns("ESCORT_TIPS_TXT3")) {
            RpcProxy.call("C2G_BeginEscort");
            this.hideWnd();
            var wnd1 = WngMrg.getInstance().getWindow("OdysseyEscortFrame");
            wnd1.hideWnd();
            var wnd = WngMrg.getInstance().getWindow("EscortFrame");
            wnd.showWnd();
        }
        else if (this.firstStr == Localize_cns("ESCORT_TIPS_TXT5")) {
            RpcProxy.call("C2G_RandEscortIndex", 1);
            this.hideWnd();
        }
    };
    EscortTipsFrame.prototype.onShowWnd = function (str1, str2) {
        this.firstStr = str1;
        this.secondStr = str2 || null;
        this.showWnd();
    };
    return EscortTipsFrame;
}(BaseWnd));
__reflect(EscortTipsFrame.prototype, "EscortTipsFrame");
//# sourceMappingURL=EscortTipsFrame.js.map