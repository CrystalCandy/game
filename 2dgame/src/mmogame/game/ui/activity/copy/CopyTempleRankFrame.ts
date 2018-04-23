// TypeScript file
class CopyTempleRankFrame extends ActivityRankBaseFrame {

    public initObj(...params: any[]) {
        
    }

    public onLoad(): void {
        super.onLoad()
    }

    public onUnLoad(): void {
        super.onUnLoad()
    }

    public onShow(): void {
        super.onShow()
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)

        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT21")
        this.mElemList["tl4"].text = Localize_cns("CAMPAIGN_TXT2")
        this.mElemList["my_rank1"].text = Localize_cns("CAMPAIGN_TXT3")
    }

    public onHide(): void {
        super.onHide()
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false)
    }

	refreshItemWindow(window, config) {
		// let name = window.name

		// let [enable, des, str] = FastJumpSystem.getInstance().checkFastJump(config[0], config[1])
		// this.mElemList[name + "_option"].enabled = (enable)
		// AddRdContent(this.mElemList[name + "_dec"], des, "ht_24_cc", "zongse")
		// this.controlDataTable[name + "_option"] = config

		// this.mElemList[name + "_block"].visible = (!enable)
		// if (enable == false) {
		// 	this.controlDataTable[name + "_block"] = str
		// }
	}

    genConfigList() {
        return [1, 2, 1, 1, 1, 1, 1]
    }

     //////////////////////////////////////////
     
}