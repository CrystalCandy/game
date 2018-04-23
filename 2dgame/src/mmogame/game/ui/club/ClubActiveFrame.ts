// TypeScript file

class ClubActiveFrame extends BaseWnd {
	tabWndList: UITabWndList
	tabIndex: number

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/club/ClubActiveLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		let tabInfoList = [
			{ name: "tab1", wnd: ClubActive_InfoWnd.newObj(this.mLayoutNode, this) },
			{ name: "tab2", wnd: ClubActive_PrizeWnd.newObj(this.mLayoutNode, this) },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		RegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this)
		this.mLayoutNode.visible = true;

		this.tabWndList.setWndVisible(true);

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}

		this.refreshFrame();

		RpcProxy.call("C2G_FactionPlayerActiveInfo")
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
	}

	refreshFrame() {

	}
}