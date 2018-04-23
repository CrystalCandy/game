
class Fight_HPPower extends Fight_BasePower{
	public initObj(...args:any[]):void{

	}


	onFinish(){
		//this:setAutoFinishTime(200)
		var actor = GetFightActor(this.actorId)
		
		if(actor == null){
			//this:finish()
			return
		}
		var point = this.powerInfo.point || 0
		var flag = this.powerInfo.flag
		
		if(point == 0 || flag == powerXPFlag.NOT_SHOW){
			return
		}
		
		var natrue = "+"
		if(this.effect == powerEffects.EFFECT_HP_LESS || 
			this.effect == powerEffects.EFFECT_MAXHP_LESS){
			point = -point
			natrue = "-"
		}
		
		if(this.effect == powerEffects.EFFECT_HP_PLUS ||
			this.effect == powerEffects.EFFECT_HP_LESS){
			
			var number_info:any = {}
			number_info.Type = "hp"
			number_info.nature = natrue
			number_info.crit_or_not = false
			number_info.point = point
			number_info.textList = ["baoji"]
			number_info.flag = flag
			
			if(flag != powerXPFlag.NOT_SHOW){
				actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200)
				
				this.fightResult.showDoubleHit(this.powerInfo)
			}
			
			actor.changeCombatInfo("hp", point)
		}else if(this.effect == powerEffects.EFFECT_ABSORB){
			//print("2222222222222222222222222")
			//io.read()
			var number_info:any = {}
			number_info.Type = "absorb"
			number_info.textList = ["xishou"]
			actor.doCommand(ActorCommand.ShowCombatNumber, number_info, 200)
		}else{
			actor.changeCombatInfo("maxHp", point)
		}
	}
}