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
var Fight_ActorPlayAnimAction = (function (_super) {
    __extends(Fight_ActorPlayAnimAction, _super);
    function Fight_ActorPlayAnimAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ActorPlayAnimAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // body
        this.action = this.elemInfo.param1 || "attack";
        this.speed = this.elemInfo.param2 || 1;
        this.bLastFrameDelay = this.elemInfo.param3 || false;
        this.pauseFrameEvent = this.elemInfo.param4;
        this.bLastFrameLoop = this.elemInfo.param5 || false;
        this.target = this.elemInfo.param6 || null;
        this.setAutoSendAttack(true);
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_ActorPlayAnimAction.prototype.onPlay = function () {
        //是否已发送了攻击帧，如果没有，则在结束的时候发一次
        this.bResetAnim = false;
        if (!this.casterActor) {
            this.finish();
            return;
        }
        if (this.target) {
            var target = this.fightResult.getActionObjectByName(this.target);
            if (!target[0]) {
                return this.finish();
            }
        }
        //this.bSendAttack = false
        this.listener = null;
        //this.usePauseSkill = false
        var actor = this.casterActor;
        var bFinish = true;
        var combatId = actor.getCombatId();
        this.setAutoFinishActor(combatId);
        if (this.onEnterState(actor) == true) {
            actor.setAnimSpeed(this.speed);
            this.listener = { this_index: this, function_index: this.handleAnimNotify };
            actor.addAnimListener(this.listener);
            bFinish = false;
        }
        else {
            //打断技能了
            this.fightResult.breakSkill();
        }
        if (bFinish) {
            this.finish(); //如果找不到actor
        }
    };
    Fight_ActorPlayAnimAction.prototype.onFinish = function () {
        if (this.casterActor) {
            this.onLeaveState(this.casterActor);
            if (this.listener) {
                this.casterActor.removeAnimListener(this.listener);
                this.listener = null;
            }
            if (this.bResetAnim) {
                this.casterActor.setAnimPause(false);
                this.bResetAnim = false;
            }
        }
    };
    //////////////////////////////////////////////////////////////
    Fight_ActorPlayAnimAction.prototype.onEnterState = function (actor) {
        return false;
    };
    Fight_ActorPlayAnimAction.prototype.onLeaveState = function (actor) {
    };
    Fight_ActorPlayAnimAction.prototype.handleAnimNotify = function (notify, actor) {
        //不是当前动作的
        if (actor.getActionId() != this.action)
            return;
        if (this.bResetAnim == false) {
            if (this.pauseFrameEvent && this.pauseFrameEvent == notify) {
                this.bResetAnim = true;
                this.casterActor.setAnimPause(true);
            }
        }
        _super.prototype.handleAnimNotify.call(this, notify, actor);
    };
    return Fight_ActorPlayAnimAction;
}(Fight_BaseAction));
__reflect(Fight_ActorPlayAnimAction.prototype, "Fight_ActorPlayAnimAction");
//# sourceMappingURL=Fight_ActorPlayAnimAction.js.map