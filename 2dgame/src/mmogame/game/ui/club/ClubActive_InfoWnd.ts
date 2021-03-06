// TypeScript file
class ClubActive_InfoWnd extends BaseCtrlWnd {
	mElemList;
	scroll: UIScrollList;
	list: any[];

	public initObj(...params: any[]) {

	}

	public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList

		var ElemInfo = [
			{ ["name"]: "upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
			{ ["name"]: "preview", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPreview },
		]
		UiUtil.initElem(ElemInfo, this.mElemList, this.mElemList, this)

		for (let i = 0; i < 3; i++) {
			this.mElemList["Info_ItemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "Info_ItemBox_" + i, 0, 0, this.mElemList["info_prize_wnd"])
			this.mElemList["Info_ItemBox_" + i].setVisible(false)
		}

		let group = <eui.Group>this.mElemList["task_list_group"]
		this.scroll = UIScrollList.newObj(this.mLayoutNode, "task_scroll", 10, 5, group.width-20, group.height - 10, group)

		this.mElemList["club_active_level_rd"].setAlignFlag(gui.Flag.H_CENTER)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this)
		this.mElemList["info_wnd"].visible = true

		RpcProxy.call("C2G_FactionPlayerActiveInfo")

		this.refreshFrame()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.CLUB_PLAYER_ACTIVE_INFO, this.refreshFrame, this)
		this.mElemList["info_wnd"].visible = false
	}

	refreshFrame() {
		let activeData = ClubSystem.getInstance().getClubActiveInfo()
		if (activeData == null)
			return;

		let curActiveLevel = activeData.level
		let curLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel]
		let nextLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel + 1]
		if (curLvConfig == null)
			return;

		AddRdContent(this.mElemList["club_active_level_rd"], String.format(Localize_cns("CLUB_TXT29"), curActiveLevel), "ht_24_cc_stroke", "white")
		let curEffects = table_effect(curLvConfig.effects)
		var str = ""
		for (let k in curEffects) {
			let proName = GetPropertyName(k)
			let proValue = curEffects[k]
			str = str + proName + "+" + proValue + "#br"
		}
		AddRdContent(this.mElemList["cur_rd"], str, "ht_24_cc", "ublack", 3)

		str = ""
		if (nextLvConfig) {

			let nextEffects = table_effect(nextLvConfig.effects)
			for (let k in nextEffects) {
				let proName = GetPropertyName(k)
				let proValue = nextEffects[k]
				str = str + proName + "+" + proValue + "#br"
			}
		}
		AddRdContent(this.mElemList["next_rd"], str, "ht_24_cc", "lime", 3)

		//经验
		UiUtil.updateProgress(this.mElemList["exp_progress"], activeData.exp, curLvConfig.exp)

		//奖励
		for (let i = 0; i < 3; i++) {
			let prizeList = AnalyPrizeFormat(curLvConfig.prize)
			if (prizeList[i]) {
				this.mElemList["Info_ItemBox_" + i].updateByEntry(prizeList[i][0], prizeList[i][1])
				this.mElemList["Info_ItemBox_" + i].setVisible(true)
			}
		}

		let taskCfgList = []
		let taskConfig = GameConfig.FactionActiveTaskConfig
		for (let k in taskConfig) {
			let config = taskConfig[k]
			taskCfgList.push(config)
		}

		this.scroll.clearItemList()
		this.list = taskCfgList

		let group = <eui.Group>this.mElemList["task_list_group"]
		for (let i = 0; i < size_t(taskCfgList); i++) {
			let v = taskCfgList[i]
			let window = this.scroll.getItemWindow(i, group.width- 20, 61, 0, 0, 0)
			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}
	}

	initItemWindow(window) {
		let name = window.name
		let w = window.width
		let h = window.height
		let Info = [
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "_bg", ["image"]: "ty_uiDi03", ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h },
			{ ["index_type"]: eui.Label, ["name"]: name + "_taskName", ["title"]: "", ["font"]: "ht_22_lc", ["color"]: gui.Color.ublack, ["x"]: 20, ["y"]: 15, ["w"]: 150, ["h"]: 30 },
			{ ["index_type"]: eui.Label, ["name"]: name + "_taskCount", ["title"]: "", ["font"]: "ht_22_lc", ["color"]: gui.Color.lime, ["x"]: 195, ["y"]: 15, ["w"]: 80, ["h"]: 30 },
			{ ["index_type"]: eui.Label, ["name"]: name + "_taskExp", ["title"]: "", ["font"]: "ht_22_lc", ["color"]: gui.Color.cyan, ["x"]: 330, ["y"]: 15, ["w"]: 80, ["h"]: 30 },
			{ ["index_type"]: eui.Label, ["name"]: name + "_compState", ["title"]: Localize_cns("FINISHED"), ["font"]: "ht_22_cc", ["color"]: gui.Color.ublack, ["x"]: 420, ["y"]: 15, ["w"]: 120, ["h"]: 30 },
			{ ["index_type"]: gui.Button, ["name"]: name + "_linkBtn", ["title"]: Localize_cns("TASK_PANEL_QIANWANG"), ["font"]: "ht_22_cc_stroke", ["image"]: "ty_tongYongBt6", ["color"]: gui.Color.white, ["x"]: 450, ["y"]: 10, ["w"]: 86, ["h"]: 41, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGoOrGetClick },
		]
		UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
	}

	refreshItemWindow(window, data) {
		let name = window.name

		let taskId = data.ID

		let activeData = ClubSystem.getInstance().getClubActiveInfo()
		let activeTaskData = activeData.taskData

		let count = checkNull(activeTaskData[taskId], 0)

		this.mElemList[name + "_taskName"].text = data.name
		this.mElemList[name + "_taskCount"].text = String.format("%d/%d", count, data.maxCount)
		this.mElemList[name + "_taskExp"].text = data.exp

		if (count >= data.maxCount) {
			this.mElemList[name + "_compState"].visible = true
			this.mElemList[name + "_linkBtn"].visible = false
		} else {
			this.mElemList[name + "_compState"].visible = false
			this.mElemList[name + "_linkBtn"].visible = true
		}
	}

	onGoOrGetClick(event: egret.TouchEvent) {
		let name = event.target.name
		let index = name.replace(/[^0-9]/ig, "")
		let config = this.list[index]
		let link = config.finish[0]

		ExecuteMainFrameLink(link[0], link[1])
	}

	onClickUpgrade() {
		let activeData = ClubSystem.getInstance().getClubActiveInfo()
		let curActiveLevel = activeData.level
		let curLvConfig = GameConfig.FactionActiveLevelConfig[curActiveLevel]
		if (activeData.exp >= curLvConfig.exp) {
			RpcProxy.call("C2G_FactionPlayerActiveLevelUp")
		} else {
			MsgSystem.addTagTips(Localize_cns("CLUB_TXT91"))
		}
	}

	onClickPreview() {
        WngMrg.getInstance().showWindow("ClubActivePrizeFrame")
    }
}