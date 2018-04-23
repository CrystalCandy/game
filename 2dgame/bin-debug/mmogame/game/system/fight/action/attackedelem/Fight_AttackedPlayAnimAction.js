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
var Fight_AttackedPlayAnimAction = (function (_super) {
    __extends(Fight_AttackedPlayAnimAction, _super);
    function Fight_AttackedPlayAnimAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_AttackedPlayAnimAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = this.elemInfo.param1 || "targetList";
        this.targetNameList = splitString(this.targetName, ",");
        // body
        this.action = this.elemInfo.param2 || "attacked";
        this.speed = this.elemInfo.param3 || 1;
        this.bLastFrameDelay = this.elemInfo.param4 || false;
        this.soundSwitch = this.elemInfo.param5 || false;
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_AttackedPlayAnimAction.prototype.onPlay = function () {
        TLog.Assert(this.listenActor == null);
        var loop = true;
        if (this.bLastFrameDelay) {
            loop = false;
        }
        var callback = function (actor, index) {
            if (actor.isKnockFlyState() || actor.isDeadState()) {
                actor.changeAction(this.action, this.speed, loop);
                actor.startAttackedColor();
                //受击音效分性别　1女2男
                var _a = GetFightActorConfig(actor), _ = _a[0], config = _a[1];
                if (config && config.sex != 0) {
                    //let config = configinfo[1]
                    var mus = SystemSound.effect_shouji_nv;
                    if (config.sex == 2) {
                        mus = SystemSound.effect_shouji_nan;
                    }
                    GameSound.getInstance().playEffect(mus);
                }
                else {
                    GameSound.getInstance().playEffect(SystemSound.effect_shouji);
                }
            }
            else if (actor.changeAttackedState(this.action, loop, this.soundSwitch)) {
                actor.setAnimSpeed(this.speed);
                if (this.listenActor == null) {
                    this.listenActor = actor;
                    var listener = { this_index: this, function_index: this.handleAnimNotify };
                    this.listenActor.addAnimListener(listener);
                }
            }
        };
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
        //没人处理
        if (this.listenActor == null) {
            this.finish();
        }
    };
    Fight_AttackedPlayAnimAction.prototype.onFinish = function () {
        var callback = function (actor, index) {
            if (actor.isAttackedState()) {
                actor.changeIdleState();
            }
            if (this.listenActor == actor) {
                this.listenActor.removeAnimListener(this.listener);
            }
            var powerList = this.fightResult.getDamagePowerList(actor.getCombatId());
            return this.fightResult.createPowerList(powerList, null, null, true);
        };
        this.iteratorActorList(callback, this.targetNameList);
        this.listenActor = null;
        this.listener = null;
    };
    return Fight_AttackedPlayAnimAction;
}(Fight_BaseAction));
__reflect(Fight_AttackedPlayAnimAction.prototype, "Fight_AttackedPlayAnimAction");
//# sourceMappingURL=Fight_AttackedPlayAnimAction.js.map