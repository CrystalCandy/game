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
var Fight_BasePower = (function (_super) {
    __extends(Fight_BasePower, _super);
    function Fight_BasePower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_BasePower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // body
        this.fightResult = args[0];
        this.powerInfo = args[1];
        this.actionCallBack = args[2] || null;
        this.powerAction = args[3];
        this.playSomeSound = args[4] || false;
        this.effect = this.powerInfo.effect;
        this.actorId = this.powerInfo.target;
    };
    Fight_BasePower.prototype.finish = function () {
        if (_super.prototype.finish.call(this)) {
            if (this.actionCallBack) {
                var func = this.actionCallBack;
                return func(this.powerAction);
            }
        }
    };
    return Fight_BasePower;
}(Fight_BaseElem));
__reflect(Fight_BasePower.prototype, "Fight_BasePower");
//# sourceMappingURL=Fight_BasePower.js.map