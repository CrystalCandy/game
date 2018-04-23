/*
作者:
    xuxian
	
创建时间：
   2013.3.5(周三)

意图：
   帮派信息

公共接口：
   
*/

class ClubMessageHandler extends MessageHandler{

public initObj(...args:any[]):void {

 	this.register(opCodes.G2C_FACTION_INFO_REFRESH,this.onRecvG2C_FACTION_INFO_REFRESH,this)		//帮派信息
 	this.register(opCodes.G2C_FACTION_INFO,this.onRecvG2C_FACTION_INFO,this)		                //帮派列表
 	this.register(opCodes.G2C_FACTION_APPLY_REFRESH,this.onRecvG2C_FACTION_APPLY_REFRESH,this)	//帮派申请列表
	//this.register(opCodes.G2C_FACTION_SINGLE_INFO,this.onRecvG2C_FACTION_SINGLE_INFO,this)	    //帮派某个帮派信息	
  //this.register(opCodes.G2C_FACTION_NOTICE,this.onRecvG2C_FACTION_NOTICE,this)	              //帮派公告	
  this.register(opCodes.G2C_FACTION_MEMBER_REFRESH,this.onRecvG2C_FACTION_MEMBER_REFRESH,this)//帮派成员列表	
  this.register(opCodes.G2C_FACTION_SINGLE_MEMBER_REFRESH,this.onRecvG2C_FACTION_SINGLE_MEMBER_REFRESH,this) //更新帮派成员列表	
  this.register(opCodes.G2C_FACTION_SKILLS_REFRESH,this.onRecvG2C_FACTION_SKILLS_REFRESH,this) //更新帮派研究技能
  this.register(opCodes.G2C_FACTION_INTRODUCTION,this.onRecvG2C_FACTION_INTRODUCTION,this) //更新帮派介绍
  this.register(opCodes.G2C_FACTION_SELF_UPDATE,this.onRecvG2C_FACTION_SELF_UPDATE,this) //更新个人帮派信息
  this.register(opCodes.G2C_ROLE_APPLY_FACTION_LIST,this.onRecvG2C_ROLE_APPLY_FACTION_LIST,this) //帮派申请列表
  this.register(opCodes.G2C_FACTION_ITEM_CHOOSE,this.onRecvG2C_FACTION_ITEM_CHOOSE,this) //团长分配返回
  //this.register(opCodes.G2C_FACTION_WAREHOUSE_APPLY,this.onRecvG2C_FACTION_WAREHOUSE_APPLY,this) //帮派申请返回
  //this.register(opCodes.G2C_FACTION_WAREHOUSE_CANCEL,this.onRecvG2C_FACTION_WAREHOUSE_CANCEL,this) //帮派取消申请返回
  this.register(opCodes.G2C_FACTION_ALLOCA_RECORD,this.onRecvG2C_FACTION_ALLOCA_RECORD,this) //帮派仓库分配记录
  //this.register(opCodes.G2C_FACTION_BUY_RECORD,this.onRecvG2C_FACTION_BUY_RECORD,this) //帮派仓库购买记录
  
  this.register(opCodes.G2C_FACTION_WAREHOUSE_LIST, 		this.onRecvG2C_FACTION_WAREHOUSE_LIST, this)			//军团仓库装备
  this.register(opCodes.G2C_FACTIONWAR_AUTO_APPLY, 		this.onRecvG2C_FACTIONWAR_AUTO_APPLY, this)			//公会战自动报名

  this.register(opCodes.G2C_FACTION_TASK_POINT_RANK, 		this.onRecvG2C_FACTION_TASK_POINT_RANK, this)	//公会任务积分排行返回
  this.register(opCodes.G2C_FACTION_TASK_INFO_LIST, 		this.onRecvG2C_FACTION_TASK_INFO_LIST, this)	//公会任务列表返回
  this.register(opCodes.G2C_FACTION_TASK_INFO_UPDATA, 		this.onRecvG2C_FACTION_TASK_INFO_UPDATA, this)	//公会单条任务更新
  this.register(opCodes.G2C_FACTION_TASK_RANK_INFO, 		this.onRecvG2C_FACTION_TASK_RANK_INFO, this)	//公会任务本周累计积分
  //this.register(opCodes.G2C_FACTION_TREASURE_LIST, 			this.onRecvG2C_FACTION_TREASURE_LIST, this)	//公会任务藏宝阁列表
  this.register(opCodes.G2C_FACTION_TREA_HOUSE_RECORD, 		this.onRecvG2C_FACTION_TREA_HOUSE_RECORD, this)	//公会任务藏宝阁分配记录
  this.register(opCodes.G2C_FACTION_TASK_RANK_PRIZE, 			this.onRecvG2C_FACTION_TASK_RANK_PRIZE, this)	//公会任务结算排行


	////军团战
	//this.register(opCodes.G2C_FACTIONWAR_APPLY,this.onRecvG2C_FACTIONWAR_APPLY,this) //军团战报名返回
	//this.register(opCodes.G2C_FACTIONWAR_QUEUE_APPLY,this.onRecvG2C_FACTIONWAR_QUEUE_APPLY,this) //军团战报名返回
	//this.register(opCodes.G2C_FACTIONWAR_QUEUE_READY,this.onRecvG2C_FACTIONWAR_QUEUE_READY,this) //准备
	//this.register(opCodes.G2C_FACTIONWAR_ENTER,this.onRecvG2C_FACTIONWAR_ENTER,this) //进入地图
	//this.register(opCodes.G2C_FACTIONWAR_LEAVE,this.onRecvG2C_FACTIONWAR_LEAVE,this) //离开地图
	//this.register(opCodes.G2C_FACTIONWAR_QUERY_STAGE,this.onRecvG2C_FACTIONWAR_QUERY_STAGE,this) //查询状态
	//this.register(opCodes.G2C_FACTIONWAR_QUERY_SCORES,this.onRecvG2C_FACTIONWAR_QUERY_SCORES,this) //查询状态
	//this.register(opCodes.G2C_FACTIONWAR_QUERY_FINAL,this.onRecvG2C_FACTIONWAR_QUERY_FINAL,this) //查询状态
	//this.register(opCodes.G2C_FACTIONWAR_QUERY_ALL_SCORES,this.onRecvG2C_FACTIONWAR_QUERY_ALL_SCORES,this) //查询状态
	//this.register(opCodes.G2C_FACTIONWAR_FLAG,this.onRecvG2C_FACTIONWAR_FLAG,this) //旗帜膜拜
	//this.register(opCodes.G2C_FACTIONWAR_QUERY_FLAG,this.onRecvG2C_FACTIONWAR_QUERY_FLAG,this) //旗帜信息
	//this.register(opCodes.G2C_FACTIONWAR_SENIOR_START, this.onRecvG2C_FACTIONWAR_SENIOR_START, this)	//精英赛开始时间
	//
	////////-军团联盟
	//this.register(opCodes.G2C_APPLY_ADD_UNION,this.onRecvG2C_APPLY_ADD_UNION,this) //申请军团联盟
	//this.register(opCodes.G2C_AGREEN_ADD_UNION,this.onRecvG2C_AGREEN_ADD_UNION,this) //同意联盟
	//this.register(opCodes.G2C_REFUSE_ADD_UNION,this.onRecvG2C_REFUSE_ADD_UNION,this) //拒绝联盟
	//this.register(opCodes.G2C_LEAVE_UNION,this.onRecvG2C_LEAVE_UNION,this) //拒绝联盟
	//this.register(opCodes.G2C_UNION_INFO,this.onRecvG2C_UNION_INFO,this) //拒绝联盟
  //
  //
	////////军团建筑
	//this.register(opCodes.G2C_FACTION_BUILD_INFO,this.onRecvG2C_FACTION_BUILD_INFO ,this)    //军团建筑信息
	//this.register(opCodes.G2C_FACTION_BUILD_POINT,this.onRecvG2C_FACTION_BUILD_POINT  ,this)  //军团建筑积分
	//
	////////军团技能
	//this.register(opCodes.G2C_FACTION_SKILL_INFO,this.onRecvG2C_FACTION_SKILL_INFO,this)    //军团技能等级信息
  // 
	//
  //
	////联盟战
	//this.register(opCodes.G2C_UNIONPVP_GROUP_INFO,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_MY_NODE_SCORE_LIST,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_BOTH_NODE_SCORE_LIST,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_SCORE,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_ENTER,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_GAME_STAGE,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_LEAVE,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_FLAG_INFO,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_ROOM_INDEX,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_FAIRY_GUARD_LIST,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_SECOND_FIGHT_INFO,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//this.register(opCodes.G2C_UNIONPVP_SECOND_ALL_INFO,this.onRecvG2C_UNION_WAE_MESSAGE  ,this)  //军团建筑积分
	//
	////军团联盟PVE
	//this.register(opCodes.G2C_UNIONMTX_CREATE ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //开启阵眼返回
	//this.register(opCodes.G2C_UNIONMTX_ENTER ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //开启灵阵返回
	//this.register(opCodes.G2C_UNIONMTX_LEAVE ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //离开阵眼返回
	//this.register(opCodes.G2C_UNIONMTX_QUERY ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询灵阵开启状态
	//this.register(opCodes.G2C_UNIONMTX_QUERY_MTX ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询阵眼开启状态
	//this.register(opCodes.G2C_UNIONMTX_QUERY_TCH ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询强化师状态
	//this.register(opCodes.G2C_UNIONMTX_QUERY_BOSS ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询Boss
	//this.register(opCodes.G2C_UNIONMTX_RANKDATA ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询排行信息
	//this.register(opCodes.G2C_UNIONMTX_PROMOTE_MCH ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //提升福利机器
	//this.register(opCodes.G2C_UNIONMTX_QUERY_MCH ,this.onRecvG2C_UNIONMTX_MESSAGE  ,this)  //查询福利机器
	//this.register(opCodes.G2C_UNIONMTX_QUERY_SRANK ,this.onRecvG2C_UNIONMTX_MESSAGE ,this)  //全服排名信息
	//
	////军团任务
	//this.register(opCodes.G2C_FACTION_ITEM_TASK_REQUEST ,this.onRecvCLUB_MESSAGE ,this)  //全服排名信息
	//this.register(opCodes.G2C_FACTION_TASK_COUNT_RANK ,this.onRecvCLUB_MESSAGE ,this)  //全服排名信息
	//this.register(opCodes.G2C_FACTION_PUB_POOL ,this.onRecvCLUB_MESSAGE ,this)  //发布任务列表
	//this.register(opCodes.G2C_FACTION_PUB_TASK_REQUEST ,this.onRecvCLUB_MESSAGE ,this)  //发布任务列表
	//this.register(opCodes.G2C_FACTION_PUB_TASK_COUNT ,this.onRecvCLUB_MESSAGE ,this)  //发布任务列表
	//	
	////军团红包
	//this.register(opCodes.G2C_RED_ENVELOPE_LIST ,this.onRecvCLUB_MESSAGE ,this)  //全服排名信息
	//this.register(opCodes.G2C_RED_ENVELOPE_RECORD ,this.onRecvCLUB_MESSAGE ,this)  //全服排名信息
	
}

onRecvG2C_ROLE_APPLY_FACTION_LIST( dispatcher, message){
	//ClubSystem.getInstance().setLegionApplyList(message.apply_list)
		FireEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, ClubMyApplyListEvent.newObj(message.apply_list))
}

