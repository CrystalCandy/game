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
var ForgeSystem = (function (_super) {
    __extends(ForgeSystem, _super);
    function ForgeSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgeSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    ForgeSystem.prototype.onClear = function () {
        this.oldforgelist = {};
        this.forgeList = {};
    };
    ForgeSystem.prototype.destory = function () {
        this.onClear();
    };
    ForgeSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initForgeSystemCsv(workQueue);
    };
    ForgeSystem.prototype.initForgeInfo = function (info) {
        this.forgeList = info;
    };
    ForgeSystem.prototype.updateForgeInfo = function (info) {
        for (var k in info) {
            if (!this.forgeList[k]) {
                return;
            }
            else {
                this.forgeList[k] = info[k];
            }
        }
        FireEvent(EventDefine.FORGE_UPDATE, null);
    };
    ForgeSystem.prototype.setForgeOldInfo = function (key, list) {
        this.oldforgelist[key] = list;
    };
    ForgeSystem.prototype.getForgeInfo = function (key) {
        if (!this.forgeList[key])
            return {};
        return this.forgeList[key];
    };
    ForgeSystem.prototype.getForgeOldInfo = function (key) {
        if (!this.oldforgelist[key]) {
            if (this.forgeList[key]) {
                return this.forgeList[key];
            }
            else {
                return {};
            }
        }
        return this.oldforgelist[key];
    };
    ForgeSystem.prototype.getForgeTypeLevel = function (key) {
        var info = this.getForgeInfo(key);
        var pos = 0;
        for (var k = 0; k < size_t(info); k++) {
            if (info[k] < info[k - 1]) {
                pos = k;
            }
        }
        return info[pos];
    };
    ForgeSystem.prototype.getDaShiNeedLevel = function (typeName, index) {
        var dashiLevel = this.getForgeClassType(typeName);
        var forgeTypeConfig = GameConfig.FunForgeMasterConfig[typeName];
        var isBreak = false;
        var needLevel = 0;
        for (var k in forgeTypeConfig) {
            var v = forgeTypeConfig[k];
            needLevel = tonumber(k);
            if (isBreak) {
                break;
            }
            if (v.classType == dashiLevel) {
                isBreak = true;
            }
        }
        return needLevel;
    };
    ForgeSystem.prototype.getForgeClassType = function (typeName) {
        var forgeInfo = this.getForgeInfo(typeName);
        var level = this.getForgeTypeLevel(typeName);
        var masterConfig = GameConfig.FunForgeMasterConfig[typeName];
        var classType = 0;
        var recvKey = 0;
        for (var k in masterConfig) {
            var v = masterConfig[k];
            if (level >= tonumber(k)) {
                recvKey = tonumber(k);
            }
        }
        return masterConfig[recvKey].classType;
    };
    ForgeSystem.prototype.getNowForgeLevel = function (tempConfig, forgeType) {
        var recvLevel = 0;
        for (var k in tempConfig) {
            var v = tempConfig[k];
            if (v.classType >= forgeType) {
                return tonumber(k);
            }
            // recvLevel = tonumber(k)
        }
        return recvLevel;
    };
    ForgeSystem.prototype.getCellForgeConfig = function (typeName, pos, level) {
        var abilityConfig = GameConfig.FunForgeAbilityConfig[typeName];
        if (GameConfig.FunForgeConfig[typeName][level] == null) {
            return null;
        }
        var value = GameConfig.FunForgeConfig[typeName][level].value;
        var ratioList = [
            ["a1", "a2"],
            ["b1", "b2"],
            ["c1", "c2"],
            ["d1", "d2"],
            ["e1", "e2"],
            ["f1", "f2"],
            ["g1", "g2"],
            ["h1", "h2"],
            ["i1", "i2"],
            ["j1", "j2"],
        ];
        var name1 = "name" + ratioList[pos][0];
        var ratio1 = ratioList[pos][0];
        var name2 = "name" + ratioList[pos][1];
        var ratio2 = ratioList[pos][1];
        var tempConfig = {};
        if (abilityConfig[name1] != "") {
            tempConfig[abilityConfig[name1]] = FormatNumberInt(abilityConfig[ratio1] * value);
        }
        if (abilityConfig[name2] != "") {
            tempConfig[abilityConfig[name2]] = FormatNumberInt(abilityConfig[ratio2] * value);
        }
        return tempConfig;
    };
    ForgeSystem.prototype.getBaoShiStr = function (typeName, pos, level) {
        var baoshiStr = "";
        var forgeInfo = this.getForgeInfo(typeName);
        var nowConfig = this.getCellForgeConfig(typeName, pos, level);
        var nextConfig = this.getCellForgeConfig(typeName, pos, level + 1);
        var config = table_effect_sub(nextConfig, nowConfig);
        var configkey = "";
        for (var k in config) {
            if (k == IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]) {
                baoshiStr += Localize_cns("FORGE_BAOSHI_SHENGMING");
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]) {
                baoshiStr += Localize_cns("FORGE_BAOSHI_FANGYU");
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_ATTACK]) {
                baoshiStr += Localize_cns("FORGE_BAOSHI_GONGJI");
            }
            configkey = k;
        }
        var cellstr = baoshiStr + Localize_cns("FORGE_LEVEL_FALSE") + "#br";
        if (level == 0) {
            var recvStr = "";
            return recvStr + cellstr + cellstr + cellstr + cellstr;
        }
        var manjiStr = baoshiStr + Localize_cns("FORGE_MANJI") + "#br";
        var showStr = baoshiStr + "#lime" + nowConfig[configkey] + "+" + nextConfig[configkey] + "#br";
        if (level < 40) {
            return showStr + cellstr + cellstr + cellstr;
        }
        if (level >= 40 && level < 80) {
            return manjiStr + showStr + cellstr + cellstr;
        }
        if (level >= 80 && level < 120) {
            return manjiStr + manjiStr + showStr + cellstr;
        }
        if (level >= 120 && level < 200) {
            return manjiStr + manjiStr + manjiStr + showStr;
        }
        if (level >= 200) {
            return manjiStr + manjiStr + manjiStr + manjiStr;
        }
        return "";
    };
    ForgeSystem.prototype.getForgeConfigStr = function (config) {
        var recvStr = "";
        for (var k in config) {
            if (k == IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]) {
                recvStr += Localize_cns("FORGE_SHENGMING") + config[k] + "#br#br";
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]) {
                recvStr += Localize_cns("FORGE_FANGYU") + config[k] + "#br#br";
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_ATTACK]) {
                recvStr += Localize_cns("FORGE_GONGJI") + config[k] + "#br#br";
            }
        }
        return recvStr;
    };
    return ForgeSystem;
}(BaseSystem));
__reflect(ForgeSystem.prototype, "ForgeSystem");
//# sourceMappingURL=ForgeSystem.js.map