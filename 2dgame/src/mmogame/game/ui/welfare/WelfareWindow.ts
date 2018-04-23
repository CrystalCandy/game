class WelfareWindow extends BaseCtrlWnd {
	mElemList;
	index:number;

	public initObj(...params: any[]) {
		 
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		var elemInfo = [
			{ ["name"]: "welfare_go_label", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.goClick },
			{ ["name"]: "welfare_get_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.welfareGetClick },
			{ ["name"]: "welfare_rule", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.welfareRuleClick },
			{ ["name"]: "reward_btn1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.rewardClick },
			{ ["name"]: "reward_btn2", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.rewardClick },
			{ ["name"]: "reward_btn3", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.rewardClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		for(let i = 1;i<4;i++){
			this.mElemList["actorview"+i] = UIActorView.newObj(this.mLayoutNode, "actorview"+i, 0, 0, this.mElemList["group_actorview"+i])
		}
		this.mElemList["welfare_itemBox"] = UIItemBox.newObj(this.mElemList, "welfare_itemBox", 0 ,0,this.mElemList["welfare_item_group"],0.9)
	
		this.mElemList["world_level_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
		RegisterEvent(EventDefine.XIYOU_WELFARE, this.onRefresh, this)
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
        this.mElemList["group_tab6"].visible = true;  
		RpcProxy.call("C2G_XiyouWelfareInfo")
		this.onRefreshIndex()
		//this.onRefresh()
		//this.onRefreshView()	//模型
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.XIYOU_WELFARE, this.onRefresh, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_tab6"].visible = false;

		for(let i = 1 ; i<4;i++){
			let actorView:UIActorView = this.mElemList["actorview"+i]
			actorView.clearView()
		}	
	}

	onRefreshIndex(){
		let jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0
		//jifenNum = 100
		let recordList = getSaveRecord(opSaveRecordKey.onRefresh) || []
		this.index = 1
		if(jifenNum>30 && recordList[100]){
			this.index = 2
		}
		if(jifenNum>60 && recordList[101]){
			this.index = 3
		}
		this.onRefresh()
	}
	
	onRefresh() {
		let welfareInfo = ActivitySystem.getInstance().getXiyouWelfareInfo()
		if(welfareInfo == null){
			return
		}
		let recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || []

		let config = GameConfig.XiyouWelfareConfig	//西游配置
		let configIndex = tonumber(this.index) + 99
		let curConfig = config[configIndex]

		let curLevel = GetHeroProperty("level") || 0
		let worldLevel = welfareInfo.level

		//let levelRd = String.format(Localize_cns("WELFARE_TXT27"),worldLevel)
		AddRdContent(this.mElemList["world_level_rd"], tostring(worldLevel), "ht_20_cc_stroke", "white")

		let itemList = null
		let getRmb = false
		if(curLevel < worldLevel-3){	//少于世界等级3级
			let maxLevel = 1
			for(let i =0;i<size_t(curConfig.prize2);i++){
				let info = curConfig.prize2[i]
				let level = info[0]
				let prize = info[1]
				if(curLevel > level){
					itemList = info
				}
			}
		}else{
			itemList = curConfig.prize1
			getRmb = true
		}

		if(getRmb){
			let itemInfo = AnalyPrizeFormat(itemList)
			this.mElemList["welfare_itemBox"].updateByEntry(itemInfo[0][0],itemInfo[0][1])
		}else{
			let itemInfo = AnalyPrizeFormat(itemList[1])
			this.mElemList["welfare_itemBox"].updateByEntry(itemInfo[0][0],itemInfo[0][1])
		}
		
		//let jifenNum = 100 //GetActivity(ActivityDefine.Boss).getXiYouLiLianPoint()
		let jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0
		//jifenNum = 100
		this.mElemList["today_jifen"].text= String.format(Localize_cns("WELFARE_TXT26"),jifenNum)
		
		UiUtil.updateProgress(this.mElemList["exp_progress"], jifenNum, 100)
		 
		for(let i =1;i<4;i++){
			let select =  this.mElemList["reward_btn_select"+i]
			let yilingqu = this.mElemList["reward_yilingqu"+i]
			
			let configIndex1 = i+99
			yilingqu.visible = false
			if(recordList[configIndex1]){
				yilingqu.visible = true
			}

			select.visible = false
			if(i == this.index){
				select.visible = true
			}
		}

		let canGet = true
		let isGet = false
		if(curConfig.score > jifenNum){
			canGet = false
		}
		if(recordList[configIndex]){
			isGet = true
		}
		
		this.mElemList["welfare_get_btn"].text = Localize_cns("INVEST_TXT6")	//领取
		this.mElemList["welfare_get_btn"].enabled = false	//没置灰
		if(canGet){
			this.mElemList["welfare_get_btn"].enabled = true
			if(isGet){
				this.mElemList["welfare_get_btn"].text = Localize_cns("INVEST_TXT7")	//已领取
				this.mElemList["welfare_get_btn"].enabled = false
			}
		}

		this.onRefreshView(welfareInfo.playerInfo)
    }

	//刷新模型
	onRefreshView(playerInfo){
		for(let i = 1 ; i<4;i++){
			let roleInfo = playerInfo[i-1]
			let roleGroup = this.mElemList["role"+i]
			roleGroup.visible = false
			if(roleInfo){
				roleGroup.visible = true
				this.mElemList["welfare_name"+i].text = roleInfo.name
				this.mElemList["welfare_level"+i].text = "Lv."+roleInfo.level
				let model = GetProfessionModel(roleInfo.vocation,roleInfo.sexId)
				let actorView:UIActorView = this.mElemList["actorview"+i]
				//actorView.updateByPlayer(model)
				actorView.updateByPlayerAppearInfo(roleInfo)
			}
		}
	}

	goClick(){
		 let wnd = WngMrg.getInstance().getWindow("DailyFrame")
		 wnd.showWithIndex(3)
	}

	welfareGetClick(){
		let index = tonumber(this.index) + 99
		RpcProxy.call("C2G_XiyouWelfarePrize",index)
	}

	welfareRuleClick(){
		let wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame")
        wnd.showWithActivity("XiyouWelfareRule")
	}

	rewardClick(args){
		let name = args.target.name
		let index = tonumber(name.replace(/[^0-9]/ig, ""))
		if(this.index == index){
			return
		}
		this.index = index
		this.onRefresh()
	}
}