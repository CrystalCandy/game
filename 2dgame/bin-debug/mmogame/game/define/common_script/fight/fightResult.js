////////////////////////////////////////////////////////////////////////////////
//fight result config
////////////////////////////////////////////////////////////////////////////////
var resultOptions = {
    RCODE_POWER: 1,
    RCODE_SPELL_HIT: 2,
    RCODE_SPELL_PREPARE: 3,
    RCODE_SPELL_PREPARE_HIT: 4,
    RCODE_SPELL_INTERVAL: 5,
    RCODE_SPELL_INTERVAL_HIT: 6,
    RCODE_SPELL_INTERVAL_END: 7,
    RCODE_ADD_MONSTER: 8,
    RCODE_SPELL_SPIRIT_HIT: 9,
};
//FightResult = 
//{
//	code : 0,         //指令代码
//	spellId : 0,      //技能ID / AI_WORD索引
//	caster : 0,       //行动者ID
//	target : 0,       //目标ID 
//	targetList : 0,   //目标列表
//	fail : 0,         //成功或失败 (0成功1失败)
//	castCount : 1,    //施放总次数
//	powerCount : 0,   //指令产生的效果个数
//	fightPowers : null,//power列表
//}
// function setTagList(result, attackerSide, targetList){
// 	for(let _ in targetList){
// 			let target = targetList[_]
// 		result.targetList = bit.bor(result.targetList, tagList[target.pos])
// 		if(target.side == attackerSide ){
// 			result.targetList = bit.bor(result.targetList, opBattleSideTag)
// 		}
// 	}
// }
// target list
// 使用位操作检测群技能目标,后20位定位,第一位判断是自方还是对方。
var tagList = (_a = {},
    _a[1] = 0x00000001,
    _a[2] = 0x00000002,
    _a[3] = 0x00000004,
    _a[4] = 0x00000008,
    _a[5] = 0x00000010,
    _a[6] = 0x00000020,
    _a[7] = 0x00000040,
    _a[8] = 0x00000080,
    _a[9] = 0x00000100,
    _a[10] = 0x00000200,
    _a[11] = 0x00000400,
    _a[12] = 0x00000800,
    _a[13] = 0x00001000,
    _a[14] = 0x00002000,
    _a[15] = 0x00004000,
    _a[16] = 0x00008000,
    _a[17] = 0x00010000,
    _a[18] = 0x00020000,
    _a[19] = 0x00040000,
    _a[20] = 0x00080000,
    _a[21] = 0x00100000,
    _a[22] = 0x00200000,
    _a[23] = 0x00400000,
    _a[24] = 0x00800000,
    _a[25] = 0x01000000,
    _a[26] = 0x02000000,
    _a[27] = 0x04000000,
    _a[28] = 0x08000000,
    _a[29] = 0x10000000,
    _a[30] = 0x20000000,
    _a[31] = 0x40000000,
    _a[32] = 0x80000000,
    _a);
var opBattleSideTag = 0x20000000;
var _a;
//# sourceMappingURL=fightResult.js.map