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
   2014.7.11(周五)

意图：
   表现怒气值变化

公共接口：
   
*/
var Fight_RPPower = (function (_super) {
    __extends(Fight_RPPower, _super);
    function Fight_RPPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_RPPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_RPPower.prototype.onFinish = function () {
        var point = this.powerInfo.point;
        var actor = GetFightActor(this.actorId);
        if (!actor) {
            return;
        }
        if (this.effect == powerEffects.EFFECT_RP_LESS) {
            point = -point;
            //natrue = "-"
        }
        else if (this.effect == powerEffects.EFFECT_RP_VALUE) {
            var _a = actor.getRP(), curPoint = _a[0], _ = _a[1];
            point = curPoint - point;
            // if(point < 0 ){
            // 	natrue = "-"
            // }
        }
        actor.changeCombatInfo("rp", point);
    };
    return Fight_RPPower;
}(Fight_BasePower));
__reflect(Fight_RPPower.prototype, "Fight_RPPower");
//# sourceMappingURL=Fight_RPPower.js.map