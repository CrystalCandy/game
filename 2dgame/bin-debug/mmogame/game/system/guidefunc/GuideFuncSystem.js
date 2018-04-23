/*
作者:
    yangguiming
    
创建时间：
   2017.03.15(周三)

意图：
   引导新功能系统（红点）
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
var GuideEquipState = {
    EQUIP_NORMAL: 0,
    EQUIP_NO: 1,
    EQUIP_NEEDLEVEL: 2,
    EQUIP_YES: 4,
    EQUIP_CHANGE: 5,
    //EQUIP_CANMAKE: 6,  //可打造
    EQUIP_CANPROMOTE: 7,
};
var GuideFuncSystem = (function (_super) {
    __extends(GuideFuncSystem, _super);
    function GuideFuncSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideFuncSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.wndAndPathsToConfigList = {};
        this.showWndToConfigList = {};
        this.hideWndToConfigList = {};
        this.timerList = {};
        RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
        RegisterEvent(EventDefine.UI_CTRL_SHOW, this.onUIShowEvent, this);
        RegisterEvent(EventDefine.UI_CTRL_HIDE, this.onUIHideEvent, this);
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGameCheck, this);
        this.onClear();
    };
    GuideFuncSystem.prototype.destory = function () {
        UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
        UnRegisterEvent(EventDefine.UI_CTRL_SHOW, this.onUIShowEvent, this);
        UnRegisterEvent(EventDefine.UI_CTRL_HIDE, this.onUIHideEvent, this);
        UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGameCheck, this);
    };
    GuideFuncSystem.prototype.onClear = function () {
        this.manualWndTimesMap = {}; //手动关闭红点次数
        this.manualCloseResultMap = {}; //关闭的事件记录
        this.dynamicTipsMap = {};
        this.simpleServerNotice = [];
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    GuideFuncSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initGuideFuncSystem(workQueue);
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(this.initBtnTipsConfig, this));
    };
    GuideFuncSystem.prototype.initBtnTipsConfig = function () {
        this.wndAndPathsToConfigList = {};
        for (var _ in GameConfig.ButtonTipsConfig) {
            var v = GameConfig.ButtonTipsConfig[_];
            for (var _1 = 0; _1 < v.buttonList.length; _1++) {
                var path = v.buttonList[_1];
                var wndName = StringUtil.stringMatch(path, /(\w+)\//)[0];
                var wndinfo = WngMrg.getInstance().findWndMapInfo(wndName);
                if (wndinfo == null) {
                    TLog.Error("GuideFuncSystem.initBtnTipsConfig error:%s", path);
                    TLog.Assert(false);
                }
                //（一个窗口，可能多个红点对应）
                var pathsToConfigList = this.wndAndPathsToConfigList[wndName] || {};
                pathsToConfigList[path] = pathsToConfigList[path] || [];
                JsUtil.arrayInstert(pathsToConfigList[path], v);
                this.wndAndPathsToConfigList[wndName] = pathsToConfigList;
            }
            var closeEvent = v.manualCloseParam;
            if (closeEvent.show) {
                if (this.showWndToConfigList[closeEvent.show] == null) {
                    this.showWndToConfigList[closeEvent.show] = [];
                }
                JsUtil.arrayInstert(this.showWndToConfigList[closeEvent.show], v);
            }
            if (closeEvent.hide) {
                if (this.hideWndToConfigList[closeEvent.hide] == null) {
                    this.hideWndToConfigList[closeEvent.hide] = [];
                }
                JsUtil.arrayInstert(this.hideWndToConfigList[closeEvent.hide], v);
            }
        }
    };
    GuideFuncSystem.prototype.getConfigList = function (wndName) {
        //每个BaseWnd下面，保存一个控件路径列表，每个控件路径保存一个事件检查列表
        //wndAndPathsToConfigList ={
        //	[wndName] : {
        //		[path] : {config, config,...}
        //		[path] = {config, config,...}
        //	},
        //	[wndName] = {
        //		[path] : {config, config,...}
        //		[path] = {config, config,...}
        //	},
        //}	
        return this.wndAndPathsToConfigList[wndName];
    };
    //重置为未读
    GuideFuncSystem.prototype.resetReadState = function (type, id) {
        if (id == null)
            id = 0;
        var prefix = type + id;
        IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, prefix, -1);
        FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null);
    };
    //设置已读状态
    GuideFuncSystem.prototype.setReadState = function (type, id) {
        if (id == null)
            id = 0;
        var prefix = type + id;
        IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, prefix, 1);
        FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null);
    };
    //获取读取状态
    GuideFuncSystem.prototype.getReadState = function (type, id) {
        if (id == null)
            id = 0;
        var prefix = type + id;
        return IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, prefix, -1);
    };
    GuideFuncSystem.prototype.showDynamicTips = function (type) {
        for (var _ in GameConfig.ButtonTipsConfig) {
            var v = GameConfig.ButtonTipsConfig[_];
            if (v.checkEvent == GuideFuncSpace.GuideFuncCheckDefine.EVENT_DYNAMIC_TIPS) {
                if (v.checkParam.type == type) {
                    var id = v.id;
                    delete this.manualCloseResultMap[id];
                    var closeParam = v.manualCloseParam;
                    if (closeParam.show) {
                        delete this.manualWndTimesMap[closeParam.show];
                    }
                    if (closeParam.hide) {
                        delete this.manualWndTimesMap[closeParam.hide];
                    }
                }
            }
        }
        this.dynamicTipsMap[type] = true;
        FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null);
    };
    GuideFuncSystem.prototype.hideDynamicTips = function (type) {
        delete this.dynamicTipsMap[type];
        FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null);
    };
    GuideFuncSystem.prototype.handleUIEvent = function (wndName, wndToConfigList) {
        var configList = wndToConfigList[wndName];
        if (configList == null) {
            return;
        }
        //记录打开关闭次数次数
        var times = this.manualWndTimesMap[wndName] || 0;
        times = times + 1;
        this.manualWndTimesMap[wndName] = times;
        var bFireEvent = false;
        for (var _ in configList) {
            var config = configList[_];
            if (!this.manualCloseResultMap[config.id]) {
                var allTimes = checkNull(config.manualCloseParam.times, 1);
                var result = (times >= allTimes);
                if (result) {
                    this.manualCloseResultMap[config.id] = true;
                    bFireEvent = true;
                    //完成“引导”后回收（回调）
                    this.recycleFuncHandler(config);
                }
            }
        }
        if (bFireEvent) {
            FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null);
        }
    };
    GuideFuncSystem.prototype.onUIShowEvent = function (args) {
        this.handleUIEvent(args.window.classname, this.showWndToConfigList);
    };
    GuideFuncSystem.prototype.onUIHideEvent = function (args) {
        this.handleUIEvent(args.window.classname, this.hideWndToConfigList);
    };
    GuideFuncSystem.prototype.checkEquipState = function (curInfo, equipType) {
        if (curInfo == null) {
            return GuideEquipState.EQUIP_NORMAL;
        }
        var isHero = curInfo == GetHeroPropertyInfo();
        var roleInfo = curInfo;
        var level = roleInfo.level;
        var vocationType = -1;
        // if (isHero) {
        // 	vocationType = ProfessionSystem.getInstance().getProfessionType(curInfo.vocation)//主角
        // } else {
        // 	vocationType = PetSystem.getInstance().getProfessionType(curInfo.entry)//伙伴
        // }
        // let itemRef = this.getRecommandEquipRef(curInfo, equipType, true)
        // if (itemRef) {
        // 	if (ItemSystem.getInstance().isEquipPromoteType(itemRef.ItemEntry)) {
        // 		return GuideEquipState.EQUIP_CANPROMOTE
        // 		//}else{
        // 		//	return GuideEquipState.EQUIP_CANMAKE
        // 	}
        // }
        var curEquip = GetActorEquipByType(roleInfo, equipType); //当前部分的装备
        var equipList = ItemSystem.getInstance().getEquipListByTypeAndVocation(equipType, vocationType);
        //1.当前没装备
        if (curEquip == null) {
            var useList = [];
            for (var i = 0; i < equipList.length; i++) {
                var v = equipList[i];
                var ownerId = v.getOwnerId();
                if (ownerId < 0) {
                    var userLevel = v.getRefProperty("uselevel");
                    if (userLevel <= level || v.isUseLevelIgnore() == true) {
                        return GuideEquipState.EQUIP_YES;
                    }
                    JsUtil.arrayInstert(useList, v);
                }
            }
            if (useList.length == 0) {
                return GuideEquipState.EQUIP_NO;
            }
            return GuideEquipState.EQUIP_NEEDLEVEL;
        }
        //2.检查装备
        //可更换:背包里的装备没人使用，使用等级小于角色等级，而且大于当前装备的等级
        //可升级:背包的装备人没使用，而且大于角色等级
        var bchange = false;
        var bneedLevel = false;
        var curEquipLevel = curEquip.getRefProperty("level");
        for (var i = 0; i < equipList.length; i++) {
            var v = equipList[i];
            var ownerId = v.getOwnerId();
            if (ownerId < 0) {
                var userLevel = v.getRefProperty("uselevel");
                var equipLevel = v.getRefProperty("level");
                if (equipLevel > curEquipLevel) {
                    if (userLevel <= level || v.isUseLevelIgnore() == true) {
                        bchange = true; //背包的装备
                    }
                    else {
                        bneedLevel = true;
                    }
                }
                if (bchange || bneedLevel) {
                    break;
                }
            }
        }
        //优先判断可更换
        if (bchange) {
            return GuideEquipState.EQUIP_CHANGE;
        }
        if (bneedLevel) {
            return GuideEquipState.EQUIP_NEEDLEVEL;
        }
        return GuideEquipState.EQUIP_NORMAL;
    };
    GuideFuncSystem.prototype.checkEquipInternal = function (curInfo) {
        var info = this.checkEquip(curInfo);
        return info[0];
    };
    GuideFuncSystem.prototype.checkEquip = function (curInfo) {
        if (curInfo == null) {
            return [false, GuideEquipState.EQUIP_NORMAL];
        }
        var equipPosTypeInfo = GetActorEquipPosTypeInfo();
        for (var pos in equipPosTypeInfo) {
            var type_1 = equipPosTypeInfo[pos];
            var state = this.checkEquipState(curInfo, type_1);
            if (state >= GuideEquipState.EQUIP_YES) {
                return [true, state];
            }
        }
        return [false, GuideEquipState.EQUIP_NORMAL];
    };
    GuideFuncSystem.prototype.checkXianLvUpgrade = function (xianlvId) {
        //let controlist = XianLvSystem.getInstance().getControlList()
        //let netInfo = XianLvSystem.getInstance().getRecvInfo(xianlvId)
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        var level = XianLvSystem.getInstance().getLevel(xianlvId);
        var start = XianLvSystem.getInstance().getStar(xianlvId);
        var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level];
        var isJiHuo = table_isExsit(jihuoList, xianlvId);
        if (isJiHuo == false) {
            //激活
            var jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid;
            var jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum;
            var jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem);
            if (jiHuoHad >= jiHuoCost) {
                return true;
            }
            return false;
        }
        //升阶
        var upHad = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
        if (upHad >= upgradeConfig.itemnum) {
            var hadMoney = GetHeroMoney(upgradeConfig.moneyunit);
            if (hadMoney < upgradeConfig.money) {
                return false;
            }
            return true;
        }
        return false;
    };
    GuideFuncSystem.prototype.checkXialvUpStart = function (xianlvId) {
        //let controlist = XianLvSystem.getInstance().getControlList()
        //let netInfo = XianLvSystem.getInstance().getRecvInfo(xianlvId)
        var jihuoList = XianLvSystem.getInstance().getJiHuoList();
        var level = XianLvSystem.getInstance().getLevel(xianlvId);
        var start = XianLvSystem.getInstance().getStar(xianlvId);
        var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level];
        var isJiHuo = table_isExsit(jihuoList, xianlvId);
        if (isJiHuo == false) {
            //激活
            var jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid;
            var jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum;
            var jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem);
            if (jiHuoHad >= jiHuoCost) {
                return true;
            }
            return false;
        }
        //升星
        var starItem = GameConfig.FunUpStarConfig["XianLv"][xianlvId].itemid;
        var starHad = ItemSystem.getInstance().getItemCount(starItem);
        var starCost = GameConfig.FunLevelNumConfig["XianLv"][start].num;
        if (starHad >= starCost) {
            return true;
        }
        return false;
    };
    GuideFuncSystem.prototype.checkHeroTitle = function (title) {
        var itemId = title.itemid;
        var itemnum = title.itemnum;
        var had = ItemSystem.getInstance().getItemCount(itemId);
        return had >= itemnum;
    };
    //充值活动可领奖
    GuideFuncSystem.prototype.checkPayActivityPrize = function () {
        var prizeState = {};
        var allList = ActivitySystem.getInstance().getAllRechergeActivity();
        for (var _ in allList) {
            var index = allList[_];
            if (ActivitySystem.getInstance().isPayActivityIndex(index)) {
                var info = ActivitySystem.getInstance().getOperateActivityInfo(index);
                var plrinfo = ActivitySystem.getInstance().getOperatePlayerInfo(index);
                if (info) {
                    if (index == PayActivityIndex.CREATE_ROLE_SEVEN_DAY ||
                        index == PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE ||
                        index == PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE ||
                        index == PayActivityIndex.ACCUM_PAY_PRIZE ||
                        index == PayActivityIndex.ACCUM_CONSUME_PRIZE ||
                        index == PayActivityIndex.DAY_ACCUM_PAY_PRIZE ||
                        index == PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE) {
                        var list = info.prizeList;
                        for (var k = 0; k < list.length; k++) {
                            var v = list[k];
                            var reachvalue = 0; //0是没有达到 1是达到了没有领取 2是领取了//
                            if (plrinfo != null) {
                                reachvalue = plrinfo.reachlist[k] || 0;
                            }
                            if (reachvalue == 1) {
                                prizeState[index] = true;
                                break;
                            }
                        }
                    }
                    else if (index == PayActivityIndex.SINGLE_PAY_PRIZE ||
                        index == PayActivityIndex.SINGLE_CONSUME_PRIZE) {
                        var list = info.prizeList;
                        for (var k = 0; k < list.length; k++) {
                            var v = list[k];
                            var getTimes = 0; //单笔奖励次数
                            if (plrinfo) {
                                getTimes = plrinfo.reachlist[k] || 0;
                            }
                            if (getTimes > 0) {
                                prizeState[index] = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return prizeState;
    };
    GuideFuncSystem.prototype.checkCommonFunc = function (func, param, args) {
        var curInfo = null;
        if (args) {
            curInfo = args.curInfo;
        }
        var exceptInfo = null;
        if ((param.except == "current") && curInfo) {
            exceptInfo = curInfo;
        }
        if (exceptInfo != curInfo && curInfo) {
            return func.call(this, curInfo, param, true); //传入true，是正在选中的
        }
        // let heroInfo = GetHeroPropertyInfo()
        // if (exceptInfo != heroInfo && func.call(this, heroInfo, param)) {
        // 	return true
        // }
        if (param.type == "pet") {
            var petInfoList = PetSystem.getInstance().getPetInfoList();
            for (var id in petInfoList) {
                var petInfo = petInfoList[id];
                if (exceptInfo != petInfo && func.call(this, petInfo, param)) {
                    return true;
                }
            }
        }
        else if (param.type == "xianlv") {
            var xianlvInfoList = XianLvSystem.getInstance().getJiHuoList();
            for (var i in xianlvInfoList) {
                var xianlvInfo = xianlvInfoList[i];
                if (exceptInfo != xianlvInfo && func.call(this, xianlvInfo, param)) {
                    return true;
                }
            }
        }
        return false;
    };
    GuideFuncSystem.prototype.checkFunc = function (config, args) {
        //if(! GuideSystem.getInstance().isFinishGuide()  ){
        //	return false
        //}
        if (this.manualCloseResultMap[config.id]) {
            return false;
        }
        var checkEvent = config.checkEvent;
        var checkParam = config.checkParam;
        if (GuideFuncSpace.guideFuncCheckHandler[checkEvent]) {
            if (checkParam.check) {
                var _a = CheckMainFrameFunction(checkParam.check), check = _a[0], _ = _a[1];
                if (check == false) {
                    return false;
                }
            }
            if (checkParam.checkCamp) {
                var check = CampaignSystem.getInstance().isCampaignPass(checkParam.checkCamp);
                if (check == false) {
                    return false;
                }
            }
            if (checkParam.checkLevel) {
                var heroLevel = GetHeroProperty("level") || 0;
                if (heroLevel < checkParam.checkLevel)
                    return false;
            }
            return GuideFuncSpace.guideFuncCheckHandler[checkEvent].call(this, checkParam, args);
        }
        else {
            TLog.Debug("the check handler is null!		%s", checkEvent);
            TLog.Throw();
        }
    };
    GuideFuncSystem.prototype.recycleFuncHandler = function (config) {
        var checkEvent = config.checkEvent;
        var checkParam = config.checkParam;
        if (GuideFuncSpace.recycleFuncHandler[checkEvent]) {
            if (checkParam.check) {
                var _a = CheckMainFrameFunction(checkParam.check), check = _a[0], _ = _a[1];
                if (check == false) {
                    return;
                }
            }
            return GuideFuncSpace.recycleFuncHandler[checkEvent].call(this, config, checkParam);
        }
    };
    ////////////////////////////////////////////////////////////////////-回收、作引导记录//////////////////////////////////////-
    //简易性突发提示（服务器即时通知）
    GuideFuncSystem.prototype.onRecvServerNotice = function (notice) {
        for (var _ in notice) {
            var v = notice[_];
            if (!table_isExsit(this.simpleServerNotice, v)) {
                table_insert(this.simpleServerNotice, v);
            }
        }
    };
    GuideFuncSystem.prototype.getServerNotice = function () {
        return this.simpleServerNotice || [];
    };
    //////////////////////////////////////////////////////////////////
    //控制流畅，登录后依次申请相关的数据
    GuideFuncSystem.prototype.onCheckActivity = function (applyGuideCheckMessage) {
        function applyBossActivity() {
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.MaterialBoss);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.DragonBoss);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.SmallThunderTemple);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.HeavenTrial);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.PersonBoss);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WorldPlayerBoss);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon);
            RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.FactionMonster);
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyBossActivity);
    };
    GuideFuncSystem.prototype.onEnterGameCheck = function (args) {
        if (this.timerList["apply"]) {
            KillTimer(this.timerList["apply"]);
            delete this.timerList["apply"];
        }
        if (IsInGlobalActvity() != null) {
            return;
        }
        var applyGuideCheckMessage = [];
        this.onCheckActivity(applyGuideCheckMessage);
        //月卡信息
        function applyPayPrizeInfo9() {
            RpcProxy.call("C2G_MonthCardInfo");
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo9);
        //周卡信息
        function applyPayPrizeInfo10() {
            RpcProxy.call("C2G_WeekCardInfo");
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo10);
        //每日首充
        function applyPayPrizeInfo11() {
            RpcProxy.call("C2G_SendOperateAndPlayerData", PayActivityIndex.DAY_ACCUM_PAY_PRIZE);
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo11);
        //日常三百
        function applyPayPrizeInfo12() {
            RpcProxy.call("C2G_MEIRISANBAI_MonsterNum");
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo12);
        //日常历练
        function applyPayPrizeInfo13() {
            RpcProxy.call("C2G_XiyouLilian_Info");
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo13);
        //护送
        function applyPayPrizeInfo14() {
            RpcProxy.call("C2G_EnterEscortActivity");
        }
        JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo14);
        //充值活动（活动信息-个人活动信息）
        //累计冲值
        // function applyPayPrizeInfo1() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.ACCUM_PAY_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo1)
        // //累计消费
        // function applyPayPrizeInfo2() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.ACCUM_CONSUME_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo2)
        // //单日累计冲值
        // function applyPayPrizeInfo3() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.DAY_ACCUM_PAY_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo3)
        // //单日累计消费
        // function applyPayPrizeInfo4() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo4)
        // //单笔冲值
        // function applyPayPrizeInfo5() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.SINGLE_PAY_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo5)
        // //单笔消费
        // function applyPayPrizeInfo6() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.SINGLE_CONSUME_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo6)
        // //限时每日冲值
        // function applyPayPrizeInfo7() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo7)
        // //限时每日消费
        // function applyPayPrizeInfo8() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo8)
        // //创角七日每天冲值
        // function applyPayPrizeInfo9() {
        // 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
        // 	message.index = PayActivityIndex.CREATE_ROLE_SEVEN_DAY
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo9)
        // //竞技场首通
        // function applyChampoinAward() {
        // 	let message = GetMessage(opCodes.C2G_EXCITE_DATA)
        // 	message.exciteType = "singlejjc"
        // 	SendGameMessage(message)
        // 	message = GetMessage(opCodes.C2G_EXCITE_DATA)
        // 	message.exciteType = "serverjjc"
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyChampoinAward)
        // //地宫首通
        // function applySkyTowerAward() {
        // 	let message = GetMessage(opCodes.C2G_EXCITE_DATA)
        // 	message.exciteType = "servertower"
        // 	SendGameMessage(message)
        // 	message = GetMessage(opCodes.C2G_EXCITE_DATA)
        // 	message.exciteType = "singletower"
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applySkyTowerAward)
        // //航海占领
        // function applyNavOccupy() {
        // 	let activity = GetActivity(ActivityDefine.Relic)
        // 	activity.sendMsgGetMyRelicList()
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applyNavOccupy)
        // //商城特惠礼包
        // function applShopItem() {
        // 	let message = GetMessage(opCodes.C2G_ITEM_SELL_LIST)
        // 	message.seller = Message_C2G_ITEM_SELL_LIST.NPC_TYPE
        // 	message.entryId = ShopScoreType.CHAOZHI
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, applShopItem)
        // //七夕活动
        // function valentineItem() {
        // 	let message = GetMessage(opCodes.C2G_FESTIVAL_SINGLEDAY_INFO)
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, valentineItem)
        // function zhigouRecord() {
        // 	let message = GetMessage(opCodes.C2G_ROLE_RECHARGE_BUY_PET)
        // 	SendGameMessage(message)
        // }
        // JsUtil.arrayInstert(applyGuideCheckMessage, zhigouRecord)
        var count = applyGuideCheckMessage.length;
        var i = 0;
        function tick(delay) {
            var func = applyGuideCheckMessage[i];
            if (!func) {
                if (this.timerList["apply"]) {
                    KillTimer(this.timerList["apply"]);
                    delete this.timerList["apply"];
                }
            }
            else {
                func.call(this);
                i = i + 1;
            }
        }
        this.timerList["apply"] = SetTimer(tick, this, 0.5 * 1000, false);
        // this.resetReadState(GuideFuncSpace.GuideFuncReadTypeDefine.SHOP_SELL)
        // this.resetReadState(GuideFuncSpace.GuideFuncReadTypeDefine.ACTIVATE_GIFT)
    };
    //////通用//////////////////////////////////////////////////////////////
    GuideFuncSystem.prototype.checkOneFunEquip = function (funType, pos) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
        if (!funInfo) {
            return false;
        }
        var funStage = funInfo.stage || 1;
        var subType = FunSystem.getInstance().getFunSubTypeWithPos(funType, pos);
        //可穿戴装备列表
        var equipList = ItemSystem.getInstance().getFunEquipListWithStage(subType, funStage);
        //已穿戴装备
        var wearEquip = FunSystem.getInstance().getWearEquipWithPos(funType, pos);
        var wearForce = 0;
        if (wearEquip && wearEquip.entry) {
            wearForce = GetForceMath(GetFunEquipProperty(wearEquip.entry, wearEquip.quality, wearEquip.add_num));
        }
        var canwear = false;
        for (var i in equipList) {
            var equip = equipList[i];
            var equipForce = GetForceMath(GetFunEquipProperty(equip.entryId, equip.getProperty("quality"), equip.getProperty("add_num")));
            if (wearForce < equipForce) {
                canwear = true;
                break;
            }
        }
        return canwear;
    };
    GuideFuncSystem.prototype.checkOneFunSkill = function (funType, pos) {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
        if (!funInfo) {
            return false;
        }
        var skillInfo = FunSystem.getInstance().getFunSkillConfigWithPos(funType, pos + 1);
        var skillList = funInfo.skilllevellist;
        var skillLevel = skillList[pos] || 0;
        if (skillLevel == 0) {
            return false;
        }
        else {
            var materialId = skillInfo.itemid;
            var info = FunSystem.getInstance().getFunSkillMaterialWithLv(funType, skillLevel);
            var needCount = info.num;
            var ownCount = ItemSystem.getInstance().getItemCount(materialId) || 0;
            if (ownCount >= needCount) {
                return true;
            }
        }
        return false;
    };
    GuideFuncSystem.prototype.checkFunUpgrade = function (funType) {
        if (!funType) {
            return false;
        }
        var funInfo = FunSystem.getInstance().getFunInfoWithType(funType);
        if (!funInfo) {
            return false;
        }
        var material = FunSystem.getInstance().getFunUpgradeMaterial(funType, funInfo.stage);
        var ownNum = ItemSystem.getInstance().getItemCount(material.itemId);
        var needNum = material.itemNum;
        var needMoney = material.money;
        var ownMoney = GetHeroMoney(material.moneyUnit);
        if (ownNum >= needNum && ownMoney >= needMoney) {
            return true;
        }
        return false;
    };
    ////////宠物////////////////////////////////////////////////////////////////////
    GuideFuncSystem.prototype.checkPetUpgrade = function (petId) {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(petId);
        if (!petNetInfo) {
            return false;
        }
        var material = FunSystem.getInstance().getFunUpgradeMaterial(cellOptionsIndex.Pet, petNetInfo.stage);
        var ownCount = ItemSystem.getInstance().getItemCount(material.itemId);
        var needCount = material.itemNum;
        var ownFunds = GetHeroProperty("funds");
        var needFunds = material.money;
        return ownCount >= needCount && ownFunds >= needFunds;
    };
    GuideFuncSystem.prototype.checkPetEmbattle = function (petId) {
    };
    GuideFuncSystem.prototype.checkPetNaturl = function (petId) {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(petId);
        var petNetInfo = PetSystem.getInstance().getPetInfo(petId);
        if (!petNetInfo) {
            return false;
        }
        var combatPos = petNetInfo.combatpos || opPetCombatPos.Rest;
        //0代表没有出战，1代表出战 2代表备战1 3代表备战2
        var posList = PetSystem.getInstance().getEmbattlePosList();
        if (size_t(posList) < 3 && combatPos == opPetCombatPos.Rest) {
            return true;
        }
        else {
            return false;
        }
    };
    GuideFuncSystem.prototype.checkPetUpgradeWnd = function (petId) {
        var check = false;
        var checkFuncs = [this.checkPetUpgrade, this.checkPetNaturl];
        for (var i in checkFuncs) {
            var func = checkFuncs[i];
            if (func.call(this, petId)) {
                return true;
            }
        }
        return check;
    };
    GuideFuncSystem.prototype.checkPetSkillWnd = function (petId) {
        return false;
    };
    //帮会妖怪
    GuideFuncSystem.prototype.checkFactionMonster = function () {
        var info = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactionMonster);
        if (!info) {
            return false;
        }
        var hpPercent = info.hpPercent || 0;
        var isLinQu = info.prize || 0;
        var clubInfo = ClubSystem.getInstance().getCurClubInfo() || {};
        var clubLv = clubInfo.level || 1;
        //时间段
        var timeConfig = GameConfig.FactionMonsterConfig[clubLv].activeTime;
        var timeSlot1 = timeConfig[0];
        var timeSlot2 = timeConfig[1];
        var serverTime = GetServerTime();
        var timeStart1 = GetTodayTime(serverTime, timeSlot1[0], timeSlot1[1]);
        var timeEnd1 = GetTodayTime(serverTime, timeSlot1[2], timeSlot1[3]);
        var timeStart2 = GetTodayTime(serverTime, timeSlot1[0], timeSlot1[1]);
        var timeEnd2 = GetTodayTime(serverTime, timeSlot1[2], timeSlot1[3]);
        if (serverTime >= timeStart1 && serverTime <= timeEnd1) {
            if (hpPercent == 0 && isLinQu > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (serverTime >= timeStart2 && serverTime <= timeEnd2) {
            if (hpPercent == 0 && isLinQu > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    //护送
    GuideFuncSystem.prototype.checkHuSong = function () {
        var act = GetActivity(ActivityDefine.HuSong);
        var info = act.getActInfo();
        if (!info) {
            return false;
        }
        var hadHusong = info.husongTwice || 0;
        var hadLanjie = info.lanjieTwice || 0;
        if (hadHusong > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //属性丹
    GuideFuncSystem.prototype.checkPropertyDan = function (funType) {
        var drugConfig = GameConfig.FunAbilityDrugConfig[cellOptionsName[funType - 1]];
        if (!drugConfig) {
            return false;
        }
        var danId = drugConfig["itemid"];
        var itemCount = ItemSystem.getInstance().getItemCount(danId);
        return itemCount > 0;
    };
    return GuideFuncSystem;
}(BaseSystem));
__reflect(GuideFuncSystem.prototype, "GuideFuncSystem");
//# sourceMappingURL=GuideFuncSystem.js.map