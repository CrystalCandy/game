/*
作者:
    yangguiming
    
创建时间：
   2013.7.23(周二)

意图：
   Hero命令

公共接口：
   start(){
   finish(){
   
   
   //子类实现
   onStart(){
   onFinish(){
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
var CommandBase = (function (_super) {
    __extends(CommandBase, _super);
    function CommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandBase.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queue = null;
        this.bFinish = false;
        this.bStart = false;
    };
    CommandBase.prototype.destory = function () {
    };
    CommandBase.prototype.setOwnerQueue = function (queue) {
        this.queue = queue;
    };
    CommandBase.prototype.start = function () {
        if (this.bStart == false) {
            this.bStart = true;
            //TLog.Debug("Command:", this.classname, "start")
            this.onStart();
        }
    };
    CommandBase.prototype.restart = function () {
        //命令已经开始而且还没结束，就重新启动。
        if (!this.bStart || this.bFinish) {
            return;
        }
        this.onFinish();
        this.onStart();
    };
    CommandBase.prototype.finish = function (bNotify) {
        bNotify = bNotify != false;
        //TLog.Debug("Command:", this.classname, "finish")
        if (this.bStart == true && this.bFinish == false && this.queue) {
            this.bFinish = true;
            this.onFinish();
            if (bNotify) {
                this.queue.onCommandFinish(this);
            }
        }
    };
    CommandBase.prototype.isFinish = function () {
        return this.bFinish;
    };
    CommandBase.prototype.onStart = function () {
    };
    CommandBase.prototype.onFinish = function () {
    };
    return CommandBase;
}(TClass));
__reflect(CommandBase.prototype, "CommandBase");
var CommandMoveBase = (function (_super) {
    __extends(CommandMoveBase, _super);
    function CommandMoveBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandMoveBase.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mapId = params[0];
        this.cellx = params[1];
        this.celly = params[2];
        this.scope = params[3];
        this.args = params[4];
    };
    CommandMoveBase.prototype.destory = function () {
        this.finish(false);
    };
    CommandMoveBase.prototype.onStart = function () {
        var hero = GetHero();
        var pointCell = hero.getCellXY();
        var heroCellX = pointCell.x;
        var heroCellY = pointCell.y;
        if (MapSystem.getInstance().getMapId() == this.mapId && MathUtil.checkScope(heroCellX, heroCellY, this.cellx, this.celly, this.scope)) {
            this.finish();
        }
        else {
            //无法走到当前点，直接完成
            var canmove = this.moveStart();
            if (canmove == false) {
                this.finish();
            }
            else {
                RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this); //注册主角移动事件
                //RegisterEvent(EventDefine.HERO_MOVE_STOP, this.onHeroMoveStop, this) //注册主角移动事件
            }
        }
    };
    CommandMoveBase.prototype.onFinish = function () {
        UnRegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this); //注册主角移动事件
    };
    CommandMoveBase.prototype.onHeroMove = function (args) {
        //PROFILE_START("CommandMoveBase.onHeroMove")
        var currentMapId = MapSystem.getInstance().getMapId();
        if (this.mapId == currentMapId) {
            var hero = GetHero();
            var heroPoint = hero.getCellXY();
            if (MathUtil.checkScope(heroPoint.x, heroPoint.y, this.cellx, this.celly, this.scope)) {
                this.finish();
            }
        }
        //PROFILE_STOP("CommandMoveBase.onHeroMove")
    };
    CommandMoveBase.prototype.moveStart = function () {
        return false;
    };
    return CommandMoveBase;
}(CommandBase));
__reflect(CommandMoveBase.prototype, "CommandMoveBase");
var CommandMove = (function (_super) {
    __extends(CommandMove, _super);
    function CommandMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandMove.prototype.moveStart = function () {
        return HeroMoveTo(this.cellx, this.celly);
    };
    return CommandMove;
}(CommandMoveBase));
__reflect(CommandMove.prototype, "CommandMove");
var CommandFindWay = (function (_super) {
    __extends(CommandFindWay, _super);
    function CommandFindWay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandFindWay.prototype.moveStart = function () {
        FireEvent(EventDefine.HERO_AUTOFINDWAY, AutoFindWayEvent.newObj(this.args));
        MapSystem.getInstance().setFindWay(true);
        return FindWayToGo(this.mapId, this.cellx, this.celly);
    };
    CommandFindWay.prototype.onFinish = function () {
        HeroMoveStop(); //主角停止
        MapSystem.getInstance().setFindWay(false);
        FireEvent(EventDefine.HERO_AUTOFINDWAY, AutoFindWayEvent.newObj([AutoActionType.NULL, null, null, null]));
        _super.prototype.onFinish.call(this);
    };
    return CommandFindWay;
}(CommandMoveBase));
__reflect(CommandFindWay.prototype, "CommandFindWay");
var CommandTalkNpc = (function (_super) {
    __extends(CommandTalkNpc, _super);
    function CommandTalkNpc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandTalkNpc.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.npcEntryId = params[0];
        this.npcId = params[1];
    };
    CommandTalkNpc.prototype.destory = function () {
    };
    CommandTalkNpc.prototype.onStart = function () {
        var npcObject = ActorManager.getInstance().getNpcWithEntryId(this.npcEntryId);
        if (this.npcId) {
            npcObject = ActorManager.getInstance().getNpc(this.npcId);
        }
        //如果超过了谈话最大距离，则跑过去
        if (npcObject) {
            var npcPoint = npcObject.getCellXY();
            var heroPoint = GetHero().getCellXY();
            if (MathUtil.checkScope(heroPoint.x, heroPoint.y, npcPoint.x, npcPoint.y, NPCTALK_MAX_SCOPE) == true) {
                Task_ShowNpcDialogWithNpc(npcObject.getId());
            }
        }
        this.finish();
    };
    return CommandTalkNpc;
}(CommandBase));
__reflect(CommandTalkNpc.prototype, "CommandTalkNpc");
var CommandAutoRun = (function (_super) {
    __extends(CommandAutoRun, _super);
    function CommandAutoRun() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandAutoRun.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightDuring = 0;
    };
    CommandAutoRun.prototype.destory = function () {
    };
    CommandAutoRun.prototype.genEndPoint = function () {
        var hero = GetHero();
        var heroPos = hero.getCellXY();
        var currentMapId = MapSystem.getInstance().getMapId();
        var mapSize = MapSystem.getInstance().getMapSize(currentMapId);
        var mapSizeCell = SceneManager.getInstance().mapXYtoCellXY(mapSize.w, mapSize.h);
        var heroCellX = heroPos.x;
        var heroCellY = heroPos.y;
        var mapCellW = mapSizeCell.x;
        var mapCellH = mapSizeCell.y;
        var AUTORUN_SCOPE = 30;
        var randomX = (MathUtil.random() - 0.5) * AUTORUN_SCOPE;
        var randomY = (MathUtil.random() - 0.5) * AUTORUN_SCOPE;
        var endPoint = {};
        endPoint.x = heroCellX + randomX;
        endPoint.y = heroCellY + randomY;
        if (endPoint.x < 0 || endPoint.y < 0 || endPoint.x > mapCellW || endPoint.y > mapCellH) {
            endPoint.x = mapCellW / 2 + randomX;
            endPoint.y = mapCellH / 2 + randomY;
        }
        endPoint.x = Math.floor(endPoint.x);
        endPoint.y = Math.floor(endPoint.y);
        // let dirR1 = MathUtil.random(100000) % 3 - 1
        // let dirR2 = MathUtil.random(100000) % 3 - 1
        // if (dirR1 == 0 && dirR2 == 0) {
        // 	dirR2 = 1
        // }
        // let startPoint: any = { x: heroCellX, y: heroCellY }
        // let endPoint: any = { x: (heroCellX + mapCellW * dirR1 / 2) % mapCellW, y: (heroCellY + mapCellH * dirR2 / 2) % mapCellH }
        // let w = mapCellW / 2 - heroCellX, h = mapCellH / 2 - heroCellY
        // let kx = w / (Math.abs(w) + Math.abs(h)), ky = h / (Math.abs(w) + Math.abs(h))
        // let AUTORUN_SCOPE = 10
        // let maxStep = 0
        // while (SceneManager.getInstance().isBlock(endPoint.x, endPoint.y)) {
        // 	endPoint.x = endPoint.x + AUTORUN_SCOPE * kx
        // 	endPoint.y = endPoint.y + AUTORUN_SCOPE * ky
        // 	if (endPoint.x <= 0 || endPoint.x >= mapCellW || endPoint.y <= 0 || endPoint.y >= mapCellH) {
        // 		endPoint.x = mapCellW / 2 + (kx < 0 && -1 || 1) * mapCellW / 2
        // 		endPoint.y = mapCellH / 2 + (ky < 0 && -1 || 1) * mapCellH / 2
        // 		kx = 1 * (kx < 0 && 1 || -1)
        // 		ky = 1 * (ky < 0 && 1 || -1)
        // 	}
        // 	maxStep++;
        // 	if(maxStep > 30)
        // 		break;
        // }
        //this.startPoint = startPoint
        this.endPoint = endPoint;
    };
    CommandAutoRun.prototype.onStart = function () {
        MapSystem.getInstance().setAutoRun(true);
        this.fightDuring = 0;
        //RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this)
        //RegisterEvent(EventDefine.HERO_STOP, this.onHeroStop, this)
        RegisterEvent(EventDefine.MAP_CLICK, this.onClickMap, this);
        this.genEndPoint();
        this.startToRun();
        FireEvent(EventDefine.HERO_AUTOFINDWAY, AutoFindWayEvent.newObj([AutoActionType.AUTORAN, null, null, null]));
        if (!this.timer) {
            this.timer = SetTimer(this.tick, this, 500, false);
        }
    };
    CommandAutoRun.prototype.onFinish = function () {
        //UnRegisterEvent(EventDefine.HERO_STOP, this.onHeroStop, this)
        UnRegisterEvent(EventDefine.MAP_CLICK, this.onClickMap, this);
        var tick = function () {
            if (CommandManager.getInstance().isCommandQueueEmpty() == true) {
                HeroMoveStop();
            }
            MapSystem.getInstance().setAutoRun(false);
            FireEvent(EventDefine.HERO_AUTOFINDWAY, AutoFindWayEvent.newObj([AutoActionType.NULL, null, null, null]));
        };
        DelayEvecuteFunc(0, tick, this);
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    CommandAutoRun.prototype.tick = function (delay) {
        if (FightSystem.getInstance().isFight() == true)
            return;
        this.fightDuring = this.fightDuring + delay;
        if (this.fightDuring > 6500) {
            RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.AutoFightMonster, 0);
            this.fightDuring = 0;
        }
        var hero = GetHero();
        if (hero.isState(characterState.actionState_idle)) {
            this.genEndPoint();
            this.startToRun();
        }
    };
    CommandAutoRun.prototype.onClickMap = function () {
        this.finish();
    };
    CommandAutoRun.prototype.startToRun = function () {
        HeroMoveTo(this.endPoint.x, this.endPoint.y);
    };
    return CommandAutoRun;
}(CommandBase));
__reflect(CommandAutoRun.prototype, "CommandAutoRun");
var CommandJumpMap = (function (_super) {
    __extends(CommandJumpMap, _super);
    function CommandJumpMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandJumpMap.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.targetMapId = JsUtil.toNumber(params[0]);
        this.targetX = JsUtil.toNumber(params[1]);
        this.targetY = JsUtil.toNumber(params[2]);
        this.opCodes = params[3];
    };
    CommandJumpMap.prototype.onStart = function () {
        if (MapSystem.getInstance().getMapId() != this.targetMapId) {
            var message = GetMessage(this.opCodes);
            message.mapId = this.targetMapId;
            message.cellX = this.targetX;
            message.cellY = this.targetY;
            SendGameMessage(message);
            RegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
            return;
        }
        this.finish();
    };
    CommandJumpMap.prototype.onFinish = function () {
        UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
    };
    CommandJumpMap.prototype.onHeroEnterMap = function (args) {
        var hero = GetHero();
        var heroPoint = hero.getCellXY();
        if (MapSystem.getInstance().getMapId() == this.targetMapId && MathUtil.checkScope(heroPoint.x, heroPoint.y, this.targetX, this.targetY, 5)) {
            this.finish();
        }
    };
    return CommandJumpMap;
}(CommandBase));
__reflect(CommandJumpMap.prototype, "CommandJumpMap");
var CommandDelayTime = (function (_super) {
    __extends(CommandDelayTime, _super);
    function CommandDelayTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandDelayTime.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.delayTime = args[0];
        this.timerId = null;
    };
    CommandDelayTime.prototype.onStart = function () {
        function callback(dt) {
            this.finish();
        }
        this.timerId = SetTimer(callback, this, this.delayTime);
    };
    CommandDelayTime.prototype.onFinish = function () {
        if (this.timerId) {
            KillTimer(this.timerId);
            this.timerId = null;
        }
    };
    return CommandDelayTime;
}(CommandBase));
__reflect(CommandDelayTime.prototype, "CommandDelayTime");
var CommandCallBack = (function (_super) {
    __extends(CommandCallBack, _super);
    function CommandCallBack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandCallBack.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.callBack = args[0];
        this.obj = args[1];
        this.param = args[2];
    };
    CommandCallBack.prototype.onStart = function () {
        if (this.callBack) {
            this.callBack.call(this.obj, this.param);
        }
        this.finish();
    };
    CommandCallBack.prototype.onFinish = function () {
    };
    return CommandCallBack;
}(CommandBase));
__reflect(CommandCallBack.prototype, "CommandCallBack");
//# sourceMappingURL=Command.js.map