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
var eMapLayerTag;
(function (eMapLayerTag) {
    eMapLayerTag[eMapLayerTag["Sprite_Bottom"] = 1] = "Sprite_Bottom";
    eMapLayerTag[eMapLayerTag["Sprite"] = 2] = "Sprite";
    eMapLayerTag[eMapLayerTag["Sprite_Top"] = 3] = "Sprite_Top";
    //Effect ,
    eMapLayerTag[eMapLayerTag["Count"] = 4] = "Count";
})(eMapLayerTag || (eMapLayerTag = {}));
;
//场景模型缩放比例
var SCENE_PERS_SCALE = 1;
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callbackId = 100;
        return _this;
    }
    //子类复写 初始化函数
    SceneManager.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mTileMap = IGlobal.mapManager.getTileMap();
        this.mCamera = IGlobal.mapManager.getCamera();
        this.mTempPoint = new egret.Point;
        this.ActorList = [];
        this.mCommandList = [];
        //注册精灵的几个层次
        IGlobal.mapManager.addSpriteLayer(eMapLayerTag.Sprite_Bottom, map.SortSpriteLayer.newObj(this.mTileMap));
        IGlobal.mapManager.addSpriteLayer(eMapLayerTag.Sprite, map.SortSpriteLayer.newObj(this.mTileMap));
        IGlobal.mapManager.addSpriteLayer(eMapLayerTag.Sprite_Top, map.SortSpriteLayer.newObj(this.mTileMap));
        IGlobal.mapManager.addEventListener(map.MapEvent.LOAD_MAP_FINISH, this.onMapLoadFinish, this);
        //IGlobal.mapManager.addSpriteLayer(eMapLayerTag.Effect, map.SortSpriteLayer.newObj(this.mTileMap) );
        this.cameraSeed = 200;
        //屏幕震动参数
        this.shakeTimer = null; //定时器
        this.shakeDuring = 0;
        this.shakeTime = 0;
        this.shakeViewCenterX = -1;
        this.shakeViewCenterY = -1;
        this.shakeScopeX = 0;
        this.shakeScopeY = 0;
        this.shakeId = 0;
        this.bShakeState = false;
        this.cameraMoveId = 0;
        this.cameraZoomId = 0;
        this.callbackMap = {};
        this.screenEffectList = [];
        this.persScale = 1;
    };
    //子类复写 析构函数
    SceneManager.prototype.destory = function () {
        this.clearActor();
        this.clearScreenEffect();
    };
    // onMapLoadComplete(){
    // 	this.mbMapLoading = true;
    // 	FireEvent(EventDefine.SceneLoadCompelete, null);
    // 	this.updateCommands();
    // }
    SceneManager.prototype.loadMap = function (mapname, callback, thisObj, userData) {
        TLog.Debug("loadmap", mapname);
        //let id = -1;
        if (callback && thisObj) {
            var id = this.callbackId++;
            if (IGlobal.mapManager.loadMap(mapname, id)) {
                this.callbackMap[id] = [callback, thisObj, userData];
                this.mbMapLoading = true;
            }
            else {
                TLog.Error("loadMap failed", mapname);
            }
        }
        //IGlobal.mapManager.loadMap(mapname, this.onMapLoadComplete, this);
        return this;
    };
    SceneManager.prototype.isMapLoading = function () {
        return this.mbMapLoading;
    };
    SceneManager.prototype.setScenePersScale = function (scale) {
        TLog.Assert(scale > 0);
        this.persScale = scale;
    };
    SceneManager.prototype.enterMap = function (actor, layerTag) {
        if (this.ActorList.indexOf(actor) != -1) {
            TLog.Error("SceneManager.enterMap actor exsit");
            return;
        }
        actor.setPersScale(this.persScale);
        IGlobal.mapManager.enterMap(actor.realActor, layerTag);
        this.ActorList.push(actor);
        actor.onEnterMap();
    };
    SceneManager.prototype.leaveMap = function (actor) {
        var ret = JsUtil.arrayRemoveVal(this.ActorList, actor);
        if (ret == false) {
            TLog.Error("SceneManager.leaveMap actor not exsit");
        }
        else {
            IGlobal.mapManager.leaveMap(actor.realActor);
            actor.setPersScale(1);
            actor.onLeaveMap();
        }
    };
    SceneManager.prototype.changeMapLayer = function (actor, layerTag) {
        IGlobal.mapManager.changeMapLayer(actor.realActor, layerTag);
    };
    SceneManager.prototype.setActorsPause = function (pause, layer) {
        this.ActorList.forEach(function (actor) {
            if (layer == null || layer == actor.getMapLayer()) {
                actor.setAnimPause(pause);
            }
        });
    };
    SceneManager.prototype.setActorsVisible = function (visible, layer) {
        this.ActorList.forEach(function (actor) {
            if (layer == null || layer == actor.getMapLayer()) {
                actor.setVisible(visible);
            }
        });
    };
    // getMapSize(){
    // 	var h = this.mTileMap.getMapHeight();
    // 	var w = this.mTileMap.getMapWidth();
    // 	return {w:w, h:h};
    // }
    //飙血不能挂接到模型节点，会被挡住。需要直接加载camera
    SceneManager.prototype.addNodeToCamera = function (node) {
        this.mCamera.addNodeToCamera(node);
    };
    SceneManager.prototype.removeNodeFromCamera = function (node) {
        this.mCamera.removeNodeFromCamera(node);
    };
    SceneManager.prototype.screenXYtoMapXY = function (x, y) {
        this.mCamera.stageXYToMapXY(x, y, this.mTempPoint);
        return this.mTempPoint.clone();
    };
    SceneManager.prototype.mapXYtoScreenXY = function (x, y) {
        this.mCamera.mapXYToStageXY(x, y, this.mTempPoint);
        return this.mTempPoint.clone();
    };
    SceneManager.prototype.mapXYtoCellXY = function (x, y) {
        var cx = map.LogicBlock.getCellX(x);
        var cy = map.LogicBlock.getCellY(y);
        return this.mTempPoint.setTo(cx, cy).clone();
    };
    SceneManager.prototype.cellXYtoMapXY = function (x, y) {
        var mx = map.LogicBlock.getXFromCell(x);
        var my = map.LogicBlock.getYFromCell(y);
        return this.mTempPoint.setTo(mx, my).clone();
    };
    SceneManager.prototype.cameraLinkActor = function (actor) {
        this.mCamera.linkMapSprite(actor.realActor);
    };
    SceneManager.prototype.cameraUnLinkActor = function () {
        this.mCamera.unlinkMapSprite();
    };
    SceneManager.prototype.setAdjustViewCenter = function (b) {
        this.mCamera.setAdjustViewCenter(b);
    };
    SceneManager.prototype.setZoomScale = function (scale, bResetView) {
        this.mCamera.setZoomScale(scale);
    };
    SceneManager.prototype.getZoomScale = function () {
        return this.mCamera.getZoomScale();
    };
    SceneManager.prototype.lookAtCenter = function (mapx, mapy) {
        this.mCamera.setViewCenter(mapx, mapy);
    };
    SceneManager.prototype.getCameraXY = function () {
        var cx = this.mCamera.getViewCenterX();
        var cy = this.mCamera.getViewCenterY();
        return this.mTempPoint.setTo(cx, cy).clone();
    };
    SceneManager.prototype.getCameraViewBeginXY = function () {
        var cx = this.mCamera.getViewBeginX();
        var cy = this.mCamera.getViewBeginY();
        return this.mTempPoint.setTo(cx, cy).clone();
    };
    SceneManager.prototype.getCameraViewSize = function () {
        return { w: this.mCamera.getViewWidth(), h: this.mCamera.getViewHeight() };
    };
    SceneManager.prototype.addScreenEffect = function (effect) {
        if (table_isExsit(this.screenEffectList, effect) == false) {
            table_insert(this.screenEffectList, effect);
            this.mCamera.addScreenEffect(effect.realActor, effect.getScreenLayer());
            effect.onEnterCamera();
        }
    };
    SceneManager.prototype.removeScreenEffect = function (effect) {
        if (table_remove(this.screenEffectList, effect)) {
            effect.onLeaveCamera();
            this.mCamera.removeScreenEffect(effect.realActor);
        }
    };
    SceneManager.prototype.clearScreenEffect = function () {
        while (this.screenEffectList.length != 0) {
            var effect = this.screenEffectList[1];
            effect.deleteObj(); //内部调用Character.removeEffect
        }
    };
    SceneManager.prototype.clearActor = function () {
        for (var i = 0; i < this.ActorList.length; i++) {
            var actor = this.ActorList[i];
            actor.deleteObj();
        }
        this.ActorList.length = 0;
    };
    SceneManager.prototype.isActorExsit = function (actor) {
        var idx = this.ActorList.indexOf(actor);
        return idx != -1;
    };
    SceneManager.prototype.isActorHitWithSceenXY = function (actor, x, y) {
        var result = this.screenXYtoMapXY(x, y);
        return this.isActorHitWithMapXY(actor, result.x, result.y);
    };
    SceneManager.prototype.isActorHitWithMapXY = function (actor, x, y) {
        return actor.getBoundRect().contains(x, y);
    };
    SceneManager.prototype.doCommand = function (func, thisObj, userData) {
        if (!this.mbMapLoading) {
            func.call(thisObj, userData);
        }
        this.mCommandList.push({ func: func, thisObj: thisObj, userData: userData });
        return this;
    };
    SceneManager.prototype.updateCommands = function () {
        this.mCommandList.forEach(function (info) {
            info.func.call(info.thisObj, info.userData);
        });
        this.mCommandList.length = 0;
    };
    SceneManager.prototype.setPerspective = function (b) {
    };
    SceneManager.prototype.startShakeScreen = function (dir, scope, rate, actor) {
        //以坐标（scope,0）旋转
        //			y
        //			|
        //			|  scope
        //------------->x
        //			|
        //			|
        //有震动重叠时，后面震动的不处理
        if (this.bShakeState == true) {
            return null;
        }
        this.setAdjustViewCenter(false);
        this.shakeDuring = 1000 / rate;
        this.shakeTime = this.shakeDuring;
        if (this.shakeViewCenterX < 0 || this.shakeViewCenterY < 0) {
            //this.lookAtCenter(this.shakeViewCenterX, this.shakeViewCenterY)
            var pos = this.getCameraXY();
            this.shakeViewCenterX = pos.x;
            this.shakeViewCenterY = pos.y;
        }
        //this.shakeViewCenterX, this.shakeViewCenterY= this.getCameraXY()
        this.shakeScopeX = MathUtil.cos(dir) * scope;
        this.shakeScopeY = MathUtil.sin(dir) * scope;
        this.shakeScopeY = -this.shakeScopeY; //地图坐标是向下的
        this.cameraSeed = this.cameraSeed + 1;
        this.shakeId = this.cameraSeed;
        this.bShakeState = true;
        this.shakeActor = actor || null;
        if (this.shakeTimer == null) {
            this.shakeTimer = SetTimer(this.onTickShake, this, 0, true);
        }
        return this.shakeId;
    };
    SceneManager.prototype.stopShakeScreen = function (id) {
        if (this.shakeId != id) {
            return;
        }
        this.lookAtCenter(this.shakeViewCenterX, this.shakeViewCenterY);
        this.shakeId = 0;
        this.shakeViewCenterX = -1;
        this.shakeViewCenterY = -1;
        this.bShakeState = false;
        this.shakeActor = null;
        if (this.shakeTimer) {
            KillTimer(this.shakeTimer);
            this.shakeTimer = null;
        }
        this.resetCameraLook();
    };
    SceneManager.prototype.isShakeState = function () {
        return this.bShakeState;
    };
    SceneManager.prototype.onTickShake = function (delay) {
        if (this.shakeActor) {
            if (this.shakeActor.isPause()) {
                return;
            }
        }
        this.shakeTime = this.shakeTime + delay;
        if (this.shakeTime >= this.shakeDuring) {
            this.shakeTime = 0;
            var centerX = this.shakeViewCenterX + this.shakeScopeX;
            var centerY = this.shakeViewCenterY + this.shakeScopeY;
            this.lookAtCenter(centerX, centerY);
            this.shakeScopeX = -this.shakeScopeX;
            this.shakeScopeY = -this.shakeScopeY;
        }
    };
    SceneManager.prototype.startCameraMove = function () {
        this.cameraSeed = this.cameraSeed + 1;
        this.cameraMoveId = this.cameraSeed;
        this.setAdjustViewCenter(false);
        return this.cameraMoveId;
    };
    SceneManager.prototype.stopCameraMove = function (id) {
        if (id == 0) {
            return;
        }
        if (id == this.cameraMoveId) {
            this.cameraMoveId = 0;
            this.resetCameraLook();
        }
    };
    SceneManager.prototype.updateCameraMove = function (id, x, y) {
        if (id == this.cameraMoveId) {
            this.lookAtCenter(x, y);
            return true;
        }
        return false;
    };
    SceneManager.prototype.startCameraZoom = function () {
        this.cameraSeed = this.cameraSeed + 1;
        this.cameraZoomId = this.cameraSeed;
        return this.cameraZoomId;
    };
    SceneManager.prototype.stopCameraZoom = function (id) {
        if (id == 0) {
            return;
        }
        if (id == this.cameraZoomId) {
            this.cameraZoomId = 0;
            this.resetCameraZoom();
        }
    };
    SceneManager.prototype.updateCameraZoom = function (id, zoomScale) {
        if (id == this.cameraZoomId) {
            this.setZoomScale(zoomScale);
            return true;
        }
        return false;
    };
    SceneManager.prototype.resetCameraLook = function () {
        this.setAdjustViewCenter(true);
        this.mCamera.adjustViewCenter();
        //local realX, realY = this.realMap:GetRealViewCenterX(), this.realMap:GetRealViewCenterY()
        //this.lookAtCenter(realX, realY)
    };
    SceneManager.prototype.resetCameraZoom = function () {
        this.setZoomScale(1);
    };
    SceneManager.prototype.setMaskEnable = function (mask) {
        IGlobal.mapManager.getLogicMask().SetMaskEnable(mask);
    };
    SceneManager.prototype.isBlock = function (x, y) {
        return IGlobal.mapManager.getLogicBlock().IsBlock(this.mTempPoint.setTo(x, y));
    };
    SceneManager.prototype.showBgBlendColor = function (a, r, g, b) {
        this.mCamera.setBgBlendColorEnable(true);
        this.mCamera.setBgBlendColor(a, r, g, b);
    };
    SceneManager.prototype.hideBgBlendColor = function () {
        this.mCamera.setBgBlendColorEnable(false);
    };
    SceneManager.prototype.showFgBlendColor = function (a, r, g, b) {
        this.mCamera.setFgBlendColorEnable(true);
        this.mCamera.setFgBlendColor(a, r, g, b);
    };
    SceneManager.prototype.hideFgBlendColor = function () {
        this.mCamera.setFgBlendColorEnable(false);
    };
    SceneManager.prototype.setBgImage = function (imagePath, x, y) {
        var image = this.mCamera.setBgImage(imagePath);
        image.x = checkNull(x, 0);
        image.y = checkNull(y, 0);
        return image;
    };
    SceneManager.prototype.setFgImage = function (imagePath, x, y) {
        var image = this.mCamera.setFgImage(imagePath);
        image.x = checkNull(x, 0);
        image.y = checkNull(y, 0);
        return image;
    };
    SceneManager.prototype.findHitActorWithSceenXY = function (x, y) {
        var hitActor = null;
        for (var _ = 0; _ < this.ActorList.length; _++) {
            var actor = this.ActorList[_];
            if (actor.isVisible() && actor.isTouchEnable()) {
                if (this.isActorHitWithSceenXY(actor, x, y)) {
                    if (!hitActor) {
                        hitActor = actor;
                    }
                    else {
                        var hitActorPos = hitActor.getMapXY();
                        var actorPos = actor.getMapXY();
                        if (actorPos.y > hitActorPos.y) {
                            hitActor = actor;
                        }
                    }
                }
            }
        }
        return hitActor;
    };
    SceneManager.prototype.findHitActorListWithSceenXY = function (x, y) {
        var actorList = [];
        for (var _ = 0; _ < this.ActorList.length; _++) {
            var actor = this.ActorList[_];
            if (actor.isVisible() && actor.isTouchEnable()) {
                if (this.isActorHitWithSceenXY(actor, x, y)) {
                    table_insert(actorList, actor);
                }
            }
        }
        return actorList;
    };
    SceneManager.prototype.onMapLoadFinish = function (event) {
        this.updateCommands();
        var callbackId = event.userData;
        var callbackInfo = this.callbackMap[callbackId];
        if (callbackInfo) {
            var func = callbackInfo[0];
            var thisObj = callbackInfo[1];
            var userData = callbackInfo[2];
            func.call(thisObj, userData);
            delete this.callbackMap[callbackId];
        }
    };
    return SceneManager;
}(TClass));
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map