/*
作者:
    liuziming
	
创建时间：
   2017.09.08(周五)

意图：
   特殊物品奖励弹窗
公共接口：
   
*/
class PrizeRareShowFrame extends BaseWnd{
    controlDataTable: any
	contrlList: any
	timerList: any
    mElemList: any
    itemList: any

public initObj(...args:any[]):void {
	this.controlDataTable = {}
	this.contrlList = {}
	this.timerList = {}
    this.itemList = []
}

onLoad(){
	this.createFrame()
}

onUnLoad(){
	for(let _ in this.contrlList){
			let v = this.contrlList[_]
	
		v.deleteObj()
	}

	this.contrlList = {}
	this.controlDataTable = {}
}

onShow(){
	this.mLayoutNode.visible = (true)
	this.refreshFrame()
}

onHide(){
	this.mLayoutNode.visible = (false)
	
	for(let _ in this.timerList){
			let timer = this.timerList[_]
	
		KillTimer(timer)
	}
	this.timerList = {}
}

////////////////////////////////////////////////////////////////////-
createFrame(){
    this.mElemList = {}

    let width = 420;
    let height = 480;

    this.mLayoutNode.width = width;
    this.mLayoutNode.height =height;
    this.mLayoutNode.x = 0;
    this.mLayoutNode.y = 0;
    this.mLayoutNode.verticalCenter = 0;
    this.mLayoutNode.horizontalCenter = 0;


    let mElemInfo1: any = [
        { ["index_type"]: gui.Grid9Image, ["name"]: "_bg", ["image"]: "ty_UIDi01", ["percentWidth"]: 100, ["percentHeight"]: 100 },
        { ["index_type"]: gui.Button, ["name"]: "return", ["image"]: "ty_bt_back04",  ["bottom"]: 0, ["right"]: 0, ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onReturn, },
    ]
    UiUtil.createElem(mElemInfo1, this.mLayoutNode, this.mElemList, this)

	let mElemInfo:any = [
  										{["index_type"] : gui.RichDisplayer,		["name"] : "rd",  					["x"] : 35, ["y"] : 20,		["w"] : 355,["h"] : 80,	["event_name"] : null, ["fun_index"] : null},
  										{["index_type"] : eui.Group,				["name"] : "bg",  					["x"] : 35, ["y"] : 90,		["w"] : 0,["h"] : 0,},
                                          {["index_type"] : eui.Image,				["name"] : "ibg",  					["parent"] : "bg", ["image"] : "ty_ztJiangLiDi01",		["color"] : gui.Color.white,		["x"] : 0, ["y"] : 0,		["w"] : 0,["h"] : 0,},
  										{["index_type"] : eui.Label,				["name"] : "title",  				["title"] : Localize_cns("YOU_GET") ,   	["font"] : "ht_24_cc_stroke_saddlebrown",   ["color"] : gui.Color.white,		["x"] : 35, ["y"] : 110,		["w"] : 354,["h"] : 30,	["messageFlag"] : true},
  										
  										{["index_type"] : eui.Label,			    ["name"] : "itemName", 			    ["parent"] : "bg", ["title"] : Localize_cns("YOU_GET") ,   	["font"] : "ht_24_cc",   ["color"] : gui.Color.white,		["x"] : 100, ["y"] : 188,		["w"] : 160,["h"] : 30,	["messageFlag"] : true},
  										{["index_type"] : gui.Button,				["name"] : "confirm", 			    ["title"] : Localize_cns("TEMP_TXT2") ,   	["font"] : "ht_24_cc_stroke_saddlebrown",   ["image"] : "ty_tongYongBt01",			["color"] : gui.Color.white,		["left"] : 135, ["bottom"] : 20,		["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onClickConfirm, },
  									
    ]
	UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
	//ui_util.CreateDrawRectPtr(this.mElemList["rd"], gui.Color32Half.green)
	
	this.mElemList["rd"].setAlignFlag(gui.Flag.H_CENTER)
	AddRdContent(this.mElemList["rd"], Localize_cns("TEMP_TXT1"), "ht_24_cc", "black", 5)
	
	this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 130,65, this.mElemList["bg"])
	//this.mElemList["itemBox"]:updateByEntry(30004, 40)
	//this.mElemListOne["itemBox"]:setItemHintEnable(false)
	
	this.mElemList["oneEffectView"] = UIActorView.newObj(this.mLayoutNode, "oneEffectView", 210,	150, this.mLayoutNode)
	
}

refreshFrame(){
	if(size_t(this.itemList) == 0 ){
		return
	}
	//单抽物品
	let info = this.itemList[0]
	let logicItem = null
	let uid = info[3] 
	if(uid ){
		logicItem = ItemSystem.getInstance().getItemLogicInfoByID(uid)
	}
	
	if(logicItem ){
		this.mElemList["itemBox"].updateByItem(logicItem)
	}else{
		this.mElemList["itemBox"].updateByEntry(info[0], info[1])
	}
	
	this.mElemList["itemName"].text = (ItemSystem.getInstance().getItemName(info[0]))
	this.controlDataTable["confirm"] = SpecailItemId.LUCKYSTONE
}

////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
onReturn( args){
	return this.hideWnd()
}


onClickConfirm( args){
	let name = args.target.name
	
	if(! this.controlDataTable[name] ){
		return
	}
	
	let entryId = this.controlDataTable[name]
	
	ExecuteMainFrameFunction("zhiye")
	this.hideWnd()
}

//////////////////////////////////////////-公共接口////////////////-
showWithItemList( itemList){
	//{entryId, count, type}
	this.itemList = itemList
	if(size_t(this.itemList) > 10 ){
		return
	}
	this.showWnd()
}
}