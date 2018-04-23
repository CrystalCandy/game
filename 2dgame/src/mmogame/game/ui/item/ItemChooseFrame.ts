class ItemChooseFrame extends BaseWnd {
    userData;

    maxNum: number;
    curNum: number;

    obj: any;

    longSchedule: any;
    selectName: string;


    itemInfo: Item;
    useTitle: string;
    genDecCallback: Function;
    clickCallback: Function;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/ItemBatchUseLayout.exml"]

        this.maxNum = 100
        this.curNum = 1

        this.longSchedule = null
        this.selectName = null

        this.obj = null

    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "leftBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickChangeBtn },

            { ["name"]: "rightBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickChangeBtn },

            { ["name"]: "useBtn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUseItem },

            { ["name"]: "choose_slider", ["title"]: null, ["event_name"]: egret.Event.CHANGE, ["fun_index"]: this.onSliderChange },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);


        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 0, this.mElemList["group_item"])
        this.mElemList["itemBox"].setCountVisible(false)

        this.mElemList["dec_rd"].setAlignFlag(gui.Flag.RIGHT)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.curNum = 1

        this.refreshFrame()
        this.refreshSlider()
    }

    public onHide(): void {

    }

    refreshFrame() {
        if (!this.itemInfo) {
            this.hideWnd()
            return
        }

        this.mElemList["storeCount"].text = (this.useTitle)

        this.maxNum = checkNull(this.itemInfo.getProperty("count") , 1)

        this.mElemList["useCount"].text = ("x" + this.curNum)
        this.mElemList["itemBox"].updateByItem(this.itemInfo)
    }

    onClickChangeBtn(args: egret.TouchEvent) {
        let name = args.target.name

        let dirty = false
        if (name == "leftBtn") {
            if (this.curNum - 1 > 0) {
                this.curNum = this.curNum - 1
                dirty = true
            }
        } else if (name == "rightBtn") {
            if (this.curNum + 1 <= this.maxNum) {
                this.curNum = this.curNum + 1
                dirty = true
            }
        }

        if (dirty) {
            this.refreshFrame()
            this.refreshSlider()
        }
    }

    onSliderChange(args) {
        var slilder = <eui.HSlider>args.target;

        this.curNum = Math.ceil(slilder.pendingValue)

        //引擎有误差,percent为0时，absolute不为0
        if (this.curNum == 0 || args.percent == 0) {
            this.curNum = 1
        }
        //TLog.Debug("DealItemFrame.onSliderChange",args.percent, args.absolute,	this.curNum, this.maxNum)
        //强制调整slider
        if (this.maxNum == 1) {
            this.refreshSlider()
        }
        this.refreshFrame()
    }

    refreshSlider() {

        let maxNum = this.maxNum
        let curNum = this.curNum

        if (maxNum < 1) {
            maxNum = 1
        }

        if (curNum < 1) {
            curNum = 1
        }

        let slider: eui.HSlider = this.mElemList["choose_slider"]
        slider.maximum = maxNum;
        slider.minimum = 1;
        slider.value = curNum;
        slider.snapInterval = 1 ///通过 snapInterval 属性设置增加的有效值。
        //this.mElemList["choose_slider"].enabled = (this.maxNum > 1)
        //this.mElemList["leftBtn"].enabled = (this.maxNum > 1)
        //this.mElemList["rightBtn"].enabled = (this.maxNum > 1)

    }

    onClickUseItem(args) {
        if (this.clickCallback) {
            if (this.clickCallback(this.obj, this.itemInfo, this.curNum, this.userData)) {
                this.hideWnd()
            }
        }
    }


    /////////////////////////////////////////////////////
    showWithItemInfo(item, tips, callback, obj, userData) {
        TLog.Assert(item != null)

        this.itemInfo = item
        this.clickCallback = callback
        this.obj = obj
        this.userData = userData
        this.useTitle = tips

        this.showWnd()
    }
}