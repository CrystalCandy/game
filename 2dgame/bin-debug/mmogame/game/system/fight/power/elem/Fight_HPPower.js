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
var Fight_HPPower = (function (_super) {
    __extends(Fight_HPPower, _super);
    function Fight_HPPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_HPPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_HPPower.prototype.onFinish = function () {
        //this:setAutoFinishTime(200)
        var actor = GetFightActor(this.actorId);
        if (actor == null) {
            //this:finish()
            return;
        }
        var point = this.powerInfo.point || 0;
        var flag = this.powerInfo.flag;
        if (point == 0 || flag == powerXPFlag.NOT_SHOW) {
            return;
        }
        var natrue = "+";
        if (this.effect == powerEffects.EFFECT_HP_LESS ||
            this.effect == powerEffects.EFFECT_MAXHP_LESS) {
            point = -point;
            natrue = "-";
        }
        if (this.effect == powerEffects.EFFECT_HP_PLUS ||
            this.effect == powerEffects.EFFECT_HP_LESS) {
            var number_info = {};
            number_info.Type = "hp";
            number_info.nature = natrue;
            number_info.crit_or_not = false;
            number_info.point = point;
            number_info.textList = ["baoji"];
            number_info.flag = flag;
            if (flag != powerXPFlag.NOT_SHOW) {
                actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200);
                this.fightResult.showDoubleHit(this.powerInfo);
            }
            actor.changeCombatInfo("hp", point);
        }
        else if (this.effect == powerEffects.EFFECT_ABSORB) {
            //print("2222222222222222222222222")
            //io.read()
            var number_info = {};
            number_info.Type = "absorb";
            number_info.textList = ["xishou"];
            actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200);
        }
        else {
            actor.changeCombatInfo("maxHp", point);
        }
    };
    return Fight_HPPower;
}(Fight_BasePower));
__reflect(Fight_HPPower.prototype, "Fight_HPPower");
//# sourceMappingURL=Fight_HPPower.js.map