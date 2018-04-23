/*
作者:
    liuziming
    
创建时间：
   2013.10.28(周一)

意图：
  NPC对话逻辑控制
    接受TaskDialogue管理的窗口必须提供接口
        updateDialog( sayerId, content, functionRef, list){
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
var TaskDialogue = (function (_super) {
    __extends(TaskDialogue, _super);
    function TaskDialogue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //flag:number;
    //optionList:any[]
    TaskDialogue.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.initDialogueData();
        this.saveDate = {};
    };
    TaskDialogue.prototype.destory = function () {
    };
    ////////////////////////////////////////////////////////////////////////
    TaskDialogue.prototype.initDialogueData = function () {
        // this.dialogueFrame =[]
        // let str: any = [ "TaskDialogFrame", "TaskDialogFrame","TaskDialogFrame"]
        // for (let _ = 0; _ < str.length; _++) {
        // 	let v = str[_]
        // 	let window = WngMrg.getInstance().getWindow(v)
        // 	if (!window) {
        // 		TLog.Warn("TaskDialogue.initDialogueData the window: %s is ! exist!", v)
        // 	}
        // 	window.loadWnd()
        // 	JsUtil.arrayInstert(this.dialogueFrame, window)
        // }
        var window = WngMrg.getInstance().getWindow("TaskDialogFrame");
        window.loadWnd();
        this.entryId = -1;
        this.npcId = -1;
        this.curWindow = window;
        //this.curIndex = 0						//10表示关闭状态
        //this.jumpData = {}
    };
    TaskDialogue.prototype.showDramaState = function (talkId, entryId, nodeId) {
        // 	//if(HeroIsTeamMemNotAway() ){
        // 	//	return
        // 	//}
        nodeId = checkNull(nodeId, 1);
        if (type(entryId) == "number") {
            this.entryId = entryId;
        }
        else if (type(entryId) != "") {
            this.entryId = tonumber(GetStringSplitBySchool(entryId));
        }
        if (type(talkId) == "number") {
        }
        else {
            talkId = tonumber(GetStringSplitBySchool(talkId));
        }
        var npc = ActorManager.getInstance().getNpcWithEntryId(entryId);
        if (npc) {
            this.npcId = npc.getId();
        }
        // 	//this.curIndex = 2
        this.recive_npc_talk(talkId, nodeId);
    };
    TaskDialogue.prototype.onDialogTranslateWord = function (args) {
        // tolua.cast(args, "gui::GUITranslateWordEvent")
        var word = args.getTranslateWord();
        args.setTranslateWord(TaskExecutor.getInstance().executeGetReplaceWord(word, 0));
    };
    ////////////////////////////////////////////////////////////////////////////////
    //对话逻辑
    ////////////////////////////////////////////////////////////////////////////////
    TaskDialogue.prototype.talkWithNpc = function (npcId, entryId) {
        // if (this.curWindow.isVisible() ){
        // 	this.inLastDialog = true
        // }
        this.closeCallback = null;
        this.callbackObj = null;
        var npc = ActorManager.getInstance().getNpc(npcId);
        var npcInfo = null;
        if (npc) {
            npcInfo = npc.getPropertyInfo();
        }
        if (npcInfo && npcInfo.param[opNPCOptions.BATTLE] && npcInfo.param[opNPCOptions.BATTLE] != 0) {
            //MsgSystem.ConfirmDialog_YES(Localize_cns("NPC_FIGHTING"))
            MsgSystem.addTagTips(Localize_cns("NPC_FIGHTING"));
        }
        // if(!CheckHeroCanGo() ){
        // 	return
        // }
        //this.resetData()		//刷新一下状态，避免队伍状态下的冲突
        var npcObject = ActorManager.getInstance().getNpc(npcId);
        if (npcObject == null) {
            //TLog.Error("TaskDialogue.talkWithNpc npcID:%s ! exsit", tostring(npcId))
            //return
        }
        else {
            entryId = npcObject.getEntryId();
        }
        var npcRef = ActorManager.getInstance().getNpcRefWithEntryId(entryId);
        if (npcRef == null) {
            TLog.Error("TaskDialogue.talkWithNpc entryID:%s ! exsit", tostring(entryId));
            return;
        }
        if (npcRef.talkInTeam == 1 && HeroIsCaptain()) {
            var message = GetMessage(opCodes.C2G_TASK_TEAM_TALK);
            message.npcId = npcId;
            SendGameMessage(message);
        }
        this.npcId = checkNull(npcId, -1); //NPC实例ID
        this.entryId = entryId; //Npc配置ID
        var _a = this.getOpTalkList(entryId), opList = _a[0], opStatusList = _a[1];
        var _b = TaskSystem.getInstance().getTaskTalkList(entryId), taskList = _b[0], taskStatusList = _b[1];
        //彩蛋检查
        // let [bEasterEgg, newDiscribe] = EasterEggSystem.getInstance().showEasterEggDialog(EasterEggTypeList.FIELD_NPC_TALK, entryId)
        // if(bEasterEgg && newDiscribe != null ){
        // 	// let box_info = GameConfig.DialogBoxConfig[opList[0]][DIALOG_FUNCTION_NODEID]
        // 	// let talkNpcId = tonumber( box_info.NpcIds)
        // 	// talkNpcId = TaskSystem.getInstance().getCommitTaskNpc(talkNpcId, -1)
        // 	let tlist:any = []
        // 	this.insertCloseInst(tlist)
        // 	this.adjustDialogBox(tlist, this.on_func_list_click, newDiscribe, entryId, OptionType.none)
        // 	return
        // }
        var taskSystem = TaskSystem.getInstance();
        TLog.Debug(String.format("talkWithNpc opList.length == %d && taskList.length == %d ){", size_t(opList), size_t(taskList)));
        //this.changeDialogFrame(2)
        if (opList.length == 1 && taskList.length == 0) {
            var op = opList[0];
            var talkRef = GameConfig.DialogBoxConfig[op][DIALOG_FUNCTION_NODEID];
            //如果功能对话结点有DIALOG_FUNCTION_NODEID对话点，而且跳转不为0
            var go = talkRef.NextNode1[0];
            if (go != 0 || talkRef.type == 1) {
                this.recive_npc_talk(op, DIALOG_FUNCTION_NODEID);
                return;
            }
        }
        var tlist = [];
        if (taskList.length == 1) {
            this.recive_npc_talk(taskList[0], this.getTaskStartNode(taskList[0], entryId));
        }
        else if (opList.length > 0 || taskList.length > 1) {
            //任务列表
            for (var i = 0; i < taskList.length; i++) {
                var taskId = taskList[i];
                var t = {};
                t.args = [taskId, this.getTaskStartNode(taskId, entryId)];
                t.title = taskSystem.getTaskName(taskId);
                t.status = taskStatusList[i]; //如果有状态，就有值
                t.opType = OpType.task;
                JsUtil.arrayInstert(tlist, t);
            }
            //功能对话列表
            for (var i = 0; i < opList.length; i++) {
                var taskId = opList[i];
                var talkRef = GameConfig.DialogBoxConfig[taskId][DIALOG_FUNCTION_NODEID];
                var t = {};
                t.args = [taskId, DIALOG_FUNCTION_NODEID];
                t.title = talkRef.Option1;
                t.status = opStatusList[i]; //如果有状态，就有值
                t.opType = OpType.func;
                JsUtil.arrayInstert(tlist, t);
            }
            //关闭指令
            this.insertCloseInst(tlist);
            this.adjustDialogBox(tlist, this.on_func_list_click, npcRef.discribe, entryId, OptionType.special);
            // } else if (taskList.length == 1) {																		// 无功能，只有一个任务
            // 	this.recive_npc_talk(taskList[0], this.getTaskStartNode(taskList[0], entryId))
        }
        else {
            var tlist_1 = [];
            this.insertCloseInst(tlist_1);
            if (npcRef.discribe && npcRef.discribe != "") {
                this.adjustDialogBox(tlist_1, this.on_func_list_click, npcRef.discribe, entryId, OptionType.none); //木有功能列表
            }
        }
    };
    TaskDialogue.prototype.showWithTaskId = function (taskId, closeCallback, thisObj) {
        this.npcId = -1; //NPC实例ID
        this.closeCallback = closeCallback;
        this.callbackObj = thisObj;
        var taskRef = TaskSystem.getInstance().getTaskRef(taskId);
        var taskNpcId = tonumber(taskRef.NpcIds); //当前是领取任务的NPC
        this.entryId = taskNpcId; //Npc配置ID
        this.recive_npc_talk(taskId, this.getTaskStartNode(taskId, taskNpcId));
    };
    TaskDialogue.prototype.getOpTalkList = function (npcEntryId) {
        //1.获取NPC对话节点
        var npcRef = ActorManager.getInstance().getNpcRefWithEntryId(npcEntryId);
        var taskSystem = TaskSystem.getInstance();
        //检查谈话节点是不是可以显示的
        var talkOpList = [];
        var statusList = [];
        for (var _ = 0; _ < npcRef.talkOpList.length; _++) {
            var taskId = npcRef.talkOpList[_];
            var dialogRef = GameConfig.DialogBoxConfig[taskId];
            if (dialogRef && dialogRef[DIALOG_FUNCTION_NODEID]) {
                var talkRef = dialogRef[DIALOG_FUNCTION_NODEID];
                var ret = TaskChecker.getInstance().checkOpList(talkRef.Show, true); //如果可以显示，显示
                if (ret) {
                    JsUtil.arrayInstert(talkOpList, taskId);
                    var status_1 = TaskStatus.NONE;
                    if (GameConfig.TaskAcceptNpcConfig[npcEntryId]) {
                        if (!taskSystem.isAccpetTaskTalk(taskId, npcEntryId)) {
                            JsUtil.arrayRemove(talkOpList);
                        }
                        else {
                            status_1 = TaskStatus.ACCPET;
                        }
                    }
                    if (table_isExsit(talkOpList, taskId)) {
                        JsUtil.arrayInstert(statusList, status_1);
                    }
                }
            }
        }
        return [talkOpList, statusList];
    };
    //找到对话的开始节点
    TaskDialogue.prototype.getTaskStartNode = function (taskId, npcEntryId) {
        var nodeId = 10000;
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var isFinish = TaskSystem.getInstance().isTaskFinish(taskId);
        TLog.Debug("TaskDialogue.getTaskStartNode the npc is:", npcEntryId);
        //找到对话的最顶结点
        if (GameConfig.DialogBoxConfig[taskId]) {
            for (var _k in GameConfig.DialogBoxConfig[taskId]) {
                var k = tonumber(_k);
                var v = GameConfig.DialogBoxConfig[taskId][k];
                var talkNpcId = tonumber(GetStringSplitBySchool(v.NpcIds));
                talkNpcId = TaskSystem.getInstance().getCommitTaskNpc(talkNpcId, taskId);
                if (npcEntryId == talkNpcId && k < nodeId) {
                    nodeId = k;
                }
            }
            //找不到nodeId,仍保留原值
            if (nodeId == 10000) {
                for (var _k in GameConfig.DialogBoxConfig[taskId]) {
                    var k = tonumber(_k);
                    var v = GameConfig.DialogBoxConfig[taskId][k];
                    if (v.NpcIds == "" && k < nodeId) {
                        nodeId = k;
                    }
                }
            }
        }
        return nodeId;
    };
    TaskDialogue.prototype.executeDialogOp = function (taskId, nodeId, index) {
        var talkRef = GameConfig.DialogBoxConfig[taskId][nodeId];
        var op_table = talkRef["Operation" + index]; //处理指令
        if (op_table == null) {
            return;
        }
        var operation = op_table[0] || 0;
        var param = op_table['param'];
        if (operation != 0) {
            TLog.Debug("TaskDialogue.executeDialogOp GameConfig.DialogBoxConfig[%d][%d][Operation%d] operation:%s", taskId, nodeId, index, operation);
            return TaskExecutor.getInstance().executeNpcDialogOp(operation, this.npcId, taskId, nodeId, param);
        }
    };
    TaskDialogue.prototype.getJumpTalkNode = function (taskId, nodeId, index) {
        var talkRef = GameConfig.DialogBoxConfig[taskId][nodeId];
        var option = talkRef["NextNode" + index];
        var go = 0;
        if (option != null) {
            for (var i = 0; i < option.length; i++) {
                var isFix = true;
                if (type(option[i]) == "object") {
                    //TLog.Debug("go:", option[i][0], "cond:", option[i][1])
                    go = option[i][0];
                    if (option[i][1]) {
                        isFix = TaskChecker.getInstance().checkOpList(option[i][1], false); //跳转检查
                    }
                }
                else {
                    go = option[i];
                }
                if (isFix) {
                    break;
                }
            }
        }
        TLog.Debug("TaskDialogue.getJumpTalkNode GameConfig.DialogBoxConfig[%d][%d][NextNode%d] go:%d", taskId, nodeId, index, go);
        return go;
    };
    TaskDialogue.prototype.closeFrame = function () {
        if (this.closeCallback) {
            DelayEvecuteFunc(0, this.closeCallback, this.callbackObj);
            //this.closeCallback.call(this.callbackObj)
            this.closeCallback = null;
            this.callbackObj = null;
        }
        //this.resetData()
        this.curWindow.hideWnd();
        //return FireEvent(EventDefine.TASK_DIALOG_TRANSFORM, TaskDialogEvent.newObj(10))
    };
    TaskDialogue.prototype.recive_npc_talk = function (taskId, nodeId) {
        //TLog.Debug("TaskDialogue.recive_npc_talk==================", taskId, nodeId, oldNodeId)
        if (nodeId == DIALOG_NOJUMP_NODEID) {
            return;
        }
        if (nodeId == 0) {
            // if (!this.inLastDialog) {
            // 	return this.closeFrame()
            // } else {
            // 	this.inLastDialog = false
            // 	return
            // }
            this.closeFrame();
            return;
        }
        //第一步检测
        var dialogRef = GameConfig.DialogBoxConfig[taskId];
        if (dialogRef == null) {
            TLog.Error("TaskDialogue.recive_npc_talk GameConfig.DialogBoxConfig[%s] ! exsit", tostring(taskId));
            return;
        }
        //第二步检测
        var talkRef = dialogRef[nodeId];
        if (talkRef == null) {
            TLog.Error("TaskDialogue.recive_npc_talk GameConfig.DialogBoxConfig[%s][%s] ! exsit", tostring(taskId), tostring(nodeId));
            return;
        }
        if (talkRef.type == 1) {
            this.executeDialogOp(taskId, nodeId, 1);
            var go = this.getJumpTalkNode(taskId, nodeId, 1);
            this.recive_npc_talk(taskId, go);
            return;
        }
        if (nodeId == -1) {
            this.refresh_dialog_box(taskId, nodeId, true);
        }
        else {
            this.refresh_dialog_box(taskId, nodeId);
        }
    };
    //////////////////////////刷新对话框
    TaskDialogue.prototype.refresh_dialog_box = function (taskId, nodeId, isFunc) {
        var box_info = GameConfig.DialogBoxConfig[taskId][nodeId];
        var flag = checkNull(isFunc, false);
        //table_TLog.Debug(box_info)
        //io.read()
        //插入对话内容
        var tlist = [];
        //若表单中的Option..i中含有内容
        //根据表单,设置选项的数量和title
        for (var i = 1; i <= DIALOG_OPTION_MAX_COUNT; i++) {
            if (box_info["Option" + tostring(i)]) {
                //title是表单中Option1
                var title = GetStringSplitBySchool(box_info["Option" + tostring(i)], GetHeroProperty("race"), 3);
                // if ((title == Localize_cns("Role_school_qingyimen") && GetHeroProperty("sexId") != 1) || (title == Localize_cns("Role_school_moyundong") && GetHeroProperty("sex") != 2)) {
                // 	title = null
                // }
                //如果不为空
                //if (title && string_util.check_blank_connet(title)) {
                if (title != "") {
                    var t = {};
                    //任务id,对话节点,计数
                    t.args = [taskId, nodeId, i];
                    t.title = title;
                    t.status = TaskStatus.NONE; //如果有状态，就有值
                    if (flag) {
                        t.opType = OpType.func;
                    }
                    else {
                        t.opType = OpType.normal;
                    }
                    JsUtil.arrayInstert(tlist, t);
                }
            }
        }
        TLog.Debug("TaskDialogue.refresh_dialog_box btnlist: %d", tlist.length);
        //! used
        var frameType = box_info.frametype - 1;
        //this.changeDialogFrame(frameType)
        //没有选项
        if (tlist.length == 0) {
            var defaultOp = {};
            defaultOp.args = [taskId, nodeId];
            tlist.push(defaultOp);
            //this.setJumpData([ taskId, nodeId ] )
            //通知TaskDialogFrame
            //this.curWindow.setFrameJumpData([ taskId, nodeId ])
        }
        else {
            //插入关闭按钮title,保持结构
            this.insertCloseInst(tlist);
        }
        var talkNpcId = tonumber(GetStringSplitBySchool(box_info.NpcIds, GetHeroProperty("school"), 12));
        talkNpcId = TaskSystem.getInstance().getCommitTaskNpc(talkNpcId, taskId);
        this.adjustDialogBox(tlist, this.on_option_btn_click, box_info.Content, talkNpcId, OptionType.normal);
    };
    TaskDialogue.prototype.getChoiceData = function (args) {
        //tolua.cast(args, "gui::GUIMouseEvent")
        if (this.npcId != -1 && this.entryId != -1) {
            var npc = ActorManager.getInstance().getNpc(this.npcId);
            if (npc == null) {
                var npcRef = ActorManager.getInstance().getNpcRefWithEntryId(this.entryId);
                //MsgSystem.addTagTips(String.format(Localize_cns("TEAM_DIALOG_FARAWAYNPC"), npcRef.name))
                return [true, 0, 0, 0];
            }
        }
        // let data = this.jumpData[this.curIndex][tostring(args.window)]
        //TLog.Debug("33333333333333333333333", args.window.GetName())
        var data = args;
        var taskId = data[0];
        var nodeId = data[1];
        var index = checkNull(data[2], 1); //功能按钮的跳转，以NextNode1跳转
        var npcId = data["npcId"];
        return [true, taskId, nodeId, index, npcId];
    };
    //点击选项回调
    TaskDialogue.prototype.on_func_list_click = function (args) {
        var _a = this.getChoiceData(args), flag = _a[0], taskId = _a[1], nodeId = _a[2], index = _a[3];
        if (!flag) {
            return;
        }
        if (StateManager.getInstance().GetCurrentStateType() == state_type.LIVE_STORY_STATE) {
            MovieSystem.getInstance().endPlay();
        }
        if (taskId == 0 && nodeId == 0) {
            this.recive_npc_talk(taskId, 0); //关闭
            return;
        }
        if (nodeId == DIALOG_FUNCTION_NODEID) {
            this.onHandleClickEvent(taskId, nodeId, index);
            return;
        }
        this.recive_npc_talk(taskId, nodeId);
    };
    //点击选项回调
    TaskDialogue.prototype.on_option_btn_click = function (args) {
        var _a = this.getChoiceData(args), flag = _a[0], taskId = _a[1], nodeId = _a[2], index = _a[3];
        //TLog.Debug("on_option_btn_click", flag, taskId, nodeId)
        if (!flag) {
            return;
        }
        if (StateManager.getInstance().GetCurrentStateType() == state_type.LIVE_STORY_STATE) {
            MovieSystem.getInstance().endPlay();
        }
        if (taskId == 0 && nodeId == 0) {
            this.recive_npc_talk(taskId, 0);
            return;
        }
        //TLog.Debug("1")
        //执行当前对话点指令
        //TLog.Debug("on_option_btn_click taskId:%d, nodeId:%d index:%d", taskId, nodeId, index)
        this.onShowTimer();
        if (this.saveDate.showTimer == null) {
            this.saveDate.showTimer = SetTimer(this.onShowTimer, this, 1);
            this.saveDate.taskId = taskId;
            this.saveDate.nodeId = nodeId;
            this.saveDate.index = index;
        }
    };
    TaskDialogue.prototype.onShowTimer = function (dt) {
        if (this.saveDate.showTimer) {
            KillTimer(this.saveDate.showTimer);
            this.saveDate.showTimer = null;
            var taskId = this.saveDate.taskId;
            var nodeId = this.saveDate.nodeId;
            var index = this.saveDate.index;
            this.onHandleClickEvent(taskId, nodeId, index);
            this.saveDate = {};
        }
    };
    // onClickDialog(args) {
    // 	//TLog.Debug(" TaskDialogue.onClickDialog: size of this.jumpData:%d", this.jumpData.length)
    // 	let [flag, taskId, nodeId, index, npcId] = this.getChoiceData(args)
    // 	if (!flag) {
    // 		return
    // 	}
    // 	if (taskId == 0 && nodeId == 0) {
    // 		this.recive_npc_talk(taskId, 0)
    // 		return
    // 	}
    // 	this.npcId = npcId || this.npcId
    // 	this.onHandleClickEvent(taskId, nodeId, index)
    // }
    TaskDialogue.prototype.onHandleClickEvent = function (taskId, nodeId, index) {
        this.executeDialogOp(taskId, nodeId, index);
        var go = this.getJumpTalkNode(taskId, nodeId, index);
        return this.recive_npc_talk(taskId, go);
    };
    // changeDialogFrame(index) {
    // 	this.curIndex = index
    // 	//if(index % 2 == 0 ){									//剧情对话的两种模式选择2为上空白下黑、4为上限均由黑边
    // 	//	this.dialogueFrame[this.curIndex]:setAppearState(index)
    // 	//}
    // 	this.curWindow = this.dialogueFrame[this.curIndex]
    // 	//FireEvent(EventDefine.TASK_DIALOG_TRANSFORM, TaskDialogEvent.newObj(this.curIndex))
    // }
    TaskDialogue.prototype.adjustDialogBox = function (list, functionRef, content, entryId, flag) {
        //this.flag = flag
        if (!entryId || entryId == "") {
            var npc = ActorManager.getInstance().getNpc(this.npcId);
            if (npc) {
                entryId = npc.getProperty("entryId");
            }
            else {
                entryId = this.entryId;
            }
        }
        //更新NPC名字
        //this.optionList = []
        //调用TaskDialogFrame.updateDialog
        //FireEvent(EventDefine.TASK_DIALOG_TRANSFORM, TaskDialogEvent.newObj(this.curIndex))
        this.curWindow.updateDialog(entryId, content, list, this.npcId, functionRef, this);
        // if (size_t(this.optionList) != 0) {
        // 	if (entryId) {
        // 		TLog.Debug(String.format("TaskOptionActive +The npcEntryId is : %d, opType: %d, talkId: %d, nodeId: %d", entryId, flag, list[0].args[0], list[0].args[0]))
        // 	}
        // 	FireEvent(EventDefine.TASK_OPTION_ACTIVE, TaskOptionEvent.newObj(this.optionList, this.entryId, [ this.flag, list[0].args[0], list[0].args[0] ]))   //选项列表，npcEntryId，{选项组类型，talkId，nodeId}
        // }
    };
    // addOption(opBtn, index, oArgs) {
    // 	if (this.flag == OptionType.normal) {
    // 		opBtn.index = index
    // 	} else {
    // 		opBtn.index = oArgs
    // 	}
    // 	JsUtil.arrayInstert(this.optionList, opBtn)
    // }
    // resetData() {
    // 	//this.curWindow = null
    // 	//this.curIndex = 10
    // 	this.jumpData = null
    // }
    // setJumpData(args) {
    // 	this.jumpData = args;
    // }
    TaskDialogue.prototype.insertCloseInst = function (list) {
        var t = {};
        t.args = [0, 0];
        t.title = Localize_cns("TASK_DIALOG_GUANBI");
        JsUtil.arrayInstert(list, t);
    };
    return TaskDialogue;
}(TClass));
__reflect(TaskDialogue.prototype, "TaskDialogue");
//# sourceMappingURL=TaskDialogue.js.map