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
var TaskMessageHandler = (function (_super) {
    __extends(TaskMessageHandler, _super);
    function TaskMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskMessageHandler.prototype.initObj = function () {
        // this.register(opCodes.G2C_TASK_ACCEPT, this.onRecvG2C_TASK_ACCEPT, this)		//接受任务
        // this.register(opCodes.G2C_TASK_INFO, this.onRecvG2C_TASK_INFO, this)			//更新任务
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.register(opCodes.G2C_TASK_SUCCEED, this.onRecvG2C_TASK_SUCCEED, this)	//任务成功
        // this.register(opCodes.G2C_TASK_CANCEL, this.onRecvG2C_TASK_CANCEL, this)		//任务放弃
        // this.register(opCodes.G2C_TASK_FAIL, this.onRecvG2C_TASK_FAIL, this)			//任务失败
        this.register(opCodes.G2C_TASK_FINISH_LIST, this.onRecvG2C_TASK_FINISH_LIST, this); //任务完成列表
        //this.register(opCodes.G2C_TASK_FIGHT_LOST, this.onRecvG2C_TASK_FIGHT_LOST, this) //任务战斗失败
        //this.register(opCodes.G2C_TASK_TEAM_TALK, this.onRecvG2C_TASK_TEAM_TALK, this)	//整队与npc对话
        //this.register(opCodes.G2C_TASK_PET_OPTION, this.onRecvG2C_TASK_PET_OPTION, this)  //服务器返回亲密度任务事件
        //活动类相关任务
        //this.register(opCodes.G2C_FACTION_TASK_REQUEST, this.onRecvG2C_FACTION_TASK_REQUEST, this)  //服务器返回亲密度任务事件
    };
    // onRecvG2C_TASK_ACCEPT(dispatcher, message) {
    // 	let task = Task.newObj(message.taskInfo)
    // 	TaskSystem.getInstance().addTask(task)
    // 	FireEvent(EventDefine.TASK_ACCPET, TaskEvent.newObj(message.taskInfo.taskId))
    // 	//EffectManager.getInstance().createBindOnceEffect( effectIndex.TASK_RECIVE, GetHero())
    // }
    // onRecvG2C_TASK_INFO(dispatcher, message) {
    // 	//){ return }
    // 	let taskList = []
    // 	for (let i = 0; i < message.taskInfoList.length; i++) {
    // 		let v = message.taskInfoList[i]
    // 		let task = Task.newObj(v)
    // 		JsUtil.arrayInstert(taskList, task)
    // 	}
    // 	TaskSystem.getInstance().updateTask(taskList)
    // }
    // onRecvG2C_TASK_SUCCEED(dispatcher, message) {
    // 	TaskSystem.getInstance().updateFinishTaskList(message.taskId)
    // 	TaskSystem.getInstance().removeTask(message.taskId)
    // 	//EffectManager.getInstance().createBindOnceEffect( effectIndex.TASK_FINISH, GetHero())
    // 	CommandManager.getInstance().clear()
    // 	FireEvent(EventDefine.TASK_COMMIT_FINISH, TaskEvent.newObj(message.taskId))
    // }
    // onRecvG2C_TASK_CANCEL(dispatcher, message) {
    // 	FireEvent(EventDefine.TASK_COMMIT_CANCEL, TaskEvent.newObj(message.taskId))
    // 	TaskSystem.getInstance().removeTask(message.taskId)
    // 	let msgString = String.format(Localize_cns("TASK_CANCEL_TIPS"), TaskSystem.getInstance().getTaskName(message.taskId))
    // 	MsgSystem.addChannel(channelType.SYSTEM, msgString)
    // 	MsgSystem.addTagTips(msgString)
    // }
    // onRecvG2C_TASK_FAIL(dispatcher, message) {
    // 	FireEvent(EventDefine.TASK_COMMIT_FAILED, TaskEvent.newObj(message.taskId))
    // 	TaskSystem.getInstance().removeTask(message.taskId)
    // 	let msgString = String.format(Localize_cns("TASK_FAIL_TIPS"), TaskSystem.getInstance().getTaskName(message.taskId))
    // 	MsgSystem.addTagTips(msgString)
    // 	MsgSystem.addChannel(channelType.SYSTEM, msgString)
    // }
    TaskMessageHandler.prototype.onRecvG2C_TASK_FINISH_LIST = function (dispatcher, message) {
        var taskSystem = TaskSystem.getInstance();
        for (var _ in message.taskList) {
            var taskId = message.taskList[_];
            taskSystem.updateFinishTaskList(taskId);
        }
    };
    return TaskMessageHandler;
}(MessageHandler));
__reflect(TaskMessageHandler.prototype, "TaskMessageHandler");
//# sourceMappingURL=TaskMessageHandler.js.map