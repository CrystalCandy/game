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
/*
作者:
    lintianfeng
    
创建时间：
   2013.8.08(周四)

意图：
   技能系统

公共接口：

*/
var SkillSystem = (function (_super) {
    __extends(SkillSystem, _super);
    function SkillSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    SkillSystem.prototype.destory = function () {
    };
    SkillSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initSkillSystemCsv(workQueue);
    };
    SkillSystem.prototype.onClear = function () {
        this.skillList = {};
    };
    ////////////////////////////////////////////////////////////////////////////-
    SkillSystem.prototype.getSkillName = function (skillId) {
        var name = null;
        var config = GameConfig.SkillDescribeConfig[skillId];
        if (config && config[1]) {
            name = config[1].Name;
        }
        return name;
    };
    SkillSystem.prototype.getSkillDes = function (skillId, level) {
        if (level == null)
            level = 1;
        var skillInfo = GameConfig.ActorRoleSkillConfig[skillId];
        var config = GameConfig.SkillDescribeConfig[skillId];
        if (skillInfo == null) {
            if (config && config[level]) {
                return config[level].Describe;
            }
        }
        else {
            var des = config[level].Describe;
            var extra = GetRoleSkillExtraDamage(config);
            return String.format(des, extra);
        }
        return "ErrorSkill" + skillId;
    };
    SkillSystem.prototype.getSkillBubbleWord = function (entryId, skillId) {
        //{["times"] : {{{"<", 上限}, "对白"}, {{">", 下限}, "对白"}, {{"><", 下限, 上限}, "对白"}}, ["hp"] = {{{"<", 上限}, "对白"}, }}
        if (!GameConfig.MonsterConfig[entryId]) {
            return null;
        }
        if (!GameConfig.MonsterConfig[entryId].skillIntro) {
            return null;
        }
        else {
            return GameConfig.MonsterConfig[entryId]["skillIntro"][skillId];
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////
    //宠物技能
    SkillSystem.prototype.getPetSkillInfo = function (skillId) {
        var info = GameConfig.SkillPetActiveConfig[skillId];
        if (info == null) {
            return GameConfig.SkillPetPassiveConfig[skillId];
        }
        return info;
    };
    //角色技能
    SkillSystem.prototype.getRoleSkillInfo = function (skillId) {
        return GameConfig.ActorRoleSkillConfig[skillId];
    };
    //仙侣技能
    SkillSystem.prototype.getXianLvSkillInfo = function (skillId, skillLv) {
        return GameConfig.ActorXianLvSkillConfig[skillId][skillLv];
    };
    //获取技能颜色
    SkillSystem.prototype.getSkillColor = function (quality) {
        var colorConfig = ["gray", "lime", "blue", "purple", "gold", "red"];
        return colorConfig[quality - 1] || colorConfig[0];
    };
    return SkillSystem;
}(BaseSystem));
__reflect(SkillSystem.prototype, "SkillSystem");
//# sourceMappingURL=SkillSystem.js.map