/*
作者:
    yangguiming
    
创建时间：
   2013.6.29(周六)

意图：
   任务执行器，对TaskExecutor_XXXXHandler的统一管理

公共接口：

    executeNpcDialogOp( op, npcId, talkId, nodeId, param){//执行对话框操作
    executeGetReplaceWord( name, param){	//获取被替代的字符串,param可能是taskId，可能是0，针对不同的替换字
    ////////////////////////////////////////////////////////////////////////////
    //任务追踪，返回xml
    getTraceListener( func, this_index, userData){//回调的管理器
    TaskExecutor.executeTraceTask = fucntion(this, taskId, listener)//任务跟踪
    executeTracePrize( taskId, listener){//任务奖励
    ////////////////////////////////////////////////////////////////////////////
    //任务超链接响应
  genTalkNpcLink( mapId, x, y, npcId){
    genStopLink( mapId, x, y, npcId){
    genAutoRunLink( mapId, x, y){
    genFarWayStopLink( mapId, x, y){
    
    executeLink( linkStr){
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
var TaskExecutor = (function (_super) {
    __extends(TaskExecutor, _super);
    function TaskExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskExecutor.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.schoolXunLuo = null
        this.interiorHandler = {};
        //RegisterEvent(EventDefine.HERO_ENTER_MAP, this.onEntryMap, this)
        RegisterEvent(EventDefine.TASK_FINISH, this.onTaskFinish, this);
    };
    TaskExecutor.prototype.destory = function () {
    };
    ////////////////////////////////////////////////////////////////////////////
    TaskExecutor.prototype.executeNpcDialogOp = function (op, npcId, talkId, nodeId, param) {
        this._executeNpcDialogOp(op, npcId, talkId, nodeId, param);
    };
    ////////////////////////////////////////////////////////////////////////////
    TaskExecutor.prototype.executeGetReplaceWord = function (word, param) {
        return this._executeGetReplaceWord(word, param);
    };
    ////////////////////////////////////////////////////////////////////////////
    TaskExecutor.prototype.getTraceListener = function (func, this_index, userData) {
        var listener = {};
        listener.func = func;
        listener.this_index = this_index;
        listener.userData = userData;
        return listener;
    };
    TaskExecutor.prototype.executeTraceTask = function (taskId, listener) {
        if (listener == null) {
            return false;
        }
        if (listener.func == null) {
            return false;
        }
        return this._excuteTaskTrace(taskId, listener);
    };
    TaskExecutor.prototype.executeTracePrize = function (taskId, listener) {
        if (listener == null) {
            return;
        }
        if (listener.func == null) {
            return;
        }
        this._executeTracePrize(taskId, listener);
    };
    ////////////////////////////////////////////////////////////////////////////
    //NPC谈话
    TaskExecutor.prototype.genTalkNpcLink = function (npcEntryId, taskId) {
        TLog.Debug("GenTalkNpcLink", npcEntryId, taskId);
        return String.format("%d;{%d,%d}", TaskLinkType.NPC_TALK, npcEntryId, taskId); //"1;{40000,41000}"
    };
    //站直
    //genStopLink( mapId, x, y, npcId){
    //	return String.format("%d;%d;%s(%d;%d)", mapId, TaskLinkType.STOP, "Stop", x, y)//"10007;4;Stop(60;60)"
    //}
    //自动遇怪
    TaskExecutor.prototype.genAutoRunLink = function (mapId, x, y) {
        return String.format("%d;{%d,%d,%d}", TaskLinkType.XUNLUO, mapId, x, y); //"5;{50000,120,20}"
    };
    //指定像素停止NPC
    //genFarWayStopLink( mapId, x, y){
    //	return String.format("%d;%d;%s(%d;%d)", mapId, TaskLinkType.FARWAY_STOP, "FarWayStop", x, y)//"10007;4;FarWayStop(60;60)"
    //}
    //设定内部回调索引
    TaskExecutor.prototype.getInteriorHandler = function (taskId, func, param) {
        this.interiorHandler[taskId] = [func, param];
        return String.format("%d;%d", TaskLinkType.EXECUTE_OPERATE, taskId);
    };
    ////////////////////////////////////////////////////////////////////////////////
    TaskExecutor.prototype.executeLink = function (linkStr) {
        TLog.Debug("TaskExecutor.executeLink %s", linkStr);
        var endPos = linkStr.indexOf(";");
        //let _, endPos = string.find(linkStr, ";")
        if (endPos == -1) {
            return;
        }
        var type = tonumber(linkStr.substring(0, endPos));
        var param = linkStr.substring(endPos + 1);
        var scope = NPCTALK_MIN_SCOPE; //寻路距离
        if (type == TaskLinkType.NPC_TALK) {
            var _a = StringUtil.stringMatch(param, /{(.+),(.+)}/), entryId = _a[0], taskId = _a[1];
            //自动寻路与npc对话
            //let entryId, taskId = string.match(param, "{(.+),(.+)}")
            entryId = tonumber(GetStringSplitBySchool(entryId));
            taskId = tonumber(taskId);
            Task_ShowNpcDialogWithEntry(entryId);
            // let [name, mapId, cellX, cellY] = TaskSystem.getInstance().getDynamicNpcName(taskId, entryId)
            // //Command_FindWayToTalkNpc(mapId, cellX, cellY, scope, entryId, null, {AutoActionType.FINDWAY_TASK, "(" +GameConfig.MapConfig[mapId].mapName +":" +name +")", taskId})
            // let [defaultCellX, defaultCellY] = [cellX - 10, cellY - 10]
            // let targetPos = MapSystem.getInstance().getMapEnterCellXY(mapId, defaultCellX, defaultCellY)
            // Command_JumpMapToTalkNpc(mapId, targetPos.x, targetPos.y, cellX, cellY, scope, entryId, opCodes.C2G_TASK_GUIDE_JUMP, [AutoActionType.FINDWAY_TASK, "(" + GameConfig.MapConfig[mapId].mapName + ":" + name + ")", taskId])
        }
        else if (type == TaskLinkType.GOTO_POSITION) {
            if (CheckHeroCanGo() == false) {
                return;
            }
            var _b = StringUtil.stringMatch(param, /{(.+),(.+),(.+),(.+)}/), mapId = _b[0], cellX = _b[1], cellY = _b[2], taskId = _b[3];
            mapId = tonumber(GetStringSplitBySchool(mapId));
            cellX = tonumber(GetStringSplitBySchool(cellX));
            cellY = tonumber(GetStringSplitBySchool(cellY));
            taskId = tonumber(taskId);
            Command_FindWayToGo(mapId, cellX, cellY, 0, [AutoActionType.FINDWAY_TASK, "(" + GameConfig.MapConfig[mapId].mapName + ":" + cellX + "," + cellY + ")", taskId]);
        }
        else if (type == TaskLinkType.FIND_NPC) {
            var _c = StringUtil.stringMatch(param, /{(.+),(.+)}/), entryId = _c[0], taskId = _c[1];
            entryId = tonumber(GetStringSplitBySchool(entryId));
            taskId = tonumber(taskId);
            Task_ShowNpcDialogWithEntry(entryId);
            // let name, mapId, cellX, cellY = TaskSystem.getInstance().getDynamicNpcName(taskId, entryId)
            // Command_FindWayToGo(mapId, cellX, cellY, scope, [AutoActionType.FINDWAY_NORMAL, "(" + GameConfig.MapConfig[mapId].mapName + ":" + name + ")", taskId])
        }
        else if (type == TaskLinkType.JUMP_RUN_TALK) {
            var _d = StringUtil.stringMatch(param, /{(.+),(.+),(.+),(.+)}/), entryId = _d[0], targetCellX = _d[1], targetCellY = _d[2], taskId = _d[3];
            entryId = tonumber(GetStringSplitBySchool(entryId));
            targetCellX = tonumber(GetStringSplitBySchool(targetCellX));
            targetCellY = tonumber(GetStringSplitBySchool(targetCellY));
            taskId = tonumber(taskId);
            Task_ShowNpcDialogWithEntry(entryId);
            // let name, mapId, cellX, cellY = TaskSystem.getInstance().getDynamicNpcName(taskId, entryId)
            // Command_JumpMapToTalkNpc(mapId, targetCellX, targetCellY, cellX, cellY, scope, entryId, opCodes.C2G_TASK_GUIDE_JUMP, [AutoActionType.FINDWAY_TASK, "(" + GameConfig.MapConfig[mapId].mapName + ":" + name + ")", taskId])
        }
        else if (type == TaskLinkType.XUNLUO) {
            if (CheckHeroCanGo() == false) {
                return;
            }
            var _e = StringUtil.stringMatch(param, /{(.+),(.+),(.+)}/), mapId_ = _e[0], cellX_ = _e[1], cellY_ = _e[2];
            var mapId = tonumber(GetStringSplitBySchool(mapId_));
            var cellX = tonumber(GetStringSplitBySchool(cellX_));
            var cellY = tonumber(GetStringSplitBySchool(cellY_));
            if (mapId == 0 && cellX == 0 && cellY == 0) {
                var heroPos = GetHero().getCellXY();
                cellX = heroPos.x, cellY = heroPos.y;
                mapId = MapSystem.getInstance().getMapId();
            }
            //Command_FindWayToAutoFight(mapId, cellX, cellY, scope)
        }
        else if (type == TaskLinkType.ITEM_TIPS) {
            var entryId = tonumber(param);
            var item = ItemSystem.getInstance().getItemLogicInfoByEntry(entryId, storeOptions.PACKET);
            if (!item) {
                //-模拟一个物品的数据
                //item = {}
                var propertyInfo = {};
                propertyInfo.entry = entryId;
                propertyInfo.count = 1;
                propertyInfo.equip_quality = opEquipQuality.White;
                item = Item.newObj(propertyInfo);
            }
            var dataList = (_f = {}, _f["logicItem"] = item, _f["petInfo"] = null, _f["source"] = "shop", _f["spaceX"] = 0, _f["spaceY"] = 0, _f);
            ItemSystem.getInstance().showItemHint(dataList);
        }
        else if (type == TaskLinkType.PET_TIPS) {
            var entryId = tonumber(param);
            var petConfig = GameConfig.PetConfig;
            if (!petConfig[entryId]) {
                return;
            }
            var window_1 = WngMrg.getInstance().getWindow("PetTipsFrame");
            window_1.showWnd();
            window_1.setPet(petConfig[entryId]);
        }
        else if (type == TaskLinkType.EXECUTE_OPERATE) {
            var taskId = tonumber(param);
            if (this.interiorHandler[taskId]) {
                var func = this.interiorHandler[taskId][0];
                var param_1 = this.interiorHandler[taskId][1] || null;
                func(param_1);
            }
        }
        else if (type == TaskLinkType.ADD_TIPS) {
            MsgSystem.addTagTips(Localize_cns("PLEASE_FIND_NPC_YOURSELF"));
        }
        else if (type == TaskLinkType.SHOW_TIPS) {
            //let channel, msgString = string.match(param, "{(.+),(.+)}")
            var _g = StringUtil.stringMatch(param, /{(.+),(.+)}/), channel = _g[0], msgString = _g[1];
            channel = tonumber(channel) || 2;
            if (msgString != null && msgString != "") {
                return MsgSystem.selectShowHandle(channel, msgString);
            }
        }
        var _f;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    // setSchoolXunLuoState( linkStr){
    // 	let schoolXunLuo = this.schoolXunLuo
    // 	this.schoolXunLuo = linkStr
    // 	if(schoolXunLuo != linkStr ){
    // 		FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, TaskGuideEvent.newObj(linkStr))
    // 	}
    // }
    // getSchoolXunLuoState(){
    // 	return this.schoolXunLuo
    // }
    // onEntryMap(){
    // 	if(! this.schoolXunLuo ){
    // 		return
    // 	}
    // 	let mapId = tonumber(string.match(this.schoolXunLuo, "(%d);"))
    // 	if(MapSystem.getInstance().getMapId() == mapId ){
    // 		this.setSchoolXunLuoState(null)
    // 	}
    // }
    TaskExecutor.prototype.onTaskFinish = function (args) {
        if (this.interiorHandler[args.taskId]) {
            delete this.interiorHandler[args.taskId];
        }
    };
    TaskExecutor.prototype._executeGetReplaceWord = function (word, param) {
        if (word == null) {
            TLog.Error("TaskExecutor._executeGetReplaceWord word == null");
            return "null";
        }
        var _a = StringUtil.stringMatch(word, /(.+);(.+)/), keyword = _a[0], argStr = _a[1];
        //let keyword, argStr = string.match(word, "(.+);(.+)")
        var taskId = tonumber(checkNull(StringUtil.stringMatch(argStr || "", /_(\d+)$/), [])[0]) || 0;
        if (taskId != 0 && !TaskSystem.getInstance().isTaskExsit(taskId)) {
            TLog.Error("TaskExecutor._executeGetReplaceWord the taskId:%s ! exsit", tostring(taskId));
            return word;
        }
        for (var key in TaskReplaceWordSpace.TaskReplaceWordHandler) {
            var funcRef = TaskReplaceWordSpace.TaskReplaceWordHandler[key];
            if (key == keyword) {
                return funcRef.call(this, word, taskId, argStr, param);
            }
        }
        TLog.Error("TaskExecutor._executeGetReplaceWord word:%s ! exsit", tostring(word));
        return word;
    };
    TaskExecutor.prototype._executeTracePrize = function (taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        if (!taskInfo) {
            return;
        }
        if (!taskInfo.prize) {
            return;
        } //没有奖励
        //物品、金币、经验
        var buf = {};
        buf.xml = "";
        buf.isXml = true;
        var str = "";
        if (taskInfo.prize["ITEM"] || taskInfo.prize["BINDITEM"]) {
            var param = taskInfo.prize["ITEM"] || taskInfo.prize["BINDITEM"];
            //只显示第一个物品
            var info = param[0];
            var entryId = info[0];
            var num = info[1];
            buf.xml = "#ublack_ul|6;" + entryId + "|" + ItemSystem.getInstance().getItemName(entryId);
            if (num > 1) {
                buf.xml = buf.xml + "#ublack x" + num;
            }
            buf.xml = buf.xml + "#space";
        }
        if (taskInfo.prize["FUNDS"]) {
            var param = taskInfo.prize["FUNDS"];
            buf.xml = buf.xml + "#PRIZE_JINBI#ublack" + param + "#space";
        }
        if (taskInfo.prize["PLREXP"]) {
            var param = taskInfo.prize["PLREXP"];
            buf.xml = buf.xml + "#PRIZE_JINBI#ublack" + param;
        }
        listener.func(listener.this_index, buf, listener.userData);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    TaskExecutor.prototype._excuteTaskTrace = function (taskId, listener) {
        if (GameConfig.TaskConfig[taskId] == null) {
            //throw()
            TLog.Error("TaskExecutor._excuteTaskTrace  TaskConfig[taskId] == null");
            return false;
        }
        if (!this.specialHandleReCall) {
            this.specialHandleReCall = {};
            this.specialHandleReCall["finish"] = (_a = {},
                //[taskField.FIELD_FINISH_COLLECTPET]:true,
                //[taskField.FIELD_FINISH_ARRIVE_POINT]:true,
                //[taskField.FIELD_FINISH_FIGHTWIN]:true,
                _a["FEIXINGQ_QUESTION"] = true,
                _a["QUESTION"] = true,
                _a);
            this.specialHandleReCall["init"] = (_b = {}, _b[taskField.FIELD_INIT_NOT_TIME_OUT] = true, _b);
        }
        var task = TaskSystem.getInstance().getTask(taskId);
        if (!task) {
            return false;
        }
        var taskInfo = task.getPropertyInfo();
        var traceHandle = TaskTraceSpace.TaskTrackHandler;
        for (var k in this.specialHandleReCall["finish"]) {
            var v = this.specialHandleReCall["finish"][k];
            if (taskInfo.finish[k]) {
                for (var deal_index in taskInfo.finish) {
                    var _ = taskInfo.finish[deal_index];
                    var handleFunc = traceHandle[deal_index];
                    if (handleFunc) {
                        return handleFunc.call(this, taskId, listener) || false;
                    }
                }
                return false;
            }
        }
        if (TaskChecker.getInstance().checkFinish(taskId)) {
            return TaskTraceSpace.finishReCall(taskId, listener) || false;
        }
        task = TaskSystem.getInstance().getTask(taskId);
        taskInfo = task.getPropertyInfo();
        var flag = false;
        if (taskInfo.finish) {
            for (var deal_index in taskInfo.finish) {
                var _ = taskInfo.finish[deal_index];
                var handleFunc = traceHandle[deal_index];
                if (handleFunc) {
                    flag = flag || handleFunc.call(this, taskId, listener);
                }
            }
            if (taskInfo.init && taskInfo.init[taskField.FIELD_INIT_TIME]) {
                var handleFunc = traceHandle[taskField.FIELD_INIT_TIME];
                flag = flag || handleFunc.call(this, taskId, listener);
            }
        }
        return flag;
        var _a, _b;
    };
    TaskExecutor.prototype._executeNpcDialogOp = function (opStr, npcId, talkId, nodeId, param) {
        var _a = TaskSystem.getInstance().getTaskOpFromStr(TaskKeyType.DIALOGOP, opStr), flag = _a[0], op = _a[1];
        if (!flag) {
            return;
        }
        //if(op <= DialogOpDefine.FILED_TASK_WITHOUTNPC_BEGIN || op >= DialogOpDefine.FILED_TASK_WITHOUTNPC_END ){
        //	let npc = ActorManager.getInstance().getNpc(npcId)
        //	if(npc == null ){
        //		TLog.Warn("TaskExecutor._executeNpcDialogOp npcID:%d ! exsit", npcId)
        //		//return 
        //	}
        //}
        //
        var functionRef = TaskDialogOpSpace.DialogOpHandler[op];
        if (functionRef) {
            functionRef.call(this, npcId, talkId, nodeId, param);
        }
        else {
            TLog.Error("TaskExecutor._executeNpcDialogOp op:%d ! exsit, %s", op, opStr);
        }
    };
    return TaskExecutor;
}(TClass));
__reflect(TaskExecutor.prototype, "TaskExecutor");
//# sourceMappingURL=TaskExecutor.js.map