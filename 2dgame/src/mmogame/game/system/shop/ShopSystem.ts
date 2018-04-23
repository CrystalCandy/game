/*
作者:
	ljq
	
创建时间：
	2018.3.21(周四)

意图： 
	商店系统

公共接口：

*/

class ShopSystem extends BaseSystem {
    shopList 

    static SHOP_YUANBAO = "yuanbao"
    static SHOP_BANGYUAN = "bangyuan"
    static SHOP_CHONGWU = "chongwu"
    static SHOP_XIANLV = "xianlv"

    static SHOP_ZHUANGBEI = "zhuangbei"
    static SHOP_LEIYIN = "leiyin"
    static SHOP_BANGHUI = "banghuishangdian"
    static FULI_BANGHUI = "banghuifuli"

    static SHOP_ZHUANGBAN = "zhuangban"
    static SHOP_PIFU = "pifu"
    static SHOP_YOUQING = "youqing"
    static SHOP_WEIWANG = "weiwang"

    static SHOP_JINGJI = "jingjishangdian"
    static FULI_JINGJI = "jingjifuli"
    static SHOP_HUSONG = "husong"
    static SHOP_DATI = "dati"



	public initObj(...args: any[]): void {
		this.onClear()
		
	}

    onClear() {
        this.shopList = {}
    }
      

	destory() {
		this.onClear()
	}

	prepareResource(workQueue) {
		GameConfig.initShopSystemCsv(workQueue)
	}


    initShopList(info){
        this.shopList = {}
        for(let k = 0; k < size_t(info); k++){
            let v = info[k]
            let tempConfig = {}
            tempConfig["shopEntry"] =  v[2]
            tempConfig["index"] = v[0]
            tempConfig["count"] = v[1]

            if(this.shopList[v[2]] == null){
                this.shopList[v[2]] = []
            }
            table_insert(this.shopList[v[2]], tempConfig)
        }

        FireEvent(EventDefine.SHOP_FUN_UPDATE, null)
    }

    //更新消息
   updateShopInfoField(id, info){
       
   }

   getShopInfo(shopEntry){
      
      return this.shopList[shopEntry]
   }

   getShopPosInfo(shopEntry, index){
      let tempConfig = this.shopList[shopEntry]
      if(tempConfig == null) { 
          return null
      }
      for(let k in tempConfig){
          let temp = tempConfig[k]
          if(temp.index = index){
          return temp
        }
      }
      
      return null
   }
  
   //---------------装备商店
   getShopEquipItemList(){
       let equiplist = [] 
       let tempConfig = GameConfig.ShopCommodityConfig
       for(let k in tempConfig){
           let v = tempConfig[k]
           for(let key in v){
               let temp = v[key]
               if(temp.groupName == ShopSystem.SHOP_ZHUANGBEI){
                   if(table_isExsit(equiplist, temp.shopEntry) == false){
                       table_insert(equiplist, temp.shopEntry)
                   }
               }
           }
       } 
       
       return equiplist
   }

   

   ///////////////////////通用商店接口
   //获取各个商店的shopEntry
   getShopEntryByGroupName(groupName : string){
       if(groupName == ShopSystem.SHOP_ZHUANGBEI){
           return 0
       }
       let tempConfig = GameConfig.ShopCommodityConfig
       for(let k in tempConfig){
           let v = tempConfig[k]
           for(let key in v){
               if(v[key].groupName == groupName){
                   return v[key].shopEntry
               }
           }
       }
   }

   //更具商店的shopEntry获得商店名字
   getShopNameByEntry(entry){
       if(entry == 0){
           return Localize_cns("SHOP_TXT1")
       }
       return GameConfig.ShopCommodityConfig[entry][1].shopName
   }

   //根据商店的shopEntry获得商店的itemlist
   getShopItemList(entry){
       let tempConfig =  GameConfig.ShopCommodityConfig[entry]
       let recvConfig = []
       let limitConfig = []
       for(let k in tempConfig){
           let netConfig = this.getShopPosInfo(entry, k)
           if(netConfig != null){
               let limitTwice = this.getLimitTwice(entry, k) // 为0无限制
               if(limitTwice == 0){
                   for(let k in tempConfig){
                       table_insert(recvConfig, tempConfig[k])
                   }
                   return recvConfig
               }
               if(netConfig.count >= limitTwice){  //如果有限制，判断是否售完，售完加到最后
                   table_insert(limitConfig, tempConfig[k])
               }else{
                   table_insert(recvConfig, tempConfig[k])
               }
           }else{
               table_insert(recvConfig, tempConfig[k])
           }
       }
       if(size_t(limitConfig) != 0)
       {
           for(let k in limitConfig){
               table_insert(recvConfig, limitConfig[k])
           }
       }

       return  recvConfig
   }

