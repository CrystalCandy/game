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


//////////////////////////////////////////////////////////////////////-
// function GetActiviByServerIndex(index) {
// 	let activity = null
// 	if (index == opDailyIndex.Six) {
// 		activity = GetActivity(ActivityDefine.SkyTower)//天空之塔
// 	}
// 	return activity
// }
ImportType(PayActivityIndex)

function GetActivity(index) {
	return ActivitySystem.getInstance().getActivity(index)
}

function StartActivity(index) {
	let activity = GetActivity(index)
	if (activity) {
		activity.start()
	}
}


function StopActivity(index) {
	let activity = GetActivity(index)
	if (activity) {
		activity.stop()
	}
}

//////////////////////////////////////////////////////////////////////-

class ActivityBase extends TClass {
	bStart: boolean;
	index: number;
	actIndex: number

	messageWndHandleIndex: any;
	public initObj(...args: any[]): void {
		this.bStart = false
		this.index = args[0]
		this.actIndex = checkNull(args[1], OrdinaryActivityIndex.UNDEFINEACTIVITY)
	}

	destory() {

	}

	onPrepareResource() {
	}

	onClear() {

	}


	getIndex() {
		return this.index
	}

	requestStart(args) {
	}

	requestStop() {
	}

	start() {
		if (this.bStart == false) {
			this.bStart = true
			ActivitySystem.getInstance().setCurActIndex(this.actIndex)
			ActivitySystem.getInstance().recordActivtyProcess()
			this.onStart()
		}
	}


	stop() {
		if (this.bStart == true) {
			this.bStart = false
			ActivitySystem.getInstance().setCurActIndex(OrdinaryActivityIndex.NULL)
			this.onStop()
		}
	}

	isStart() {
		return this.bStart
	}

	onStart() {
		TLog.Error("ActivityBase.onStart name%s implement me!!", this.classname)
	}

	onStop() {
		TLog.Error("ActivityBase.onStop name%s implement me!!", this.classname)
	}


	//简化界面响应代码
	updateMessageHandler(message, messageIndex?) {
		messageIndex = messageIndex || message.messageId
		if (!this.messageWndHandleIndex || PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
			return
		}

		if (!this.messageWndHandleIndex[messageIndex]) {
			TLog.Warn(this.classname + ".updateMessageHandler the messageId is Error	%s", messageIndex)
			return
		}

		//let selffunc = this.messageWndHandleIndex[messageIndex][1]
		let ignoreStart = this.messageWndHandleIndex[messageIndex][2]
		if (this.bStart == false && !ignoreStart) {
			return
		}

		this.handlerMessage(message, messageIndex)
		// if (FightSystem.getInstance().isFight()) {
		// 	return FightSystem.getInstance().addEndFightHandler(this.handlerMessage, this, table_copy(message))
		// } else {
		// 	return this.handlerMessage(message)
		// }
	}

	doMessageHandle(message, messageIndex) {
		let selffunc = this.messageWndHandleIndex[messageIndex][0]
		if (selffunc == null) {
			return true
		}
		let ignoreStart = this.messageWndHandleIndex[messageIndex][2]
		if (this.bStart == false && !ignoreStart) {
			return false
		}

		return selffunc.call(this, message, messageIndex)
	}

	handlerMessage(message, messageIndex) {
		if (this.doMessageHandle(message, messageIndex)) {
			let wndlist = this.messageWndHandleIndex[messageIndex][1]
			if (wndlist) {
				for (let _ = 0; _ < wndlist.length; _++) {
					let elem = wndlist[_]

					let windowName = elem[0]
					let wndFunc = elem[1]
					let directExe = elem[2]
					//param = elem[3] || null
					let wnd: BaseWnd = WngMrg.getInstance().getWindow(windowName)
					if (wnd) {
						if (directExe == null) {
							wnd.doCommand(wndFunc, message)
						} else {
							wnd[wndFunc].call(wnd, message)
						}
					}
				}
			}
		}
	}


}



/////////////////////////////////////////////////////////////////////

class ActivitySystem extends BaseSystem {
	activityMap: any;

	operateActivityOpenList: number[];
	operateActivityInfo: any;
	operateplayerInfo: any;
	openTime
	curOrdinaryActIndex: number;
	activityProRecord: number;
	lotteryResultInfo = {}
	xiyouWelfareInfo;
	houseInfo;


