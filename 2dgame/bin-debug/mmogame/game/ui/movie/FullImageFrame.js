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
var FullImageFrame = (function (_super) {
    __extends(FullImageFrame, _super);
    function FullImageFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullImageFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FullImageFrame.prototype.onLoad = function () {
        this.setFullScreen(true);
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Rect, _a["name"] = "bg", _a["color"] = gui.Color.black, _a["alpha"] = 1, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "content", _b["image"] = "", _b["x"] = 0, _b["y"] = 0, _b["horizontalCenter"] = 0, _b["verticalCenter"] = 0, _b),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    FullImageFrame.prototype.onUnLoad = function () {
    };
    FullImageFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    FullImageFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    FullImageFrame.prototype.setImageName = function (imageName) {
        this.imageName = imageName;
    };
    FullImageFrame.prototype.refreshFrame = function () {
        this.mElemList["content"].source = this.imageName;
    };
    return FullImageFrame;
}(BaseWnd));
__reflect(FullImageFrame.prototype, "FullImageFrame");
//# sourceMappingURL=FullImageFrame.js.map