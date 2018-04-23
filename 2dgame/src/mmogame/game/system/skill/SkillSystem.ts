/*
作者:
    lintianfeng
	
创建时间：
   2013.8.08(周四)

意图：
   技能系统

公共接口：

*/
class SkillSystem extends BaseSystem {

	skillList: any;

	public initObj(...args: any[]): void {
		this.onClear()
	}

	destory() {

	}

	prepareResource(workQueue) {
		GameConfig.initSkillSystemCsv(workQueue);
	}


	onClear() {
		this.skillList = {}
	}

	////////////////////////////////////////////////////////////////////////////-
	getSkillName(skillId) {

		let name = null
		let config = GameConfig.SkillDescribeConfig[skillId]
		if (config && config[1]) {
			name = config[1].Name
		}

		return name
	}


	getSkillDes(skillId, level?) {
		if (level == null)
			level = 1

		let skillInfo = GameConfig.ActorRoleSkillConfig[skillId]
		let config = GameConfig.SkillDescribeConfig[skillId]
		if (skillInfo == null) {
			if (config && config[level]) {
				return config[level].Describe
			}
		} else { //主角技能	
			let des = config[level].Describe
			let extra = GetRoleSkillExtraDamage(config)
			return String.format(des, extra)
		}

		return "ErrorSkill" + skillId
	}

	getSkillBubbleWord(entryId, skillId) {
		//{["times"] : {{{"<", 上限}, "对白"}, {{">", 下限}, "对白"}, {{"><", 下限, 上限}, "对白"}}, ["hp"] = {{{"<", 上限}, "对白"}, }}
		if (!GameConfig.MonsterConfig[entryId]) {
			return null
		}

		if (!GameConfig.MonsterConfig[entryId].skillIntro) {
			return null
		} else {
			return GameConfig.MonsterConfig[entryId]["skillIntro"][skillId]
		}
	}


	///////////////////////////////////////////////////////////////////////////////////
	//宠物技能
	getPetSkillInfo(skillId) {
		let info = GameConfig.SkillPetActiveConfig[skillId]
		if (info == null) {
			return GameConfig.SkillPetPassiveConfig[skillId]
		}
		return info
	}
	
	//角色技能
	getRoleSkillInfo(skillId) {
		return GameConfig.ActorRoleSkillConfig[skillId]
	}

	//仙侣技能
	getXianLvSkillInfo(skillId, skillLv) {
		return GameConfig.ActorXianLvSkillConfig[skillId][skillLv]
	}

	//获取技能颜色
	getSkillColor(quality) {
		let colorConfig = ["gray", "lime", "blue", "purple", "gold", "red"]
		return colorConfig[quality - 1] || colorConfig[0]
	}
}