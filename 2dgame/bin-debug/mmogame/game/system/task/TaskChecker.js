/*
作者:
    yangguiming
    
创建时间：
   2013.6.28(周五)

意图：
   任务的检查器,，对TaskChecker_XXXXHandler的统一管理

公共接口：
    
    checkOp( op, param,	defaultRet){		//检查操作结果,返回默认defaultRet
    checkOpList( opList, defaultRet){  //检查操作列表{[op]:param,[op]:param}，如果一个结果false，则返回false。如果什么都不处理，返回默认defaultRet
    
  checkFinish( taskId){ 	//检查任务是否完成
  checkFindNpc( taskId, npcEntry){ //检查是否任务寻找的NPC
  checkSubTaskUpdate( deal_index, autoUpdate){		//检查客户端子任务是否需要更新。deal_index是子任务ID，如果是0，表示全部检查。autoUpdate在检查过程中自动更新了。
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
var TASK_CHECK_ALL_SUBTASK = 0;
var TaskChecker = (function (_super) {
    __extends(TaskChecker, _super);
    function TaskChecker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskChecker.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    TaskChecker.prototype.destory = function () {
    };
    TaskChecker.prototype.checkOp = function (op, param, defaultRet) {
        return this._checkOp(op, param, defaultRet);
    };
    TaskChecker.prototype.checkOpList = function (opList, defaultRet) {
        if (opList == null) {
            return defaultRet;
        }
        var ret = defaultRet;
        for (var op in opList) {
            var param = opList[op];
            ret = this.checkOp(op, param, defaultRet); //有一个操作不符合，就返回false
            if (!ret) {
                break;
            }
        }
        return ret;
    };
    TaskChecker.prototype.checkAcceptCondition = function (opList, defaultRet) {
        var statusList = {};
        if (opList == null) {
            return defaultRet;
        }
        var ret = defaultRet;
        for (var opstr in opList) {
            var param = opList[opstr];
            ret = this.checkOp(opstr, param, defaultRet);
            var keyInfo = GameConfig.TaskKeyMapping[opstr];
            var op = TaskOpDefine[keyInfo.value];
            statusList[op] = ret;
        }
        return statusList;
    };
    TaskChecker.prototype.checkFinish = function (taskId) {
        var task = TaskSystem.getInstance().getTask(taskId);
        if (task == null) {
            return false;
        }
        if (task.isFailed() == true) {
            return false;
        }
        var finishTask = true;
        var taskInfo = task.getPropertyInfo();
        if (taskInfo.finish) {
            for (var deal_index in taskInfo.finish) {
                var v = taskInfo.finish[deal_index];
                finishTask = this._checkSubTaskFinish(task, deal_index); //检查子任务是否完成
                if (!finishTask) {
                    break;
                } //一个不完成就跳出
            }
        }
        return finishTask; //如果木有finish条件，则默认任务完成了
    };
    TaskChecker.prototype.checkFindNpc = function (taskId, npcEntry) {
        return this._checkFindNpc(taskId, npcEntry);
    };
    //检查客户端子任务是否需要更新。deal_index是子任务ID，如果是0，表示全部检查。autoUpdate在检查过程中自动更新了。
    TaskChecker.prototype.checkSubTaskUpdate = function (deal_index, autoUpdate) {
        return this._checkSubTaskUpdate(deal_index, autoUpdate);
    };
    // getClosestBranchTaskType() {
    // 	let finishTaskList = TaskSystem.getInstance().getFinishTaskList()
    // 	let level = GetHeroProperty("level")
    // 	let npcEntryId = ""
    // 	for (let taskId in TaskSystem.getInstance().getTaskList()) {
    // 		let task = TaskSystem.getInstance().getTaskList()[taskId]
    // 		if (TaskSystem.getInstance().getTaskType(taskId) == taskType.Branch) {
    // 			return false, ""
    // 		}
    // 	}
    // 	for (let _ in GameConfig.TaskAcceptNpcConfig) {
    // 		let v = GameConfig.TaskAcceptNpcConfig[_]
    // 		for (let talkId in v) {
    // 			let value = v[talkId]
    // 			if (value.TaskIdList[TaskMainType.Branch]) {
    // 				let taskList = value.TaskIdList[TaskMainType.Branch]
    // 				for (let secType = 5; secType <= level, 5; secType++) {
    // 					if (taskList[secType]) {
    // 						for (let i = 0; i < taskList[secType].length; i++) {
    // 							let taskId = taskList[secType][i]
    // 							if (!table_isExsit(finishTaskList, taskId)) {
    // 								npcEntryId = taskList[secType].npcIds
    // 								break
    // 							}
    // 						}
    // 					}
    // 				}
    // 			}
    // 		}
    // 	}
    // 	if (npcEntryId == "") {
    // 		return [false, npcEntryId]
    // 	} else {
    // 		return [true, npcEntryId]
    // 	}
    // }
    //检查NPC是不是在任务中需要的，如果是，则提示可以接（例如访问NPC等其他任务）
    TaskChecker.prototype._checkFindNpc = function (taskId, npcId) {
        var task = TaskSystem.getInstance().getTask(taskId);
        if (task == null) {
            return false;
        }
        var taskInfo = task.getPropertyInfo();
        var shouldFind = false;
        for (var deal_index in taskInfo.finish) {
            var _ = taskInfo.finish[deal_index];
            var functionRef = TaskFindNpcSpace.NpcInTaskHandle[deal_index];
            if (functionRef) {
                shouldFind = functionRef.call(this, task, npcId);
                if (shouldFind) {
                    break;
                }
            }
        }
        return shouldFind;
    };
    TaskChecker.prototype._checkSubTaskFinish = function (task, deal_index) {
        var funcRef = TaskFinishSpace.TaskFinishHandle[deal_index];
        if (funcRef == null) {
            TLog.Error("TaskChecker._checkFinish TaskFinishHandle[%s] ! exsit", tostring(deal_index));
            return true;
        }
        var taskInfo = task.getPropertyInfo();
        return funcRef.call(this, task, deal_index);
    };
    TaskChecker.prototype._checkSubTaskUpdate = function (deal_index, autoUpdate) {
        var ret = false;
        if (deal_index == 0) {
            for (var index in TaskSubUpdateSpace.SubTaskUpdateHandler) {
                var functionRef = TaskSubUpdateSpace.SubTaskUpdateHandler[index];
                var temptRet = functionRef.call(this, index, autoUpdate);
                if (ret == false) {
                    ret = temptRet;
                }
            }
        }
        else {
            var functionRef = TaskSubUpdateSpace.SubTaskUpdateHandler[deal_index];
            if (functionRef == null) {
                TLog.Error("TaskChecker._checkSubTaskUpdate index:%d ! exsit", deal_index);
                return false;
            }
            ret = functionRef.call(this, deal_index, autoUpdate);
        }
        return ret;
    };
    TaskChecker.prototype._checkOp = function (opStr, param, defaultRet) {
        var ratio = 1;
        if (opStr.charAt(0) == "-") {
            ratio = -1;
            opStr = opStr.substring(1);
        }
        var _a = TaskSystem.getInstance().getTaskOpFromStr(TaskKeyType.CHECK, opStr), flag = _a[0], op = _a[1];
        if (!flag) {
            return defaultRet;
        }
        op = op * ratio;
        var functionRef = TaskOpSpace.TaskOpHandler[op];
        if (functionRef == null) {
            return defaultRet;
        }
        //return ratio == 1 && functionRef(param) || ! functionRef(param)
        //if(ratio == 1 ){
        return functionRef.call(this, param);
        //}else{
        //return ! functionRef(param)
        //}
    };
    return TaskChecker;
}(TClass));
__reflect(TaskChecker.prototype, "TaskChecker");
//# sourceMappingURL=TaskChecker.js.map