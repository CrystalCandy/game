class ItemHintFrame extends BaseWnd {
	logicItem: Item;

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/item/ItemHintLayout.exml"]
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.initSkinElemList();
		this.setAlignCenter(true, true);

		this.mElemList["equip_box"] = UIItemBox.newObj(this.mLayoutNode, "equip_box", 0, 0, this.mElemList["e_box"])
		this.mElemList["equip_box"].setItemHintEnable(false)
		this.mElemList["item_box"] = UIItemBox.newObj(this.mLayoutNode, "item_box", 0, 0, this.mElemList["i_box"])
		this.mElemList["item_box"].setItemHintEnable(false)

		this.mElemList["com_wnd"].visible = false
		this.mElemList["role_wnd"].visible = false
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
		RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
		this.mLayoutNode.visible = true;
		this.mLayoutNode.setDoModal(true)
		this.refreshFrame()
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false)
	}

	refreshFrame() {
		let itemType = this.logicItem.getRefProperty("type")
		if (itemType == opItemType.ITEM_TYPE_GOODS) {
			this.mElemList["equip_wnd"].visible = false
			this.mElemList["item_wnd"].visible = true
			this.updateNormalItem()
		} else {
			this.mElemList["equip_wnd"].visible = true
			this.mElemList["item_wnd"].visible = false
			this.updateEquipItem()
		}
	}

	updateNormalItem() {
		this.mElemList["item_box"].updateByItem(this.logicItem)
		let name = this.logicItem.getRefProperty("name")
		let count = ItemSystem.getInstance().getItemCount(this.logicItem.entryId)
		let describ = this.logicItem.getRefProperty("description")
		let quality = this.logicItem.getRefProperty("quality") || 1
		let color = opItemColorStr[quality - 1]
		let str = "#" + color + name + "#br#yellow" + Localize_cns("ITEM_TXT30") + count
		AddRdContent(this.mElemList["i_des"], str, "ht_24_cc_stroke", "white", 15)
		AddRdContent(this.mElemList["i_explain"], describ, "ht_24_cc_stroke", "navajowhite", 8)
	}

	updateEquipItem() {
		this.mElemList["equip_box"].updateByItem(this.logicItem)
		let name = this.logicItem.getRefProperty("name")
		//部位//类型
		let subtype = this.logicItem.getRefProperty("subtype")
		//等级//需求
		let uselevel = this.logicItem.getRefProperty("uselevel")
		//职业只有通用

		let itemType = this.logicItem.getRefProperty("type")
		if (itemType == opItemType.COMMON_EQUIP) {
			let stageStr = this.logicItem.getRefProperty("title")
			let level = this.logicItem.getProperty("add_num") || 1
			let quality = this.logicItem.getProperty("quality") || opEquipQuality.gray
			let color = opItemColorStr[quality - 1]

			//名称
			let str = "#" + color + stageStr + "#yellow+" + level
			AddRdContent(this.mElemList["e_name"], str, "ht_24_cc_stroke", "white")

			//需求和类型
			str = "#yellow" + Localize_cns("ITEM_TXT31") + "#navajowhite" + uselevel + Localize_cns("PET_TXT10") + "#br"
			str = str + "#yellow" + Localize_cns("ITEM_TXT32") + "#navajowhite" + (GameConfig.FunEquipCaseList[subtype] || "")
			AddRdContent(this.mElemList["e_des"], str, "ht_24_cc_stroke", "white", 15)

			let force = this.updateCommonEquipProperty() || 0

			//战力
			this.mElemList["e_batch"].beginDraw();
			this.mElemList["e_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
			this.mElemList["e_batch"].endDraw();

			//更新评分
			let forceLab = <eui.Label>this.mElemList["e_force"]
			forceLab.textColor = gui.Color.yellow
			forceLab.text = Localize_cns("ITEM_TXT37") + force
		} else {
			let quality = this.logicItem.getProperty("quality") || opEquipQuality.gray
			let color = opItemColorStr[quality - 1]
			//名称
			let str = "#" + color + name
			AddRdContent(this.mElemList["e_name"], str, "ht_24_cc_stroke", "white")

			//部位等级职业
			str = "#yellow" + Localize_cns("ITEM_TXT33") + "#navajowhite" + GetRoleEquipTypeName(subtype) + "#br"
			str = str + "#yellow" + Localize_cns("ITEM_TXT34") + "#navajowhite" + uselevel + "#br"
			str = str + "#yellow" + Localize_cns("ITEM_TXT35") + "#navajowhite" + Localize_cns("ITEM_TXT36")
			AddRdContent(this.mElemList["e_des"], str, "ht_24_cc_stroke", "white", 3)

			let force = this.updateRoleEquipProperty() || 0

			//战力
			this.mElemList["e_batch"].beginDraw();
			this.mElemList["e_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
			this.mElemList["e_batch"].endDraw();

			//更新评分
			let forceLab = <eui.Label>this.mElemList["e_force"]
			forceLab.textColor = gui.Color.yellow
			forceLab.text = Localize_cns("ITEM_TXT37") + force
		}
	}

	updateCommonEquipProperty() {
		this.mElemList["com_wnd"].visible = true
		this.mElemList["role_wnd"].visible = false

		let quality = this.logicItem.getProperty("quality") || opEquipQuality.purple //最低紫色
		let add_num = this.logicItem.getProperty("add_num") || 1

		this.updateFrameSize(add_num)

		//更新基础属性
		var effects = GetFunEquipBaseProperty(this.logicItem.entryId, quality)
		let baseStr = "#yellow" + Localize_cns("ITEM_BASE_ATTR")
		for (let k in effects) {
			let proName = GetPropertyName(abilityNameToIndex[k])
			let proValue = effects[k]
			baseStr = baseStr + "#br" + "#navajowhite" + proName + proValue
		}
		AddRdContent(this.mElemList["com_base"], baseStr, "ht_24_cc_stroke", "white", 7)

		//更新附加属性
		var effects = GetFunEquipAddProperty(this.logicItem.entryId, quality)
		let addStr = "#yellow" + Localize_cns("ITEM_ADD_ATTR")
		for (let i = 0; i < add_num; i++) {
			for (let k in effects) {
				let proName = GetPropertyName(abilityNameToIndex[k])
				let proValue = effects[k]
				addStr = addStr + "#br" + "#navajowhite" + proName + proValue
			}
		}
		AddRdContent(this.mElemList["com_add"], addStr, "ht_24_cc_stroke", "white", 7)

		return GetForceMath(GetFunEquipProperty(this.logicItem.entryId, quality, add_num))
	}

	updateRoleEquipProperty() {
		this.mElemList["com_wnd"].visible = false
		this.mElemList["role_wnd"].visible = true

		let quality = this.logicItem.getProperty("quality") || opEquipQuality.gray

		//更新基础属性
		let baseStr = "#yellow" + Localize_cns("ITEM_BASE_ATTR")
		let effects = GetRoleEquipBaseProperty(this.logicItem.entryId, quality)
		for (let k in effects) {
			let proName = GetPropertyName(abilityNameToIndex[k])
			let proValue = effects[k]
			baseStr = baseStr + "#br" + "#navajowhite" + proName + proValue
		}
		AddRdContent(this.mElemList["role_base"], baseStr, "ht_24_cc_stroke", "white", 7)

		return GetForceMath(effects)
	}

	updateFrameSize(num) {
		let addH = 32
		this.mLayoutNode.height = this.mLayoutNode.height + 60 + (num - 1) * addH
		let addRd = <gui.RichDisplayer>this.mElemList["com_add"]
		addRd.height = addRd.height + (num - 1) * addH
	}

	//////////////////////////////////////////////////////////////
	showItemHint(logicItem) {
		this.logicItem = logicItem
		this.showWnd()
	}
}