onRecvG2C_FACTION_SELF_UPDATE( dispatcher, message){
	//ClubSystem.getInstance().setRoleClubInfo(message.clubId,message.clubName,message.clubPost,message.clubUnit)
	FireEvent(EventDefine.UPDATE_CLUB_MEINFO, ClubSelfUpdateEvent.newObj(message.clubId,message.clubName,message.clubPost))
}

onRecvG2C_FACTION_INTRODUCTION( dispatcher, message){
	//获取公会信息
	ClubSystem.getInstance().onUpdateIntro(message.strTarget,message.legionID)
}

onRecvG2C_FACTION_INFO_REFRESH( dispatcher, message){
	 ClubSystem.getInstance().setCurClubInfo(message.clubInfo)
		FireEvent(EventDefine.GET_CLUB_INFO, null)
}

onRecvG2C_FACTION_INFO( dispatcher, message){
		//ClubSystem.getInstance().setClubList(message.clubSampleInfoList)	
		FireEvent(EventDefine.GET_CLUB_LIST, ClubListEvent.newObj(message.clubInfoList))
}

onRecvG2C_FACTION_APPLY_REFRESH( dispatcher, message){
	ClubSystem.getInstance().setApplyList(message.applyList)		
	FireEvent(EventDefine.GET_CLUB_APPLY_LIST, null)
}

