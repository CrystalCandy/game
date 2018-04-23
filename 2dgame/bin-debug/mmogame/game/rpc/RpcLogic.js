// TypeScript file
var RpcLogic;
(function (RpcLogic) {
    // export function CHeroLevelUp(){
    // }
    // export function G2C_EquipRefine(name:string, id:number){
    //     TLog.Debug("===========CEquipRefine", name, id)
    // }
    //角色列表
    function G2C_ActorRoleInfoList(roleinfolist) {
        TLog.Debug("===========G2C_ActorRoleInfoList");
        RoleSystem.getInstance().initRoleInfo(roleinfolist[0]);
    }
    RpcLogic.G2C_ActorRoleInfoList = G2C_ActorRoleInfoList;
    //宠物列表
    function G2C_ActorPetInfoList(petinfolist) {
        TLog.Debug("===========G2C_ActorPetInfoList");
        PetSystem.getInstance().updatePetInfoList(petinfolist);
    }
    RpcLogic.G2C_ActorPetInfoList = G2C_ActorPetInfoList;
    //仙侣列表
    function G2C_ActorXianlvInfoList(infolist) {
        TLog.Debug("===========G2C_ActorXianlvInfoList");
        XianLvSystem.getInstance().initXianLvList(infolist);
    }
    RpcLogic.G2C_ActorXianlvInfoList = G2C_ActorXianlvInfoList;
    //通用玩法列表
    function G2C_ActorTempCellInfoList(funinfolist) {
        TLog.Debug("===========G2C_ActorTempCellInfoList");
        FunSystem.getInstance()._initFunInfoField(funinfolist);
    }
    RpcLogic.G2C_ActorTempCellInfoList = G2C_ActorTempCellInfoList;
    //解锁新的宠物 
    function G2C_ActorPetInfo(info) {
        TLog.Debug("===========G2C_ActorPetInfo");
        PetSystem.getInstance().addPetInfo(info);
        FireEvent(EventDefine.PET_LIST_UPDATE, null);
    }
    RpcLogic.G2C_ActorPetInfo = G2C_ActorPetInfo;
    //解锁新的仙侣
    function G2C_ActorXianlvInfo(info) {
        TLog.Debug("===========G2C_ActorXianlvInfo");
        XianLvSystem.getInstance().addXianLvInfo(info);
    }
    RpcLogic.G2C_ActorXianlvInfo = G2C_ActorXianlvInfo;
    //解锁新的玩法
    function G2C_ActorTempCellInfo(info) {
        TLog.Debug("===========G2C_ActorTempCellInfo");
        // FunSystem.getInstance()._initFunInfoField(funinfolist)
    }
    RpcLogic.G2C_ActorTempCellInfo = G2C_ActorTempCellInfo;
    //角色信息更新
    function G2C_ActorRoleInfoUpdate(entryid, xianlvupdate) {
        TLog.Debug("===========G2C_ActorRoleInfoUpdate");
        //   for (let i = 0; i < xianlvupdate.length; i++) {
        //      let type = xianlvupdate[i]
        //   }
        RoleSystem.getInstance().updateRoleInfoField(xianlvupdate);
    }
    RpcLogic.G2C_ActorRoleInfoUpdate = G2C_ActorRoleInfoUpdate;
    function G2C_ActorPetInfoUpdate(entryid, xianlvupdate) {
        TLog.Debug("===========G2C_ActorPetInfoUpdate");
        PetSystem.getInstance().updatePetInfoField(entryid, xianlvupdate);
    }
    RpcLogic.G2C_ActorPetInfoUpdate = G2C_ActorPetInfoUpdate;
    function G2C_ActorXianlvInfoUpdate(entryid, xianlvupdate) {
        TLog.Debug("===========G2C_ActorXianlvInfoUpdate");
        XianLvSystem.getInstance()._updateXianLvInfoField(entryid, xianlvupdate);
    }
    RpcLogic.G2C_ActorXianlvInfoUpdate = G2C_ActorXianlvInfoUpdate;
    function G2C_ActorTempCellInfoUpdate(entryid, tempupdate) {
        TLog.Debug("===========G2C_ActorTempCellInfoUpdate");
        FunSystem.getInstance()._updateFunInfoField(entryid, tempupdate);
    }
    RpcLogic.G2C_ActorTempCellInfoUpdate = G2C_ActorTempCellInfoUpdate;
    //锻造功能
    function G2C_EQUIP_FORGE_INFO(info) {
        TLog.Debug("===========G2C_EQUIP_FORGE_INFO");
        ForgeSystem.getInstance().initForgeInfo(info);
    }
    RpcLogic.G2C_EQUIP_FORGE_INFO = G2C_EQUIP_FORGE_INFO;
    function G2C_EQUIP_FORGE_UPDATE(id, info) {
        TLog.Debug("===========G2C_EQUIP_FORGE_UPDATE");
        ForgeSystem.getInstance().updateForgeInfo(info);
    }
    RpcLogic.G2C_EQUIP_FORGE_UPDATE = G2C_EQUIP_FORGE_UPDATE;
    //玩家离线
    function G2C_OfflineGains(info) {
        TLog.Debug("===========G2C_OfflineGains");
        RoleSystem.getInstance().initOfflineInfo(info);
    }
    RpcLogic.G2C_OfflineGains = G2C_OfflineGains;
    //天仙
    function G2C_ActorSimpleCellInfoList(info) {
        TLog.Debug("===========G2C_ActorSimpleCellInfoList");
        TianXianSystem.getInstance().initTianXianList(info);
    }
    RpcLogic.G2C_ActorSimpleCellInfoList = G2C_ActorSimpleCellInfoList;
    //天仙信息更新
    function G2C_ActorSimpleCellInfoUpdate(entryid, info) {
        TLog.Debug("===========G2C_ActorSimpleCellInfoUpdate");
        TianXianSystem.getInstance().updateTianXianInfoField(entryid, info);
    }
    RpcLogic.G2C_ActorSimpleCellInfoUpdate = G2C_ActorSimpleCellInfoUpdate;
    // export function G2C_CampaginRecord(campaginlist){
    //     TLog.Debug("===========G2C_CampaginRecord")
    //     //TianXianSystem.getInstance().updateTianXianInfoField(entryid, info)
    // }
    // export function G2C_CurCampaginInfo(maxcampaginId, autonum){
    //     TLog.Debug("===========G2C_CurCampaginInfo")
    //     //TianXianSystem.getInstance().updateTianXianInfoField(entryid, info)
    // }
    //商店列表
    function G2C_ShopItemList(info) {
        TLog.Debug("===========G2C_ShopItemList");
        ShopSystem.getInstance().initShopList(info);
    }
    RpcLogic.G2C_ShopItemList = G2C_ShopItemList;
    //角色属性
    function G2C_PlayerAllAbilityInfo(info) {
        TLog.Debug("=========== G2C_PlayerAllAbilityInfo");
        RoleSystem.getInstance().initRoleProperty(info);
    }
    RpcLogic.G2C_PlayerAllAbilityInfo = G2C_PlayerAllAbilityInfo;
    //角色法宝
    function G2C_TALISMAN_INFO(info) {
        TLog.Debug("=========== G2C_TALISMAN_INFO");
        RoleSystem.getInstance().initFaBaoInfo(info);
    }
    RpcLogic.G2C_TALISMAN_INFO = G2C_TALISMAN_INFO;
    function G2C_TALISMAN_UPDATE(id, info) {
        TLog.Debug("=========== G2C_TALISMAN_UPDATE");
        RoleSystem.getInstance().updateFaBaoInfo(info);
    }
    RpcLogic.G2C_TALISMAN_UPDATE = G2C_TALISMAN_UPDATE;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcLogic.js.map