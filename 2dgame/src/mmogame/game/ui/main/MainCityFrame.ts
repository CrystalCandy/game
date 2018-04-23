class MainCityFrame extends BaseWnd {

	controlData:any;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/MainCityLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)

		var elemInfo = [
			{ ["name"]: "club_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClubClick },
			{ ["name"]: "champion_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChampionClick },
			{ ["name"]: "boss_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBoss },
			{ ["name"]: "activity_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onActivityClick },
			{ ["name"]: "fuben_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFubenClick },
			
			{ ["name"]: "btn_yuanbao", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onYuanBaoClick },
			{ ["name"]: "btn_equip", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
			{ ["name"]: "btn_pet", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPetClick },
			{ ["name"]: "btn_jingji", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onJingJiClick },
			{ ["name"]: "btn_tianxian", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onTianXianClick},
			{ ["name"]: "btn_marry", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onMarryClick },
			{ ["name"]: "btn_suit", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSuitClick },

			{ ["name"]: "btn_friends", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFriendsClick },
			{ ["name"]: "cross_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onCrossClick },
			
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
	}

	public onUnLoad(): void {

	}

	public onShow(): void {

		RegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this)

		this.mLayoutNode.visible = true;
		let wnd  = WngMrg.getInstance().getWindow("MainFrame")
		if(wnd.isVisible() == true){
			wnd.setChatViewerVisible(false)
		}

		this.refreshFrame()
		
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this)

		this.mLayoutNode.visible = false;
		let wnd = WngMrg.getInstance().getWindow("MainFrame")
		if(wnd.mLayoutNode.visible == true){
			wnd.setChatViewerVisible(true)
		}
	}


	public refreshFrame(){
		let parentGroup:eui.Group = this.mElemList["group_actList"]
		parentGroup.removeChildren()

		this.controlData = {}

		let uiElemList = [];
		let uiConfigList:any[] = GetOpenActivityUiConfig("MainCity")
		for(let config of uiConfigList){
			let elem = {["index_type"]: gui.Button,   ["name"]: "dynamicButotn" + config.index, ["font"]: null, ["image"]: config.image, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0,  ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickActivityButton,}
			uiElemList.push(elem)

			this.controlData["dynamicButotn" + config.index] = config
		}
		UiUtil.createElem(uiElemList, this.mLayoutNode, this.mElemList, this, parentGroup)
	}




	public onClubClick(): void {

		ExecuteMainFrameFunction("gonghui")
	}

	public onChampionClick(): void {
		ExecuteMainFrameFunction("jingjichang")
	}

	
	public onClickBoss() {
		WngMrg.getInstance().showWindow("BossMainFrame")
	 }

	public onActivityClick() {
	    ExecuteMainFrameFunction("huodong")
	}

	public onFubenClick() {
		ExecuteMainFrameFunction("fuben")
	}


	///Bottom
	
	public onYuanBaoClick() {
	    ExecuteMainFrameFunction("yuanbaoshangdian")
	}

	public onEquipClick() {
		ExecuteMainFrameFunction("zhuangbeishangdian")
	}
	
	public onPetClick() {
	    ExecuteMainFrameFunction("chongwushangdian")
	}

	public onJingJiClick() {
		ExecuteMainFrameFunction("jingjishangdian")
	}
	
	public onTianXianClick() {
	    ExecuteMainFrameFunction("tianxian")
	}

	//三生三世
	public onMarryClick() {
		WngMrg.getInstance().showWindow("SanShengSanShiFrame")
	//	ExecuteMainFrameFunction("shouchong")
	}
	
	public onSuitClick() {
	 //   ExecuteMainFrameFunction("touzi")
	}

	public onFriendsClick() {
	    ExecuteMainFrameFunction("haoyou")
	}
	
	public onCrossClick() {
		ExecuteMainFrameFunction("global")
	}

	public onClickActivityButton(args:egret.TouchEvent){
		let name = args.target.name
		let config = this.controlData[name]

		ExecuteActivityIndex(config.index)
	}
	
	
}