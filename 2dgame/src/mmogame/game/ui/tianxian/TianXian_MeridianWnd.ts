// TypeScript file
class TianXian_MeridianWnd extends BaseCtrlWnd {
    mElemList;
    type 
    select
    jie

    public initObj(...params: any[]) {
        this.type = cellOptionsIndex.TianXianJingMai
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

         var elemInfo = [
			{ ["name"]: "btn_tupo", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onTupoClick },
			
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        this.mElemList["meridianBox"] = UIItemBox.newObj(this.mLayoutNode, "meridianBox", 80, 5 , this.mElemList["group_btom"])
        
        this.mElemList["rd_top"].setAlignFlag(gui.Flag.LEFT_TOP)
        this.mElemList["rd_bottom"].setAlignFlag(gui.Flag.LEFT_TOP)
        this.mElemList["rd_this_num"].setAlignFlag(gui.Flag.LEFT_TOP)
        this.mElemList["rd_total_num"].setAlignFlag(gui.Flag.LEFT_TOP)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.TIANXIAN_UPDATE, this.refreshFrame, this)
        this.mElemList["meridian_group"].visible = true
        this.mElemList["title"].text = Localize_cns("TianXianJingMai")
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.TIANXIAN_UPDATE, this.refreshFrame, this)
        this.mElemList["meridian_group"].visible = false
    }


    refreshFrame() {
        let recvInfo = TianXianSystem.getInstance().getTianXianInfo(this.type)
        let recvlist = recvInfo["jingmaidatalist"]
        if(size_t(recvlist) == 0) {
            recvlist = [0, 1]
        }
        
        let jie = recvlist[1]
        let index = recvlist[0]
        this.select = index + 1
        this.jie = jie

        let typeConfig = GameConfig.FunTianXianJingMaiTypeConfig["TianXianJingMai"][jie]
        let jieStr = typeConfig.Typename
        
        for(let i = 1;i <= 11; i++){
            this.mElemList["name_" + i].source = "tx_jingMaiText08"
            this.mElemList["image_" + i].source = "tx_jingMaiDian01"
        }

        //更新等级 label_chong 
        this.mElemList["label_chong"].text = jieStr
        for(let i = 1; i <= index; i++){
            this.mElemList["name_" + i].source = "tx_jingMaiText08"
            this.mElemList["image_" + i].source = "tx_jingMaiDian02"
        }
        //更新属性
        let jingmaiConfig = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][this.select]
        let maiConfig = table_effect(jingmaiConfig.effects)
        let singleStr = ""
        for(let k in maiConfig){
            singleStr += "#br#rf" + GetPropertyName(lastAbilityNameToIdOptions[k]) + "#green" + maiConfig[k]
        }
        AddRdContent(this.mElemList["rd_bottom"], singleStr, "ht_20_cc", "black")

        let totalStr = ""
        let totalConfig = TianXianSystem.getInstance().getToTalConfig(jie, index)
        for(let k in totalConfig){
            totalStr += "#br#rf" + GetPropertyName(lastAbilityNameToIdOptions[k]) + "#green" + totalConfig[k]
        }
        AddRdContent(this.mElemList["rd_top"], totalStr, "ht_20_cc", "black")
        //更新战斗力
        let force =  recvInfo["force"]//GetForceMath(totalConfig)
        DrawNumberStringImage(this.mElemList["force_num"], "zhanLi_", "z" + force, 0, 0, -3)
        //更新消耗材料
        let itemid = jingmaiConfig.itemid
        this.mElemList["meridianBox"].updateByEntry(itemid) 
        let name = ItemSystem.getInstance().getItemName(itemid)
        let nameColor = "blue"
        
       
        let had = ItemSystem.getInstance().getItemCount(itemid)
        let need = typeConfig.itemnum
        let hadStr = (had >= need)?"#rf#green" : "#rf#red"
        name  = "#" + nameColor + name + "x" + need + "#br#br" + Localize_cns("ITEM_TXT30")+ hadStr + had
        AddRdContent(this.mElemList["rd_4_had"], name, "ht_20_cc", "black")

        //经脉丹
        let totalid = 60017
        let count = ItemSystem.getInstance().getItemCount(totalid)
        let totalHadStr = "#JINGMAI_WHOLE" + Localize_cns("ITEM_TXT30") + "#green" + count
        AddRdContent(this.mElemList["rd_total_num"], totalHadStr, "ht_20_cc", "black")
        //突破丹
        let this_itemid = 60018
        let this_had = ItemSystem.getInstance().getItemCount(this_itemid)
        let thisHadStr = "#JINGMAI_SONE" + Localize_cns("ITEM_TXT30") + "#green" + this_had
        AddRdContent(this.mElemList["rd_this_num"], thisHadStr, "ht_20_cc", "black")

    }
    onTupoClick(){
        let typeConfig = GameConfig.FunTianXianJingMaiTypeConfig["TianXianJingMai"][this.jie]
        let jingmaiConfig = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][this.select]
        let itemid = jingmaiConfig.itemid

        let had = ItemSystem.getInstance().getItemCount(itemid)
        let need = typeConfig.itemnum
        if(need == null){
           MsgSystem.addTagTips(Localize_cns("TIANXIAN_MAXLEVEL"))
        }
        if(had < need) return 
        RpcProxy.call("C2G_SIMPLECELLFUN_JINGMAIUP", this.type, this.select, this.jie)//"C2G_SIMPLECELLFUN_JINGMAIUP":"uint16;uint16;uint16"   --entryid 玩法筋脉  index --升级第几个经脉  indextype经脉多少重

    }
}