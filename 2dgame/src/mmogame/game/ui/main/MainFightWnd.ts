class MainFightWnd extends BaseCtrlWnd {
    select: boolean;

    public initObj(...params: any[]) {
        this.select = false
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        var elemInfo = [
            { ["name"]: "fire_wnd0", ["messageFlag"]: true },
            { ["name"]: "fire_wnd1", ["messageFlag"]: true },
            { ["name"]: "fire_wnd2", ["messageFlag"]: true },

            { ["name"]: "auto_tip", ["messageFlag"]: true },

            { ["name"]: "auto_pic", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBoss },
            { ["name"]: "auto_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAuto }
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        for (let i = 0; i < 3; i++) {
            this.mElemList["fire" + i].visible = false
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFireWnd, this)
        RegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.fightWin, this)
        RegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.fightLost, this)

        this.mElemList["auto_wnd"].visible = true

        this.refreshFireWnd()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFireWnd, this)
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.fightWin, this)
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.fightLost, this)
        
        this.mElemList["auto_wnd"].visible = false
    }

    refreshFireWnd() {
        let curmine = CampaignSystem.getInstance().getCurMine()
        let needmine = CampaignSystem.getInstance().getNeedMine()

        for (let i = 0; i < 3; i++) {
            this.mElemList["fire" + i].visible = (i < curmine)
            this.mElemList["fire_wnd" + i].visible = (i < needmine)
        }
    }

    fightWin() {
        let canFight = CampaignSystem.getInstance().bossCampaitnBattle()
        if (this.select && canFight) {
            let campaignId = CampaignSystem.getInstance().getCurOpenCampaign()
            RpcProxy.call("C2G_CampaginFight", campaignId)
        }
    }

    fightLost() {
        if (this.select) {
            this.select = false
            this.mElemList["auto_btn"].source = "zjm_Bt33"
        }
    }

    onClickBoss() {
        ExecuteMainFrameFunction("guanka")
    }

    onClickAuto() {
        this.select = !this.select
        if (this.select) {
            this.mElemList["auto_btn"].source = "zjm_Bt33_xz"
        } else {
            this.mElemList["auto_btn"].source = "zjm_Bt33"
        }
    }
}