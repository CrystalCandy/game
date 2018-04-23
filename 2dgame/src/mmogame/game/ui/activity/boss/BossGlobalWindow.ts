class BossGlobalWindow extends BaseCtrlWnd {
    controlDataTable: any;
    scroll: UIScrollList;
    timerList: any;

    public initObj(...params: any[]) {
        this.controlDataTable = {};
        this.timerList = {};
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
             { ["name"]: "quanming_restore_left", ["title"]: String.format(Localize_cns("BOSS_TXT9"), "00:00"), ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null }, //图鉴
             { ["name"]: "quanmin_boss_set", ["title"]: Localize_cns("BOSS_TXT10"), ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSetting },
             { ["name"]: "quanmin_chall_add", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAdd },
        //     { ["name"]: "ug_btn_embattle", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEmbattle },
        //     { ["name"]: "ug_btn_natural", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickNatural },
        //     { ["name"]: "ug_btn_changename", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickChangeName },
        //     { ["name"]: "up_add_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAddition },
        //     { ["name"]: "upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUpgrade },
        //     { ["name"]: "auto_upgrade_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAutoUpgrade }, //自动升级
        //     { ["name"]: "active_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickActive },
         ];

         UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let group = <eui.Group>this.mElemList["quanmin_scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group)

        AddRdContent(this.mElemList["quanmin_chall_countrd"], String.format(Localize_cns("BOSS_TXT8"), "11/123"), "ht_22_cc", "black")
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["quanmin_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT2")

        this.applyActInfo()
        this.refreshFrame()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["quanmin_group"].visible = false

        for (let _ in this.timerList) {
            let timer = this.timerList[_]
            KillTimer(timer)
        }
        this.timerList = {}
    }
    
	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_iconbg",   ["title"]: null, ["font"]: null, ["image"]: "boss_bossDi01",        ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 20, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: eui.Group,        ["name"]: name + "_iconGroup",["title"]: null, ["font"]: null,         ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 10, ["h"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            // { ["index_type"]: eui.Image,        ["name"]: name + "_icon",   ["title"]: null, ["font"]: null, ["image"]: "tz_Bt01",        ["color"]: gui.Color.white, ["x"]: 10, ["y"]: 50, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{["index_type"]: gui.ProgressBar,   ["name"]: name + "_hp_imb", ["title"]: "", ["font"]: null, ["image"]: "boss_loadingDi01", ["thumbImage"]: "boss_loading01", ["color"]: gui.Color.white, ["x"]: 5, ["y"]: 150, ["w"]: 174, ["h"]: 21, },
            { ["index_type"]: eui.Image,        ["name"]: name + "_block",   ["title"]: null, ["font"]: null, ["image"]: "boss_fengYin01",        ["color"]: gui.Color.white, ["x"]: 10, ["y"]: 70, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			

            { ["index_type"]: gui.Grid9Image,   ["name"]: name + "_namebg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi07",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 5, ["w"]: 200, ["h"]: 45, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: Localize_cns("ROLE_TXT32"),   		["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.white,		["x"] : 180, ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_left",	["title"]: Localize_cns("BOSS_TXT11"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.green,		["x"] : 190, ["y"] : 50,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_itemtl",	["title"]: Localize_cns("BOSS_TXT6"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.black,		["x"] : 190, ["y"] : 75,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.Button,       ["name"]: name + "_enter",  ["title"]: Localize_cns("BOSS_TXT7"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt6", ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 435, ["y"]: 110, ["w"]: 100, ["h"]: 50, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight, },
            
            { ["index_type"]: eui.Group,        ["name"]: name + "_res_group",  ["x"]: 380, ["y"]: 0, ["w"]: 50, ["h"]: 50, ["event_name"]: null, ["fun_index"]: null, },
            { ["index_type"]: eui.Label,        ["name"]: name + "_res_time",   ["parent"]: name + "_res_group",  ["title"]: String.format(Localize_cns("BOSS_TXT13"), "00:00"), ["font"]: "ht_20_lc", ["color"]: gui.Color.black, ["x"]: 20, ["y"]: 10, ["w"]: 200, ["h"]: 25, },
            { ["index_type"]: eui.Image,        ["name"]: name + "_res_consumIcon", ["parent"]: name + "_res_group",  ["image"]: "ty_bangHuiIcon01",        ["x"]: 70, ["y"]: 80, ["w"]: 30, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["autoScale"]: true},
			{ ["index_type"]: eui.Label,		["name"]: name +"_res_consum",	    ["parent"]: name + "_res_group",["title"]: "X20",   ["font"] : "ht_20_lc",          ["color"] : gui.Color.black,["x"] : 100, ["y"] : 85,["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_openTips",["title"]: Localize_cns("BOSS_TXT39"),   		["font"] : "ht_20_cc",          ["color"] : gui.Color.black,		["x"] : 430, ["y"] : 80,		["w"] : 120,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.Button,       ["name"]: name + "_res_fight",  ["parent"]: name + "_res_group",  ["title"]: Localize_cns("BOSS_TXT14"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt6", ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 41, ["y"]: 115, ["w"]: 120, ["h"]: 50, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRestore, },
            
		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (let i = 0; i < 3; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 180 + 80 * i, 100, window)
        }
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 150, this.mElemList[name + "_iconGroup"])
        this.mElemList[name + "_icon"].updateByPlayer(20001)

        this.mElemList[name + "_enter"].visible = false
        // num = MathUtil.clamp(num, 0, maxNum)
        let imb = this.mElemList[name + "_hp_imb"]
        UiUtil.updateProgress(imb, 50, 100)
	}

	refreshItemWindow(window, config) {
		let name = window.name
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss)
        // {
        //         npcList: {[npcIndex]:{refreshTime: 123 否则为0, plrCount: 123 争夺人数, hpPercent: 0.5 boss血量百分比}},
        //         fightCount: 总战斗次数,
        //         refreshTime: 我的次数刷新时间,
        //         remainCount: 我的剩余战斗次数,
        // }
        let npcList = {}
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList
        }

        this.mElemList[name + "_res_group"].visible = false
        this.mElemList[name + "_openTips"].visible = false
        this.mElemList[name + "_enter"].visible = false
        this.mElemList[name + "_hp_imb"].visible = false
        this.mElemList[name + "_block"].visible = false
        // this.mElemList[name + "_res_fight"].visible = false

        let monsterModelId = GetMonsterModel(config.entryId)
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId)

        let monName = ""
        let conf = GameConfig.MonsterConfig[config.entryId]
        if (conf) {
            monName = conf.Name
        }
        this.mElemList[name + "_name"].text = monName + "(" + config.level + ")"
        for (let i = 0; i < 3; i++) {
            let entryId = config.itemShow[i]
            if (entryId == null) {
                this.mElemList[name + "itemBox" + i].setVisible(false)
            } else {
                this.mElemList[name + "itemBox" + i].setVisible(true)
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId)
            }
        }

        let bossConfig = npcList[config.index]
        if (!bossConfig) {
            return
        }
        //刷新时间（次数）
        if (bossConfig.refreshTime > 0) {
            this.mElemList[name + "_left"].text = Localize_cns("BOSS_TXT12")
            this.mElemList[name + "_block"].visible = true

            //消耗复活怪物
            let count = 0
            if (config.consum[0]) {
                count = config.consum[0][1]
            }
            this.mElemList[name + "_res_consum"].text = "X" + count
            this.mElemList[name + "_res_consumIcon"].source = "item_20002"

            if (bossConfig.refreshTime >= GetServerTime()) {
                this.mElemList[name + "_res_group"].visible = true
                this.controlDataTable[name + "_res_fight"] = config.index

                let tick = function(delay) {
                    let leftTime = bossConfig.refreshTime - GetServerTime()
                    if (leftTime >= 0) {
                        this.mElemList[name + "_res_time"].text = String.format(Localize_cns("BOSS_TXT13"), getFormatDiffTime(leftTime))
                    } else {
                        this.applyActInfo()
                        
                        if (this.timerList[name]) {
                            KillTimer(this.timerList[name])
                            this.timerList[name] = null
                        }
                    }
                }
                if (!this.timerList[name]) {
                    this.timerList[name] = SetTimer(tick, this, 200, true)
                }
                
            }
        } else {
            let imb = this.mElemList[name + "_hp_imb"]
            imb.visible = true
            UiUtil.updateProgress(imb, bossConfig.hpPercent * 10000, 10000)

            if (GetHeroProperty("level") < config.level) {
                this.mElemList[name + "_openTips"].visible = true
                this.mElemList[name + "_openTips"].text = String.format(Localize_cns("BOSS_TXT39"), config.level)
            } else {
                this.mElemList[name + "_enter"].visible = true
                this.mElemList[name + "_left"].text = String.format(Localize_cns("BOSS_TXT11"), bossConfig.plrCount)
            }
        }
    
        this.controlDataTable[name + "_enter"] = config.index
	}

    refreshFrame() {
        let list = []//[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (let k in GameConfig.BossGlobalConfig){
            let v = GameConfig.BossGlobalConfig[k]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a.level - b.level})

        let group = <eui.Group>this.mElemList["quanmin_scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
        for (let _ in this.timerList) {
            let timer = this.timerList[_]
            KillTimer(timer)
        }
        this.timerList = {}

		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, group.width - 3, 190, 3, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}

        //挑战次数
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss)
        let leftCount = 0
        var refreshTime = 0
        if (actInfo) {
            leftCount = actInfo.remainCount
            refreshTime = actInfo.refreshTime
        }
        AddRdContent(this.mElemList["quanmin_chall_countrd"], String.format(Localize_cns("BOSS_TXT8"), leftCount + "/" + 10), "ht_22_cc", "black")
        this.mElemList["quanmin_chall_add"].visible = leftCount <= 0

        if (refreshTime > 0) {
            let tick = function(delay) {
                let leftTime = refreshTime - GetServerTime()
                if (leftTime < 0) {
                    leftTime = 0
                    this.applyActInfo()

                    if (this.timerList["freshTime"]) {
                        KillTimer(this.timerList["freshTime"])
                        this.timerList["freshTime"] = null
                    }
                }
                this.mElemList["quanming_restore_left"].text = String.format(Localize_cns("BOSS_TXT9"), getFormatDiffTime(leftTime))
            }
            this.timerList["freshTime"] = SetTimer(tick, this, 200, true)
        } else {
            this.mElemList["quanming_restore_left"].text = ""
        }
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WorldPlayerBoss)
    }

    updateWnd() {
        this.refreshFrame()
    }
    ////////////////////////////////////////////////////////////////////////////////////
    onClickSetting() {
        WngMrg.getInstance().showWindow("BossGlobalRemindFrame")
    }

    onClickFight(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        if (CheckBeiBaoEquipWillFull()) {
            return
        }

        if (CheckFightState() == true) {
            return
        }

        let index = this.controlDataTable[name]
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.WorldPlayerBoss, index)
    }
    
    onClickRestore(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let index = this.controlDataTable[name]
        RpcProxy.call("C2G_ReviveActivityBoss", OrdinaryActivityIndex.WorldPlayerBoss, index)
    }

    onClickAdd(args) {
        RpcProxy.call("C2G_BuyActivityRemainFightCount", OrdinaryActivityIndex.WorldPlayerBoss, {})
    }
}