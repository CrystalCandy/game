/*
作者:
    yangguiming
    
创建时间：
   2017.03.15(周三)

意图：
   检查是否有红点提示
   定义红点事件步骤：
   1.定义 GuideFuncCheckDefine
   2.定义 GuideFuncEvent，checkDefine对应的刷新事件
   3.定义检查函数
   
公共接口：
   
*/
var GuideFuncSpace;
(function (GuideFuncSpace) {
    GuideFuncSpace.GuideFuncCheckDefine = {
        EVENT_EMAIL: "event_email",
        EVENT_FRIEND_APPLY: "event_friend_apply",
        EVENT_FRIEND_CHAT: "event_friend_chat",
        EVENT_ACTIVITY_OPEN: "event_activity_open",
        EVENT_CHAMPION_FIGHT: "event_champion_fight",
        EVENT_ALWAYS_SHOW: "event_always_show",
        //EVENT_PET_EQUIP: "event_pet_equip", //伙伴主角装备
        EVENT_PET_SKILLUPGRADE: "event_pet_skillupgrade",
        EVENT_SERVER_NOTICE: "event_server_notice",
        EVENT_PAY_PRIZE: "event_pay_prize",
        EVENT_VIP_DAILY: "event_vip_daily",
        EVENT_DYNAMIC_TIPS: "event_dynamic_tips",
        EVENT_CLUB_NULL: "event_club_null",
        EVENT_ITEM_EXSIT: "event_item_exsit",
        EVENT_COPY_MATERIAL: "event_copy_material",
        EVENT_COPY_DRAGON: "event_copy_dragon",
        EVENT_COPY_TEMPLE: "event_copy_temple",
        EVENT_COPY_HEAVEN: "event_copy_heaven",
        EVENT_BOSS_SINGLE: "event_boss_single",
        EVENT_BOSS_GLOBAL: "event_boss_global",
        EVENT_EQUIPPACKET_FULL: "event_equippacket_full",
        EVENT_COPY_DRAGONPRIZE: "event_copy_dragonprize",
        EVENT_COPY_HEAVENPRIZE: "event_copy_heavenprize",
        EVENT_MEIRI_HAOLI: "event_meiri_haoli",
        EVENT_WELFARE_SIGN: "event_welfare_sign",
        EVENT_WELFARE_SIGN_GIFT: "event_welfare_sign_gift",
        EVENT_WELFARE_LEVEL: "event_welfare_level",
        EVENT_WELFARE_MONTH_CARD: "event_welfare_month_card",
        EVENT_WELFARE_WEEK_CARD: "event_welfare_week_card",
        EVENT_MEIRI_PAY: "event_meiri_pay",
        EVENT_WELFARE: "event_welfare",
        EVENT_WELFARE_WELFARE: "event_welfare_welfare",
        //refreshDotTipsEvent
        EVENT_FUN_DAN: "event_fun_dan",
        EVENT_FUN_EQUIP: "event_fun_equip",
        EVENT_FUN_SKILL: "event_fun_skill",
        EVENT_FUN_UPGRADE: "event_fun_upgrade",
        EVENT_PET_UPGRADE: "event_pet_upgrade",
        EVENT_PET_EMBATTLE: "event_pet_embattle",
        EVENT_FORGE_QIANGHUA: "event_forge_qianghua",
        EVENT_FORGE_JINGLIAN: "event_forge_jinglian",
        EVENT_FORGE_DUANLIAN: "event_forge_duanlian",
        EVENT_FORGE_BAOSHI: "event_forge_baoshi",
        EVENT_ROLE_EQUIP_TIPS: "event_role_equip_tips",
        EVENT_ROLE_UPGRADE_TIPS: "event_role_upgrade_tips",
        EVENT_ROLE_TITLE_TIPS: "event_role_title_tips",
        EVENT_ROLE_FASHION_TIPS: "event_role_fashion_tips",
        EVENT_ROLE_SKILL: "event_role_skill",
        EVENT_XIANLV_TOTAL_UPGRADE: "event_xianlv_total_upgrade",
        EVENT_XIANLV_UPGRADE: "event_xianlv_upgrade",
        EVENT_XIANLV_TOTAL_UPSTART: "event_xianlv_total_upstart",
        EVENT_XIANLV_UPSTART: "event_xianlv_upstart",
        EVENT_XIANLV_JIHUO: "event_xianlv_jihuo",
        EVENT_DAILY_XIANGYAO: "event_daily_xiangyao",
        EVENT_DAILY_ZUDUI: "event_daily_zudui",
        EVENT_DAILY_SANBAI: "event_daily_sanbai",
        EVENT_DAILY_LILIAN: "event_daily_lilian",
    };
    GuideFuncSpace.GuideFuncReadTypeDefine = {
        // PET_AWAKE: "awake",
        // PROFESSION_PROMOTE: "profession",
        // PET_HERO_LEVEL: "level",
        // PET_HERO_SKILLLEVEL: "skilllevel",
        // STONE_LINK: "link", //天赋石羁绊
        // STONE_LINKEMPTY: "linkempty", //天赋石多了个孔
        // SHOP_SELL: "shopsell",
        // ACTIVATE_GIFT: "actgift",
        TASK_CAMPAIN: "taskcampain",
    };
    //需要监听的事件列表
    GuideFuncSpace.GuideFuncEvent = (_a = {},
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_EMAIL] = [EventDefine.MAIL_LIST,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FRIEND_APPLY] = [EventDefine.FRIEND_APPLYLIST_UPDATE,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FRIEND_CHAT] = [EventDefine.MESSAGE_UPDATE, EventDefine.OFFLINE_CHAT_MSG, EventDefine.FRIEND_UNREAD_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ACTIVITY_OPEN] = [EventDefine.ACTIVITY_STATE_LIST, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_CHAMPION_FIGHT] = [EventDefine.HERO_INFO_UPDATE,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_UPGRADE] = [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.PET_UPDATE],
        //[GuideFuncCheckDefine.EVENT_PET_EQUIP]: [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_SKILLUPGRADE] = [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_SERVER_NOTICE] = [EventDefine.GUIDE_SERVER_NOTICE,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PAY_PRIZE] = [EventDefine.PAY_ACTIVITY_INFO,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_VIP_DAILY] = [EventDefine.HERO_INFO_UPDATE,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_CLUB_NULL] = [EventDefine.HERO_INFO_UPDATE,],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ITEM_EXSIT] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_MEIRI_HAOLI] = [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_SIGN] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_SIGN_GIFT] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_LEVEL] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_MONTH_CARD] = [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_MONTH_CARD],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_WEEK_CARD] = [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_WEEK_CARD],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_MEIRI_PAY] = [EventDefine.PAY_ACTIVITY_INFO, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_WELFARE] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_MATERIAL] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_DRAGON] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_TEMPLE] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_HEAVEN] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_BOSS_SINGLE] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_BOSS_GLOBAL] = [EventDefine.BOSSACTIVITY_INFO, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_EQUIPPACKET_FULL] = [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_DRAGONPRIZE] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_HEAVENPRIZE] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_DAN] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_EQUIP] = [EventDefine.ITEM_UPDATE, EventDefine.PET_FUN_INFO_REFRESH],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_SKILL] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_UPGRADE] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_BAOSHI] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_DUANLIAN] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_JINGLIAN] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_QIANGHUA] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_EQUIP_TIPS] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_UPGRADE_TIPS] = [EventDefine.ACTOR_ROLE_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_TITLE_TIPS] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_FASHION_TIPS] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_SKILL] = [EventDefine.HERO_INFO_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPGRADE] = [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_UPGRADE] = [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPSTART] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_UPSTART] = [EventDefine.ITEM_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_JIHUO] = [EventDefine.ITEM_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_XIANGYAO] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_ZUDUI] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_SANBAI] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_LILIAN] = [EventDefine.BOSSACTIVITY_INFO],
        _a[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_EMBATTLE] = [EventDefine.PET_UPDATE, EventDefine.PET_LIST_UPDATE],
        _a);
    GuideFuncSpace.guideFuncCheckHandler = {};
    //////////////////////////////////////////////////-
    //未读邮件
    function checkEmail(param, args) {
        return MailSystem.getInstance().getUnreadEmailCount() > 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_EMAIL] = checkEmail;
    //////////////////////////////////////////////////-
    //好友申请
    function checkFriendApply(param, args) {
        return FriendSystem.getInstance().getApplyStrangerCount() > 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FRIEND_APPLY] = checkFriendApply;
    //////////////////////////////////////////////////-
    //好友聊天未读
    function checkFriendUnReadMsgCount(param, args) {
        return FriendSystem.getInstance().getFriendUnReadMsgCount(-1) > 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FRIEND_CHAT] = checkFriendUnReadMsgCount;
    //////////////////////////////////////////////////-
    //活动开启
    function checkActivityOpen(param, args) {
        var exceptList = [OrdinaryActivityIndex.QIANGDA, OrdinaryActivityIndex.BAOXIANG, OrdinaryActivityIndex.SHENDIAN, OrdinaryActivityIndex.ROBBER_TICKET, OrdinaryActivityIndex.HDSHUANGBEI];
        for (var index in ActivityTimeDefine) {
            var _ = ActivityTimeDefine[index];
            if (table_isExsit(exceptList, tonumber(index)) == false) {
                var stateInfo = GetActivityTimeState(index);
                if (stateInfo && stateInfo.state == ActivityTimeState.ONGOING) {
                    return true;
                }
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ACTIVITY_OPEN] = checkActivityOpen;
    //////////////////////////////////////////////////-
    //竞技场挑战
    function checkChampionFight(param, args) {
        //return FriendSystem.getInstance().getFriendUnReadMsgCount(-1) > 0
        var times = checkNull(getSaveRecord(opSaveRecordKey.championTimes), ChampionConfig.totalTimes);
        var lastTime = getSaveRecord(opSaveRecordKey.championTime) || 0;
        return times > 0 && GetServerTime() > lastTime;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_CHAMPION_FIGHT] = checkChampionFight;
    //////////////////////////////////////////////////-
    //首次打开精彩活动
    function checkFirstShow(param, args) {
        if (param["shengdi"]) {
            var power = GetHeroProperty("power");
            return power > 0;
        }
        return true;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ALWAYS_SHOW] = checkFirstShow;
    //////////////////////////////////////////////////-
    //宠物升级
    function checkPetUpgrade(param, args) {
        // let curInfo = null
        // if (args) {
        // 	curInfo = args.curInfo
        // }
        // let heroInfo = GetHeroPropertyInfo()
        // if (heroInfo == null) {
        // 	return false
        // }
        // //let heroLevel = heroInfo.level || 0
        // //if(heroLevel > 20 ){ //角色大于20级，不提示升级红点
        // //	return false
        // //}
        // return this.checkCommonFunc(this.checkUpgradeExp, param, args)
        if (args == null || args.petId == null) {
            return false;
        }
        var petId = args.petId;
        return GuideFuncSystem.getInstance().checkPetUpgrade(petId);
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_UPGRADE] = checkPetUpgrade;
    //////////////////////////////////////////////////-
    //检查装备穿戴
    // function checkPetEquip(param, args) {
    // 	return this.checkPetFunc(this.checkEquipInternal, param, args)
    // }
    // guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PET_EQUIP] = checkPetEquip
    //////////////////////////////////////////////////-
    //检查技能升级
    function checkPetSkillUpgrade(param, args) {
        return this.checkCommonFunc(this.checkSkillUpgrade, param, args);
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_SKILLUPGRADE] = checkPetSkillUpgrade;
    //服务器简单（红点）通知提示
    function checkServerNotice(param, args) {
        var notice = GuideFuncSystem.getInstance().getServerNotice();
        var flag = false;
        ////临时处理
        //if(param && param["index"] && param["index"] >= 100 ){
        //	if(CheckMainFrameFunction("zudui") == false ){
        //		return false
        //	}
        //}else{
        //	if(CheckMainFrameFunction("homepage") == false ){
        //		return false
        //	}
        //}
        if (param["index"]) {
            for (var _ in notice) {
                var index = notice[_];
                if (index == param["index"]) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_SERVER_NOTICE] = checkServerNotice;
    //服务器简单（红点）通知提示
    function checkPayPrize(param, args) {
        var list = GuideFuncSystem.getInstance().checkPayActivityPrize();
        return size_t(list) > 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PAY_PRIZE] = checkPayPrize;
    //VIP每日奖励
    function checkVipDaily(param, args) {
        var level = VipSystem.getInstance().GetVipLevel();
        var flag = true;
        if (level <= 0) {
            level = 1;
            flag = false;
        }
        var record = getSaveRecord(opSaveRecordKey.vipGifts);
        if (record) {
            flag = false;
        }
        return flag;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_VIP_DAILY] = checkVipDaily;
    //////////////////////////////////////////////////-
    //动态提示
    function checkDynamicTips(param, args) {
        var dynamicType = param["type"];
        if (this.dynamicTipsMap[dynamicType]) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DYNAMIC_TIPS] = checkDynamicTips;
    //未加入公会
    function checkClubNull(param, args) {
        //let check = CheckMainFrameFunction("gonghui")
        //if(check == false ){
        //	return false;
        //}
        var factionId = GetHeroProperty("faction") || 0;
        var heroLevel = GetHeroProperty("level") || 0;
        if (heroLevel > 40) {
            return false;
        }
        return factionId == 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_CLUB_NULL] = checkClubNull;
    //物品存在
    function checkItemExsit(param, args) {
        var itemlist = param["itemlist"];
        if (itemlist == null || itemlist.length == 0) {
            return false;
        }
        var exsit = false;
        for (var _ = 0; _ < itemlist.length; _++) {
            var v = itemlist[_];
            var entryId = v[0];
            var count = v[1];
            if (ItemSystem.getInstance().getItemCount(entryId) >= count) {
                exsit = true;
                break;
            }
        }
        return exsit;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ITEM_EXSIT] = checkItemExsit;
    //材料副本
    function checkCopyMaterial(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.MaterialBoss);
        if (actInfo == null)
            return false;
        var heroLevel = GetHeroProperty("level") || 0;
        for (var k in GameConfig.CopyMaterialConfig) {
            var config = GameConfig.CopyMaterialConfig[k];
            if (heroLevel < config.level)
                continue;
            var count = 0;
            //扫荡过的次数
            if (actInfo.prizeRecord[config.index]) {
                count = actInfo.prizeRecord[config.index];
            }
            if (count < config.chance)
                return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_MATERIAL] = checkCopyMaterial;
    //龙王宝藏
    function checkCopyDragon(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss);
        if (actInfo == null)
            return false;
        if (actInfo.maxIndex == 0)
            return true;
        //下一关
        var nextIndex = actInfo.maxIndex + 1;
        var config = GameConfig.CopyDragonConfig[nextIndex];
        if (config == null)
            return false;
        return true;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_DRAGON] = checkCopyDragon;
    //小雷音寺
    function checkCopyTemple(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.SmallThunderTemple);
        if (actInfo == null)
            return false;
        if (actInfo.maxIndex == 0)
            return true;
        //下一关
        var nextIndex = actInfo.maxIndex + 1;
        var config = GameConfig.CopyTempleConfig[nextIndex];
        if (config == null)
            return false;
        return true;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_TEMPLE] = checkCopyTemple;
    //天庭试炼
    function checkCopyHeaven(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial);
        if (actInfo == null)
            return false;
        if (actInfo.maxIndex == 0)
            return true;
        //下一关
        var nextIndex = actInfo.maxIndex + 1;
        var config = GameConfig.CopyHeavenConfig[nextIndex];
        if (config == null)
            return false;
        return true;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_HEAVEN] = checkCopyHeaven;
    //个人BOSS
    function checkBossSingle(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.PersonBoss);
        if (actInfo == null)
            return false;
        var npcList = actInfo.npcList;
        var heroLevel = GetHeroProperty("level");
        for (var k in GameConfig.BossSingleConfig) {
            var config = GameConfig.BossSingleConfig[k];
            if (heroLevel.level < config.level)
                continue;
            //剩余次数
            var count = config.chance;
            if (npcList[config.index]) {
                count = count - npcList[config.index];
            }
            if (count > 0)
                return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_BOSS_SINGLE] = checkCopyHeaven;
    //全民BOSS
    function checkBossGlobal(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss);
        if (actInfo == null)
            return false;
        if (actInfo.remainCount <= 0)
            return false;
        var npcList = actInfo.npcList;
        var serverTime = GetServerTime();
        var heroLevel = GetHeroProperty("level");
        for (var k in GameConfig.BossGlobalConfig) {
            var config = GameConfig.BossGlobalConfig[k];
            if (heroLevel < config.level)
                continue;
            var bossInfo = npcList[config.index];
            if (bossInfo == null)
                continue;
            if (bossInfo.refreshTime == 0 || serverTime >= bossInfo.refreshTime) {
                if (bossInfo.hpPercent > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_BOSS_GLOBAL] = checkCopyHeaven;
    //装备满了
    function checkEquipPacketFull(param, args) {
        return ItemSystem.getInstance().isEquipPacketAlmostFull();
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_EQUIPPACKET_FULL] = checkEquipPacketFull;
    //龙王宝藏领奖
    function checkCopyDragonPrize(param, args) {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss);
        if (actInfo == null)
            return false;
        if (actInfo.maxIndex == 0)
            return false;
        //类型"sixStar", "twelve", "eighteen"
        var type = param["type"];
        var andOp = opDragonBossChapterConfig[type];
        if (andOp == null)
            return false;
        var config = GameConfig.CopyDragonConfig[actInfo.maxIndex];
        if (config == null)
            return false;
        //按位与
        var state = actInfo.stageList[config.chapter];
        if (state == null)
            return false;
        return (state & andOp) == andOp;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_DRAGONPRIZE] = checkCopyDragonPrize;
    function checkCopyHeavenPrize(param, args) {
        // let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial)
        // if (actInfo == null)
        // 	return false;
        // let maxIndex = actInfo.maxIndex//历史最大进度
        // if (maxIndex == 0)
        // 	return false;
        // let boxIndex = actInfo.boxIndex//宝箱领取进度（已领取的）
        // for (let i = boxIndex; i < maxIndex; i++) {
        // 	let config = GameConfig.CopyHeavenConfig[i]
        // 	if (size_t(config.box)) {
        // 		return true
        // 	}
        // }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_COPY_HEAVENPRIZE] = checkCopyHeavenPrize;
    //每日豪礼
    function checkMeiriHaoli(param, args) {
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        var rmb = GetRmbFromGold(dailyPayCount);
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.DAILY_EXPENSIVE_GIFT);
        if (playerInfo == null) {
            return false;
        }
        var isGet = playerInfo[1]; //0未领取 //1已领取
        if (isGet == 0 && rmb >= 100) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_MEIRI_HAOLI] = checkMeiriHaoli;
    //福利大厅-签到奖励
    function checkWelfareSign(param, args) {
        var meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao);
        var getPrize = meiRiInfo.getPrize;
        if (getPrize[dailyPrizeType.accumulateLogin] == 0 || getPrize[dailyPrizeType.dailyLogin] == 0) {
            return true;
        }
        var curVip = VipSystem.getInstance().GetVipLevel();
        if (curVip >= 4 && getPrize[dailyPrizeType.vipLogin] == 0) {
            return true;
        }
        var dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0;
        if (dailyPayCount > 0 && getPrize[dailyPrizeType.rechangeLogin] == 0) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_SIGN] = checkWelfareSign;
    //每日签到奖励
    function checkWelfareSignGift(param, args) {
        var meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao);
        var getPrize = meiRiInfo.getPrize;
        return getPrize[dailyPrizeType.accumulateLogin] == 0;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_SIGN_GIFT] = checkWelfareSignGift;
    //福利大厅-等级奖励
    function checkWelfareLevel(param, args) {
        var levelInfo = getSaveRecord(opSaveRecordKey.levelReward);
        var curLevel = GetHeroProperty("level") || 0;
        var list = [];
        for (var _ in GameConfig.LevelRewardConfig) {
            var v = GameConfig.LevelRewardConfig[_];
            table_insert(list, v);
        }
        for (var i = 0; i < size_t(list); i++) {
            var info = list[i];
            var needLevel = info.leve; //这个命名神坑
            if (curLevel >= needLevel) {
                if (levelInfo == null) {
                    return true;
                }
                else {
                    if (levelInfo[needLevel] == null) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_LEVEL] = checkWelfareLevel;
    //福利大厅-月卡
    function checkWelfareMonthCard(param, args) {
        var isBuy = PaySystem.getInstance().isMonthCardActive();
        var monthCardInfo = PaySystem.getInstance().getMonthCardInfo();
        if (monthCardInfo == undefined) {
            return false;
        }
        if (monthCardInfo.isGet == 0 && isBuy) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_MONTH_CARD] = checkWelfareMonthCard;
    //周卡
    function checkWelfareWeekCard(param, args) {
        var isBuy = PaySystem.getInstance().isWeekCardActive();
        var weekCardInfo = PaySystem.getInstance().getWeekCardInfo();
        if (weekCardInfo == undefined) {
            return false;
        }
        if (weekCardInfo.isGet == 0 && isBuy) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_WEEK_CARD] = checkWelfareWeekCard;
    //每日充值
    function checkMeiriPay(param, args) {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.DAY_ACCUM_PAY_PRIZE);
        var activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(PayActivityIndex.DAY_ACCUM_PAY_PRIZE);
        if (playerInfo == null || activityInfo == null) {
            return false;
        }
        var canGet = false;
        for (var _i = 0, _a = playerInfo.reachList; _i < _a.length; _i++) {
            var val = _a[_i];
            if (val == 1) {
                canGet = true;
            }
        }
        return canGet;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_MEIRI_PAY] = checkMeiriPay;
    //福利大厅-福利
    function checkWelfareWelfare(param, args) {
        var jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0;
        var recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || [];
        var list = [];
        var index = 100;
        for (var _ in GameConfig.XiyouWelfareConfig) {
            var v = GameConfig.XiyouWelfareConfig[_];
            if (jifenNum >= v.score) {
                if (recordList == null || recordList[v.index] == null) {
                    return true;
                }
            }
            index = index + 1;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE_WELFARE] = checkWelfareWelfare;
    //福利大厅
    function checkWelfare(param, args) {
        ////////////////////////////////签到奖励
        // let meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao)
        // let getPrize = meiRiInfo.getPrize
        // if (getPrize[dailyPrizeType.accumulateLogin] == 0 || getPrize[dailyPrizeType.dailyLogin] == 0) {
        // 	return true
        // }
        // let curVip = VipSystem.getInstance().GetVipLevel()
        // if (curVip >= 4 && getPrize[dailyPrizeType.vipLogin] == 0) {
        // 	return true
        // }
        // let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
        // if (dailyPayCount > 0 && getPrize[dailyPrizeType.rechangeLogin] == 0) {
        // 	return true
        // }
        // ////////////////////////////////等级奖励
        // ////////////////////////////////
        // let levelInfo = getSaveRecord(opSaveRecordKey.levelReward)
        // let curLevel = GetHeroProperty("level") || 0
        // let list = []
        // for (let _ in GameConfig.LevelRewardConfig) {
        // 	let v = GameConfig.LevelRewardConfig[_]
        // 	table_insert(list, v)
        // }
        // for (let i = 0; i < size_t(list); i++) {
        // 	let info = list[i]
        // 	let needLevel = info.leve	//这个命名神坑
        // 	if (curLevel >= needLevel) {
        // 		if (levelInfo == null) {
        // 			return true
        // 		} else {
        // 			if (levelInfo[needLevel] == null) {
        // 				return true
        // 			}
        // 		}
        // 	}
        // }
        // ////////////////////////////////月卡
        // ////////////////////////////////
        // let isBuy = PaySystem.getInstance().isMonthCardActive()
        // let monthCardInfo = PaySystem.getInstance().getMonthCardInfo()
        // if (monthCardInfo != undefined && monthCardInfo.isGet == 0 && isBuy) {
        // 	return true
        // }
        // ////////////////////////////////周卡
        // ////////////////////////////////
        // let isBuyWeekCard = PaySystem.getInstance().isWeekCardActive()
        // let weekCardInfo = PaySystem.getInstance().getWeekCardInfo()
        // if (weekCardInfo != undefined && weekCardInfo.isGet == 0 && isBuyWeekCard) {
        // 	return true
        // }
        // ////////////////////////////////
        // ////////////////////////////////福利大厅
        // let jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0
        // let recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || []
        // let index = 100
        // for (let _ in GameConfig.XiyouWelfareConfig) {
        // 	let v = GameConfig.XiyouWelfareConfig[_]
        // 	if (jifenNum >= v.score) {
        // 		if (recordList == null || recordList[v.index] == null) {
        // 			return true
        // 		}
        // 	}
        // 	index = index + 1
        // }
        ////////////////////////////////
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_WELFARE] = checkWelfare;
    //属性丹
    function checkFunDan(param, args) {
        var funType = param["type"];
        if (!cellOptionsName[funType - 1]) {
            return false;
        }
        return GuideFuncSystem.getInstance().checkPropertyDan(funType);
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_DAN] = checkFunDan;
    //通用装备
    function checkFunEquip(param, args) {
        var funType = param["type"];
        if (!funType) {
            return false;
        }
        var canwear = false;
        for (var i = 0; i < 4; i++) {
            canwear = GuideFuncSystem.getInstance().checkOneFunEquip(funType, i);
            if (canwear) {
                break;
            }
        }
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_EQUIP] = checkFunEquip;
    //通用技能
    function checkFunSkill(param, args) {
        var funType = param["type"];
        if (!funType) {
            return false;
        }
        var canUpgrade = false;
        for (var i = 0; i < 4; i++) {
            canUpgrade = GuideFuncSystem.getInstance().checkOneFunSkill(funType, i);
            if (canUpgrade) {
                break;
            }
        }
        return canUpgrade;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_SKILL] = checkFunSkill;
    //通用升阶
    function checkFunUpgrade(param, args) {
        var funType = param["type"];
        return GuideFuncSystem.getInstance().checkFunUpgrade(funType);
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FUN_UPGRADE] = checkFunUpgrade;
    //锻造强化
    function checkForgeStrength(param, args) {
        var type = param["type"];
        var typeName = elemForgeNames[type - 1];
        var level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0;
        var toLevel = level + 1;
        var config = GameConfig.FunForgeConfig[typeName][toLevel];
        if (config == null || config.money == null) {
            return false;
        }
        var itemId = param["itemId"];
        var had = GetHeroMoney(itemId);
        if (had < config.money) {
            return false;
        }
        return true;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_QIANGHUA] = checkForgeStrength;
    //锻造精炼
    function checkForgeRefine(param, args) {
        var type = param["type"];
        var typeName = elemForgeNames[type - 1];
        var level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0;
        var toLevel = level + 1;
        var config = GameConfig.FunForgeConfig[typeName][toLevel];
        if (config == null || config.money == null) {
            return false;
        }
        var itemId = param["itemId"];
        var had = ItemSystem.getInstance().getItemCount(itemId);
        return had >= config.itemnum;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_JINGLIAN] = checkForgeRefine;
    //锻造锻炼
    function checkForgeDuanLian(param, args) {
        var type = param["type"];
        var typeName = elemForgeNames[type - 1];
        var level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0;
        var toLevel = level + 1;
        var config = GameConfig.FunForgeConfig[typeName][toLevel];
        if (config == null || config.money == null) {
            return false;
        }
        var itemId = param["itemId"];
        var had = ItemSystem.getInstance().getItemCount(itemId);
        return had >= config.itemnum;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_DUANLIAN] = checkForgeDuanLian;
    //锻造宝石
    function checkForgeBaoShi(param, args) {
        var type = param["type"];
        var typeName = elemForgeNames[type - 1];
        var level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0;
        var toLevel = level + 1;
        var config = GameConfig.FunForgeConfig[typeName][toLevel];
        if (config == null || config.money == null) {
            return false;
        }
        var itemId = param["itemId"];
        var had = ItemSystem.getInstance().getItemCount(itemId);
        return had >= config.itemnum;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_FORGE_BAOSHI] = checkForgeBaoShi;
    //角色装备
    function checkRoleEquip(param, args) {
        var roleInfo = RoleSystem.getInstance().getRecvList();
        if (roleInfo == null)
            return false;
        //检查装备
        var itemlist = RoleSystem.getInstance().getRoleEquipList();
        if (size_t(itemlist) > 0)
            return true;
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_EQUIP_TIPS] = checkRoleEquip;
    //角色升级
    function checkRoleUpgrade(param, args) {
        var roleInfo = RoleSystem.getInstance().getRecvList();
        if (roleInfo == null)
            return false;
        //检查升级
        var level = roleInfo.stage;
        if (level >= 80) {
            var exp = roleInfo.stageexp;
            var maxExp = GameConfig.FunUpgradeStageConfig["Hero"][level].maxexp;
            if (exp >= maxExp)
                return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_UPGRADE_TIPS] = checkRoleUpgrade;
    //角色时装
    function checkRoleTitle(param, args) {
        var type = param["type"];
        var typeNameList = {
            Hero: "unlocktitlelist",
            HeroEquip: "unlockfashionlist"
        };
        var typeName = typeNameList[cellOptionsName[type - 1]];
        var roleInfo = RoleSystem.getInstance().getRoleInfo(typeName);
        var arr = GameConfig.FunSkinConfig[cellOptionsName[type - 1]];
        for (var k in arr) {
            var config = arr[k];
            var itemid = config.itemid;
            if (table_isExsit(roleInfo, config.Index))
                continue;
            var had = ItemSystem.getInstance().getItemCount(itemid);
            if (had >= config.itemnum)
                return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_TITLE_TIPS] = checkRoleTitle;
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_FASHION_TIPS] = checkRoleTitle;
    //角色技能
    function checkRoleSkillUpgrade(param, args) {
        var levelList = RoleSystem.getInstance().getRoleInfo("skilllevellist");
        for (var k in levelList) {
            var level = levelList[k];
            if (level == 0)
                continue;
            var heroStage = RoleSystem.getInstance().getRoleInfo("stage");
            if (level == heroStage)
                continue;
            var config = GameConfig.FunSpendMoneyItemConfig["HeroSkill"][level];
            var needMony = config.money;
            var had = GetHeroMoney(config.moneyunit);
            if (had >= needMony) {
                return true;
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_ROLE_SKILL] = checkRoleSkillUpgrade;
    //仙侣升阶 -- 总的
    function checkXianLvTotalUpgrade(param, args) {
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        /*if(!args || args.xianlvId == null){
            return false
        }
        let select = args.xianlvId */
        for (var k in jihuoList) {
            var xianlvId = jihuoList[k];
            //if(xianlvId != select) continue
            var lv = XianLvSystem.getInstance().getLevel(xianlvId);
            var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][lv];
            var costCount = upgradeConfig.itemnum;
            var had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
            if (had < costCount)
                continue;
            var money = upgradeConfig.money;
            var hadMoney = GetHeroMoney(upgradeConfig.moneyunit);
            if (hadMoney < money)
                continue;
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPGRADE] = checkXianLvTotalUpgrade;
    //仙侣升阶 ---单个
    function checkXianLvUpgrade(param, args) {
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        if (!args || args.xianlvId == null) {
            return false;
        }
        var xianlvId = args.xianlvId;
        if (table_isExsit(jihuoList, xianlvId) == false)
            return false;
        /*for(let k in jihuoList){
            let xianlvId = jihuoList[k]
            if(xianlvId != select) continue*/
        var lv = XianLvSystem.getInstance().getLevel(xianlvId);
        var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][lv];
        var costCount = upgradeConfig.itemnum;
        var had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
        if (had < costCount)
            return false;
        var money = upgradeConfig.money;
        var hadMoney = GetHeroMoney(upgradeConfig.moneyunit);
        if (hadMoney < money)
            return false;
        return true;
        /*}
        return false*/
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_UPGRADE] = checkXianLvUpgrade;
    //仙侣升星 --- 总的
    function checkXianLvTotalUpStart(param, args) {
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        /*if(!args || args.xianlvId == null){
            return false
        }
        let select = args.xianlvId */
        for (var k in jihuoList) {
            var xianlvId = jihuoList[k];
            //if(xianlvId != select) continue
            var star = XianLvSystem.getInstance().getStar(xianlvId);
            var upgradeConfig = GameConfig.FunUpStarConfig["XianLv"][xianlvId];
            var costCount = GameConfig.FunLevelNumConfig["XianLv"][star].num;
            var had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
            if (had < costCount)
                continue;
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPSTART] = checkXianLvTotalUpStart;
    //仙侣升星 -- 单个
    function checkXianLvUpStart(param, args) {
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        if (!args || args.xianlvId == null) {
            return false;
        }
        var xianlvId = args.xianlvId;
        if (table_isExsit(jihuoList, xianlvId) == false)
            return false;
        /*for(let k in jihuoList){
            let xianlvId = jihuoList[k]
            if(xianlvId != select) continue*/
        var star = XianLvSystem.getInstance().getStar(xianlvId);
        var upgradeConfig = GameConfig.FunUpStarConfig["XianLv"][xianlvId];
        var costCount = GameConfig.FunLevelNumConfig["XianLv"][star].num;
        var had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
        if (had < costCount)
            return false;
        return true;
        /*}
        return false*/
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_UPSTART] = checkXianLvUpStart;
    //仙侣激活
    function checkXianLvJiHuo(param, args) {
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        if (!args || args.xianlvId == null) {
            return false;
        }
        var xianlvId = args.xianlvId;
        var jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid;
        var jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum;
        var jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem);
        if (jiHuoHad >= jiHuoCost) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_XIANLV_JIHUO] = checkXianLvJiHuo;
    //日常降妖
    function checkDailyXiangYao(param, args) {
        var level = GetHeroProperty("level");
        if (level < 40)
            return false;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon);
        if (actInfo == null)
            return false;
        var npcList = actInfo.npcList;
        for (var k in npcList) {
            var npc = npcList[k];
            if (npc - GetServerTime() <= 0) {
                return true;
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_XIANGYAO] = checkDailyXiangYao;
    //日常组队
    function checkDailyZuDui(param, args) {
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_ZUDUI] = checkDailyZuDui;
    //日常三百
    function checkDailySanBai(param, args) {
        var level = GetHeroProperty("level");
        if (level < 40)
            return false;
        var actInfo = GetActivity(ActivityDefine.Boss).getSanBaiInfo();
        if (size_t(actInfo) == 0)
            return false;
        //如果是vip
        if (actInfo.isVip == 1) {
            if (actInfo.state != 3) {
                return true;
            }
        }
        var curhuan = actInfo.curhuan;
        if (curhuan >= 100 && curhuan < 200 && curhuan < 1) {
            return true;
        }
        else if (curhuan >= 200 && curhuan < 300 && curhuan < 2) {
            return true;
        }
        else if (curhuan >= 300 && curhuan < 3) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_SANBAI] = checkDailySanBai;
    //日常历练
    function checkDailyLiLian(param, args) {
        var stage = GetHeroProperty("level");
        if (stage < 40)
            return false;
        var actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo();
        if (size_t(actInfo) == 0)
            return false;
        var level = actInfo.level || 0;
        var curexp = actInfo.curexp || 0;
        var xiyouConfig = GameConfig.EveryDayLiLianUpConfig[level];
        if (xiyouConfig == null)
            return false;
        if (curexp >= xiyouConfig.exp) {
            return true;
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_DAILY_LILIAN] = checkDailyLiLian;
    //宠物布阵
    function checkPetEmbattle(param, args) {
        var petList = PetSystem.getInstance().getPetActiveList();
        for (var i in petList) {
            var petId = petList[i];
            if (GuideFuncSystem.getInstance().checkPetEmbattle(petId)) {
                return true;
            }
        }
        return false;
    }
    GuideFuncSpace.guideFuncCheckHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_PET_EMBATTLE] = checkPetEmbattle;
    //////////////////////////////////////回收////////////////////////////////////////////-
    GuideFuncSpace.recycleFuncHandler = {};
    //服务器简单（红点）通知提示
    function recycleServerNotice(config, param) {
        var notice = GuideFuncSystem.getInstance().getServerNotice();
        table_remove(notice, param["index"] || 0);
        delete this.manualCloseResultMap[config.id];
    }
    GuideFuncSpace.recycleFuncHandler[GuideFuncSpace.GuideFuncCheckDefine.EVENT_SERVER_NOTICE] = recycleServerNotice;
    var _a;
})(GuideFuncSpace || (GuideFuncSpace = {}));
//# sourceMappingURL=GuideFuncCheckerHandler.js.map