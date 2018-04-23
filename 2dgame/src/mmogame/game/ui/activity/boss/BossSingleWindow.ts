class BossSingleWindow extends BaseCtrlWnd {
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

        let group = <eui.Group>this.mElemList["geren_scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group)

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["geren_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT1")

        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.PersonBoss)
        this.refreshFrame()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["geren_group"].visible = false
    }
    
	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_iconbg",   ["title"]: null, ["font"]: null, ["image"]: "boss_bossDi01",        ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 20, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: eui.Group,        ["name"]: name + "_iconGroup",["title"]: null, ["font"]: null,         ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 10, ["h"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            //{ ["index_type"]: eui.Image,        ["name"]: name + "_icon",   ["title"]: null, ["font"]: null, ["image"]: "tz_Bt01",        ["color"]: gui.Color.white, ["x"]: 10, ["y"]: 50, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_namebg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi07",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 5, ["w"]: 200, ["h"]: 45, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: Localize_cns("ROLE_TXT32"),   		["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.white,		["x"] : 180, ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_left",	["title"]: Localize_cns("BOSS_TXT5"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.green,		["x"] : 190, ["y"] : 50,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_itemtl",	["title"]: Localize_cns("BOSS_TXT6"),   		["font"] : "ht_20_lc",          ["color"] : gui.Color.black,		["x"] : 190, ["y"] : 75,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_openTips",["title"]: Localize_cns("BOSS_TXT39"),   		["font"] : "ht_20_cc",          ["color"] : gui.Color.black,		["x"] : 430, ["y"] : 80,		["w"] : 120,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: eui.Image,        ["name"]: name + "_finish", ["title"]: null, ["font"]: null, ["image"]: "boss_text01", ["color"]: gui.Color.white, ["x"]: 435, ["y"]: 40, ["w"]: 0, ["h"]: 0, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },
            { ["index_type"]: gui.Button,       ["name"]: name + "_enter",  ["title"]: Localize_cns("BOSS_TXT7"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt6", ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 435, ["y"]: 110, ["w"]: 100, ["h"]: 50, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickFight, },

		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (let i = 0; i < 3; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 180 + 85 * i, 100, window)
        }
        
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 90, 150, this.mElemList[name + "_iconGroup"])
        this.mElemList[name + "_icon"].updateByPlayer(20001)
	}

	refreshItemWindow(window, config) {
		let name = window.name
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.PersonBoss)
        let npcList = {}
        if (actInfo && actInfo.npcList) {
            npcList = actInfo.npcList
        }

        this.mElemList[name + "_finish"].visible = false
        this.mElemList[name + "_enter"].visible = false
        this.mElemList[name + "_openTips"].visible = false

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

        //剩余次数
        let count = config.chance
        if (npcList[config.index]) {
            count = count - npcList[config.index]
        }
        this.mElemList[name + "_left"].text = Localize_cns("BOSS_TXT5") + count
        //可挑战、已杀怪、未开启
        if (GetHeroProperty("level") < config.level) {
            this.mElemList[name + "_openTips"].visible = true
            this.mElemList[name + "_openTips"].text = String.format(Localize_cns("BOSS_TXT39"), config.level)
        } else if (count <= 0) {
            this.mElemList[name + "_finish"].visible = true
        } else {
            this.mElemList[name + "_enter"].visible = true
        }
    
        this.controlDataTable[name + "_enter"] = config.index
	}

    refreshFrame() {
        let list = []//[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (let k in GameConfig.BossSingleConfig){
            let v = GameConfig.BossSingleConfig[k]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a.level - b.level})

        let group = <eui.Group>this.mElemList["geren_scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, group.width - 3, 190, 3, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}
    }

    updateWnd() {
        this.refreshFrame()
    }
    ////////////////////////////////////////////////////////////////////////////////////
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
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.PersonBoss, index)
    }
}