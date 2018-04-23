class LevelRewardWindow extends BaseCtrlWnd {
	mElemList;
	levelScroll : UIScrollList
	nameToIndex : any[]
	levelInfo;

	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;

		let group : eui.Group = this.mElemList["level_list"]
		this.levelScroll = UIScrollList.newObj(this.mLayoutNode, "levelScroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL)
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
        this.mElemList["group_tab2"].visible = true;  
		// RpcProxy.call("C2G_SendOperatePlayerData",PayActivityIndex.INVEST_PLAN)
		 this.onRefresh()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_tab2"].visible = false;
	}

	
	 onRefresh() {
		let levelInfo = getSaveRecord(opSaveRecordKey.levelReward)
		this.levelInfo = levelInfo
		let list = []
		for (let _ in GameConfig.LevelRewardConfig) {
			let v = GameConfig.LevelRewardConfig[_]
			table_insert(list, v)
		}

        this.nameToIndex = []
        let scroll = this.levelScroll
		scroll.clearItemList();

        for (let i = 0; i<size_t(list); i++) {
            let v = list[i]
            let window = this.levelScroll.getItemWindow(i, 565, 135, 0, 0, 5)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v)
        }
        // this.levelScroll.refreshScroll()
        // this.levelScroll.restoreViewXY() 
    }

	initItemWindow(window){
		let name = window.name
		let width = 555, height = 135

		let Info: any = [
               //背景
			   	{ ["index_type"]: eui.Group, ["name"]: name+"bg" , ["image"]: "", ["x"]: 5, ["y"]: 0, ["w"]: width, ["h"]: height},
                { ["index_type"]: gui.Grid9Image, ["name"]: name+"bg1", ["parent"]: name+"bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, },
                { ["index_type"]: gui.Grid9Image, ["name"]: name+"tip_bg", ["parent"]: name+"bg", ["title"]: null, ["font"]: null, ["image"]: "fldt_biaoTiDi01", ["color"]: null, ["x"]: 10, ["y"]: 10, ["w"]: 336, ["h"]: 32, },
                { ["index_type"]: eui.Label, ["name"]: name + "tip", ["parent"]: name + "tip_bg", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 336, ["h"]: 32, ["messageFlag"]: true },
                
                // { ["index_type"]: gui.RichDisplayer, ["name"]: name + "reward_rd", ["parent"]: name + "_group", ["x"]: 185, ["y"]: 20, ["w"]: 200, ["h"]: 30, ["event_name"]: null, ["fun_index"]: null, },

				{ ["index_type"]: gui.RichDisplayer, ["name"]: name + "level_rd", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.white, ["x"]: 395, ["y"]: 25, ["w"]: 117, ["h"]: 25, ["messageFlag"]: true },
                { ["index_type"]: gui.Button, ["name"]: name + "getBtn", ["title"]: "", ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt3", ["color"]: gui.Color.white, ["x"]: 395, ["y"]: 60, ["w"]: 117, ["h"]: 51, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClick},
				{ ["index_type"]: eui.Image,  ["name"]: name + "btnTips", ["parent"]: name + "getBtn", ["title"]: "", ["font"]: "ht_20_lc", ["image"]: "zjm_hongDian01", ["color"]: gui.Color.white, ["x"]: 77, ["y"]: 0, ["w"] : 40,["h"] : 40, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
                ]	
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)

		this.mElemList[name + "level_rd"].setAlignFlag(gui.Flag.H_CENTER)

		for(let i = 0;i<4;i++){
			this.mElemList[name+"itemBox"+i] = UIItemBox.newObj(this.mElemList, name+"itemBox"+i, i*85+15 ,50,this.mElemList[name+"bg"],0.9)
		}
	}

	refreshItemWindow(window, data){
		let name = window.name
		let curLevel = GetHeroProperty("level") || 0
		let needLevel = data.leve

		let prizeList = data.prize
		let itemList = AnalyPrizeFormat(prizeList)

		for(let i = 0;i<4;i++){
			let itemInfo = itemList[i]
			if(itemInfo){
				this.mElemList[name+"itemBox"+i].updateByEntry(itemInfo[0], itemInfo[1])
			}else{
				this.mElemList[name+"itemBox"+i].updateByEntry(-1)
			}
		}
		
		let canGet = false
		if(curLevel >= needLevel){
			canGet = true
		}

		let isGet = false
		if(this.levelInfo && this.levelInfo[needLevel]){
			isGet = true
		}

		this.mElemList[name+"getBtn"].enabled = false
		this.mElemList[name + "btnTips"].visible = false
		if(isGet){
			this.mElemList[name+"getBtn"].text = Localize_cns("WELFARE_TXT5")
		}else{
			this.mElemList[name+"getBtn"].text = Localize_cns("WELFARE_TXT4")
			if(canGet){
				this.mElemList[name+"getBtn"].enabled = true
				this.mElemList[name + "btnTips"].visible = true
			}
		}
		
		let colorStr = "#black"
		if(needLevel > curLevel){
			colorStr = "#red"
		}

        let rdStr = colorStr + curLevel + "#rf/" + needLevel
        AddRdContent(this.mElemList[name+"level_rd"], rdStr, "ht_24_cc", "black")
		this.mElemList[name+"tip"].text = String.format(Localize_cns("WELFARE_TXT22"),needLevel)

		this.nameToIndex[name+"getBtn"] = needLevel
	}

	onClick(args){
		let name = args.target.name
        if(this.nameToIndex[name]==null){
            return
        }
		let index = this.nameToIndex[name]
		let num = tonumber(index)
		RpcProxy.call("C2G_LevelPrize",num)
	}
}