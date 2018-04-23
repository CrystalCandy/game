// TypeScript file
class UIXianLvListBox extends TClass {
    mParentNode: eui.Component;
    parentWnd: any;
    scroll: UIScrollList;
    mElemList: any;
    mCallbackFunc: Function;
    mCallbackObj: any;
    mCallbackData: any;
    xianlvList: any;
    select: number
    callbackIndex : any

    public initObj(...args: any[]): void {
        this.mParentNode = args[0]
        let name = args[1]
        let x = args[2]
        let y = args[3]
        let w = args[4]
        let h = args[5]

        this.parentWnd = args[6]

        this.mElemList = {}
        this.select = 0 //默认

        this.scroll = UIScrollList.newObj(this.mParentNode, "xianlv_scroll" + name, x, y, w, h, this.parentWnd, UIScrollList.DIR_HORIZON)

        RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.setXianLvList, this)
    }

    _initXianLvWindow(window, k) {
        let name = window.name

        let ElemInfo = [
            { ["index_type"]: eui.Group, ["name"]: name + "_group_XianLv", ["x"]: 0, ["y"]: 0, ["w"]: 100, ["h"]: 150 },
            { ["index_type"]: eui.Group, ["name"]: name + "_box_wnd", ["x"]: 0, ["y"]: 0, ["w"]: 100, ["h"]: 150 },
            { ["index_type"]: gui.RichDisplayer, ["name"]: name + "_rd_name", ["parent"]: name + "_box_wnd", ["x"]: 0, ["y"]: 90, ["w"]: 100, ["h"]: 25, ["messageFlag"]: true },
            { ["index_type"]: eui.Label, ["name"]: name + "_lv", ["parent"]: name + "group_XianLv_", ["title"]: "", ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.yellow, ["x"]: 0, ["y"]: 120, ["w"]: 100, ["h"]: 25, ["messageFlag"]: true },
        ]
        UiUtil.createElem(ElemInfo, this.mParentNode, this.mElemList, this, window)

        this.mElemList[name + "_rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER)
        this.mElemList[name + "_lv"].textColor = gui.Color.yellow
        this.mElemList[name + "_lv"].visible = false

        this.mElemList["petBox_" + name] = UIPetBox.newObj(this.mParentNode, "petBox_" + name, 10, 8, this.mElemList[name + "_box_wnd"])
        this.mElemList["petBox_" + name].setClickListner(this.onXianLvCallBack, this, k)
    }
    _refreshXianLvWindow(window, entryId, index) {
        let name = window.name;
        let data = GameConfig.ActorXianLvConfig[entryId]


        let star = -1

        let fightlist = XianLvSystem.getInstance().getFightList()
        let level = XianLvSystem.getInstance().getLevel(entryId)

        let quality = GameConfig.ActorXianLvConfig[entryId].quality
        let color = GetQualityColorStr(quality)
        AddRdContent(this.mElemList[name + "_rd_name"], data.name, "ht_20_cc_stroke", color)
        //如果激活
        this.mElemList["petBox_" + name].setEnable(false)
        if (XianLvSystem.getInstance().isExit(entryId)) {

            star = XianLvSystem.getInstance().getStar(entryId)
            let jieStr = level + "阶"
            this.mElemList[name + "_lv"].text = jieStr
            this.mElemList[name + "_lv"].visible = true
            this.mElemList["petBox_" + name].setEnable(true)
        }
        this.mElemList["petBox_" + name].updateByEntry(entryId, star)

        if (this.select == index) {
            this.mElemList["petBox_" + name].select(true)
        }

        for (let k in fightlist) {
            if (tonumber(k) == entryId) {
                this.mElemList["petBox_" + name].setFightFlag()
            }
        }
    }

     onXianLvCallBack(entryId, index) {
        if (this.select == index) return true;

        this.select = index

        let max = size_t(this.xianlvList)
        for (let i = 0; i < max; i++) {
            let window = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0)
            let name = window.name
            this.mElemList["petBox_" + name].select(false)
            if (this.select == i) {
                this.mElemList["petBox_" + name].select(true)
            }
        }

        if (this.mCallbackFunc && this.mCallbackObj) {
            this.mCallbackFunc.call(this.mCallbackObj, this.xianlvList[this.select])
        }

        return true
    }

    setClickListner(func, obj) {
        this.mCallbackFunc = func
        this.mCallbackObj = obj
    }

    rightMove() {
        let elem = <eui.Scroller>this.scroll.scroller
        let moveDis = elem.viewport.scrollH
        let index = Math.floor(moveDis / 100)
        let limit = size_t(this.xianlvList)
        let moveTo = ((index + 6) > limit) ? (limit - 5) : (index + 5)
        this.scroll.moveToScrollIndex(moveTo, true)
    }

    leftMove() {
        let elem = <eui.Scroller>this.scroll.scroller
        let moveDis = elem.viewport.scrollH
        let index = Math.floor(moveDis / 80)
        let moveTo = (index - 5) < 0 ? 0 : (index - 5)
        this.scroll.moveToScrollIndex(moveTo, true)
    }

    setXianLvList() {
        this.xianlvList = []

        this.xianlvList = XianLvSystem.getInstance().getControlList();
        this.scroll.clearItemList()
        //更新拥有
        let max = size_t(this.xianlvList)
        for (let i = 0; i < max; i++) {
            let v = this.xianlvList[i].Id
            let window = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0)
            this._initXianLvWindow(window, i)
            this._refreshXianLvWindow(window, v, i)
        }
        this.scroll.refreshScroll()
        this.scroll.restoreViewXY()

        if (this.mCallbackObj && this.callbackIndex != null) {
            this.onRefreshDotTips(this.mCallbackObj, this.callbackIndex)
        }
        return this.xianlvList[this.select].Id

    }
    //---------自定义红点
    onRefreshDotTips(obj: BaseWnd, index) {
        let xianlvList = this.xianlvList
        for (let k in xianlvList) {
            let xianlvInfo = xianlvList[k]
            let xianlvId = xianlvInfo.Id
            let check  = false
            if(index == 0){ //仙侣升级
                check = GuideFuncSystem.getInstance().checkXianLvUpgrade(xianlvId)
            }else{  //仙侣升星
                check = GuideFuncSystem.getInstance().checkXialvUpStart(xianlvId)
            }     
            if (check) {
                let window = this.scroll.getItemWindow(tonumber(k), 100, 150, 0, 0, 0)
                obj.createDotTipsUI(this.mElemList["petBox_" + window.name].rootWnd)
            }

        }

    }
}