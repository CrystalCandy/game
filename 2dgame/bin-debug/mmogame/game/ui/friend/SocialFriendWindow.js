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
var SocialFriendWindow = (function (_super) {
    __extends(SocialFriendWindow, _super);
    function SocialFriendWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocialFriendWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    SocialFriendWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "input_edit", _a["title"] = "", _a["prompt"] = Localize_cns("INPUT_FRIEND_NAME_OR_ID"), _a["font"] = "ht_22_lc", _a["image"] = null, _a["color"] = gui.Color.white, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["name"] = "btn_search", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickSearchFriend, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["friend_scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "friend_scroll", 10, 5, group.width - 20, group.height - 10, group);
        var _a, _b;
    };
    SocialFriendWindow.prototype.onUnLoad = function () {
    };
    SocialFriendWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refresh, this);
        RegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this);
        RegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refresh, this);
        RegisterEvent(EventDefine.SENT_POWER_LIST, this.refresh, this);
        this.mElemList["friend_wnd"].visible = true;
        this.mElemList["tips_rd"].visible = true;
        this.refresh();
    };
    SocialFriendWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refresh, this);
        UnRegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this);
        UnRegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refresh, this);
        UnRegisterEvent(EventDefine.SENT_POWER_LIST, this.refresh, this);
        this.mElemList["friend_wnd"].visible = false;
        this.mElemList["tips_rd"].visible = false;
        this.mElemList["input_edit"].text = "";
    };
    SocialFriendWindow.prototype.refresh = function () {
        var friendList = FriendSystem.getInstance().getFriendInfoList();
        var onlineSortList = [];
        var offLineSortList = [];
        for (var friendId in friendList) {
            var friendInfo = friendList[friendId];
            var t = {};
            t.friendId = friendId;
            t.friendInfo = friendInfo;
            if (friendInfo.isOnline == 0) {
                JsUtil.arrayInstert(offLineSortList, t);
            }
            else {
                JsUtil.arrayInstert(onlineSortList, t);
            }
        }
        // 排序在线好友
        table_sort(onlineSortList, function (a, b) {
            return b.friendInfo.level - a.friendInfo.level;
        });
        // 排序离线好友
        table_sort(offLineSortList, function (a, b) {
            return b.friendInfo.level - a.friendInfo.level;
        });
        onlineSortList = table_merge(onlineSortList, offLineSortList);
        this.scroll.clearItemList();
        var group = this.mElemList["friend_scroll_wnd"];
        for (var i in onlineSortList) {
            var v = onlineSortList[i];
            var window_1 = this.scroll.getItemWindow(tonumber(i), group.width - 20, 130, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
        //人数
        var str = Localize_cns("DELETE_FRIEND_TIPS") + "#br";
        str = str + String.format(Localize_cns("FRIEND_COUNT"), size_t(onlineSortList), size_t(onlineSortList) - size_t(offLineSortList));
        AddRdContent(this.mElemList["tips_rd"], str, "ht_24_cc", "ublack", 6);
    };
    SocialFriendWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_bg", _b["parent"] = name + "_group", _b["image"] = "ty_uiDi03", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_icon_bg", _c["parent"] = name + "_group", _c["image"] = "ty_renWuKuang01", _c["x"] = 10, _c["y"] = h - 128, _c["w"] = 140, _c["h"] = 140, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = name + "_icon", _d["parent"] = name + "_icon_bg", _d["image"] = "zctx_90001", _d["x"] = 4, _d["y"] = 0, _d["w"] = 140, _d["h"] = 140, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = name + "_name_rd", _e["parent"] = name + "_group", _e["x"] = 155, _e["y"] = 35, _e["w"] = 250, _e["h"] = 60, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "chatBtn", _f["image"] = "ty_tongYongBt2", _f["title"] = Localize_cns("LIAO_TIAN"), _f["font"] = "ht_20_cc_stroke", _f["color"] = gui.Color.white, _f["x"] = 436, _f["y"] = 40, _f["w"] = 94, _f["h"] = 49, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onChatBtnClick, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f;
    };
    SocialFriendWindow.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
    };
    SocialFriendWindow.prototype.onChatBtnClick = function (args) {
        alert('hello world in TypeScript!');
        // let friendInfo = this.data.friendInfo
        // let roleId = tonumber(friendInfo.roleId)
        // let body = friendInfo.body
        // let name = friendInfo.roleName
        // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
        // window.loadWnd()
        // window.showFriendChatFrame(roleId, name, body)
        // ChatWithPlayer(roleId, name)
        // GameSound.getInstance().playEffect(SystemSound.effect_btnClick)
    };
    SocialFriendWindow.prototype.onClickSearchFriend = function (args) {
        var edit = this.mElemList["input_edit"];
        var bEmpty = StringUtil.isEmpty(edit.text);
        if (bEmpty) {
            return;
        }
        else {
            FriendSystem.getInstance().searchPlayerByName(edit.text);
        }
    };
    return SocialFriendWindow;
}(BaseCtrlWnd));
__reflect(SocialFriendWindow.prototype, "SocialFriendWindow");
var itemRender;
(function (itemRender) {
    var SocialFriendItem = (function (_super) {
        __extends(SocialFriendItem, _super);
        function SocialFriendItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var width = 560, height = 125;
            var Info = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "friend_name_level", _b["title"] = "Test1", _b["font"] = "ht_24_lc", _b["image"] = null, _b["color"] = gui.Color.saddlebrown, _b["x"] = 126, _b["y"] = 35, _b["w"] = 400, _b["h"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "yuanFen", _c["title"] = Localize_cns("YUAN_FEN_ZHI"), _c["font"] = "ht_20_lc", _c["image"] = null, _c["color"] = gui.Color.ublack, _c["x"] = 126, _c["y"] = 70, _c["w"] = 200, _c["h"] = 20, _c["event_name"] = null, _c["fun_index"] = null, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "yuanFenChenhao", _d["title"] = Localize_cns("FRIEND_YUANFEN_STAR5"), _d["font"] = "ht_20_lc", _d["image"] = null, _d["color"] = gui.Color.ublack, _d["x"] = 200, _d["y"] = 70, _d["w"] = 200, _d["h"] = 20, _d["event_name"] = null, _d["fun_index"] = null, _d),
                (_e = {}, _e["index_type"] = eui.Group, _e["name"] = "eventRec", _e["title"] = "", _e["font"] = null, _e["image"] = null, _e["color"] = null, _e["x"] = 120, _e["y"] = 0, _e["w"] = width - 120, _e["h"] = height, _e["event_name"] = gui.TouchEvent.TOUCH_LONG, _e["fun_index"] = _this.onClickDeleteFriend, _e),
                (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "chatBtn", _f["bAdapteWindow"] = true, _f["image"] = "ty_tongYongBt2", _f["title"] = Localize_cns("LIAO_TIAN"), _f["font"] = "ht_20_cc_stroke", _f["color"] = gui.Color.white, _f["x"] = 450, _f["y"] = 40, _f["w"] = 94, _f["h"] = 49, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = _this.onChatBtnClick, _f),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            //this.mElemList[ "eventRec"].addEventListener(gui.TouchEvent.TOUCH_SHORT, this.showFriendInfo, this)
            //this.mElemList[ "eventRec"].addEventListener(gui.Window.MouseDownEvent, this.onPlayEffect, this)
            //this.mElemList["lastLoginTime"].visible = (false)
            _this.mElemList["petBox"] = UIPetBox.newObj(_this, "petBox", 20, 20, _this.mElemList["bg"]);
            return _this;
            var _a, _b, _c, _d, _e, _f;
        }
        SocialFriendItem.prototype.dataChanged = function () {
            var friendId = this.data.friendId;
            var friendInfo = this.data.friendInfo;
            //存在则显示它,注意z顺序与定义顺序一致
            this.mElemList["friend_name_level"].text = (friendInfo.roleName + "  " + "Lv " + friendInfo.level);
            //let str = String.format(Localize_cns("YUAN_FEN_ZHI"),friendInfo.friendShip)
            //this.mElemList["yuanFen"].text = (str)
            var friendShipValue = (_a = {},
                _a[1] = [0, 200],
                _a[2] = [200, 500],
                _a[3] = [500, 1200],
                _a[4] = [1200, 2500],
                _a[5] = [2500],
                _a);
            var LastLoginTime = (_b = {},
                _b[1] = [1, 60],
                _b[2] = [60, 21600],
                _b[3] = [21600],
                _b);
            var frendship = friendInfo.friendShip;
            //let frendship=100
            for (var _k in friendShipValue) {
                var k = tonumber(_k);
                var v = friendShipValue[k];
                if (k == size_t(friendShipValue)) {
                    if (frendship >= v[0]) {
                        this.mElemList["yuanFenChenhao"].text = (String.format(Localize_cns("FRIEND_YUANFEN_STAR" + k), frendship));
                    }
                }
                else {
                    if (frendship >= v[0] && frendship < v[1]) {
                        this.mElemList["yuanFenChenhao"].text = (String.format(Localize_cns("FRIEND_YUANFEN_STAR" + k), frendship));
                    }
                }
            }
            this.mElemList["petBox"].updateByEntryAndSex(friendInfo.vocation, friendInfo.sexId, friendInfo.roleId);
            this.mElemList["petBox"].setEnable(friendInfo.isOnline == 1);
            var _a, _b;
            // let list = FriendSystem.getInstance().getSentPowerList()
            // if (list[friendInfo.roleId]) {
            //     this.mElemList[name + "tiliBtn"].enabled = (false)
            // } else {
            //     this.mElemList[name + "tiliBtn"].enabled = (true)
            // }
        };
        ////////////////////////////////-响应函数////////////////////////
        SocialFriendItem.prototype.onClickDeleteFriend = function (args) {
            // let friendInfo = this.data.friendInfo
            // let window = WngMrg.getInstance().getWindow("DeleteFriendFrame")
            // window.setDeleteTypeAndShow(1, tonumber(friendInfo.roleId))
        };
        // onTiliBtnClick(args) {
        //     let friendInfo = this.data.friendInfo
        //     let roleId = tonumber(friendInfo.roleId)
        //     FriendSystem.getInstance().handselPowerToFriend([roleId])
        // }
        SocialFriendItem.prototype.onChatBtnClick = function (args) {
            alert('hello world in TypeScript!');
            // let friendInfo = this.data.friendInfo
            // let roleId = tonumber(friendInfo.roleId)
            // let body = friendInfo.body
            // let name = friendInfo.roleName
            // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
            // window.loadWnd()
            // window.showFriendChatFrame(roleId, name, body)
            // ChatWithPlayer(roleId, name)
            // GameSound.getInstance().playEffect(SystemSound.effect_btnClick)
        };
        return SocialFriendItem;
    }(eui.ItemRenderer));
    itemRender.SocialFriendItem = SocialFriendItem;
    __reflect(SocialFriendItem.prototype, "itemRender.SocialFriendItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=SocialFriendWindow.js.map