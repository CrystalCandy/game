// /*
// 作者:
//     xiezebiao
// 创建时间：
//    2013.8.26(周一)
// 意图：   
// 公共接口：
// */
// class TeamMessageHandler extends MessageHandler implements IDialogCallback {
//     dialogCount
//     public initObj(...args: any[]): void {
//         this.register(opCodes.G2C_TEAM_INVITE, this.onRecvG2C_TEAM_INVITE, this) //收到邀请
//         this.register(opCodes.G2C_TEAM_UPDATE, this.onRecvG2C_TEAM_UPDATE, this) //队伍更新信息
//         this.register(opCodes.G2C_TEAM_APPLY, this.onRecvG2C_TEAM_APPLY, this) //申请入队
//         this.register(opCodes.G2C_TEAM_LEAVE, this.onRecvG2C_TEAM_LEAVE, this) //组队成员退出队伍
//         this.register(opCodes.G2C_TEAM_DISBAND, this.onRecvG2C_TEAM_DISBAND, this) //解散队伍
//         this.register(opCodes.G2C_TEAM_MEMBER_OFFLINE, this.onRecvG2C_TEAM_MEMBER_OFFLINE, this) //队员离线
//         this.register(opCodes.G2C_TEAM_MEMBER_ONLINE, this.onRecvG2C_TEAM_MEMBER_ONLINE, this) //队员上线
//         this.register(opCodes.G2C_TEAM_ACTIVITY_QUERY, this.onRecvG2C_TEAM_ACTIVITY_QUERY, this) //队伍列表返回
//         this.register(opCodes.G2C_TEAM_QUEUE, this.onRecvG2C_G2C_TEAM_QUEUE, this) //战斗队列返回	
//         this.register(opCodes.G2C_TEAM_SPACE_MOVE, this.onRecvG2C_TEAM_SPACE_MOVE, this) //队长移动返回
//         this.register(opCodes.G2C_TEAM_MEMBER_NOTICE, this.onRecvG2C_TEAM_MEMBER_NOTICE, this) //队长通知队员
//         // this.register(opCodes.G2C_SKYTOWER_INVITE_LIST, this.onRecvG2C_SKYTOWER_INVITE_LIST, this) //队长通知队员
//         // this.register(opCodes.G2C_DEAD_FIELD_PERSONAL_INVITE_LIST, this.onRecvG2C_DEAD_FIELD_PERSONAL_INVITE_LIST, this) //队长通知队员
//         this.register(opCodes.G2C_TEAM_ACTIVITY_DATA, this.onRecvG2C_TEAM_ACTIVITY_DATA, this) //队长通知队员
//         this.register(opCodes.G2C_COMBATTEAM_QUERY_ALL, this.onRecvG2C_COMBATTEAM_QUERY_ALL, this) //战队列表
//         this.register(opCodes.G2C_COMBATTEAM_APPLY_LIST, this.onRecvG2C_COMBATTEAM_APPLY_LIST, this) //申请列表
//         this.register(opCodes.G2C_COMBATTEAM_QUERY_MEMBERS, this.onRecvG2C_COMBATTEAM_QUERY_MEMBERS, this) //成员列表
//         this.register(opCodes.G2C_COMBATTEAM_UPDATE_INFO, this.onRecvG2C_COMBATTEAM_UPDATE_INFO, this)   //团队信息更新
//         this.register(opCodes.G2C_COMBATTEAM_DEAL_INVITE, this.onRecvG2C_COMBATTEAM_DEAL_INVITE, this)   //接受骑士团邀请
//         this.register(opCodes.G2C_COMBATTEAM_EXPELEE, this.onRecvG2C_COMBATTEAM_EXPELEE, this)   //被开除
//         this.register(opCodes.G2C_COMBATTEAM_FETTERPRIZE_QUERY, this.onRecvG2C_COMBATTEAM_FETTERPRIZE_QUERY, this)   //羁绊奖励领取状态
//         this.register(opCodes.G2C_TEAM_WILL_TEAM_LIST,  this.onRecvG2C_TEAM_WILL_TEAM_LIST, this)   //组队意愿列表
//     }
//     onRecvG2C_TEAM_LEAVE(dispatcher, message) {
//         //TLog.Debug("TeamMessageHandler.onRecvG2C_TEAM_LEAVE",message.id)
//         let player = GetHeroPropertyInfo()
//         if (message.id == player.id) {
//             TeamSystem.getInstance().emptyTeamInfo()
//             //MsgSystem.addTagTips(Localize_cns("TEAM_TXT1"))	
//             FireEvent(EventDefine.TEAM_DISBAND, null)
//         } else {
//             let memberInfo = TeamSystem.getInstance().getMemberInfo(message.id)
//             if (memberInfo) {
//                 let str = String.format(Localize_cns("TEAM_TXT2"), memberInfo.name)
//                 MsgSystem.addTagTips(str)
//                 TeamSystem.getInstance().removeMember(message.id)
//                 FireEvent(EventDefine.TEAM_MEMBER_LEAVE, TeamMemberLeaveEvent.newObj(message.id))
//             }
//         }
//     }
//     onRecvG2C_TEAM_DISBAND(dispatcher, message) {
//         if (TeamSystem.getInstance().isCaptain()) {
//             MsgSystem.addTagTips(Localize_cns("TEAM_TXT3"))
//         } else {
//             MsgSystem.addTagTips(Localize_cns("TEAM_TXT4"))
//         }
//         TeamSystem.getInstance().emptyTeamInfo()
//         FireEvent(EventDefine.TEAM_DISBAND, null)
//     }
//     onRecvG2C_TEAM_APPLY(dispatcher, message) {
//         TeamSystem.getInstance().onRecvApplyMsg(message)
//     }
//     onRecvG2C_TEAM_UPDATE(dispatcher, message) {
//         let addTeam = true
//         if (TeamSystem.getInstance().isHaveTeam()) {
//             addTeam = false
//         }
//         TeamSystem.getInstance().setTeamInfo(message.team)
//         if (addTeam) {
//             //发送加入队伍事件
//             FireEvent(EventDefine.TEAM_ADD, TeamInfoUpdateEvent.newObj(message.team))
//         }
//         //TeamSystem.getInstance().showTeammateMark()
//         FireEvent(EventDefine.TEAM_INFO_UPDATE, TeamInfoUpdateEvent.newObj(message.team))
//     }
//     showInviteDialog(mem) {
//         let school, temp = StaticTexDefine.school2Text(mem.school)
//         let sex
//         if (mem.sex == genderOptions.MALE) {
//             sex = Localize_cns("TEAM_HER")
//         } else {
//             sex = Localize_cns("TEAM_HIM")
//         }
//         let str = (mem.name + "(" + school + " " + mem.level + Localize_cns("JI") + ")" + Localize_cns("TEAM_INVITE_YOU") + sex + Localize_cns("DE_DUI_WU"))
//         let t: any = {}
//         t.id = mem.id
//         t.cmd = 1
//         MsgSystem.confirmDialog(str, this, t)
//         this.dialogCount = 1
//         TeamSystem.getInstance().removeInviteMem(mem.id)
//     }
//     onRecvG2C_TEAM_INVITE(dispatcher, message) {
//         TLog.Debug("TeamMessageHandler.onRecvG2C_TEAM_INVITE", message.id, message.name, message.level)
//         //弹出是否接受邀请
//         if (TeamSystem.getInstance().getInviteInfoByPlayerID(message.id)) {
//             TLog.Debug("have return")
//             return
//         }
//         let info: any = {}
//         info.iconID = null
//         info.name = message.name
//         info.level = message.level
//         info.id = message.id
//         info.clearTimer = null
//         // if (GetHero().getHeroSpace() == "DAILY") {
//         //     info.layer = gui.Window.LayerEffect
//         // }
//         // let topWnd = gb.main.root_window.GetTopWindow()
//         // if (GetHero().getHeroSpace() == "DAILY" && topWnd && topWnd.GetName() != "SkyTowerFrame") {
//         //     TeamSystem.getInstance().addMsgToWaitList(info)
//         //     return
//         // }
//         let cbObj: IIconMsgCallBack = {
//             onIconMsgCallBack(id: number, userData): boolean {			//红点处理
//                 let t: IDialogCallback = {
//                     onDialogCallback(result: boolean, userData): void {		//消息框处理
//                         if (TeamSystem.getInstance().isHaveTeam()) {
//                             MsgSystem.addTagTips(Localize_cns("TEAM_TXT7"))
//                         } else {
//                             let msg = GetMessage(opCodes.C2G_TEAM_REPLY_INVITE)
//                             msg.id = userData.id
//                             if (result) {
//                                 msg.result = teamAccept.OK
//                                 //let wnd = WngMrg.getInstance().getWindow("TeamMainMenuFrame")	
//                                 //wnd.showWnd()
//                             } else {
//                                 msg.result = teamAccept.REJECT
//                             }
//                             SendGameMessage(msg)
//                         }
//                         //if(userData.clearTimer ){
//                         //	KillTimer(userData.clearTimer)
//                         //	userData.clearTimer = null
//                         //}
//                         TeamSystem.getInstance().removeInviteInfo(userData)
//                     }
//                 }
//                 // t.function DialogShowCallBack(t, dialog, userData){
//                 //     //dialog.setOkText(Localize_cns("TEAM_TXT8"))
//                 //     //dialog.setCancelText(Localize_cns("TEAM_TXT9") )
//                 // }
//                 let name = userData.name
//                 let lv = userData.level
//                 MsgSystem.confirmDialog(String.format(Localize_cns("TEAM_TXT39"), name, lv), t, userData)
//                 return true;
//             }
//         }
//         let event = TeamInviteInfo.newObj(cbObj, info)
//         FireEvent(EventDefine.TEAM_RECEIVE_INVITE, event)
//         if (event.handle == 0) {	//没有外部处理
//             info.iconID = MsgSystem.addIconMsg(cbObj, info, IconMsgType.TEAM_INVITE)
//             TeamSystem.getInstance().addInviteInfo(info)
//         }
//     }
//     onDialogCallback(result: boolean, userData): void {
//         if (userData.cmd == 1) {
//             let message = GetMessage(opCodes.C2G_TEAM_REPLY_INVITE)
//             message.id = userData.id
//             if (result == true) {
//                 message.result = teamAccept.OK
//                 this.dialogCount = null
//                 TeamSystem.getInstance().clearInviteMem()
//             } else {
//                 message.result = teamAccept.REJECT
//                 let mem = TeamSystem.getInstance().getFirstInviteMem()
//                 if (mem) {
//                     this.showInviteDialog(mem)
//                 } else {
//                     this.dialogCount = null
//                 }
//             }
//             SendGameMessage(message)
//         } else if (userData.cmd == 2) {
//             if (result == true) {
//                 let message = GetMessage(opCodes.C2G_TEAM_FAR_BACK)
//                 SendGameMessage(message)
//             }
//         } else if (userData.cmd == 3) {
//             if (result == true) {
//                 let message = GetMessage(opCodes.C2G_TEAM_BACK)
//                 SendGameMessage(message)
//             }
//         } else if (userData.cmd == 4) {
//             let message = GetMessage(opCodes.C2G_TEAM_TEAMMATE_INVITE)
//             message.inviterId = userData.inviteId
//             message.invitedId = userData.invitedId
//             if (result == true) {
//                 message.result = teamAccept.OK
//             } else {
//                 message.result = teamAccept.REJECT
//             }
//             SendGameMessage(message)
//         }
//     }
//     //队员离线
//     onRecvG2C_TEAM_MEMBER_OFFLINE(dispatcher, message) {
//         //TLog.Debug("TeamMessageHandler.onRecvG2C_TEAM_MEMBER_OFFLINE")	
//         let playerInfo: any = { ["id"]: message.id, ["status"]: ConfigTeamMemberStatus.OFFLINE }
//         TeamSystem.getInstance().setMemberInfo(playerInfo)
//         let name = TeamSystem.getInstance().getMemberInfo(playerInfo.id).name
//         let tipsStr = String.format(Localize_cns("TEAM_TXT10"), name, playerInfo.id)
//         MsgSystem.addTagTips(tipsStr)
//         FireEvent(EventDefine.TEAM_MEMBER_UPDATE, null)
//     }
//     //队员上线
//     onRecvG2C_TEAM_MEMBER_ONLINE(dispatcher, message) {
//         //TLog.Debug("TeamMessageHandler.onRecvG2C_TEAM_MEMBER_ONLINE")
//         if(! TeamSystem.getInstance().getMemberInfo(message.id) ){
//             TLog.Error("TeamMessageHandler.onRecvG2C_TEAM_MEMBER_ONLINE Member %s is NULL!", message.id)
//             return
//         }
//         let playerInfo: any = { ["id"]: message.id, ["status"]: ConfigTeamMemberStatus.ONLINE }
//         TeamSystem.getInstance().setMemberInfo(playerInfo)
//         let name = TeamSystem.getInstance().getMemberInfo(playerInfo.id).name
//         let tipsStr = String.format(Localize_cns("TEAM_TXT11"), name, playerInfo.id)
//         MsgSystem.addTagTips(tipsStr)
//         FireEvent(EventDefine.TEAM_MEMBER_UPDATE, null)
//     }
//     //队伍列表返回
//     onRecvG2C_TEAM_ACTIVITY_QUERY(dispatcher, message) {
//         TeamSystem.getInstance().setTeamList(message)
//         FireEvent(EventDefine.TEAM_ACTIVITY_QUERY, null)
//     }
//     //设置战斗队列返回
//     onRecvG2C_G2C_TEAM_QUEUE(dispatcher, message) {
//         TeamSystem.getInstance().setMemberDefense(message.teamDefenseQueue)
//         FireEvent(EventDefine.G2C_TEAM_COMBAT_QUEUE, null)
//     }
//     //队长移动返回
//     onRecvG2C_TEAM_SPACE_MOVE(dispatcher, message) {
//         //TLog.Debug("TeamMessageHandler.onRecvG2C_TEAM_SPACE_MOVE",message.x,message.y)
//         //FireEvent(EventDefine.TEAM_SPACE_MOVE,MessageMoveEvent.newObj(message.plrId, message.mapId, message.x,message.y))
//         TeamSystem.getInstance().updateCaptainPos(message.plrId, message.mapId, message.x, message.y)
//     }
//     //队长通知队员
//     onRecvG2C_TEAM_MEMBER_NOTICE(dispatcher, message) {
//         FireEvent(EventDefine.TEAM_MEMBER_NOTICE, TeamMemberNoticeEvent.newObj(message.key, message.value))
//     }
//     //天空之塔邀请列表返回
//     // onRecvG2C_SKYTOWER_INVITE_LIST(dispatcher, message) {
//     //     TeamSystem.getInstance().setSkytowerInviteList(message.inviteList)
//     //     FireEvent(EventDefine.SKYTOWER_INVITE_LIST, SkytowerInviteListEvent.newObj(message.inviteList))
//     // }
//     // //天空之塔邀请列表返回
//     // onRecvG2C_DEAD_FIELD_PERSONAL_INVITE_LIST(dispatcher, message) {
//     //     TeamSystem.getInstance().setSkytowerInviteList(message.inviteList, ConfigTeamStatus.ACTIVITY_3)
//     //     FireEvent(EventDefine.SKYTOWER_INVITE_LIST, SkytowerInviteListEvent.newObj(message.inviteList, ConfigTeamStatus.ACTIVITY_3))
//     // }
//     onRecvG2C_TEAM_ACTIVITY_DATA(dispatcher, message) {
//         //io.read()
//         //TeamSystem.getInstance().saveActivityData(message.activityType,message.dataList)
//         FireEvent(EventDefine.ACTIVITY_DATA_DISTRIBUTE, GameUserDataEvent.newObj([message.activityType, message.dataList]))
//     }
//     ////////////////////////////////////////血盟//////////////////////////////////////////////////////////////
//     onRecvG2C_COMBATTEAM_QUERY_ALL(dispatcher, message) {
//         FireEvent(EventDefine.QUERY_TEAM_LIST, QueryTeamListData.newObj(message.teamList))
//     }
//     onRecvG2C_COMBATTEAM_APPLY_LIST(dispatcher, message) {
//         TeamSystem.getInstance().setCombatTeamApplyList(message.applyList)
//         FireEvent(EventDefine.QUERY_APPLY_LIST, QueryApplyListData.newObj(message.applyList))
//     }
//     onRecvG2C_COMBATTEAM_QUERY_MEMBERS(dispatcher, message) {
//         TeamSystem.getInstance().setCombatTeamInfo(message.memberList)
//         FireEvent(EventDefine.QUERY_MEMBER_LIST, QueryMemberListData.newObj(message.memberList, message.totalFetters, message.teamName))
//     }
//     onRecvG2C_COMBATTEAM_UPDATE_INFO(dispatcher, message) {
//         FireEvent(EventDefine.VIP_TEAM_INFO_UPDATE,
//             VipTeamInfoUpdate.newObj(
//                 message.teamId,
//                 message.teamName,
//                 message.teamLeaderId,
//                 message.teamLeaderName,
//                 message.teamLeaderLevel,
//                 message.teamLeaderVipLevel,
//                 message.teamLeaderVocation,
//                 message.teamLeaderSex,
//                 message.teamMemberCount,
//                 message.teamLeaderForce
//             ))
//     }
//     onRecvG2C_COMBATTEAM_DEAL_INVITE(dispatcher, message) {
//         TLog.Debug("TeamMessageHandler.onRecvG2C_COMBATTEAM_DEAL_INVITE", message.id, message.name, message.level)
//         let info: any = {}
//         info.iconID = null
//         info.playerName = message.playerName
//         info.teamName = message.teamName
//         info.teamId = message.teamId
//         let cbObj: IIconMsgCallBack = {
//             onIconMsgCallBack(id: number, userData): boolean {			//红点处理
//                 let t: IDialogCallback = {
//                     onDialogCallback(result: boolean, userData): void {		//消息框处理
//                         if (result) {
//                             let message = GetMessage(opCodes.C2G_COMBATTEAM_DEAL_INVITE)
//                             message.combatTeamId = userData.teamId
//                             SendGameMessage(message)
//                         }
//                     }
//                 }
//                 // t.function DialogShowCallBack(t, dialog, userData){
//                 // 	dialog.setOkText(Localize_cns("TEAM_TXT8"))
//                 // 	dialog.setCancelText(Localize_cns("TEAM_TXT9") )
//                 // }
//                 let playerName = userData.playerName
//                 let teamName = userData.teamName
//                 let infoStr = String.format(Localize_cns("TEAM_TXT12"), teamName, playerName)
//                 MsgSystem.confirmDialog(infoStr, t, userData)
//                 return true;
//             }
//         }
//         info.iconID = MsgSystem.addIconMsg(cbObj, info, IconMsgType.TEAM_INVITE)
//     }
//     onRecvG2C_COMBATTEAM_EXPELEE(dispatcher, message) {
//         TeamSystem.getInstance().setCombatTeamInfo({})
//         FireEvent(EventDefine.QUERY_MEMBER_LIST, QueryMemberListData.newObj({}, ""))
//     }
//     onRecvG2C_COMBATTEAM_FETTERPRIZE_QUERY(dispatcher, message) {
//         FireEvent(EventDefine.QUERY_PRIZE_STATUS, PrizeStatusListData.newObj(message))
//     }
//      onRecvG2C_TEAM_WILL_TEAM_LIST(dispatcher, message) {
//         TeamSystem.getInstance().updateTeamWillList(message.actIndex, message.willList)
// 	    FireEvent(EventDefine.TEAM_WILL_LIST_UPDATE, null)
//     }
// } 
//# sourceMappingURL=TeamMessageHandler.js.map