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



function getSaveRecord(key) {
    let heroInfo = GetHeroPropertyInfo()
    if (heroInfo == null || heroInfo["saveRecord"] == null) {
        return null
    }

    let record = heroInfo["saveRecord"][key]
    if (!record) { return null }

    if (record[1] != 0 && GetServerTime() > record[1]) { //时效性
        return null
    }
    return record[0]
}

function getSaveRecordTime(key) {
    let heroInfo = GetHeroPropertyInfo()
    if (heroInfo == null) {
        return null
    }

    let record = heroInfo["saveRecord"][key]
    if (!record) { return null }
    return record[1]
}

class RoleSystem extends BaseSystem {

    surpriseEvent: any;
    inviteList: any
    saveServerTime: number;
    myCreatTime: number;
    serverLevel: number;
    recvRoleList;
    roleInfo;
    offlineInfo
    equipItemList ;
    roleProperty 
    faBaoInfo
    fabaoItemList

    static FABAO_QUALITY_CHUANSHUO  =  6
    static FABAO_QUALITY_WANMEI     =  5
    static FABAO_DAZAO_MAT_FASHU    =  60074
    static FABAO_DAZAO_MAT_SHENTIE  =  60075
    static FABAO_DAZAO_MAT_XUANJING =  60008

    //xinglingExperienceInfo:ImmortalsExperienceInfo
    honorId: number;

    public initObj(...args: any[]): void {

        this.onClear()


 //       RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onHeroInfoUpdate, this)
        //RegisterEvent(EventDefine.SKILL_LIVE_LIST_UPDATE, this.onUpdatePowerMax, this )
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onRevHeroEnterGame, this)
        // RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this)

