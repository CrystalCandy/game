class FaBaoUpgradeWindow extends BaseCtrlWnd {
	mElemList;
    actor : UIActorView
	select : number
	needId 
	needNum


	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.actor = this.mParentWnd.actor	
		var elemInfo = [
			{ ["name"]: "btn_up", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this)
		RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_fabao"].visible = true;
        this.mElemList["shengji"].visible = true;
		this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT2");

		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this)
		UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_fabao"].visible = false;
        this.mElemList["shengji"].visible =  false
		
	}

    onRefresh(){
		this.mParentWnd.refreshFaBaoItem()
		let fabaoInfo = RoleSystem.getInstance().getFaBaoInfo() //"talismanLevelList:table", "talismanlist:table"
		if(fabaoInfo == null) return 
		let levelList = fabaoInfo["talismanLevelList"] 
		let force = fabaoInfo["force"]
		DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3)
	
		this.select =  this.mParentWnd.selectIndex || 2
		this.mElemList["btn_quality"].visible =  true
		let playerInfo = GetHeroPropertyInfo()
		let actorView:UIActorView = this.actor
		actorView.updateByPlayerAppearInfo(playerInfo)
		//如果没有法宝，不能升级
		let equipItem : Item = RoleSystem.getInstance().getFaBaoItem(this.select)

		if(levelList[this.select + opTalismanEquipPos.begin - 1] == null || equipItem == null){ //没有解锁，就不显示
			this.mElemList["shengji"].visible = false
			this.mElemList["fabao"].visible =  true
			return 
		}
		this.mElemList["shengji"].visible = true
		this.mElemList["fabao"].visible =  false
		let stage = levelList[this.select + opTalismanEquipPos.begin - 1] || 0
		let upConfig = GameConfig.TalismanEquipUpConfig[stage]
		let itemid = upConfig.entryId
		this.needId = itemid
		let count = upConfig.needNum
		let percent = upConfig.percentage

		let nextPercent = GameConfig.TalismanEquipUpConfig[stage + 1].percentage
		let item = equipItem.entryId
		let quality = equipItem.getProperty("quality")
		let effectConfig = GameConfig.TalismanEquipEffectConfig[item][quality]
		let config = table_effect(effectConfig.effects)
		let desStr1 = String.format("#blue" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf"
		for(let k in config){
			let v = config[k]
			desStr1 += GetPropertyName(k) + "#lime" + FormatNumberInt(v) + "+" + FormatNumberInt(v * percent)  + "#br#rf"
		}

		let desStr2 = String.format("#blue" + Localize_cns("FABAO_UPGRADE_TXT1"), nextPercent * 100) + "#br#rf"
		for(let k in config){
			let v = config[k]
			desStr2 += GetPropertyName(k) + "#lime" + FormatNumberInt(v) + "+" + FormatNumberInt(v * nextPercent)  + "#br#rf"
		}

		AddRdContent(this.mElemList["rd_effect_1"], desStr1, "ht_20_lc")
		AddRdContent(this.mElemList["rd_effect_2"], desStr2, "ht_20_lc")

		if(this.mElemList["upgradeBox"] == null){
			this.mElemList["upgradeBox"] = UIItemBox.newObj(this.mLayoutNode, "upgradeBox", 30 , 210, this.mElemList["shengji"])
		}
		this.mElemList["upgradeBox"].updateByEntry(itemid)
		let hadStr =  "#"+ GetItemFontColor(itemid) + GameConfig.itemConfig[itemid].name + "#red*" + count
		let had = ItemSystem.getInstance().getItemCount(itemid)

		this.needNum = count - had
		hadStr += "#br#br#rf" + Localize_cns("ITEM_TXT30") + "#green" + had

		AddRdContent(this.mElemList["rd_had"], hadStr, "ht_20_lc")
    }

	////////------------响应事件
	onFaBaoClick(args : egret.Event){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 

		this.select = tonumber(index)
		this.mParentWnd.selectIndex = this.select

		for(let k = 1; k <= 4; k++){
			this.mElemList["image_select_" + k].visible = false
		}
		this.mElemList["image_select_" + this.select].visible = true

		this.onRefresh()
	}

	onUpClick(){
		if(this.needNum > 0){
			if(this.needId == null || this.needNum  == null) return 
			let wnd : GoodsAsseceFrame = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
			wnd.onShowWnd(this.needId, this.needNum)
			return
		}
		RpcProxy.call("C2G_EquipTalismanUp",this.select + opTalismanEquipPos.begin - 1)
	}
}