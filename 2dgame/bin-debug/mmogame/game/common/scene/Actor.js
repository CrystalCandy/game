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
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Actor.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.bEnterMap = false;
        this.modelId = -1;
        this.mbTouchEnable = true;
        this.bEnterMap = false;
        this.bAnimPause = false;
        this.bEnterViewer = false;
        //this.realActor = IGlobal.spriteMangaer.createSprite(map.SpriteType.TYPE_BONE_SPRITE);
        this.realActor = IGlobal.spriteMangaer.createSprite(map.SpriteType.TYPE_FRMAE_SPRITE);
        this.realActor.retain();
        this.actorType = actor_Type.ACTOR_TYPE_BASE;
        this.m_anim_listener_list = [];
        this.commandComponentList = [];
        this.controlList = [];
        this.bMoveAutoRotate = false;
        this.bMirror = false;
        this.realActor.addEventListener(map.SpriteAnimEvent.AnimEvent, this.onAnimEvent, this);
        this.realActor.addEventListener(map.SpriteEvent.BoundSizeEvent, this.onAppearChange, this);
    };
    //子类复写 析构函数
    Actor.prototype.destory = function () {
        TLog.Assert(this.realActor != null, "%s has beend deleted", this.classname);
        TLog.Assert(this.bEnterViewer == false);
        if (this.bEnterMap) {
            this.leaveMap(); //离开地图
        }
        this.commandComponentList.forEach(function (v) {
            v.deleteObj();
        });
        this.commandComponentList = null;
        this.flushAnimEvent();
        this.controlList.forEach(function (v) {
            v.deleteObj();
        });
        this.controlList = null;
        if (this.realActor) {
            this.realActor.clearEvent();
            this.realActor.releaseLater();
            this.realActor = null;
        }
    };
    Actor.prototype.flushAnimEvent = function () {
        var _this = this;
        if (this.m_anim_listener_list.length == 0) {
            return;
        }
        var listener_list = this.m_anim_listener_list.concat();
        listener_list.forEach(function (l) {
            l.function_index.call(l.this_index, "end", _this);
        });
    };
    Actor.prototype.getActorType = function () {
        return this.actorType;
    };
    Actor.prototype.getMapLayer = function () {
        return this.layerTag;
    };
    Actor.prototype.setMapLayer = function (layer) {
        this.layerTag = layer;
    };
    Actor.prototype.setAnimNotifyEnable = function (enable) {
        if (enable) {
            this.realActor.addReportFlag(map.AnimReportFlag.ANIM_NOTIFY);
        }
        else {
            this.realActor.removeReportFlag(map.AnimReportFlag.ANIM_NOTIFY);
        }
    };
    Actor.prototype.enterMap = function (layer) {
        if (this.bEnterMap == false) {
            layer = layer || eMapLayerTag.Sprite;
            this.setMapLayer(layer);
            SceneManager.getInstance().enterMap(this, this.layerTag);
        }
    };
    Actor.prototype.leaveMap = function () {
        SceneManager.getInstance().leaveMap(this);
    };
    Actor.prototype.isEnterMap = function () {
        return this.bEnterMap;
    };
    Actor.prototype.changeMapLayer = function (layer) {
        this.setMapLayer(layer);
        SceneManager.getInstance().changeMapLayer(this, this.layerTag);
    };
    Actor.prototype.changeTopMapLayer = function () {
        this.changeMapLayer(eMapLayerTag.Sprite_Top);
    };
    Actor.prototype.changeNormalMapLayer = function () {
        this.changeMapLayer(eMapLayerTag.Sprite);
    };
    Actor.prototype.changeBottomMapLayer = function () {
        this.changeMapLayer(eMapLayerTag.Sprite_Bottom);
    };
    Actor.prototype.loadModel = function (modelId) {
        if (this.modelId == modelId) {
            return;
        }
        if (ActorManager.getInstance().loadModel(this, modelId)) {
            this.modelId = modelId;
        }
    };
    Actor.prototype.setModelId = function (id) {
        this.modelId = id;
    };
    Actor.prototype.getModelId = function () {
        return this.modelId;
    };
    Actor.prototype.loadModelByName = function (name) {
        this.realActor.loadModel(name);
    };
    Actor.prototype.getModelName = function () {
        return this.realActor.getModelName();
    };
    Actor.prototype.setVisible = function (visible) {
        visible = !!visible;
        this.realActor.setVisible(visible);
    };
    Actor.prototype.setVisibleRaw = function (visible) {
        visible = !!visible;
        this.realActor.setVisibleRaw(visible);
    };
    Actor.prototype.isVisible = function () {
        return this.realActor.isVisible();
    };
    Actor.prototype.setPositionXY = function (x, y) {
        TLog.Assert(isNaN(x) == false && isNaN(y) == false);
        this.realActor.setPosition(x, y);
    };
    Actor.prototype.getPositionXY = function () {
        var x = this.realActor.getPositionX();
        var y = this.realActor.getPositionY();
        return { x: x, y: y };
    };
    Actor.prototype.setMapXY = function (x, y) {
        this.setPositionXY(x, y);
    };
    Actor.prototype.getMapXY = function () {
        return this.getPositionXY();
    };
    Actor.prototype.setCellXY = function (x, y) {
        this.realActor.setPositionCellXY(x, y);
    };
    Actor.prototype.getCellX = function () {
        return this.realActor.getPositionCellX();
    };
    Actor.prototype.getCellY = function () {
        return this.realActor.getPositionCellY();
    };
    Actor.prototype.getCellXY = function () {
        var cx = this.realActor.getPositionCellX();
        var cy = this.realActor.getPositionCellY();
        return { x: cx, y: cy };
    };
    Actor.prototype.setPositionOffset = function (x, y) {
        this.realActor.setPositionOffset(x, y);
    };
    // setAngle(angle:number){
    // 	this.
    // }
    // getAngle():number{
    // }
    Actor.prototype.setDir = function (dir) {
        if (dir == null)
            dir = 0;
        this.realActor.setDir(dir);
    };
    Actor.prototype.getDir = function () {
        return this.realActor.getDir();
    };
    Actor.prototype.setAnimPause = function (pause) {
        this.realActor.setPause(pause);
        this.bAnimPause = pause;
    };
    Actor.prototype.isAnimPause = function () {
        return this.bAnimPause;
    };
    Actor.prototype.isPause = function () {
        return false;
    };
    Actor.prototype.changeAction = function (name, speed, loop) {
        if (speed == null) {
            speed = this.realActor.getAnimSpeed();
        }
        if (loop == null) {
            loop = true;
        }
        this.realActor.changeAction(name, loop ? 0 : 1);
        this.realActor.setAnimSpeed(speed);
    };
    Actor.prototype.getActionId = function () {
        return this.realActor.getActionId();
    };
    // getActionName():string{
    // 	return this.realActor.get
    // }
    Actor.prototype.setAnimSpeed = function (speed) {
        this.realActor.setAnimSpeed(speed);
    };
    Actor.prototype.getAnimSpeed = function () {
        return this.realActor.getAnimSpeed();
    };
    Actor.prototype.setAlpha = function (alpha) {
        this.realActor.setAlpha(alpha);
    };
    Actor.prototype.setColor = function (r, g, b) {
        this.realActor.setColor(r, g, b);
    };
    Actor.prototype.getAlphaColor = function () {
        var color = {};
        var _a = [255, 255, 255, 255], a = _a[0], r = _a[1], g = _a[2], b = _a[3];
        color.a = a;
        color.r = r;
        color.g = g;
        color.b = b;
        return color;
    };
    Actor.prototype.setRotate = function (r) {
        this.realActor.setRotate(r);
    };
    Actor.prototype.getRotate = function () {
        return this.realActor.getRotate();
    };
    Actor.prototype.rotateAngle = function (dxAngle) {
        var angle = this.getRotate();
        this.setRotate(angle + dxAngle);
    };
    Actor.prototype.setScale = function (scale) {
        this.realActor.setScale(scale);
    };
    Actor.prototype.getScale = function () {
        return this.realActor.getScale();
    };
    //模型的场景缩放比例
    Actor.prototype.setPersScale = function (scale) {
        this.realActor.setPersScale(scale);
    };
    Actor.prototype.getPersScale = function (scale) {
        return this.realActor.getPersScale();
    };
    Actor.prototype.setAutoPerspectEnable = function (b) {
    };
    Actor.prototype.setFlipXY = function (bFlipX, bFlipY) {
        this.realActor.setFlipXY(bFlipX, bFlipY);
    };
    Actor.prototype.isFlipX = function () {
        return this.realActor.isFlipX();
    };
    Actor.prototype.isFlipY = function () {
        return this.realActor.isFlipY();
    };
    Actor.prototype.setMirror = function (bMirror) {
        this.bMirror = bMirror;
        this.realActor.setMirror(bMirror);
    };
    Actor.prototype.getMirror = function () {
        return this.bMirror;
    };
    Actor.prototype.getContentSize = function () {
        var actorContent = this.realActor.getBoundRect();
        var size = { width: actorContent.width, height: actorContent.height };
        return size;
    };
    Actor.prototype.getBoundRect = function () {
        return this.realActor.getBoundRect();
    };
    Actor.prototype.updateBoundRect = function () {
    };
    //一直更新动画（默认只是可见时才更新动画）
    Actor.prototype.setUpdateAnimAlways = function (b) {
        this.realActor.setUpdateAnimAlways(b);
    };
    //指定action作为包围盒 （一个模型又多套动作，不同动作的包围盒不一样，一般设置idle作为默认包围盒）
    Actor.prototype.setBoundActionId = function (actionId) {
        this.realActor.setBoundActionId(actionId);
    };
    Actor.prototype.isTouchEnable = function () {
        return this.mbTouchEnable;
    };
    Actor.prototype.setTouchEnable = function (enable) {
        this.mbTouchEnable = enable;
    };
    Actor.prototype.changeShader = function (type) {
    };
    Actor.prototype.changePartSkin = function (slotName, replaceSkinPath) {
        this.realActor.changePartSkin(slotName, replaceSkinPath);
    };
    Actor.prototype.changeSkin = function (skinName) {
        this.realActor.changeSkin(skinName);
    };
    Actor.prototype.hasActionId = function (actionId) {
        return this.realActor.hasActionId(actionId);
    };
    Actor.prototype.onEnterMap = function () {
        this.bEnterMap = true;
    };
    Actor.prototype.onLeaveMap = function () {
        this.bEnterMap = false;
    };
    // addAnimListener(func:(notify:string, actor?:Actor)=>void, thisObj:any, notify?:string){
    // 	for(var i = 0; i < this.m_anim_listener_list.length; i++){
    // 		var ll = this.m_anim_listener_list[i];
    // 		if(ll.func == func && ll.thisObj == thisObj){
    // 			TLog.Error("addAnimListener", thisObj);
    // 			return;
    // 		}
    // 	}
    // 	var listener:any = {};
    // 	listener.function_index = func;
    // 	listener.this_index = thisObj;
    // 	listener.notify_name = notify;
    // 	this.m_anim_listener_list.push(listener);
    // }
    // removeAnimListener(func:(notify:string, actor?:Actor)=>void, thisObj:any){
    // 	for(var i = 0; i < this.m_anim_listener_list.length; i++){
    // 		var ll = this.m_anim_listener_list[i];
    // 		if(ll.function_index == func && ll.this_index == thisObj){
    // 			this.m_anim_listener_list.splice(i, 1);
    // 			break;
    // 		}
    // 	}
    // }
    // clearAnimListener(){
    // 	this.m_anim_listener_list.length = 0;
    // }
    Actor.prototype.addAnimListener = function (listener) {
        if (listener.this_index == null || listener.function_index == null) {
            TLog.Throw("listener.this_index == null || listener.function_index == null");
            return;
        }
        if (table_isExsit(this.m_anim_listener_list, listener)) {
            return;
        }
        JsUtil.arrayInstert(this.m_anim_listener_list, listener);
    };
    Actor.prototype.removeAnimListener = function (listener) {
        return table_remove(this.m_anim_listener_list, listener);
    };
    Actor.prototype.clearAnimListener = function () {
        this.m_anim_listener_list = [];
    };
    Actor.prototype.onAnimOneCycle = function (actionId) {
    };
    Actor.prototype.onAnimEvent = function (args) {
        var _this = this;
        if (this.m_anim_listener_list.length > 0) {
            var listener_list = this.m_anim_listener_list.concat();
            var count = 0;
            listener_list.forEach(function (anim_listener) {
                if (anim_listener.notify_name != null) {
                    if (args.notify == anim_listener.notify_name) {
                        anim_listener.function_index.call(anim_listener.this_index, args.notify, _this);
                    }
                }
                else {
                    anim_listener.function_index.call(anim_listener.this_index, args.notify, _this);
                }
                count = count + 1;
            });
        }
        //PROFILE_STOP(this.classname..".onAnimEvent m_anim_listener_list")
        if (args.notify == "end") {
            this.onAnimOneCycle(args.actionId);
        }
    };
    Actor.prototype.addCommandComponent = function (handle) {
        JsUtil.arrayPush(this.commandComponentList, handle);
    };
    Actor.prototype.removeCommandComponent = function (handle) {
        JsUtil.arrayRemoveVal(this.commandComponentList, handle);
    };
    Actor.prototype.doCommand = function (cmdId, param1, param2) {
        this.commandComponentList.forEach(function (v) {
            v.onCommand(cmdId, param1, param2);
        });
    };
    Actor.prototype.onAppearChange = function () {
        this.commandComponentList.forEach(function (v) {
            v.onAppearChange();
        });
    };
    Actor.prototype.addControl = function (control) {
        if (JsUtil.arrayPush(this.controlList, control)) {
            control.begin(this);
        }
    };
    Actor.prototype.removeControl = function (control) {
        JsUtil.arrayRemoveVal(this.controlList, control);
    };
    Actor.prototype.isExsitControl = function (control) {
        return JsUtil.arrayExsit(this.controlList, control);
    };
    Actor.prototype.update = function (delay) {
        var _this = this;
        if (this.bAnimPause) {
            return;
        }
        this.controlList.forEach(function (control) {
            control.update(_this, delay);
        });
    };
    Actor.prototype.createFade = function (interval_time, alive_interval, max_count) {
        //todo:yangguiming
        // self.realActor:SetFadeEnable(true)
        // assert(interval_time > 0 and alive_interval > 0 and max_count > 0)
        // self.realActor:SetFadeEnable(true)
        // self.realActor:SetFadeParam(interval_time,alive_interval,  max_count)
    };
    Actor.prototype.clearFade = function () {
        //self.realActor:SetFadeEnable(false)
    };
    Actor.prototype.setMoveAutoRotate = function (bAutoRotate) {
        this.bMoveAutoRotate = bAutoRotate;
    };
    Actor.prototype.isMoveAutoRotate = function () {
        return this.bMoveAutoRotate;
    };
    Actor.prototype.enterViewer = function (viewer) {
        if (this.bEnterMap) {
            TLog.Error("Actor.enterViewer actor has EnterMap");
            return;
        }
        if (this.bEnterViewer == false) {
            viewer.addActor(this.realActor);
            //this.realActor:release()
            //this.realActor:retain()
            this.bEnterViewer = true;
        }
    };
    Actor.prototype.leaveViewer = function (viewer) {
        if (viewer.removeActor(this.realActor)) {
            //this.realActor:retain()
            //viewer.setActor(null)
            this.bEnterViewer = false;
        }
    };
    return Actor;
}(TClass));
__reflect(Actor.prototype, "Actor");
//# sourceMappingURL=Actor.js.map