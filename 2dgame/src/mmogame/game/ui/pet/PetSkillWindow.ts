class PetSkillWindow extends BaseCtrlWnd {
	mElemList;
	petId: number;
	Player: Player;

	public initObj(...params: any[]) {
		this.petId = -1
	}

	public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;

		var elemInfo = [
			{ ["name"]: "sk_clear_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickClear }, //图鉴

			{ ["name"]: "sk_act_pic1", ["messageFlag"]: true },
			{ ["name"]: "sk_act_pic2", ["messageFlag"]: true },
			{ ["name"]: "sk_name", ["messageFlag"]: true },
		];

		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		//主动技能
		this.mElemList["skillBox_Active"] = UISkillBox.newObj(this.mLayoutNode, "skillBox_Active", 0, 0, this.mElemList["sk_wnd"])

		//被动技能
		for (let i = 0; i < 6; i++) {
			this.mElemList["skillBox_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["sk_wnd" + i])
		}

		this.mElemList["sk_name_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
		this.mElemList["top_group"].visible = true
		this.mElemList["skill_group"].visible = true

		this.mElemList["title"].text = Localize_cns("PET_TXT1")
		
		this.refreshFrame()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
		this.mElemList["top_group"].visible = false
		this.mElemList["skill_group"].visible = false

		if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	refreshFrame() {
		if (this.petId <= 0) {
			this.petId = this.mParentWnd.getPetId()
		}

		let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
		let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId) //注意获得才会显示技能否则显示升级解锁界面

		if (petNetInfo == null) {
			return
		}

		//更新战斗力
		let force = GetForceMath(GetPetProperty(this.petId))
		DrawNumberStringImage(this.mElemList["sk_force_num"], "zhanLi_", "z" + force, 0, 0, -3)

		//更新类型（金木水火土）
		let elemType = petConfigInfo.type
		let elemStr = GetElemIcon(elemType)
		let elemValue = petConfigInfo.typeNum
		AddRdContent(this.mElemList["sk_elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack")

		//神宠 名称 品质
		let quality = petConfigInfo.quality
		let name = petConfigInfo.name
		this.mElemList["qua_group"].visible = (quality >= opPetQuality.gold)
		let sr = petConfigInfo.sr
		let quaIcon = GetPetSRIcon(sr)
		AddRdContent(this.mElemList["sk_name_rd"], "#" + quaIcon + name, "ht_24_cc_stroke", "white")

		//更新主动技能
		let skillId = petConfigInfo.skillid
		let skillName = SkillSystem.getInstance().getSkillName(skillId)
		let skillDes = SkillSystem.getInstance().getSkillDes(skillId)
		this.mElemList["sk_name"].text = skillName
		this.mElemList["skillBox_Active"].updatePetSkill(skillId)
		AddRdContent(this.mElemList["sk_des_rd"], skillDes, "ht_22_cc", "ublack", 3)

		//更新被动技能(可洗练)
		let passSkillList = petConfigInfo.passiveskill || []
		if (petNetInfo && size_t(petNetInfo.passskilllist) > 0) {
			passSkillList = petNetInfo.passskilllist
		}
		for (let i = 0; i < 6; i++) {
			let passSkillId = passSkillList[i]
			if (passSkillId) {
				this.mElemList["sk_pic" + i].visible = true
				this.mElemList["sk_name" + i].visible = true
				this.mElemList["skillBox_" + i].updatePetSkill(passSkillId)

				let skillName = SkillSystem.getInstance().getSkillName(passSkillId)
				this.mElemList["sk_name" + i].text = skillName
			}
			else {
				this.mElemList["skillBox_" + i].lock()
				this.mElemList["sk_pic" + i].visible = false
				this.mElemList["sk_name" + i].visible = false
			}
		}

		//更新星级
		let washSkillNum = petNetInfo.washskillnum || 0 //已洗练次数
		let star = PetSystem.getInstance().getPetSkillStart(washSkillNum)
		let maxStart = elemWashSkillOptions[cellOptionsIndex.PetSkill].MaxStart
		for (let i = 0; i < maxStart; i++) {
			if (star >= i + 1) {
				this.mElemList["start" + i].source = "ty_star01"
			} else {
				this.mElemList["start" + i].source = "ty_starDi01"
			}
		}

		//更新模型
		this.updateActorModel()
	}

	updateActorModel() {
		let modeID = GetPetModel(this.petId)
		let actorview = this.mElemList["sk_actor_view"]
		let actor = this.Player || Player.newObj()
		actor.loadModel(modeID)
		actor.changeAction("idle", 1.0, true);
		actor.setPositionXY(0, 70)
		actor.enterViewer(actorview)

		//缩放
		actor.setScale(1.0)
		//方向
		actor.setDir(3)
	}

	onClickClear(args) {
		let wnd = WngMrg.getInstance().getWindow("PetClearFrame")
		wnd.showClearWithPet(this.petId)
	}

	/////////////////////////////////////////////////////////////
	refreshFrameWithIndex(petId) {
		this.petId = petId
		let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)
		if (petNetInfo) {  //注意获得才会显示技能否则显示升级解锁界面
			this.refreshFrame()
		} else {
			let wnd = this.mParentWnd.tabWndList.getWndWithIndex(0)
			wnd.refreshFrameWithIndex(petId)
		}
	}
}