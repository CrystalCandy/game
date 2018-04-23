// TypeScript file
//获取属性字符串
function GetPropertyName(fieldIndex) {
    var list = (_a = {},
        _a[objectField.UNIT_FIELD_MAX_HP] = Localize_cns("PROPERTY_NAME_TXT1"),
        _a[objectField.UNIT_FIELD_ATTACK] = Localize_cns("PROPERTY_NAME_TXT2"),
        _a[objectField.UNIT_FIELD_DEFENCE] = Localize_cns("PROPERTY_NAME_TXT3"),
        _a[objectField.UNIT_FIELD_SPEED] = Localize_cns("PROPERTY_NAME_TXT4"),
        _a[objectField.UNIT_FIELD_HITRATE] = Localize_cns("PROPERTY_NAME_TXT5"),
        _a[objectField.UNIT_FIELD_DODGE] = Localize_cns("PROPERTY_NAME_TXT6"),
        _a[objectField.UNIT_FIELD_CRITICAL] = Localize_cns("PROPERTY_NAME_TXT7"),
        _a[objectField.UNIT_FIELD_CRITICAL_DEC] = Localize_cns("PROPERTY_NAME_TXT8"),
        _a[objectField.UNIT_FIELD_DEF_THR] = Localize_cns("PROPERTY_NAME_TXT9"),
        _a[objectField.UNIT_FIELD_DEF_THR_DEC] = Localize_cns("PROPERTY_NAME_TXT10"),
        _a[objectField.UNIT_FIELD_ATT_INC] = Localize_cns("PROPERTY_NAME_TXT11"),
        _a[objectField.UNIT_FIELD_ATT_DEC] = Localize_cns("PROPERTY_NAME_TXT12"),
        _a[objectField.UNIT_FIELD_CRI_ATT] = Localize_cns("PROPERTY_NAME_TXT13"),
        _a[objectField.UNIT_FIELD_CRI_ATT_DEC] = Localize_cns("PROPERTY_NAME_TXT14"),
        _a[objectField.UNIT_FIELD_PVP_ATT_INC] = Localize_cns("PROPERTY_NAME_TXT15"),
        _a[objectField.UNIT_FIELD_PVP_ATT_DEC] = Localize_cns("PROPERTY_NAME_TXT16"),
        _a[objectField.UNIT_FIELD_PVE_ATT_INC] = Localize_cns("PROPERTY_NAME_TXT17"),
        _a[objectField.UNIT_FIELD_PVE_ATT_DEC] = Localize_cns("PROPERTY_NAME_TXT18"),
        _a);
    if (list[fieldIndex]) {
        return list[fieldIndex];
    }
    var keyName = abilityNameToIndex[fieldIndex];
    if (keyName) {
        return list[keyName];
    }
    return "Error:" + tostring(fieldIndex);
    var _a;
}
///////////////////////////////获取属性config//////////////////////////////////
//-------------------------------------------宠物属性
//宠物--基础属性
function GetPetBaseProperty(petId) {
    var petConfig = PetSystem.getInstance().getPetEntryInfo(petId);
    return table_effect(petConfig.effects);
}
//单个激活宠物--升级属性
function GetPetLvProperty(petId) {
    var configInfo = PetSystem.getInstance().getPetEntryInfo(petId);
    var netInfo = PetSystem.getInstance().getPetInfo(petId);
    var list = GetPetBaseProperty(petId);
    if (netInfo) {
        var stage = netInfo.stage;
        //宠物升一次不加属性 升一级加属性
        var effects = table_effect(GameConfig.FunUpgradeEffectConfig["PetUpgrade"][stage].effects);
        table_effect_add(list, effects);
    }
    return list;
}
//单个激活宠物--资质属性
function GetPetGrowProperty(petId) {
    var growconfig = PetSystem.getInstance().getPetGrowInfo(petId);
    var netInfo = PetSystem.getInstance().getPetInfo(petId);
    var list = (_a = {},
        _a[IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]] = 0,
        _a[IndexToabilityName[objectField.UNIT_FIELD_ATTACK]] = 0,
        _a[IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]] = 0,
        _a);
    if (netInfo) {
        list = table_effect(growconfig.effects);
        var ratio = netInfo.growexp;
        table_effect_mul(list, ratio);
    }
    return list;
    var _a;
}
//全部激活宠物--升级级总属性
function GetSumPetLvProperty() {
    var petInfoList = PetSystem.getInstance().getPetInfoList();
    var list = null;
    for (var i in petInfoList) {
        var petId = petInfoList[i].entryid;
        var effects = GetPetLvProperty(petId);
        if (list == null) {
            list = effects;
        }
        else {
            table_effect_add(list, effects);
        }
    }
    return list || {};
}
//全部激活宠物--资质总属性
function GetSumPetGrowProperty() {
    var petInfoList = PetSystem.getInstance().getPetInfoList();
    var list = null;
    for (var i in petInfoList) {
        var petId = petInfoList[i].entryid;
        var effects = GetPetGrowProperty(petId);
        if (list == null) {
            list = effects;
        }
        else {
            table_effect_add(list, effects);
        }
    }
    return list || {};
}
//计算单个宠物总属性
function GetPetProperty(petId) {
    var lvpro = GetPetLvProperty(petId);
    var growpro = GetPetGrowProperty(petId);
    // [IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]: 0,
    var list = table_effect_add(lvpro, growpro);
    return list;
}
//计算全部宠物总属性
function GetSumPetProperty() {
    var lvpro = GetSumPetLvProperty();
    var growpro = GetSumPetGrowProperty();
    // [IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]: 0,
    var list = table_effect_add(lvpro, growpro);
    return list;
}
//-------------------------------------------人物属性
//单件角色装备基础属性
function GetRoleEquipBaseProperty(id, quality) {
    if (quality == null) {
        quality = opPetQuality.gray;
    }
    var config = ItemSystem.getInstance().getItemTemplateInfo(id);
    var effects = GameConfig.RoleEquipEffect[config.suit][quality][config.subtype].effects;
    return table_effect(effects);
}
//单件角色装备附加属性 -- 
//强化属性
function GetForgeCellProperty(typeName, pos) {
    var levelList = ForgeSystem.getInstance().getForgeInfo(typeName);
    var level = levelList[pos];
    var config = ForgeSystem.getInstance().getCellForgeConfig(typeName, pos, level);
    return config;
}
//时装、称号总属性
function GetSumFashionAndTitleProperty(funName) {
    var config = {
        maxhp: 0,
        demage: 0,
        hujia: 0
    };
    var skinConfig = GameConfig.FunSkinConfig[funName];
    var jiHuoList;
    if (funName == "Hero") {
        jiHuoList = RoleSystem.getInstance().getRoleInfo("titleskinlist");
    }
    else {
        jiHuoList = RoleSystem.getInstance().getRoleInfo("fashionskinlist");
    }
    for (var i = 0; i < size_t(jiHuoList); i++) {
        var effects = skinConfig[jiHuoList[i]].effects;
        var tempConfig = table_effect(effects);
        config = table_effect_add(config, tempConfig);
    }
    return config;
}
///返回锻造位置的总属性
function GetForgeTotalProperty(pos) {
    var configList = {};
    for (var k in elemForgeNames) {
        var typeName = elemForgeNames[k];
        var tempConfig = GetForgeCellProperty(typeName, pos);
        if (tempConfig != null) {
            configList[typeName] = tempConfig;
        }
    }
    return configList;
}
//-------------------------------------------通用属性
//单件通用装备基础属性
function GetFunEquipBaseProperty(id, quality) {
    var config = ItemSystem.getInstance().getItemTemplateInfo(id);
    var effects = GameConfig.CommonEquipEffect[config.pos][config.level][quality].effects;
    return table_effect(effects);
}
//单件通用装备附加属性
function GetFunEquipAddProperty(id, quality) {
    var config = ItemSystem.getInstance().getItemTemplateInfo(id);
    var effects = GameConfig.CommonEquipEffect[config.pos][config.level][quality].addeffects;
    return table_effect(effects);
}
//单件通用装备属性
function GetFunEquipProperty(id, quality, addnum) {
    var basePro = GetFunEquipBaseProperty(id, quality);
    var addPro = GetFunEquipAddProperty(id, quality);
    var list = {};
    list = basePro;
    // [IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]: 0,
    for (var i = 0; i < addnum; i++) {
        table_effect_add(list, addPro);
    }
    return list;
}
//属性丹属性
function GetDrugProperty(funType) {
    var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
    var funName = cellOptionsName[funType - 1];
    var drugConfig = GameConfig.FunAbilityDrugConfig[funName];
    var drugnum = funInfo.drugnum;
    var effects = drugConfig.effects;
    var config = table_effect(effects);
    return table_effect_mul(config, drugnum);
}
///单个皮肤的属性
function GetSingleSkinProperty(funName, skinIndex) {
    var skinConfig = GameConfig.FunSkinConfig[funName][skinIndex];
    return table_effect(skinConfig.effects);
}
//皮肤总属性
function GetSumSkinProperty(funType) {
    var config = {
        maxhp: 0, demage: 0, hujia: 0
    };
    var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
    var funName = cellOptionsName[funType - 1];
    if (GameConfig.FunSkinConfig[funName] == null) {
        return config;
    }
    var skinConfig = GameConfig.FunSkinConfig[funName];
    var jiHuoList = funInfo.skinlist;
    for (var i = 0; i < size_t(jiHuoList); i++) {
        var effects = skinConfig[jiHuoList[i]].effects;
        var tempConfig = table_effect(effects);
        config = table_effect_add(config, tempConfig);
    }
    return config;
}
//-------------------------------------------仙侣属性
//计算单个仙侣总属性
function GetXianLvProperty(xianlvId) {
    var config = {};
    var initEffects = table_effect(GameConfig.ActorXianLvConfig[xianlvId].effects);
    config = table_effect_add(config, initEffects);
    if (XianLvSystem.getInstance().isExit(xianlvId)) {
        var stage = XianLvSystem.getInstance().getLevel(xianlvId);
        var stageexp = XianLvSystem.getInstance().getExpById(xianlvId);
        var expcell = GameConfig.FunUpgradeStageConfig["XianLv"][stage].expcell;
        var step = Math.ceil(stageexp / expcell);
        var stageEffects = GameConfig.FunUpgradeEffectConfig["XianLvUpgrade"][stage].effects;
        config = table_effect_add(config, table_effect(stageEffects));
        var stepEffects = GameConfig.FunUpgradeEffectConfig["XianLvStep"][stage].effects;
        var tempConfig = table_effect_mul(table_effect(stepEffects), step);
        config = table_effect_add(config, table_effect(stepEffects));
    }
    return config;
}
//计算全部仙侣总属性
function GetSumXianLvProperty() {
    var config = {
        maxhp: 0,
        demage: 0,
        hujia: 0
    };
    var jihuolist = XianLvSystem.getInstance().getJiHuoList();
    for (var i = 0; i < size_t(jihuolist); i++) {
        var tempConfig = GetXianLvProperty(jihuolist[i]);
        config = table_effect_add(config, tempConfig);
    }
    // [IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_ATTACK]]: 0,
    // [IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]]: 0,
    return config;
}
//-----------------------通用进阶属性
function GetTemCellUpgradeProperty(funType) {
    var config = {};
    var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
    var funName = cellOptionsName[funType - 1];
    var level = funInfo.stage;
    var stageexp = funInfo.stageexp;
    var expcell = GameConfig.FunUpgradeStageConfig[funName][level].expcell;
    var step = Math.ceil(stageexp / expcell);
    //大阶
    var cellEffects = GameConfig.FunUpgradeEffectConfig[funName][level].effects;
    config = table_effect_add(config, table_effect(cellEffects));
    //小阶
    var stepEffects = GameConfig.FunUpgradeEffectConfig["TempCellStep"][level].effects;
    var tempConfig = table_effect_mul(table_effect(stepEffects), step);
    config = table_effect_add(config, tempConfig);
    return config;
}
function GetTemCellNextGradeProperty(funType) {
    var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
    var funName = cellOptionsName[funType - 1];
    var level = funInfo.stage + 1;
    //下阶的属性
    var cellEffects = GameConfig.FunUpgradeEffectConfig[funName][level].effects;
    var tempConfig = table_effect(cellEffects);
    //现在的进阶属性
    var nowConfig = GetTemCellUpgradeProperty(funType);
    return table_effect_sub(tempConfig, nowConfig);
}
//-----------------------通用界面总属性(进阶、坐骑、装备、属性丹)
function GetTemCellTotalProperty(funType) {
    //进阶
    var config1 = GetTemCellUpgradeProperty(funType);
    //装备
    var config2 = {};
    var funEquiplist = FunSystem.getInstance().getWearEquipItemList(funType);
    for (var k in funEquiplist) {
        var item = funEquiplist[k];
        var tempConfig = GetFunEquipProperty(item.entryId, item.getProperty("quality"), item.getProperty("add_num"));
        config2 = table_effect_add(config2, tempConfig);
    }
    if (size_t(config2) == 0) {
        config2 = {
            maxhp: 0, demage: 0, hujia: 0
        };
    }
    //皮肤
    var config3 = GetSumSkinProperty(funType);
    //属性丹
    var config4 = GetDrugProperty(funType);
    return [config1, config2, config3, config4];
}
///////////////////////////////////战力计算公式/////////////////////////////////////
//主角技能额外伤害
//初始额外伤害+（技能等级-1）*额外伤害成长。例如一技能，当前等级2级，180+（2-1）*18
function GetRoleSkillExtraDamage(info) {
    return 0;
}
//战斗力计算公式
//effect 格式 {["maxhp"]: 0}
function GetForceMath(effect) {
    var force = 0;
    for (var k in effect) {
        var v = effect[k] || 0;
        var ratio = abilityPowerRatio[abilityNameToIndex[k]];
        force += v * ratio;
    }
    return FormatNumberInt(force);
}
//////////////////服务器计算战斗力////////////////////
function s_GetSumPetForce() {
    var petlist = PetSystem.getInstance().getPetActiveList();
    var force = 0;
    for (var i in petlist) {
        var petId = petlist[i];
        var petInfo = PetSystem.getInstance().getPetInfo(petId);
        force += petInfo.force;
    }
    return force;
}
//# sourceMappingURL=Interface_Property.js.map