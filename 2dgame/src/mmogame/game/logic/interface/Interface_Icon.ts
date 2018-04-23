//获得货币图标
function GetMoneyIcon(unitType) {

    let moneyIconConfig: any = {
        [opItemUnit.FUNDS]: "#JINBI",
        [opItemUnit.BIND_CURRENCY]: "#BIND_YUANBAO",
        [opItemUnit.CURRENCY]: "#YUANBAO",

        [opItemUnit.JJC_POINT]: "#JJC_POINT",
        [opItemUnit.LEAGUE_POINT]: "#RONG_YU",
        [opItemUnit.SKY_TOWER_POINT]: "#SHILIAN_POINT",
        [opItemUnit.ZHENXING_POINT]: "#ZSZZ_POINT",
    }
    return moneyIconConfig[unitType] || ""
}

//物品小图标
function GetTagIcon(itemId) {
    let item = ItemSystem.getInstance().getItemTemplateInfo(itemId)
    if (item && item.tag) {
        return "#" + item.tag
    }
    return ""
}

//-----------------------------------------------------------------------

//宠物头像
function GetPetIconImage(entryId) {
    let imageName = "pet_20001"
    let petConfig = GameConfig.PetConfig[entryId]

    if (petConfig) {
        imageName = "pet_" + petConfig.icon
    }

    return imageName
}

//品质框
function GetPetQualityIconIamge(entryId) {
    let imageName = "ty_zhuangBeiBg01"
    let petConfig = GameConfig.PetConfig[entryId]
    let xianlvConfig = GameConfig.ActorXianLvConfig[entryId]

    if (petConfig) {
        imageName = "ty_zhuangBeiBg0" + petConfig.quality
    }

    if (xianlvConfig) {
        imageName = "ty_zhuangBeiBg0" + xianlvConfig.quality
    }
    return imageName
}

//模型
function GetPetModel(entryId) {
    let petConfig = GameConfig.PetConfig[entryId]

    if (petConfig) {
        return petConfig.model
    }
    return 0
}

//获取宠物五行图标
function GetElemIcon(_type) {
    let elemList = ["WUXING_JIN", "WUXING_MU", "WUXING_SHUI", "WUXING_HUO", "WUXING_TU"]
    return elemList[_type] || elemList[0]
}

//获取宠物SR图标
function GetPetSRIcon(srIndex) {
    let iconList = ["PET_R", "PET_SR", "PET_SSR", "PET_SSSR", "PET_SSSSR"]
    return iconList[srIndex - 1] || iconList[0]
}

//仙侣、天仙头像
function GetXianlvIconImage(entryId) {
    let imageName = "pet_20001"
    let ActorXianLvConfig = GameConfig.ActorXianLvConfig[entryId]

    if (ActorXianLvConfig) {
        imageName = "pet_" + ActorXianLvConfig.icon
    }

    return imageName
}

//模型
function GetXianlvModel(entryId) {
    let ActorXianLvConfig = GameConfig.ActorXianLvConfig[entryId]

    if (ActorXianLvConfig) {
        return ActorXianLvConfig.model
    }
    return 0
}

//上阵图标
function GetPetCombatPosIcon(pos) {
    if (pos == opPetCombatPos.Rest) {
        return ""
    } else if (pos == opPetCombatPos.Battle) { //出战
        return "ty_text03"
    } else { //备战
        return "ty_text04"
    }
}

//获取宠物颜色str
function GetQualityColorStr(quality) {
    let colorConfig: any[] = ["gray", "lime", "blue", "purple", "gold", "red"]
    return colorConfig[quality - 1] || colorConfig[0]
}

//获取宠物颜色gui.color
function GetQualityGUIColor(quality) {
    let colorConfig: any[] = [
        gui.Color.gray,
        gui.Color.lime,
        gui.Color.blue,
        gui.Color.purple,
        gui.Color.gold,
        gui.Color.red
    ]
    return colorConfig[quality - 1] || colorConfig[0]
}

//-----------------------------------------------------------------------

//怪物头像
function GetMonsterIconImage(entryId) {
    let imageName = "pet_20001"
    let config = GameConfig.MonsterConfig[entryId]
    if (config && config.bust != 0) {
        imageName = "pet_" + config.bust
    }

    return imageName
}

//怪物模型
function GetMonsterModel(entryId) {
    let modelId = 20001

    let petConfig = GameConfig.MonsterConfig[entryId]
    if (petConfig) {
        modelId = petConfig.model
    }

    return modelId
}
//-----------------------------------------------------------------------
//获取自己头像
function GetHeroIcon() {
    let hero = GetHeroPropertyInfo()
    return this.GetProfessionIcon(hero.vocation, hero.sexId)
}

