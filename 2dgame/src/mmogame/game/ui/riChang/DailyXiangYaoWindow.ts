class DailyXiangYaoWindow extends BaseCtrlWnd {
	mElemList
    timer;
    refreshTime
    npcIndex

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        this.timer = null

        var elemInfo = [
			{ ["name"]: "btn_oneKey", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onOneKeyClick },
			
			{ ["name"]: "btn_kill", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onKillClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)


        this.mElemList["rd_1_twice"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_1_time"].setAlignFlag(gui.Flag.RIGHT_CENTER)
       
       
	}

	public onUnLoad(): void {
        if(this.timer != null){
            KillTimer(this.timer)
            this.timer = null
        }
	}

	public onShow(): void {
        
		this.mElemList["group_xiangYao"].visible = true;
        this.mElemList["title"].text = Localize_cns("DAILY_TXT1")
        this.onRefresh()
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon)
        
       	
         
	}

	public onHide(): void {
		this.mElemList["group_xiangYao"].visible = false;
	}

    updateWnd(){
        this.onRefresh()
    }

    onRefresh(){

        let index = this.mParentWnd.tabWndList.getTabIndex()

        let image = "rc_ztBg01"
		this.mElemList["image_bg"].source = image

        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon)
      //  this.mElemList["group_xiangYao"].visible = true;
        if(size_t(actInfo) == 0){
            return
        }

        
		for(let i = 1; i <= 3; i++){
			if(i != (index + 1)){
				this.mElemList["group_" + i + "_prize"].visible = false
				this.mElemList["group_rd_" + i].visible = false
			}else{
				this.mElemList["group_" + i + "_prize"].visible = true
				this.mElemList["group_rd_" + i].visible = true
			}
		
		}

        let activeList = {}
        let unActiveList = {}
        let npcList = actInfo.npcList
        for(let k in npcList){
            let v = npcList[k]
            let osTime = GetServerTime()
            if((v <= osTime)){
                activeList[k] = v
            }else{
                unActiveList[k] = v
            }
        }

       for(let k in unActiveList){
            let tempTime = unActiveList[k]
            if(this.refreshTime == null){
                this.refreshTime = tempTime
                this.npcIndex = tonumber(k)
            }
            if(this.refreshTime > tempTime){
                this.refreshTime = tempTime
                this.npcIndex = tonumber(k)
            }
        }
        this.mParentWnd.npcIndx = this.npcIndex
        
        if(this.refreshTime == null || this.refreshTime - GetServerTime() <= 0){
            this.refreshTime = GetServerTime() + 1800
        }
        //
        let had = size_t(activeList)
        let twiceStr = String.format(Localize_cns("DAILY_TXT8"), had)
        AddRdContent(this.mElemList["rd_1_twice"], twiceStr, "ht_20_cc")

      
        //奖励
        let config = opBossActivityConfig[OrdinaryActivityIndex.ZhongKuiDemon].stagePrize
        let list = AnalyPrizeFormat(config)
        let prizeName = "xiangYao"
        
        for(let i = 1; i <= size_t(list) ; i++){
			let v = list[i-1]
           	if(!this.mElemList[prizeName + "prizeBox" + i]){
               	this.mElemList[prizeName + "prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, prizeName + "prizeBox" + i, 0, 0, this.mElemList["group_1_prize"])
           	}
			this.mElemList[prizeName + "prizeBox" + i].updateByEntry(v[0], v[1])
        }
      
        
        let value = actInfo.killCount
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
        }else if( had >= 10){
            name1 = Localize_cns("DAILY_TXT13")      
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

       
        if(this.timer == null){
            this.timer = SetTimer(this.onRefreshTime , this, 1000, true)
        }
    }
    onRefreshTime(){
        //
        let time = this.refreshTime 
        if(time == null){
            return 
        }
        let refreshTime = time - GetServerTime()
        if(refreshTime == 0){
     
        }
        let str = getFormatDiffTime(refreshTime)
        let timeStr = String.format(Localize_cns("DAILY_TXT12"), str)
        AddRdContent(this.mElemList["rd_1_time"], timeStr, "ht_20_cc")
    }

    /////btn响应事件

	onKillClick(args){
        let index = this.mParentWnd.tabWndList.getTabIndex()
        if(index != 0) return
		let wnd = WngMrg.getInstance().getWindow("DailyGhostFrame")
		wnd.showWnd()
	}

    
	onOneKeyClick(args){
        let index = this.mParentWnd.tabWndList.getTabIndex()
        if(index != 0) return

		let name = args.target.name
        let btnName = this.mElemList[name].text
        if(btnName == Localize_cns("DAILY_TXT9")){
            let vip = GetHeroProperty("VIP_level")
            if(vip < 6){
                MsgSystem.addTagTips(String.format(Localize_cns("DAILY_TXT14"), 6))
            }
            RpcProxy.call("C2G_SweepBossActivity", OrdinaryActivityIndex.ZhongKuiDemon, 1)
        }else if(btnName == Localize_cns("DAILY_TXT13")){
            RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.ZhongKuiDemon)
        }
	
	}
} // TypeScript file