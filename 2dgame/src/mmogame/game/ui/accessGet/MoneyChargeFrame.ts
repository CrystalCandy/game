// TypeScript file
class MoneyChargeFrame extends BaseWnd {
	item 
	twice
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/MoneyChargeLayout.exml"]
		
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width = 447
		this.mLayoutNode.height = 324
		this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_charge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChargeClick },
            	];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		this.mElemList["rd_money"].setAlignFlag(gui.Flag.LEFT_CENTER)
		this.mElemList["rd_cost"].setAlignFlag(gui.Flag.LEFT_CENTER)
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
	}
    onRefresh(){

		this.item = false
		this.twice = false
		//rd_money
		let guankaId = CampaignSystem.getInstance().getCurOpenCampaign()
		let zhangjieId = GameConfig.CampaignConfig[guankaId]["chapterId"]
		let money = GameConfig.AutoFightMonsterConfig[zhangjieId]["funds"]
		money = money * 2* 60 * 4
		let moneyStr = String.format(Localize_cns("ACCESS_MONEY_GET"),money)
		AddRdContent(this.mElemList["rd_money"],moneyStr,"ht_24_cc","ublack")
		
		//rd_cost
		let needId = 60045
		let had = ItemSystem.getInstance().getItemCount(needId)
		this.item = had >= 1? true : false
		let icon = GetTagIcon(needId)
		let yuanBaoStr = String.format(Localize_cns("ACCESS_MONEY_COST"),icon + had)
		AddRdContent(this.mElemList["rd_cost"],yuanBaoStr,"ht_24_cc","ublack")

		//label_num
		let num = getSaveRecord(opSaveRecordKey.rmbGoldToFundsCount) || 0
		let total = 5
		let vip = GetHeroProperty("VIP_level")
		if(vip >= 4){
			total += 2
		}
		let twice = total - num
		this.twice = num >= total ? false : true
		let numStr = String.format(Localize_cns("ACCESS_TXT4"),twice)
		this.mElemList["label_num"].textColor = "ublack"
		this.mElemList["label_num"].text = numStr;
	}
    public onChargeClick():void{
		if(this.item == false){
			MsgSystem.addTagTips(Localize_cns("ACCESS_NOT_ENOUGH"))
			return 
		}
		if(this.twice == false){
			MsgSystem.addTagTips(Localize_cns("ACCESS_NOT_TWICE"))
			return 
		}
		RpcProxy.call("C2G_EXCHANGE_FUNDS")
    }
	
}