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
var LiveBaseState = (function (_super) {
    __extends(LiveBaseState, _super);
    function LiveBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    LiveBaseState.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mStateType = params[0];
        this.time = 0; // 按住鼠标间隔
        this.max_time = 200; // 按住鼠标间隔多少秒自动移动一次
        this.begin = 0; // 按住鼠标开始移动计算时间
        this.begin_max = 500; // 按住鼠标,begin到多少毫秒才开始自动移动
        this.curTouchPoint = newPos(-1, -1);
        this.lastTouchPoint = newPos(-1, -1);
    };
    //子类复写 析构函数
    LiveBaseState.prototype.destory = function () {
    };
    LiveBaseState.prototype.Activate = function () {
        _super.prototype.Activate.call(this);
        //SceneManager.getInstance().setScenePersScale(SCENE_PERS_SCALE_LIVE)//精灵缩放比例
        //IGlobal.resGroupManager.loadGroup(ResourceGroupDefine.Group_LiveCommon)
    };
    LiveBaseState.prototype.Deactive = function () {
        _super.prototype.Deactive.call(this);
        this.endAuto();
    };
    LiveBaseState.prototype.EnableSubState = function (statetype) {
        return (statetype >= state_type.LIVE_BASE_STATE && statetype <= state_type.LIVE_BASE_STATE_END);
    };
    LiveBaseState.prototype.getLogicHitActor = function (x, y) {
        var actorList = SceneManager.getInstance().findHitActorListWithSceenXY(x, y);
        var hitActor = null;
        var hitNpcActor = null;
        //var hitActorList = {}
        function sortFunc(a, b) {
            if (a.getActorType() == b.getActorType()) {
                if (a.getActorType() != actor_Type.ACTOR_TYPE_NPC) {
                    var pa = a.getMapXY();
                    var pb = b.getMapXY();
                    return pb.y - pa.y;
                }
                else {
                    var configA = GameConfig.npcConfig[a.getEntryId()] || { touch: 0 };
                    var configB = GameConfig.npcConfig[b.getEntryId()] || { touch: 0 };
                    if (configA.touch == configB.touch) {
                        pa = a.getMapXY();
                        pb = b.getMapXY();
                        return pb.y - pa.y;
                    }
                    else {
                        return configB.touch - configA.touch;
                    }
                }
            }
            else {
                //npc的属性值比player的属性值要小
                return a.getActorType() - b.getActorType();
            }
        }
        actorList.sort(sortFunc);
        return actorList[0];
    };
    LiveBaseState.prototype.onMouseDown = function (args) {
        if (CheckHeroCanGo()) {
            this.curTouchPoint = newPos(args.stageX, args.stageY);
            this.onClickMap(this.curTouchPoint);
            //end
            // 定时器
            if (!this.timer) {
                this.timer = SetTimer(this.beginAuto, this, 10);
            }
        }
        var hitActor = this.getLogicHitActor(args.stageX, args.stageY);
        //点击玩家同时，可以点击地图
        if (hitActor) {
            this.onClickActor(hitActor, args);
        }
        return true;
    };
    LiveBaseState.prototype.onMouseMove = function (args) {
        this.curTouchPoint = newPos(args.stageX, args.stageY);
        return true;
    };
    LiveBaseState.prototype.onMouseUp = function (args) {
        this.endAuto();
        return true;
    };
    LiveBaseState.prototype.onClickActor = function (actor, args) {
        var actorType = actor.getActorType();
        ActorManager.getInstance().setTargetActor(actor);
    };
    LiveBaseState.prototype.onClickMap = function (stagePoint) {
        if (stagePoint.x == this.lastTouchPoint.x && stagePoint.y == this.lastTouchPoint.y)
            return;
        this.lastTouchPoint.x = stagePoint.x;
        this.lastTouchPoint.y = stagePoint.y;
        var sceneMrg = SceneManager.getInstance();
        var point = sceneMrg.screenXYtoMapXY(stagePoint.x, stagePoint.y);
        point = sceneMrg.mapXYtoCellXY(point.x, point.y);
        Command_Move(point.x, point.y);
        //var effect = EffectManager.getInstance():createSceneEffect(effectIndex.ClickMap, cellx, celly, true)
        FireEvent(EventDefine.MAP_CLICK, MapClickEvent.createObj(point.cellx, point.celly));
    };
    LiveBaseState.prototype.beginAuto = function (delay) {
        this.time = this.time + delay;
        this.begin = this.begin + delay;
        if (this.begin < this.begin_max) {
            return;
        }
        if (this.time < this.max_time) {
            return;
        }
        this.time = 0;
        this.onClickMap(this.curTouchPoint);
    };
    LiveBaseState.prototype.endAuto = function () {
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        this.time = 0;
        this.curTouchPoint.x = -1;
        this.curTouchPoint.y = -1;
        this.lastTouchPoint.x = -1;
        this.lastTouchPoint.y = -1;
        this.begin = 0;
    };
    return LiveBaseState;
}(BaseState));
__reflect(LiveBaseState.prototype, "LiveBaseState");
//# sourceMappingURL=LiveBaseState.js.map