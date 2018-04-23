// TypeScript file
// //复制文件
// function Copyfile(source,destination)
//   sourcefile = io.open(source,"r")
//   destinationfile = io.open(destination, "w")
//   if not sourcefile then
//     MsgSystem:ConfirmDialog_YES(string.format("打开文件%s失败，检查文件是否存在或只读!", sourcefile))
//     return false
//   end
//   if not destinationfile then
//     MsgSystem:ConfirmDialog_YES(string.format("打开文件%s失败，检查文件是否存在或只读!", destinationfile))
//     return false
//   end
//   for line in sourcefile:lines() do
//     destinationfile:write(line)
//     destinationfile:write("\n")
//   end
//   sourcefile:close()
//   destinationfile:close()
//   return true
// end
// resetCsvCache()
// EffectConfig = readCSV("data\\config\\ModelEffect.csv")
// //ServerSkillInfo = readCSV("data\\config\\Skill\\SkillInfo.csv")
// //ServerMonster = readCSV("data\\config\\Skill\\Monster.csv")
// local effectList = {}
// for i, v in pairs(EffectConfig) do
//   table.insert(effectList, {v.Name, v.Id})
// end
var effectList = [];
var SeatMap = {};
function initFightTooConfig() {
    JsUtil.objectForEach(GameConfig.EffectConfig, function (v) {
        effectList.push(effectList, [v.Name, v.Id]);
    });
    //列表array，对于第i位玩家，重置array[i]号位
    SeatMap = (_a = {},
        _a[Localize_cns("FIGHT_SEAT_FRONT_FRONT")] = [2],
        _a[Localize_cns("FIGHT_SEAT_BACK_BACK")] = [4],
        _a[Localize_cns("FIGHT_SEAT_WHOLE")] = [2, 1, 3, 4, 5, 6],
        _a);
    var _a;
}
var FIGHT_ACTION_TYPE = [
    ["响应属性", "POWER"],
    ["攻击动作", "ACTOR_ATTACK"],
    ["冲刺动作", "ACTOR_RUSH"],
    ["人物特效", "EFFECT_ACTOR"],
    ["移动特效", "EFFECT_MOVE"],
    ["场景特效", "EFFECT_SCENE"],
    ["镜头特效", "EFFECT_SCREEN"],
    ["设置透明", "ALPHA"],
    ["设置旋转", "ROTATE"],
    ["设置缩放", "SCALE"],
    ["设置移动", "MOVE"],
    //["设置残影", "FADE"],
    ["人物方向", "DIR"],
    ["屏幕震动", "SCREEN_SHAKE"],
    ["屏幕变暗", "SCREEN_BLACK"],
    ["屏幕背景", "SCREEN_IMAGE"],
    ["镜头聚焦", "CAMERA_ZOOM"],
    ["镜头移动", "CAMERA_MOVE"],
    ["镜头定位", "CAMERA_TRACE"],
    ["受击动作", "ATTACKED_PLAYANIM"],
    ["受击击飞", "ATTACKED_KNOCKFLY"],
    ["受击击退", "ATTACKED_BEATBACK"],
    ["加入声音", "ADD_SOUND"],
];
function GetActionTitleByType(type) {
    for (var i = 0; i < FIGHT_ACTION_TYPE.length; i++) {
        var v = FIGHT_ACTION_TYPE[i];
        if (v[1] == type) {
            return v[0];
        }
    }
    return "null";
}
//动作参数标题
var FIGHT_ACTION_ELEM = (_a = {},
    _a["POWER"] = [
        "自定义声",
        "指定目标",
    ],
    _a["ACTOR_ATTACK"] = [
        "动作",
        "播放速度",
        "末帧静止",
        "事件帧静止",
        "末帧循环",
        "攻击目标",
    ],
    _a["ACTOR_RUSH"] = [
        "动作",
        "播放速度",
        "末帧静止",
        "事件帧静止",
        "攻击目标",
    ],
    _a["EFFECT_ACTOR"] = [
        "变量定义",
        "目标",
        "特效",
        "播放速度",
        "绑定骨骼",
        "偏移x",
        "偏移y",
        "末帧静止",
        "末帧循环",
        "层次",
        "吟唱循环",
    ],
    _a["EFFECT_SCENE"] = [
        "变量定义",
        "特效",
        "播放速度",
        "位置类型",
        "偏移x",
        "偏移y",
        "末帧静止",
        "末帧循环",
    ],
    _a["EFFECT_MOVE"] = [
        "变量定义",
        "特效",
        "播放速度",
        "自动旋转",
        "用途",
    ],
    _a["EFFECT_SCREEN"] = [
        "变量定义",
        "特效",
        "播放速度",
        "偏移x",
        "偏移y",
        "层次",
    ],
    _a["ALPHA"] = [
        "变量名",
        "开始alpha",
        "结束alpha",
    ],
    _a["ROTATE"] = [
        "变量名",
        "开始旋转",
        "结束旋转",
        "翻转X",
        "翻转Y",
    ],
    _a["SCALE"] = [
        "变量名",
        "开始拉伸",
        "结束拉伸",
    ],
    _a["MOVE"] = [
        "变量名",
        "开始位置",
        "偏移X",
        "偏移Y",
        "结束位置",
        "偏移X",
        "偏移Y",
        "移动类型",
        "速度",
        "控制1x",
        "控制1y",
        "控制2x",
        "控制2y",
        "控制随机",
        "Y反向",
    ],
    _a["FADE"] = [
        "变量名",
        "残影间隔",
        "残影停留",
    ],
    _a["DIR"] = [
        "变量名",
        "设置方式",
        "参照对象",
        "方向参数",
    ],
    _a["SCREEN_SHAKE"] = [
        "方向",
        "幅度",
        "震次每秒",
    ],
    _a["SCREEN_BLACK"] = [
        "类型",
        "隐藏界面",
    ],
    _a["SCREEN_IMAGE"] = [
        "图片名字",
    ],
    _a["CAMERA_ZOOM"] = [
        "开始值",
        "结束值",
        "聚焦时间",
    ],
    _a["CAMERA_MOVE"] = [
        "起始目标",
        "偏移X",
        "偏移Y",
        "结束目标",
        "偏移X",
        "偏移Y",
        "移动速度",
        "到达停留",
    ],
    _a["CAMERA_TRACE"] = [
        "定位目标",
        "偏移X",
        "偏移Y",
        "跟踪目标",
    ],
    _a["ATTACKED_PLAYANIM"] = [
        "目标",
        "动作",
        "播放速度",
        "末帧静止",
        "自定义声",
    ],
    _a["ATTACKED_KNOCKFLY"] = [
        "目标",
        "高度",
    ],
    _a["ATTACKED_BEATBACK"] = [
        "目标",
        "高度",
        "偏移X",
        "击退时间",
        "旋转角度",
        "停留时间",
        "是否变色",
        "红色",
        "绿色",
        "蓝色",
    ],
    _a["ADD_SOUND"] = [
        "声音文件",
        "声音(女)",
        "目标",
        "测试男声",
    ],
    _a);
