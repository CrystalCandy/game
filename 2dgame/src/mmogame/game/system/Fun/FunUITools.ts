/*
FUN工具类
*/
class FunUITools {
    /////////////////////////////UI更新///////////////////////////////
    //更新战力
    static updateForceNum(_type: number, wnd: BaseCtrlWnd) {
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
        let force = funInfo.force

        let bImage = wnd.mElemList["batch_force"]
        DrawNumberStringImage(bImage, "zhanLi_", "z" + force, 0, 0, -3)
    }

    //更新增加战力
    static updateAddForceNum(_type: number, wnd: BaseCtrlWnd) {
        let upConfig = GetTemCellNextGradeProperty(_type)
        let addforce = GetForceMath(upConfig)

        let str = String.format(Localize_cns("ROLE_TXT22"), addforce)
        AddRdContent(wnd.mElemList["rd_add_force"], str, "ht_24_cc");
    }

    //更新名字
    static updateActorName(_type: number, wnd: BaseCtrlWnd, stage: number) {
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)

        //不显示
        let list = [
            cellOptionsIndex.PetTongLin,
            cellOptionsIndex.XianLvFaZhen,
            cellOptionsIndex.XianLvXianWei,
        ]

        if (wnd.mElemList["name_wnd"]) {
            wnd.mElemList["name_wnd"].visible = (true)
            for (let i in list) {
                let v = list[i]
                if (v == _type) {
                    wnd.mElemList["name_wnd"].visible = (false)
                    break
                }
            }
        }
        //更新名字
        wnd.mElemList["name_txt"].text = FunSystem.getInstance().getFunModelName(_type, stage) || ""
    }

    //更新等阶
    static updateActorStage(_type: number, wnd: BaseCtrlWnd, stage: number) {
        wnd.mElemList["stage_txt"].text = stage + Localize_cns("PET_TXT10")
    }

    //更新技能
    static updateSkillWnd(_type: number, wnd: BaseCtrlWnd) {
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
        for (let i = 0; i < 4; i++) {
            //更新技能图标
            if (wnd.mElemList["skillFunBox_" + i] == null) {
                wnd.mElemList["skillFunBox_" + i] = UIFunSkillBox.newObj(wnd.mLayoutNode, "skillFunBox_" + i, 72 * (i - 1), 0, wnd.mElemList["fun_skill_wnd"], 0.72)
            }

            wnd.mElemList["skillFunBox_" + i].updateFunSkill(_type, i)
        }
    }

    //更新天女技能
    static updateTianNvSkillWnd(_typelist: number[], wnd: BaseCtrlWnd, parent: eui.Group, name: string) {

        for (let i = 0; i < size_t(_typelist); i++) {
            //更新技能图标
            if (wnd.mElemList[name + i] == null) {
                wnd.mElemList[name + i] = UIFunSkillBox.newObj(wnd.mLayoutNode, name + i, 72 * (i - 1), 0, parent, 0.72)
            }

            wnd.mElemList[name + i].updateFunSkill(_typelist[i], 0)
        }
    }

    //更新装备
    static updateEquipWnd(_type: number, wnd: BaseCtrlWnd) {
        let equipItemList = FunSystem.getInstance().getWearEquipItemList(_type)

        let subTypeList = GameConfig.FunEquipCaseConfig[cellOptionsName[_type - 1]].subtype
        for (let i in subTypeList) {
            //创建itembox
            if (wnd.mElemList["itemBox_" + i] == null) {
                wnd.mElemList["itemBox_" + i] = UIItemBox.newObj(wnd.mLayoutNode, "itemBox_" + i, 72 * (tonumber(i) - 1), 0, wnd.mElemList["fun_equip_wnd"], 0.9)
            }

            wnd.mElemList["itemBox_" + i].resetFunEquip(tonumber(i))
            for (let index in equipItemList) {
                let item: Item = equipItemList[index]
                if (item.getRefProperty("subtype") == subTypeList[i]) {//已穿戴
                    wnd.mElemList["itemBox_" + i].updateByEntry(item.entryId, 1, item.getProperty("quality"), item.getProperty("add_num"))
                }
            }
        }
    }

    //更新角色模型
    static updateActorModel(_type: number, wnd: BaseCtrlWnd, player: Player, stage?, scale?, dir?) {
        if (stage == null) {
            stage = 1;
        }
        //根据类型获取模型id
        let modeID = GetFunShapeModel(_type, stage)
        let actorview = wnd.mElemList["actor_view"]
        let actor = player
        actor.loadModel(modeID)
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0)
        actor.enterViewer(actorview)

        //缩放
        actor.setScale(scale || 1.0)
        //方向
        actor.setDir(dir || 1)
    }

    //更新exp进度条
    static updateExpProgress(_type: number, wnd: BaseCtrlWnd) {
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
        let curStage = funInfo.stage
        let limitExp = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].maxexp
        UiUtil.updateProgress(wnd.mElemList["exp_progress"], funInfo.stageexp, limitExp)
    }

    //更新消耗材料
    static updateNeedMaterial(_type: number, wnd: BaseCtrlWnd) {
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)

        let material = FunSystem.getInstance().getFunUpgradeMaterial(_type, funInfo.stage)
        let ownNum = ItemSystem.getInstance().getItemCount(material.itemId)
        let needNum = material.itemNum
        let color = ownNum >= needNum ? "#lime" : "#saddlebrown"
        let str = Localize_cns("PET_TXT4") + "#space#rf" + GetTagIcon(material.itemId) + "#rf" + color + ownNum + "/" + needNum
        let moneyColor = GetHeroMoney(material.moneyUnit) >= material.money ? "#lime" : "#saddlebrown"
        str = str + "#space#rf" + GetMoneyIcon(material.moneyUnit) + "#rf#ublack" + material.money
        AddRdContent(wnd.mElemList["material_rd"], str, "ht_24_cc", "ublack")
    }

    /////////////////////////////响应事件/////////////////////////////////
    //皮肤
    static openSkinsFrame(_type: number) {
        let wnd = WngMrg.getInstance().getWindow("CommonSkinsFrame");
        wnd.onShowWnd(_type);

    }
    //属性丹
    static openPropertyFrame(_type: number) {
        let wnd : CommonDrugFrame = WngMrg.getInstance().getWindow("CommonDrugFrame");
        wnd.onShowWnd(_type);

    }

    //查看属性
    static openFunPropertyFrame(_type: number, select: number) {
        let wnd = WngMrg.getInstance().getWindow("CommonFunPropertyFrame");
        wnd.onShowWnd(_type, select);

    }
    //幻化
    static sendTurnRequest(_type: number, index: number) {
        RpcProxy.call("C2G_TEMPCELLFUN_SHAPE_SET", _type, index)
    }

    //升阶
    static upgradeFunction(_type: number, wnd: BaseCtrlWnd, autoBtn?: string, btn?: string) {
        let name = cellOptionsName[_type - 1] + "_checkbox"
        let auto = wnd.mElemList[name].selected
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
        let curStage = funInfo.stage

        //消耗材料
        let itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].itemid
        let ownItemCount = ItemSystem.getInstance().getItemCount(itemId)
        let needItemCount = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].itemnum

        //消耗货币
        let moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].moneyunit
        let ownMoney = GetHeroMoney(moneyUnit)
        let costMoney = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].money

        //判断货币是否足够
        if (ownMoney < costMoney) {
            //直接弹出对应的货币购买界面
            MsgSystem.addTagTips("NO_MONEY")

            if (wnd.mElemList[autoBtn]) {
                wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE")
                wnd.mElemList[autoBtn].selected = false
            }
            if (wnd.mElemList[btn]) {
                wnd.mElemList[btn].enabled = true
            }
            return
        }

        if (auto) { //自动购买
            RpcProxy.call("C2G_TEMPCELLFUN_STAGE_UP", _type, 1)
        } else { //不自动购买
            //判断材料是否足够
            if (ownItemCount < needItemCount) {
                //弹出材料购买界面
                let quickWnd : GoodsAsseceFrame = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
                quickWnd.onShowWnd(itemId, needItemCount - ownItemCount);

                if (wnd.mElemList[autoBtn]) {
                    wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE")
                    wnd.mElemList[autoBtn].selected = false
                }
                if (wnd.mElemList[btn]) {
                    wnd.mElemList[btn].enabled = true
                }
            } else {
                RpcProxy.call("C2G_TEMPCELLFUN_STAGE_UP", _type, 0)
            }
        }
    }

    //自动升阶
    static upgradeAutoFunction(_type: number, wnd: BaseCtrlWnd, autoBtn: string, btn: string) {
        wnd.mElemList[autoBtn].selected = !wnd.mElemList[autoBtn].selected
        let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
        wnd.mElemList[autoBtn].level = funInfo.stage || 0
        if (wnd.mElemList[autoBtn].selected) {
            wnd.mElemList[autoBtn].text = Localize_cns("STOP")
            wnd.mElemList[btn].enabled = false
        } else {
            wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE")
            wnd.mElemList[btn].enabled = true
        }
        FunUITools.upgradeAutoFunctionCheck(_type, wnd, autoBtn, btn)
    }

    static upgradeAutoFunctionCheck(_type: number, wnd: BaseCtrlWnd, autoBtn: string, btn: string) {
        let select = wnd.mElemList[autoBtn].selected
        if (select) {
            let funInfo = FunSystem.getInstance().getFunInfoWithType(_type)
            let curLv = funInfo.stage || 0
            let oldLv = wnd.mElemList[autoBtn].level || 0
            if (curLv == oldLv) {
                this.upgradeFunction(_type, wnd, autoBtn, btn)
            } else {
                wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE")
                wnd.mElemList[btn].enabled = true
                wnd.mElemList[autoBtn].selected = false
            }
        }
    }

    //换装检查
    static checkWearEquip(_type: number, wnd: BaseCtrlWnd) {
        let netConfig = FunSystem.getInstance().getFunInfoWithType(_type)
        let stage = netConfig.stage
        let list: any[] = []

        let subTypeList = GameConfig.FunEquipCaseConfig[cellOptionsName[_type - 1]].subtype
        for (let subKey in subTypeList) {
            let subtype = subTypeList[subKey]
            let equipList = null //subtype位置的stage装备

            equipList = ItemSystem.getInstance().getFunEquipListWithStage(subtype, stage)

            if (size_t(equipList) > 0) {
                table_sort(equipList, function (a, b) {
                    return GetForceMath(GetFunEquipProperty(a.entryId, a.getProperty("quality"), a.getProperty("add_num"))) - GetForceMath(GetFunEquipProperty(b.entryId, b.getProperty("quality"), b.getProperty("add_num")))
                })
            } else {
                continue
            }

            let wearEquipList = FunSystem.getInstance().getWearEquipItemList(_type)
            let wearItem: Item = null
            for (let j in wearEquipList) {
                let item = wearEquipList[j]
                if (item.getRefProperty("subtype") == subtype) {
                    wearItem = item
                }
            }

            if (wearItem) {//有穿戴
                let wearForce = GetForceMath(GetFunEquipProperty(wearItem.entryId, wearItem.getProperty("quality"), wearItem.getProperty("add_num")))
                let equipForce = GetForceMath(GetFunEquipProperty(equipList[0].entryId, equipList[0].getProperty("quality"), equipList[0].getProperty("add_num")))
                if (wearForce >= equipForce) {
                    continue
                } else {
                    JsUtil.arrayInstert(list, equipList[0].id)
                }
            } else {
                JsUtil.arrayInstert(list, equipList[0].id)
            }
        }

        if (size_t(list) == 0 && wnd.mElemList["wear_equip_btn"]) {
            wnd.mElemList["wear_equip_btn"].visible = false
        }

        return list
    }

    //一键换装
    static oneKeyWearEquip(_type: number, wnd: BaseCtrlWnd, equipList) {
        RpcProxy.call("C2G_TEMPCELLFUN_EQUIP_SET", _type, equipList)
    }

    //红点提示属性丹
    static refreshDanDotTIps(_type: number, wnd: BaseCtrlWnd) {
        let parentWnd: BaseWnd = wnd.mParentWnd
        if (GuideFuncSystem.getInstance().checkPropertyDan(_type)) {
            parentWnd.createDotTipsUI(wnd.mElemList["btn_property_dan"].rootWnd)
        }
    }

    //红点提示装备
    static refreshEquipDotTIps(_type: number, wnd: BaseCtrlWnd) {
        let parentWnd: BaseWnd = wnd.mParentWnd
        for (let i = 0; i < 4; i++) {
            if (GuideFuncSystem.getInstance().checkOneFunEquip(_type, i)) {
                parentWnd.createDotTipsUI(wnd.mElemList["itemBox_" + i].rootWnd)
            }
        }
    }

    //红点提示技能
    static refreshSkillDotTIps(_type: number, wnd: BaseCtrlWnd) {
        let parentWnd: BaseWnd = wnd.mParentWnd
        for (let i = 0; i < 4; i++) {
            if (GuideFuncSystem.getInstance().checkOneFunSkill(_type, i)) {
                parentWnd.createDotTipsUI(wnd.mElemList["skillFunBox_" + i].rootWnd)
            }
        }
    }

    //红点提示自动升阶
    static refreshUpgradeDotTIps(_type: number, wnd: BaseCtrlWnd) {
        let parentWnd: BaseWnd = wnd.mParentWnd

        if (GuideFuncSystem.getInstance().checkFunUpgrade(_type)) {
            parentWnd.createDotTipsUI(wnd.mElemList["btn_upgrade"])
            parentWnd.createDotTipsUI(wnd.mElemList["btn_auto_upgrade"])
        }
    }
}