class DailyFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
    npcIndex

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/DailyLayout.exml"]
        this.tabIndex = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			
		//	{ ["name"]: "btn_kill", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onKillClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "tab0", wnd: DailyXiangYaoWindow.newObj(this.mLayoutNode, this) , check:this.xiangYaoClick, obj:this},			
			{ name: "tab1", wnd: DailyZuDuiWindow.newObj(this.mLayoutNode, this), check:this.zuDuiClick, obj:this },
			{ name: "tab2", wnd: DailySanBaiWindow.newObj(this.mLayoutNode, this) , check:this.sanBaiClick, obj:this},
			{ name: "tab3", wnd: DailyXiYouWindow.newObj(this.mLayoutNode, this), check:this.xiYouClick, obj:this },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

	}
    public onUnLoad(): void {
	
	}


	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);
        this.mLayoutNode.setDoModal(true)
		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
		this.mLayoutNode.setDoModal(false)
	}

	updateWnd(){
		let wnd = this.tabWndList.getCurrentWnd()
        if (wnd) {
            wnd.updateWnd()
        }
	}

	////---------------检查
	xiangYaoClick(){
		return true
	}
	
	zuDuiClick(){
		return true
	}

	sanBaiClick(){
		return true
	}

	xiYouClick(){
		return true
	}
	////////////////////外部显示
	showWithIndex(index){
		this.tabIndex = index
		this.showWnd()
	}
}// TypeScript file