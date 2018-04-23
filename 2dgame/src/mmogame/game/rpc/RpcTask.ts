// TypeScript file
module RpcLogic {
    export function G2C_TaskList(taskInfoList) {
        for (let i in taskInfoList) {
            let taskInfo = taskInfoList[i]
            let task = Task.newObj(taskInfo)
            TaskSystem.getInstance().addTask(task)
        }
        FireEvent(EventDefine.TASK_UPDATELIST, null)
    }

    export function G2C_TaskAccept(taskInfo) {
        let task = Task.newObj(taskInfo)
        TaskSystem.getInstance().addTask(task)
        FireEvent(EventDefine.TASK_ACCPET, TaskEvent.newObj(taskInfo.taskId))
        FireEvent(EventDefine.TASK_UPDATELIST, null)
    }

    export function G2C_TaskUpdate(taskInfo) {
        let task = Task.newObj(taskInfo)
        TaskSystem.getInstance().updateTask([task])
    }

    export function G2C_TaskFinish(taskId) {
        TaskSystem.getInstance().updateFinishTaskList(taskId)
        TaskSystem.getInstance().removeTask(taskId)

        //CommandManager.getInstance().clear()
        FireEvent(EventDefine.TASK_COMMIT_FINISH, TaskEvent.newObj(taskId))
    }

    //关卡--通关列表
    export function G2C_CampaginRecord(campList) {
        CampaignSystem.getInstance().initFinishCampaignList(campList)
    }

    //关卡--记录
    export function G2C_CurCampaginInfo(campId, mine) {
        CampaignSystem.getInstance().setCampaignInfo(campId, mine)
        FireEvent(EventDefine.CAMPAIGN_MINE, null)
    }

}