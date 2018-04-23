/*
作者:
    panjunhua
    
创建时间：
   2014.8.18(周一)

意图：组队系统
     
公共接口：
        setTeamInfo( teamInfo){ 			//设置自己的队伍信息
        getTeamInfo(){  								//获取自己的队伍信息
        getTeamState(){  							//获取队伍的状态 ConfigTeamStatus.NULL 没有状态 .ACTIVITY_1 爬塔 .ACTIVITY_2 平行世界
        setMemberInfo( mem){					//设置队员info,必填mem.id,可选status、pos、level、body
        getMemberInfo( playerID){ 		//获得队员信息  返回member结构
        getCaptainId(){								//获取队长id
        getMemberPos( id){						//获取队员位置
        removeMember(id){  						//移除队员
        isCaptain(){ 									//是否自己队长
        isTeamMember( playerID){			//是否玩家在队伍里面
        isHaveTeam(){ 									//是否有队
        leaveTeam(){										//离开队伍
        emptyTeamInfo(){								//解散/离开队伍 清空teamInfo
        
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
var TeamSystem = (function (_super) {
    __extends(TeamSystem, _super);
    function TeamSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
        //RegisterEvent(EventDefine.ACTOR_GOTFUCOS, this.onActorClick, this)				//注册点击玩家 弹出选项组队
    };
    TeamSystem.prototype.destory = function () {
        //UnRegisterEvent(EventDefine.ACTOR_GOTFUCOS, this.onActorClick, this)
    };
    TeamSystem.prototype.prepareResource = function (workQueue) {
        // workQueue.addWorkUnit(createClosureWorkUnit( function(this)
        // 													CombatTeamVipConfig = readCSV("data\\config\\CombatTeamVip.csv")
        // 													CombatTeamFetterConfig = readCSV("data\\config\\CombatTeamFetter.csv")
        // 													UnionPrizeConfig = readCSV("data\\config\\UnionPrize.csv")//血盟奖励
        // 												}, this) 
        // 											)
    };
    TeamSystem.prototype.onClear = function () {
        this.teamInfo = null;
        this.captionPos = -1;
        this.timerTimeList = {}; //保存截止时间
        for (var _ in (this.teamTimerList || {})) {
            var timer = this.teamTimerList[_];
            KillTimer(timer);
        }
        this.teamTimerList = {}; //内部定时
        this.fullTeamFightFlag = false;
    };
    TeamSystem.prototype.setTeamInfo = function (teamInfo) {
        var lastTeamInfo = this.teamInfo;
        this.teamInfo = teamInfo;
        this.updateTeammatePos();
        if (lastTeamInfo == null) {
            FireEvent(EventDefine.TEAM_CREATE, null);
        }
        else {
            if (lastTeamInfo.count < 3 && this.teamInfo.count >= 3) {
                if (this.fullTeamFightFlag == true) {
                    //发送战斗的指令
                    this.beginTeamFight();
                }
            }
        }
        this.onTeamUpdate();
    };
    TeamSystem.prototype.updateTeammatePos = function () {
        if (this.isHaveTeam()) {
            var list = [];
            for (var id in this.teamInfo.members) {
                var member = this.teamInfo.members[id];
                if (id == this.teamInfo.captainId) {
                    JsUtil.arrayInstert(list, 0, [id, member]);
                }
                else {
                    JsUtil.arrayInstert(list, [id, member]);
                }
            }
            for (var index = 0; index < list.length; index++) {
                var elem = list[index];
                var member = elem[1];
                member.position = index;
            }
        }
    };
    TeamSystem.prototype.getTeamInfo = function () {
        return this.teamInfo;
    };
    TeamSystem.prototype.getTeamActData = function () {
        if (!this.teamInfo) {
            return null;
        }
        return this.teamInfo.activityData;
    };
    TeamSystem.prototype.getTeamId = function () {
        if (this.teamInfo) {
            return this.teamInfo.uid;
        }
        return null;
    };
    TeamSystem.prototype.emptyTeamInfo = function () {
        this.teamInfo = null;
        this.timerTimeList = {};
        this.fullTeamFightFlag = false;
        for (var _ in this.teamTimerList) {
            var timer = this.teamTimerList[_];
            KillTimer(timer);
        }
        this.teamTimerList = {};
        this.onTeamUpdate();
    };
    TeamSystem.prototype.removeMember = function (id) {
        if (this.teamInfo == null) {
            return;
        }
        if (this.teamInfo.members[id] != null) {
            var removePos = this.teamInfo.members[id].position;
            delete this.teamInfo.members[id];
            this.teamInfo.count = this.teamInfo.count - 1;
            //TLog.Debug("delete",#(this.teamInfo.members))
            for (var i in this.teamInfo.members) {
                var member = this.teamInfo.members[i];
                if (member.position > removePos) {
                    this.teamInfo.members[i].position = this.teamInfo.members[i].position - 1;
                }
            }
        }
        this.onTeamUpdate();
    };
    TeamSystem.prototype.setMemberInfo = function (mem) {
        //TLog.Assert(this.team.members[mem.id])
        if (this.teamInfo.members[mem.plrId] != null) {
            if (mem.status) {
                this.teamInfo.members[mem.plrId].status = mem.status;
            }
            if (mem.position) {
                this.teamInfo.members[mem.plrId].position = mem.position;
            }
            if (mem.level) {
                this.teamInfo.members[mem.plrId].level = mem.level;
            }
            if (mem.body) {
                this.teamInfo.members[mem.plrId].body = mem.body;
            }
        }
    };
    TeamSystem.prototype.leaveTeam = function () {
        this.emptyTeamInfo();
    };
    TeamSystem.prototype.getMemberPos = function (id) {
        if (this.teamInfo.members[id]) {
            return this.teamInfo.members[id].position;
        }
        return 3;
    };
    TeamSystem.prototype.isHaveTeam = function () {
        if (this.teamInfo != null) {
            return true;
        }
        return false;
    };
    TeamSystem.prototype.isCaptain = function () {
        var bRet = false;
        var hero = GetHeroPropertyInfo();
        if (hero && this.isHaveTeam()) {
            if (hero.id == this.teamInfo.captainId) {
                bRet = true;
            }
        }
        return bRet;
    };
    TeamSystem.prototype.getMemberCount = function () {
        if (!this.teamInfo) {
            return 0;
        }
        return this.teamInfo.count;
    };
    TeamSystem.prototype.getMemberInfo = function (playerID) {
        if (this.teamInfo.members[playerID]) {
            return this.teamInfo.members[playerID];
        }
        return null;
    };
    TeamSystem.prototype.isTeamMember = function (playerID) {
        if (this.teamInfo) {
            if (this.teamInfo.members[playerID]) {
                return true;
            }
        }
        return false;
    };
    TeamSystem.prototype.getCaptainId = function () {
        if (this.teamInfo == null) {
            return null;
        }
        return this.teamInfo.captainId;
    };
    TeamSystem.prototype.isInTeam = function (id) {
        if (!this.teamInfo) {
            return false;
        }
        if (this.teamInfo.members[id] != null) {
            return true;
        }
        return false;
    };
    TeamSystem.prototype.getTeamMemberList = function () {
        if (!this.teamInfo) {
            return {};
        }
        return this.teamInfo.members;
    };
    TeamSystem.prototype.onTeamUpdate = function () {
        FireEvent(EventDefine.TEAM_INFO_UPDATE, null);
    };
    TeamSystem.prototype.setFullTeamFight = function (b) {
        this.fullTeamFightFlag = b;
    };
    TeamSystem.prototype.beginTeamFight = function () {
        if (this.teamInfo == null) {
            return;
        }
        if (this.isCaptain() == false) {
            return;
        }
        var actInfo = this.teamInfo.activityData;
        RpcProxy.call("C2G_CreateTeamBattle", actInfo);
    };
    TeamSystem.prototype.setTimerTime = function (name, deadline) {
        this.timerTimeList[name] = deadline;
    };
    TeamSystem.prototype.getTimerTime = function (name) {
        return checkNull(this.timerTimeList[name], 0);
    };
    TeamSystem.prototype.setInteriorTeamTimer = function (name, callback, obj) {
        //内部定时跟this.timerTimeList匹配使用
        if (this.teamTimerList[name]) {
            KillTimer(this.teamTimerList[name]);
            this.teamTimerList[name] = null;
        }
        var time = checkNull(this.timerTimeList[name], 0);
        if (time == 0 || time - GetServerTime() < 0) {
            return;
        }
        if (!callback || !obj) {
            return;
        }
        var tick = function (delay) {
            callback.call(obj);
            if (this.teamTimerList[name]) {
                KillTimer(this.teamTimerList[name]);
                this.teamTimerList[name] = null;
            }
        };
        this.teamTimerList[name] = SetTimer(tick, this, (time - GetServerTime()) * 1000, false);
    };
    TeamSystem.prototype.clearInteriorTeamTimer = function (name) {
        if (this.teamTimerList[name]) {
            KillTimer(this.teamTimerList[name]);
            this.teamTimerList[name] = null;
        }
    };
    return TeamSystem;
}(BaseSystem));
__reflect(TeamSystem.prototype, "TeamSystem");
//# sourceMappingURL=TeamSystem.js.map