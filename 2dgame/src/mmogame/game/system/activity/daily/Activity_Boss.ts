// TypeScript file
class Activity_Boss extends ActivityBase {
	actInfo: any
    actBossInfo: any
    xiYouTaskList : any
    xiYouLiLianInfo : any
    xiYouFindInfo : any
    sanBaiInfo : any


	public initObj(...args: any[]): void {
		this.onClear()
	}

	destory() {
		// UnRegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // UnRegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
	}

	onPrepareResource() {
		// RegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
		// RegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)

        this.messageWndHandleIndex = 
		{	
            // ["G2C_SweepBossActivity"]: [this.onRecvEnter, {}, true],
            ["G2C_GetBossActivityInfo"]: [this.onRecvActInfo, [["BossMainFrame", "updateWnd"], ["CopyMainFrame", "updateWnd"],["DailyFrame","updateWnd"],["BossBefallFrame", "onRefresh"],["ActivityListFrame", "updateWnd"], ["ClubFrame", "updateWnd"],["GlobalMainFrame", "updateWnd"]], true],
            ["G2C_GetBossIndexData"]: [this.onRecvBossInfo, [["BossWildFrame", "updateWnd"]], true],
            //每日三百
            ["G2C_MEIRISANBAI_MonsterNum"]: [this.onRecvSanBaiInfo, [["DailyFrame","updateWnd"]], true],
            //西游历练
            ["G2C_XiyouLilian_Info"]: [this.onRecvXiYouInfo, [["DailyFrame","updateWnd"]], true],
            ["G2C_XiyouLilian_RecordInfo"]: [this.onRecvFindBackInfo, [["DailyFindBackFrame","updateWnd"]], true],
		}
	}

	onClear() {
		this.actInfo = {}
        this.actBossInfo = {}
        this.xiYouTaskList = []
        this.xiYouLiLianInfo = {}
        this.sanBaiInfo = {}
	}

    onRecvEnter(message) {

    }

    onRecvActInfo(message) {
        let index = message.index
        this.actInfo[index] = message.data

        FireEvent(EventDefine.BOSSACTIVITY_INFO, null)
        return true
    }

    getActInfo(index) {
        return this.actInfo[index]
    }

    onRecvBossInfo(message) {
        let actIndex = message.index
        let bossIndex = message.bossIndex

        this.actBossInfo[actIndex] = checkNull(this.actBossInfo[actIndex], {})
        this.actBossInfo[actIndex][bossIndex] = message.data
        
        return true
    }

    getActBossInfo(actIndex, bossIndex) {
        if (this.actBossInfo[actIndex] == null) {
            return null
        }
        return this.actBossInfo[actIndex][bossIndex]
    }

    ///--------每日三百
    ///--------服务器数据
    onRecvSanBaiInfo(message){
        this.sanBaiInfo = message
        FireEvent(EventDefine.BOSSACTIVITY_INFO, null)
        return true
    }

    getSanBaiInfo(){
        return this.sanBaiInfo
    }

    ///----------本地数据
    getSanBaiConfigByLevel(level){
        let tempConfig = GameConfig.EveryDaySanBaiConfig
        let recvKey = 0
        for(let k in tempConfig){
            if(tonumber(k) >= level){
                if(recvKey == 0){
                    recvKey = tonumber(k)
                }
                return tempConfig[recvKey]
            }else{
                recvKey = tonumber(k)
            }
        }

        return null
    }

    ////---------西游历练
    ///----------网络数据
    onRecvXiYouInfo(message){
        this.xiYouTaskList = []
        this.xiYouLiLianInfo = {}
        this.xiYouLiLianInfo = message
        this.onUpdateXiYouInfo(message.taskList)
        FireEvent(EventDefine.DAILYACTIVITY_INFO, null)
        return true
    }
    ///---------(处理网络数据与本地数据)
    onUpdateXiYouInfo(message){
        let tempConfig = GameConfig.EveryDayLiLianTaskConfig

        let unfinish = []
        let finish = []

        for(let k in tempConfig){
            let temp = tempConfig[k]
            let netInfo  = message[k]
            if(netInfo){
                temp["curTwice"] = netInfo
            }
            if(temp.curTwice >= temp.maxCount){
                table_insert(finish, temp)
            }else{
                table_insert(unfinish, temp)
            }
        }

        for(let k in finish){
            let taskData = finish[k]
            table_insert(unfinish, taskData)
        }

        this.xiYouTaskList = unfinish
    }

    ///-------------获取服务端数据
    getXiyouInfo(){
        return this.xiYouLiLianInfo
    }

    ///-------------获取task列表
    getXiYouTaskList(){
        return this.xiYouTaskList
    }

    getXiYouLiLianPoint(){
        let taskList = this.xiYouLiLianInfo.taskList
        let recvNum = 0
        for(let k in taskList){
            recvNum += taskList[k]
        }

        return recvNum
    }

    ///---------找回
    onRecvFindBackInfo(message){
        this.xiYouFindInfo = []
        let tempConfig = GameConfig.EveryDayLiLianTaskConfig
       // let recvConfig = []
       for(let k in tempConfig){
           let config = tempConfig[k]
           if(config != null){
               let total = config.maxCount
               let backNum = total
               let taskNum = message[k]
               if(taskNum != null){
                   backNum = total - taskNum
               }
               if(backNum != 0 ){
                   config["backNum"] = backNum * config.exp
                   table_insert(this.xiYouFindInfo, config)
               }
           }
       }
       /* for(let k in message){
            let config = tempConfig[k]
            if(config != null && message[k] != false){
                config["backNum"] = message[k]
                table_insert(this.xiYouFindInfo, config)
            }
        }*/
        return true
    }

    getFindBackInfo(){
        return this.xiYouFindInfo
    }
}