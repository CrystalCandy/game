/*
通用界面: 坐骑 翅膀 宠物（通灵 兽魂） 等等
定义: funelemOption
常用接口: 

*/

class FunSystem extends BaseSystem {
	funInfoList: any;

	public initObj(...args: any[]): void {
		this.onClear()
	}

	destory() {

	}

	prepareResource(workQueue) {
		GameConfig.initFunSystemCsv(workQueue);
	}

	onClear() {
		this.funInfoList = {}
	}

	_initFunInfoField(infoList) {
		if (infoList == null) {
			TLog.Warn("FunSystem._initFunInfoField get NULL")
			return
		}

		for (let _ in infoList) {
			let v = infoList[_]
			this.funInfoList[v.entryid] = v
		}
		FireEvent(EventDefine.PET_FUN_INFO_REFRESH, null)
	}

	_refreshFunInfoField(funType, info) {
		if (this.funInfoList[funType]) {
			//TLog.Warn("FunSystem._refreshFunInfoField %d alreadey exsit", funOptionsName[funType])
		}

		this.funInfoList[funType] = info

		FireEvent(EventDefine.PET_FUN_INFO_REFRESH, null)
	}

	_updateFunInfoField(funType, updateProperty) {
		let funInfo = this.funInfoList[funType]

		if (funInfo == null) {
			//TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
			return
		}

		if (updateProperty == null) {
			return
		}

		for (let k in updateProperty) {
			let v = updateProperty[k]
			funInfo[k] = v
		}
		FireEvent(EventDefine.PET_FUN_INFO_UPDATE, null)
	}

	////////////////////////////////////////////////////////////////
	getFunInfoWithType(funType) {
		if (this.funInfoList[funType] == null) {
			//TLog.Warn("FunSystem.getFunInfo %d is null", funOptionsName[funType])
			return
		}

		return this.funInfoList[funType]
	}

	//模型
	getFunModel(funType, stage) {
		return GameConfig.FunShapeConfig[cellOptionsName[funType - 1]][stage].Shape
	}

	//模型名
	getFunModelName(funType, stage) {
		return GameConfig.FunShapeConfig[cellOptionsName[funType - 1]][stage].nameStr
	}

	//获取升级消耗材料
	getFunUpgradeMaterial(funType, stage) {
		let material: any = {}
		material.itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].itemid
		material.itemNum = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].itemnum
		material.moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].moneyunit
		material.money = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].money
		return material
	}

	//获取pos位置的技能
	getFunSkillConfigWithPos(funType, pos) {
		return GameConfig.FunSkillCaseConfig[cellOptionsName[funType - 1]][pos]
	}

	//获取技能升级材料
	getFunSkillMaterialWithLv(funType, level) {
		return GameConfig.FunLevelNumConfig[cellOptionsName[funType - 1]][level]
	}

	//获取穿戴装备列表
	getWearEquipItemList(funType) {
		let funInfo = this.getFunInfoWithType(funType)
		let list: any = []
		for (let i in funInfo.equiplist) {
			let entryId = funInfo.equiplist[i][1]
			let quality = funInfo.equiplist[i][objectField.ITEM_FIELD_QUALITY]
			let add_num = funInfo.equiplist[i][objectField.ITEM_FIELD_ADD_NUM]
			let itemInfo: any = {}
			itemInfo.entry = entryId
			itemInfo.quality = quality
			itemInfo.add_num =add_num
			let item = Item.newObj(itemInfo)
			table_insert(list, item)
		}
		return list
	}

	//获取pos位置的穿戴装备
	getWearEquipWithPos(funType, pos) {
		let list = this.getWearEquipItemList(funType)
		return list[pos]
	}

    //获取pos位置的subtype
	getFunSubTypeWithPos(funType, pos) {
		return GameConfig.FunEquipCaseConfig[cellOptionsName[funType - 1]].subtype[pos]
	}
}