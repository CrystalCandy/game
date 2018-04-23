/*
作者:
    yangguiming
    
创建时间：
   2013.7.02(周二)

意图：
   检查子任务需要更新

公共接口：
   
*/
ImportType(ClientTaskField);
var TaskSubUpdateSpace;
(function (TaskSubUpdateSpace) {
    function getCountHelper(getType, entryId) {
        var count = 0;
        if (getType == "item") {
            //count = ItemSystem.GetItemTotalNum(entryId, storeOptions.PACKET) //现在的收集
            var itemList = ItemSystem.getInstance().getItemLogicInfoListByEntry(entryId, storeOptions.PACKET);
            for (var i in itemList) {
                var v = itemList[i];
                count = count + v.getProperty("count") || 0;
            }
        }
        else if (getType == "pet") {
            count = PetSystem.getInstance().getTaskPetCount(entryId);
        }
        return count;
    }
    function subTaskUpdateHelper(deal_index, getType, autoUpdate) {
        var bUpdate = false;
        var taskList = TaskSystem.getInstance().getTaskList();
        for (var taskId in taskList) {
            var task = taskList[taskId];
            var taskInfo = task.getPropertyInfo();
            if (taskInfo.init[taskField.FIELD_INIT_FINDNPC_GETITEM] && !taskInfo.init[taskField.FIELD_INIT_FINDNPC_GETITEM]["inPacket"]) {
            }
            else {
                if (taskInfo.finish && taskInfo.finish[deal_index]) {
                    var subTaskData = taskInfo.data[deal_index] || {};
                    var isFinish = task.isFinish(); //更新前,任务是否已经完成了
                    var bchanged = false;
                    for (var entryId in taskInfo.finish[deal_index]) {
                        var finishCount = taskInfo.finish[deal_index][entryId];
                        //取得需要收集的数量物品
                        var dataCount = subTaskData[entryId] || 0;
                        var curCount = getCountHelper(getType, entryId); //ItemSystem.GetItemTotalNum(itemId, storeOptions.PACKET) //现在的收集
                        if (dataCount != curCount) {
                            bchanged = true;
                        }
                        if (autoUpdate == true) {
                            subTaskData[entryId] = curCount;
                        }
                    }
                    taskInfo.data[deal_index] = subTaskData || taskInfo.data[deal_index];
                    //task.setPropertyInfo(taskInfo)
                    if (bUpdate == false && isFinish == false) {
                        bUpdate = bchanged;
                    }
                }
            }
        }
        return bUpdate;
    }
    function itemUpdate(index, autoUpdate) {
        return subTaskUpdateHelper(index, "item", autoUpdate);
    }
    function petUpdate(index, autoUpdate) {
        return subTaskUpdateHelper(index, "pet", autoUpdate);
    }
    function collectItemUpdate(index, autoUpdate) {
        var bUpdate = false;
        var taskList = TaskSystem.getInstance().getTaskList();
        for (var taskId in taskList) {
            var task = taskList[taskId];
            var taskInfo = task.getPropertyInfo();
            if (taskInfo.finish && taskInfo.finish[index]) {
                var subTaskData = taskInfo.data[index] || {};
                var isFinish = task.isFinish(); //更新前,任务是否已经完成了
                var bchanged = false;
                for (var entryId in taskInfo.finish[index]) {
                    var finishCount = taskInfo.finish[index][entryId];
                    //取得需要收集的数量物品
                    var dataCount = subTaskData[entryId] || 0;
                    var curCount = ItemSystem.getInstance().ItemCount(entryId); //现在的收集
                    if (dataCount != curCount) {
                        bchanged = true;
                    }
                    if (autoUpdate == true) {
                        subTaskData[entryId] = curCount;
                    }
                }
                taskInfo.data[index] = subTaskData || taskInfo.data[index];
                if (bUpdate == false && isFinish == false) {
                    bUpdate = bchanged;
                }
            }
        }
        return bUpdate;
    }
    TaskSubUpdateSpace.SubTaskUpdateHandler = (_a = {},
        _a[taskField.FIELD_FINISH_COLLECTPET] = petUpdate,
        _a[taskField.FIELD_FINISH_COLLECTITEM] = itemUpdate,
        _a[ClientTaskField.FIELD_FINISH_COLLECTITEM] = collectItemUpdate,
        _a);
    var _a;
})(TaskSubUpdateSpace || (TaskSubUpdateSpace = {}));
//# sourceMappingURL=TaskChecker_SubTaskUpdateHandler.js.map