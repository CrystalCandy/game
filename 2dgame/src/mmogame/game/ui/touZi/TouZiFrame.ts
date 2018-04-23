class TouZiFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
    infoList: any[];
	activityList : any[];

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/TouZiLayout.exml"]
        //this.tabIndex = -1
	}

    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		this.mLayoutNode.setDoModal(true)

		this.mElemList["group_tab_1"].visible = false;
		this.mElemList["group_tab_2"].visible = false;
		this.mElemList["group_tab_3"].visible = false;
		this.mElemList["group_tab_4"].visible = false;

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		this.disposeData()
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, this.activityList)
	}

	disposeData(){
		let activityList = []
		this.infoList = [
			{ ["index"]: PayActivityIndex.FIRST_PAY, ["checkFunc"]: this.checkShouChong,["wnd"]: TouZiShouChongWindow.newObj(this.mLayoutNode, this),["check"]:this.onTab2Click,["text"]:Localize_cns("INVEST_TXT23")},
			{ ["index"]: PayActivityIndex.LEVEL_FUNDS, ["checkFunc"]: this.checkZiJin,["wnd"]: TouZiChengzhangWindow.newObj(this.mLayoutNode, this),["check"]:this.onTab2Click,["text"]:Localize_cns("INVEST_TXT24")},
			{ ["index"]: PayActivityIndex.INVEST_PLAN, ["checkFunc"]: this.checkJiHua,["wnd"]: TouZiJiHuaWindow.newObj(this.mLayoutNode, this),["check"]:this.onTab1Click,["text"]:Localize_cns("INVEST_TXT25")},
			{ ["index"]: PayActivityIndex.ACCUM_PAY_PRIZE, ["checkFunc"]: this.checkLeiChong,["wnd"]: TouziLeiJiWindow.newObj(this.mLayoutNode, this),["check"]:this.onTab1Click,["text"]:Localize_cns("INVEST_TXT26")},
		]

		let index = 1
		for (let i = 0; i < size_t(this.infoList); i++) {
			 let infoList = this.infoList[i]
			 let info = []
			 if(infoList.checkFunc.call() == true){
				 info["name"] = "tab" + index
				 info["wnd"] = infoList.wnd
				 info["text"] = infoList.text
				 info["index"] = infoList.index
				 table_insert(activityList,info)
				 index = index + 1
			 }
		}

		this.activityList = activityList
	}

    public onUnLoad(): void {
		
	}

	public onShow(): void {
	//	RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		// if (this.tabIndex != -1) {
			this.mLayoutNode.visible = true;
			this.tabWndList.setWndVisible(true);
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		// }else{
		// 	this.onHide()	//都没有得显示了
		// }

		for(let i = 0;i<4;i++){
			let info = this.activityList[i]
			if(info){
				this.mElemList["tab"+(i+1)].visible = true
				this.mElemList["tab"+(i+1)].label = info.text 
				let text = info.text 
				
			}else{
				this.mElemList["tab"+(i+1)].visible = false
				this.mElemList["tab"+(i+1)].label = ""
			}
		}
	}

	public onHide(): void {
	//	UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		// if (this.tabIndex != -1) {
			this.tabWndList.setWndVisible(false);
		// }
	}

	//检查
	checkShouChong(){
		//let index = PayActivityIndex.FIRST_PAY
		// return true
		return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.FIRST_PAY)
	}

	checkJiHua(){
		// return true
		return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.LEVEL_FUNDS)
	}

	checkZiJin(){
		// return true
		return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.INVEST_PLAN)
	}

	checkLeiChong(){
		// return true 
		return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.ACCUM_PAY_PRIZE)
	}

    ////接口
    showWithIndex(index){
		this.disposeData()
		for(let i =0;i<size_t(this.activityList);i++){
			let info = this.activityList[i]
			if(info.index == index){
				this.tabIndex = i
			}
		}
        this.showWnd()
    }

	///-----检查是否开启
    onTab0Click(){
		//this.showWithIndex(1)
		return true
        // ExecuteMainFrameFunction("shouchong")
        // this.hideWnd()
        // return false
		
    }

    onTab1Click(){
		//this.showWithIndex(2)
        return true

    }

    onTab2Click(){
		//this.showWithIndex(3)
        return false
    }

	onTab3Click(){
		//this.showWithIndex(3)
        return true
    }	
}