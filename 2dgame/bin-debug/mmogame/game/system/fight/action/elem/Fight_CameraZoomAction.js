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
var Fight_CameraZoomAction = (function (_super) {
    __extends(Fight_CameraZoomAction, _super);
    function Fight_CameraZoomAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_CameraZoomAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.srcValue = checkNull(this.elemInfo.param1, 1);
        this.dstValue = checkNull(this.elemInfo.param2, 1);
        this.zoomDuringTime = checkNull(this.elemInfo.param3, 1);
        if (this.fightResult) {
            this.moveStayDuring = this.fightResult.getActionDuration(this.zoomDuringTime);
        }
    };
    Fight_CameraZoomAction.prototype.onPlay = function () {
        var sceneMgr = SceneManager.getInstance();
        this.cameraId = sceneMgr.startCameraZoom();
        this.zoomTime = 0;
    };
    Fight_CameraZoomAction.prototype.onTick = function (delay) {
        this.zoomTime = this.zoomTime + delay;
        if (this.zoomTime > this.zoomDuringTime) {
            this.zoomTime = this.zoomDuringTime;
        }
        var s = this.srcValue + this.zoomTime / this.zoomDuringTime * (this.dstValue - this.srcValue);
        SceneManager.getInstance().updateCameraZoom(this.cameraId, s);
    };
    Fight_CameraZoomAction.prototype.onFinish = function () {
        SceneManager.getInstance().stopCameraZoom(this.cameraId);
    };
    return Fight_CameraZoomAction;
}(Fight_BaseAction));
__reflect(Fight_CameraZoomAction.prototype, "Fight_CameraZoomAction");
//# sourceMappingURL=Fight_CameraZoomAction.js.map