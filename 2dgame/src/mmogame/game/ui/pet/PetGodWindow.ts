class PetGodWindow extends BaseCtrlWnd {
	mElemList;
	scroll: UIPetListBox;
	list: any[];
	Player: Player;

	public initObj(...params: any[]) {
		this.list = []
	}

	public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList

		let group = <eui.Group>this.mElemList["scroll_wnd"]
		this.scroll = UIPetListBox.newObj(this.mLayoutNode, "pet_scroll", 0, 6, group.width, group.height, group)
		this.scroll.setClickListner(this.onClickHead, this)

		//主动技能
		this.mElemList["skillBox_Active"] = UISkillBox.newObj(this.mLayoutNode, "skillBox_Active", 0, 0, this.mElemList["sk_wnd"])

		//被动技能
		for (let i = 0; i < 6; i++) {
			this.mElemList["skillBox_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["sk_wnd" + i])
		}

		this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		this.mElemList["pet_wnd2"].visible = true
		this.refreshFrame()
	}

	public onHide(): void {
		this.mElemList["pet_wnd2"].visible = false
		this.list = []

		if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	refreshFrame() {
		this.scroll.setGodPetList()

		let list = PetSystem.getInstance().getPetGodList()
		this.refreshSelectFrame(list[this.scroll.select])
	}

	onClickHead(petId) {
		this.refreshSelectFrame(petId)
	}

	refreshSelectFrame(petId) {
		let data = PetSystem.getInstance().getPetEntryInfo(petId)
		let netData = PetSystem.getInstance().getPetInfo(petId)

		//更新战力
		let force = GetForceMath(GetPetLvProperty(petId))
		this.mElemList["force_num"].beginDraw();
		this.mElemList["force_num"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
		this.mElemList["force_num"].endDraw();

		//更新类型（金木水火土）
		let elemType = data.type
		let elemStr = GetElemIcon(elemType)
		let elemValue = data.typeNum
		AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack")

		//更新名字和品质
		let name = data.name
		let quality = data.quality
		let sr = data.sr
		let icon = GetPetSRIcon(sr)
		AddRdContent(this.mElemList["name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white")

		//更新主动技能
		let skillId = data.skillid
		let skillName = SkillSystem.getInstance().getSkillName(skillId)
		let skillDes = SkillSystem.getInstance().getSkillDes(skillId)
		this.mElemList["sk_name"].text = skillName
		this.mElemList["skillBox_Active"].updatePetSkill(skillId)
		AddRdContent(this.mElemList["sk_des_rd"], skillDes, "ht_22_cc", "ublack", 3)

		//更新被动技能(可洗练)
		let passSkillList = data.passiveskill || []
		if (netData && size_t(netData.passskilllist) > 0) {
			passSkillList = netData.passskilllist
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

		 let str = ""
        //资质属性
        var effect = GetPetLvProperty(petId)
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack")


		//获取途径

		//更新模型
		this.updateActorModel(petId)
	}

	updateActorModel(petId) {
		let modeID = GetPetModel(petId)
		let actorview = this.mElemList["actor_view"]
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
}