// TypeScript file
/*
作者:
    liuziming
	
创建时间：
   2017.01.10(周二)

意图：
   物品等获取途径（快速跳转）
公共接口：
   
*/
class QuickGainFrame extends BaseWnd {
	controlDataTable: any;
	inputargs: any;
	showWndList: any;
	MaxNum: number = 6;
	listenWndName: any;
	isShowFrontWnd: boolean;

	_showWndList: any;
	listenActPro: number;

	bAutoClose:boolean

	scroll: UIScrollList;

	public initObj(...args: any[]): void {
		this.mLayoutPaths = ["layouts/QuickGainLayout.exml"]
		this.controlDataTable = {}
		this.inputargs = ["", 0]
		RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)

		this.listenWndName = ""
		this.listenActPro = -1
	}

	destory() {
		UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
	}

	onLoad() {
		this.showWndList = []
		this.createFrame()
	}

	onUnLoad() {

		this.controlDataTable = {}
	}

	onShow() {
		//this.frameAction.showAction()
		this.mLayoutNode.visible = true;
		this.refreshFrame()
	}

	onHide() {
		this.mLayoutNode.visible = false;
		//this.showWndList = {}
		this.inputargs = ["", 0]
	}

	////////////////////////////////////////////////////////////////////-
	createFrame() {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRetrun },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickRetrun },

		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);


		let group_content: eui.Group = this.mElemList["Group_Content"]
		this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group_content.width, group_content.height, group_content)

	}


	initItemWindow(window) {
		let name = window.name

		let mElemInfo: any = [
			{ ["index_type"]: gui.Button, ["name"]: name + "_option", ["title"]: null, ["font"]: null, ["image"]: "ty_UIBg04", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 500, ["h"]: 80, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickOption },
			//{["index_type"] : gui.ControlType.Label,						["name"] : name +"_icon",			["parent"] : name +"_option", 			["title"] : null ,   		["font"] : null,   ["image"] : "fbi_fuBenIcon01",		["color"] : gui.Color.white,		["x"] : 10, ["y"] : 12,		["w"] : 0,["h"] : 0,	["event_name"] : gui.Window.MouseLongDownEvent, ["fun_index"] : null, ["messageFlag"] : true,},
			{ ["index_type"]: gui.RichDisplayer, ["name"]: name + "_dec", ["parent"]: null, ["title"]: null, ["font"]: null, ["image"]: "", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 27, ["w"]: 440, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },
			{ ["index_type"]: gui.Button, ["name"]: name + "_block", ["title"]: null, ["font"]: null, ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 500, ["h"]: 80, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickBlock },

		]
		UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
		//ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
		//AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
	}

	refreshItemWindow(window, config) {
		let name = window.name

		let [enable, des, str] = FastJumpSystem.getInstance().checkFastJump(config[0], config[1])
		this.mElemList[name + "_option"].enabled = (enable)
		AddRdContent(this.mElemList[name + "_dec"], des, "ht_24_cc", "zongse")
		this.controlDataTable[name + "_option"] = config

		this.mElemList[name + "_block"].visible = (!enable)
		if (enable == false) {
			this.controlDataTable[name + "_block"] = str
		}
	}

	setAutoClose(bAutoClose){
		this.bAutoClose = bAutoClose
	}

	refreshFrame() {

		//this.controlDataTable = {}

		//刷新顶部信息
		let config = FastJumpSystem.getInstance().getFunTipsConfig(this.inputargs[0], this.inputargs[1])
		let imageName = ""
		let name = "Error"
		let des = ""
		if (config) {
			[imageName, name, des] = FastJumpSystem.getInstance().getFunTipsInfo(config)
		}
		//TLog.Debug("2222222222222222222222", imageName, name, config)
		this.mElemList["Image_Icon"].source = (imageName)
		this.mElemList["Label_Name"].text = (name)
		AddRdContent(this.mElemList["Rd_Des"], des, "ht_18_cc", "white", 5)

		if (!config) {
			TLog.Warn("QuickGainFrame.refreshFrame the args[1]:%s, args[2]:%s is null", this.inputargs[0], this.inputargs[1])
			//return this.hideWnd()
			return
		}

		let list: any = []
		let t1: any = []				//开放
		let t2: any = []				//未开放
		for (let k in config.approach) {
			//for(let _ = 0; _ < config.approach.length; _++){
			let v = config.approach[k]

			let [flag, _s, _] = FastJumpSystem.getInstance().checkFastJump(v[0], v[1])
			if (flag == true) {
				JsUtil.arrayInstert(t1, v)
			} else {
				JsUtil.arrayInstert(t2, v)
			}
		}
		for (let _ = 0; _ < t1.length; _++) {
			let v = t1[_]

			JsUtil.arrayInstert(list, v)
		}
		for (let _ = 0; _ < t2.length; _++) {
			let v = t2[_]

			JsUtil.arrayInstert(list, v)
		}
		//for(let k in config){
		//		let v = config[k]
		//	let t:any = {}
		//	if(type(v) == "object" ){
		//	 t:any = {k, v}					//{索引, 参数}
		//	}else{
		//	 t:any = {v}							//{索引}
		//	}
		//	
		//	JsUtil.arrayInstert(list, t)
		//}
		let scroll = this.scroll
		scroll.clearItemList();
		this.controlDataTable = {}
		let hasNum = list.length
		for (let k = 0; k < list.length; k++) {
			let v = list[k]
			let window = scroll.getItemWindow(k, 500, 80, 3, 5, 0)

			this.initItemWindow(window)
			this.refreshItemWindow(window, v)
		}

		//组队状态下不可操作
		if(HeroIsInTeam() == true ){
			this.mElemList["team_no_operate"].visible = (true)
		}else{
			this.mElemList["team_no_operate"].visible = (false)
		}
	}

	////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
	onClickRetrun(args) {
		//if(this.isShowFrontWnd && size_t(this._showWndList) != 0 ){
		//	for(let _ in this._showWndList){
		//		let wnd = this._showWndList[_]

		//		wnd.showWnd()
		//	}
		//}
		return this.hideWnd()
	}

	onClickOption(event: egret.TouchEvent) {
		let name = event.target.name;

		if (!this.controlDataTable[name]) {
			return
		}

		this["bAutoClose"] = true
		let config = this.controlDataTable[name]
		let listenWndName = FastJumpSystem.getInstance().doFastJump(config[0], config[1])

		if(this["bAutoClose"] == false)
			return;
		//tips不用关闭
		// if(config[0] == FastJumpTypeList.FIELD_MESSAGETIPS){
		// 	return;
		// }

		for (let _ in this._showWndList) {
			let wnd = this._showWndList[_]

			wnd.hideWnd()
		}
		this.hideWnd()

		this.listenWndName = listenWndName || ""
		this.listenActPro = ActivitySystem.getInstance().getActivtyProcess()
	}

	onClickBlock(event: egret.TouchEvent) {
		//tolua.cast(args, "gui::GUIMouseEvent")
		let name = event.target.name;
		if (!this.controlDataTable[name]) {
			return
		}

		let str = this.controlDataTable[name]
		MsgSystem.addTagTips(str)
	}

	////////////////////////////////////////////////////-公共接口////////////////////////////////////-
	showQuickGainFrame(param) {
		//param={{"item",entry},{"WingsFrame","WingSkillListFrame"}}
		this.inputargs = param[0] || ["", 0]

		let currenceCheck = false;
		if (this.inputargs[0] == "jinbi") {
			MsgSystem.addTagTips(Localize_cns("GOLD_NOENGOUGH"))
			currenceCheck = true
		} else if (this.inputargs[0] == "zuanshi") {
			MsgSystem.addTagTips(Localize_cns("DIAMAND_NOENGOUGH"))
			currenceCheck = true
		}

		//当前正在活动中，就不处理调整了
		let curIndex = ActivitySystem.getInstance().getCurActIndex()
		if(curIndex != OrdinaryActivityIndex.NULL ){
			if(currenceCheck ){
				return
			}
		}

		this.showWndList = []
		this.listenWndName = ""
		if (param[1] != null) {
			for (let _ in param[1]) {
				let name = param[1][_]

				let wnd = WngMrg.getInstance().getWindow(name)
				if (wnd && wnd.isVisible() == true) {
					JsUtil.arrayInstert(this.showWndList, wnd)
				}
			}
		}
		table_sort(this.showWndList, function (a, b) {
			return a.getShowOrder() - b.getShowOrder()
		})

		this._showWndList = this.showWndList
		this.isShowFrontWnd = false
		if (param[2] == null) {
			this.isShowFrontWnd = true
		}

		if (this.isVisible() == false) {
			return this.showWnd()
		} else {
			return this.refreshFrame()
		}
	}

	onUIHideEvent(args) {
		if (this.listenWndName == "") {
			return
		}

		//自身是关闭状态，才会监听
		if (this.isVisible()) {
			return
		}

		//正在活动中，不处理
		let wngMgr = WngMrg.getInstance()
		if (wngMgr.stackList != null) {
			this.listenWndName = ""
			this.listenActPro = 0
			return
		}

		//不是游戏流程状态
		if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
			this.listenWndName = ""
			this.listenActPro = 0
			return
		}

		//跳转时是否进入其他活动
		if (this.listenActPro != ActivitySystem.getInstance().getActivtyProcess()) {
			this.listenWndName = ""
			this.listenActPro = 0
			return
		}

		if (this.listenWndName == args.window.classname) {
			for (let _ in this._showWndList) {
				let wnd = this._showWndList[_]

				wnd.showWnd()
			}
			this.listenWndName = ""
		}

	}


}