//DropMenu下拉框元素
////////////////////////////////////
var elem_caster = ["攻击者", "caster"];
var elem_targetList = ["受击者", "targetList"];
var elem_myside = ["我方全体", "mySide"];
var elem_enemySide = ["敌方全体", "enemySide"];
//bool
var elem_true = ["真", "true"];
var elem_false = ["假", "false"];
//Ydir
var elem_ydir_true = ["是", 1];
var elem_ydir_false = ["否", 0];
//pos
var elem_pos_targetMid = ["敌人中间", "targetMid"];
var elem_pos_casterMid = ["本方中间", "casterMid"];
var elem_pos_sceneMid = ["屏幕中间", "sceneMid"];
var elem_pos_any = ["绝对坐标", "any"];
var elem_pos_caster = ["攻击者", "caster"];
var elem_pos_casterOrigin = ["攻击者原位", "casterOrigin"];
var elem_pos_targetList = ["受击者", "targetList"];
var elem_pos_backLine = ["后排", "backLine"];
var elem_pos_target1 = ["受击者1", "target1"];
var elem_pos_target2 = ["受击者2", "target2"];
var elem_pos_target3 = ["受击者3", "target3"];
var elem_pos_target4 = ["受击者4", "target4"];
var elem_pos_target5 = ["受击者5", "target5"];
var elem_pos_target6 = ["受击者6", "target6"];
//action
var elem_action_attack = ["attack", "attack"];
var elem_action_attack2 = ["attack2", "attack2"];
var elem_action_attack3 = ["attack3", "attack3"];
var elem_action_attack4 = ["attack4", "attack4"];
var elem_action_rush = ["rush", "rush"];
var elem_action_run = ["run", "run"];
var elem_action_idle = ["idle", "combat_idle"];
var elem_action_attacked = ["attacked", "attacked"];
//move type
var elem_move_line_time = ["直线时间", ENUM_FIGHT_MOVE_TYPE.MOVE_LINE_TIME];
var elem_move_line = ["直线速度", ENUM_FIGHT_MOVE_TYPE.MOVE_LINE];
var elem_move_curve = ["曲线", ENUM_FIGHT_MOVE_TYPE.MOVE_CURVE];
var elem_move_trace = ["追踪", ENUM_FIGHT_MOVE_TYPE.MOVE_TRACE];
var elem_move_instant = ["瞬移", ENUM_FIGHT_MOVE_TYPE.MOVE_INSTANT];
var elem_caster_visible = ["施法可见", FIGHT_BLACK_SCREEN_TYPE.CASTER];
var elem_targetList_visible = ["受击可见", FIGHT_BLACK_SCREEN_TYPE.TARGETLIST];
var elem_caster_targetList_visible = ["施法受击可见", FIGHT_BLACK_SCREEN_TYPE.CASTER_TARGETLIST];
var elem_all_unvisible = ["全不可见", FIGHT_BLACK_SCREEN_TYPE.ALL_HIDE];
var elem_effect_usage_one = ["单个", "one"];
var elem_effect_usage_multi = ["多个", "multi"];
var elem_effect_layer_bg = ["后层", "bg"];
var elem_effect_layer_fb = ["前层", "fg"];
var bone_center = ["center", "center"];
var elem_dir_abso = ["绝对方向", "abso"];
var elem_dir_relate = ["相对方向", "relate"];
var elem_dir_left = ["左", 0];
var elem_dir_left_down = ["左下", 1];
var elem_dir_down = ["下", 2];
var elem_dir_right_down = ["下", 3];
var elem_dir_right = ["右", 4];
var elem_dir_right_up = ["右上", 5];
var elem_dir_up = ["上", 6];
var elem_dir_left_up = ["左上", 7];
var FIGHT_ACTION_DROPMENU = (_b = {},
    _b["POWER"] = (_c = {},
        _c[0] = [elem_true, elem_false],
        _c[1] = [elem_pos_target1, elem_pos_target2, elem_pos_target3, elem_pos_target4, elem_pos_target5, elem_pos_target6],
        _c),
    _b["ACTOR_ATTACK"] = (_d = {},
        _d[0] = [elem_action_attack, elem_action_attack2, elem_action_attack3, elem_action_attack4, elem_action_rush, elem_action_run, elem_action_idle, elem_action_attacked],
        _d[2] = [elem_true, elem_false],
        _d[3] = [elem_action_attack],
        _d[4] = [elem_true, elem_false],
        _d[5] = [elem_pos_target1,
            elem_pos_target2,
            elem_pos_target3,
            elem_pos_target4,
            elem_pos_target5,
            elem_pos_target6,],
        _d),
    _b["ACTOR_RUSH"] = (_e = {},
        _e[0] = [elem_action_attack, elem_action_attack2, elem_action_attack3, elem_action_attack4, elem_action_rush, elem_action_run, elem_action_idle, elem_action_attacked],
        _e[2] = [elem_true, elem_false],
        _e[3] = [elem_action_attack],
        _e[4] = [elem_pos_target1,
            elem_pos_target2,
            elem_pos_target3,
            elem_pos_target4,
            elem_pos_target5,
            elem_pos_target6,],
        _e),
    _b["EFFECT_ACTOR"] = (_f = {},
        _f[1] = [elem_caster, elem_targetList, elem_myside, elem_enemySide,
            elem_pos_target1,
            elem_pos_target2,
            elem_pos_target3,
            elem_pos_target4,
            elem_pos_target5,
            elem_pos_target6,],
        //[3] :  effectList,
        _f[4] = [bone_center],
        _f[7] = [elem_true, elem_false],
        _f[8] = [elem_true, elem_false],
        _f[9] = [elem_effect_layer_bg, elem_effect_layer_fb],
        _f[10] = [elem_true, elem_false],
        _f),
    _b["EFFECT_SCENE"] = (_g = {},
        //[2] : effectList,
        _g[3] = [elem_pos_casterMid, elem_pos_targetMid, elem_pos_sceneMid, elem_pos_any],
        _g[6] = [elem_true, elem_false],
        _g[7] = [elem_true, elem_false],
        _g),
    _b["EFFECT_MOVE"] = (_h = {},
        //[2] : effectList,
        _h[3] = [elem_true, elem_false],
        _h[4] = [elem_effect_usage_one, elem_effect_usage_multi],
        _h),
    _b["EFFECT_SCREEN"] = (_j = {},
        //[2] : effectList,
        _j[5] = [elem_effect_layer_bg, elem_effect_layer_fb],
        _j),
    _b["ALPHA"] = (_k = {},
        _k[0] = [elem_caster],
        _k),
    _b["ROTATE"] = (_l = {},
        _l[0] = [elem_caster],
        _l[3] = [elem_true, elem_false],
        _l[4] = [elem_true, elem_false],
        _l),
    _b["SCALE"] = (_m = {},
        _m[0] = [elem_caster],
        _m),
    _b["MOVE"] = (_o = {},
        _o[0] = [elem_caster],
        _o[1] = [elem_pos_caster, elem_pos_casterOrigin, elem_pos_targetList, elem_pos_any],
        _o[4] = [elem_pos_caster, elem_pos_casterOrigin, elem_pos_targetList, elem_pos_any,
            elem_pos_backLine,
            elem_pos_target1,
            elem_pos_target2,
            elem_pos_target3,
            elem_pos_target4,
            elem_pos_target5,
            elem_pos_target6,],
        _o[7] = [elem_move_line_time, elem_move_curve, elem_move_trace, elem_move_instant],
        _o[14] = [elem_ydir_true, elem_ydir_false],
        _o),
    _b["FADE"] = (_p = {},
        _p[0] = [elem_caster],
        _p),
    _b["DIR"] = (_q = {},
        _q[0] = [elem_caster, elem_targetList],
        _q[1] = [elem_dir_abso, elem_dir_relate],
        _q[2] = [elem_caster, elem_targetList],
        _q[3] = [elem_dir_left, elem_dir_left_down, elem_dir_down, elem_dir_right_down, elem_dir_right, elem_dir_right_up, elem_dir_up, elem_dir_left_up],
        _q),
    _b["SCREEN_BLACK"] = (_r = {},
        _r[0] = [elem_caster_visible, elem_targetList_visible, elem_caster_targetList_visible, elem_all_unvisible],
        _r[1] = [elem_true, elem_false],
        _r),
    _b["CAMERA_TRACE"] = (_s = {},
        _s[0] = [elem_pos_caster, elem_pos_targetList, elem_pos_any],
        _s[3] = [elem_true, elem_false],
        _s),
    _b["CAMERA_MOVE"] = (_t = {},
        _t[0] = [elem_pos_caster, elem_pos_targetList, elem_pos_any],
        _t[3] = [elem_pos_caster, elem_pos_targetList, elem_pos_any],
        _t),
    _b["ATTACKED_PLAYANIM"] = (_u = {},
        _u[0] = [elem_targetList, elem_enemySide,
            elem_pos_target1,
            elem_pos_target2,
            elem_pos_target3,
            elem_pos_target4,
            elem_pos_target5,
            elem_pos_target6,],
        _u[1] = [elem_action_attack, elem_action_attack2, elem_action_attack3, elem_action_attack4, elem_action_rush, elem_action_run, elem_action_idle, elem_action_attacked],
        _u[3] = [elem_true, elem_false],
        _u[4] = [elem_true, elem_false],
        _u),
    _b["ATTACKED_KNOCKFLY"] = (_v = {},
        _v[0] = [elem_targetList, elem_enemySide],
        _v),
    _b["ATTACKED_BEATBACK"] = (_w = {},
        _w[0] = [elem_targetList, elem_enemySide],
        _w[6] = [elem_true, elem_false],
        _w),
    _b["ADD_SOUND"] = (_x = {},
        _x[2] = [elem_caster, elem_targetList],
        _x[3] = [elem_true, elem_false],
        _x),
    _b);
////////////////////////////////-
//按钮响应类型
var FIGHT_ACTION_BUTTON_TYPE = {
    EFFECTVIEW: "EFFECTVIEW"
};
var FIGHT_ACTION_BUTTON = (_y = {},
    _y["EFFECT_ACTOR"] = (_z = {},
        _z[2] = [effectList, FIGHT_ACTION_BUTTON_TYPE.EFFECTVIEW],
        _z),
    _y["EFFECT_SCENE"] = (_0 = {},
        _0[1] = [effectList, FIGHT_ACTION_BUTTON_TYPE.EFFECTVIEW],
        _0),
    _y["EFFECT_MOVE"] = (_1 = {},
        _1[1] = [effectList, FIGHT_ACTION_BUTTON_TYPE.EFFECTVIEW],
        _1),
    _y["EFFECT_SCREEN"] = (_2 = {},
        _2[1] = [effectList, FIGHT_ACTION_BUTTON_TYPE.EFFECTVIEW],
        _2),
    _y);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
//# sourceMappingURL=FightToolConfig.js.map