// TypeScript file
/*
作者:
    
	
创建时间：

意图：
  		军团战等活动的死亡等待窗口

公共接口：
	
*/

class ActivityWaitFrame extends BaseWnd{
    timer:number;
    count:number;
    index:number;
    neednum:number;
public initObj(...args:any[]):void {
		this.mLayoutPaths = ["layouts/ActivityWaitLayout.exml"]
		this.mElemList ={}
		this.timer = null
		this.count = 30
		
		this.index = null
}

onLoad(){
		this.createFrame()
}

onUnLoad(){

}

onShow(){
    RegisterEvent(EventDefine.BIG_BOSS_PLAYER_REVIVE, this.onCloseFrame, this)
    this.mLayoutNode.visible = (true)
    this.refreshFrame()   

	if(! this.index ){
		this.index = ActivityDefine.BigBoss
	}
	//this.onRefresh()
	this.setupTimer()
}

onHide(){
		UnRegisterEvent(EventDefine.BIG_BOSS_PLAYER_REVIVE, this.onCloseFrame, this)
		this.mLayoutNode.visible = (false)		
		this.killTimer()
		this.index = null
}

createFrame(){
   this.mLayoutNode.skinName = this.mLayoutPaths[0];
	this.mLayoutNode.setDoModal(true);	
	this.mLayoutNode.horizontalCenter = 0;
	this.mLayoutNode.verticalCenter = 0;	
	this.initSkinElemList();
	var elemInfo =[
 		{["name"] : "btn_close",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onClickReturn},
		{["name"] : "btn_close_top",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onClickReturn},
		{["name"] : "Rebirth_btn",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onRebirth},

		//{["name"]: "upgrade_title", ["messageFlag"]: true},
		{["name"]: "jinshi_count", ["messageFlag"]: true},
     ];
    UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);  
	//this.mElemList["tips"].setAlignFlag(gui.Flag.H_CENTER)
	//AddRdContent(this.mElemList["tips"], Localize_cns("BIG_BOSS_AUTO_TIPS"), "ht_28_cc_stroke", "white")

	let a = GetActivity(ActivityDefine.BigBoss)    
		//this.mElemList = ui_util.SetLookAndFeelWindow("Frame/Template02", this.mRootFrame, 520, 375, 0, 0)
		//this.mElemList["return"]:SubscribeEvent(egret.TouchEvent.TOUCH_TAP, this.onReturn, this)
		//
		//let mElemInfo:any = {
	
  		//	{["index_type"] : gui.ControlType.Label,		["name"] : "bg",  			["parent"] : null,					["title"] : null ,   		["font"] : null,   ["scale_image"] : "ty_UIBg02",		["color"] : gui.Color.white,		["x"] : 40, ["y"] : 40,		["w"] : 440,["h"] : 200,	["event_name"] : null, ["fun_index"] : null},

  		//	{["index_type"] : gui.ControlType.Label,		["name"] : "bg_time",  	["parent"] : "bg",				["title"] : null ,   		["font"] : null,   ["scale_image"] : "ty_tipsXuanZhe02",		["color"] : gui.Color.white,		["x"] : 40, ["y"] : 55,		["w"] : 360,["h"] : 50,	["event_name"] : null, ["fun_index"] : null},
		//		{["index_type"] : gui.ControlType.Label,		["name"] : "time",  		["parent"] : "bg_time" , 	["title"] : Localize_cns("BIG_BOSS_WAITTIEM") ,   		["font"] : "ht_24_cc_stroke_zongse",   ["image"] : "",				["color"] : gui.Color.red,		["x"] : 0, ["y"] : 0,		 			["w"] :362 ,["h"] : 50		,["event_name"] : null, ["fun_index"] : null},
		//		{["index_type"] : gui.ControlType.Label,		["name"] : "tips",  		["parent"] : "bg",				["title"] :Localize_cns("BIG_BOSS_PAYFORLIVE") ,   		["font"] : "ht_24_cc_stroke",   ["image"] : "",				["color"] : gui.Color.cyan,		["x"] : 40, ["y"] : 100,		["w"] : 362,["h"] : 50,["event_name"] : null, ["fun_index"] : null},

