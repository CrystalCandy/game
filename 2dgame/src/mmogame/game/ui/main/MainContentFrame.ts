class MainContentFrame extends BaseWnd {
	wndList: any

	public initObj(...params: any[]) {
		this.wndList = {}
		this.mLayoutPaths = ["layouts/MainContentLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreenRaw(true)
		this.initSkinElemList();

		this.mLayoutNode.touchEnabled = false;
		this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)

		var elemInfo = [

			//背包和日常
			// { ["name"]: "btn_bag", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onBeiBaoClick },
			// { ["name"]: "btn_daily", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onDailyClick },


			{ ["name"]: "map_wnd", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickMapWnd },
			{ ["name"]: "capture_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCapture },

		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		this.mElemList["map_name"].setAlignFlag(gui.Flag.H_CENTER)
		this.mElemList["map_xy"].setAlignFlag(gui.Flag.H_CENTER)

		this.wndList["task"] = MainTaskWnd.newObj(this.mLayoutNode, this)
		this.wndList["preview"] = MainPreviewWnd.newObj(this.mLayoutNode, this)//yangguiming 暂时屏蔽
		this.wndList["fight"] = MainFightWnd.newObj(this.mLayoutNode, this)
		this.wndList["activity"] = MainActivityWnd.newObj(this.mLayoutNode, this)

		let group = <eui.Group>this.mElemList["preview_wnd"]
		group.touchEnabled = false

		RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
		RegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this)

	}

	// test(){


	// 	UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.test, this)
	// }

	public onUnLoad(): void {
		UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
		UnRegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this)
	}

	public onShow(): void {
		RegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this)
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		// RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.test, this)
		this.mLayoutNode.visible = true;
		this.mLayoutNode.moveToBack()

		this.wndList["task"].showWnd()
		this.wndList["preview"].showWnd()
		this.wndList["fight"].showWnd()
		this.wndList["activity"].showWnd()

		this.refreshFrame()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)

		this.mLayoutNode.visible = false;

		this.wndList["task"].hideWnd()
		this.wndList["preview"].hideWnd()
		this.wndList["fight"].showWnd()
		this.wndList["activity"].hideWnd()
	}

	refreshFrame() {
		//捕捉按钮
		let record = checkNull(getSaveRecord(opSaveRecordKey.capturePet), [])
		if (!record[0]) {
			this.mElemList["capture_btn"].visible = false
		} else {
			this.mElemList["capture_btn"].visible = true
		}
	}

	//背包
	// onBeiBaoClick(args) {
	// 	ExecuteMainFrameFunction("beibao")
	// }
	// onDailyClick(args) {
	// 	ExecuteMainFrameFunction("richang")
	// }


	onClickMapWnd() {
		ExecuteMainFrameFunction("ditu")
	}

	onClickCapture(args) {
		RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.CapturePet, 0)
	}

	onCombatBegin() {
		let [fightType, _] = FightSystem.getInstance().getCurFightType()
		if (fightType == opFightResultType.PATROL) {
			this.showWnd()
		} else {
			this.hideWnd()
		}
	}

	onCombatEnd() {
		this.showWnd()
	}


	refreshMapPos(args) {
		let mapId = MapSystem.getInstance().getMapId()
		AddRdContent(this.mElemList["map_name"], "", "ht_24_cc_stroke", "white")

		for (let _ in GameConfig.MapEnterList) {
			let config = GameConfig.MapEnterList[_]

			if (config.inMapId == mapId) {
				AddRdContent(this.mElemList["map_name"], config.inMapName, "ht_24_cc_stroke", "white")
			}
		}

		let campId = CampaignSystem.getInstance().getCurOpenCampaign()
		if (campId) { //更新关卡进度
			AddRdContent(this.mElemList["map_xy"], GameConfig.CampaignConfig[campId].indexName, "ht_20_cc_stroke", "lime")
		} else { //更新坐标

			let target = args.actor
			let x = target.getCellX()
			let y = target.getCellY()

			AddRdContent(this.mElemList["map_xy"], "[" + x + "," + y + "]", "ht_20_cc_stroke", "lime")
		}
	}
}