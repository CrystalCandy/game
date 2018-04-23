// TypeScript file
class ChampionArenaWindow extends BaseCtrlWnd {
    mElemList;
    timer: number;
    record: number;
    info: any;

    public initObj(...params: any[]) {
        this.timer = null
        this.record = 0
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        var elemInfo = [
            { ["name"]: "btn_rank", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRankClick },
            { ["name"]: "btn_challenge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChallengeClick },
            { ["name"]: "btn_shop", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShop },
            { ["name"]: "buy_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "ms_pic", ["messageFlag"]: true },
            { ["name"]: "tips_txt", ["color"]: gui.Color.lime },
        ]

        for (let i = 0; i < 5; i++) {
            JsUtil.arrayInstert(elemInfo, { ["name"]: "floor" + i, ["title"]: null, ["messageFlag"]: true })
            JsUtil.arrayInstert(elemInfo, { ["name"]: "group_" + i, ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFighter })

            this.mElemList["ui_actor_" + i] = UIActorView.newObj(this.mLayoutNode, "ui_actor_" + i, 50, 100, this.mElemList["actor_view" + i])
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        for (let i = 0; i < 2; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox" + i, 0, 0, this.mElemList["prize_wnd" + i])
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.CHAMPION_REFRESH, this.refreshFrame, this)
        this.mElemList["arena_wnd"].visible = true
        this.sendArenaRequest()
        //this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.CHAMPION_REFRESH, this.refreshFrame, this)
        this.mElemList["arena_wnd"].visible = false

        this.clearCoodTime()
    }

    sendArenaRequest() {
        RpcProxy.call("C2G_GetChampionData")
    }

    refreshFrame() {
        let a = GetActivity(ActivityDefine.Champion)
        let info = a.getChampionInfo()
        this.info = info

        //更新挑战次数
        this.startChallengeCount(info.count || 0, info.time || 0)

        //更新玩家数据
        let list = info.list
        table_sort(list, function (a, b) { return a.rank - b.rank })
        for (let i in list) {
            this.updateActorWnd(list[i], i)
        }

        //更新自己排名
        let rank = info.rank
        this.mElemList["batch_rank"].beginDraw();
        this.mElemList["batch_rank"].drawNumberString("vip_", rank, 0, 0, -3)
        this.mElemList["batch_rank"].endDraw();
        //更新自己战力
        let force = info.force
        this.mElemList["batch_force"].beginDraw();
        this.mElemList["batch_force"].drawNumberString("zhanLi_", "l" + force, 0, 0, -3)
        this.mElemList["batch_force"].endDraw();
        //更新自己的奖励
        let prize = a.getDailyPrizeItemList()
        if (prize) {
            let point = prize.point(rank)
            let pointIcon = prize.pointIcon
            let bind = prize.bindCurrency(rank)
            let bindIcon = prize.bindIcon
            this.mElemList["itemBox0"].updateByEntry(bindIcon, bind)
            this.mElemList["itemBox1"].updateByEntry(pointIcon, point)
        }
    }

    startChallengeCount(_count, _time) {
        let count = _count
        this.record = _time//服务器记录的倒计时

        this.clearCoodTime()

        //是否满
        let str = ""
        if (count >= defaultValue.CHAMPION_CHALLENGE_COUNT) {
            str = String.format(Localize_cns("JJC_TXT5"), count)
        } else {
            this.timer = GameTimer.getInstance().setTimer(this.updateChallengeWnd, this, 200)

            str = String.format(Localize_cns("JJC_TXT5"), count)
            str = str + "#br#white" + getFormatDiffTime(this.record - GetServerTime())
        }
        AddRdContent(this.mElemList["count_rd"], str, "ht_24_cc_stroke", "white", 3)
    }

    updateChallengeWnd(delay) {
        let a = GetActivity(ActivityDefine.Champion)
        let info = a.getChampionInfo()
        let count = info.count
        let record = this.record - GetServerTime()

        let str = ""
        if (record <= 0) {
            this.clearCoodTime()
            str = String.format(Localize_cns("JJC_TXT5"), count)
        } else {
            str = String.format(Localize_cns("JJC_TXT5"), count)
            str = str + "#br#white" + getFormatDiffTime(record)
        }
        AddRdContent(this.mElemList["count_rd"], str, "ht_24_cc_stroke", "white", 3)
    }

    clearCoodTime() {
        if (this.timer) {
            GameTimer.getInstance().killTimer(this.timer)
            this.timer = null
        }
    }

    updateActorWnd(info, index) {
        //更新排名
        this.mElemList["batch_rank" + index].beginDraw();
        this.mElemList["batch_rank" + index].drawNumberString("vip_", info.rank, 0, 0)
        this.mElemList["batch_rank" + index].endDraw();

        //更新战力
        this.mElemList["batch_force" + index].beginDraw();
        this.mElemList["batch_force" + index].drawNumberString("zhanLi_", "z" + info.force, 0, 0)
        this.mElemList["batch_force" + index].endDraw();

        //更新actor_view
        this.updateActorModel(info.role, info.sex, index)

        //更新名字
        this.mElemList["name" + index].text = info.name
    }

    updateActorModel(voc, sex, index) {
        let modeID = GetProfessionModel(voc, sex)
        this.mElemList["ui_actor_" + index].updateByPlayer(modeID)
    }

    onClickFighter(args: egret.TouchEvent) {
        let name = args.target.name
        let index = name.replace(/[^0-9]/ig, "");
        let info = this.info.list[index]
        if (info) {
            if (info.id == GetHeroProperty("id")) {
                MsgSystem.addTagTips(Localize_cns("JJC_TXT7"))
            } else {
                RpcProxy.call("C2G_ChampionFight", info.rank, info.name, info.id)
            }
        }
    }

    onRankClick() {
        WngMrg.getInstance().showWindow("ChampionRankFrame");
    }

    onChallengeClick() {
        WngMrg.getInstance().showWindow("ChampionRecordFrame");
    }

    onClickShop() {
        let wnd = WngMrg.getInstance().getWindow("ShopJingJiFrame");
        wnd.showWithIndex(0);
    }
}