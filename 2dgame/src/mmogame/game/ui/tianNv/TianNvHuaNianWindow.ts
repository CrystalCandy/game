class TianNvHuaNianWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
	list:any;
	unreal:any;
    recvList:any;
	endIndex:any
	isEnough;
	Player:Player
	type
	
	public initObj(...params: any[]) {
		this.type = cellOptionsIndex.TianNvHuaNian
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.Player = this.mParentWnd.Player
		
		var elemInfo = [
			{ ["name"]: "btn_property_dan", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPropertyClick },
			{ ["name"]: "btn_search", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSearchClick },
			{ ["name"]: "btn_left", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
			{ ["name"]: "btn_right", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
			{ ["name"]: "btn_unreal", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUnrealClick },
			{ ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			{ ["name"]: "btn_auto_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAutoUpClick },
			{ ["name"]: "btn_equip", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
			];
			
		 UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		 
         this.select = 0;
	  

		 this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
		 this.mElemList["stage_txt"].textColor = gui.Color.ublack;

		
		
	}

	public onUnLoad(): void {
		if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	public onShow(): void {
		RegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this)
		RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_tiannv"].visible = true;
		this.mElemList["label_wndName"].text = Localize_cns("TIANNV_TITLE_TXT3");
		this.mElemList["TianNv_checkbox"].visible = false
		this.mElemList["TianNvXianQi_checkbox"].visible = false
		this.mElemList["TianNvHuaNian_checkbox"].visible = true
		this.mElemList["TianNvLingQi_checkbox"].visible = false

		this.onRefresh()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
		UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
		this.mElemList["group_tiannv"].visible = false;
	}
    
	onRefresh(){
		
		this.mElemList["btn_skin"].visible = false
		
		this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type)
	
		if(size_t(this.recvList) == 0) {
			return	
		}
		let arr = this.recvList;
		
		let name = cellOptionsName[this.type-1]
        this.list = GameConfig.FunShapeConfig[cellOptionsName[this.type-1]];  
		let stage = arr["stage"]
		let exp = arr["stageexp"]
		this.endIndex = stage + 1;
		
		
		this.unreal = arr["curshape"]; 
        this.select = stage

        this.onRefreshTop();
		//本级经验 现在经验
		FunUITools.updateExpProgress(this.type, this)
        
		//消耗
		FunUITools.updateNeedMaterial(this.type, this)
        
		//更新战力
		FunUITools.updateForceNum(this.type,this)
		
		//
		this.onInitItemBox();

		let templist = FunUITools.checkWearEquip(this.type, this)
		if(size_t(templist) == 0){
			this.mElemList["btn_equip"].visible = false
		}else{
			this.mElemList["btn_equip"].visible = true
		}

		FunUITools.upgradeAutoFunctionCheck(this.type, this, "btn_auto_upgrade", "btn_upgrade")
		
	}
   onRefreshTop(){

	   	if(this.select == 0){
			this.select = 1;
		}
        let arr = this.list;
		if(size_t(arr) == 0)  return;
        let index = this.select;

		if(arr[this.select]){
		    //更新名字，阶数
			FunUITools.updateActorStage(this.type, this, this.select)
		}

	    this.mElemList["group_effect"].visible = false;
		this.mElemList["turn_icon"].visible = false;
		this.mElemList["btn_unreal"].visible = false;
		this.mElemList["btn_right"].enabled = true
		this.mElemList["btn_left"].enabled = true

        if(index == this.unreal ){
		   this.mElemList["turn_icon"].visible = true;
        }else if (index == this.endIndex ) {
		   this.mElemList["group_effect"].visible = true;
		   this.mElemList["btn_right"].enabled = false
		   FunUITools.updateAddForceNum(this.type, this)
		}else{
			this.mElemList["btn_unreal"].visible =true;

		}

		if(this.select == 1){
			this.mElemList["btn_left"].enabled = true
	//	}else if(this.select == this.endIndex){		
		}
		this.mElemList["btn_left"].visible = true
		this.mElemList["btn_right"].visible = true
		
		if(this.Player == null){
			this.Player = Player.newObj()
			this.mParentWnd.Player = this.Player
		}

		//更新actorview
		FunUITools.updateActorModel(this.type, this, this.Player, this.select)
   }
  
   onInitItemBox(){
	   
    //  FunUITools.updateEquipWnd(this.type, this)
	  //更新技能 
	  let typelist = [
		//  cellOptionsIndex.TianNv ,
	    // cellOptionsIndex.TianNvXianQi ,
	      cellOptionsIndex.TianNvHuaNian ,
	     // cellOptionsIndex.TianNvLingQi 
	  ]
      this.mElemList["fun_skill_wnd1"].visible = false
      this.mElemList["fun_skill_wnd2"].visible = true
	  FunUITools.updateTianNvSkillWnd(typelist, this, this.mElemList["fun_skill_wnd2"], "lingqiskill")

	  for(let i = 0; i < size_t(typelist); i++){
		  this.mElemList["lingqiskill" + i].setClickCallBack(this.onShowFunFrame, this, [typelist, i])
	  }
	   
   }
  
   onShowFunFrame(list){
       let typelist = [
		  cellOptionsIndex.TianNv ,
	      cellOptionsIndex.TianNvXianQi ,
	      cellOptionsIndex.TianNvHuaNian ,
	      cellOptionsIndex.TianNvLingQi 
	  ]
	    let wnd = WngMrg.getInstance().getWindow("FunSkillFrame")
		wnd.showWithTypeListAndIndex(typelist, 2)
   }

    public onUnrealClick():void{
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			//this.unreal = this.select;
        	//this.onRefreshTop();
			FunUITools.sendTurnRequest(this.type, this.select)
		}  
	}


	public onRightClick(): void {
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			if(this.select == this.endIndex || this.select == -1 )  return;
			this.select = this.select +1;
			this.onRefreshTop();
		}
	}
	public onLeftClick(): void {
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			if(this.select == 1 || this.select == -1) return;
			this.select = this.select - 1;
			this.onRefreshTop();
		}
	}
	public onPropertyClick():void{
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.openPropertyFrame(this.type)	
		}
	}
	onUpClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.upgradeFunction(this.type, this)
		}
	}
	onAutoUpClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.upgradeAutoFunction(this.type, this, "btn_auto_upgrade", "btn_upgrade")
		}
	}

	onEquipClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			let templist = FunUITools.checkWearEquip(this.type, this)
			FunUITools.oneKeyWearEquip(this.type, this, templist)
		}
	}

	public onSearchClick():void{
	   if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.openFunPropertyFrame(this.type, this.select)
		}
	}
}