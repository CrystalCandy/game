/*
作者:
    yangguiming
    
创建时间：
   2013.6.20(周四)

意图：
   主角玩法
   套装、角色属性等

公共接口：
                sendAutoLevelMessage(){                //发送自动升级协议
   
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function getSaveRecord(key) {
    var heroInfo = GetHeroPropertyInfo();
    if (heroInfo == null || heroInfo["saveRecord"] == null) {
        return null;
    }
    var record = heroInfo["saveRecord"][key];
    if (!record) {
        return null;
    }
    if (record[1] != 0 && GetServerTime() > record[1]) {
        return null;
    }
    return record[0];
}
function getSaveRecordTime(key) {
    var heroInfo = GetHeroPropertyInfo();
    if (heroInfo == null) {
        return null;
    }
    var record = heroInfo["saveRecord"][key];
    if (!record) {
        return null;
    }
    return record[1];
}
var RoleSystem = (function (_super) {
    __extends(RoleSystem, _super);
    function RoleSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
        //       RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onHeroInfoUpdate, this)
        //RegisterEvent(EventDefine.SKILL_LIVE_LIST_UPDATE, this.onUpdatePowerMax, this )
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onRevHeroEnterGame, this);
        // RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this)
        // RegisterEvent(EventDefine.LOGIN_GUEST_BIND_STATE_UPDATE, this.requestBindPrize, this)
        // RegisterEvent(EventDefine.GAME_RESUME, this.onGameResume, this)
        //RegisterEvent(EventDefine.LOGIN_LOGO_HIDE_FINISH, this.onRevHeroEnterGameFinish, this)
    };
    RoleSystem.prototype.destory = function () {
        this.onClear();
    };
    RoleSystem.prototype.onClear = function () {
        //TLog.Debug("RoleSystem.onClear")
        this.serverLevel = 0;
        this.myCreatTime = 0;
        this.saveServerTime = 0;
        this.inviteList = {};
        //this.xinglingExperienceInfo = null
        this.honorId = 0;
        this.roleInfo = {};
        this.recvRoleList = {};
        this.offlineInfo = {};
        this.equipItemList = {};
        this.roleProperty = {};
        this.faBaoInfo = {};
        this.fabaoItemList = {};
    };
    RoleSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initRoleSystemCsv(workQueue);
        GameConfig.initGrowSystemCsv(workQueue);
    };
    // GetOverCash() {
    //     //角色等级*角色等级*2000+100000
    //     let level = GetHeroProperty("level")
    //     return level * level * 2000 + 100000
    // }
    //离线天数
    // GetOfflineDays() {
    //     let dayTable = getSaveRecord(opSaveRecordKey.logoutExp) || null
    //     if (dayTable && dayTable[6]) {
    //         return dayTable[6]
    //     }
    //     return 0
    // }
    //离线奖励，（经验，储备金）
    // GetOfflinePrize() {
    //     let dayTable = getSaveRecord(opSaveRecordKey.logoutExp) || null
    //     if (dayTable && dayTable[1] && dayTable[2]) {
    //         return [dayTable[1], dayTable[2]]
    //     }
    //     return [0, 0]
    // }
    //离线奖励， 是否已领取
    // IsGetOfflinePrize(type) {
    //     let dayTable = getSaveRecord(opSaveRecordKey.logoutExp) || null
    //     if (dayTable && dayTable[7] && dayTable[7] == type) {
    //         return true
    //     }
    //     return false
    // }
    ////////////////////////////////////////////////////////////////////////////////////////////////-
    RoleSystem.prototype.onHeroInfoUpdate = function (args) {
        var oldVal = args.oldProperty;
        var newVal = args.newProperty;
        //主角升级
        if (newVal.level > oldVal.level) {
            TLog.Debug("//////////-HERO_LEVELUP//////////////-");
            for (var i = oldVal.level + 1; i <= newVal.level; i++) {
                FireEvent(EventDefine.HERO_PER_LEVELUP, HeroPerLevelUpEvent.newObj(i));
            }
            FireEvent(EventDefine.HERO_LEVELUP, null);
            //WngMrg.getInstance().showWindow("LevelUpFrame")
            var hero = GetHero();
            var serverInfo = LoginSystem.getInstance().getRecentLoginServerInfo();
            var infoParam = "roleId=" + hero.getId() + "&roleName=" + GetHeroProperty("name") + "&roleLevel=" + newVal.level + "&serverId=" + serverInfo.ServerID + "&serverName=" + serverInfo.ServerName;
            SdkHelper.getInstance().callSdk(SdkFunctionDefine.OnLevelUp, infoParam);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-
    RoleSystem.prototype.getLevelupExp = function () {
        var level = GetHeroProperty("level") || 0;
        var config = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Hero - 1]];
        for (var _ in config) {
            var v = config[_];
            if (v.Level == level) {
                return v.maxexp;
            }
        }
        return -1;
    };
    RoleSystem.prototype.setServerLevel = function (level) {
        this.serverLevel = level;
        //FireEvent(EventDefine.SERVER_LEVEL_UPDATE, null)
    };
    RoleSystem.prototype.getServerLevel = function (level) {
        return this.serverLevel;
    };
    RoleSystem.prototype.getSystemSetting = function (index) {
        return IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, index, 1);
    };
    RoleSystem.prototype.setSystemSetting = function (index, num) {
        IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, index, num);
    };
    RoleSystem.prototype.setRoleCreateTime = function (creatTime) {
        this.myCreatTime = creatTime;
    };
    RoleSystem.prototype.getRoleCreateTime = function (creatTime) {
        return this.myCreatTime;
    };
    RoleSystem.prototype.setServerTime = function (time) {
        this.saveServerTime = time;
    };
    RoleSystem.prototype.getServerTime = function () {
        return this.saveServerTime;
    };
    // onHeroAwake(msg) {
    //     TLog.Debug("PetSystem.onHeroAwake")
    //     if (msg.code == 0) {
    //         let info = GetHeroPropertyInfo()
    //         info.awakeLevel = msg.tolevel
    //     }
    // }
    // onHeroBreak(msg) {
    //     TLog.Debug("PetSystem.onHeroBreak")
    //     if (msg.code == 0) {
    //         let info = GetHeroPropertyInfo()
    //         info.breakLevel = msg.tolevel
    //     }
    // }
    // setSurpriseFinishList(list) {
    //     this.surpriseEvent = list
    // }
    // getSurpriseFinishList() {
    //     return this.surpriseEvent || {}
    // }
    // updateInviteList(lType, info) {
    //     this.inviteList[lType] = info
    // }
    // getInviteList(lType) {
    //     return this.inviteList[lType] || {}
    // }
    RoleSystem.prototype.onRevHeroEnterGame = function (args) {
        // this.onUpdatePowerMax()
        // LoginSystem.getInstance().requestAccountBindState(function(this) 
        //     this.requestBindPrize()
        // }, this)
        // this.requestScorePrize()
        //信息推送
        // this.loadLocalNoticeConfig()
        // this.initNotificationTime()
        //检查等级开启功能
        GuideSystem.getInstance().updateHeroFunc(true);
    };
    // initFuncState() {
    //     let flag = false
    //     let errantry = GuideSystem.getInstance().getFuncState()
    //     for (let funcIndex in LevelFuncOpenLimit) {
    //         let level = LevelFuncOpenLimit[funcIndex]
    //         let func_bit = 0
    //         if (level <= GetHeroProperty("level")) {
    //             if (func_bit != 0) {
    //                 if (StringUtil.getBit(errantry, func_bit) != "1") {
    //                     errantry = StringUtil.changeBit(errantry, func_bit, "1")
    //                     flag = true
    //                 }
    //             }
    //         }
    //     }
    //     if (flag == true) {
    //         let message = GetMessage(opCodes.C2G_ROLE_NEWBIE_SETTING_RECORD)
    //         message.errantry = errantry
    //         SendGameMessage(message)
    //     }
    // }
    // setHeroHonorId(honorId) {
    //     let info = GetHeroPropertyInfo()
    //     info.honorTitle = honorId
    //     this.honorId = honorId
    // }
    // getHeroHonorId() {
    //     if (!this.honorId || this.honorId <= 0) {
    //         this.honorId = GetHeroProperty("honorTitle") || 0
    //     }
    //     return this.honorId
    // }
    // setXinglingExperienceInfo( info ){
    //     this.xinglingExperienceInfo = info
    // }
    // getXinglingExperienceInfo(){
    //     return this.xinglingExperienceInfo
    // }
    ///////////////////////角色信息//////////////////////
    RoleSystem.prototype.updateRoleInfoField = function (updateProperty) {
        var Info = this.roleInfo;
        if (Info == null) {
            //TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
            return;
        }
        for (var k in updateProperty) {
            var v = updateProperty[k];
            if (!Info[k]) {
                TLog.Error("RoleSystem.updateRoleInfoField field error : " + k);
            }
            else {
                Info[k] = v;
                if (k == "equiplist") {
                    this.updateItemList();
                }
            }
        }
        this.roleInfo = Info;
        FireEvent(EventDefine.ACTOR_ROLE_UPDATE, null);
    };
    RoleSystem.prototype.initRoleInfo = function (info) {
        this.roleInfo = info;
        this.updateItemList();
    };
    RoleSystem.prototype.getRoleInfo = function (index) {
        if (this.roleInfo[index] != null) {
            return this.roleInfo[index];
        }
        else {
            return null;
        }
    };
    RoleSystem.prototype.getRecvList = function () {
        return this.roleInfo;
    };
    RoleSystem.prototype.getProfessionRefProperty = function (entryId, pro) {
        var config = GameConfig.ActorRoleConfig[entryId];
        if (config) {
            return config[pro];
        }
        return null;
    };
    ////格式化经验值
    RoleSystem.prototype.getExpStr = function (exp) {
        var str = "";
        if (exp >= 10000 && exp < 100000000) {
            var temp = AdjustNumberFont(exp / 10000, 2);
            str += temp + Localize_cns("ROLE_TXT38");
        }
        else if (exp >= 100000000) {
            var temp = AdjustNumberFont(exp / 100000000, 2);
            str += temp + Localize_cns("ROLE_TXT33");
        }
        else {
            str = tostring(exp);
        }
        return str;
    };
    /////////////玩家离线
    RoleSystem.prototype.initOfflineInfo = function (info) {
        this.offlineInfo = info;
        if (size_t(this.offlineInfo) != 0) {
            var wnd = WngMrg.getInstance().getWindow("PlayerOffLineFrame");
            wnd.showWnd();
        }
        // FireEvent(EventDefine. PALYER_OFFINE_REFRESH, null)
    };
    RoleSystem.prototype.getOfflineInfo = function () {
        return this.offlineInfo || {};
    };
    ////获取装备底图
    RoleSystem.prototype.getZhuangBeiIcon = function (pos) {
        var icon = [
            "ty_weiZhuangBei01",
            "ty_weiZhuangBei03",
            "ty_weiZhuangBei05",
            "ty_weiZhuangBei07",
            "ty_weiZhuangBei10",
            "ty_weiZhuangBei02",
            "ty_weiZhuangBei04",
            "ty_weiZhuangBei06",
            "ty_weiZhuangBei08",
            "ty_weiZhuangBei09",
        ];
        return icon[pos];
    };
    ///更新equipitemlist
    RoleSystem.prototype.updateItemList = function () {
        var list = this.getRoleInfo("equiplist");
        if (size_t(list) == 0) {
            return;
        }
        for (var k in list) {
            var entryId = list[k][1];
            var quality = list[k][objectField.ITEM_FIELD_QUALITY];
            var itemInfo = {};
            itemInfo.entry = entryId;
            itemInfo.quality = quality;
            var item = Item.newObj(itemInfo);
            var subtype = item.getRefProperty("subtype");
            this.equipItemList[subtype] = item;
            //table_insert(this.equipItemList, item)
        }
    };
    RoleSystem.prototype.getRoleEquipItemList = function () {
        return this.equipItemList;
    };
    RoleSystem.prototype.getRoleEquipItem = function (subtype) {
        if (size_t(this.equipItemList) == 0) {
            return null;
        }
        return this.equipItemList[subtype];
        //for(let k in this.equipItemList){
        //    let item = <Item>this.equipItemList[k]
        //    if(item.getRefProperty("subtype") == subtype){
        //        return item
        //    }
        //}
        //return null
    };
    ///角色装备
    RoleSystem.prototype.getRoleEquipList = function () {
        var level = this.getRoleInfo("stage");
        var equipitemlist = [];
        for (var i = 201; i <= 210; i++) {
            var equipList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ROLE_EQUIP, i);
            var itemList = this.getEquiplistByLevel(equipList, level);
            var item = this.getMaxForceItem(itemList);
            if (item != null) {
                var equipitem = this.getRoleEquipItem(i);
                if (equipitem != null) {
                    var ePro = GetRoleEquipBaseProperty(equipitem.entryId, equipitem.getProperty("quality") || opEquipQuality.gray);
                    var eForce = GetForceMath(ePro);
                    var itemPro = GetRoleEquipBaseProperty(item.entryId, item.getProperty("quality") || opEquipQuality.gray);
                    var itemForce = GetForceMath(itemPro);
                    if (itemForce > eForce) {
                        JsUtil.arrayInstert(equipitemlist, item);
                    }
                }
                else {
                    JsUtil.arrayInstert(equipitemlist, item);
                }
            }
        }
        return equipitemlist;
    };
    //获取最高的战力的item
    RoleSystem.prototype.getMaxForceItem = function (itemlist) {
        if (size_t(itemlist) == null) {
            return null;
        }
        var force = 0;
        var recvitem;
        for (var i = 0; i < size_t(itemlist); i++) {
            var item = itemlist[i];
            var ePro = GetRoleEquipBaseProperty(item.entryId, item.getProperty("quality"));
            var eForce = GetForceMath(ePro);
            if (force < eForce) {
                force = eForce;
                recvitem = item;
            }
        }
        return recvitem;
    };
    RoleSystem.prototype.getEquiplistByLevel = function (itemlist, level) {
        var recvlist = [];
        for (var k in itemlist) {
            var item = itemlist[k];
            if (item.getRefProperty("uselevel") <= level) {
                table_insert(recvlist, item);
            }
        }
        return recvlist;
    };
    ////////---------------角色属性
    RoleSystem.prototype.initRoleProperty = function (message) {
        var tempConfig = {};
        for (var k = 0; k < size_t(message); k++) {
            var begin = objectField.UNIT_FIELD_VALUE_BEGIN;
            var key = begin + k;
            var strKey = IndexToabilityName[key];
            tempConfig[strKey] = message[k];
        }
        this.roleProperty = tempConfig;
        FireEvent(EventDefine.ACTOR_ROLE_UPDATE, null);
    };
    RoleSystem.prototype.getRoleProperty = function () {
        return this.roleProperty;
    };
    ////////---------------角色法宝
    RoleSystem.prototype.initFaBaoInfo = function (message) {
        this.faBaoInfo = message;
        this.updateFaBaoList();
    };
    RoleSystem.prototype.updateFaBaoInfo = function (updateProperty) {
        var Info = this.faBaoInfo;
        if (Info == null) {
            //TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
            return;
        }
        for (var k in updateProperty) {
            var v = updateProperty[k];
            if (!Info[k]) {
            }
            else {
                Info[k] = v;
                if (k == "talismanlist") {
                    this.updateFaBaoList();
                }
            }
        }
        this.faBaoInfo = Info;
        FireEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, null);
    };
    RoleSystem.prototype.getFaBaoInfo = function () {
        return this.faBaoInfo;
    };
    RoleSystem.prototype.getFaBaoInfoByKey = function (key) {
        if (this.faBaoInfo[key] == null) {
            return null;
        }
        return this.faBaoInfo[key];
    };
    ///更新法宝装备
    RoleSystem.prototype.updateFaBaoList = function () {
        var faBaoInfo = this.getFaBaoInfo();
        if (faBaoInfo == null)
            return;
        var list = faBaoInfo["talismanlist"];
        for (var k in list) {
            var entryId = list[k][1];
            var quality = list[k][objectField.ITEM_FIELD_QUALITY];
            var itemInfo = {};
            itemInfo.entry = entryId;
            itemInfo.quality = quality;
            var item = Item.newObj(itemInfo);
            this.fabaoItemList[k] = item;
        }
    };
    RoleSystem.prototype.getFaBaoItemList = function () {
        return this.fabaoItemList || {};
    };
    RoleSystem.prototype.getFaBaoItem = function (pos) {
        var k = pos + opTalismanEquipPos.begin - 1;
        if (this.fabaoItemList[k] == null)
            return null;
        return this.fabaoItemList[k];
    };
    //判断是否穿戴同一类型的//
    RoleSystem.prototype.checkFaBaoItem = function (itemId, pos) {
        var dataKey = pos + opTalismanEquipPos.begin - 1;
        var list = this.fabaoItemList;
        for (var k in list) {
            var item = list[k];
            if (item.entryId == itemId && pos != tonumber(k)) {
                return false;
            }
        }
        return true;
    };
    RoleSystem.FABAO_QUALITY_CHUANSHUO = 6;
    RoleSystem.FABAO_QUALITY_WANMEI = 5;
    RoleSystem.FABAO_DAZAO_MAT_FASHU = 60074;
    RoleSystem.FABAO_DAZAO_MAT_SHENTIE = 60075;
    RoleSystem.FABAO_DAZAO_MAT_XUANJING = 60008;
    return RoleSystem;
}(BaseSystem));
__reflect(RoleSystem.prototype, "RoleSystem");
//# sourceMappingURL=RoleSystem.js.map