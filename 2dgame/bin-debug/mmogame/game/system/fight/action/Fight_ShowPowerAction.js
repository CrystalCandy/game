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
var Fight_ShowPowerAction = (function (_super) {
    __extends(Fight_ShowPowerAction, _super);
    function Fight_ShowPowerAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ShowPowerAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.soundSwitch = checkNull(this.elemInfo.param1, false);
        this.appointTarget = checkNull(this.elemInfo.param2, null); //"target1"
    };
    Fight_ShowPowerAction.prototype.onPlay = function () {
        if (!this.appointTarget) {
            this.fightResult.showNextPower(this.soundSwitch);
        }
        else {
            var target = this.fightResult.getActionObjectByName(this.appointTarget);
            var actor = target[0];
            if (actor) {
                this.fightResult.showTargetPower(actor, this.soundSwitch);
            }
        }
        this.finish();
    };
    return Fight_ShowPowerAction;
}(Fight_BaseAction));
__reflect(Fight_ShowPowerAction.prototype, "Fight_ShowPowerAction");
//# sourceMappingURL=Fight_ShowPowerAction.js.map