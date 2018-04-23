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
var EscortActionBox = (function (_super) {
    __extends(EscortActionBox, _super);
    function EscortActionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscortActionBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var w = 500;
        var h = 340;
        this.rootWnd = null;
        this.mElemList = {};
        var boxName = this.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = this.name, _a["title"] = "", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.white, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.rootWnd = this.mElemList[boxName];
        this.timerList = [];
        this.macheList = {};
        this.showActionList = {};
        this.startXlist = {};
        var _a;
    };
    EscortActionBox.prototype.destory = function () {
    };
    EscortActionBox.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    //重新刷新
    EscortActionBox.prototype.onRefreshShow = function (list) {
        for (var k in this.startXlist) {
            this.startXlist[k] == null;
        }
        this.onShowAction(list);
    };
    EscortActionBox.prototype.onShowAction = function (list) {
        this.macheList = {};
        for (var k = 0; k < 6; k++) {
            var posList = [2, 1, 3];
            var pos = posList[k] || posList[k - 3];
            this.createAction(k, pos);
            var name_1 = "action_" + k;
            this.mElemList[name_1].visible = false;
            if (this.timerList[k] != null) {
                KillTimer(this.timerList[k]);
                this.timerList[k] = null;
            }
            this.showActionList[k].stop();
        }
        for (var k = 0; k < size_t(list); k++) {
            var posList = [2, 1, 3];
            var pos = posList[k] || posList[k - 3];
            this.macheList[k] = list[k];
            this.refreshAction(k, pos, list[k]);
        }
    };
    EscortActionBox.prototype.createAction = function (k, pos) {
        var name = "action_" + k;
        if (this.mElemList[name] != null)
            return;
        var y = 120 * (pos - 1);
        var x = EscortActionBox.xPosList[k];
        var _this = this;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name, _a["title"] = "", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = y, _a["w"] = 200, _a["h"] = 120, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_sprite", _b["parent"] = name, _b["title"] = "", _b["iamge"] = "ty_uiDi02", _b["font"] = "ht_20_cc", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 200, _b["h"] = 120, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickAction, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_name", _c["parent"] = name, _c["title"] = "", _c["font"] = "ht_20_cc", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 80, _c["w"] = 200, _c["h"] = 20, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_time", _d["parent"] = name, _d["title"] = "", _d["font"] = "ht_20_cc", _d["color"] = gui.Color.lime, _d["x"] = 0, _d["y"] = 100, _d["w"] = 200, _d["h"] = 20, _d["messageFlag"] = true, _d),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, this.rootWnd);
        var data = (_e = {}, _e["startX"] = x, _e["startY"] = y, _e["endX"] = 560, _e["endY"] = y, _e["moveType"] = "inertional", _e);
        var time = (data.endX - data.startX) / 0.06;
        if (this.showActionList[k] == null) {
            var showAction = MoveAction.newObj(this.mElemList[name], time, data, function () {
                _this.recycleAction(k);
            }, this);
            this.showActionList[k] = showAction;
        }
        else {
            this.showActionList[k].Data = data;
        }
        this.showActionList[k].stop();
        var _a, _b, _c, _d, _e;
    };
    EscortActionBox.prototype.refreshAction = function (k, pos, config) {
        var name = "action_" + k;
        var _this = this;
        var x = EscortActionBox.xPosList[k];
        var desColorList = [
            gui.Color.white, gui.Color.lime, gui.Color.blue, gui.Color.purple, gui.Color.orange
        ];
        var color = desColorList[config.index - 1];
        this.mElemList[name + "_name"].textColor = color;
        this.mElemList[name + "_name"].text = config.name;
        if (_this.timerList[k] != null) {
            KillTimer(_this.timerList[k]);
            _this.timerList[k] = null;
        }
        if (this.timerList[k] == null) {
            this.timerList[k] = SetTimer(function () {
                var diff_time = config.time - GetServerTime();
                if (diff_time <= 0) {
                    _this.mElemList[name].visible = false;
                    _this.showActionList[k].stop();
                    _this.showActionList[k].startX = x;
                    if (_this.timerList[k] != null) {
                        KillTimer(_this.timerList[k]);
                        _this.timerList[k] = null;
                    }
                }
                else {
                    // _this.mElemList[name].visible = true
                    _this.mElemList[name + "_time"].text = getFormatDiffTimeSimple(diff_time);
                }
            }, this, 1000, true);
        }
        /*
                if(this.startXlist[k] != null){
                    if(this.mElemList[name].visible = false){
                        this.showActionList[k].startX = x
                    }else{
                        this.showActionList[k].startX = this.startXlist[k]
                    }
                }*/
        this.showActionList[k].startX = x;
        this.showActionList[k].endX = 560;
        this.showActionList[k].time = (this.showActionList[k].endX - this.showActionList[k].startX) / 0.06;
        this.showActionList[k].run();
        this.mElemList[name].visible = true;
        this.showActionList[k].run();
    };
    //跑完
    EscortActionBox.prototype.recycleAction = function (index) {
        var showAction = this.showActionList[index];
        var x = -200;
        showAction.startX = x;
        showAction.endX = 560;
        showAction.time = (showAction.endX - showAction.startX) / 0.06;
        showAction.run();
    };
    //点击马车
    EscortActionBox.prototype.onClickAction = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var config = this.macheList[index];
        if (config == null) {
            return;
        }
        var heroname = config.name;
        var selfName = GetHeroProperty("name");
        if (heroname == selfName) {
            MsgSystem.addTagTips(Localize_cns("ESCORT_BOX_TXT1"));
            return;
        }
        var wnd = WngMrg.getInstance().getWindow("InterceptTipsFrame");
        wnd.onShowWnd(config);
    };
    EscortActionBox.prototype.setVisibleFalse = function () {
        this.setVisible(false);
        this.boxStop();
    };
    EscortActionBox.prototype.setVisibleTrue = function () {
        this.setVisible(true);
        this.boxRun();
    };
    EscortActionBox.prototype.boxStop = function () {
        for (var k in this.showActionList) {
            var name_2 = "action_" + k;
            if (this.mElemList[name_2].visible = true) {
                this.startXlist[k] = this.mElemList[name_2].x;
            }
            else {
                this.startXlist[k] = null;
            }
            this.showActionList[k].stop();
        }
    };
    EscortActionBox.prototype.boxRun = function () {
        for (var k in this.showActionList) {
            if (this.mElemList["action_" + k].visible == true) {
                this.showActionList[k].run();
            }
        }
    };
    EscortActionBox.xPosList = [
        -200, -250, -300, -400, -450, -500,
    ];
    return EscortActionBox;
}(TClass));
__reflect(EscortActionBox.prototype, "EscortActionBox");
//# sourceMappingURL=EscortActionBox.js.map