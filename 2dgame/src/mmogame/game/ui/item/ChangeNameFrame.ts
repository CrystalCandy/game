class ChangeNameFrame extends BaseWnd {
    edit:eui.EditableText
    saveItemID:number;
    public initObj(...params: any[]) {

    }

    public onLoad(): void {
        let w = 500
        let h = 360

        UiUtil.setWH(this.mLayoutNode, w, h)
        this.setAlignCenter(true, true)

        let ElemInfo: any = [

            { ["index_type"]: gui.Grid9Image, ["name"]: "_bg", ["image"]: "zb_uiDaoJuDi01", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },

            { ["index_type"]: eui.Label, ["name"]: "tips1", ["title"]: Localize_cns("CHANGE_NAME_1"), ["font"]: "ht_28_cc_stroke", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 40, ["w"]: w, ["h"]: 30 },
            { ["index_type"]: gui.Grid9Image, ["name"]: "line", ["title"]: null, ["font"]: null, ["image"]: "cz_uiLine01", ["color"]: gui.Color.white, ["x"]: 75, ["y"]: 85, ["w"]: 350, ["h"]: 3, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: eui.Label, ["name"]: "tips2", ["title"]: Localize_cns("CHANGE_NAME_2"), ["font"]: "ht_28_cc_stroke", ["image"]: "", ["color"]: gui.Color.yellow, ["x"]: 0, ["y"]: 100, ["w"]: w, ["h"]: 30 },

            { ["index_type"]: gui.Grid9Image, ["name"]: "new_name_bg", ["title"]: "", ["font"]: "ht_28_lc_stroke_2_ublack", ["image"]: "ty_UIBg02", ["color"]: gui.Color.darksalmon, ["x"]: 75, ["y"]: 150, ["w"]: 350, ["h"]: 50, ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: eui.EditableText, ["name"]: "new_name", ["title"]: "", ["font"]: "ht_28_cc",  ["prompt"] : Localize_cns("CHANGE_NAME_3"),  ["color"]: gui.Color.white, ["x"]: 85, ["y"]: 160, ["w"]: 330, ["h"]: 30 },

            { ["index_type"]: gui.Button, ["name"]: "sure_btn", ["title"]: Localize_cns("CONFIRM_INFO"), ["font"]: "ht_24_cc_stroke_saddlebrown", ["image"]: "ty_tongYongBt01", ["color"]: gui.Color.white, ["x"]: (w - 162) / 2 + 15, ["y"]: 240, ["w"]: 162, ["h"]: 82, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSureBtn },

            { ["index_type"]: gui.Button, ["name"]: "btn_close_top", ["title"]: null, ["font"]: null, ["image"]: "ty_bt_back02", ["color"]: gui.Color.white, ["right"]: 0, ["top"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd, },
            { ["index_type"]: gui.Button, ["name"]: "btn_close", ["title"]: null, ["font"]: null, ["image"]: "ty_bt_back04", ["color"]: gui.Color.white, ["right"]: 0, ["bottom"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd, },
        ]
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this)

        this.edit = this.mElemList["new_name"]
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.ROLE_CHANGE_NAME, this.hideWnd, this)
        this.mLayoutNode.visible = true;
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.ROLE_CHANGE_NAME, this.hideWnd, this)
        this.mLayoutNode.visible = false;
    }


    onClickSureBtn(args) {

        let newName = this.edit.text;

        if (StringUtil.isEmpty(newName)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM1"))
            return
        }

        //不可使用标点符号，不可使用纯数字，不可使用敏感字
        //if(string.match(name, "[%p]+") != null ||
        if (StringUtil.isNumber(newName)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM2"))
            return
        }

        if (WordFilter.checkword(newName) == false) {//TODO:敏感字检测
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM4"))
            return false
        }

        if (newName.length > NAME_LENGTH_LIMIT) {
            MsgSystem.confirmDialog_YES(String.format(Localize_cns("LOGIN_NAME_CFM3"), NAME_LENGTH_LIMIT))
            return
        }

        if (this.saveItemID) {
            let message = GetMessage(opCodes.C2G_ROLE_CHANGE_NAME)
            message.itemID = this.saveItemID
            message.newName = newName
            SendGameMessage(message)
        }
        //
    }

    showWithItemId( itemID){
        this.saveItemID = itemID
        this.showWnd()
    }


}