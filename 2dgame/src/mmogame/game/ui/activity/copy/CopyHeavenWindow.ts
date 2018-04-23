class CopyHeavenWindow extends BaseCtrlWnd {
    controlDataTable: any;
    curIndex: number
    boxConfigList: any[]                        //记录有宝箱奖励的层级属性
    curBoxGroupIndex: number
    curBoxIndex: number                         //当前领过的宝箱所在的索引的最大值
    maxIndex: number                            //历史通关最高层

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.curIndex = 11                      //当前通关的层数
        this.boxConfigList = []
        this.curBoxGroupIndex = -1
        this.curBoxIndex = -1
        this.maxIndex = 10
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
            { ["name"]: "tianting_onekey",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickOneKey },
            { ["name"]: "tianting_fight",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight },
            
            { ["name"]: "tianting_pre",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPre },
            { ["name"]: "tianting_next",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNext },

            { ["name"]: "tianting_baotu_btn0",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBaotu },
            { ["name"]: "tianting_baotu_gained0",   ["messageFlag"]: true },
            { ["name"]: "tianting_baotu_btn1",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBaotu },
            { ["name"]: "tianting_baotu_gained1",   ["messageFlag"]: true },
            { ["name"]: "tianting_baotu_btn2",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBaotu },
            { ["name"]: "tianting_baotu_gained2",   ["messageFlag"]: true },
            
            { ["name"]: "tianting_baotu_bam", ["image"]: "fb_loadingDi01", ["thumbImage"]: "fb_loading01", },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let txt = ""
        let colorList = ["#orange", "#magenta", "#cyan"]
        //通关奖励
        for (let i = 0; i < 3; i++) {
            this.mElemList["tianting_icon" + i] = UIActorView.newObj(this.mLayoutNode, "tianting_icon" + i, 40, 80, this.mElemList["tianting_mon_group" + i])
            this.mElemList["tianting_icon" + i].updateByPlayer(20001)
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["tianting_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT23")

        this.refreshFrame()
        this.applyActInfo()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["tianting_group"].visible = false
        
        this.curBoxGroupIndex = -1
        this.curBoxIndex = -1
    }
    
    refreshFrame() {
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial)
        // {
        //         currentIndex: 当前进度（已通关的）
        //         maxIndex: 历史最大进度
        //         boxIndex: 宝箱领取进度（已领取的）
        // }
        let curIndex = 10
        if (actInfo && actInfo.currentIndex != null && actInfo.currentIndex > curIndex) {
            curIndex = actInfo.currentIndex
        }
        this.curIndex = curIndex
        
        let curBoxIndex = 10
        if (actInfo && actInfo.boxIndex != null && actInfo.boxIndex > curBoxIndex) {
            curBoxIndex = actInfo.boxIndex
        }
        this.curBoxIndex = curBoxIndex
        
        let maxIndex = 10
        if (actInfo && actInfo.maxIndex != null && actInfo.maxIndex > maxIndex) {
            maxIndex = actInfo.maxIndex
        }
        this.maxIndex = maxIndex

        if (GameConfig.CopyHeavenConfig[maxIndex]) {
            this.mElemList["tianting_max_layer"].text = String.format(Localize_cns("COPY_TXT24"), GameConfig.CopyHeavenConfig[maxIndex].layerIndex)
        } else {
            this.mElemList["tianting_max_layer"].text = String.format(Localize_cns("COPY_TXT24"), 0)
        }

        this.controlDataTable = {}
        let list = []
        for (let k in GameConfig.CopyHeavenConfig){
            let v = GameConfig.CopyHeavenConfig[k]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a.layerIndex - b.layerIndex})
        let flag = false
        let t = []
        for (let i = 0; i < list.length; i++) {
            table_insert(t, list[i])

            if (list[i].index == curIndex + 1) {
                flag = true
            }

            if (t.length == 3) {
                if (flag == true) {
                    break
                }
                t = []
            }
        }
        if (flag == false) {                                //已经通过所有层
            this.curIndex = -1
            this.mElemList["tianting_fight"].visible = false
        } else {
            this.mElemList["tianting_fight"].visible = true
        }

        //刷新层级显示
        for (let i = 0; i < 3; i++){
            if (t[i]) {
                this.mElemList["tianting_layer_group" + i].visible = true

                let config = t[i]
                let monsterModelId = GetMonsterModel(config.entryId)
                this.mElemList["tianting_icon" + i].updateByPlayer(monsterModelId)

                this.mElemList["tianting_layer_name" + i].text = config.layerName
                this.mElemList["tianting_layer_pass" + i].visible = config.index <= curIndex
                this.mElemList["tianting_layer_cur" + i].visible = config.index == curIndex + 1
                this.mElemList["tianting_icon" + i].setVisible(config.index > curIndex)

                if (config.lines && config.lines != "") {
                    this.mElemList["tianting_content_group" + i].visible = true
                    AddRdContent(this.mElemList["tianting_centent_rd"], config.lines, "ht_24_cc", "ublack", 5)
                } else {
                    this.mElemList["tianting_content_group" + i].visible = false
                }
            } else {
                this.mElemList["tianting_layer_group" + i].visible = false
            }
        }

        //初奴化this.boxConfigList
        this.boxConfigList = []
        t = []
        for (let i = 0; i < list.length; i++) {
            let v = list[i]
            if (size_t(v.box) > 0) {
                table_insert(t, v)
                if (this.curBoxGroupIndex < 0) {                        //未初始化过
                    if (curBoxIndex == v.index) {
                        this.curBoxGroupIndex = this.boxConfigList.length
                    }
                }

                if (t.length >= 3) {
                    table_insert(this.boxConfigList, t)
                    t = []
                }
            }
        }
        if (t.length > 0) {
            table_insert(this.boxConfigList, t)
        }
        this.refreshBoxPro()
    }

    refreshBoxPro() {
        this.curBoxGroupIndex = MathUtil.clamp(this.curBoxGroupIndex, 0, this.boxConfigList.length - 1)

        let list = this.boxConfigList[this.curBoxGroupIndex]
        for (let i = 0; i < 3; i++) {
            let v = list[i]
            if (v) {
                this.mElemList["tianting_baotu_group" + i].visible = true
                this.mElemList["tianting_baotu_layer" + i].text = String.format(Localize_cns("COPY_TXT24"), v.layerIndex)
                if (v.index <= this.maxIndex) {
                    this.mElemList["tianting_baotu_gained" + i].visible = true
                    this.controlDataTable["tianting_baotu_btn" + i] = [0, v.index]                          //0表示已领取
                } else {
                    if (v.index <= this.curIndex) {
                        this.controlDataTable["tianting_baotu_btn" + i] = [1, v.index]                      //1表示可领取
                    } else {
                        this.controlDataTable["tianting_baotu_btn" + i] = [2, v.index]                      //2表示未领取
                    }
                    this.mElemList["tianting_baotu_gained" + i].visible = false
                }
            } else {
                this.mElemList["tianting_baotu_group" + i].visible = false
            }
        }

        let proMaxLayer = 9 * (this.curBoxGroupIndex + 1) + 2                                        //当前进度条表示的最大值
        let layerIndex = 0
        if (GameConfig.CopyHeavenConfig[this.curIndex]) {
            layerIndex = GameConfig.CopyHeavenConfig[this.curIndex].layerIndex
        }
        let imb = this.mElemList["tianting_baotu_bam"]
        UiUtil.updateProgress(imb, MathUtil.clamp(layerIndex - (proMaxLayer - 10), 0, 10), 10)
    }

    updateWnd() {
        this.refreshFrame()
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.HeavenTrial)
    }

    ///////////////////////////////////////////////////////////////////////
    onClickOneKey(args) {
        // RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.HeavenTrial, this.curIndex + 1)
    }
    
    onClickFight(args) {
        if (CheckFightState() == true) {
            return
        }

        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.HeavenTrial, this.curIndex + 1)
    }

    onClickPre(args) {
        this.curBoxGroupIndex = this.curBoxGroupIndex - 1
        this.refreshBoxPro()
    }

    onClickNext(args) {
        this.refreshBoxPro()
    }

    onClickBaotu(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let [oType, index] = this.controlDataTable[name]

        if (oType == 0) {
            return
        } else if (oType == 1) {
            RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.HeavenTrial, [index])
        } else {
            //弹出奖励预览界面
        }
    }
}