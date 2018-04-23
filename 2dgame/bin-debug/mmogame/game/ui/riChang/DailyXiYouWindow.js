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
var DailyXiYouWindow = (function (_super) {
    __extends(DailyXiYouWindow, _super);
    function DailyXiYouWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyXiYouWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.select = -1;
        this.endIndex = -1;
        this.maxCount = -1;
    };
    DailyXiYouWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_upgrade", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUpClick, _a),
            (_b = {}, _b["name"] = "btn_find", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onFindBack, _b),
            (_c = {}, _c["name"] = "btn_left", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onLeftClick, _c),
            (_d = {}, _d["name"] = "btn_right", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onRightClick, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        this.mElemList["rd_hp"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_att"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_def"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_judge"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d;
    };
    DailyXiYouWindow.prototype.onUnLoad = function () {
    };
    DailyXiYouWindow.prototype.onShow = function () {
        this.mElemList["group_xiYou"].visible = true;
        //  this.mElemList["group_pro"].visible = false
        this.mElemList["title"].text = Localize_cns("DAILY_TXT4");
        //   this.mElemList["group_rd_1"].visible = false
        // this.mElemList["group_rd_2"].visible = true
        this.onRefresh();
        RpcProxy.call("C2G_XiyouLilian_Info");
    };
    DailyXiYouWindow.prototype.onHide = function () {
        this.mElemList["group_xiYou"].visible = false;
    };
    DailyXiYouWindow.prototype.updateWnd = function () {
        this.onRefresh();
    };
    DailyXiYouWindow.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo();
        if (size_t(actInfo) == 0)
            return;
        var level = actInfo.level || 0;
        this.mElemList["label_lv"].text = "Lv: " + level;
        var xiyouConfig = GameConfig.EveryDayLiLianUpConfig[level];
        var config = table_effect(xiyouConfig.effects);
        //属性显示 测试数据
        var hp = config.maxhp;
        var att = config.demage;
        var def = config.hujia;
        var hpStr = String.format(Localize_cns("DAILY_TXT5"), hp);
        AddRdContent(this.mElemList["rd_hp"], hpStr, "ht_20_cc");
        var attStr = String.format(Localize_cns("DAILY_TXT6"), att);
        AddRdContent(this.mElemList["rd_att"], attStr, "ht_20_cc");
        var defStr = String.format(Localize_cns("DAILY_TXT7"), def);
        AddRdContent(this.mElemList["rd_def"], defStr, "ht_20_cc");
        //战力
        var force = actInfo.force;
        this.refreshForceNum(force);
        //奖励
        var prizeList = AnalyPrizeFormat(xiyouConfig.prize);
        this.onRefreshPrize(prizeList);
        var curexp = actInfo.curexp || 0;
        var maxexp = xiyouConfig.exp;
        UiUtil.updateProgress(this.mElemList["xiyou_pro"], curexp, maxexp);
        this.mElemList["label_progress"].text = curexp + "/" + maxexp;
        var shapeConfig = GameConfig.DailyLiLianShapeConfig;
        this.endIndex = -1;
        for (var k in shapeConfig) {
            var shape = shapeConfig[k];
            if (shape.level > level) {
                if (this.endIndex == -1) {
                    this.endIndex = tonumber(k);
                }
            }
            if (this.maxCount <= tonumber(k)) {
                this.maxCount = tonumber(k);
            }
        }
        if (this.select == -1) {
            this.select = 1;
        }
        this.onRefreshChose();
        //
        this.refreshFrame();
    };
    DailyXiYouWindow.prototype.onRefreshPrize = function (list) {
        for (var i = 1; i <= size_t(list); i++) {
            if (!this.mElemList["xiYouPrizeBox" + i]) {
                this.mElemList["xiYouPrizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, "xiYouPrizeBox" + i, 0, 0, this.mElemList["group_prize"]);
            }
            var item = list[i - 1];
            this.mElemList["xiYouPrizeBox" + i].updateByEntry(item[0], item[1]);
        }
    };
    DailyXiYouWindow.prototype.refreshFrame = function () {
        var taskList = GetActivity(ActivityDefine.Boss).getXiYouTaskList(); //|| GameConfig.EveryDayLiLianTaskConfig
        if (size_t(taskList) == 0)
            return;
        var group = this.mElemList["group_scroll"];
        this.scroll.clearItemList();
        ///	let list = []
        for (var i = 0; i < size_t(taskList); i++) {
            var v = taskList[i];
            var window_1 = this.scroll.getItemWindow(i, group.width, 61, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll.refreshScroll();
    };
    DailyXiYouWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "groupTask_" + name, _a["title"] = null, _a["x"] = 0, _a["y"] = 7, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg_" + name, _b["parent"] = "groupTask_" + name, _b["title"] = null, _b["image"] = "ty_uiDi03", _b["x"] = 10, _b["y"] = 0, _b["w"] = w - 20, _b["h"] = h, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "name_" + name, _c["parent"] = "groupTask_" + name, _c["title"] = "", _c["font"] = "ht_20_cc", _c["image"] = "", _c["x"] = 0, _c["y"] = 0, _c["w"] = 147, _c["h"] = h, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "twice_" + name, _d["parent"] = "groupTask_" + name, _d["title"] = null, _d["image"] = "", _d["x"] = 147, _d["y"] = 0, _d["w"] = 123, _d["h"] = h, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "exp_" + name, _e["parent"] = "groupTask_" + name, _e["title"] = "", _e["font"] = "ht_20_cc", _e["image"] = "", _e["x"] = 270, _e["y"] = 0, _e["w"] = 147, _e["h"] = h, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "btn_" + name, _f["parent"] = "groupTask_" + name, _f["title"] = Localize_cns("TASK_PANEL_QIANWANG"), _f["font"] = "ht_20_cc_stroke", _f["color"] = gui.Color.white, _f["image"] = "ty_tongYongBt2", _f["x"] = 450, _f["y"] = 6, _f["w"] = 94, _f["h"] = 49, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onGotoClick, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = "finish_" + name, _g["parent"] = "groupTask_" + name, _g["title"] = Localize_cns("FINISHED"), _g["color"] = gui.Color.white, _g["font"] = "ht_20_cc", _g["image"] = "", _g["x"] = 450, _g["y"] = 15, _g["w"] = 94, _g["h"] = 30, _g),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList["twice_" + name].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["finish_" + name].visible = false;
        this.mElemList["btn_" + name].visible = false;
        var _a, _b, _c, _d, _e, _f, _g;
    };
    DailyXiYouWindow.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        //任务名字
        this.mElemList["name_" + name].text = data.name;
        //任务次数
        var twiceColor = "#red";
        if (data.curTwice >= data.maxCount) {
            twiceColor = "#green";
            this.mElemList["finish_" + name].visible = true;
        }
        else {
            this.mElemList["btn_" + name].visible = true;
        }
        var twice = data.curTwice || 0;
        AddRdContent(this.mElemList["twice_" + name], twiceColor + twice + "/" + data.maxCount, "ht_20_cc");
        //单次经验
        this.mElemList["exp_" + name].text = data.exp + Localize_cns("DAILY_LILIAN_TXT1");
    };
    ///换模型
    DailyXiYouWindow.prototype.onRefreshChose = function () {
        this.mElemList["btn_left"].visible = true;
        this.mElemList["btn_right"].visible = true;
        this.mElemList["image_yulan"].visible = false;
        this.mElemList["image_jiHuo"].visible = true;
        this.mElemList["rd_judge"].visible = false;
        var tempConfig = GameConfig.DailyLiLianShapeConfig[this.select];
        if (this.select == 1) {
            this.mElemList["btn_left"].visible = false;
        }
        if (this.endIndex != -1) {
            if (this.select == (this.endIndex - 1)) {
                this.mElemList["image_yulan"].visible = true;
            }
            if (this.select == this.endIndex) {
                this.mElemList["btn_right"].visible = false;
                this.mElemList["image_jiHuo"].visible = false;
                this.mElemList["rd_judge"].visible = true;
                var str = String.format(Localize_cns("DAILY_JIHUO"), tempConfig.level);
                AddRdContent(this.mElemList["rd_judge"], str, "ht_20_cc", "red");
            }
        }
        else {
            if (this.select == this.maxCount) {
                this.mElemList["btn_right"].visible = false;
            }
        }
        this.mElemList["shape_name"].text = tempConfig.name;
    };
    ///-- 战力
    DailyXiYouWindow.prototype.refreshForceNum = function (force) {
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["bImage"].endDraw();
    };
    ///------------响应事件
    DailyXiYouWindow.prototype.onUpClick = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo();
        var xiyouConfig = GameConfig.EveryDayLiLianUpConfig[actInfo.level];
        if (xiyouConfig == null)
            return;
        if (actInfo.curexp < xiyouConfig.exp)
            return;
        //发送升级协议
        RpcProxy.call("C2G_XiyouLilian_ActiveLevelUp");
    };
    DailyXiYouWindow.prototype.onGotoClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var taskList = GetActivity(ActivityDefine.Boss).getXiYouTaskList();
        var task = taskList[index];
        if (task == null)
            return;
        /*let wnd = WngMrg.getInstance().getWindow(task.finish[0])
        let tabIndex = task.finish[1]
 
        wnd.showWithIndex(tabIndex)*/
    };
    DailyXiYouWindow.prototype.onFindBack = function () {
        var wnd = WngMrg.getInstance().getWindow("DailyFindBackFrame");
        wnd.showWnd();
    };
    DailyXiYouWindow.prototype.onLeftClick = function () {
        if (this.select <= 1)
            return;
        this.select -= 1;
        this.onRefreshChose();
    };
    DailyXiYouWindow.prototype.onRightClick = function () {
        var endIndex = this.endIndex;
        if (endIndex == -1)
            endIndex = this.maxCount;
        if (this.select >= endIndex)
            return;
        this.select += 1;
        this.onRefreshChose();
    };
    return DailyXiYouWindow;
}(BaseCtrlWnd)); // TypeScript file
__reflect(DailyXiYouWindow.prototype, "DailyXiYouWindow");
//# sourceMappingURL=DailyXiYouWindow.js.map