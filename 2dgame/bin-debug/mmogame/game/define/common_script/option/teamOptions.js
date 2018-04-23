////////////////////////////////////////////////////////////////////////////////
//队伍配置
////////////////////////////////////////////////////////////////////////////////
//队伍玩家状态
var ConfigTeamMemberStatus = {
    ONLINE: 0,
    OFFLINE: 1,
    LEAVE: 2,
    FOLLWER: 3,
};
//队伍配置
var ConfigTeam = {
    MAX_COUNT: 3,
    MIN_LEVEL: 10,
};
//队伍状态
var ConfigTeamStatus = {};
//队伍阵型操作
var ConfigTeamQueue = {
    READY: 1,
    UNREADY: 2,
    MOVE: 3,
    SET: 4,
};
var teamAccept = {
    REJECT: 0,
    OK: 1,
};
//////////////////////////////////////-
//战队配置
//////////////////////////////////////-
var ConfigCombatTeam = {
    MAX_MEMBER_COUNT: 3,
    APPLY_MAX_COUNT: 20,
    JOIN_LIMIT: 10,
    LEVEL_LIMIT: 10,
    MAX_COUNT: 1000,
    MIN_LEVLE: 10,
};
//战队字节限制
var ConfigCombatCharMax = {
    MAX_NAME: 18,
    MIN_NAME: 1,
};
var opCombatTeamPost = {
    LEADER: 1,
    MEMBER: 2,
};
//# sourceMappingURL=teamOptions.js.map