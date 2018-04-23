// TypeScript file
class PlayerOffLineFrame extends BaseWnd {
 
  

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/OffLineLayout.exml"]
        
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		UiUtil.setFrameSize(this.mLayoutNode,617,824,12,38);	
		this.initSkinElemList();
        

		var elemInfo = [
		//	{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_awake", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_sure", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        
	//	this.mElemList["resource_money"].textColor = "ubl"
    //    this.mElemList["resource_exp"].textColor = "ublack"
     //   this.mElemList["resource_cloth"].textColor = "ublack"
        this.mElemList["yueka_money"].textColor = gui.Color.lime
       this.mElemList["yueka_exp"].textColor = gui.Color.lime
        
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
    //    RegisterEvent(EventDefine. PALYER_OFFINE_REFRESH, this.onRefresh, this)
       
		this.mLayoutNode.visible = true;
        this.onRefresh()

	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
   //     UnRegisterEvent(EventDefine. PALYER_OFFINE_REFRESH, this.onRefresh, this)
       
		this.mLayoutNode.visible = false;

	}
	onRefresh(){
        //离线收获
        let info = RoleSystem.getInstance().getOfflineInfo()
        if(size_t(info) == 0) {
            return 
        }
		//rd_time
        let offTime = info.time
        let timeStr =  ""
        if(offTime > 21600) {
            offTime = 21600
        }
        if(offTime > 3600){
            timeStr = getFormatDiffTime(offTime)
        }else{
            timeStr = getFormatDiffTimeSimple(offTime)
        }

        AddRdContent(this.mElemList["rd_time"],"离线时间："+ timeStr, "ht_20_cc" ,"ublack")

        //label_m_resource
        let money = info.funds
        let exp = info.exp
        let cloth = info.equip

        let str = String.format(Localize_cns("ROLE_OFFLINE_DES"),info.equipsell)
        AddRdContent(this.mElemList["rd_des"], str ,"ht_24_cc", "black" )
        //rd_des //
        
        this.mElemList["resource_money"].text = tostring(money)
        this.mElemList["resource_exp"].text = tostring(exp)
        this.mElemList["resource_cloth"].text = tostring(cloth)

        ///月卡
        let yuekamoney = info.fundsadd
        let yuekaexp = info.expadd

        this.mElemList["yueka_money"].text = tostring(yuekamoney)
        this.mElemList["yueka_exp"].text = tostring(yuekaexp)
	}
	
}