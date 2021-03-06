/*
作者:
    yangguiming
    
创建时间：
    2014.06.10(星期二)

意图：
  组队系统

公共接口：
    
*/
//判断自己是否在队伍里
function HeroIsInTeam() {
    return TeamSystem.getInstance().isHaveTeam();
}
//判断自己是否在队伍里且是否是队长
function HeroIsCaptain() {
    return TeamSystem.getInstance().isCaptain();
}
//判断自己是否队员，且不为暂离
//function HeroIsTeamMemNotAway(){
//	return TeamSystem.getInstance().isTeamMemberNotAway()
//}
//通过附近队伍信息获取队长信息
function GetCaptianInformNearTeam(nearTeam) {
    for (var i in nearTeam.membersList) {
        var v = nearTeam.membersList[i];
        if (v.id == nearTeam.captain) {
            return v;
        }
    }
}
function GetInTeamMember() {
    var t = [];
    var team = TeamSystem.getInstance().getTeamInfo();
    if (team == null) {
        return t;
    }
    for (var i in team.membersList) {
        var v = team.membersList[i];
        if (v.status != ConfigTeamMemberStatus.OFFLINE) {
            JsUtil.arrayInstert(t, v);
        }
    }
    return t;
}
function PlayerIsInTeam(id) {
    return TeamSystem.getInstance().isInTeam(id);
}
//组队所有队员禁止
function TeamBaned(txt) {
    if (HeroIsInTeam() == true) {
        MsgSystem.addTagTips(txt || Localize_cns("TEAM_TXT51"));
        return true;
    }
    return false;
}
//组队的成员禁止
function TeamMemberBaned(txt) {
    if (HeroIsInTeam() == true) {
        if (HeroIsCaptain() == false) {
            txt = txt || Localize_cns("TEAM_TXT34");
            MsgSystem.addTagTips(txt);
            return true;
        }
    }
    return false;
}
function TeamIsState(state) {
    var actInfo = TeamSystem.getInstance().getTeamActData();
    if (!actInfo) {
        return false;
    }
    return actInfo[0] == state;
}
////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=Interface_Team.js.map