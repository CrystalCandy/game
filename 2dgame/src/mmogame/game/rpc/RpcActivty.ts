// TypeScript file
module RpcLogic {
    // export function G2C_SweepBossActivity(activityIndex, npcIndex, commonPrize) {
    //     let activity = GetActivity(ActivityDefine.Boss)
    //     activity.updateMessageHandler()
    // }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //后台活动管理

    //后台活动开放列表
    export function G2C_SendOpenActivityList(activtList:number[]){
        ActivitySystem.getInstance().setOperateActivityOpenList(activtList)
		FireEvent(EventDefine.PAY_ACTIVITY_LIST, null);//NetMessageEvent.newObj(message.list))	
    } 


    //活动信息
    export function G2C_SendOperateData(index, activityData){// 1活动索引 2活动数据
       ActivitySystem.getInstance().setOperateActivityInfo(index, activityData)
		
		FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
    }


    //活动相关玩家信息
    export function G2C_SendOperatePlayerData(index, plrData){//1活动索引 2玩家数据
        ActivitySystem.getInstance().setOperatePlayerInfo(index, plrData)
        FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
    }

    export function G2C_SendOperateAndPlayerData(index, activityData, plrData){//1活动索引 2活动数据 3玩家数据
        ActivitySystem.getInstance().setOperateActivityInfo(index, activityData)
		ActivitySystem.getInstance().setOperatePlayerInfo(index, plrData)
		FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
    }   
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Boss
    export function G2C_GetBossActivityInfo(activityIndex, activityData) {
        let activity = GetActivity(ActivityDefine.Boss)
        activity.updateMessageHandler({index: activityIndex, data: activityData}, "G2C_GetBossActivityInfo")
    }

    export function G2C_GetBossIndexData(activityIndex, npcIndex, bossData) {
        let activity = GetActivity(ActivityDefine.Boss)
        activity.updateMessageHandler({index: activityIndex, bossIndex: npcIndex, data: bossData}, "G2C_GetBossIndexData")
    }


    //护送
    export function G2C_EscortList(message){
        TLog.Debug("===========G2C_EscortList")
        let activity = GetActivity(ActivityDefine.HuSong)
      
        activity.updateMessageHandler(message, "G2C_EscortList")
    }

     export function G2C_EnterEscortActivity(macheIndex, time, chengTwice, curPrize, robberRecord, husongTwice, lanjieTwice){  //进入返回 1当前护送索引，2过期时间戳，3橙色护送总次数, 4当前奖励，5被抢记录 6.护送次数,7,拦截次数
        TLog.Debug("===========G2C_EnterEscortActivity")
        let activity = GetActivity(ActivityDefine.HuSong)
        activity.updateMessageHandler({index: macheIndex, time: time, chengTwice: chengTwice, 
            curPrize : curPrize, robberRecord: robberRecord, husongTwice: husongTwice, lanjieTwice :lanjieTwice}, "G2C_EnterEscortActivity")
    }

     export function G2C_RandEscortIndex(index){
        TLog.Debug("===========G2C_RandEscortIndex")
        let activity = GetActivity(ActivityDefine.HuSong)
        activity.updateMessageHandler(index, "G2C_RandEscortIndex")
    }

     export function G2C_RobberEscortRecordList(list){
        TLog.Debug("===========G2C_RobberEscortRecordList")
        let activity = GetActivity(ActivityDefine.HuSong)
        activity.updateMessageHandler(list, "G2C_RobberEscortRecordList")
    }

    export function G2C_PutEscortPrizeInfo(list){
        TLog.Debug("===========G2C_PutEscortPrizeInfo")
        let activity = GetActivity(ActivityDefine.HuSong)
        activity.updateMessageHandler(list, "G2C_PutEscortPrizeInfo")
    }


    //-------日常
     export function G2C_MEIRISANBAI_MonsterNum(huan, state, isVip){
        TLog.Debug("===========G2C_MEIRISANBAI_MonsterNum")
        let activity = GetActivity(ActivityDefine.Boss)
        activity.updateMessageHandler({curhuan : huan , state : state, isVip : isVip}, "G2C_MEIRISANBAI_MonsterNum")
    }

