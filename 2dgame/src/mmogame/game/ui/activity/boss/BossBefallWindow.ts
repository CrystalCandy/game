class BossBefallWindow extends BaseCtrlWnd {
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

        let group = <eui.Group>this.mElemList["jie_scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group)

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["jie_group"].visible = true
        this.mElemList["label_wndName"].text = Localize_cns("BOSS_TXT16")

        this.refreshFrame()
        this.applyActInfo()
    }

    public onHide(): void {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["jie_group"].visible = false
    }
    
	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: eui.Image,        ["name"]: name + "_bg", ["title"]: null, ["fillMode"]: egret.BitmapFillMode.SCALE, ["image"]: "boss_shengSiJieDi01", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width + 30, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Image,        ["name"]: name + "_iconbg",   ["title"]: null, ["font"]: null, ["image"]: "boss_bossDi01",        ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 10, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: eui.Group,        ["name"]: name + "_iconGroup",["title"]: null, ["font"]: null,         ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 10, ["h"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
             // { ["index_type"]: eui.Image,        ["name"]: name + "_icon",   ["title"]: null, ["font"]: null, ["image"]: "tz_Bt01",        ["color"]: gui.Color.white, ["x"]: 10, ["y"]: 50, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_namebg", ["title"]: null, ["font"]: null, ["image"]: "ty_textDi07",    ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 180, ["y"]: 25, ["w"]: 200, ["h"]: 45, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: Localize_cns("ROLE_TXT32"),   		["font"] : "ht_20_cc_stroke",   ["color"] : gui.Color.white,		["x"] : 180, ["y"] : 35,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
            
            { ["index_type"] : eui.Label,		["name"] : name +"_record",	["title"]: Localize_cns("BOSS_TXT19"),   		["font"] : "ht_24_lc",          ["color"] : gui.Color.cyan,		["x"] : 190, ["y"] : 90,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_et",	        ["title"]: Localize_cns("BOSS_TXT20"),   		["font"] : "ht_24_cc",          ["color"] : gui.Color.white,		["x"] : 350, ["y"] : 90,		["w"] : 230,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.Button,       ["name"]: name + "_enter",  ["title"]: Localize_cns("BOSS_TXT7"), ["font"]: "ht_24_cc_stroke", ["image"]: "ty_tongYongBt3", ["autoScale"]:true,["color"]: gui.Color.white, ["x"]: 400, ["y"]: 60, ["w"]: 140, ["h"]: 55, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickEnter, },
            { ["index_type"] : eui.Label,		["name"] : name +"_finish",	["title"]: Localize_cns("BOSS_TXT21"),   		["font"] : "ht_24_cc",          ["color"] : gui.Color.cyan,		["x"] : 400, ["y"] : 120,		["w"] : 140,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			
		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        // this.mElemList[name +"_enter"].visible = false
        this.mElemList[name + "_icon"] = UIActorView.newObj(this.mLayoutNode, name + "_icon", 100, 140, this.mElemList[name + "_iconGroup"])
        this.mElemList[name + "_icon"].updateByPlayer(3001)
	}

	refreshItemWindow(window, config) {
		let name = window.name
        let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.LifeAndDeathBoss)
        // {
        //         maxIndex: 历史最大进度
        //         remainCount: 剩余帮助次数,
        //         prizeRecord: {[bossIndex]:value (0x1领取了战斗 0x2领取了宝箱奖励)}   opLifeAndDeathPrizeValueConfig
        // }
        let maxIndex = -1
        let prizeRecord = {}
        if (actInfo && actInfo.prizeRecord) {
            maxIndex = actInfo.maxIndex
            prizeRecord = actInfo.prizeRecord
        }

		let bossConfig = config[0]
        //模型
        let monsterModelId = GetMonsterModel(bossConfig.entryId)
        this.mElemList[name + "_icon"].updateByPlayer(monsterModelId)
        //劫名称
        this.mElemList[name + "_name"].text = bossConfig.chapterName

        //按钮逻辑
        let allPassFlag = true                      //当前章是否全通（当天）
        let flag = false                            //是否可进入
        for (let i = 0; i < config.length; i++) {
            let v = config[i]
            if (allPassFlag == true) {
                if (!prizeRecord[config.index]) {
                    allPassFlag = false
                } else {
                    let value = prizeRecord[config.index]
                    if ((value & opLifeAndDeathPrizeValueConfig.fightPrize) != opLifeAndDeathPrizeValueConfig.fightPrize) {                 //当天已打胜过，已领取战胜的奖励
                        allPassFlag = false
                    }
                }
            }

            if (flag == false) {
                if (v.index <= maxIndex + 1) {
                    flag = true
                }
            }
        }

        if (flag == true) {
            this.mElemList[name + "_enter"].visible = true
            this.mElemList[name + "_et"].visible = false

            this.controlDataTable[name + "_enter"] = bossConfig.chapterIndex
        } else {
            this.mElemList[name + "_enter"].visible = false
            this.mElemList[name + "_et"].visible = true
        }
        this.mElemList[name + "_finish"].visible = allPassFlag
	}

    refreshFrame() {
        let list = []
        let l = {}
        for (let _ in GameConfig.BossBefallConfig) {
            let v = GameConfig.BossBefallConfig[_]
            l[v.chapterIndex] = checkNull(l[v.chapterIndex], [])
            table_insert(l[v.chapterIndex], v)
        }
        for (let _ in l) {
            let v = l[_]
            table_sort(v, function(a, b) {return a.index - b.index})
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a[0].chapterIndex - b[0].chapterIndex})

        let group = <eui.Group>this.mElemList["jie_scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, group.width - 3, 170, 0, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}
    }

    applyActInfo() {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.LifeAndDeathBoss)
    }
    
    updateWnd() {
        this.refreshFrame()
    }
    ///////////////////////////////////////////////////////////
    onClickEnter(args) {
        let name = args.target.name
        if (!this.controlDataTable[name]) {
            return
        }

        let chapterIndex = this.controlDataTable[name]
        let wnd = WngMrg.getInstance().getWindow("BossBefallFrame")
        wnd.showWithChapter(chapterIndex)
    }
}