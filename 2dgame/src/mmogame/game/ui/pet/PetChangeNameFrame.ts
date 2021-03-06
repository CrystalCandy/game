class PetChangeNameFrame extends BaseWnd {
    petId: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/pet/PetChangeNameLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "cancel_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "sure_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSure },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true)
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)
    }

    onClickSure(args) {
        let content = this.mElemList["edit_input"].text

        //验证
        if (WordFilter.checkword(content)) {
            RpcProxy.call("C2G_ACTOR_PET_RENAME", this.petId, content)
        } else {
           MsgSystem.addTagTips(Localize_cns("UNION_TEXT22"))
        }

        this.hideWnd()
    }

    onShowWithPetId(petId) {
        this.petId = petId
        this.showWnd()
    }
}