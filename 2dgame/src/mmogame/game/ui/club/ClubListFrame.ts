// TypeScript file

class ClubListFrame extends BaseWnd {
	isHaveClub: any;
	tabIndex: string;
	scroll: UIScrollList;
	list: any[];

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/club/ClubListLayout.exml"]

		this.list = []
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_creat", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.creatClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		let group = <eui.Group>this.mElemList["scroll_wnd"]
		this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 10, 5, group.width - 20, group.height - 10, group)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.ALL_CLUB_LIST, this.refreshFrame, this)
		RegisterEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, this.refreshFrame, this)

		//所有帮派信息
		RpcProxy.call("C2G_FactionInfoList")
		this.mLayoutNode.visible = true;
		this.refreshFrame();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ALL_CLUB_LIST, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, this.refreshFrame, this)
		this.mLayoutNode.visible = false;
	}

	refreshFrame() {
		let heroInfo = GetHeroPropertyInfo()
		this.isHaveClub = true
		if (heroInfo == null || heroInfo["faction"] == 0) {
			this.isHaveClub = false
		}

		this.mElemList["btn_creat"].visible = !this.isHaveClub

		let list = ClubSystem.getInstance().getClubInfoList()
		this.list = list

		this.scroll.clearItemList()

		let group = <eui.Group>this.mElemList["scroll_wnd"]
		for (let i = 0; i < size_t(list); i++) {
			let v = list[i]
			let window = this.scroll.getItemWindow(i, group.width - 20, 110, 0, 0, 0)
			this.initItemWindow(window)
			this.refreshItemWindow(window, v, i)
		}
		this.scroll.refreshScroll()
	}

	initItemWindow(window) {
		let name = window.name

		let width = window.width
		let height = window.height

		let Info: any = [
			//背景
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null, },
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "num_bg", ["title"]: null, ["font"]: null, ["image"]: "bh_textDi01", ["color"]: null, ["x"]: 15, ["y"]: 30, ["w"]: 45, ["h"]: 46, ["event_name"]: null, ["fun_index"]: null, },

			{ ["index_type"]: eui.Label, ["name"]: name + "num", ["parent"]: name + "num_bg", ["title"]: "1", ["font"]: "ht_26_cc", ["color"]: gui.Color.white, ["x"]: 13, ["y"]: 8, ["w"]: 45, ["h"]: 46, ["messageFlag"]: true },
			{ ["index_type"]: eui.Label, ["name"]: name + "nameAndLevel", ["parent"]: name + "bg", ["title"]: "", ["font"]: "ht_26_lc", ["color"]: gui.Color.saddlebrown, ["x"]: 80, ["y"]: 20, ["w"]: 300, ["h"]: 25, ["messageFlag"]: true },
			{ ["index_type"]: eui.Label, ["name"]: name + "bossName", ["parent"]: name + "bg", ["title"]: "", ["font"]: "ht_22_lc", ["color"]: gui.Color.saddlebrown, ["x"]: 80, ["y"]: 60, ["w"]: 300, ["h"]: 25, ["messageFlag"]: true },
			{ ["index_type"]: eui.Label, ["name"]: name + "curCount", ["parent"]: name + "bg", ["title"]: "", ["font"]: "ht_22_lc", ["color"]: gui.Color.saddlebrown, ["x"]: 270, ["y"]: 60, ["w"]: 150, ["h"]: 25, ["messageFlag"]: true },

			{ ["index_type"]: eui.Label, ["name"]: name + "enterForce", ["title"]: "", ["font"]: "ht_22_cc", ["color"]: gui.Color.saddlebrown, ["x"]: 375, ["y"]: 13, ["w"]: 194, ["h"]: 30, ["messageFlag"]: true },

			{ ["index_type"]: gui.Button, ["name"]: name + "btn", ["title"]: Localize_cns("CLUB_TXT55"), ["font"]: "ht_22_cc_stroke", ["image"]: "ty_tongYongBt2", ["color"]: gui.Color.white, ["x"]: 425, ["y"]: 42, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onApplyClick, },
		]
		UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
	}

	refreshItemWindow(window, data, index) {
		let name = window.name

		let myApplyList = ClubSystem.getInstance().getLegionApplyList()
		//到时候在这里获取是否拥有俱乐部而现实按钮
		if (data == null || data.level == null) {
			return
		}
		let id = data.id
		let level = data.level
		let leaderName = data.leader
		let clubName = data.name
		let memberNum = data.menberCount
		let maxmenberCount = data.maxmenberCount
		let logo = data.logo

		this.mElemList[name + "num"].text = index + 1

		let nameAndLevelText = String.format(Localize_cns("CLUB_TXT58"), clubName, level)
		this.mElemList[name + "nameAndLevel"].text = nameAndLevelText

		let bossName = String.format(Localize_cns("CLUB_TXT59"), leaderName)
		this.mElemList[name + "bossName"].text = bossName

		let menberText = memberNum + "/" + maxmenberCount
		let curCountText = String.format(Localize_cns("CLUB_TXT99"), menberText)
		this.mElemList[name + "curCount"].text = curCountText

		let forceElem = <eui.Label>this.mElemList[name + "enterForce"]
		let needForce = data.force || 0
		let myForce = GetHeroProperty("force") || 0

		let applyText = ""
		if (myApplyList != null && myApplyList[id]) {
			this.mElemList[name + "btn"].source = "ty_tongYongBt6"
			applyText = Localize_cns("RENAME_TXT5")
			forceElem.text = Localize_cns("CLUB_TXT75")
		} else {
			this.mElemList[name + "btn"].source = "ty_tongYongBt2"
			applyText = Localize_cns("CLUB_TXT55")
			forceElem.text = Localize_cns("CLUB_TXT74") + needForce
		}
		this.mElemList[name + "btn"].text = applyText

		forceElem.textColor = myForce >= needForce ? gui.Color.saddlebrown : gui.Color.red

		let heroInfo = GetHeroPropertyInfo()
		if (heroInfo == null || heroInfo["faction"] == 0) {
			this.mElemList[name + "btn"].visible = true
			forceElem.visible = true
		} else {
			this.mElemList[name + "btn"].visible = false
			forceElem.visible = false
		}
	}

	/////////////////////////////////////////////////////////////
	onApplyClick(args) {
		let name = args.target.name
		let index = name.replace(/[^0-9]/ig, "")

		let data = this.list[index]
		let clubId = data.id
		let applyReason = ""	//申请描述
		//首先判断是否能够申请
		let myApplyList = ClubSystem.getInstance().getLegionApplyList()
		if (myApplyList != null && myApplyList[clubId]) {
			RpcProxy.call("C2G_FactionCancelApply", clubId)
		} else {
			RpcProxy.call("C2G_FactionApply", clubId, applyReason)
		}
	}

	creatClick() {
		WngMrg.getInstance().showWindow("ClubCreatFrame");
	}

	////////////////////////////////////////////////////////////
	showAndSetData() {
		this.showWnd()
	}
}