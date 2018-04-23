class CopyDragonWindow extends BaseCtrlWnd {
    controlDataTable: any;
    curChapter: number
    curIndex: number
    curOpenChapter: number
    beginIndex: number
    beginIndexEx: number

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.curChapter = 11
        this.curOpenChapter = 12
        this.curIndex = 0

        this.beginIndex = 11
        this.beginIndexEx = 10
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
        //     { ["name"]: "ug_pokedex_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPokedex }, //图鉴
        //     { ["name"]: "ug_force_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickForceBtn },
        //     { ["name"]: "ug_btn_show", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickShow },
        //     { ["name"]: "ug_btn_embattle", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEmbattle },
        //     { ["name"]: "ug_btn_natural", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNatural },
        //     { ["name"]: "ug_btn_changename", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChangeName },
        //     { ["name"]: "up_add_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAddition },
        //     { ["name"]: "upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
        //     { ["name"]: "auto_upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAutoUpgrade }, //自动升级
        //     { ["name"]: "active_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickActive },
            { ["name"]: "longwang_copy1_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang_copy2_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang_copy3_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang_copy4_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang_copy5_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang_copy6_gained", ["messageFlag"] : true,},
            { ["name"]: "longwang__baotu_gained1", ["messageFlag"] : true,},
            { ["name"]: "longwang__baotu_gained2", ["messageFlag"] : true,},
            { ["name"]: "longwang__baotu_gained3", ["messageFlag"] : true,},

            { ["name"]: "longwang_copy1_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },
            { ["name"]: "longwang_copy2_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },
            { ["name"]: "longwang_copy3_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },
            { ["name"]: "longwang_copy4_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },
            { ["name"]: "longwang_copy5_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },
            { ["name"]: "longwang_copy6_img", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCamp },

            { ["name"]: "longwang_pre",     ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPre },
            { ["name"]: "longwang_next",    ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNext },
            { ["name"]: "longwang_wabao",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight },
            
            { ["name"]: "longwang_baotu_btn1",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickStarPrize },
            { ["name"]: "longwang_baotu_btn2",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickStarPrize },
            { ["name"]: "longwang_baotu_btn3",   ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickStarPrize },
            
        ];
        for (let i = 1; i < 7; i++) {
            for (let j = 1; j < 3; j++) {
                table_insert(elemInfo, { ["name"]: "longwang_copy" + i + "_starBg" + j, ["messageFlag"] : true,})
                table_insert(elemInfo, { ["name"]: "longwang_copy" + i + "_star" + j, ["messageFlag"] : true,})
            }
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        //首通奖励
        for (let i = 0; i < 2; i++) {
            this.mElemList["firstPassItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "firstPassItemBox" + i, 70 + 85 * i, 10, this.mElemList["longwang_pirze_group"])
            let elemInfo = [
                { ["index_type"]: eui.Image,   ["name"]: "firstPass_gained" + i, ["title"]: null, ["font"]: null, ["image"]: "ty_text02", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: -5, ["y"]: 50, ["w"]: 0, ["h"]: 0, ["messageFlag"] : true }, //图鉴
            ];
            this.mElemList["firstPassItemBox" + i].createElem(elemInfo, this.mElemList, this)
        }
        //通关奖励
        for (let i = 0; i < 3; i++) {
            this.mElemList["passItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "passItemBox" + i, 310 + 82 * i, 10, this.mElemList["longwang_pirze_group"])
            let elemInfo = [
                { ["index_type"]: eui.Image,   ["name"]: "pass_gained" + i, ["title"]: null, ["font"]: null, ["image"]: "ty_text02", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: -5, ["y"]: 50, ["w"]: 0, ["h"]: 0, ["messageFlag"] : true }, //图鉴
            ];
            this.mElemList["passItemBox" + i].createElem(elemInfo, this.mElemList, this)
        }

        let elemInfo1 = [
                    {["index_type"]: gui.ProgressBar,   ["name"]: "longwang_star_imb", ["parent"]: "longwang_pro_group", ["font"]: null, ["image"]: "fb_loadingDi01", ["thumbImage"]: "fb_loading01", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 10, ["w"]: 402, ["h"]: 30, },
            ];
        UiUtil.createElem(elemInfo1, this.mLayoutNode, this.mElemList, this)
        let imb = this.mElemList["longwang_star_imb"]
        UiUtil.updateProgress(imb, 50, 100)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["longwang_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT2")

        this.refreshFrame()
        this.applyActInfo()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["longwang_group"].visible = false
    }
    
    refreshFrame() {
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss)
        // {
        //         maxIndex: 最新通关关卡
        //         npcList: {[npcIndex]=value}  --这个是每一关的情况（是否领取奖励，评星） opDragonBossIndexConfig
        //         stageList: {[charpterIndex] = value}  --这个是每章节的情况，领取了那种累星奖励 opDragonBossChapterConfig
        // }
        if (!actInfo || !actInfo.npcList) {
            return
        }

        let list = []
        this.curOpenChapter = this.curChapter
        let lastOpenChatper = true                  //可预览的最新章节是否已互到最后一章
        for (let _ in GameConfig.CopyDragonConfig) {
            let config = GameConfig.CopyDragonConfig[_]
            if (config.chapter == this.curChapter) {
                table_insert(list, config)
            }

            let maxIndex = actInfo.maxIndex == 0 ? this.beginIndex : actInfo.maxIndex
            if (config.index <= maxIndex + 6) {
                if (config.chapter > this.curOpenChapter) {
                    this.curOpenChapter = config.chapter
                }
            } else {
                lastOpenChatper = false
            }
        }
        table_sort(list, function(a, b) {return a.index - b.index})
        this.controlDataTable = {}

        let config = list[this.curIndex]
        let sumStar = 0
        for (let i = 0; i < 6; i++) {
            if (list[i]) {
                this.mElemList["longwang_copy" + (i + 1)].visible = true
                this.mElemList["longwang_copy" + (i + 1) + "_check"].visible = (this.curIndex == i)

                this.mElemList["longwang_copy" + (i + 1) + "_gained"].visible = false
                for (let j = 0; j < 3; j++) {
                    this.mElemList["longwang_copy" + (i + 1) + "_star" + (j + 1)].visible = false
                }

                let v = list[i]
                if (actInfo.npcList[v.index]) {
                    if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.getPrize) == opDragonBossIndexConfig.getPrize) {
                        this.mElemList["longwang_copy" + (i + 1) + "_gained"].visible = true
                    }
                    let starCount = 0
                    if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.oneStar) == opDragonBossIndexConfig.oneStar) {
                        starCount = 1
                    } else if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.twoStar) == opDragonBossIndexConfig.twoStar) {
                        starCount = 2
                    } else if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.threeStar) == opDragonBossIndexConfig.threeStar) {
                        starCount = 3
                    }
                    for (let j = 0; j < starCount; j++) {
                        this.mElemList["longwang_copy" + (i + 1) + "_star" + (j + 1)].visible = true
                    }
                    sumStar = sumStar + starCount
                }

                this.controlDataTable["longwang_copy" + (i + 1) + "_img"] = i
            } else {
                this.mElemList["longwang_copy" + (i + 1)].visible = false
            }
        }

        if (!config) {
            return
        }

        this.controlDataTable["longwang_wabao"] = config
        //章节名称
        this.mElemList["longwang_copy_name"].text = config.chapterName
        AddRdContent(this.mElemList["longwang_copy_starRd"], "#STAR" + sumStar + "/" + 3 * list.length, "ht_20_cc_stroke", "white")
        this.mElemList["longwang_cur"].text = String.format(Localize_cns("COPY_TXT17"), config.index - this.beginIndexEx)

        //首通奖励
        for (let i = 0; i < 2; i++) {
            if (config.showFirstItem[i] == null) {
                this.mElemList["firstPassItemBox" + i].setVisible(false)
            } else {
                let [entryId, count] = config.showFirstItem[i]
                this.mElemList["firstPassItemBox" + i].setVisible(true)
                this.mElemList["firstPassItemBox" + i].updateByEntry(entryId, count)

                this.mElemList["firstPass_gained" + i].visible = false
                if (actInfo.npcList[config.index]) {
                    if ((actInfo.npcList[config.index] & opDragonBossIndexConfig.oneStar) == opDragonBossIndexConfig.oneStar
                            || (actInfo.npcList[config.index] & opDragonBossIndexConfig.twoStar) == opDragonBossIndexConfig.twoStar
                            || (actInfo.npcList[config.index] & opDragonBossIndexConfig.threeStar) == opDragonBossIndexConfig.threeStar) {
                        
                        this.mElemList["firstPass_gained" + i].visible = true
                    }
                }
            }
        }
        //通关奖励
        for (let i = 0; i < 3; i++) {
            if (config.showPassItem[i] == null) {
                this.mElemList["passItemBox" + i].setVisible(false)
            } else {
                let [entryId, count] = config.showPassItem[i]
                this.mElemList["passItemBox" + i].setVisible(true)
                this.mElemList["passItemBox" + i].updateByEntry(entryId, count)

                this.mElemList["pass_gained" + i].visible = false
                if (actInfo.npcList[config.index]) {
                    if ((actInfo.npcList[config.index] & opDragonBossIndexConfig.getPrize) == opDragonBossIndexConfig.getPrize) {
                        
                        this.mElemList["pass_gained" + i].visible = true
                    }
                }
            }
        }
        //星级宝图
        for (let i = 1; i <= 3; i++) {
            this.mElemList["longwang_baotu_group" + i].visible = false
        }
        let index = 0
        let l = ["sixStar", "twelve", "eighteen"]
        let minStar = 0
        for (let i = 1; i <= 3 * list.length; i++) {
            if (config.starPrize[i]) {
                index = index + 1
                if (this.mElemList["longwang_baotu_group" + index]) {
                    this.mElemList["longwang_baotu_group" + index].visible = true
                    // this.mElemList["longwang_baotu_group" + index].x = 86 + 394 / (3 * list.length) * (i - 1)
                    this.mElemList["longwang_baotu_star" + index].text = i
                    this.mElemList["longwang__baotu_gained" + index].visible = false

                    this.controlDataTable["longwang_baotu_btn" + index] = i

                    if (actInfo.stageList[this.curChapter]) {
                        if ((actInfo.stageList[this.curChapter] & opDragonBossChapterConfig[l[index-1]]) == opDragonBossChapterConfig[l[index-1]]) {
                            
                            this.mElemList["longwang__baotu_gained" + index].visible = true
                        }
                    }

                    if (index == 1) {
                        minStar = i
                    }
                }
            }
        }
        let imb = this.mElemList["longwang_star_imb"]
        UiUtil.updateProgress(imb, sumStar - minStar, 3 * list.length - minStar)

        //刷新箭头部分
        //章节索引从11开始
        this.mElemList["longwang_pre"].visible = false
        this.mElemList["longwang_next"].visible = false
        this.mElemList["longwang_next"].enabled = false
        if (this.curChapter > this.beginIndex) {
            this.mElemList["longwang_pre"].visible = true
        }
        
        if (lastOpenChatper == false) {
            this.mElemList["longwang_next"].visible = true

            this.mElemList["longwang_next"].enabled = this.curChapter != this.curOpenChapter
        } else {
            this.mElemList["longwang_next"].visible = false
        }
    }

    updateWnd() {
        this.refreshFrame()
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.DragonBoss)
    }

    ///////////////////////////////////////////////////////////////////////
    onClickCamp(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let index = this.controlDataTable[name]
        if (index == this.curIndex) {
            return
        }

        this.curIndex = index
        this.refreshFrame()
    }

    onClickPre(args) {
        if (this.curChapter - 1 < this.beginIndex) {
            return
        }
        this.curChapter = this.curChapter - 1
        
        this.curIndex = 0
        this.refreshFrame()
    }

    onClickNext(args) {
        if (this.curChapter + 1 > this.curOpenChapter) {
            return
        }
        this.curChapter = this.curChapter + 1

        this.curIndex = 0
        this.refreshFrame()
    }

    onClickFight(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let config = this.controlDataTable[name]

        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss)
        // {
        //         maxIndex: 最新通关关卡
        //         npcList: {[npcIndex]=value}  --这个是每一关的情况（是否领取奖励，评星） opDragonBossIndexConfig
        //         stageList: {[charpterIndex] = value}  --这个是每章节的情况，领取了那种累星奖励 opDragonBossChapterConfig
        // }
        if (!actInfo || !actInfo.npcList) {
            return
        }

        if (CheckFightState() == true) {
            return
        }
        
        if (actInfo.maxIndex == 0) {
            if (config.index == this.beginIndex) {
                RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.DragonBoss, config.index)
            } else {
                MsgSystem.addTagTips(String.format(Localize_cns("COPY_TXT18"), 1))
            }
        } else if (config.index > actInfo.maxIndex + 1) {
            MsgSystem.addTagTips(String.format(Localize_cns("COPY_TXT18"), actInfo.maxIndex + 1 - this.beginIndexEx))
        } else {
            RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.DragonBoss, config.index)
        }
    }

    onClickStarPrize(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let starCount = this.controlDataTable[name]
        RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.DragonBoss, [this.curChapter, starCount])
    }
}