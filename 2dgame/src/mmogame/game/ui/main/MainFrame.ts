class MainFrame extends BaseWnd {
	mChatViewr: UIChatViewer;
	//mCombatWnd: BaseCtrlWnd;

	tab_btn_list: any;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/MainLayout.exml"]

	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreenRaw(true);

		this.initSkinElemList();

		this.mLayoutNode.touchEnabled = false;
		//this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)

		var elemInfo = [

			{ ["name"]: "btn_playerDetails", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPlayerDetailsClick },

			//VIP和排行
			{ ["name"]: "vip_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickVip },
			{ ["name"]: "rank_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRank },


			{ ["name"]: "copper_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCopper },
			{ ["name"]: "silver_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSilver },
			{ ["name"]: "gold_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickGold },

            { ["name"]: "role_exp", ["messageFlag"]: true},
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		this.mChatViewr = UIChatViewer.newObj(this, this.mLayoutNode, "chatviewer", 0, 0, this.mElemList["chat_wnd"]);
		//this.mCombatWnd = MainCombatWindow.newObj(this.mLayoutNode, this)

		this.mElemList["name_rd"].setAlignFlag(gui.Flag.LEFT_CENTER)

		let radioGroup = new eui.RadioButtonGroup()
		for (let i = 0; i < 6; i++) {
			let elem = <eui.RadioButton>this.mElemList["tab" + i]
			elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTab, this)
			elem.group = radioGroup
			elem.value = i
		}

		//注册事件
		let tab_btn_list: any = {
			tab0: { keyfunc: null, callback: null },
			tab1: { keyfunc: "zhucheng", funcname: "MainCityFrame" },
			tab2: { keyfunc: "jiaose", funcname: "RoleFrame" },
			tab3: { keyfunc: "duanzao", funcname: "ForgeFrame" },
			tab4: { keyfunc: "xianlv", funcname: "XianLvFrame", callback : this.onXianLvClick },
			tab5: { keyfunc: "chongwu", funcname: "PetFrame" },
		}
		this.tab_btn_list = tab_btn_list

		//选中第一个
		this.mElemList["tab0"].selected = true
		//this.refreshCombat()
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		//RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)

		this.mChatViewr.setVisible(true)

		this.mLayoutNode.visible = true;
		this.mLayoutNode.moveToBack()

		if (GAME_MODE == GAME_NORMAL) {
			this.refreshFrame();
		}
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		//UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)

		this.mChatViewr.setVisible(false)

		this.mLayoutNode.visible = false;

	}

	refreshFrame() {
		let heroInfo = GetHeroPropertyInfo()
		if (heroInfo == null) return;

		//更新coin
		this.mElemList["copper_txt"].text = heroInfo.funds
		this.mElemList["silver_txt"].text = heroInfo.bindGold
		this.mElemList["gold_txt"].text = heroInfo.gold

		//更新头像window
		this.mElemList["btn_playerDetails"].source = GetProfessionIcon(heroInfo.vocation, heroInfo.sexId)

		AddRdContent(this.mElemList["name_rd"], "Lv." + heroInfo.level + "#space_10" + heroInfo.name, "ht_20_cc", "ublack")

		let force = GetHeroProperty("force") || 0
		this.mElemList["force_batch"].beginDraw();
		this.mElemList["force_batch"].drawNumberString("zhanLi_", force, 0, 0, -3)
		this.mElemList["force_batch"].endDraw();

		let vipBatch = <gui.BatchImage>this.mElemList["vip_batch"]
		let offx = (1 - heroInfo.VIP_level.toString().length) * 8
		vipBatch.beginDraw();
		vipBatch.drawNumberString("vip_", heroInfo.VIP_level, offx, 0)
		vipBatch.endDraw();

		//更新经验
		let limitExp = RoleSystem.getInstance().getLevelupExp()
		UiUtil.updateProgress(this.mElemList["role_exp"], heroInfo.exp, limitExp, null, 1000)
	}

	// refreshCombat() {
	// 	let combatWnd = WngMrg.getInstance().getWindow("FightFrame")
	// 	if (!combatWnd.isVisible()) {
	// 		combatWnd.showWnd()
	// 		//this.mCityWnd.hideWnd()
	// 		WngMrg.getInstance().hideWindow("MainCityFrame")
	// 	}
	// }

	// refreshCity() {
	// 	let cityWnd = WngMrg.getInstance().getWindow("MainCityFrame")
	// 	let combatWnd = WngMrg.getInstance().getWindow("FightFrame")

	// 	if (cityWnd.isVisible()) {
	// 		this.refreshCombat()
	// 	} else {
	// 		combatWnd.hideWnd()
	// 		cityWnd.showWnd()
	// 	}
	// }

	hideRegistWnd(name) {
		// if (MainAutoHideUI[name] && WngMrg.getInstance().isVisible(name)) {
		// 	return true
		// }
		let isVisible = WngMrg.getInstance().isVisible(name)


		for (let registname in MainAutoHideUI) {
			WngMrg.getInstance().hideWindow(registname)
		}
		return isVisible
	}

	// onCombatBegin(args) {
	// 	if (args.fightType != opFightResultType.PATROL) {
	// 		this.refreshCombat()
	// 	}
	// }

	/////////////////////////响应事件//////////////////////////
	onClickTab(event: egret.TouchEvent) {
		let target = event.target
		let v = this.tab_btn_list[target.name]

		if (this.hideRegistWnd(v.funcname)) return;

		if (v == null) {
			TLog.Error("onClickMoreSubBtn %s", target.name)
			return
		}

		if (v.callback) {
			v.callback.call(this, event);
			return;
		}

		if (ExecuteMainFrameFunction(v.keyfunc)) {

		}
	}

	onClickCopper(args) {
		let wnd : MoneyChargeFrame = WngMrg.getInstance().getWindow("MoneyChargeFrame")
		wnd.showWnd()
	}

	onClickSilver(args) {

	}

	onClickGold(args) {
		ExecuteMainFrameFunction("chongzhi")
	}

	//玩家详情
	onPlayerDetailsClick(args) {
		ExecuteMainFrameFunction("wanjia")
	}

	onXianLvClick(){
		let checkList = CheckMainFrameFunction(GuideFuncDefine.FIELD_FUNC_TIANNV)

		if(checkList[0] == true){
			let wnd : CommonOpenTipsFrame = WngMrg.getInstance().getWindow("CommonOpenTipsFrame")
			if(wnd.isVisible() == true){
				wnd.hideWnd()
				return
			}
			wnd.onShowWnd(4, 350, 827)
	 		return 
		}
		ExecuteMainFrameFunction("xianlv")
	}

	onClickVip(args) {
		ExecuteMainFrameFunction("VIP")
	}

	onClickRank(args) {
		ExecuteMainFrameFunction("paihangbang")
	}

	///////////////////////////////////////////////////////
	getDotTipsArgsImp(checkParam) {

	}

	///////////////////////////////////////////////////////
	setHeadGroupVisible(b:boolean){
		this.mElemList["head_group"].visible = b
		this.mElemList["coin_group"].visible = b
	}
	
	/////////////////////////////////////////////
	setChatViewerVisible(visible : boolean){
		this.mChatViewr.setVisible(visible)
	}

}