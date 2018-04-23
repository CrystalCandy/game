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
var PetPokedexWindow = (function (_super) {
    __extends(PetPokedexWindow, _super);
    function PetPokedexWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetPokedexWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    PetPokedexWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["pet_wnd1"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 40, 52, group.width - 80, group.height - 168, group);
    };
    PetPokedexWindow.prototype.onUnLoad = function () {
    };
    PetPokedexWindow.prototype.onShow = function () {
        this.mElemList["pet_wnd1"].visible = true;
        this.refreshFrame();
    };
    PetPokedexWindow.prototype.onHide = function () {
        this.mElemList["pet_wnd1"].visible = false;
    };
    PetPokedexWindow.prototype.refreshFrame = function () {
        var group = this.mElemList["pet_wnd1"];
        var titleH = 75;
        var column = 5;
        for (var i in GameConfig.PetFunTipsConfig) {
            var v = GameConfig.PetFunTipsConfig[i];
            var row = Math.ceil(size_t(v.petList) / column);
            var w = group.width - 80;
            var h = titleH + 120 * row;
            var window_1 = this.scroll.getItemWindow(tonumber(i), w, h, 0, 0, 0);
            this.initItemWindow(window_1, row, column);
            this.refreshItemWindow(window_1, v, i, row, column);
        }
    };
    PetPokedexWindow.prototype.initItemWindow = function (window, row, column) {
        var name = window.name;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "wndBg_" + name, _a["image"] = "ty_uiDi02", _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "titleBg_" + name, _b["image"] = "ty_textDi02", _b["x"] = 15, _b["y"] = 15, _b["w"] = window.width - 30, _b["h"] = 50, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "title_" + name, _c["parent"] = "titleBg_" + name, _c["title"] = "", _c["font"] = "ht_24_lc", _c["color"] = gui.Color.white, _c["x"] = 10, _c["y"] = 8, _c["w"] = window.width - 50, _c["h"] = 30, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "obtain_" + name, _d["parent"] = "titleBg_" + name, _d["x"] = 10, _d["y"] = 10, _d["w"] = window.width - 50, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = eui.Group, _e["name"] = "petGroup_" + name, _e["x"] = 25, _e["y"] = 75, _e["w"] = 500, _e["h"] = window.height - 75, _e),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList["obtain_" + name].setAlignFlag(gui.Flag.RIGHT);
        var Info = [];
        var w = 100;
        var h = 120;
        for (var i = 0; i < row * column; i++) {
            JsUtil.arrayInstert(Info, (_f = {}, _f["index_type"] = eui.Group, _f["name"] = "pet_" + name + i, _f["parent"] = "petGroup_" + name, _f["x"] = i % column * 100, _f["y"] = Math.floor(i / column) * h, _f["w"] = w, _f["h"] = h, _f));
            //JsUtil.arrayInstert(Info, { ["index_type"]: gui.Grid9Image, ["name"]: "petIconBg_" + name + i, ["parent"]: "pet_" + name + i, ["image"]: "ty_zhuangBeiBg01", ["x"]: 10, ["y"]: 0, ["w"]: 80, ["h"]: 80, ["messageFlag"]: true })
            //JsUtil.arrayInstert(Info, { ["index_type"]: gui.Grid9Image, ["name"]: "petIcon_" + name + i, ["parent"]: "petIconBg_" + name + i, ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 80, ["h"]: 80 })
            JsUtil.arrayInstert(Info, (_g = {}, _g["index_type"] = gui.RichDisplayer, _g["name"] = "petName_" + name + i, _g["parent"] = "pet_" + name + i, _g["title"] = "", _g["font"] = "", _g["color"] = gui.Color.white, _g["x"] = 0, _g["y"] = h - 35, _g["w"] = w, _g["h"] = 30, _g));
        }
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        for (var i = 0; i < row * column; i++) {
            UiUtil.moveToBack(this.mElemList["petName_" + name + i]);
            this.mElemList["petBox_" + name + i] = UIPetBox.newObj(this.mLayoutNode, "petBox_" + name + i, 10, 0, this.mElemList["pet_" + name + i]);
        }
        var _a, _b, _c, _d, _e, _f, _g;
    };
    PetPokedexWindow.prototype.refreshItemWindow = function (window, data, index, row, column) {
        var name = window.name;
        this.mElemList["title_" + name].text = data.showTips;
        //更新获取途径
        var petList = data.petList;
        for (var i = 0; i < row * column; i++) {
            if (petList[i]) {
                var petId = petList[i];
                var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(petId);
                var quality = petConfigInfo.quality;
                var petName = petConfigInfo.name;
                this.mElemList["pet_" + name + i].visible = true;
                //更新petbox
                this.mElemList["petBox_" + name + i].updateByEntry(petId);
                this.mElemList["petBox_" + name + i].clear();
                //更新名字和颜色
                var color = GetQualityColorStr(quality);
                this.mElemList["petName_" + name + i].setAlignFlag(gui.Flag.H_CENTER);
                AddRdContent(this.mElemList["petName_" + name + i], petName, "ht_20_cc_stroke", color);
            }
            else {
                this.mElemList["pet_" + name + i].visible = false;
            }
        }
    };
    return PetPokedexWindow;
}(BaseCtrlWnd));
__reflect(PetPokedexWindow.prototype, "PetPokedexWindow");
//# sourceMappingURL=PetPokedexWindow.js.map