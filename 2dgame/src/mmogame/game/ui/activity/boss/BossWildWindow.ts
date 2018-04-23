class BossWildWindow extends BaseCtrlWnd {
    controlDataTable: any;
    scroll: UIScrollList;

    public initObj(...params: any[]) {
        this.controlDataTable = {};
    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        // var elemInfo = [
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
        // ];

        // UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let group = <eui.Group>this.mElemList["yewai_scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "yewai_scroll", 0, 0, group.width, group.height, group)

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["yewai_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16")

        this.applyActInfo()
        this.refreshFrame()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["yewai_group"].visible = false
    }
    
	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_iconbg",   ["title"]: null, ["font"]: null, ["image"]: "boss_bossDi01",        ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 40, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: eui.Group,        ["name"]: name + "_iconGroup",["title"]: null, ["font"]: null,         ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 10, ["h"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_refreshed",   ["title"]: null, ["font"]: null, ["image"]: "boss_text04",        ["color"]: gui.Color.white, ["x"]: 60, ["y"]: 170, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_block",   ["title"]: null, ["font"]: null, ["image"]: "boss_text01",        ["color"]: gui.Color.white, ["x"]: 40, ["y"]: 60, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_escape",   ["title"]: null, ["font"]: null, ["image"]: "boss_text05",        ["color"]: gui.Color.white, ["x"]: 60, ["y"]: 170, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_namebg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi07",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 5, ["w"]: 200, ["h"]: 45, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: Localize_cns("ROLE_TXT32"),   		["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.white,		["x"] : 180, ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
            
            { ["index_type"]: gui.Grid9Image,   ["name"]: name + "_refreshTipsBg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi08",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 55, ["w"]: 350, ["h"]: 55, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_refreshTips",   ["title"]: Localize_cns("FORGE_LEVEL_EFFECT_NEXT"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.black,		["x"] : 185, ["y"] : 55,		["w"] : 340,["h"] : 55,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_fleeTipsBg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi08",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 115, ["w"]: 350, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_fleeTips",   ["title"]: Localize_cns("BOSS_TXT41"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.black,		["x"] : 185, ["y"] : 117,		["w"] : 340,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			
            { ["index_type"] : eui.Label,		["name"] : name +"_nextTime",	["title"]: String.format(Localize_cns("BOSS_TXT15"), "00:00"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.green,		["x"] : 190, ["y"] : 160,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_et",	        ["title"]: String.format(Localize_cns("BOSS_TXT18"), 90),   		["font"] : "ht_20_rc",          ["color"] : gui.Color.brown,		["x"] : 300, ["y"] : 160,		["w"] : 230,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.Button,       ["name"]: name + "_enter",  ["title"]: Localize_cns("BOSS_TXT17"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt3", ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 420, ["y"]: 150, ["w"]: 100, ["h"]: 50, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEnter, },

		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        this.mElemList[name +"_enter"].visible = false
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 100, 170, this.mElemList[name + "_iconGroup"])
        this.mElemList[name + "_icon"].updateByPlayer(3001)
	}

	refreshItemWindow(window, config) {
		let name = window.name
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WildBoss)
        // {
        //         npcList: {[npcIndex]:[refreshTime, status]},         [下次刷新的时间戳，opBossActivityConfig[OrdinaryActivityIndex.WildBoss]]
        // }
        let npcList = {}
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList
        }

        this.mElemList[name + "_refreshed"].visible = false
        this.mElemList[name + "_block"].visible = false
        this.mElemList[name + "_escape"].visible = false
        this.mElemList[name + "_et"].visible = false
        this.mElemList[name + "_enter"].visible = false
        this.mElemList[name + "_nextTime"].visible = false
        // this.mElemList[name + "_res_fight"].visible = false

        let monsterModelId = GetMonsterModel(config.entryId)
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId)

        let monName = ""
        let conf = GameConfig.MonsterConfig[config.entryId]
        if (conf) {
            monName = conf.Name
        }
        this.mElemList[name + "_name"].text = monName + "(" + config.level + ")"

        this.mElemList[name + "_refreshTips"].text = Localize_cns("BOSS_TXT40") + config.refreshDes

        if (GetHeroProperty("level") < config.level) {
            this.mElemList[name + "_et"].text = String.format(Localize_cns("BOSS_TXT18"), config.level)
            return
        }
        
        let bossConfig = npcList[config.index]
        if (!bossConfig) {
            return
        }

        this.mElemList[name + "_nextTime"].visible = true
        this.mElemList[name + "_nextTime"].text = String.format(Localize_cns("BOSS_TXT15"), getFormatTimeSec(bossConfig[0]))
        if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].killStatus) {                       //已击杀
            this.mElemList[name + "_block"].visible = true
            this.mElemList[name + "_enter"].visible = true
        } else if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].runStatus) {                //已逃跑
            this.mElemList[name + "_escape"].visible = true
        } else if (bossConfig[1] == opBossActivityConfig[OrdinaryActivityIndex.WildBoss].existStatus) {              //已刷出
            this.mElemList[name + "_refreshed"].visible = true
            this.mElemList[name + "_enter"].visible = true
        }
        this.controlDataTable[name + "_enter"] = config.index
        // for (let i = 0; i < 3; i++) {
        //     let entryId = config.itemShow[i]
        //     if (entryId == null) {
        //         this.mElemList[name + "itemBox" + i].setVisible(false)
        //     } else {
        //         this.mElemList[name + "itemBox" + i].setVisible(true)
        //         this.mElemList[name + "itemBox" + i].updateByEntry(entryId)
        //     }
        // }
	}

    refreshFrame() {
        let list = []//[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (let k in GameConfig.BossWildConfig){
            let v = GameConfig.BossWildConfig[k]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a.level - b.level})

        let group = <eui.Group>this.mElemList["yewai_scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, group.width - 3, 210, 0, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WildBoss)
    }

    updateWnd() {
        this.refreshFrame()
    }
    /////////////////////////////////////////////////
    onClickEnter(args) {
        let name = args.target.name

        if (this.controlDataTable[name] == null) {
            return
        }

        let index = this.controlDataTable[name]
        
        let wnd = WngMrg.getInstance().getWindow("BossWildFrame")
        wnd.showWildFrame(index)
    }
}