// TypeScript file

class ActivityPrizeFrame extends BaseWnd {

    scroll: UIScrollList;
    controlDataTable: any;
    actConfig:any;
    curIndex:number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/ActivityPrizeLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        let elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);


        let configList = this.actConfig
        let tabNum = size_t(configList)
        if(tabNum > 1){

            let elemInfoList = []
            for(let i = 1; i <= tabNum; i++){
                let v = configList[i]

                let elem = { ["index_type"]: eui.RadioButton, ["name"]: "tab" + i, ["title"] : v.title, ["color"]:gui.Color.white,  ["font"]:"ht_22_cc_stroke",  ["image"]:"ty_tongYongBt05", ["image_down"]:"ty_tongYongBt04", ["w"]: 110, ["h"]: 50,  ["event_name"]: null, ["fun_index"]: null }
                elemInfoList.push(elem)
            }
			UiUtil.createElem(elemInfoList, this.mLayoutNode, this.mElemList, this, this.mElemList["group_tab"])

            var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
            radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
            for(let i = 1; i <= tabNum; i++){
                let radioBtn = <eui.RadioButton>this.mElemList["tab" + i]
                radioBtn.group = radioGroup;
                radioBtn.value = i;
            }
        }

        
        let group: eui.Group = this.mElemList["group_content"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;

        this.curIndex = 1;
        this.refreshFrame()
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
    }


    refreshFrame() {
        if(this.actConfig == null)
            return;

        let config = this.actConfig[this.curIndex]

        let radioBtn = <eui.RadioButton>this.mElemList["tab" + this.curIndex]
        if(radioBtn !=null){
            radioBtn.selected = true;
        }

        let prizeList: any[] = []
        this.mElemList["label_title"].text = ""
        if (config) {
            prizeList = config.prizeList
            this.mElemList["label_title"].text = config.title
            AddRdContent(this.mElemList["rd_tips"], config.tips || "", "ht_24_cc", "ublack")
        }

        let list = splitListByCount(prizeList, 4)

        let scroll = this.scroll
        scroll.clearItemList()
        this.controlDataTable = {}
        for (let k = 0; k < list.length; k++) {
            let v = list[k]

            let window = scroll.getItemWindow(k, 560, 135, 10, 5)

            this.initItemWindow(window)

            this.refreshItemWindow(window, v)
        }
        scroll.refreshScroll()
    }

    initItemWindow(window) {
        let name = window.name
        for (let i = 1; i <= 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 20 + (i - 1) * 140, 10, window)

            let mElemInfo: any = [
                { ["index_type"]: eui.Label, ["name"]: name + "_name" + i, ["title"]: Localize_cns("ROBBER_TXT76"), ["font"]: "ht_20_cc_stroke", ["scale_image"]: "", ["color"]: gui.Color.white, ["x"]: -5, ["y"]: 90, ["w"]: 100, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null },

            ]
            this.mElemList[name + "itemBox" + i].createElem(mElemInfo, this.mElemList, this)
        }
    }

    refreshItemWindow(window, config) {
        let name = window.name

        for (let i = 1; i <= 4; i++) {
            let entryId = config[i-1]
            if (entryId != null) {
                this.mElemList[name + "itemBox" + i].setVisible(true)

                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, 1)
                this.mElemList[name + "_name" + i].text = ItemSystem.getInstance().getItemName(entryId)
            } else {
                this.mElemList[name + "itemBox" + i].setVisible(false)
            }
        }
    }



    onSelected(event: egret.Event) {

		var radioGroup: eui.RadioButtonGroup = event.target;
		//console.log(radioGroup.selection);
		let radiobtn = radioGroup.selection

        this.curIndex = radiobtn.value;
		this.refreshFrame()
	}


    ////////////////////////////////////////////////////////////公共接口//////////////////////////////////////////////////////
    showActivityPrizeFrame(actIndex) {
        if (this.isVisible() == true) {
            return
        }

        if (!GameConfig.ActivityPrizeClientConfig[actIndex]) {
            return
        }

        this.actConfig = GameConfig.ActivityPrizeClientConfig[actIndex]
        return this.showWnd()
    }
}