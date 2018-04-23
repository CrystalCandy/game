// TypeScript file
class UIGainBox extends TClass {
    mParentNode: eui.Component;
    name: string;
    content: string;

    mElemList: any;

    param: any;

    public initObj(...args: any[]): void {
        this.mParentNode = args[0]
        this.name = args[1]
        let x = args[2]
        let y = args[3]

        let w = 0
        let h = 0

        let parentWnd = args[4]

        this.content = args[5] || ""

        this.mElemList = {}

        let mElemInfo = [
            { ["index_type"]: eui.Group, ["name"]: this.name, ["x"]: x, ["y"]: y, ["w"]: w, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.openGainLink },
            { ["index_type"]: gui.RichDisplayer, ["name"]: this.name + "_rd", ["parent"]: this.name, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["messageFlag"]: true },
            { ["index_type"]: eui.Rect, ["name"]: this.name + "_line", ["parent"]: this.name, ["color"]: gui.Color.lime, ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: 2, ["messageFlag"]: true },
        ]
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd)

        this.updateContent()
    }

    updateContent() {
        AddRdContent(this.mElemList[this.name + "_rd"], this.content, "ht_24_cc", "lime")

        let w = this.content.length * 24
        let h = 28

        UiUtil.setWH(this.mElemList[this.name], w, h)
        UiUtil.setWH(this.mElemList[this.name + "_rd"], w, h)
        UiUtil.setWH(this.mElemList[this.name + "_line"], w, 2)
        UiUtil.setXY(this.mElemList[this.name + "_line"], 0, h - 2)
    }

    setLink(param, content?) {
        if (content) {
            this.content = content
            this.updateContent()
        }

        //param= {define : ["item", entry], index : 1}
        this.param = param || {}
    }

    openGainLink() {
        if (!this.param) {
            return
        }

        let define = this.param.define
        let index = this.param.define

        let ftype = define[0]
        let fId = define[1]
        let funConfig = FastJumpSystem.getInstance().getFunTipsConfig(ftype, fId)

        if (!funConfig) {
            return
        }

        if (index == null) { //表示直接执行
            //{""shangcheng"",30006}
            let approach = funConfig.approach[index]
            FastJumpSystem.getInstance().doFastJump(approach[0], approach[1])
        } else {
            if (ftype != "item") {
                let approach = funConfig.approach
                for (let i in approach) {
                    FastJumpSystem.getInstance().doFastJump(approach[i][0], approach[i][1])
                }
            } else {
                let item: Item = ItemSystem.getInstance().getItemLogicInfoByID(fId)
                if (item.getRefProperty("shopEntry") > 0) {
                    let quickWnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
                    quickWnd.onShowWnd(fId, true);
                }
            }
        }
    }
}