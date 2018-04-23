class TouZiShouChongWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
    tabWndList: UITabWndList
    name:string
    state:number
	
	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
        this.name = "Shouchong"
		this.mElemList = this.mParentWnd.mElemList;
           
        this.select = 0
        this.mElemList["adv_pay_rd"].setAlignFlag(gui.Flag.CENTER_CENTER)

        for (let i = 0; i < 4; i++) {
            this.mElemList["pay_rd"+(i+1)].setAlignFlag(gui.Flag.CENTER_CENTER)
            this.mElemList["pay_rd"+(i+1)].touchEnabled = false
        }

        let radioGroup = new eui.RadioButtonGroup()
		for (let i = 0; i < 4; i++) {
            let elem = <eui.RadioButton>this.mElemList["pay_tab" + i]
			elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this)
			elem.group = radioGroup
			elem.value = i
		}

        //奖励
        for (let i = 0; i < 6; i++) {
            this.mElemList[this.name+"itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, this.name+"itemBox_" + i, 72 * i, 0, this.mElemList["group_prize"], 0.9)
            //this.mElemList["itemBox_" + i].updateByEntry(20001)
        }
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
        this.mElemList["group_tab_1"].visible = true;
        //RegisterEvent(EventDefine.PAY_FIRST_PAY, this.onRefresh, this)
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this)
        
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
        
        var elemInfo = [
			{ ["name"]: "btn_charge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChargeClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        RpcProxy.call("C2G_SendOperatePlayerData",PayActivityIndex.FIRST_PAY)    //获取玩家数据 领取之类的
        this.onRefresh()
	}

	public onHide(): void {
		this.mElemList["group_tab_1"].visible = false;
        //UnRegisterEvent(EventDefine.PAY_FIRST_PAY, this.onRefresh, this)
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this)
       
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
	}

    onRefresh(){
        if(this.select == -1){
            this.select = 1
        }

        //let firstPayInfo = PaySystem.getInstance().getFristPayInfo();   //玩家领取信息
        let firstPayInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.FIRST_PAY)

        let radioBtn = <eui.RadioButton>this.mElemList["pay_tab" + this.select];
		radioBtn.selected = true;

        let config = GameConfig.FirstRechargeConfig
        let prizeList = config[this.select].prize
        let point = config[this.select].point

        let itemList = AnalyPrizeFormat(prizeList)

        let iamgeName = "sc_zhanShiTu0" + ((tonumber(this.select))+1)
        this.mElemList["image_bg"].source = iamgeName

        for (let i = 0; i < 4; i++) {
            let rmbNum = config[i].point / 10
            let des = config[i].name
            let str = String.format(Localize_cns("INVEST_TXT1"),rmbNum,des)
            AddRdContent(this.mElemList["pay_rd"+(i+1)], str, "ht_20_cc_stroke", "white")
        }

        let value = config[this.select].value
        let str1 = String.format(Localize_cns("INVEST_TXT2"),value)
        this.mElemList["label_value"].text = str1

         for (let i = 0; i < 6; i++) {
            let v = itemList[i]
            if (v) {
                this.mElemList[this.name+"itemBox_" + i].updateByEntry(v[0], v[1])
            }else{
                this.mElemList[this.name+"itemBox_" + i].updateByEntry(-1)
            }
         }

         let heroInfo = GetHeroPropertyInfo()
         let exp = heroInfo.VIP_exp
         let vip = VipSystem.getInstance().GetVipLevel()
         let curVipExp = VipSystem.getInstance().getVipSum(vip)
         let sum = curVipExp + exp
         let rdStr = String.format(Localize_cns("INVEST_TXT13"),sum)
         AddRdContent(this.mElemList["adv_pay_rd"], rdStr, "ht_20_cc", "white")

         let state = 0
         let canGet = false     //是否完成任务
         let isGet = false   //是否已经领取了

         if(sum>=point){
             canGet = true
         }

         if(firstPayInfo && firstPayInfo[this.select]){
             isGet = true
         }

         if(canGet){
             state = 2
             this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT20")
             if(isGet){
                 state = 3
                 this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT21")
             }
         }else{
             state = 1
             this.mElemList["btn_charge"].text = Localize_cns("INVEST_TXT19")
         }
         this.state = state //当前状态
    }

    //打开充值界面or领取奖励
    onChargeClick(){
        //判断是否可以领取
        let index = tonumber(this.select)
        if(this.state== 1){
            ExecuteMainFrameFunction("chongzhi")
        }else if(this.state == 2){
            RpcProxy.call("C2G_GetOperateActivityPrize",PayActivityIndex.FIRST_PAY,[index])
        }else{
            MsgSystem.addTagTips(Localize_cns("INVEST_TXT21"))
        }
    }

    onTabSelected(event: egret.TouchEvent){
        let name = event.target.name
        let index = name.replace(/[^0-9]/ig, "")
        if(this.select == index){
            return
        }
        this.select = index
        this.onRefresh()
    }
}