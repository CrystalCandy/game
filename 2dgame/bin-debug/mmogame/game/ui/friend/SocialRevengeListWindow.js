/*

    仇人名单

*/
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
var SocialRevengeListWindow = (function (_super) {
    __extends(SocialRevengeListWindow, _super);
    function SocialRevengeListWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocialRevengeListWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    SocialRevengeListWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var listBox = this.mElemList["list_chouren"];
        listBox.itemRenderer = itemRender.SocialRevengeListItem;
    };
    SocialRevengeListWindow.prototype.onUnLoad = function () {
    };
    SocialRevengeListWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROBBER_KILLER_LIST, this.refreshFrame, this);
        this.mElemList["group_chouren"].visible = true;
        this.mParentWnd.emptyView.setDescText(Localize_cns("EMPTY_DEFAULT_TEXT"));
        var message = GetMessage(opCodes.C2G_ROBBER_KILLER_LIST);
        SendGameMessage(message);
        this.refreshFrame();
    };
    SocialRevengeListWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROBBER_KILLER_LIST, this.refreshFrame, this);
        this.mElemList["group_chouren"].visible = false;
    };
    SocialRevengeListWindow.prototype.refreshFrame = function () {
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
    };
    return SocialRevengeListWindow;
}(BaseCtrlWnd));
__reflect(SocialRevengeListWindow.prototype, "SocialRevengeListWindow");
var itemRender;
(function (itemRender) {
    var SocialRevengeListItem = (function (_super) {
        __extends(SocialRevengeListItem, _super);
        function SocialRevengeListItem() {
            var _this = _super.call(this) || this;
            var width = 560;
            var heigth = 60;
            _this.mElemList = {};
            var mElemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["image"] = "ty_zhuangBeiBg00", _a["x"] = 10, _a["y"] = 10, _a["w"] = width, _a["h"] = heigth, _a["event_name"] = null, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "info", _b["x"] = 20, _b["y"] = 20, _b["w"] = 520, _b["h"] = 40, _b["event_name"] = null, _b["fun_index"] = null, _b),
            ];
            UiUtil.createElem(mElemInfo, _this, _this.mElemList, _this);
            return _this;
            var _a, _b;
            //this.mElemList["info"].addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onClickHyperLink, this)
        }
        SocialRevengeListItem.prototype.dataChanged = function () {
            var info = this.data;
            var lastTime = info[0];
            var timeStr = getFormatTimeEx(lastTime);
            var name = info[1];
            var str = String.format(Localize_cns("BROKENHISTORY_TXT52_1"), timeStr, name);
            AddRdContent(this.mElemList["info"], str, "ht_20_cc", "navajowhite");
            //保存最大的仇人名单时间，红点提醒
            var revengeTime = IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, "robberRevengeTime", -1);
            if (lastTime > revengeTime) {
                revengeTime = lastTime;
            }
            IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, "robberRevengeTime", revengeTime);
        };
        return SocialRevengeListItem;
    }(eui.ItemRenderer));
    itemRender.SocialRevengeListItem = SocialRevengeListItem;
    __reflect(SocialRevengeListItem.prototype, "itemRender.SocialRevengeListItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=SocialRevengeListWindow.js.map