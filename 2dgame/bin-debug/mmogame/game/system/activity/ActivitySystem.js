/*
作者:
    yangguiming
    
创建时间：
    2014.07.31(星期四)

意图：
  活动系统总管理类，存储表单数据，网络数据
  具体玩法接口实现

公共接口：
    //requestStart(){
    //requestStop(){
    //start(){
    //stop(){
    //isStart(){
    

    //获取活动玩法
    //function GetActivity(index){
    //活动开始
    //function StartActivity(index){
    //活动停止
    //function StopActivity(index){
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
//////////////////////////////////////////////////////////////////////-
// function GetActiviByServerIndex(index) {
// 	let activity = null
// 	if (index == opDailyIndex.Six) {
// 		activity = GetActivity(ActivityDefine.SkyTower)//天空之塔
// 	}
// 	return activity
// }
ImportType(PayActivityIndex);
function GetActivity(index) {
    return ActivitySystem.getInstance().getActivity(index);
}
function StartActivity(index) {
    var activity = GetActivity(index);
    if (activity) {
        activity.start();
    }
}
function StopActivity(index) {
    var activity = GetActivity(index);
    if (activity) {
        activity.stop();
    }
}
//////////////////////////////////////////////////////////////////////-
var ActivityBase = (function (_super) {
    __extends(ActivityBase, _super);
    function ActivityBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityBase.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bStart = false;
        this.index = args[0];
        this.actIndex = checkNull(args[1], OrdinaryActivityIndex.UNDEFINEACTIVITY);
    };
    ActivityBase.prototype.destory = function () {
    };
    ActivityBase.prototype.onPrepareResource = function () {
    };
    ActivityBase.prototype.onClear = function () {
    };
    ActivityBase.prototype.getIndex = function () {
        return this.index;
    };
    ActivityBase.prototype.requestStart = function (args) {
    };
    ActivityBase.prototype.requestStop = function () {
    };
    ActivityBase.prototype.start = function () {
        if (this.bStart == false) {
            this.bStart = true;
            ActivitySystem.getInstance().setCurActIndex(this.actIndex);
            ActivitySystem.getInstance().recordActivtyProcess();
            this.onStart();
        }
    };
    ActivityBase.prototype.stop = function () {
        if (this.bStart == true) {
            this.bStart = false;
            ActivitySystem.getInstance().setCurActIndex(OrdinaryActivityIndex.NULL);
            this.onStop();
        }
    };
    ActivityBase.prototype.isStart = function () {
        return this.bStart;
    };
    ActivityBase.prototype.onStart = function () {
        TLog.Error("ActivityBase.onStart name%s implement me!!", this.classname);
    };
    ActivityBase.prototype.onStop = function () {
        TLog.Error("ActivityBase.onStop name%s implement me!!", this.classname);
    };
    //简化界面响应代码
    ActivityBase.prototype.updateMessageHandler = function (message, messageIndex) {
        messageIndex = messageIndex || message.messageId;
        if (!this.messageWndHandleIndex || PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
            return;
        }
        if (!this.messageWndHandleIndex[messageIndex]) {
            TLog.Warn(this.classname + ".updateMessageHandler the messageId is Error	%s", messageIndex);
            return;
        }
        //let selffunc = this.messageWndHandleIndex[messageIndex][1]
        var ignoreStart = this.messageWndHandleIndex[messageIndex][2];
        if (this.bStart == false && !ignoreStart) {
            return;
        }
        this.handlerMessage(message, messageIndex);
        // if (FightSystem.getInstance().isFight()) {
        // 	return FightSystem.getInstance().addEndFightHandler(this.handlerMessage, this, table_copy(message))
        // } else {
        // 	return this.handlerMessage(message)
        // }
    };
    ActivityBase.prototype.doMessageHandle = function (message, messageIndex) {
        var selffunc = this.messageWndHandleIndex[messageIndex][0];
        if (selffunc == null) {
            return true;
        }
        var ignoreStart = this.messageWndHandleIndex[messageIndex][2];
        if (this.bStart == false && !ignoreStart) {
            return false;
        }
        return selffunc.call(this, message, messageIndex);
    };
    ActivityBase.prototype.handlerMessage = function (message, messageIndex) {
        if (this.doMessageHandle(message, messageIndex)) {
            var wndlist = this.messageWndHandleIndex[messageIndex][1];
            if (wndlist) {
                for (var _ = 0; _ < wndlist.length; _++) {
                    var elem = wndlist[_];
                    var windowName = elem[0];
                    var wndFunc = elem[1];
                    var directExe = elem[2];
                    //param = elem[3] || null
                    var wnd = WngMrg.getInstance().getWindow(windowName);
                    if (wnd) {
                        if (directExe == null) {
                            wnd.doCommand(wndFunc, message);
                        }
                        else {
                            wnd[wndFunc].call(wnd, message);
                        }
                    }
                }
            }
        }
    };
    return ActivityBase;
}(TClass));
__reflect(ActivityBase.prototype, "ActivityBase");
/////////////////////////////////////////////////////////////////////
var ActivitySystem = (function (_super) {
    __extends(ActivitySystem, _super);
    function ActivitySystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lotteryResultInfo = {};
        return _this;
    }
    ActivitySystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activityMap = {};
        this.operateActivityOpenList = []; //开放列表
        this.operateActivityInfo = {};
        this.operateplayerInfo = {};
        this.lotteryResultInfo = {};
        this.xiyouWelfareInfo = null;
        this.houseInfo = null;
        this.openTime = null; //开服时间
        this.curOrdinaryActIndex = OrdinaryActivityIndex.NULL;
        this.activityProRecord = 0;
    };
    ActivitySystem.prototype.destory = function () {
        this.onClear();
        for (var _ in this.activityMap) {
            var activity = this.activityMap[_];
            activity.deleteObj();
        }
        this.activityMap = {};
    };
    //准备资源，把自己的workunit加载队列里
    ActivitySystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initActivitySystemCsv(workQueue);
        for (var i in ActivityMapDefine) {
            var info = ActivityMapDefine[i];
            if (info.init) {
                this.getActivity(i);
            }
        }
    };
    ActivitySystem.prototype.onClear = function () {
        for (var _ in this.activityMap) {
            var activity = this.activityMap[_];
            activity.stop();
            activity.onClear();
        }
    };
    ActivitySystem.prototype.getActivity = function (index) {
        var a = this.activityMap[index];
        //延迟加载活动
        if (a == null) {
            var info = ActivityMapDefine[index];
            var defineClass = egret.getDefinitionByName(info.name);
            if (defineClass == null) {
                TLog.Error("getDefinitionByName _G[%s] not exsit", info.name);
            }
            else {
                //wnd = new defineClass(info);
                TLog.Assert(defineClass.newObj != null); //必须继承TClass
                a = defineClass.newObj(index, info.actIndex);
                a.onPrepareResource();
                this.activityMap[index] = a;
            }
        }
        return a;
    };
    //当前进行中的（start）活动索引，定义对应OrdinaryActivityIndex
    ActivitySystem.prototype.setCurActIndex = function (actIndex) {
        this.curOrdinaryActIndex = actIndex;
    };
    ActivitySystem.prototype.getCurActIndex = function () {
        return this.curOrdinaryActIndex || OrdinaryActivityIndex.NULL;
    };
    //开放列表////-
    ActivitySystem.prototype.setOperateActivityOpenList = function (indexList) {
        this.operateActivityOpenList = indexList;
    };
    ActivitySystem.prototype.getOperateActivityOpenList = function () {
        return this.operateActivityOpenList;
    };
    //跨服冲值活动
    // setServersRankActivityInfo(info) {
    // 	this.payActivityInfo[PayActivityIndex.SERVERS_PAY_RANK_PRIZE] = table_copy(info)
    // }
    // //跨服冲值活动玩家信息
    // setServersRankPlrInfo(value) {
    // 	if (this.playerActivityInfo[PayActivityIndex.SERVERS_PAY_RANK_PRIZE] == null) {
    // 		this.playerActivityInfo[PayActivityIndex.SERVERS_PAY_RANK_PRIZE] = {}
    // 	}
    // 	this.playerActivityInfo[PayActivityIndex.SERVERS_PAY_RANK_PRIZE].value = value
    // }
    //后台活动信息
    ActivitySystem.prototype.setOperateActivityInfo = function (index, info) {
        this.operateActivityInfo[index] = info;
    };
    ActivitySystem.prototype.getOperateActivityInfo = function (index) {
        return this.operateActivityInfo[index];
    };
    //后台活动信息
    ActivitySystem.prototype.setOperatePlayerInfo = function (index, info) {
        this.operateplayerInfo[index] = info;
    };
    ActivitySystem.prototype.getOperatePlayerInfo = function (index) {
        return this.operateplayerInfo[index];
    };
    //抽奖结果
    ActivitySystem.prototype.setOperateLotteryResultInfo = function (index, info) {
        this.lotteryResultInfo[index] = info;
    };
    ActivitySystem.prototype.getOperateLotteryResultInfo = function (index) {
        return this.lotteryResultInfo[index];
    };
    //西游大厅
    ActivitySystem.prototype.setXiyouWelfareInfo = function (level, playerInfo) {
        this.xiyouWelfareInfo = {};
        this.xiyouWelfareInfo.level = level;
        this.xiyouWelfareInfo.playerInfo = playerInfo;
    };
    ActivitySystem.prototype.getXiyouWelfareInfo = function () {
        return this.xiyouWelfareInfo;
    };
    //房子
    ActivitySystem.prototype.setHouseInfo = function (houseData, playerInfo, power) {
        this.houseInfo = {};
        this.houseInfo.houseData = houseData;
        this.houseInfo.playerInfo = playerInfo;
        this.houseInfo.power = power;
    };
    ActivitySystem.prototype.getHouseInfo = function () {
        return this.houseInfo;
    };
    //得到冲值活动的信息//
    // getPayActivityEntryInfo(index) {
    // 	return ActivitySystem.PAY_ACTIVITY_ENTRY_INFO_LIST[index]
    // }
    ActivitySystem.prototype.isPayActivityIndex = function (index) {
        for (var k in PayActivityIndex) {
            var i = PayActivityIndex[k];
            if (i == index)
                return true;
        }
        return false;
    };
    //记录活动进程（每次start一次活动都自动递增+1）
    ActivitySystem.prototype.recordActivtyProcess = function () {
        this.activityProRecord = this.activityProRecord + 1;
    };
    ActivitySystem.prototype.getActivtyProcess = function () {
        return this.activityProRecord;
    };
    ActivitySystem.prototype.setOpenTime = function (openTime) {
        this.openTime = openTime;
    };
    ActivitySystem.prototype.getOpenTime = function () {
        return this.openTime;
    };
    ActivitySystem.prototype.getEndTime = function (openTime, durTime) {
        //开服时间
        if (openTime == null) {
            return;
        }
        //服务器时间
        var curTime = GetServerTime();
        var endTime = GetTodayTime(openTime + tonumber(durTime));
        return endTime - curTime;
    };
    // getActiveRankList(openTime) {
    // 	let menuList = GameConfig.OpenRankConfig
    // 	//排除过期活动
    // 	let tempList = []
    // 	for (let k in menuList) {
    // 		let v = menuList[k]
    // 		if (this.getEndTime(openTime, v.durTime) > 0) {
    // 			JsUtil.arrayInstert(tempList, v)
    // 		}
    // 	}
    // 	return tempList
    // }
    ActivitySystem.prototype.checkActivityIsOpen = function (index) {
        for (var i = 0; i < size_t(this.operateActivityOpenList); i++) {
            var ativityIndex = this.operateActivityOpenList[i];
            if (index == ativityIndex) {
                return true;
            }
        }
        return false;
    };
    return ActivitySystem;
}(BaseSystem));
__reflect(ActivitySystem.prototype, "ActivitySystem");
//# sourceMappingURL=ActivitySystem.js.map