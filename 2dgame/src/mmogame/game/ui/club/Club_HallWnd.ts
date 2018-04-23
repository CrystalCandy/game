// TypeScript file
class Club_HallWnd extends BaseCtrlWnd {
    mElemList;

    public initObj(...params: any[]) {

    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        var elemInfo = [
            { ["name"]: "notice_change_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.changeNotice },
            { ["name"]: "event_record_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.eventRecord },
            { ["name"]: "apply_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.applyClcked },
            { ["name"]: "juanxian_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.juanxianClicked },
            { ["name"]: "people_info_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.peopleInfoClicked },
            { ["name"]: "club_list_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.clubListClicked },
            { ["name"]: "activity_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.activityClicked },
            { ["name"]: "shop_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.shopClicked },
            { ["name"]: "map_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.mapClicked },
            { ["name"]: "club_war_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.clubWarClicked },

            { ["name"]: "btn_change", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.clubChangeClicked },
            { ["name"]: "btn_zhao", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.clubZhaoClicked },
        ]
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["notice_change_btn"].visible = false
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this)
        RegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshNotice, this)
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        RegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group1"].visible = true
        this.mElemList["title"].text = Localize_cns("CLUB_TXT4")
        //帮派信息
        RpcProxy.call("C2G_FactionMemberRefresh")
        RpcProxy.call("C2G_FactionInfoRefresh")

        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshNotice, this)
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group1"].visible = false
    }

    refreshFrame() {
        let clubInfo = ClubSystem.getInstance().getCurClubInfo()
        if (clubInfo == null) {
            return
        }

        let power = ClubSystem.getInstance().isHaveClubJurisdiction()
        this.mElemList["notice_change_btn"].visible = power

        let bangzhu_name = clubInfo.leader
        this.mElemList["bangzhu_name"].text = String.format(Localize_cns("CLUB_TXT14"), bangzhu_name)
        let zijinNum = clubInfo.exp	//资金
        this.mElemList["zijin"].text = String.format(Localize_cns("CLUB_TXT16"), zijinNum)
        let clubLevle = clubInfo.level
        this.mElemList["level"].text = String.format(Localize_cns("CLUB_TXT17"), clubLevle)

        let mingzi_text = clubInfo.name
        this.mElemList["mingci_text"].text = mingzi_text

        let renshu_num = clubInfo.menberCount
        this.mElemList["renshu_num_text"].text = renshu_num

        let notice_text = clubInfo.notice
        AddRdContent(this.mElemList["notice_rd"], notice_text, "ht_24_cc", "saddlebrown", 3)
    }

    //更新公告用
    refreshNotice() {
        let notice_text = ClubSystem.getInstance().getNotice()
        AddRdContent(this.mElemList["notice_rd"], notice_text, "ht_24_cc", "saddlebrown", 3)
    }

    changeNotice() {
        WngMrg.getInstance().showWindow("ClubChangeNoticeFrame");
    }

    eventRecord() {
        WngMrg.getInstance().showWindow("ClubEventRecordFrame");
    }

    applyClcked() {
        let power = ClubSystem.getInstance().isHaveClubJurisdiction()
        if (power) {
            WngMrg.getInstance().showWindow("ClubPeopleApplyFrame");
        } else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"))
        }
    }

    juanxianClicked() {
        WngMrg.getInstance().showWindow("ClubDonateFrame");
    }

    peopleInfoClicked() {
        WngMrg.getInstance().showWindow("ClubPeopleInfoFrame");
    }

    clubListClicked() {
        let wnd = WngMrg.getInstance().getWindow("ClubListFrame")
        wnd.showAndSetData();
    }

    activityClicked() {
        WngMrg.getInstance().showWindow("ClubActiveFrame");
    }

    shopClicked() {
        WngMrg.getInstance().showWindow("ClubShopFrame");
    }

    mapClicked() {
        // WngMrg.getInstance().showWindow("ClubMapFrame");
        let a = GetActivity(ActivityDefine.ClubMap)
		a.requestStart()
    }

    clubWarClicked() {
        MsgSystem.addTagTips(Localize_cns("CLUB_TXT57"))
        //WngMrg.getInstance().showWindow("ClubWarFrame");
    }

    //帮派改名
    clubChangeClicked() {
        let power = ClubSystem.getInstance().isHaveClubJurisdiction()
        if (power) {
            WngMrg.getInstance().showWindow("ClubChangeNameFrame")
        } else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"))
        }
    }

    //招人
    clubZhaoClicked() {
        let power = ClubSystem.getInstance().isHaveClubJurisdiction()
        if (power) {
            let channelId = 7
            let clubInfo = ClubSystem.getInstance().getCurClubInfo()
            let str = String.format(Localize_cns("CLUB_TXT100"), clubInfo.name)
            MsgSystem.selectShowHandle(channelId, str)
        } else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"))
        }
    }
}