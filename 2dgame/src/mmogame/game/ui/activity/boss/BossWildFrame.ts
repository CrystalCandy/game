// TypeScript file
class BossWildFrame extends BaseWnd {
    bossIndex: number
    timerList: any

    public initObj(...params: any[]) {
        this.timerList = {}
        this.mLayoutPaths = ["layouts/boss/BossWildLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true)

        let mElemInfo: any = [

            { ["name"]: "btn_fight",  ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight },
            { ["index_type"]: gui.Button, ["name"]: "btn_close", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["index_type"]: gui.Button, ["name"]: "btn_back", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
         //     { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_UIBg02", ["color"]: gui.Color.white, ["x"]: 30, ["y"]: 30, ["w"]: 540, ["h"]: 376, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.RichDisplayer, ["name"]: "emailMsg", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 44, ["y"]: 40, ["w"]: 480, ["h"]: 200, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.RichDisplayer, ["name"]: "prizePoint_rd", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 64, ["y"]: 260, ["w"]: 522, ["h"]: 60, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.Button, ["name"]: "confirmBtn", ["title"]: Localize_cns("SURE"), ["font"]: "ht_24_cc_stroke_saddlebrown", ["image"]: "ty_tongYongBt1", ["color"]: gui.Color.white, ["x"]: 215, ["y"]: 432, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickConfirmBtn },
        //     { ["index_type"]: gui.Button, ["name"]: "close_btn_top", ["title"]: null,  ["image"]: "ty_bt_back02", ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        //     { ["index_type"]: gui.Button, ["name"]: "close_btn", ["title"]: null,  ["image"]: "ty_bt_back04", ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ]
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);

        // let mElemInfo: any = [
		// 	{["index_type"]: gui.ProgressBar,   ["name"]: "boss_pro", ["title"]: "", ["font"]: null, ["image"]: "boss_loadingDi01", ["thumbImage"]: "boss_loading01", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 300, ["w"]: 174, ["h"]: 21, },
            
		// ]
		// UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
        // let imb = this.mElemList["boss_pro"]
        // UiUtil.updateProgress(imb, 50, 100)
        this.mElemList["boss_model"] = UIActorView.newObj(this.mLayoutNode, "boss_model", 100, 100, this.mElemList["boss_model_group"])
        this.mElemList["boss_model"].updateByPlayer(20001)

        this.mElemList["belong_to_rd"].setAlignFlag(gui.Flag.H_CENTER)

        AddRdContent(this.mElemList["boss_level_rd"], Localize_cns("BOSS_TXT28"), "ht_20_cc", "ublack")
        AddRdContent(this.mElemList["enter_request_rd"], Localize_cns("BOSS_TXT29"), "ht_20_cc", "ublack")
        AddRdContent(this.mElemList["escape_time_rd"], Localize_cns("BOSS_TXT30"), "ht_20_cc", "ublack")
        AddRdContent(this.mElemList["belong_to_rd"], Localize_cns("BOSS_TXT31"), "ht_20_cc", "white")
        AddRdContent(this.mElemList["rule_rd"], Localize_cns("BOSS_TXT32"), "ht_18_cc", "ublack")

        for (let i = 0; i < 5; i++) {
            this.mElemList["normal_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "normal_itemBox" + i, 150 + 85 * i, 10, this.mElemList["item_group"])
        }
        for (let i = 0; i < 5; i++) {
            this.mElemList["rare_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "rare_itemBox" + i, 150 + 85 * i, 95, this.mElemList["item_group"])
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)

        this.mLayoutNode.visible = (true)
        this.refreshFrame()
    }

    public onHide(): void {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false)

        for (let _ in this.timerList) {
            let timer = this.timerList[_]
            KillTimer(timer)
        }
        this.timerList = {}
    }




    refreshFrame() {
        for (let _ in this.timerList) {
            let timer = this.timerList[_]
            KillTimer(timer)
        }
        this.timerList = {}

        if (this.bossIndex == null) {
            return
        }
        let bossInfo = GetActivity(ActivityDefine.Boss).getActBossInfo(OrdinaryActivityIndex.WildBoss, this.bossIndex)
        // {occupierData: [plrId, name, sex, roleEntryId, overTime], status: opBossActivityConfig[OrdinaryActivityIndex.WildBoss], runTime: runTime}

        if (bossInfo == null) {
            return
        }

        let config = GameConfig.BossWildConfig[this.bossIndex]
        if (config == null) {
            return
        }
        //boss模型
        let monsterModelId = GetMonsterModel(config.entryId)
        this.mElemList["boss_model"].updateByPlayer(monsterModelId)

        //boss名字
        let monName = ""
        let conf = GameConfig.MonsterConfig[config.entryId]
        if (conf) {
            monName = conf.Name
        }
        this.mElemList["boss_name"].text = monName

        AddRdContent(this.mElemList["boss_level_rd"], String.format(Localize_cns("BOSS_TXT28"), config.level), "ht_20_cc", "ublack")

        //进入条件
        if (bossInfo.status == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].killStatus) {
            AddRdContent(this.mElemList["enter_request_rd"], String.format(Localize_cns("BOSS_TXT29"), "#red" + Localize_cns("BOSS_TXT43")), "ht_20_cc", "ublack")
            AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT45")), "ht_20_cc", "ublack")
        } else {
            AddRdContent(this.mElemList["enter_request_rd"], String.format(Localize_cns("BOSS_TXT29"), Localize_cns("BOSS_TXT44")), "ht_20_cc", "ublack")

            if (bossInfo.status == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].runStatus) {
                AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT46")), "ht_20_cc", "ublack")
            } else {
                var runTime = bossInfo.runTime
                let tick = function(delay) {
                    let leftTime = runTime - GetServerTime()
                    if (leftTime >= 0) {
                        AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), getFormatDiffTimeSimple(leftTime)), "ht_20_cc", "ublack")
                    } else {
                        AddRdContent(this.mElemList["escape_time_rd"], String.format(Localize_cns("BOSS_TXT30"), Localize_cns("BOSS_TXT46")), "ht_20_cc", "ublack")

                        if (this.timerList["escape"]) {
                            KillTimer(this.timerList["escape"])
                            this.timerList["escape"] = null
                        }
                    }
                }
                if (!this.timerList["escape"]) {
                    this.timerList["escape"] = SetTimer(tick, this, 200, true)
                }
            }
        }

        for (let i = 0; i < 5; i++) {
            if (config.itemShow[i]) {
                this.mElemList["normal_itemBox" + i].setVisible = true
                this.mElemList["normal_itemBox" + i].updateByEntry(config.itemShow[i])
            } else {
                
                this.mElemList["normal_itemBox" + i].setVisible = false
            }
            
        }
        for (let i = 0; i < 5; i++) {
            if (config.rareItemShow[i]) {
                this.mElemList["rare_itemBox" + i].setVisible = true
                this.mElemList["rare_itemBox" + i].updateByEntry(config.rareItemShow[i])
            } else {
                
                this.mElemList["rare_itemBox" + i].setVisible = false
            }
        }

        //当前归属
        if (bossInfo.occupierData && size_t(bossInfo.occupierData) > 0) {
            let iconName = GetActorImageName(bossInfo.occupierData[3], bossInfo.occupierData[2])
            this.mElemList["rule_icon"].source = iconName

            var overTime = bossInfo.occupierData[4]
            var plrName = bossInfo.occupierData[1]
            let tick = function(delay) {
                let leftTime = overTime - GetServerTime()
                if (leftTime >= 0) {
                    AddRdContent(this.mElemList["belong_to_rd"], String.format(Localize_cns("BOSS_TXT31"), plrName + "(" + getFormatDiffTimeSimple(leftTime) + ")"), "ht_20_cc_stroke", "white")
                } else {
                    AddRdContent(this.mElemList["belong_to_rd"], String.format(Localize_cns("BOSS_TXT31"), plrName), "ht_20_cc_stroke", "white")

                    if (this.timerList["belong"]) {
                        KillTimer(this.timerList["belong"])
                        this.timerList["belong"] = null
                    }
                }
            }
            if (!this.timerList["belong"]) {
                this.timerList["belong"] = SetTimer(tick, this, 200, true)
            }
        } else {
            this.mElemList["rule_icon"].source = ""
            AddRdContent(this.mElemList["belong_to_rd"], "", "ht_20_cc_stroke", "white")
        }
    }

    updateWnd() {
        this.refreshFrame()
    }

     //////////////////////////////////////////
	geRenCheck() {
		return true
	}

    quanMinCheck() {
        return true
    }

    onClickFight(args) {
        if (this.bossIndex == null) {
            return
        }

        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (CheckFightState() == true) {
            return
        }
        
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.WildBoss, this.bossIndex)
    }
    ////////////////////////////公共接口
    showWildFrame(bossIndex) {
        if (bossIndex != null) {
            this.bossIndex = bossIndex
            this.showWnd()

            RpcProxy.call("C2G_GetBossIndexData", OrdinaryActivityIndex.WildBoss, bossIndex)
        }
    }
}