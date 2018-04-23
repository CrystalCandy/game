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
function GetHeroClubInfo() {
    return ClubSystem.getInstance().getRoleClub(GetHeroProperty("id"));
}
var ClubSystem = (function (_super) {
    __extends(ClubSystem, _super);
    function ClubSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
        //RegisterEvent(EventDefine.FACTION_UNION_APPLY, this.onRevFacionUnionMsg, this)
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterToGetUnionInfo, this);
        RegisterEvent(EventDefine.ACTIVITY_GLOBAL_SERVER_EVENT, this.onRecvActivityEvent, this);
    };
    ClubSystem.prototype.destory = function () {
    };
    ClubSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initClubSystemCsv(workQueue);
    };
    //here
    ClubSystem.prototype.onClear = function () {
        this.curClubInfo = null; //角色所在的帮派信息
        this.roleInfo = null;
        this.clubInfoList = [];
        this.noticeText = "";
        this.myApplyList = null;
        this.roleClunInfo = []; //角色帮派信息
        //this.clubList  = {}                       //帮派列表
        this.applyList = []; //申请列表
        this.LegionApplylist = []; //帮派申请列表
        //this.clubSingleList = {}                   //帮派信息列表
        this.clubMenberList = []; //帮派成员列表
        //   this.buildInfoList = null                       //帮派内政建筑信息
        //   this.studySkillList = null                  //研究技能列表
        //   this.notic = null 													 //公告
        //   this.info = null														 //介绍
        //   this.allotRecordList = {}										//分配记录
        //   this.buyRecordList = {}											//购买记录
        //   this.myUnionInfo = {}
        //   this.saveFactionBuildInfo = {}					// 军团建筑信息
        //   this.saveFactionPoint = null               //军团积分信息
        //   this.saveFactionSkillInfo = {}	          //军团技能信息
        //   this.saveFactionScoreInfo = null            //军团过往积分
        this.autoApplyStatus = 1;
        this.treasureList = {}; //藏宝阁奖励
        this.taskList = null;
        this.memberListChange = false;
        //   if(this.onClearEx ){
        // 	  this.onClearEx()
        // 	}
    };
    ClubSystem.prototype.sendClubApplyMessage = function (clubId, reason) {
        var message = GetMessage(opCodes.C2G_FACTION_APPAY);
        message.clubId = clubId;
        message.applyReason = reason;
        SendGameMessage(message);
    };
    //////////////////////////////////////////////////////////////////////////////
    //图标提示
    ClubSystem.prototype.IconTips = function (playerInfo) {
        // TLog.Debug("ClubSystem.IconTips")
        // //TLog.Debug_r(playerInfo)
        // let setType = "clubApply"
        // let iconInfo = FriendSystem.getInstance().getIconMsgInfo(setType)
        // if(iconInfo ){
        // 	return
        // }
        // let cbObj:any = {}
        // cbObj.function IconMsgCallBack(cbObj, userData){			//红点处理
        // 	let t:any = {}
        // 	t.function DialogCallBack(_, result, userData){		//消息框处理							
        // 		if(result ){
        // 			let curState = StateManager.getInstance().GetCurrentStateType()
        // 			if(curState != state_type.LIVE_BASE_STATE ){
        // 				return  MsgSystem.AddTagTips(Localize_cns("FUNTIPS_HIMI22"))
        // 			}
        // 			let wnd = WngMrg.getInstance().getWindow("ClubFrame")
        // 			wnd.showWithTab(ID_TAB_APPLY)
        // 		}			
        //   	FriendSystem.getInstance().removeIconMsgInfo(userData)
        // 	}
        // 	let infoStr =Localize_cns("CONFIRM_PALYER_INVITATION1")
        // 	MsgSystem.ConfirmDialog(infoStr, t,userData)			
        // }		
        // let info:any = {}
        // info.iconID = null
        // info.iconType = setType		
        // info.iconID=MsgSystem.AddIconMsg(cbObj, info,IconMsgType.CLUB_APPLY)		
        // FriendSystem.getInstance().addIconMsgInfo(info)
    };
    ClubSystem.prototype.sendAcceptApplyRequestMessage = function (applyId, isYes) {
        var message = GetMessage(opCodes.C2G_FACTION_CHECK);
        message.applyId = applyId;
        message.isYes = isYes;
        SendGameMessage(message);
    };
    ClubSystem.prototype.getApplyInfoByIndex = function (index) {
        var i = 1;
        for (var k in this.applyList) {
            var v = this.applyList[k];
            if (i == index) {
                return v;
            }
            i = i + 1;
        }
        return null;
    };
    ClubSystem.prototype.sendClubMenberMessage = function () {
        var message = GetMessage(opCodes.C2G_FACTION_MEMBER_REFRESH);
        SendGameMessage(message);
    };
    // setClubMenberList(list) {
    // 	this.memberListChange = true
    // 	this.clubMenberList = list
    // }
    // getClubMenberList(list) {
    // 	if (this.memberListChange) {
    // 		this.memberListChange = false
    // 		table_sort(this.clubMenberList, function (a, b) {
    // 			if (a.post != b.post) {
    // 				return a.post - b.post
    // 			} else {
    // 				return b.zhanli - a.zhanli
    // 			}
    // 		})
    // 	}
    // 	return this.clubMenberList
    // }
    // cleanClubMenberList(list) {
    // 	this.clubMenberList = []
    // }
    // updateClubMenberList(info) {
    // 	let index = null
    // 	for (let k in this.clubMenberList) {
    // 		let v = this.clubMenberList[k]
    // 		if (v.id == info.id) {
    // 			index = k
    // 			break
    // 		}
    // 	}
    // 	if (index != null) {
    // 		this.clubMenberList[index] = info
    // 	}
    // 	this.memberListChange = true
    // }
    ClubSystem.prototype.onRecvActivityEvent = function (args) {
        var event = args.msg.event;
        if (event == ConfigServerEvent.FACTION_MAP_CREATE || event == ConfigServerEvent.FACTION_MAP_BOSS) {
            var message = GetMessage(opCodes.C2G_FACTIONMAP_QUERY);
            SendGameMessage(message); //-查询副本情况	
        }
        //let list:any = {
        //								[ConfigServerEvent.FACTION_PVE_OPEN] 			: {1, Localize_cns("PANGAEA_TXT30")},
        //								[ConfigServerEvent.FACTION_PVE_CLOSE] 			= {1, Localize_cns("PANGAEA_TXT33")},
        //								[ConfigServerEvent.FACTION_PVE_BOSS_OPEN] 	= {1, Localize_cns("PANGAEA_TXT31")},
        //								[ConfigServerEvent.FACTION_PVE_BOSS_CLOSE]	= {1, Localize_cns("PANGAEA_TXT32")},
        //						 }
        //						 
        //if(list[event] ){
        //	if(list[event][1] == 1 ){
        //		MsgSystem.AddChannel(channelType.FACTION, list[event][2])
        //		return MsgSystem.AddPubilcMsg(list[event][2])
        //	}
        //}
    };
    ClubSystem.prototype.getPosName = function (pos) {
        var factionPosConfig = (_a = {},
            _a[opFactionOfficeOptions.LEADER] = Localize_cns("CLUB_POS_1"),
            _a[opFactionOfficeOptions.SUB_LEADER] = Localize_cns("CLUB_POS_2"),
            _a[opFactionOfficeOptions.MEMBER] = Localize_cns("CLUB_POS_3"),
            _a);
        return factionPosConfig[pos];
        var _a;
    };
    ClubSystem.prototype.getPosNameColor = function (pos) {
        var factionPosConfig = (_a = {},
            _a[opFactionOfficeOptions.LEADER] = "#red",
            _a[opFactionOfficeOptions.SUB_LEADER] = "#orange",
            _a[opFactionOfficeOptions.MEMBER] = "#green",
            _a);
        return factionPosConfig[pos];
        var _a;
    };
    ClubSystem.prototype.getPosImage = function (pos) {
        if (opFactionOfficeOptions.LEADER == pos) {
            return "gh_TextDi04";
        }
        else if (opFactionOfficeOptions.SUB_LEADER == pos) {
            return "gh_TextDi03";
        }
        return "";
    };
    //获得军团logo图标
    ClubSystem.prototype.getLogoImage = function (id) {
        return String.format("gh_gongHuiIcon%02d", id);
    };
    ClubSystem.prototype.onEnterToGetUnionInfo = function () {
        //如果有军团
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo && (GAME_MODE == GAME_NORMAL)) {
            if (heroInfo["faction"] >= 0) {
                //this.SendMsgToGetUnionInfo()
                //this.sendMsgToGetBuildInfo()
                this.sendClubMenberMessage();
                //查询副本
                var message = GetMessage(opCodes.C2G_FACTIONMAP_QUERY);
                SendGameMessage(message); //-查询副本情况
                message = GetMessage(opCodes.C2G_FACTION_INFO_REFRESH);
                SendGameMessage(message); //-请求帮派信息
            }
        }
    };
    ClubSystem.prototype.sendMsgToSetAutoApply = function (status) {
        var message = GetMessage(opCodes.C2G_FACTIONWAR_AUTO_APPLY);
        message.autoStatus = status;
        SendGameMessage(message);
    };
    ClubSystem.prototype.setAutoApplyStatus = function (status) {
        this.autoApplyStatus = status;
    };
    ClubSystem.prototype.getAutoApplyStatus = function (status) {
        return this.autoApplyStatus;
    };
    // getFactionTaskList(isGroup) {
    // 	let list = []
    // 	for (let i in GameConfig.FactionTaskConfig) {
    // 		let v = GameConfig.FactionTaskConfig[i]
    // 		if (v.isGroup == isGroup) {
    // 			JsUtil.arrayInstert(list, v)
    // 		}
    // 	}
    // 	return list
    // }
    ClubSystem.prototype.setFacTaskTreasureList = function (treasureList) {
        this.treasureList = treasureList;
    };
    ClubSystem.prototype.getFacTaskTreasureList = function () {
        return this.treasureList || {};
    };
    ClubSystem.prototype.setFacTaskList = function (list) {
        this.taskList = list;
    };
    ClubSystem.prototype.getFacTaskList = function () {
        return this.taskList || {};
    };
    //here
    //////////////////////新加
    //个人角色信息
    ClubSystem.prototype.setRoleClubInfo = function (facId, facName, facPost) {
        var t = [];
        t["facId"] = facId;
        t["facName"] = facName;
        t["facPost"] = facPost;
        this.roleInfo = t;
    };
    ClubSystem.prototype.getRoleClubInfo = function () {
        return this.roleInfo;
    };
    //帮派信息
    ClubSystem.prototype.setCurClubInfo = function (curClubInfo) {
        this.curClubInfo = curClubInfo;
    };
    ClubSystem.prototype.getCurClubInfo = function () {
        return this.curClubInfo;
    };
    ClubSystem.prototype.updateClubNotice = function (notice) {
        if (this.curClubInfo) {
            this.curClubInfo.notice = notice;
        }
    };
    ClubSystem.prototype.onUpdateClubInfo = function (intro, id) {
        if (this.curClubInfo && this.curClubInfo.id == id) {
            this.curClubInfo.intro = id;
        }
    };
    //所有帮派信息
    ClubSystem.prototype.setClubInfoList = function (clubInfoList) {
        this.clubInfoList = clubInfoList;
    };
    ClubSystem.prototype.getClubInfoList = function () {
        return this.clubInfoList;
    };
    //公告
    ClubSystem.prototype.setNotice = function (notice) {
        this.updateClubNotice(notice);
        this.noticeText = notice;
    };
    ClubSystem.prototype.getNotice = function () {
        return this.noticeText;
    };
    //自己的申请列表
    ClubSystem.prototype.setLegionApplyList = function (myApplyList) {
        this.myApplyList = myApplyList;
    };
    ClubSystem.prototype.getLegionApplyList = function () {
        return this.myApplyList;
    };
    ClubSystem.prototype.updateApplyList = function (clubId) {
        return this.myApplyList;
    };
    //帮派成员信息
    ClubSystem.prototype.setClubMemberList = function (list) {
        this.memberListChange = true;
        this.clubMenberList = list;
    };
    ClubSystem.prototype.getClubMemberList = function (list) {
        if (this.memberListChange) {
            this.memberListChange = false;
            table_sort(this.clubMenberList, function (a, b) {
                if (a.post != b.post) {
                    return a.post - b.post;
                }
                else {
                    return b.zhanli - a.zhanli;
                }
            });
        }
        return this.clubMenberList;
    };
    ClubSystem.prototype.cleanClubMenberList = function (list) {
        this.clubMenberList = [];
    };
    ClubSystem.prototype.updateClubMenberList = function (info) {
        var index = null;
        for (var k in this.clubMenberList) {
            var v = this.clubMenberList[k];
            if (v.id == info.id) {
                index = k;
                break;
            }
        }
        if (index != null) {
            this.clubMenberList[index] = info;
        }
        this.memberListChange = true;
    };
    //帮派成员end
    ClubSystem.prototype.setApplyList = function (list) {
        //TLog.Debug("ClubSystem.setApplyList")
        this.applyList = null;
        var falg = false;
        var playerInfo = [];
        for (var _ in list) {
            var v = list[_];
            falg = false;
            for (var i in this.applyList) {
                var value = this.applyList[i];
                if (v.id == value.id) {
                    falg = true;
                }
            }
            if (falg == false) {
                JsUtil.arrayInstert(playerInfo, v);
            }
        }
        this.applyList = list;
        // if (playerInfo.length > 0) {
        // 	if (MsgSystem.isIconTypeExsit(IconMsgType.CLUB_APPLY) == false) {
        // 		let cbObj: IIconMsgCallBack = {
        // 			onIconMsgCallBack(id: number, userData): boolean {
        // 				let t: IDialogCallback = {
        // 					onDialogCallback(result: boolean, userData): void {
        // 						if (result) {
        // 							let wnd = WngMrg.getInstance().getWindow("ClubFrame")
        // 							wnd.showWithIndex(2)
        // 						}
        // 					}
        // 				}
        // 				let infoStr = Localize_cns("CONFIRM_PALYER_INVITATION1")
        // 				MsgSystem.confirmDialog(infoStr, t, userData)
        // 				return false;
        // 			}
        // 		}
        // 		MsgSystem.addIconMsg(cbObj, null, IconMsgType.CLUB_APPLY)
        // 	}
        // } else {
        // 	if(size_t(this.applyList) == 0)
        // 		MsgSystem.removeIconMsgByType(IconMsgType.CLUB_APPLY)
        // }
    };
    ClubSystem.prototype.getApplyList = function () {
        return this.applyList;
    };
    //////////////////////////
    //是否有权限
    ClubSystem.prototype.isHaveClubJurisdiction = function () {
        var roleInfo = ClubSystem.getInstance().getRoleClub(GetHeroProperty("id"));
        if (roleInfo == null) {
            return false;
        }
        if (roleInfo.post == opFactionOfficeOptions.LEADER || roleInfo.post == opFactionOfficeOptions.SUB_LEADER) {
            return true;
        }
        return false;
    };
    ClubSystem.prototype.getRoleClub = function (id) {
        var list = null;
        for (var i in this.clubMenberList) {
            var v = this.clubMenberList[i];
            if (id == v.id) {
                list = v;
                break;
            }
        }
        return list;
    };
    ////////////////
    //活跃信息
    ClubSystem.prototype.setClubActiveInfo = function (activeLevel, activeExp, taskData) {
        this.activeData = {};
        this.activeData.level = activeLevel;
        this.activeData.exp = activeExp;
        this.activeData.taskData = taskData; //taskData{index=0}
    };
    ClubSystem.prototype.getClubActiveInfo = function () {
        return this.activeData;
    };
    ClubSystem.prototype.setClubRenqiInfo = function (renqiExp, renqiCount, renqiRecord) {
        this.renqiData = {};
        this.renqiData.renqiExp = renqiExp;
        this.renqiData.renqiCount = renqiCount;
        this.renqiData.renqiRecord = renqiRecord;
    };
    ClubSystem.prototype.getClubRenqiInfo = function () {
        return this.renqiData;
    };
    //技能
    ClubSystem.prototype.setClubSkillInfo = function (level, index, force, list) {
        this.skillInfo = {};
        this.skillInfo.level = level;
        this.skillInfo.index = index;
        this.skillInfo.force = force;
        this.skillInfo.list = list;
    };
    ClubSystem.prototype.getClubSkillInfo = function () {
        return this.skillInfo;
    };
    ClubSystem.prototype.getClubSkillLimit = function () {
        return GameConfig.FactionExpConfig[this.curClubInfo.level].skillLevel;
    };
    ClubSystem.prototype.getClubSkillProperty = function (level, index) {
        return GameConfig.FactionSkillConfig[level]["effects" + index];
    };
    ClubSystem.prototype.getClubSkillConfig = function (level, property) {
        return GameConfig.FactionSkillConfig[level][property];
    };
    ClubSystem.prototype.getClubSkillSumProperty = function (level) {
        var effects = {};
        for (var i = 1; i <= 8; i++) {
            var effect = table_effect(this.getClubSkillProperty(level, i));
            table_effect_add(effects, effect);
        }
        return effects;
    };
    ClubSystem.prototype.setClubEnterForce = function (force) {
        this.enterForce = force;
    };
    ClubSystem.prototype.getClubEnterForce = function () {
        return this.enterForce || 0;
    };
    ClubSystem.prototype.isJoinClub = function () {
        var heroInfo = GetHeroPropertyInfo();
        return !(heroInfo == null || heroInfo["faction"] == 0);
    };
    ClubSystem.prototype.setClubEventInfo = function (record) {
        this.record = record;
    };
    ClubSystem.prototype.getClubEventInfo = function () {
        return this.record;
    };
    return ClubSystem;
}(BaseSystem));
__reflect(ClubSystem.prototype, "ClubSystem");
//# sourceMappingURL=ClubSystem.js.map