// TypeScript file
function ExcuteFunctionMenuHandle(index, info) {
    if (info && info.handle) {
        info.handle(index, info);
    }
}
//////////////////////////////////////////////////////////////////////////////-
//处理功能菜单打开的界面
function ExecuteMainFrameFunction(index) {
    var _a = CheckMainFrameFunction(index), enable = _a[0], tips = _a[1];
    if (!enable) {
        MsgSystem.addTagTips(tips);
        return false;
    }
    // function exeShengdi(){//圣地
    // 	GetActivity(ActivityDefine.Robber).requestStart()
    // }
    function exeJingjichang() {
        // if (HeroIsInTeam() == true) {
        // 	return MsgSystem.addTagTips(Localize_cns("TEAM_TXT51"))
        // }
        // //单人关卡时，布阵界面打开表示进入“竞技场”单人空间
        // EnterRoleActivitySpace(OrdinaryActivityIndex.CHAMPION)
        WngMrg.getInstance().showWindow("ChampionFrame");
    }
    function exeJiaose() {
        var wnd = WngMrg.getInstance().getWindow("RoleFrame");
        wnd.showWithIndex(0);
    }
    function exeDuanzao() {
        var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
        wnd.showWithIndex(0);
    }
    function exeXianlv() {
        var wnd = WngMrg.getInstance().getWindow("XianLvFrame");
        wnd.showWithIndex(0);
    }
    function exeChongwu() {
        var wnd = WngMrg.getInstance().getWindow("PetFrame");
        wnd.showWithIndex(0);
    }
    function exeRichang() {
        var wnd = WngMrg.getInstance().getWindow("DailyFrame");
        wnd.showWithIndex(0);
    }
    function exeBeibao() {
        var wnd = WngMrg.getInstance().getWindow("ItemBeiBaoFrame");
        wnd.showWithIndex(0);
    }
    function exeWanjia() {
        var wnd = WngMrg.getInstance().getWindow("PlayerDetailsFrame");
        wnd.showWnd();
    }
    function exeDitu() {
        var wnd = WngMrg.getInstance().getWindow("MapFrame");
        wnd.showWnd();
    }
    function exeZhucheng() {
        var wnd = WngMrg.getInstance().getWindow("MainCityFrame");
        wnd.showWnd();
    }
    function exeGonghui() {
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo == null) {
            return;
        }
        if (heroInfo["faction"] == 0) {
            WngMrg.getInstance().showWindow("ClubWelcomeFrame");
            WngMrg.getInstance().showWindow("ClubListFrame");
        }
        else {
            WngMrg.getInstance().showWindow("ClubFrame");
        }
    }
    function exeHuoDong() {
        WngMrg.getInstance().showWindow("ActivityListFrame");
    }
    function exeVIP() {
        WngMrg.getInstance().showWindow("VIPFrame");
    }
    function exeChongZhi() {
        WngMrg.getInstance().showWindow("PayFrame");
    }
    function exeDati() {
        // if (TeamMemberBaned() == true) {
        // 	return
        // }
        if (CheckEndFightNow() == false)
            return;
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_QUERY);
        SendGameMessage(message);
        var a = GetActivity(ActivityDefine.AnswerQuestion);
        a.requestStart();
    }
    function exeFuben() {
        WngMrg.getInstance().showWindow("CopyMainFrame");
    }
    function exeYuanBaoShangdian() {
        var wnd = WngMrg.getInstance().getWindow("ShopYuanBaoFrame");
        wnd.showWithIndex(0);
    }
    function exeZhuangBeiShangdian() {
        var wnd = WngMrg.getInstance().getWindow("ShopEquipFrame");
        wnd.showWithIndex(0);
    }
    function exeChongwuShangdian() {
        var wnd = WngMrg.getInstance().getWindow("ShopZhuangBanFrame");
        wnd.showWithIndex(0);
    }
    function exeJingjiShangDian() {
        var wnd = WngMrg.getInstance().getWindow("ShopJingJiFrame");
        wnd.showWithIndex(0);
    }
    function exeTianxian() {
        var wnd = WngMrg.getInstance().getWindow("TianXianFrame");
        wnd.showWithIndex(0);
    }
    function exePaiHangbang() {
        WngMrg.getInstance().showWindow("RankFrame");
    }
    function exeGuanKa() {
        var wnd = WngMrg.getInstance().getWindow("CampaignBossFrame");
        wnd.showWnd();
    }
    function exeTianNv() {
        var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
        wnd.showWithIndex(0);
    }
    function exeGerenBoss() {
        var wnd = WngMrg.getInstance().getWindow("BossMainFrame");
        wnd.showBossFrame(0);
    }
    function exeLongwang() {
        var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
        wnd.showBossFrame(0);
    }
    function exeShouGou() {
        WngMrg.getInstance().showWindow("ClubExchangeFrame");
    }
    function exeHaoyou() {
        WngMrg.getInstance().showWindow("FriendsFrame");
    }
    function exeGlobal() {
        WngMrg.getInstance().showWindow("GlobalMainFrame");
    }
    function exeRongLian() {
        WngMrg.getInstance().showWindow("BeiBaoSmelteFrame");
    }
    var list = (_b = {},
        _b["jingjichang"] = exeJingjichang,
        _b["jiaose"] = exeJiaose,
        _b["duanzao"] = exeDuanzao,
        _b["xianlv"] = exeXianlv,
        _b["chongwu"] = exeChongwu,
        _b["richang"] = exeRichang,
        _b["beibao"] = exeBeibao,
        _b["wanjia"] = exeWanjia,
        _b["ditu"] = exeDitu,
        _b["zhucheng"] = exeZhucheng,
        _b["gonghui"] = exeGonghui,
        _b["shougou"] = exeShouGou,
        _b["huodong"] = exeHuoDong,
        _b["VIP"] = exeVIP,
        _b["chongzhi"] = exeChongZhi,
        _b["dati"] = exeDati,
        _b["fuben"] = exeFuben,
        _b["yuanbaoshangdian"] = exeYuanBaoShangdian,
        _b["zhuangbeishangdian"] = exeZhuangBeiShangdian,
        _b["chongwushangdian"] = exeChongwuShangdian,
        _b["jingjishangdian"] = exeJingjiShangDian,
        _b["tianxian"] = exeTianxian,
        _b["paihangbang"] = exePaiHangbang,
        _b["guanka"] = exeGuanKa,
        _b["tiannv"] = exeTianNv,
        _b["gerenboss"] = exeGerenBoss,
        _b["longwang"] = exeLongwang,
        _b["haoyou"] = exeHaoyou,
        _b["global"] = exeGlobal,
        _b["ronglian"] = exeRongLian,
        _b);
    if (list[index]) {
        var func = list[index];
        func.call();
        return true;
    }
    return false;
    var _b;
}
//处理功能菜单的开放条件及返回必要提示
function CheckMainFrameFunction(index, param) {
    function checkGongneng(funcIndex) {
        funcIndex = funcIndex || param;
        var str = "";
        var flag = GuideSystem.getInstance().isFuncOpen(funcIndex);
        // let campaignId = CampaignSystem.getInstance().getCampaignIdByFuncIndex(funcIndex)
        // if (campaignId != null) {
        // 	let name = CampaignSystem.getInstance().getCampaignName(campaignId)
        // 	str = String.format(Localize_cns("GUIDE_TXT1"), name)
        // } else {
        // if (LevelFuncOpenLimit[funcIndex]) {
        // 	str = String.format(Localize_cns("GUIDE_TXT3"), LevelFuncOpenLimit[funcIndex])
        // } else {
        // 	str = Localize_cns("QUICKGAIN_TXT21")
        // }
        // }
        if (!flag) {
            var config = GameConfig.FuncDefineConfig[funcIndex];
            var openType = config.openType;
            var param_1 = config.openParam;
            if (openType == FuncOpenConditionType.LEVEL) {
                str = String.format(Localize_cns("GUIDE_TXT3"), param_1);
            }
            else if (openType == FuncOpenConditionType.CAMPAIGN) {
                var campaignName = CampaignSystem.getInstance().getCampaignName(param_1);
                str = String.format(Localize_cns("GUIDE_TXT1"), campaignName);
            }
            else if (openType == FuncOpenConditionType.TASK) {
                var taskName = TaskSystem.getInstance().getTaskName(param_1);
                str = String.format(Localize_cns("GUIDE_TXT1"), taskName);
            }
        }
        return [flag, str];
    }
    function checkHuoDong() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_HUODONG);
    }
    function checkJingjichang() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_JINGJICHANG);
    }
    function checkZuoQi() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_ZUOQI);
    }
    function checkCaiLiaoFuBen() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_CAILIAOFUNBEN);
    }
    function checkXianLv() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_XIANLV);
    }
    function checkZhuCheng() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_ZHUCHENG);
    }
    function checkChengHao() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_CHENGHAO);
    }
    function checkDoHaiLongGong() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_DOHAILONGGONG);
    }
    function checkXiaoLeiYinSi() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_XIAOLEIYINSI);
    }
    function checkKuaFu() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_KUAFU);
    }
    function checkShiZhuang() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_SHIZHUANG);
    }
    function checkXiYouLiLian() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_XIYOULILIAN);
    }
    function checkTianXian() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_TIANXIAN);
    }
    function checkBangHui() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_BANGHUI);
    }
    function checkTianTingShiLian() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_TIANTINGSHILIAN);
    }
    function checkSanShengSanShi() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_SANSHENGSANSHI);
    }
    function checkPaiHangBang() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_PAIHANGBANG);
    }
    function checkDanYao() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_DANYAO);
    }
    function checkShenBing() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_SHENBING);
    }
    function checkYeWaiBOSS() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_YEWAIBOSS);
    }
    function checkChiBang() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_CHIBANG);
    }
    function checkFaZhen() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_FAZHEN);
    }
    function checkXianWei() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_XIANWEI);
    }
    function checkTongLing() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_TONGLING);
    }
    function checkShouHun() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_SHOUHUN);
    }
    function checkJingMai() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_JINGMAI);
    }
    function checkTianNv() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_TIANNV);
    }
    function checkShengSiJie() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_SHENGSIJIE);
    }
    function checkXianQi() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_XIANQI);
    }
    function checkHuaNian() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_HUANIAN);
    }
    function checkLingQi() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_LINGQI);
    }
    function checkFaBao1() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_FABAO1);
    }
    function checkFaBao2() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_FABAO2);
    }
    function checkFaBao3() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_FABAO3);
    }
    function checkFaBao4() {
        return checkGongneng(GuideFuncDefine.FIELD_FUNC_FABAO4);
    }
    function checkFormalFight() {
        if (FightSystem.getInstance().isFight() == false) {
            return [false, ""];
        }
        else {
            var _a = FightSystem.getInstance().getCurFightType(), fightType = _a[0], _ = _a[1];
            if (fightType != opFightResultType.PATROL) {
                return [true, Localize_cns("TEAM_TXT4")];
            }
        }
        return [false, ""];
    }
    var list = (_a = {},
        _a["huodong"] = checkHuoDong,
        //["jingjichang"]: checkJingjichang, //竞技场
        _a["zuoqi"] = checkZuoQi,
        _a["cailiaofuben"] = checkCaiLiaoFuBen,
        _a["xianlv"] = checkXianLv,
        _a["zhucheng"] = checkZhuCheng,
        _a["chenghao"] = checkChengHao,
        _a["dohailonggong"] = checkDoHaiLongGong,
        _a["xiaoleiyinsi"] = checkXiaoLeiYinSi,
        _a["kuafu"] = checkKuaFu,
        _a["shizhuang"] = checkShiZhuang,
        _a["xiyoulilian"] = checkXiYouLiLian,
        _a["tianxian"] = checkTianXian,
        _a["banghui"] = checkBangHui,
        _a["tiantingshilian"] = checkTianTingShiLian,
        _a["sanshengsanshi"] = checkSanShengSanShi,
        _a["paihangbang"] = checkPaiHangBang,
        _a["danyao"] = checkDanYao,
        _a["shenbing"] = checkShenBing,
        _a["yewaiBOSS"] = checkYeWaiBOSS,
        _a["chibang"] = checkChiBang,
        _a["fazhen"] = checkFaZhen,
        _a["xianwei"] = checkXianWei,
        _a["tongling"] = checkTongLing,
        _a["shouhun"] = checkShouHun,
        _a["jingmai"] = checkJingMai,
        _a["tiannv"] = checkTianNv,
        _a["shengsijie"] = checkShengSiJie,
        _a["xianqi"] = checkXianQi,
        _a["huanian"] = checkHuaNian,
        _a["lingqi"] = checkLingQi,
        _a["fabao1"] = checkFaBao1,
        _a["fabao2"] = checkFaBao2,
        _a["fabao3"] = checkFaBao3,
        _a["fabao4"] = checkFaBao4,
        _a["formalfight"] = checkFormalFight,
        _a);
    if (list[index]) {
        var func = list[index];
        return func();
    }
    return [true, ""];
    var _a;
}
////////////////////////////////////////////////////////////////////////////
function handleImplement() {
    MsgSystem.addTagTips(Localize_cns("UNIMPLEMENT_TIPS"));
}
// function InitFunctionMenu1() {//培养
// 	let commonHandler = ExecuteMainFrameFunction
// 	let FuncMenu1Config: any = {
// 		["beibao"]: { ["index"]: 1, ["title_img"]: "sd_biaoQianDi15", ["effect"]: effectIndex.MenuBeibao, ["offset_y"]: 10, ["x"]: 480, ["y"]: 660, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["yuling"]: { ["index"]: 2, ["title_img"]: "sd_biaoQianDi08", ["effect"]: effectIndex.MenuYuling, ["offset_y"]: 10, ["x"]: -15, ["y"]: 108, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["shouhu"]: { ["index"]: 3, ["title_img"]: "sd_biaoQianDi09", ["effect"]: effectIndex.MenuShouHu, ["offset_y"]: 10, ["x"]: 425, ["y"]: 85, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["huoban"]: { ["index"]: 4, ["title_img"]: "sd_biaoQianDi14", ["effect"]: effectIndex.MenuJuese, ["offset_y"]: 0, ["x"]: -45, ["y"]: 385, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["jitan"]: { ["index"]: 5, ["title_img"]: "sd_biaoQianDi12", ["imgW"]: 165, ["effect"]: effectIndex.MenuJitan, ["offset_y"]: 10, ["x"]: 480, ["y"]: 335, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 	}
// 	return FuncMenu1Config
// }
// ////////////////////////////////////////////////////////////////////////////
// function InitFunctionMenu2() {//收益
// 	let commonHandler = ExecuteMainFrameFunction
// 	let FuncMenu3Config: any = {
// 		["tianti"]: { ["index"]: 1, ["title_img"]: "sd_biaoQianDi18", ["effect"]: effectIndex.MenuTianti, ["offset_y"]: 220, ["x"]: 180, ["y"]: 0, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: false, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["shengdi"]: { ["index"]: 2, ["title_img"]: "sd_biaoQianDi04", ["effect"]: effectIndex.MenuShengDi, ["offset_y"]: 280, ["offset_x"]: -110, ["x"]: 415, ["y"]: 110, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["shilian"]: { ["index"]: 3, ["title_img"]: "sd_biaoQianDi03", ["effect"]: effectIndex.MenuShiLian, ["offset_y"]: 0, ["imgW"]: 200, ["offset_x"]: -25, ["x"]: 0, ["y"]: 220, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["jingjichang"]: { ["index"]: 4, ["title_img"]: "sd_biaoQianDi02", ["effect"]: effectIndex.MenuJingji, ["offset_y"]: 195, ["x"]: 420, ["y"]: 462, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["guanka"]: { ["index"]: 5, ["title_img"]: "sd_biaoQianDi01", ["effect"]: effectIndex.MenuGuanka, ["offset_y"]: 58, ["x"]: 163, ["y"]: 600, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["hanghai"]: { ["index"]: 6, ["title_img"]: "sd_biaoQianDi20", ["effect"]: effectIndex.MenuHanghai, ["offset_y"]: 0, ["x"]: -45, ["y"]: 645, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		//["jiaoyisuo"]   = { ["title_img"] : "sd_biaoQianDi10", ["image"]: effectIndex.MenuBeibao,["x"]: 20, ["y"]: 20, ["w"]:0,		["h"]: 0, ["handle"] : commonHandler,["close"] : true, ["func"] : GuideFuncDefine.FIELD_FUNC_JINGJICHANG,["campaignId"] : 1000,},
// 		//["jifen"] 				= { ["title"] : Localize_cns("MAIN_TXT29"), ["image"]:"ejcd_jianZhuIcon01",["x"]:320, ["y"]: 20, ["w"]:0,		["h"]: 0, ["handle"] : commonHandler,["close"] : true, ["func"] : GuideFuncDefine.FIELD_FUNC_JINGJICHANG,["campaignId"] : 1000,},
// 		//["choujiang"] 		= { ["title"] : Localize_cns("MAIN_TXT27"), ["title_img"] : "", ["image"]: effectIndex.MenuBeibao,	["x"]: 205, ["y"]: 335,["w"]:0,		["h"]: 0, ["handle"] : commonHandler,["close"] : true, ["func"] : GuideFuncDefine.FIELD_FUNC_JINGJICHANG,["campaignId"] : 1000,},
// 	}
// 	return FuncMenu3Config
// }
// ////////////////////////////////////////////////////////////////////////////
// function InitFunctionMenu3() {//社交
// 	let commonHandler = ExecuteMainFrameFunction
// 	let FuncMenu2Config: any = {
// 		["haoyou"]: { ["index"]: 1, ["title_img"]: "sd_biaoQianDi07", ["effect"]: effectIndex.MenuHaoyou, ["offset_y"]: -10, ["x"]: 425, ["y"]: 68, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["gonghui"]: { ["index"]: 2, ["title_img"]: "sd_biaoQianDi05", ["effect"]: effectIndex.MenuGonghui, ["offset_y"]: 70, ["x"]: 213, ["y"]: 585, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["paihangbang"]: { ["index"]: 3, ["title_img"]: "sd_biaoQianDi06", ["effect"]: effectIndex.MenuPaihangbang, ["offset_y"]: 0, ["x"]: -45, ["y"]: 645, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["email"]: { ["index"]: 4, ["title_img"]: "sd_biaoQianDi16", ["imgW"]: 135, ["effect"]: effectIndex.MenuYoujian, ["offset_y"]: -0, ["x"]: 510, ["y"]: 660, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["homepage"]: { ["index"]: 5, ["title_img"]: "sd_biaoQianDi17", ["imgW"]: 160, ["effect"]: effectIndex.MenuZhuYe, ["offset_y"]: 0, ["x"]: 480, ["y"]: 326, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_JINGJICHANG, ["campaignId"]: 1000, },
// 		["zudui"]: { ["index"]: 6, ["title_img"]: "sd_biaoQianDi19", ["effect"]: effectIndex.MenuZudui, ["offset_y"]: 50, ["x"]: -20, ["y"]: 100, ["w"]: 0, ["h"]: 0, ["handle"]: commonHandler, ["close"]: true, ["func"]: GuideFuncDefine.FIELD_FUNC_ZUDUI, ["campaignId"]: 1000, },
// 	}
// 	return FuncMenu2Config
// } 
//# sourceMappingURL=FunctionMenuConfig.js.map