        // RegisterEvent(EventDefine.LOGIN_GUEST_BIND_STATE_UPDATE, this.requestBindPrize, this)
        // RegisterEvent(EventDefine.GAME_RESUME, this.onGameResume, this)
        //RegisterEvent(EventDefine.LOGIN_LOGO_HIDE_FINISH, this.onRevHeroEnterGameFinish, this)

    }

    destory() {
        this.onClear()
    }



    onClear() {
        //TLog.Debug("RoleSystem.onClear")
        this.serverLevel = 0
        this.myCreatTime = 0
        this.saveServerTime = 0

        this.inviteList = {}
        //this.xinglingExperienceInfo = null

        this.honorId = 0
        this.roleInfo = {}
        this.recvRoleList = {}
        this.offlineInfo = {}
        this.equipItemList = {}
        this.roleProperty = {}
        this.faBaoInfo = {}
        this.fabaoItemList = {}
    }

    prepareResource(workQueue) {
        GameConfig.initRoleSystemCsv(workQueue);
        GameConfig.initGrowSystemCsv(workQueue)
    }

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

    onHeroInfoUpdate(args: ActorUpdateEvent) {
        let oldVal = args.oldProperty
        let newVal = args.newProperty

        //主角升级
        if (newVal.level > oldVal.level) {
            TLog.Debug("//////////-HERO_LEVELUP//////////////-")
            for (let i = oldVal.level + 1; i <= newVal.level; i++) {
                FireEvent(EventDefine.HERO_PER_LEVELUP, HeroPerLevelUpEvent.newObj(i))
            }

            FireEvent(EventDefine.HERO_LEVELUP, null)
            //WngMrg.getInstance().showWindow("LevelUpFrame")

            let hero = GetHero()
            let serverInfo = LoginSystem.getInstance().getRecentLoginServerInfo()
            let infoParam = "roleId=" + hero.getId() + "&roleName=" + GetHeroProperty("name") + "&roleLevel=" + newVal.level + "&serverId=" + serverInfo.ServerID + "&serverName=" + serverInfo.ServerName
            SdkHelper.getInstance().callSdk(SdkFunctionDefine.OnLevelUp, infoParam)
        }


    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-
    getLevelupExp(): number {
        let level = GetHeroProperty("level") || 0
        let config = GameConfig.FunUpgradeStageConfig[cellOptionsName[cellOptionsIndex.Hero - 1]]
        for (let _ in config) {
            let v = config[_]

            if (v.Level == level) {
                return v.maxexp
            }
        }

        return -1
    }

    setServerLevel(level) {
        this.serverLevel = level
        //FireEvent(EventDefine.SERVER_LEVEL_UPDATE, null)
    }

    getServerLevel(level) {
        return this.serverLevel

    }

    getSystemSetting(index) {
        return IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, index, 1)
    }

    setSystemSetting(index, num) {
        IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, index, num)
    }


    setRoleCreateTime(creatTime) {
        this.myCreatTime = creatTime
    }
    getRoleCreateTime(creatTime) {
        return this.myCreatTime
    }


    setServerTime(time) {
        this.saveServerTime = time
    }

    getServerTime() {
        return this.saveServerTime
    }


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




    onRevHeroEnterGame(args) {

        // this.onUpdatePowerMax()

        // LoginSystem.getInstance().requestAccountBindState(function(this) 
        //     this.requestBindPrize()
        // }, this)

        // this.requestScorePrize()

        //信息推送
        // this.loadLocalNoticeConfig()
        // this.initNotificationTime()

        //检查等级开启功能
        GuideSystem.getInstance().updateHeroFunc(true)
    }

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
    updateRoleInfoField(updateProperty) {
        let Info = this.roleInfo

        if (Info == null) {
            //TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
            return
        }

        for (let k in updateProperty) {
            let v = updateProperty[k]

            if (!Info[k]) {
                TLog.Error("RoleSystem.updateRoleInfoField field error : " + k)
            } else {
                Info[k] = v
                if(k == "equiplist"){
                    this.updateItemList()
                }
            }
        }
        this.roleInfo = Info
        
        FireEvent(EventDefine.ACTOR_ROLE_UPDATE, null)
    }

    initRoleInfo(info) {
        this.roleInfo = info
        this.updateItemList()
    }
    getRoleInfo(index: string) {
        if (this.roleInfo[index] != null) {
            return this.roleInfo[index]
        } else {
            return null;
        }
    }
    getRecvList(){
        return this.roleInfo
    }


    getProfessionRefProperty(entryId, pro){
        let config = GameConfig.ActorRoleConfig[entryId]
        if(config){
            return config[pro]
        }
        return null
    }

    ////格式化经验值
    getExpStr(exp){
        let str = ""
        if(exp >= 10000 && exp < 100000000){
			let temp =  AdjustNumberFont(exp/10000, 2)
			str += temp + Localize_cns("ROLE_TXT38") 
		}else if(exp >= 100000000){
            let temp =  AdjustNumberFont(exp/100000000, 2)
			str += temp + Localize_cns("ROLE_TXT33") 
        }else{
            str = tostring(exp)
        }
        return str
    }

    /////////////玩家离线
    initOfflineInfo(info){
        this.offlineInfo = info
        if(size_t(this.offlineInfo) != 0){
             let wnd = WngMrg.getInstance().getWindow("PlayerOffLineFrame")
             wnd.showWnd()
        }
       
       // FireEvent(EventDefine. PALYER_OFFINE_REFRESH, null)
    }
    getOfflineInfo(){
        return this.offlineInfo || {}
    }

    ////获取装备底图
    getZhuangBeiIcon(pos){
        let icon = [
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
        ]
        
        return icon[pos]
    }

    ///更新equipitemlist
    updateItemList(){
        let list = this.getRoleInfo("equiplist")
        if(size_t(list) == 0){
            return
        }
        for(let k in list){
            let entryId = list[k][1]
			let quality = list[k][objectField.ITEM_FIELD_QUALITY]
			let itemInfo: any = {}
			itemInfo.entry = entryId
			itemInfo.quality = quality
			let item = Item.newObj(itemInfo)
            let subtype = item.getRefProperty("subtype")
            this.equipItemList[subtype] = item
			//table_insert(this.equipItemList, item)
        }
    }

    getRoleEquipItemList(){
        return this.equipItemList
    }

    getRoleEquipItem(subtype){
        if(size_t(this.equipItemList) == 0) {
            return null
        }
        return this.equipItemList[subtype];
        //for(let k in this.equipItemList){
        //    let item = <Item>this.equipItemList[k]
        //    if(item.getRefProperty("subtype") == subtype){
        //        return item
        //    }
        //}
        //return null
        
    }

    ///角色装备
	getRoleEquipList(){
        let level = this.getRoleInfo("stage")
		let equipitemlist = []
		for(let i = 201; i <= 210; i++){
            let equipList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ROLE_EQUIP,i)
			let itemList = this.getEquiplistByLevel(equipList, level)
            let item = this.getMaxForceItem(itemList)
            if(item != null){
                let equipitem = this.getRoleEquipItem(i)
			    if(equipitem != null){
				    let ePro = GetRoleEquipBaseProperty(equipitem.entryId, equipitem.getProperty("quality") || opEquipQuality.gray )
				    let eForce = GetForceMath(ePro)
				    let itemPro = GetRoleEquipBaseProperty(item.entryId, item.getProperty("quality") || opEquipQuality.gray )
				    let itemForce = GetForceMath(itemPro)
                    if(itemForce > eForce){
					    JsUtil.arrayInstert(equipitemlist, item)
				    }
			    }else{
				    JsUtil.arrayInstert(equipitemlist, item)
			    }
            }
					
		}
		return equipitemlist
	}

	//获取最高的战力的item
	getMaxForceItem(itemlist){
        if(size_t(itemlist) == null){
            return null
        }
		let force = 0
		let recvitem 
		for(let i = 0; i < size_t(itemlist); i++){
			let item = itemlist[i]
			let ePro = GetRoleEquipBaseProperty(item.entryId, item.getProperty("quality"))
			let eForce = GetForceMath(ePro)
			if(force < eForce){
				force = eForce
				recvitem = item
			}
		}
		return recvitem
	}

	getEquiplistByLevel(itemlist, level){
		let recvlist = []
		for(let k in itemlist){
			let item = <Item>itemlist[k]
			if(item.getRefProperty("uselevel") <= level){
				table_insert(recvlist, item)
			}
		}
		return recvlist
	}

    ////////---------------角色属性
    initRoleProperty(message){
        let tempConfig : any = {}
        for(let k = 0; k < size_t(message); k++){
            let begin = objectField.UNIT_FIELD_VALUE_BEGIN 
            let key = begin + k
            let strKey = IndexToabilityName[key]
            tempConfig[strKey] = message[k]
        }
      
        this.roleProperty = tempConfig
        FireEvent(EventDefine.ACTOR_ROLE_UPDATE, null)
    }
    
    getRoleProperty(){
        return this.roleProperty
    }


     ////////---------------角色法宝
    initFaBaoInfo(message){
        this.faBaoInfo = message
        this.updateFaBaoList()
    }
    
    updateFaBaoInfo(updateProperty){
        let Info = this.faBaoInfo

        if (Info == null) {
            //TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
            return
        }

        for (let k in updateProperty) {
            let v = updateProperty[k]

            if (!Info[k]) {
               
            } else {
                Info[k] = v
                if( k == "talismanlist"){
                    this.updateFaBaoList()
                }
            }
        }
        this.faBaoInfo = Info
        
        FireEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, null)
    }

    getFaBaoInfo(){
        return  this.faBaoInfo
    }

    getFaBaoInfoByKey(key){
        if(this.faBaoInfo[key] == null){
            return null
        }
        return this.faBaoInfo[key]
    }

     ///更新法宝装备
    updateFaBaoList(){
        let faBaoInfo = this.getFaBaoInfo()
        if(faBaoInfo == null) return 
        let list = faBaoInfo["talismanlist"]
        
        for(let k in list){
            let entryId = list[k][1]
			let quality = list[k][objectField.ITEM_FIELD_QUALITY]
			let itemInfo: any = {}
			itemInfo.entry = entryId
			itemInfo.quality = quality
			let item = Item.newObj(itemInfo)
            this.fabaoItemList[k] = item
        }
        
    }

    getFaBaoItemList(){
        return this.fabaoItemList || {}
    }

    getFaBaoItem(pos){
        let k = pos + opTalismanEquipPos.begin - 1
        if(this.fabaoItemList[k] == null) return null
        return this.fabaoItemList[k]
    }

    //判断是否穿戴同一类型的//
    checkFaBaoItem(itemId, pos){
        let dataKey = pos + opTalismanEquipPos.begin - 1
        let list = this.fabaoItemList
        for(let k in list){
            let item : Item = list[k]
            if(item.entryId == itemId && pos != tonumber(k)){
                return false
            }
        }
        return true
    }
}   