		//		{["index_type"] : gui.ControlType.Button,		["name"] : "Rebirth_btn",  	 ["scale_image"] : "ty_tongYongBt01",			["x"] : 195, ["y"] : 255,		 			["w"] : 265 ,["h"] : 72		,["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onRebirth},
		//		{["index_type"] : gui.ControlType.Label,		["name"] : "Rebirth_title",  ["parent"] : "Rebirth_btn",				["title"] :Localize_cns("BIG_BOSS_RELIVE") ,   		["font"] : "ht_24_cc_stroke",  	["color"] : gui.Color.white,		["x"] : 35, ["y"] : 10,		["w"] : 76,["h"] : 40,["messageFlag"] : gui.Window.TraceMouseAll},
  		//	{["index_type"] : gui.ControlType.Label,		["name"] : "jinshi_bg",  		["parent"] : "Rebirth_btn",				["title"] : null ,   		["font"] : null,   ["scale_image"] : "ty_ziYuanBg01",		["color"] : gui.Color.white,		["x"] : 110, ["y"] : 14,		["w"] : 102,["h"] : 40,	["messageFlag"] : gui.Window.TraceMouseAll},
		//		{["index_type"] : gui.ControlType.Label,		["name"] : "jinshi_icon",  	["parent"] : "jinshi_bg",		["image"] : "ty_zuanShiIcon01",				["x"] : 0, ["y"] : 0,		 			["w"] :0 ,["h"] : 0		,["messageFlag"] : gui.Window.TraceMouseAll},
		//		{["index_type"] : gui.ControlType.Label,		["name"] : "jinshi_count",  ["parent"] : "jinshi_bg",			["title"] :"10" ,   		["font"] : "ht_24_lc_stroke",   ["image"] : "",				["color"] : gui.Color.cyan,		["x"] : 40, ["y"] : 0,		 			["w"] :60 ,["h"] : 40		,["messageFlag"] : gui.Window.TraceMouseAll},

		//}
		//ui_util.CreateElem(mElemInfo, this.mRootFrame, this.mElemList, this)
		//
		
}
//////////////////////////////////////////////////////////////////////////-
////-复活等待时间
//SetTime(time){
//		this.killTimer()
//		this.setupTimer()	
//}
refreshFrame(){
    
}
onTimeTick(){
		let endtime = 0
		if(this.index == ActivityDefine.BigBoss ){
			endtime = getSaveRecord(opSaveRecordKey.worldbossWait)
		}else if(this.index == ActivityDefine.FactionWar ){
			endtime = getSaveRecord(opSaveRecordKey.factionWarWait)
		}else{
			endtime = getSaveRecord(opSaveRecordKey.monsterSiegeWait)
		}
		
		let sysTime = GetServerTime()
		let lefttime = endtime - sysTime	
		
		if(lefttime <=0  ){
				//txt = "00:00:00"	
				let txt = String.format(Localize_cns("BIG_BOSS_WAITTIEM"), 0)	
				this.mElemList["time"].text = (txt)
				this.killTimer()
				this.onCloseFrame()					
		}else{
				let txt = String.format(Localize_cns("BIG_BOSS_WAITTIEM"), lefttime)
				this.mElemList["time"].text = (txt)

				let needdiamond = this.neednum//ConfigFactionWar.clearDeathPay
		//if(open ==  1 ){
		//	needdiamond = needdiamond / 2
		//}		
		       this.mElemList["jinshi_count"].text = (tostring(needdiamond))
		}		
		
		//是否开放
		//let info = ActivitySystem.getInstance().getRechargeActivityInfo("weekActivity") || {}
		//let open = 0
		//if(info ){
		//	for(let k in info){
		//	let v = info[k]
	
		//		if(v["falg"] == "MLFH" ){
		//			open = 1
		//		}
		//	}
		//}		
}


setupTimer(){
		if(this.timer ){
			return
		}
		this.timer =	SetTimer(this.onTimeTick, this, 1000, true)
}

killTimer(){
	if(this.timer ){
		KillTimer(this.timer)
		this.timer = null
	}
}
//////////////////////////////////////////////////////////////////////////////
////-关闭窗口
onCloseFrame(){
		this.hideWnd()
}

//////////////////////////////////////////////////////////////////////////////
//-快速复活
onRebirth(){
	let heroInfo = GetHeroPropertyInfo()
	if(! heroInfo ){
		return
	}		
	if(heroInfo["gold"] < this.neednum ){
		MsgSystem.addTagTips(Localize_cns("DIAMAND_NOENGOUGH"))
		return
	}
	let a = GetActivity(this.index)
	a.SendClearTimeMessage()
 	this.hideWnd()
}

showFrameWithActIndex( index, neednum){
	this.index = index
	this.neednum = neednum
	return this.showWnd()
}

onClickReturn( args){
	this.hideWnd()	
}

}