class MainPreviewWnd extends BaseCtrlWnd {
	controlDataList: any;

	public initObj(...params: any[]): void {
		this.controlDataList = {}
	}
	public onLoad(): void {
		this.createFrame()
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, this.refreshFrame, this)

		//this.requestMeiri = false;
		this.mElemList["preview_wnd"].visible = true
		this.refreshFrame()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, this.refreshFrame, this)

		this.mElemList["preview_wnd"].visible = false
	}

	refreshFrame() {
		this.controlDataList = {}
		let list = []
		for (let _ in GameConfig.FuncPreviewConfig) {
			let v = GameConfig.FuncPreviewConfig[_]
			table_insert(list, v)
		}
		table_sort(list, function (a, b) { return a.funcIndex - b.funcIndex })

		let flag = false
		let config = null
		for (let i = 0; i < list.length; i++) {
			let v = list[i]
			if (GuideSystem.getInstance().isFuncOpen(v.funcName, true) == false) {				//未开启
				flag = true
				config = v
				break
			}
		}

		if (flag == false) {
			this.mElemList["preview_wnd"].visible = false
		} else {
			this.mElemList["preview_wnd"].visible = true

			this.mElemList["preview_name"].text = config.name

			let actorElem = <UIActorView>this.mElemList["preview_view"]
			actorElem.clearView()
			let modelID = config.monModelId

			this.mElemList["preview_anim_box"].visible = false

			if (modelID) {
				let modelType = ""
				let modelShape = ""
				if (config.shape && size_t(config.shape) > 0) {
					modelType = config.shape[0][0]
					modelShape = config.shape[0][1]
				}

				actorElem.setActorScale(config.scale)
				actorElem.setXY(config.pos[0][0] || 0, config.pos[0][1] || 0)
				if (modelType == "role") {
					let playerInfo = GetHeroPropertyInfo()
					let modelList: any = {}
					modelList[modelShape] = modelID
					actorElem.updateByPlayerSomeInfo(playerInfo, modelList)
				} else {
					actorElem.updateByPlayer(modelID)
				}
			} else {
				actorElem.clearView()
				this.mElemList["preview_anim_box"].setAnimName(config.effect)
				this.mElemList["preview_anim_box"].visible = true
			}

			AddRdContent(this.mElemList["open_level"], config.conditionDes, "ht_18_cc_stroke", "white")

			this.controlDataList["preview_btn"] = config.funcName
		}
	}

	createFrame() {
		this.mElemList = this.mParentWnd.mElemList;

		var elemInfo = [
			{ ["name"]: "preview_anim_box", ["messageFlag"]: true },
			{ ["name"]: "preview_view_group", ["messageFlag"]: true },
			{ ["name"]: "open_level", ["messageFlag"]: true },
			{ ["name"]: "preview_name_pic", ["messageFlag"]: true },
			{ ["name"]: "preview_name", ["messageFlag"]: true },
			{ ["name"]: "preview_view_group", ["messageFlag"]: true },
			{ ["name"]: "preview_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPreview },

		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		this.mElemList["preview_view"] = UIActorView.newObj(this.mLayoutNode, "preview_view", 0, 0, this.mElemList["preview_view_group"])
		//this.mElemList["preview_view"].updateByPlayer(20001)

		this.mElemList["open_level"].setAlignFlag(gui.Flag.CENTER_CENTER)

		this.mElemList["preview_anim_box"].visible = false
	}

	//////////////////////////////////////////////////
	onClickPreview(args) {
		let name = args.target.name
		if (!this.controlDataList[name]) {
			return
		}

		let funcIndex = this.controlDataList[name]
		let wnd = WngMrg.getInstance().getWindow("FuncPreviewFrame")
		wnd.showFuncPreviewFrame(funcIndex)
	}
}