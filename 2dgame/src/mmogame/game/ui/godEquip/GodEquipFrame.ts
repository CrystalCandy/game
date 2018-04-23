// TypeScript file
class GodEquipFrame extends BaseWnd {

    emptyView: UIEmptyView;
    tabWndList: UITabWndList;
    tabIndex: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/godEquip/GodEquipLayout.exml"]
        this.tabIndex = -1;
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        let tabInfoList = [
            // { name: "tab1", wnd: EquipFactory_EnhanceWnd.newObj(this.mLayoutNode, this) },
            // { name: "tab2", wnd: EquipFactory_IdentWnd.newObj(this.mLayoutNode, this) },
            // { name: "tab3", wnd: EquipFactory_ChongSuoWnd.newObj(this.mLayoutNode, this) },
        ]
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
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
    }


    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    showWithIndex(index?) {
        if (index == null) {
            index = 0
        }
        this.tabIndex = index;
        this.showWnd();
    }
}