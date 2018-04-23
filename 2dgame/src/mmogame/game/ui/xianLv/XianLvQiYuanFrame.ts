// TypeScript file
class XianLvQiYuanFrame extends BaseWnd {
   

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xianlv/XianLvQiYuanLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		UiUtil.setFrameSize(this.mLayoutNode, 470, 430, 85, 215)
        this.setAlignCenter(true, true)
		this.initSkinElemList();

        this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_TOP)

        
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
       RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
		this.onRefresh();
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}
    onRefresh(){
        //rd_1
        let jihuolist = XianLvSystem.getInstance().getJiHuoList()
        let jie = 0
        for(let i = 0; i < jihuolist.length; i++){
            jie += XianLvSystem.getInstance().getLevel(jihuolist[i])
        }

        let jieStr = Localize_cns("XIANLV_QIYUAN_TXT1")
        AddRdContent(this.mElemList["rd_1"], jieStr, "ht_24_cc")

        //rd_2
        let str2 = Localize_cns("XIANLV_QIYUAN_TXT2")
        AddRdContent(this.mElemList["rd_2"], str2, "ht_24_cc")

        //rd_3
        let str3 =  Localize_cns("XIANLV_QIYUAN_TXT3")
        AddRdContent(this.mElemList["rd_3"], str3, "ht_24_cc")
    }

}
