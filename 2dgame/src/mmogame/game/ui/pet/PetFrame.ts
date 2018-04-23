class PetFrame extends BaseWnd {
	tabWndList: UITabWndList
	tabIndex: number
	petConfig: any;
	controlList: any[];
	petListBox: UIPetListBox;
	selectId: number;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/pet/PetLayout.exml"]

		this.tabIndex = -1

		this.petConfig = null
		this.controlList = []
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
			{ name: "tab1", wnd: PetUpgradeWindow.newObj(this.mLayoutNode, this), check: this.upgradeCheck, obj: this },
			{ name: "tab2", wnd: PetSkillWindow.newObj(this.mLayoutNode, this), check: this.skillCheck, obj: this },
			{ name: "tongling", wnd: PetTongLinWindow.newObj(this.mLayoutNode, this), check: this.tongLinCheck, obj: this },
			{ name: "shouhun", wnd: PetShouHunWindow.newObj(this.mLayoutNode, this), check: this.shouHunCheck, obj: this },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)


		this.tabWndList.setSelectedCallback(this.refreshDotTips, this)

		let group = <eui.Group>this.mElemList["pet_group"]
		this.petListBox = UIPetListBox.newObj(this.mLayoutNode, "pet", 0, 6, group.width, group.height, group)
		this.petListBox.setClickListner(this.autoReceiveSelect, this)
		this.selectId = this.petListBox.setPetList()
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}

		this.refreshFrame()
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);

		this.petConfig = null
		this.controlList = []
	}

	refreshFrame() {
		
	}

	autoReceiveSelect(petId) {
		this.selectId = petId

		let curIndex = this.tabWndList.getTabIndex()
		if (curIndex == 1) { //需要判断技能是否开启
			let petInfo = PetSystem.getInstance().getPetInfo(petId)
			if (petInfo == null) {
				this.tabWndList.changeTabWithIndex(0)
			}
		}

		this.tabWndList.getCurrentWnd().refreshFrameWithIndex(petId)
	}

	//////////////////////////////////////////
	upgradeCheck() {
		return true
	}

	skillCheck() {
		if (this.selectId) {
			let info = PetSystem.getInstance().getPetInfo(this.selectId)
			if (info) { //已经解锁
				return true
			} else { //没有解锁
				return false
			}
		} else {
			return false
		}
	}

	tongLinCheck() {
		//MsgSystem.addTagTips(Localize_cns("45级开启"))
		return true
	}

	shouHunCheck() {
		//MsgSystem.addTagTips(Localize_cns("55级开启"))
		return true
	}

	getPetId() {
		return this.selectId
	}

	////////////////////红点提示/////////////////////
	//自定义红点继承实现
	refreshDotTipsImp() {
		FunUITools.refreshDanDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd())
		FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd())
		FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd())
		FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd())

		this.petListBox.refreshPetDotTips(this, this.tabWndList.getTabIndex())
	}

	getDotTipsArgsImp(checkParam) {
		let args: any = {}
		args.index = this.tabWndList.getTabIndex()
		args.type = this.tabWndList.getCurrentWnd().soulType
		args.petId = this.selectId
		return args
	}

	//////////////////////////////////////////
	showWithIndex(index) {
		this.tabIndex = index;
		this.showWnd();
	}
}