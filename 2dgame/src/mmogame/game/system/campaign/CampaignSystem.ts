/*
作者:
    liuziming
	
创建时间：
   2014.6.17(周二)

意图：
   战役相关的数据处理（关卡、竞技场）

公共接口：

*/
//PET_COUNT = 18
//let CAMPAIGN_BEGIN_ID = 1

class CampaignSystem extends BaseSystem {

	recordList
	campaignId
	mine

	public initObj(...args: any[]): void {

	}

	destory() {

	}

	//准备资源，把自己的workunit加载队列里
	prepareResource(workQueue) {
		GameConfig.initCampaignSystemCsv(workQueue);
		// workQueue.addWorkUnit(CallbackWorkUnit.newObj(this.initChapterList, this));
	}


	onClear() {

	}

	sendCampaignBattle(campaignId) {
		RpcProxy.call("C2G_CampaginFight", campaignId)
	}

	//////////////////////////////////////////////////////////////////////////////-
	setCampaignInfo(campaignId, mine) {
		this.campaignId = campaignId
		this.mine = mine
	}

	initFinishCampaignList(recordList) {
		this.recordList = recordList
	}

	////////////////////////////////////////////////
	isCampaignPass(campId) {
		return campId < this.campaignId
	}

	getCampaignName(campId) {
		if (GameConfig.CampaignConfig[campId]) {
			return GameConfig.CampaignConfig[campId].name
		}
		return ""
	}

	getFinishedCampaignList() {
		return this.recordList
	}

	getCurOpenCampaign() {
		return this.campaignId
	}

	getCurMine() {
		return this.mine
	}

	getNeedMine(campId?) {
		if (GameConfig.CampaignConfig[campId]) {
			return GameConfig.CampaignConfig[campId].autoFightNum
		}
		if (GameConfig.CampaignConfig[this.campaignId]) {
			return GameConfig.CampaignConfig[this.campaignId].autoFightNum
		}
		return 3
	}

	getCampaignPrize(campId) {
		if (GameConfig.CampaignConfig[campId]) {
			return GameConfig.CampaignConfig[campId].basePrize
		}
		return {}
	}

	//是否可以挑战boss
	bossCampaitnBattle() {
		if (GameConfig.CampaignConfig[this.campaignId]) {
			let needMine = GameConfig.CampaignConfig[this.campaignId].autoFightNum
			return this.mine >= needMine
		} else {
			return false
		}
	}
}