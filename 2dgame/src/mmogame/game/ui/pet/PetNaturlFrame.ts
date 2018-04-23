class PetNaturlFrame extends BaseWnd {
    petId: number;
    Player: Player;
    isAuto: boolean;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/pet/PetNaturlLayout.exml"]

        this.isAuto = false
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "up_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
            { ["name"]: "auto_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAutoUpgrade },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 0, this.mElemList["item_wnd"])

        this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        this.mLayoutNode.visible = true;
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        this.mLayoutNode.visible = false;

        if (this.Player) {
            let actorview = this.mElemList["actor_view"]
            this.Player.leaveViewer(actorview)
            this.Player.deleteObj()
            this.Player = null
        }
    }

    refreshFrame() {
        let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

        //资质
        let growCount = petNetInfo.growexp
        let growInfo = PetSystem.getInstance().getPetGrowInfo(this.petId)

        //更新资质战力
        let force = GetForceMath(GetPetGrowProperty(this.petId))
        this.mElemList["force_num"].beginDraw();
        this.mElemList["force_num"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
        this.mElemList["force_num"].endDraw();

        //更新类型（金木水火土）
        let elemType = petConfigInfo.type
        let elemStr = GetElemIcon(elemType)
        let elemValue = petConfigInfo.typeNum
        AddRdContent(this.mElemList["elem_rd"], "#" + elemStr + "#rf" + elemValue, "ht_24_cc", "ublack")

        //更新资质等级
        let level = PetSystem.getInstance().getPetGrowLevel(this.petId, growCount)
        this.mElemList["level_txt"].text = Localize_cns("NATURL_" + level)

        //更新品质和名称
        let quality = petConfigInfo.quality
        let sr = petConfigInfo.sr
        let icon = GetPetSRIcon(sr)
        let name = petNetInfo.name || petConfigInfo.name
        AddRdContent(this.mElemList["name_rd"], "#" + icon + name, "ht_24_cc_stroke", "white")

        //actor_view
        this.updateActorModel()

        let str = ""
        //资质属性
        var effect = GetPetGrowProperty(this.petId)
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack")

        //更新进度条
        UiUtil.updateProgress(this.mElemList["exp_progress"], growCount, level)

        //更新消耗材料
        let itemId = growInfo.itemid
        this.mElemList["itemBox"].updateByEntry(itemId)
        let itemName = ItemSystem.getInstance().getItemName(itemId)
        let itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0
        let needCount = growInfo.itemnum
        let color = GetQualityColorStr(quality)
        let itemcolor = itemCount >= needCount ? "#lime" : "#red"
        AddRdContent(this.mElemList["card_rd"], "#" + color + itemName + Localize_cns("PET_TXT23") + itemcolor + "（" + itemCount + "/" + needCount + "）", "ht_24_cc", "ublack", 10)

        if (this.isAuto && itemCount > 0) {
            this.sendUpgradeRequest()
        }
    }

    updateActorModel() {
        let modeID = GetPetModel(this.petId)
        let actorview = this.mElemList["actor_view"]
        let actor = this.Player || Player.newObj()
        actor.loadModel(modeID)
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 60)
        actor.enterViewer(actorview)

        //缩放
        actor.setScale(1.0)
        //方向
        actor.setDir(3)
    }

    onClickUpgrade(args) {
        let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

        let itemId = petConfigInfo.itemid
        let itemName = ItemSystem.getInstance().getItemName(itemId)
        let itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0

        if (itemCount > 0) {
            this.sendUpgradeRequest()
        } else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"))
        }
    }

    onClickAutoUpgrade(args) {
        let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.petId)
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.petId)

        let itemId = petConfigInfo.itemid
        let itemName = ItemSystem.getInstance().getItemName(itemId)
        let itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0

        if (itemCount > 0) {
            this.isAuto = true
            this.sendUpgradeRequest()
        } else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"))
        }

    }

    sendUpgradeRequest() {
        RpcProxy.call("C2G_ACTOR_PET_GROW_UP", this.petId)
    }

    ///////////////////////////////////
    onShowWithPetId(petId) {
        this.petId = petId
        this.showWnd()
    }
}