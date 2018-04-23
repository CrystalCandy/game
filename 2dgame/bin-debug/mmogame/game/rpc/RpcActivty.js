// TypeScript file
var RpcLogic;
(function (RpcLogic) {
    // export function G2C_SweepBossActivity(activityIndex, npcIndex, commonPrize) {
    //     let activity = GetActivity(ActivityDefine.Boss)
    //     activity.updateMessageHandler()
    // }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //后台活动管理
    //后台活动开放列表
    function G2C_SendOpenActivityList(activtList) {
        ActivitySystem.getInstance().setOperateActivityOpenList(activtList);
        FireEvent(EventDefine.PAY_ACTIVITY_LIST, null); //NetMessageEvent.newObj(message.list))	
    }
    RpcLogic.G2C_SendOpenActivityList = G2C_SendOpenActivityList;
    //活动信息
    function G2C_SendOperateData(index, activityData) {
        ActivitySystem.getInstance().setOperateActivityInfo(index, activityData);
        FireEvent(EventDefine.PAY_ACTIVITY_INFO, null); //NetMessageEvent.newObj(message.info))
    }
    RpcLogic.G2C_SendOperateData = G2C_SendOperateData;
    //活动相关玩家信息
    function G2C_SendOperatePlayerData(index, plrData) {
        ActivitySystem.getInstance().setOperatePlayerInfo(index, plrData);
        FireEvent(EventDefine.PAY_ACTIVITY_INFO, null); //NetMessageEvent.newObj(message.info))
    }
    RpcLogic.G2C_SendOperatePlayerData = G2C_SendOperatePlayerData;
    function G2C_SendOperateAndPlayerData(index, activityData, plrData) {
        ActivitySystem.getInstance().setOperateActivityInfo(index, activityData);
        ActivitySystem.getInstance().setOperatePlayerInfo(index, plrData);
        FireEvent(EventDefine.PAY_ACTIVITY_INFO, null); //NetMessageEvent.newObj(message.info))
    }
    RpcLogic.G2C_SendOperateAndPlayerData = G2C_SendOperateAndPlayerData;
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Boss
    function G2C_GetBossActivityInfo(activityIndex, activityData) {
        var activity = GetActivity(ActivityDefine.Boss);
        activity.updateMessageHandler({ index: activityIndex, data: activityData }, "G2C_GetBossActivityInfo");
    }
    RpcLogic.G2C_GetBossActivityInfo = G2C_GetBossActivityInfo;
    function G2C_GetBossIndexData(activityIndex, npcIndex, bossData) {
        var activity = GetActivity(ActivityDefine.Boss);
        activity.updateMessageHandler({ index: activityIndex, bossIndex: npcIndex, data: bossData }, "G2C_GetBossIndexData");
    }
    RpcLogic.G2C_GetBossIndexData = G2C_GetBossIndexData;
    //护送
    function G2C_EscortList(message) {
        TLog.Debug("===========G2C_EscortList");
        var activity = GetActivity(ActivityDefine.HuSong);
        activity.updateMessageHandler(message, "G2C_EscortList");
    }
    RpcLogic.G2C_EscortList = G2C_EscortList;
    function G2C_EnterEscortActivity(macheIndex, time, chengTwice, curPrize, robberRecord, husongTwice, lanjieTwice) {
        TLog.Debug("===========G2C_EnterEscortActivity");
        var activity = GetActivity(ActivityDefine.HuSong);
        activity.updateMessageHandler({ index: macheIndex, time: time, chengTwice: chengTwice,
            curPrize: curPrize, robberRecord: robberRecord, husongTwice: husongTwice, lanjieTwice: lanjieTwice }, "G2C_EnterEscortActivity");
    }
    RpcLogic.G2C_EnterEscortActivity = G2C_EnterEscortActivity;
    function G2C_RandEscortIndex(index) {
        TLog.Debug("===========G2C_RandEscortIndex");
        var activity = GetActivity(ActivityDefine.HuSong);
        activity.updateMessageHandler(index, "G2C_RandEscortIndex");
    }
    RpcLogic.G2C_RandEscortIndex = G2C_RandEscortIndex;
    function G2C_RobberEscortRecordList(list) {
        TLog.Debug("===========G2C_RobberEscortRecordList");
        var activity = GetActivity(ActivityDefine.HuSong);
        activity.updateMessageHandler(list, "G2C_RobberEscortRecordList");
    }
    RpcLogic.G2C_RobberEscortRecordList = G2C_RobberEscortRecordList;
    function G2C_PutEscortPrizeInfo(list) {
        TLog.Debug("===========G2C_PutEscortPrizeInfo");
        var activity = GetActivity(ActivityDefine.HuSong);
        activity.updateMessageHandler(list, "G2C_PutEscortPrizeInfo");
    }
    RpcLogic.G2C_PutEscortPrizeInfo = G2C_PutEscortPrizeInfo;
    //-------日常
    function G2C_MEIRISANBAI_MonsterNum(huan, state, isVip) {
        TLog.Debug("===========G2C_MEIRISANBAI_MonsterNum");
        var activity = GetActivity(ActivityDefine.Boss);
        activity.updateMessageHandler({ curhuan: huan, state: state, isVip: isVip }, "G2C_MEIRISANBAI_MonsterNum");
    }
    RpcLogic.G2C_MEIRISANBAI_MonsterNum = G2C_MEIRISANBAI_MonsterNum;
    function G2C_XiyouLilian_Info(level, curexp, force, taskData) {
        TLog.Debug("===========G2C_XiyouLilian_Info");
        var activity = GetActivity(ActivityDefine.Boss);
        activity.updateMessageHandler({ level: level, curexp: curexp, force: force, taskList: taskData }, "G2C_XiyouLilian_Info");
    }
    RpcLogic.G2C_XiyouLilian_Info = G2C_XiyouLilian_Info;
    function G2C_XiyouLilian_RecordInfo(taskData) {
        TLog.Debug("===========G2C_XiyouLilian_RecordInfo");
        var activity = GetActivity(ActivityDefine.Boss);
        activity.updateMessageHandler(taskData, "G2C_XiyouLilian_RecordInfo");
    }
    RpcLogic.G2C_XiyouLilian_RecordInfo = G2C_XiyouLilian_RecordInfo;
    //-------月卡信息
    function G2C_MonthCardInfo(overTime, isGet) {
        PaySystem.getInstance().setMonthCardInfo(overTime, isGet);
        FireEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, null);
    }
    RpcLogic.G2C_MonthCardInfo = G2C_MonthCardInfo;
    //-------周卡信息
    function G2C_WeekCardInfo(overTime, isGet) {
        PaySystem.getInstance().setWeekCardInfo(overTime, isGet);
        FireEvent(EventDefine.PAY_ACTIVITY_WEEK_CARD, null);
    }
    RpcLogic.G2C_WeekCardInfo = G2C_WeekCardInfo;
    //-------抽奖信息
    function G2C_OperateLotteryResult(index, info) {
        ActivitySystem.getInstance().setOperateLotteryResultInfo(index, info);
        // let info = {"num" : n, "itemList": t}//月卡
        FireEvent(EventDefine.XUNBAO_UPDATE, null);
    }
    RpcLogic.G2C_OperateLotteryResult = G2C_OperateLotteryResult;
    //西游福利
    function G2C_XiyouWelfareInfo(level, playerInfo) {
        ActivitySystem.getInstance().setXiyouWelfareInfo(level, playerInfo);
        FireEvent(EventDefine.XIYOU_WELFARE, null);
    }
    RpcLogic.G2C_XiyouWelfareInfo = G2C_XiyouWelfareInfo;
    //结婚    //53 = J9   
    function G2C_Proposal(id, name, type) {
        var typeText = "#lime(jianpuqiuhun)#rf";
        var msg = String.format(Localize_cns("SANSHENG_TXT3"), name, typeText);
        var qiuhunId = id;
        var _type = type;
        var callback = {
            onDialogCallback: function (result, userData) {
                if (result) {
                    RpcProxy.call("C2G_PromiseMarry", qiuhunId, _type, 1);
                }
                else {
                    RpcProxy.call("C2G_PromiseMarry", qiuhunId, _type, 0);
                }
            }
        };
        MsgSystem.confirmDialog(msg, callback, null);
    }
    RpcLogic.G2C_Proposal = G2C_Proposal;
    //结婚响应
    function G2C_PromiseMarry(name1, name2) {
        //判断两个界面是否存在 存在关闭 SanShengSanShiFrame ProposeFrame
        var wnd = WngMrg.getInstance().getWindow("ProposeFrame");
        if (wnd.isVisible()) {
            wnd.hideWnd();
        }
        var wnd1 = WngMrg.getInstance().getWindow("SanShengSanShiFrame");
        if (wnd1.isVisible()) {
            wnd1.hideWnd();
        }
        //打开 结婚成功界面
        //FireEvent(EventDefine.MARRY_UPDATE, null);
    }
    RpcLogic.G2C_PromiseMarry = G2C_PromiseMarry;
    //送礼
    function G2C_MarryGift(id1, id2, name1, name2) {
        //打开 结婚成功界面
        var wnd = WngMrg.getInstance().getWindow("MarryInformFrame");
        wnd.showAndSetData(id1, id2, name1, name2);
    }
    RpcLogic.G2C_MarryGift = G2C_MarryGift;
    //房子属性更新--房子属性更新, 房子数据，双方外观，房子加成战力
    function G2C_HourseUpdate(houseData, playerInfo, power) {
        //打开 结婚成功界面
        ActivitySystem.getInstance().setHouseInfo(houseData, playerInfo, power);
        FireEvent(EventDefine.HOUSE_UPDATE, null);
    }
    RpcLogic.G2C_HourseUpdate = G2C_HourseUpdate;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcActivty.js.map