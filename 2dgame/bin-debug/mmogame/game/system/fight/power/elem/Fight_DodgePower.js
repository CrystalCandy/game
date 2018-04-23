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
var Fight_DodgePower = (function (_super) {
    __extends(Fight_DodgePower, _super);
    function Fight_DodgePower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_DodgePower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_DodgePower.prototype.onFinish = function () {
        var typeList = (_a = {},
            _a[powerEffects.EFFECT_NOTARGET] = ["nagative", "nagative"],
            _a[powerEffects.EFFECT_DODGE] = ["dodge", "shanbi"],
            _a[powerEffects.EFFECT_MISS] = ["dodge", "shanbi"],
            _a);
        if (typeList[this.powerInfo.effect]) {
            //直接显示闪避文字
            var actor = GetFightActor(this.actorId);
            if (actor) {
                var number_info = {};
                number_info.Type = typeList[this.powerInfo.effect][0];
                number_info.textList = [typeList[this.powerInfo.effect][1]];
                actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200);
            }
        }
        var _a;
    };
    return Fight_DodgePower;
}(Fight_BasePower));
__reflect(Fight_DodgePower.prototype, "Fight_DodgePower");
//# sourceMappingURL=Fight_DodgePower.js.map