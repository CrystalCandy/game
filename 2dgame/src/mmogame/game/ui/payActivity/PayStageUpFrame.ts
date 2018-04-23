// TypeScript file



class PayStageUpFrame extends BaseWnd{

	mDeadLine:number;
	mTimerId:number;
	mActivityIndex:number;

	public initObj(...params:any[]){
		this.mLayoutPaths = ["layouts/payActivity/PayStageUpLayout.exml"]
		this.mActivityIndex = PayActivityIndex.STAGE_UP
	}

	public onLoad():void{
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		this.setAlignCenter(true, true)

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			//{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_pay", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickGetPrize },
			
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		let parent = this.mElemList["group_prize"]
		for (let i = 0; i < 6; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mElemList, "itemBox" + i, 0, 0, parent)
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

		this.mDeadLine = GetTomorrowTime(GetServerTime())
		this.mTimerId = SetTimer(this.onTimerCallback, this, 1000, true);

		 RpcProxy.call("C2G_SendOperatePlayerData", this.mActivityIndex)
	}

	public onHide():void{
		UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this)
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)

		if(this.mTimerId){
			KillTimer(this.mTimerId)
			this.mTimerId = null;
		}

		this.mLayoutNode.visible = false;
	}


	onTimerCallback(dt){
		let nowTime = GetServerTime()
		if(nowTime > this.mDeadLine){
			this.mDeadLine = GetTomorrowTime(GetServerTime())
		}

		let diff = this.mDeadLine - nowTime
		if(diff < 0)
			diff = 0
		let str = String.format(Localize_cns("ACTIVITY_PAY_TXT15"), getFormatDiffTime(diff))
		this.mElemList["label_time"].text = str
	}


	refreshFrame(){
		//local sendData = {realDayIndex,  getReward} --{真实的第几天,  今日是否领取0没有1领取了}
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex)
        if(playerInfo == null)
            return
		let loginDay = playerInfo[0]
		let getReward = playerInfo[1]

		let config = GameConfig.StageUpConfig[loginDay]		
		if(config == null)
			return;

		let prize_list = AnalyPrizeFormat(config.prize)
		 for (let i = 0; i < 6; i++) {
            let itemBox: UIItemBox = this.mElemList["itemBox" + i]

            let prize = prize_list[i]
            if (prize) {
                itemBox.setVisible(true)
                itemBox.updateByEntry(prize[0], prize[1])
            } else {
                itemBox.setVisible(false)
            }
        }

		let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
		let rmb = GetRmbFromGold(dailyPayCount)
		AddRdContent(this.mElemList["rd_payinfo"], String.format(Localize_cns("ACTIVITY_PAY_TXT14"), rmb), "ht_24_cc_stroke", "white")


		let btn:gui.Button = this.mElemList["btn_pay"]
		btn.enabled = true
		this.mElemList["group_time"].visible = true
		if(dailyPayCount < opLimitTimeActive.stageUpNeedMoney){
			btn.text = Localize_cns("ACTIVITY_PAY_TXT16")
		}else{
			if(getReward == 0){//未领取
				btn.text = Localize_cns("ACTIVITY_PAY_TXT17")
			}else{
				btn.enabled = false
				btn.text = Localize_cns("ACTIVITY_PAY_TXT7")
				this.mElemList["group_time"].visible = false
			}
		}

	}

	onClickGetPrize(args:egret.TouchEvent) {
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex)
        if(playerInfo == null)
            return
		let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
		if(dailyPayCount < opLimitTimeActive.stageUpNeedMoney){
			ExecuteMainFrameFunction("chongzhi")
			return
		}

        let name = args.target.name
		RpcProxy.call("C2G_GetOperateActivityPrize", this.mActivityIndex, {})
    }
}
