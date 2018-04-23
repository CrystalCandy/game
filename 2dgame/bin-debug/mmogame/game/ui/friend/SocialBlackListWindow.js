// TypeScript file
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
var SocialBlackListWindow = (function (_super) {
    __extends(SocialBlackListWindow, _super);
    function SocialBlackListWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocialBlackListWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.list = [];
    };
    SocialBlackListWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["black_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "black_scroll", 0, 0, group.width, group.height, group);
    };
    SocialBlackListWindow.prototype.onUnLoad = function () {
    };
    SocialBlackListWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.BLACK_INFO_LIST, this.refresh, this);
        this.mElemList["black_wnd"].visible = true;
        this.refresh();
    };
    SocialBlackListWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.BLACK_INFO_LIST, this.refresh, this);
        this.mElemList["black_wnd"].visible = false;
    };
    SocialBlackListWindow.prototype.refresh = function () {
        var list = FriendSystem.getInstance().getBlackList();
        var show_list = [];
        for (var index in list) {
            var info = list[index];
            show_list.push(info);
        }
        this.list = show_list;
        this.scroll.clearItemList();
        var group = this.mElemList["black_wnd"];
        for (var i = 0; i < size_t(show_list); i++) {
            var v = show_list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width, 80, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
    };
    SocialBlackListWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = name + "_rd", _b["x"] = 20, _b["y"] = 30, _b["w"] = w - 170, _b["h"] = 10, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = name + "_btn", _c["title"] = Localize_cns("RENAME_TXT5"), _c["font"] = "ht_24_cc_stroke", _c["image"] = "ty_tongYongBt2", _c["color"] = gui.Color.white, _c["x"] = w - 120, _c["y"] = 15, _c["w"] = 94, _c["h"] = 49, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickBlackRemove, _c),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        AddRdContent(this.mElemList[name + "_rd"], "玩家*******已经加入黑名单", "ht_24_cc", "ublack");
        var _a, _b, _c;
    };
    SocialBlackListWindow.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
    };
    SocialBlackListWindow.prototype.onClickBlackRemove = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var info = this.list[index];
        if (info) {
            FriendSystem.getInstance().removePlayerBlackList(info[0]);
        }
    };
    return SocialBlackListWindow;
}(BaseCtrlWnd));
__reflect(SocialBlackListWindow.prototype, "SocialBlackListWindow");
//# sourceMappingURL=SocialBlackListWindow.js.map