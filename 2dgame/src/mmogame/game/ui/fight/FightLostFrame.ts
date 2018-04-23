class FightLostFrame extends FightEndBaseFrame {
	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/fight/FightLostLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.setAlignCenter(true, true)

		var elemInfo: any[] = [
			{ ["name"]: "exit_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReturn },
			{ ["name"]: "shouchong_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFirstPayClick },
			{ ["name"]: "chongwu_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPetClick },
			{ ["name"]: "zhuangbei_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
			{ ["name"]: "skill_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSkillClick },
		];

		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		// RegisterEvent(EventDefine.TEAM_MEMBER_NOTICE, this.onTeamMemNotice, this)

		super.onShow()
		this.mLayoutNode.visible = true;
		GameSound.getInstance().playEffect(SystemSound.effect_fail)

		this.refreshFrame()
	}

	public onHide(): void {
		super.onHide()

		// UnRegisterEvent(EventDefine.TEAM_MEMBER_NOTICE, this.onTeamMemNotice, this)
		this.mLayoutNode.visible = false;
	}

	refreshFrame() {
		let firstPayIsOpen =  ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.FIRST_PAY)
		this.mElemList["shouchong_btn"].visible = (firstPayIsOpen == true)
		this.mLayoutNode["btn_group"].x = 20
		if(firstPayIsOpen){
			this.mLayoutNode["btn_group"].x = 80
		}	
	}

	////////////////////////////////////////////////////////////公共接口///////////////////////////////////////////
	getCurFightType() {
		if (this.param) {
			return this.param.fightType
		}
		else {
			return null
		}
	}

	addReCallHandler(obj, callBack, param) {
		//this.specHandler = { obj, callBack, param }
	}
	////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
	onReturn(args) {
		// if (HeroIsInTeam() == true) {
		// 	if (HeroIsCaptain() == false) {
		// 		return MsgSystem.addTagTips(Localize_cns("TEAM_TXT34"))
		// 	} else {
		// 		CaptainSendNotice(0, TeamNoticeTag.HideFightResult)
		// 	}
		// }

        let fightType = this.param.fightType
        this.endShowCombatEnd()
        // if (fightType == opFightType.FIGHT_TYPE_DAILY) {
        //     // let wnd = WngMrg.getInstance().getWindow("SkyTowerFrame")
        //     // if (wnd.isVisible()) {
        //     //     wnd.showAllMenu()
        //     // }
        // }
	}

	starShowCombatEnd() {

		return this.showWnd()
	}


	// onTeamMemNotice(args) {
	// 	if(TeamIsFollowState() == false ){
	// 		return
	// 	}
		
	// 	let fightType = this.param.fightType
	// 	//if(args.key != OrdinaryActivityIndex.NULL ){
	// 	if(args.value ==  TeamNoticeTag.HideFightResult ){							//不填也可以，先作标识
	// 		this.endShowCombatEnd()
    //         let wnd = WngMrg.getInstance().getWindow("SkyTowerFrame")
    //         if (wnd.isVisible()) {
    //             wnd.showAllMenu()
    //         }	
	// 		return
	// 	}
	// 	//}
	// }

	 onClickFightRecord(args) {
         WngMrg.getInstance().showWindow("FightRecordFrame")
     }

	onFirstPayClick(){
		this.hideWnd()
		//判断有没有充值>1000
		//>就不显示这个按钮
		let wnd = WngMrg.getInstance().getWindow("TouZiFrame")
		wnd.showWithIndex(PayActivityIndex.FIRST_PAY )
	}

	onPetClick(){
		this.hideWnd()
		ExecuteMainFrameFunction("chongwu")
	}

	onEquipClick(){
		this.hideWnd()
		ExecuteMainFrameFunction("zhuangbeishangdian")
	}
	onSkillClick(){
		this.hideWnd()
		let info = RoleSystem.getInstance().getRecvList()
		if(size_t(info) == 0) return;
		let levelList = info["skilllevellist"]
		let wnd = WngMrg.getInstance().getWindow("RoleSkillsSettingFrame");
		wnd.onShowWnd(levelList);
	}

	

}