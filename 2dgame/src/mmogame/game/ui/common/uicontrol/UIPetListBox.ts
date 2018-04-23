// TypeScript file
class UIPetListBox extends TClass {
    mParentNode: eui.Component;
    parentWnd: any;
    scroll: UIScrollList;
    mElemList: any;
    mCallbackFunc: Function;
    mCallbackObj: any;
    mCallbackData: any;
    petlist: any;
    select: number
    callbackIndex: any

    public initObj(...args: any[]): void {
        this.mParentNode = args[0]
        let name = args[1]
        let x = args[2]
        let y = args[3]
        let w = args[4]
        let h = args[5]

        this.parentWnd = args[6]

        this.mElemList = {}
        this.select = 0 //默认

        this.scroll = UIScrollList.newObj(this.mParentNode, "scroll" + name, x, y, w, h, this.parentWnd, UIScrollList.DIR_HORIZON)

        RegisterEvent(EventDefine.PET_UPDATE, this.setPetList, this)
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.setPetList, this)

    }

    _initItemWindow(window, k) {
        let name = window.name

        let ElemInfo = [
            { ["index_type"]: eui.Group, ["name"]: "group_" + name, ["x"]: 0, ["y"]: 0, ["w"]: 100, ["h"]: 150 },
            { ["index_type"]: eui.Group, ["name"]: "petwnd_" + name, ["x"]: 0, ["y"]: 0, ["w"]: 100, ["h"]: 150 },
            { ["index_type"]: gui.RichDisplayer, ["name"]: "nameRd_" + name, ["parent"]: "group_" + name, ["x"]: 0, ["y"]: 90, ["w"]: 100, ["h"]: 25, ["messageFlag"]: true },
            { ["index_type"]: eui.Label, ["name"]: "lv_" + name, ["parent"]: "group_" + name, ["title"]: "", ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.yellow, ["x"]: 0, ["y"]: 115, ["w"]: 100, ["h"]: 25, ["messageFlag"]: true },
        ]
        UiUtil.createElem(ElemInfo, this.mParentNode, this.mElemList, this, window)

        this.mElemList["petBox_" + name] = UIPetBox.newObj(this.mParentNode, "petBox_" + name, 0, 0, this.mElemList["petwnd_" + name])
        this.mElemList["petBox_" + name].setClickListner(this.onPetCallBack, this, k)
    }
    _refreshItemWindow(window, entry, index) {
        let name = window.name
        let data = PetSystem.getInstance().getPetEntryInfo(entry)
        let netData = PetSystem.getInstance().getPetInfo(entry)

        let petId = data.Id
        let petName = data.name
        let quality = data.quality

        //更新
        this.mElemList["petBox_" + name].updateByEntry(entry)

        if (this.select == index) {
            this.mElemList["petBox_" + name].select(true)
        }

        this.mElemList["nameRd_" + name].setAlignFlag(gui.Flag.H_CENTER)
        let color = GetQualityColorStr(quality)
        AddRdContent(this.mElemList["nameRd_" + name], petName, "ht_20_cc_stroke", color)

        this.mElemList["lv_" + name].text = ""

        //更新网络
        this.mElemList["petBox_" + name].setEnable(false)
        if (netData) {
            //激活
            this.mElemList["petBox_" + name].setEnable(true)

            let petLevel = netData.stage
            this.mElemList["lv_" + name].text = "Lv." + petLevel

            if (netData.name != null && netData.name != "") {
                petName = netData.name
                AddRdContent(this.mElemList["nameRd_" + name], petName, "ht_20_cc_stroke", color)
            }
        }
    }

    onPetCallBack(entryId, index) {
        if (this.select == index) return true;

        this.select = index

        let max = size_t(this.petlist)
        for (let i = 0; i < max; i++) {
            let window = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0)
            let name = window.name
            this.mElemList["petBox_" + name].select(false)
            if (this.select == i) {
                this.mElemList["petBox_" + name].select(true)
            }
        }

        if (this.mCallbackFunc && this.mCallbackObj) {
            this.mCallbackFunc.call(this.mCallbackObj, this.petlist[this.select])
        }

        return true
    }

    getSelectPetId() {
        return this.petlist[this.select]
    }

    /////////////////////////////////////////////////////////////////////////////
    setPetList() {
        this.petlist = []
        let list = []
        let activeList = PetSystem.getInstance().getPetActiveList()
        let tiredlist = PetSystem.getInstance().getPetTiredList()
        table_merge(list, activeList)
        table_merge(list, tiredlist)
        this.petlist = list

        for (let i in activeList) {
            let petId = activeList[i]
            let petInfo = PetSystem.getInstance().getPetInfo(petId)
            if (petInfo && (petInfo.combatpos == opPetCombatPos.Battle)) {
                this.select = tonumber(i)
            }
        }

        return this.updateBoxWithList()
    }

    //获取神宠
    setGodPetList() {
        this.petlist = []
        let list = PetSystem.getInstance().getPetGodList()
        this.petlist = list

        return this.updateBoxWithList()
    }

    updateBoxWithList() {
        this.scroll.clearItemList()
        //更新拥有
        let max = size_t(this.petlist)
        for (let i = 0; i < max; i++) {
            let v = this.petlist[i]
            let window = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0)
            this._initItemWindow(window, i)
            this._refreshItemWindow(window, v, i)
        }
        this.scroll.refreshScroll()
        this.scroll.restoreViewXY()

        return this.petlist[this.select]
    }

    setClickListner(func, obj) {
        this.mCallbackFunc = func
        this.mCallbackObj = obj
    }

    rightMove() {
        let elem = <eui.Scroller>this.scroll.scroller
        let moveDis = elem.viewport.scrollH
        let index = Math.floor(moveDis / 100)
        let limit = size_t(this.petlist)
        let moveTo = ((index + 6) > limit) ? (limit - 5) : (index + 5)
        this.scroll.moveToScrollIndex(moveTo, true)
    }

    leftMove() {
        let elem = <eui.Scroller>this.scroll.scroller
        let moveDis = elem.viewport.scrollH
        let index = Math.floor(moveDis / 80)
        let moveTo = (index - 5) < 0 ? 0 : (index - 5)
        this.scroll.moveToScrollIndex(moveTo, true)
    }

    refreshPetDotTips(wnd: BaseWnd, index) {
        this.callbackIndex = index
        for (let i in this.petlist) {
            let petId = this.petlist[i]

            let check = false
            if (index == 0) { //宠物升级
                check = GuideFuncSystem.getInstance().checkPetUpgradeWnd(petId)
            } else if (index == 1) { //宠物技能
                check = GuideFuncSystem.getInstance().checkPetSkillWnd(petId)
            }

            if (check) {
                let window = this.scroll.getItemWindow(tonumber(i), 100, 150, 0, 0, 0)
                wnd.createDotTipsUI(this.mElemList["petBox_" + window.name].rootWnd)
            }
        }
    }
}    
