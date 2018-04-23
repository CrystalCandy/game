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
var RoleMountsDanFrame = (function (_super) {
    __extends(RoleMountsDanFrame, _super);
    function RoleMountsDanFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleMountsDanFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleMountsDanLayout.exml"];
    };
    RoleMountsDanFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_use", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUseClick, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    RoleMountsDanFrame.prototype.onUnLoad = function () {
    };
    RoleMountsDanFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = "坐骑丹";
    };
    RoleMountsDanFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    RoleMountsDanFrame.prototype.onUseClick = function () {
    };
    return RoleMountsDanFrame;
}(BaseWnd));
__reflect(RoleMountsDanFrame.prototype, "RoleMountsDanFrame");
//# sourceMappingURL=RoleMountsDanFrame.js.map