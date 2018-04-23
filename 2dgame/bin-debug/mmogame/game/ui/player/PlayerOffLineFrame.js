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
var PlayerOffLineFrame = (function (_super) {
    __extends(PlayerOffLineFrame, _super);
    function PlayerOffLineFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerOffLineFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/OffLineLayout.exml"];
    };
    PlayerOffLineFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 617, 824, 12, 38);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_awake", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_sure", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //	this.mElemList["resource_money"].textColor = "ubl"
        //    this.mElemList["resource_exp"].textColor = "ublack"
        //   this.mElemList["resource_cloth"].textColor = "ublack"
        this.mElemList["yueka_money"].textColor = gui.Color.lime;
        this.mElemList["yueka_exp"].textColor = gui.Color.lime;
        var _a, _b;
    };
    PlayerOffLineFrame.prototype.onUnLoad = function () {
    };
    PlayerOffLineFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        //    RegisterEvent(EventDefine. PALYER_OFFINE_REFRESH, this.onRefresh, this)
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    PlayerOffLineFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        //     UnRegisterEvent(EventDefine. PALYER_OFFINE_REFRESH, this.onRefresh, this)
        this.mLayoutNode.visible = false;
    };
    PlayerOffLineFrame.prototype.onRefresh = function () {
        //离线收获
        var info = RoleSystem.getInstance().getOfflineInfo();
        if (size_t(info) == 0) {
            return;
        }
        //rd_time
        var offTime = info.time;
        var timeStr = "";
        if (offTime > 21600) {
            offTime = 21600;
        }
        if (offTime > 3600) {
            timeStr = getFormatDiffTime(offTime);
        }
        else {
            timeStr = getFormatDiffTimeSimple(offTime);
        }
        AddRdContent(this.mElemList["rd_time"], "离线时间：" + timeStr, "ht_20_cc", "ublack");
        //label_m_resource
        var money = info.funds;
        var exp = info.exp;
        var cloth = info.equip;
        var str = String.format(Localize_cns("ROLE_OFFLINE_DES"), info.equipsell);
        AddRdContent(this.mElemList["rd_des"], str, "ht_24_cc", "black");
        //rd_des //
        this.mElemList["resource_money"].text = tostring(money);
        this.mElemList["resource_exp"].text = tostring(exp);
        this.mElemList["resource_cloth"].text = tostring(cloth);
        ///月卡
        var yuekamoney = info.fundsadd;
        var yuekaexp = info.expadd;
        this.mElemList["yueka_money"].text = tostring(yuekamoney);
        this.mElemList["yueka_exp"].text = tostring(yuekaexp);
    };
    return PlayerOffLineFrame;
}(BaseWnd));
__reflect(PlayerOffLineFrame.prototype, "PlayerOffLineFrame");
//# sourceMappingURL=PlayerOffLineFrame.js.map