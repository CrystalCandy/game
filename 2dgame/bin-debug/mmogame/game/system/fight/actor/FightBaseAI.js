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
var FightBaseAI = (function (_super) {
    __extends(FightBaseAI, _super);
    function FightBaseAI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    FightBaseAI.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actor = args[0];
        this.isInMovie = false;
        this.beginMove = false;
        this.curDefaultTarget = null;
        this.curPosition = null;
        this.tickTime = 0;
        this.maxAITime = 200;
        this.childList = [];
        RegisterEvent(EventDefine.STATE_DEACTIVE, this.onStateDeActive, this);
        RegisterEvent(EventDefine.COMBAT_FIGHTER_DEAD, this.onFighterDie, this);
        RegisterEvent(EventDefine.COMBAT_FIGHTER_REMOVE, this.onFighterDie, this);
        this.bWingShow = true;
    };
    //子类复写 析构函数
    FightBaseAI.prototype.destory = function () {
        var _this = this;
        UnRegisterEvent(EventDefine.STATE_DEACTIVE, this.onStateDeActive, this);
        UnRegisterEvent(EventDefine.COMBAT_FIGHTER_DEAD, this.onFighterDie, this);
        UnRegisterEvent(EventDefine.COMBAT_FIGHTER_REMOVE, this.onFighterDie, this);
        var list = this.childList.concat();
        list.forEach(function (actor) {
            _this.removeChildFightActor(actor);
            actor.setParent(null);
        });
        if (this.parentActor) {
            this.parentActor.removeChildFightActor(this.actor);
            this.parentActor = null;
        }
    };
    FightBaseAI.prototype.tick = function (delay) {
        this.advanceHandle();
        this.tickTime = this.tickTime + delay;
        if (this.tickTime < this.maxAITime) {
            return;
        }
        else {
            this.tickTime = 0;
        }
        /*        let isWingShow = (this.actor.isIdleState() || this.actor.isMoveState() || this.actor.isAttackedState())
                if(this.bWingShow != isWingShow){
                    this.bWingShow = isWingShow;
                    this.childList.forEach(child => {
                        child.setVisibleRaw(isWingShow)
                    });
                }
        */
        //idle或者move状态才寻路
        if (!(this.actor.isIdleState() || this.actor.isMoveState())) {
            this.childList.forEach(function (child) {
                child.setVisibleRaw(false);
            });
            return;
        }
        if (this.actor.isBeingAttacked()) {
            this.actor.moveStop();
            return;
        }
        //角色空闲，移到下个位置
        if (!this.curPosition) {
            this.curPosition = GetFightActorDefaultPosXY(this.actor.getSide(), this.actor.getPos());
        }
        if (this.isInMovie) {
            return;
        }
        return this.onTick(delay);
    };
    FightBaseAI.prototype.onTick = function (delay) {
        TLog.Warn("FightBaseAI.onTick !!!!!!!!!!");
    };
    FightBaseAI.prototype.getRemainder = function (number, norm) {
        return (number - 1) % norm + 1;
    };
    FightBaseAI.prototype.transferCell = function (cellx, celly) {
        return SceneManager.getInstance().cellXYtoMapXY(cellx, celly);
    };
    FightBaseAI.prototype.enterMovie = function () {
        this.isInMovie = true;
    };
    FightBaseAI.prototype.onStateDeActive = function (args) {
        if (args.stateType == state_type.COMBAT_STORY_STATE) {
            this.isInMovie = false;
        }
    };
    FightBaseAI.prototype.onFighterDie = function (args) {
        var actor = GetFightActor(args.id);
        if (!actor || this.actor == actor || this.isInMovie == true) {
            return;
        }
        //       if(this.curDefaultTarget && this.curDefaultTarget.getCombatId() == args.id){
        //           this.curDefaultTarget = null
        //       }
        //       
        //       this.actor.fininshControlAction()
        //       this.beginMove = true
    };
    FightBaseAI.prototype.isActorFindPos = function () {
        return this.beginMove;
    };
    FightBaseAI.prototype.advanceHandle = function () {
    };
    FightBaseAI.prototype.setAutoDelete = function () {
    };
    FightBaseAI.prototype.addChildFightActor = function (actor) {
        if (JsUtil.arrayPush(this.childList, actor) == false) {
            return;
        }
        if (!actor.fightAI.onAddChildFightActor) {
            actor.leaveMap();
            if (this.classname == "FightFunnalAI") {
                this.actor.realActor.addChildSprite("wing_point", actor.realActor, -1, true);
            }
            else {
                this.actor.realActor.addChildSprite("center", actor.realActor, -1, true);
            }
        }
        else {
            actor.fightAI.onAddChildFightActor(this.actor);
        }
    };
    FightBaseAI.prototype.removeChildFightActor = function (actor) {
        if (JsUtil.arrayRemoveVal(this.childList, actor) == false)
            return;
        this.actor.realActor.removeChildSprite(actor.realActor);
        actor.enterMap();
        if (!actor.fightAI.onRemoveChildFightActor) {
            actor.fightAI.onRemoveChildFightActor(this.actor);
        }
        else {
        }
    };
    FightBaseAI.prototype.setParent = function (actor) {
        this.parentActor = actor;
    };
    FightBaseAI.prototype.restoreFightAI = function () {
    };
    return FightBaseAI;
}(TClass));
__reflect(FightBaseAI.prototype, "FightBaseAI");
//# sourceMappingURL=FightBaseAI.js.map