// TypeScript file
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
var TaskDialogFrame = (function (_super) {
    __extends(TaskDialogFrame, _super);
    function TaskDialogFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDialogFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/TaskDialogLayout.exml"];
    };
    TaskDialogFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        //this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickOption, this)
        var elemInfo = [];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorView", 0, 0, this.mElemList["group_actorview"]);
        this.actorView.setActorScale(1.2);
        // let player = this.actorView.updateByPlayer(3012)
        // player.setDir(ActorDirMap.Right);
    };
    TaskDialogFrame.prototype.onUnLoad = function () {
    };
    TaskDialogFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
    };
    TaskDialogFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
        this.mLayoutNode.visible = false;
        this.actorView.clearView();
    };
    TaskDialogFrame.prototype.updateDialog = function (sayerId, content, list, npcId, functionRef, obj) {
        TLog.Assert(list && list.length >= 1);
        //获得
        var data = { sayerId: sayerId, content: content, list: list, npcId: npcId, functionRef: functionRef, obj: obj };
        this.dialogData = data;
        this.showWnd();
        this.doCommand("refreshFrame");
    };
    TaskDialogFrame.prototype.refreshFrame = function () {
        var sayerId = this.dialogData.sayerId;
        var content = this.dialogData.content;
        var list = this.dialogData.list;
        var npcId = this.dialogData.npcId;
        if (sayerId == DIALOG_OBJECT_SELF) {
            this.mLayoutNode.currentState = "my";
            var player = this.actorView.updateByPlayer(GetHeroModel());
            player.setDir(ActorDirMap.Left);
        }
        else {
            var model = -1;
            var npc = ActorManager.getInstance().getNpc(npcId);
            if (npc) {
                model = npc.getProperty("image");
            }
            else {
                var npcRef = ActorManager.getInstance().getNpcRefWithEntryId(sayerId);
                if (npcRef == null) {
                    TLog.Error("TaskDialogFrame.refreshFrame npcRef == null id:%s", tostring(sayerId));
                    return;
                }
                model = npcRef.model;
            }
            var player = this.actorView.updateByPlayer(model);
            player.setDir(ActorDirMap.Right);
            this.mLayoutNode.currentState = list.length > 1 ? "option" : "other";
        }
        this.updateOption(list);
        var rd = this.mElemList["rd_content"];
        AddRdContent(rd, content, "ht_24_cc", "black", 2);
        // let rd: gui.RichDisplayer = this.mElemList["rd_content"]
        // AddRdContent(rd, content, "ht_30_cc", "black", 5)
        // //调整字体大小
        // let h = rd.getLogicHeight()
        // if (h > rd.height) {
        // 	AddRdContent(rd, content, "ht_24_cc", "black", 2)
        // }
        var h = rd.getLogicHeight();
        if (h > rd.height) {
            AddRdContent(rd, content, "ht_20_cc", "black", 2);
        }
    };
    TaskDialogFrame.prototype.initItemWindow = function (group) {
        var name = group.name;
        var w = group.width;
        var h = group.height;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = name + "_btn", _a["title"] = null, _a["font"] = null, _a["image"] = "rwdh_duiHuaAnNiu", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickOption, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = name + "_rd", _b["parent"] = name + "_btn", _b["title"] = null, _b["font"] = null, _b["image"] = "", _b["color"] = gui.Color.white, _b["x"] = 10, _b["y"] = 12, _b["w"] = w - 20, _b["h"] = 40, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, group);
        this.mElemList[name + "_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b;
    };
    TaskDialogFrame.prototype.refreshItemWindow = function (group, config) {
        var name = group.name;
        var content = XmlConverter.convertDynamicWord(config.title);
        AddRdContent(this.mElemList[name + "_rd"], content, "ht_24_cc_stroke", "white", 5);
        this.name2Data[name + "_btn"] = config.args;
    };
    TaskDialogFrame.prototype.updateOption = function (list) {
        this.name2Data = {};
        var length = list.length;
        if (length == 1) {
            this.name2Data[this.mLayoutNode.name] = list[0].args;
        }
        else if (length >= 1) {
            var w = 260, h = 50;
            var group = this.mElemList["group_btnlist"];
            group.removeChildren();
            for (var i = 0; i < list.length; i++) {
                var data = list[i];
                var subGroup = UiUtil.createGroup("group_option" + i, 270, 50, group);
                this.initItemWindow(subGroup);
                this.refreshItemWindow(subGroup, data);
            }
        }
    };
    TaskDialogFrame.prototype.clickOption = function (args) {
        if (this.dialogData == null || this.dialogData.functionRef == null) {
            return;
        }
        var functionRef = this.dialogData.functionRef;
        return functionRef.call(this.dialogData.obj, args);
    };
    TaskDialogFrame.prototype.onClickOption = function (event) {
        var args = this.name2Data[event.target.name];
        this.clickOption(args);
    };
    TaskDialogFrame.prototype.onMouseDown = function (event) {
        var args = this.name2Data[this.mLayoutNode.name];
        if (args == null)
            return;
        var target = event.touchEvent.target;
        var isExclude = UiUtil.isExcludeChild(target, [this.mElemList["group_btnlist"]]);
        if (!isExclude) {
            return;
        }
        this.clickOption(args);
    };
    return TaskDialogFrame;
}(BaseWnd));
__reflect(TaskDialogFrame.prototype, "TaskDialogFrame");
//# sourceMappingURL=TaskDialogFrame.js.map