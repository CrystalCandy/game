/*
作者:
    yangguiming
    
创建时间：
   2017.03.22(周三)

意图：
   模型播放封装
公共接口：
   
*/
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
var UIActorView = (function (_super) {
    __extends(UIActorView, _super);
    function UIActorView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIActorView.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var width = 1;
        var height = 1;
        this.rootWnd = null;
        this.mElemList = {};
        var rootName = this.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.ActorView, _a["name"] = this.name, _a["title"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = width, _a["h"] = height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, parentWnd);
        this.rootWnd = this.mElemList[this.name];
        this.clearData();
        this.lockEvent = false;
        var _a;
    };
    UIActorView.prototype.destory = function () {
        this.clearView();
    };
    UIActorView.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    UIActorView.prototype.isVisible = function () {
        return this.rootWnd.visible;
    };
    UIActorView.prototype.setXY = function (x, y) {
        UiUtil.setXY(this.rootWnd, x, y);
    };
    UIActorView.prototype.getRootWnd = function () {
        return this.rootWnd;
    };
    UIActorView.prototype.setTouchEnable = function (b) {
        this.rootWnd.touchEnabled = b;
        this.rootWnd.touchChildren = b;
    };
    UIActorView.prototype.clearData = function () {
        this.animTims = -1;
        this.action = null;
        this.curTimes = 0;
    };
    UIActorView.prototype.clearView = function () {
        this.clearData();
        this.refreshActorView(-1);
    };
    UIActorView.prototype.updateByOnceEffect = function (effectId, times) {
        times = checkNull(times, 1);
        return this.updateByEffect(effectId, times);
    };
    UIActorView.prototype.updateByEffect = function (effectId, times) {
        if (effectId == null || effectId < 0) {
            this.clearView();
            return;
        }
        var effectRef = GameConfig.EffectConfig[effectId];
        if (effectRef == null) {
            TLog.Error("UIActorView.updateWithEffect %s", effectId);
            return effectRef;
        }
        var actorView = this.mElemList[this.name];
        if (!this.actor) {
            this.actor = Effect.newObj();
            //this.actor.enterViewer(actorView)
            var listener = { this_index: this, notify_name: "end", function_index: this.onAnimNotify };
            this.actor.addAnimListener(listener);
            this.actor.enterViewer(actorView);
        }
        this.clearData();
        if (times) {
            this.animTims = times;
        }
        if (this.lockEvent == false) {
            this.refreshActorView(effectRef.model);
        }
        else {
            DelayEvecuteFunc(1, this.refreshActorView, this, effectRef.model);
        }
        return this.actor;
    };
    UIActorView.prototype.updateByPlayer = function (modelId, action, dir) {
        if (modelId == null || modelId < 0) {
            this.clearView();
            return;
        }
        var actorView = this.mElemList[this.name];
        if (!this.actor) {
            this.actor = Player.newObj();
            //this.actor.setPositionXY(0, -80) 
            this.actor.setDir(checkNull(dir, ActorDirMap.RightBottom));
            this.actor.enterViewer(actorView);
        }
        this.clearData();
        this.action = action || "idle";
        if (this.lockEvent == false) {
            this.refreshActorView(modelId);
        }
        else {
            DelayEvecuteFunc(1, this.refreshActorView, this, modelId);
        }
        return this.actor;
    };
    UIActorView.prototype.updateByPlayerAppearInfo = function (appearInfo, action, dir) {
        if (action == null)
            action = "idle";
        //let actorView:UIActorView = this.mElemList["actorview"]
        var model = GetProfessionModel(appearInfo.vocation, checkNull(appearInfo.sexId, genderOptions.MALE), appearInfo.rideShapeId);
        //时装模型ID(可能坐骑模型也变了)
        if (appearInfo.heroShapeId != null && appearInfo.heroShapeId != 0) {
            var shapeModel = GetShapeModelId(appearInfo.heroShapeId, checkNull(appearInfo.sexId, genderOptions.MALE));
            if (shapeModel > 0) {
                model = shapeModel;
            }
        }
        var player = this.updateByPlayer(model, action, dir);
        //坐骑
        player.setRide(GetShapeEffectId(appearInfo.rideShapeId), GetShapeRideOffY(appearInfo.rideShapeId));
        //神兵
        player.setWeaponId(GetShapeEffectId(appearInfo.weaponShapeId));
        //翅膀
        player.setWing(GetShapeEffectId(appearInfo.wingShapeId));
    };
    UIActorView.prototype.updateByPlayerSomeInfo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var playerInfo = args[0];
        var modelList = args[1];
        var model = GetProfessionModel(playerInfo.vocation, checkNull(playerInfo.sexId, genderOptions.MALE), playerInfo.rideShapeId);
        var player = this.updateByPlayer(model, "idle", 3);
        for (var k in modelList) {
            var modelType = modelList[k];
            if (k == "rideShapeId") {
                player.setRide(GetShapeEffectId(modelType), GetShapeRideOffY(modelType));
            }
            else if (k == "weaponShapeId") {
                player.setWeaponId(GetShapeEffectId(modelType));
            }
            else if (k == "wingShapeId") {
                player.setWing(GetShapeEffectId(modelType));
            }
            else if (k == "heroShapeId") {
                if (modelType != null && modelType != 0) {
                    var shapeModel = GetShapeModelId(modelType, checkNull(playerInfo.sexId, genderOptions.MALE));
                    if (shapeModel > 0) {
                        model = shapeModel;
                    }
                }
                var player_1 = this.updateByPlayer(model, "idle", 3);
            }
        }
    };
    UIActorView.prototype.refreshActorView = function (modelId) {
        if (this.actor == null) {
            return;
        }
        var actorView = this.mElemList[this.name];
        if (modelId < 0) {
            if (this.actor) {
                this.actor.clearAnimListener();
                this.actor.leaveViewer(actorView);
                this.actor.deleteObj();
            }
            this.actor = null;
            return;
        }
        //TLog.Debug("UIActorView.refreshActorView", modelId, "action:",this.action)
        this.actor.setScale(1); //重置
        this.actor.loadModel(modelId);
        if (!this.action) {
            this.actor.changeAction("", 1.0, true);
        }
        else {
            //modify:有可能模型配置还没加载
            // if(this.action == "idle"){
            //     if(this.actor.hasActionId("idle") == false){
            //         this.action = "combat_idle"
            //     }
            // }
            this.actor.changeAction(this.action, 1.0, true);
        }
        var defaultScale = this.actor.getScale();
        this.actor.setScale(checkNull(this.scale, defaultScale));
    };
    UIActorView.prototype.onAnimNotify = function (notify) {
        if (notify == "end") {
            this.curTimes = this.curTimes + 1;
            this.lockEvent = true;
            if (this.callbackFunc) {
                this.callbackFunc.call(this.callbackObj, this.actor, this.userData, notify);
            }
            this.lockEvent = false;
            if (this.animTims > 0 && this.animTims <= this.curTimes) {
                this.clearView();
                return;
            }
        }
    };
    UIActorView.prototype.setAnimOneCycleCallback = function (callback, obj, userData) {
        this.callbackFunc = callback;
        this.callbackObj = obj;
        this.userData = userData;
    };
    UIActorView.prototype.changeAction = function (action, speed, isLoop) {
        if (!this.actor) {
            return;
        }
        this.actor.changeAction(action || "idle", speed || 1.0, !!isLoop);
        return this.actor;
    };
    UIActorView.prototype.setActorScale = function (scale) {
        if (scale == null) {
            this.scale = 1;
        }
        else {
            this.scale = scale;
        }
    };
    UIActorView.prototype.setActorDir = function (dir) {
        this.actor.setDir(dir);
    };
    return UIActorView;
}(TClass));
__reflect(UIActorView.prototype, "UIActorView");
//# sourceMappingURL=UIActorView.js.map