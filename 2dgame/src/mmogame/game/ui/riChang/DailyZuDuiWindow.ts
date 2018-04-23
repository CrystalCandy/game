class DailyZuDuiWindow extends BaseCtrlWnd {
	mElemList
   

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
    
		
        this.mElemList["rd_2_twice"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_2_des"].setAlignFlag(gui.Flag.CENTER_CENTER)
       
      
	}

	public onUnLoad(): void {
        
	}

	public onShow(): void {
		this.mElemList["group_xiangYao"].visible = true;
        this.mElemList["title"].text = Localize_cns("DAILY_TXT2")

		this.onRefresh()
        //  RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon)  
	}

	public onHide(): void {
		this.mElemList["group_xiangYao"].visible = false;
	}

     updateWnd(){
        this.onRefresh()
    }

    onRefresh(){

        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon)
      //  this.mElemList["group_xiangYao"].visible = true;
        if(size_t(actInfo) == 0){
            return
        }

        let index = this.mParentWnd.tabWndList.getTabIndex()

        let image = "rc_ztBg03"
		this.mElemList["image_bg"].source = image
       
		for(let i = 1; i <= 3; i++){
			if(i != (index + 1)){
				this.mElemList["group_" + i + "_prize"].visible = false
				this.mElemList["group_rd_" + i].visible = false
			}else{
				this.mElemList["group_" + i + "_prize"].visible = true
				this.mElemList["group_rd_" + i].visible = true
			}
		
		}

                

        //
        let had = actInfo.killCount
        let twiceStr = String.format(Localize_cns("DAILY_TXT8"), had)
        AddRdContent(this.mElemList["rd_1_twice"], twiceStr, "ht_20_cc")

      
        //奖励
        let list = []
        let prizeName = "zudui"
        
        for(let i = 1; i <= size_t(list) ; i++){
			
           	if(!this.mElemList[prizeName + "prizeBox" + i]){
               	this.mElemList[prizeName + "prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, prizeName + "prizeBox" + i, 0, 0, this.mElemList["group_2_prize"])
           	}
			this.mElemList[prizeName + "prizeBox" + i].updateByEntry(list[i-1])
        }
      
        
        let value 
        if(had >= 10){
            value = 10
        }else{
            value = had
        }
        let maxvalue = 10
       
        UiUtil.updateProgress(this.mElemList["progress"], value, maxvalue)
        let proStr = String.format(Localize_cns("ESCORT_TXT5"), value, maxvalue)
        this.mElemList["label_pro"].text = proStr
        
        let isget = actInfo.prizeFlag == 1? true : false
        let state1 = true
        let state2 = true
        let name1 = Localize_cns("DAILY_TXT9") //"一键完成"
        let name2 = Localize_cns("DAILY_TXT10") //"前往击杀"

        if(had == 0){
            state2 = false
        }

        if(isget){
            name1 = Localize_cns("DAILY_TXT11") //"已领取"
            state1 = false
        }

       
        this.mElemList["btn_oneKey"].text = name1
		this.mElemList["btn_kill"].text = name2
		
		this.mElemList["btn_oneKey"].enabled = state1	
		this.mElemList["btn_kill"].enabled = state2

        //双倍奖励
        /*if(actInfo.prizeRatio == 2){
            this.mElemList["double_prize"].visible = true
        }else{
            this.mElemList["double_prize"].visible = false
        }
        */

    
    }
} // TypeScript file