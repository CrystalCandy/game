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
var LoginServerListFrame = (function (_super) {
    __extends(LoginServerListFrame, _super);
    function LoginServerListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginServerListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/login/LoginServerListLayout.exml",];
        //"layouts/itemRender/LoginServerItemLayout.exml"];
    };
    LoginServerListFrame.prototype.onLoad = function () {
        //this.createLayerNode();
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        // this.mLayoutNode.bottom = 0
        // this.mLayoutNode.horizontalCenter = 0;
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //this.mElemList["btn_refresh"].visible = false;
        var listBox = this.mElemList["list_regionlist"];
        listBox.itemRenderer = itemRender.LoginServerRegionItem;
        var listBox = this.mElemList["list_serverlist"];
        listBox.itemRenderer = itemRender.LoginServerItem;
        var _a, _b;
    };
    LoginServerListFrame.prototype.onUnLoad = function () {
    };
    LoginServerListFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, this.refreshUI, this);
        this.refreshUI();
    };
    LoginServerListFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE, this.refreshUI, this);
    };
    LoginServerListFrame.prototype.refreshUI = function () {
        // var loginSystem:LoginSystem = LoginSystem.getInstance();
        // var recentServerInfo = loginSystem.getRecentLoginServerInfo();
        // if(recentServerInfo == null)
        //     return;
        // var textInfo = loginSystem.getServerStateText(recentServerInfo);
        // this.mElemList["label_serverStat"].textColor = textInfo.color;
        // this.mElemList["label_serverStat"].text = textInfo.text;
        // this.mElemList["label_serverName"].textColor = gui.Color.cyan;
        // this.mElemList["label_serverName"].text = recentServerInfo.ServerName;
        // this.mElemList["icon_serverStat"].source = textInfo.image;
        // this.mElemList["icon_serverNew"].visible = !!recentServerInfo.IsNew;
        var regionList = [];
        var regionPerCount = 20;
        var regionCount = Math.ceil(ServerConfig.length / regionPerCount);
        for (var i = 0; i < regionCount; i++) {
            var v_1 = {};
            v_1.start = i * regionPerCount;
            v_1.end = v_1.start + regionPerCount - 1;
            v_1.select = false;
            v_1.parent = this;
            regionList.push(v_1);
        }
        var v = {};
        v.start = -1;
        v.end = -1;
        v.select = false;
        v.parent = this;
        regionList.push(v);
        //index==1的，是最新开服的区
        var selectRegion = null;
        if (regionCount == 0) {
            selectRegion = regionList[0];
        }
        else {
            selectRegion = regionList[1];
        }
        selectRegion.select = true;
        regionList = regionList.reverse();
        this.refreshRegion(selectRegion.start, selectRegion.end, regionList);
    };
    LoginServerListFrame.prototype.refreshRegion = function (start, end, regionList) {
        //刷新区服列表
        var listBox = this.mElemList["list_regionlist"];
        if (regionList == null) {
            regionList = UiUtil.getListDataSouce(listBox);
            for (var i = 0; i < regionList.length; i++) {
                var regionInfo = regionList[i];
                if (regionInfo.start == start && regionInfo.end == end) {
                    regionInfo.select = true;
                }
                else {
                    regionInfo.select = false;
                }
            }
        }
        UiUtil.updateList(listBox, regionList);
        //刷新服务器列表
        var serverList = [];
        if (start < 0) {
            var loginSystem = LoginSystem.getInstance();
            var recentServerInfo = loginSystem.getRecentLoginServerInfo();
            if (recentServerInfo != null) {
                serverList.push(recentServerInfo);
            }
        }
        else {
            for (var i = start; i < end; i++) {
                var serverInfo = ServerConfig[i];
                if (serverInfo != null)
                    serverList.push(serverInfo);
            }
        }
        var listBox = this.mElemList["list_serverlist"];
        UiUtil.updateList(listBox, serverList);
    };
    LoginServerListFrame.STATE_LOGO = 0; //背景图
    LoginServerListFrame.STATE_AUTH = 1; //授权信息
    LoginServerListFrame.STATE_RENCENT = 2; //最近登陆
    LoginServerListFrame.STATE_REGISTER = 3; //注册
    return LoginServerListFrame;
}(BaseWnd));
__reflect(LoginServerListFrame.prototype, "LoginServerListFrame");
var itemRender;
(function (itemRender) {
    var LoginServerRegionItem = (function (_super) {
        __extends(LoginServerRegionItem, _super);
        function LoginServerRegionItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var Info = [
                (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_region", _a["title"] = "", _a["font"] = "ht_24_cc", _a["color"] = gui.Color.ublack, _a["image"] = "dl_fuWuQiDi03", _a["x"] = 0, _a["y"] = 10, _a["w"] = null, _a["h"] = null, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = _this.onClickBtn, _a),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            return _this;
            var _a;
        }
        LoginServerRegionItem.prototype.dataChanged = function () {
            var v = this.data;
            var btn = this.mElemList["btn_region"];
            if (v.select == true) {
                btn.source = "dl_fuWuQiDi03";
            }
            else {
                btn.source = "dl_fuWuQiDi01";
            }
            if (v.start < 0) {
                btn.text = Localize_cns("LAST_LOGIN_ROLE");
            }
            else {
                btn.text = String.format("S%d-%d", v.start + 1, v.end + 1);
            }
        };
        LoginServerRegionItem.prototype.onClickBtn = function (args) {
            var v = this.data;
            v.parent.refreshRegion(v.start, v.end);
        };
        return LoginServerRegionItem;
    }(eui.ItemRenderer));
    itemRender.LoginServerRegionItem = LoginServerRegionItem;
    __reflect(LoginServerRegionItem.prototype, "itemRender.LoginServerRegionItem");
    var LoginServerItem = (function (_super) {
        __extends(LoginServerItem, _super);
        function LoginServerItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var Info = [
                (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_server", _a["title"] = "", _a["font"] = "ht_24_cc", _a["color"] = gui.Color.ublack, _a["image"] = "dl_fuWuQiDi02", _a["x"] = 0, _a["y"] = 10, _a["w"] = null, _a["h"] = null, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = _this.onServerItemTap, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "serverIcon", _b["image"] = "dl_biaoQian01", _b["parent"] = "btn_server", _b["x"] = 0, _b["y"] = 0, _b["w"] = null, _b["h"] = null, _b["messageFlag"] = true, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            return _this;
            var _a, _b;
        }
        LoginServerItem.prototype.dataChanged = function () {
            // let listbox = <eui.List>this.parent;
            // let param = listbox.dataProvider["param"];
            var serverInfo = this.data;
            var loginSystem = LoginSystem.getInstance();
            //var textInfo = loginSystem.getServerStateText(serverInfo);
            var text = "";
            var color = gui.Color.ublack;
            if (serverInfo.State == StateType.UNABLE) {
                text = String.format("(%s)", Localize_cns("WEIHU"));
                color = gui.Color.gray;
            }
            this.mElemList["btn_server"].text = text + serverInfo.ServerName;
            this.mElemList["btn_server"].textColor = color;
            this.mElemList["serverIcon"].visible = !!serverInfo.IsNew;
            // this.label_serverStat.textColor = textInfo.color;
            // this.label_serverStat.text = textInfo.text;
            // this.label_serverName.textColor = gui.Color.cyan
            // this.label_serverName.text = serverInfo.ServerName;
            // this.icon_serverStat.source = textInfo.image;
            // this.icon_serverNew.visible = !!serverInfo.IsNew;
        };
        LoginServerItem.prototype.onServerItemTap = function (event) {
            //TLog.Debug("onServerItemTap index:", this.itemIndex); 
            //LoginSystem.getInstance().setSelectedServerIndex(this.itemIndex);
            var serverInfo = this.data;
            var index = ServerConfig.indexOf(serverInfo);
            LoginSystem.getInstance().setSelectedServerIndex(index);
            WngMrg.getInstance().hideWindow("LoginServerListFrame");
        };
        return LoginServerItem;
    }(eui.ItemRenderer));
    itemRender.LoginServerItem = LoginServerItem;
    __reflect(LoginServerItem.prototype, "itemRender.LoginServerItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=LoginServerListFrame.js.map