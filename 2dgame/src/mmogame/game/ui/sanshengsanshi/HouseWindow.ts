class HouseWindow extends BaseCtrlWnd {
	mElemList;
	houseLevel:number
	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		var elemInfo =[
				{["name"] : "upgrade_btn",  ["title"] : null,  ["event_name"] : gui.ComboBox.onClick, ["fun_index"] : this.onUpgradeClick},
				{ ["name"]: "all_upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAllUpgradeClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		for(let i = 1;i<3;i++){
			this.mElemList["actorview"+i] = UIActorView.newObj(this.mLayoutNode, "actorview"+i, 0, 0, this.mElemList["group_actorview"+i])
		}
		this.setCountDown(0)
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
		this.mElemList["group2"].visible = true;
		this.mElemList["title"].text = Localize_cns("SANSHENG_TXT8")
		RegisterEvent(EventDefine.HOUSE_UPDATE, this.onRefresh, this)
		RpcProxy.call("C2G_UpdateHourse")
		this.onRefresh()
	}

	public onHide(): void {
		this.mElemList["group2"].visible = false;
		UnRegisterEvent(EventDefine.HOUSE_UPDATE, this.onRefresh, this)
		for(let i = 1 ; i<3;i++){
			let actorView:UIActorView = this.mElemList["actorview"+i]
			actorView.clearView()
		}	
	}
	
	onRefresh() {
		let houseInfo = ActivitySystem.getInstance().getHouseInfo()
		if(houseInfo == null){
			return
		}
		let _type = houseInfo.houseData.type || 100
		let stage = houseInfo.houseData.stage || 0 
		this.houseLevel = stage
		this.mElemList["house_text"].text = Localize_cns(("SANSHENG_TXT"+_type))
		this.mElemList["advance_text"].text = String.format(Localize_cns("SANSHENG_TXT6"),stage)
		let power = houseInfo.power
		this.setCountDown(power)
		// this.onRefreshMyView(houseInfo.playerInfo.plrAppear)
		// this.onRefreshOtherView(houseInfo.playerInfo.spouseAppear)
		let myInfo = houseInfo.playerInfo.plrAppear
		let otherInfo = houseInfo.playerInfo.spouseAppear
		this.onRefreshView(myInfo,otherInfo)
		this.onRefreshNeedItem()
    }

	onRefreshNeedItem(){
		//消耗材料
		let level = this.houseLevel
		
		let config = GameConfig.FunUpgradeStageConfig
		let houseConfig = config["Hourse"]
		if(level>=size_t(houseConfig)){
			AddRdContent(this.mElemList["need_rd1"],"" , "ht_20_cc", "white")
			AddRdContent(this.mElemList["need_rd2"],"" , "ht_20_cc", "white")
			return
		}
		let curInfo = houseConfig[level]
		//消耗材料
		let itemId = curInfo.itemid
		let ownItemCount = ItemSystem.getInstance().getItemCount(itemId)	//0
		let needItemCount = curInfo.itemnum	//2

		let str = ""
		let needColor = "#green"
		if(needItemCount > ownItemCount){
			needColor = "#red"
		}
		str = String.format(Localize_cns("SANSHENG_TXT10"),needColor+ownItemCount+"/"+needItemCount)
		AddRdContent(this.mElemList["need_rd1"],str ,"ht_20_cc", "white")
		

		needColor = "#green"
        //消耗货币
        let moneyUnit = curInfo.moneyunit
        let ownMoney = GetHeroMoney(moneyUnit) 	//322164
        let costMoney = curInfo.money	//1300
		if(costMoney > ownMoney){
			needColor = "#red"
		}

		str = String.format(Localize_cns("SANSHENG_TXT11"),needColor+costMoney)
		AddRdContent(this.mElemList["need_rd2"],str ,"ht_20_cc", "white")

		// need_rd1
		// need_rd2

		let cur = 10
		let max = 100
		UiUtil.updateProgress(this.mElemList["exp_progress"], cur, max)
	}


	setCountDown(num) {
        let imageBox:gui.BatchImage = this.mElemList["countdown"]
        imageBox.beginDraw();
		imageBox.drawNumberString("zhanLi_", num, 0, 0)
		imageBox.endDraw();
    }

	onRefreshView(myInfo,otherInfo){
		for(let i = 1;i<3;i++){
			let roleGroup = this.mElemList["role"+i]
			roleGroup.visible = false
			let info = null
			if(i == 1){
				info = myInfo
			}else{
				info = otherInfo
			}
			if(info){
				roleGroup.visible = true
				let model = GetProfessionModel(info.vocation,info.sexId)
				let actorView:UIActorView = this.mElemList["actorview"+i]
				actorView.updateByPlayerAppearInfo(info)
			}
		}
	}

	onUpgradeClick(){

	}

	onAllUpgradeClick(){
		
	}
 }