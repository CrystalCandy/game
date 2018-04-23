class MonthCardWindow extends BaseCtrlWnd {
	mElemList;
	state:number

	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		var elemInfo = [
			{ ["name"]: "btn_month_card", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onMonthClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		for(let i = 1;i<8;i++){
			this.mElemList["month_rd" + i].setAlignFlag(gui.Flag.H_CENTER)
		}
		this.mElemList["month_card_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {
	
	}

	public onShow(): void {
		RegisterEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, this.onRefresh, this)
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
        this.mElemList["group_tab3"].visible = true;
		this.mElemList["btn_month_card"].visible = true;
		
		RpcProxy.call("C2G_MonthCardInfo")	//月卡信息
		this.onRefresh()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, this.onRefresh, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_tab3"].visible = false;
		this.mElemList["btn_month_card"].visible = false;
		this.mElemList["month_card_rd"].visible = false;
	}

	
	onRefresh() {
		let monthCardInfo =  PaySystem.getInstance().getMonthCardInfo()
		this.mElemList["month_card_rd"].visible = false
		if(monthCardInfo == undefined){
			return
		}

		for(let i = 1;i<8;i++){
			let text = Localize_cns("WELFARE_TXT"+(i+8))
        	AddRdContent(this.mElemList["month_rd"+i], text, "ht_20_cc", "black")
		}
		let isBuy = PaySystem.getInstance().isMonthCardActive()
		this.state = 1
		let isGet = false
		if(monthCardInfo.isGet == 1){
			isGet = true
		}
		this.mElemList["btn_month_card"].enabled = true
		if(isBuy){
			this.mElemList["month_card_rd"].visible = true
			if(isGet){
				this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT5")
				this.mElemList["btn_month_card"].enabled = false
			}else{
				this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT4")
				this.state = 2
			}
			let moncarCardTime = getSaveRecord(opSaveRecordKey.monthCard) || 0
			let shengyuTime = moncarCardTime - GetServerTime()
			let t = simple_transform_time(shengyuTime)
			let text = String.format(Localize_cns("WELFARE_TXT29"),t.hours,t.mins)
			AddRdContent(this.mElemList["month_card_rd"], text, "ht_20_cc", "black")
		}else{
			this.mElemList["btn_month_card"].text = Localize_cns("WELFARE_TXT19")
		}

		
    }

	onMonthClick(){
		//G2C_MonthCardInfo "过期时间,是否领取奖励"
		if(this.state == 1){
			PaySystem.getInstance().payFromId(1000)
		}else if(this.state == 2){
			RpcProxy.call("C2G_MonthCardPrize")
		}
		
		// let isBuy = PaySystem.getInstance().isMonthCardActive()
		// let isGet = false
		// if(isBuy){
		// 	if(isGet){
		// 		//tip 不过都置灰了
		// 	}else{
				
		// 	}
		// }else{
			
		// }
	}
}