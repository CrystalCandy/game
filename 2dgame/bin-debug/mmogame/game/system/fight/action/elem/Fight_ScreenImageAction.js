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
var Fight_ScreenImageAction = (function (_super) {
    __extends(Fight_ScreenImageAction, _super);
    function Fight_ScreenImageAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ScreenImageAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.shakeType = this.elemInfo.param1 || 0
        this.imageName = this.elemInfo.param1 || "xingkongbeijing";
    };
    Fight_ScreenImageAction.prototype.onPlay = function () {
        // let path = String.format("data/ui/image/combat/%s.jpg", this.imageName)
        // SceneManager.getInstance().setFgImage(path)
    };
    Fight_ScreenImageAction.prototype.onFinish = function () {
        //SceneManager.getInstance().setFgImage("")
    };
    return Fight_ScreenImageAction;
}(Fight_BaseAction));
__reflect(Fight_ScreenImageAction.prototype, "Fight_ScreenImageAction");
//# sourceMappingURL=Fight_ScreenImageAction.js.map