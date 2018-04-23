/*
作者:
    panjunhua
	
创建时间：
    2015.01.27(星期二) 

意图：
  天空之塔活动

公共接口：
	
*/

class Activity_Champion extends ActivityBase {
    myForce //战力
    myRank //名次

    challengeCount //拥有挑战次数
    refreshTime//下次挑战倒计时

    enemyList //几个对手

    public initObj(...args: any[]): void {
        RegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this)
        this.onClear()
    }

    destory() {
        UnRegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this)
    }

    onPrepareResource() {

    }

    onClear() {
        this.myForce = null//战力
        this.myRank = null//名次
        this.challengeCount = null//拥有挑战次数
        this.refreshTime = null//下次获得挑战次数倒计时
        this.enemyList = null//几个对手
    }

    ////////////////////////////////////////////////////////////////-
    setChampionInfo(info) {
        this.myForce = GetHeroProperty("force") || 0
        this.myRank = info.rank//名次
        this.challengeCount = info.count//剩下多少次
        this.refreshTime = info.time//多长时间后可以再挑战
        this.enemyList = info.list //几个对手	
    }

    getChampionInfo() {
        let info: any = {}
        info.force = this.myForce			//战力
        info.rank = this.myRank				//名次	
        info.count = this.challengeCount	//剩下多少次
        info.time = this.refreshTime		//最多多少次
        info.list = this.enemyList          //对手
        return info
    }

    //竞技场战败处理
    onShowEventFunc(args) {
        // if (args.window.classname == "FightLostFrame") {
        //     if (args.window.getCurFightType() == opFightType.FIGHT_TYPE_CHAMPION) {
        //         let param: any = {}
        //         param.type = "cham"
        //         args.window.addReCallHandler(this, this.quickOutChampoin, param)
        //     }
        // }
    }

    //跳出战斗
    quickOutChampoin(param, showFrameName) {
        //TLog.Debug("Activity_SkyTower.fastEnterStopSkyTower",param.type)
        if (param.type == "cham" && showFrameName == "GemMenuFrame") {
            let wnd = WngMrg.getInstance().getWindow("ChampionFrame")
            wnd.OnClickReturn()
        }
    }

    setFightEndCallBack(message) {
        if (FightSystem.getInstance().isFight()) {
            return FightSystem.getInstance().addEndFightHandler(this.popHighPrizeFrame, this, message)
        } else {
            return this.popHighPrizeFrame(message)
        }
    }

    popHighPrizeFrame(message) {
        let wnd = WngMrg.getInstance().getWindow("ChampionFrame")
        wnd.showWnd()

        wnd = WngMrg.getInstance().getWindow("ChampionHighPrizeFrame")
        wnd.setInfoList(message)
        wnd.showWnd()
    }

    //计算每日奖励
    getDailyPrizeItemList() {
        let rank = this.myRank
        for (let i in GameConfig.ChampionPrizeConfig) {
            let v = GameConfig.ChampionPrizeConfig[i]
            if (rank >= v.rankUp && rank <= v.rankDown) {
                return v
            }
        }
        return null
    }
}