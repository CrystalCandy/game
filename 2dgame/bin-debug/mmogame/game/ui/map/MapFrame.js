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
var MapFrame = (function (_super) {
    __extends(MapFrame, _super);
    function MapFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/map/MapLayout.exml"];
    };
    MapFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "touch_wnd", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onMouseUp, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.initMapWithConfig();
        var _a, _b;
    };
    MapFrame.prototype.initMapWithConfig = function () {
        var elemInfo = [];
        var config = GameConfig.MapEnterList;
        for (var i in config) {
            var info = config[i];
            JsUtil.arrayInstert(elemInfo, (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_" + i, _a["title"] = null, _a["parent"] = "map_wnd", _a["image"] = info.icon, _a["x"] = info.iconX, _a["y"] = info.iconY, _a["w"] = info.iconW, _a["h"] = info.iconH, _a));
            JsUtil.arrayInstert(elemInfo, (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "passIcon_" + i, _b["parent"] = "btn_" + i, _b["image"] = "sjdt_text01", _b["x"] = (info.iconW - 79) / 2, _b["y"] = (info.iconH - 29) / 2, _b["w"] = 79, _b["h"] = 29, _b["messageFlag"] = true, _b));
        }
        JsUtil.arrayInstert(elemInfo, (_c = {}, _c["index_type"] = eui.Group, _c["name"] = "head_group", _c["parent"] = "map_wnd", _c["x"] = 0, _c["y"] = 0, _c["w"] = 140, _c["h"] = 140, _c["messageFlag"] = true, _c));
        JsUtil.arrayInstert(elemInfo, (_d = {}, _d["index_type"] = eui.Image, _d["name"] = "head_bg", _d["parent"] = "head_group", _d["image"] = "ty_renWuKuang01", _d["x"] = 0, _d["y"] = 0, _d["w"] = 140, _d["h"] = 140, _d));
        JsUtil.arrayInstert(elemInfo, (_e = {}, _e["index_type"] = eui.Image, _e["name"] = "head_icon", _e["parent"] = "head_group", _e["image"] = "", _e["x"] = 0, _e["y"] = 0, _e["w"] = 140, _e["h"] = 140, _e));
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["head_group"];
        group.scaleX = 0.6;
        group.scaleY = 0.6;
        group.visible = false;
        this.headControl = group;
        this.mElemList["head_icon"].source = GetHeroIcon();
        for (var i in config) {
            var btn = this.mElemList["btn_" + i];
            btn.addEventListener(gui.TouchEvent.TOUCH_SHORT, this.onEnterMap, this);
        }
        var _a, _b, _c, _d, _e;
    };
    MapFrame.prototype.onUnLoad = function () {
    };
    MapFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    MapFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    MapFrame.prototype.refreshFrame = function () {
        var elemInfo = [];
        var config = GameConfig.MapEnterList;
        for (var i in config) {
            if (this.mElemList["passIcon_" + i]) {
                var mapIndex = tonumber(i);
                var curMapId = MapSystem.getInstance().getMapId();
                var curMapIndex = MapSystem.getInstance().getMapIndex(curMapId);
                if (curMapIndex > mapIndex) {
                    this.mElemList["passIcon_" + i].visible = true;
                }
                else if (curMapIndex == mapIndex) {
                    var btn = this.mElemList["btn_" + i];
                    UiUtil.setXY(this.headControl, btn.x, btn.y + btn.height / 2);
                    this.headControl.visible = true;
                    this.mElemList["passIcon_" + i].visible = false;
                }
                else {
                    this.mElemList["passIcon_" + i].visible = false;
                }
            }
        }
    };
    MapFrame.prototype.onMouseUp = function (args) {
        return this.hideWnd();
    };
    MapFrame.prototype.onEnterMap = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var info = GameConfig.MapEnterList[index];
        if (info == null) {
            return;
        }
        var mapName = info.inMapName;
        var mapIndex = info.index;
        var mapLv = info.level;
        var isTaskExsit = TaskSystem.getInstance().isTaskExsit(info.taskId);
        var heroLv = GetHeroProperty("level");
        var curMapId = MapSystem.getInstance().getMapId();
        var curMapIndex = MapSystem.getInstance().getMapIndex(curMapId);
        var curMapName = MapSystem.getInstance().getMapName(curMapId);
        if (curMapIndex > mapIndex) {
            MsgSystem.addTagTips(mapName + Localize_cns("MAP_TXT1"));
        }
        else if (curMapIndex == mapIndex) {
            MsgSystem.addTagTips(mapName + Localize_cns("MAP_TXT2"));
        }
        else if (curMapIndex < mapIndex) {
            if (isTaskExsit && heroLv >= mapLv) {
                RpcProxy.call("C2G_MAP_ENTER", info.index);
                this.hideWnd();
            }
            else {
                var oldMapName = GameConfig.MapEnterList[tonumber(index) - 1].inMapName;
                var str = String.format(Localize_cns("MAP_TXT3"), mapName, mapLv, oldMapName);
                MsgSystem.confirmDialog_YES(str);
            }
        }
    };
    return MapFrame;
}(BaseWnd));
__reflect(MapFrame.prototype, "MapFrame");
//# sourceMappingURL=MapFrame.js.map