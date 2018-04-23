/*
作者:
    yangguiming
    
创建时间：
   2013.6.18(周二)

意图：
    player,monster,npc基类
  1.角色移动
  2.角色有限状态机(管理一般表现行为)
  3.角色属性

公共接口：
  //public initObj(...args:any[]):void {
    //destory(){
    //getActorType(){
    //onAppearChange(){							//角色外观变化（变大变小、更换模型等chufa ）
    
    //移动相关
    //wantToGo( x, y, ignoreBlock){
    //wantToGoByCell( cellx, celly, ignoreBlock){
    //moveStop(){
    //setMoveSpeed( speed){
    //getMoveSpeed(){
    //setMovementNotifyEnable( enable){//是否需要通知移动时间，默认不通知
    
    //状态相关
    //isState( state){
    //getStateMrg(){
    //switchToState( state){
    
    //角色属性
    //setPropertyInfo( info){
    //getPropertyInfo(){
    //updatePropertyInfo( info){ //info会被修改，更新属性
    //getProperty( key){
    
    //重载
    //onMoveBegin( args){
    //onMoving( args){
    //onMoveStop( args){
    

    //重载实现
    //onPropertyChange(){ //属性改变
    //onMovementEvent( args){
    //onEnterMap(){
    //onLeaveMap(){
    
    //响应命令
    //doCommand( cmdId, param1, param2){
*/
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
var s_uiComponentPool = {};
// function CreateUIComponent(character){
// 	if(s_uiComponentPool.length == 0 ){
// 		JsUtil.arrayInstert(s_uiComponentPool, CommandComponent_UI.newObj(character))
// 	}
// 	let component = JsUtil.arrayRemove(s_uiComponentPool)
// 	component.initWithReuse(character)
// 	component.onAttach()
// 	return component
// }
// function ReleaseUIComponent(component){
// 	component.onDeattach()
// 	if(s_uiComponentPool.length >= 20 ){
// 		component.deleteObj()
// 		return
// 	}
// 	JsUtil.arrayInstert(s_uiComponentPool, component)
// }
function ClearAllUIComponent() {
    // 	for(let _ in s_uiComponentPool){
    // 			let component = s_uiComponentPool[_]
    // 		component.deleteObj()
    // 	}
    //  s_uiComponentPool:any = {}
}
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Character.fontKey = "ht_20_lc"
    Character.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
        this.propertyInfo = null; //人物属性
        this.stateMrg = CharacterFSM.newObj(this); //有限状态机	
        this.actorType = actor_Type.ACTOR_TYPE_CHARACTER;
        this.curState = characterState.nullState;
        //默认是在可见时update,可见时移动
        this.realActor.addEventListener(map.SpriteMovEvent.MovementEvent, this.onMovementEvent, this);
        this.addCommandComponent(ActorCmdComponent_Effect.newObj(this));
        this.addCommandComponent(ActorCmdComponent_UI.newObj(this));
        this.addCommandComponent(ActorCmdComponent_Visual.newObj(this));
        this.doCommand(ActorCommand.SetShadowVisible, true, null);
        //监听动画动作
        this.setAnimNotifyEnable(true);
        this.setBoundActionId("idle");
        this.beginMoveCallback = null;
        this.stopMoveCallback = null;
        this.movingCallback = null;
        this.moveCallbackObj = null;
        this.insideEffectList = [];
    };
    Character.prototype.destory = function () {
        if (this.stateMrg) {
            this.stateMrg.deleteObj();
            this.stateMrg = null;
        }
        this.deleteFootEffect();
        this.insideEffectList = [];
    };
    Character.prototype.getId = function () {
        return this.id;
    };
    Character.prototype.getName = function () {
        if (this.propertyInfo == null) {
            return "Error";
        }
        return this.propertyInfo.name;
    };
    Character.prototype.setMovementNotifyEnable = function (enable) {
        if (enable) {
            this.realActor.addReportFlag(map.MoveReportFlag.MOVEMENT_BEGIN_RUN);
            this.realActor.addReportFlag(map.MoveReportFlag.MOVEMENT_STOPING);
        }
        else {
            this.realActor.removeReportFlag(map.MoveReportFlag.MOVEMENT_BEGIN_RUN);
            //this.realActor:RemoveReportFlag(map.IRenderActor.MOVEMENT_CELL_CHANGED)
            this.realActor.removeReportFlag(map.MoveReportFlag.MOVEMENT_STOPING);
        }
    };
    Character.prototype.setMovingNotifyEnable = function (enable) {
        if (enable) {
            this.realActor.addReportFlag(map.MoveReportFlag.MOVEMENT_CELL_CHANGED);
        }
        else {
            this.realActor.removeReportFlag(map.MoveReportFlag.MOVEMENT_CELL_CHANGED);
        }
    };
    Character.prototype.wantToGo = function (x, y, ignoreBlock) {
        if (this.isEnterMap() == false)
            return false;
        if (!this.stateMrg.canToState(characterState.actionState_move)) {
            TLog.Debug("Character.wantToGo cann't go due to state block");
            return false;
        }
        ignoreBlock = !!ignoreBlock;
        return this.realActor.moveTo(x, y, ignoreBlock);
    };
    Character.prototype.wantToGoByCell = function (cellx, celly, ignoreBlock) {
        var result = SceneManager.getInstance().cellXYtoMapXY(cellx, celly);
        return this.wantToGo(result.x, result.y, ignoreBlock);
    };
    Character.prototype.moveStop = function () {
        if (this.isEnterMap() == false)
            return;
        this.realActor.moveStop();
    };
    Character.prototype.setMoveSpeed = function (speed) {
        this.realActor.setMoveSpeed(speed);
    };
    Character.prototype.getMoveSpeed = function () {
        return this.realActor.getMoveSpeed();
    };
    Character.prototype.getStateMrg = function () {
        return this.stateMrg;
    };
    Character.prototype.isState = function (state) {
        return this.stateMrg.isState(state);
    };
    Character.prototype.switchToState = function (state) {
        if (this.stateMrg == null)
            return false;
        if (this.stateMrg.canToState(state)) {
            this.stateMrg.setState(state);
            return true;
        }
        return false;
    };
    Character.prototype.setPropertyInfo = function (info) {
        this.propertyInfo = info;
        this.onPropertyChange();
    };
    Character.prototype.getPropertyInfo = function () {
        return this.propertyInfo;
    };
    Character.prototype.updatePropertyInfo = function (info, resetInfo) {
        var old = this.propertyInfo;
        if (resetInfo) {
            this.propertyInfo = info;
            this.onPropertyChange();
            return null;
        }
        if (old) {
            table_sub_union(info, old); //更新的属性，是old的子集。
            //this.onStateChange(null, this.curState)
        }
        this.propertyInfo = info;
        this.onPropertyChange();
        return old;
    };
    Character.prototype.getProperty = function (key) {
        if (this.propertyInfo == null) {
            return null;
        }
        return this.propertyInfo[key];
    };
    Character.prototype.onMoveBegin = function (args) {
        //TLog.Debug("Character.onMoveBegin")
        this.stateMrg.setState(characterState.actionState_move);
        if (this.beginMoveCallback) {
            this.beginMoveCallback.call(this.moveCallbackObj, this);
        }
    };
    Character.prototype.onMoving = function (args) {
        if (this.movingCallback) {
            this.movingCallback.call(this.moveCallbackObj, this);
        }
    };
    Character.prototype.onMoveStop = function (args) {
        //TLog.Debug("Character.onMoveStop")
        this.switchToState(characterState.actionState_idle);
        if (this.stopMoveCallback) {
            this.stopMoveCallback.call(this.moveCallbackObj, this);
        }
        //未经过状态判断，可能会导致战斗中角色状态的判断异常
        //this.stateMrg.setState(characterState.actionState_idle)
    };
    Character.prototype.onAnimOneCycle = function (action_id) {
        //TLog.Debug("Character.onAnimOneCycle", action_id)
    };
    Character.prototype.onStateChange = function (oldState, curState) {
        //TLog.Warn("Character.onStateChange old:%s, cur:%s", tostring(oldState), tostring(curState))
        var bHandle = false;
        if (curState == characterState.actionState_move) {
            this.changeAction("run", 1.0, true);
            this.curState = curState;
            bHandle = true;
        }
        else if (curState == characterState.actionState_idle) {
            this.changeAction("idle", 1.0, true);
            this.curState = curState;
            bHandle = true;
        }
        this.updateInsideEffectState(oldState, curState);
        return bHandle;
    };
    //////////////////////////////////////////////////-
    Character.prototype.onMovementEvent = function (args) {
        if (args.beginRun()) {
            this.onMoveBegin(args);
        }
        else if (args.isStoping()) {
            this.onMoveStop(args);
        }
        else {
            this.onMoving(args);
        }
    };
    Character.prototype.onPropertyChange = function () {
        this.id = this.propertyInfo.id;
    };
    Character.prototype.onEnterMap = function () {
        _super.prototype.onEnterMap.call(this);
        //设置子状态
        this.stateMrg.setState(characterState.globalState_live);
        this.stateMrg.setState(characterState.actionState_idle);
        this.stateMrg.setState(characterState.postureState_normal);
        this.setMoveSpeed(12);
    };
    Character.prototype.onLeaveMap = function () {
        _super.prototype.onLeaveMap.call(this);
    };
    Character.prototype.setMovementCallback = function (beginMoveCallback, stopMoveCallback, movingCallback, obj) {
        this.beginMoveCallback = beginMoveCallback;
        this.stopMoveCallback = stopMoveCallback;
        this.movingCallback = movingCallback;
        this.moveCallbackObj = obj;
    };
    Character.prototype.faceToXY = function (targetX, targetY) {
        //let srcX, srcY = this.getMapXY()
        //let pos = GetFightActorPosXY(this.getSide(), this.getPos())
        //let srcX, srcY = pos.x, pos.y
        var mapPos = this.getMapXY();
        //简单检测X值
        if (targetX > mapPos.x) {
            //右边
            this.setDir(ActorDirMap.Right);
        }
        else {
            this.setDir(ActorDirMap.Left);
        }
    };
    Character.prototype.faceToActor = function (actor) {
        var pos = actor.getMapXY();
        this.faceToXY(pos.x, pos.y);
    };
    ////////////////////////////////////////////////////////////////-
    Character.prototype.addActorEffect = function (boneName, effectId) {
        var boneParam = null;
        if (boneName) {
            boneParam = {};
            boneParam.name = boneName;
            boneParam.order = -1;
            boneParam.transfrom = true;
        }
        var effect = EffectManager.getInstance().createBindEffect(effectId, this, boneParam, true);
        JsUtil.arrayInstert(this.insideEffectList, effect);
    };
    Character.prototype.doCommand = function (cmdId, effect, param) {
        if (cmdId == ActorCommand.RemoveEffect) {
            table_remove(this.insideEffectList, effect);
        }
        _super.prototype.doCommand.call(this, cmdId, effect, param);
    };
    Character.prototype.updateInsideEffectState = function (oldState, curState) {
        //
        if (this.stateMrg.isActionState(curState)) {
            if (curState == characterState.actionState_move
                || curState == characterState.actionState_idle
                || curState == characterState.nullState) {
                for (var _ in this.insideEffectList) {
                    var effect = this.insideEffectList[_];
                    effect.setVisible(true);
                }
            }
            else {
                for (var _ in this.insideEffectList) {
                    var effect = this.insideEffectList[_];
                    effect.setVisible(false);
                }
            }
        }
    };
    //===========================================游戏逻辑部分===========================================
    Character.prototype.deleteFootEffect = function () {
        if (this.footEffect) {
            this.footEffect.deleteObj();
            this.footEffect = null;
        }
    };
    //脚底绑定特效（仙侣:法阵，宠物:通灵）
    Character.prototype.setFootBindEffect = function (effectid) {
        effectid = effectid || 0;
        this.deleteFootEffect();
        if (effectid <= 0) {
            return;
        }
        var boneParam = {};
        boneParam.name = "";
        boneParam.order = -1;
        boneParam.transfrom = false;
        this.footEffect = EffectManager.getInstance().createBindEffect(effectid, this, boneParam, true);
    };
    return Character;
}(Actor));
__reflect(Character.prototype, "Character");
//# sourceMappingURL=Character.js.map