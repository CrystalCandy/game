class TouZiJiJinWindow extends BaseCtrlWnd {
	mElemList;
    scroll : UIScrollList

	public initObj(...params: any[]) {
		
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        
        var elemInfo = [
			{ ["name"]: "btn_jihua_touzi", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onTouziClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let group : eui.Group = this.mElemList["scroll"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "jijin_scroll", group.width, group.height, group)
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
        this.mElemList["group_tab_1"].visible = true;
        
        
	}

	public onHide(): void {
		this.mElemList["group_tab_1"].visible = false;
	}

    onRefresh(){

        //rd_time
        let time = getFormatDiffTime(1522166400)
        AddRdContent(this.mElemList["rd_time"], time, "ht_20_cc_stroke", "blue")
    }


    ///-------------响应事件
    onTouziClick(){

    }
}