/*

    仇人名单

*/

class SocialRevengeListWindow extends BaseCtrlWnd {

    public initObj(...params: any[]): void {

    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        let listBox: eui.List = this.mElemList["list_chouren"]
        listBox.itemRenderer = itemRender.SocialRevengeListItem
    }


    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.ROBBER_KILLER_LIST, this.refreshFrame, this)
        this.mElemList["group_chouren"].visible = true

        this.mParentWnd.emptyView.setDescText(Localize_cns("EMPTY_DEFAULT_TEXT"))

        let message = GetMessage(opCodes.C2G_ROBBER_KILLER_LIST)
	    SendGameMessage(message)

        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.ROBBER_KILLER_LIST, this.refreshFrame, this)
        this.mElemList["group_chouren"].visible = false
    }


    refreshFrame() {
        // let activity = GetActivity(ActivityDefine.Robber)
        // let list = activity.getKillerList()
        // this.mParentWnd.emptyView.setVisible(size_t(list) == 0)
        // if (!list || list == null) {
        //     return
        // }

        // let show_list = []
        // for (let index in list) {
        //     let info = list[index]
        //     show_list.push(info);
        // }
        // let listBox: eui.List = this.mElemList["list_chouren"]
        // UiUtil.updateList(listBox, show_list)
    }

}

module itemRender {
    export class SocialRevengeListItem extends eui.ItemRenderer {

        mElemList: any

        constructor() {
            super()

            let width = 560
            let heigth = 60

            this.mElemList = {}
            let mElemInfo: any = [
                //背景
                { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["image"]: "ty_zhuangBeiBg00", ["x"]: 10, ["y"]: 10, ["w"]: width, ["h"]: heigth, ["event_name"]: null, ["fun_index"]: null },
                //信息
                { ["index_type"]: gui.RichDisplayer, ["name"]: "info", ["x"]: 20, ["y"]: 20, ["w"]: 520, ["h"]: 40, ["event_name"]: null, ["fun_index"]: null },
            ]
            UiUtil.createElem(mElemInfo, this, this.mElemList, this)

            //this.mElemList["info"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this)
        }

        protected dataChanged(): void {
            let info = this.data


            let lastTime = info[0]
            let timeStr = getFormatTimeEx(lastTime)
            let name = info[1]
            
            let str = String.format(Localize_cns("BROKENHISTORY_TXT52_1"), timeStr, name)
            AddRdContent(this.mElemList["info"], str, "ht_20_cc", "navajowhite")

            //保存最大的仇人名单时间，红点提醒
            let revengeTime = IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, "robberRevengeTime", -1)
            
            if(lastTime > revengeTime ){
                revengeTime = lastTime
            }
            IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, "robberRevengeTime", revengeTime)
        }

    }

}