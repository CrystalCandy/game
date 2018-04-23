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
var Fight_SpiritCDPower = (function (_super) {
    __extends(Fight_SpiritCDPower, _super);
    function Fight_SpiritCDPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_SpiritCDPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_SpiritCDPower.prototype.onFinish = function () {
        if (this.powerInfo.ahead) {
            return FireEvent(EventDefine.COMBAT_FIGHT_SPIRIT_CD, FunnalCDEvent.createObj(this.powerInfo.side, this.powerInfo.time));
        }
    };
    return Fight_SpiritCDPower;
}(Fight_BasePower));
__reflect(Fight_SpiritCDPower.prototype, "Fight_SpiritCDPower");
//# sourceMappingURL=Fight_SpiritCDPower.js.map