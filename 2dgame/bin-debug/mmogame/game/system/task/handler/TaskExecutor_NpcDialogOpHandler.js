/*
作者:
    yangguiming
    
创建时间：
   2013.6.29(周六)

意图：
   执行对话框的指令

公共接口：
   
*/
ImportType(DialogOpDefine);
var TaskDialogOpSpace;
(function (TaskDialogOpSpace) {
    function saveTalkNode(npcId, talkId, nodeId, param) {
        //TLog.Warn("saveTalkNode Deprecated...")
        var message = GetMessage(opCodes.C2G_TASK_NODE);
        message.npcId = npcId;
        message.taskId = talkId;
        message.nodeId = nodeId;
        SendGameMessage(message);
    }
    function commitTask(npcId, talkId, nodeId, param) {
        TaskSystem.getInstance().commitTask(npcId, param || talkId);
    }
    function startFight(npcId, talkId, nodeId, param) {
        var entryId = 0;
        var npc = ActorManager.getInstance().getNpc(npcId);
        if (npc != null) {
            entryId = npc.getEntryId();
        }
        function callback(args) {
            var message = GetMessage(opCodes.C2G_TASK_FIGHT);
            message.npcId = entryId;
            message.taskId = param || talkId;
            SendGameMessage(message);
            FireEvent(EventDefine.TASK_DIALOGOP, TaskOpEvent.newObj(talkId, DialogOpDefine.FIELD_START_FIGHT, nodeId));
        }
        if (HeroIsInTeam() == false) {
            if (CampaignSystem.getInstance().isExsitArray(BattleQueueType.Campaign)) {
                var wnd = WngMrg.getInstance().getWindow("CommonEmbattleFrame");
                wnd.showWithListener({}, callback, null, BattleQueueType.Campaign);
            }
        }
        else {
            if (HeroIsCaptain() == true) {
                var wnd = WngMrg.getInstance().getWindow("CommonEmbattleTeamFrame");
                wnd.showCommonEmbattleTeamFrame(callback, {}, {});
            }
            else {
                MsgSystem.addTagTips(Localize_cns("TEAM_TXT34"));
            }
        }
    }
    function findNpc(npcId, talkId, nodeId, param) {
        var npcInfo = ActorManager.getInstance().getNpc(npcId);
        if (!npcInfo) {
            return;
        }
        var message = GetMessage(opCodes.C2G_TASK_NPC);
        message.npcId = npcInfo.entryId;
        message.taskId = talkId;
        SendGameMessage(message);
    }
    function cancelTask(npcId, talkId, nodeId, param) {
        TaskSystem.getInstance().cancelTask(param || talkId);
    }
    function applyBranchTask(npcId, talkId, nodeId, param) {
        var taskTypeRef = GameConfig.TaskConfig[param];
        if (taskTypeRef) {
            var canAccept = TaskChecker.getInstance().checkOpList(taskTypeRef.Accept, true);
            if (!canAccept) {
                return;
            }
        }
        npcId = npcId < 0 ? 0 : npcId;
        var message = GetMessage(opCodes.C2G_TASK_APPLY);
        message.npcId = npcId;
        message.taskType = param;
        SendGameMessage(message);
    }
    function applyActivity(npcId, talkId, nodeId, param) {
        var message = GetMessage(opCodes.C2G_TASK_APPLY_ACTIVITY);
        message.npcId = npcId;
        message.activityId = param;
        message.activityType = TaskSystem.getInstance().getTaskType(message.activityId);
        SendGameMessage(message);
    }
    function clickBubbleNpc(npcId, talkId, nodeId, param) {
        var message = GetMessage(opCodes.C2G_CLICK_JINGYANPAOPAO);
        message.npcId = npcId;
        SendGameMessage(message);
    }
    function clickCurNpc(npcId, talkId, nodeId, param) {
        Task_ShowNpcDialogWithNpc(npcId);
    }
    function playMovie(npcId, talkId, nodeId, param) {
        if (param == null || param == "") {
            return;
        }
        MovieSystem.getInstance().beginPlay(param);
    }
    function beginClientFight(npcId, talkId, nodeId, param) {
        FightSystem.getInstance().showClientFight(param);
    }
    function exeMainFunction(npcId, talkId, nodeId, param) {
        TLog.Debug("exeMainFunction", param);
        ExecuteMainFrameFunction(param || "");
    }
    function hideWindow(npcId, talkId, nodeId, param) {
        param = param || [];
        for (var _ in param) {
            var name_1 = param[_];
            WngMrg.getInstance().hideWindow(name_1);
        }
    }
    function collectTask(npcId, talkId, nodeId, param) {
        var wnd = WngMrg.getInstance().getWindow("ClubMapFrame");
        if (wnd.isVisible()) {
            wnd.startAnim();
        }
    }
    function instrusionTask(npcId, talkId, nodeId, param) {
        RpcProxy.call("C2G_FactionMapTaskFinishOnce", 2);
    }
    TaskDialogOpSpace.DialogOpHandler = (_a = {},
        _a[DialogOpDefine.FIELD_SAVE_NODE] = saveTalkNode,
        _a[DialogOpDefine.FIELD_COMMIT_TASK] = commitTask,
        _a[DialogOpDefine.FIELD_START_FIGHT] = startFight,
        _a[DialogOpDefine.FIELD_FIND_NPC] = findNpc,
        _a[DialogOpDefine.FIELD_CANCEL_TASK] = cancelTask,
        _a[DialogOpDefine.FIELD_APPLY_TASk] = applyBranchTask,
        _a[DialogOpDefine.FIELD_CLUB_MAP_COLLECT_TASK] = collectTask,
        _a[DialogOpDefine.FIELD_CLUB_MAP_INSTRUSION_TASK] = instrusionTask,
        _a[DialogOpDefine.FIELD_CLIENT_FIGHT] = beginClientFight,
        _a[DialogOpDefine.FIELD_HIDE_FRAME] = hideWindow,
        _a);
    var _a;
})(TaskDialogOpSpace || (TaskDialogOpSpace = {}));
//# sourceMappingURL=TaskExecutor_NpcDialogOpHandler.js.map