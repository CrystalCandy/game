// TypeScript file
var RpcLogic;
(function (RpcLogic) {
    function G2C_TaskList(taskInfoList) {
        for (var i in taskInfoList) {
            var taskInfo = taskInfoList[i];
            var task = Task.newObj(taskInfo);
            TaskSystem.getInstance().addTask(task);
        }
        FireEvent(EventDefine.TASK_UPDATELIST, null);
    }
    RpcLogic.G2C_TaskList = G2C_TaskList;
    function G2C_TaskAccept(taskInfo) {
        var task = Task.newObj(taskInfo);
        TaskSystem.getInstance().addTask(task);
        FireEvent(EventDefine.TASK_ACCPET, TaskEvent.newObj(taskInfo.taskId));
        FireEvent(EventDefine.TASK_UPDATELIST, null);
    }
    RpcLogic.G2C_TaskAccept = G2C_TaskAccept;
    function G2C_TaskUpdate(taskInfo) {
        var task = Task.newObj(taskInfo);
        TaskSystem.getInstance().updateTask([task]);
    }
    RpcLogic.G2C_TaskUpdate = G2C_TaskUpdate;
    function G2C_TaskFinish(taskId) {
        TaskSystem.getInstance().updateFinishTaskList(taskId);
        TaskSystem.getInstance().removeTask(taskId);
        //CommandManager.getInstance().clear()
        FireEvent(EventDefine.TASK_COMMIT_FINISH, TaskEvent.newObj(taskId));
    }
    RpcLogic.G2C_TaskFinish = G2C_TaskFinish;
    //关卡--通关列表
    function G2C_CampaginRecord(campList) {
        CampaignSystem.getInstance().initFinishCampaignList(campList);
    }
    RpcLogic.G2C_CampaginRecord = G2C_CampaginRecord;
    //关卡--记录
    function G2C_CurCampaginInfo(campId, mine) {
        CampaignSystem.getInstance().setCampaignInfo(campId, mine);
        FireEvent(EventDefine.CAMPAIGN_MINE, null);
    }
    RpcLogic.G2C_CurCampaginInfo = G2C_CurCampaginInfo;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcTask.js.map