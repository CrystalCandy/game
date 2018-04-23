// TypeScript file
class GoodsAsseceFrame extends BaseWnd {
	num;
    itemId;
	index : number
	price 
	shopEntry
	unit

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/GoodsAsseceLayout.exml"]
		this.itemId = -1;
		this.index = -1
		this.price = 100
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
	//	this.mLayoutNode.width = 514
	//	this.mLayoutNode.height = 332
		this.setAlignCenter(true, true)
		
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_buy", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onBuyClick },
			{ ["name"]: "btn_charge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChargeClick },
			
			{ ["name"]: "btn_plus", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPlusClick },
			{ ["name"]: "btn_plus10", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPlus10Click },
			{ ["name"]: "btn_cut", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onCutClick },
			{ ["name"]: "btn_cut10", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onCut10Click },
            ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		
		this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox",0, 5, this.mElemList["group_item"])
		this.mElemList["rd_whole"].setAlignFlag(gui.Flag.CENTER_CENTER)
		this.mElemList["rd_access"].setAlignFlag(gui.Flag.CENTER_CENTER)
		this.mElemList["rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER)
		
		
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.onRefresh();
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.itemId = -1;
		this.shopEntry = null
		
	}
    onRefresh(){
		//common
		if(this.itemId > 0){
			this.mElemList["itemBox"].updateByEntry(this.itemId)
		}else{
			return
		}
		
		

		let color = GetItemFontColor(this.itemId)
		let nameStr = "#" + color + GameConfig.itemConfig[this.itemId].name
		let isBuy = false
		//
		let item = GameConfig.itemConfig[this.itemId]
		this.shopEntry = item.shopEntry 
		isBuy = this.shopEntry == 0? false : true
		
		if(!isBuy){
			this.mLayoutNode.height = 332
		}else{
			this.mLayoutNode.height = 608
			this.num = this.num || 1
			//this.shopEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName)
			
			let itemList = ShopSystem.getInstance().getShopItemList(this.shopEntry)
			for(let k in itemList){
				let item = itemList[k]
				if(item.itemEntry == this.itemId){
					this.index = tonumber(k)
				}
			}
			let item = itemList[this.index]
			this.price = item.price/item.buyNumber	
			this.unit = item.money
			//rd_name
			let money = this.price
			nameStr += "#br#br"+ GetMoneyIcon(this.unit) + "#lime" + money
		
			//rd_access
			AddRdContent(this.mElemList["rd_access"], Localize_cns("ACCESS_TXT10") , "ht_24_cc")

			this.onRefreshWholeMoney(this.num)
		}
		this.mLayoutNode.width = 514
		this.mElemList["group_1"].visible = isBuy
		AddRdContent(this.mElemList["rd_name"], nameStr , "ht_24_cc")
		
	}
	onRefreshWholeMoney(num){
		//label_num
		this.mElemList["label_num"].text = num;
		//rd_whole
		let wholeMoney = num * this.price
		let wholeStr = GetMoneyIcon(this.unit) + wholeMoney
		AddRdContent(this.mElemList["rd_whole"], wholeStr , "ht_24_cc", "ublack")
	}

	///////------------响应事件
    public onChargeClick():void{
        ExecuteMainFrameFunction("chongzhi")
		this.hideWnd()
    }
    public onBuyClick():void{
		let itemList = ShopSystem.getInstance().getShopItemList(this.shopEntry)
		let item = itemList[this.index]
		let money = GetHeroMoney(this.unit)
		if(money < this.num * this.price){
			let tips = this.unit == 2? Localize_cns("LUCKY_TXT3") : Localize_cns("LUCKY_TXT4")
			MsgSystem.addTagTips(tips)
			return
		}
		RpcProxy.call("C2G_SHOP_BUT_ITEM", this.shopEntry, item.Index, this.num)
    }
	private onPlusClick(){
		let money = GetHeroMoney(this.unit)
		if(money < (this.num + 1)* this.price) return 
		this.num = this.num + 1;
		this.onRefreshWholeMoney(this.num)
	}
	private onPlus10Click(){
		let money = GetHeroMoney(this.unit)
		if(money < (this.num + 10) * this.price) return 
		this.num = this.num + 10;
		this.onRefreshWholeMoney(this.num)
	}
	private onCutClick(){
		this.num = this.num -1 ;
		if(this.num <= 1) this.num = 1;
		this.onRefreshWholeMoney(this.num)
	}
	private onCut10Click(){
		this.num = this.num -10;
		if(this.num <= 1) this.num = 1;
		this.onRefreshWholeMoney(this.num)
	}
	onShowWnd(entryId, num : number ){
		this.itemId = entryId;
		this.num = num
		this.showWnd()
	}
}