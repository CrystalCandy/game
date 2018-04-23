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
   2015.09.15(周二)

意图：
   Funnal		浮游炮（翅膀）
公共接口：
   
*/
var FightFunnalAI = (function (_super) {
    __extends(FightFunnalAI, _super);
    function FightFunnalAI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightFunnalAI.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.beginMove = false; //翅膀不用寻找最新默认点（寻路）
        this.actor.completeBack = true;
        this.showResulting = false;
        this.actor.doCommand(ActorCommand.SetShadowVisible, false, null);
    };
    FightFunnalAI.prototype.destory = function () {
    };
    FightFunnalAI.prototype.onTick = function (delay) {
        this.moveToDefaultSeat();
    };
    FightFunnalAI.prototype.moveToDefaultSeat = function () {
        //当前位置
        //let pos:any = {}
        //pos.x, pos.y = SceneManager.getInstance().mapXYtoCellXY(this.curPosition.x, this.curPosition.y)
        //let from_x, from_y = this.actor.getCellXY()
        //
        ////如果在范围内，就不用动了
        //if(Math_util.checkNormScope(from_x, from_y, pos.x, pos.y, 1) ){
        //	this.actor.completeBack = true
        //	
        //	return false
        //}
        //
        //if(this.actor.wantToGoByCell(pos.x, pos.y, true) == false ){
        //	TLog.Debug("ActorAI move Error:", from_x, from_y, pos.x, pos.y)
        //	//throw()
        //}
        if (this.parentActor && this.showResulting == false) {
            this.actor.setPositionXY(0, 10);
            //寄主阵亡后自动隐藏翅膀（守护）
            if (this.parentActor.isDeadState()) {
                this.actor.changeDieState();
            }
        }
    };
    FightFunnalAI.prototype.onAddChildFightActor = function (parentActor) {
        this.actor.leaveMap();
        //this.realActor.AddOptimizeFlag(map.IRenderActor.OPTIMIZE_UPDATE_ONSEE)
        parentActor.realActor.addChildSprite("center", this.actor.realActor, -10000, true);
        this.actor.setPositionXY(0, 10);
        this.actor.changeAction("combat_idle");
    };
    FightFunnalAI.prototype.onRemoveChildFightActor = function (parentActor) {
        var pos = parentActor.getFighterCurCellXY();
        this.actor.setCellXY(pos.x, pos.y);
    };
    FightFunnalAI.prototype.delayBeginResult = function (result, resultInfo) {
        if (this.parentActor) {
            this.parentActor.removeChildFightActor(this.actor);
            var pos = this.parentActor.getFighterCurCellXY();
            this.actor.setCellXY(pos.x, pos.y);
            this.showResulting = true;
        }
        return false; //立马开始表演result
    };
    FightFunnalAI.prototype.restoreFightAI = function () {
        if (this.parentActor) {
            this.parentActor.addChildFightActor(this.actor);
            this.showResulting = false;
        }
    };
    return FightFunnalAI;
}(FightBaseAI));
__reflect(FightFunnalAI.prototype, "FightFunnalAI");
//# sourceMappingURL=FightFunnalAI.js.map