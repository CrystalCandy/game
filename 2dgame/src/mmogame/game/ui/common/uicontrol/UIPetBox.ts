/*
作者:
    yangguiming
	
创建时间：
   2017.02.16(周四)

意图：
   物品框通用控件
   
公共接口：
   
*/

class UIPetBox extends TClass {

    mParentNode: eui.Component;
    name: string;

    rootWnd: any;
    mElemList: any;

    entryId: number;
    starLv: number;

    bEnable: boolean;
    bClickEnable: boolean;

    petTipsFunc: Function;
    petTipsObj: any;
    userData: any;

    statePos: number; //出战 备战

    sexId:number;
    roleId:number;

    public initObj(...args: any[]): void {
        this.mParentNode = args[0]
        this.name = args[1]
        let x = args[2]
        let y = args[3]

        let parentWnd = args[4]
        let scale = 1
        if (args[5] != null) {
            scale = args[5]
        }

        this.rootWnd = null
        let w = 80 * scale
        let h = 80 * scale
        this.mElemList = {}

        let itemBoxName = this.name;

        let mElemInfo: any = [
            { ["index_type"]: eui.Group, ["name"]: this.name, ["x"]: x, ["y"]: y, ["w"]: w, ["h"]: h, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onOpenTips },


            { ["index_type"]: eui.Image, ["name"]: this.name + "rolebg", ["parent"]: this.name, ["image"]: "ty_renWuKuang01", ["x"]: 0, ["y"]: 0, ["w"]: 140 * scale, ["h"]: 140 * scale,  ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
            { ["index_type"]: eui.Image, ["name"]: this.name + "roleicon", ["parent"]: this.name + "rolebg", ["image"]: "zctx_90001", ["x"]: 0, ["y"]: 0, ["w"]: 140 * scale, ["h"]: 140*scale,  ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },

            { ["index_type"]: eui.Image, ["name"]: this.name + "iconbg", ["parent"]: this.name, ["image"]: "ty_zhuangBeiBg01", ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
            { ["index_type"]: eui.Image, ["name"]: this.name + "icon", ["parent"]: this.name, ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["messageFlag"]: true },
            { ["index_type"]: eui.Image, ["name"]: this.name + "select", ["parent"]: this.name + "iconbg", ["image"]: "ty_xuanZhongKuang01", ["x"]: -16 * scale, ["y"]: -16 * scale, ["w"]: 113 * scale, ["h"]: 113 * scale, ["messageFlag"]: true },
            { ["index_type"]: eui.Image, ["name"]: this.name + "statepos", ["parent"]: this.name + "iconbg", ["image"]: "ty_text03", ["x"]: 2, ["y"]: 2, ["w"]: 46 * scale, ["h"]: 26 * scale, ["messageFlag"]: true },
            //神宠
            { ["index_type"]: eui.Image, ["name"]: this.name + "god", ["parent"]: this.name + "iconbg", ["image"]: "ty_shenIcon01", ["x"]: 49 * scale, ["y"]: 2, ["w"]: 29 * scale, ["h"]: 28 * scale, ["messageFlag"]: true },
            //仙侣
            { ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "star_rd", ["parent"]: this.name + "iconbg", ["x"]: 0, ["y"]: 60, ["w"]: 80, ["h"]: 26, ["messageFlag"]: true },
        ]
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd)

        this.rootWnd = this.mElemList[this.name]

        this.mElemList[this.name + "select"].visible = false
        this.mElemList[this.name + "statepos"].visible = false
        this.mElemList[this.name + "god"].visible = false
        this.mElemList[this.name + "star_rd"].visible = false
        this.mElemList[this.name + "star_rd"].setAlignFlag(gui.Flag.H_CENTER)

        this.bEnable = true
        this.bClickEnable = true
        this.entryId = null
        this.starLv = 0
    }

    clear() {
        this.select()
        this.mElemList[this.name + "god"].visible = false
        this.mElemList[this.name + "statepos"].visible = false
        this.mElemList[this.name + "star_rd"].visible = false
    }

    select(b?) {
        this.mElemList[this.name + "select"].visible = b
    }

    setVisible(b?) {
        this.rootWnd.visible = (b)
    }

    setEnable(b?) {
        this.bEnable = b

        //let bgIcon = this.mElemList[this.name + "iconbg"] //显示品质
        let icon = this.mElemList[this.name + "icon"] //显示图标
        //UiUtil.grayComponent(bgIcon, b)
        UiUtil.grayComponent(icon, !b)
    }

    setFightFlag() {
        this.mElemList[this.name + "statepos"].visible = true;
    }

    createElem(mElemInfo, mElemList, obj) {

        let list = mElemList;
        if (list == null) {
            list = this.mElemList;
        }
        UiUtil.createElem(mElemInfo, this.mParentNode, list, obj, this.rootWnd)
    }

    updateRoleInfo(vocation, sexId, plrId?){

        this.entryId = vocation
        this.sexId = checkNull(sexId, genderOptions.MALE) 
        this.roleId = plrId
        this._updateInfo()

       
    }

    updateByEntry(entryId, starLv?) {
        this.entryId = entryId
        this.starLv = starLv || -1

        this.sexId = null;

        this._updateInfo()
    }

    _updateInfo() {
        if(this.sexId != null){
            this._switchRoleIcon(true)
            this._updateRoleIconInfo()
            return
        }

        this._switchRoleIcon(false)
        if (this.entryId >= opPetRange.XianLv && this.entryId < opPetRange.Pet) {
            //仙侣
            this._updateXianLvIconInfo()
        } else {
            //宠物 
            this._updatePetIconInfo()
        }
    }

     _switchRoleIcon(visible:boolean) {
         this.mElemList[this.name + "rolebg"].visible = visible
         this.mElemList[this.name + "roleicon"].visible = visible

         this.mElemList[this.name + "iconbg"].visible = !visible
         this.mElemList[this.name + "icon"].visible = !visible
         
     }

     _updateRoleIconInfo() {
         let icon = GetProfessionIcon(this.entryId, this.sexId)
         this.mElemList[this.name + "roleicon"].source = icon
          
     }

    _updateXianLvIconInfo() {
        this.setEnable(this.bEnable)

        let fightList = XianLvSystem.getInstance().getFightList()

        let bgIcon = GetPetQualityIconIamge(this.entryId)
        let icon = GetXianlvIconImage(this.entryId)
        this.mElemList[this.name + "iconbg"].source = bgIcon
        this.mElemList[this.name + "icon"].source = icon

        if (this.starLv != -1) {
            let xingStr = ""
		    if(this.starLv >3){
			    xingStr += "#yellow" + this.starLv + "#STAR"
		    }else{
                for(let i = 0; i < this.starLv; i++){
			        xingStr += "#STAR"
		        }
            }
            this.mElemList[this.name + "star_rd"].visible = true
            AddRdContent(this.mElemList[this.name + "star_rd"], xingStr, "ht_20_cc_stroke")
               
        }    
    }

    _updatePetIconInfo() {
         let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.entryId)
         if(petConfigInfo == null)
            return;

        this.setEnable(this.bEnable)

       
        let petNetInfo = PetSystem.getInstance().getPetInfo(this.entryId)

        let bgIcon = GetPetQualityIconIamge(this.entryId)
        let icon = GetPetIconImage(this.entryId)
        let statePos = ""
        let isGod = (petConfigInfo.quality >= opPetQuality.gold)

        if (petNetInfo) {
            statePos = GetPetCombatPosIcon(petNetInfo.combatpos)
        }

        this.mElemList[this.name + "iconbg"].source = bgIcon
        this.mElemList[this.name + "icon"].source = icon

        this.mElemList[this.name + "statepos"].source = statePos
        this.mElemList[this.name + "statepos"].visible = true

        this.mElemList[this.name + "god"].visible = isGod
    }

    setClickListner(func, obj, userData?) {
        this.petTipsFunc = func
        this.petTipsObj = obj
        this.userData = userData
    }

    setClickEnable(b: boolean) {
        this.bClickEnable = b;
    }

    setStarVisible(b: boolean) {
       this.mElemList[this.name + "star_rd"].visible = b
    }

    ////////////////////////////////////////////////////////////////////////
    //物品提示
    onOpenTips(args: egret.TouchEvent) {
        if (!this.bClickEnable) {
            return
        }

        if(this.sexId != null)
            return;

        if (this.petTipsFunc) {
            //返回true，表示拦截不查看默认信息
            if (this.petTipsFunc.call(this.petTipsObj, this.entryId, this.userData, args)) {
                return
            }
        }

        TLog.Debug("UIPetBox.onOpenTips", this.entryId)

        PetSystem.getInstance().showPetTipsByEntry(this.entryId)
    }

    setXY(x, y) {
        this.rootWnd.x = x;
        this.rootWnd.y = y;
    }
}