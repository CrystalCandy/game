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
var FaBaoQualityWindow = (function (_super) {
    __extends(FaBaoQualityWindow, _super);
    function FaBaoQualityWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaBaoQualityWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FaBaoQualityWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.scroll = this.mParentWnd.scroll;
    };
    FaBaoQualityWindow.prototype.onUnLoad = function () {
    };
    FaBaoQualityWindow.prototype.onShow = function () {
        this.onRefresh();
    };
    FaBaoQualityWindow.prototype.onHide = function () {
    };
    FaBaoQualityWindow.prototype.onRefresh = function () {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var nameList = [
            Localize_cns("FABAO_QUALITY_TXT1"), Localize_cns("FABAO_QUALITY_TXT2"), Localize_cns("FABAO_QUALITY_TITLE"),
        ];
        this.mElemList["title"].text = nameList[index];
        var qualitylist = [
            RoleSystem.FABAO_QUALITY_CHUANSHUO, RoleSystem.FABAO_QUALITY_WANMEI
        ];
        var list = [];
        var tempConfig = GameConfig.TalismanEquip;
        if (qualitylist[index] != null) {
            for (var k in tempConfig) {
                var entryId = tonumber(k);
                var quality = qualitylist[index];
                var itemInfo = {};
                itemInfo.entry = entryId;
                itemInfo.quality = quality;
                var item = Item.newObj(itemInfo);
                table_insert(list, item);
            }
        }
        else {
            for (var i = 1; i <= 6; i++) {
                if (table_isExsit(qualitylist, i))
                    continue;
                for (var k in tempConfig) {
                    var entryId = tonumber(k);
                    var quality = i;
                    var itemInfo = {};
                    itemInfo.entry = entryId;
                    itemInfo.quality = quality;
                    var item = Item.newObj(itemInfo);
                    table_insert(list, item);
                }
            }
            /*for(let k in tempConfig){
                for(let i = 1 ; i <= 6 ; i++){
                    if(table_isExsit(qualitylist, i)) continue
                    let entryId = tonumber(k)
                    let quality =  i
                    let itemInfo: any = {}
                    itemInfo.entry = entryId
                    itemInfo.quality = quality
                    let item = Item.newObj(itemInfo)
                    table_insert(list, item)
                }
            }
            table_sort(list, function(a, b){
                return a.getProperty("quality") - b.getProperty("quality")
            })*/
        }
        if (this.scroll == null)
            return;
        var scroll = this.scroll;
        var showList = splitListByCount(list, 2);
        scroll.clearItemList();
        this.controlData = {};
        for (var k = 1; k <= size_t(showList); k++) {
            var config = showList[k - 1];
            var window_1 = scroll.getItemWindow(k, 550, 102, 0, 0);
            this.initWindow(window_1);
            this.refreshWindow(window_1, config, k);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    FaBaoQualityWindow.prototype.initWindow = function (window) {
        var name = window.name;
        for (var k = 1; k <= 2; k++) {
            var x = 280 * (k - 1);
            var elemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_" + k + name, _a["title"] = "", _a["font"] = "ht_20_lc", _a["image"] = "", _a["color"] = gui.Color.ublack, _a["x"] = x, _a["y"] = 0, _a["w"] = 270, _a["h"] = 102, _a),
                (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg_" + k + name, _b["parent"] = "group_" + k + name, _b["title"] = "", _b["font"] = "ht_20_cc", _b["image"] = "ty_uiDi03", _b["x"] = 0, _b["y"] = 0, _b["w"] = 270, _b["h"] = 102, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Group, _c["name"] = "item_" + k + name, _c["parent"] = "group_" + k + name, _c["title"] = "", _c["font"] = "ht_20_lc", _c["image"] = "", _c["color"] = gui.Color.ublack, _c["x"] = 0, _c["y"] = 2, _c["w"] = 100, _c["h"] = 99, _c),
                (_d = {}, _d["index_type"] = eui.Image, _d["name"] = "bg_name_" + k + name, _d["parent"] = "group_" + k + name, _d["title"] = "", _d["font"] = "ht_20_cc", _d["image"] = "fb_faBaoTextDi02", _d["x"] = 107, _d["y"] = 12, _d["w"] = 157, _d["h"] = 39, _d["messageFlag"] = true, _d),
                (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "name_" + k + name, _e["parent"] = "bg_name_" + k + name, _e["title"] = "", _e["font"] = "ht_20_cc", _e["image"] = "", _e["color"] = gui.Color.green, _e["x"] = 0, _e["y"] = 10, _e["w"] = 157, _e["h"] = 20, _e["messageFlag"] = true, _e),
                (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "quality_" + k + name, _f["parent"] = "group_" + k + name, _f["title"] = "", _f["font"] = "ht_24_lc", _f["image"] = "", _f["color"] = gui.Color.blue, _f["x"] = 107, _f["y"] = 64, _f["w"] = 157, _f["h"] = 24, _f["messageFlag"] = true, _f),
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window);
            this.mElemList["quality_" + k + name].setAlignFlag(gui.Flag.CENTER_CENTER);
            this.mElemList["itemBox_" + k + name] = UIItemBox.newObj(this.mElemList, "itemBox_" + k + name, 0, 0, this.mElemList["item_" + k + name]);
            this.mElemList["itemBox_" + k + name].setItemTipsListner(this.onOpenTipsClick, this, k);
        }
        var _a, _b, _c, _d, _e, _f;
    };
    FaBaoQualityWindow.prototype.refreshWindow = function (window, config, index) {
        var name = window.name;
        for (var k = 1; k <= 2; k++) {
            var item = config[k - 1];
            if (item) {
                this.mElemList["group_" + k + name].visible = true;
                var dataKey = tostring(index) + k;
                this.controlData[dataKey] = item;
                var itemName = item.getName();
                var quality = item.getProperty("quality");
                var entryId = item.entryId;
                var fontColor = "#" + GetQualityColorStr(quality);
                var fontGUIColor = GetQualityGUIColor(quality);
                this.mElemList["name_" + k + name].textColor = fontGUIColor;
                this.mElemList["name_" + k + name].text = itemName;
                var qualityStr = Localize_cns("FABAO_QUALITY_TXT7") + fontColor + GetFaBaoQualityStr(quality);
                AddRdContent(this.mElemList["quality_" + k + name], qualityStr, "ht_20_cc", "black");
                this.mElemList["itemBox_" + k + name].updateByItem(item);
            }
            else {
                this.mElemList["group_" + k + name].visible = false;
            }
        }
    };
    //-----------
    FaBaoQualityWindow.prototype.onOpenTipsClick = function (logicItem, userData, args) {
        var wnd = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame");
        wnd.onShowWnd(logicItem, false);
        return true;
    };
    return FaBaoQualityWindow;
}(BaseCtrlWnd));
__reflect(FaBaoQualityWindow.prototype, "FaBaoQualityWindow");
//# sourceMappingURL=FaBaoQualityWindow.js.map