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
/*
作者:
    liuziming

创建时间：
    2014.08.08(星期五)

意图：
      powerEffects.EFFECT_ADD_BUFF
            powerEffects.EFFECT_DEL_BUFF
            powerEffects.EFFECT_UPDATE_BUFF
            类型power

公共接口：

*/
var Fight_BuffPower = (function (_super) {
    __extends(Fight_BuffPower, _super);
    function Fight_BuffPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_BuffPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    //onPlay(){
    //	//不实现就自动finish
    //}
    Fight_BuffPower.prototype.onFinish = function () {
        var buffId = this.powerInfo.buff;
        var name = "";
        var actor = GetFightActor(this.powerInfo.target);
        if (actor) {
            name = actor.getName();
        }
        var Type = "+";
        var buffSystem = BuffSystem.getInstance();
        var actorId = this.powerInfo.target;
        if (this.powerInfo.effect == powerEffects.EFFECT_ADD_BUFF) {
            if (!this.powerInfo.ahead) {
                Type = "+";
                var buff = Buff.newObj(buffId, this.powerInfo.life, this.powerInfo.count, tostring(this.powerInfo));
                buffSystem.addBuff(actorId, buff, true);
            }
            else {
                //buffSystem.showBuffEffect(actorId, buffId, tostring(this.powerInfo))
            }
        }
        else if (this.powerInfo.effect == powerEffects.EFFECT_DEL_BUFF) {
            Type = "-";
            buffSystem.removeBuff(actorId, buffId);
        }
        else if (this.powerInfo.effect == powerEffects.EFFECT_UPDATE_BUFF) {
            Type = "update";
            var buff = Buff.newObj(buffId, this.powerInfo.life, this.powerInfo.count);
            buffSystem.updateBuff(actorId, buff);
        }
        else if (this.powerInfo.effect == powerEffects.EFFECT_IMMUNIZE) {
            if (actor) {
                var number_info = {};
                number_info.Type = "immunize";
                number_info.textList = ["mianyi"];
                actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200);
            }
        }
        if (!GAME_DEBUG) {
            return;
        }
        //MsgSystem.AddTagTips(String.format(Localize_cns("FIGHT_POWER_BUFF_TIPS"), buffId, name, Type))
    };
    return Fight_BuffPower;
}(Fight_BasePower));
__reflect(Fight_BuffPower.prototype, "Fight_BuffPower");
//# sourceMappingURL=Fight_BuffPower.js.map