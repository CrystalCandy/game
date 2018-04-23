/*

class SkillMessageHandler extends MessageHandler{

public initObj(...args:any[]):void {
    //this.register(opCodes.G2C_UPDATE_SKILLSERIES_INFO, 	this.onRecvG2C_UPDATE_SKILLSERIES_INFO, this)		//技能系表更新
    //this.register(opCodes.G2C_UPDATE_SKILL_INFO, 				this.onRecvG2C_UPDATE_SKILL_INFO, this)					//技能表更新
    //this.register(opCodes.G2C_LIVESKILL_LIST, 				this.onRecvG2C_LIVESKILL_LIST, this)							//生活技能表更新
    //this.register(opCodes.G2C_PLOT_SKILLLIST_INFO, 				this.onRecvG2C_PLOT_SKILLLIST_INFO, this)			//剧情技能表更新
    //this.register(opCodes.G2C_PLOT_SKILL_UPDATE, 				this.onRecvG2C_PLOT_SKILLLIST_INFO, this)			//剧情技能表更新
    
    //this.register(opCodes.G2C_USE_SKILL_RESULT, 				this.onRecvG2C_USE_SKILL_RESULT, this)			//使用技能的结果
    //this.register(opCodes.G2C_UPDATE_SKILLSERIES_INFO,  this.onRecvG2C_UPDATE_SKILLSERIES_INFO,this) //收到技能图鉴信息
    
    this.register(opCodes.G2C_ROLE_CHECK_COMBINED_SKILL,  this.onRecvG2C_ROLE_CHECK_COMBINED_SKILL,this) //当前使用状态的援助技能列表
    this.register(opCodes.G2C_ASSIST_SKILL_INFO,  				this.onRecvG2C_ROLE_CHECK_COMBINED_SKILL,this) //当前使用状态的援助技能列表
}

onRecvG2C_UPDATE_SKILLSERIES_INFO( dispatcher, message){
    let skillSeriesList:any = {}
    for(let i in message.skillSeriesList){
            let v = message.skillSeriesList[i]
    
        let skillSeries = SkillSeries.newObj(v.id, v.level)
        table_insert(skillSeriesList, skillSeries)
    }
    //SkillSystem.getInstance().skillSeriesUpdate(skillSeriesList)
}



onRecvG2C_UPDATE_SKILL_INFO( dispatcher, message){
    let skillList:any = {}
    for(let i in message.skillList){
            let v = message.skillList[i]
    
        let skill = Skill.newObj(v)
        table_insert(skillList, skill)
    }
    //SkillSystem.getInstance().skillListUpdate(skillList)
}

onRecvG2C_LIVESKILL_LIST( dispatcher, message){
//	let skillList:any = {}
//	for(let i in message.skillList){
            let v = message.skillList[i]
    
//		let skill = Skill.newObj(v.id, v.level)
//		table_insert(skillList, skill)
//	}
//	SkillSystem.getInstance().skillLivingListUpdate(skillList)
}

onRecvG2C_PLOT_SKILLLIST_INFO( dispatcher, message){
    let skillList:any = {}
    for(let i in message.skillList){
            let v = message.skillList[i]
    
        let skill = Skill.newObj(i, v)
        table_insert(skillList, skill)
    }
    //SkillSystem.getInstance().skillPlotListUpdate(skillList)
}

onRecvG2C_USE_SKILL_RESULT( dispatcher, message){
    let skillId = message.skillId
    let result = message.result
    
    //FireEvent(EventDefine.SKILL_USE_RESULT, SkillResultEvent.newObj(skillId, result))
}

onRecvG2C_UPDATE_SKILLSERIES_INFO( dispatcher, message){
    FireEvent(EventDefine.SKILL_LIST_INFO, SkillListInfo.newObj(message.skillList))
}

onRecvG2C_ROLE_CHECK_COMBINED_SKILL( dispatcher, message){
    CombinedSkillSystem.getInstance().updateMessageHandler(message)
}
}

*/ 
//# sourceMappingURL=SkillMessageHandler.js.map