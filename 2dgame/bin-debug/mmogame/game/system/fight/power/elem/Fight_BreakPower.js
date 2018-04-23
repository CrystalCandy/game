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
var Fight_BreakPower = (function (_super) {
    __extends(Fight_BreakPower, _super);
    function Fight_BreakPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_BreakPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_BreakPower.prototype.onFinish = function () {
        //打断技能
        var actor = GetFightActor(this.actorId);
        if (actor) {
            var number_info = {};
            number_info.Type = "break";
            number_info.textList = ["break"];
            actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200);
            //actor:breakSkill()
        }
    };
    return Fight_BreakPower;
}(Fight_BasePower));
__reflect(Fight_BreakPower.prototype, "Fight_BreakPower");
//# sourceMappingURL=Fight_BreakPower.js.map