var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameInput = (function () {
    function GameInput() {
        this.init();
    }
    GameInput.prototype.init = function () {
        IGlobal.mapManager.setInputCallback(this);
        this.mTouchEvent = GameTouchEvent.newObj();
        IGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageMouseDown, this);
        IGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this);
        IGlobal.stage.addEventListener(gui.TouchEvent.TOUCH_SHORT, this.onStageMouseClick, this);
        //如果是手机的，检查前台后台
        if (egret.Capabilities.isMobile) {
            egret.lifecycle.onResume = function () {
                TLog.Debug("app 进入前台");
                PrecedureManager.getInstance().onEvent(EventDefine.SYSTEM_RESUME, null);
                SDKAnalyzer(SdkEventDefine.ACTIVE_APP, "");
                //egret.ticker.resume(); // 关闭渲染与心跳
            };
            egret.lifecycle.onPause = function () {
                PrecedureManager.getInstance().onEvent(EventDefine.SYSTEM_PAUSE, null);
                TLog.Debug("app 进入后台");
                //egret.ticker.pause(); // 关闭渲染与心跳
            };
        }
    };
    GameInput.prototype.onMapMouseDownEvent = function (event) {
        PrecedureManager.getInstance().onEvent(EventDefine.SYSTEM_MOUSE_DOWN, event);
        // var point = egret.$TempPoint;
        // IGlobal.mapManager.getCamera().stageXYToMapXY(event.stageX, event.stageY, point) 
        // TLog.Debug("onMapMouseDownEvent x:%d y:%d, localx:%d, localy:%d", event.stageX, event.stageY, point.x, point.y);
        //FireEvent(EventDefine.MAP_MOUSE_DOWN, MapMouseEvent.createObj(event.stageX, event.stageY));
    };
    GameInput.prototype.onMapMouseUpEvent = function (event) {
        PrecedureManager.getInstance().onEvent(EventDefine.SYSTEM_MOUSE_UP, event);
        //TLog.Debug("onMapMouseUpEvent x:%d y:%d", event.stageX, event.stageY);
    };
    GameInput.prototype.onMapMouseMoveEvent = function (event) {
        PrecedureManager.getInstance().onEvent(EventDefine.SYSTEM_MOUSE_MOVE, event);
        //TLog.Debug("onMapMouseMoveEvent x:%d y:%d", event.stageX, event.stageY);
    };
    GameInput.prototype.onStageMouseDown = function (event) {
        if (GAME_DEBUG) {
            var target = event.target;
            var dumpStr = IGlobal.guiManager.getPathFromChild(target);
            if (dumpStr != "") {
                var p = Object.getPrototypeOf(target);
                TLog.Debug("MouseDown type:%s name:%s", p.__class__, dumpStr);
            }
        }
        // let p = Object.getPrototypeOf(target);
        // TLog.Debug("MouseDown type:%s name:%s", p.__class__, target.name);  
        FireEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.mTouchEvent.init(event));
    };
    GameInput.prototype.onStageMouseUp = function (event) {
        var target = event.target;
        if (target instanceof eui.Button) {
            GameSound.getInstance().playEffect(SystemSound.effect_btnClick);
        }
        FireEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.mTouchEvent.init(event));
    };
    GameInput.prototype.onStageMouseClick = function (event) {
        FireEvent(EventDefine.ROOTWINDOW_MOUSE_CLICK, this.mTouchEvent.init(event));
    };
    return GameInput;
}());
__reflect(GameInput.prototype, "GameInput", ["map.IMapInputCallback"]);
//# sourceMappingURL=GameInput.js.map