	public initObj(...args: any[]): void {

		this.activityMap = {}


		this.operateActivityOpenList = []//开放列表
		this.operateActivityInfo = {}
		this.operateplayerInfo = {}
		this.lotteryResultInfo = {}
		this.xiyouWelfareInfo = null
		this.houseInfo = null
		this.openTime = null //开服时间

		this.curOrdinaryActIndex = OrdinaryActivityIndex.NULL
		this.activityProRecord = 0;


	}

	destory() {
		this.onClear()
		for (let _ in this.activityMap) {
			let activity = this.activityMap[_]

			activity.deleteObj()
		}
		this.activityMap = {}
	}

	//准备资源，把自己的workunit加载队列里
	prepareResource(workQueue) {
		GameConfig.initActivitySystemCsv(workQueue);

		for (let i in ActivityMapDefine) {
			let info = ActivityMapDefine[i]

			if (info.init) {
				this.getActivity(i)
			}
		}

	}

	onClear() {
		for (let _ in this.activityMap) {
			let activity = this.activityMap[_]

			activity.stop()
			activity.onClear()
		}

		

	}


	getActivity(index) {
		let a = this.activityMap[index]

		//延迟加载活动
		if (a == null) {
			let info = ActivityMapDefine[index]

			var defineClass = egret.getDefinitionByName(info.name);
			if (defineClass == null) {
				TLog.Error("getDefinitionByName _G[%s] not exsit", info.name);
			} else {
				//wnd = new defineClass(info);
				TLog.Assert(defineClass.newObj != null); //必须继承TClass
				a = defineClass.newObj(index, info.actIndex);
				a.onPrepareResource()
				this.activityMap[index] = a
			}
		}

		return a
	}



	//当前进行中的（start）活动索引，定义对应OrdinaryActivityIndex
	setCurActIndex(actIndex) {
		this.curOrdinaryActIndex = actIndex
	}

	getCurActIndex() {
		return this.curOrdinaryActIndex || OrdinaryActivityIndex.NULL
	}


	


	//开放列表////-
	setOperateActivityOpenList(indexList:number[]) {
		this.operateActivityOpenList = indexList
	}

	getOperateActivityOpenList() {
		return this.operateActivityOpenList
	}



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
	setOperateActivityInfo(index, info) {
		this.operateActivityInfo[index] = info
	}

	getOperateActivityInfo(index) {
		return this.operateActivityInfo[index]
	}

	//后台活动信息
	setOperatePlayerInfo(index, info) {
		this.operateplayerInfo[index] = info
	}

	getOperatePlayerInfo(index) {
		return this.operateplayerInfo[index]
	}

	//抽奖结果
	setOperateLotteryResultInfo(index, info) {
		this.lotteryResultInfo[index] = info
	}

	getOperateLotteryResultInfo(index) {
		return this.lotteryResultInfo[index]
	}

	//西游大厅
	setXiyouWelfareInfo(level, playerInfo) {
		this.xiyouWelfareInfo = {}
		this.xiyouWelfareInfo.level = level
		this.xiyouWelfareInfo.playerInfo = playerInfo
	}

	getXiyouWelfareInfo() {
		return this.xiyouWelfareInfo
	}

	//房子
	setHouseInfo(houseData, playerInfo, power) {
		this.houseInfo = {}
		this.houseInfo.houseData = houseData
		this.houseInfo.playerInfo = playerInfo
		this.houseInfo.power = power
	}

	getHouseInfo() {
		return this.houseInfo
	}
	

	//得到冲值活动的信息//
	// getPayActivityEntryInfo(index) {
	// 	return ActivitySystem.PAY_ACTIVITY_ENTRY_INFO_LIST[index]
	// }

	 isPayActivityIndex(index) {
		 for(let k in PayActivityIndex){
			 let i = PayActivityIndex[k]

			 if(i == index)
			 	return true;
		 }
		 return false
	 }

	//记录活动进程（每次start一次活动都自动递增+1）
	recordActivtyProcess() {
		this.activityProRecord = this.activityProRecord + 1
	}

	getActivtyProcess() {
		return this.activityProRecord
	}

	setOpenTime(openTime) {
		this.openTime = openTime
	}

	getOpenTime() {
		return this.openTime
	}

	getEndTime(openTime, durTime) {
		//开服时间
		if (openTime == null) {
			return
		}
		//服务器时间
		let curTime = GetServerTime()
		let endTime = GetTodayTime(openTime + tonumber(durTime))

		return endTime - curTime
	}

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

	checkActivityIsOpen(index) {
		for(let i = 0;i<size_t(this.operateActivityOpenList);i++){
			let ativityIndex = this.operateActivityOpenList[i]
			if(index == ativityIndex){
				return true
			}
		}
		return false
	}
}