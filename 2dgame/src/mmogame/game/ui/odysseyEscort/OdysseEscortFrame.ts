// TypeScript file
class OdysseyEscortFrame extends BaseWnd {
   // scroll:UIScrollList;
    select
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xiyouhusong/OdysseyEscortLayout.exml"]
        this.select = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_refresh", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRefreshClick },
			{ ["name"]: "btn_oneKeyRf", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onOneKeyClick },
            { ["name"]: "btn_goto", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGotoClick },
		
            ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        
        /*let group: eui.Group = this.mElemList["group_scroll"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL)*/

        this.mElemList["rd_tips"].setAlignFlag(gui.Flag.LEFT_TOP)
        this.mElemList["rd_rf_cost"].setAlignFlag(gui.Flag.CENTER_CENTER)
        this.mElemList["rd_oneKey_cost"].setAlignFlag(gui.Flag.CENTER_CENTER)
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();

	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}

    updateWnd(){
        this.onRefresh()
    }

    onRefresh(){

        let actInfo = GetActivity(ActivityDefine.HuSong).getActInfo()
        if(size_t(actInfo) == 0) return
        this.select = actInfo.index

       // let scroll = this.scroll
        
       // scroll.clearItemList()
        let  escortlist = GameConfig.EscortConfig

        for(let k = 1; k <= size_t(escortlist); k++){
            let v = escortlist[k]
			//let window = scroll.getItemWindow(k, 550, 120 , 0, 0)
            let window = this.mElemList["group_scroll"]
            this.initItemWindow(window, k)
            this.refreshItemWindow(k, v)
        }
        



        //PET_TXT4 rd_tips rd_oneKey_cost rd_rf_cost
        AddRdContent(this.mElemList["rd_tips"], Localize_cns("ESCORT_DES_TXT1"), "ht_20_cc", "black")

        let unit = 2
        let moneystr = GetMoneyIcon(unit)
        let oneKeyStr = ""
        let costId = 60071 
        let onecost = 450
        let oneCostCount = ItemSystem.getInstance().getItemCount(costId)
        if(oneCostCount == 0){
            oneKeyStr = GetMoneyIcon(unit)
        }else{

        }
        
        let cost = 50
        AddRdContent(this.mElemList["rd_oneKey_cost"], Localize_cns("PET_TXT4") + moneystr + onecost, "ht_20_cc", "black")

        AddRdContent(this.mElemList["rd_rf_cost"], Localize_cns("PET_TXT4") + moneystr + cost, "ht_20_cc", "black")

        //rd_twice
        let twice = actInfo.husongTwice || 0
        AddRdContent(this.mElemList["rd_twice"], Localize_cns("ESCORT_TXT1") + twice + "/" + 3,"ht_20_cc", "black")
	}	
    initItemWindow(window, index) {
        let name = "group" + index
        let width = 550
        let height = 120
        let y = 125*(index -1)
        if(this.mElemList[name + "_bg"] != null) return
        let mElemInfo: any = [   
            //{ ["index_type"]: eui.Group, ["name"] : name ,  ["image"]: "ty_uiDi03", ["autoScale"] :true, ["x"] : 0, ["y"] : y,["w"] :width ,["h"] : height},	
            { ["index_type"]: gui.Grid9Image, ["name"] : name +"_bg",  ["image"]: "ty_uiDi03", ["autoScale"] :true, ["x"] : 0, ["y"] : y,["w"] :width ,["h"] : height},	
		    { ["index_type"]: eui.Image, ["name"] : name +"_title_bg", ["parent"]: name + "_bg", ["image"]: "cw_textDi02", ["x"] : 15, ["y"] : 0,["w"] : 44 ,["h"] : 120},	
            { ["index_type"]: gui.RichDisplayer, ["name"] : name +"_title", ["parent"]: name + "_title_bg", ["title"]:"", ["image"]: "",["font"]: "ht_20_cc", ["color"]: "", ["x"] : 8, ["y"] : 17,["w"] : 28 ,["h"] : 86},	
            { ["index_type"]: eui.Group,  ["name"]: name + "_group_prize", ["parent"]: name + "_bg", ["title"]:"", ["x"]: 223, ["y"]: 10, ["w"]: 320, ["h"]: 100, ["messageFlag"]: true },
		];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );    
        
        this.mElemList[name + "_title"].setAlignFlag(gui.Flag.CENTER_CENTER)
    }   

    refreshItemWindow(index, config) {
        let name = "group" + index
        let ColorList = ["#ublack","#green", "#blue", "#purple", "#orange"]

        let titleColor = ColorList[index - 1]
        AddRdContent(this.mElemList[name + "_title"], titleColor + config.tips ,"ht_20_cc")
        let prizelist = AnalyPrizeFormat(config.prize)
        for(let i = 0; i < size_t(prizelist); i++){
            let x = 80*i
            let y = 0

            let id = prizelist[i][0]
            let count = prizelist[i][1]
            
            let itemName = GameConfig.itemConfig[id].name
            if(this.mElemList[name + "_group_prize_" + i] == null){    
                let mElemInfo: any = [   
                    { ["index_type"]: eui.Group, ["name"] : name +"_group_prize_" + i, ["title"]: "", ["image"]: "", ["font"]: "ht_18_cc",["x"] : x, ["y"] : 0,["w"] : 80 ,["h"] : 100},
                    { ["index_type"]: eui.Group, ["name"] : name +"_prize_container_" + i, ["parent"]: name +"_group_prize_" + i, ["title"]: "", ["image"]: "", ["font"]: "ht_18_cc",["x"] : 0, ["y"] : 0,["w"] : 80 ,["h"] : 80},
                    { ["index_type"]: eui.Label, ["name"] : name +"_prize_name_" + i, ["parent"]: name +"_group_prize_" + i, ["title"]: "", ["image"]: "", ["font"]: "ht_18_cc",["x"] : 0, ["y"] : 80,["w"] : 80 ,["h"] : 20},	
		        ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList[name + "_group_prize"]);
                this.mElemList[name + "_prizeBox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_prizeBox_" + i, 0, 0, this.mElemList[name +"_prize_container_" + i])
            }

            this.mElemList[name + "_prizeBox_" + i].updateByEntry(id, count)
            this.mElemList[name + "_prize_name_" + i].text = itemName
            
        }
        this.mElemList[name + "_bg"].source = "ty_uiDi03"
        
        if(index == this.select){
            this.mElemList[name + "_bg"].source = "ty_uiDi04"
        }

        
    }

    ////响应事件
     public onRefreshClick():void{
        let unit = 2
        let had = GetHeroMoney(unit)
        let need = 50
        if(had < need ){
            MsgSystem.addTagTips(Localize_cns("COPY_TXT16"))
            return 
        }  
        RpcProxy.call("C2G_RandEscortIndex", 0)
    }
    public onOneKeyClick():void{
        let id = 60071
        let had = ItemSystem.getInstance().getItemCount(id)
        if( had == 0){
            had = GetHeroMoney(2)
        }

        if(had < 450){
            MsgSystem.addTagTips(Localize_cns("COPY_TXT16"))
            return
        }

        let wnd = WngMrg.getInstance().getWindow("EscortTipsFrame");
		let str = Localize_cns("ESCORT_TIPS_TXT5")
		wnd.onShowWnd(str)
    }

    public onGotoClick():void{
        let wnd = WngMrg.getInstance().getWindow("EscortTipsFrame");
		let str1 = Localize_cns("ESCORT_TIPS_TXT3")
        let str2 = Localize_cns("ESCORT_TIPS_TXT4")
		wnd.onShowWnd(str1, str2)

    }
}