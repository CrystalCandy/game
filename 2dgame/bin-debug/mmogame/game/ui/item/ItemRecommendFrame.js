var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
作者:
    yangguiming
    
创建时间：
   2017.08.14(周一)

意图：
   物品、装备推荐
公共接口：
   
*/
var ItemRecommendFrame = (function (_super) {
    __extends(ItemRecommendFrame, _super);
    function ItemRecommendFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemRecommendFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.logicItem = null;
        this.heroPetInfo = null;
        this.lastWndName = null;
        this.itemTimeCache = {};
        this.alreadyShowItemCache = {};
        this.newItemCache = {};
        this.noMoreShowCache = null;
        this.lastEnterGameTime = -1;
        this.showState = false;
        this.userData = null;
        this.isNeedCheck = false;
        this.checkTimer = null;
        // RegisterEvent(EventDefine.ITEM_UPDATE, this.onCheckRecommendEvent, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.onCheckRecommendEvent, this)
        // RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onCheckRecommendEvent, this)
        // RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this)
        // RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
        // RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
    };
    ItemRecommendFrame.prototype.destory = function () {
        // UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onCheckRecommendEvent, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.onCheckRecommendEvent, this)
        // UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onCheckRecommendEvent, this)
        // UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this)
        // UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
        // UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
    };
    ItemRecommendFrame.prototype.onLoad = function () {
        // UiUtil.setFrameSize(this.mLayoutNode, 320, 300, 0, 0)
        // this.mLayoutNode.right = 0;
        // this.mLayoutNode.bottom = 140;
        // let mElemInfo: any = [
        //     { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["image"]: "ty_tipsXuanZhe02", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: eui.Label, ["name"]: "itemName", ["title"]: "", ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 15, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "useLevel", ["title"]: "", ["font"]: "ht_20_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 50, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "target", ["title"]: Localize_cns("ITEM_TXT26"), ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.lime, ["x"]: 230, ["y"]: 0, ["w"]: 100, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Group, ["name"]: "itemwnd", ["title"]: null, ["font"]: null, ["scale_image"]: "", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 88, ["w"]: 280, ["h"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.RichDisplayer, ["name"]: "itemDesRd", ["parent"]: "itemwnd", ["title"]: "", ["font"]: "ht_18_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 280, ["h"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: eui.Group, ["name"]: "equipwnd", ["title"]: null, ["font"]: null, ["scale_image"]: "", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 88, ["w"]: 280, ["h"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: eui.Label, ["name"]: "vocationTitle", ["parent"]: "equipwnd", ["title"]: Localize_cns("ITEM_PROFESSION") + ":", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.navajowhite, ["x"]: 0, ["y"]: 0, ["w"]: 80, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "vocation", ["parent"]: "equipwnd", ["title"]: "", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 0, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "baseProTitle", ["parent"]: "equipwnd", ["title"]: Localize_cns("ITEM_FIXED_PROPERTY") + ":", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.navajowhite, ["x"]: 0, ["y"]: 20, ["w"]: 80, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "basePro1", ["parent"]: "equipwnd", ["title"]: "", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 20, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "basePro2", ["parent"]: "equipwnd", ["title"]: "", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 40, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "specialSkillTitle", ["parent"]: "equipwnd", ["title"]: Localize_cns("ITEM_SPECIAL_SKILL") + ":", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.navajowhite, ["x"]: 0, ["y"]: 60, ["w"]: 80, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: eui.Label, ["name"]: "specialSkill", ["parent"]: "equipwnd", ["title"]: "", ["font"]: "ht_18_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 90, ["y"]: 60, ["w"]: 200, ["h"]: 30, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null, ["messageFlag"]: true },
        //     { ["index_type"]: gui.Button, ["name"]: "return", ["title"]: Localize_cns("CLUBWAR_TXT17"), ["image"]: "ty_tongYongBt26", ["font"]: "ht_22_cc_stroke", ["color"]: gui.Color.white, ["x"]: 80, ["y"]: 190, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        //     { ["index_type"]: gui.Button, ["name"]: "useItem", ["image"]: "ty_tongYongBt16", ["title"]: Localize_cns("EQUIP_SET"), ["font"]: "ht_22_cc_stroke", ["color"]: gui.Color.white, ["x"]: 170, ["y"]: 190, ["w"]: 0, ["h"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickUseItem },
        //     { ["index_type"]: eui.Group, ["name"]: "doNotAskToday", ["parent"]: "wnd", ["image"]: "", ["horizontalCenter"]: 0, ["y"]: 235, ["w"]: 240, ["h"]: 55, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: gui.Grid9Image, ["name"]: "doNotAskTodayBg", ["parent"]: "doNotAskToday", ["image"]: "ty_tipsXuanZhe02", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },
        //     { ["index_type"]: eui.CheckBox, ["name"]: "gouXuan", ["parent"]: "doNotAskToday", ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "ty_xuanZheDi01", ["image_down"]: "ty_xuanZhe01", ["color"]: gui.Color.white, ["x"]: 10, ["y"]: 7, ["w"]: 40, ["h"]: 34, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCheckBox },
        //     { ["index_type"]: eui.Label, ["name"]: "toDayTips", ["parent"]: "doNotAskToday", ["title"]: Localize_cns("COMMON_TXT4"), ["font"]: "ht_24_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 60, ["y"]: 4, ["w"]: 150, ["h"]: 49, ["event_name"]: null, ["fun_index"]: null },
        // ]
        // UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
        // this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 15, 10, this.mElemList["bg"], false, 0.8)
        // this.mElemList["itemBox"].setCountVisible(false)
        // this.mElemList["petBox"] = UIPetBox.newObj(this.mLayoutNode, "petBox", 220, 0, this.mElemList["bg"], 0.7)
        // this.mElemList["petBox"].setPetHintEnable(false)
        // UiUtil.moveToFront(this.mElemList["target"])
    };
    ItemRecommendFrame.prototype.onUnLoad = function () {
        this.lastWndName = null;
        this.itemTimeCache = {};
        this.alreadyShowItemCache = {};
        this.newItemCache = {};
        this.noMoreShowCache = {};
    };
    ItemRecommendFrame.prototype.onShow = function () {
        // RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this)
        // this.mLayoutNode.visible = true
        // this.mLayoutNode.moveToBack()
        // //TLog.Assert(this.logicItem != null)
        // this.refreshFrame()
    };
    ItemRecommendFrame.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this)
        // this.mLayoutNode.visible = (false)
        // if (this.checkTimer) {
        //     KillTimer(this.checkTimer)
        //     this.checkTimer = null
        // }
        // this.isNeedCheck = false
        // if (this.logicItem) {
        //     let nowTime = GetServerTime()
        //     this.itemTimeCache[this.logicItem.entryId] = nowTime
        //     this.alreadyShowItemCache[this.logicItem.id] = true
        //     this.checkNoMoreShow()
        // }
        // this.logicItem = null
        // this.heroPetInfo = null
        // this.userData = null
    };
    // refreshFrame() {
    //     if (this.logicItem == null) {
    //         this.hideWnd()
    //         return
    //     }
    //     let logicItem = ItemSystem.getInstance().getItemLogicInfoByID(this.logicItem.id)
    //     if (logicItem == null) {
    //         this.hideWnd()
    //         return
    //     }
    //     if (logicItem.isEquip() && logicItem.getOwnerId() > 0) {
    //         this.hideWnd()
    //         return
    //     }
    //     this.mElemList["doNotAskToday"].visible = (true)
    //     this.mElemList["gouXuan"].selected = (false)
    //     // this.mElemList["gouXuan"]:SetCheck(false)
    //     // this.mElemList["gouXuan"].source = ("ty_tipsXuanZhe02")
    //     this.refreshCheckBox()
    //     this.mElemList["petBox"].setVisible(this.heroPetInfo != null)
    //     this.mElemList["target"].visible = (this.heroPetInfo != null)
    //     if (this.heroPetInfo) {
    //         let info = this.heroPetInfo
    //         if (IsHeroInfo(info)) {
    //             this.mElemList["petBox"].updateByEntryAndSex(info.vocation, info.sexId, null, GetHeroProperty("VIP_level"))
    //         } else {
    //             this.mElemList["petBox"].updateByPet(info)
    //         }
    //         if (logicItem.isEquip()) {
    //             this.mElemList["target"].text = (Localize_cns("ITEM_TXT26"))
    //         } else {
    //             this.mElemList["target"].text = (Localize_cns("ITEM_TXT27"))
    //         }
    //     }
    //     logicItem = this.logicItem
    //     this.mElemList["itemBox"].updateByItem(logicItem)
    //     this.mElemList["itemBox"].setCountVisible(false)
    //     let itemColor = ItemSystem.getInstance().getFontColorWithEntry(logicItem.entryId)
    //     this.mElemList["itemName"].text = (logicItem.getRefProperty("name"))
    //     this.mElemList["itemName"].textColor = (itemColor)
    //     this.mElemList["useLevel"].text = ("")
    //     this.mElemList["itemwnd"].visible = (logicItem.isEquip() == false)
    //     this.mElemList["equipwnd"].visible = (logicItem.isEquip() == true)
    //     this.mElemList["useLevel"].text = ("")
    //     let uselevel = logicItem.getRefProperty("uselevel")
    //     if (logicItem.isEquip()) {
    //         if (uselevel > 0) {
    //             this.mElemList["useLevel"].text = (String.format(Localize_cns("EQUIP_USE_LEVEL2"), uselevel))
    //         }
    //         this.mElemList["useItem"].text = (Localize_cns("EQUIP_SET"))
    //         this.showEquipInfo()
    //     } else {
    //         //普通物品
    //         //普通物品
    //         if (uselevel > 0) {
    //             this.mElemList["useLevel"].text = (String.format(Localize_cns("ITEM_USE_LEVEL"), uselevel))
    //         }
    //         this.mElemList["useItem"].text = (Localize_cns("USE"))
    //         this.showNormalItemInfo()
    //     }
    //     let heroLevel = GetHeroProperty("level") || 0
    //     if(uselevel > heroLevel ){
    //         this.mElemList["useLevel"].textColor = (gui.Color.red)
    //     }else{
    //         this.mElemList["useLevel"].textColor = (gui.Color.white)
    //     }
    // }
    // isNoMoreShow(entryId) {
    //     if (this.noMoreShowCache == null) {
    //         let todayNoNotifyStr = IGlobal.setting.getRoleSetting(UserSetting.TYPE_STRING, "recommendNoNotify", table_save({}))
    //         this.noMoreShowCache = table_load(todayNoNotifyStr)
    //     }
    //     if( size_t(this.noMoreShowCache) > 40){
    //         this.noMoreShowCache = {}
    //     }
    //     let recordTime = this.noMoreShowCache[entryId]// = GetServerTime()
    //     if (recordTime == null) {
    //         return false
    //     }
    //     if (recordTime != null) {
    //         let serverTime = GetServerTime()
    //         let curDate = GetServerDate(serverTime)
    //         let recordDate = GetServerDate(recordTime)
    //         //在同一天,不用提示,直接回调
    //         if (curDate.day == recordDate.day) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    // checkNoMoreShow() {
    //     let todayNoTips = this.mElemList["gouXuan"].selected
    //     if (todayNoTips) {
    //         if (this.noMoreShowCache == null) {
    //             let todayNoNotifyStr = IGlobal.setting.getRoleSetting(UserSetting.TYPE_STRING, "recommendNoNotify", table_save({}))
    //             this.noMoreShowCache = table_load(todayNoNotifyStr)
    //         }
    //          if( size_t(this.noMoreShowCache) > 40){
    //             this.noMoreShowCache = {}
    //         }
    //         this.noMoreShowCache[this.logicItem.entryId] = GetServerTime()
    //         IGlobal.setting.setRoleSetting(UserSetting.TYPE_STRING, "recommendNoNotify", table_save(this.noMoreShowCache))
    //     }
    // }
    // refreshCheckBox() {
    //     // if (this.mElemList["gouXuan"].selected == true ){
    //     //     this.mElemList["gouXuan_tick"].visible = (true)
    //     //     this.mElemList["gouXuan"].source = ("ty_tipsXuanZhe01")
    //     // }else{
    //     //     this.mElemList["gouXuan_tick"].visible = (false)
    //     //     this.mElemList["gouXuan"].source = ("ty_tipsXuanZhe02")
    //     // }
    // }
    // onClickCheckBox(args) {
    //     return this.refreshCheckBox()
    // }
    // showEquipInfo() {
    //     //职业要求
    //     let logicItem = this.logicItem
    //     let vocationTypeList = logicItem.getRefProperty("heroId")
    //     let vocationStrList = []
    //     for (let _ = 0; _ < vocationTypeList.length; _++) {
    //         let v = vocationTypeList[_]
    //         let config = GameConfig.VocationTypeConfig[v]
    //         if (config == null) {
    //             JsUtil.arrayInstert(vocationStrList, v)
    //         } else {
    //             JsUtil.arrayInstert(vocationStrList, config.Name)
    //         }
    //     }
    //     let content = table_concat(vocationStrList, ",")
    //     this.mElemList["vocation"].text = (content)
    //     let h = 0
    //     //基础属性
    //     let info = logicItem.getFixedValueInfo()
    //     for (let i = 1; i <= 2; i++) {
    //         let str = info.fixedValueStrList[i - 1]
    //         if (str) {
    //             this.mElemList["basePro" + i].text = (str)
    //             //lastH = h + 20
    //         } else {
    //             this.mElemList["basePro" + i].text = ("")
    //         }
    //     }
    //     //let y = 20 + h
    //     //let strList = logicItem.getSpecialSkillInfo()
    //     //let str = strList[1]
    //     //if(str ){
    //     //	this.mElemList["specialSkillTitle"].visible = (true)
    //     //	this.mElemList["specialSkill"].visible = (true)
    //     //	this.mElemList["specialSkill"].text = (str)
    //     //	
    //     //	this.mElemList["specialSkillTitle"]:SetXY(0, y)
    //     //	this.mElemList["specialSkill"]:SetXY(this.mElemList["specialSkill"]:GetX(), y)
    //     //}else{
    //     this.mElemList["specialSkillTitle"].visible = (false)
    //     this.mElemList["specialSkill"].visible = (false)
    //     //}
    // }
    // showNormalItemInfo() {
    //     let logicItem = this.logicItem
    //     AddRdContent(this.mElemList["itemDesRd"], logicItem.getRefProperty("description"), "ht_18_lc_stroke", "white")
    //     if (logicItem.getRefProperty("uselevel") > 0) {
    //         this.mElemList["useLevel"].text = (String.format(Localize_cns("ITEM_USE_LEVEL"), logicItem.getRefProperty("uselevel")))
    //     } else {
    //         this.mElemList["useLevel"].text = ("")
    //     }
    // }
    // getSortActorList() {
    //     let sortList = []
    //     let campOnList = []
    //     let campOffList = []
    //     let arrayList = CampaignSystem.getInstance().getCampaignArray(BattleQueueType.Campaign)
    //     for (let _ = 0; _ < arrayList.length; _++) {
    //         let v = arrayList[_]
    //         let entryId = v[0]
    //         let state = v[2]
    //         if (entryId > 0) {
    //             if (GameConfig.ProfessionConfig[entryId]) {					//hero
    //             } else {
    //                 //非雇佣
    //                 if (bit.band(state, petState.EMPLOYNO) == petState.EMPLOYNO) {
    //                     let petInfo = PetSystem.getInstance().getPetInfoEntry(entryId)
    //                     if (petInfo) {
    //                         JsUtil.arrayInstert(campOnList, petInfo) //正在上阵的伙伴
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     let allPetList = PetSystem.getInstance().getPetInfoList()
    //     for (let _ in allPetList) {
    //         let petInfo = allPetList[_]
    //         if (table_isExsit(campOnList, petInfo) == false) {
    //             JsUtil.arrayInstert(campOffList, petInfo) //没有上阵的伙伴
    //         }
    //     }
    //     //检查顺序：主角->上阵伙伴->没上阵伙伴
    //     JsUtil.arrayInstert(sortList, GetHeroPropertyInfo())
    //     table_merge(sortList, campOnList)
    //     table_merge(sortList, campOffList)
    //     return sortList
    // }
    // ////////////////////////////////////////////////////////////////////////////////-
    // //装备推荐
    // checkRecommendEquip(curInfo) {
    //     let newEquipList = this.newEquipList
    //     if (newEquipList.length <= 0) {
    //         return null
    //     }
    //     let isHero = IsHeroInfo(curInfo)
    //     let level = curInfo.level
    //     let vocationType = -1
    //     if (isHero) {
    //         vocationType = ProfessionSystem.getInstance().getProfessionType(curInfo.vocation)//主角
    //     } else {
    //         vocationType = PetSystem.getInstance().getProfessionType(curInfo.entry)//伙伴
    //     }
    //     //筛选出伙伴或者主角的职业或者等级
    //     let fitEquipList = []
    //     for (let i in newEquipList) {
    //         let item = newEquipList[i]
    //         //先按职业，再按等级
    //         let vocationTypeList = item.getRefProperty("heroId")
    //         let uselevel = item.getRefProperty("uselevel")
    //         if (table_isExsit(vocationTypeList, vocationType)) {
    //             if (uselevel <= level || item.isUseLevelIgnore() == true) {
    //                 JsUtil.arrayInstert(fitEquipList, item)
    //             }
    //         }
    //     }
    //     if (fitEquipList.length == 0) {
    //         return null
    //     }
    //     let fitEquip = fitEquipList[0]
    //     let itemType = fitEquip.getRefProperty("type")
    //     //当前部位的装备
    //     let curEquip = GetActorEquipByType(curInfo, itemType)
    //     //1.当前装完没有装备
    //     if (curEquip == null) {
    //         return fitEquip
    //     }
    //     //2.推荐装备比当前装备使用等级高
    //     let curUseLevel = curEquip.getRefProperty("level")
    //     let fitUseLevel = fitEquip.getRefProperty("level")
    //     if (fitUseLevel > curUseLevel) { //比较使用等级
    //         return fitEquip
    //     }
    //     return null
    // }
    // ////////////////////////////////////////////////////////////////////////////////-
    // //检查身上装备强化
    // checkEquipEnhance(actorInfo) {
    //     let [enable, tips] = CheckMainFrameFunction("qianghua")
    //     if (enable == false) {
    //         return
    //     }
    //     //初始化所有的强化需要的材料
    //     if (this.enhanceItemRef == null) {
    //         this.enhanceItemRef = {}
    //         for (let level in GameConfig.EquipEnhance) {
    //             let enhanceRef = GameConfig.EquipEnhance[level]
    //             let materialInfo = enhanceRef.materialList
    //             for (let _ in materialInfo) {
    //                 let v = materialInfo[_]
    //                 let entryId = v[0]
    //                 this.enhanceItemRef[entryId] = true
    //             }
    //         }
    //     }
    //     let bHandle = false
    //     for (let _ in this.newItemList) {
    //         let item = this.newItemList[_]
    //         if (this.enhanceItemRef[item.entryId]) {
    //             bHandle = true
    //             break
    //         }
    //     }
    //     //新物品没找到强化石
    //     if (bHandle == false) {
    //         return
    //     }
    //     let needItemEntry = -1
    //     let curCash = GetHeroProperty("funds") || 0
    //     let enhanceEquip: Item = null;
    //     for (let i = 1; i <= 6; i++) {
    //         //当前装备
    //         let curEquip = GetActorEquipByPos(actorInfo, i)
    //         if (curEquip) {
    //             let enhanceLevel = curEquip.getProperty("enhance_level") || 0
    //             if (enhanceLevel < opPetEquipConfig.MaxEnhanceLevel) {
    //                 let enhanceRef = GameConfig.EquipEnhance[enhanceLevel]
    //                 let materialInfo = enhanceRef.materialList
    //                 if (curCash < enhanceRef.needFunds) {
    //                     needItemEntry = -1
    //                     break
    //                 }
    //                 //检查材料个数
    //                 let bResult = true
    //                 for (let _ in materialInfo) {
    //                     let v = materialInfo[_]
    //                     let entryId = v[0]
    //                     let count = v[1]
    //                     needItemEntry = entryId
    //                     if (ItemSystem.getInstance().getItemCount(entryId) < count) {
    //                         bResult = false
    //                         break
    //                     }
    //                 }
    //                 //材料足够，跳出循环
    //                 if (bResult) {
    //                     enhanceEquip = curEquip;
    //                     break
    //                 } else {
    //                     needItemEntry = -1
    //                 }
    //             }
    //         }
    //     }
    //     if (enhanceEquip && needItemEntry != -1) {
    //         let itemRef = ItemSystem.getInstance().getItemTemplateInfo(needItemEntry)
    //         if (itemRef == null) {
    //             return
    //         }
    //         let lastTime = this.itemTimeCache[needItemEntry]
    //         let during = itemRef.tipsTime
    //         let nowTime = GetServerTime()
    //         if (lastTime && nowTime - lastTime < during) {
    //             return null
    //         }
    //         let itemList = ItemSystem.getInstance().getItemLogicInfoByEntry(needItemEntry)
    //         this.userData = enhanceEquip.getRefProperty("type")
    //         return itemList[0]
    //     }
    //     return null
    // }
    // //装备晋升
    // // checkEquipPromote(actorInfo) {
    // //     let equipPosTypeInfo = GetActorEquipPosTypeInfo()
    // //     let promoteItemRef = null
    // //     let promoteEquip = null
    // //     for (let pos in equipPosTypeInfo) {
    // //         let type = equipPosTypeInfo[pos]
    // //         let curEquip = GetActorEquipByType(actorInfo, type)
    // //         if (curEquip) {//身上穿戴的，可晋升的
    // //             let itemRef = GuideFuncSystem.getInstance().getRecommandEquipRef(actorInfo, type, true)
    // //             if (itemRef && ItemSystem.getInstance().isEquipPromoteType(itemRef.ItemEntry)) {
    // //                 promoteItemRef = itemRef
    // //                 promoteEquip = curEquip
    // //                 break
    // //             }
    // //         }
    // //     }
    // //     //TLog.Debug("ItemRecommendFrame.checkEquipPromote", promoteItemRef)
    // //     if (promoteItemRef) {
    // //         let makeInfo = GameConfig.EquipmakeConfig[promoteItemRef.ItemEntry] //找到配方
    // //         TLog.Assert(makeInfo != null)
    // //         this.userData = [makeInfo, promoteEquip ] //配方
    // //         let needItemEntry = makeInfo.material[0][0]
    // //         let itemList = ItemSystem.getInstance().getItemLogicInfoByEntry(needItemEntry)
    // //         return itemList[0]
    // //     }
    // //     return null
    // // }
    // //御灵
    // // checkYuLing(actorInfo) {
    // //     let [enable, tips] = CheckMainFrameFunction("yuling")
    // //     if (enable == false) {
    // //         return null
    // //     }
    // //     let needMaterial = ItemSystem.getInstance().getNextSkillNeedMaterial()
    // //     if (needMaterial == null) {
    // //         return null
    // //     }
    // //     //检查是否新获得的物品满足御灵升级
    // //     let handleItem = null
    // //     for (let _ in this.newItemList) {
    // //         let item = this.newItemList[_]
    // //         for (let _ = 0; _ < needMaterial.length; _++) {
    // //             let v = needMaterial[_]
    // //             let entryId = v[0]
    // //             let count = v[1]
    // //             if (item.entryId == entryId) {
    // //                 handleItem = item
    // //                 break
    // //             }
    // //         }
    // //         if (handleItem) {
    // //             break;
    // //         }
    // //     }
    // //     if (handleItem) {
    // //         let allEnough = true
    // //         for (let _ = 0; _ < needMaterial.length; _++) {
    // //             let v = needMaterial[_]
    // //             let entryId = v[0]
    // //             let count = v[1]
    // //             if (ItemSystem.getInstance().getItemCount(entryId) < count) {
    // //                 allEnough = false
    // //                 break;
    // //             }
    // //         }
    // //         if (allEnough) {
    // //             return handleItem
    // //         }
    // //     }
    // //     return null
    // // }
    // // checkShouhu(actorInfo) {
    // //     let [enable, tips] = CheckMainFrameFunction("shouhu")
    // //     if (enable == false) {
    // //         return null
    // //     }
    // //     let defendInfo = DefendSystem.getInstance().getDefendInfo()
    // //     if (defendInfo == null) {
    // //         return null
    // //     }
    // //     if (defendInfo.level >= opWingConfig.MaxLevel) {
    // //         return null
    // //     }
    // //     let expInfo = GameConfig.DefendExpConfig[defendInfo.level]
    // //     if (expInfo == null) {
    // //         return
    // //     }
    // //     let elem = expInfo.material[0]
    // //     let entryId = elem[0]
    // //     let count = elem[1]
    // //     let handleItem = null
    // //     for (let _ in this.newItemList) {
    // //         let item = this.newItemList[_]
    // //         if (item.entryId == entryId) {
    // //             handleItem = item
    // //             break;
    // //         }
    // //     }
    // //     if (handleItem) {
    // //         if (ItemSystem.getInstance().getItemCount(entryId) >= count) {
    // //             return handleItem
    // //         }
    // //     }
    // //     return null
    // // }
    // ////////////////////////////////////////////////////////////////////////////////-
    // //物品推荐
    // checkRecommendNewItem(newItemList) {
    //     if (this.recommendConfigList == null) {
    //         this.recommendConfigList = {}
    //         for (let entryId in GameConfig.itemConfig) {
    //             let v = GameConfig.itemConfig[entryId]
    //             let tipsCount = v.tipsCount || 0
    //             let tipsTime = v.tipsTime || 0
    //             if (tipsCount > 0) {
    //                 //JsUtil.arrayInstert(this.recommendConfigList, v)
    //                 this.recommendConfigList[entryId] = true
    //             }
    //         }
    //     }
    //     let nowTime = GetServerTime()
    //     let targetEntryId = -1
    //     for (let _ = 0; _ < newItemList.length; _++) {
    //         let item = newItemList[_]
    //         let itemRef = item.getRefPropertyInfo()
    //         let entryId = item.entryId
    //         if (this.recommendConfigList[entryId]) {
    //             //提示的间隔
    //             let lastTime = this.itemTimeCache[entryId]
    //             let during = itemRef.tipsTime
    //             if (lastTime == null || nowTime - lastTime > during) {
    //                 let count = ItemSystem.getInstance().getItemCount(entryId)
    //                 if (count >= itemRef.tipsCount) {
    //                     targetEntryId = entryId
    //                     break
    //                 }
    //             }
    //         }
    //     }
    //     if (targetEntryId > 0) {
    //         let itemList = ItemSystem.getInstance().getItemLogicInfoByEntry(targetEntryId)
    //         this.showWithItem(itemList[0])
    //     }
    // }
    // getNewEquipList(newItemList) {
    //     let newEquipList = []
    //     for (let i in newItemList) {
    //         let item = newItemList[i]
    //         if (item.isEquip() && item.getOwnerId() < 0) {
    //             JsUtil.arrayInstert(newEquipList, item)
    //         }
    //     }
    //     if (newEquipList.length > 1) {
    //         table_sort(newEquipList, function (a, b) {
    //             let aLevel = a.getRefProperty("level")
    //             let bLevel = b.getRefProperty("level")
    //             return bLevel - aLevel
    //         })
    //     }
    //     return newEquipList
    // }
    // getNewItemList() {
    //     let itemList = ItemSystem.getInstance().getItemList()
    //     let nowTime = GetServerTime()
    //     let time = 30 //秒单位
    //     let removeItemList: any = {}
    //     let newItemList = []
    //     for (let itemId in this.newItemCache) {
    //         let info = this.newItemCache[itemId]
    //         let item = itemList[itemId]
    //         let lastTime = info[1]
    //         if (item != null) {
    //             if (this.isNoMoreShow(item.entryId) == false) {
    //                 if (lastTime > 0 && nowTime - lastTime < time && this.alreadyShowItemCache[itemId] == null) {
    //                     JsUtil.arrayInstert(newItemList, item)
    //                 }
    //             }
    //         } else {
    //             removeItemList[itemId] = true
    //         }
    //     }
    //     for (let itemId in removeItemList) {
    //         delete this.newItemCache[itemId]
    //     }
    //     return newItemList
    // }
    // updateItemCache() {
    //     let logining = false
    //     let nowMillTime = GetCurMillSec()//登陆过程不检查
    //     if (this.lastEnterGameTime == -1 || nowMillTime - this.lastEnterGameTime < 10000) {
    //         logining = true
    //     }
    //     let itemList = ItemSystem.getInstance().getItemList()
    //     let nowTime = GetServerTime()
    //     for (let itemId in itemList) {
    //         let item = itemList[itemId]
    //         let count = item.getProperty("count")
    //         if (this.newItemCache[itemId] == null) {
    //             let time = nowTime
    //             if (logining) {
    //                 time = -1
    //             }
    //             this.newItemCache[itemId] = [count, time]
    //         }
    //         let info = this.newItemCache[itemId]
    //         if (count > info[0]) {
    //             this.newItemCache[itemId] = [count, nowTime]
    //             delete this.alreadyShowItemCache[itemId] //重新推荐
    //         } else if (count < info[0]) {
    //             info[0] = count;
    //         }
    //     }
    //     return !logining
    // }
    // onCheckRecommendEvent(args) {
    //     if(this.logicItem){
    //         let logicItem = ItemSystem.getInstance().getItemLogicInfoByID(this.logicItem.id)
    //         if(logicItem == null){
    //             this.hideWnd()
    //         }
    //     }
    //     if (this.checkTimer == null) {
    //         let callback = function (dt) {
    //             KillTimer(this.checkTimer)
    //             this.checkTimer = null
    //             //TLog.Debug("onCheckRecommendEvent======================", this.isNeedCheck)
    //             if (this.isNeedCheck) {
    //                 this.isNeedCheck = false
    //                 this.checkRecommendEvent()
    //             }
    //         }
    //         this.checkTimer = SetTimer(callback, this, 1000)
    //         this.checkRecommendEvent()
    //     } else {
    //         this.isNeedCheck = true
    //     }
    // }
    // checkRecommendEvent(args?) {
    //     let heroInfo = GetHeroPropertyInfo()
    //     if (heroInfo == null) {
    //         return
    //     }
    //     if (this.updateItemCache() == false) {
    //         return
    //     }
    //     if (this.showState == false) {
    //         return
    //     }
    //     //前三关不弹
    //     // if (CampaignSystem.getInstance().isCampaignPass(1003) == false) {
    //     //     return
    //     // }
    //     if (this.isVisible() == true) {
    //         return
    //     }
    //     TLog.Assert(this.logicItem == null)
    //     let equipActorInfo = null
    //     let equipItem = null
    //     this.newItemList = this.getNewItemList() //所有的新物品
    //     //TLog.Debug("...............this.newItemList.length", this.newItemList.length)
    //     if (this.newItemList.length == 0) {
    //         return
    //     }
    //     this.newEquipList = this.getNewEquipList(this.newItemList)//新装备
    //     this.userData = null
    //     let sortActorList = this.getSortActorList()//排序的角色
    //     //TLog.Debug("ItemRecommendFrame.checkRecommendEquip count:", this.newEquipList.length)
    //     //let funclist = ["checkRecommendEquip", "checkEquipEnhance", "checkEquipPromote", "checkYuLing", "checkShouhu"]
    //     let funclist = ["checkRecommendEquip", ]
    //     for (let _ = 0; _ < sortActorList.length; _++) {
    //         let actorInfo = sortActorList[_]
    //         //按函数优先级检查
    //         for (let _ = 0; _ < funclist.length; _++) {
    //             let funcname = funclist[_]
    //             //先检查新装备
    //             let checkfunc = this[funcname]
    //             let item = checkfunc.call(this, actorInfo)
    //             if (item && this.isNoMoreShow(item.entryId) == false) {
    //                 equipItem = item
    //                 equipActorInfo = actorInfo
    //                 break
    //             }
    //         }
    //         if (equipItem) {
    //             break
    //         }
    //     }
    //     this.newEquipList = null
    //     if (equipItem) {
    //         this.showWithItem(equipItem, equipActorInfo)
    //         return
    //     }
    //     //检查使用的物品
    //     this.checkRecommendNewItem(this.newItemList)
    // }
    // onHeroEnterGame(args) {
    //     this.lastEnterGameTime = GetCurMillSec()
    //     CampaignSystem.getInstance().getCampaignArray(BattleQueueType.Campaign)
    // }
    // useTipsItem(logicItem) {
    //     let lastWndName = null
    //     let action = logicItem.getRefProperty("tipsAction")
    //     if (action == "enhance") {
    //         let curInfo = this.heroPetInfo
    //         if (curInfo == null) {
    //             return null
    //         }
    //         //TLog.Assert(curInfo != null)
    //         let isHero = IsHeroInfo(this.heroPetInfo)
    //         let entryId = 0
    //         if (isHero == false) {
    //             entryId = curInfo.entry
    //         }
    //         let wnd = WngMrg.getInstance().getWindow("EquipFactoryFrame")
    //         //let curIndex = ProfessionSystem.getInstance().getCurActorIndexWithEntry(entryId)
    //         wnd.showWithActorEntry(entryId, 0, this.userData)
    //         this.lastWndName = "EquipFactoryFrame"
    //     } else if (action == "yuling") {
    //         let [enable, tips] = CheckMainFrameFunction("yuling")
    //         if (enable == false) {
    //             MsgSystem.addTagTips(tips)
    //         } else {
    //             WngMrg.getInstance().showWindow("SacrificeFrame")
    //             this.lastWndName = "SacrificeFrame"
    //         }
    //     } else if (action == "defend" || action == "defendAngel" || action == "defendSkill") {
    //         //检查是否开启			
    //         let [enable, tips] = CheckMainFrameFunction("shouhu")
    //         if (enable == false) {
    //             MsgSystem.addTagTips(tips)
    //         } else {
    //             if (action == "defend") {
    //                 WngMrg.getInstance().showWindow("DefendFrame")
    //                 this.lastWndName = "DefendFrame"
    //             } else if (action == "defendAngel") {
    //                 WngMrg.getInstance().showWindow("DefendAngleWingFrame")
    //                 this.lastWndName = "DefendAngleWingFrame"
    //             } else {
    //                 WngMrg.getInstance().showWindow("DefendSkillEmbedFrame")
    //                 this.lastWndName = "DefendSkillEmbedFrame"
    //             }
    //         }
    //     } else if (action == "promote") {
    //         let makeInfo = this.userData[0]
    //         let curEquip = this.userData[1]
    //         let wnd = WngMrg.getInstance().getWindow("EquipMakeFrame")
    //         wnd.showWithMakeInfo(makeInfo, curEquip)
    //     } else {
    //         UseItem(logicItem, 1, true)
    //     }
    //     return lastWndName
    // }
    // onClickUseItem(args) {
    //     let logicItem = this.logicItem
    //     let lastWndName = null
    //     if (logicItem.isEquip()) {
    //         let id = 0
    //         let actorType = 0
    //         let curInfo = this.heroPetInfo
    //         if (IsHeroInfo(curInfo)) {
    //             actorType = objectType.OBJECT_TYPE_VACATIONER
    //             id = GetHeroProperty("id")
    //         } else {
    //             id = curInfo.id
    //             actorType = objectType.OBJECT_TYPE_PET
    //         }
    //         //最新装备
    //         let message = GetMessage(opCodes.C2G_SET_EQUIP)
    //         message.actorType = actorType
    //         message.actorId = id
    //         message.itemId = logicItem.getId()
    //         SendGameMessage(message)
    //     } else {
    //         if (logicItem.getRefProperty("batch") == 1) {
    //             if (logicItem.getProperty("count") < 10) {
    //                 UseItem(logicItem, logicItem.getProperty("count"))
    //             } else {
    //                 let wnd = WngMrg.getInstance().getWindow("ItemBatchUseFrame")
    //                 wnd.showWithItemInfo(logicItem)
    //                 lastWndName = "ItemBatchUseFrame"
    //             }
    //         } else {
    //             lastWndName = this.useTipsItem(logicItem)
    //         }
    //     }
    //     this.lastWndName = lastWndName
    //     this.hideWnd()
    //     //this.onCheckRecommendEvent()
    // }
    // onUIHideEvent(args) {
    //     if (this.lastWndName == null) {
    //         return
    //     }
    //     //自身是关闭状态，才会监听
    //     if (this.isVisible()) {
    //         return
    //     }
    //     if (this.lastWndName == args.window.classname) {
    //         //再检查一次
    //         this.lastWndName = null
    //         this.checkRecommendEvent()
    //     }
    // }
    // setShowState(state) {
    //     if (this.showState == state) {
    //         return
    //     }
    //     this.showState = state
    //     if (this.showState == false) {
    //         this.hideWnd()
    //         return
    //     }
    // }
    // onStateActive(args) {
    //     let curState = StateManager.getInstance().GetCurrentStateType()
    //     if (curState == state_type.LIVE_BASE_STATE || curState == state_type.LIVE_ACTIVITY_MSG_STATE) { 	 //生活场景
    //         this.setShowState(true)
    //     } else {
    //         this.setShowState(false)
    //     }
    // }
    ////////////////////////////////////////////////////////////////////////////////-
    //公共接口
    ItemRecommendFrame.prototype.showWithItem = function (item, heroPetInfo) {
        if (this.isVisible()) {
            return;
        }
        this.logicItem = item;
        this.heroPetInfo = heroPetInfo;
        this.showWnd();
    };
    return ItemRecommendFrame;
}(BaseWnd));
__reflect(ItemRecommendFrame.prototype, "ItemRecommendFrame");
//# sourceMappingURL=ItemRecommendFrame.js.map