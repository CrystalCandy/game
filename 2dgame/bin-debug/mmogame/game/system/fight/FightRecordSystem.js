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
    liuziming
    
创建时间：
   2015.10.20(周二)

意图：
   
公共接口：
   
*/
var FightRecordSystem = (function (_super) {
    __extends(FightRecordSystem, _super);
    function FightRecordSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightRecordSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.COMBAT_FIGHTER_ADD_EX, this.onFighterAdd, this);
        this.fightSystem = args[0];
        this.fightRecordXML = [];
        this.fightRecordResult = [];
        this.fighterConfigList = {};
    };
    FightRecordSystem.prototype.onClear = function () {
        this.fighterConfigList = {};
        this.fightRecordXML = [];
        this.fightRecordResult = [];
    };
    FightRecordSystem.prototype.addResult = function (result) {
        JsUtil.arrayInstert(this.fightRecordResult, table_copy(result));
    };
    FightRecordSystem.prototype._addResult = function (result) {
        var xml = "";
        var _a = this.analyzeCode(result), content = _a[0], color = _a[1];
        xml = xml + content;
        var act = true; //false
        var powerList = {};
        var powerEffectList = {};
        for (var _ in result.fightPowers) {
            var power = result.fightPowers[_];
            var targetId = power["target"];
            if (targetId && this.fighterConfigList[targetId]) {
                powerList[targetId] = powerList[targetId] || [];
                powerEffectList[targetId] = powerEffectList[targetId] || {};
                powerEffectList[targetId]["effect" + power.effect] = powerEffectList[targetId]["effect" + power.effect] || {};
                var func = FightRecordSpace.overlayPowerHandler[power.effect];
                if (func) {
                    var sPower = powerEffectList[targetId]["effect" + power.effect][0];
                    if (!sPower) {
                        sPower = table_copy(power);
                        powerEffectList[targetId]["effect" + power.effect][0] = sPower;
                    }
                    else {
                        func.call(this, sPower, power);
                    }
                    var flag = table_isExsit(powerList[targetId], sPower);
                    if (!flag) {
                        JsUtil.arrayInstert(powerList[targetId], sPower);
                    }
                }
                else {
                    JsUtil.arrayInstert(powerList[targetId], table_copy(power));
                }
            }
        }
        for (var targetId in powerList) {
            var list = powerList[targetId];
            var content_1 = "";
            var elem = this.fighterConfigList[targetId] || [];
            var config = elem[0], info = elem[1];
            var nameTitle = config["Name"] || "";
            table_sort(list, function (a, b) {
                return a.effect - b.effect;
            });
            if (config) {
                for (var index = 0; index < list.length; index++) {
                    var power = list[index];
                    var handler = FightRecordSpace.convertPowerHandler[power.effect];
                    if (handler && this.debugPowerEffect(power.effect)) {
                        var secColor = "#orange"; //"lime.length "
                        if (info.side == fightSide.FIGHT_LEFT) {
                            secColor = "#lime"; //"#lime "
                        }
                        secColor = "";
                        var str = handler.call(this, power, config, info, color, secColor);
                        if (str != "") {
                            if (content_1 != "") {
                                str = "," + str;
                            }
                            content_1 = content_1 + str;
                            act = true;
                        }
                    }
                }
            }
            if (content_1 != "") {
                xml = xml + nameTitle + content_1 + ";";
            }
        }
        if (xml != "" && act == true) {
            if (GAME_DEBUG) {
                //let _, tStr = simple_transform_time(Math.floor(result.time / 1000))
                //JsUtil.arrayInstert(this.fightRecordXML, "#space#space" + result.time + xml)
                JsUtil.arrayInstert(this.fightRecordXML, "#space" + result.time + xml);
            }
            else {
                //JsUtil.arrayInstert(this.fightRecordXML, "#space#space" + xml)
                JsUtil.arrayInstert(this.fightRecordXML, "#space" + xml);
            }
        }
    };
    FightRecordSystem.prototype.analyzeCode = function (result) {
        var content = "";
        var elem = this.fighterConfigList[result.caster] || {};
        var config = elem[0], info = elem[1];
        var reColor = "#rf";
        if (result.code == resultOptions.RCODE_SPELL_HIT
            || result.code == resultOptions.RCODE_SPELL_PREPARE_HIT
            || result.code == resultOptions.RCODE_SPELL_INTERVAL_HIT) {
            if (config) {
                var skillName = SkillSystem.getInstance().getClientSkillName(result.spellId);
                //content = color +config.Name +"#rf" +Localize_cns("FIGHT_FADONG") +"magenta.length" +skillName +"#rf" +","
                //let actorName = PetSystem.getInstance().getPetQualityLevelName(info.qualityLevel, config.Name)
                var actorName = config.Name;
                content = actorName + Localize_cns("FIGHT_FADONG") + skillName + ",";
                if (GAME_DEBUG) {
                    content = actorName + Localize_cns("FIGHT_FADONG") + skillName + "_" + result.spellId + ",";
                }
                //不填技能名就不显示任何信息
                if (!skillName || skillName == "") {
                    content = "";
                    result.fightPowers = {};
                }
            }
            //}else if(result.code == resultOptions.RCODE_SPELL_PREPARE ){
            //	if(actor ){
            //		let config = GetFightActorConfig(actor)
            //		let skillName = SkillSystem.getInstance().getClientSkillName(result.spellId)
            //		
            //		//content = color +config.Name +"#rf" +Localize_cns("FIGHT_KAISHIYINCHANG") +"magenta.length" +skillName +"#rf" +","
            //		content = config.Name +Localize_cns("FIGHT_KAISHIYINCHANG") +skillName +","
            //	}
            //}else if(result.code == resultOptions.RCODE_SPELL_INTERVAL ){
            //	if(actor ){
            //		let config = GetFightActorConfig(actor)
            //		let skillName = SkillSystem.getInstance().getClientSkillName(result.spellId)
            //					
            //		//content = color +config.Name +"#rf" +Localize_cns("FIGHT_ZHUNBEISHIFA") +"magenta.length" +skillName +"#rf" +","
            //		content = config.Name +Localize_cns("FIGHT_ZHUNBEISHIFA") +skillName +","
            //	}
        }
        else if (result.code == resultOptions.RCODE_SPELL_SPIRIT_HIT) {
            var side = FightSystem.getInstance().transferFightSide(result.caster);
            if (config) {
                var skillName = SkillSystem.getInstance().getClientSkillName(result.spellId);
                //content = color +config.Name +"#rf" +Localize_cns("FIGHT_FADONG") +"magenta.length" +skillName +"#rf" +","
                content = config.Name + Localize_cns("FIGHT_FADONG") + skillName + ",";
                if (GAME_DEBUG) {
                    content = config.Name + Localize_cns("FIGHT_FADONG") + skillName + "_" + result.spellId + ",";
                }
                //不填技能名就不显示任何信息
                if (!skillName || skillName == "") {
                    content = "";
                    result.fightPowers = {};
                }
            }
        }
        if (content != "") {
            var color = "#orange ";
            var title = String.format(Localize_cns("PANEL_TYPENAME"), Localize_cns("LEGION_WAR_TITLE1")); //"lime.length "
            if (info.side == fightSide.FIGHT_LEFT) {
                color = "#lime ";
                title = String.format(Localize_cns("PANEL_TYPENAME"), Localize_cns("LEGION_WAR_TITLE2")); //"#cyan "
            }
            content = color + title + content;
            reColor = color;
        }
        return [content, reColor];
    };
    FightRecordSystem.prototype.getFightRecord = function () {
        if (this.fightRecordXML.length == 0) {
            // let count = this.fightRecordResult.length
            // for (let i = 1; i < count; i++) {
            //     for (let j = i; j >= 1; j--) {
            //         let r1 = this.fightRecordResult[j]
            //         let r2 = this.fightRecordResult[j - 1]
            //         if (r1.time >= r2.time) {
            //             break
            //         } else {
            //             let temp = this.fightRecordResult[j]
            //             this.fightRecordResult[j] = this.fightRecordResult[j - 1]
            //             this.fightRecordResult[j - 1] = temp
            //         }
            //     }
            // }
            table_sort(this.fightRecordResult, function (a, b) {
                return a.time - b.time;
            });
            for (var _ = 0; _ < this.fightRecordResult.length; _++) {
                var result = this.fightRecordResult[_];
                this._addResult(result);
            }
            return this.fightRecordXML;
        }
        else {
            return this.fightRecordXML;
        }
    };
    FightRecordSystem.prototype.debugPowerEffect = function (effect) {
        var list = [
            powerEffects.EFFECT_HP_PLUS,
            powerEffects.EFFECT_HP_LESS,
            powerEffects.EFFECT_RP_PLUS,
            powerEffects.EFFECT_RP_LESS,
            powerEffects.EFFECT_ADD_BUFF,
            powerEffects.EFFECT_DEL_BUFF,
            powerEffects.EFFECT_STATUS,
        ];
        if (GAME_DEBUG) {
            var list_1 = [
                powerEffects.EFFECT_HP_PLUS,
                powerEffects.EFFECT_HP_LESS,
                powerEffects.EFFECT_RP_PLUS,
                powerEffects.EFFECT_RP_LESS,
                powerEffects.EFFECT_ADD_BUFF,
                powerEffects.EFFECT_DEL_BUFF,
                powerEffects.EFFECT_STATUS,
                powerEffects.EFFECT_MAXHP_PLUS,
                powerEffects.EFFECT_MAXHP_LESS,
            ];
            var flag = table_isExsit(list_1, effect);
            return flag;
        }
        else {
            var flag = table_isExsit(list, effect);
            return flag;
        }
    };
    FightRecordSystem.prototype.onFighterAdd = function (args) {
        for (var _ in args.fighterList) {
            var id = args.fighterList[_];
            var actor = GetFightActor(id);
            if (actor) {
                var _a = GetFightActorConfig(actor), config = _a[0], _1 = _a[1];
                config = table_copy(config);
                if (this.fighterConfigList[id]) {
                    TLog.Warn("FightRecordSystem.onFighterAdd the fighter %s is already exsit!", id);
                }
                var info = table_copy(actor.getPropertyInfo());
                if (!info) {
                    TLog.Warn("FightRecordSystem.onFighterAdd the fighter %s is NULL", id);
                    return;
                }
                if (info.type_id == objectType.OBJECT_TYPE_ASSIST) {
                    config.Name = Localize_cns("COMBINED_TIPS6") + config.Name;
                }
                else if (info.type_id == objectType.OBJECT_TYPE_PLAYER) {
                    config.Name = actor.getName();
                }
                this.fighterConfigList[id] = [config, info];
            }
        }
    };
    return FightRecordSystem;
}(TClass));
__reflect(FightRecordSystem.prototype, "FightRecordSystem");
var FightRecordSpace;
(function (FightRecordSpace) {
    FightRecordSpace.overlayPowerHandler = {};
    FightRecordSpace.convertPowerHandler = {};
    //////////////////////////////////////////////////////////////////////////////
    function hpPlusEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_JIAXUE") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_JIAXUE") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_HP_PLUS] = hpPlusEffect;
    function hpLessEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_KOUXUE") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_KOUXUE") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_HP_LESS] = hpLessEffect;
    function hpMaxPlusEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_JIAXUE") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_MAXJIAXUE") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_MAXHP_PLUS] = hpMaxPlusEffect;
    function hpMaxLessEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_KOUXUE") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_MAXKOUXUE") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_MAXHP_LESS] = hpMaxLessEffect;
    function rpPlusEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_JIAQI") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_JIAQI") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_RP_PLUS] = rpPlusEffect;
    function rpLessEffect(power, config, info, color) {
        if (power.point >= 100) {
            return "";
        }
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_KOUQI") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_KOUQI") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_RP_LESS] = rpLessEffect;
    function rpValueEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_KOUQI") +"#red" +power.point +"#rf" +";"
        return Localize_cns("FIGHT_DANGQIANNVQI") + "#red " + power.point + color;
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_RP_VALUE] = rpValueEffect;
    function addBuffEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_ZHONGBUFF") +" " +"#red" +BuffSystem.getInstance().getBuffName(power.buff) +"#rf" +";"
        var buffName = BuffSystem.getInstance().getBuffName(power.buff);
        if (buffName && buffName != "") {
            if (GAME_DEBUG) {
                return String.format(Localize_cns("FIGHT_ZHONGBUFF"), "#red " + buffName + "_" + power.buff + color);
            }
            return String.format(Localize_cns("FIGHT_ZHONGBUFF"), "#red " + buffName + color);
        }
        else {
            return "";
        }
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_ADD_BUFF] = addBuffEffect;
    function removeBuffEffect(power, config, info, color) {
        //return color +config.Name +"#rf" +Localize_cns("FIGHT_ZHONGBUFF") +" " +"#red" +BuffSystem.getInstance().getBuffName(power.buff) +"#rf" +";"
        var buffName = BuffSystem.getInstance().getBuffName(power.buff);
        if (buffName && buffName != "") {
            if (GAME_DEBUG) {
                return String.format(Localize_cns("FIGHT_QUBUFF"), "#red " + buffName + "_" + power.buff + color);
            }
            return String.format(Localize_cns("FIGHT_QUBUFF"), "#red " + buffName + color);
        }
        else {
            return "";
        }
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_DEL_BUFF] = removeBuffEffect;
    function statusDieEffect(power, config, info, color) {
        if (power.status == powerStatus.PSTATUS_TARGET_DIE) {
            //return color +config.Name +"#rf" +Localize_cns("FIGHT_ZHENWANG") +";"
            return config.Name + "#red " + Localize_cns("FIGHT_ZHENWANG") + color;
        }
        else {
            return "";
        }
    }
    FightRecordSpace.convertPowerHandler[powerEffects.EFFECT_STATUS] = statusDieEffect;
    ////////////////////////////////////重叠效果power统计处理//////////////////////////-
    function computeHP(sPower, power) {
        if (sPower.effect == power.effect) {
            sPower.point = sPower.point + power.point;
        }
        else {
            sPower.point = sPower.point - power.point;
        }
        if (sPower.point < 0) {
            if (sPower.effect == powerEffects.EFFECT_HP_PLUS) {
                sPower.effect = powerEffects.EFFECT_HP_LESS;
            }
            else {
                sPower.effect = powerEffects.EFFECT_HP_PLUS;
            }
        }
        return sPower;
    }
    FightRecordSpace.overlayPowerHandler[powerEffects.EFFECT_HP_PLUS] = computeHP;
    FightRecordSpace.overlayPowerHandler[powerEffects.EFFECT_HP_LESS] = computeHP;
    function computeRP(sPower, power) {
        if (sPower.effect == power.effect) {
            sPower.point = sPower.point + power.point;
        }
        else {
            sPower.point = sPower.point - power.point;
        }
        if (sPower.point < 0) {
            if (sPower.effect == powerEffects.EFFECT_RP_PLUS) {
                sPower.effect = powerEffects.EFFECT_RP_LESS;
            }
            else {
                sPower.effect = powerEffects.EFFECT_RP_PLUS;
            }
        }
        return sPower;
    }
    FightRecordSpace.overlayPowerHandler[powerEffects.EFFECT_RP_PLUS] = computeRP;
    FightRecordSpace.overlayPowerHandler[powerEffects.EFFECT_RP_LESS] = computeRP;
})(FightRecordSpace || (FightRecordSpace = {}));
//# sourceMappingURL=FightRecordSystem.js.map