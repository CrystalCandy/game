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
var UITabWndList = (function (_super) {
    __extends(UITabWndList, _super);
    function UITabWndList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITabWndList.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutNode = args[0];
        this.mElemList = args[1];
        this.subWndList = args[2]; // {name:tabName, wnd:wnd}
        TLog.Assert(Array.isArray(this.subWndList));
        var radioGroup = new eui.RadioButtonGroup;
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onTabSelected, this);
        for (var _a = 0, _b = this.subWndList; _a < _b.length; _a++) {
            var v = _b[_a];
            //TLog.Assert(v.wnd != null)
            var radioBtn = this.mElemList[v.name];
            radioBtn.group = radioGroup;
            radioBtn.value = v.name;
        }
        this.tabName = this.subWndList[0].name;
        this.mElemList[this.tabName].selected = true;
    };
    UITabWndList.prototype.destory = function () {
    };
    UITabWndList.prototype._getWndWithName = function (index) {
        for (var _i = 0, _a = this.subWndList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.name == index) {
                return v.wnd;
            }
        }
        return null;
    };
    UITabWndList.prototype._getSubWithName = function (index) {
        for (var _i = 0, _a = this.subWndList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.name == index) {
                return v;
            }
        }
        return null;
    };
    UITabWndList.prototype.onTabSelected = function (event) {
        var radioGroup = event.target;
        var radiobtn = radioGroup.selection;
        var name = radiobtn.name;
        var _a = CheckMainFrameFunction(name), enable = _a[0], tips = _a[1];
        if (!enable) {
            MsgSystem.addTagTips(tips);
            return;
        }
        var subInfo = this._getSubWithName(name);
        if (subInfo.check) {
            if (subInfo.check.call(subInfo.obj)) {
                this.changeTab(radiobtn.value);
            }
            else {
                this.changeTab(this.tabName);
            }
        }
        else {
            this.changeTab(radiobtn.value);
        }
        if (this.selectedCallbackObj) {
            this.selectedCallback.call(this.selectedCallbackObj, event);
        }
    };
    UITabWndList.prototype.setSelectedCallback = function (callback, obj) {
        this.selectedCallback = callback;
        this.selectedCallbackObj = obj;
    };
    ////////////////////公共接口///////////////////////////////
    UITabWndList.prototype.setTabVisible = function (numbIndex, b) {
        var info = this.subWndList[numbIndex];
        if (info) {
            var radioBtn = this.mElemList[info.name];
            UiUtil.setVisible(radioBtn, b, b);
        }
    };
    UITabWndList.prototype.setWndVisible = function (b) {
        var wnd = this._getWndWithName(this.tabName);
        if (wnd) {
            if (b) {
                this.mElemList[this.tabName].selected = true;
                wnd.showWnd();
            }
            else {
                wnd.hideWnd();
            }
        }
    };
    //radiobtn传入控件名
    UITabWndList.prototype.changeTab = function (index) {
        if (index == this.tabName && this.mElemList[this.tabName]) {
            this.mElemList[this.tabName].selected = true;
            return;
        }
        else if (index == this.tabName || this.mElemList[this.tabName] == null) {
            return;
        }
        var wnd = this._getWndWithName(this.tabName);
        this.mElemList[this.tabName].selected = false;
        if (wnd) {
            wnd.hideWnd();
        }
        this.tabName = index;
        this.mElemList[this.tabName].selected = true;
        wnd = this._getWndWithName(this.tabName);
        if (wnd) {
            wnd.showWnd();
        }
    };
    //数字索引，以0开头
    UITabWndList.prototype.changeTabWithIndex = function (numbIndex) {
        if (numbIndex < 0) {
            return;
        }
        var info = this.subWndList[numbIndex];
        if (info) {
            this.changeTab(info.name);
        }
    };
    UITabWndList.prototype.getTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.subWndList.length; i++) {
            var v = this.subWndList[i];
            if (v.name == this.tabName) {
                index = i;
                break;
            }
        }
        return index;
    };
    UITabWndList.prototype.getTabName = function () {
        return this.tabName;
    };
    UITabWndList.prototype.getWndWithIndex = function (numbIndex) {
        if (numbIndex < 0) {
            return;
        }
        var info = this.subWndList[numbIndex];
        if (info) {
            return this._getWndWithName(info.name);
        }
        return null;
    };
    UITabWndList.prototype.getCurrentWnd = function () {
        return this._getWndWithName(this.tabName);
    };
    return UITabWndList;
}(TClass));
__reflect(UITabWndList.prototype, "UITabWndList");
//# sourceMappingURL=UITabWndList.js.map