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
class UITeamGroup extends BaseCtrlWnd {
    controlDataTable: any;
	mParentGroup: any;
	mLayoutPath: any;
	name: string;
    autoJoinDelay: number;
    autoFightDelay: number;
    timerList: any;
    activityData: any;
    autoJoinFlag: boolean;
    handlerList: any;

    static CHECK_QUICK_JOIN: number = 1                       //快速加入队伍
    static CHECK_CREATE_TEAM: number = 2                      //创建队伍

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.autoJoinDelay = 10 * 1000;
        this.autoFightDelay = 60;
        this.timerList = {}
        this.activityData = null
        this.autoJoinFlag = false
        this.handlerList = {}

		this.mParentGroup = params[2]
		this.mLayoutPath = params[3]
		this.name = params[4]
    }

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;

        // var elemInfo = [
		// 	//组队控件皮肤
		// 	{ ["index_type"] : eui.Component,		["name"]: this.name, ["image"]: "", ["skinName"]: this.mLayoutPath, },

		// ];
		// UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, this.mParentGroup);
		// UiUtil.initElemWithComponent( this.mElemList[this.name], this.mElemList, this, this.name)
        UiUtil.initElemWithSkinPath(this.name, this.mLayoutPath, this.mLayoutNode, this.mElemList, this, this.mParentGroup)
        
        var elemInfo1 = [
			{ ["name"]: this.name + "team_tick1", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickKick},
			{ ["name"]: this.name + "team_tick2", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickKick},
            { ["name"]: this.name + "team_leave_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickLeave},
            { ["name"]: this.name + "fight_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight},
            { ["name"]: this.name + "team_create_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCreate},
            { ["name"]: this.name + "team_join_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickJoin},

            
            { ["name"]: this.name + "join_counter_check", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClicJoinCheck},
            { ["name"]: this.name + "team_counter_check", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClicTeamCheck},
            { ["name"]: this.name + "fight_counter_check", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClicFightCheck},

		];
		UiUtil.initElem(elemInfo1, this.mElemList[this.name], this.mElemList, this);
        // let group = <eui.Group>this.mElemList["jie_scroll_group"]
        // this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group)
        this.mElemList[this.name + "team_counter_check"].selected = true
        this.mElemList[this.name + "fight_counter_check"].selected = true

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.TEAM_INFO_UPDATE, this.refreshFrame, this)
        RegisterEvent(EventDefine.TEAM_CREATE, this.onTeamCreate, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        // this.mElemList["jie_group"].visible = true
        // this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16")

        if (this.mParentGroup) {
            this.mParentGroup.visible = true
        } else {
    		this.mElemList[this.name].visible = true
        }
        this.mElemList[this.name + "join_counter_check"].selected = (this.autoJoinFlag == true)

        //清除系统内部计时
        TeamSystem.getInstance().setFullTeamFight(false)
        this.refreshFrame()
        // if (!this.timerList["second"]) {
        //     this.timerList["second"] = SetTimer(this.oneSecondTick, this, 100, true)
        // }
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.TEAM_INFO_UPDATE, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.TEAM_CREATE, this.onTeamCreate, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        // this.mElemList["jie_group"].visible = false

        //关闭界面后组队系统内继续计时
        if (this.activityData && TeamIsState(this.activityData[0]) == true) {
            if (this.mElemList[this.name + "team_counter_check"].selected == true) {                        //队满时战斗
                TeamSystem.getInstance().setFullTeamFight(true)

                let func = function() {
                    TeamSystem.getInstance().beginTeamFight()
                }
                TeamSystem.getInstance().setInteriorTeamTimer("autofight", func, this)
            }
        }
		
        if (this.mParentGroup) {
            this.mParentGroup.visible = false
        } else {
    		this.mElemList[this.name].visible = false
        }

        for (let k in this.timerList) {
            let timer = this.timerList[k]
            KillTimer(timer)
        }
        this.timerList = {}
    }

    refreshFrame() {
        for (let k in this.timerList) {
            let timer = this.timerList[k]
            KillTimer(timer)
        }
        this.timerList = {}

        if (!this.activityData || TeamIsState(this.activityData[0]) == false) {
            this.mElemList[this.name + "team_leave_btn"].visible = false
            this.mElemList[this.name + "fight_btn"].visible = false
            this.mElemList[this.name + "team_counter_group"].visible = false
            this.mElemList[this.name + "fight_counter_group"].visible = false
            
            this.mElemList[this.name + "join_counter_group"].visible = (this.activityData != null)
            this.mElemList[this.name + "team_create_btn"].visible = (this.activityData != null)
            this.mElemList[this.name + "team_join_btn"].visible = (this.activityData != null)

            //快速申请加入队伍倒计时
            this.refreshAutoJoin()
        } else {
            this.mElemList[this.name + "team_leave_btn"].visible = true
            this.mElemList[this.name + "fight_btn"].visible = HeroIsCaptain() == true//true
            this.mElemList[this.name + "team_counter_group"].visible = HeroIsCaptain() == true//true
            this.mElemList[this.name + "fight_counter_group"].visible = HeroIsCaptain() == true//true
            
            this.mElemList[this.name + "join_counter_group"].visible = false
            this.mElemList[this.name + "team_create_btn"].visible = false
            this.mElemList[this.name + "team_join_btn"].visible = false

            this.refreshAutoFight()
        }

        if (this.mElemList[this.name + "team_counter_group"].visible == true) {
            if (this.mElemList[this.name + "team_counter_check"].selected == true) {
                if (TeamSystem.getInstance().getMemberCount() >= 3) {
                    TeamSystem.getInstance().beginTeamFight()
                }
            }
        }

        this.refreshMembers()
    }

    refreshMembers() {
        for (let i = 0; i < 3; i++) {
            this.mElemList[this.name + "team_group" + i].visible = false
        }

        if (!this.activityData || TeamIsState(this.activityData[0]) == false) {
            return
        }

        let list = []
        let t = TeamSystem.getInstance().getTeamMemberList()
        for (let _ in t) {
            table_insert(list, t[_])
        }
        table_sort(list, function(a, b) {return a["position"] - b["position"]})

        for (let i = 0; i < list.length; i++) {
            let memberInfo = list[i]

            this.mElemList[this.name + "team_group" + i].visible = true
            
            let imageName = GetActorImageName(memberInfo.vocation, memberInfo.sex)
            this.mElemList[this.name + "team_icon" + i].source = imageName
            this.mElemList[this.name + "team_name" + i].text = memberInfo.plrName
            this.mElemList[this.name + "team_level" + i].text = memberInfo.level
            this.mElemList[this.name + "team_force" + i].text = MakeLongNumberShort(memberInfo.force)

            if (i > 0) {
                this.mElemList[this.name + "team_tick" + i].visible = HeroIsCaptain() == true
            }

            this.controlDataTable[this.name + "team_tick" + i] = memberInfo.plrId
        }
    }

    refreshAutoJoin() {
        if (this.mElemList[this.name + "join_counter_group"].visible == false) {
            return
        }

        if (this.mElemList[this.name + "join_counter_check"].selected == true) {
            let tick = function(delay) {
                let leftTime = Math.ceil((this.autoJoinDelay - delay) / 1000)
                this.autoJoinDelay = this.autoJoinDelay - delay
                if (leftTime <= 0) {
                    //这里发送快速加入队伍的申请
                    this.onClickJoin()

                    leftTime = 0
                    if (this.timerList["autoJoin"]) {
                        KillTimer(this.timerList["autoJoin"])
                        this.timerList["autoJoin"] = null
                    }
                }
                this.mElemList[this.name + "join_counter"].text = String.format(Localize_cns("TEAM_TXT1"), leftTime)
            }
            if (!this.timerList["autoJoin"]) {
                this.timerList["autoJoin"] = SetTimer(tick, this, 100, true)
            }
        } else {
            if (this.timerList["autoJoin"]) {
                KillTimer(this.timerList["autoJoin"])
                this.timerList["autoJoin"] = null
            }
        }
    }

    refreshAutoFight() {
        if (this.mElemList[this.name + "fight_counter_group"].visible == false) {
            return
        }

        let deadline = TeamSystem.getInstance().getTimerTime("autofight")
        if (deadline == 0) {
            return
        }

        if (this.mElemList[this.name + "fight_counter_check"].selected == true) {
            let tick = function(delay) {
                let leftTime = Math.ceil(deadline - GetServerTime())
                if (leftTime <= 0) {
                    //这里发送战斗的申请
                    TeamSystem.getInstance().beginTeamFight()

                    leftTime = 0
                    if (this.timerList["autoFight"]) {
                        KillTimer(this.timerList["autoFight"])
                        this.timerList["autoFight"] = null
                    }
                }
                this.mElemList[this.name + "fight_counter"].text = String.format(Localize_cns("TEAM_TXT3"), leftTime)
            }
            if (!this.timerList["autoFight"]) {
                this.timerList["autoFight"] = SetTimer(tick, this, 100, true)
            }
        } else {
            if (this.timerList["autoFight"]) {
                KillTimer(this.timerList["autoFight"])
                this.timerList["autoFight"] = null
            }
        }
    }

    onTeamCreate(args) {
        TeamSystem.getInstance().setTimerTime("autofight", GetServerTime() + 60)
    }

    ////////////////////////////////////////////////////////////
    onClickKick(args) {
        let name = args.target.name
        if (!this.controlDataTable[name]) {
            return
        }

        let plrId = this.controlDataTable[name]
        RpcProxy.call("C2G_KickMember", plrId)
    }

    onClickLeave(args) {
        RpcProxy.call("C2G_LeaveTeam")
    }

    onClickFight(args) {
        TeamSystem.getInstance().beginTeamFight()
    }

    onClickCreate(args) {
        let [flag, str] = CheckMainFrameFunction("formalfight")
        if (flag == true) {
            return MsgSystem.addTagTips(str)
        }

        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (this.handlerList[UITeamGroup.CHECK_CREATE_TEAM]) {
            let func = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][0]
            let obj = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][1]
            let param = this.handlerList[UITeamGroup.CHECK_CREATE_TEAM][2]

            if (func.call(obj, param) == false) {
                return
            }
        }
        if (this.activityData) {
            RpcProxy.call("C2G_CreateTeam", this.activityData[0], this.activityData[1])
        }
    }

    onClickJoin(args) {
        let [flag, str] = CheckMainFrameFunction("formalfight")
        if (flag == true) {
            return MsgSystem.addTagTips(str)
        }

        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (this.handlerList[UITeamGroup.CHECK_QUICK_JOIN]) {
            let func = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][0]
            let obj = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][1]
            let param = this.handlerList[UITeamGroup.CHECK_QUICK_JOIN][2]

            if (func.call(obj, param) == false) {
                return
            }
        }

        if (this.activityData) {
            RpcProxy.call("C2G_ApplyAllTeam", this.activityData[0], this.activityData[1])
        }
    }

    onClicJoinCheck(args) {
        this.autoJoinDelay = 10 * 1000
        if (args.target.selected == false) {
            this.mElemList[this.name + "join_counter"].text = String.format(Localize_cns("TEAM_TXT1"), this.autoJoinDelay / 1000)
        }    
        this.refreshAutoJoin()
    }

    onClicTeamCheck(args) {

    }

    onClicFightCheck(args) {
        TeamSystem.getInstance().setTimerTime("autofight", GetServerTime() + 60)
        if (args.target.selected == false) {
            this.mElemList[this.name + "fight_counter"].text = String.format(Localize_cns("TEAM_TXT3"), 60)
        }

        this.refreshAutoFight()
    }
    ////////////////////////////////////////////////////////////////////
    setAutoJoinTeam(b) {
        this.autoJoinFlag = b
        // this.refreshAutoJoin()
    }

    setTeamActivityData(info) {
        if (this.activityData && TeamIsState(this.activityData[0]) == true) {                           //已在活动中
            return
        }

        this.activityData = info                            //[actIndex, id]
        this.refreshFrame()
    }

    setHandler(name, func, obj, param?) {
        this.handlerList[name] = [func, obj, param]
        // UITeamGroup.CHECK_QUICK_JOIN
    }
}