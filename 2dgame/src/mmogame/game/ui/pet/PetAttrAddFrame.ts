class PetAttrAddFrame extends BaseWnd {
    petId: number;
    Player: Player;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/Pet/PetAttrAddLayout.exml"]

        this.petId = -1
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "btn_close", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true)
        this.refreshFrame()
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)

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

        //更新战力
        let force = GetForceMath(GetSumPetProperty())
        DrawNumberStringImage(this.mElemList["force_num"], "zhanLi_", "z" + force, 0, 0, -3)

        let str = ""
        //更新激活总属性
        var effect = GetSumPetLvProperty()
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]
        AddRdContent(this.mElemList["hp_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]
        AddRdContent(this.mElemList["att_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]
        AddRdContent(this.mElemList["def_rd"], str, "ht_24_cc", "ublack")

        //更新资质总属性
        var effect = GetSumPetGrowProperty()
        str = GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]
        AddRdContent(this.mElemList["grow_hp_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_ATTACK) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]
        AddRdContent(this.mElemList["grow_att_rd"], str, "ht_24_cc", "ublack")
        str = GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + "#lime" + effect[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]
        AddRdContent(this.mElemList["grow_def_rd"], str, "ht_24_cc", "ublack")

        //更新模型
        this.updateActorModel()
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
        actor.setDir(1)
    }

    showPetAttrAddWithId(petId) {
        this.petId = petId
        this.showWnd()
    }
}