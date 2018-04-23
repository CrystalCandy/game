/*
作者:
    liuziming
	
创建时间：
   2013.8.08(周四)

意图：
   宠物系统，保存宠物信息列表

公共接口：
   
   //获取数据源
*/

class PetSystem extends BaseSystem {

	petInfoList: any; //已激活宠物info表
	petActiveList: any[]; //已激活宠物id表
	petTiredList: any[];  //未激活宠物id表

	public initObj(...args: any[]): void {
		this.onClear()
		this.petInfoList = {}
		this.petActiveList = []
		this.petTiredList = []
	}

	destory() {

	}

	prepareResource(workQueue) {
		GameConfig.initPetSystemCsv(workQueue);
	}


	onClear() {
		this.petInfoList = {}

		this.petActiveList = []							//按照宠物的加入顺序排序
	}

	getPetName(entryid) {
		if (!GameConfig.PetConfig[entryid]) {
			return "" + entryid
		}
		return GameConfig.PetConfig[entryid].name
	}

	//添加宠物信息
	addPetInfo(petInfo) {
		if (this.petInfoList[tonumber(petInfo.entryid)]) {
			TLog.Warn("PetSystem.addPet %d alreadey exsit", petInfo.entryid)
		}

		this.petInfoList[tonumber(petInfo.entryid)] = petInfo
		return this.addPetInActive(petInfo.entryid)
	}

	//局部更新宠物信息
	updatePetInfoField(petId, updateProperty) {
		if (this.petInfoList[petId] == null) {
			TLog.Error("PetSystem.updatePetInfoField petInfo:%d is ! exist!", petId)
			return
		}

		let oldInfo: any = {}
		table_class_copy(oldInfo, this.petInfoList[petId])
		for (let k in updateProperty) {
			let v = updateProperty[k]

			if (this.petInfoList[petId][k] == null) {
				TLog.Error("PetSystem.updatePetInfoField field error : " + k)
			} else {
				this.petInfoList[petId][k] = v
			}
		}

		FireEvent(EventDefine.PET_UPDATE, PetUpdateEvent.newObj(petId, this.petInfoList[petId], oldInfo))
	}

	updatePetInfoList(petInfoList) {
		for (let _ in petInfoList) {
			let v = petInfoList[_]

			this.addPetInfo(v)
		}
	}

	getPetInfoList() {
		return this.petInfoList
	}

	getPetInfo(petId) {
		if (!this.petInfoList[petId]) {
			TLog.Warn("PetSytem.getPetInfo %d ! exsit", petId)
			return null
		}

		return this.petInfoList[petId]
	}

	//激活?
	isPetExitsInEntry(entryId) {
		let petInfo = null

		for (let _ in this.petInfoList) {
			let v = this.petInfoList[_]

			if (v.entryid == entryId) {
				petInfo = v
				break
			}
		}

		return petInfo != null
	}

	addPetInActive(petId) {
		if (!table_isExsit(this.petActiveList, petId)) {
			table_insert(this.petActiveList, petId)
		}
	}

	getPetActiveList() {
		table_sort(this.petActiveList, function (a, b) {
			return GameConfig.PetConfig[b].quality - GameConfig.PetConfig[a].quality
		})

		//根据品质分类
		let list: any = {}
		for (let i in this.petActiveList) {
			let petId = this.petActiveList[i]
			let petConfig = this.getPetEntryInfo(petId)

			let temp = list[petConfig.quality]
			if (temp == null) {
				temp = []
			}
			table_insert(temp, petId)
		}

		//根据sr排序
		for (let i in list) {
			let temp = list[i]
			table_sort(temp, function (a, b) {
				return GameConfig.PetConfig[b].sr - GameConfig.PetConfig[a].sr
			})
		}

		return this.petActiveList
	}

	getPetTiredList() {
		this.petTiredList = []
		for (let i in GameConfig.PetConfig) {
			let v = GameConfig.PetConfig[i]
			//激活?
			if (!this.isPetExitsInEntry(v.Id)) {
				JsUtil.arrayInstert(this.petTiredList, v.Id)
			}
		}

		table_sort(this.petTiredList, function (a, b) {
			return GameConfig.PetConfig[a].quality - GameConfig.PetConfig[b].quality
		})

		//根据品质分类
		let list: any = {}
		for (let i in this.petTiredList) {
			let petId = this.petTiredList[i]
			let petConfig = this.getPetEntryInfo(petId)

			let temp = list[petConfig.quality]
			if (temp == null) {
				temp = []
			}
			table_insert(temp, petId)
		}

		//根据sr排序
		for (let i in list) {
			let temp = list[i]
			table_sort(temp, function (a, b) {
				return GameConfig.PetConfig[b].sr - GameConfig.PetConfig[a].sr
			})
		}

		return this.petTiredList
	}

	getPetIdWithIndex(index) {
		return this.petActiveList[index]
	}

	getPetEntryInfo(entryId) {
		return GameConfig.PetConfig[entryId]
	}

	getPetRefProperty(entryId, index) {
		if (!GameConfig.PetConfig[entryId]) {
			return null
		}

		return GameConfig.PetConfig[entryId][index] || null
	}

	getPetInfoEntry(entryId) {
		let petInfo = null

		for (let _ in this.petInfoList) {
			let v = this.petInfoList[_]

			if (v.entry == entryId) {
				petInfo = v
				break
			}
		}

		//if(! petInfo ){
		//	TLog.Error("PetSystem.getPetInfoEntry %d is null!", entryId)
		//}
		return petInfo
	}

	//////////////////////////////////////////////////////////////////////////////////-
	showPetTipsByEntry(entryId) {
		if (this.getPetEntryInfo(entryId) == null) {
			TLog.Error("showPetTipsByEntry %s", entryId)
			//return
		}

		let wnd = WngMrg.getInstance().getWindow("PetPreviewFrame")
		wnd.showWithPetEntry(entryId)
	}

	showPetTipsByInfo(petInfo) {
		let wnd = WngMrg.getInstance().getWindow("PetPreviewFrame")
		wnd.showWithPetInfo(petInfo)
	}

	//宠物技能洗练星级 1-7
	getPetSkillStart(count) {
		let maxStart = elemWashSkillOptions[cellOptionsIndex.PetSkill].MaxStart
		let startArea = elemWashSkillOptions[cellOptionsIndex.PetSkill].StartArea
		for (let i = 1; i <= maxStart; i++) {
			if (count < startArea[i]) {
				return i
			}
		}
		return maxStart
	}

	//获取配置神宠
	getPetGodList() {
		let list = []
		for (let i in GameConfig.PetConfig) {
			let v = GameConfig.PetConfig[i]
			if (v.quality >= 4) {
				JsUtil.arrayInstert(list, v.Id)
			}
		}
		return list
	}

	//获取布阵列表
	getEmbattlePosList() {
		let list: any = {}
		for (let i in this.petInfoList) {
			let info = this.petInfoList[i]
			//0代表没有出战，1代表出战 2代表备战1 3代表备战2
			if (info.combatpos > opPetCombatPos.Rest) {
				list[info.combatpos] = info
			}
		}
		return list
	}

	//宠物资质
	getPetGrowInfo(petId) {
		return GameConfig.FunGrowAddConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petId]
	}

	//宠物资质等级
	getPetGrowLevel(petId, count) {
		let info = this.getPetGrowInfo(petId)
		let num = 0
		let level = 0
		for (let i in info.maxexp) {
			num += info.maxexp[i]
			if (count < num) {
				level = tonumber(i)
				break
			}
		}
		return level
	}
}