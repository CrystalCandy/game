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
// TypeScript file
var FightAward = (function (_super) {
    __extends(FightAward, _super);
    function FightAward() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightAward.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorType = actor_Type.ACTOR_TYPE_AWARD;
        RegisterEvent(EventDefine.COMBAT_FIGHTER_DIE_END, this.onFighterDead, this);
    };
    FightAward.prototype.destory = function () {
        UnRegisterEvent(EventDefine.COMBAT_FIGHTER_DIE_END, this.onFighterDead, this);
    };
    FightAward.prototype.onFighterDead = function (args) {
        if (this.ownerId != args.id) {
            return;
        }
        var actor = GetFightActor(this.ownerId);
        this.startBloom(actor);
    };
    return FightAward;
}(AwardBase));
__reflect(FightAward.prototype, "FightAward");
//# sourceMappingURL=FightAward.js.map