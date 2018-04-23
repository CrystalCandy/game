class ChatBubbleSelectFrame extends BaseWnd {
    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/ChatBubbleSelectLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();

        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "selectText", ["title"]: Localize_cns("CHAT_PLEASE_SELECT_BUBBLE"), ["font"]: "ht_22_cc_stroke", ["color"]: gui.Color.white },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let listbox: eui.List = this.mElemList["scroll"]
        listbox.itemRenderer = itemRender.BubbleSelectItem
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.onRefresh()
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
    }

    onRefresh() {
        // let list:any = {
        // 	[1] : {"hy_duiHuaDi01", "", 0},
        // 	[2] = {"hy_VIPduiHuaDi04", "hy_VIPduiHua04", 1},
        // 	[3] = {"hy_VIPduiHuaDi01", "hy_VIPduiHua01", 3},
        // 	[4] = {"hy_VIPduiHuaDi05", "hy_VIPduiHua05", 5},
        // 	[5] = {"hy_VIPduiHuaDi02", "hy_VIPduiHua02", 8},
        // 	[6] = {"hy_VIPduiHuaDi03", "hy_VIPduiHua03", 12},
        // }
        let list = VipSystem.getInstance().getSortChatBubbleList()
        let bubbleList: any[] = []
        for (let i in list) {
            let t: any = {}
            //t.index = Number(i)
            t.data = list[i]
            t.self = this
            JsUtil.arrayInstert(bubbleList, t)
        }

        let listbox: eui.List = this.mElemList["scroll"]
        UiUtil.updateList(listbox, bubbleList);
    }
}

module itemRender {
    export class BubbleSelectItem extends eui.ItemRenderer {
        mElemList;
        constructor() {
            super()
            this.mElemList = {}

            let Info = [
                { ["index_type"]: eui.Group, ["name"]: "item_bg", ["x"]: 0, ["y"]: 0, ["w"]: 500, ["h"]: 100, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickUseBubble },
                { ["index_type"]: gui.Grid9Image, ["name"]: "bubble_bg", ["parent"]: "item_bg", ["image"]: "", ["x"]: 0, ["y"]: 40, ["w"]: 500, ["h"]: 60, ["messageFlag"]: true },
                { ["index_type"]: gui.Grid9Image, ["name"]: "bubble_icon", ["parent"]: "item_bg", ["image"]: "", ["x"]: 20, ["y"]: 0, ["w"]: 109, ["h"]: 54, ["messageFlag"]: true },
                { ["index_type"]: eui.Label, ["name"]: "use_tips", ["parent"]: "bubble_bg", ["title"]: "", ["font"]: "ht_24_cc_stroke", ["color"]: gui.Color.white, ["x"]: 25, ["y"]: 0, ["w"]: 475, ["h"]: 60, ["messageFlag"]: true },

                { ["index_type"]: eui.Label, ["name"]: "can_not_use", ["x"]: 0, ["y"]: 0, ["w"]: 500, ["h"]: 100, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickUseBubbleBlock },
            ]
            UiUtil.createElem(Info, this, this.mElemList, this)
        }

        protected dataChanged(): void {
            //let index = this.data.index
            let v = this.data.data

            this.mElemList["use_tips"].visible = (true)
            this.mElemList["can_not_use"].visible = (true)


            let imgName = v.imgName;
            let text = v.desc;

            this.mElemList["bubble_bg"].source = imgName[0]
            this.mElemList["bubble_icon"].source = imgName[1]
            this.mElemList["use_tips"].text = text

            let quest = v.quest
            if (size_t(quest) != 0) {
                if (quest[0] && quest[0] == "vip") {
                    if (GetHeroProperty("VIP_level") >= quest[1]) {
                        this.mElemList["use_tips"].visible = (false)
                        this.mElemList["can_not_use"].visible = (false)
                    }
                } else if (quest[0] && quest[0] == "item") {
                    let list = ChannelMrg.getInstance().getUnlockBubbleList()
                    for (let _ in list) {
                        let bv = list[_]

                        if (bv == v.index) {
                            this.mElemList["use_tips"].visible = (false)
                            this.mElemList["can_not_use"].visible = (false)
                        }
                    }
                }
            } else {
                this.mElemList["use_tips"].visible = (false)
                this.mElemList["can_not_use"].visible = (false)
            }
        }

        onClickUseBubble(args) {
            //let index = this.data.index
            let v = this.data.data

            if (tonumber(GetHeroProperty("chatBubbleType") || 0) != v.index) {
                let message = GetMessage(opCodes.C2G_CHANNEL_WINDOW_TYPE)
                message.chatBubbleType = v.index
                SendGameMessage(message)
            }

            let self = this.data.self
            if (self) {
                self.hideWnd()
            }
        }


        onClickUseBubbleBlock( args){
            MsgSystem.addTagTips(Localize_cns("CHAT_BUBBLE_ERROR"))
        }
    }
}
