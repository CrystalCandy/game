class MainActivityWnd extends BaseCtrlWnd {
	taskElem: any;
	nameToIndex : any [];
	isRefresh :boolean
	btnList:any[];

	public initObj(...params: any[]): void {

	}
	public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.createFrame()
		this.isRefresh = false
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this)
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
		RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
		this.mElemList["activity_wnd"].visible = true
		this.refreshFrame()
		this.checkBottomPos()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
		UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
		this.mElemList["activity_wnd"].visible = false
	}

	refreshFrame(){
		this.nameToIndex = []
		let y = 0
		//let yIndex = 0 
		let shownamelist = this.checkShowList()
		for(let i =0;i<size_t(this.btnList);i++){
			//y = 550 - (yIndex * 80)
			let info = this.btnList[i]
			let activityIndex = info.index

			let btnName = this.getBtnName(i)


			//this.mElemList[btnName].visible = false
			let bVisible = false
			for(let j =0;j<size_t(shownamelist);j++){
				if(info.index == shownamelist[j].index){
					//this.mElemList[btnName].visible = true
					bVisible = true
					// this.mElemList[btnName].y = y
					// yIndex = yIndex + 1
					break
				}
			}

			UiUtil.setVisible(this.mElemList[btnName], bVisible, bVisible)
			this.nameToIndex[btnName] = activityIndex
		}
	}

	checkShowList(){
		let shownamelist = []
		for(let i =0;i<size_t(this.btnList);i++){
			let info = this.btnList[i]
			let index = info.index
			if(info.check){
				if(info.check() == true){
					table_insert(shownamelist,info)
				}
			}else{
				if(this.checkAcitivityIsOpen(index) == true){
			   		table_insert(shownamelist,info)
		   		}
			}
		}
		return shownamelist
	}

	getBtnName(i){
		let info = this.btnList[i]
		let name = info.name
		if(name == null){
			name = "activity_btn"+i
		}
		return name
	}

	createFrame() {
	   let funcList = [
		    { index: -1, image: "zjm_Bt36",check:this.daily,func:this.dailyClick, name:"dynamic_richang"},//日常
		    { index: -2, image: "zjm_Bt29",check:this.checkBag,func:this.bagClick, name:"dynamic_beibao"},//背包
	   ]

	   let btnList = []
	 
	   for(let i =0; i<size_t(funcList); i++){	//常驻
		    let info = funcList[i]
			table_insert(btnList,info)
	   }

	   let openList = GetPayActivityUiConfig("Main")	//活动
	   for(let i =0; i<size_t(openList); i++){
		    let info = openList[i]
			table_insert(btnList,info)
	   }

	   for(let i =0; i<size_t(btnList); i++){
		   let info = btnList[i]
		   let image = info.image
		   let index = info.index
		   let call = this.onClick

		   if(info.func != undefined){
			  call = info.func
		   }
		   
		//    let x = 0
		//    let y = 550 - (i * 80)

		   let name = info.name
		   if(name == null){
			   name = "activity_btn"+i
		   }

		   var elemInfo1 = [
		 	 { ["index_type"]: gui.Button, ["name"]: name,  ["title"]: "", ["font"]: "ht_20_cc_stroke", ["image"]: image, ["color"]: gui.Color.white,  ["w"]: 70, ["h"]: 80, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: call},
	   	   ]
		   UiUtil.createElem(elemInfo1, this.mLayoutNode, this.mElemList, this, this.mElemList["activity_wnd"]);
	 	}

		this.btnList = btnList
	}

	dailyClick(){
		ExecuteMainFrameFunction("richang")
	}

	bagClick(){
		ExecuteMainFrameFunction("beibao")
	}

	// leichongClick(){
	// 	let wnd = WngMrg.getInstance().getWindow("TouZiFrame")
	// 	wnd.showWithIndex(0)
	// }
	
	// firstPayClick(){
	// 	// TLog.Debug("firstPayClick")
	// }

	// monthClick(){
	// 	// TLog.Debug("monthClick")
	// }

	onClick(args){
		let name = args.target.name
		if(this.nameToIndex[name] == null){
			return
		}
		let index = this.nameToIndex[name]
		ExecuteActivityIndex(index)
	}

	checkAcitivityIsOpen(index){
		//return true
		if(index == PayActivityIndex.C_MONTHCARD){	//月卡
			let level = GetHeroProperty("level")
			let isBuy = PaySystem.getInstance().isMonthCardActive()
			if(isBuy){
				return false
			}
			return (level >= 20)
		}
		return ActivitySystem.getInstance().checkActivityIsOpen(index)
	}

	checkBag(){
		return true
	}

	daily(){
		let level = GetHeroProperty("level")
		if(level < 40 ) return false
		return true
	}
	

	onUIShowEvent(args) {
		if(args.window.classname == "IconMsgFrame"){
			this.checkBottomPos()
		}
		
	}

	onUIHideEvent(args) {
		if(args.window.classname == "IconMsgFrame"){
			this.checkBottomPos()
		}
	}


	checkBottomPos(){
		if(MsgSystem.isIconMsgVisible()){
			this.mElemList["activity_wnd"].bottom = 420
		}else{
			this.mElemList["activity_wnd"].bottom = 345
		}
	}
	
}