     export function G2C_XiyouLilian_Info(level, curexp, force , taskData){ //1,等级  2,经验,  3,战力 4,taskData{type=当前次数}
        TLog.Debug("===========G2C_XiyouLilian_Info")
        let activity = GetActivity(ActivityDefine.Boss)
        activity.updateMessageHandler({level : level, curexp : curexp , force: force , taskList : taskData}, "G2C_XiyouLilian_Info") 
    }

    export function G2C_XiyouLilian_RecordInfo(taskData){ 
        TLog.Debug("===========G2C_XiyouLilian_RecordInfo")
        let activity = GetActivity(ActivityDefine.Boss)
        activity.updateMessageHandler(taskData, "G2C_XiyouLilian_RecordInfo") 
    }

     //-------月卡信息
    export function G2C_MonthCardInfo(overTime, isGet){
         PaySystem.getInstance().setMonthCardInfo(overTime,isGet)
         FireEvent(EventDefine.PAY_ACTIVITY_MONTH_CARD, null);
    }

    //-------周卡信息
    export function G2C_WeekCardInfo(overTime, isGet){
         PaySystem.getInstance().setWeekCardInfo(overTime,isGet)
         FireEvent(EventDefine.PAY_ACTIVITY_WEEK_CARD, null);
    }

    //-------抽奖信息
    export function G2C_OperateLotteryResult(index, info){
        ActivitySystem.getInstance().setOperateLotteryResultInfo(index, info)
        // let info = {"num" : n, "itemList": t}//月卡
        FireEvent(EventDefine.XUNBAO_UPDATE, null);
    }

    //西游福利
    export function G2C_XiyouWelfareInfo(level, playerInfo){
        ActivitySystem.getInstance().setXiyouWelfareInfo(level, playerInfo)
        FireEvent(EventDefine.XIYOU_WELFARE, null);
    }
    

    //结婚    //53 = J9   
    export function G2C_Proposal(id,name,type){
       let typeText = "#lime(jianpuqiuhun)#rf"
       let msg = String.format(Localize_cns("SANSHENG_TXT3"),name,typeText)
       let qiuhunId = id
       let _type = type
       var callback: IDialogCallback = {
		onDialogCallback(result: boolean, userData): void {
			if (result) {
                RpcProxy.call("C2G_PromiseMarry",qiuhunId,_type,1)
			}else{
                RpcProxy.call("C2G_PromiseMarry",qiuhunId,_type,0)
            }
	    }
        }
        MsgSystem.confirmDialog(msg, callback, null)
    }

    //结婚响应
    export function G2C_PromiseMarry(name1,name2){
        //判断两个界面是否存在 存在关闭 SanShengSanShiFrame ProposeFrame
        let wnd = WngMrg.getInstance().getWindow("ProposeFrame")
		if (wnd.isVisible()) {
            wnd.hideWnd()
		}
        let wnd1 = WngMrg.getInstance().getWindow("SanShengSanShiFrame")
		if (wnd1.isVisible()) {
            wnd1.hideWnd()
		}
        //打开 结婚成功界面
        //FireEvent(EventDefine.MARRY_UPDATE, null);
    }

    //送礼
    export function G2C_MarryGift(id1,id2,name1,name2){
        //打开 结婚成功界面
        let wnd =  WngMrg.getInstance().getWindow("MarryInformFrame") 
        wnd.showAndSetData(id1,id2,name1,name2)
    }

    //房子属性更新--房子属性更新, 房子数据，双方外观，房子加成战力
    export function G2C_HourseUpdate(houseData,playerInfo,power){
        //打开 结婚成功界面
        ActivitySystem.getInstance().setHouseInfo(houseData, playerInfo,power)
        FireEvent(EventDefine.HOUSE_UPDATE, null);
    }
    
}