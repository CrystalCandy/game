/*
作者:
    liuziming
    
创建时间:
   2013.10.25(周五)

意图:
   

公共接口:
   
*/
ImportType(EventDefine);
var GuideListenDefine = {};
//提示框类型
GuideListenDefine.FIELD_FRAME_TIPS_LEFT_TOP = "LeftTop"; //左上角箭头提示框
GuideListenDefine.FIELD_FRAME_TIPS_LEFT_BOTTOM = "LeftBottom"; //左下角箭头提示框
GuideListenDefine.FIELD_FRAME_TIPS_RIGHT_TOP = "RightTop"; //右上角箭头提示框
GuideListenDefine.FIELD_FRAME_TIPS_RIGHT_BOTTOM = "RightBottom"; //右下角箭头提示框
//箭头框类型
GuideListenDefine.FIELD_FRAME_ARROW_LEFT = "Left"; //左边（向右）箭头提示框
GuideListenDefine.FIELD_FRAME_ARROW_RIGHT = "Right"; //右边箭头提示框
GuideListenDefine.FIELD_FRAME_ARROW_TOP = "Top"; //上边角箭头提示框
GuideListenDefine.FIELD_FRAME_ARROW_BOTTOM = "Bottom"; //下边角箭头提示框
//执行的动作类型
GuideListenDefine.FIELD_ACTION_CLEARACTION = "ClearAction"; //清除指定动作										["index"]={GuideIndex,ActionIndex},
GuideListenDefine.FIELD_ACTION_TIPS = "Tips"; //一般文本框											["window"]="path/paths" /null ,["offsetX"]= , ["offsetY"]= , 如果有window 则xy 是相对于window的偏移量 否则是屏幕坐标 ["tipsContent"]= "文本",  ["content_w"]=文本最大宽度 ,["windox_pos"]="LeftTop" 相对位置  ["type"]=框体图片名， 为null不需要框体
GuideListenDefine.FIELD_ACTION_DRAMATIPS = "DramaTips"; //对话文本框											["window_y"]=, ["rightType"]=true/false, ["content"]=文本, ["font"]=字体 ,["headID"]=null/enterID ,["guideType"]=0/1
GuideListenDefine.FIELD_ACTION_ANIMTIPS = "AnimTips"; //动画提示												["pointingInfo"]={["windowName"]:"path/...",["dir"]:"down"},["window"]="path/paths", ["offsetX"]=偏移xy ,["offsetY"]=没有window时是固定坐标 ,["animbox"]=动画名字 写于ui_anim.csv,["adp"]="window"/"this"/null,["windox_pos"]="center",["loop"]=true/false,["width"]=,["height"]="adp"不填时需要固定的动画长宽, ["guideType"]=0/1/2/3/4,["moveInfo"]= 动画相关信息{["target"]:,["targetPos"]:{x,y},["shakePos"]={x,y},["moveTime"]=,["speed"]={x,y},["animLoop"]=,["startTime"]=,["endTime"]=,["backPlay"]=} 
GuideListenDefine.FIELD_ACTION_MOVABLEANIMTIPS = "MovableAnimTips"; //可移动动画提示											
GuideListenDefine.FIELD_ACTION_RECORD = "Record"; //记录文本数据										["key"]="string", ["value"]="string" 
GuideListenDefine.FIELD_ACTION_DELETE_LISTEN = "DeleteListen"; //删除点击监听										["listen"]=20000
GuideListenDefine.FIELD_ADD_LISTEN = "AddListen"; //插入监听												["listen"]=20000
GuideListenDefine.FIELD_CREAT_MASK = "CreatMask"; //创建遮罩											["link"]=""		参照TaskDefine.lua
GuideListenDefine.FIELD_DO_EVENT = "DoEvent"; //执行动作											["listen"]=20000
GuideListenDefine.FIELD_SHOW_BTN_TIPS = "ShowBtnTips"; //根据事件红点提示
GuideListenDefine.FIELD_HIDE_BTN_TIPS = "HideBtnTips"; //根据事件红点提示
//GuideListenDefine.FIELD_SHOW_TIPS																		= "ShowTips"							//手动显示红点提示包括弹出活动框
//GuideListenDefine.FIELD_SHOW_TIPS_NO_ACTIVITY												= "ShowTipsNoActivity"		//手动显示红点提示
//GuideListenDefine.FIELD_DO_EVENT_BY_PARAM														= "doEventByParam"				//根据参数执行
GuideListenDefine.FIELD_ACTION_CLOCKER = "Clocker"; //计时器（延时）									["delay"]=1000         单位:毫秒  这个动作后所有动作自动延迟再执行
GuideListenDefine.FIELD_ACTION_PICKSEX = "PickSex"; //
GuideListenDefine.FIELD_ACTION_SHOUGROWFRAME = "ShowGrowFrame"; //打开指定界面（GrowFrame）				["entryId"] = 7656(自己)/伙伴entry
GuideListenDefine.FIELD_ACTION_REFRESHPETFRAME = "RefreshPetFrame"; //刷新伙伴界面（显示指定对象）		["entryId"] = 0(自己)/伙伴entry
GuideListenDefine.FIELD_PLAY_MOVIE = "PlayMovie"; //播放电影 ["movieName"]="testing"
GuideListenDefine.FIELD_SHOW_CHANNELTIPS = "Channel"; //频道消息 ["channel"]=22(公告),	["content"]="",["shengdi"]=true/false
GuideListenDefine.FIELD_ACTION_REFRESHPETTAB = "RefreshPetTab"; //刷新伙伴界面（显示指定对象）		["tab"] = "RoleTab"/"WakeTab"/"BreakTab"/"LinkTab", ["entryId"] = 0(自己)/伙伴entry
//监控条件
GuideListenDefine.FIELD_CONDITION_HERO_LEVEL = "HeroLevel"; //要求主角等级符合要求才会加入监听, "HeroLevel" = {"<:", 11}
GuideListenDefine.FIELD_CONDITION_TASK = "TaskId"; //要求当前任务的ID，"TaskId" = taskId
//监控事件
GuideListenDefine.FIELD_LISTEN_EVENT_ACCEPTTASK = "AcceptTask"; //监听接受任务事件，["taskId"] = 41000（填写在ListenParam中）
GuideListenDefine.FIELD_LISTEN_EVENT_CLICKBUTTON = "ClickButton"; //监听按钮事件，["buttonName"] = "skill"/["index"]=1									"ClickButton"和"UIShow"这两个只有加入listenList列表里才会检测
GuideListenDefine.FIELD_LISTEN_EVENT_SHORTCLICKBUTTON = "ShortButton",
    // GuideListenDefine.FIELD_LISTEN_EVENT_CLICKBUTTONU = "ClickButtonU"				//监听按钮事件，["buttonName"] = "skill"/["index"]=1									"ClickButton"和"UIShow"这两个只有加入listenList列表里才会检测
    // GuideListenDefine.FIELD_LISTEN_EVENT_CLICKBUTTOND = "ClickButtonD"				//监听按钮事件，["buttonName"] = "skill"/["index"]=1									"ClickButton"和"UIShow"这两个只有加入listenList列表里才会检测
    GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUISHOW = "UIShow"; //监听窗口打开事件，["windowName"] = "xxx"			这个跟WindowOpen最大的区别是只有加入监控的引导索引才能检测，而不是任何时候打开界面都检测
GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUICTRLSHOW = "UICtrlShow"; //监听窗口打开事件，["windowName"] = "xxx"			这个跟WindowOpen最大的区别是只有加入监控的引导索引才能检测，而不是任何时候打开界面都检测
GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUICTRLHIDE = "UICtrlHide"; //监听窗口打开事件，["windowName"] = "xxx"			这个跟WindowOpen最大的区别是只有加入监控的引导索引才能检测，而不是任何时候打开界面都检测
GuideListenDefine.FIELD_LISTEN_EVENT_LEVELUPDATE = "LevelUpdate"; //监听主角升级事件，["level"] = 11/["range"] = 10(最小值，当前等级大于或等于都会返回真)
GuideListenDefine.FIELD_LISTEN_EVENT_RECORD = "CheckRecord"; //监听记录情况，["record"] = {key, value}
GuideListenDefine.FIELD_LISTEN_EVENT_LOGIN = "LogIn"; //监听登陆事件，
GuideListenDefine.FIELD_LISTEN_EVENT_WINDOW_CLOSE = "WindowClose"; //监听关闭指定窗口事件["window"]=""  只有被监听的才会执行
//GuideListenDefine.FIELD_LISTEN_EVENT_PET_UPLEVEL = "PetUpLevel"				//监听宠物升级事件["level"]={"op", value1, value2}
GuideListenDefine.FIELD_LISTEN_EVENT_GET_MESSAGE = "GetMessage"; //监听接收到网络消息 
GuideListenDefine.FIELD_LISTEN_EVENT_WND_UPDATE_BTN_TIPS = "WindowBtnTips"; //监听接收到网络消息
//GuideListenDefine.FIELD_LISTEN_EVENT_PET_EMBATTLE_STATE = "PetEmbattleState"						//监听部下上阵
//GuideListenDefine.FIELD_LISTEN_EVENT_WINDOW_ANIMATION_STATE = "wndAnimationState"			//窗口动画
//GuideListenDefine.FIELD_LISTEN_EVENT_COMBAT_FIGHT_RP_FULL = "CombatFightRPFull"			//可发招，[skillId]=, 
//GuideListenDefine.FIELD_LISTEN_EVENT_PET_QUEUE_UPDATE = "petQueueUpdate"			//窗口动画
//GuideListenDefine.FIELD_LISTEN_EVENT_PET_AWAKE = "PetAwake"					//伙伴觉醒，["entryId"]=, ["level"]=
//GuideListenDefine.FIELD_LISTEN_EVENT_PROFESSION_UNLOCK = "UnlockProfession"	//换职业，
//GuideListenDefine.FIELD_LISTEN_EVENT_COMBAT_END = "CombatEnd"					//监听结束战斗事件
//GuideListenDefine.FIELD_LISTEN_EVENT_GROW_SOON_FINISH = "GrowSoon"					//监听快速完成养成事件
//GuideListenDefine.FIELD_LISTEN_EVENT_QUICK_RECRUIT_PRIZE = "QuickRecruit"			//监听快速招募事件	["entryId"] = 18000
//GuideListenDefine.FIELD_LISTEN_EVENT_MOVIE_END = "MovieEnd"					//监听电影结束事件 ["movieName"]="testing"
//GuideListenDefine.FIELD_LISTEN_EVENT_ROBBER_HANG_FIGHT = "HangFight"					//监听圣地挂机战斗开始事件
GuideListenDefine.FIELD_LISTEN_EVENT_ACTIVATE_BUTTON = "ActivateButton"; //监听新功能开启 ["funcIndex"]="fengmo"
GuideListenDefine.FIELD_LISTEN_EVENT_CAMPAIGN_FIRST_PASS = "CampFirstPass"; //监听关卡首次通关 ["campaignId"]=1001
GuideListenDefine.FIELD_LISTEN_EVENT_TASK_SUCCEED = "SucceedTask"; //监听完成任务事件，["taskId"] = 41000（填写在ListenParam中）
GuideListenDefine.FIELD_LISTEN_EVENT_TASK_FINISH = "FinishTask"; //监听完成任务事件，["taskId"] = 41000（填写在ListenParam中）
var GuideListenerType = (_a = {},
    _a["AcceptTask"] = EventDefine.TASK_ACCPET,
    _a["LevelUpdate"] = EventDefine.HERO_PER_LEVELUP,
    _a["ClickButton"] = EventDefine.ROOTWINDOW_MOUSE_UP,
    _a["ShortButton"] = EventDefine.ROOTWINDOW_MOUSE_CLICK,
    _a["UIShow"] = EventDefine.UI_SHOW,
    _a["UICtrlShow"] = EventDefine.UI_CTRL_SHOW,
    _a["UICtrlHide"] = EventDefine.UI_CTRL_HIDE,
    _a["LogIn"] = EventDefine.LOGIN_LOGO_HIDE_FINISH,
    _a["WindowClose"] = EventDefine.UI_HIDE,
    _a["PetUpLevel"] = EventDefine.PET_UPDATE,
    _a["GetMessage"] = EventDefine.GET_MESSAGE,
    // ["WindowBtnTips"]: EventDefine.WND_UPDATE_BTN_TIPS,
    _a["PetEmbattleState"] = EventDefine.PET_EMBATTLE_STATE,
    // ["wndAnimationState"]: EventDefine.WINDOW_ANIMATION_STATE,
    _a["CombatFightRPFull"] = EventDefine.COMBAT_FIGHT_RP_FULL,
    _a["petQueueUpdate"] = EventDefine.CAMPAIGN_DYNAMIC_ARRAY_UPDATE,
    _a["PetAwake"] = EventDefine.PET_AWAKE,
    _a["UnlockProfession"] = EventDefine.VOCATIONER_UNLOCK,
    _a["CombatEnd"] = EventDefine.COMBAT_END,
    _a["GrowSoon"] = EventDefine.GROW_SOON_FINISH,
    _a["QuickRecruit"] = EventDefine.PET_QUICK_RECRUIT_PRIZE,
    _a["MovieEnd"] = EventDefine.MOVIE_END,
    _a["HangFight"] = EventDefine.ROBBER_HANG_FIGHT_BEGIN,
    _a["ActivateButton"] = EventDefine.GUIDE_ACTIVATE_BUTTON,
    _a["CampFirstPass"] = EventDefine.CAMPAIGN_FINISH,
    _a["SucceedTask"] = EventDefine.TASK_COMMIT_FINISH,
    _a["FinishTask"] = EventDefine.TASK_FINISH,
    _a);
