// TypeScript file
// TypeScript file
class BeiBaoAddCapacityFrame extends BaseWnd {
	count : number;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/item/BeiBaoAddCapacityLayout.exml"]
		
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		    { ["name"]: "btn_sure", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSureClick },
			{ ["name"]: "btn_cancel", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_add", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick },
			{ ["name"]: "btn_reduce", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReduceClick },
        
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
		
		this.count = 5
	}

	public onUnLoad(): void {

	}
	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
		this.onRefresh()

	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}

	///
	onRefresh(){
		//rd_cost
		let ratio = 10
		let costStr = GetMoneyIcon(opItemUnit.CURRENCY) + "#space" + ratio * this.count
		AddRdContent(this.mElemList["rd_cost"], costStr , "ht_22_cc")
		//label_num
	
		this.mElemList["label_num"].text = this.count
	}

	/////btn响应事件
	public onSureClick():void{
		let unittype = 3 //哪一种
		let money = GetHeroMoney(unittype)
		if(money > this.count){
			RpcProxy.call("C2G_PacketUpstep", this.count/5)
		}else{
			MsgSystem.addTagTips(Localize_cns("元宝不足"))
		}


	}
	
	onAddClick(){
		this.count += 5
		this.onRefresh()
	}

	onReduceClick(){
		if(this.count == 5) return
		this.count -= 5
		this.onRefresh
	}
}