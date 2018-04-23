class DailyFindBackTipsFrame extends BaseWnd {
    index
    isEnough
    sendId
    sendList 

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/DailyFindBackTipsLayout.exml"]
        this.index = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width= 640
        this.mLayoutNode.height = 400
        this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_sure", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSureClick },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			
			{ ["name"]: "btn_cancel", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		//this.index = -1  

	}
    public onUnLoad(): void {
	
	}


	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.mLayoutNode.setDoModal(true)
        this.onRefresh()
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)
        if(this.index != -1){
            this.index = -1
        }
	}

    onRefresh(){

        let actInfo  = GetActivity(ActivityDefine.Boss).getFindBackInfo()
        if(actInfo == null) return

        let money = 0
        let had = GetHeroMoney(2)
        let num = 0
       
        if(this.index ==  -1){
            this.sendList = []
            for(let k in actInfo){
                let config = actInfo[k]
                money += config.needMoney * config.backNum
                num += config.backNum
                table_insert(this.sendList, config.ID)
            }
        } else{
            let config = actInfo[this.index-1]
            if(config == null) return
            this.sendId = config.ID
            money = config.needMoney * config.backNum 
            num = config.backNum
            
        }
        this.isEnough = had < money?false: true
        let str = String.format(Localize_cns("DAILY_TIPS_COST"), money, num)
        this.mElemList["label_des"].text = str

    }

    ////////----------x响应事件
    onSureClick(){
        if(this.isEnough == false){
            MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"))
            return
        }
        //发送协议
        if(this.index == -1){
            if(this.sendList == null) return
            for(let k in this.sendList){
                RpcProxy.call("C2G_XiyouLilian_FindBack", this.sendList[k])
            }
        }else{
            if(this.sendId == null) return
            RpcProxy.call("C2G_XiyouLilian_FindBack", this.sendId)
        }
        
        this.hideWnd()
    }


    ///-------
    onShowWnd(index){
        this.index = index
        this.showWnd()
    }
}