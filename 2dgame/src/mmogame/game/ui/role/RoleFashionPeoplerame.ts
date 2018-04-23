// TypeScript file
class RoleFashionPeopleFrame extends BaseWnd {
   

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/RoleFashionPeopleLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		UiUtil.setFrameSize(this.mLayoutNode, 470, 400, 85, 225)
		this.initSkinElemList();

        let t = <eui.Group>this.mElemList["group_1"]
        t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideWnd, this)
		
        this.mElemList["rd_now"].setAlignFlag(gui.Flag.LEFT_CENTER);
		this.mElemList["rd_next"].setAlignFlag(gui.Flag.LEFT_TOP);
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
		this.onRefresh();
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}
    onRefresh(){

        //装备
        let equiplist = RoleSystem.getInstance().getRoleInfo("euqiplist")

        for(let k in equiplist){
            
        }

        //rd_now
        let nowEffect = "xxxxxxxxxxxxxxxxxx";
        let wuShi = 124;
        let jianShao = 234
        let nowStr = String.format(Localize_cns("ROLE_FMAN_TXT1"),nowEffect, wuShi, jianShao)
        AddRdContent(this.mElemList["rd_now"], nowStr,"ht_24_cc", "white")
        //rd_next
        let nextEffect = "xxxxxxxxxxxxxxxxxx";
        let nextWuShi = 124;
        let nextJianShao = 234
        let zhanLi = 298099;
        let nextStr = String.format(Localize_cns("ROLE_FMAN_TXT2"),nextEffect, nextWuShi, nextJianShao,zhanLi)
        AddRdContent(this.mElemList["rd_next"], nextStr,"ht_24_cc", "white")
    }
}
