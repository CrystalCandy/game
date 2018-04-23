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
// TypeScript file
/*
作者:
    lqx

创建时间：
    2017.03.17(星期五)

意图：
    空提示

公共接口：

*/
var UITeamGroup = (function (_super) {
    __extends(UITeamGroup, _super);
    function UITeamGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITeamGroup.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.autoJoinDelay = 10 * 1000;
        this.autoFightDelay = 60;
        this.timerList = {};
        this.activityData = null;
        this.autoJoinFlag = false;
        this.handlerList = {};
        this.mParentGroup = params[2];
        this.mLayoutPath = params[3];
        this.name = params[4];
    };
    UITeamGroup.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        // var elemInfo = [
        // 	//组队控件皮肤
        // 	{ ["index_type"] : eui.Component,		["name"]: this.name, ["image"]: "", ["skinName"]: this.mLayoutPath, },
        // ];
        // UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, this.mParentGroup);
        // UiUtil.initElemWithComponent( this.mElemList[this.name], this.mElemList, this, this.name)
        UiUtil.initElemWithSkinPath(this.name, this.mLayoutPath, this.mLayoutNode, this.mElemList, this, this.mParentGroup);
        var elemInfo1 = [
            (_a = {}, _a["name"] = this.name + "team_tick1", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickKick, _a),
            (_b = {}, _b["name"] = this.name + "team_tick2", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickKick, _b),
            (_c = {}, _c["name"] = this.name + "team_leave_btn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickLeave, _c),
            (_d = {}, _d["name"] = this.name + "fight_btn", _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickFight, _d),
            (_e = {}, _e["name"] = this.name + "team_create_btn", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickCreate, _e),
            (_f = {}, _f["name"] = this.name + "team_join_btn", _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickJoin, _f),
            (_g = {}, _g["name"] = this.name + "join_counter_check", _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClicJoinCheck, _g),
            (_h = {}, _h["name"] = this.name + "team_counter_check", _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClicTeamCheck, _h),
            (_j = {}, _j["name"] = this.name + "fight_counter_check", _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onClicFightCheck, _j),
        ];
        UiUtil.initElem(elemInfo1, this.mElemList[this.name], this.mElemList, this);
        // let group = <eui.Group>this.mElemList["jie_scroll_group"]
        // this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group)
        this.mElemList[this.name + "team_counter_check"].selected = true;
        this.mElemList[this.name + "fight_counter_check"].selected = true;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    UITeamGroup.prototype.onUnLoad = function () {
    };
    UITeamGroup.prototype.onShow = function () {
        RegisterEvent(EventDefine.TEAM_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.TEAM_CREATE, this.onTeamCreate, this);
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        // this.mElemList["jie_group"].visible = true
        // this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16")
        if (this.mParentGroup) {
            this.mParentGroup.visible = true;
        }
        else {
            this.mElemList[this.name].visible = true;
        }
        this.mElemList[this.name + "join_counter_check"].selected = (this.autoJoinFlag == true);
        //清除系统内部计时
        TeamSystem.getInstance().setFullTeamFight(false);
        this.refreshFrame();
        // if (!this.timerList["second"]) {
        //     this.timerList["second"] = SetTimer(this.oneSecondTick, this, 100, true)
        // }
    };
    UITeamGroup.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.TEAM_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.TEAM_CREATE, this.onTeamCreate, this);
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        // this.mElemList["jie_group"].visible = false
        //关闭界面后组队系统内继续计时
        if (this.activityData && TeamIsState(this.activityData[0]) == true) {
            if (this.mElemList[this.name + "team_counter_check"].selected == true) {
                TeamSystem.getInstance().setFullTeamFight(true);
                var func = function () {
                    TeamSystem.getInstance().beginTeamFight();
                };
                TeamSystem.getInstance().setInteriorTeamTimer("autofight", func, this);
            }
        }
        if (this.mParentGroup) {
            this.mParentGroup.visible = false;
        }
        else {
            this.mElemList[this.name].visible = false;
        }
        for (var k in this.timerList) {
            var timer = this.timerList[k];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    UITeamGroup.prototype.refreshFrame = function () {
        for (var k in this.timerList) {
            var timer = this.timerList[k];
            KillTimer(timer);
        }
        this.timerList = {};
        if (!this.activityData || TeamIsState(this.activityData[0]) == false) {
            this.mElemList[this.name + "team_leave_btn"].visible = false;
            this.mElemList[this.name + "fight_btn"].visible = false;
            this.mElemList[this.name + "team_counter_group"].visible = false;
            this.mElemList[this.name + "fight_counter_group"].visible = false;
            this.mElemList[this.name + "join_counter_group"].visible = (this.activityData != null);
            this.mElemList[this.name + "team_create_btn"].visible = (this.activityData != null);
            this.mElemList[this.name + "team_join_btn"].visible = (this.activityData != null);
            //快速申请加入队伍倒计时
            this.refreshAutoJoin();
        }
        else {
            this.mElemList[this.name + "team_leave_btn"].visible = true;
            this.mElemList[this.name + "fight_btn"].visible = HeroIsCaptain() == true; //true
            this.mElemList[this.name + "team_counter_group"].visible = HeroIsCaptain() == true; //true
            this.mElemList[this.name + "fight_counter_group"].visible = HeroIsCaptain() == true; //true
            this.mElemList[this.name + "join_counter_group"].visible = false;
            this.mElemList[this.name + "team_create_btn"].visible = false;
            this.mElemList[this.name + "team_join_btn"].visible = false;
            this.refreshAutoFight();
        }
        if (this.mElemList[this.name + "team_counter_group"].visible == true) {
            if (this.mElemList[this.name + "team_counter_check"].selected == true) {
                if (TeamSystem.getInstance().getMemberCount() >= 3) {
                    TeamSystem.getInstance().beginTeamFight();
                }
            }
        }
        this.refreshMembers();
    };
    UITeamGroup.prototype.refreshMembers = function () {
        for (var i = 0; i < 3; i++) {
            this.mElemList[this.name + "team_group" + i].visible = false;
        }
        if (!this.activityData || TeamIsState(this.activityData[0]) == false) {
            return;
        }
        var list = [];
        var t = TeamSystem.getInstance().getTeamMemberList();
        for (var _ in t) {
            table_insert(list, t[_]);
        }
        table_sort(list, function (a, b) { return a["position"] - b["position"]; });
        for (var i = 0; i < list.length; i++) {
            var memberInfo = list[i];
            this.mElemList[this.name + "team_group" + i].visible = true;
            var imageName = GetActorImageName(memberInfo.vocation, memberInfo.sex);
            this.mElemList[this.name + "team_icon" + i].source = imageName;
            this.mElemList[this.name + "team_name" + i].text = memberInfo.plrName;
            this.mElemList[this.name + "team_level" + i].text = memberInfo.level;
            this.mElemList[this.name + "team_force" + i].text = MakeLongNumberShort(memberInfo.force);
            if (i > 0) {
                this.mElemList[this.name + "team_tick" + i].visible = HeroIsCaptain() == true;
            }
            this.controlDataTable[this.name + "team_tick" + i] = memberInfo.plrId;
        }
    };
    UITeamGroup.prototype.refreshAutoJoin = function () {
        if (this.mElemList[this.name + "join_counter_group"].visible == false) {
            return;
        }
        if (this.mElemList[this.name + "join_counter_check"].selected == true) {
            var tick = function (delay) {
                var leftTime = Math.ceil((this.autoJoinDelay - delay) / 1000);
                this.autoJoinDelay = this.autoJoinDelay - delay;
                if (leftTime <= 0) {
                    //这里发送快速加入队伍的申请
                    this.onClickJoin();
                    leftTime = 0;
                    if (this.timerList["autoJoin"]) {
                        KillTimer(this.timerList["autoJoin"]);
                        this.timerList["autoJoin"] = null;
                    }
                }
                this.mElemList[this.name + "join_counter"].text = String.format(Localize_cns("TEAM_TXT1"), leftTime);
            };
            if (!this.timerList["autoJoin"]) {
                this.timerList["autoJoin"] = SetTimer(tick, this, 100, true);
            }
        }
        else {
            if (this.timerList["autoJoin"]) {
                KillTimer(this.timerList["autoJoin"]);
                this.timerList["autoJoin"] = null;
            }
        }
    };
    UITeamGroup.prototype.refreshAutoFight = function () {
        if (this.mElemList[this.name + "fight_counter_group"].visible == false) {
            return;
        }
        var deadline = TeamSystem.getInstance().getTimerTime("autofight");
        if (deadline == 0) {
            return;
        }
        if (this.mElemList[this.name + "fight_counter_check"].selected == true) {
            var tick = function (delay) {
                var leftTime = Math.ceil(deadline - GetServerTime());
                if (leftTime <= 0) {
                    //这里发送战斗的申请
                    TeamSystem.getInstance().beginTeamFight();
                    leftTime = 0;
                    if (this.timerList["autoFight"]) {
                        KillTimer(this.timerList["autoFight"]);
                        this.timerList["autoFight"] = null;
                    }
                }
                this.mElemList[this.name + "fight_counter"].text = String.format(Localize_cns("TEAM_TXT3"), leftTime);
            };
            if (!this.timerList["autoFight"]) {
                this.timerList["autoFight"] = SetTimer(tick, this, 100, true);
            }
        }
        else {
            if (this.timerList["autoFight"]) {
                KillTimer(this.timerList["autoFight"]);
                this.timerList["autoFight"] = null;
            }
        }
    };
    UITeamGroup.prototype.onTeamCreate = function (args) {
        TeamSystem.getInstance().setTimerTime("autofight", GetServerTime() + 60);
    };
    ////////////////////////////////////////////////////////////
    UITeamGroup.prototype.onClickKick = function (args) {
        var name = args.target.name;
        if (!this.controlDataTable[name]) {
            return;
        }
        var plrId = this.controlDataTable[name];
        RpcProxy.call("C2G_KickMember", plrId);
    };
    UITeamGroup.prototype.onClickLeave = function (args) {
        RpcProxy.call("C2G_LeaveTeam");
    };
    UITeamGroup.prototype.onClickFight = function (args) {
        TeamSystem.getInstance().beginTeamFight();
    };
    UITeamGroup.prototype.onClickCreate = function (args) {
        var _a = CheckMainFrameFunction("formalfight"), flag = _a[0], str = _a[1];
        if (flag == true) {
            return MsgSystem.addTagTips(str);
        }
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (this.handlerList[UITeamGroup.CHECK_CREATE_TEAM]) {
            var func = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][0];
            var obj = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][1];
            var param = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][2];
            if (func.call(obj, param) == false) {
                return;
            }
        }
        if (this.activityData) {
            RpcProxy.call("C2G_CreateTeam", this.activityData[0], this.activityData[1]);
        }
    };
    UITeamGroup.prototype.onClickJoin = function (args) {
        var _a = CheckMainFrameFunction("formalfight"), flag = _a[0], str = _a[1];
        if (flag == true) {
            return MsgSystem.addTagTips(str);
        }
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (this.handlerList[UITeamGroup.CHECK_QUICK_JOIN]) {
            var func = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][0];
            var obj = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][1];
            var param = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][2];
            if (func.call(obj, param) == false) {
                return;
            }
        }
        if (this.activityData) {
            RpcProxy.call("C2G_ApplyAllTeam", this.activityData[0], this.activityData[1]);
        }
    };
    UITeamGroup.prototype.onClicJoinCheck = function (args) {
        this.autoJoinDelay = 10 * 1000;
        if (args.target.selected == false) {
            this.mElemList[this.name + "join_counter"].text = String.format(Localize_cns("TEAM_TXT1"), this.autoJoinDelay / 1000);
        }
        this.refreshAutoJoin();
    };
    UITeamGroup.prototype.onClicTeamCheck = function (args) {
    };
    UITeamGroup.prototype.onClicFightCheck = function (args) {
        TeamSystem.getInstance().setTimerTime("autofight", GetServerTime() + 60);
        if (args.target.selected == false) {
            this.mElemList[this.name + "fight_counter"].text = String.format(Localize_cns("TEAM_TXT3"), 60);
        }
        this.refreshAutoFight();
    };
    ////////////////////////////////////////////////////////////////////
    UITeamGroup.prototype.setAutoJoinTeam = function (b) {
        this.autoJoinFlag = b;
        // this.refreshAutoJoin()
    };
    UITeamGroup.prototype.setTeamActivityData = function (info) {
        if (this.activityData && TeamIsState(this.activityData[0]) == true) {
            return;
        }
        this.activityData = info; //[actIndex, id]
        this.refreshFrame();
    };
    UITeamGroup.prototype.setHandler = function (name, func, obj, param) {
        this.handlerList[name] = [func, obj, param];
        // UITeamGroup.CHECK_QUICK_JOIN
    };
    UITeamGroup.CHECK_QUICK_JOIN = 1; //快速加入队伍
    UITeamGroup.CHECK_CREATE_TEAM = 2; //创建队伍
    return UITeamGroup;
}(BaseCtrlWnd));
__reflect(UITeamGroup.prototype, "UITeamGroup");
//# sourceMappingURL=UITeamGroup.js.map