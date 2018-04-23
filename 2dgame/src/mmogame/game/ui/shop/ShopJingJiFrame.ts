class ShopJingJiFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
    scroll:UIScrollList

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/ShopLayout.exml"]
        this.tabIndex = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "tab1", wnd: ShopJingJiFunWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab2", wnd: ShopJingJiFunWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab3", wnd: ShopJingJiFunWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab4", wnd: ShopJingJiFunWindow.newObj(this.mLayoutNode, this) },
			
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

		let groupNameList = [
			ShopSystem.SHOP_JINGJI, ShopSystem.FULI_JINGJI, ShopSystem.SHOP_HUSONG, ShopSystem.SHOP_DATI
		]

		for(let i = 1; i <= 4; i++ ){
			let entry = ShopSystem.getInstance().getShopEntryByGroupName(groupNameList[i-1])
			this.mElemList["tab" + i].label = ShopSystem.getInstance().getShopNameByEntry(entry)
		}

		this.mElemList["rd_had"].setAlignFlag(gui.Flag.RIGHT_CENTER)
		this.mElemList["rd_access"].setAlignFlag(gui.Flag.LEFT_CENTER)
		this.mElemList["rd_limit"].setAlignFlag(gui.Flag.LEFT_CENTER)

		RpcProxy.call("C2G_EnterEscortActivity")
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);
       

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
		
	}


	 showWithIndex(index) {
        this.tabIndex = index;
        this.showWnd();
    }
}