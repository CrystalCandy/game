// TypeScript file

module RpcLogic{

    // export function CHeroLevelUp(){
        
    // }

    // export function G2C_EquipRefine(name:string, id:number){
    //     TLog.Debug("===========CEquipRefine", name, id)
    // }

    
    //角色列表
    export function G2C_ActorRoleInfoList(roleinfolist){
        TLog.Debug("===========G2C_ActorRoleInfoList")
        RoleSystem.getInstance().initRoleInfo(roleinfolist[0])
    }
    //宠物列表
    export function G2C_ActorPetInfoList(petinfolist){
        TLog.Debug("===========G2C_ActorPetInfoList")
        PetSystem.getInstance().updatePetInfoList(petinfolist)
    }
    //仙侣列表
    export function G2C_ActorXianlvInfoList(infolist){
        TLog.Debug("===========G2C_ActorXianlvInfoList")
        XianLvSystem.getInstance().initXianLvList(infolist)
    }

    //通用玩法列表
    export function G2C_ActorTempCellInfoList(funinfolist){
        TLog.Debug("===========G2C_ActorTempCellInfoList")
        FunSystem.getInstance()._initFunInfoField(funinfolist)
    }    
    
    //解锁新的宠物 
    export function G2C_ActorPetInfo(info){
        TLog.Debug("===========G2C_ActorPetInfo")
        PetSystem.getInstance().addPetInfo(info)
        FireEvent(EventDefine.PET_LIST_UPDATE, null)
    }
    //解锁新的仙侣
    export function G2C_ActorXianlvInfo(info){
        TLog.Debug("===========G2C_ActorXianlvInfo")
        XianLvSystem.getInstance().addXianLvInfo(info)

    }
    //解锁新的玩法
    export function G2C_ActorTempCellInfo(info){
        TLog.Debug("===========G2C_ActorTempCellInfo")
       // FunSystem.getInstance()._initFunInfoField(funinfolist)
    } 
       
    //角色信息更新
    export function G2C_ActorRoleInfoUpdate(entryid, xianlvupdate){
        TLog.Debug("===========G2C_ActorRoleInfoUpdate")
     //   for (let i = 0; i < xianlvupdate.length; i++) {
      //      let type = xianlvupdate[i]
            
     //   }
        RoleSystem.getInstance().updateRoleInfoField(xianlvupdate)
    }  

    export function G2C_ActorPetInfoUpdate(entryid, xianlvupdate){
        TLog.Debug("===========G2C_ActorPetInfoUpdate")
        PetSystem.getInstance().updatePetInfoField(entryid, xianlvupdate)
    }  

    export function G2C_ActorXianlvInfoUpdate(entryid, xianlvupdate){
        TLog.Debug("===========G2C_ActorXianlvInfoUpdate")
    
        XianLvSystem.getInstance()._updateXianLvInfoField(entryid, xianlvupdate)
    }  

   export function G2C_ActorTempCellInfoUpdate(entryid, tempupdate){
        TLog.Debug("===========G2C_ActorTempCellInfoUpdate")
        FunSystem.getInstance()._updateFunInfoField(entryid, tempupdate)
    }  

    //锻造功能
    export function G2C_EQUIP_FORGE_INFO(info){
         TLog.Debug("===========G2C_EQUIP_FORGE_INFO")
        ForgeSystem.getInstance().initForgeInfo(info) 

    }
    
    export function G2C_EQUIP_FORGE_UPDATE(id, info){
        TLog.Debug("===========G2C_EQUIP_FORGE_UPDATE")
        ForgeSystem.getInstance().updateForgeInfo(info)
    }    

    //玩家离线
    export function G2C_OfflineGains(info){
        TLog.Debug("===========G2C_OfflineGains")
       
        RoleSystem.getInstance().initOfflineInfo(info)
    } 

    //天仙
    export function G2C_ActorSimpleCellInfoList(info){
        TLog.Debug("===========G2C_ActorSimpleCellInfoList")
       
        TianXianSystem.getInstance().initTianXianList(info)
    } 

    //天仙信息更新
    export function G2C_ActorSimpleCellInfoUpdate(entryid, info){
        TLog.Debug("===========G2C_ActorSimpleCellInfoUpdate")
        TianXianSystem.getInstance().updateTianXianInfoField(entryid, info)
    }
    // export function G2C_CampaginRecord(campaginlist){
    //     TLog.Debug("===========G2C_CampaginRecord")
    //     //TianXianSystem.getInstance().updateTianXianInfoField(entryid, info)
    // }

    // export function G2C_CurCampaginInfo(maxcampaginId, autonum){
    //     TLog.Debug("===========G2C_CurCampaginInfo")
    //     //TianXianSystem.getInstance().updateTianXianInfoField(entryid, info)
    // }
    
    //商店列表
    export function G2C_ShopItemList(info){
        TLog.Debug("===========G2C_ShopItemList")
        ShopSystem.getInstance().initShopList(info)
    }
    
    //角色属性
    export function G2C_PlayerAllAbilityInfo(info){
        TLog.Debug("=========== G2C_PlayerAllAbilityInfo")
        RoleSystem.getInstance().initRoleProperty(info)
    }

    //角色法宝
    export function G2C_TALISMAN_INFO(info){
        TLog.Debug("=========== G2C_TALISMAN_INFO")
        RoleSystem.getInstance().initFaBaoInfo(info)
    }

    export function G2C_TALISMAN_UPDATE(id ,info){
        TLog.Debug("=========== G2C_TALISMAN_UPDATE")
        RoleSystem.getInstance().updateFaBaoInfo(info)
    }
}