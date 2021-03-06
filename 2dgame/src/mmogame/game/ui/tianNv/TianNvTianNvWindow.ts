class TianNvTianNvWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
	unreal:any;
    recvList:any
	isEnough;
	Player:Player
	type
	
	public initObj(...params: any[]) {
		this.type = cellOptionsIndex.TianNv
		
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.Player = this.mParentWnd.Player
		
		var elemInfo = [
			{ ["name"]: "btn_property_dan", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPropertyClick },
			{ ["name"]: "btn_search", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSearchClick },
			{ ["name"]: "btn_unreal", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUnrealClick },
			{ ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			{ ["name"]: "btn_auto_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAutoUpClick },
			{ ["name"]: "btn_skin", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSkinClick },
			{ ["name"]: "btn_equip", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
			
			];
			
		 UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		 
         this.select = 0;
	  
		 this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
		 this.mElemList["stage_txt"].textColor = gui.Color.ublack;
		 this.mElemList["btn_left"].visible = false
		 this.mElemList["btn_right"].visible = false
		
		
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
		this.mElemList["label_wndName"].text = Localize_cns("TIANNV_TITLE_TXT1");
		this.mElemList["TianNv_checkbox"].visible = true
		this.mElemList["TianNvXianQi_checkbox"].visible = false
		this.mElemList["TianNvHuaNian_checkbox"].visible = false
		this.mElemList["TianNvLingQi_checkbox"].visible = false
		this.onRefresh()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
		UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
		this.mElemList["group_tiannv"].visible = false;
	}
    
	onRefresh(){
		
		this.mElemList["btn_skin"].visible = true
		this.mElemList["btn_left"].visible = false
		this.mElemList["btn_right"].visible = false
		this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type)
	
		if(size_t(this.recvList) == 0) return ;
		let arr = this.recvList;
		
		let stage = arr["stage"]
		let exp = arr["stageexp"]
		
		
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
		//更新名字，阶数
		FunUITools.updateActorStage(this.type, this, this.select)


	    this.mElemList["group_effect"].visible = false;
		this.mElemList["turn_icon"].visible = false;
		this.mElemList["btn_unreal"].visible =false;

        if(this.unreal == this.select ){
		   this.mElemList["turn_icon"].visible = true;
		}else{
		   this.mElemList["btn_unreal"].visible = true
		 
		}

		if(this.Player == null){
			this.Player = Player.newObj()
			this.mParentWnd.Player = this.Player
		}

		//更新actorview
		FunUITools.updateActorModel(this.type, this, this.Player, this.select)
   }
  
   onInitItemBox(){
	   
      FunUITools.updateEquipWnd(this.type, this)
	  //更新技能 
	  let typelist = [
		  cellOptionsIndex.TianNv ,
	      cellOptionsIndex.TianNvXianQi ,
	      cellOptionsIndex.TianNvHuaNian ,
	      cellOptionsIndex.TianNvLingQi 
	  ]
	  this.mElemList["fun_skill_wnd2"].visible = false
	  this.mElemList["fun_skill_wnd1"].visible = true
	  FunUITools.updateTianNvSkillWnd(typelist, this, this.mElemList["fun_skill_wnd1"], "tiannvskill")

	  for(let i = 0; i < size_t(typelist); i++){
		  this.mElemList["tiannvskill" + i].setClickCallBack(this.onShowFunFrame, this, [typelist, i])
	  }
	   
   }
   
   onShowFunFrame(list){
	    let wnd = WngMrg.getInstance().getWindow("FunSkillFrame")
		wnd.showWithTypeListAndIndex(list[0], list[1])
   }

 
    public onUnrealClick():void{
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.sendTurnRequest(this.type, this.select)
		}  
	}

	public onSkinClick():void{
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.openSkinsFrame(this.type)	
		}
	}

	public onPropertyClick():void{
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.openPropertyFrame(this.type)	
		}
	}
	onUpClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.upgradeFunction(this.type, this)
		}
	}
	onAutoUpClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.upgradeAutoFunction(this.type, this, "btn_auto_upgrade", "btn_upgrade")
		}
	}
	onEquipClick(){
		if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			let templist = FunUITools.checkWearEquip(this.type, this)
			FunUITools.oneKeyWearEquip(this.type, this, templist)
		}
	}

	public onSearchClick():void{
	   if(this.mParentWnd.tabWndList.getTabIndex() == 0){
			FunUITools.openFunPropertyFrame(this.type, this.select)
		}
	}
}