//onRecvG2C_FACTION_SINGLE_INFO( dispatcher, message){
//	ClubSystem.getInstance().addClubSingleList(message.clubSingleInfo)
//	  FireEvent(EventDefine.GET_CLUB_SINGLE_INFO, null)
//	  
//}

//onRecvG2C_FACTION_NOTICE( dispatcher, message){
// 		//ClubSystem.getInstance().setNotice(message.notice)	
//   	FireEvent(EventDefine.UPDATE_CLUB_NOTICE, null)
//}

onRecvG2C_FACTION_MEMBER_REFRESH( dispatcher, message){
	ClubSystem.getInstance().setClubMenberList(message.menberList)
   	FireEvent(EventDefine.GET_CLUB_MENBER_LIST, null)
}

onRecvG2C_FACTION_SINGLE_MEMBER_REFRESH( dispatcher, message){
	TLog.Debug("ClubMessageHandler.onRecvG2C_FACTION_SINGLE_MEMBER_REFRESH")
	//TLog.Debug_r(message.clubRoleInfo)
	 ClubSystem.getInstance().updateClubMenberList(message.clubRoleInfo)
   FireEvent(EventDefine.GET_CLUB_MENBER_LIST, null)
}



onRecvG2C_FACTION_SKILLS_REFRESH( dispatcher, message){
    // ClubSystem.getInstance(). setStudySkillList(message.studySkillList)
    // FireEvent(EventDefine.GET_CLUB_STUDY_SKILL_LIST, null)
}