//职业头像
function GetProfessionIcon(entryId, sex) {
    let imageName = "zctx_90001"
    let config = GameConfig.ProfessionModelConfig[entryId]
    if (config && config[sex]) {
        imageName = "zctx_" + config[sex].icon
    }

    return imageName
}

//职业模型
function GetProfessionModel(entryId, sex, rideId?) {
    //TLog.Debug("ProfessionSystem.getProfessionModel", entryId, sex)
    //TLog.Debug_r(GameConfig.ProfessionModelConfig)

    let modelId = 20001
    let config = GameConfig.ProfessionModelConfig[entryId]
    if (config && config[sex]) {

        if(rideId == null || rideId == 0){
            modelId = config[sex].model //站立模型
        }else{
            modelId = config[sex].ridemodel //骑乘模型
        }
        
    }
    //TLog.Debug("return", modelId)
    return modelId
}

//-----------------------------------------------------------------------
//技能图标
function GetSkillIcon(skillId, level?) {
    let icon = "skill_20001"

    if (level == null)
        level = 1

    let config = GameConfig.SkillDescribeConfig[skillId]
    if (config && config[level]) {
        let iconName = "skill_" + config[level].Icon

        let info = IGlobal.imageSet.getImageInfo(iconName)
        if (info != null) {
            icon = iconName
        }
    }

    return icon;
}

//技能背景框(1灰2绿3蓝4紫5金6红7彩)
function GetSkillQualityIcon(skillId, level?) {
    let icon = "ty_jiNengDi01"

    if (level == null)
        level = 1

    let config = GameConfig.SkillDescribeConfig[skillId]
    if (config && config[level]) {
        let iconName = "ty_jiNengDi0" + config[level].Quality

        let info = IGlobal.imageSet.getImageInfo(iconName)
        if (info != null) {
            icon = iconName
        }
    }
    return icon
}


//-----------------------------------------------------------------------
//物品图标
function GetItemIcon(entryId) {
    let imageName = "item_30001"				//物品框图片，如果let info = IGlobal.imageSet.getImageInfo("item_" + itemRef["Icon"])itemImage为空（物品类型为素材时），则imageName直接表示图片名

    let itemRef = ItemSystem.getInstance().getItemTemplateInfo(entryId) || null
    if (!itemRef) {
        return imageName
    }

    let info = IGlobal.imageSet.getImageInfo("item_" + itemRef["Icon"])
    if (!info) {
        return imageName
    } else {
        imageName = "item_" + itemRef["Icon"]
    }

    return imageName
}


//字体颜色
function GetItemFontColor(entryId) {
    let item = ItemSystem.getInstance().getItemTemplateInfo(entryId)
    let color = "gray"
    if(item != null && item.quality != null){
        color = GetQualityColorStr(item.quality)
    }
    return color
}

///法宝的品质
function GetFaBaoQualityStr(quality){
    let qualityList = [
        Localize_cns("FABAO_QUALITY_TXT6"),
        Localize_cns("FABAO_QUALITY_TXT5"),
        Localize_cns("FABAO_QUALITY_TXT4"),
        Localize_cns("FABAO_QUALITY_TXT3"),
        Localize_cns("FABAO_QUALITY_TXT2"),
        Localize_cns("FABAO_QUALITY_TXT1"),
    ]
    return qualityList[quality - 1]
}

//字体gui颜色
function GetItemFontGUIColor(entryId) {
    let item = ItemSystem.getInstance().getItemTemplateInfo(entryId)
    let color = gui.Color.gray
    if(item != null && item.quality != null){
        color =  GetQualityGUIColor(item.quality)
    }
    return color
}

//品质框图片
function GetItemQualityImage(entryId, quality?) {
    let imageName = "ty_zhuangBeiBg01"

    let itemRef = ItemSystem.getInstance().getItemTemplateInfo(entryId) || null
    if (!itemRef || !EquipQualityImage[itemRef["quality"] || quality || opEquipQuality.gray]) {
        return imageName
    }

    imageName = EquipQualityImage[itemRef["quality"] || quality || opEquipQuality.gray]

    return imageName
}


