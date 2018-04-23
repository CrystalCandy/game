/*
作者:
    yangguiming
    
创建时间：
   2013.7.03(周三)

意图：
   战斗系统消息包

公共接口：
   
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
function readFightAdd(reader) {
    var fighter_list = [];
    var count = reader.readUChar(); //战斗成员个数
    for (var i = 1; i <= count; i++) {
        var fighterInfo = {};
        fighterInfo.roleId = reader.readUInt();
        fighterInfo.type_id = reader.readUChar();
        fighterInfo.id = reader.readUInt();
        fighterInfo.side = reader.readUChar();
        fighterInfo.pos = reader.readUChar();
        fighterInfo.hp = reader.readUInt();
        fighterInfo.maxHp = reader.readUInt();
        fighterInfo.name = reader.readString();
        fighterInfo.entry = reader.readUInt();
        fighterInfo.sexId = reader.readUChar();
        fighterInfo.image = reader.readUInt();
        fighterInfo.weaponShapeId = reader.readUInt(); //神兵
        fighterInfo.heroTitleId = reader.readUInt(); //player称号
        fighterInfo.heroShapeId = reader.readUInt(); //plyaer皮肤
        fighterInfo.tianxianShapeId = reader.readUInt(); //天仙(player头顶小精灵)
        fighterInfo.rideShapeId = reader.readUInt(); //player坐骑
        fighterInfo.wingShapeId = reader.readUInt(); //翅膀
        fighterInfo.petTLShapeId = reader.readUChar(); //通灵，宠物脚底光圈
        fighterInfo.petSHShapeId = reader.readUInt(); //兽魂，宠物左上小精灵
        fighterInfo.xlFZShapeId = reader.readUChar(); //法阵，仙侣脚底光圈
        fighterInfo.xlXWShapeId = reader.readUChar(); //仙位，仙侣称号
        //TLog.Debug("////////////////////////////////////////////////////-")
        JsUtil.arrayInstert(fighter_list, fighterInfo);
    }
    //TLog.Debug_r(fighter_list)
    //io.read()
    return fighter_list;
}
function readOneFightResult(reader) {
    var result = {};
    result.code = reader.readUChar();
    result.round = reader.readUInt();
    result.powerCount = 0;
    result.caster = 100; //默认为100（一般不存在id超过12的fighter，此处是为防漏处理）
    if (result.code == resultOptions.RCODE_POWER) {
        result.powerCount = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_HIT) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
        result.target = reader.readUChar();
        result.targetList = reader.readUInt();
        result.powerCount = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_PREPARE) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_PREPARE_HIT) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
        result.target = reader.readUChar();
        result.targetList = reader.readUInt();
        result.powerCount = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_INTERVAL) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_INTERVAL_HIT) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
        result.target = reader.readUChar();
        result.targetList = reader.readUInt();
        result.powerCount = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_INTERVAL_END) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_ADD_MONSTER) {
        result.caster = reader.readUChar();
        result.powerCount = reader.readUChar();
    }
    else if (result.code == resultOptions.RCODE_SPELL_SPIRIT_HIT) {
        result.spellId = reader.readUInt();
        result.caster = reader.readUChar();
        result.target = reader.readUChar();
        result.targetList = reader.readUInt();
        result.powerCount = reader.readUChar();
    }
    result.castCount = 1;
    result.fightPowers = [];
    return result;
}
function readOneFightPower(reader, result) {
    var power = {};
    power.effect = reader.readUChar();
    if (power.effect == powerEffects.EFFECT_HP_PLUS ||
        power.effect == powerEffects.EFFECT_HP_LESS ||
        power.effect == powerEffects.EFFECT_MAXHP_PLUS ||
        power.effect == powerEffects.EFFECT_MAXHP_LESS ||
        power.effect == powerEffects.EFFECT_RP_PLUS ||
        power.effect == powerEffects.EFFECT_RP_LESS ||
        power.effect == powerEffects.EFFECT_RP_VALUE) {
        power.target = reader.readUChar();
        power.point = reader.readUInt();
        power.flag = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_MISS ||
        power.effect == powerEffects.EFFECT_DODGE ||
        power.effect == powerEffects.EFFECT_ATTACKED ||
        power.effect == powerEffects.EFFECT_IMMUNIZE ||
        power.effect == powerEffects.EFFECT_RESIST ||
        power.effect == powerEffects.EFFECT_BREAK ||
        power.effect == powerEffects.EFFECT_ABSORB) {
        power.target = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_ADD_BUFF ||
        power.effect == powerEffects.EFFECT_DEL_BUFF ||
        power.effect == powerEffects.EFFECT_UPDATE_BUFF) {
        power.target = reader.readUChar();
        power.buff = reader.readUInt();
        power.life = reader.readUInt();
        power.count = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_MOVE) {
        power.target = reader.readUChar();
        power.dir = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_STATUS) {
        power.target = reader.readUChar();
        power.status = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_DROP_GOLD) {
        power.target = reader.readUChar();
        power.value = reader.readUInt();
    }
    else if (power.effect == powerEffects.EFFECT_DROP_ITEM) {
        power.target = reader.readUChar();
        power.itemId = reader.readUInt();
        power.quality = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_SPIRIT_CD) {
        var side = reader.readUChar();
        power.side = FightSystem.getInstance().transferFightSide(side);
        //power.target	= FightSystem.getInstance().getFunnalId(side)
        power.time = reader.readUInt();
    }
    else if (power.effect == powerEffects.EFFECT_FIGHTER_ADD
        || power.effect == powerEffects.EFFECT_RESERVE) {
        power.roleId = reader.readUInt();
        power.type_id = reader.readUChar();
        power.id = reader.readUInt();
        power.side = reader.readUChar();
        power.pos = reader.readUChar();
        power.hp = reader.readUInt();
        power.maxHp = reader.readUInt();
        power.name = reader.readString();
        power.entry = reader.readUInt();
        power.sexId = reader.readUChar();
        power.image = reader.readUInt();
        power.weaponShapeId = reader.readUInt(); //神兵
        power.heroTitleId = reader.readUInt(); //player称号
        power.heroShapeId = reader.readUInt(); //plyaer皮肤
        power.tianxianShapeId = reader.readUInt(); //天仙(player头顶小精灵)
        power.rideShapeId = reader.readUInt(); //player坐骑
        power.wingShapeId = reader.readUInt(); //翅膀
        power.petTLShapeId = reader.readUChar(); //通灵，宠物脚底光圈
        power.petSHShapeId = reader.readUInt(); //兽魂，宠物左上小精灵
        power.xlFZShapeId = reader.readUChar(); //法阵，仙侣脚底光圈
        power.xlXWShapeId = reader.readUChar(); //仙位，仙侣称号
    }
    else if (power.effect == powerEffects.EFFECT_FIGHTER_DISAPPEAR) {
        power.id = reader.readUChar();
        power.target = power.id;
    }
    else if (power.effect == powerEffects.EFFECT_NOTARGET) {
        power.target = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_REBOUND) {
        power.caster = reader.readUChar();
        power.target = reader.readUChar();
        power.buff = reader.readUInt();
    }
    else if (power.effect == powerEffects.EFFECT_MP_PLUS
        || power.effect == powerEffects.EFFECT_MP_LESS
        || power.effect == powerEffects.EFFECT_MP_VALUE) {
        power.roleId = reader.readUInt();
        power.point = reader.readUChar();
        power.flag = reader.readUChar();
    }
    else if (power.effect == powerEffects.EFFECT_SKILL_CD) {
        power.caster = reader.readUChar();
        power.skillId = reader.readUInt();
        power.cdTime = reader.readUInt(); //从战斗开始算的冻结时间戳
    }
    if (result.code == resultOptions.RCODE_POWER) {
        power.target = checkNull(power.target, checkNull(power.id, 2));
        result.caster = checkNull(result.caster, 15);
        result.caster = result.caster + Math.pow(2, (power.target - 1));
    }
    //power.caster = reader.readUChar()
    //power.target = reader.readUChar()
    //power.effect = reader.readUChar()
    //power.status = reader.readUInt()
    //power.point	 = reader.readUInt()
    //power.times	 = reader.readUInt()
    //if(power.effect == powerEffects.EFFECT_ADD_BUFF || power.effect == powerEffects.EFFECT_DEL_BUFF || power.effect == powerEffects.EFFECT_UPDATE_BUFF ){
    //  power.buffLevel = reader.readUInt()
    //  power.buffSpecial = reader.readUInt()
    //}
    //power.paramCount = reader.readUChar()
    ////io.read()
    //power.params = {}
    //Log.Out("    power.caster" +power.caster)
    //Log.Out("    power.target" +power.target)
    //Log.Out("    power.effect" +power.effect)
    //Log.Out("    power.status" +power.status)
    //Log.Out("    power.point" +power.point	)
    //Log.Out("    power.times" +power.times	)
    //Log.Out("    power.paramCount" +power.paramCount	)
    //for(let i = 1; i <= power.paramCount;i++){
    //  let param = reader.readUInt()
    //  //Log.Out("       power.params" +i +":" +param	)
    //  JsUtil.arrayInstert(power.params, param)
    //}
    power.times = 1;
    return power;
}
function readFightResult(reader, video) {
    //let time = reader.readUInt()
    var count = 0;
    // if (video == true) {						//录像的数据比较大，数量用整型保存
    // 	count = reader.readUInt()
    // } else {
    count = reader.readUInt();
    // }
    var fight_result_list = [];
    for (var i = 1; i <= count; i++) {
        var result = readOneFightResult(reader);
        //TLog.Debug("fight_result_list result", i, count)
        //TLog.Debug_r(result)
        if (result.powerCount && result.powerCount > 0) {
            for (var j = 1; j <= result.powerCount; j++) {
                var power = readOneFightPower(reader, result);
                if (power.effect == powerEffects.EFFECT_RESULT) {
                    var include_result = readOneFightResult(reader);
                    if (include_result.powerCount > 0) {
                        for (var k = 1; k <= include_result.powerCount; k++) {
                            var include_power = readOneFightPower(reader, include_result);
                            JsUtil.arrayInstert(include_result.fightPowers, include_power);
                        }
                    }
                    //JsUtil.arrayInstert(power.params, include_result)
                    power.result = include_result;
                } //} effect == powerEffects.EFFECT_RESULT
                JsUtil.arrayInstert(result.fightPowers, power);
            }
        }
        //result.time = time
        //TLog.Debug("********************")
        JsUtil.arrayInstert(fight_result_list, result);
    }
    //TLog.Debug("////////////////////////////////////receive over////////////////////////////////////////////-")
    // TLog.Debug("fight_result_list")
    // TLog.Debug_r(fight_result_list)
    //io.read()
    return fight_result_list;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//战斗开始
var Message_G2C_FIGHT_BEGIN = (function (_super) {
    __extends(Message_G2C_FIGHT_BEGIN, _super);
    function Message_G2C_FIGHT_BEGIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_BEGIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightType = 0;
        this.campainId = 0;
        this.fightSide = 0;
    };
    Message_G2C_FIGHT_BEGIN.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_BEGIN.prototype.unpack = function (reader) {
        this.fightType = reader.readUInt();
        this.campainId = reader.readUInt();
        this.fightSide = reader.readUInt();
    };
    return Message_G2C_FIGHT_BEGIN;
}(MessageBase));
__reflect(Message_G2C_FIGHT_BEGIN.prototype, "Message_G2C_FIGHT_BEGIN");
var Message_G2C_FIGHT_ESOTERIC_POWER = (function (_super) {
    __extends(Message_G2C_FIGHT_ESOTERIC_POWER, _super);
    function Message_G2C_FIGHT_ESOTERIC_POWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_ESOTERIC_POWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mp = 0;
    };
    Message_G2C_FIGHT_ESOTERIC_POWER.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_ESOTERIC_POWER.prototype.unpack = function (reader) {
        this.mp = reader.readUChar();
    };
    return Message_G2C_FIGHT_ESOTERIC_POWER;
}(MessageBase));
__reflect(Message_G2C_FIGHT_ESOTERIC_POWER.prototype, "Message_G2C_FIGHT_ESOTERIC_POWER");
var Message_G2C_FIGHT_ADD = (function (_super) {
    __extends(Message_G2C_FIGHT_ADD, _super);
    function Message_G2C_FIGHT_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fighterList = null;
    };
    Message_G2C_FIGHT_ADD.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_ADD.prototype.unpack = function (reader) {
        TLog.Debug("Message_G2C_FIGHT_ADD.unpack", size_t(reader));
        this.fighterList = readFightAdd(reader);
    };
    return Message_G2C_FIGHT_ADD;
}(MessageBase));
__reflect(Message_G2C_FIGHT_ADD.prototype, "Message_G2C_FIGHT_ADD");
var Message_G2C_FIGHT_BOUT = (function (_super) {
    __extends(Message_G2C_FIGHT_BOUT, _super);
    function Message_G2C_FIGHT_BOUT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_BOUT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bout = 0;
    };
    Message_G2C_FIGHT_BOUT.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_BOUT.prototype.unpack = function (reader) {
        this.bout = reader.readUShort();
    };
    return Message_G2C_FIGHT_BOUT;
}(MessageBase));
__reflect(Message_G2C_FIGHT_BOUT.prototype, "Message_G2C_FIGHT_BOUT");
var Message_G2C_FIGHT_END = (function (_super) {
    __extends(Message_G2C_FIGHT_END, _super);
    function Message_G2C_FIGHT_END() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_END.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_FIGHT_END.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_END.prototype.unpack = function (reader) {
    };
    return Message_G2C_FIGHT_END;
}(MessageBase));
__reflect(Message_G2C_FIGHT_END.prototype, "Message_G2C_FIGHT_END");
var Message_G2C_FIGHT_RESULT = (function (_super) {
    __extends(Message_G2C_FIGHT_RESULT, _super);
    function Message_G2C_FIGHT_RESULT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_RESULT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.resultList = null;
        this.video = args[1] || false;
        //this.isdump = true
    };
    Message_G2C_FIGHT_RESULT.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_RESULT.prototype.unpack = function (reader) {
        this.resultList = readFightResult(reader, this.video);
    };
    return Message_G2C_FIGHT_RESULT;
}(MessageBase));
__reflect(Message_G2C_FIGHT_RESULT.prototype, "Message_G2C_FIGHT_RESULT");
//战斗出手队列
var Message_G2C_FIGHT_SEQUENCE = (function (_super) {
    __extends(Message_G2C_FIGHT_SEQUENCE, _super);
    function Message_G2C_FIGHT_SEQUENCE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_SEQUENCE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = [];
        this.isdump = false;
    };
    Message_G2C_FIGHT_SEQUENCE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_SEQUENCE.prototype.unpack = function (reader) {
        var list = [];
        var count = reader.readUChar();
        for (var i = 1; i <= count; i++) {
            var leftTime = reader.readUInt();
            var fightId = reader.readUChar();
            var t = [fightId, leftTime];
            JsUtil.arrayInstert(list, t);
        }
        this.list = list;
    };
    return Message_G2C_FIGHT_SEQUENCE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_SEQUENCE.prototype, "Message_G2C_FIGHT_SEQUENCE");
//战斗重连
var Message_G2C_FIGHT_REBEGIN = (function (_super) {
    __extends(Message_G2C_FIGHT_REBEGIN, _super);
    function Message_G2C_FIGHT_REBEGIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_REBEGIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightType = 0;
        this.compaignId = 0;
        this.fightSide = 0;
        this.mpPoint = 0; //当前奥义值
    };
    Message_G2C_FIGHT_REBEGIN.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_REBEGIN.prototype.unpack = function (reader) {
        this.compaignId = 0;
        this.fightType = reader.readUInt();
        this.compaignId = reader.readUInt();
        this.fightSide = reader.readUInt();
        this.mpPoint = reader.readUInt();
    };
    return Message_G2C_FIGHT_REBEGIN;
}(MessageBase));
__reflect(Message_G2C_FIGHT_REBEGIN.prototype, "Message_G2C_FIGHT_REBEGIN");
//发送战斗指令
var Message_C2G_FIGHT_CMD = (function (_super) {
    __extends(Message_C2G_FIGHT_CMD, _super);
    function Message_C2G_FIGHT_CMD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CMD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightId = 0;
        this.skillType = 0;
    };
    Message_C2G_FIGHT_CMD.prototype.pack = function (writer) {
        writer.writeUInt(this.fightId);
        writer.writeUInt(this.skillType);
    };
    Message_C2G_FIGHT_CMD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CMD;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CMD.prototype, "Message_C2G_FIGHT_CMD");
//完成所有播放
var Message_C2G_FIGHT_DRAWDONE = (function (_super) {
    __extends(Message_C2G_FIGHT_DRAWDONE, _super);
    function Message_C2G_FIGHT_DRAWDONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_DRAWDONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.bout = 0 
    };
    Message_C2G_FIGHT_DRAWDONE.prototype.pack = function (writer) {
        //writer.writeUInt(this.bout)
    };
    Message_C2G_FIGHT_DRAWDONE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_DRAWDONE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_DRAWDONE.prototype, "Message_C2G_FIGHT_DRAWDONE");
var Message_C2G_FIGHT_ESCAPE = (function (_super) {
    __extends(Message_C2G_FIGHT_ESCAPE, _super);
    function Message_C2G_FIGHT_ESCAPE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_ESCAPE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bout = 0;
        this.index = 0;
    };
    Message_C2G_FIGHT_ESCAPE.prototype.pack = function (writer) {
        writer.writeUShort(this.bout);
        writer.writeUShort(this.index);
    };
    Message_C2G_FIGHT_ESCAPE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_ESCAPE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_ESCAPE.prototype, "Message_C2G_FIGHT_ESCAPE");
var Message_C2G_ROLE_TEAM_COMBAT = (function (_super) {
    __extends(Message_C2G_ROLE_TEAM_COMBAT, _super);
    function Message_C2G_ROLE_TEAM_COMBAT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_TEAM_COMBAT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fight_id = 0;
    };
    Message_C2G_ROLE_TEAM_COMBAT.prototype.pack = function (writer) {
        writer.writeUInt(this.fight_id);
    };
    Message_C2G_ROLE_TEAM_COMBAT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_TEAM_COMBAT;
}(MessageBase));
__reflect(Message_C2G_ROLE_TEAM_COMBAT.prototype, "Message_C2G_ROLE_TEAM_COMBAT");
var Message_G2C_FIGHT_READY = (function (_super) {
    __extends(Message_G2C_FIGHT_READY, _super);
    function Message_G2C_FIGHT_READY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_READY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_G2C_FIGHT_READY.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_READY.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
    };
    return Message_G2C_FIGHT_READY;
}(MessageBase));
__reflect(Message_G2C_FIGHT_READY.prototype, "Message_G2C_FIGHT_READY");
// 申请获取通缉犯列表
var Message_C2G_GET_WANTED_LIST = (function (_super) {
    __extends(Message_C2G_GET_WANTED_LIST, _super);
    function Message_C2G_GET_WANTED_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GET_WANTED_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_GET_WANTED_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_GET_WANTED_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_GET_WANTED_LIST;
}(MessageBase));
__reflect(Message_C2G_GET_WANTED_LIST.prototype, "Message_C2G_GET_WANTED_LIST");
var Message_G2C_GET_WANTED_LIST = (function (_super) {
    __extends(Message_G2C_GET_WANTED_LIST, _super);
    function Message_G2C_GET_WANTED_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GET_WANTED_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.count = 0;
        this.playerList = [];
    };
    Message_G2C_GET_WANTED_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_GET_WANTED_LIST.prototype.unpack = function (reader) {
        this.count = reader.readUInt();
        this.playerList = [];
        for (var i = 1; i <= this.count; i++) {
            var player = {};
            player.id = reader.readUInt();
            player.name = reader.readString();
            player.power = reader.readUInt();
            player.bangpai = reader.readString();
            JsUtil.arrayInstert(this.playerList, player);
        }
    };
    return Message_G2C_GET_WANTED_LIST;
}(MessageBase));
__reflect(Message_G2C_GET_WANTED_LIST.prototype, "Message_G2C_GET_WANTED_LIST");
var Message_C2G_FETCH_WANTED_TOKEN = (function (_super) {
    __extends(Message_C2G_FETCH_WANTED_TOKEN, _super);
    function Message_C2G_FETCH_WANTED_TOKEN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FETCH_WANTED_TOKEN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_C2G_FETCH_WANTED_TOKEN.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_FETCH_WANTED_TOKEN.prototype.unpack = function (reader) {
    };
    return Message_C2G_FETCH_WANTED_TOKEN;
}(MessageBase));
__reflect(Message_C2G_FETCH_WANTED_TOKEN.prototype, "Message_C2G_FETCH_WANTED_TOKEN");
var Message_C2G_MAP_NPC_COMBAT = (function (_super) {
    __extends(Message_C2G_MAP_NPC_COMBAT, _super);
    function Message_C2G_MAP_NPC_COMBAT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_MAP_NPC_COMBAT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
    };
    Message_C2G_MAP_NPC_COMBAT.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_MAP_NPC_COMBAT.prototype.unpack = function (reader) {
    };
    return Message_C2G_MAP_NPC_COMBAT;
}(MessageBase));
__reflect(Message_C2G_MAP_NPC_COMBAT.prototype, "Message_C2G_MAP_NPC_COMBAT");
var Message_C2G_FIGHT_ENTER_CAMPAIGN = (function (_super) {
    __extends(Message_C2G_FIGHT_ENTER_CAMPAIGN, _super);
    function Message_C2G_FIGHT_ENTER_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_ENTER_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_FIGHT_ENTER_CAMPAIGN.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_FIGHT_ENTER_CAMPAIGN.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_ENTER_CAMPAIGN;
}(MessageBase));
__reflect(Message_C2G_FIGHT_ENTER_CAMPAIGN.prototype, "Message_C2G_FIGHT_ENTER_CAMPAIGN");
var Message_C2G_FIGHT_RESTART = (function (_super) {
    __extends(Message_C2G_FIGHT_RESTART, _super);
    function Message_C2G_FIGHT_RESTART() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_RESTART.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_RESTART.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_RESTART.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_RESTART;
}(MessageBase));
__reflect(Message_C2G_FIGHT_RESTART.prototype, "Message_C2G_FIGHT_RESTART");
//战斗录像
var Message_G2C_FIGHT_VIEDO = (function (_super) {
    __extends(Message_G2C_FIGHT_VIEDO, _super);
    function Message_G2C_FIGHT_VIEDO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_VIEDO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.message_fight_begin = Message_G2C_FIGHT_BEGIN.newObj();
        this.message_fighter_add = Message_G2C_FIGHT_ADD.newObj();
        //this.message_fight_result = Message_G2C_FIGHT_RESULT.newObj()
        this.pageCount = 0;
    };
    Message_G2C_FIGHT_VIEDO.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_VIEDO.prototype.unpack = function (reader) {
        TLog.Debug("Message_G2C_FIGHT_VIEDO", size_t(reader));
        this.message_fight_begin.unpack(reader);
        this.message_fighter_add.unpack(reader);
        //this.message_fight_result.unpack(reader, true)
        this.pageCount = reader.readUInt();
    };
    return Message_G2C_FIGHT_VIEDO;
}(MessageBase));
__reflect(Message_G2C_FIGHT_VIEDO.prototype, "Message_G2C_FIGHT_VIEDO");
// 录像分页
var Message_G2C_FIGHT_VIEDO_PAGE = (function (_super) {
    __extends(Message_G2C_FIGHT_VIEDO_PAGE, _super);
    function Message_G2C_FIGHT_VIEDO_PAGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_VIEDO_PAGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.lastList = 0																									//0 不是最后一条resultList;1 是最后一条resultList
        this.message_fight_result = Message_G2C_FIGHT_RESULT.newObj(0, true);
    };
    Message_G2C_FIGHT_VIEDO_PAGE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_VIEDO_PAGE.prototype.unpack = function (reader) {
        //this.lastList = reader.readUInt()
        this.message_fight_result.unpack(reader, true);
    };
    return Message_G2C_FIGHT_VIEDO_PAGE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_VIEDO_PAGE.prototype, "Message_G2C_FIGHT_VIEDO_PAGE");
var Message_C2G_FIGHT_SYNC_TICKTIME = (function (_super) {
    __extends(Message_C2G_FIGHT_SYNC_TICKTIME, _super);
    function Message_C2G_FIGHT_SYNC_TICKTIME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_SYNC_TICKTIME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_SYNC_TICKTIME.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_SYNC_TICKTIME.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_SYNC_TICKTIME;
}(MessageBase));
__reflect(Message_C2G_FIGHT_SYNC_TICKTIME.prototype, "Message_C2G_FIGHT_SYNC_TICKTIME");
//////////////////////////////////////////////////////////////////////////////
//G2C同步战斗时间
var Message_G2C_FIGHT_SYNC_TICKTIME = (function (_super) {
    __extends(Message_G2C_FIGHT_SYNC_TICKTIME, _super);
    function Message_G2C_FIGHT_SYNC_TICKTIME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_SYNC_TICKTIME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightTime = 0;
    };
    Message_G2C_FIGHT_SYNC_TICKTIME.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_SYNC_TICKTIME.prototype.unpack = function (reader) {
        this.fightTime = reader.readUInt();
    };
    return Message_G2C_FIGHT_SYNC_TICKTIME;
}(MessageBase));
__reflect(Message_G2C_FIGHT_SYNC_TICKTIME.prototype, "Message_G2C_FIGHT_SYNC_TICKTIME");
//翅膀发招
var Message_C2G_FIGHT_SPIRIT_SKILL = (function (_super) {
    __extends(Message_C2G_FIGHT_SPIRIT_SKILL, _super);
    function Message_C2G_FIGHT_SPIRIT_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_SPIRIT_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightSide = 0;
        this.skillId = 0;
        this.targetList = {};
    };
    Message_C2G_FIGHT_SPIRIT_SKILL.prototype.pack = function (writer) {
        writer.writeUInt(this.fightSide);
        writer.writeUInt(this.skillId);
        writer.writeString(table_save(this.targetList || {}));
    };
    Message_C2G_FIGHT_SPIRIT_SKILL.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_SPIRIT_SKILL;
}(MessageBase));
__reflect(Message_C2G_FIGHT_SPIRIT_SKILL.prototype, "Message_C2G_FIGHT_SPIRIT_SKILL");
var Message_G2C_FIGHT_SPIRIT_POINT = (function (_super) {
    __extends(Message_G2C_FIGHT_SPIRIT_POINT, _super);
    function Message_G2C_FIGHT_SPIRIT_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_SPIRIT_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillId = 0;
        this.leftPoint = 0;
        this.cooldownTime = 0; //时间戳，并且是以当前战斗时间为准
    };
    Message_G2C_FIGHT_SPIRIT_POINT.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_SPIRIT_POINT.prototype.unpack = function (reader) {
        this.skillId = reader.readUInt();
        this.leftPoint = reader.readUInt();
        this.cooldownTime = reader.readUInt();
    };
    return Message_G2C_FIGHT_SPIRIT_POINT;
}(MessageBase));
__reflect(Message_G2C_FIGHT_SPIRIT_POINT.prototype, "Message_G2C_FIGHT_SPIRIT_POINT");
var Message_C2G_FIGHT_FAST_END = (function (_super) {
    __extends(Message_C2G_FIGHT_FAST_END, _super);
    function Message_C2G_FIGHT_FAST_END() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_FAST_END.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.side = 0;
    };
    Message_C2G_FIGHT_FAST_END.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_FAST_END.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_FAST_END;
}(MessageBase));
__reflect(Message_C2G_FIGHT_FAST_END.prototype, "Message_C2G_FIGHT_FAST_END");
//援助技能
var Message_C2G_FIGHT_ASSIST_SKILL = (function (_super) {
    __extends(Message_C2G_FIGHT_ASSIST_SKILL, _super);
    function Message_C2G_FIGHT_ASSIST_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_ASSIST_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.side = 0;
        this.skillId = 0;
    };
    Message_C2G_FIGHT_ASSIST_SKILL.prototype.pack = function (writer) {
        writer.writeUInt(this.side);
        writer.writeUInt(this.skillId);
    };
    Message_C2G_FIGHT_ASSIST_SKILL.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_ASSIST_SKILL;
}(MessageBase));
__reflect(Message_C2G_FIGHT_ASSIST_SKILL.prototype, "Message_C2G_FIGHT_ASSIST_SKILL");
var Message_G2C_FIGHT_ASSIST_SKILL = (function (_super) {
    __extends(Message_G2C_FIGHT_ASSIST_SKILL, _super);
    function Message_G2C_FIGHT_ASSIST_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_ASSIST_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillList = [];
        this.commonCD = 0;
    };
    Message_G2C_FIGHT_ASSIST_SKILL.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_ASSIST_SKILL.prototype.unpack = function (reader) {
        this.skillList = [];
        this.commonCD = reader.readUInt(); //时间戳
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var t = [];
            var skillId = reader.readUInt();
            var cc = reader.readUInt();
            JsUtil.arrayInstert(t, skillId);
            JsUtil.arrayInstert(t, cc);
            JsUtil.arrayInstert(this.skillList, t);
        }
    };
    return Message_G2C_FIGHT_ASSIST_SKILL;
}(MessageBase));
__reflect(Message_G2C_FIGHT_ASSIST_SKILL.prototype, "Message_G2C_FIGHT_ASSIST_SKILL");
//双方总输出统计
var Message_G2C_FIGHT_DAMAGE = (function (_super) {
    __extends(Message_G2C_FIGHT_DAMAGE, _super);
    function Message_G2C_FIGHT_DAMAGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_DAMAGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.leftDamage = 0;
        this.rightDamage = 0;
    };
    Message_G2C_FIGHT_DAMAGE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_DAMAGE.prototype.unpack = function (reader) {
        this.leftDamage = reader.readFloat();
        this.rightDamage = reader.readFloat();
    };
    return Message_G2C_FIGHT_DAMAGE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_DAMAGE.prototype, "Message_G2C_FIGHT_DAMAGE");
//# sourceMappingURL=FightMessage.js.map