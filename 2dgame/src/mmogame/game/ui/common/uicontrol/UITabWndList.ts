// TypeScript file

class UITabWndList extends TClass {

    mLayoutNode: gui.LayoutNode;
    mElemList: any;
    tabName: string;
    subWndList: any[];

    selectedCallback:Function;
    selectedCallbackObj:any;

    public initObj(...args: any[]): void {
        this.mLayoutNode = args[0]
        this.mElemList = args[1]
        this.subWndList = args[2]  // {name:tabName, wnd:wnd}
        TLog.Assert(Array.isArray(this.subWndList))

        let radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup;
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onTabSelected, this);

        for (let v of this.subWndList) {
            //TLog.Assert(v.wnd != null)

            let radioBtn = <eui.RadioButton>this.mElemList[v.name]
            radioBtn.group = radioGroup;
            radioBtn.value = v.name;
        }

        this.tabName = this.subWndList[0].name
        this.mElemList[this.tabName].selected = true
    }

    destory() {

    }


    private _getWndWithName(index: string) {
        for (let v of this.subWndList) {
            if (v.name == index) {
                return v.wnd
            }
        }

        return null;
    }

    private _getSubWithName(index: string) {
        for (let v of this.subWndList) {
            if (v.name == index) {
                return v
            }
        }

        return null;
    }

    onTabSelected(event: egret.Event) {
        var radioGroup: eui.RadioButtonGroup = event.target;
        let radiobtn = radioGroup.selection

        let name = radiobtn.name
        let [enable, tips] = CheckMainFrameFunction(name)
        if (!enable) {
            MsgSystem.addTagTips(tips)
            return
        }

        let subInfo = this._getSubWithName(name)
        if (subInfo.check) {
            if (subInfo.check.call(subInfo.obj)) {
                this.changeTab(radiobtn.value)
            } else {
                this.changeTab(this.tabName)
            }
        } else {
            this.changeTab(radiobtn.value)
        }

        if(this.selectedCallbackObj){
            this.selectedCallback.call(this.selectedCallbackObj, event)
        }
        
    }

    setSelectedCallback(callback:Function, obj:any) {
        this.selectedCallback = callback
        this.selectedCallbackObj = obj
    }


    ////////////////////公共接口///////////////////////////////

    setTabVisible(numbIndex: number, b: boolean) {

        let info = this.subWndList[numbIndex]
        if (info) {
            let radioBtn: eui.RadioButton = this.mElemList[info.name]
            UiUtil.setVisible(radioBtn, b, b)
        }
    }

    setWndVisible(b: boolean) {
        let wnd = this._getWndWithName(this.tabName);
        if (wnd) {
            if (b) {
                this.mElemList[this.tabName].selected = true
                wnd.showWnd()
            } else {
                wnd.hideWnd();
            }
        }
    }

    //radiobtn传入控件名
    changeTab(index: string) {
        if (index == this.tabName && this.mElemList[this.tabName]) {
            this.mElemList[this.tabName].selected = true
            return;
        } else if (index == this.tabName || this.mElemList[this.tabName] == null) {
            return;
        }

        let wnd = this._getWndWithName(this.tabName);
        this.mElemList[this.tabName].selected = false
        if (wnd) {
            wnd.hideWnd();
        }

        this.tabName = index;
        this.mElemList[this.tabName].selected = true
        wnd = this._getWndWithName(this.tabName)
        if (wnd) {
            wnd.showWnd();
        }
    }


    //数字索引，以0开头
    changeTabWithIndex(numbIndex: number) {
        if (numbIndex < 0) {
            return;
        }

        let info = this.subWndList[numbIndex]
        if (info) {
            this.changeTab(info.name)
        }
    }


    getTabIndex() {
        let index = -1;
        for (let i = 0; i < this.subWndList.length; i++) {
            let v = this.subWndList[i]
            if (v.name == this.tabName) {
                index = i
                break;
            }
        }
        return index;
    }

    getTabName() {
        return this.tabName;
    }

    getWndWithIndex(numbIndex: number) {
        if (numbIndex < 0) {
            return;
        }

        let info = this.subWndList[numbIndex]
        if (info) {
            return this._getWndWithName(info.name)
        }
        return null;
    }

    getCurrentWnd() {
        return this._getWndWithName(this.tabName)
    }



}