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
var TeamMember = (function (_super) {
    __extends(TeamMember, _super);
    function TeamMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamMember.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null; //玩家id
        this.name = null; //玩家姓名
        this.level = null; //玩家等级
        this.pos = null; //玩家在队伍里面位置  1 2 3 
        this.status = null; //玩家状态	在线/离线 ConfigTeamMemberStatus.ONLINE ConfigTeamMemberStatus.OFFLINE
        this.body = null; //玩家形象
        this.ready = null; //进入活动确定
    };
    return TeamMember;
}(RoleInfo));
__reflect(TeamMember.prototype, "TeamMember");
var TeamApplyInfo = (function (_super) {
    __extends(TeamApplyInfo, _super);
    function TeamApplyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamApplyInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null; //玩家id
        this.name = null; //玩家姓名
        this.level = null; //玩家等级
        this.body = null; //玩家形象
        this.skytowerFloor = null; //天空之塔层数
    };
    return TeamApplyInfo;
}(RoleInfo));
__reflect(TeamApplyInfo.prototype, "TeamApplyInfo");
var TeamInfo = (function (_super) {
    __extends(TeamInfo, _super);
    function TeamInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null; //队伍id
        this.captainId = null; //队长id
        this.state = null; //队伍状态 OrdinaryActivityIndex.NULL 没有状态 .SKYTOWER 试练场 .SHENGDI 圣地
        this.count = null; //队员数量
        this.skytowerFloor = null; //队伍层数（天空之塔、毁灭领域）
        this.membersList = {}; //队员信息列表	
        this.applyList = {}; //申请列表
        this.teamDefenseQueue = null; //[postion] = {plrId, petEntryId, ready, petLevel, petCombateForce, uid(职业/伙伴), breakLevel, qualityLevel}
        this.maxApplyCount = 15; //申请者上限
        this.teamTag = 0; //队伍的活动意向，默认是OrdinaryActivityIndex.CAMPAIGN关卡
    };
    return TeamInfo;
}(TClass));
__reflect(TeamInfo.prototype, "TeamInfo");
var TeamListInfo = (function (_super) {
    __extends(TeamListInfo, _super);
    function TeamListInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamListInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null; //队伍id
        this.captainID = null; //队长id
        this.count = null; //队员数量
        this.skytowerFloor = null;
        this.membersList = []; //队员信息列表
    };
    return TeamListInfo;
}(TClass));
__reflect(TeamListInfo.prototype, "TeamListInfo");
var TeamListMemberInfo = (function (_super) {
    __extends(TeamListMemberInfo, _super);
    function TeamListMemberInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamListMemberInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.name = null; //玩家姓名
        this.level = null; //玩家等级	
        this.vocation = null; //玩家等级
        this.VipLevel = null; //玩家vip等级
        this.sexId = null; //玩家性别
    };
    return TeamListMemberInfo;
}(RoleInfo));
__reflect(TeamListMemberInfo.prototype, "TeamListMemberInfo");
var TeamSkyTowerInviteInfo = (function (_super) {
    __extends(TeamSkyTowerInviteInfo, _super);
    function TeamSkyTowerInviteInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TeamSkyTowerInviteInfo;
}(RoleInfo));
__reflect(TeamSkyTowerInviteInfo.prototype, "TeamSkyTowerInviteInfo");
//# sourceMappingURL=TeamInfo.js.map