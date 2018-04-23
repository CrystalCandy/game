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
// TypeScript file
var PlayerDetailsSettingFrame = (function (_super) {
    __extends(PlayerDetailsSettingFrame, _super);
    function PlayerDetailsSettingFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerDetailsSettingFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/PlayerDetailsSettingLayout.exml"];
    };
    PlayerDetailsSettingFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_sure", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onSureClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c;
    };
    PlayerDetailsSettingFrame.prototype.onUnLoad = function () {
    };
    PlayerDetailsSettingFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
    };
    PlayerDetailsSettingFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    PlayerDetailsSettingFrame.prototype.onSureClick = function () {
    };
    return PlayerDetailsSettingFrame;
}(BaseWnd));
__reflect(PlayerDetailsSettingFrame.prototype, "PlayerDetailsSettingFrame");
//# sourceMappingURL=PlayerDetailsSettingFrame.js.map