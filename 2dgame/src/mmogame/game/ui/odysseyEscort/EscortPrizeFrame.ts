// TypeScript file
class EscortPrizeFrame extends BaseWnd {
    scroll:UIScrollList;
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xiyouhusong/EscortPrizeLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width = 640
        this.mLayoutNode.height = 600
        this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_get", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGetClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        
        let group: eui.Group = this.mElemList["group_scroll"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL)

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
	 onRefresh(){
         
         let actInfo = GetActivity(ActivityDefine.HuSong).getActInfo()
         let prizeInfo  = GetActivity(ActivityDefine.HuSong).getHusongPrize()

         
         if(size_t(actInfo) == 0) return

         let index = actInfo.index

         let refConfig = GameConfig.EscortConfig[index]
         let colorList = [
            gui.Color.ublack, gui.Color.green, gui.Color.blue, gui.Color.purple, gui.Color.orange
        ]
        this.mElemList["label_mache"].textColor = colorList[index]
        this.mElemList["label_mache"].text = refConfig.tips
        let prizeList = AnalyPrizeFormat(refConfig.prize)

        let prizeStr = "#green"
        for(let k in prizeList){
            let prize = prizeList[k]
            let name = GameConfig.itemConfig[prize[0]].name 
            prizeStr += name + ":" + prize[1] + "#space"
            if(tonumber(k) == 1 || tonumber(k) == 3){
                prizeStr += "#br"
            }
        }

    
        AddRdContent(this.mElemList["rd_des"], prizeStr, "ht_20_cc")

        
        let scroll = this.scroll
        
        scroll.clearItemList()
        let list = prizeInfo.recordList

        for(let k = 0; k <size_t(list) ; k++){ // 抢夺列表
            let config = list[k]  
			let window = scroll.getItemWindow(k, 470, 20 , 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, config, index)
        }
        
        scroll.refreshScroll(true, true)
        scroll.restoreViewXY()

	}	
     initItemWindow(window) {
        let name = window.name
       
         let mElemInfo: any = [   
            { ["index_type"]: gui.RichDisplayer, ["name"] : name +"_des" , ["title"]: "", ["image"]: "", ["font"]: "ht_20_cc",["x"] : 0, ["y"] : 0,["w"] : 470 ,["h"] : 20},
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);

        this.mElemList[name + "_des"].setAlignFlag(gui.Flag.LEFT_CENTER)
        
    }

    refreshItemWindow(window, config, myIndex) {
        let name = window.name

        let desColorList = ["#ublack","#green", "#blue", "#purple", "#orange"]
        let cheColor = desColorList[myIndex]
        let desStr = "#green" + config.name + Localize_cns("ESCORT_RECORD_TXT4") + "#" + cheColor + GameConfig.EscortConfig[myIndex].tips

    }

    ///-------------------响应事件btn_get
    onGetClick(){
        RpcProxy.call("C2G_GetEscortPrize")
        RpcProxy.call("C2G_EnterEscortActivity")
        this.hideWnd()  
    }

}