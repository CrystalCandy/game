/*
作者:
    liuziming
    
创建时间：
   2013.10.25(周五)

意图：
        新手指引系统
   

公共接口：
   filterEntry(){			//简单过滤不必要的监控条目
   insertFirstGuide(){				//特殊处理，（第一次登陆以接受第一个任务为标识）
*/
// let GameConfig.GuideConfig:any = {}
// let eventObj = null
// let FIRSTGUIDE = 20000
//require("bit")
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
var GuideSystem = (function (_super) {
    __extends(GuideSystem, _super);
    function GuideSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideSystem.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.onClear();
    };
    GuideSystem.prototype.destory = function () {
    };
    GuideSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initGuideSystemCsv(workQueue);
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(this.initLevelOpenFuncConfig, this));
    };
    GuideSystem.prototype.onClear = function () {
        if (this.mEvent2IndexListMap) {
            for (var eventName in this.mEvent2IndexListMap) {
                UnRegisterEvent(eventName, this.onHandleCenterEvent, this);
            }
        }
        this.mEvent2IndexListMap = {};
        this.mListenEventLockList = [];
        if (this.windowList) {
            for (var gIndex in this.windowList) {
                var v = this.windowList[gIndex];
                for (var aIndex in v) {
                    var window_1 = this.windowList[gIndex][aIndex];
                    window_1.hideWnd();
                    window_1.deleteObj();
                }
            }
        }
        this.windowList = {};
        this.markWindowList = {};
        this.guideConfig = {};
        this.mCurrentListener = [];
        this.mTimerList = {};
        //this.mListenEventIndex = {}
        this.mGuideRecord = {};
        //this.curGuideList = {}
        this.bReFightLogin = false;
        //this.curArgs = {}
        //this.executingIndex = -1
        this.funcState = null;
        this.openedFuncList = {};
        this.mAddListener = [];
        this.mRemoveListener = [];
        this.mListenEventIndex = [];
        this.mListenLock = false;
    };
    //////////////////////////////////////////////////////////////////////////////
    GuideSystem.prototype.filterEntry = function () {
        this.guideConfig = {};
        if (GAME_MODE != GAME_NORMAL) {
            return;
        }
        for (var guideIndex in GameConfig.GuideConfig) {
            var v = GameConfig.GuideConfig[guideIndex];
            //if(guideIndex != FIRSTGUIDE ){
            this.guideConfig[guideIndex] = v;
            var actionNode = v[1];
            if (actionNode.ListenCondition.HeroLevel) {
                //TLog.Debug_r(v[1].ListenCondition.HeroLevel)
                var flag = commonCmp(v[1].ListenCondition.HeroLevel, GetHeroProperty("level")); //根据等级过滤指引
                if (!flag) {
                    delete this.guideConfig[guideIndex];
                    //TLog.Debug("flag null ")
                }
                //TLog.Debug("flag",flag)
                //io.read()
            }
            if (this.guideConfig[guideIndex] && GuideListenerEvent[actionNode.ListenEvent]) {
                if (!table_isExsit(this.mListenEventIndex, actionNode.GuideIndex)) {
                    JsUtil.arrayInstert(this.mListenEventIndex, actionNode.GuideIndex);
                }
            }
        }
        this.registerEvent();
    };
    //////////////////////////////////////////////////////////////////////////////
    GuideSystem.prototype.registerEvent = function () {
        //**注意，测试防错代码
        if (this.isFinishGuide() == true) {
            return;
        }
        //this.clearRegisterEvent()
        for (var index in this.guideConfig) {
            var v = this.guideConfig[index];
            var actionNode = v[1];
            var eventName = GuideListenerType[actionNode.ListenEvent];
            // let needRegisterEvent = true
            var guideIndex = actionNode.GuideIndex;
            var actionIndex = actionNode.ActionIndex;
            if (eventName != null) {
                var guideIndexList = this.mEvent2IndexListMap[eventName] || [];
                if (guideIndexList.length == 0) {
                    RegisterEvent(eventName, this.onHandleCenterEvent, this);
                }
                guideIndexList.push(guideIndex);
                this.mEvent2IndexListMap[eventName] = guideIndexList;
            }
        }
    };
    GuideSystem.prototype.onHandleCenterEvent = function (args) {
        //TLog.Assert(this.mListenLock == false)
        if (this.mListenLock) {
            var info = {};
            info.eventName = GetEventSet().getCurrentEventName(); //当前分派消息的事件名
            info.args = args;
            this.mListenEventLockList.push(info);
            return;
        }
        //处理当前的
        var eventName = GetEventSet().getCurrentEventName(); //当前分派消息的事件名
        this.onHandleCenterEventImp(eventName, args);
        while (this.mListenEventLockList.length > 0) {
            var info = this.mListenEventLockList.shift();
            this.onHandleCenterEventImp(info.eventname, info.args);
        }
    };
    GuideSystem.prototype.onHandleCenterEventImp = function (eventName, args) {
        var guideIndexList = this.mEvent2IndexListMap[eventName];
        if (guideIndexList == null || guideIndexList.length == 0)
            return;
        //处理下一个事件时候处理，注意onHandleCenterEvent可能同一帧调用多次
        if (this.mAddListener.length > 0) {
            for (var _ in this.mAddListener) {
                var v = this.mAddListener[_];
                if (!table_isExsit(this.mCurrentListener, v)) {
                    JsUtil.arrayInstert(this.mCurrentListener, v);
                }
            }
            this.mAddListener = [];
        }
        if (this.mRemoveListener.length > 0) {
            for (var _ in this.mRemoveListener) {
                var v = this.mRemoveListener[_];
                table_remove(this.mCurrentListener, v);
            }
            this.mRemoveListener = [];
        }
        this.mListenLock = true;
        for (var i = 0; i < guideIndexList.length; i++) {
            var guideIndex = guideIndexList[i];
            this.onHandleGuideIndex(guideIndex, args);
        }
        this.mListenLock = false;
    };
    GuideSystem.prototype.onHandleGuideIndex = function (index, args) {
        if (table_isExsit(this.mListenEventIndex, index)) {
            if (table_isExsit(this.mRemoveListener, index) == false && table_isExsit(this.mCurrentListener, index)) {
                if (this.checkEvent(GameConfig.GuideConfig[index][1].ListenEvent, GameConfig.GuideConfig[index][1].ListenParam, args)) {
                    TLog.Debug("the checker result is: true", index);
                    this.carryOut(GameConfig.GuideConfig[index], index, args);
                    this.removeListener(index);
                }
                else {
                    TLog.Debug("the checker result is: false %d", index);
                }
            }
        }
        else {
            var actionNode = GameConfig.GuideConfig[index][1];
            var flag = this.checkEvent(actionNode.ListenEvent, actionNode.ListenParam, args);
            if (flag == true) {
                TLog.Debug("the checker result is: true %d", index);
                this.carryOut(GameConfig.GuideConfig[index], index, args);
            }
            TLog.Debug("the checker result is: false %d", index);
        }
    };
    GuideSystem.prototype.carryOutArray = function (actionList, index, args) {
        //TLog.Debug("GuideSystem.carryOut",index)
        //TLog.Debug_r(actionList)
        //io.read()
        var isSetClock = -1;
        var actionSecList = [];
        //this.executingIndex = index
        var length = size_t(actionList);
        for (var k = 0; k < actionList.length; k++) {
            var v = actionList[k];
            if (isSetClock == -1) {
                // if (GAME_DEBUG) {
                //     TLog.Debug(index, k, v.Action)
                // }
                if (v.Action == "Clocker") {
                    isSetClock = k;
                    for (var i = k + 1; i < actionList.length; i++) {
                        JsUtil.arrayInstert(actionSecList, actionList[i]);
                    }
                    this.setClocker(actionSecList, v.ActionParam.delay, index, args);
                }
                else {
                    this.executeAction(v.Action, v.ActionParam, index, v.ActionIndex, args);
                }
            }
        }
        var send = true;
        for (var _i in GuideRedTipsIndexList) {
            var _v = GuideRedTipsIndexList[_i];
            if (index == _v) {
                send = false;
            }
        }
        if (send) {
            var message = GetMessage(opCodes.C2G_ROLE_OPER_NODE);
            message.guideIndex = index;
            SendGameMessage(message);
        }
        //this.executingIndex = -1
        //this.executingIndex = -1
    };
    GuideSystem.prototype.carryOut = function (actionConfig, index, args) {
        var actionList = [];
        var len = size_t(actionConfig);
        for (var i = 1; i <= len; i++) {
            var v = actionConfig[i];
            TLog.Assert(v != null);
            actionList.push(v);
        }
        this.carryOutArray(actionList, index, args);
    };
    GuideSystem.prototype.setClocker = function (actionSecList, SPAN, index, args) {
        var timerId = 1;
        function onVpTickEvent(delay) {
            KillTimer(timerId);
            //clocker过程中不响应点击事件
            IGlobal.guiManager.setInputEnable(true);
            this.carryOutArray(actionSecList, index, args);
        }
        //clocker过程中不响应点击事件
        IGlobal.guiManager.setInputEnable(false);
        timerId = SetTimer(onVpTickEvent, this, SPAN);
    };
    GuideSystem.prototype.setLoginReFightFlag = function (flag) {
        this.bReFightLogin = flag;
    };
    GuideSystem.prototype.isFuncOpen = function (func, defaultState) {
        //TLog.Debug("GuideSystem.isFuncOpen",func)
        if (!func) {
            return defaultState || false;
        }
        var defaultOpen = [];
        if (table_isExsit(defaultOpen, func)) {
            //TLog.Debug("1")
            return true;
        }
        var errantry = this.funcState;
        if (!errantry) {
            errantry = GetHeroProperty("funcState") || "";
        }
        defaultState = defaultState || false;
        var isFunc = false;
        if (GameConfig.FuncDefineConfig[func]) {
            isFunc = true;
            var config = GameConfig.FuncDefineConfig[func];
            if (this.openedFuncList[func]) {
                return true;
            }
            else {
                if (StringUtil.getBit(errantry, config.funcOrder) == "1") {
                    //TLog.Debug("2",errantry)
                    return true;
                }
            }
        }
        if (!isFunc) {
            //TLog.Debug("2",isFunc)
            return defaultState;
        }
        return false;
    };
    GuideSystem.prototype.opendFunc = function (func) {
        if (!GuideFuncDefine[func] || !GameConfig.FuncDefineConfig[func]) {
            return;
        }
        if (this.isFuncOpen(func, true) == true) {
            return;
        }
        var config = GameConfig.FuncDefineConfig[func];
        if (config.funcOrder > 0) {
            SetRoleFunctionSetting(GameConfig.FuncDefineConfig[func].funcOrder);
        }
        else {
            this.openedFuncList[func] = true;
        }
        FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, GuideActivateButtonEvent.newObj(func));
    };
    GuideSystem.prototype.setFuncState = function (errantry) {
        if (this.funcState == errantry) {
            return;
        }
        this.funcState = errantry;
        return FireEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, null);
    };
    GuideSystem.prototype.getFuncState = function () {
        var funcState = this.funcState;
        if (!funcState) {
            funcState = GetHeroProperty("funcState") || "";
        }
        return funcState;
    };
    //更新依据等级开放的功能
    GuideSystem.prototype.updateHeroFunc = function (init) {
        var list = []; //需要记录在hero信息里
        var flag = false;
        for (var k in GameConfig.FuncDefineConfig) {
            var v = GameConfig.FuncDefineConfig[k];
            if (this.isFuncOpen(v.funcName, false) == false) {
                if (v.openType == FuncOpenConditionType.LEVEL) {
                    if (v.openParam[0] <= GetHeroProperty("level")) {
                        this.openedFuncList[k] = true;
                        flag = true;
                        if (!init) {
                            FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, GuideActivateButtonEvent.newObj(k));
                        }
                    }
                }
                else if (v.openType == FuncOpenConditionType.CAMPAIGN) {
                    if (CampaignSystem.getInstance().isCampaignPass(v.openParam[0]) == true) {
                        this.openedFuncList[k] = true;
                        flag = true;
                        if (!init) {
                            FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, GuideActivateButtonEvent.newObj(k));
                        }
                    }
                }
                else if (v.openType == FuncOpenConditionType.TASK) {
                    if (TaskSystem.getInstance().isTaskHasFinished(v.openParam[0]) == true) {
                        this.openedFuncList[k] = true;
                        flag = true;
                        if (!init) {
                            FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, GuideActivateButtonEvent.newObj(k));
                        }
                    }
                }
                else {
                    JsUtil.arrayInstert(list, k);
                }
            }
        }
        if (flag == true) {
            FireEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, null);
        }
        else {
            for (var _ in list) {
                var funcIndex = list[_];
                SetRoleFunctionSetting(GameConfig.FuncDefineConfig[funcIndex].funcOrder);
                if (!init) {
                    FireEvent(EventDefine.GUIDE_ACTIVATE_BUTTON, GuideActivateButtonEvent.newObj(funcIndex));
                }
            }
        }
    };
    // onAnimBoxDesotry(args, flag) {
    //     // if (!flag) {
    //     //     tolua.cast(args, "gui::GUIEvent")
    //     // }
    //     for (let guideIndex in this.windowList) {
    //         let v = this.windowList[guideIndex]
    //         if (type(v) == "object") {
    //             for (let actionIndex in v) {
    //                 let w = v[actionIndex]
    //                 if (w == args.window) {
    //                     this.clearAction(guideIndex, actionIndex)
    //                     this.killWindowTimer(guideIndex, actionIndex)
    //                     break
    //                 }
    //             }
    //         }
    //     }
    // }
    GuideSystem.prototype.setGuideRecord = function (key, value, nosend) {
        //TLog.Debug("GuideSystem.setGuideRecord" ,key,value)
        this.mGuideRecord[key] = value;
        //Config.getInstance().setRoleSetting("string", key, value)
        //这里发送给服务器
        if (!nosend) {
            var message = GetMessage(opCodes.C2G_ROLE_NEWBIE_SAVE_RECORD);
            message.record = (_a = {}, _a[key] = value, _a);
            SendGameMessage(message);
        }
        var _a;
    };
    GuideSystem.prototype.setGuideRecordList = function (list) {
        this.mGuideRecord = {};
        for (var k in list) {
            var v = list[k];
            this.mGuideRecord[tostring(k)] = v;
        }
        if (GAME_DEBUG) {
            //this.mGuideRecord["20000"]="3"
            //this.mGuideRecord["guideReadFinish"]="NULL"
            TLog.Debug(this.mGuideRecord);
        }
    };
    GuideSystem.prototype.getGuideRecord = function (key) {
        //TLog.Debug_r(this.mGuideRecord)
        //TLog.Debug("GuideSystem.getGuideRecord",key,this.mGuideRecord[key])
        if (!this.mGuideRecord[key]) {
            return "NULL";
        }
        return this.mGuideRecord[key];
    };
    //////////////////////////////////////////////////////////////////////////////////////
    GuideSystem.prototype.killWindowTimer = function (guideIndex, actionIndex) {
        if (this.mTimerList[guideIndex] && this.mTimerList[guideIndex][actionIndex]) {
            var timeId = this.mTimerList[guideIndex][actionIndex];
            KillTimer(timeId);
            delete this.mTimerList[guideIndex][actionIndex];
        }
    };
    GuideSystem.prototype.setWindowTimer = function (window, stayTime, args, deleteListen) {
        var guideIndex = args.index[0];
        var actionIndex = args.index[1];
        function onVpTickEvent(delayTime) {
            this.clearAction(guideIndex, actionIndex);
            this.killWindowTimer(guideIndex, actionIndex);
            table_remove(this.mCurrentListener, deleteListen);
        }
        this.mTimerList[guideIndex] = this.mTimerList[guideIndex] || {};
        this.mTimerList[guideIndex][actionIndex] = SetTimer(onVpTickEvent, this, stayTime);
    };
    GuideSystem.prototype.insertWindow = function (window, param, guideIndex, actionIndex) {
        if (!this.windowList[guideIndex]) {
            this.windowList[guideIndex] = {};
        }
        //TLog.Debug("GuideSystem.insertWindow",guideIndex,actionIndex)
        //TLog.Debug_r(this.windowList)
        if (this.windowList[guideIndex][actionIndex]) {
            //return
            //TLog.Debug("1111111")
            this.clearAction(guideIndex, actionIndex);
        }
        //TLog.Debug("2222222", param["autoDelete"])
        this.windowList[guideIndex][actionIndex] = window;
        if (param["listenIndex"]) {
            this.addListener(param["listenIndex"]);
        }
        //所有指引都会在10s 后删除 
        if (param["stayTime"]) {
            this.setWindowTimer(window, param["stayTime"], { index: [guideIndex, actionIndex] }, param["deleteListen"] || null);
        }
    };
    GuideSystem.prototype.markInsertWindow = function (guideIndex, actionIndex) {
        if (!this.markWindowList[guideIndex]) {
            this.markWindowList[guideIndex] = {};
        }
        this.markWindowList[guideIndex][actionIndex] = true;
    };
    GuideSystem.prototype.isMarkInsertWindow = function (guideIndex, actionIndex) {
        if (this.markWindowList[guideIndex] && this.markWindowList[guideIndex][actionIndex]) {
            return true;
        }
        return false;
    };
    GuideSystem.prototype.addListener = function (listenIndex) {
        if (this.mListenLock == false) {
            if (!table_isExsit(this.mCurrentListener, listenIndex)) {
                table_insert(this.mCurrentListener, listenIndex);
            }
        }
        else {
            table_remove(this.mRemoveListener, listenIndex);
            if (!table_isExsit(this.mAddListener, listenIndex)) {
                table_insert(this.mAddListener, listenIndex);
            }
        }
    };
    GuideSystem.prototype.removeListener = function (listenIndex) {
        //TLog.Debug("GuideSystem.removeListener",this.listenLock)
        if (this.mListenLock == false) {
            table_remove(this.mCurrentListener, listenIndex);
        }
        else {
            table_remove(this.mAddListener, listenIndex);
            if (!table_isExsit(this.mRemoveListener, listenIndex)) {
                table_insert(this.mRemoveListener, listenIndex);
            }
        }
    };
    GuideSystem.prototype.doGuideByIndex = function (index) {
        //TLog.Debug("GuideSystem.doGuideByIndex",index)
        if (GameConfig.GuideConfig[index]) {
            this.carryOut(GameConfig.GuideConfig[index], index, null);
        }
    };
    GuideSystem.prototype.clearWindowModel = function (index) {
        //TLog.Debug("GuideSystem.clearWindowModel",index)
        var clearIndex = null;
        for (var _i in this.windowList) {
            var i = tonumber(_i);
            var v = this.windowList[i];
            //TLog.Debug("aa",i,this.windowList.length)
            if (index != i && size_t(this.windowList[i]) > 0) {
                for (var j in GameConfig.GuideConfig[i]) {
                    var v_1 = GameConfig.GuideConfig[i][j];
                    //TLog.Debug("window",i,j,v.Action )
                    if (v_1.Action == "CreatMask") {
                        //if(window.frame.name()=="GuideMaskFrame" ){
                        clearIndex = i;
                        break;
                    }
                }
            }
        }
        if (clearIndex != null) {
            //TLog.Debug("clear index",clearIndex)
            for (var i in this.windowList[clearIndex]) {
                var window_2 = this.windowList[clearIndex][i];
                this.clearAction(clearIndex, i);
            }
        }
    };
    GuideSystem.prototype.clearWindowAction = function () {
        var clearIndex = [];
        for (var i in this.windowList) {
            var v = this.windowList[i];
            for (var j in GameConfig.GuideConfig[i]) {
                var v_2 = GameConfig.GuideConfig[i][j];
                //TLog.Debug("window",i,j,v.Action )
                if (v_2.Action == "CreatMask") {
                    JsUtil.arrayInstert(clearIndex, i);
                    break;
                }
            }
        }
        var list = [];
        for (var _ in clearIndex) {
            var index = clearIndex[_];
            //TLog.Debug("clear index",clearIndex)
            for (var i in this.windowList[index]) {
                var window_3 = this.windowList[index][i];
                JsUtil.arrayInstert(list, [index, i]);
            }
        }
        for (var _ in list) {
            var param = list[_];
            this.clearAction(param[0], param[1]);
        }
    };
    GuideSystem.prototype.isCanClientAutoUI = function () {
        if (this.isFinishGuideClient() == false) {
            return false;
        }
        if (CampaignSystem.getInstance().isCampaignPass(1013) == false) {
            return false;
        }
        //当前最高关卡是否刚好功能关卡
        var list = CampaignSystem.getInstance().getFinishedCampaignList();
        var campaignId = 0;
        for (var _campId in list) {
            var campId = tonumber(_campId);
            //let _ = list[campId]
            if (campaignId < campId) {
                campaignId = campId;
            }
        }
        if (GameConfig.CampaignConfig[campaignId]) {
            var funcIndex = GameConfig.CampaignConfig[campaignId].funcIndex;
            if (funcIndex && funcIndex != "" && GameConfig.FuncInfoConfig[funcIndex]) {
                return false;
            }
        }
        return true;
    };
    GuideSystem.prototype.isFinishGuide = function () {
        if (!GAME_GUIDE) {
            return true;
        }
        else {
            return this.getGuideRecord("guideReadFinish") == "finish";
        }
    };
    GuideSystem.prototype.isFinishGuideAwake = function () {
        if (this.isFinishGuide() == true) {
            return true;
        }
        else {
            return this.getGuideRecord("30101") == "1";
        }
    };
    GuideSystem.prototype.isFinishGuideEvent = function () {
        //  if(this.isFinishGuide() == true){
        //     return true
        // }else{
        //     return this.getGuideRecord("30701") == "1"
        // }
        return true;
    };
    GuideSystem.prototype.isFinishGuideClient = function () {
        if (this.isFinishGuide() == true) {
            return true;
        }
        else {
            return CampaignSystem.getInstance().isCampaignPass(1013);
        }
    };
    GuideSystem.prototype.isFinishGuideDefend = function () {
        // if (this.isFinishGuide() == true) {
        //     return true
        // } else {
        //     return this.getGuideRecord("30701") == "1"
        // }
        return true;
    };
    GuideSystem.prototype.isFinishGuideEnhance = function () {
        // if (this.isFinishGuide() == true) {
        //     return true
        // } else {
        //     return this.getGuideRecord("30401") == "1"
        // }
        return true;
    };
    GuideSystem.prototype.isFinishGuideUnlockVocation = function () {
        //if(this.isFinishGuide() == true ){
        //	return true
        //}else{
        //	return this.getGuideRecord("30009") == "1" || this.getGuideRecord("20800") == "1"
        //}
        return true;
    };
    GuideSystem.prototype.isFinishGuideChampion = function () {
        // if (this.isFinishGuide() == true) {
        //     return true
        // } else {
        //     return this.getGuideRecord("30501") == "1"
        // }
        return true;
    };
    GuideSystem.prototype.isFinishGuideSeven = function () {
        return true;
    };
    GuideSystem.prototype.isDoingGuideRobber = function () {
        // if (this.isFinishGuide() == true) {
        //     return false
        // } else {
        //     return this.getGuideRecord("robber") == "1"
        // }
        return true;
    };
    GuideSystem.prototype.isFinishGuideGrow = function () {
        if (this.isFinishGuide() == true) {
            return true;
        }
        else {
            return this.getGuideRecord("30100") == "1";
        }
    };
    GuideSystem.prototype.fastFinishGuide = function () {
        this.setGuideRecord("guide", "finish");
        this.setGuideRecord("20500", "-1");
        this.setGuideRecord("guideReadFinish", "finish");
    };
    GuideSystem.prototype.initLevelOpenFuncConfig = function () {
        this.levelOpenFuncList = {};
        for (var i in GameConfig.GuideConfig) {
            var v = GameConfig.GuideConfig[i];
            if (v[1]) {
                if (v[1].ListenEvent == "LevelUpdate" && v[1].Action == "doEventByParam" && v[1].ActionParam.openfunc) {
                    var level = v[1].ListenParam.level;
                    var func = v[1].ActionParam.openfunc;
                    this.levelOpenFuncList[level] = func;
                }
            }
        }
    };
    GuideSystem.prototype.getLevelOpenFunc = function (level) {
        if (this.levelOpenFuncList && this.levelOpenFuncList[level]) {
            return this.levelOpenFuncList[level];
        }
        return null;
    };
    //对于动态加载遮罩，动画等，需要确保path是存在的
    GuideSystem.prototype.loadWndAndcallback = function (param, callback) {
        var path = "";
        var wndName = "";
        if (param.window) {
            path = param.window;
        }
        else if (param.windowInfo) {
            wndName = param.windowInfo.rootWindow;
        }
        else if (param.pointingInfo) {
            path = param.pointingInfo["windowName"] || "";
        }
        var wnd = null;
        if (path != "") {
            var pathlist = splitString(path, "/");
            wndName = pathlist[0];
        }
        wnd = WngMrg.getInstance().getWindow(wndName);
        TLog.Assert(wnd != null, "loadWndAndcallback wnd:%s == null", wndName);
        if (wnd.isLoadComplete()) {
            DelayEvecuteFunc(0, callback, this, wnd);
            //callback.call(this)
        }
        else {
            wnd.addLoadCallback(callback, this);
            wnd.loadWnd();
        }
    };
    ////////////////////////////////////////执行动作//////////////////////////////////////////////////////////
    GuideSystem.prototype.executeAction = function (action, param, guideIndex, actionIndex, args) {
        TLog.Debug("GuideSystem.executeAction: ", guideIndex, actionIndex, action);
        //table_TLog.Debug(param)
        if (GuideActionSpace.executeActionHandler[action]) {
            var func = GuideActionSpace.executeActionHandler[action];
            func.call(this, param, guideIndex, actionIndex, args);
        }
    };
    GuideSystem.prototype.clearAction = function (_guideIndex, _actionIndex) {
        var guideIndex = tonumber(_guideIndex);
        var actionIndex = tonumber(_actionIndex);
        var param = { index: [guideIndex, actionIndex] };
        GuideActionSpace.executeActionHandler[GuideListenDefine.FIELD_ACTION_CLEARACTION].call(this, param);
    };
    ////////////////////////////////////////检查事件////////////////////////////////////////////////////////-
    GuideSystem.prototype.checkEvent = function (event, param, args) {
        //TLog.Debug("GuideSystem.checkEvent:", event,args)
        //table_TLog.Debug(param)
        if (param == null || size_t(param) == 0) {
            return true;
        }
        if (!this.checkRecord(param, args)) {
            TLog.Debug("the checkRecord is false! ");
            return false;
        }
        else if (!this.checkState(param, args)) {
            TLog.Debug("the checkState is false!");
            //TLog.Debug("111" )		
            return false;
        }
        else if (!this.checkFinishTask(param, args)) {
            TLog.Debug("the checkFinishTask is false!");
            //TLog.Debug("111" )
            return false;
        }
        //TLog.Debug("222"  ,event )	
        if (GuideCheckSpace.checkEventHandler[event]) {
            return GuideCheckSpace.checkEventHandler[event].call(this, param, args);
        }
        else {
            TLog.Debug("the check handler is null!		%s", event);
            return true;
        }
    };
    GuideSystem.prototype.checkRecord = function (param, args) {
        //TLog.Debug("GuideSystem.checkRecord")
        //TLog.Debug_r(param)
        if (!param["record"]) {
            return true;
        }
        var flag = true;
        for (var _ in param["record"]) {
            var v = param["record"][_];
            if (!GuideCheckSpace.checkEventHandler[GuideListenDefine.FIELD_LISTEN_EVENT_RECORD].call(this, v, args)) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    GuideSystem.prototype.checkState = function (param, args) {
        if (!param["state"] || type(param["state"]) != "object") {
            return true;
        }
        //TLog.Debug("checkState")
        return TaskChecker.getInstance().checkOpList(param["state"], true);
    };
    GuideSystem.prototype.checkFinishTask = function (param, args) {
        var config = param["finishTask"];
        if (config == null) {
            return true;
        }
        var taskId = config[0];
        var state = config[1];
        var task = TaskSystem.getInstance().getTask(taskId);
        if (task) {
            return task.isFinish() == state;
        }
        return false;
    };
    return GuideSystem;
}(BaseSystem));
__reflect(GuideSystem.prototype, "GuideSystem");
//# sourceMappingURL=GuideSystem.js.map