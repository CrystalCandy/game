class FunSkillFrame extends BaseWnd {
    funType: number;
    index: number;
    typeList:number[]

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/usual/FunSkillLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade }
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 162, 490)
        this.mElemList["itemBox"].setVisible(false)

        this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true)
        if(this.typeList == null){
            this.refreshFrame()
        }else{
            this.refreshListFrame()
        }
        
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(true)
        this.typeList = null
        this.funType = null
        this.index = null
    }

    refreshFrame() {
        for (let i = 0; i < 4; i++) {
            if (this.mElemList["skillBox_" + i] == null) {
                this.mElemList["skillBox_" + i] = UIFunSkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["skill_group"], 0.9)
                this.mElemList["skillBox_" + i].setClickCallBack(this.updateSelet, this, i)
            }

            this.mElemList["skillBox_" + i].updateFunSkill(this.funType, i)
        }

        this.updateSelet()
    }

    refreshListFrame() {
        for (let i = 0; i < size_t(this.typeList); i++) {
            if (this.mElemList["skillBox_" + i] == null) {
                this.mElemList["skillBox_" + i] = UIFunSkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["skill_group"], 0.9)
                this.mElemList["skillBox_" + i].setClickCallBack(this.updateSelet, this, i)
            }

            this.mElemList["skillBox_" + i].updateFunSkill(this.typeList[i], 0)
        }

        this.updateSelet()
    }

    updateSelet(index?) {
        if (index != null) {
            this.index = index
        }
        if(this.typeList != null){
            this.funType = this.typeList[this.index]
        }

        for (let i = 0; i < 4; i++) {
            this.mElemList["skillBox_" + i].select(false)
        }
        this.mElemList["skillBox_" + this.index].select(true)

        let skillConfigInfo 
        if(this.typeList == null){
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, this.index + 1)
        }else{
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, 1)
        }
         

        let funInfo = FunSystem.getInstance().getFunInfoWithType(this.funType) || {}
        let skillList = funInfo.skilllevellist || []
        let skillLevel
        if(this.typeList != null){
             skillLevel = skillList[0] || 0
        }else{
             skillLevel = skillList[this.index] || 0
        }
       

        let skillname = skillConfigInfo.skillName
        if (skillLevel == 0) { //未解锁
            AddRdContent(this.mElemList["name_rd"], skillname, "ht_24_cc", "white")

            this.mElemList["up_title"].text = Localize_cns("PET_TXT14")
            this.mElemList["down_title"].text = Localize_cns("PET_TXT15")

            //激活效果
            let effects = table_effect(skillConfigInfo.effects)
            var str = ""
            for (let k in effects) {
                let proName = GetPropertyName(abilityNameToIndex[k])
                let proValue = effects[k]
                str += Localize_cns("SKILL_TXT6") + proName + proValue + "#space_40"
            }
            AddRdContent(this.mElemList["cur_attr_rd"], str, "ht_24_cc", "gray")
            //解锁条件
            let unlock = skillConfigInfo.UnlockLevel
            var str = "#red" + Localize_cns(cellOptionsName[this.funType - 1]) + String.format(Localize_cns("PET_TXT16"), unlock)
            AddRdContent(this.mElemList["next_attr_rd"], str, "ht_24_cc", "ublack")

            this.mElemList["itemBox"].setVisible(false)
            this.mElemList["material_rd"].visible = (false)
            this.mElemList["btn_upgrade"].visible = (false)
            this.mElemList["lock_icon"].visible = (true)

        } else { //已解锁
            AddRdContent(this.mElemList["name_rd"], skillname + "#space#lime" + skillLevel + Localize_cns("PET_TXT9"), "ht_24_cc", "white")

            this.mElemList["up_title"].text = Localize_cns("PET_TXT13")
            this.mElemList["down_title"].text = Localize_cns("PET_TXT14")

            let baseeffects = table_effect(skillConfigInfo.effects)
            let addeffects = table_effect(skillConfigInfo.addeffects)
            //当前效果
            for (let i = 0; i < skillLevel; i++) {
                for (let k in baseeffects) {
                    if (addeffects[k]) {
                        baseeffects[k] += addeffects[k]
                    }
                }
            }
            var str = ""
            for (let k in baseeffects) {
                let proName = GetPropertyName(abilityNameToIndex[k])
                let proValue = baseeffects[k]
                str += "#ublack" + Localize_cns("SKILL_TXT6") + proName + "#lime" + proValue + "#space_40"
            }
            AddRdContent(this.mElemList["cur_attr_rd"], str, "ht_24_cc", "ublack")
            //下一级激活效果
            for (let k in baseeffects) {
                if (addeffects[k]) {
                    baseeffects[k] += addeffects[k]
                }
            }
            var str = ""
            for (let k in baseeffects) {
                let proName = GetPropertyName(abilityNameToIndex[k])
                let proValue = baseeffects[k]
                str += Localize_cns("SKILL_TXT6") + proName + proValue + "#space_40"
            }
            AddRdContent(this.mElemList["next_attr_rd"], str, "ht_24_cc", "gray")

            this.mElemList["itemBox"].setVisible(true)
            this.mElemList["material_rd"].visible = (true)
            this.mElemList["btn_upgrade"].visible = (true)
            this.mElemList["lock_icon"].visible = (false)

            let itemId = skillConfigInfo.itemid
            let info = FunSystem.getInstance().getFunSkillMaterialWithLv(this.funType, skillLevel)
            let itemNum = info.num
            let itemName = ItemSystem.getInstance().getItemName(itemId)
            let itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0
            let color = itemCount > itemNum ? "#lime" : "#red"
            var str = itemName + "#rf#lime*" + itemNum + "#br#ublack" + Localize_cns("ITEM_TXT30") + color + itemCount
            AddRdContent(this.mElemList["material_rd"], str, "ht_24_cc", "ublack", 3)

            this.mElemList["itemBox"].updateByEntry(itemId)
        }

    }

    onClickUpgrade(args) {
        let skillConfigInfo 
        if(this.typeList == null){
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, this.index + 1)
        }else{
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, 1)
        }
        let itemId = skillConfigInfo.itemid
        let itemNum = skillConfigInfo.itemnum
        let itemCount = ItemSystem.getInstance().getItemCount(itemId)
        if (itemCount >= itemNum) {
            RpcProxy.call("C2G_TEMPCELLFUN_SKILL_UP", this.funType, this.index + 1)
        } else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"))
        }
    }

    ///////////////////////////////////////////////////////
    showWithTypeAndIndex(_type, _index) {
        this.funType = _type
        this.index = _index
        this.showWnd()
    }

    showWithTypeListAndIndex(_type, _index){
        this.typeList = _type
        this.index = _index
        this.showWnd()
    }
}