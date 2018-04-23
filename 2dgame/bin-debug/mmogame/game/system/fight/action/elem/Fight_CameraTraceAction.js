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
var Fight_CameraTraceAction = (function (_super) {
    __extends(Fight_CameraTraceAction, _super);
    function Fight_CameraTraceAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_CameraTraceAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.zoomType = checkNull(this.elemInfo.param1, "caster");
        this.offX = checkNull(this.elemInfo.param2, 0);
        this.offY = checkNull(this.elemInfo.param3, 0);
        //TLog.Debug("this.elemInfo.param4 ", this.elemInfo.param4 )
        this.bTraceActor = checkNull(this.elemInfo.param4, true);
        var pos = null;
        if (this.zoomType != "any") {
            pos = this.getOffsetByCaster(this.offX, this.offY);
        }
        else {
            pos = this.getAbsoluteXYByCaster(this.offX, this.offY);
        }
        this.offX = pos.x;
        this.offY = pos.y;
    };
    Fight_CameraTraceAction.prototype.onPlay = function () {
        if (this.casterActor == null) {
            this.finish();
            return;
        }
        this.traceZoomActorId = null;
        var sceneMgr = SceneManager.getInstance();
        if (this.zoomType == "caster") {
            this.traceZoomActorId = this.casterActor.getCombatId();
        }
        else if (this.zoomType == "targetList") {
            var targetActor = this.fightResult.getActionObjectByName("targetList")[0];
            if (targetActor == null) {
                this.finish();
                return;
            }
            this.traceZoomActorId = targetActor.getCombatId();
        }
        else if (this.zoomType == "any") {
            var cx, cy = sceneMgr.screenXYtoMapXY(this.offX, this.offY);
            sceneMgr.lookAtCenter(cx, cy);
        }
        else {
            this.finish();
            return;
        }
        this.cameraId = sceneMgr.startCameraMove();
        TLog.Debug("this.bTraceActor", this.bTraceActor);
        if (this.bTraceActor == false) {
            var actor = this.fightResult.getActionObject(this.traceZoomActorId);
            if (actor) {
                var pos = actor.getPositionXY();
                SceneManager.getInstance().updateCameraMove(this.cameraId, pos.x + this.offX, pos.y + this.offY);
            }
        }
    };
    Fight_CameraTraceAction.prototype.onTick = function (delay) {
        if (this.traceZoomActorId && this.bTraceActor) {
            var bFinish = true;
            var sceneMgr = SceneManager.getInstance();
            var actor = this.fightResult.getActionObject(this.traceZoomActorId);
            if (actor) {
                var cpoint = actor.getPositionXY();
                sceneMgr.updateCameraMove(this.cameraId, cpoint.x + this.offX, cpoint.y + this.offY);
                bFinish = false;
            }
            if (bFinish) {
                this.finish();
            }
        }
    };
    Fight_CameraTraceAction.prototype.onFinish = function () {
        if (this.traceZoomActorId) {
            SceneManager.getInstance().stopCameraMove(this.cameraId);
            this.traceZoomActorId = null;
        }
    };
    return Fight_CameraTraceAction;
}(Fight_BaseAction));
__reflect(Fight_CameraTraceAction.prototype, "Fight_CameraTraceAction");
//# sourceMappingURL=Fight_CameraTraceAction.js.map