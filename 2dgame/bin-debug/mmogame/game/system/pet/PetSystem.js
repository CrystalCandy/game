/*
作者:
    liuziming
    
创建时间：
   2013.8.08(周四)

意图：
   宠物系统，保存宠物信息列表

公共接口：
   
   //获取数据源
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
var PetSystem = (function (_super) {
    __extends(PetSystem, _super);
    function PetSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
        this.petInfoList = {};
        this.petActiveList = [];
        this.petTiredList = [];
    };
    PetSystem.prototype.destory = function () {
    };
    PetSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initPetSystemCsv(workQueue);
    };
    PetSystem.prototype.onClear = function () {
        this.petInfoList = {};
        this.petActiveList = []; //按照宠物的加入顺序排序
    };
    PetSystem.prototype.getPetName = function (entryid) {
        if (!GameConfig.PetConfig[entryid]) {
            return "" + entryid;
        }
        return GameConfig.PetConfig[entryid].name;
    };
    //添加宠物信息
    PetSystem.prototype.addPetInfo = function (petInfo) {
        if (this.petInfoList[tonumber(petInfo.entryid)]) {
            TLog.Warn("PetSystem.addPet %d alreadey exsit", petInfo.entryid);
        }
        this.petInfoList[tonumber(petInfo.entryid)] = petInfo;
        return this.addPetInActive(petInfo.entryid);
    };
    //局部更新宠物信息
    PetSystem.prototype.updatePetInfoField = function (petId, updateProperty) {
        if (this.petInfoList[petId] == null) {
            TLog.Error("PetSystem.updatePetInfoField petInfo:%d is ! exist!", petId);
            return;
        }
        var oldInfo = {};
        table_class_copy(oldInfo, this.petInfoList[petId]);
        for (var k in updateProperty) {
            var v = updateProperty[k];
            if (this.petInfoList[petId][k] == null) {
                TLog.Error("PetSystem.updatePetInfoField field error : " + k);
            }
            else {
                this.petInfoList[petId][k] = v;
            }
        }
        FireEvent(EventDefine.PET_UPDATE, PetUpdateEvent.newObj(petId, this.petInfoList[petId], oldInfo));
    };
    PetSystem.prototype.updatePetInfoList = function (petInfoList) {
        for (var _ in petInfoList) {
            var v = petInfoList[_];
            this.addPetInfo(v);
        }
    };
    PetSystem.prototype.getPetInfoList = function () {
        return this.petInfoList;
    };
    PetSystem.prototype.getPetInfo = function (petId) {
        if (!this.petInfoList[petId]) {
            TLog.Warn("PetSytem.getPetInfo %d ! exsit", petId);
            return null;
        }
        return this.petInfoList[petId];
    };
    //激活?
    PetSystem.prototype.isPetExitsInEntry = function (entryId) {
        var petInfo = null;
        for (var _ in this.petInfoList) {
            var v = this.petInfoList[_];
            if (v.entryid == entryId) {
                petInfo = v;
                break;
            }
        }
        return petInfo != null;
    };
    PetSystem.prototype.addPetInActive = function (petId) {
        if (!table_isExsit(this.petActiveList, petId)) {
            table_insert(this.petActiveList, petId);
        }
    };
    PetSystem.prototype.getPetActiveList = function () {
        table_sort(this.petActiveList, function (a, b) {
            return GameConfig.PetConfig[b].quality - GameConfig.PetConfig[a].quality;
        });
        //根据品质分类
        var list = {};
        for (var i in this.petActiveList) {
            var petId = this.petActiveList[i];
            var petConfig = this.getPetEntryInfo(petId);
            var temp = list[petConfig.quality];
            if (temp == null) {
                temp = [];
            }
            table_insert(temp, petId);
        }
        //根据sr排序
        for (var i in list) {
            var temp = list[i];
            table_sort(temp, function (a, b) {
                return GameConfig.PetConfig[b].sr - GameConfig.PetConfig[a].sr;
            });
        }
        return this.petActiveList;
    };
    PetSystem.prototype.getPetTiredList = function () {
        this.petTiredList = [];
        for (var i in GameConfig.PetConfig) {
            var v = GameConfig.PetConfig[i];
            //激活?
            if (!this.isPetExitsInEntry(v.Id)) {
                JsUtil.arrayInstert(this.petTiredList, v.Id);
            }
        }
        table_sort(this.petTiredList, function (a, b) {
            return GameConfig.PetConfig[a].quality - GameConfig.PetConfig[b].quality;
        });
        //根据品质分类
        var list = {};
        for (var i in this.petTiredList) {
            var petId = this.petTiredList[i];
            var petConfig = this.getPetEntryInfo(petId);
            var temp = list[petConfig.quality];
            if (temp == null) {
                temp = [];
            }
            table_insert(temp, petId);
        }
        //根据sr排序
        for (var i in list) {
            var temp = list[i];
            table_sort(temp, function (a, b) {
                return GameConfig.PetConfig[b].sr - GameConfig.PetConfig[a].sr;
            });
        }
        return this.petTiredList;
    };
    PetSystem.prototype.getPetIdWithIndex = function (index) {
        return this.petActiveList[index];
    };
    PetSystem.prototype.getPetEntryInfo = function (entryId) {
        return GameConfig.PetConfig[entryId];
    };
    PetSystem.prototype.getPetRefProperty = function (entryId, index) {
        if (!GameConfig.PetConfig[entryId]) {
            return null;
        }
        return GameConfig.PetConfig[entryId][index] || null;
    };
    PetSystem.prototype.getPetInfoEntry = function (entryId) {
        var petInfo = null;
        for (var _ in this.petInfoList) {
            var v = this.petInfoList[_];
            if (v.entry == entryId) {
                petInfo = v;
                break;
            }
        }
        //if(! petInfo ){
        //	TLog.Error("PetSystem.getPetInfoEntry %d is null!", entryId)
        //}
        return petInfo;
    };
    //////////////////////////////////////////////////////////////////////////////////-
    PetSystem.prototype.showPetTipsByEntry = function (entryId) {
        if (this.getPetEntryInfo(entryId) == null) {
            TLog.Error("showPetTipsByEntry %s", entryId);
            //return
        }
        var wnd = WngMrg.getInstance().getWindow("PetPreviewFrame");
        wnd.showWithPetEntry(entryId);
    };
    PetSystem.prototype.showPetTipsByInfo = function (petInfo) {
        var wnd = WngMrg.getInstance().getWindow("PetPreviewFrame");
        wnd.showWithPetInfo(petInfo);
    };
    //宠物技能洗练星级 1-7
    PetSystem.prototype.getPetSkillStart = function (count) {
        var maxStart = elemWashSkillOptions[cellOptionsIndex.PetSkill].MaxStart;
        var startArea = elemWashSkillOptions[cellOptionsIndex.PetSkill].StartArea;
        for (var i = 1; i <= maxStart; i++) {
            if (count < startArea[i]) {
                return i;
            }
        }
        return maxStart;
    };
    //获取配置神宠
    PetSystem.prototype.getPetGodList = function () {
        var list = [];
        for (var i in GameConfig.PetConfig) {
            var v = GameConfig.PetConfig[i];
            if (v.quality >= 4) {
                JsUtil.arrayInstert(list, v.Id);
            }
        }
        return list;
    };
    //获取布阵列表
    PetSystem.prototype.getEmbattlePosList = function () {
        var list = {};
        for (var i in this.petInfoList) {
            var info = this.petInfoList[i];
            //0代表没有出战，1代表出战 2代表备战1 3代表备战2
            if (info.combatpos > opPetCombatPos.Rest) {
                list[info.combatpos] = info;
            }
        }
        return list;
    };
    //宠物资质
    PetSystem.prototype.getPetGrowInfo = function (petId) {
        return GameConfig.FunGrowAddConfig[cellOptionsName[cellOptionsIndex.Pet - 1]][petId];
    };
    //宠物资质等级
    PetSystem.prototype.getPetGrowLevel = function (petId, count) {
        var info = this.getPetGrowInfo(petId);
        var num = 0;
        var level = 0;
        for (var i in info.maxexp) {
            num += info.maxexp[i];
            if (count < num) {
                level = tonumber(i);
                break;
            }
        }
        return level;
    };
    return PetSystem;
}(BaseSystem));
__reflect(PetSystem.prototype, "PetSystem");
//# sourceMappingURL=PetSystem.js.map