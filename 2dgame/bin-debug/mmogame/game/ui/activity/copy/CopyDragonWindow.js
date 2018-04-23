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
var CopyDragonWindow = (function (_super) {
    __extends(CopyDragonWindow, _super);
    function CopyDragonWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyDragonWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.curChapter = 11;
        this.curOpenChapter = 12;
        this.curIndex = 0;
        this.beginIndex = 11;
        this.beginIndexEx = 10;
    };
    CopyDragonWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "longwang_copy1_gained", _a["messageFlag"] = true, _a),
            (_b = {}, _b["name"] = "longwang_copy2_gained", _b["messageFlag"] = true, _b),
            (_c = {}, _c["name"] = "longwang_copy3_gained", _c["messageFlag"] = true, _c),
            (_d = {}, _d["name"] = "longwang_copy4_gained", _d["messageFlag"] = true, _d),
            (_e = {}, _e["name"] = "longwang_copy5_gained", _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "longwang_copy6_gained", _f["messageFlag"] = true, _f),
            (_g = {}, _g["name"] = "longwang__baotu_gained1", _g["messageFlag"] = true, _g),
            (_h = {}, _h["name"] = "longwang__baotu_gained2", _h["messageFlag"] = true, _h),
            (_j = {}, _j["name"] = "longwang__baotu_gained3", _j["messageFlag"] = true, _j),
            (_k = {}, _k["name"] = "longwang_copy1_img", _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onClickCamp, _k),
            (_l = {}, _l["name"] = "longwang_copy2_img", _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onClickCamp, _l),
            (_m = {}, _m["name"] = "longwang_copy3_img", _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.onClickCamp, _m),
            (_o = {}, _o["name"] = "longwang_copy4_img", _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = this.onClickCamp, _o),
            (_p = {}, _p["name"] = "longwang_copy5_img", _p["event_name"] = egret.TouchEvent.TOUCH_TAP, _p["fun_index"] = this.onClickCamp, _p),
            (_q = {}, _q["name"] = "longwang_copy6_img", _q["event_name"] = egret.TouchEvent.TOUCH_TAP, _q["fun_index"] = this.onClickCamp, _q),
            (_r = {}, _r["name"] = "longwang_pre", _r["event_name"] = egret.TouchEvent.TOUCH_TAP, _r["fun_index"] = this.onClickPre, _r),
            (_s = {}, _s["name"] = "longwang_next", _s["event_name"] = egret.TouchEvent.TOUCH_TAP, _s["fun_index"] = this.onClickNext, _s),
            (_t = {}, _t["name"] = "longwang_wabao", _t["event_name"] = egret.TouchEvent.TOUCH_TAP, _t["fun_index"] = this.onClickFight, _t),
            (_u = {}, _u["name"] = "longwang_baotu_btn1", _u["event_name"] = egret.TouchEvent.TOUCH_TAP, _u["fun_index"] = this.onClickStarPrize, _u),
            (_v = {}, _v["name"] = "longwang_baotu_btn2", _v["event_name"] = egret.TouchEvent.TOUCH_TAP, _v["fun_index"] = this.onClickStarPrize, _v),
            (_w = {}, _w["name"] = "longwang_baotu_btn3", _w["event_name"] = egret.TouchEvent.TOUCH_TAP, _w["fun_index"] = this.onClickStarPrize, _w),
        ];
        for (var i = 1; i < 7; i++) {
            for (var j = 1; j < 3; j++) {
                table_insert(elemInfo, (_x = {}, _x["name"] = "longwang_copy" + i + "_starBg" + j, _x["messageFlag"] = true, _x));
                table_insert(elemInfo, (_y = {}, _y["name"] = "longwang_copy" + i + "_star" + j, _y["messageFlag"] = true, _y));
            }
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //首通奖励
        for (var i = 0; i < 2; i++) {
            this.mElemList["firstPassItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "firstPassItemBox" + i, 70 + 85 * i, 10, this.mElemList["longwang_pirze_group"]);
            var elemInfo_1 = [
                (_z = {}, _z["index_type"] = eui.Image, _z["name"] = "firstPass_gained" + i, _z["title"] = null, _z["font"] = null, _z["image"] = "ty_text02", _z["autoScale"] = true, _z["color"] = gui.Color.white, _z["x"] = -5, _z["y"] = 50, _z["w"] = 0, _z["h"] = 0, _z["messageFlag"] = true, _z),
            ];
            this.mElemList["firstPassItemBox" + i].createElem(elemInfo_1, this.mElemList, this);
        }
        //通关奖励
        for (var i = 0; i < 3; i++) {
            this.mElemList["passItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "passItemBox" + i, 310 + 82 * i, 10, this.mElemList["longwang_pirze_group"]);
            var elemInfo_2 = [
                (_0 = {}, _0["index_type"] = eui.Image, _0["name"] = "pass_gained" + i, _0["title"] = null, _0["font"] = null, _0["image"] = "ty_text02", _0["autoScale"] = true, _0["color"] = gui.Color.white, _0["x"] = -5, _0["y"] = 50, _0["w"] = 0, _0["h"] = 0, _0["messageFlag"] = true, _0),
            ];
            this.mElemList["passItemBox" + i].createElem(elemInfo_2, this.mElemList, this);
        }
        var elemInfo1 = [
            (_1 = {}, _1["index_type"] = gui.ProgressBar, _1["name"] = "longwang_star_imb", _1["parent"] = "longwang_pro_group", _1["font"] = null, _1["image"] = "fb_loadingDi01", _1["thumbImage"] = "fb_loading01", _1["color"] = gui.Color.white, _1["x"] = 20, _1["y"] = 10, _1["w"] = 402, _1["h"] = 30, _1),
        ];
        UiUtil.createElem(elemInfo1, this.mLayoutNode, this.mElemList, this);
        var imb = this.mElemList["longwang_star_imb"];
        UiUtil.updateProgress(imb, 50, 100);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    };
    CopyDragonWindow.prototype.onUnLoad = function () {
    };
    CopyDragonWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["longwang_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT2");
        this.refreshFrame();
        this.applyActInfo();
    };
    CopyDragonWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["longwang_group"].visible = false;
    };
    CopyDragonWindow.prototype.refreshFrame = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss);
        // {
        //         maxIndex: 最新通关关卡
        //         npcList: {[npcIndex]=value}  --这个是每一关的情况（是否领取奖励，评星） opDragonBossIndexConfig
        //         stageList: {[charpterIndex] = value}  --这个是每章节的情况，领取了那种累星奖励 opDragonBossChapterConfig
        // }
        if (!actInfo || !actInfo.npcList) {
            return;
        }
        var list = [];
        this.curOpenChapter = this.curChapter;
        var lastOpenChatper = true; //可预览的最新章节是否已互到最后一章
        for (var _ in GameConfig.CopyDragonConfig) {
            var config_1 = GameConfig.CopyDragonConfig[_];
            if (config_1.chapter == this.curChapter) {
                table_insert(list, config_1);
            }
            var maxIndex = actInfo.maxIndex == 0 ? this.beginIndex : actInfo.maxIndex;
            if (config_1.index <= maxIndex + 6) {
                if (config_1.chapter > this.curOpenChapter) {
                    this.curOpenChapter = config_1.chapter;
                }
            }
            else {
                lastOpenChatper = false;
            }
        }
        table_sort(list, function (a, b) { return a.index - b.index; });
        this.controlDataTable = {};
        var config = list[this.curIndex];
        var sumStar = 0;
        for (var i = 0; i < 6; i++) {
            if (list[i]) {
                this.mElemList["longwang_copy" + (i + 1)].visible = true;
                this.mElemList["longwang_copy" + (i + 1) + "_check"].visible = (this.curIndex == i);
                this.mElemList["longwang_copy" + (i + 1) + "_gained"].visible = false;
                for (var j = 0; j < 3; j++) {
                    this.mElemList["longwang_copy" + (i + 1) + "_star" + (j + 1)].visible = false;
                }
                var v = list[i];
                if (actInfo.npcList[v.index]) {
                    if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.getPrize) == opDragonBossIndexConfig.getPrize) {
                        this.mElemList["longwang_copy" + (i + 1) + "_gained"].visible = true;
                    }
                    var starCount = 0;
                    if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.oneStar) == opDragonBossIndexConfig.oneStar) {
                        starCount = 1;
                    }
                    else if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.twoStar) == opDragonBossIndexConfig.twoStar) {
                        starCount = 2;
                    }
                    else if ((actInfo.npcList[v.index] & opDragonBossIndexConfig.threeStar) == opDragonBossIndexConfig.threeStar) {
                        starCount = 3;
                    }
                    for (var j = 0; j < starCount; j++) {
                        this.mElemList["longwang_copy" + (i + 1) + "_star" + (j + 1)].visible = true;
                    }
                    sumStar = sumStar + starCount;
                }
                this.controlDataTable["longwang_copy" + (i + 1) + "_img"] = i;
            }
            else {
                this.mElemList["longwang_copy" + (i + 1)].visible = false;
            }
        }
        if (!config) {
            return;
        }
        this.controlDataTable["longwang_wabao"] = config;
        //章节名称
        this.mElemList["longwang_copy_name"].text = config.chapterName;
        AddRdContent(this.mElemList["longwang_copy_starRd"], "#STAR" + sumStar + "/" + 3 * list.length, "ht_20_cc_stroke", "white");
        this.mElemList["longwang_cur"].text = String.format(Localize_cns("COPY_TXT17"), config.index - this.beginIndexEx);
        //首通奖励
        for (var i = 0; i < 2; i++) {
            if (config.showFirstItem[i] == null) {
                this.mElemList["firstPassItemBox" + i].setVisible(false);
            }
            else {
                var _a = config.showFirstItem[i], entryId = _a[0], count = _a[1];
                this.mElemList["firstPassItemBox" + i].setVisible(true);
                this.mElemList["firstPassItemBox" + i].updateByEntry(entryId, count);
                this.mElemList["firstPass_gained" + i].visible = false;
                if (actInfo.npcList[config.index]) {
                    if ((actInfo.npcList[config.index] & opDragonBossIndexConfig.oneStar) == opDragonBossIndexConfig.oneStar
                        || (actInfo.npcList[config.index] & opDragonBossIndexConfig.twoStar) == opDragonBossIndexConfig.twoStar
                        || (actInfo.npcList[config.index] & opDragonBossIndexConfig.threeStar) == opDragonBossIndexConfig.threeStar) {
                        this.mElemList["firstPass_gained" + i].visible = true;
                    }
                }
            }
        }
        //通关奖励
        for (var i = 0; i < 3; i++) {
            if (config.showPassItem[i] == null) {
                this.mElemList["passItemBox" + i].setVisible(false);
            }
            else {
                var _b = config.showPassItem[i], entryId = _b[0], count = _b[1];
                this.mElemList["passItemBox" + i].setVisible(true);
                this.mElemList["passItemBox" + i].updateByEntry(entryId, count);
                this.mElemList["pass_gained" + i].visible = false;
                if (actInfo.npcList[config.index]) {
                    if ((actInfo.npcList[config.index] & opDragonBossIndexConfig.getPrize) == opDragonBossIndexConfig.getPrize) {
                        this.mElemList["pass_gained" + i].visible = true;
                    }
                }
            }
        }
        //星级宝图
        for (var i = 1; i <= 3; i++) {
            this.mElemList["longwang_baotu_group" + i].visible = false;
        }
        var index = 0;
        var l = ["sixStar", "twelve", "eighteen"];
        var minStar = 0;
        for (var i = 1; i <= 3 * list.length; i++) {
            if (config.starPrize[i]) {
                index = index + 1;
                if (this.mElemList["longwang_baotu_group" + index]) {
                    this.mElemList["longwang_baotu_group" + index].visible = true;
                    // this.mElemList["longwang_baotu_group" + index].x = 86 + 394 / (3 * list.length) * (i - 1)
                    this.mElemList["longwang_baotu_star" + index].text = i;
                    this.mElemList["longwang__baotu_gained" + index].visible = false;
                    this.controlDataTable["longwang_baotu_btn" + index] = i;
                    if (actInfo.stageList[this.curChapter]) {
                        if ((actInfo.stageList[this.curChapter] & opDragonBossChapterConfig[l[index - 1]]) == opDragonBossChapterConfig[l[index - 1]]) {
                            this.mElemList["longwang__baotu_gained" + index].visible = true;
                        }
                    }
                    if (index == 1) {
                        minStar = i;
                    }
                }
            }
        }
        var imb = this.mElemList["longwang_star_imb"];
        UiUtil.updateProgress(imb, sumStar - minStar, 3 * list.length - minStar);
        //刷新箭头部分
        //章节索引从11开始
        this.mElemList["longwang_pre"].visible = false;
        this.mElemList["longwang_next"].visible = false;
        this.mElemList["longwang_next"].enabled = false;
        if (this.curChapter > this.beginIndex) {
            this.mElemList["longwang_pre"].visible = true;
        }
        if (lastOpenChatper == false) {
            this.mElemList["longwang_next"].visible = true;
            this.mElemList["longwang_next"].enabled = this.curChapter != this.curOpenChapter;
        }
        else {
            this.mElemList["longwang_next"].visible = false;
        }
    };
    CopyDragonWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    CopyDragonWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.DragonBoss);
    };
    ///////////////////////////////////////////////////////////////////////
    CopyDragonWindow.prototype.onClickCamp = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var index = this.controlDataTable[name];
        if (index == this.curIndex) {
            return;
        }
        this.curIndex = index;
        this.refreshFrame();
    };
    CopyDragonWindow.prototype.onClickPre = function (args) {
        if (this.curChapter - 1 < this.beginIndex) {
            return;
        }
        this.curChapter = this.curChapter - 1;
        this.curIndex = 0;
        this.refreshFrame();
    };
    CopyDragonWindow.prototype.onClickNext = function (args) {
        if (this.curChapter + 1 > this.curOpenChapter) {
            return;
        }
        this.curChapter = this.curChapter + 1;
        this.curIndex = 0;
        this.refreshFrame();
    };
    CopyDragonWindow.prototype.onClickFight = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var config = this.controlDataTable[name];
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss);
        // {
        //         maxIndex: 最新通关关卡
        //         npcList: {[npcIndex]=value}  --这个是每一关的情况（是否领取奖励，评星） opDragonBossIndexConfig
        //         stageList: {[charpterIndex] = value}  --这个是每章节的情况，领取了那种累星奖励 opDragonBossChapterConfig
        // }
        if (!actInfo || !actInfo.npcList) {
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
        if (actInfo.maxIndex == 0) {
            if (config.index == this.beginIndex) {
                RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.DragonBoss, config.index);
            }
            else {
                MsgSystem.addTagTips(String.format(Localize_cns("COPY_TXT18"), 1));
            }
        }
        else if (config.index > actInfo.maxIndex + 1) {
            MsgSystem.addTagTips(String.format(Localize_cns("COPY_TXT18"), actInfo.maxIndex + 1 - this.beginIndexEx));
        }
        else {
            RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.DragonBoss, config.index);
        }
    };
    CopyDragonWindow.prototype.onClickStarPrize = function (args) {
        var name = args.target.name;
        if (this.controlDataTable[name] == null) {
            return;
        }
        var starCount = this.controlDataTable[name];
        RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.DragonBoss, [this.curChapter, starCount]);
    };
    return CopyDragonWindow;
}(BaseCtrlWnd));
__reflect(CopyDragonWindow.prototype, "CopyDragonWindow");
//# sourceMappingURL=CopyDragonWindow.js.map