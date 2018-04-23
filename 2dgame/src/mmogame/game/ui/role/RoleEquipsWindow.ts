class RoleEquipsWindow extends BaseCtrlWnd {
	mElemList;
    isEnough

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		
		var elemInfo = [
			{ ["name"]: "btn_fashion", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFashionClick },
			{ ["name"]: "btn_title", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]:this.onFashionClick  },
			{ ["name"]: "btn_fman", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFmanClick },
			{ ["name"]: "btn_fabao", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFaBaoClick },
			{ ["name"]: "btn_Echange", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onEquipClick },
				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        
		
		this.mElemList["rd_lv"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_exp"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        this.onInitEquip(this.mElemList["equip"]);
		this.isEnough = false;
		
		let image: eui.Image = this.mElemList["hero_icon"]
		image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this)

		for(let k = 1; k <= 4; k++){
			let tempGroup : eui.Image = this.mElemList["fabao_sprite_" + k]
			tempGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.faBaoItemClick, this)
		}
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this)
		this.mElemList["group_equips"].visible = true;
		this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT11");

		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this)
		this.mElemList["group_equips"].visible = false;
		
	}
  
    onRefresh(){
		this.onUpdate()
		this.onRefreshEquip()
	}
	onUpdate(){

		//人物图片
		let id = GetHeroProperty("vocation")
		let sex = GetHeroProperty("sexId")
		this.mElemList["hero_icon"].source = GetProfessionImage(id, sex)

		let btnList = [
			this.mElemList["btn_title"], this.mElemList["btn_fman"], this.mElemList["btn_fashion"],
			this.mElemList["btn_fabao"],
		]
		let top : eui.Group = this.mElemList["group_Etop"]
		let childNum = top.numElements
		for(let k = 0; k < top.numElements; k++){
			let child = top.getChildAt(k)
			top.removeChild(child)
		}

		for(let k = 0 ; k < size_t(btnList); k++){
			let btn : gui.Button= btnList[k]
			if(btn.visible == true){
 				top.addChildAt(btn, k)
			}
		}

		let info = RoleSystem.getInstance().getRecvList()
		if(size_t(info) == 0) return
		let stage = info["stage"];
		let curExp = info["stageexp"]
		let maxExp = GameConfig.FunUpgradeStageConfig["Hero"][stage].maxexp
		
		if(stage >= 80){
			this.mElemList["bt_E_levelUp"].enabled = true
			this.mElemList["bt_E_levelUp"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpClick, this)
			this.isEnough = (curExp >= maxExp) ?true :false;
		}
		this.mElemList["bt_E_levelUp"].enabled = false
		let curExpStr = RoleSystem.getInstance().getExpStr(curExp)
		let maxExpStr = RoleSystem.getInstance().getExpStr(maxExp)
		
        let strlv = String.format(Localize_cns("ROLE_TXT28"),stage)
		AddRdContent(this.mElemList["rd_lv"],strlv,"ht_20_cc","ublack");

		let strexp = String.format(Localize_cns("ROLE_EXP"),curExpStr, maxExpStr)
		AddRdContent(this.mElemList["rd_exp"],strexp,"ht_20_cc","ublack");

		//如果可以换装备-->显示换装按钮
		let equiplist = RoleSystem.getInstance().getRoleEquipList()
		if(size_t(equiplist) == 0){
			this.mElemList["btn_Echange"].visible = false;
		}else{
			this.mElemList["btn_Echange"].visible = true
		}
		
		let force = info.force //GetHeroProperty("force")
		DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3)
	}
	onInitEquip(window){
		let name = "equip"
        for(let i = 1; i <= 10; i++){
			if(this.mElemList[name + "_bg" + i] == null){
				let x = 0;
				let y = 110* (i - 1);
				let parent = "role_equip_left"
				if(i >= 6){
					parent = "role_equip_right"
					y = 110* (i - 6);
				}
				let icon = RoleSystem.getInstance().getZhuangBeiIcon(i-1)
				let mElemInfo: any = [
				    { ["index_type"]: eui.Group, ["name"]: name + "_bg" + i, ["parent"]: parent , ["image"]: "", ["x"]: x, ["y"]: y, ["w"]: 100, ["h"]: 100, },					
					{ ["index_type"]: eui.Image, ["name"]: name + "_initsprite" + i, ["parent"]:name + "_bg" + i,["title"]:"", ["image"]: icon, ["x"]: 10, ["y"]: 0, ["w"]: 80, ["h"]: 80,  },
					{ ["index_type"]: eui.Group, ["name"]: name + "_item" + i, ["parent"]:name + "_bg" + i, ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 100, ["h"]: 100, },
					{ ["index_type"]: eui.Label, ["name"]: name + "_lv" + i,["parent"]:name + "_bg" + i, ["title"]:"", ["font"]: "ht_20_cc", ["image"]: null, ["color"]: gui.Color.black, ["x"]: 0, ["y"]: 80, ["w"]: 100, ["h"]: 20,  },
				 ];
				 UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );
				 this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 10, 0, this.mElemList[name + "_item" + i]);
				 this.mElemList[name + "_item" + i].visible = false
				 this.mElemList[name + "_lv" + i].visible = false;
			}
		}
	}
	onRefreshEquip(){
		let arr = RoleSystem.getInstance().getRoleEquipItemList()
		let count = size_t(arr)
		let name = "equip"
		let subtypeList = GameConfig.FunEquipCaseConfig["Hero"].subtype

		for(let i = 1; i <= 10; i++){
			let subtype = subtypeList[i-1]
			let roleItem = RoleSystem.getInstance().getRoleEquipItem(subtype)
			if(roleItem == null){
				this.mElemList[name + "_item" + i].visible = false
				this.mElemList[name + "_lv" + i].visible = false;
			}else{
				this.mElemList[name + "_item" + i].visible = true
				this.mElemList[name + "_lv" + i].visible = true
				this.mElemList[name + "itemBox" + i].updateByItem(roleItem);
				let level = roleItem.getRefProperty("uselevel")
				let str = String.format(Localize_cns("ROLE_TXT34"),level)
				this.mElemList[name + "_lv" + i].text = str;
			}
		}
		
		
	}

	onFashionClick(event: egret.TouchEvent){
		let name = event.target.name;
		let index = (name == "btn_fashion") ?0:1;
		let wnd = WngMrg.getInstance().getWindow("RoleFATFrame");
		wnd.showWithIndex(index);
	
		
	}
	onUpClick(event: egret.TouchEvent){
		if(this.isEnough == false) return
		RpcProxy.call("C2G_ACTOR_ROLE_UPGRADE")
	}
	public onFmanClick():void {
		let wnd = WngMrg.getInstance().getWindow("RoleFashionPeopleFrame");
		wnd.showWnd()
	}

	onEquipClick(){
		let stage = RoleSystem.getInstance().getRoleInfo("stage")
		let equiplist = RoleSystem.getInstance().getRoleEquipList(stage)
		if(size_t(equiplist) == 0) return 
		let gidList = []
		for(let k in equiplist){
			let item = <Item>equiplist[k]
			JsUtil.arrayInstert(gidList, item.id)
		}
		RpcProxy.call("C2G_ACTOR_ROLE_INFO_EQUIP_SET", gidList)
	}

	onFaBaoClick(event: egret.Event){
		let wnd : RoleFaBaoFrame = WngMrg.getInstance().getWindow("RoleFaBaoFrame");
		wnd.showWithIndex(0);
	}

	faBaoItemClick(event: egret.Event){
		let name = event.target.name
		let index  = name.replace(/[^0-9]/ig, "") 
		let wnd : RoleFaBaoFrame = WngMrg.getInstance().getWindow("RoleFaBaoFrame");
		wnd.showWithIndex(0, tonumber(index));
	}

	onClickIcon(){
		let wnd : RolePropertyFrame = WngMrg.getInstance().getWindow("RolePropertyFrame")
		wnd.showWnd()
	}
}