////////////////////////////////////////////////////////////////////-
//-团长分配物品返回
onRecvG2C_FACTION_ITEM_CHOOSE( dispatcher, message){
    //ClubSystem.getInstance(). setSendItemTime(message.Times)
   	FireEvent(EventDefine.CLUB_CHOOSE_ITEM,  ItemEvent.newObj(message.itemId))
}

////////////////////////////////////////////////////////////////////-
//-申请物品返回
//onRecvG2C_FACTION_WAREHOUSE_APPLY( dispatcher, message){
//   	FireEvent(EventDefine.CLUB_SEND_APPLY_ITEM, ItemEvent.newObj(message.itemId))
//}

////////////////////////////////////////////////////////////////////-
//-取消申请物品返回
//onRecvG2C_FACTION_WAREHOUSE_CANCEL( dispatcher, message){
//   	FireEvent(EventDefine.CLUB_SEND_CANCEL_APPLY_ITEM, ItemEvent.newObj(message.itemId))
//}

//-帮派仓库分配记录
onRecvG2C_FACTION_ALLOCA_RECORD( dispatcher, message){
	//ClubSystem.getInstance().setAllotRecord(message.allotRecordList)
	FireEvent(EventDefine.REFRESH_ALLOR_RECORD,NetMessageEvent.newObj(message))
}


//-帮派仓库购买记录
// onRecvG2C_FACTION_BUY_RECORD( dispatcher, message){
// 	//ClubSystem.getInstance().setBuyRecord(message.buyRecordList)
// 	FireEvent(EventDefine.REFRESH_BUYGOODS_RECORD,NetMessageEvent.newObj(message))
// }


//-军团仓库物品
onRecvG2C_FACTION_WAREHOUSE_LIST( dispatcher, message){
		//ItemSystem.getInstance().setLegionWarehouse(message.list)
		FireEvent(EventDefine.CLUB_REPO_UPDATE,NetMessageEvent.newObj(message))
}








////////////////////////////-军团战////////////////-
// onRecvG2C_FACTIONWAR_APPLY( dispatcher, message){
// 	//let activity = GetActivity(ActivityDefine.LegionWarfare)
// 	//activity.updateMessageHandler(message)
// 	MsgSystem.addTagTips(Localize_cns("LEGION_WARFARE_CONTENT41"))
// 	FireEvent(EventDefine.LEGION_WARFARE_APPLY,null)
// }

