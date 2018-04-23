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
var MainTaskWnd = (function (_super) {
    __extends(MainTaskWnd, _super);
    function MainTaskWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainTaskWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MainTaskWnd.prototype.onLoad = function () {
        this.createFrame();
    };
    MainTaskWnd.prototype.onUnLoad = function () {
    };
    MainTaskWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGame, this);
        RegisterEvent(EventDefine.TASK_UPDATELIST, this.refreshFrame, this);
        //this.requestMeiri = false;
        this.mElemList["task_wnd"].visible = true;
        this.refreshFrame();
    };
    MainTaskWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGame, this);
        UnRegisterEvent(EventDefine.TASK_UPDATELIST, this.refreshFrame, this);
        this.mElemList["task_wnd"].visible = false;
    };
    MainTaskWnd.prototype.refreshFrame = function () {
        this.refreshTaskToPannel();
    };
    MainTaskWnd.prototype._taskTraceListener = function (param, userData) {
        // let bFinish = param.AllFinish || false
        // let tType = TaskSystem.getInstance().getTaskType(param.taskId)
        var str = param.content || "";
        // let title = userData.title
        var rd = userData.rd;
        //奖励
        var taskId = param.taskId;
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        if (taskInfo) {
            var prizeName = "";
            var prizeCount = 0;
            for (var i in taskInfo.prize) {
                var prize = taskInfo.prize[i];
                if (prize[0] == "bindRmb") {
                    prizeName = ItemSystem.getInstance().getItemName(SpecailItemId.B_GOLD);
                    prizeCount = prize[1];
                    break;
                }
            }
            str = str + String.format(Localize_cns("TASK_PRIZE"), prizeName, prizeCount);
        }
        AddRdContent(rd, str, "ht_24_cc", "white", 5);
        if (param.link != null && param.link != "") {
            var elem = userData.elem;
            elem["link"] = param.link;
        }
    };
    MainTaskWnd.prototype.createFrame = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "task_pic", _a["messageFlag"] = true, _a),
            (_b = {}, _b["name"] = "task_rd", _b["messageFlag"] = true, _b),
            (_c = {}, _c["name"] = "task_wnd", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickTaskPannel, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c;
    };
    MainTaskWnd.prototype.onEnterGame = function () {
    };
    MainTaskWnd.prototype.refreshTaskToPannel = function () {
        var rd = this.mElemList["task_rd"];
        rd.clear();
        this.taskElem = {};
        var list = TaskSystem.getInstance().getSortTaskIdList();
        if (!list[0]) {
            AddRdContent(rd, Localize_cns("TASK_TXT3"), "ht_20_cc", "lime");
            //TLog.Warn("TaskTraceFrame.refreshFrame the sortTaskList is empty!")
            return;
        }
        var elem = table_copy(list[0]);
        this.taskElem = elem;
        if (elem["taskId"]) {
            var t = {};
            t.elem = elem;
            //t.title = title
            t.rd = rd;
            var listener = TaskExecutor.getInstance().getTraceListener(this._taskTraceListener, this, t);
            TaskExecutor.getInstance().executeTraceTask(elem["taskId"], listener);
        }
    };
    MainTaskWnd.prototype.onClickTaskPannel = function (event) {
        if (!this.taskElem || !this.taskElem["link"]) {
            TLog.Warn("TaskTraceFrame.onClickButton the taskElem is null!  %s", type(this.taskElem));
            return;
        }
        var link = this.taskElem["link"];
        TaskExecutor.getInstance().executeLink(link);
    };
    return MainTaskWnd;
}(BaseCtrlWnd));
__reflect(MainTaskWnd.prototype, "MainTaskWnd");
//# sourceMappingURL=MainTaskWnd.js.map