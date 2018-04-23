/*
通用界面: 坐骑 翅膀 宠物（通灵 兽魂） 等等
定义: funelemOption
常用接口:

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
var FunSystem = (function (_super) {
    __extends(FunSystem, _super);
    function FunSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    FunSystem.prototype.destory = function () {
    };
    FunSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initFunSystemCsv(workQueue);
    };
    FunSystem.prototype.onClear = function () {
        this.funInfoList = {};
    };
    FunSystem.prototype._initFunInfoField = function (infoList) {
        if (infoList == null) {
            TLog.Warn("FunSystem._initFunInfoField get NULL");
            return;
        }
        for (var _ in infoList) {
            var v = infoList[_];
            this.funInfoList[v.entryid] = v;
        }
        FireEvent(EventDefine.PET_FUN_INFO_REFRESH, null);
    };
    FunSystem.prototype._refreshFunInfoField = function (funType, info) {
        if (this.funInfoList[funType]) {
            //TLog.Warn("FunSystem._refreshFunInfoField %d alreadey exsit", funOptionsName[funType])
        }
        this.funInfoList[funType] = info;
        FireEvent(EventDefine.PET_FUN_INFO_REFRESH, null);
    };
    FunSystem.prototype._updateFunInfoField = function (funType, updateProperty) {
        var funInfo = this.funInfoList[funType];
        if (funInfo == null) {
            //TLog.Warn("FunSystem._updateFunInfoField %d is null", funOptionsName[funType])
            return;
        }
        if (updateProperty == null) {
            return;
        }
        for (var k in updateProperty) {
            var v = updateProperty[k];
            funInfo[k] = v;
        }
        FireEvent(EventDefine.PET_FUN_INFO_UPDATE, null);
    };
    ////////////////////////////////////////////////////////////////
    FunSystem.prototype.getFunInfoWithType = function (funType) {
        if (this.funInfoList[funType] == null) {
            //TLog.Warn("FunSystem.getFunInfo %d is null", funOptionsName[funType])
            return;
        }
        return this.funInfoList[funType];
    };
    //模型
    FunSystem.prototype.getFunModel = function (funType, stage) {
        return GameConfig.FunShapeConfig[cellOptionsName[funType - 1]][stage].Shape;
    };
    //模型名
    FunSystem.prototype.getFunModelName = function (funType, stage) {
        return GameConfig.FunShapeConfig[cellOptionsName[funType - 1]][stage].nameStr;
    };
    //获取升级消耗材料
    FunSystem.prototype.getFunUpgradeMaterial = function (funType, stage) {
        var material = {};
        material.itemId = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].itemid;
        material.itemNum = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].itemnum;
        material.moneyUnit = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].moneyunit;
        material.money = GameConfig.FunUpgradeStageConfig[cellOptionsName[funType - 1]][stage].money;
        return material;
    };
    //获取pos位置的技能
    FunSystem.prototype.getFunSkillConfigWithPos = function (funType, pos) {
        return GameConfig.FunSkillCaseConfig[cellOptionsName[funType - 1]][pos];
    };
    //获取技能升级材料
    FunSystem.prototype.getFunSkillMaterialWithLv = function (funType, level) {
        return GameConfig.FunLevelNumConfig[cellOptionsName[funType - 1]][level];
    };
    //获取穿戴装备列表
    FunSystem.prototype.getWearEquipItemList = function (funType) {
        var funInfo = this.getFunInfoWithType(funType);
        var list = [];
        for (var i in funInfo.equiplist) {
            var entryId = funInfo.equiplist[i][1];
            var quality = funInfo.equiplist[i][objectField.ITEM_FIELD_QUALITY];
            var add_num = funInfo.equiplist[i][objectField.ITEM_FIELD_ADD_NUM];
            var itemInfo = {};
            itemInfo.entry = entryId;
            itemInfo.quality = quality;
            itemInfo.add_num = add_num;
            var item = Item.newObj(itemInfo);
            table_insert(list, item);
        }
        return list;
    };
    //获取pos位置的穿戴装备
    FunSystem.prototype.getWearEquipWithPos = function (funType, pos) {
        var list = this.getWearEquipItemList(funType);
        return list[pos];
    };
    //获取pos位置的subtype
    FunSystem.prototype.getFunSubTypeWithPos = function (funType, pos) {
        return GameConfig.FunEquipCaseConfig[cellOptionsName[funType - 1]].subtype[pos];
    };
    return FunSystem;
}(BaseSystem));
__reflect(FunSystem.prototype, "FunSystem");
//# sourceMappingURL=FunSystem.js.map