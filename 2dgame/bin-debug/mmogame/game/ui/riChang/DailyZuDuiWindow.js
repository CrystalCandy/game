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
var DailyZuDuiWindow = (function (_super) {
    __extends(DailyZuDuiWindow, _super);
    function DailyZuDuiWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyZuDuiWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    DailyZuDuiWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.mElemList["rd_2_twice"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_2_des"].setAlignFlag(gui.Flag.CENTER_CENTER);
    };
    DailyZuDuiWindow.prototype.onUnLoad = function () {
    };
    DailyZuDuiWindow.prototype.onShow = function () {
        this.mElemList["group_xiangYao"].visible = true;
        this.mElemList["title"].text = Localize_cns("DAILY_TXT2");
        this.onRefresh();
        //  RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon)  
    };
    DailyZuDuiWindow.prototype.onHide = function () {
        this.mElemList["group_xiangYao"].visible = false;
    };
    DailyZuDuiWindow.prototype.updateWnd = function () {
        this.onRefresh();
    };
    DailyZuDuiWindow.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon);
        //  this.mElemList["group_xiangYao"].visible = true;
        if (size_t(actInfo) == 0) {
            return;
        }
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var image = "rc_ztBg03";
        this.mElemList["image_bg"].source = image;
        for (var i = 1; i <= 3; i++) {
            if (i != (index + 1)) {
                this.mElemList["group_" + i + "_prize"].visible = false;
                this.mElemList["group_rd_" + i].visible = false;
            }
            else {
                this.mElemList["group_" + i + "_prize"].visible = true;
                this.mElemList["group_rd_" + i].visible = true;
            }
        }
        //
        var had = actInfo.killCount;
        var twiceStr = String.format(Localize_cns("DAILY_TXT8"), had);
        AddRdContent(this.mElemList["rd_1_twice"], twiceStr, "ht_20_cc");
        //奖励
        var list = [];
        var prizeName = "zudui";
        for (var i = 1; i <= size_t(list); i++) {
            if (!this.mElemList[prizeName + "prizeBox" + i]) {
                this.mElemList[prizeName + "prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, prizeName + "prizeBox" + i, 0, 0, this.mElemList["group_2_prize"]);
            }
            this.mElemList[prizeName + "prizeBox" + i].updateByEntry(list[i - 1]);
        }
        var value;
        if (had >= 10) {
            value = 10;
        }
        else {
            value = had;
        }
        var maxvalue = 10;
        UiUtil.updateProgress(this.mElemList["progress"], value, maxvalue);
        var proStr = String.format(Localize_cns("ESCORT_TXT5"), value, maxvalue);
        this.mElemList["label_pro"].text = proStr;
        var isget = actInfo.prizeFlag == 1 ? true : false;
        var state1 = true;
        var state2 = true;
        var name1 = Localize_cns("DAILY_TXT9"); //"一键完成"
        var name2 = Localize_cns("DAILY_TXT10"); //"前往击杀"
        if (had == 0) {
            state2 = false;
        }
        if (isget) {
            name1 = Localize_cns("DAILY_TXT11"); //"已领取"
            state1 = false;
        }
        this.mElemList["btn_oneKey"].text = name1;
        this.mElemList["btn_kill"].text = name2;
        this.mElemList["btn_oneKey"].enabled = state1;
        this.mElemList["btn_kill"].enabled = state2;
        //双倍奖励
        /*if(actInfo.prizeRatio == 2){
            this.mElemList["double_prize"].visible = true
        }else{
            this.mElemList["double_prize"].visible = false
        }
        */
    };
    return DailyZuDuiWindow;
}(BaseCtrlWnd)); // TypeScript file
__reflect(DailyZuDuiWindow.prototype, "DailyZuDuiWindow");
//# sourceMappingURL=DailyZuDuiWindow.js.map