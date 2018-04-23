// TypeScript file
class BossGlobalRemindFrame extends BaseWnd {
    controlDataTable: any;
    scroll: UIScrollList;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/boss/BossGlobalRemindLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();

        let mElemInfo: any = [

        //     { ["index_type"]: gui.Grid9Image, ["name"]: "bg_", ["title"]: null, ["font"]: null, ["image"]: "ty_UIDi01", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_UIBg02", ["color"]: gui.Color.white, ["x"]: 30, ["y"]: 30, ["w"]: 540, ["h"]: 376, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.RichDisplayer, ["name"]: "emailMsg", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 44, ["y"]: 40, ["w"]: 480, ["h"]: 200, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.RichDisplayer, ["name"]: "prizePoint_rd", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 64, ["y"]: 260, ["w"]: 522, ["h"]: 60, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.Button, ["name"]: "confirmBtn", ["title"]: Localize_cns("SURE"), ["font"]: "ht_24_cc_stroke_saddlebrown", ["image"]: "ty_tongYongBt1", ["color"]: gui.Color.white, ["x"]: 215, ["y"]: 432, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickConfirmBtn },
                { ["index_type"]: gui.Button, ["name"]: "btn_close", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
                { ["index_type"]: gui.Button, ["name"]: "btn_back", ["title"]: null,  ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
         ]
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);

        let group = <eui.Group>this.mElemList["scroll_group"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group)

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)

        this.mLayoutNode.visible = (true)
        this.refreshFrame()
    }

    public onHide(): void {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false)
    }

	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },

            { ["index_type"] : eui.Label,		["name"] : name +"_name",	["title"]: Localize_cns("BOSS_TXT12"),   		["font"] : "ht_22_lc",   ["color"] : gui.Color.black,		["x"] : 30,     ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"] : eui.Label,		["name"] : name +"_level",	["title"]: 356,   		["font"] : "ht_22_lc",   ["color"] : gui.Color.black,		["x"] : 250,    ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
            { ["index_type"] : eui.CheckBox,    ["name"]: name + "_remind", ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "ty_xuanZheDi01", ["image_down"]: "ty_xuanZhe01",  ["color"]: gui.Color.white, ["x"]: 350, ["y"]: 5, ["event_name"]: egret.Event.CHANGE, ["fun_index"]: this.onCheckChange },
			{ ["index_type"] : eui.Label,		["name"] : name +"_tips",	["title"]: Localize_cns("BOSS_TXT26"),   		["font"] : "ht_22_lc",          ["color"] : gui.Color.saddlebrown,		["x"] : 400, ["y"] : 15,		["w"] : 200,["h"] : 25,	 ["fun_index"] : null, ["messageFlag"] : true,},
			
		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
	}

	refreshItemWindow(window, config) {
		let name = window.name

		let monName = ""
        let conf = GameConfig.MonsterConfig[config.entryId]
        if (conf) {
            monName = conf.Name
        }
        this.mElemList[name + "_name"].text = monName
        this.mElemList[name + "_level"].text = config.level
        this.mElemList[name + "_remind"].selected = true

        this.controlDataTable[name + "_remind"] = config.index
	}

    refreshFrame() {
        let list = []//[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (let k in GameConfig.BossGlobalConfig){
            let v = GameConfig.BossGlobalConfig[k]
            table_insert(list, v)
        }
        table_sort(list, function(a, b) {return a.level - b.level})

        let group = <eui.Group>this.mElemList["scroll_group"]
        let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, group.width - 3, 60, 3, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}
    }

     //////////////////////////////////////////
     onCheckChange(args) {
         let state = args.target.selected
     }
     
}