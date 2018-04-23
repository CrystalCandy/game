class DailyFindBackFrame extends BaseWnd {
    scorll : UIScrollList

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/DailyFindBackLayout.exml"]
       
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width= 580
        this.mLayoutNode.height = 800
        this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			
			{ ["name"]: "btn_oneKey", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFindClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let group : eui.Group = this.mElemList["group_container"]
        this.scorll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0 , group.width, group.height, group)

	}
    public onUnLoad(): void {
	
	}


	public onShow(): void {
		this.mLayoutNode.visible = true;
		this.mLayoutNode.setDoModal(true)
        this.onRefresh()
        RpcProxy.call("C2G_XiyouLilian_RecordInfo")
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)
	}

    updateWnd(){
        this.onRefresh()
    }

    onRefresh(){
        let actInfo  = GetActivity(ActivityDefine.Boss).getFindBackInfo()
        if(size_t(actInfo) == 0) return
        let scorll = this.scorll
        scorll.clearItemList()

        for(let k = 1; k <= size_t(actInfo); k++){
            let findInfo = actInfo[k - 1]
            let window  =  scorll.getItemWindow(k, 454,58,0,0)
            this.initWindow(window)
            this.refreshWindow(window, findInfo)
        }

        scorll.refreshScroll(true, true)
        scorll.restoreViewXY()

       
    }

    initWindow(window){
        let name = window.name

		let elemInfo = [
            { ["index_type"]: eui.Label, ["name"]: "name_" + name, ["parent"]:name, ["title"]: "", ["font"]:"ht_20_lc",["image"]: "", ["color"]: gui.Color.ublack, ["x"]: 0, ["y"]: 19, ["w"]: 120, ["h"]: 20 , ["messageFlag"] : true},
            { ["index_type"]: eui.Label, ["name"]: "num_" + name, ["parent"]:name, ["title"]: "", ["font"]:"ht_20_lc",["image"]: "", ["color"]: gui.Color.green, ["x"]: 120, ["y"]: 19, ["w"]: 120, ["h"]: 20 , ["messageFlag"] : true},
            { ["index_type"]: eui.Label, ["name"]: "twice_" + name, ["parent"]:name, ["title"]: "", ["font"]:"ht_20_lc",["image"]: "", ["color"]: gui.Color.blue, ["x"]: 258, ["y"]: 19, ["w"]: 120, ["h"]: 20 , ["messageFlag"] : true},
            { ["index_type"]: gui.Button, ["name"]: "btn_" + name, ["parent"]:name, ["title"]: Localize_cns("DAILY_FIND"), ["font"]:"ht_20_cc_stroke", ["color"]: gui.Color.white,["image"]: "ty_tongYongBt2", ["x"]: 360, ["y"]: 0, ["w"]: 94, ["h"]: 49 ,["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFindClick},
            { ["index_type"]: gui.Grid9Image, ["name"]: "image_" + name, ["parent"]:name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "cz_uiLine01", ["x"]: -1, ["y"]: 46, ["w"]: 470, ["h"]: 16 , ["messageFlag"] : true},
        ]
		UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window)

    }

    refreshWindow(window, config){
        let name = window.name

        this.mElemList["name_" + name].text = config.name
        let numStr = String.format(Localize_cns("DAILY_FIND_NUM"), config.backNum)
        this.mElemList["num_" + name].text = numStr
        let twiceStr = String.format(Localize_cns("DAILY_TWICE_NUM"), config.exp)
        this.mElemList["twice_" + name].text = twiceStr

    }

    ///----------响应
    onFindClick(args){
        let name = args.target.name;
        let wnd : DailyFindBackTipsFrame = WngMrg.getInstance().getWindow("DailyFindBackTipsFrame")
        if(name == "btn_oneKey"){
            wnd.showWnd()
            return
        }
	    let index  = name.replace(/[^0-9]/ig, ""); 
        wnd.onShowWnd(tonumber(index))
    }
}