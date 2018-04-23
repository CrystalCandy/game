class ForgeFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
    stage;
    isEnough;
    select;
    timer;
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/ForgeLayout.exml"]
        this.tabIndex = -1
        this.select = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
          //  { ["name"]: "btn_daShi", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickDaShi },
//			{ ["name"]: "btn_oneKey", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickOneKey },
        ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        this.onInitEquip();

        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_baoshi"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_shuLianDu"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_access"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        this.mElemList["label_jie"].textColor = gui.Color.orange;

        let elem = <gui.RichDisplayer>this.mElemList["rd_access"]
        elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick,this)
       
        let group = <eui.Image>this.mElemList["dashi_icon"]
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDaShi,this)

		let tabInfoList = [
			{ name: "strengthen", wnd: ForgeStrengthenWindow.newObj(this.mLayoutNode, this) },
			{ name: "refine", wnd: ForgeRefineWindow.newObj(this.mLayoutNode, this) },
			{ name: "duanZao", wnd: ForgeDuanZaoWindow.newObj(this.mLayoutNode, this) },
			{ name: "baoShi",  wnd: ForgeBaoShiWindow.newObj(this.mLayoutNode, this) },		
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

	}
    public onUnLoad(): void {

	}

	public onShow(): void {
       
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);
       
        this.onRefresh()

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
       // UnRegisterEvent(EventDefine.FORGE_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
		
        
	}

    onInitEquip(){
        let equipList= [300001,300002,300003,300004,300005,300006,300007,300008,300009,300010]
        let arr = GameConfig.Legendequip
        let name = "equipItem";
        for(let i = 1; i <= 10; i++){
            if(this.mElemList[name + "_name" + i]) return;
            let id = equipList[i-1]
            let mElemInfo =[
                    { ["index_type"]: eui.Group, ["name"]: name + "_group" + i,["title"]:"", ["font"]: "", ["image"]: null, ["color"]: gui.Color.white, ["x"]: 17, ["y"]: 17, ["w"]: 80, ["h"]: 80, ["messageFlag"]: true },
                    { ["index_type"]: eui.Image, ["name"]: name + "_select" + i, ["image"]: "ty_xuanZhongKuang01", ["x"]: 0, ["y"]: 0, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
                    { ["index_type"]: eui.Label, ["name"]: name + "_name" + i,["title"]:arr[id].name, ["font"]: "ht_20_cc_stroke", ["image"]: null, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 67, ["w"]: 113, ["h"]: 20, ["messageFlag"]: true },
                    { ["index_type"]: eui.Label, ["name"]: name + "_lv" + i,["parent"]:name + "_select" + i, ["title"]:"", ["font"]: "ht_18_rc_stroke", ["image"]: null, ["color"]: gui.Color.yellow, ["x"]: 0, ["y"]: 20, ["w"]: 94, ["h"]: 18, ["messageFlag"]: true },
				 ];
				 UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this,this.mElemList["group_" + i]);
                 this.mElemList[name + "_select" + i].visible = false;

            if(!this.mElemList[name + "itemBox" + i]){
                this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 0, 0, this.mElemList[name +"_group" + i])
            }
            this.mElemList[name + "_group" + i].visible = false
         }
    }
    onRefresh(){
        //RoleSystem.getInstance().getRecvInfo("RoleEquip")
        let equipList = RoleSystem.getInstance().getRoleEquipItemList()
        if(size_t(equipList) == 0) return 
        let name = "equipItem";
        let subtypeList = GameConfig.FunEquipCaseConfig["Hero"].subtype
        for(let k in equipList){
            let item = equipList[k];
            let index = 1
            for(let key in subtypeList){
                if(subtypeList[key] == item.getRefProperty("subtype")){
                    index = tonumber(key) + 1
                }
            }
            this.mElemList[name + "_group" + index].visible = true
            this.mElemList[name + "itemBox" + index].updateByItem(item);
            this.mElemList[name + "_group" + index].visible = true
        }
     
    }
   
  
   //////////////////////////////btn响应事件
    onClickDaShi(){
        let index = this.tabWndList.getTabIndex();
        let wnd : ForgeLevelFrame = WngMrg.getInstance().getWindow("ForgeLevelFrame");
        wnd.onShowWnd(index)       
    }
   
    onAccessClick(){
        let str = ["MoneyChargeFrame", "GoodsAsseceFrame", "GoodsAsseceFrame" ,"GoodsAsseceFrame"]
        let index = this.tabWndList.getTabIndex();
        let wnd = WngMrg.getInstance().getWindow(str[index])
        if(index == 0){
            wnd.showWnd();
        }else{
            let typeName = elemForgeNames[index]
            let level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) 
            let itemid = GameConfig.FunForgeConfig[typeName][level + 1].itemid
            let had =  ItemSystem.getInstance().getItemCount(itemid)
            let maxCost = GameConfig.FunForgeConfig[typeName][level + 1].itemnum
            wnd.onShowWnd(itemid, maxCost - had);
        }
        
    }
    
	showWithIndex(index) {
        this.tabIndex = index;
        this.showWnd();
    }

}