class ClubFrame extends BaseWnd {
	tabWndList: UITabWndList
	tabIndex: number

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/club/ClubLayout.exml", "layouts/team/TeamGroupLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

			{["name"]: "btn_tips" , ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRule },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		let tabInfoList = [
			{ name: "radio1", wnd: Club_HallWnd.newObj(this.mLayoutNode, this) },
			{ name: "radio2", wnd: Club_IncenseWnd.newObj(this.mLayoutNode, this) },
			{ name: "radio3", wnd: Club_FuBenWnd.newObj(this.mLayoutNode, this) },
			{ name: "radio4", wnd: Club_SkillWnd.newObj(this.mLayoutNode, this) },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
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

	setTitle(str: string) {
		this.mElemList["title"].text = str
	}

	onClickRule() {
		let wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame")
        wnd.showWithActivity("")
	}

	updateWnd() {
         if (this.isVisible() && this.tabWndList.getTabIndex() == 2) {
			 this.tabWndList.getCurrentWnd().refreshFrame()
		 }  
    }

	showWithIndex(index) {
		this.tabIndex = index;
		this.showWnd();
	}
}