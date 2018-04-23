class TouziLeiJiWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
    scroll4:UIScrollList
    index:number
	nameToIndex:any [];
    state:number
    prizeList:any [];
    
	
	public initObj(...params: any[]) {
		
	}
    public onLoad(): void {
        this.index = 0
        
		this.mElemList = this.mParentWnd.mElemList;
        let group : eui.Group = this.mElemList["leichong_scroll"]
		this.scroll4 = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON)
        
        var elemInfo = [
			{ ["name"]: "btn_left", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
            { ["name"]: "btn_right", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
            { ["name"]: "btn_leiji_charge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChargeClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        
        //奖励
        for (let i = 0; i < 6; i++) {
            let x = 72 * (i%3) + 10
            let y = 5
            if(i >= 3){
                y = 72 + 5
            }
            this.mElemList["itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, x, y, this.mElemList["group_leiji_prize"], 0.9)
            //this.mElemList["itemBox_" + i].updateByEntry(20001)
         }

        //  this.setCountDown(5800)
         this.mElemList["countdown_rd"].setAlignFlag(gui.Flag.H_CENTER)
    }

	public onUnLoad(): void {
		
	}

	public onShow(): void {
        this.mElemList["group_tab_4"].visible = true;
        
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this)
        
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
        RpcProxy.call("C2G_SendOperateAndPlayerData",PayActivityIndex.ACCUM_PAY_PRIZE)    //获取活动信息和玩家数据
        this.onRefresh()
	}

	public onHide(): void {
		this.mElemList["group_tab_4"].visible = false;
        
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this)
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
	}

    onRefresh(){
        let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.ACCUM_PAY_PRIZE)
        let activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(PayActivityIndex.ACCUM_PAY_PRIZE)

        if(playerInfo == undefined || activityInfo == undefined){
            return
        }

        let prizeList = activityInfo.prizeList
        this.prizeList = prizeList
        this.nameToIndex = []
        for (let i = 0; i < size_t(prizeList); i++) {
            let v = prizeList[i]
            let window = this.scroll4.getItemWindow(i, 117, 51, 5, 5, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v ,i)
        }
        this.scroll4.refreshScroll()
        //this.scroll4.restoreViewXY()   

        let curShowReward = prizeList[this.index].prize   
        for (let i = 0; i < 6; i++) {
            let item = curShowReward[i]
            if(item){
                this.mElemList["itemBox_" + i].updateByEntry(item[0],item[1])
            }else{
                this.mElemList["itemBox_" + i].updateByEntry(-1)
            }
         }

         this.state = 0
         let reachList = playerInfo.reachList
         if(reachList[this.index]){
             if(reachList[this.index] == 1){
                 this.state = 1
             }else if(reachList[this.index] == 2){
                 this.state = 2
             }
         }

         if(this.state == 0){
             this.mElemList["btn_leiji_charge"].text =  Localize_cns("INVEST_TXT19")
         }else if(this.state == 1){
             this.mElemList["btn_leiji_charge"].text =  Localize_cns("INVEST_TXT20")
         }else{
             this.mElemList["btn_leiji_charge"].text =  Localize_cns("INVEST_TXT21")
         }

        //  let heroInfo = GetHeroPropertyInfo()
        //  let exp = heroInfo.VIP_exp
        //  let vip = VipSystem.getInstance().GetVipLevel()
        //  let curVipExp = VipSystem.getInstance().getVipSum(vip)
        //  let sum = curVipExp + exp
         let sum = playerInfo.oldValue
         let rdStr = String.format(Localize_cns("INVEST_TXT13"),sum)
         AddRdContent(this.mElemList["rd_leiji_charge"], rdStr, "ht_20_cc", "white")

         //let curCount = this.prizeList[this.index].potin?
         let curCount = 8888
         this.setCountDown(curCount)
    }

    setCountDown(num) {
        // if(this.index==1){
        //     num = 1
        // }else if(this.index==2){
        //     num = 88
        // }else if(this.index==3){
        //     num = 888
        // }else if(this.index==4){
        //     num = 8888
        // }else if(this.index==5){
        //     num = 88888
        // }

        // let offx = (num.toString().length - 1)*10 + 165

        // let imageBox:gui.BatchImage = this.mElemList["countdown"]

        // imageBox.beginDraw();
		// imageBox.drawNumberString("yuanBao_", num,offx,0)
		// imageBox.endDraw();
        
        AddRdContent(this.mElemList["countdown_rd"], tostring(num) ,"ht_24_cc_stroke", "white")
        

        // if(num>=0&&num<10){
        //     imageBox.x = 165
        // }else if(num>=10&&num<100){
        //     imageBox.x = 155
        // }else if(num>=100&&num<1000){
        //     imageBox.x = 145
        // }else if(num>=1000&&num<10000){
        //     imageBox.x = 135
        // }else if(num>=1000){
        //     imageBox.x = 125
        // }
    }

    initItemWindow(window) {
        let name = window.name
		let width = 117, height = 51
		let Info: any = [
			   	{ ["index_type"]: eui.Group, ["name"]: name+"bg" , ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["messageFlag"]: true },
                { ["index_type"]: gui.Grid9Image, ["name"]: name+"btn_bg", ["title"]: null, ["font"]: null, ["image"]: "", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: 117, ["h"]: 51, },
                { ["index_type"]: gui.Button, ["name"]: name + "btn", ["title"]: "", ["font"]: "ht_20_cc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 117, ["h"]: 51, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClick}, 
                { ["index_type"]: eui.Label, ["name"]: name + "text", ["parent"]: name + "btn", ["title"]: "", ["font"]: "ht_18_cc_stroke", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 117, ["h"]: 51, ["messageFlag"]: true },
                ]
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
    }

    refreshItemWindow(window, data , i) {
      let name = window.name
      this.mElemList[name + "btn_bg"].source = "ty_tongYongBt3"
      if(this.index == i){
          this.mElemList[name + "btn_bg"].source = "ty_tongYongBt4"
      }
      
      this.mElemList[name + "text"].text = String.format(Localize_cns("INVEST_TXT22"),data.point)
      this.nameToIndex[name+"btn"] = i
    }

    onClick(args) {
        let name = args.target.name
        if(this.nameToIndex[name]==null){
            return
        }
        let index = this.nameToIndex[name]
        this.index = index
        this.onRefresh()
    }

    onLeftClick(args) {
        this.index = 0
        this.onRefresh()
        this.scroll4.moveToScrollIndex(this.index,true)
    }

    onRightClick(args) {
        this.index = size_t(this.prizeList) - 1
        this.onRefresh()
        this.scroll4.moveToScrollIndex(this.index,true)
    }

    onChargeClick(args) {
        let index = this.index
        if(this.state == 0){
             ExecuteMainFrameFunction("chongzhi")
         }else if(this.state == 1){
             RpcProxy.call("C2G_GetOperateActivityPrize",PayActivityIndex.ACCUM_PAY_PRIZE,[index+1])
         }else{
             MsgSystem.addTagTips(Localize_cns("INVEST_TXT21"))
         }
    }
}