//-----------------------------------------------------------------------
//获取对象的头像、模型（伙伴、职业、怪物）
function GetActorImageName(entryId, sex?) {
    let imageName = "pet_20001"

    if (GameConfig.PetConfig[entryId]) {
        imageName = GetPetIconImage(entryId)
    } else if (GameConfig.MonsterConfig[entryId]) {
        imageName = GetMonsterIconImage(entryId)

    } else if (GameConfig.ActorRoleConfig[entryId]) {
        imageName = GetProfessionIcon(entryId, sex)
    } else if (GameConfig.ActorXianLvConfig[entryId]) {
        imageName = GetXianlvIconImage(entryId)
    }

    return imageName
}


function GetHeroModel() {
    let hero = GetHeroPropertyInfo()
    return GetActorModel(hero.vocation, hero.sexId)
}

function GetActorModel(entryId, sex?) {
    let modelId = 20001

    if (GameConfig.PetConfig[entryId]) {
        modelId = GetPetModel(entryId)
    } else if (GameConfig.MonsterConfig[entryId]) {
        modelId = GetMonsterModel(entryId)
    } else if (GameConfig.ActorRoleConfig[entryId]) {
        modelId = GetProfessionModel(entryId, sex)
    } else if (GameConfig.ActorXianLvConfig[entryId]) {
        modelId = GetXianlvModel(entryId)
    }

    return modelId
}



//职业原画
function GetProfessionImage(vocation, sex) {
    let imagePath = {
			[10001]:{//人族
				[genderOptions.MALE] : "dl_renTu01",
				[genderOptions.FEMALE] : "dl_renTu02",
			},
			[10002]:{//仙族
				[genderOptions.MALE] : "dl_xianTu01",
				[genderOptions.FEMALE] : "dl_xianTu02",
			},
			[10003]:{//妖族
				[genderOptions.MALE] : "dl_moTu01",
				[genderOptions.FEMALE] : "dl_moTu02",
			},
		}
    if(imagePath[vocation] == null || imagePath[vocation][sex] == null)
        return "dl_renTu01"

    return imagePath[vocation][sex]
}

// function GetActorEntryId(actorInfo) {
// 	if (actorInfo.classname == "HeroInfo" || actorInfo.classname == "PlayerInfo") {
// 		return actorInfo.getProperty("vocation")
// 	} else if (actorInfo.classname == "PetInfo") {
// 		return actorInfo.getProperty("entry")
// 	} else {
// 		return actorInfo[0]
// 	}
// }


function GetPetQualityLevelColor(qualityLevel) {
    let color = gui.Color.white
    let colorStr = "white"
    qualityLevel = qualityLevel || 0

    let colorList: any = {
        [0]: [gui.Color.white, "white"],
        [1]: [gui.Color.cyan, "cyan"],
        [2]: [gui.Color.magenta, "magenta"],
        [3]: [gui.Color.gold, "gold"],
        [4]: [gui.Color.white, "white"],
    }

    if (colorList[qualityLevel]) {
        color = colorList[qualityLevel][0]
        colorStr = colorList[qualityLevel][1]
    }

    return [color, colorStr]
}

/////////////////////////////////////////////////////////////////////
//通用等级模型
function GetFunShapeModel(funType, stage) {
    return GameConfig.FunShapeConfig[cellOptionsName[funType - 1]][stage].Shape
}


/////////////////////////////////////////////////////////////////////
//根据shapeID，获取模型
function GetShapeModelId(shapeId, sex?) {
    let config = GameConfig.ModelShapeConfig[shapeId]
    if(config == null)
        return 0

    if(sex == null){
        sex = genderOptions.MALE
    }

    if(sex == genderOptions.MALE){
        return config.model
    }else{
        return config.model2
    }
}

function GetShapeEffectId(shapeId) {
    let config = GameConfig.ModelShapeConfig[shapeId]
    if(config == null)
        return 0
     return config.effectId
}

function GetShapeRideOffY(shapeId) {
    let config = GameConfig.ModelShapeConfig[shapeId]
    if(config == null)
        return 0
    return config.offy
}


function GetShapeImage(shapeId) {
    let config = GameConfig.ModelShapeConfig[shapeId]
    if(config == null)
        return ""
    return config.image
}








function GetVipIcon(vip) {
    if(vip == null || vip < 0 || vip > 10)
        return "vipLv00"
    return String.format("vipLv%02d", vip)
}

/////////////////////////////////////////////////////
//关卡模型
function GetCampaignBossModel(campaignId) {
    if (GameConfig.CampaignConfig[campaignId]) {
        return GameConfig.CampaignConfig[campaignId].bossImage
    }
    return null
}