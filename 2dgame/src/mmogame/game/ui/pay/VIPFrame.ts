// TypeScript file
class VIPFrame extends BaseWnd {
    selectVipLevel: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/pay/VIPLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

            { ["name"]: "btn_charge", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_get", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_left", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.selectOnClick },
            { ["name"]: "btn_right", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.selectOnClick },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.refreshFrame()
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
    }

    refreshFrame() {
        this.refreshVipWnd()

        let initLevel = GetHeroProperty("VIP_level") || 0
        //默认自己的等级
        this.updateVipPower(MathUtil.clamp(initLevel + 1, 0, defaultValue.DEFALUT_VIP_MAX_LEVEL))
    }

    refreshVipWnd() {
        let vip = GetHeroProperty("VIP_level") || 0
        this.mElemList["cur_vip_icon"].source = ("cz_vip" + String.format("%02d", vip))
        this.mElemList["next_vip_icon"].source = ("cz_vip" + String.format("%02d", vip + 1))

        let remand = VipSystem.getInstance().GetVipFeed()
        let needDia = VipSystem.getInstance().getVipSumDia(vip)

        let tips = ""
        if (vip >= defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            tips = Localize_cns("PAY_TXT3")
        } else {
            tips = String.format(Localize_cns("PAY_TXT4"), remand, (vip + 1))
        }
        this.mElemList["tips_rd"].setAlignFlag(gui.Flag.H_CENTER)
        AddRdContent(this.mElemList["tips_rd"], tips, "ht_24_cc", "ublack")

        UiUtil.updateProgress(this.mElemList["exp_imb"], needDia - remand, needDia)
    }

    updateVipPower(level) {
        this.selectVipLevel = level

        this.mElemList["cur_vip_pic"].source = ("cz_vip" + String.format("%02d", level))

        this.setVIPcontext()
    }

    //-设置VIP特权内容
    setVIPcontext() {
        let num = this.selectVipLevel
        let rd = this.mElemList["content_rd"]
        let textList = GameConfig.VIPExplain[num]["privilege"]

        //这里num - 1表示vip等级
        let sum = checkNull(GameConfig.VIPExplain[num]["jingshi"], 0)    //VipSystem.getInstance().getVipSumDia(num)
        let longStr: string
        for (let i = 0; i < textList.length; i++) {
            let v = textList[i]

            //第一项是vip晶石额度
            let str = v
            if (i == 0) {
                str = String.format(str, sum)
                longStr = (i + 1) + "." + str
            }
            else {
                longStr = longStr + "#br" + (i + 1) + "." + str
            }
        }
        AddRdContent(rd, longStr, "ht_24_cc", "ublack")

        //重置滚动距离
        rd.scrollV = 0
    }

    selectOnClick(args) {
        let btn_name = args.target.name
        if (btn_name == "btn_left") {
            this.selectVipLevel = this.selectVipLevel - 1
            if (this.selectVipLevel < 1) {
                this.selectVipLevel = defaultValue.DEFALUT_VIP_MAX_LEVEL
            }
        } else if (btn_name == "btn_right") {
            this.selectVipLevel = this.selectVipLevel + 1
            if (this.selectVipLevel > defaultValue.DEFALUT_VIP_MAX_LEVEL) {
                this.selectVipLevel = 1
            }
        }

        this.updateVipPower(this.selectVipLevel)
    }
}