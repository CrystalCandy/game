class RoleMountsWindow extends BaseCtrlWnd {
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
		this.type = cellOptionsIndex.HeroRide
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.Player = this.mParentWnd.Player
		
		var elemInfo = [
			
			{ ["name"]: "btn_M_skin", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSkinClick },
			{ ["name"]: "btn_M_search", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSearchClick },
			{ ["name"]: "btn_property_dan", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPropertyClick },
			{ ["name"]: "btn_MleftC", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
			{ ["name"]: "btn_MrightC", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
			{ ["name"]: "btn_M_unreal", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUnrealClick },
			{ ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			{ ["name"]: "btn_auto_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAutoUpClick },
			{ ["name"]: "btn_equip", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
			
			];
			
		 UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		 
         this.select = 0;
	  


		 this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
		 

		 this.mElemList["name_txt"].textColor = gui.Color.ublack;
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
		this.mElemList["group_mounts"].visible = true;
		this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT13");
		this.mElemList["HeroRide_checkbox"].visible = false; 
		this.mElemList["HeroWing_checkbox"].visible = true;
		this.mElemList["actor_view"].visible = true
		this.mElemList["image_skill"].source = "zq_text01"
		this.mElemList["image_equip"].source = "zq_text02"
		
		this.onRefresh()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
		UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
		this.mElemList["group_mounts"].visible = false;
		this.mElemList["actor_view"].visible = false
	}
    
	onRefresh(){
		
		this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type)
	
		if(size_t(this.recvList) == 0) return ;
		let arr = this.recvList;
		
        this.list = GameConfig.FunShapeConfig["HeroWing"];  
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
		
		//装备
		let equiplist = FunUITools.checkWearEquip(this.type, this) 
		if(size_t(equiplist) == 0){
			this.mElemList["btn_equip"].visible = false
		}else{
			this.mElemList["btn_equip"].visible = true
		}

		//技能装备
		this.onInitItemBox();

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
			FunUITools.updateActorName(this.type, this, this.select)
			FunUITools.updateActorStage(this.type, this, this.select)
		}

	    this.mElemList["group_M_effect"].visible = false;
		this.mElemList["turn_icon"].visible = false;
		this.mElemList["btn_M_unreal"].visible =false;
		this.mElemList["btn_MrightC"].enabled = true
		this.mElemList["btn_MleftC"].enabled = true


        if(index == this.unreal ){
		   this.mElemList["turn_icon"].visible = true;
        }else if (index == this.endIndex ) {
		   this.mElemList["group_M_effect"].visible = true;
		   this.mElemList["btn_MrightC"].enabled = false
		   FunUITools.updateAddForceNum(this.type, this)
		}else{
			this.mElemList["btn_M_unreal"].visible =true;

		}

		if(this.select == 1){
			this.mElemList["btn_MleftC"].enabled = false
		}

		if(this.Player == null){
			this.Player = Player.newObj()
			this.mParentWnd.Player = this.Player
		}

		
		//更新actorview
		FunUITools.updateActorModel(this.type, this, this.Player, this.select, 1, 3)
   }
  
   onInitItemBox(){
	   
      FunUITools.updateEquipWnd(this.type, this)
	  //更新技能 
	  FunUITools.updateSkillWnd(this.type, this)
	   
   }
   onSkillClick(event:egret.TouchEvent){
		let name = event.target.name
		let index = name.replace(/[^0-9]/ig, "")
		
   }
   public onSkinClick():void{
	   if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.openSkinsFrame(this.type)
		}
	}

	public onSearchClick():void{
	   if(this.mParentWnd.tabWndList.getTabIndex() == 2){
			FunUITools.openFunPropertyFrame(this.type, this.select)
		}
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
			let equiplist = FunUITools.checkWearEquip(this.type, this) 
			if(size_t(equiplist) == 0) return 
			FunUITools.oneKeyWearEquip(this.type, this, equiplist)
		}
	}
}