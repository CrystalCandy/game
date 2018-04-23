/*
作者:
	ljq
	
创建时间：
	2012.2.11(周一)

意图： 
	仙侣系统

公共接口：

*/

class XianLvSystem extends BaseSystem {
    fightList : {};
    xianLvList;
    jiHuoList :any [];
    qiyuanList 

	public initObj(...args: any[]): void {
		this.onClear()
		
	}

	onClear() {
        this.fightList = {}
        this.xianLvList = {}
		this.jiHuoList = []
        this.qiyuanList = []
	}

	destory() {
		this.onClear()
	}

	prepareResource(workQueue) {
		GameConfig.initXianLvSystemCsv(workQueue);
	}
    //////////////////////初始化仙侣列表//////////
    initXianLvList(info){
        let tempInfo = {}
        for(let _ in info ){
            let v = info[_]
            tempInfo[v.entryid] = v
            if(v.combatpos != 0){
                this.fightList[v.entryid] = v.combatpos
            }
            JsUtil.arrayInstert(this.jiHuoList, v.entryid)
        }
        this.xianLvList = tempInfo
    }

    ////////////////////////新增一个仙侣///////////////
    addXianLvInfo(info){ 
        if (this.xianLvList[info.entryid]) {
			TLog.Warn("PetSystem.addPet %d alreadey exsit", info.entryid)
		}

		this.xianLvList[info.entryid] = info
        JsUtil.arrayInstert(this.jiHuoList, info.entryid)
        FireEvent(EventDefine.ACTOR_XIANLV_UPDATE, null)
    }

    /////////////////局部更新//////////////////////////
    _updateXianLvInfoField(id, updateProperty) {
		let Info = this.xianLvList[id]

		if (Info == null) {
			//TLog.Warn("FunSystem._updateXianLvInfoField %d is null", funOptionsName[funType])
			return
		}

		for (let k in updateProperty) {
			Info[k] = updateProperty[k]
            if(k == "combatpos" && Info[k] != 0){
                this.fightList[id] = Info[k]
            }
		}
        this.xianLvList[id] = Info
   //     let updateInfo = this.jiHuoList
   //     for(let k in updateInfo){
     //       if(tonumber(k) == id){
      //          updateInfo[k] = Info
      //      }
    //    }
   //     this.updateInfoList(updateInfo)
		FireEvent(EventDefine.ACTOR_XIANLV_UPDATE, null)
	}


    getControlList(){
        let list = GameConfig.ActorXianLvConfig
        let temp = this.jiHuoList
        let tempList  = []
        for(let i = 0 ; i < size_t(temp); i++){
            JsUtil.arrayInstert(tempList, list[temp[i]])
        }
        for(let k in list){
            if(!JsUtil.arrayExsit(tempList, list[k])){
                JsUtil.arrayInstert(tempList, list[k])
            }  
        }
        return tempList
    }

    getStar(id : number){
        if(!this.isExit(tonumber(id))) return
        return this.xianLvList[id].start
    }

    getLevel(id : number){
        if(!this.isExit(id)) return
        return this.xianLvList[id].stage
    }
    getFightList(){
        return this.fightList
    }
    isExit(id:number){
        return JsUtil.arrayExsit(this.jiHuoList, id)
    }
    getExpById(id : number){
        if(!this.isExit(id)) return
        return this.xianLvList[id].stageexp
    }
    getForce(id:number){
        if(!this.isExit(id)) return
        return this.xianLvList[id].force
    }
    
    getJiHuoList(){
        return this.jiHuoList
    }
    getRecvInfo(id){
       return this.xianLvList[id] || {}
       			//"entryid:uint32",
				//"stage:uint16",
				//"stageexp:uint32",
				//"combatpos:uint8",
				//"start:uint16"
        //return this.jiHuoList
    }

    ////获取颜色
    getXianLvColor(quality) {
		let colorConfig = ["lime", "blue", "purple", "gold", "red"]
		return colorConfig[quality - 1] || colorConfig[0]
	}

    ///---获取激活的总战力
    getTotalForce(){
        let list = this.getJiHuoList()
        let recvNum = 0

        for(let k  in list){
            recvNum += this.getForce(list[k])
        }

        return recvNum
    }

    ///仙侣奇缘
    setQiYuanProperty(list){
        this.qiyuanList = list
    }
    getQiYuanProperty(){
        return this.qiyuanList || [0, 0]
    }
}