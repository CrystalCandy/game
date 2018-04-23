class PetUpgradeWindow extends BaseCtrlWnd {
    mElemList;
    petId: number;
    scroll: UIScrollList;
    showTimer: number;

    public initObj(...params: any[]) {
        this.petId = 0
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
            { ["name"]: "ug_pokedex_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPokedex }, //图鉴
            { ["name"]: "ug_force_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickForceBtn },
            { ["name"]: "ug_btn_show", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShow },
            { ["name"]: "ug_btn_embattle", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEmbattle },
            { ["name"]: "ug_btn_natural", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNatural },
            { ["name"]: "ug_btn_changename", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChangeName },
            { ["name"]: "up_add_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAddition },
            { ["name"]: "upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
            { ["name"]: "auto_upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAutoUpgrade }, //自动升级
            { ["name"]: "active_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickActive },

            { ["name"]: "top_left_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickLeft },
            { ["name"]: "top_right_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRight },

            { ["name"]: "card_gain", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickGain },

            { ["name"]: "ug_skill_txt", ["messageFlag"]: true },
        ];

        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        this.mElemList["up_actor_view"] = UIActorView.newObj(this.mLayoutNode, "up_actor_view", 60, 150, this.mElemList["ug_actor_wnd"])

        this.mElemList["gain_box"] = UIGainBox.newObj(this.mLayoutNode, "gain_box", 0, 0, this.mElemList["unactive_exp_wnd"])

        let group = <eui.Group>this.mElemList["skill_wnd"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON)

        this.mElemList["skillBox"] = UISkillBox.newObj(this.mLayoutNode, "skillBox", 0, 0, this.mElemList["ug_skill_bg"])

        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 180, 40, this.mElemList["unactive_exp_wnd"])

        this.mElemList["elem_rd"].setAlignFlag(gui.Flag.H_CENTER)
        this.mElemList["ug_name_rd"].setAlignFlag(gui.Flag.H_CENTER)
        this.mElemList["exp_material_rd"].setAlignFlag(gui.Flag.H_CENTER)
        this.mElemList["ug_sum_pet"].setAlignFlag(gui.Flag.RIGHT)

        this.mElemList["ug_sign_wnd"].visible = false
        this.mElemList["ug_level_wnd"].visible = false
    }

    public onUnLoad(): void {
        if (this.showTimer) {
            GameTimer.getInstance().killTimer(this.showTimer)
            this.showTimer = null
        }
    }

    public onShow(): void {
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["top_group"].visible = true
        this.mElemList["upgrade_group"].visible = true

        this.mElemList["title"].text = Localize_cns("PET_TXT1")

        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["top_group"].visible = false
        this.mElemList["upgrade_group"].visible = false
    }

    refreshFrame() {
        if (this.petId <= 0) {
            this.petId = this.mParentWnd.selectId
        }

        let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

        let unlock = false

        //宠物激活
        if (petNetInfo) {
            unlock = true
        }

        //更新战力
        let force = petNetInfo ? petNetInfo.force : GetForceMath(GetPetProperty(this.petId))
        DrawNumberStringImage(this.mElemList["ug_force_num"], "zhanLi_", "z" + force, 0, 0, -3)

        //更新类型（金木水火土）
        let elemType = petConfigInfo.type
        let elemStr = GetElemIcon(elemType)
        let elemValue = petConfigInfo.typeNum
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack")

        //未激活和等级
        if (unlock) {
            this.mElemList["ug_sign_wnd"].visible = false
            this.mElemList["ug_level_wnd"].visible = true
            this.mElemList["ug_level_txt"].text = petNetInfo.stage + Localize_cns("PET_TXT9")
        } else {
            this.mElemList["ug_sign_wnd"].visible = true
            this.mElemList["ug_level_wnd"].visible = false
        }

        //更新模型
        this.updateActorModel()

        //更新品质和名称
        let quality = petConfigInfo.quality
        let sr = petConfigInfo.sr
        let icon = GetPetSRIcon(sr)
        let name = petConfigInfo.name
        if (unlock && petNetInfo.name != null && petNetInfo.name != "") {
            name = petNetInfo.name
        }
        AddRdContent(this.mElemList["ug_name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white")

        //更新技能
        if (unlock) {
            this.mElemList["active_up_wnd"].visible = true
            this.mElemList["skill_wnd"].visible = false

            //更新上阵按钮的状态
            let combatPos = petNetInfo.combatpos || opPetCombatPos.Rest
            let btn = <gui.Button>this.mElemList["ug_btn_embattle"]
            if (combatPos == opPetCombatPos.Rest) { //休息
                btn.text = Localize_cns("PET_SIGN_TXT2")
                btn.source = "ty_tongYongBt8"
            } else { //出战 备战
                btn.text = Localize_cns("PET_SIGN_TXT1")
                btn.source = "ty_tongYongBt7"
            }

            //更新主动技能
            this.mElemList["skillBox"].updatePetSkill(petConfigInfo.skillid)
        } else {
            this.mElemList["active_up_wnd"].visible = false
            this.mElemList["skill_wnd"].visible = true

            let activeSkillId = petConfigInfo.skillid
            let passiveSkillList = petConfigInfo.passiveskill
            let skillList = []
            JsUtil.arrayInstert(skillList, activeSkillId)
            for (let i in passiveSkillList) {
                JsUtil.arrayInstert(skillList, passiveSkillList[i])
            }
            let scroll = this.scroll
            scroll.clearItemList()
            for (let k = 0; k < size_t(skillList); k++) {
                let skillId = skillList[k]
                let window = scroll.getItemWindow(k, 90, 90, 0, 0)
                this.initItemWindow(window)
                this.refreshItemWindow(window, skillId, k)
            }
            scroll.refreshScroll()
        }

        //更新总战力和激活宠物总数
        force = s_GetSumPetForce() || GetForceMath(GetSumPetProperty())
        AddRdContent(this.mElemList["ug_sum_force"], Localize_cns("PET_TXT17") + force, "ht_22_cc", "ublack")
        let activeList = PetSystem.getInstance().getPetActiveList()
        let count = size_t(activeList)
        AddRdContent(this.mElemList["ug_sum_pet"], Localize_cns("PET_TXT18") + count, "ht_22_cc", "ublack")

        //更新加成按钮
        if (unlock) {
            this.mElemList["up_add_btn"].visible = true
        } else {
            this.mElemList["up_add_btn"].visible = false
        }

        if (unlock) {
            this.mElemList["active_exp_wnd"].visible = true
            this.mElemList["unactive_exp_wnd"].visible = false

            //更新经验进度条
            let key = cellOptionsName[cellOptionsIndex.Pet - 1]
            let stage = petNetInfo.stage
            let maxExp = GameConfig.FunUpgradeStageConfig[key][stage].maxexp
            let curExp = petNetInfo.stageexp
            UiUtil.updateProgress(this.mElemList["ug_exp_pro"], curExp, maxExp)

            //更新升级消耗材料
            let material = FunSystem.getInstance().getFunUpgradeMaterial(cellOptionsIndex.Pet, stage)
            let str = Localize_cns("PET_TXT4") + "#space_10"
            let ownCount = ItemSystem.getInstance().getItemCount(material.itemId)
            let itemColor = ownCount >= material.itemNum ? "#lime" : "#red"
            str = str + GetTagIcon(material.itemId) + itemColor + ownCount + "/" + material.itemNum + "#space_10"
            let moneyColor = GetHeroProperty("funds") >= material.money ? "#lime" : "#red" //暂时用金币代替
            str = str + GetMoneyIcon(material.moneyUni) + moneyColor + material.money
            AddRdContent(this.mElemList["exp_material_rd"], str, "ht_24_cc", "ublack")
        } else {
            this.mElemList["active_exp_wnd"].visible = false
            this.mElemList["unactive_exp_wnd"].visible = true

            //更新未激活和材料
            let itemId = petConfigInfo.itemid
            let itemName = ItemSystem.getInstance().getItemName(itemId)
            let itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0
            let needCount = petConfigInfo.itemnum
            let color = GetQualityColorStr(quality)
            this.mElemList["itemBox"].updateByEntry(itemId)
            let itemColor = itemCount >= needCount ? "#lime" : "#red"
            AddRdContent(this.mElemList["active_card_rd"], "#" + color + itemName + Localize_cns("PET_TXT23") + itemColor + "（" + itemCount + "/" + needCount + "）", "ht_24_cc", "ublack", 10)
            if (itemCount == 0) {//没有物品显示获取方式
                this.mElemList["active_btn"].visible = false
                this.mElemList["card_gain"].visible = true
            } else {//有物品显示激活按钮
                this.mElemList["active_btn"].visible = true
                this.mElemList["card_gain"].visible = false
            }
        }

        this.checkAutoUpgrade(this.mElemList["auto_upgrade_btn"])
    }

    initItemWindow(window) {
        let name = window.name

        this.mElemList["skillBox_" + name] = UISkillBox.newObj(this.mLayoutNode, "skillBox_" + name, 0, 0, window, 0.9)
    }

    refreshItemWindow(window, skillId, k) {
        let name = window.name

        this.mElemList["skillBox_" + name].updatePetSkill(skillId)
    }

    updateActorModel() {
        let modeID = GetPetModel(this.petId)
        let actorview = <UIActorView>this.mElemList["up_actor_view"]
        let actor = actorview.updateByPlayer(modeID)
    }

    /////////////////////////////响应函数/////////////////////////////
    onClickPokedex(event: egret.TouchEvent) {
        WngMrg.getInstance().showWindow("PetListFrame")
    }

    onClickForceBtn(event: egret.TouchEvent) {
        let wnd = WngMrg.getInstance().getWindow("PetAttributeFrame")
        wnd.showPetAttributeWithId(this.petId)
    }

    //展示
    onClickShow(event: egret.TouchEvent) {
        if (this.showTimer) {
            GameTimer.getInstance().killTimer(this.showTimer)
            this.showTimer = null
        }

        RpcProxy.call("C2G_ACTOR_PET_SHOW", this.petId)

        let limit = 60
        this.mElemList["ug_btn_show"].touchEnabled = false
        this.mElemList["ug_btn_show"].source = "ty_tongYongBt8"
        this.mElemList["ug_btn_show"].text = limit + "s"
        this.showTimer = GameTimer.getInstance().setTimer(function (this, delay) {
            limit = limit - 1
            this.mElemList["ug_btn_show"].text = limit + "s"
            if (limit <= 0) {
                GameTimer.getInstance().killTimer(this.showTimer)
                this.showTimer = null
                this.mElemList["ug_btn_show"].source = "ty_tongYongBt7"
                this.mElemList["ug_btn_show"].text = Localize_cns("ZHANSHI")
                this.mElemList["ug_btn_show"].touchEnabled = true

                limit = 60 //注意重置时间
            }
        }, this, 1000)
    }

    //上阵 休息
    onClickEmbattle(event: egret.TouchEvent) {
        let info = PetSystem.getInstance().getPetInfo(this.petId)
        if (info) {
            let combatPos = info.combatpos || opPetCombatPos.Rest
            if (combatPos == opPetCombatPos.Rest) { //休息
                let wnd = WngMrg.getInstance().getWindow("PetEmbattleFrame")
                wnd.showWithPetId(this.petId)
            } else { //出战 备战
                //直接休息           
                RpcProxy.call("C2G_ACTOR_PET_COMBAT_SET", this.petId, opPetCombatPos.Rest)
            }
        }
    }

    //资质
    onClickNatural(event: egret.TouchEvent) {
        let wnd = WngMrg.getInstance().getWindow("PetNaturlFrame")
        wnd.onShowWithPetId(this.petId)
    }

    //改名
    onClickChangeName(event: egret.TouchEvent) {
        let wnd = WngMrg.getInstance().getWindow("PetChangeNameFrame")
        wnd.onShowWithPetId(this.petId)
    }

    //属性加成
    onClickAddition(event: egret.TouchEvent) {
        let wnd = WngMrg.getInstance().getWindow("PetAttrAddFrame")
        wnd.showPetAttrAddWithId(this.petId)
    }

    onClickUpgrade(event: egret.TouchEvent) {
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)
        //消耗材料
        let itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].itemid
        let ownItemCount = ItemSystem.getInstance().getItemCount(itemId)
        let needItemCount = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].itemnum

        //消耗货币
        let moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].moneyunit
        let ownMoney = GetHeroMoney(moneyUnit) 
        let costMoney = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petNetInfo.stage].money

        //判断货币是否足够
        if (ownMoney < costMoney) {
            //直接弹出对应的货币购买界面
            MsgSystem.addTagTips("NO_MONEY")

            this.mElemList["auto_upgrade_btn"].text = Localize_cns("PET_AUTO_UPGRADE")
            this.mElemList["auto_upgrade_btn"].selected = false
            this.mElemList["upgrade_btn"].enabled = true
            return
        }

        //判断材料是否足够
        if (ownItemCount < needItemCount) {
            //弹出材料购买界面
            let quickWnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
            quickWnd.onShowWnd(itemId, true);

            this.mElemList["auto_upgrade_btn"].text = Localize_cns("PET_AUTO_UPGRADE")
            this.mElemList["auto_upgrade_btn"].selected = false
            this.mElemList["upgrade_btn"].enabled = true
        } else {
            let autoBuy = this.mElemList["auto_box"].selected ? 1 : 0
            RpcProxy.call("C2G_ACTOR_PET_UPGRADE", this.petId, autoBuy)
        }
    }

    onClickAutoUpgrade(event: egret.TouchEvent) {
        let btn = event.target
        btn.selected = !btn.selected

        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)
        btn.level = petNetInfo.stage || 0

        if (btn.selected) {
            btn.text = Localize_cns("STOP")
            this.mElemList["upgrade_btn"].enabled = false
        } else {
            btn.text = Localize_cns("PET_AUTO_UPGRADE")
            this.mElemList["upgrade_btn"].enabled = true
        }

        this.checkAutoUpgrade(btn)
    }

    checkAutoUpgrade(btn) {
        if (btn.selected) {
            let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)
            let curLv = petNetInfo.stage || 0
            let oldLv = btn.level || 0
            if (curLv == oldLv) {
                this.onClickUpgrade(null)
            } else {
                btn.text = Localize_cns("PET_AUTO_UPGRADE")
                this.mElemList["upgrade_btn"].enabled = true
                btn.selected = false
            }
        }
    }

    //激活
    onClickActive(event: egret.TouchEvent) {
        RpcProxy.call("C2G_ACTOR_PET_UNLOCK", this.petId)
    }

    onClickLeft() {
        this.mParentWnd.petListBox.leftMove()
    }

    onClickRight() {
        this.mParentWnd.petListBox.rightMove()
    }

    onClickGain() {
        let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

        if (petNetInfo) {
            return
        } else {
            let itemId = petConfigInfo.itemId

            let wnd: QuickGainFrame = WngMrg.getInstance().getWindow("QuickGainFrame")
            let itemConfig: any = [["item", itemId], ["PetFrame"]]
            wnd.showQuickGainFrame(itemConfig)
        }
    }

    /////////////////////////////////////////////////////////////
    refreshFrameWithIndex(petId) {
        this.petId = petId

        this.refreshFrame()
    }
}