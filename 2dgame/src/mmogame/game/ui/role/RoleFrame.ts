class RoleFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
	Player : Player
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/RoleLayout.exml"]
        this.tabIndex = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "equips", wnd: RoleEquipsWindow.newObj(this.mLayoutNode, this) },
			{ name: "skills", wnd: RoleSkillsWindow.newObj(this.mLayoutNode, this) },
			{ name: "zuoqi", wnd: RoleMountsWindow.newObj(this.mLayoutNode, this) },
			{ name: "chibang", wnd: RoleWingsWindow.newObj(this.mLayoutNode, this) },
			
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

		this.tabWndList.setSelectedCallback(this.refreshDotTips, this)
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

    ////////////////////红点提示/////////////////////
	//自定义红点继承实现
	refreshDotTipsImp() {
		FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
	}

	getDotTipsArgsImp(checkParam) {
		let args: any = {}
		args.index = this.tabWndList.getTabIndex()
		args.type = this.tabWndList.getCurrentWnd().type
		return args
	}

	 showWithIndex(index) {
        this.tabIndex = index;
        this.showWnd();
    }
}