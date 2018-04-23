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
var Effect = (function (_super) {
    __extends(Effect, _super);
    function Effect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Effect.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.actorType = actor_Type.ACTOR_TYPE_EFFECT;
        this.setTouchEnable(false);
        this.showTims = 0;
        this.curTimes = 0;
        this.effectId = params[0];
        this.bindCharacter = null;
        this.combatId = 0;
        this.caster = null;
        this.bindBone = "";
        this.loadError = false;
        this.bAutoBindDelete = true;
        this.setAnimNotifyEnable(true);
        this.setUpdateAnimAlways(true);
    };
    Effect.prototype.destory = function () {
        if (this.bindCharacter) {
            this.bindCharacter.doCommand(ActorCommand.RemoveEffect, this, false);
            this.bindCharacter = null;
        }
    };
    Effect.prototype.getEffectId = function () {
        return this.effectId;
    };
    Effect.prototype.setBindCharacter = function (character) {
        this.bindCharacter = character;
    };
    Effect.prototype.setShowTimes = function (times) {
        this.showTims = times;
        this.curTimes = 0;
        // if times ~= 0 then
        // 	this:removeOptimizeFlag(map.IRenderActor.OPTIMIZE_UPDATE_ONSEE)
        // end
    };
    Effect.prototype.setCombatId = function (combatId) {
        this.combatId = combatId;
    };
    Effect.prototype.getCombatId = function () {
        return this.combatId;
    };
    Effect.prototype.onAnimOneCycle = function (action_id) {
        _super.prototype.onAnimOneCycle.call(this, action_id);
        if (this.showTims != 0) {
            this.curTimes = this.curTimes + 1;
            if (this.curTimes >= this.showTims) {
                this.deleteObj();
            }
        }
    };
    Effect.prototype.setCaster = function (caster) {
        this.caster = caster;
    };
    Effect.prototype.getCaster = function () {
        return this.caster;
    };
    Effect.prototype.setAutoBindDelete = function (b) {
        this.bAutoBindDelete = b;
    };
    Effect.prototype.isAutoBindDelete = function () {
        return this.bAutoBindDelete;
    };
    Effect.prototype.setBindBone = function (bone) {
        if (bone == "") {
            bone = "bottom";
        }
        this.bindBone = bone;
    };
    Effect.prototype.getBindBone = function () {
        return this.bindBone;
    };
    Effect.prototype.isLoadError = function () {
        return this.loadError;
    };
    return Effect;
}(Actor));
__reflect(Effect.prototype, "Effect");
//# sourceMappingURL=Effect.js.map