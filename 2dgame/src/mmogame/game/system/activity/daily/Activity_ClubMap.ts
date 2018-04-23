// TypeScript file
/*
作者:
	
创建时间：

意图：
  	公会地图

公共接口：
	
*/
let CLUB_COLLECT_ID = 22041
let CLUB_INSTRUSION_ID = 22042

class Activity_ClubMap extends ActivityBase {

	coltNPC: Npc;

	coltNpcId: number;
	intrNpcId: number;

	array: any[];
	count: number;
	time: number;

	public initObj(...args: any[]): void {

	}

	onClear() {
	}

	destory() {

	}

	onPrepareResource() {

	}

	//活动请求开始
	requestStart() {
		if(CheckEndFightNow() == false)
			return
		RpcProxy.call("C2G_FactionMapEnter")
	}

	requestStop() {
		RpcProxy.call("C2G_FactionMapLeave")
	}

	onStart() {
		
		RegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this)
		RegisterEvent(EventDefine.COMBAT_BEGIN, this.onBattleBegin, this)
		RegisterEvent(EventDefine.COMBAT_END, this.onBattleEnd, this)
		PushUIShow(null, ["MainFrame"])
		StateManager.getInstance().ActiveSubState(state_type.LIVE_ACTIVITY_STATE)

		let wnd = WngMrg.getInstance().getWindow("ClubMapFrame")
		wnd.showWnd()

		wnd = WngMrg.getInstance().getWindow("MainFrame")
		wnd.doCommand("setHeadGroupVisible", true)
	}

	onStop() {
		if (FightSystem.getInstance().isFight() == true) {
			FightSystem.getInstance().addEndFightHandler(this._Stop, this, null)
		} else {
			this._Stop()
		}
	}

	_Stop() {
		UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this)
		UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onBattleBegin, this)
		UnRegisterEvent(EventDefine.COMBAT_END, this.onBattleEnd, this)

		PopUIShow()
		StateManager.getInstance().DeactiveSubState(state_type.LIVE_ACTIVITY_STATE)

		let wnd = WngMrg.getInstance().getWindow("MainFrame")
		wnd.doCommand("setHeadGroupVisible", true)

		this.removeCollectNpc()
		this.removeInstrusionNpc()
	}

	onBattleBegin() {
		this.coltNPC = null
		this.coltNpcId = null
		this.intrNpcId = null
	}

	onBattleEnd() {
		this.initTask()
	}

	initTask() {
		this.initCollectTask()
		this.initInstrusionTask()
	}

	initCollectTask() {
		if (this.checkCollectComplete()) {
			return
		}

		let npcInfo: any = {}
		let pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY())
		npcInfo["cellx"] = pos[0]
		npcInfo["celly"] = pos[1]
		npcInfo["dir"] = 3
		npcInfo["entryId"] = CLUB_COLLECT_ID
		this.coltNpcId = GenCharaterId()
		npcInfo["id"] = this.coltNpcId
		npcInfo["name"] = ""
		npcInfo["param"] = {}
		npcInfo["taskInfo"] = {}

		this.coltNPC = ActorManager.getInstance().createNpc(npcInfo)
	}

	changeCollectNpc() {
		let pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY())
		let cellx = pos[0]
		let celly = pos[1]
		if (this.coltNPC) {
			this.coltNPC.setCellXY(cellx, celly)
		}
	}

	removeCollectNpc() {
		ActorManager.getInstance().deleteNpc(this.coltNpcId)
		this.coltNpcId = null
		this.coltNPC = null
	}

	initInstrusionTask() {
		if (this.checkInstrusionComplete()) {
			return
		}

		let npcInfo: any = {}
		let pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY())
		npcInfo["cellx"] = pos[0]
		npcInfo["celly"] = pos[1]
		npcInfo["dir"] = 3
		npcInfo["entryId"] = CLUB_INSTRUSION_ID
		this.intrNpcId = GenCharaterId()
		npcInfo["id"] = this.intrNpcId
		npcInfo["name"] = ""
		npcInfo["param"] = {}
		npcInfo["taskInfo"] = {}

		ActorManager.getInstance().createNpc(npcInfo)
	}

	removeInstrusionNpc() {
		ActorManager.getInstance().deleteNpc(this.intrNpcId)
		this.intrNpcId = null
	}

	getRandLocalPosition(cellx, celly, scope?) {
		scope = scope || 30
		let RandomNUm = Math.ceil(Math.random() * scope * 2)
		let dx = RandomNUm - scope
		let dy = RandomNUm - scope

		let maxdeep = 30
		let deep = 0
		let wantX = cellx + dx
		let wantY = celly + dy
		while (SceneManager.getInstance().isBlock(wantX, wantY)) {
			let dx = RandomNUm - scope
			let dy = RandomNUm - scope
			wantX = cellx + dx
			wantY = celly + dy

			deep = deep + 1
			if (deep >= maxdeep) {
				wantX = cellx
				wantY = celly
				break
			}
		}

		return [wantX, wantY]
	}

	checkCollectComplete() {
		let recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || []
		let coltTime = recordList[0] || 0
		let coltLimit = GameConfig.FactionMapTaskConfig[1].maxCount
		return coltTime == coltLimit
	}

	checkInstrusionComplete() {
		let recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || []
		let intrTime = recordList[1] || 0
		let intrLimit = GameConfig.FactionMapTaskConfig[2].maxCount
		return intrTime == intrLimit
	}

	setExchangeData(array, count, time) {
		this.array = array
		this.count = count
		this.time = time
	}

	getExchangeData() {
		let t: any = {}
		t.array = this.array
		t.count = this.count
		t.time = this.time
		return t
	}

	/////////////////////////////////////////////////////////////////
	//-进入活动关闭窗口
	onHeroEnterMap(index) {
		let mapId = MapSystem.getInstance().getMapId()
		if (mapId != 50100) {
			return
		}

		this.initTask()
	}

}