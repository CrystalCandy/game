class ChatDisplaySelect_PetWnd extends BaseCtrlWnd {
    mElemList;
    controlWndList;

    public initObj(...params: any[]) {

    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        this.controlWndList = {}
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["pet_scroller"].visible = true;
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["pet_scroller"].visible = false;
    }

    refreshFrame() {
        let petInfoList = PetSystem.getInstance().getPetInfoListBySort()

        this.mElemList["pet_wnd"].removeChildren()

        for (let i in petInfoList) {
            let data = petInfoList[i]
            let wnd = this.initItemWindow(i)
            if (wnd) {
                this.refreshItemWindow(wnd, i, data)
            }
        }
    }

    initItemWindow(index) {
        //if (!this.controlWndList[index]) {
            let elemInfo = [
                { ["index_type"]: eui.Group, ["name"]: "pet_group_" + index, ["parent"]: "pet_wnd", ["x"]: 0, ["y"]: 0, ["w"]: 128, ["h"]: 128 },
            ]
            UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this)
            this.controlWndList[index] = this.mElemList["pet_group_" + index]

            this.mElemList["petBox_" + index] = UIPetBox.newObj(this.mLayoutNode, "petBox_" + index, 0, 0, this.mElemList["pet_group_" + index])
            this.mElemList["petBox_" + index].setClickListner(this.onClickPet, this, index)
        //}
        this.controlWndList[index].visible = false
        return this.controlWndList[index]
    }

    refreshItemWindow(wnd, index, data) {
        wnd.visible = true
        if (this.mElemList["petBox_" + index]) {
            this.mElemList["petBox_" + index].updateByPet(data)
        }
    }

    onClickPet(entryId, index) {
        let petInfoList = PetSystem.getInstance().getPetInfoListBySort()
        let petInfo = petInfoList[index]
        this.mParentWnd.onPetSelect(petInfo)
        return true
    }
}