
/////////////////////////////////////////////////////////
//战力榜
class RankPlrForcelWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	onItemExtraUpdate(data, mElemList) {
		let str =  String.format(Localize_cns("RANK_TXT4"), data[0])
        AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime")
	}

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//等级榜
class RankPlrLevelWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	onItemExtraUpdate(data, mElemList) {
		let str =  String.format(Localize_cns("RANK_TXT4"), data[0])
         AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime")
	}

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}


/////////////////////////////////////////////////////////
//宠物战力榜
class RankPetWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	onItemExtraUpdate(data, mElemList) {
		let str =  String.format(Localize_cns("RANK_TXT4"), data[0])
         AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime")
	}

	//外观更新
	onAppearUpdate(appearInfo) {

		let model = GetPetModel(appearInfo.petShapeId)

		let actorView:UIActorView = this.mElemList["actorview"]	
		actorView.updateByPlayer(model)
	}
}


/////////////////////////////////////////////////////////
//仙侣战力榜
class RankXianlvlWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	onAppearUpdate(appearInfo) {
		let model = GetXianlvModel(appearInfo.tianxianShapeId)

		let actorView:UIActorView = this.mElemList["actorview"]	
		actorView.updateByPlayer(model)
	}
}


/////////////////////////////////////////////////////////
//坐骑榜
class RankRidelWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	onAppearUpdate(appearInfo) {
		let effectId = GetShapeEffectId(appearInfo.rideShapeId)

		let actorView:UIActorView = this.mElemList["actorview"]	
		let effect:Effect = actorView.updateByEffect(effectId)
		effect.changeAction("idle")
	}
}


/////////////////////////////////////////////////////////
//翅膀榜
class RankWingWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}


/////////////////////////////////////////////////////////
//天仙榜
class RankTianxianWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {
	// 	let model = GetShapeModelId(appearInfo.tianxianShapeId)

	// 	let actorView:UIActorView = this.mElemList["actorview"]	
	// 	actorView.updateByPlayer(model)

	// }
}


/////////////////////////////////////////////////////////
//神兵榜
class RankImmortalsWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//法阵榜
class RankFaZhenWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//仙位榜
class RankXianWeiWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//通灵榜
class RankTongLingWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//兽魂榜
class RankShouHunWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//天女榜
class RankTianNvWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//仙器榜
class RankXianQiWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//花辇榜
class RankHuaNianWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}

/////////////////////////////////////////////////////////
//灵气榜
class RankLingQigWnd extends RankBaseWnd {
	

	public initObj(...params: any[]) {

	}


	//重载
	// onItemExtraUpdate(data, mElemList) {

	// }

	//外观更新
	// onAppearUpdate(appearInfo) {

	// }
}