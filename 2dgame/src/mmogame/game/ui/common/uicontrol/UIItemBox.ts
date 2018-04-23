/*
作者:
    yangguiming
	
创建时间：
   2017.02.4(周三)

意图：
   物品框通用控件
   
公共接口：
   
*/
class UIItemBox extends TClass {

	mParentNode: eui.Component;
	name: string;
	mElemList: any;
	parentWnd: any;

	rootWnd: any;

	bEnable: boolean;
	logicItem: Item;
	enableIcon: boolean

	needCount: number
	frameList: any;
	isShowFrontFrame: boolean;

	bgImage: any;

	itemTipsFunc: Function;
	itemTipsObj: any;
	userData: any;

	bEquipInfoShow: boolean;

	public initObj(...args: any[]): void {
		this.mParentNode = args[0]
		this.name = args[1]
		let x = args[2]
		let y = args[3]

		let parentWnd = args[4]
		let scale = 1
		let w = 80
		let h = 80
		if (args[5]) {
			scale = args[5]
			w = w * scale
			h = h * scale
		}
		this.rootWnd = null
		let bgImg = "ty_zhuangBeiBg01"
		this.bEquipInfoShow = true;

		this.mElemList = {}
		let itemBoxName = this.name;
		let mElemInfo = [
			{ ["index_type"]: eui.Group, ["name"]: itemBoxName, ["x"]: x, ["y"]: y, ["w"]: w, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image, ["name"]: this.name + "item_bg", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_24_cc", ["image"]: bgImg, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onOpenTips },
			{ ["index_type"]: gui.Grid9Image, ["name"]: this.name + "icon", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_24_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["touchEnabled"]: false, },
			{ ["index_type"]: eui.Label, ["name"]: this.name + "count", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_13_rc_stroke", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: h - 21, ["w"]: w-5, ["h"]: 18, ["touchEnabled"]: false, },

			//通用装备
			{ ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "name", ["parent"]: itemBoxName, ["titile"]: "", ["font"]: "ht_16_cc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 8 * scale, ["y"]: 53 * scale, ["w"]: w - 8 * scale, ["h"]: 30 * scale, ["messageFlag"]: true },
			{ ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "stage", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_16_cc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 8 * scale, ["y"]: 6 * scale, ["w"]: w - 8 * scale, ["h"]: 30 * scale, ["messageFlag"]: true },
		]
		UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd)

		this.rootWnd = this.mElemList[itemBoxName]

		//装备
		this.mElemList[this.name + "name"].clear()
		this.mElemList[this.name + "stage"].clear()

		//逻辑数据
		this.bEnable = true
		this.logicItem = null
		this.enableIcon = true

		this.needCount = null
		this.frameList = null
		this.isShowFrontFrame = false
	}

	destory() {

	}


	setVisible(b) {
		this.rootWnd.visible = (b)
	}

	setXY(x, y) {
		this.rootWnd.x = x;
		this.rootWnd.y = y;
	}

	createElem(mElemInfo, mElemList, obj, parent?) {
		UiUtil.createElem(mElemInfo, this.mParentNode, mElemList, obj, parent || this.rootWnd)
	}


	updateByEntry(entryId, count?, quality?, addNum?) {

		let itemRefInfo = ItemSystem.getInstance().getItemTemplateInfo(entryId)
		if (itemRefInfo == null) {
			this.updateByItem(null)
			return
		}

		let item = Item.newObj()
		item.initWithRef(itemRefInfo)
		if (count != null && count >= 0) {
			item.propertyInfo.previewCount = count
		}

		if (quality != null) {
			item.propertyInfo.quality = quality
			item.id = entryId
		}

		if (addNum != null) {
			item.propertyInfo.add_num = addNum
		}

		this.updateByItem(item)
	}


	updateByItem(itemInfo) {

		this.logicItem = itemInfo

		this._updateInfo();
	}

	updateByItemId(itemId) {

		this.logicItem = ItemSystem.getInstance().getItemLogicInfoByID(itemId)

		this._updateInfo();
	}


	checkMaterialAndCash(materialInfo, needCash) {
		let bResult = true
		for (let i in materialInfo) {
			let v = materialInfo[i]

			let entryId = v[0]
			let count = v[1]

			if (ItemSystem.getInstance().getItemCount(entryId) < count) {
				bResult = false
				break
			}
		}

		if (bResult) {
			let curCash = GetHeroProperty("funds") || 0
			bResult = curCash >= needCash
		}

		return bResult
	}

	setEquipInfoVisible(b: boolean) {
		this.bEquipInfoShow = b;
	}

	refreshEquip() {
		let itemBGLabel = this.mElemList[this.name + "item_bg"] //显示品质
		let itemIconLabel = this.mElemList[this.name + "icon"] //显示图标
		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量

		let isEquip = this.logicItem.isEquip()
		if (isEquip) {
			itemCountLabel.text = ("")
		}

		let bPreview = this.logicItem.id < 0
		if (bPreview) {
			return
		}

		if (isEquip) {
			if (this.bEquipInfoShow == false)
				return;

			this._updateEquipInfo()
		}
	}

	_updateInfo() {
		let itemBGLabel = this.mElemList[this.name + "item_bg"] //显示品质
		let itemIconLabel = this.mElemList[this.name + "icon"] //显示图标
		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量

		UiUtil.grayComponent(itemIconLabel, false)

		itemIconLabel.enabled = (this.enableIcon)

		let entryId = null
		if (this.logicItem) {
			entryId = this.logicItem.entryId
		}

		if (entryId) {
			let iconName = GetItemIcon(entryId)

			let beiBaoCount = 0
			if (this.logicItem && this.logicItem.id >= 0) {
				beiBaoCount = this.logicItem.getProperty("count")
			}

			let itemCount = this.logicItem.getProperty("previewCount")
			itemCount = itemCount ? itemCount : beiBaoCount

			let quality = this.logicItem.getProperty("quality")
			let qualityImage = GetItemQualityImage(entryId, quality)

			itemBGLabel.source = (qualityImage)
			itemIconLabel.source = (iconName)
			itemCountLabel.text = (itemCount > 1 ? MakeLongNumberShort(itemCount) : "")

			this.refreshEquip()

		} else {

			let bgImage = this.bgImage || "ty_zhuangBeiBg01"

			itemBGLabel.source = (bgImage)
			itemIconLabel.source = ("")
			itemCountLabel.text = ("")
		}

	}

	_updateEquipInfo() {
		let nameRd = this.mElemList[this.name + "name"]
		let stageRd = this.mElemList[this.name + "stage"]

		let equipType = this.logicItem.getRefProperty("type")
		if (equipType == opItemType.COMMON_EQUIP) {
			let stage = this.logicItem.getRefProperty("uselevel")
			let name = this.logicItem.getRefProperty("name")
			let level = this.logicItem.getProperty("add_num") || 1

			AddRdContent(nameRd, name, "ht_16_cc_stroke", "white")
			AddRdContent(stageRd, "#yellow" + stage + Localize_cns("PET_TXT10") + "#orange+" + level, "ht_16_cc_stroke", "white")
		}
	}

	////////////////////////////////////////////////////////////////////////
	//先调用update才能调用以下函数

	setCount(itemCount) {
		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量
		itemCountLabel.text = (itemCount)
		let color = gui.Color.white
		itemCountLabel.textColor = color
	}

	setNeedCount(needCount) {
		if (this.logicItem == null) {
			return
		}
		let entryId = this.logicItem.entryId
		let itemCount = ItemSystem.getInstance().getItemCount(entryId)

		this.needCount = needCount

		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量
		itemCountLabel.text = (itemCount + "/" + this.needCount)

		let color = gui.Color.lime
		if (itemCount < this.needCount) {
			color = gui.Color.white
		}
		itemCountLabel.textColor = color
	}

	justSetNeedCount(needCount) {
		if (this.logicItem == null) {
			return
		}
		let entryId = this.logicItem.entryId
		let itemCount = ItemSystem.getInstance().getItemCount(entryId)

		this.needCount = needCount

		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量
		itemCountLabel.text = (this.needCount)

		let color = gui.Color.lime
		if (itemCount < this.needCount) {
			color = gui.Color.white
		}
		itemCountLabel.textColor = color
	}

	setItemTipsListner(func, obj, userData) {
		this.itemTipsFunc = func
		this.itemTipsObj = obj
		this.userData = userData
	}

	showEnable(b) {
		this.enableIcon = b
	}

	setItemHintEnable(b) {
		this.bEnable = b
	}

	setDefaulImage(imageName) {
		this.bgImage = imageName
	}

	setCountVisible(visible) {
		this.mElemList[this.name + "count"].visible = visible
	}

	setCountText(num, maxNum) {
		let text = num + "/" + maxNum
		this.mElemList[this.name + "count"].text = text
	}

	resetFunEquip(index) {
		let itemBGLabel = this.mElemList[this.name + "item_bg"] //显示品质
		let itemIconLabel = this.mElemList[this.name + "icon"] //显示图标
		let itemCountLabel = this.mElemList[this.name + "count"] //显示数量

		itemBGLabel.source = "ty_zhuangBeiBg01"
		itemIconLabel.source = "item_1000" + (tonumber(index) + 1)
		UiUtil.grayComponent(itemIconLabel, true)
		itemCountLabel.text = ""

		this.mElemList[this.name + "name"].clear()
		this.mElemList[this.name + "stage"].clear()

		this.itemTipsFunc = null
		this.itemTipsObj = null
		this.userData = null

		this.logicItem = null
	}

	////////////////////////////////////////////////////////////////////////
	//物品提示
	onOpenTips(args: egret.TouchEvent) {
		//是否弹获取途径
		if (this.logicItem) {
			let entryId = this.logicItem.entryId
			let itemCount = ItemSystem.getInstance().getItemCount(entryId)
			//不足
			if (this.needCount && this.needCount > itemCount) {
				//道具获取途径
				let wnd: QuickGainFrame = WngMrg.getInstance().getWindow("QuickGainFrame")

				let wndName = this.mParentNode.name;

				let frameList = []
				if (this.frameList) {
					frameList = this.frameList
				} else {
					frameList = [wndName]
				}

				let itemConfig: any = [["item", entryId], frameList]
				wnd.showQuickGainFrame(itemConfig)
				return
			}
		}

		if (!this.bEnable) {
			return
		}


		if (this.itemTipsFunc) {
			//返回true，表示拦截不查看物品信息
			if (this.itemTipsFunc.call(this.itemTipsObj, this.logicItem, this.userData, args)) {
				return
			}
		}

		if (this.logicItem) {
			TLog.Debug("UIItemBox.onOpenTips", this.logicItem.id, this.logicItem.propertyInfo)
			ItemSystem.getInstance().showItemTips(this.logicItem)
		}
	}

	setFrameList(frameList, isShowFrontFrame) {
		this.frameList = frameList
		this.isShowFrontFrame = isShowFrontFrame || false
	}
}