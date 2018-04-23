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
var Fight_MPPower = (function (_super) {
    __extends(Fight_MPPower, _super);
    function Fight_MPPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_MPPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_MPPower.prototype.onFinish = function () {
        //this.setAutoFinishTime(200)
        var point = this.powerInfo.point;
        var natrue = "+";
        if (this.effect == powerEffects.EFFECT_MP_LESS) {
            point = -point;
            natrue = "-";
        }
        else if (this.effect == powerEffects.EFFECT_MP_VALUE) {
            var _a = FightSystem.getInstance().getActorSystem().getRoleMp(), curPoint = _a[0], _ = _a[1];
            point = curPoint - point;
            if (point < 0) {
                natrue = "-";
            }
        }
        FightSystem.getInstance().getActorSystem().changeRoleInfo("mp", this.powerInfo.roleId, point);
    };
    return Fight_MPPower;
}(Fight_BasePower));
__reflect(Fight_MPPower.prototype, "Fight_MPPower");
//# sourceMappingURL=Fight_MPPower.js.map