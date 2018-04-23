class ChatDisplaySelect_ItemWnd extends BaseCtrlWnd {
    mElemList;
    tabIndex: number;
    controlWndList: any;

    public initObj(...params: any[]) {

    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList
        this.tabIndex = this.mParentWnd.tabWndList.getTabIndex() + 1
        this.controlWndList = {}
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this)
        this.mElemList["item_scroller"].visible = true;
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this)
        this.mElemList["item_scroller"].visible = false;
    }

    refreshFrame() {
        this.tabIndex = this.mParentWnd.tabWndList.getTabIndex() + 1
        let itemList = this.getItemList()

        this.mElemList["item_wnd"].removeChildren()

        for (let i in itemList) {
            let data = itemList[i]
            let wnd = this.initItemWindow(i)
            if (wnd) {
                this.refreshItemWindow(wnd, i, data)
            }
        }
    }

    initItemWindow(index) {
        //if (!this.controlWndList[index]) {
            let elemInfo = [
                { ["index_type"]: eui.Group, ["name"]: "item_group_" + index, ["parent"]: "item_wnd", ["x"]: 0, ["y"]: 0, ["w"]: 88, ["h"]: 88 },
            ]
            UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this)
            this.controlWndList[index] = this.mElemList["item_group_" + index]

            this.mElemList["itemBox_" + index] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + index, 0, 0, this.mElemList["item_group_" + index])
            this.mElemList["itemBox_" + index].setItemTipsListner(this.onClickItem, this, index)
        //}
        this.controlWndList[index].visible = false
        return this.controlWndList[index]
    }

    refreshItemWindow(wnd, index, data) {
        wnd.visible = true
        if (this.mElemList["itemBox_" + index]) {
            this.mElemList["itemBox_" + index].updateByItem(data)
        }
    }

    getItemList() {
        let itemList: any = {}
        if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_EQUIP) {
            itemList = ItemSystem.getInstance().getEquipItemList()
        } else if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_BOOK) {
            itemList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ITEM_TYPE_ACTIVE_ITEM)
        } else if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_GOODS) {
            itemList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ITEM_TYPE_GOODS)
        }

        TLog.Debug("ChatDisplaySelect_ItemWnd.getItemList", this.tabIndex)
        return itemList
    }

    onClickItem(logicItem, index) {
        this.mParentWnd.onItemSelect(logicItem)
        return true
    }
}