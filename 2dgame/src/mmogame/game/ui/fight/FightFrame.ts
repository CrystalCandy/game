class FightFrame extends BaseWnd {
	mElemList: any;
	wndList: any;
	timerList: any;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/FightLayout.exml"]
		this.wndList = {}
		this.timerList = {}
	}

	public onLoad(): void {
		//this.mElemList = this.mParentWnd.mElemList
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.initSkinElemList();
		this.setFullScreenRaw(true)
		this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)

		var elemInfo = [
			{ ["name"]: "fight_forceend",     ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickForceend },
		]
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		// this.mElemList["task_wnd"].visible = false
		// this.mElemList["auto_wnd"].visible = false
		// this.mElemList["preview_wnd"].visible = false
		//this.mElemList["msg_wnd"].visible = false

		this.wndList = {
			// [opFightResultType.CAMPAGIN]: FightCampaignWindow.newObj(this.mLayoutNode, this),
			[opFightResultType.DRAGON]: FightCopyDragonWindow.newObj(this.mLayoutNode, this),
			[opFightResultType.CAPTURE]: FightCapttureWindow.newObj(this.mLayoutNode, this),
			
		}

		RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
		RegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this)
	}

	public onUnLoad(): void {
		UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
		UnRegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this)
	}

	public onShow(): void {
		RegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this)
		// this.mElemList["combat_group"].visible = true
		// this.mElemList["chat_wnd"].visible = true

		this.mLayoutNode.visible = true
		this.mLayoutNode.moveToBack()
		this.refresh()

		this.checkForceEnd()
		// let tick = function(delay) {
		// 	this.mElemList["fight_forceend"].visible = true
		// }
		// this.timerList["forceend"] = SetTimer(tick, this, 2000, false)
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this)

		this.mLayoutNode.visible = false
		// this.mElemList["combat_group"].visible = false
		// this.mElemList["chat_wnd"].visible = false

		for (let _ in this.timerList) {
			let timer = this.timerList[_]
			KillTimer(timer)
		}
		this.timerList = {}
	}

	public onCombatBegin(): void {
		this.showWnd()
	}

	public onCombatEnd(): void {
		this.hideWnd()
	}
	

	refresh() {
		this.onFightRoundUpdate(null)

		if (FightSystem.getInstance().isFight() == true) {
			let [fightType, _] = FightSystem.getInstance().getCurFightType()
			let flag = -1

			for (let _ in this.wndList) {
				let fType = tonumber(_)
				let v = this.wndList[_]

				if (fType == fightType) {
					flag = fType						//有战斗中的特殊界面显示
				} else {
					v.hideWnd()
				}
			}

			if(flag != -1){
				let wnd = this.wndList[flag]
				wnd.showWnd()
			}
			// if (flag < 0) {
			// 	this.refreshNormal(true)
			// } else {
			// 	this.refreshNormal(false)

			// 	let wnd = this.wndList[flag]
			// 	wnd.showWnd()
			// }
		} else {
			//this.refreshNormal(true)
			
		}
	}

	onFightRoundUpdate(args) {
		let [curRound, maxRound] = FightSystem.getInstance().getCurFightRound()
		
		//捕捉只有一回合
		let [fightType, _] = FightSystem.getInstance().getCurFightType()
		if (fightType == opFightResultType.CAPTURE) {
			curRound = 1
			maxRound = 1
		}

		let batchImage = this.mElemList["fight_round_bam"]
		DrawNumberStringImage(batchImage, "zhanLi_", curRound + "f" + maxRound)
		// batchImage.beginDraw();
		// batchImage.drawNumberString("zhanLi_", curRound + "z" + maxRound);
		// batchImage.endDraw();
		this.checkForceEnd()
		
	}

	checkForceEnd() {
		//先简单检查跳过规则，具体看禅道
		let [curRound, maxRound] = FightSystem.getInstance().getCurFightRound()
		let [fightType, _] = FightSystem.getInstance().getCurFightType()

		let check = curRound > 3
		if (fightType == opFightResultType.PATROL) {//挂机
			check = false
		}else if(fightType == opFightResultType.DRAGON){ //龙王宝藏
			
		}
		this.mElemList["fight_forceend"].visible = check
	}

	//////////////////////////////////////////////////////
	onClickForceend(args) {
		FightSystem.getInstance().forceEndFight()
	}
	// refreshNormal(visible: boolean=true) {
	// 	if (visible == true) {
	// 		this.mElemList["map_wnd"].visible = true
	// 		//this.mElemList["preview_wnd"].visible = true
	// 		//this.mElemList["wing_rank_btn"].visible = true
	// 		this.mElemList["func_wnd"].visible = true
	// 		// this.mElemList["task_wnd"].visible = true
	// 		// this.mElemList["auto_wnd"].visible = true
	// 		// this.mElemList["msg_wnd"].visible = true
	// 	} else {
	// 		this.mElemList["map_wnd"].visible = false
	// 		//this.mElemList["preview_wnd"].visible = false
	// 		//this.mElemList["wing_rank_btn"].visible = false
	// 		this.mElemList["func_wnd"].visible = false
	// 		// this.mElemList["task_wnd"].visible = false
	// 		// this.mElemList["auto_wnd"].visible = false
	// 		// this.mElemList["msg_wnd"].visible = false
	// 	}
	// }


}
