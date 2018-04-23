class XianLvShengXingWindow extends BaseCtrlWnd {
	mElemList;
	Player:Player
	id

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.mLayoutNode = this.mParentWnd.mLayoutNode;
		
		var elemInfo = [
			
			{ ["name"]: "btn_shengXing", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onShengXingClick },
			];
			
		 UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		 
		 
		
	}

	public onUnLoad(): void {
		this.Player = this.mParentWnd.Player
		if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	public onShow(): void {
		
		this.mElemList["group_xianLv"].visible = true;
		//this.mElemList["up_star_wnd"].visible = true
		this.mElemList["label_wndName"].text = "仙侣"//Localize_cns("ROLE_TXT13");
        let controlList = XianLvSystem.getInstance().getControlList()
		this.mParentWnd.tabIndex = this.mParentWnd.tabWndList.getTabIndex()
		this.id = this.mParentWnd.selectId
		if(this.id == 0) this.id = controlList[0].Id
		this.onRefresh()
	
	}

	public onHide(): void {
		this.mElemList["group_xianLv"].visible = false;
	}
    
	refreshWithId(id){
		this.id = id
		this.onRefresh()
	}
	onRefresh(){
		this.mParentWnd.selectId = this.id
		let index = this.mParentWnd.tabIndex
		if(index == 3){
			this.mParentWnd.onRefresh()
		}
	}

	///btn_响应事件
	onShengXingClick(){
		this.id = this.mParentWnd.selectId  
		let itemid = GameConfig.FunUpStarConfig["XianLv"][this.id].itemid
		let star = XianLvSystem.getInstance().getStar(this.id)
		let itemnum = GameConfig.FunLevelNumConfig["XianLv"][star].num
		let had = ItemSystem.getInstance().getItemCount(itemid)
		if(had < itemnum) return
	
		RpcProxy.call("C2G_ACTOR_XIANLV_UP_START", this.id)

	}
}