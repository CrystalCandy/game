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
    2014.09.02(星期二)

意图：
  

公共接口：

*/
var Fight_AwardPower = (function (_super) {
    __extends(Fight_AwardPower, _super);
    function Fight_AwardPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_AwardPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    //onPlay(){
    //	//不实现就自动finish
    //}
    Fight_AwardPower.prototype.onFinish = function () {
        //if(this.effect != powerEffects.EFFECT_DROP_ITEM ){
        //	return
        //}
        var award = FightSystem.getInstance().createAward(this.actorId);
        award.setVisible(false);
        if (this.effect == powerEffects.EFFECT_DROP_GOLD) {
            award.setAwardData("money", this.actorId, this.powerInfo.value);
            //player.doCommand(ActorCommand.ShowAwardModel, info.name)
        }
        else if (this.effect == powerEffects.EFFECT_DROP_ITEM) {
            award.setAwardData("item", this.actorId, this.powerInfo.itemId, this.powerInfo.quality);
            //player.doCommand(ActorCommand.ShowAwardModel, info.name)
        }
    };
    return Fight_AwardPower;
}(Fight_BasePower));
__reflect(Fight_AwardPower.prototype, "Fight_AwardPower");
//# sourceMappingURL=Fight_AwardPower.js.map