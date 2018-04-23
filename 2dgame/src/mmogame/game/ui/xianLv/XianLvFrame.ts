class XianLvFrame extends BaseWnd {
	tabWndList: UITabWndList
	tabIndex: number
	xianlvListBox;
	selectId
	Player: Player
	zhanLi;
	pos;
	cellPlayer: Player


	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/xianlv/XianLvLayout.exml"]
		this.tabIndex = -1
	}
	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();


		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "roman_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRomanClick },
			{ ["name"]: "state_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onStateClick },
			{ ["name"]: "btn_look", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLookClick },
			{ ["name"]: "add_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick },
			{ ["name"]: "btn_up1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
			{ ["name"]: "btn_autoUp1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAutoClick },
			{ ["name"]: "btn_jiHuo", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onJiHuoClick },
			{ ["name"]: "top_right_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
			{ ["name"]: "top_left_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "xianLv", wnd: XianLvXianLvWindow.newObj(this.mLayoutNode, this), check: this.xianlvClick, obj: this },
			{ name: "fazhen", wnd: XianLvZhenFaWindow.newObj(this.mLayoutNode, this), check: this.fazhenClick, obj: this },
			{ name: "xianwei", wnd: XianLvXianWeiWindow.newObj(this.mLayoutNode, this), check: this.xianweiClick, obj: this },
			{ name: "shengXing", wnd: XianLvShengXingWindow.newObj(this.mLayoutNode, this), check: this.shengxingClick, obj: this },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

		this.tabWndList.setSelectedCallback(this.refreshDotTips, this)

		this.mElemList["material_rd"].setAlignFlag(gui.Flag.LEFT_CENTER)
		this.mElemList["rd_starCost"].setAlignFlag(gui.Flag.LEFT_CENTER)
		this.mElemList["rd_access"].setAlignFlag(gui.Flag.CENTER_TOP)
		this.mElemList["rd_skill_star"].setAlignFlag(gui.Flag.CENTER_CENTER)

		let group = <eui.Group>this.mElemList["xianLv_group"]
		this.xianlvListBox = UIXianLvListBox.newObj(this.mLayoutNode, "xianLv", 0, 0, group.width, group.height, group)
		this.tabWndList.setSelectedCallback(this.refreshDotTips, this)
		this.selectId = this.xianlvListBox.setXianLvList()
		this.xianlvListBox.setClickListner(this.autoReceiveSelect, this)
		this.mElemList["skillBox3"] = UISkillBox.newObj(this.mLayoutNode, "skillBox3", 0, 0, this.mElemList["skill_image"])


	}
	public onUnLoad(): void {
		if (this.Player) {
			let actorview = this.mElemList["actor_xianLv"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	public onShow(): void {
		RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);

	}


	showWithIndex(index) {
		this.tabIndex = index;
		this.showWnd();
	}

	autoReceiveSelect(xianLv) {
		this.selectId = xianLv.Id
		this.onRefresh()	
	}

	///////////////////////////
	onRefresh() {
		this.mElemList["up_star_wnd"].visible = false
		this.mElemList["star_wnd"].visible = false
		this.mElemList["upgrade_wnd"].visible = false
		this.mElemList["wei_jiHuo"].visible = false
		this.mElemList["unlock_wnd"].visible = false
		this.mElemList["state_btn"].visible = false
		this.mElemList["btn_jiHuo"].visible = false
		this.mElemList["rd_access"].visible = false
		this.mElemList["stage_wnd"].visible = false
		this.mElemList["name_rd"].visible = false
		//common
		//
		let level = 1
		if (XianLvSystem.getInstance().isExit(this.selectId)) {
			level = XianLvSystem.getInstance().getLevel(this.selectId)
		}
		this.mElemList["stage_xianLv"].text = level + Localize_cns("ROLE_TXT39");
		//战力
		
		let star = XianLvSystem.getInstance().getStar(this.selectId) || 1
		this.onRefreshStar(star)
		//rd_add
		let jiHuoList = XianLvSystem.getInstance().getJiHuoList()


		let zhanLiTotal = XianLvSystem.getInstance().getTotalForce()


		let fightList = XianLvSystem.getInstance().getFightList()
		let addStr = String.format(Localize_cns("XIANLV_TXT1"), zhanLiTotal, size_t(jiHuoList), size_t(fightList))
		AddRdContent(this.mElemList["add_rd"], addStr, "ht_20_cc", "black")

		let skillId = GameConfig.ActorXianLvConfig[this.selectId]["skilllist"]


		this.mElemList["skillBox3"].setTipsListner(this.onSkillClick, this, this.selectId)
		this.mElemList["skillBox3"].updateXianLvSkill(skillId, star)

		//	AddRdContent(this.mElemList["rd_skill_star"], xingStr, "ht_24_cc")
		//

		//判断是否激活
		if (XianLvSystem.getInstance().isExit(this.selectId)) {
			this.mElemList["star_wnd"].visible = true
			this.mElemList["stage_wnd"].visible = true

			this.zhanLi = XianLvSystem.getInstance().getForce(this.selectId)

			let jieStr = String.format(Localize_cns("ROLE_TXT39"), level)
			this.mElemList["stage_xianLv"].text = jieStr
			//state_btn
			this.mElemList["state_btn"].visible = true
			let isFight = false
			for (let k in fightList) {
				if (tonumber(k) == this.selectId) {
					isFight = true
				}
			}
			if (isFight) {
				this.mElemList["state_btn"].source = "ty_tongYongBt8"
				this.mElemList["state_btn"].text = Localize_cns("XIANLV_TXT2")
			} else {
				this.mElemList["state_btn"].source = "ty_tongYongBt7"
				this.mElemList["state_btn"].text = Localize_cns("XIANLV_TXT3")
			}

			if (this.tabIndex == 0) {  //如果是仙侣
				this.mElemList["upgrade_wnd"].visible = true
				//经验条xianLv_progress
				let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level]
				let curExp = XianLvSystem.getInstance().getExpById(this.selectId)
				let maxEXP = upgradeConfig.maxexp
				UiUtil.updateProgress(this.mElemList["xianLv_progress"], curExp, maxEXP)
				//消耗,消耗。。%s#JINBI#rf%d,,
				let needItem = GameConfig.itemConfig[upgradeConfig.itemid]//upgradeConfig.itemid
				let hadCount = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
				let needCount = upgradeConfig.itemnum
				let str = hadCount + "/" + needCount
				if (hadCount >= needCount) {
					str = "#lime" + str;
				} else {
					str = "#red" + str
				}
				//
				//if(upgradeConfig.moneyunit == 1){

				//	}
				let costStr = String.format(Localize_cns("ROLE_TXT10"), GetTagIcon(20002), str, upgradeConfig.money)
				AddRdContent(this.mElemList["rd_cost"], costStr, "ht_24_cc", "black")
			} else if (this.tabIndex == 3) {    //如果是升星

				for (let i = 1; i <= 2; i++) {
					if (!this.mElemList["skillBox" + i]) {
						this.mElemList["skillBox" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox" + i, 0, 0, this.mElemList["upstar_skill" + i])
					}
					this.mElemList["skillBox" + i].updateXianLvSkill(skillId, star + i - 1)
					this.mElemList["skillBox" + i].setTipsListner(this.onSkillClick, this, this.selectId)
				}
				if (star >= 7) {
					this.mElemList["upstar_skill2"].visible = false
					this.mElemList["image_jiantou"].visible = false
					this.mElemList["upstar_skill1"].x = 60
				} else {
					this.mElemList["upstar_skill2"].visible = true
					this.mElemList["image_jiantou"].visible = true
					this.mElemList["upstar_skill1"].x = 0
				}

				this.mElemList["up_star_wnd"].visible = true
				let itemid = GameConfig.FunUpStarConfig["XianLv"][this.selectId].itemid
				let itemnum = GameConfig.FunLevelNumConfig["XianLv"][star].num
				let had = ItemSystem.getInstance().getItemCount(itemid)
				let itemName = GameConfig.itemConfig[itemid].name

				if (!this.mElemList["upStarItemBox"]) {
					this.mElemList["upStarItemBox"] = UIItemBox.newObj(this.mLayoutNode, "upStarItemBox", 40, 45, this.mElemList["up_star_wnd"])
				}
				this.mElemList["upStarItemBox"].updateByEntry(itemid)

				let hadStr = tostring(had)
				if (had >= itemnum) {
					hadStr = "#lime" + hadStr

				} else {
					hadStr = "#red" + hadStr
				}
				let quality = GameConfig.ActorXianLvConfig[this.selectId].quality
				let nameColor = GetQualityColorStr(quality)
				itemName = "#" + nameColor + itemName
				let costStr = String.format(Localize_cns("XIANLV_TXT4"), itemName, itemnum, hadStr)
				AddRdContent(this.mElemList["rd_upStarCost"], costStr, "ht_24_cc", "black")

				AddRdContent(this.mElemList["rd_way"], Localize_cns("XIANLV_TXT5"), "ht_24_cc", "lime")
			} else {

			}
		} else {
			this.mElemList["unlock_wnd"].visible = true
			this.mElemList["wei_jiHuo"].visible = true

			let costId = GameConfig.ActorXianLvConfig[this.selectId].itemid
			let count = GameConfig.ActorXianLvConfig[this.selectId].itemnum
			let name = GameConfig.itemConfig[costId].name
			//
			if (!this.mElemList["costItemBox"]) {
				this.mElemList["costItemBox"] = UIItemBox.newObj(this.mLayoutNode, "costItemBox", 0, 45, this.mElemList["group_unlock"])
			}
			this.mElemList["costItemBox"].updateByEntry(costId)

			//rd_access rd_starCost
			let had = ItemSystem.getInstance().getItemCount(costId)
			let tempStr = String.format(Localize_cns("XIANLV_TXT7"), had, count)
			if (had >= count) {
				tempStr = "#lime" + tempStr
				this.mElemList["btn_jiHuo"].visible = true
			} else {
				tempStr = "#red" + tempStr
				this.mElemList["rd_access"].visible = true

			}
			let quality = GameConfig.ActorXianLvConfig[this.selectId].quality
			let nameColor = GetQualityColorStr(quality)
			name = "#" + nameColor + name
			let starStr = String.format(Localize_cns("XIANLV_TXT6"), name, tempStr)
			AddRdContent(this.mElemList["rd_starCost"], starStr, "ht_24_cc", "ublack")

			AddRdContent(this.mElemList["rd_access"], Localize_cns("XIANLV_TXT5"), "ht_24_cc")

			let proList = GetXianLvProperty(this.selectId)
			this.zhanLi = GetForceMath(proList)
		}


		//actor
		if (this.Player == null) {
			this.Player = Player.newObj()
		}
		this.onRefreshActor(this.selectId)

		DrawNumberStringImage(this.mElemList["bImage_xianLv"], "zhanLi_", "z" + this.zhanLi, 0, 0, -3)

		this.checkAutoUpgrade(this.mElemList["btn_autoUp1"])
	}


	
	///--------------btn响应事件
	onStateClick() {
		let name = this.mElemList["state_btn"].text

		if (name == Localize_cns("XIANLV_TXT3")) {
			let wnd = WngMrg.getInstance().getWindow("XianLvFightFrame")
			wnd.onShowWnd(this.selectId)
		} else if (name == Localize_cns("XIANLV_TXT2")) {

			//	let wnd = WngMrg.getInstance().getWindow("XianLvFightFrame")
			//	wnd.onShowWnd(this.selectId)
		}
	}
	onAddClick() {
		let name = GameConfig.ActorXianLvConfig[this.selectId].name
		let wnd = WngMrg.getInstance().getWindow("XianLvPropertyFrame")
		wnd.onShowWnd(this.selectId)
	}

	onUpClick(event: egret.TouchEvent) {
		let level = XianLvSystem.getInstance().getLevel(this.selectId)

		let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"]

		let needItemid = upgradeConfig[level].itemid
		let needItemNum = upgradeConfig[level].itemnum
		let had = ItemSystem.getInstance().getItemCount(needItemid)

		//消耗货币
		let moneyUnit = upgradeConfig[level].moneyunit
		let ownMoney = GetHeroMoney(moneyUnit)
		let costMoney = upgradeConfig[level].money

		//判断货币是否足够
		if (ownMoney < costMoney) {
			//直接弹出对应的货币购买界面
			MsgSystem.addTagTips("NO_MONEY")

			this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY")
			this.mElemList["btn_autoUp1"].selected = false
			this.mElemList["btn_up1"].enabled = true
			return
		}

		if (had < needItemNum) {
			this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY")
            this.mElemList["btn_autoUp1"].selected = false
            this.mElemList["btn_up1"].enabled = true
			let wnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
			wnd.onShowWnd(needItemid, true)

            this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY")
			this.mElemList["btn_autoUp1"].selected = false
			this.mElemList["btn_up1"].enabled = true
			return
		}

		let autoBuy: number
		autoBuy = (this.mElemList["cBox_auto"].selected == true) ? 1 : 0
		RpcProxy.call("C2G_ACTOR_XIANLV_UPGRADE", this.selectId, autoBuy)
	}

	//自动更新
	onAutoClick(event: egret.TouchEvent) {
		let btn = event.target
		btn.selected = !btn.selected
		btn.level = XianLvSystem.getInstance().getLevel(this.selectId) || 0

		if (btn.selected) {
			btn.text = Localize_cns("STOP")
			this.mElemList["btn_up1"].enabled = false
		} else {
			btn.text = Localize_cns("AUTO_BUY")
			this.mElemList["btn_up1"].enabled = true
		}

		this.checkAutoUpgrade(btn)
	}

	checkAutoUpgrade(btn) {
		if (btn.selected) {
			let curLv = XianLvSystem.getInstance().getLevel(this.selectId) || 0
			let oldLv = btn.level || 0
			if (curLv == oldLv) {
				this.onUpClick(null)
			} else {
				btn.text = Localize_cns("AUTO_BUY")
				this.mElemList["btn_up1"].enabled = true
			}
		}
	}

	onJiHuoClick() {
		RpcProxy.call("C2G_ACTOR_XIANLV_UNLOCK", this.selectId)
	}
	onRomanClick() {
		//  let wnd = WngMrg.getInstance().getWindow("XianLvQiYuanFrame")
		//	wnd.showWnd()
	}
	onLeftClick() {
		this.xianlvListBox.leftMove()
	}

	onRightClick() {
		this.xianlvListBox.rightMove()
	}

	onLookClick() {
		let wnd = WngMrg.getInstance().getWindow("XianLvAttributeFrame")
		wnd.onShowWnd(this.selectId)
	}


	onSkillClick(id, level, userdata) {
		let wnd = WngMrg.getInstance().getWindow("XianLvSkillDesFrame")
		wnd.onShowWnd(id, level)
	}

	//////radiobutton
	xianlvClick() {
		return true
	}

	fazhenClick() {
		return true
	}

	xianweiClick() {
		//MsgSystem.addTagTips(Localize_cns("45级开启"))
		return true
	}

	shengxingClick() {
		//MsgSystem.addTagTips(Localize_cns("45级开启"))
		return true
	}

	//////刷新
	onRefreshStar(num) {
		for (let i = 1; i <= 7; i++) {
			if (!this.mElemList["star_" + i]) {
				let info = [
					{ ["index_type"]: eui.Image, ["name"]: "star_" + i, ["image"]: "ty_starDi01", ["x"]: 0, ["y"]: 0, ["w"]: 0, ["h"]: 0, ["messageFlag"]: true },
				]
				UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this, this.mElemList["star_wnd"])
			}

		}
		for (let i = 1; i <= num; i++) {
			this.mElemList["star_" + i].source = "ty_star01"
		}
		if (num < 7) {
			for (let i = num + 1; i <= 7; i++) {
				this.mElemList["star_" + i].source = "ty_starDi01"
			}
		}
	}

	onRefreshActor(id) {
		let actorview = this.mElemList["actor_xianLv"]
		let actor = this.Player
		let modelId = id
		actor.loadModel(modelId)
		actor.changeAction("idle", 1.0, true);
		actor.setPositionXY(0, 0)
		actor.enterViewer(actorview)

		//缩放
		actor.setScale(1.0)
		//方向
		actor.setDir(3)
	}

	////////////////////红点提示/////////////////////
	//自定义红点继承实现
	refreshDotTipsImp() {
		FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		this.refreshIconDot()
	}

	getDotTipsArgsImp(checkParam) {
		let args: any = {}
		args.index = this.tabWndList.getTabIndex()
		args.type = this.tabWndList.getCurrentWnd().type
		args.xianlvId = this.selectId
		return args
	}

	refreshIconDot(){
		let index = this.tabWndList.getTabIndex()
		this.xianlvListBox.onRefreshDotTips(this, index)
	}
}