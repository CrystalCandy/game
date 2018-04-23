/*
作者:
    liuziming
    
创建时间：
   2013.8.01(周四)

意图：
   

公共接口：
   
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
var TaskListener = (function (_super) {
    __extends(TaskListener, _super);
    function TaskListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskListener.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.finishTask = {};
        this.failTask = {};
        this.overTimeTask = {};
        this.taskListenerList = {};
        RegisterEvent(EventDefine.TASK_ACCPET, this.onRecvNewTask, this);
        RegisterEvent(EventDefine.TASK_UPDATELIST, this.onTaskListUpdate, this);
        RegisterEvent(EventDefine.TASK_FINISH, this.onTaskFinish, this);
        RegisterEvent(EventDefine.TASK_FAILED, this.onTaskFail, this);
        //RegisterEvent(EventDefine.TASK_OVERTIME, this.onTaskOverTime, this)
        RegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onCommitTaskFinished, this);
        RegisterEvent(EventDefine.TASK_COMMIT_FAILED, this.onCommitTaskFailed, this);
        RegisterEvent(EventDefine.TASK_COMMIT_CANCEL, this.onCommitTaskCanceled, this);
        RegisterEvent(EventDefine.TASK_UPDATE, this.onTaskUpdate, this);
        RegisterEvent(EventDefine.TASK_FIGHT_END, this.onSpecialHandler, this);
    };
    TaskListener.prototype.resetStatus = function (taskId) {
        this.finishTask[taskId] = false;
        this.failTask[taskId] = false;
        this.overTimeTask[taskId] = false;
        this.taskListenerList[taskId] = false;
    };
    TaskListener.prototype.onClear = function () {
        this.finishTask = {};
        this.failTask = {};
        this.overTimeTask = {};
        this.taskListenerList = {};
    };
    //监听新接任务事件
    TaskListener.prototype.onRecvNewTask = function (args) {
        var taskId = args.taskId;
        this.taskListenerList[taskId] = true;
        //this.AddTaskMoveListener(taskId)
        this.CommonCheckListenTask(taskId, TaskListenType.NEWTASK);
    };
    //监听任务更新事件
    TaskListener.prototype.onTaskListUpdate = function (args) {
        var taskList = TaskSystem.getInstance().getTaskList();
        for (var _taskId in taskList) {
            var taskId = tonumber(_taskId);
            var task = taskList[taskId];
            if (this.taskListenerList[taskId]) {
                if (task.isFinish()) {
                    if (!this.finishTask[taskId]) {
                        this.finishTask[taskId] = true;
                        FireEvent(EventDefine.TASK_FINISH, TaskEvent.newObj(taskId));
                    }
                }
                if (task.isFailed()) {
                    if (!this.failTask[taskId]) {
                        this.failTask[taskId] = true;
                        FireEvent(EventDefine.TASK_FAILED, TaskEvent.newObj(taskId));
                    }
                }
                if (!task.isInTime()) {
                    if (!this.overTimeTask[taskId]) {
                        this.overTimeTask[taskId] = true;
                        FireEvent(EventDefine.TASK_OVERTIME, TaskEvent.newObj(taskId));
                    }
                }
            }
            else if (!task.isFinish() && !task.isFailed() && task.isInTime()) {
                this.taskListenerList[taskId] = true;
            }
            //this.CommonCheckListenTask(taskId, TaskListenType.UPDATETASK)
        }
    };
    //监听任务完成事件
    TaskListener.prototype.onTaskFinish = function (args) {
        var taskId = args.taskId;
        this.CommonCheckListenTask(taskId, TaskListenType.FINISHTASK);
    };
    //监听任务失败事件
    TaskListener.prototype.onTaskFail = function (args) {
        var taskId = args.taskId;
        this.CommonCheckListenTask(taskId, TaskListenType.FAILTASK);
    };
    //任务过时处理（失败另外处理）
    TaskListener.prototype.onPassTimeTask = function (args) {
        var taskId = args.taskId;
        this.CommonCheckListenTask(taskId, TaskListenType.PASSTIMETASK);
    };
    //监听任务服务器响应完成事件
    TaskListener.prototype.onCommitTaskFinished = function (args) {
        var taskId = args.taskId;
        this.resetStatus(taskId);
        this.CommonCheckListenTask(taskId, TaskListenType.COMMITTASKFINISH);
    };
    //监听任务服务器响应失败事件
    TaskListener.prototype.onCommitTaskFailed = function (args) {
        var taskId = args.taskId;
        this.resetStatus(taskId);
        this.CommonCheckListenTask(taskId, TaskListenType.COMMITTASKFAILED);
    };
    //监听任务服务器响应取消事件
    TaskListener.prototype.onCommitTaskCanceled = function (args) {
        var taskId = args.taskId;
        this.resetStatus(taskId);
        this.CommonCheckListenTask(taskId, TaskListenType.COMMITTASKCANCEL);
    };
    //监听任务动态信息更新事件
    TaskListener.prototype.onTaskUpdate = function (args) {
        var oldTask = args.oldTask;
        var newTask = args.newObjTask;
        //if(newTask.isFinish() ){					//完成任务的话就不处理
        //return
        //}
        TLog.Debug("TaskListener.onTaskUpdate:taskId:%d, TaskListenType:%d~~", newTask.getId(), TaskListenType.UPDATETASK);
        this.CommonCheckListenTask(newTask.getId(), TaskListenType.UPDATETASK, oldTask.getPropertyInfo(), newTask.getPropertyInfo());
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////-
    //除了完成和走路监听外的其他监听公共函数
    TaskListener.prototype.CommonCheckListenTask = function (taskId, listen_type, oldInfo, newInfo) {
        var typeStr = GameConfig.TaskKeyMapping[TaskKeyType.LISTENTYPE][listen_type].value; //转中文
        TLog.Debug("TaskListener.CommonCheckListenTask the keyStr is :", typeStr, listen_type);
        if (GameConfig.TaskConfig[taskId] && GameConfig.TaskConfig[taskId].Listen && GameConfig.TaskConfig[taskId].Listen[typeStr]) {
            var newListener = GameConfig.TaskConfig[taskId].Listen[typeStr]; //完成任务的监听
            for (var funcStr in newListener) {
                var param = newListener[funcStr];
                var _a = TaskSystem.getInstance().getTaskOpFromStr(TaskKeyType.LISTEN, funcStr), flag = _a[0], funcIndex = _a[1];
                var handleFunc = TaskListenSpace.TaskListenHandle[funcIndex];
                if (flag && handleFunc) {
                    if (listen_type == TaskListenType.UPDATETASK) {
                        handleFunc.call(this, taskId, param, oldInfo, newInfo);
                    }
                    else {
                        handleFunc.call(this, taskId, param);
                    }
                }
            }
            return true; //有处理监听
        }
        return false; //没有监听
    };
    //////////////////////////////////////////////特殊事件处理//////////////////////////////
    TaskListener.prototype.onSpecialHandler = function (args) {
        var taskId = args.taskId;
        var typeStr = TaskListenType[GameConfig.TaskKeyMapping[TaskKeyType.LISTENTYPE][TaskListenType.SPECIALHANDLER].value]; //转中文
        if (GameConfig.TaskConfig[taskId] && GameConfig.TaskConfig[taskId].Listen && GameConfig.TaskConfig[taskId].Listen[typeStr]) {
            var newListener = GameConfig.TaskConfig[taskId].Listen[typeStr]; //完成任务的监听
            for (var funcStr in newListener) {
                var param = newListener[funcStr];
                var _a = TaskSystem.getInstance().getTaskOpFromStr(TaskKeyType.LISTEN, funcStr), flag = _a[0], funcIndex = _a[1];
                var handleFunc = TaskListenSpace.TaskListenHandle[funcIndex];
                if (flag && handleFunc) {
                    handleFunc.call(taskId, param, args);
                }
            }
        }
    };
    return TaskListener;
}(BaseSystem));
__reflect(TaskListener.prototype, "TaskListener");
var TaskListenSpace;
(function (TaskListenSpace) {
    TaskListenSpace.TaskListenHandle = {};
    ////-公共索引////////////////////////////////////////////////////////////////////////////////////
    function executeLink(taskId, param) {
        TaskExecutor.getInstance().executeLink(param);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_EXECUTELINK] = executeLink;
    function showDialogNode(taskId, param) {
        TaskDialogue.getInstance().showDramaState(param[0], param[1], param[2]);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOWUP_DIALOG] = showDialogNode;
    function playMovie(taskId, param) {
        if (param == null || param == "") {
            return;
        }
        MovieSystem.getInstance().beginPlay(param);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_PLAY_MOVIE] = playMovie;
    function showTips(taskId, param) {
        MsgSystem.selectShowHandle(param[0], param[1]);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOW_TIPS] = showTips;
    function showTaskTrace(taskId, param) {
        var channel = checkNull(param[0], 2); //默认弹幕
        function _taskTraceListener(tparam, userData) {
            var str = tparam.content;
            return MsgSystem.selectShowHandle(channel, userData.title + ":" + str + param[1]);
        }
        var t = {};
        t.title = TaskSystem.getInstance().getTaskName(taskId);
        var listener = TaskExecutor.getInstance().getTraceListener(_taskTraceListener, this, t);
        TaskExecutor.getInstance().executeTraceTask(taskId, listener);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOW_TASKTRACE] = showTaskTrace;
    function acceptTypeTask(taskId, param) {
        var message = GetMessage(opCodes.C2G_TASK_APPLY);
        message.npcId = 0;
        message.taskType = param;
        SendGameMessage(message);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_APPLY_TYPETASK] = acceptTypeTask;
    function addFightWinRecall(taskId, param) {
        //H5不自动弹关卡
        // let taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo()
        // let campaignId = taskInfo.finish["CAMPAIGN"] || 0
        // if (campaignId == 0) {
        // 	return
        // }
        // function func() {
        // 	//组队时不给回调打开关卡界面权限，因为非活动类的关卡功能只能以打开关卡界面作为“活动”开始的标准，每打一场关卡自动退出关卡“活动”
        // 	if (HeroIsInTeam() == true) {
        // 		return
        // 	}
        // 	CampaignSystem.getInstance().setCurCampaign(campaignId)
        // 	let mapId = GameConfig.CampaignConfig[campaignId].mapId
        // 	WngMrg.getInstance().getWindow("CopyCardFrame").showCopyCard(mapId, null, campaignId)
        // }
        // FightSystem.getInstance().addEndFightHandler(func)
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_FIGHT_WIN_RECALL] = addFightWinRecall;
    function fengmoDailyPro(taskId, param) {
        function func() {
            var curTimes = getSaveRecord(opSaveRecordKey.taskCount[taskType.Fengmo]) || 0;
            var totalTimes = taskConfig[taskType.Fengmo].maxPrizeCount;
            var channelId = checkNull(param[0], 17);
            var color = "#red";
            if (curTimes >= totalTimes) {
                color = "#cyan";
            }
            MsgSystem.selectShowHandle(channelId, Localize_cns("TASK_TXT1") + color + "(" + curTimes + "/" + totalTimes + ")");
        }
        DelayEventEvecuteFunc(EventDefine.HERO_INFO_UPDATE, func, this);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_FENGMO_DAILY_PRO] = fengmoDailyPro;
    function showGuideDramaTips(taskId, param) {
        var args = (_a = {}, _a["window_y"] = 70, _a["rightType"] = true, _a["content"] = param, _a["guideType"] = 10, _a["clickClose"] = true, _a);
        GuideSystem.getInstance().executeAction(GuideListenDefine.FIELD_ACTION_DRAMATIPS, args, GenLocalGuideIndex(), 1);
        var _a;
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_GUIDE_DRAMA_TIPS] = showGuideDramaTips;
    ////////////////////////////////////////////////////////////////////////////////////////////////-
    //-新接任务
    //function taskWithNpcAccept( taskId, param){
    //	if(GameConfig.npcConfig[tonumber(param)] ){
    //		let npcRef = GameConfig.npcConfig[tonumber(param)]
    //		
    //		let mapId = npcRef.map
    //		let link = mapId +";1;" +param +"(0;0)"
    //		TaskExecutor.getInstance().executeLink(link, taskId)
    //	}
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_ACCEPT_TALK_To_NPC] = taskWithNpcAccept
    //function openAppointDialog( taskId, param){
    //	TaskDialogue.getInstance().showDramaState(param[1], param[0], param[2])
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_ACCEPT_AUTO_CLOSE_DIALOG] = openAppointDialog
    //function playMovie( taskId, param){
    //	if(param == null || param == "" ){
    //		return
    //	}
    //	
    //	MovieSystem.getInstance().beginPlay(param)
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_ACCEPT_PLAY_MOVIE] = playMovie
    //function openBaishiUI( taskId, param){
    //	TaskExecutor.getInstance().executeLink("1;5;1")
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_ACCEPT_OPEN_BAISHI_UI] = openBaishiUI
    //-任务完成
    //function talkWithNpc( taskId, param){
    //	if(ActorManager.getInstance().getNpcWithEntryId(tonumber(param)) ){
    //		npc = ActorManager.getInstance().getNpcWithEntryId(tonumber(param))
    //		npcId = npc.getId()
    //		Task_ShowNpcDialogWithNpc(npcId)
    //	}
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_TALK_To_NPC] = talkWithNpc
    function autoCommitTask(taskId, param) {
        var npc = ActorManager.getInstance().getNpcWithEntryId(param);
        var npcId = npc == null && 0 || npc.getId();
        var message = GetMessage(opCodes.C2G_TASK_COMMIT);
        message.npcId = npcId;
        message.taskId = taskId;
        SendGameMessage(message);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_AUTO_COMMIT_TASK] = autoCommitTask;
    //女神之吻任务
    function commitGoddessKissTask(taskId, param) {
        // 	//WngMrg.getInstance().showWindow("GoddessKissFrame")
        // 	let wnd1 = WngMrg.getInstance().getWindow("GoddessKissImgFrame")
        // 	wnd1.showWithChapterId(param)
        var wnd2 = WngMrg.getInstance().getWindow("GoddessKissAnimFrame");
        wnd2.showWithChapterId(param, true);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMIT_GODDESSKISS_TASK] = commitGoddessKissTask;
    //任务更新
    function xunluoOpenDialog(taskId, param, oldInfo, newInfo) {
        var oldCount = oldInfo.data[taskField.FIELD_FINISH_PVE_COUNT] || 0;
        var newCount = newInfo.data[taskField.FIELD_FINISH_PVE_COUNT] || 0;
        if (newCount > oldCount) {
            TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOWUP_DIALOG](taskId, param);
        }
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_UPDATE_XUNLUO] = xunluoOpenDialog;
    function commitResFindNpc(taskId, param, oldInfo, newInfo) {
        var isCommitItem = (!oldInfo.data[taskField.FIELD_FINISH_GIVE_RES]) && newInfo.data[taskField.FIELD_FINISH_GIVE_RES];
        var isCommitPet = (!oldInfo.data[taskField.FIELD_FINISH_GIVE_PET]) && newInfo.data[taskField.FIELD_FINISH_GIVE_PET];
        param = tonumber(tostring(param));
        if (isCommitItem || isCommitPet) {
            if (param == "COMMIT_NPC") {
                param = TaskSystem.getInstance().getCommitTaskNpc(2, taskId);
            }
            if (GameConfig.npcConfig[param]) {
                var npcRef = GameConfig.npcConfig[param];
                var mapId = npcRef.map;
                var link = mapId + ";1;" + param + "(0;0)";
                TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_EXECUTELINK](taskId, link);
            }
        }
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_UPDATE_COMMIT_RES] = commitResFindNpc;
    function answerQuestionDialog(taskId, param, oldInfo, newInfo) {
        if (oldInfo.data["ANSWER_RESULT"] != null || newInfo.data["ANSWER_RESULT"] == null) {
            return;
        }
        var newResult = newInfo.data["ANSWER_RESULT"] || false; //默认是false
        if (param["correct"] && newResult == true) {
            var list = param["correct"];
            return TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOWUP_DIALOG](taskId, list);
        }
        else if (param["incorrect"] && newResult == false) {
            var list = param["incorrect"];
            return TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMON_SHOWUP_DIALOG](taskId, list);
        }
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_UPDATE_ANSWER_QUESTION] = answerQuestionDialog;
    function collectOn(taskId, param, oldInfo, newInfo) {
        var entryId = tonumber(newInfo.finish[taskField.FIELD_FINISH_FINDNPC_COUNT][0]);
        var count = newInfo.finish[taskField.FIELD_FINISH_FINDNPC_COUNT][1];
        var curNum = newInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT] != null && newInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT][entryId] || 0;
        var preNum = oldInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT] != null && oldInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT][entryId] || 0;
        if (curNum <= preNum || curNum >= count) {
            return;
        }
        return TaskExecutor.getInstance().executeLink(param);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_UPDATE_COLLECT_ON] = collectOn;
    function collectTips(taskId, param, oldInfo, newInfo) {
        var entryId = tonumber(newInfo.finish[taskField.FIELD_FINISH_FINDNPC_COUNT][0]);
        var count = newInfo.finish[taskField.FIELD_FINISH_FINDNPC_COUNT][1];
        var curNum = newInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT] != null && newInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT][entryId] || 0;
        var preNum = oldInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT] != null && oldInfo.data[taskField.FIELD_FINISH_FINDNPC_COUNT][entryId] || 0;
        if (curNum <= preNum || curNum >= count) {
            return;
        }
        MsgSystem.selectShowHandle(param[0], param[1]);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_UPDATE_COLLECT_TIPS] = collectTips;
    //服务器响应完成任务
    //function showDialog( taskId, param){
    //	TaskDialogue.getInstance().showDramaState(param[1], param[0], param[2])
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_COMMITTASKFINISH_SHOW_DIALOG] = showDialog
    function acceptTask(taskId, param) {
        // if (type(param) == "string") {
        // 	param = GetStringSplitBySchool(param, GetHeroProperty("race"), 3)
        // }
        var message = GetMessage(opCodes.C2G_TASK_ACCEPT);
        message.npcId = 0;
        message.taskId = param;
        SendGameMessage(message);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_COMMITTASKFINISH_ACCEPT_TASK] = acceptTask;
    //function acceptTypeTask( taskId, param){
    //	let message = GetMessage(opCodes.C2G_TASK_APPLY)
    //	message.npcId	= 0
    //	message.taskType = param
    //	SendGameMessage(message)
    //}
    //TaskListenHandle[TaskListenDefine.FIELD_COMMITTASKFINISH_ACCEPT_TYPETASK] = acceptTypeTask
    //任务战斗结束（暂时只有战败才有相应）
    function openDialogue(taskId, param, args) {
        taskId = args.taskId;
        var npcId = args.npcId;
        var npcEntryId = param[1];
        var npc = ActorManager.getInstance().getNpc(npcId);
        if (npc) {
            npcEntryId = npc.getEntryId();
        }
        TaskDialogue.getInstance().showDramaState(param[0] == 0 && taskId || param[0], npcEntryId, param[2]);
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_SPECIALHANDLER_OPENDIA] = openDialogue;
    //打开邀请回顾窗口
    function openInviteReviewFrame(taskId, param) {
        var wnd = WngMrg.getInstance().getWindow("PetInviteReviewFrame");
        wnd.setLastTask(taskId);
        wnd.showReviewFrame();
    }
    TaskListenSpace.TaskListenHandle[TaskListenDefine.FIELD_PET_INVITE_REVIEW_HANDLE] = openInviteReviewFrame;
})(TaskListenSpace || (TaskListenSpace = {}));
//# sourceMappingURL=TaskListener.js.map