   //取到消耗物品
   getShopCostItemStr(groupName){
       let entry = this.getShopEntryByGroupName(groupName)
       let costItem = GameConfig.ShopCommodityConfig[entry][1].costItem || 2  
       let recvStr = ""
       if(costItem == 2 || costItem == 3){
           recvStr += GetMoneyIcon(costItem) + GetHeroMoney(costItem)
       }else{
           recvStr += GetTagIcon(costItem) + ItemSystem.getInstance().getItemCount(costItem)
       }
       return  recvStr
   }


   //////ShopitemBox
   getShopCostStr(shopEntry , index){
       let recvStr = ""
       let shopConfig = GameConfig.ShopCommodityConfig[shopEntry][index]
       if(shopConfig.money != 0){
           recvStr += GetMoneyIcon(shopConfig.money) + "X" + shopConfig.price
       }else if(shopConfig.unit != 0){
          recvStr += GetTagIcon(shopConfig.unit) + "X" + shopConfig.price
       }
       return recvStr
   }

   getShopJudgeStr(shopEntry, index){
       let recvStr = Localize_cns("SHOP_TXT4")
       let shopConfig = GameConfig.ShopCommodityConfig[shopEntry][index]
       let tempInfo = this.getShopPosInfo(shopEntry, index)
       let limitTwice = this.getLimitTwice(shopEntry, index)  //限购次数
       if(limitTwice != 0 ){
           let hadBuy =  0
           if(tempInfo != null){
               hadBuy = tempInfo.count
           }
           recvStr = String.format(Localize_cns("SHOP_TXT2") , hadBuy , limitTwice )
               
       }

       let limit = 0
       let isEnough = false //未解锁
       for(let k in opJudgeJieSuo){
           let v = opJudgeJieSuo[k]
           if(shopConfig[v]!= 0 ){
               limit = shopConfig[v]
               isEnough = this.getJudgeIsEnough(v, limit) //是否达到解锁条件
               if(tempInfo != null){
                    let hadBuy = tempInfo.count
                    if(isEnough != false){
                        recvStr = "#red" + String.format(this.getJudgeStr(v), limit)
                    }else{
                        if(hadBuy >= limitTwice){
                            recvStr = Localize_cns("SHOP_TXT3")
                        }else{
                            recvStr = String.format(Localize_cns("SHOP_TXT2") , hadBuy, limitTwice )
                        }
                    }   
               }else{
                   recvStr = "#red" + String.format(this.getJudgeStr(v), limit)
               }         
           }
       }

       return recvStr
   }

   ///----- 玩家各个条件
   getHeroJudge(key){
       let judgeList = {
            levelNum : GetHeroProperty("level"),    //等级条件
	        gameCaseNum : 0,                      //通关条件
            factionLevel : 0,                     //帮会等级条件
	        rankingNum : 0,                       //排行条件
	        convoyNum : GetActivity(ActivityDefine.HuSong).getConvoyNum(),                        //护送条件
	        answerNum : 0,                         //答题条件
       }

       return judgeList[key]
   }

////---- 判断玩家条件是否充足
   getJudgeIsEnough(key, limit){
       let heroJude = this.getHeroJudge(key)

       if(heroJude >= limit){
           return true
       }

       return false
   }

   getJudgeStr(key){
       let judgeList = {
            levelNum : Localize_cns("SHOP_TIAOJIAN_TXT1"),                          //等级条件
	        gameCaseNum : Localize_cns("SHOP_TIAOJIAN_TXT2"),                      //通关条件
            factionLevel : Localize_cns("SHOP_TIAOJIAN_TXT3"),                     //帮会等级条件
	        rankingNum : Localize_cns("SHOP_TIAOJIAN_TXT4"),                       //排行条件
	        convoyNum : Localize_cns("SHOP_TIAOJIAN_TXT5"),                        //护送条件
	        answerNum : Localize_cns("SHOP_TIAOJIAN_TXT6"),                         //答题条件
       }

       return judgeList[key]
   }

   ///获取限购次数
   getLimitTwice(shopEntry, index){
       let tempConfig = GameConfig.ShopCommodityConfig[shopEntry][index]
       if(tempConfig.limit != 0){
           return tempConfig.limit
       }else if(tempConfig.weekLimit != 0){
           return tempConfig.weekLimit
       }else if(tempConfig.lifeLimit != 0){
           return tempConfig.lifeLimit
       }else{
           return 0
       }
   }
}