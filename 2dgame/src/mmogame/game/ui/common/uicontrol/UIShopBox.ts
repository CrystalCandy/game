/*
作者:
    ljq
	
创建时间：
   2018.03.21(周三)

意图：
   商店框通用控件
   
公共接口：
   
*/
class UIShopBox extends TClass {

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

	shopEntry :number
	index :number

	public initObj(...args: any[]): void {
		this.mParentNode = args[0]
		this.name = args[1]
		let x = args[2]
		let y = args[3]

		let parentWnd = args[4]
		let scale = 1
		let w = 270
		let h = 150
		if (args[5]) {
			scale = args[5]
			w = w * scale
			h = h * scale
		}
		this.rootWnd = null
		let bgImg = "ty_uiDi03"


		this.mElemList = {}
		let itemBoxName = this.name;
		let mElemInfo = [
			{ ["index_type"]: eui.Group, ["name"]: itemBoxName, ["x"]: x, ["y"]: y, ["w"]: w, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image, ["name"]: this.name + "_bg", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_20_cc", ["image"]: bgImg, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBox },
            { ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "_rd_name", ["parent"]: itemBoxName, ["titile"]: "", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 5, ["w"]: w, ["h"]: 20, ["messageFlag"]: true },
			{ ["index_type"]: gui.Grid9Image, ["name"]: this.name + "_line", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "cz_uiLine01", ["color"]: gui.Color.white, ["x"]: 14, ["y"]: 30, ["w"]: 232, ["h"]: 16, ["messageFlag"]: true},
			{ ["index_type"]: eui.Group, ["name"]: this.name + "_item", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_20__cc", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 53, ["w"]: 80, ["h"]: 80, ["messageFlag"]: true},
			{ ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "_rd_cost", ["parent"]: itemBoxName, ["titile"]: "", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 122, ["y"]: 63, ["w"]: 118, ["h"]: 20, ["messageFlag"]: true },
			{ ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "_rd_limit", ["parent"]: itemBoxName, ["title"]: "", ["font"]: "ht_18_cc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 122, ["y"]: 93, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
		]
		UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd)

        this.mElemList[this.name + "_itemBox"] = UIItemBox.newObj(this.mParentNode, this.name + "_itemBox" , 0, 0, this.mElemList[this.name + "_item"])

		this.rootWnd = this.mElemList[itemBoxName]

        this.mElemList[this.name + "_rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER)
		this.mElemList[this.name + "_rd_cost"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList[this.name + "_rd_limit"].setAlignFlag(gui.Flag.LEFT_CENTER)

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

    updateByEntry(shopEntry, index){

		this.shopEntry = shopEntry
		this.index = index

		let tempConfig = GameConfig.ShopCommodityConfig[shopEntry][index]

		let id = tempConfig.itemEntry
		let quality = tempConfig.quality
		let count = tempConfig.buyNumber
        let name = GameConfig.itemConfig[id].name
        //名字
        AddRdContent(this.mElemList[this.name + "_rd_name"], name, "ht_20_cc", "black")
        this.mElemList[this.name + "_itemBox"].updateByEntry(id, count ,quality)

		//消耗物品
		let costStr = ShopSystem.getInstance().getShopCostStr(shopEntry, index)
		AddRdContent(this.mElemList[this.name + "_rd_cost"], costStr, "ht_20_cc", "black")

		//解锁条件
		let jieSuoStr = ShopSystem.getInstance().getShopJudgeStr(shopEntry, index)
		AddRdContent(this.mElemList[this.name + "_rd_limit"], jieSuoStr, "ht_18_cc", "black")

    }

	//点击事件
	onClickBox(args:egret.Event){
		let wnd = WngMrg.getInstance().getWindow("ShopItemBuyFrame")
		wnd.onShowWnd(this.shopEntry, this.index)
	}


}