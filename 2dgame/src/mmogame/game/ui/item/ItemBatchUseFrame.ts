// TypeScript file
class ItemBatchUseFrame extends BaseWnd {

    maxNum: number;
    curNum: number;
    unit:number;
    // callback: Function;
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
        this.curNum = -1
        this.unit = 1;

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
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "leftBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickChangeBtn },
            //{ ["name"]: "leftBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_LONG, ["fun_index"]: this.longClickBuy },

            { ["name"]: "rightBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickChangeBtn },
            //{ ["name"]: "rightBtn", ["title"]: null, ["event_name"]: gui.TouchEvent.TOUCH_LONG, ["fun_index"]: this.longClickBuy },

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
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)


        this.mLayoutNode.visible = true;

        this.curNum = -1
        //this.mElemList["choose_slider"]:SetPercent(0)
        this.refreshFrame()
        this.refreshSlider()

    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this)


        if (this.longSchedule) {
            KillTimer(this.longSchedule)
            this.longSchedule = null
        }

        //this.shopItem = null
        //this.callback = null
        //this.obj  = null
        this.mLayoutNode.visible = false;

        this.useTitle = null
        this.obj = null
        this.genDecCallback = null
        this.clickCallback = null

    }




    // longClickBuy(args: egret.TouchEvent) {


    //     this.selectName = args.target.name


    //     if (this.longSchedule) {
    //         KillTimer(this.longSchedule)
    //         this.longSchedule = null
    //     }
    //     this.longSchedule = SetTimer(this.addShopItem, this, 100, true)
    // }

    // //计时器回调
    // addShopItem(args) {
    //     let name = this.selectName
    //     if (!name) {
    //         return
    //     }
    //     let dirty = false
    //     if (name == "leftBtn") {
    //         if (this.curNum - 1 > 0) {
    //             this.curNum = this.curNum - 1
    //             dirty = true
    //         }
    //     } else if (name == "rightBtn") {
    //         if (this.curNum + 1 <= this.maxNum) {
    //             this.curNum = this.curNum + 1
    //             dirty = true
    //         }
    //     }

    //     if (dirty) {
    //         this.refreshFrame()
    //         this.refreshSlider()
    //     }
    // }



    refreshFrame() {
        if (!this.itemInfo) {
            this.hideWnd()
            return
        }
        let itemInfo = ItemSystem.getInstance().getItemLogicInfoByID(this.itemInfo.id)
        if (!itemInfo) {
            this.hideWnd()
            return
        }
        this.mElemList["itemBox"].updateByItem(itemInfo)
        this.maxNum = itemInfo.getProperty("count") || 0

        if(this.curNum < 0){
            this.curNum = this.maxNum;
        }

        this.mElemList["storeCount"].text = (String.format(Localize_cns("HAVE_NUMBER"), this.maxNum))


        let btnTitle = this.useTitle || Localize_cns("USE")
        this.mElemList["useBtn"].text = (btnTitle)

        this.refreshUseCount()
    }

    refreshUseCount() {
        this.mElemList["useCount"].text = ("x" + this.curNum)

        let txt = ""
        if (this.obj && this.genDecCallback) {
            txt = this.genDecCallback.call(this.obj, this.curNum)
        }
        AddRdContent(this.mElemList["dec_rd"], txt, "ht_22_cc_stroke", "white")
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




    //-增加或减少一个数量
    onClickChangeBtn(args: egret.TouchEvent) {
        let name = args.target.name

        if (this.longSchedule) {
            KillTimer(this.longSchedule)
            this.longSchedule = null
            return
        }

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
            this.refreshSlider()
            this.refreshUseCount()

        }


    }




    onSliderChange(args: egret.Event) {
        var slilder = <eui.HSlider>args.target;

        this.curNum = Math.ceil(slilder.pendingValue)

        if (this.curNum == 0) {
            this.curNum = 1
        }
        //TLog.Debug("DealItemFrame.onSliderChange",args.percent, args.absolute,	this.curNum, this.maxNum)
        //强制调整slider
        if (this.maxNum == 1) {
            this.refreshSlider()
        }
        this.refreshUseCount()

    }


    onClickUseItem(args) {

        if(this.curNum < this.unit ){
            MsgSystem.addTagTips(Localize_cns("ITEM_COUNT_ERROR")) 
            return
        }

        if(this.obj && this.clickCallback ){
            this.clickCallback.call(this.obj, this.curNum)
            return this.hideWnd()
        }
        
        //if(this.curNum <= 0 ){
        //	this.hideWnd()
        //	return
        //}
        let item =  ItemSystem.getInstance().getItemLogicInfoByID(this.itemInfo.id)
        if(item != null ){
            UseItem(item, this.curNum)
        }
        
        this.hideWnd()
    }



    //////////////////////////////////////////////////////////////////////////////////////-

    showWithItemInfo(itemInfo, useTitle?, obj?, genDecCallback?, clickCallback?, unit?) {
        this.itemInfo = itemInfo
        this.useTitle = useTitle
        this.obj = obj
        this.genDecCallback = genDecCallback
        this.clickCallback = clickCallback
        this.unit = checkNull(unit, 1);

        this.showWnd()
    }



}