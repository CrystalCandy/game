class CopyTempleWindow extends BaseCtrlWnd {
    controlDataTable: any;
    maxIndex: number

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.maxIndex = 11
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
            { ["name"]: "leiyin_fight_btn",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight },
            
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let txt = ""
        let colorList = ["#orange", "#magenta", "#cyan"]
        //通关奖励
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                this.mElemList["leiyin_itemBox_" + i + "_" + j] = UIItemBox.newObj(this.mLayoutNode,  "leiyin_itemBox_" + i + "_" + j, 10 + 82 * j, 105, this.mElemList["leiyin_copy_group" + i])
            }

            this.mElemList["leiyin_icon" + i] = UIActorView.newObj(this.mLayoutNode, "leiyin_icon" + i, 71, 60, this.mElemList["leiyin_copy_mon_group" + i])
            this.mElemList["leiyin_icon" + i].updateByPlayer(20001)

            txt = txt + colorList[i] + String.format(Localize_cns("COPY_TXT19"), Localize_cns("COPY_TXT18"), 199) + "#br"
        }

        AddRdContent(this.mElemList["leiyin_rank_rd"], txt, "ht_20_cc_stroke", "white", 5)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["leiyin_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT3")

        this.refreshFrame()
        this.applyActInfo()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["leiyin_group"].visible = false
    }
    
    refreshFrame() {
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.SmallThunderTemple)
        // {
        //         maxIndex: 最新通关关卡
        // }
        let maxIndex = 10
        if (actInfo && actInfo.maxIndex != null && actInfo.maxIndex != 0) {
            maxIndex = actInfo.maxIndex
        }
        this.maxIndex = maxIndex

        let list = []
        for (let _ in GameConfig.CopyTempleConfig) {
            let config = GameConfig.CopyTempleConfig[_]
            table_insert(list, config)
        }
        table_sort(list, function(a, b) {return a.index - b.index})
        
        let flag = false
        let t = []
        for (let i = 0; i < list.length; i++) {
            table_insert(t, list[i])

            if (list[i].index == maxIndex + 1) {
                flag = true
            }

            if (t.length == 3) {
                if (flag == true) {
                    break
                }
                t = []
            }
        }

        if (flag == false) {
            this.maxIndex = -1
            this.mElemList["leiyin_fight_btn"].visible = false
        } else {
            this.mElemList["leiyin_fight_btn"].visible = true
        }

        for (let i = 0; i < 3; i++){
            if (t[i]) {
                this.mElemList["leiyin_copy_group" + i].visible = true

                let config = t[i]
                let monsterModelId = GetMonsterModel(config.entryId)
                this.mElemList["leiyin_icon" + i].updateByPlayer(monsterModelId)

                let l = AnalyPrizeFormat(config.showItem)
                for (let j = 0; j < 2; j++) {
                    if (!l[j]) {
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].setVisible(false)
                    } else {
                        let [entryId, count] = l[j]
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].setVisible(true)
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].updateByEntry(entryId, count)
                    }
                }

                this.mElemList["leiyin_copy_name" + i].text = config.copyName
                this.mElemList["leiyin_copy_pass" + i].visible = config.index <= maxIndex
            } else {
                this.mElemList["leiyin_copy_group" + i].visible = false
            }
        }
    }

    updateWnd() {
        this.refreshFrame()
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.SmallThunderTemple)
    }

    ///////////////////////////////////////////////////////////////////////
    onClickFight(args) {
        if (CheckFightState() == true) {
            return
        }
        
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.SmallThunderTemple, this.maxIndex + 1)
    }
}