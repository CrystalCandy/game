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
var MarryWindow = (function (_super) {
    __extends(MarryWindow, _super);
    function MarryWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarryWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MarryWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "combox_name", _a["title"] = null, _a["event_name"] = gui.ComboBox.onClick, _a["fun_index"] = this.onPosTypeChange, _a),
            (_b = {}, _b["name"] = "marry_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.marryClick, _b),
            (_c = {}, _c["name"] = "checkBtn1", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickCheck, _c),
            (_d = {}, _d["name"] = "checkBtn2", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickCheck, _d),
            (_e = {}, _e["name"] = "divorce_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.divorceClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e;
    };
    MarryWindow.prototype.initPostTypeCombox = function () {
        var data = [
            { bg: "ty_tongYongBt1", content: "J9" },
        ];
        var myName = GetHeroProperty("name");
        if (myName == "J9") {
            data = [
                { bg: "ty_tongYongBt1", content: "J6" },
            ];
        }
        //let id = GetHeroProperty("id")
        //1017000053	J9
        //1017000052
        var cb = this.mElemList["combox_name"];
        cb.setTitleHeight(48);
        cb.setItemWidth(250);
        cb.setItemHeight(55);
        cb.setItemTextAlign("center"); //middle
        cb.setTitle("");
        cb.data = data;
    };
    MarryWindow.prototype.onUnLoad = function () {
    };
    MarryWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.MARRY_UPDATE, this.onRefresh, this);
        this.mElemList["group1"].visible = true;
        this.mElemList["title"].text = Localize_cns("SANSHENG_TXT7");
        this.name = "";
        this.checkBoxIndex = -1;
        for (var i = 1; i < 2; i++) {
            this.mElemList["checkSelect" + i].visible = false;
        }
        this.onRefresh();
    };
    MarryWindow.prototype.onHide = function () {
        this.mElemList["group1"].visible = false;
        UnRegisterEvent(EventDefine.MARRY_UPDATE, this.onRefresh, this);
    };
    MarryWindow.prototype.onRefresh = function () {
        var isMarry = (GetHeroProperty("spouseId") > 0); //是否结婚
        this.mElemList["notMarried_group"].visible = (isMarry == false);
        this.mElemList["marry_group"].visible = (isMarry);
        var cb = this.mElemList["combox_name"];
        cb.setTitle("");
        var friendList = FriendSystem.getInstance().getFriendInfoList();
        this.initPostTypeCombox();
    };
    MarryWindow.prototype.onPosTypeChange = function (event) {
        var cb = this.mElemList["combox_name"];
        var data = cb.data;
        //cb.setTitle(data[event.data.itemIndex].content ) ;
        cb.hide();
        this.mElemList["name_text"].text = data[event.data.itemIndex].content;
        this.name = data[event.data.itemIndex].content;
        // this.mFightEditor.setCasterPos(data[event.data.itemIndex].content)
        // this.mFightEditor.refreshCombat();
    };
    MarryWindow.prototype.marryClick = function () {
        var wnd = WngMrg.getInstance().getWindow("ProposeFrame");
        var name = this.name;
        if (name == "") {
            MsgSystem.addTagTips(Localize_cns("SANSHENG_TXT1"));
            return;
        }
        if (this.checkBoxIndex == -1) {
            MsgSystem.addTagTips(Localize_cns("SANSHENG_TXT2"));
            return;
        }
        var id = GetHeroProperty("id");
        if (id == 1017000056) {
            id = 1017000052;
        }
        else {
            id = 1017000056;
        }
        //1017000053	J9
        //1017000052
        var roleId = id;
        var roleSex = this.checkBoxIndex;
        wnd.onShowAndSetData(name, roleId, roleSex);
    };
    MarryWindow.prototype.onClickCheck = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        for (var i = 1; i < 3; i++) {
            this.mElemList["checkSelect" + i].visible = (i == tonumber(index));
        }
        this.checkBoxIndex = tonumber(index);
    };
    MarryWindow.prototype.divorceClick = function () {
        var msg = Localize_cns("SANSHENG_TXT4");
        var callback = {
            onDialogCallback: function (result, userData) {
                if (result) {
                    RpcProxy.call("C2G_EndMarriage"); //离婚
                    var wnd = WngMrg.getInstance().getWindow("SanShengSanShiFrame");
                    if (wnd.isVisible()) {
                        wnd.hideWnd();
                    }
                }
            }
        };
        MsgSystem.confirmDialog(msg, callback, null);
    };
    return MarryWindow;
}(BaseCtrlWnd));
__reflect(MarryWindow.prototype, "MarryWindow");
//# sourceMappingURL=MarryWindow.js.map