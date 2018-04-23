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
var CopyHeavenWindow = (function (_super) {
    __extends(CopyHeavenWindow, _super);
    function CopyHeavenWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyHeavenWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.curIndex = 11; //当前通关的层数
        this.boxConfigList = [];
        this.curBoxGroupIndex = -1;
        this.curBoxIndex = -1;
        this.maxIndex = 10;
    };
    CopyHeavenWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "tianting_onekey", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickOneKey, _a),
            (_b = {}, _b["name"] = "tianting_fight", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickFight, _b),
            (_c = {}, _c["name"] = "tianting_pre", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickPre, _c),
            (_d = {}, _d["name"] = "tianting_next", _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickNext, _d),
            (_e = {}, _e["name"] = "tianting_baotu_btn0", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickBaotu, _e),
            (_f = {}, _f["name"] = "tianting_baotu_gained0", _f["messageFlag"] = true, _f),
            (_g = {}, _g["name"] = "tianting_baotu_btn1", _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickBaotu, _g),
            (_h = {}, _h["name"] = "tianting_baotu_gained1", _h["messageFlag"] = true, _h),
            (_j = {}, _j["name"] = "tianting_baotu_btn2", _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onClickBaotu, _j),
            (_k = {}, _k["name"] = "tianting_baotu_gained2", _k["messageFlag"] = true, _k),
            (_l = {}, _l["name"] = "tianting_baotu_bam", _l["image"] = "fb_loadingDi01", _l["thumbImage"] = "fb_loading01", _l),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var txt = "";
        var colorList = ["#orange", "#magenta", "#cyan"];
        //通关奖励
        for (var i = 0; i < 3; i++) {
            this.mElemList["tianting_icon" + i] = UIActorView.newObj(this.mLayoutNode, "tianting_icon" + i, 40, 80, this.mElemList["tianting_mon_group" + i]);
            this.mElemList["tianting_icon" + i].updateByPlayer(20001);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    };
    CopyHeavenWindow.prototype.onUnLoad = function () {
    };
    CopyHeavenWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["tianting_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT23");
        this.refreshFrame();
        this.applyActInfo();
    };
    CopyHeavenWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["tianting_group"].visible = false;
        this.curBoxGroupIndex = -1;
        this.curBoxIndex = -1;
    };
    CopyHeavenWindow.prototype.refreshFrame = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial);
        // {
        //         currentIndex: 当前进度（已通关的）
        //         maxIndex: 历史最大进度
        //         boxIndex: 宝箱领取进度（已领取的）
        // }
        var curIndex = 10;
        if (actInfo && actInfo.currentIndex != null && actInfo.currentIndex > curIndex) {
            curIndex = actInfo.currentIndex;
        }
        this.curIndex = curIndex;
        var curBoxIndex = 10;
        if (actInfo && actInfo.boxIndex != null && actInfo.boxIndex > curBoxIndex) {
            curBoxIndex = actInfo.boxIndex;
        }
        this.curBoxIndex = curBoxIndex;
        var maxIndex = 10;
        if (actInfo && actInfo.maxIndex != null && actInfo.maxIndex > maxIndex) {
            maxIndex = actInfo.maxIndex;
        }
        this.maxIndex = maxIndex;
        if (GameConfig.CopyHeavenConfig[maxIndex]) {
            this.mElemList["tianting_max_layer"].text = String.format(Localize_cns("COPY_TXT24"), GameConfig.CopyHeavenConfig[maxIndex].layerIndex);
        }
        else {
            this.mElemList["tianting_max_layer"].text = String.format(Localize_cns("COPY_TXT24"), 0);
        }
        this.controlDataTable = {};
        var list = [];
        for (var k in GameConfig.CopyHeavenConfig) {
            var v = GameConfig.CopyHeavenConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.layerIndex - b.layerIndex; });
        var flag = false;
        var t = [];
        for (var i = 0; i < list.length; i++) {
            table_insert(t, list[i]);
            if (list[i].index == curIndex + 1) {
                flag = true;
            }
            if (t.length == 3) {
                if (flag == true) {
                    break;
                }
                t = [];
            }
        }
        if (flag == false) {
            this.curIndex = -1;
            this.mElemList["tianting_fight"].visible = false;
        }
        else {
            this.mElemList["tianting_fight"].visible = true;
        }
        //刷新层级显示
        for (var i = 0; i < 3; i++) {
            if (t[i]) {
                this.mElemList["tianting_layer_group" + i].visible = true;
                var config = t[i];
                var monsterModelId = GetMonsterModel(config.entryId);
                this.mElemList["tianting_icon" + i].updateByPlayer(monsterModelId);
                this.mElemList["tianting_layer_name" + i].text = config.layerName;
                this.mElemList["tianting_layer_pass" + i].visible = config.index <= curIndex;
                this.mElemList["tianting_layer_cur" + i].visible = config.index == curIndex + 1;
                this.mElemList["tianting_icon" + i].setVisible(config.index > curIndex);
                if (config.lines && config.lines != "") {
                    this.mElemList["tianting_content_group" + i].visible = true;
                    AddRdContent(this.mElemList["tianting_centent_rd"], config.lines, "ht_24_cc", "ublack", 5);
                }
                else {
                    this.mElemList["tianting_content_group" + i].visible = false;
                }
            }
            else {
                this.mElemList["tianting_layer_group" + i].visible = false;
            }
        }
        //初奴化this.boxConfigList
        this.boxConfigList = [];
        t = [];
        for (var i = 0; i < list.length; i++) {
            var v = list[i];
            if (size_t(v.box) > 0) {
                table_insert(t, v);
                if (this.curBoxGroupIndex < 0) {
                    if (curBoxIndex == v.index) {
                        this.curBoxGroupIndex = this.boxConfigList.length;
                    }
                }
                if (t.length >= 3) {
                    table_insert(this.boxConfigList, t);
                    t = [];
                }
            }
        }
        if (t.length > 0) {
            table_insert(this.boxConfigList, t);
        }
        this.refreshBoxPro();
    };
    CopyHeavenWindow.prototype.refreshBoxPro = function () {
        this.curBoxGroupIndex = MathUtil.clamp(this.curBoxGroupIndex, 0, this.boxConfigList.length - 1);
        var list = this.boxConfigList[this.curBoxGroupIndex];
        for (var i = 0; i < 3; i++) {
            var v = list[i];
            if (v) {
                this.mElemList["tianting_baotu_group" + i].visible = true;
                this.mElemList["tianting_baotu_layer" + i].text = String.format(Localize_cns("COPY_TXT24"), v.layerIndex);
                if (v.index <= this.maxIndex) {
                    this.mElemList["tianting_baotu_gained" + i].visible = true;
                    this.controlDataTable["tianting_baotu_btn" + i] = [0, v.index]; //0表示已领取
                }
                else {
                    if (v.index <= this.curIndex) {
                        this.controlDataTable["tianting_baotu_btn" + i] = [1, v.index]; //1表示可领取
                    }
                    else {
                        this.controlDataTable["tianting_baotu_btn" + i] = [2, v.index]; //2表示未领取
                    }
                    this.mElemList["tianting_baotu_gained" + i].visible = false;
                }
            }
            else {
                this.mElemList["tianting_baotu_group" + i].visible = false;
            }
        }
        var proMaxLayer = 9 * (this.curBoxGroupIndex + 1) + 2; //当前进度条表示的最大值
        var layerIndex = 0;
        if (GameConfig.CopyHeavenConfig[this.curIndex]) {
            layerIndex = GameConfig.CopyHeavenConfig[this.curIndex].layerIndex;
        }
        var imb = this.mElemList["tianting_baotu_bam"];
        UiUtil.updateProgress(imb, MathUtil.clamp(layerIndex - (proMaxLayer - 10), 0, 10), 10);
    };
    CopyHeavenWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    CopyHeavenWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.HeavenTrial);
    };
    ///////////////////////////////////////////////////////////////////////
    CopyHeavenWindow.prototype.onClickOneKey = function (args) {
        // RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.HeavenTrial, this.curIndex + 1)
    };
    CopyHeavenWindow.prototype.onClickFight = function (args) {
        if (CheckFightState() == true) {
            return;
        }
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.HeavenTrial, this.curIndex + 1);
    };
    CopyHeavenWindow.prototype.onClickPre = function (args) {
        this.curBoxGroupIndex = this.curBoxGroupIndex - 1;
        this.refreshBoxPro();
    };
    CopyHeavenWindow.prototype.onClickNext = function (args) {
        this.refreshBoxPro();
    };
    CopyHeavenWindow.prototype.onClickBaotu = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var _a = this.controlDataTable[name], oType = _a[0], index = _a[1];
        if (oType == 0) {
            return;
        }
        else if (oType == 1) {
            RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.HeavenTrial, [index]);
        }
        else {
            //弹出奖励预览界面
        }
    };
    return CopyHeavenWindow;
}(BaseCtrlWnd));
__reflect(CopyHeavenWindow.prototype, "CopyHeavenWindow");
//# sourceMappingURL=CopyHeavenWindow.js.map