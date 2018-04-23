var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TypeScript file
var VIPFrame = (function (_super) {
    __extends(VIPFrame, _super);
    function VIPFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VIPFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pay/VIPLayout.exml"];
    };
    VIPFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_charge", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
            (_d = {}, _d["name"] = "btn_get", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.hideWnd, _d),
            (_e = {}, _e["name"] = "btn_left", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.selectOnClick, _e),
            (_f = {}, _f["name"] = "btn_right", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.selectOnClick, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f;
    };
    VIPFrame.prototype.onUnLoad = function () {
    };
    VIPFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    VIPFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    VIPFrame.prototype.refreshFrame = function () {
        this.refreshVipWnd();
        var initLevel = GetHeroProperty("VIP_level") || 0;
        //默认自己的等级
        this.updateVipPower(MathUtil.clamp(initLevel + 1, 0, defaultValue.DEFALUT_VIP_MAX_LEVEL));
    };
    VIPFrame.prototype.refreshVipWnd = function () {
        var vip = GetHeroProperty("VIP_level") || 0;
        this.mElemList["cur_vip_icon"].source = ("cz_vip" + String.format("%02d", vip));
        this.mElemList["next_vip_icon"].source = ("cz_vip" + String.format("%02d", vip + 1));
        var remand = VipSystem.getInstance().GetVipFeed();
        var needDia = VipSystem.getInstance().getVipSumDia(vip);
        var tips = "";
        if (vip >= defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            tips = Localize_cns("PAY_TXT3");
        }
        else {
            tips = String.format(Localize_cns("PAY_TXT4"), remand, (vip + 1));
        }
        this.mElemList["tips_rd"].setAlignFlag(gui.Flag.H_CENTER);
        AddRdContent(this.mElemList["tips_rd"], tips, "ht_24_cc", "ublack");
        UiUtil.updateProgress(this.mElemList["exp_imb"], needDia - remand, needDia);
    };
    VIPFrame.prototype.updateVipPower = function (level) {
        this.selectVipLevel = level;
        this.mElemList["cur_vip_pic"].source = ("cz_vip" + String.format("%02d", level));
        this.setVIPcontext();
    };
    //-设置VIP特权内容
    VIPFrame.prototype.setVIPcontext = function () {
        var num = this.selectVipLevel;
        var rd = this.mElemList["content_rd"];
        var textList = GameConfig.VIPExplain[num]["privilege"];
        //这里num - 1表示vip等级
        var sum = checkNull(GameConfig.VIPExplain[num]["jingshi"], 0); //VipSystem.getInstance().getVipSumDia(num)
        var longStr;
        for (var i = 0; i < textList.length; i++) {
            var v = textList[i];
            //第一项是vip晶石额度
            var str = v;
            if (i == 0) {
                str = String.format(str, sum);
                longStr = (i + 1) + "." + str;
            }
            else {
                longStr = longStr + "#br" + (i + 1) + "." + str;
            }
        }
        AddRdContent(rd, longStr, "ht_24_cc", "ublack");
        //重置滚动距离
        rd.scrollV = 0;
    };
    VIPFrame.prototype.selectOnClick = function (args) {
        var btn_name = args.target.name;
        if (btn_name == "btn_left") {
            this.selectVipLevel = this.selectVipLevel - 1;
            if (this.selectVipLevel < 1) {
                this.selectVipLevel = defaultValue.DEFALUT_VIP_MAX_LEVEL;
            }
        }
        else if (btn_name == "btn_right") {
            this.selectVipLevel = this.selectVipLevel + 1;
            if (this.selectVipLevel > defaultValue.DEFALUT_VIP_MAX_LEVEL) {
                this.selectVipLevel = 1;
            }
        }
        this.updateVipPower(this.selectVipLevel);
    };
    return VIPFrame;
}(BaseWnd));
__reflect(VIPFrame.prototype, "VIPFrame");
//# sourceMappingURL=VIPFrame.js.map