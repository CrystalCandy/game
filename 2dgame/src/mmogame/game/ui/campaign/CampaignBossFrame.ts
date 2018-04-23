// TypeScript file
class CampaignBossFrame extends BaseWnd {
    campaignId: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/campaign/CampaignBossLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true)

        let mElemInfo: any = [
            { ["name"]: "btn_close", ["title"]: null, ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "help_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickHelp },
            { ["name"]: "fight_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight },
            { ["name"]: "rank_enter", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRank },
        ]
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["actor_view"] = UIActorView.newObj(this.mLayoutNode, "actor_view", 60, 150, this.mElemList["actor_wnd"])

        //通关奖励
        this.mElemList["passItemBox"] = UIItemBox.newObj(this.mLayoutNode, "passItemBox", 0, 0, this.mElemList["pass_item_wnd"])

        //概率掉落
        for (let i = 0; i < 5; i++) {
            this.mElemList["dropItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "dropItemBox" + i, 0, 0, this.mElemList["drop_item_wnd"])
        }

        this.mElemList["fight_btn"].visible = false
        this.mElemList["fight_tips"].visible = false

        this.mElemList["help_btn"].visible = false
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFrame, this)
        this.mLayoutNode.visible = (true)
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFrame, this)
        this.mLayoutNode.visible = (false)
    }

    refreshFrame() {
        this.campaignId = CampaignSystem.getInstance().getCurOpenCampaign()
        if (!this.campaignId) {
            return
        }

        this.mElemList["camp_name"].text = CampaignSystem.getInstance().getCampaignName(this.campaignId)

        let list = [
            // { name: "aaa", pass: 1000 },
            // { name: "bbb", pass: 2000 },
            // { name: "ccc", pass: 3000 }
        ]
        this.updateSmallRank(list)

        this.updateHelpRd()

        this.updatePassWnd()

        this.updateActorModel()

        //更新掉落物品
        let prizeList = AnalyPrizeFormat(CampaignSystem.getInstance().getCampaignPrize(this.campaignId))
        for (let i = 0; i < 5; i++) {
            let v = prizeList[i]
            if (v) {
                this.mElemList["dropItemBox" + i].updateByEntry(v[0], v[1])
            }
        }

        //挑战状态更新
        let isCanBattle = CampaignSystem.getInstance().bossCampaitnBattle()
        if (isCanBattle) {
            this.mElemList["fight_btn"].visible = true
            this.mElemList["fight_tips"].visible = false

            this.mElemList["help_btn"].visible = true
        } else {
            this.mElemList["fight_btn"].visible = false
            this.mElemList["fight_tips"].visible = true

            this.mElemList["help_btn"].visible = false

            let needMine = CampaignSystem.getInstance().getNeedMine(this.campaignId)
            let curMine = CampaignSystem.getInstance().getCurMine()
            this.mElemList["fight_tips"].text = String.format(Localize_cns("CAMPAIGN_TXT11"), needMine - curMine)
            this.mElemList["fight_tips"].textColor = gui.Color.ublack
        }
    }

    //更新前三
    updateSmallRank(list) {
        let colorStr = ["#orange", "#magenta", "#cyan"]
        let rankStr = ""
        let nameStr = ""
        let passStr = ""
        for (let i = 0; i < 3; i++) {
            let v = list[i]
            if (v) {
                rankStr += colorStr[i] + (tonumber(i) + 1) + "#br"
                nameStr += colorStr[i] + v.name + "#br"
                passStr += colorStr[i] + v.pass + Localize_cns("CAMPAIGN_TXT10") + "#br"
            }
        }

        AddRdContent(this.mElemList["rank_rd"], rankStr, "ht_24_cc", "white", 6)
        AddRdContent(this.mElemList["name_rd"], nameStr, "ht_24_cc", "white", 6)
        AddRdContent(this.mElemList["pass_rd"], passStr, "ht_24_cc", "white", 6)
    }

    //求助信息
    updateHelpRd() {
        let request = 0
        let requestLimit = 5
        let help = 0
        let helpLimit = 10
        let str = String.format(Localize_cns("CAMPAIGN_TXT9"), request, requestLimit, help, helpLimit)
        AddRdContent(this.mElemList["help_rd"], str, "ht_20_cc", "ublack", 3)
    }

    //更新通关奖励和进度
    updatePassWnd() {
        let itemId = 60012
        this.mElemList["passItemBox"].updateByEntry(itemId, 15)

        UiUtil.updateProgress(this.mElemList["pass_imb"], 10, 10)
    }

    //更新ActorView
    updateActorModel() {
        let modeID = GetCampaignBossModel(this.campaignId)
        
        let actorview = <UIActorView>this.mElemList["actor_view"]
        let actor = actorview.updateByPlayer(modeID)
        actor.setScale(1.5)
    }

    //////////////////////////////////////////
    onClickFight(args) {
        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (CheckFightState() == true) {
            return
        }
        
        RpcProxy.call("C2G_CampaginFight", this.campaignId)
    }

    onClickHelp(args) {
        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (CheckFightState() == true) {
            return
        }
    }

    onClickRank(args) {

    }
}