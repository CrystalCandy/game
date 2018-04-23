class GoldBuyFrame extends BaseWnd {
	open_type: any;
	costDiamond: any;
	getGold: any;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/GoldBuyLayout.exml"]

		this.open_type = opItemUnit.FUNDS
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "buy_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBuy },
			{ ["name"]: "btn_close", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.JINGSHI_CHANGE_LIST_UPDATA, this.onRefresh, this)
		//查询
		let msg = GetMessage(opCodes.C2G_ACTIVE_DUIHUAN_SELECT)
		msg.index = this.open_type
		SendGameMessage(msg, true)

		this.mLayoutNode.visible = true;
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.JINGSHI_CHANGE_LIST_UPDATA, this.onRefresh, this)

		this.mLayoutNode.visible = false;
	}

	onRefresh(args) {
		let info = args.msg
		this.costDiamond = info.cost

		let rd1 = this.mElemList["info_rtxt"]
		let rd2 = this.mElemList["exchange_rtxt"]
		rd1.setAlignFlag(gui.Flag.H_CENTER)
		rd2.setAlignFlag(gui.Flag.H_CENTER)

		let limitCount = VipSystem.getInstance().getGoldOrPowerLimit(this.open_type)
		let heroInfo = GetHeroPropertyInfo()

		let gold = 0
		for (let _ = 0; _ < opBuyFundsLevelConfig.length; _++) {
			let v = opBuyFundsLevelConfig[_]

			let minLevel = v[0]
			let maxLevel = v[1]
			let cost = v[2]

			if (heroInfo.level >= minLevel && heroInfo.level <= maxLevel) {
				gold = cost
				break
			}
		}

		AddRdContent(rd1, String.format(Localize_cns("PAY_GOLD_POWER_TIPS1"), limitCount), "ht_24_lc_stroke_zongse", "white")
		AddRdContent(rd2, String.format(Localize_cns("PAY_GOLD_POWER_SWOP1"), info.cost, gold), "ht_28_cc_stroke_zongse", "white")

		this.getGold = gold

		this.mElemList["surplus_txt"].text = (String.format(Localize_cns("PAY_GOLD_POWER_SURPLUS"), info.count))
	}

	onClickBuy() {
		if (this.costDiamond > GetHeroProperty("gold")) {
			var t: IDialogCallback = {
				onDialogCallback(result: boolean, userData): void {
					if (result) {
						let wnd:PayFrame = WngMrg.getInstance().getWindow("PayFrame")
						//wnd.showWithIndex(2)
					}
				}
			}
			MsgSystem.confirmDialog(Localize_cns("PAY_TXT17"), t, null)
			return
		}

		let tipsTxt = null
		let confirmType = null
		tipsTxt = String.format(Localize_cns("PAY_TXT18"), this.costDiamond, this.getGold)
		confirmType = ConfirmFrom.BUY_GOLD

		var t: IDialogCallback = {
			onDialogCallback(result: boolean, userData): void {
				if (result) {
					let msg = GetMessage(opCodes.C2G_ACTIVE_DUIHUAN)
					msg.index = opItemUnit.FUNDS
					SendGameMessage(msg)
					GameSound.getInstance().playEffect(SystemSound.effect_jiaoyi)
				}
			}
		}
		return MsgSystem.confirmDialog(tipsTxt, t, confirmType)
	}

}