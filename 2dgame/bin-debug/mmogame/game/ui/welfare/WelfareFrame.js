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
var WelfareFrame = (function (_super) {
    __extends(WelfareFrame, _super);
    function WelfareFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WelfareFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/welfare/WelfareLobbyLayout.exml"];
        this.tabNum = 0;
        this.table_index = -1;
    };
    WelfareFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["wealfare_list"];
        this.btn_scroll = UIScrollList.newObj(this.mLayoutNode, "btn_scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        var _a, _b;
    };
    WelfareFrame.prototype.onUnLoad = function () {
    };
    WelfareFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.onRefresh();
        this.tabWndList.setWndVisible(true);
    };
    WelfareFrame.prototype.onHide = function () {
        this.tabNum = 0;
        this.table_index = -1;
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    WelfareFrame.prototype.onRefresh = function () {
        // if(this.table_index == -1){
        this.disposeData();
        // }
        var configNum = size_t(this.list);
        if (this.tabNum == configNum) {
            return;
        }
        this.tabNum = configNum;
        this.radio_data = [];
        this.tabWndList = null;
        this.btn_scroll.clearItemList();
        for (var i = 0; i < size_t(this.list); i++) {
            var v = this.list[i];
            var window_1 = this.btn_scroll.getItemWindow(v.index, 95, 117, 0, 0, 0);
            this.initItemWindow(window_1, v);
            this.refreshItemWindow(window_1, v);
        }
        // this.btn_scroll.refreshScroll()
        // this.btn_scroll.restoreViewXY() 
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, this.radio_data);
        //this.tabWndList.setSelectedCallback(this.test, this)
        //待优化
        this.mElemList["group_tab1"].visible = false;
        this.mElemList["group_tab2"].visible = false;
        this.mElemList["group_tab3"].visible = false;
        this.mElemList["group_tab4"].visible = false;
        this.mElemList["group_tab5"].visible = false;
        this.mElemList["group_tab6"].visible = false;
        var tabIndex = this.tabWndList.getTabIndex();
        if (tabIndex == 0) {
            this.mElemList["group_tab1"].visible = true;
        }
        this.onRefreshTab();
    };
    WelfareFrame.prototype.disposeData = function () {
        var config = [
            (_a = {}, _a["index"] = 0, _a["wnd"] = SignRewardWindow.newObj(this.mLayoutNode, this), _a["check"] = this.onTab1Click, _a["checkFunc"] = this.onSignCheckClick, _a["imageName"] = "fldt_Bt01", _a["imageDownName"] = "fldt_Bt01_down", _a),
            (_b = {}, _b["index"] = 1, _b["wnd"] = LevelRewardWindow.newObj(this.mLayoutNode, this), _b["check"] = this.onTab2Click, _b["checkFunc"] = this.onLevelCheckClick, _b["imageName"] = "fldt_Bt02", _b["imageDownName"] = "fldt_Bt02_down", _b),
            (_c = {}, _c["index"] = 2, _c["wnd"] = MonthCardWindow.newObj(this.mLayoutNode, this), _c["check"] = this.onTab3Click, _c["checkFunc"] = this.onMonthCheckClick, _c["imageName"] = "fldt_Bt03", _c["imageDownName"] = "fldt_Bt03_down", _c),
            (_d = {}, _d["index"] = 3, _d["wnd"] = WeekCardWindow.newObj(this.mLayoutNode, this), _d["check"] = this.onTab4Click, _d["checkFunc"] = this.onWeekCheckClick, _d["imageName"] = "fldt_Bt04", _d["imageDownName"] = "fldt_Bt04_down", _d),
            (_e = {}, _e["index"] = 4, _e["wnd"] = WelfareWindow.newObj(this.mLayoutNode, this), _e["check"] = this.onTab5Click, _e["checkFunc"] = this.onWelfareCheckClick, _e["imageName"] = "fldt_Bt05", _e["imageDownName"] = "fldt_Bt05_down", _e),
            (_f = {}, _f["index"] = 5, _f["wnd"] = KeyWindow.newObj(this.mLayoutNode, this), _f["check"] = this.onTab6Click, _f["checkFunc"] = this.onKeyCheckClick, _f["imageName"] = "fldt_Bt06", _f["imageDownName"] = "fldt_Bt06_down", _f),
        ];
        //这里检查一下是否有配置筛选了 有的话才更新
        var list = [];
        for (var i = 0; i < size_t(config); i++) {
            var info = config[i];
            var func = info.checkFunc;
            if (func) {
                if (func.call(WelfareFrame)) {
                    table_insert(list, info);
                }
            }
        }
        this.list = list;
        var _a, _b, _c, _d, _e, _f;
    };
    WelfareFrame.prototype.onRefreshTab = function () {
        if (this.tabWndList) {
            if (this.table_index != -1) {
                this.tabWndList.changeTabWithIndex(this.table_index);
                this.table_index = -1;
            }
        }
    };
    WelfareFrame.prototype.initItemWindow = function (window, data) {
        var name = window.name;
        var imageName = data.imageName;
        var imageDownName = data.imageDownName;
        var width = 100, height = 117;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = eui.RadioButton, _b["name"] = name + "group", _b["image"] = imageName, _b["font"] = "ht_20_cc_stroke", _b["image_down"] = imageDownName, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b["event_name"] = null, _b["fun_index"] = null, _b),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b;
    };
    WelfareFrame.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        data.name = name + "group";
        table_insert(this.radio_data, data);
    };
    WelfareFrame.prototype.onTab1Click = function () {
        return true;
    };
    WelfareFrame.prototype.onTab2Click = function () {
        return true;
    };
    WelfareFrame.prototype.onTab3Click = function () {
        return true;
    };
    //周卡
    WelfareFrame.prototype.onTab4Click = function () {
        var openTime = ActivitySystem.getInstance().getOpenTime();
        //let openTime = 1522289110
        var serverTime = GetServerTime();
        var time = openTime + 8 * 86400;
        var shengyuTime = time - serverTime;
        if (shengyuTime > 0) {
            MsgSystem.addTagTips(Localize_cns("WELFARE_TXT7"));
            return false;
        }
        // let day =  GetServerDay() || 0	//开服多少天
        // if(day<8){
        // 	return false
        // }
        return true;
    };
    //西游福利
    WelfareFrame.prototype.onTab5Click = function () {
        var openTime = ActivitySystem.getInstance().getOpenTime();
        var serverTime = GetServerTime();
        var time = openTime + 86400;
        var shengyuTime = time - serverTime;
        if (shengyuTime > 0) {
            MsgSystem.addTagTips(Localize_cns("WELFARE_TXT28"));
            return false;
        }
        // let day =  GetServerDay() || 0	//开服多少天
        // if(day<2){
        //	MsgSystem.addTagTips(Localize_cns("WELFARE_TXT28"))	
        // 	return false
        // }
        var curLevel = GetHeroProperty("level") || 0;
        if (curLevel < 80) {
            MsgSystem.addTagTips(Localize_cns("WELFARE_TXT8"));
            return false;
        }
        return true;
    };
    WelfareFrame.prototype.onTab6Click = function () {
        return true;
    };
    //检查功能是否开启
    WelfareFrame.prototype.onSignCheckClick = function () {
        return true;
    };
    WelfareFrame.prototype.onLevelCheckClick = function () {
        var curLevel = GetHeroProperty("level") || 0;
        var levelInfo = getSaveRecord(opSaveRecordKey.levelReward);
        var allGet = true; //是否全部已领取
        for (var _ in GameConfig.LevelRewardConfig) {
            var v = GameConfig.LevelRewardConfig[_];
            var needLevel = v.leve;
            if (levelInfo == null || levelInfo[needLevel] == null) {
                allGet = false;
                break;
            }
        }
        if (allGet) {
            return false;
        }
        return true;
    };
    WelfareFrame.prototype.onMonthCheckClick = function () {
        return true;
    };
    WelfareFrame.prototype.onWeekCheckClick = function () {
        return true;
    };
    WelfareFrame.prototype.onKeyCheckClick = function () {
        return true;
    };
    WelfareFrame.prototype.onWelfareCheckClick = function () {
        return true;
    };
    WelfareFrame.prototype.showWndWithTabName = function (index) {
        this.disposeData();
        var changeIndex = -1;
        for (var i = 0; i < size_t(this.list); i++) {
            if (this.list[i].index == index) {
                changeIndex = i;
            }
        }
        if (changeIndex != -1) {
            this.table_index = changeIndex;
        }
        this.showWnd();
    };
    return WelfareFrame;
}(BaseWnd));
__reflect(WelfareFrame.prototype, "WelfareFrame");
//# sourceMappingURL=WelfareFrame.js.map