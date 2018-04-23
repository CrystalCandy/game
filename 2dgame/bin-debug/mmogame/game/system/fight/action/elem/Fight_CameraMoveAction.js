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
var Fight_CameraMoveAction = (function (_super) {
    __extends(Fight_CameraMoveAction, _super);
    function Fight_CameraMoveAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_CameraMoveAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fromPosType = checkNull(this.elemInfo.param1, "caster");
        this.fromOffx = checkNull(this.elemInfo.param2, 0);
        this.fromOffy = checkNull(this.elemInfo.param3, 0);
        this.toPosType = checkNull(this.elemInfo.param4, "targetList");
        this.toOffx = checkNull(this.elemInfo.param5, 0);
        this.toOffy = checkNull(this.elemInfo.param6, 0);
        this.moveSpeed = checkNull(this.elemInfo.param7, 0); //每秒移动像素
        this.moveStayDuring = checkNull(this.elemInfo.param8, 0);
        if (this.moveSpeed == 0) {
            this.moveSpeed = 1;
        }
        if (this.fromPosType != "any") {
            var point = this.getOffsetByCaster(this.fromOffx, this.fromOffy);
            this.fromOffx = point.x;
            this.fromOffy = point.y;
        }
        else {
            var point = this.getAbsoluteXYByCaster(this.fromOffx, this.fromOffy);
            this.fromOffx = point.x;
            this.fromOffy = point.y;
        }
        if (this.toPosType != "any") {
            var point = this.getOffsetByCaster(this.toOffx, this.toOffy);
            this.toOffx = point.x;
            this.toOffy = point.y;
        }
        else {
            var point = this.getAbsoluteXYByCaster(this.fromOffx, this.fromOffy);
            this.fromOffx = point.x;
            this.fromOffy = point.y;
        }
        if (this.fightResult) {
            this.moveSpeed = this.fightResult.getActionSpeed(this.moveSpeed);
            this.moveStayDuring = this.fightResult.getActionDuration(this.moveStayDuring);
        }
    };
    Fight_CameraMoveAction.prototype.getMapPosByType = function (posType, offx, offy) {
        var mapPos = {};
        if (posType == "caster") {
            mapPos = this.casterActor.getPositionXY();
            mapPos.x = mapPos.x + offx;
            mapPos.y = mapPos.y + offy;
        }
        else if (posType == "targetList") {
            var targetActor = this.fightResult.getActionObjectByName("targetList")[0];
            if (targetActor == null) {
                targetActor = this.casterActor;
            }
            mapPos = targetActor.getPositionXY();
            mapPos.x = mapPos.x + offx;
            mapPos.y = mapPos.y + offy;
        }
        else if (posType == "any") {
            mapPos = SceneManager.getInstance().screenXYtoMapXY(offx, offy);
        }
        return mapPos;
    };
    Fight_CameraMoveAction.prototype.onPlay = function () {
        if (this.casterActor == null) {
            this.finish();
            return;
        }
        var sceneMgr = SceneManager.getInstance();
        var point = sceneMgr.getCameraXY();
        this.viewCenterX = point.x;
        this.viewCenterY = point.y;
        this.fromPos = this.getMapPosByType(this.fromPosType, this.fromOffx, this.fromOffy);
        this.toPos = this.getMapPosByType(this.toPosType, this.toOffx, this.toOffy);
        this.moveFinish = false;
        this.moveStayTime = 0;
        this.moveTime = 0;
        var vecDir = MathUtil.pSub(this.toPos, this.fromPos);
        var length = MathUtil.pGetLength(vecDir);
        if (length == 0) {
            this.moveFinish = true;
            return;
        }
        //需要移动的时间
        this.moveDuring = (length / this.moveSpeed) * 1000; //-化成毫秒
        this.normalDir = {};
        this.normalDir.x = vecDir.x / length;
        this.normalDir.y = vecDir.y / length;
        this.cameraId = sceneMgr.startCameraMove();
    };
    Fight_CameraMoveAction.prototype.onTick = function (delay) {
        if (this.moveFinish) {
            this.moveStayTime = this.moveStayTime + delay;
            if (this.moveStayTime >= this.moveStayDuring) {
                this.finish();
            }
            return;
        }
        this.moveTime = this.moveTime + delay;
        if (this.moveTime > this.moveDuring) {
            this.moveTime = this.moveDuring;
            this.moveFinish = true;
        }
        var x = this.fromPos.x + (this.normalDir.x * this.moveSpeed) * (this.moveTime / 1000);
        var y = this.fromPos.y + (this.normalDir.y * this.moveSpeed) * (this.moveTime / 1000);
        SceneManager.getInstance().updateCameraMove(this.cameraId, x, y);
    };
    Fight_CameraMoveAction.prototype.onFinish = function () {
        if (this.cameraId) {
            SceneManager.getInstance().stopCameraMove(this.cameraId);
            this.cameraId = null;
        }
    };
    return Fight_CameraMoveAction;
}(Fight_BaseAction));
__reflect(Fight_CameraMoveAction.prototype, "Fight_CameraMoveAction");
//# sourceMappingURL=Fight_CameraMoveAction.js.map