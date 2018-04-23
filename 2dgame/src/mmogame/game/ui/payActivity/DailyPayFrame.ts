// TypeScript file
//每日充值
class DailyPayFrame extends BaseWnd{

	
	mActivityIndex:number;
	mTabIndex:number;


	public initObj(...params:any[]){
		this.mLayoutPaths = ["layouts/payActivity/DailyPayLayout.exml"]
		this.mActivityIndex = PayActivityIndex.DAY_ACCUM_PAY_PRIZE

		this.mTabIndex = 1
	}

	public onLoad():void{
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		this.setAlignCenter(true, true)

		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onTabSelected, this);
		

		let radioBtn = <eui.RadioButton>this.mElemList["tab_payany"]
		radioBtn.group = radioGroup;
		radioBtn.value = 1;

		radioBtn = <eui.RadioButton>this.mElemList["tab_payValue"]
		radioBtn.group = radioGroup;
		radioBtn.value = 2;
		

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			//{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_pay", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickGetPrize },
			
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		
		for (let i = 0; i < 6; i++) {
			let parent = this.mElemList["group_prize" + i]
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mElemList, "itemBox" + i, 40, 30, parent)
            //this.mElemList[name + "itemBox" + i].updateByEntry(SpecailItemId.FUNDS, 1000)
        }


		let rd:gui.RichDisplayer = this.mElemList["rd_payinfo"]
		rd.setAlignFlag(gui.Flag.CENTER_CENTER)
	}

	public onUnLoad():void{

	}

	public onShow():void{
		RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this)
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)

		this.mLayoutNode.visible = true;

		this.refreshFrame()

	
		 RpcProxy.call("C2G_SendOperateAndPlayerData", this.mActivityIndex)
	}

	public onHide():void{
		UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)

	
		this.mLayoutNode.visible = false;
	}


	refreshFrame(){
		//{oldValue:0, reachList:[0,1,2,0]}--[1]=0没达成 [1]=1,可领取 [1]=2领取了
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex)
		//{stime:xx, etime:xx, prizeList:[]}
		let activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(this.mActivityIndex)
        if(playerInfo == null || activityInfo == null)
            return

		//必须只能两个档位
		let prizeList = activityInfo.prizeList
		if(prizeList.length != 2)
			return 
		
		let minConfig = prizeList[0]
		let maxConfig = prizeList[1]
		if(minConfig.point > maxConfig.point){
			let temp = maxConfig
			maxConfig = minConfig
			minConfig = temp
		}

		//设置标签页
		let maxTab:eui.RadioButton = this.mElemList["tab_payValue"] 
		maxTab.label = String.format(Localize_cns("ACTIVITY_PAY_TXT18"), GetRmbFromGold(maxConfig.point))

		//显示当前奖励
		let showPrize = null
		if(this.mTabIndex == 1){
			showPrize = minConfig
		}else{
			showPrize = maxConfig
		}
		let prize_list = showPrize.prize
		 for (let i = 0; i < 6; i++) {
            let itemBox: UIItemBox = this.mElemList["itemBox" + i]

            let prize = prize_list[i]
            if (prize) {
                //itemBox.setVisible(true)
                itemBox.updateByEntry(prize[0], prize[1])
				this.mElemList["group_prize" + i].visible = true
            } else {
                //itemBox.setVisible(false)
				this.mElemList["group_prize" + i].visible = false
            }
        }

		
		//今日充值
		let rmb = GetRmbFromGold(playerInfo.oldValue)
		AddRdContent(this.mElemList["rd_payinfo"], String.format(Localize_cns("ACTIVITY_PAY_TXT14"), rmb), "ht_24_cc_stroke", "white")


		//刷新按钮
		let allGet = true
		let canGet = false
		for(let val of playerInfo.reachList){
			if(val != 2){
				allGet = false
			}
			if(val == 1){
				canGet = true
			}
		}

		let btn:gui.Button = this.mElemList["btn_pay"]
		btn.enabled = true
		if(allGet){//全部档位都领取了
			btn.enabled = false
			btn.text = Localize_cns("ACTIVITY_PAY_TXT7")
		}else if(canGet){//可以领取
			btn.text = Localize_cns("ACTIVITY_PAY_TXT17")
		}else{//前往充值
			btn.text = Localize_cns("ACTIVITY_PAY_TXT16")
		}
	
	}

	onClickGetPrize(args:egret.TouchEvent) {
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex)
        if(playerInfo == null)
            return

		for(let index = 1; index <= playerInfo.reachList.length; index++){
			let val = playerInfo.reachList[index - 1] //服务器lua，从1开始
			if(val == 1){
				RpcProxy.call("C2G_GetOperateActivityPrize", this.mActivityIndex, [index])
				return
			}
		}
		
		//打开充值
		ExecuteMainFrameFunction("chongzhi")
    }

	onTabSelected(event: egret.Event) {
		var radioGroup: eui.RadioButtonGroup = event.target;
		
		let radiobtn = radioGroup.selection;
		this.mTabIndex = radiobtn.value
		this.refreshFrame()
		
	}
	
}
