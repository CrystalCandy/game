class GlobalTeamWindow extends BaseCtrlWnd {
    controlDataTable: any;
    scroll: UIScrollList;
    chapterIndex: number;
    curCheckIndex: number;

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.curCheckIndex = 0
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        let mElemInfo: any = [
            //  { ["index_type"]: gui.Button, ["name"]: "kfzd_btn_close", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            //  { ["index_type"]: gui.Button, ["name"]: "kfzd_btn_back", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            //  { ["index_type"]: gui.Button, ["name"]: "sweap_btn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSweap },
             { ["name"]: "kfzd_left_count", ["title"]: Localize_cns("GLOBAL_TXT3") },
             { ["index_type"]: gui.Button, ["name"]: "kfzd_pre_btn",     ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickPre },
             { ["index_type"]: gui.Button, ["name"]: "kfzd_next_btn",    ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNext },
         ]
         UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        
        this.mElemList["team_ctrl"] = UITeamGroup.newObj(this.mLayoutNode, this, this.mElemList["kfzd_team_group"], this.mParentWnd.mLayoutPaths[1], "team_com")
        
        let group = <eui.Group>this.mElemList["kfzd_scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON)

        for (let i = 0; i < 6; i++) {
            this.mElemList["kfzd_rare_itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "kfzd_rare_itemBox" + i, 80 + 80 * i, 12, this.mElemList["kfzd_item_group"])
        }
        // this.mElemList["tips_rd"].setAlignFlag(gui.Flag.CENTER_CENTER);
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)

        this.mElemList["kfzd_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("GLOBAL_TXT2")

        this.refreshFrame()
        this.applyActInfo()
    }

    public onHide(): void {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mElemList["kfzd_group"].visible = false
        this.mElemList["team_ctrl"].hideWnd()
    }

    initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg",     ["title"]: null, ["font"]: null, ["image"]: "boss_bossDi02", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 185, ["h"]: 311, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCard },

            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: String.format(Localize_cns("BOSS_TXT33"), "一", 3),   		["font"] : "ht_22_cc",   ["color"] : gui.Color.ublack,		["x"] : 0,     ["y"] : 12,		["w"] : 185,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: eui.Group,        ["name"]: name + "_iconGroup",["title"]: null, ["font"]: null,         ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 10, ["h"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"] : true, },
            // { ["index_type"] : eui.Image,		["name"] : name +"_finish",	["image"]: "boss_text01",   		["font"] : "ht_22_lc",   ["color"] : gui.Color.black,		["x"] : 40,    ["y"] : 120,		["w"] : 0,["h"] : 0,	 ["fun_index"] : null, ["messageFlag"] : true,},
            { ["index_type"] : eui.Image,		["name"] : name +"_firstIcon",	["image"]: "bh_text04",   		["font"] : "ht_22_lc",   ["color"] : gui.Color.black,		["x"] : 14,    ["y"] : 200,		["w"] : 0,["h"] : 0,	 ["fun_index"] : null, ["messageFlag"] : true,},
            { ["index_type"] : eui.Label,		["name"] : name +"_cantFightTips",	["title"]: Localize_cns("GLOBAL_TXT4"),   ["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.red,		["x"] : 0,     ["y"] : 210,		["w"] : 185,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_staticPrizeTips",["title"]: Localize_cns("BOSS_TXT49"),   ["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.lime,		["x"] : 0,     ["y"] : 210,		["w"] : 185,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			
            // { ["index_type"] : gui.Button,      ["name"]: name + "_gain",   ["title"]: Localize_cns("BOSS_TXT34"), ["font"]: "ht_22_cc_stroke", ["image"]: "ty_tongYongBt3", ["color"]: gui.Color.white, ["x"]: 30, ["y"]: 230, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickGain },
			// { ["index_type"] : gui.Button,      ["name"]: name + "_sweap",  ["title"]: Localize_cns("COPY_TXT7"), ["font"]: "ht_22_cc_stroke", ["image"]: "ty_tongYongBt3", ["color"]: gui.Color.white, ["x"]: 30, ["y"]: 230, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSweap },
			// { ["index_type"] : eui.Label,		["name"] : name +"_tips",	["title"]: Localize_cns("BOSS_TXT26"),   		["font"] : "ht_22_lc",          ["color"] : gui.Color.saddlebrown,		["x"] : 400, ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
            { ["index_type"]: gui.Grid9Image,   ["name"]: name + "_check",  ["title"]: null, ["font"]: null, ["image"]: "ty_xuanZhongKuang01", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: -18, ["y"]: -15, ["w"]: 215, ["h"]: 340, ["messageFlag"] : true, },
			
		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 200, this.mElemList[name + "_iconGroup"])
        this.mElemList[name + "_icon"].updateByPlayer(20001)

        //[0] [1]为首通奖励  通关奖励（重复挑战）
        let posList = [30, 100]
        for (let i = 0; i < 2; i++) {
            let x = posList[i]
            this.mElemList[name + "_item" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_item" + i, x, 235, window, 0.7)
        }
	}

	refreshItemWindow(window, config, index) {
		let name = window.name
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ServerTeam)
        // {
        //         remainCount: 剩余收益次数,
        //         npcIndexList: {[npcIndex]:1
        // }
        let npcIndexList = {}
        let remainCount = 0
        if (actInfo && actInfo.npcIndexList) {
            npcIndexList = actInfo.npcIndexList
            remainCount = actInfo.remainCount
        }

        for (let i = 0; i < 2; i++) {
            this.mElemList[name + "_item" + i].setVisible(false)
        }
        // this.mElemList[name + "_finish"].visible = false
        // this.mElemList[name + "_gain"].visible = false
        this.mElemList[name + "_staticPrizeTips"].visible = false
        this.mElemList[name + "_firstIcon"].visible = false
        this.mElemList[name + "_cantFightTips"].visible = false

        this.mElemList[name + "_name"].text = config.read
        //模型
        let monsterModelId = GetMonsterModel(config.entryId)
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId)

        //状态分析
        if (config.level > GetHeroProperty("level")) {                              //未开启
            this.mElemList[name + "_cantFightTips"].visible = true
            let list = AnalyPrizeFormat(config.firstItemShow || [])
            for (let i = 0; i < 2; i++) {
                if (list[i]) {
                    let [entryId, count] = list[i]
                    this.mElemList[name + "_item" + i].setVisible(true)
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count)
                }
            }

            this.controlDataTable[name + "_canFightTips"] = true                    //true表示不能挑战
        } else if (npcIndexList[config.index]) {                                      //已通过（历史）
            this.mElemList[name + "_staticPrizeTips"].visible = true

            let list = AnalyPrizeFormat(config.fixedItemShow || [])
            for (let i = 0; i < 2; i++) {
                if (list[i]) {
                    let [entryId, count] = list[i]
                    this.mElemList[name + "_item" + i].setVisible(true)
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count)
                }
            }
        } else {                                                                    //未首通
            this.mElemList[name + "_firstIcon"].visible = true

            let list = AnalyPrizeFormat(config.firstItemShow || [])
            for (let i = 0; i < 2; i++) {
                if (list[i]) {
                    let [entryId, count] = list[i]
                    this.mElemList[name + "_item" + i].setVisible(true)
                    this.mElemList[name + "_item" + i].updateByEntry(entryId, count)
                }
            }
        }

        this.controlDataTable["bossCardList"] = checkNull(this.controlDataTable["bossCardList"], [])
        table_insert(this.controlDataTable["bossCardList"], [window, config])
        this.controlDataTable[name + "_bg"] = this.controlDataTable["bossCardList"].length - 1
        // AnalyPrizeFormat

        if (index == 0) {
            this.mElemList["kfzd_left_counter"].text = remainCount + "/10"
        }
	}

    refreshFrame() {
        let list = []
        for (let _ in GameConfig.GlobalTeamConfig) {
            let v = GameConfig.GlobalTeamConfig[_]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a["index"] - b["index"]})
        // let list = [1, 1, 1, 1, ,1 ,1 ,1 ,1 ,1 ,1]

        let group = <eui.Group>this.mElemList["kfzd_scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, 185, group.height, 50, 5, 3)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v, k)
		}

        this.refreshCheckCard()
    }

    refreshCheckCard() {
        if (!this.controlDataTable["bossCardList"]) {
            return
        }

        this.curCheckIndex = this.curCheckIndex % this.controlDataTable["bossCardList"].length
        let [_, c] = this.controlDataTable["bossCardList"][this.curCheckIndex]
        let checkBossIndex = c.index

        let ctrl = <UITeamGroup>this.mElemList["team_ctrl"]
        if (TeamIsState(OrdinaryActivityIndex.ServerTeam) == true) {                      //组队中不刷新
            let info = TeamSystem.getInstance().getTeamActData()
            checkBossIndex = info[1]
        }

        let config = null
        let wName = ""
        for (let i = 0; i < this.controlDataTable["bossCardList"].length; i++) {
            let [window, v] = this.controlDataTable["bossCardList"][i]
            let name = window.name

            if (i == this.curCheckIndex) {
                this.mElemList[name + "_check"].visible = true
            } else {
                this.mElemList[name + "_check"].visible = false
            }

            if (v.index == checkBossIndex) {
                config = v
                wName = name
            }
        }
        //
        if (!config) {
            return
        }

        ctrl.showWnd()
        ctrl.setTeamActivityData([OrdinaryActivityIndex.ServerTeam, config.index])
        ctrl.setHandler(UITeamGroup.CHECK_QUICK_JOIN, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config])
        ctrl.setHandler(UITeamGroup.CHECK_CREATE_TEAM, this.checkCardFight, this, [this.controlDataTable[wName + "_cannotFight"], config])

        let list = AnalyPrizeFormat(config.itemShow || [])
        for (let i = 0; i < 6; i++) {
            if (list[i]) {
                this.mElemList["kfzd_rare_itemBox" + i].setVisible(true)

                let [entryId, count] = list[i]
                this.mElemList["kfzd_rare_itemBox" + i].updateByEntry(entryId, count)
            } else {
                this.mElemList["kfzd_rare_itemBox" + i].setVisible(false)
            }
        }
        this.mElemList["kfzd_cur_name"].text = config.read
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ServerTeam)
    }
    
    updateWnd() {
        this.refreshFrame()
    }
    ///////////////////////////////////////////////////////////

    checkCardFight(param) {                      //flag是否不能打
        let [flag, config] = param
        if (flag == true) {
            MsgSystem.addTagTips(String.format(Localize_cns("GLOBAL_TXT4"), config.level))
            return false
        }

        return true
    }

     //////////////////////////////////////////
    onClickCard(args) {
        let name = args.target.name
        if (this.controlDataTable[name] == null) {
            return
        }

        let index = this.controlDataTable[name]
        if (index == this.curCheckIndex) {
            return
        }
        this.curCheckIndex = index
        this.refreshCheckCard()
    }

    onClickPre(args) {
        this.scroll.moveRelativeItemWindow(-3, true)
    }

    onClickNext(args) {
        this.scroll.moveRelativeItemWindow(3, true)
    }
    //////////////////////////////////////////////////////////////////////////////
}