// // onRecvG2C_FACTIONWAR_QUEUE_APPLY( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setApplyList(message.applyList)
// // 	FireEvent(EventDefine.LEGION_WARFARE_APPLY_LIST,null)
// // }

// // onRecvG2C_FACTIONWAR_QUEUE_READY( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setReadyInfo(message.readyInfo)
// // 	FireEvent(EventDefine.LEGION_WARFARE_READY_INFO,null)
// // }

// // onRecvG2C_FACTIONWAR_ENTER( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	FireEvent(EventDefine.LEGION_WARFARE_ENTER_MAP,null)
// // }

// // onRecvG2C_FACTIONWAR_LEAVE( dispatcher, message){
// // 	//let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	FireEvent(EventDefine.LEGION_WARFARE_LEAVE_MAP,null)
// // }
// // onRecvG2C_FACTIONWAR_QUERY_STAGE( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setCurLegionWarStatus(message.curLegionStatus,message.nexStatusTime)	
// // 	FireEvent(EventDefine.LEGION_WARFARE_GET_STATUS,null)	
// // }
// // onRecvG2C_FACTIONWAR_QUERY_SCORES( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setScoresInfoList(message.infoList)	
// // 	FireEvent(EventDefine.LEGION_WARFARE_SCORES_LIST,null)	
// // }
// // onRecvG2C_FACTIONWAR_QUERY_FINAL( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setChampionInfoList(message.championInfoList)	
// // 	FireEvent(EventDefine.LEGION_WARFARE_CHAMPION_INFO,null)	
// // }

// // onRecvG2C_FACTIONWAR_QUERY_ALL_SCORES( dispatcher, message){
// // 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// // 	activity.setLegionScoreList(message.legionMemberScoreList)	
// // 	FireEvent(EventDefine.LEGION_WARFARE_LEGION_SCORE_LIST,null)	
// // }

// onRecvG2C_FACTIONWAR_FLAG( dispatcher, message){
// 	//let activity = GetActivity(ActivityDefine.LegionWarfare)
// 	//activity.setLegionScoreList(message.legionMemberScoreList)
// 	if(message.returnIndex == 1 ){
// 		MsgSystem.addTagTips(Localize_cns("LEGION_WARFARE_CONTENT47"))
// 		WngMrg.getInstance().hideWindow("LegionWarfareChampionFrame")
		
// 	}else{
// 		MsgSystem.addTagTips(Localize_cns("LEGION_WARFARE_CONTENT46"))
// 	}	
// 	FireEvent(EventDefine.LEGION_WARFARE_FLAG_ADD_RETURN,null)	
// }
// onRecvG2C_FACTIONWAR_QUERY_FLAG( dispatcher, message){
// 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// 	activity.setFlagInfo(message.flagInfo)	
// 	activity.showFlagWnd()	
// 	FireEvent(EventDefine.LEGION_WARFARE_FLAG_INFO,null)	
// }

// onRecvG2C_FACTIONWAR_SENIOR_START( dispatcher, message){
// 	let activity = GetActivity(ActivityDefine.LegionWarfare)
// 	activity.updateSeniorTime(message.seniorTime)
// }

// onRecvG2C_APPLY_ADD_UNION( dispatcher, message){
// 	FireEvent(EventDefine.FACTION_UNION_APPLY,FactionUnionApplyEvent.newObj(message.unionFactionID,message.unionFactionName,message.unionFactionMemberCount,message.unionFactionLevel))	
// }
// onRecvG2C_REFUSE_ADD_UNION( dispatcher, message){
	
// }
// onRecvG2C_AGREEN_ADD_UNION( dispatcher, message){
// 	FireEvent(EventDefine.FACTION_UNION_ENTER,null)	
// }
// onRecvG2C_LEAVE_UNION( dispatcher, message){
// 	FireEvent(EventDefine.FACTION_UNION_LEVEL,null)	
// }
// onRecvG2C_UNION_INFO( dispatcher, message){
// 	ClubSystem.getInstance().SetMyUnionInfo(message.myUnionInfo)
// 	FireEvent(EventDefine.FACTION_UNION_UPDATE,null)	
// }

