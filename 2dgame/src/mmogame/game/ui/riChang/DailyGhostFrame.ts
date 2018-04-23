class DailyGhostFrame extends BaseWnd {
    npcId
    Player : Player

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/DailyGhostLayout.exml"]
        
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
       // this.mLayoutNode.setLayer(gui.GuiLayer.Top)
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_challenge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChallengeClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        this.mElemList["rd_2"].setAlignFlag(gui.Flag.RIGHT_CENTER)

	}
    public onUnLoad(): void {
        if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	public onShow(): void {
		this.mLayoutNode.visible = true;	
        this.mLayoutNode.setDoModal(true)
        this.onRefresh()
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)
	}
	
    onRefresh(){
       // if(!this.npcId || !this.star){
       //     return
       // }

       let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon)
       

       if(size_t(actInfo) == 0) return

       //let activeList = {}
       let npcList = actInfo.npcList
       for(let k in npcList){
            let v = npcList[k]
            let osTime = GetServerTime()
            if((v <= osTime)){
               // activeList[k] = v
                this.npcId = tonumber(k)
                break
            }
        }

        //rd_1
        let guankaId = CampaignSystem.getInstance().getCurOpenCampaign()
        let guankaName = CampaignSystem.getInstance().getCampaignName(guankaId)

        let str1 = String.format(Localize_cns("DAILY_BOSS_TXT1"), this.npcId,  guankaName)
        AddRdContent(this.mElemList["rd_1"], str1, "ht_24_cc", "black")

        let str2 = String.format(Localize_cns("DAILY_BOSS_TXT3"))
        AddRdContent(this.mElemList["rd_2"], str2, "ht_24_cc", "black")

        let config = GameConfig.ZhongKuiDemonConfig[this.npcId]
        let desStr = ""
        let desRight = ""
        let starRatio = config.star
        for(let k in starRatio){
            
            if(tonumber(k) % 2 != 0){
                desStr += String.format(Localize_cns("DAILY_BOSS_TXT2"), k , FormatNumberInt(starRatio[k]*100 ) + "%")
            }else{
                desRight += String.format(Localize_cns("DAILY_BOSS_TXT2"), k , FormatNumberInt(starRatio[k]*100 ) + "%")
            }
        }
       // let str2 = Localize_cns("DAILY_BOSS_TXT2")
        AddRdContent(this.mElemList["rd_des"], desStr, "ht_24_cc","black")
        AddRdContent(this.mElemList["rd_right"], desRight, "ht_24_cc","black")

        
        let list = config.prize
        let prizeList =  AnalyPrizeFormat(list)
        this.onRefreshPrize(prizeList)

        let monsterId = config.entryId
        if (this.Player == null) {
			this.Player = Player.newObj()
	    }
        this.onRefreshActor(monsterId)   

        let star = actInfo.star
        this.onRefreshStar(star)

    }

    onRefreshPrize(list){
        for(let i = 0; i < size_t(list); i++){
            let config = list[0]
            if(!this.mElemList["prizeBox" + i]){
                this.mElemList["prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, "prizeBox" + i, 0, 0, this.mElemList["group_prize"])
            }
            this.mElemList["prizeBox" + i].updateByEntry(config[0], config[1])
        }
    }

    ///刷新
    onRefreshStar(num){
        for(let i = 1; i <= num; i++){
            this.mElemList["image_" + i ].source = "ty_star01"
        }
        if(num < 7){
            for(let i = num + 1; i <= 7 ; i++){
                this.mElemList["image_" + i ].source = "ty_starDi01"
            }
        }
    }

    onRefreshActor(id){
        let actorview = this.mElemList["actor_view"]
        let actor = this.Player
        let modelId = id
        actor.loadModel(modelId)
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0)
        actor.enterViewer(actorview)

        //缩放
        actor.setScale(1.0)
        //方向
        actor.setDir(3)
    }

    //--------------响应事件
    onChallengeClick(){
        if(this.npcId == null) return 
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.ZhongKuiDemon, this.npcId) //"C2G_CreateBossFight":"uint16;uint16",  --创建战斗 activityIndex,npcIndex
        this.hideWnd()
    }

    ///---------接口
    onShowWnd(type){
        this.npcId = type
       // this.star = star
        this.showWnd()
    }
}// TypeScript file