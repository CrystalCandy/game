class PetClearFrame extends BaseWnd {
	petId: number;
	lockList: any[];

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/pet/PetClearLayout.exml"]

		this.petId = -1
		this.lockList = []
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "wash_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickLowWash },
			{ ["name"]: "high_wash_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickHighWash },
			{ ["name"]: "exchange_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickExchange },

			{ ["name"]: "btn_close", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

			{ ["name"]: "auto", ["color"]: gui.Color.saddlebrown }
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		AddRdContent(this.mElemList["clear_tips_rd"], Localize_cns("PET_TXT7"), "ht_20_cc", "ublack", 3)

		for (let i = 0; i < 6; i++) {
			let checkBox = <eui.CheckBox>this.mElemList["lt_check" + i]
			checkBox.addEventListener(egret.TouchEvent.CHANGE, this.onClickCheckBox, this)

			this.mElemList["skillBox_lt_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_lt_" + i, 0, 0, this.mElemList["lt_wnd" + i])

			this.mElemList["rt_check" + i].touchEnabled = false

			this.mElemList["skillBox_rt_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_rt_" + i, 0, 0, this.mElemList["rt_wnd" + i])
		}

		this.mElemList["prop_rd"].setAlignFlag(gui.Flag.H_CENTER)
		this.mElemList["high_prop_rd"].setAlignFlag(gui.Flag.H_CENTER)
		this.mElemList["skill_lock_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		//RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshItem, this)
		RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
		this.mLayoutNode.visible = true;
		this.refreshFrame()
	}

	public onHide(): void {
		//UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshItem, this)
		UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
		this.mLayoutNode.visible = false;
	}

	refreshFrame() {
		if (this.petId <= 0) return;

		let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
		let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

		//当前技能列表
		let curList = petConfigInfo.passiveskill
		if (petNetInfo.passskilllist && size_t(petNetInfo.passskilllist) > 0) {
			curList = petNetInfo.passskilllist
		}

		//洗练技能列表
		let washList = petNetInfo.washskilllist || []

		for (let i = 0; i < 6; i++) {
			//当前技能
			if (curList[i]) {
				let skillId = curList[i]
				this.mElemList["skillBox_lt_" + i].updatePetSkill(skillId)
				this.mElemList["lt_check" + i].visible = true

				let info = SkillSystem.getInstance().getPetSkillInfo(skillId)
				let quality = info.quality
				let color = SkillSystem.getInstance().getSkillColor(quality)
				let sName = SkillSystem.getInstance().getSkillName(skillId)
				let sDes = SkillSystem.getInstance().getSkillDes(skillId)
				let str = "#" + color + sName + "#br#saddlebrown" + sDes
				AddRdContent(this.mElemList["lt_rd" + i], str, "ht_20_cc", "saddlebrown", 5)
			} else {
				this.mElemList["lt_check" + i].visible = false
				this.mElemList["skillBox_lt_" + i].lock()
				AddRdContent(this.mElemList["lt_rd" + i], Localize_cns("NOT_OPEN"), "ht_20_cc", "saddlebrown")
			}

			//洗练技能
			if (washList[i]) {
				let skillId = washList[i]
				this.mElemList["skillBox_rt_" + i].updatePetSkill(skillId)
				this.mElemList["rt_check" + i].visible = true

				let info = SkillSystem.getInstance().getPetSkillInfo(skillId)
				let quality = info.quality
				let color = SkillSystem.getInstance().getSkillColor(quality)
				let sName = SkillSystem.getInstance().getSkillName(skillId)
				let sDes = SkillSystem.getInstance().getSkillDes(skillId)
				let str = "#" + color + sName + "#br#saddlebrown" + sDes
				AddRdContent(this.mElemList["rt_rd" + i], str, "ht_24_cc", "ublack", 5)
			} else {
				this.mElemList["rt_check" + i].visible = false
				this.mElemList["skillBox_rt_" + i].lock()
				AddRdContent(this.mElemList["rt_rd" + i], Localize_cns("NOT_OPEN"), "ht_24_cc", "ublack")
			}
		}

		//锁定
		this.refreshLockWnd()

		//消耗材料
		this.refreshItem()
	}

	//更新材料
	refreshItem() {
		let washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId]
		let lowId = washConfig.itemid
		let highId = washConfig.highitemid
		let lowCount = ItemSystem.getInstance().getItemCount(lowId)
		let lowLimit = washConfig.itemnum
		let highCount = ItemSystem.getInstance().getItemCount(highId)
		let highLimit = washConfig.highitemnum
		let lowcolor = lowCount >= lowLimit ? "#lime" : "#red"
		let highcolor = highCount >= highLimit ? "#lime" : "#red"
		AddRdContent(this.mElemList["prop_rd"], GetTagIcon(lowId) + lowcolor + lowCount + "/" + lowLimit, "ht_22_cc", "saddlebrown")
		AddRdContent(this.mElemList["high_prop_rd"], GetTagIcon(highId) + highcolor + highCount + "/" + highLimit, "ht_22_cc", "saddlebrown")
	}

	//更新锁定技能数量
	refreshLockWnd() {
		this.lockList = []

		let checkCount = 0
		for (let i = 0; i < 6; i++) {
			let checkBox = <eui.CheckBox>this.mElemList["lt_check" + i]
			if (checkBox.selected) {
				checkCount = checkCount + 1
				JsUtil.arrayInstert(this.lockList, i)
			}
			this.mElemList["rt_check" + i].source = checkBox.icon
		}
		let cost = elemWashSkillOptions[cellOptionsIndex.PetSkill].LockSpend[checkCount - 1] || 0
		AddRdContent(this.mElemList["skill_lock_rd"], String.format(Localize_cns("PET_TXT8"), checkCount, cost), "ht_22_cc", "ublack")
	}

	//////////////////////////////////////////////////
	onClickCheckBox(egret: TouchEvent) {
		this.refreshLockWnd()
	}

	//低级洗练
	onClickLowWash(args) {
		let washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId]
		let lowId = washConfig.itemid
		let lowCount = ItemSystem.getInstance().getItemCount(lowId)
		let lowLimit = washConfig.itemnum

		if (lowCount < lowLimit) {
			MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"))
			return
		}

		let autoBuy = this.mElemList["auto_check"].selected ? 1 : 0
		RpcProxy.call("C2G_ACTOR_PET_SKILL_WASH", this.petId, 0, autoBuy, this.lockList)
	}

	//高级洗练
	onClickHighWash(args) {
		let washConfig = GameConfig.FunSkillWashConfig[cellOptionsName[cellOptionsIndex.PetSkill - 1]][this.petId]
		let highId = washConfig.highitemid
		let highCount = ItemSystem.getInstance().getItemCount(highId)
		let highLimit = washConfig.highitemnum

		if (highCount < highLimit) {
			MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"))
			return
		}

		let autoBuy = this.mElemList["auto_check"].selected ? 1 : 0
		RpcProxy.call("C2G_ACTOR_PET_SKILL_WASH", this.petId, 1, autoBuy, this.lockList)
	}

	//替换技能
	onClickExchange(args) {
		RpcProxy.call("C2G_ACTOR_PET_SKILL_ACCEPT", this.petId)
	}

	//////////////////////////////////////////////////
	showClearWithPet(petId) {
		this.petId = petId
		this.showWnd()
	}
}