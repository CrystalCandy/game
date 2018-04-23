// TypeScript file

class ClubMapFrame extends BaseWnd {

	hideAction: MoveAction;
	showAction: MoveAction;

	timer: number;

	isHide: boolean;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/club/ClubMapLayout.exml"]

		this.isHide = false
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true, false)
		this.initSkinElemList();

		this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)
		this.mLayoutNode.touchEnabled = false;

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.leaveClubMap },
			{ ["name"]: "control_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.startMoveAction },

			//帮会召集 帮会收购
			{ ["name"]: "convene_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickConvene },
			{ ["name"]: "purchase_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPurchase },

			//一键完成
			{ ["name"]: "colt_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onekeyCollect },
			{ ["name"]: "intr_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onekeyInstrusion },

			//领取
			{ ["name"]: "colt_get_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGetCollectPrize },
			{ ["name"]: "intr_get_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGetInstrusionPrize },

			//重置
			{ ["name"]: "colt_reset_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.resetCollectTask },
			{ ["name"]: "intr_reset_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.resetInstrusionTask },

			{ ["name"]: "map_wnd", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickMapWnd }
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		for (let i = 0; i < 3; i++) {
			this.mElemList["colt_item" + i] = UIItemBox.newObj(this.mLayoutNode, "colt_item" + i, 0, 0, this.mElemList["colt_prize_wnd"], 0.75)
			this.mElemList["intr_item" + i] = UIItemBox.newObj(this.mLayoutNode, "intr_item" + i, 0, 0, this.mElemList["intr_prize_wnd"], 0.75)
		}

		let coltCheck = <eui.CheckBox>this.mElemList["colt_check"]
		let intrCheck = <eui.CheckBox>this.mElemList["intr_check"]
		coltCheck.addEventListener(egret.TouchEvent.CHANGE, this.changeColtCheck, this)
		intrCheck.addEventListener(egret.TouchEvent.CHANGE, this.chaneIntrCheck, this)

		var data: any = { ["startX"]: 0, ["startY"]: 66, ["endX"]: -200, ["endY"]: 66, ["moveType"]: "inertional", }
		this.hideAction = MoveAction.newObj(this.mElemList["task_wnd"], 300, data, null, this)

		var data: any = { ["startX"]: -200, ["startY"]: 66, ["endX"]: 0, ["endY"]: 66, ["moveType"]: "inertional", }
		this.showAction = MoveAction.newObj(this.mElemList["task_wnd"], 300, data, null, this)

		this.mElemList["colt_cost"].setAlignFlag(gui.Flag.RIGHT)
		this.mElemList["intr_cost"].setAlignFlag(gui.Flag.RIGHT)

		this.mElemList["map_name"].setAlignFlag(gui.Flag.H_CENTER)
		this.mElemList["map_xy"].setAlignFlag(gui.Flag.H_CENTER)

		this.mElemList["task_group"].touchEnabled = false;

		this.mElemList["colt_progress"].visible = false

		this.mElemList["colt_ctrl_wnd"].visible = false
		this.mElemList["colt_get_wnd"].visible = false
		this.mElemList["colt_reset_wnd"].visible = false
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this)
		RegisterEvent(EventDefine.CLUB_TASK_COMP_REFRESH, this.refreshFrame, this)
		RegisterEvent(EventDefine.HERO_ENTER_MAP, this.refreshMapPos, this)
		this.mLayoutNode.visible = true;
		this.refreshFrame();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this)
		UnRegisterEvent(EventDefine.CLUB_TASK_COMP_REFRESH, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.refreshMapPos, this)
		this.mLayoutNode.visible = false;
		this.hideAction.deleteObj()
		this.showAction.deleteObj()

		if (this.timer) {
			KillTimer(this.timer)
			this.timer = null
		}
	}

	refreshFrame() {
		let clubInfo = ClubSystem.getInstance().getCurClubInfo()

		let recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || []
		let coltTime = recordList[0] || 0
		let coltLimit = GameConfig.FactionMapTaskConfig[1][clubInfo.level].maxCount
		let intrTime = recordList[1] || 0
		let intrLimit = GameConfig.FactionMapTaskConfig[2][clubInfo.level].maxCount

		let prizeList = getSaveRecord(opSaveRecordKey.facMapTaskPrizeGet) || []
		let coltRecord = prizeList[0] || 0
		let intrRecord = prizeList[1] || 0

		this.mElemList["colt_title"].text = String.format(Localize_cns("CLUB_TXT32"), coltTime, coltLimit)
		this.mElemList["intr_title"].text = String.format(Localize_cns("CLUB_TXT33"), intrTime, intrLimit)

		let coltItem = AnalyPrizeFormat(GameConfig.FactionMapTaskConfig[1][clubInfo.level].prizeAll)
		let intrItem = AnalyPrizeFormat(GameConfig.FactionMapTaskConfig[2][clubInfo.level].prizeAll)

		for (let i = 0; i < 3; i++) {
			if (coltItem[i]) {
				this.mElemList["colt_item" + i].updateByEntry(coltItem[i][0], coltItem[i][1])
				this.mElemList["colt_item" + i].setVisible(true)
			} else {
				this.mElemList["colt_item" + i].setVisible(false)
			}

			if (intrItem[i]) {
				this.mElemList["intr_item" + i].updateByEntry(intrItem[i][0], intrItem[i][1])
				this.mElemList["intr_item" + i].setVisible(true)
			} else {
				this.mElemList["intr_item" + i].setVisible(false)
			}
		}

		if (coltTime == coltLimit) {
			this.mElemList["colt_ctrl_wnd"].visible = false
			//领取记录判断
			if (coltRecord == 0) { //没有领取
				this.mElemList["colt_get_wnd"].visible = true
				this.mElemList["colt_reset_wnd"].visible = false
				this.mElemList["colt_cost"].clear()
			} else {
				this.mElemList["colt_get_wnd"].visible = false
				this.mElemList["colt_reset_wnd"].visible = true
				this.mElemList["colt_cost"].setAlignFlag(gui.Flag.H_CENTER)
				AddRdContent(this.mElemList["colt_cost"], "#BIND_YUANBAO" + GameConfig.FactionMapTaskConfig[1][clubInfo.level].resetMoney, "ht_20_cc", "orange")
			}

			//移出npc位置
			GetActivity(ActivityDefine.ClubMap).removeCollectNpc()
		} else {
			this.mElemList["colt_ctrl_wnd"].visible = true
			this.mElemList["colt_get_wnd"].visible = false
			this.mElemList["colt_reset_wnd"].visible = false
			this.mElemList["colt_cost"].setAlignFlag(gui.Flag.RIGHT)
			AddRdContent(this.mElemList["colt_cost"], "#YUANBAO" + GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney, "ht_20_cc", "orange")

			//刷新npc位置
			GetActivity(ActivityDefine.ClubMap).changeCollectNpc()
		}

		if (intrTime == intrLimit) {
			this.mElemList["intr_ctrl_wnd"].visible = false
			//领取记录判断
			if (intrRecord == 0) { //没有领取
				this.mElemList["intr_get_wnd"].visible = true
				this.mElemList["intr_reset_wnd"].visible = false
				this.mElemList["intr_cost"].clear()
			} else {
				this.mElemList["intr_get_wnd"].visible = false
				this.mElemList["intr_reset_wnd"].visible = true
				this.mElemList["intr_cost"].setAlignFlag(gui.Flag.H_CENTER)
				AddRdContent(this.mElemList["intr_cost"], "#BIND_YUANBAO" + GameConfig.FactionMapTaskConfig[2][clubInfo.level].resetMoney, "ht_20_cc", "orange")
			}

			//移出npc位置
			GetActivity(ActivityDefine.ClubMap).removeInstrusionNpc()
		} else {
			this.mElemList["intr_ctrl_wnd"].visible = true
			this.mElemList["intr_get_wnd"].visible = false
			this.mElemList["intr_reset_wnd"].visible = false
			this.mElemList["intr_cost"].setAlignFlag(gui.Flag.RIGHT)
			AddRdContent(this.mElemList["intr_cost"], "#YUANBAO" + GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney, "ht_20_cc", "orange")
		}

		if (this.isHide) {
			UiUtil.setXY(this.mElemList["task_wnd"], -200, 66)
		} else {
			UiUtil.setXY(this.mElemList["task_wnd"], 0, 66)
		}
	}

	leaveClubMap() {
		let a = GetActivity(ActivityDefine.ClubMap)
		a.requestStop()
	}

	startMoveAction(event: egret.TouchEvent) {
		if (this.hideAction.isRunning() || this.showAction.isRunning()) {
			return
		}

		this.isHide = !this.isHide

		if (this.isHide) {
			this.hideAction.run()
		} else {
			this.showAction.run()
		}
	}

	onClickConvene() {
		MsgSystem.confirmDialog_YES(Localize_cns("CLUB_TXT103"))
	}

	onClickPurchase() {
		ExecuteMainFrameFunction("shougou")
	}

	onekeyCollect(args) {
		let clubInfo = ClubSystem.getInstance().getCurClubInfo()
		let str = String.format(Localize_cns("CLUB_TXT102"), GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney)
		var t: IDialogCallback = {
			onDialogCallback(result: boolean, userData): void {
				if (result) {
					let myRmb = GetHeroProperty("gold")
					if (myRmb < GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney) {
						ExecuteMainFrameFunction("chongzhi")
					} else {
						RpcProxy.call("C2G_FactionMapTaskOneKey", 1)
					}
				}
			}
		}
		MsgSystem.confirmDialog(str, t, null)
	}

	onekeyInstrusion(args) {
		let clubInfo = ClubSystem.getInstance().getCurClubInfo()
		let str = String.format(Localize_cns("CLUB_TXT102"), GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney)
		var t: IDialogCallback = {
			onDialogCallback(result: boolean, userData): void {
				if (result) {
					let myRmb = GetHeroProperty("gold")
					if (myRmb < GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney) {
						ExecuteMainFrameFunction("chongzhi")
					} else {
						RpcProxy.call("C2G_FactionMapTaskOneKey", 2)
					}
				}
			}
		}
		MsgSystem.confirmDialog(str, t, null)
	}

	onClickMapWnd() {
		ExecuteMainFrameFunction("ditu")
	}

	refreshMapPos(args) {
		let target = args.actor
		let x = 0
		let y = 0
		if (target) {
			x = target.getCellX()
			y = target.getCellY()
		}
		else {
			var heroPoint = GetHero().getCellXY()
			x = heroPoint.x
			y = heroPoint.y
		}

		let mapId = MapSystem.getInstance().getMapId()

		AddRdContent(this.mElemList["map_name"], Localize_cns("CLUB_TXT10"), "ht_24_cc_stroke", "white")

		for (let _ in GameConfig.MapEnterList) {
			let config = GameConfig.MapEnterList[_]

			if (config.inMapId == mapId) {
				AddRdContent(this.mElemList["map_name"], config.inMapName, "ht_24_cc_stroke", "white")
			}
		}

		AddRdContent(this.mElemList["map_xy"], "[" + x + "," + y + "]", "ht_20_cc_stroke", "lime")
	}

	changeColtCheck(event: egret.TouchEvent) {

	}

	chaneIntrCheck(event: egret.TouchEvent) {

	}

	onGetCollectPrize() {
		RpcProxy.call("C2G_FactionMapTaskPrize", 1)
	}

	onGetInstrusionPrize() {
		RpcProxy.call("C2G_FactionMapTaskPrize", 2)
	}

	resetCollectTask() {
		RpcProxy.call("C2G_FactionMapTaskReset", 1)
	}

	resetInstrusionTask() {
		RpcProxy.call("C2G_FactionMapTaskReset", 2)
	}

	///////////////////////////////////////////////////////////////////
	startAnim() {
		this.mLayoutNode.setDoModal(true)
		this.mElemList["colt_progress"].visible = true

		if (this.timer) {
			KillTimer(this.timer)
			this.timer = null
		}

		let count = 1
		this.timer = SetTimer(function (delay) {
			UiUtil.updateProgress(this.mElemList["colt_progress"], count, 100)
			if (count < 100) {
				count += 1
			} else {
				this.endAnim()
			}
		}, this, 100, false)
	}

	endAnim() {
		if (this.timer) {
			KillTimer(this.timer)
			this.timer = null
		}

		this.mLayoutNode.setDoModal(false)
		this.mElemList["colt_progress"].visible = false

		RpcProxy.call("C2G_FactionMapTaskFinishOnce", 1)

		UiUtil.updateProgress(this.mElemList["colt_progress"], 0, 100)
	}
}