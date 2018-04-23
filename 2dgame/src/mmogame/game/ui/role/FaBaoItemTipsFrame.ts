// TypeScript file
class FaBaoItemTipsFrame extends BaseWnd {
	item : Item
    isPlayer : boolean
    index
    isHero : boolean
    percent 

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/FaBaoItemTipsLayout.exml"]
		this.isPlayer = false
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
	//	this.mLayoutNode.width = 514
	//	this.mLayoutNode.height = 332
		this.setAlignCenter(true, true)
		
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_show", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_wear", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onWearClick },
            ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
		
		this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox",0, 5, this.mElemList["item"])
		let group : eui.Group = this.mElemList["equip_wnd"]
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideWnd, this)
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
      //  RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true)
		this.onRefresh();
	}

	public onHide(): void {
       // UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
        this.mLayoutNode.setDoModal(false)
		this.mLayoutNode.visible = false;	
        this.isHero = false
        this.isPlayer = false
        this.index = -1
        this.item = null
	}

    onRefresh(){
        if(this.item ==  null) return 
        let itemId = this.item.getProperty("entry")
        let quality = this.item.getProperty("quality")
        //common 
        this.mElemList["itemBox"].updateByEntry(itemId, 1, quality)
        this.mElemList["itemBox"].setItemTipsListner(this.onOpenTipsClick, this, this.item)
        let fontColor = GetQualityColorStr(quality)
        let item = this.item
        let name = item.getName()
        
        let effectConfig = GameConfig.TalismanEquipEffectConfig[itemId][quality]
        let NameStr = "#" + fontColor + name
        
        let qualityStr = "#yellow" + Localize_cns("FABAO_QUALITY_TXT7") + "#" + fontColor + GetFaBaoQualityStr(quality)
        

        let configStr = "#yellow" + Localize_cns("ITEM_FIXED_PROPERTY") + "#br"
        if(this.isHero){
            let levelList = RoleSystem.getInstance().getFaBaoInfoByKey("talismanLevelList")
            let level = levelList[this.index + opTalismanEquipPos.begin - 1] || 0
            let upConfig = GameConfig.TalismanEquipUpConfig[level]
            let percent = upConfig.percentage
            this.percent = percent || - 1

            let addPercent = String.format("#orange" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf"
            configStr += addPercent
        }
        
        let config = table_effect(effectConfig.effects)
        let force = GetForceMath(config)
        if(this.isHero && this.percent != -1){
            let tempConfig = {}
            for(let k in config){
                tempConfig[k] = config[k] * this.percent
            }
            force = GetForceMath(tempConfig)
        }

        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
        this.mElemList["bImage"].endDraw();


        for(let k in config){
            configStr += "#orange" + GetPropertyName(k) + "#rf" + config[k] 
            if(this.isHero && this.percent != -1){
                configStr += "+" + config[k] * this.percent
            }
            configStr += "#br"
        }

        AddRdContent(this.mElemList["name"], NameStr, "ht_24_lc")
        AddRdContent(this.mElemList["des"], qualityStr, "ht_20_lc")
        AddRdContent(this.mElemList["rd_base"], configStr, "ht_20_cc")

        if(effectConfig.skillTips != ""){
            AddRdContent(this.mElemList["rd_effect"], effectConfig.skillTips , "ht_20_cc")
        }

        let h = 400 //默认是有打造者，也有技能效果
        this.mElemList["group_effect"].visible = true
        this.mElemList["group_dazao"].visible = true
        if(quality >= 5 && this.isPlayer == false){ //没有打造者，有技能效果
            this.mElemList["group_dazao"].visible = false
            h = 329
        }else if(this.isPlayer == true && quality < 5){ //有打造者，没有效果
            this.mElemList["group_effect"].visible = false
            let playerStr = "#orange" + Localize_cns("FABAO_DAZAOZHE") + GetHeroProperty("name")
            AddRdContent(this.mElemList["rd_dazao"], playerStr, "ht_20_lc" )
            h = 309
        }else if (this.isPlayer == false && quality < 5){ //都没有
            this.mElemList["group_effect"].visible = false
            this.mElemList["group_dazao"].visible = false
            h = 219
        }

        if(this.isHero){
            this.mElemList["group_effect"].visible = true
            this.mElemList["group_dazao"].visible = true
            let playerStr = "#orange" + Localize_cns("FABAO_DAZAOZHE") + GetHeroProperty("name")
            AddRdContent(this.mElemList["rd_dazao"], playerStr, "ht_20_lc" )
            h = 400
        }
        this.mLayoutNode.height = h
        this.mLayoutNode.width = 450
        let btn_name = [
            "btn_show", "btn_wear"
        ]
        if(this.index == -1 || this.isHero == true){
            this.mElemList["btn_wear"].visible = false
        }else{
            this.mElemList["btn_wear"].visible = true
        }
        let group : eui.Group = this.mElemList["btn_group"]
		let childNum = group.numElements
		for(let k = 0; k < group.numElements; k++){
			let child = group.getChildAt(k)
			group.removeChild(child)
		}
        for(let k in btn_name){
            let btn = btn_name[k]
            if(this.mElemList[btn].visible == true){
                group.addChild(this.mElemList[btn])
            }
        }
    }

    onRefreshHero(){
        let levelList = RoleSystem.getInstance().getFaBaoInfoByKey("talismanLevelList")
        let level = levelList[this.index + opTalismanEquipPos.begin - 1] || 0
        let upConfig = GameConfig.TalismanEquipUpConfig[level]
        let percent = upConfig.percentage

        let addPercent = String.format("#orange" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf"
        let configStr = "#yellow" + Localize_cns("ITEM_FIXED_PROPERTY") + "#br" + addPercent 
        let itemId = this.item.entryId
		let quality = this.item.getProperty("quality")
		let effectConfig = GameConfig.TalismanEquipEffectConfig[itemId][quality]
        let config = table_effect(effectConfig.effects)
        for(let k in config){
            configStr += GetPropertyName(k) + "#blue#space_10" + FormatNumberInt(config[k] * percent) + "#br#rf"
        }   

    }

    onRefreshNormal(){
        
    }

    //////////--------------
    onWearClick(args : egret.TouchEvent){
        let item = this.item
        let check = RoleSystem.getInstance().checkFaBaoItem(item.entryId, this.index)
        if(!check){
            MsgSystem.addTagTips(Localize_cns("FABAO_TIPS_TXT2"))
            return 
        }
        RpcProxy.call("C2G_EquipTalismanSet", item.id, this.index + opTalismanEquipPos.begin - 1)
    }

    onOpenTipsClick(logicItem, item){
		
		return true
	}

    //////////////---------
    onShowWnd(item : Item, isPlayer?, index ?){
        this.item = item
        this.isPlayer = isPlayer || false
        this.index = index || -1
        this.showWnd()
    }

    onShowHeroFaBao(item :Item , isHero, index){
        this.item = item
        this.isHero = isHero
        this.index = index
        this.showWnd()
    }
}