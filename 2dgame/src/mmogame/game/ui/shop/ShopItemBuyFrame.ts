class ShopItemBuyFrame extends BaseWnd {
    shopEntry
    pos
    num


    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/ShopItemBuyLayout.exml"]
        this.num = 1
       
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width= 640
        this.mLayoutNode.height = 532
        this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_buy", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onBtnBuyClick },

            { ["name"]: "btn_add", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick },
            { ["name"]: "btn_add10", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick },
            { ["name"]: "btn_add50", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick },

            { ["name"]: "btn_reduce", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReduceClick },
            { ["name"]: "btn_reduce10", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReduceClick },
            { ["name"]: "btn_reduce50", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReduceClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 2, this.mElemList["group_item"])

        this.mElemList["rd_cost"].setAlignFlag(gui.Flag.CENTER_CENTER)
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
        this.mLayoutNode.visible = true
        this.mLayoutNode.setDoModal(true)
        this.onRefresh()
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)	
	}

    onRefresh(){
        this.num = 1

        ////装备跟非装备
        if(this.shopEntry >= 5 && this.shopEntry <= 16){
            this.mElemList["group_equip"].visible = true
        }else{
            this.mElemList["group_equip"].visible = false
        }

        let tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos]
        let itemId = tempConfig.itemEntry
        let itemConfig = GameConfig.itemConfig[itemId]
        let name = itemConfig.name
        let count = tempConfig.buyNumber
        let quality = tempConfig.quality
        let limitTice = ShopSystem.getInstance().getLimitTwice(this.shopEntry, this.pos)

        let hadBuy = 0
        let tempInfo = ShopSystem.getInstance().getShopPosInfo(this.shopEntry,this.pos)
        if(tempInfo != null){
            hadBuy = tempInfo.count
        }
        //item
        this.mElemList["itemBox"].updateByEntry(itemId, count, quality)
        let nameStr = Localize_cns("SHOP_TXT4")
        
        if(limitTice != 0){
             nameStr = "#green(" + hadBuy + "/" + limitTice + ")"   
        } 
        AddRdContent(this.mElemList["rd_name"], name + "#br#br" + nameStr, "ht_20_cc", "black")
        //描述
        let des = itemConfig.description || Localize_cns("SHOP_TXT7")
        
        AddRdContent(this.mElemList["rd_des"], des, "ht_20_cc", "black")
        //num
        this.onRefreshSelectNum()
       


    }

    onRefreshSelectNum(){
        this.mElemList["label_num"].text = this.num

        let tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos]
        let count = tempConfig.buyNumber
        let costIcon 
        if(tempConfig.money != null){
            costIcon = GetMoneyIcon(tempConfig.money)
        }else{
            costIcon = GetTagIcon(tempConfig.unit)
        }
         //价格
        let totalPrice = tempConfig.price * count * this.num
        AddRdContent(this.mElemList["rd_cost"], Localize_cns("SHOP_TIPS_TXT2") + costIcon + "X" + totalPrice, "ht_20_cc", "black")
    }


    //////////////响应
    onAddClick(args : egret.Event){
        let btnName = args.target.name
        let tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos]
        let count = tempConfig.buyNumber
        let limitTice = ShopSystem.getInstance().getLimitTwice(this.shopEntry, this.pos)
        if(this.num > limitTice && limitTice != 0) return
        let had 
        let cost //= tempConfig.price * count * this.num
        if(tempConfig.money != 0){
            had = GetHeroMoney(tempConfig.money)
        }else{
            had = ItemSystem.getInstance().getItemCount(tempConfig.unit)
        }
        if(had <= 0) return 

        if(btnName == "btn_add"){
            cost = tempConfig.price * count *(this.num + 1)
            if(had < cost) return 
            if(limitTice != 0){
                if(this.num + 1 > limitTice) return
            }
            this.num += 1
            this.onRefreshSelectNum()
        }else if(btnName == "btn_add10"){
            cost = tempConfig.price * count *(this.num + 10)
            if(had < cost) return 
            if(limitTice != 0){
                if(this.num + 10 > limitTice) return
            }
            this.num += 10
            this.onRefreshSelectNum()
        }else if(btnName == "btn_add50"){
            cost = tempConfig.price * count *(this.num + 50)
            if(had < cost) return 
            if(limitTice != 0){
                if(this.num + 50 > limitTice) return
            }
            this.num += 50
            this.onRefreshSelectNum()
        }


    }

    

    onReduceClick(args : egret.Event){
        let btnName = args.target.name
       
        if(btnName == "btn_reduce"){
            if((this.num - 1) <= 0 ) return 
            this.num -= 1
            this.onRefreshSelectNum()
        }else if(btnName == "btn_reduce10"){
            if((this.num - 10) <= 0 ) return
            this.num -= 10
            this.onRefreshSelectNum()
        }else if(btnName == "btn_reduce50"){
            if((this.num - 50) <= 0 ) return
            this.num -= 50
            this.onRefreshSelectNum()
        }


    }
    
    onBtnBuyClick(){
       let tempConfig = GameConfig.ShopCommodityConfig[this.shopEntry][this.pos]
       let had 
       let count = tempConfig.buyNumber
       let cost = tempConfig.price * count * this.num
       let id =  tempConfig.unit
       let unit = tempConfig.money
       if(unit != 0){
            had = GetHeroMoney(unit)
            if(had < cost){
                let formatStr = ""
                if(unit == 2){
                    formatStr = Localize_cns("BIND_YUANBAO")
                }else if (unit == 3){
                    formatStr = Localize_cns("YUANBAO")
                }else if(unit == 1){
                    formatStr = Localize_cns("JINBI")
                }
                MsgSystem.addTagTips(String.format(Localize_cns("SHOP_TIPS_TXT1"),formatStr))
                return 
            }
        }else{
            had = ItemSystem.getInstance().getItemCount(id)
            if(had < cost){
                let name = GameConfig.itemConfig[id].name
                MsgSystem.addTagTips(String.format(Localize_cns("SHOP_TIPS_TXT1"),name))
                return 
            }
        }
        
       // "C2G_SHOP_BUT_ITEM":"uint32;uint32;uint32",
       RpcProxy.call("C2G_SHOP_BUT_ITEM", this.shopEntry, this.pos, this.num)

       this.hideWnd()
    }


    ////----------------接口
    onShowWnd(shopEntry, index,){
        this.shopEntry = shopEntry
        this.pos = index
        this.showWnd()
    }
}