// onRecvG2C_FACTION_BUILD_INFO( dispatcher, message){
// 	ClubSystem.getInstance().setFactionBuildInfo(message.list)
// 	//TLog.Debug_r(message)
// 	//io.read()
// 	//TLog.Debug("EventDefine.FACTION_BUILD_REFRESH")
// 	FireEvent(EventDefine.FACTION_BUILD_REFRESH,null)	
// }
// onRecvG2C_FACTION_BUILD_POINT( dispatcher, message){
// 	ClubSystem.getInstance().setFactionPoint(message.buildPoint)
// 	//TLog.Debug_r(message)
// 	//io.read()
// 	//TLog.Debug("EventDefine.FACTION_BUILD_POINT")
// 	FireEvent(EventDefine.FACTION_BUILD_POINT,null)
// }

// onRecvG2C_FACTION_SKILL_INFO( dispatcher,message){
//    ClubSystem.getInstance().setFactionSkillInfo(message.list)
//    ClubSystem.getInstance().setFactionScoreInfo(message.pointRecord)
//   //ClubSystem.getInstance().setFactionBuildInfo(message.pointRecord)
// 	//TLog.Debug_r(message)
// 	FireEvent(EventDefine.FACTION_SKILL_REFRESH,null)
// 	FireEvent(EventDefine.FACTION_SCORE_REFRESH,null)
// }
// onRecvG2C_UNION_WAE_MESSAGE( dispatcher, message){
// 	let activity = GetActivity(ActivityDefine.UnionWar)
// 	activity.updateMessageHandler(message)
// }

// onRecvG2C_UNIONMTX_MESSAGE( dispatcher, message){
// 	let activity = GetActivity(ActivityDefine.UnionPVE)
// 	activity.updateMessageHandler(message)
// }

onRecvCLUB_MESSAGE( dispatcher, message){
	ClubSystem.getInstance().updateMessageHandler(message)
}

onRecvG2C_FACTIONWAR_AUTO_APPLY( dispatcher, message){
	ClubSystem.getInstance().setAutoApplyStatus(message.autoStatus)
	FireEvent(EventDefine.FACWAR_AUTO_APPLY_STATUS,null)
}


//////////////////////////////////////

onRecvG2C_FACTION_TASK_POINT_RANK( dispatcher, message){
	FireEvent(EventDefine.FAC_TASK_POINT_RANK_UPDATE, NetMessageEvent.newObj(message))
}

onRecvG2C_FACTION_TASK_INFO_LIST( dispatcher, message){
	ClubSystem.getInstance().setFacTaskList(message.taskList)
	FireEvent(EventDefine.FAC_TASK_LIST_UPDATE, NetMessageEvent.newObj(message))
}

onRecvG2C_FACTION_TASK_INFO_UPDATA( dispatcher, message){
	FireEvent(EventDefine.FAC_TASK_ONE_UPDATE, NetMessageEvent.newObj(message))
}

onRecvG2C_FACTION_TASK_RANK_INFO( dispatcher, message){
	FireEvent(EventDefine.FAC_TASK_WEEK_POINT_UPDATE, NetMessageEvent.newObj(message))
}

// onRecvG2C_FACTION_TREASURE_LIST( dispatcher, message){
// 	ClubSystem.getInstance().setFacTaskTreasureList(message.treasureList)
// 	FireEvent(EventDefine.FAC_TASK_TREASURE_LIST_UPDATE, null)
// 	let wnd = WngMrg.getInstance().getWindow("ClubComptTreasureFrame")
// 	if(wnd.isVisible() == false ){
// 		wnd.showWnd()
// 	}
// }

onRecvG2C_FACTION_TREA_HOUSE_RECORD( dispatcher, message){
	FireEvent(EventDefine.FAC_TASK_TREA_RECORD_UPDATE, NetMessageEvent.newObj(message))
}

onRecvG2C_FACTION_TASK_RANK_PRIZE( dispatcher, message){
	FireEvent(EventDefine.FAC_TASK_RANK_RESULT_LIST, NetMessageEvent.newObj(message) )
}

}