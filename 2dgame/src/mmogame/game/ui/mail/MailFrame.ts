// TypeScript file
class MailFrame extends BaseWnd {

    mail: any;
    isGot: boolean;
    public initObj(...params: any[]) {
        this.mail = {}
        this.isGot = false
    }

    public onLoad(): void {

        UiUtil.setWH(this.mLayoutNode, 600, 540)
        this.setAlignCenter(true, true)

        let mElemInfo: any = [

            { ["index_type"]: gui.Grid9Image, ["name"]: "bg_", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi01", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi02", ["color"]: gui.Color.white, ["x"]: 30, ["y"]: 60, ["w"]: 540, ["h"]: 376, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: gui.RichDisplayer, ["name"]: "emailMsg", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 44, ["y"]: 70, ["w"]: 480, ["h"]: 200, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: gui.RichDisplayer, ["name"]: "prizePoint_rd", ["title"]: null, ["font"]: "ht_24_lc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 64, ["y"]: 260, ["w"]: 522, ["h"]: 60, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: gui.Button, ["name"]: "confirmBtn", ["title"]: Localize_cns("SURE"), ["font"]: "ht_24_cc_stroke_saddlebrown", ["image"]: "ty_tongYongBt1", ["color"]: gui.Color.white, ["x"]: 215, ["y"]: 432, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickConfirmBtn },
            { ["index_type"]: gui.Button, ["name"]: "close_btn_top", ["title"]: null,  ["image"]: "ty_bt_back02", ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["index_type"]: gui.Button, ["name"]: "close_btn", ["title"]: null,  ["image"]: "ty_bt_back04", ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)


        let itemW = 85
        let spaceX = 5
        let beginX = (600 - 5 * (itemW + spaceX) - spaceX) / 2
        for (let i = 1; i <= 5; i++) {
            let x = beginX + (i - 1) * (itemW + spaceX)
            let y = 300
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, x, y)
            //this.mElemList["itemBox"+i]:updateByEntry(30001)
            this.mElemList["itemBox" + i].setVisible(false)
        }



    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this)
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)

        this.mLayoutNode.visible = (true)
        this.isGot = false
        this.onRefresh()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this)
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false)
    }




    onRefresh() {
        let mail_list = MailSystem.getInstance().getMailList()
        for (let i in mail_list) {
            let v = mail_list[i]

            if (v["id"] == this.mail["id"]) {
                this.mail = v
                this.setContext()
                break
            }
        }
        if (this.isGot) {
            this.isGot = false
            this.hideWnd()
            // this.showAction.stop()
            // this.hideAction.run()
            return
        }
    }

    setContext() {
        let context = this.mail["context"] || ""
        AddRdContent(this.mElemList["emailMsg"], context, "ht_24_lc_stroke", "white")
        //TLog.Debug("=============================================item")
        //TLog.Debug_r(this.mail["item"])
        let itemCount = 0
        if (this.mail["item"] && size_t(this.mail["item"]) != 0) {

            let i = 1;
            for (let v of this.mail["item"]) {
                //TLog.Debug("=============================================item",v[0],v[1])
                this.mElemList["itemBox" + i].updateByEntry(v[0] || 30001, v[1] || 1)
                this.mElemList["itemBox" + i].setVisible(size_t(v) != 0)

                itemCount = itemCount + 1
                i = i + 1
            }
        }

        let pointCount = 0
        let str = null
        for (let _i in this.mail["momey"]) {
            let _v = this.mail["momey"][_i]

            if (type(_v) == "object") {
                let value = _v[1] || 0
                TLog.Assert(value >= 0)
                if (!str) {
                    str = GetMoneyIcon(_v[0]) + tostring(value)
                } else {
                    str = str + "#space" + GetMoneyIcon(_v[0]) + tostring(value)
                }

                pointCount = pointCount + 1
            }
        }
        AddRdContent(this.mElemList["prizePoint_rd"], str || "", "ht_30_lc_stroke", "white")

        if (itemCount > 0) {
            UiUtil.setXY(this.mElemList["prizePoint_rd"], 64, 260)
        } else {
            UiUtil.setXY(this.mElemList["prizePoint_rd"], 64, 340)
        }

        if (itemCount > 0 && pointCount > 0) {
            UiUtil.setWH(this.mElemList["emailMsg"], this.mElemList["emailMsg"].width, 200)
        } else {
            UiUtil.setWH(this.mElemList["emailMsg"], this.mElemList["emailMsg"].width, 260)
        }
    }


    onClickConfirmBtn() {
        if (this.mail["mail_type"] == opEmailType.NORMAL || this.mail["mail_type"] == opEmailType.SYSTEM_NOTICE) {
            this.isGot = true
            let message = GetMessage(opCodes.C2G_EMAIL_REMOVE)
            message.mailId = this.mail["id"]
            SendGameMessage(message)
            this.hideWnd()
            return
        }
        let message = GetMessage(opCodes.C2G_EMAIL_GET_ANNEX)
        message.id = this.mail["id"]
        SendGameMessage(message)
        this.isGot = true
    }

    //  onMouseDown(args: GameTouchEvent) {
        
    //     let target = args.touchEvent.target;
    //     let isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode])
    //     if(isExclude){
    //         this.hideWnd();
    //     }
    //  }

    showWithMailInfo(mail) {
        this.mail = mail
        this.showWnd()
    }
}