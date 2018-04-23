class Club_FuBenWnd extends BaseCtrlWnd {
    mElemList;
    scroll: UIScrollList;
    list: any[];
    auto: boolean;
    select: number;

    public initObj(...params: any[]) {
        this.auto = true
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        var elemInfo = [
            { ["name"]: "dungeon_left_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.changeIndexClicked },
            { ["name"]: "dungeon_left_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.changeIndexClicked },

            { ["name"]: "monster_level_text", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.saddlebrown }
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["team_ctrl"] = UITeamGroup.newObj(this.mLayoutNode, this, this.mElemList["team_group"], this.mParentWnd.mLayoutPaths[1], "team_com")

        let group = <eui.Group>this.mElemList["dungeon_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 30, 0, group.width - 60, group.height, group, UIScrollList.DIR_HORIZON)

        for (let i = 0; i < 6; i++) {
            this.mElemList["itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, 80 * i, 0, this.mElemList["item_reward_wnd"])
        }

        this.mElemList["help_rd"].setAlignFlag(gui.Flag.H_CENTER)
        this.mElemList["fight_count_rd"].setAlignFlag(gui.Flag.H_CENTER)

        this.select = 0
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this)
        //RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        //RegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group3"].visible = true
        this.mElemList["title"].text = Localize_cns("CLUB_TXT6")
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.FactInstZones)
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this)
        //UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)
        //UnRegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this)
        this.mElemList["group3"].visible = false
        this.mElemList["team_ctrl"].hideWnd()
    }

    refreshFrame() {
        this.updateDungeonWnd()	//副本信息
        this.updateTeamWnd()	//组队
    }

    updateDungeonWnd() {
        this.scroll.clearItemList()
        let list: any[] = []
        for (let i in GameConfig.FactionMapConfig) {
            JsUtil.arrayInstert(list, GameConfig.FactionMapConfig[i])
        }

        table_sort(list, function (a, b) {
            return a.index - b.index
        })

        this.list = list

        this.scroll.saveViewXY()

        let group = <eui.Group>this.mElemList["dungeon_group"]
        for (let i = 0; i < size_t(list); i++) {
            let v = list[i]
            let window = this.scroll.getItemWindow(i, 185, group.height, 0, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v)

            if (this.select == i) {
                //几率掉落
                this.updateRatePrize(this.list[this.select])

                let wndname = window.name
                this.mElemList[wndname + "_select"].visible = true
            }
        }
        this.scroll.refreshScroll()
        this.scroll.restoreViewXY()

        let record = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactInstZones) || {}
        let helpTime = record.helpCount || 0
        let helpLimit = defaultValue.CLUB_FUBEN_HELP_COUNT
        let str = String.format(Localize_cns("CLUB_TXT114"), helpTime, helpLimit)
        AddRdContent(this.mElemList["help_rd"], str, "ht_13_cc", "ublack", 3)

        let prizeCount = record.prizeCount || 0
        let prizeLimit = defaultValue.CLUB_FUBEN_FIGHT_COUNT
        str = String.format(Localize_cns("CLUB_TXT116"), prizeCount, prizeLimit)
        AddRdContent(this.mElemList["fight_count_rd"], str, "ht_22_cc", "ublack", 3)
    }

    updateTeamWnd() {
        let ctrl = <UITeamGroup>this.mElemList["team_ctrl"]
        ctrl.showWnd()
        ctrl.setTeamActivityData([OrdinaryActivityIndex.FactInstZones, this.select + 1])
        ctrl.setHandler(UITeamGroup.CHECK_QUICK_JOIN, this.checkCardFight, this)
        ctrl.setHandler(UITeamGroup.CHECK_CREATE_TEAM, this.checkCardFight, this)
    }

    initItemWindow(window) {
        let name = window.name
        let w = window.width
        let h = window.height

        let ElemInfo = [
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "bh_fuBenDi01", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onSelectFuben },
            { ["index_type"]: eui.Label, ["name"]: name + "_name", ["parent"]: name + "_bg", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.ublack, ["x"]: 0, ["y"]: 11, ["w"]: w, ["h"]: 30, ["messageFlag"]: true },
            { ["index_type"]: eui.Group, ["name"]: name + "_actor_wnd", ["parent"]: name + "_bg", ["x"]: (w - 120) / 2, ["y"]: 80, ["w"]: 120, ["h"]: 150, ["messageFlag"]: true },
            { ["index_type"]: eui.Label, ["name"]: name + "_open_lv", ["parent"]: name + "_bg", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.red, ["x"]: 0, ["y"]: 201, ["w"]: w, ["h"]: 30, ["messageFlag"]: true },
            
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_tip1", ["parent"]: name + "_bg", ["image"]: "bh_text04", ["x"]: (w - 157) / 2, ["y"]: 200, ["w"]: 157, ["h"]: 31, ["messageFlag"]: true },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_tip2", ["parent"]: name + "_bg", ["image"]: "gk_text01", ["x"]: (w - 99) / 2, ["y"]: 201, ["w"]: 99, ["h"]: 28, ["messageFlag"]: true },
           
            { ["index_type"]: eui.Group, ["name"]: name + "_prize_wnd", ["x"]: (w - 166) / 2, ["y"]: 220, ["w"]: 166, ["h"]: 80 },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_select", ["title"]: null, ["font"]: null, ["image"]: "ty_xuanZhongKuang01", ["bAdapteWindow"]: true, ["color"]: null, ["x"]: -15, ["y"]: -15, ["w"]: w + 25, ["h"]: h + 25, ["messageFlag"]: true },
        ]
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, window)

        this.mElemList[name + "_select"].visible = false
        this.mElemList[name + "_open_lv"].visible = false

        this.mElemList[name + "_actor_view"] = UIActorView.newObj(this.mLayoutNode, name + "_actor_view", 60, 100, this.mElemList[name + "_actor_wnd"])

        for (let i = 0; i < 2; i++) {
            this.mElemList[name + "_itembox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_itembox_" + i, 16 + i * 70, 11, this.mElemList[name + "_prize_wnd"], 0.8)
        }
    }

    refreshItemWindow(window, data) {
        let name = window.name

        this.mElemList[name + "_name"].text = data.name
        //actorview
        let modelId = GetMonsterModel(data.monsterNpc)
        this.mElemList[name + "_actor_view"].updateByPlayer(modelId)

        let prize = data.first

        let record = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactInstZones) || {}
        let passList = record.passList || []
        let ispass = passList[data.Index - 1]
        if (ispass) { //首通达成
            this.mElemList[name + "_open_lv"].visible = false
            this.mElemList[name + "_tip1"].visible = false
            this.mElemList[name + "_tip2"].visible = true

            prize = data.fixPrize
        } else {
            //开启等级
            let clubInfo = ClubSystem.getInstance().getCurClubInfo()
            if (data.level > clubInfo.level) {
                this.mElemList[name + "_open_lv"].visible = true
                this.mElemList[name + "_tip1"].visible = false
                this.mElemList[name + "_tip2"].visible = false
                this.mElemList[name + "_open_lv"].text = String.format(Localize_cns("CLUB_TXT113"), data.level)
            } else {
                this.mElemList[name + "_open_lv"].visible = false
                this.mElemList[name + "_tip1"].visible = true
                this.mElemList[name + "_tip2"].visible = false
            }
        }

        let itemList = AnalyPrizeFormat(prize)
        for (let i = 0; i < 2; i++) {
            let v = itemList[i]
            if (v) {
                this.mElemList[name + "_itembox_" + i].updateByEntry(v[0], v[1])
            }
        }
    }

    updateRatePrize(data) {
        let prize = data.prizeShow
        let prizeList = AnalyPrizeFormat(prize)
        for (let i = 0; i < 6; i++) {
            let v = prizeList[i]
            if (v) {
                this.mElemList["itemBox_" + i].updateByEntry(v[0], v[1])
            }
        }

        this.mElemList["monster_level_text"].text = data.name
    }

    onSelectFuben(event: egret.TouchEvent) {
        let name = event.target.name
        let index = tonumber(name.replace(/[^0-9]/ig, ""))
        let data = this.list[index]

        for (let i = 0; i < size_t(this.list); i++) {
            let group = <eui.Group>this.mElemList["dungeon_group"]
            let window = this.scroll.getItemWindow(i, 185, group.height, 0, 0, 0)
            let wndname = window.name

            this.mElemList[wndname + "_select"].visible = false
            if (index == i) {
                this.mElemList[wndname + "_select"].visible = true
            }
        }

        this.select = index

        //几率掉落
        this.updateRatePrize(data)
    }

    changeIndexClicked(args) {

    }

    checkCardFight() {
        let clubInfo = ClubSystem.getInstance().getCurClubInfo()
        let clubLv = clubInfo.level

        let config = this.list[this.select]

        if (config.level > clubLv) {
            let str = String.format(Localize_cns("CLUB_TXT115"), config.level)
            MsgSystem.addTagTips(str)
            return false
        }
        return true
    }
}