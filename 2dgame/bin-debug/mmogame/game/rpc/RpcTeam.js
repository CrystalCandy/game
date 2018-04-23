// TypeScript file
var RpcLogic;
(function (RpcLogic) {
    // export function CHeroLevelUp(){
    // }
    // export function G2C_EquipRefine(name:string, id:number){
    //     TLog.Debug("===========CEquipRefine", name, id)
    // }
    //队伍信息更新
    function G2C_UpdateTeamInfo(teamInfo) {
        TLog.Debug("===========G2C_UpdateTeamInfo");
        var list = teamInfo.members || [];
        teamInfo.members = {};
        for (var i = 0; i < list.length; i++) {
            var v = list[i];
            teamInfo.members[v.plrId] = v;
        }
        teamInfo.count = list.length;
        TeamSystem.getInstance().setTeamInfo(teamInfo);
    }
    RpcLogic.G2C_UpdateTeamInfo = G2C_UpdateTeamInfo;
    function G2C_LeaveTeam(plrId) {
        TLog.Debug("===========G2C_LeaveTeam");
        if (plrId == GetHeroProperty("id")) {
            TeamSystem.getInstance().leaveTeam();
        }
        else {
            TeamSystem.getInstance().removeMember(plrId);
        }
    }
    RpcLogic.G2C_LeaveTeam = G2C_LeaveTeam;
    function G2C_Disband(roleinfolist) {
        TLog.Debug("===========G2C_Disband");
        TeamSystem.getInstance().emptyTeamInfo();
    }
    RpcLogic.G2C_Disband = G2C_Disband;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcTeam.js.map