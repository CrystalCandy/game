// TypeScript file
var RpcLogic;
(function (RpcLogic) {
    //个人帮派信息 facId, facName,facPost
    function G2C_FactionSelfUpdate(facId, facName, facPost) {
        ClubSystem.getInstance().setRoleClubInfo(facId, facName, facPost);
        FireEvent(EventDefine.UPDATE_CLUB_MEINFO, null);
    }
    RpcLogic.G2C_FactionSelfUpdate = G2C_FactionSelfUpdate;
    //帮派信息
    function G2C_FactionInfoRefresh(factionInfo) {
        ClubSystem.getInstance().setCurClubInfo(factionInfo);
        FireEvent(EventDefine.GET_CLUB_INFO, null);
    }
    RpcLogic.G2C_FactionInfoRefresh = G2C_FactionInfoRefresh;
    //所有帮派信息
    function G2C_FactionInfoList(FactionInfo) {
        var list = [];
        for (var k = 0; k < FactionInfo.length; k++) {
            var v = FactionInfo[k];
            list.push(v);
        }
        ClubSystem.getInstance().setClubInfoList(list);
        FireEvent(EventDefine.ALL_CLUB_LIST, null);
    }
    RpcLogic.G2C_FactionInfoList = G2C_FactionInfoList;
    //取消申请(不知道为什么要返回一个uint32)
    function G2C_FactionCancelApply(clubId) {
        // ClubSystem.getInstance().updateApplyList(clubId)
        //FireEvent(EventDefine.UPDATE_APPLY_INFO,null)
    }
    RpcLogic.G2C_FactionCancelApply = G2C_FactionCancelApply;
    //刷新帮派申请列表
    function G2C_FactionApplyRefresh(FactionApplyInfo) {
        var list = [];
        for (var k = 0; k < FactionApplyInfo.length; k++) {
            var v = FactionApplyInfo[k];
            list.push(v);
        }
        console.log("list??????????");
        table_print(list);
        ClubSystem.getInstance().setApplyList(list);
        FireEvent(EventDefine.GET_CLUB_APPLY_LIST, null);
    }
    RpcLogic.G2C_FactionApplyRefresh = G2C_FactionApplyRefresh;
    //帮派公告设置（对内）
    function G2C_FactionNotice(notice) {
        ClubSystem.getInstance().setNotice(notice);
        FireEvent(EventDefine.UPDATE_CLUB_NOTICE, null);
    }
    RpcLogic.G2C_FactionNotice = G2C_FactionNotice;
    //邀请进入帮派，name玩家名(旧的没用到)
    function G2C_FactionInvite(string1, uint32, string2) {
        //ClubSystem.getInstance().xx()	
        //FireEvent(EventDefine.UPDATE_CLUB_NOTICE, null)
    }
    RpcLogic.G2C_FactionInvite = G2C_FactionInvite;
    // //玩家自己的申请信息
    // export function C2G_FactionClearApply(apply_list){
    //     ClubSystem.getInstance().setLegionApplyList(apply_list)
    //     //FireEvent(EventDefine.UPDATE_CLUB_NOTICE, null)
    // }
    //帮派成员信息
    function G2C_FactionMemberRefresh(FactionMemberInfo) {
        var list = [];
        for (var k = 0; k < FactionMemberInfo.length; k++) {
            var v = FactionMemberInfo[k];
            list.push(v);
        }
        ClubSystem.getInstance().setClubMemberList(list);
        FireEvent(EventDefine.GET_CLUB_MENBER_LIST, null);
    }
    RpcLogic.G2C_FactionMemberRefresh = G2C_FactionMemberRefresh;
    //帮派单个成员信息
    function G2C_FactionSingleMemberRefresh(factionMemberInfo) {
        ClubSystem.getInstance().updateClubMenberList(factionMemberInfo);
        FireEvent(EventDefine.GET_CLUB_MENBER_LIST, null);
    }
    RpcLogic.G2C_FactionSingleMemberRefresh = G2C_FactionSingleMemberRefresh;
    //更新帮派介绍(里面被我注释了 到时候用到要跟进去)
    function G2C_FactionIntroduction(strTarget, legionID) {
        ClubSystem.getInstance().onUpdateClubInfo(strTarget, legionID);
        FireEvent(EventDefine.UPDATE_CLUB_INTRO, null);
    }
    RpcLogic.G2C_FactionIntroduction = G2C_FactionIntroduction;
    //我的申请
    function G2C_FactionMyApplyList(apply_list) {
        ClubSystem.getInstance().setLegionApplyList(apply_list);
        FireEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, null);
    }
    RpcLogic.G2C_FactionMyApplyList = G2C_FactionMyApplyList;
    //刷新上香信息
    function G2C_FactionRenqiInfo(renqiExp, renqiCount, renqiRecord) {
        ClubSystem.getInstance().setClubRenqiInfo(renqiExp, renqiCount, renqiRecord);
        FireEvent(EventDefine.CLUB_RENQI_INFO, null);
    }
    RpcLogic.G2C_FactionRenqiInfo = G2C_FactionRenqiInfo;
    //刷新活跃信息
    function G2C_FactionPlayerActiveInfo(activeLevel, activeExp, taskData) {
        ClubSystem.getInstance().setClubActiveInfo(activeLevel, activeExp, taskData);
        FireEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, null);
    }
    RpcLogic.G2C_FactionPlayerActiveInfo = G2C_FactionPlayerActiveInfo;
    //帮派技能信息
    function G2C_FactionSkillInfo(level, index, force, list) {
        ClubSystem.getInstance().setClubSkillInfo(level, index, force, list);
        FireEvent(EventDefine.CLUB_SKILL_INFO, null);
    }
    RpcLogic.G2C_FactionSkillInfo = G2C_FactionSkillInfo;
    //自动加入战力
    function G2C_FactionEnterForce(force) {
        ClubSystem.getInstance().setClubEnterForce(force);
        FireEvent(EventDefine.GET_CLUB_APPLY_LIST, null);
    }
    RpcLogic.G2C_FactionEnterForce = G2C_FactionEnterForce;
    //进入帮会地图
    function G2C_FactionMapEnter() {
        GetActivity(ActivityDefine.ClubMap).start();
    }
    RpcLogic.G2C_FactionMapEnter = G2C_FactionMapEnter;
    //离开帮会地图
    function G2C_FactionMapLeave() {
        GetActivity(ActivityDefine.ClubMap).stop();
    }
    RpcLogic.G2C_FactionMapLeave = G2C_FactionMapLeave;
    //帮会任务完成次数刷新
    function G2C_FactionMapTaskFinishOnce() {
        FireEvent(EventDefine.CLUB_TASK_COMP_REFRESH, null);
    }
    RpcLogic.G2C_FactionMapTaskFinishOnce = G2C_FactionMapTaskFinishOnce;
    //帮会任务领奖返回
    function G2C_FactionMapTaskPrize() {
        FireEvent(EventDefine.CLUB_TASK_COMP_REFRESH, null);
    }
    RpcLogic.G2C_FactionMapTaskPrize = G2C_FactionMapTaskPrize;
    //帮会兑换返回
    function G2C_FactionExchangeItem(array, count, time) {
        GetActivity(ActivityDefine.ClubMap).setExchangeData(array, count, time);
        FireEvent(EventDefine.CLUB_EXCHANGE, null);
    }
    RpcLogic.G2C_FactionExchangeItem = G2C_FactionExchangeItem;
    //帮会记录
    function G2C_FactionRecord(record) {
        ClubSystem.getInstance().setClubEventInfo(record);
        FireEvent(EventDefine.CLUB_EVENT_RECORD, null);
    }
    RpcLogic.G2C_FactionRecord = G2C_FactionRecord;
    //竞技场
    function G2C_SendChampionData(rank, list, count, time) {
        var activity = GetActivity(ActivityDefine.Champion);
        var t = {};
        t.rank = rank;
        t.list = list;
        t.count = count;
        t.time = time;
        activity.setChampionInfo(t);
        FireEvent(EventDefine.CHAMPION_REFRESH, null);
    }
    RpcLogic.G2C_SendChampionData = G2C_SendChampionData;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcFaction.js.map