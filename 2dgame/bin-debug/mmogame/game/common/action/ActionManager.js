// TypeScript file
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
    lintianfeng
    
创建时间：
   2013.7.12(周五)

意图：
   

公共接口：
     // Action接口：
     // run(){
     // play( delay){
     // 必须继承：
     // onFinish(){
   // onPlay( delay){
   // ActionManager接口：
   // addAction( action){
     // ActionManager:function stopAction(){
*/
// let MoveType:any = {
// 	["jump"] : gui.eGuiControllerMoveType_Jump,								// 跳动
// 	["inertional"] : gui.eGuiControllerMoveType_Inertional,		// 平滑
// 	["accelerated"] : gui.eGuiControllerMoveType_Accelerated,	// 加速
// 	["slowed"] : gui.eGuiControllerMoveType_Slowed,						// 减速
// 	["custom"] : gui.eGuiControllerMoveType_CustomCal,				// 自定义运行曲线
// }
var BaseAction = (function (_super) {
    __extends(BaseAction, _super);
    function BaseAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.window = args[0];
        this.time = args[1] || 1000;
        this.Data = args[2];
        this.callbackFunc = args[3];
        this.objRef = args[4];
        //this.during = 0
        this.running = false;
    };
    BaseAction.prototype.run = function () {
        if (this.running == true) {
            return;
        }
        this.running = true;
        ActionManager.getInstance().addAction(this);
    };
    BaseAction.prototype.stop = function () {
        if (this.running == false) {
            return false;
        }
        this.running = false;
        ActionManager.getInstance().removeAction(this);
        return true;
    };
    BaseAction.prototype.finish = function () {
        //TLog.Debug("BaseAction.finish", this.classname, os.time(), this.actionindex)
        if (this.stop() == false) {
            return;
        }
        if (this.callbackFunc) {
            this.callbackFunc.call(this.objRef, this);
        }
    };
    BaseAction.prototype.isRunning = function () {
        return this.running;
    };
    BaseAction.prototype.destory = function () {
        this.stop();
    };
    ////////////////////////////////////////////////////////-
    // 继承
    BaseAction.prototype.onBegin = function () {
    };
    BaseAction.prototype.onStop = function () {
    };
    return BaseAction;
}(TClass));
__reflect(BaseAction.prototype, "BaseAction");
var ActionManager = (function (_super) {
    __extends(ActionManager, _super);
    function ActionManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionManager.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actionList = [];
    };
    ActionManager.prototype.addAction = function (action) {
        //TLog.Debug("ActionManager.addAction", action.classname, os.time())
        for (var i in this.actionList) {
            var v = this.actionList[i];
            if (v.running == true && v.window == action.window && v.classname == action.classname) {
                // 该窗口在运动着，添加新动作，先停止之前的动作
                this.removeAction(v);
            }
        }
        if (this.isRunAction(action) == false) {
            table_insert(this.actionList, action);
        }
        action.onBegin();
    };
    ActionManager.prototype.removeAction = function (action) {
        //TLog.Debug("ActionManager.removeAction", action.classname)
        // 直接完成
        if (table_remove(this.actionList, action)) {
            action.onStop();
        }
    };
    ActionManager.prototype.isRunAction = function (action) {
        return table_isExsit(this.actionList, action);
    };
    return ActionManager;
}(TClass));
__reflect(ActionManager.prototype, "ActionManager");
//# sourceMappingURL=ActionManager.js.map