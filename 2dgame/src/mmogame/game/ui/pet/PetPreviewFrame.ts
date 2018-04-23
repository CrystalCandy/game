// TypeScript file
/*
作者:
    yangguiming 
	
创建时间：
   2017.02.16(周五)

意图：
   伙伴信息界面
公共接口：
   
*/
class PetPreviewFrame extends BaseWnd {
	petId: number;
	Player: Player;

	public initObj(...args: any[]): void {
		this.mLayoutPaths = ["layouts/pet/PetPreviewLayout.exml"]
	}

	onLoad() {
		this.createFrame()
	}

	onUnLoad() {


	}

	onShow() {
		this.mLayoutNode.visible = true
		this.mLayoutNode.setDoModal(true);
		this.setAlignCenter(true, true)

		this.refreshFrame()
	}

	onHide() {
		this.mLayoutNode.visible = false
		this.mLayoutNode.setDoModal(false);

		if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	createFrame() {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.initSkinElemList();

		var elemInfo = [
			//返回
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		//主动技能
		this.mElemList["skillBox_Active"] = UISkillBox.newObj(this.mLayoutNode, "skillBox_Active", 0, 0, this.mElemList["sk_wnd"])

		//被动技能
		for (let i = 0; i < 6; i++) {
			this.mElemList["skillBox_" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["sk_wnd" + i])
		}

		this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER)

	}

	refreshFrame() {
		let data = PetSystem.getInstance().getPetEntryInfo(this.petId)
		//let netData = PetSystem.getInstance().getPetInfo(this.petId)

		//更新战力
		let force = GetForceMath(GetPetBaseProperty(this.petId))
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
		// if (netData && size_t(netData.passskilllist) > 0) {
		// 	passSkillList = netData.passskilllist
		// }
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
        //属性
        var effect = GetPetBaseProperty(this.petId)
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack")

		//更新模型
		this.updateActorModel()
	}

	updateActorModel() {
		let modeID = GetPetModel(this.petId)
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

	///////////////////////////////////////////////////////////
	showWithPetEntry(petId) {
		this.petId = petId
		this.showWnd()
	}

	showWithPetInfo(petInfo) {
		this.petId = petInfo.entryid
		this.showWnd()
	}

}