var GuideListenerEvent = (_b = {},
    //[GuideListenDefine.FIELD_LISTEN_EVENT_PET_QUEUE_UPDATE]: true,					//"petQueueUpdate",
    //[GuideListenDefine.FIELD_LISTEN_EVENT_PET_UPLEVEL]: true,								//"PetUpLevel",
    //[GuideListenDefine.FIELD_LISTEN_EVENT_COMBAT_FIGHT_RP_FULL]: true,			//"CombatFightRPFull",
    //[GuideListenDefine.FIELD_LISTEN_EVENT_WINDOW_ANIMATION_STATE]: true,		//"wndAnimationState",
    //[GuideListenDefine.FIELD_LISTEN_EVENT_PET_EMBATTLE_STATE]: true,				//"PetEmbattleState",
    //[GuideListenDefine.FIELD_LISTEN_EVENT_CLICKBUTTOND]: true,							//"ClickButtonD",
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_SHORTCLICKBUTTON] = true,
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_CLICKBUTTON] = true,
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUISHOW] = true,
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUICTRLSHOW] = true,
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_LISTENUICTRLHIDE] = true,
    _b[GuideListenDefine.FIELD_LISTEN_EVENT_WINDOW_CLOSE] = true,
    _b);
//
//GuideFuncConfig = readCSV("data\\config\\Task\\auxiliary\\open_function_opera.csv")
//GuideSchoolIntr = readCSV("data\\config\\Task\\school_introduce.csv")
//由于加载顺序问题，图片索引放到这里定义
ImportType(GuideFuncDefine);
var GuideRedTipsIndexList = {};
//以等级作为开启条件的功能
// let LevelFuncOpenLimit: any = {
//     [GuideFuncDefine.FIELD_FUNC_GUANKAZUDUI]: 10,							//关卡
//     [GuideFuncDefine.FIELD_FUNC_HANGHAI]: 40,             //航海
//     [GuideFuncDefine.FIELD_FUNC_TIANTI]: 20,							//天梯
//     [GuideFuncDefine.FIELD_FUNC_RONGJIE]: 25,							//溶解
// }
var FuncOpenConditionType = {
    LEVEL: 1,
    CAMPAIGN: 2,
    TASK: 3,
};
//小功能限制（不足够条件作为功能类处理的判断），等级、关卡等类别的检查条件
//小功能限制（不足够条件作为功能类处理的判断），等级、关卡等类别的检查条件
var ClientFuncLimit = (_c = {},
    _c["sdxiaohaotili"] = (_d = {},
        _d["guanka"] = [1048],
        _d["dengji"] = 0,
        _d),
    _c["fakeChat"] = (_e = {},
        _e["guanka"] = [1012],
        _e["dengji"] = 0,
        _e),
    _c["zhaojisuipian"] = (_f = {},
        _f["guanka"] = [1030],
        _f["dengji"] = 0,
        _f),
    _c["guankazhuanzhi"] = (_g = {},
        _g["guanka"] = [1054],
        _g["dengji"] = 0,
        _g),
    _c["guankadengji"] = (_h = {},
        _h["guanka"] = [1072],
        _h["dengji"] = 0,
        _h),
    _c["shengdixiaolv"] = (_j = {},
        _j["guanka"] = [1012],
        _j["dengji"] = 0,
        _j),
    _c["shengdijiang"] = (_k = {},
        _k["guanka"] = [1012],
        _k["dengji"] = 0,
        _k),
    _c["tuozhuangbei"] = (_l = {},
        _l["guanka"] = [1009],
        _l["dengji"] = 0,
        _l),
    _c["jingongtu"] = (_m = {},
        _m["guanka"] = [1036],
        _m["dengji"] = 0,
        _m),
    _c["zhuanzhi"] = (_o = {},
        _o["guanka"] = [1001],
        _o["dengji"] = 0,
        _o),
    _c["xinshoubaoxiang"] = (_p = {},
        _p["guanka"] = [],
        _p["dengji"] = opNewBieBoxConfig.maxPlrLevel + 1,
        _p),
    _c["fengmo"] = (_q = {},
        _q["guanka"] = [],
        _q["dengji"] = 30,
        _q),
    _c);
function CheckClientFuncLimit(index) {
    var flag = true;
    var str = "";
    var elem = null;
    if (ClientFuncLimit[index]) {
        var v = ClientFuncLimit[index];
        var guankaList = v["guanka"] || [];
        for (var _ = 0; _ < guankaList.length; _++) {
            var camId = guankaList[_];
            if (CampaignSystem.getInstance().isCampaignPass(camId) == false) {
                flag = false;
                var name_1 = CampaignSystem.getInstance().getCampaignName(camId);
                str = String.format(Localize_cns("GUIDE_TXT7"), name_1);
                break;
            }
        }
        if (flag == true) {
            var level = GetHeroProperty("level") || 0;
            var needLevel = (v["dengji"] || 0);
            flag = level >= needLevel;
            if (flag == false) {
                str = String.format(Localize_cns("GUIDE_TXT9"), needLevel);
            }
        }
        elem = v;
    }
    else {
        return [false, str, null];
    }
    return [flag, str, elem];
}
var _guideLocalIndex = 0;
function GenLocalGuideIndex() {
    _guideLocalIndex = _guideLocalIndex - 1;
    return _guideLocalIndex;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=GuideDefine.js.map