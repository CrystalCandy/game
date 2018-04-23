class ItemOneKeyResolveFrame extends BaseWnd {

    resolveTable: any[];
    resolveItemTable: any[];
    resolveItemPoint: any[];

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/ItemOneKeyResolveLayout.exml"]

        this.resolveTable = []
        this.resolveItemTable = []
        this.resolveItemPoint = []
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();

        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "resolveBtn", ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickResolve },
        ];

        let colorList = [gui.Color.white, gui.Color.lime, gui.Color.cyan, gui.Color.magenta, gui.Color.orange]
        for (let i = 0; i < 5; i++) {
            JsUtil.arrayInstert(elemInfo, { ["name"]: "text" + i, ["font"]: "ht_24_cc_stroke", ["color"]: colorList[i] })
            JsUtil.arrayInstert(elemInfo, { ["name"]: "check" + i, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCheck })

            this.mElemList["check" + i].selected = false
        }

        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.mElemList["reward_rd"].setAlignFlag(gui.Flag.H_CENTER)
        let str = String.format(Localize_cns("ITEM_RESOLVE_TXT21"), 0)
        AddRdContent(this.mElemList["reward_rd"], str, "ht_24_cc_stroke", "lime")

        AddRdContent(this.mElemList["tips_rd"], Localize_cns("ITEM_RESOLVE_TXT19") + "#br" + Localize_cns("ITEM_RESOLVE_TXT20"), "ht_22_cc", "navajowhite")
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;

        for (let i = 0; i < 5; i++) {
            this.mElemList["check" + i].selected = false
        }
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
    }

    //确定溶解
    onClickResolve(args) {
        let self = this
        var callback: IDialogCallback = {
            onDialogCallback(result: boolean, userData): void {
                if (result == true) {
                    let list = self.resolveTable
                    let message = GetMessage(opCodes.C2G_ITEM_EQUIP_SPLIT)
                    message.list = list
                    SendGameMessage(message)
                    self.hideWnd()
                }
            }
        }
        MsgSystem.confirmDialog(Localize_cns("ITEM_RESOLVE_TXT22"), callback, null)
    }

    onClickCheck(args) {
        let name = args.target.name
        this.updateResolveEquipInfo()
    }

    updateResolveEquipInfo() {
        let sum = 0
        this.resolveTable = []
        for (let i = 0; i < 5; i++) {
            if (this.mElemList["check" + i].selected) {
                for (let _ in this.resolveItemTable[i]) {
                    let v = this.resolveItemTable[i][_]

                    JsUtil.arrayInstert(this.resolveTable, v)
                    sum = sum + this.resolveItemPoint[i]
                }
            }
        }
        let str = String.format(Localize_cns("ITEM_RESOLVE_TXT21"), sum)
        AddRdContent(this.mElemList["reward_rd"], str, "ht_24_cc_stroke", "lime")
    }

    showItemOneKeyResolveFrame(data) {
        this.resolveItemTable = []
        this.resolveItemPoint = []
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveWhiteItemTable)
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveGreenItemTable)
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveBlueItemTable)
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveGoldItemTable)
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveOrangeItemTable)

        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveWhiteItemPoint)
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveGreenItemPoint)
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveBlueItemPoint)
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveGoldItemPoint)
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveOrangeItemPoint)

        return this.showWnd()
    }
}
