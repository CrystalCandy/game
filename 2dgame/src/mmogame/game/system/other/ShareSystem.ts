// TypeScript file
class ShareSystem extends BaseSystem {
    mShowInviteBtn:boolean = false
    mAttentionStatus:number = core.GameSdk.NOT_SUPPORT_ATTENTION
    mHeroEnter:boolean = false
    public initObj(...args: any[]): void {
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this)
        //RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.checkShareStatus, this)
        
        IGlobal.gameSdk.addEventListener(core.GameSdk.SHARE_STATUS_CHANGE, this.checkShareStatus, this)
        IGlobal.gameSdk.addEventListener(core.GameSdk.SHARE_RETURN, this.onClientShareReturn, this)
        IGlobal.gameSdk.addEventListener(core.GameSdk.ATTENTION_STATUS_CHANGE, this.checkAttentionStatus, this)
        
        this.mShowInviteBtn = (IGlobal.gameSdk.canInvite())
        this.mAttentionStatus = (IGlobal.gameSdk.getAttentionStatus())
    }

    destory() {

    }

    prepareResource(workQueue) {

    }

    onClear() {

    }
    
    onHeroEnterGame(args){
        TLog.Debug("ShareSystem.onHeroEnterGame")
        this.refreshInviteAttentionStatus()
        this.mHeroEnter = true;
    }

    refreshInviteAttentionStatus(){
        TLog.Debug("ShareSystem.refreshInviteAttentionStatus", this.mShowInviteBtn, this.mAttentionStatus)
        this.setInviteBtnVisible(this.mShowInviteBtn);
        let show = (this.mAttentionStatus == core.GameSdk.NOT_ATTENTION)
        this.setAttentionBtnVisible(show)
        if (this.mAttentionStatus == core.GameSdk.AREADY_ATTENTION){
            let msg = GetMessage(opCodes.C2G_PLAT_DAILY_SHARE)
            msg.platKey = "h5Attention"
            SendGameMessage(msg)
        }
    }

    onClientShareReturn(args){
        TLog.Debug("ShareSystem.onClientShareReturn")
		let msg = GetMessage(opCodes.C2G_PLAT_DAILY_SHARE)
		msg.platKey = "h5DailyShare"
		SendGameMessage(msg)
    }
    
    checkAttentionStatus(args){
        let value = IGlobal.gameSdk.getAttentionStatus()
        this.mAttentionStatus = value
        TLog.Debug("ShareSystem.checkAttentionStatus", this.mAttentionStatus)
        if (this.mHeroEnter){
            this.refreshInviteAttentionStatus()
        }
        //let show = (value == core.GameSdk.NOT_ATTENTION)
        //this.setInviteBtnVisible(show)       
    }

    checkShareStatus(args){
        let support = IGlobal.gameSdk.canInvite()
        this.mShowInviteBtn = support
        TLog.Debug("ShareSystem.checkShareStatus", this.mShowInviteBtn)
        if (this.mHeroEnter){
            this.refreshInviteAttentionStatus()
        }
        //this.setInviteBtnVisible(support)
        //let shareinfo = getSaveRecord("h5DailyShare")
        //let showcd = false
        //let count = 0//今天已经分享了多少次
        //if (shareinfo != null){
        //    let curtime = GetServerTime()
        //    if (curtime < shareinfo[0]){
        //        showcd = true
        //    }
        //    count = shareinfo[1]
        //}
    }

    setInviteBtnVisible(show:boolean){
        TLog.Debug("ShareSystem.setInviteBtnVisible", show)
        //if (this.mShowInviteBtn == show){
        //    return
        //}
        //this.mShowInviteBtn = show
        let wnd:MainFrame = WngMrg.getInstance().getWindow("MainFrame");
        //wnd.setShowInviteBtn(show)
    }

    setAttentionBtnVisible(show:boolean){
        TLog.Debug("ShareSystem.setAttentionBtnVisible", show)

        let wnd:MainFrame = WngMrg.getInstance().getWindow("MainFrame");
        //wnd.setShowAttentionBtn(show)
    }    
}
