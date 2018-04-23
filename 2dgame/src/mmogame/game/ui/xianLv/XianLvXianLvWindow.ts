class XianLvXianLvWindow extends BaseCtrlWnd {
	mElemList
	Player:Player
	id;

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.mLayoutNode = this.mParentWnd.mLayoutNode;
		
		
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
		
		this.mElemList["label_wndName"].text = "仙侣"//Localize_cns("ROLE_TXT13");
        let controlList = XianLvSystem.getInstance().getControlList()
		this.mParentWnd.tabIndex = this.mParentWnd.tabWndList.getTabIndex()
		this.id = this.mParentWnd.selectId
		if(this.id == 0) {
			//this.mParentWnd.petListBox.mElemList[]
			this.id = controlList[0].Id
		}
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
		if(index == 0){
			this.mParentWnd.onRefresh()
		}
	}
   
}