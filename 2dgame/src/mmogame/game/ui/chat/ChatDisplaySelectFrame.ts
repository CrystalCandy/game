
let chatDisplayType = {
    "ID_TAB_DISPLAYSELECT_PET": 1, //伙伴
    "ID_TAB_DISPLAYSELECT_EQUIP": 2, //装备
    "ID_TAB_DISPLAYSELECT_BOOK": 3,//技能书
    "ID_TAB_DISPLAYSELECT_GOODS": 4,//道具
}

class ChatDisplaySelectFrame extends BaseWnd {
    curTabIndex: number;
    tabIndex: number;
    tabWndList: UITabWndList;

    selectCallBack: any;
    callbackObj: any;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/ChatDisplaySelectLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();

        this.setAlignCenter(true, true)

        this.curTabIndex = chatDisplayType.ID_TAB_DISPLAYSELECT_PET
        this.tabIndex = -1

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let tabInfoList = [
            { name: "tab1", wnd: ChatDisplaySelect_PetWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
            { name: "tab4", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
        ]
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

        this.mElemList["pet_scroller"].visible = false
        this.mElemList["item_scroller"].visible = false
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);

        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex)
        }
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);

        this.selectCallBack = null
        this.callbackObj = null
    }

    ////////////////////////////////////////////////////////
    onPetSelect(petInfo) {
        if (petInfo == null) {
            return
        }

        let typeToShow = channelOption.PET

        let petID = petInfo.id
        let playerId = GetHeroProperty("id")

        let name = petInfo.name
        let xmlLink = typeToShow + ";" + playerId + ";" + petID + ";" + name

        TLog.Debug(xmlLink, name)
        if (this.selectCallBack) {
            this.selectCallBack.call(this.callbackObj, xmlLink, name)
            this.hideWnd()
        }
    }

    onItemSelect(logicItem) {
        //TLog.Debug("onItemSelect", logicItem)
        if (logicItem == null) {
            return
        }

        let typeToShow = channelOption.ITEM

        let itemId = logicItem.id
        let playerId = GetHeroProperty("id")

        let content = logicItem.getRefProperty("name")
        let xmlLink = typeToShow + ";" + playerId + ";" + itemId + ";" + content

        TLog.Debug(xmlLink, content)
        if (this.selectCallBack) {
            this.selectCallBack.call(this.callbackObj, xmlLink, content)
            this.hideWnd()
        }
    }

    ///////////////////////////////////////////////////////
    showWndWithSelectCallback(callback, obj) {
        this.selectCallBack = callback
        this.callbackObj = obj
        this.showWnd()
    }
}