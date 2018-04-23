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
   2017.02.10(周五)

意图：
   大招冻结时间
公共接口：
   
*/
var Fight_SkillCDPower = (function (_super) {
    __extends(Fight_SkillCDPower, _super);
    function Fight_SkillCDPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_SkillCDPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_SkillCDPower.prototype.onFinish = function () {
        //if(! this.powerInfo.ahead ){
        //	return FireEvent(EventDefine.COMBAT_FIGHT_SPIRIT_CD, FunnalCDEvent.newObj(this.powerInfo.side, this.powerInfo.time))
        //}
    };
    return Fight_SkillCDPower;
}(Fight_BasePower));
__reflect(Fight_SkillCDPower.prototype, "Fight_SkillCDPower");
//# sourceMappingURL=Fight_SkillCDPower.js.map