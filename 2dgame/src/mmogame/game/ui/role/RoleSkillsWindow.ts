class RoleSkillsWindow extends BaseCtrlWnd {
	mElemList;
	levelList;
    select;
	isLock;
	skillList;

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		
		var elemInfo = [
		 	{ ["name"]: "btn_S_onekeyUp", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onOneKeyClick },
			{ ["name"]: "btn_S_Up", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			{ ["name"]: "btn_skillSetting", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSkillsSettingClick },
			];
			
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		this.select = -1;

		this.mElemList["rd_S_lvUp"].setAlignFlag(gui.Flag.H_CENTER);
		this.mElemList["rd_S_upGrade"].setAlignFlag(gui.Flag.H_CENTER);
		this.mElemList["label_skillname"].textColor = "black"
		this.mElemList["label_skillInstruction"].textColor = "black"
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
		this.mElemList["group_skills"].visible = true;
		this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT12");
		
		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
		this.mElemList["group_skills"].visible = false;
	
	}

	onRefresh(){
		let info = RoleSystem.getInstance().getRecvList()
		if(size_t(info) == 0) return;
		this.levelList = info["skilllevellist"]

		let entryId =  RoleSystem.getInstance().getRoleInfo("entryid")  //10001
		this.skillList = GameConfig.ActorRoleConfig[entryId].skill
		this.onInitSkillItem();

 		if(this.select == -1) this.select = 1;
		this.onShowItemDes(this.skillList[this.select], this.levelList[this.select-1], this.select);

		let count = this.onCountList(this.levelList)
		let manji = true
		let level = RoleSystem.getInstance().getRoleInfo("stage")
		let toMoney = 0;

		for(let i = 0 ;i < count;i++){
			let temp = this.levelList[i]
			if(temp < level){
				manji = false
			}
			toMoney = toMoney + GameConfig.FunSpendMoneyItemConfig["HeroSkill"][temp].money
		}

		let unitType = GameConfig.FunSpendMoneyItemConfig["HeroSkill"][1].moneyunit
		let str1 = GetMoneyIcon(unitType) + String.format(Localize_cns("ROLE_TXT30"),toMoney)
		if(manji == true){
			str1 = GetMoneyIcon(unitType) + Localize_cns("ROLE_TXT31")
		}
		AddRdContent(this.mElemList["rd_S_upGrade"],str1,"ht_24_cc", "ublack");
	}
   

   onInitSkillItem(){
	   let list = GameConfig.ActorRoleSkillConfig;
	   let count = size_t(this.levelList)
	   
	   let skillList = this.skillList;
	   for(let i = 1; i <= 8;i++){
		   
		   
		   let skillName = Localize_cns("ROLE_TXT21")
		
		   let name = "skillItem";

		   if(!this.mElemList[ name + "skillBox" + i]) {
			   this.mElemList[name + "skillBox" + i] = UISkillBox.newObj(this.mLayoutNode, name + "skillBox" + i, 17, 17, this.mElemList["skill" + i])
			   let mElemInfo: any = [
                // { ["index_type"]: eui.Image, ["name"]: name + "_bg" + i, ["image"]: bgImage, ["x"]: 17, ["y"]: 17, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
				 { ["index_type"]: eui.Image, ["name"]:name + "name_bg" + i, ["image"]: "ty_textDi05", ["x"]: 3, ["y"]: 116, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
				// { ["index_type"]: eui.Image, ["name"]: name + "_sprite" + i, ["image"]: "", ["x"]: 17, ["y"]: 17, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
				// { ["index_type"]: eui.Image, ["name"]: name + "_select" + i, ["image"]: "hb_jiNengXuanZhong", ["x"]: 0, ["y"]: 0, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
				 { ["index_type"]: eui.Label, ["name"]: name + "_name" + i, ["parent"]:name + "name_bg" + i,["title"]:skillName, ["font"]: "ht_24_cc_stroke", ["image"]: null, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 127, ["h"]: 40,  ["messageFlag"]: true },
				 { ["index_type"]: gui.Grid9Image, ["name"]: name + "_lv_bg" + i, ["parent"]: name + "_bg" + i,["title"]:"",  ["image"]: "ty_textDi01", ["color"]: gui.Color.white, ["x"]: 51, ["y"]: 100, ["w"]: 30, ["h"]: 20, ["messageFlag"]: true },
				 { ["index_type"]: eui.Label, ["name"]: name + "_lv" + i, ["parent"]: name + "_lv_bg" + i,["title"]: "", ["font"]: "ht_20_cc", ["image"]: null, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 30, ["h"]: 20, ["messageFlag"]: true },
				 ];
        		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this,this.mElemList["skill" + i] );
		   	//	this.mElemList[name + "_select" + i].visible = false;
		
		   }
		   
		   if(skillList[i-1] && this.levelList[i-1] != null){		 
			   this.mElemList[name + "skillBox" + i].updateRoleSkill(skillList[i-1], this.levelList[i-1])
			   this.mElemList[name + "skillBox" + i].setTipsListner(this.onShowItemDes, this, i)
			   this.mElemList[name + "_lv" + i].text = tostring(this.levelList[i-1])
			   this.mElemList[name + "_lv_bg" + i].visible = true
			   this.mElemList[name + "_lv" + i].visible = true
			   let id = skillList[i-1]
			   skillName= SkillSystem.getInstance().getSkillName(id)
			   this.mElemList[name + "_name"  + i].text = skillName

		   }else{
			   this.mElemList[name + "skillBox" + i].lock()
			   this.mElemList[name + "_lv_bg" + i].visible = false
			   this.mElemList[name + "_lv" + i].visible = false

			   if(skillList[i-1]) {
				   let config = elemSkillLoopOptions[cellOptionsIndex.HeroSkill]["UnlockLevel"]
			   	   this.mElemList[name + "_name"  + i].text = config[i-1] + Localize_cns("ROLE_LEVEL_OPEN")
			   }
			   
		   }
	   }
	   
   }

  
   onShowItemDes(skillId, skillLv, index){
		let id = skillId;
		let list = GameConfig.ActorRoleSkillConfig[id];
		this.select = index
		
	    if(list){
            //label_skillname   label_skillInstruction
			let str = String.format(Localize_cns("ROLE_TXT34"),this.levelList[index - 1])
			let name = SkillSystem.getInstance().getSkillName(skillId) + " " + str;
			this.mElemList["label_skillname"].text = name ;
			let type = list.effects[0][0];
			
			this.mElemList["label_skillInstruction"].text = SkillSystem.getInstance().getSkillDes(skillId)//skillLv)
			
	    }
        let name = "skillItem";
		for(let i = 1; i <= size_t(this.levelList); i++){
			this.mElemList[name + "skillBox" + i].select(false);
		}
		this.mElemList[name + "skillBox" + index].select(true);

	   	let upSpend = GameConfig.FunSpendMoneyItemConfig["HeroSkill"];
		let money = upSpend[skillLv].money;
		let unitType = upSpend[skillLv].moneyunit
		let str = GetMoneyIcon(unitType) + String.format(Localize_cns("ROLE_TXT30"),money)
		AddRdContent(this.mElemList["rd_S_lvUp"],str,"ht_24_cc");	
   }

  onCountList(list){
	  let count = 0;
	  for(let i = 0; i< size_t(list); i++){
		  if(list[i] != 0) {
			  count++;
		  }    
	  }
	return count;
  }


  public onOneKeyClick():void{
	  	let show = true
		let level = RoleSystem.getInstance().getRoleInfo("stage")
		for(let k in this.levelList){
			if(this.levelList[k] < level){
				show = false
			}
		}
		if(show == true){
			MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_2"))
			return 
		}

	  	let ownMoney = GetHeroProperty("funds")
		let toMoney = 0;

		for(let i = 0 ;i < size_t(this.levelList);i++){
			let temp = this.levelList[i]
			toMoney = toMoney + GameConfig.FunSpendMoneyItemConfig["HeroSkill"][temp].money
		}
		if(ownMoney < toMoney) {
			MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_1"))
			return 
		}
	  	RpcProxy.call("C2G_ACTOR_ROLE_SKILL_UPGRADE_MUCH", 0)
   }
   
   public onUpClick():void{
	   	let thislevel = this.levelList[this.select - 1]
		let herolevel = RoleSystem.getInstance().getRoleInfo("stage")
		if(thislevel >= herolevel){
			MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_3"))
			return 
		}
	   	let ownMoney = GetHeroProperty("funds")
		let upSpend = GameConfig.FunSpendMoneyItemConfig["HeroSkill"];
		let money = upSpend[this.levelList[this.select-1]].money;
		if(ownMoney < money) {
			MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_1"))
			return 
		}
	    RpcProxy.call("C2G_ACTOR_ROLE_SKILL_UPGRADE_ONE", this.select)
   }

   public onSkillsSettingClick():void{
        let wnd = WngMrg.getInstance().getWindow("RoleSkillsSettingFrame");
		wnd.onShowWnd(this.levelList);
   }
}