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
   2015.11.19(周四)

意图：
   
公共接口：
   
*/
var Fight_ReboundPower = (function (_super) {
    __extends(Fight_ReboundPower, _super);
    function Fight_ReboundPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ReboundPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_ReboundPower.prototype.onFinish = function () {
        if (this.powerInfo.ahead) {
            return;
        }
        if (this.powerInfo.target == 0) {
            return;
        }
        else {
            var buffList = BuffSystem.getInstance().getActorBuffList(this.powerInfo.target) || {};
            if (buffList[this.powerInfo.buff] && buffList[this.powerInfo.buff][0]) {
                var buff = buffList[this.powerInfo.buff][0];
                var _a = buff.checkBuffEffect("rebound"), flag = _a[0], _ = _a[1];
                if (flag == true) {
                    var effectList_1 = buff.getEffectList();
                    for (var _1 in effectList_1) {
                        var effect = effectList_1[_1];
                        effect.changeActionWithIndex(0, effect.getAnimSpeed(), true);
                        effect.setVisible(true);
                        var handleAnimNotify = function (eff, notify) {
                            if (notify == "end") {
                                eff.setVisible(false);
                            }
                        };
                        var listener = { this_index: this, function_index: handleAnimNotify };
                        effect.addAnimListener(listener);
                    }
                }
            }
        }
    };
    return Fight_ReboundPower;
}(Fight_BasePower));
__reflect(Fight_ReboundPower.prototype, "Fight_ReboundPower");
//# sourceMappingURL=Fight_ReboundPower.js.map