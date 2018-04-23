var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
FUN工具类
*/
var FunUITools = (function () {
    function FunUITools() {
    }
    /////////////////////////////UI更新///////////////////////////////
    //更新战力
    FunUITools.updateForceNum = function (_type, wnd) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        var force = funInfo.force;
        var bImage = wnd.mElemList["batch_force"];
        DrawNumberStringImage(bImage, "zhanLi_", "z" + force, 0, 0, -3);
    };
    //更新增加战力
    FunUITools.updateAddForceNum = function (_type, wnd) {
        var upConfig = GetTemCellNextGradeProperty(_type);
        var addforce = GetForceMath(upConfig);
        var str = String.format(Localize_cns("ROLE_TXT22"), addforce);
        AddRdContent(wnd.mElemList["rd_add_force"], str, "ht_24_cc");
    };
    //更新名字
    FunUITools.updateActorName = function (_type, wnd, stage) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        //不显示
        var list = [
            cellOptionsIndex.PetTongLin,
            cellOptionsIndex.XianLvFaZhen,
            cellOptionsIndex.XianLvXianWei,
        ];
        if (wnd.mElemList["name_wnd"]) {
            wnd.mElemList["name_wnd"].visible = (true);
            for (var i in list) {
                var v = list[i];
                if (v == _type) {
                    wnd.mElemList["name_wnd"].visible = (false);
                    break;
                }
            }
        }
        //更新名字
        wnd.mElemList["name_txt"].text = FunSystem.getInstance().getFunModelName(_type, stage) || "";
    };
    //更新等阶
    FunUITools.updateActorStage = function (_type, wnd, stage) {
        wnd.mElemList["stage_txt"].text = stage + Localize_cns("PET_TXT10");
    };
    //更新技能
    FunUITools.updateSkillWnd = function (_type, wnd) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        for (var i = 0; i < 4; i++) {
            //更新技能图标
            if (wnd.mElemList["skillFunBox_" + i] == null) {
                wnd.mElemList["skillFunBox_" + i] = UIFunSkillBox.newObj(wnd.mLayoutNode, "skillFunBox_" + i, 72 * (i - 1), 0, wnd.mElemList["fun_skill_wnd"], 0.72);
            }
            wnd.mElemList["skillFunBox_" + i].updateFunSkill(_type, i);
        }
    };
    //更新天女技能
    FunUITools.updateTianNvSkillWnd = function (_typelist, wnd, parent, name) {
        for (var i = 0; i < size_t(_typelist); i++) {
            //更新技能图标
            if (wnd.mElemList[name + i] == null) {
                wnd.mElemList[name + i] = UIFunSkillBox.newObj(wnd.mLayoutNode, name + i, 72 * (i - 1), 0, parent, 0.72);
            }
            wnd.mElemList[name + i].updateFunSkill(_typelist[i], 0);
        }
    };
    //更新装备
    FunUITools.updateEquipWnd = function (_type, wnd) {
        var equipItemList = FunSystem.getInstance().getWearEquipItemList(_type);
        var subTypeList = GameConfig.FunEquipCaseConfig[cellOptionsName[_type - 1]].subtype;
        for (var i in subTypeList) {
            //创建itembox
            if (wnd.mElemList["itemBox_" + i] == null) {
                wnd.mElemList["itemBox_" + i] = UIItemBox.newObj(wnd.mLayoutNode, "itemBox_" + i, 72 * (tonumber(i) - 1), 0, wnd.mElemList["fun_equip_wnd"], 0.9);
            }
            wnd.mElemList["itemBox_" + i].resetFunEquip(tonumber(i));
            for (var index in equipItemList) {
                var item = equipItemList[index];
                if (item.getRefProperty("subtype") == subTypeList[i]) {
                    wnd.mElemList["itemBox_" + i].updateByEntry(item.entryId, 1, item.getProperty("quality"), item.getProperty("add_num"));
                }
            }
        }
    };
    //更新角色模型
    FunUITools.updateActorModel = function (_type, wnd, player, stage, scale, dir) {
        if (stage == null) {
            stage = 1;
        }
        //根据类型获取模型id
        var modeID = GetFunShapeModel(_type, stage);
        var actorview = wnd.mElemList["actor_view"];
        var actor = player;
        actor.loadModel(modeID);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(scale || 1.0);
        //方向
        actor.setDir(dir || 1);
    };
    //更新exp进度条
    FunUITools.updateExpProgress = function (_type, wnd) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        var curStage = funInfo.stage;
        var limitExp = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].maxexp;
        UiUtil.updateProgress(wnd.mElemList["exp_progress"], funInfo.stageexp, limitExp);
    };
    //更新消耗材料
    FunUITools.updateNeedMaterial = function (_type, wnd) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        var material = FunSystem.getInstance().getFunUpgradeMaterial(_type, funInfo.stage);
        var ownNum = ItemSystem.getInstance().getItemCount(material.itemId);
        var needNum = material.itemNum;
        var color = ownNum >= needNum ? "#lime" : "#saddlebrown";
        var str = Localize_cns("PET_TXT4") + "#space#rf" + GetTagIcon(material.itemId) + "#rf" + color + ownNum + "/" + needNum;
        var moneyColor = GetHeroMoney(material.moneyUnit) >= material.money ? "#lime" : "#saddlebrown";
        str = str + "#space#rf" + GetMoneyIcon(material.moneyUnit) + "#rf#ublack" + material.money;
        AddRdContent(wnd.mElemList["material_rd"], str, "ht_24_cc", "ublack");
    };
    /////////////////////////////响应事件/////////////////////////////////
    //皮肤
    FunUITools.openSkinsFrame = function (_type) {
        var wnd = WngMrg.getInstance().getWindow("CommonSkinsFrame");
        wnd.onShowWnd(_type);
    };
    //属性丹
    FunUITools.openPropertyFrame = function (_type) {
        var wnd = WngMrg.getInstance().getWindow("CommonDrugFrame");
        wnd.onShowWnd(_type);
    };
    //查看属性
    FunUITools.openFunPropertyFrame = function (_type, select) {
        var wnd = WngMrg.getInstance().getWindow("CommonFunPropertyFrame");
        wnd.onShowWnd(_type, select);
    };
    //幻化
    FunUITools.sendTurnRequest = function (_type, index) {
        RpcProxy.call("C2G_TEMPCELLFUN_SHAPE_SET", _type, index);
    };
    //升阶
    FunUITools.upgradeFunction = function (_type, wnd, autoBtn, btn) {
        var name = cellOptionsName[_type - 1] + "_checkbox";
        var auto = wnd.mElemList[name].selected;
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        var curStage = funInfo.stage;
        //消耗材料
        var itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].itemid;
        var ownItemCount = ItemSystem.getInstance().getItemCount(itemId);
        var needItemCount = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].itemnum;
        //消耗货币
        var moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].moneyunit;
        var ownMoney = GetHeroMoney(moneyUnit);
        var costMoney = GameConfig.FunUpgradeStageConfig[cellOptionsName[_type - 1]][curStage].money;
        //判断货币是否足够
        if (ownMoney < costMoney) {
            //直接弹出对应的货币购买界面
            MsgSystem.addTagTips("NO_MONEY");
            if (wnd.mElemList[autoBtn]) {
                wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE");
                wnd.mElemList[autoBtn].selected = false;
            }
            if (wnd.mElemList[btn]) {
                wnd.mElemList[btn].enabled = true;
            }
            return;
        }
        if (auto) {
            RpcProxy.call("C2G_TEMPCELLFUN_STAGE_UP", _type, 1);
        }
        else {
            //判断材料是否足够
            if (ownItemCount < needItemCount) {
                //弹出材料购买界面
                var quickWnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
                quickWnd.onShowWnd(itemId, needItemCount - ownItemCount);
                if (wnd.mElemList[autoBtn]) {
                    wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE");
                    wnd.mElemList[autoBtn].selected = false;
                }
                if (wnd.mElemList[btn]) {
                    wnd.mElemList[btn].enabled = true;
                }
            }
            else {
                RpcProxy.call("C2G_TEMPCELLFUN_STAGE_UP", _type, 0);
            }
        }
    };
    //自动升阶
    FunUITools.upgradeAutoFunction = function (_type, wnd, autoBtn, btn) {
        wnd.mElemList[autoBtn].selected = !wnd.mElemList[autoBtn].selected;
        var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
        wnd.mElemList[autoBtn].level = funInfo.stage || 0;
        if (wnd.mElemList[autoBtn].selected) {
            wnd.mElemList[autoBtn].text = Localize_cns("STOP");
            wnd.mElemList[btn].enabled = false;
        }
        else {
            wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE");
            wnd.mElemList[btn].enabled = true;
        }
        FunUITools.upgradeAutoFunctionCheck(_type, wnd, autoBtn, btn);
    };
    FunUITools.upgradeAutoFunctionCheck = function (_type, wnd, autoBtn, btn) {
        var select = wnd.mElemList[autoBtn].selected;
        if (select) {
            var funInfo = FunSystem.getInstance().getFunInfoWithType(_type);
            var curLv = funInfo.stage || 0;
            var oldLv = wnd.mElemList[autoBtn].level || 0;
            if (curLv == oldLv) {
                this.upgradeFunction(_type, wnd, autoBtn, btn);
            }
            else {
                wnd.mElemList[autoBtn].text = Localize_cns("PET_AUTO_UPGRADE");
                wnd.mElemList[btn].enabled = true;
                wnd.mElemList[autoBtn].selected = false;
            }
        }
    };
    //换装检查
    FunUITools.checkWearEquip = function (_type, wnd) {
        var netConfig = FunSystem.getInstance().getFunInfoWithType(_type);
        var stage = netConfig.stage;
        var list = [];
        var subTypeList = GameConfig.FunEquipCaseConfig[cellOptionsName[_type - 1]].subtype;
        for (var subKey in subTypeList) {
            var subtype = subTypeList[subKey];
            var equipList = null; //subtype位置的stage装备
            equipList = ItemSystem.getInstance().getFunEquipListWithStage(subtype, stage);
            if (size_t(equipList) > 0) {
                table_sort(equipList, function (a, b) {
                    return GetForceMath(GetFunEquipProperty(a.entryId, a.getProperty("quality"), a.getProperty("add_num"))) - GetForceMath(GetFunEquipProperty(b.entryId, b.getProperty("quality"), b.getProperty("add_num")));
                });
            }
            else {
                continue;
            }
            var wearEquipList = FunSystem.getInstance().getWearEquipItemList(_type);
            var wearItem = null;
            for (var j in wearEquipList) {
                var item = wearEquipList[j];
                if (item.getRefProperty("subtype") == subtype) {
                    wearItem = item;
                }
            }
            if (wearItem) {
                var wearForce = GetForceMath(GetFunEquipProperty(wearItem.entryId, wearItem.getProperty("quality"), wearItem.getProperty("add_num")));
                var equipForce = GetForceMath(GetFunEquipProperty(equipList[0].entryId, equipList[0].getProperty("quality"), equipList[0].getProperty("add_num")));
                if (wearForce >= equipForce) {
                    continue;
                }
                else {
                    JsUtil.arrayInstert(list, equipList[0].id);
                }
            }
            else {
                JsUtil.arrayInstert(list, equipList[0].id);
            }
        }
        if (size_t(list) == 0 && wnd.mElemList["wear_equip_btn"]) {
            wnd.mElemList["wear_equip_btn"].visible = false;
        }
        return list;
    };
    //一键换装
    FunUITools.oneKeyWearEquip = function (_type, wnd, equipList) {
        RpcProxy.call("C2G_TEMPCELLFUN_EQUIP_SET", _type, equipList);
    };
    //红点提示属性丹
    FunUITools.refreshDanDotTIps = function (_type, wnd) {
        var parentWnd = wnd.mParentWnd;
        if (GuideFuncSystem.getInstance().checkPropertyDan(_type)) {
            parentWnd.createDotTipsUI(wnd.mElemList["btn_property_dan"].rootWnd);
        }
    };
    //红点提示装备
    FunUITools.refreshEquipDotTIps = function (_type, wnd) {
        var parentWnd = wnd.mParentWnd;
        for (var i = 0; i < 4; i++) {
            if (GuideFuncSystem.getInstance().checkOneFunEquip(_type, i)) {
                parentWnd.createDotTipsUI(wnd.mElemList["itemBox_" + i].rootWnd);
            }
        }
    };
    //红点提示技能
    FunUITools.refreshSkillDotTIps = function (_type, wnd) {
        var parentWnd = wnd.mParentWnd;
        for (var i = 0; i < 4; i++) {
            if (GuideFuncSystem.getInstance().checkOneFunSkill(_type, i)) {
                parentWnd.createDotTipsUI(wnd.mElemList["skillFunBox_" + i].rootWnd);
            }
        }
    };
    //红点提示自动升阶
    FunUITools.refreshUpgradeDotTIps = function (_type, wnd) {
        var parentWnd = wnd.mParentWnd;
        if (GuideFuncSystem.getInstance().checkFunUpgrade(_type)) {
            parentWnd.createDotTipsUI(wnd.mElemList["btn_upgrade"]);
            parentWnd.createDotTipsUI(wnd.mElemList["btn_auto_upgrade"]);
        }
    };
    return FunUITools;
}());
__reflect(FunUITools.prototype, "FunUITools");
//# sourceMappingURL=FunUITools.js.map