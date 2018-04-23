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
/*
作者:
    yangguiming
    
创建时间：
   2017.02.4(周三)

意图：
   物品框通用控件
   
公共接口：
   
*/
var UIItemBox = (function (_super) {
    __extends(UIItemBox, _super);
    function UIItemBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIItemBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var scale = 1;
        var w = 80;
        var h = 80;
        if (args[5]) {
            scale = args[5];
            w = w * scale;
            h = h * scale;
        }
        this.rootWnd = null;
        var bgImg = "ty_zhuangBeiBg01";
        this.bEquipInfoShow = true;
        this.mElemList = {};
        var itemBoxName = this.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = itemBoxName, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = this.name + "item_bg", _b["parent"] = itemBoxName, _b["title"] = "", _b["font"] = "ht_24_cc", _b["image"] = bgImg, _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["event_name"] = gui.TouchEvent.TOUCH_SHORT, _b["fun_index"] = this.onOpenTips, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = this.name + "icon", _c["parent"] = itemBoxName, _c["title"] = "", _c["font"] = "ht_24_cc", _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = w, _c["h"] = h, _c["touchEnabled"] = false, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = this.name + "count", _d["parent"] = itemBoxName, _d["title"] = "", _d["font"] = "ht_13_rc_stroke", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = h - 21, _d["w"] = w - 5, _d["h"] = 18, _d["touchEnabled"] = false, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = this.name + "name", _e["parent"] = itemBoxName, _e["titile"] = "", _e["font"] = "ht_16_cc_stroke", _e["image"] = "", _e["color"] = gui.Color.white, _e["x"] = 8 * scale, _e["y"] = 53 * scale, _e["w"] = w - 8 * scale, _e["h"] = 30 * scale, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = this.name + "stage", _f["parent"] = itemBoxName, _f["title"] = "", _f["font"] = "ht_16_cc_stroke", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 8 * scale, _f["y"] = 6 * scale, _f["w"] = w - 8 * scale, _f["h"] = 30 * scale, _f["messageFlag"] = true, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.rootWnd = this.mElemList[itemBoxName];
        //装备
        this.mElemList[this.name + "name"].clear();
        this.mElemList[this.name + "stage"].clear();
        //逻辑数据
        this.bEnable = true;
        this.logicItem = null;
        this.enableIcon = true;
        this.needCount = null;
        this.frameList = null;
        this.isShowFrontFrame = false;
        var _a, _b, _c, _d, _e, _f;
    };
    UIItemBox.prototype.destory = function () {
    };
    UIItemBox.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    UIItemBox.prototype.setXY = function (x, y) {
        this.rootWnd.x = x;
        this.rootWnd.y = y;
    };
    UIItemBox.prototype.createElem = function (mElemInfo, mElemList, obj, parent) {
        UiUtil.createElem(mElemInfo, this.mParentNode, mElemList, obj, parent || this.rootWnd);
    };
    UIItemBox.prototype.updateByEntry = function (entryId, count, quality, addNum) {
        var itemRefInfo = ItemSystem.getInstance().getItemTemplateInfo(entryId);
        if (itemRefInfo == null) {
            this.updateByItem(null);
            return;
        }
        var item = Item.newObj();
        item.initWithRef(itemRefInfo);
        if (count != null && count >= 0) {
            item.propertyInfo.previewCount = count;
        }
        if (quality != null) {
            item.propertyInfo.quality = quality;
            item.id = entryId;
        }
        if (addNum != null) {
            item.propertyInfo.add_num = addNum;
        }
        this.updateByItem(item);
    };
    UIItemBox.prototype.updateByItem = function (itemInfo) {
        this.logicItem = itemInfo;
        this._updateInfo();
    };
    UIItemBox.prototype.updateByItemId = function (itemId) {
        this.logicItem = ItemSystem.getInstance().getItemLogicInfoByID(itemId);
        this._updateInfo();
    };
    UIItemBox.prototype.checkMaterialAndCash = function (materialInfo, needCash) {
        var bResult = true;
        for (var i in materialInfo) {
            var v = materialInfo[i];
            var entryId = v[0];
            var count = v[1];
            if (ItemSystem.getInstance().getItemCount(entryId) < count) {
                bResult = false;
                break;
            }
        }
        if (bResult) {
            var curCash = GetHeroProperty("funds") || 0;
            bResult = curCash >= needCash;
        }
        return bResult;
    };
    UIItemBox.prototype.setEquipInfoVisible = function (b) {
        this.bEquipInfoShow = b;
    };
    UIItemBox.prototype.refreshEquip = function () {
        var itemBGLabel = this.mElemList[this.name + "item_bg"]; //显示品质
        var itemIconLabel = this.mElemList[this.name + "icon"]; //显示图标
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        var isEquip = this.logicItem.isEquip();
        if (isEquip) {
            itemCountLabel.text = ("");
        }
        var bPreview = this.logicItem.id < 0;
        if (bPreview) {
            return;
        }
        if (isEquip) {
            if (this.bEquipInfoShow == false)
                return;
            this._updateEquipInfo();
        }
    };
    UIItemBox.prototype._updateInfo = function () {
        var itemBGLabel = this.mElemList[this.name + "item_bg"]; //显示品质
        var itemIconLabel = this.mElemList[this.name + "icon"]; //显示图标
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        UiUtil.grayComponent(itemIconLabel, false);
        itemIconLabel.enabled = (this.enableIcon);
        var entryId = null;
        if (this.logicItem) {
            entryId = this.logicItem.entryId;
        }
        if (entryId) {
            var iconName = GetItemIcon(entryId);
            var beiBaoCount = 0;
            if (this.logicItem && this.logicItem.id >= 0) {
                beiBaoCount = this.logicItem.getProperty("count");
            }
            var itemCount = this.logicItem.getProperty("previewCount");
            itemCount = itemCount ? itemCount : beiBaoCount;
            var quality = this.logicItem.getProperty("quality");
            var qualityImage = GetItemQualityImage(entryId, quality);
            itemBGLabel.source = (qualityImage);
            itemIconLabel.source = (iconName);
            itemCountLabel.text = (itemCount > 1 ? MakeLongNumberShort(itemCount) : "");
            this.refreshEquip();
        }
        else {
            var bgImage = this.bgImage || "ty_zhuangBeiBg01";
            itemBGLabel.source = (bgImage);
            itemIconLabel.source = ("");
            itemCountLabel.text = ("");
        }
    };
    UIItemBox.prototype._updateEquipInfo = function () {
        var nameRd = this.mElemList[this.name + "name"];
        var stageRd = this.mElemList[this.name + "stage"];
        var equipType = this.logicItem.getRefProperty("type");
        if (equipType == opItemType.COMMON_EQUIP) {
            var stage = this.logicItem.getRefProperty("uselevel");
            var name_1 = this.logicItem.getRefProperty("name");
            var level = this.logicItem.getProperty("add_num") || 1;
            AddRdContent(nameRd, name_1, "ht_16_cc_stroke", "white");
            AddRdContent(stageRd, "#yellow" + stage + Localize_cns("PET_TXT10") + "#orange+" + level, "ht_16_cc_stroke", "white");
        }
    };
    ////////////////////////////////////////////////////////////////////////
    //先调用update才能调用以下函数
    UIItemBox.prototype.setCount = function (itemCount) {
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        itemCountLabel.text = (itemCount);
        var color = gui.Color.white;
        itemCountLabel.textColor = color;
    };
    UIItemBox.prototype.setNeedCount = function (needCount) {
        if (this.logicItem == null) {
            return;
        }
        var entryId = this.logicItem.entryId;
        var itemCount = ItemSystem.getInstance().getItemCount(entryId);
        this.needCount = needCount;
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        itemCountLabel.text = (itemCount + "/" + this.needCount);
        var color = gui.Color.lime;
        if (itemCount < this.needCount) {
            color = gui.Color.white;
        }
        itemCountLabel.textColor = color;
    };
    UIItemBox.prototype.justSetNeedCount = function (needCount) {
        if (this.logicItem == null) {
            return;
        }
        var entryId = this.logicItem.entryId;
        var itemCount = ItemSystem.getInstance().getItemCount(entryId);
        this.needCount = needCount;
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        itemCountLabel.text = (this.needCount);
        var color = gui.Color.lime;
        if (itemCount < this.needCount) {
            color = gui.Color.white;
        }
        itemCountLabel.textColor = color;
    };
    UIItemBox.prototype.setItemTipsListner = function (func, obj, userData) {
        this.itemTipsFunc = func;
        this.itemTipsObj = obj;
        this.userData = userData;
    };
    UIItemBox.prototype.showEnable = function (b) {
        this.enableIcon = b;
    };
    UIItemBox.prototype.setItemHintEnable = function (b) {
        this.bEnable = b;
    };
    UIItemBox.prototype.setDefaulImage = function (imageName) {
        this.bgImage = imageName;
    };
    UIItemBox.prototype.setCountVisible = function (visible) {
        this.mElemList[this.name + "count"].visible = visible;
    };
    UIItemBox.prototype.setCountText = function (num, maxNum) {
        var text = num + "/" + maxNum;
        this.mElemList[this.name + "count"].text = text;
    };
    UIItemBox.prototype.resetFunEquip = function (index) {
        var itemBGLabel = this.mElemList[this.name + "item_bg"]; //显示品质
        var itemIconLabel = this.mElemList[this.name + "icon"]; //显示图标
        var itemCountLabel = this.mElemList[this.name + "count"]; //显示数量
        itemBGLabel.source = "ty_zhuangBeiBg01";
        itemIconLabel.source = "item_1000" + (tonumber(index) + 1);
        UiUtil.grayComponent(itemIconLabel, true);
        itemCountLabel.text = "";
        this.mElemList[this.name + "name"].clear();
        this.mElemList[this.name + "stage"].clear();
        this.itemTipsFunc = null;
        this.itemTipsObj = null;
        this.userData = null;
        this.logicItem = null;
    };
    ////////////////////////////////////////////////////////////////////////
    //物品提示
    UIItemBox.prototype.onOpenTips = function (args) {
        //是否弹获取途径
        if (this.logicItem) {
            var entryId = this.logicItem.entryId;
            var itemCount = ItemSystem.getInstance().getItemCount(entryId);
            //不足
            if (this.needCount && this.needCount > itemCount) {
                //道具获取途径
                var wnd = WngMrg.getInstance().getWindow("QuickGainFrame");
                var wndName = this.mParentNode.name;
                var frameList = [];
                if (this.frameList) {
                    frameList = this.frameList;
                }
                else {
                    frameList = [wndName];
                }
                var itemConfig = [["item", entryId], frameList];
                wnd.showQuickGainFrame(itemConfig);
                return;
            }
        }
        if (!this.bEnable) {
            return;
        }
        if (this.itemTipsFunc) {
            //返回true，表示拦截不查看物品信息
            if (this.itemTipsFunc.call(this.itemTipsObj, this.logicItem, this.userData, args)) {
                return;
            }
        }
        if (this.logicItem) {
            TLog.Debug("UIItemBox.onOpenTips", this.logicItem.id, this.logicItem.propertyInfo);
            ItemSystem.getInstance().showItemTips(this.logicItem);
        }
    };
    UIItemBox.prototype.setFrameList = function (frameList, isShowFrontFrame) {
        this.frameList = frameList;
        this.isShowFrontFrame = isShowFrontFrame || false;
    };
    return UIItemBox;
}(TClass));
__reflect(UIItemBox.prototype, "UIItemBox");
//# sourceMappingURL=UIItemBox.js.map