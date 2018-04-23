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
var tool;
(function (tool) {
    var FightTriggerFrame = (function (_super) {
        __extends(FightTriggerFrame, _super);
        function FightTriggerFrame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightTriggerFrame.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.mLayoutPaths = ["layouts/tool/FightTriggerLayout.exml"];
            this.mFightEditor = params[0];
            this.skillShow = {};
            this.curActionList = [];
            this.saveButtonList = [];
            this.saveLabelList = [];
            this.action2BtnMap = {};
        };
        FightTriggerFrame.prototype.onLoad = function () {
            this.mLayoutNode.skinName = this.mLayoutPaths[0];
            this.mLayoutNode.left = 0;
            this.mLayoutNode.bottom = 0;
            this.mLayoutNode.setCanDrag(true);
            var elemInfo = [
                (_a = {}, _a["name"] = "edit_skillid", _a["title"] = null, _a["color"] = gui.Color.black, _a["prompt"] = "技能ID", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
                (_b = {}, _b["name"] = "combox_skill", _b["title"] = null, _b["event_name"] = gui.ComboBox.onClick, _b["fun_index"] = this.onSelectIdDrop, _b),
                (_c = {}, _c["name"] = "btn_load", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickLoad, _c),
                (_d = {}, _d["name"] = "edit_skillname", _d["title"] = null, _d["color"] = gui.Color.black, _d["prompt"] = "技能名", _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
                (_e = {}, _e["name"] = "edit_time", _e["title"] = null, _e["color"] = gui.Color.black, _e["prompt"] = MaxShowTime + " ms", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
                (_f = {}, _f["name"] = "btn_action_1", _f["title"] = null, _f["event_name"] = egret.Event.CHANGE, _f["fun_index"] = this.onCheckActionList, _f["groupName"] = "action_group", _f),
                (_g = {}, _g["name"] = "btn_action_2", _g["title"] = null, _g["event_name"] = egret.Event.CHANGE, _g["fun_index"] = this.onCheckActionList, _g["groupName"] = "action_group", _g),
                (_h = {}, _h["name"] = "btn_action_3", _h["title"] = null, _h["event_name"] = egret.Event.CHANGE, _h["fun_index"] = this.onCheckActionList, _h["groupName"] = "action_group", _h),
                (_j = {}, _j["name"] = "btn_play", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onClickPlay, _j),
                (_k = {}, _k["name"] = "btn_save", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onClickSave, _k),
                (_l = {}, _l["name"] = "btn_add", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onAddAction, _l),
                (_m = {}, _m["name"] = "btn_remove", _m["title"] = null, _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.onRemoveAction, _m),
                (_o = {}, _o["name"] = "group_scroller", _o["title"] = null, _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = null, _o),
            ];
            UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
            this.mElemList["btn_action_1"].selected = true;
            this.initCombox(this.mElemList["combox_skill"]);
            this.initSelectIdDrop();
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        };
        FightTriggerFrame.prototype.initCombox = function (cb) {
            //设置标题
            cb.setTitleHeight(20);
            cb.setTitleBackground("titleBackground");
            cb.setTitleFontSize(20);
            cb.setItemWidth(cb.width);
            cb.setItemHeight(25);
            cb.setItemFontSize(18);
            cb.setTitle("");
        };
        FightTriggerFrame.prototype.initSelectIdDrop = function () {
            var data = [];
            var sort_keys = Object.keys(GameConfig.FightActionConfig).sort(function (a, b) {
                return tonumber(a) - tonumber(b);
            });
            sort_keys.forEach(function (key) {
                var v = GameConfig.FightActionConfig[key];
                data.push({ bg: "itemBg4", content: v.index + "_" + v.name });
            });
            var cb = this.mElemList["combox_skill"];
            cb.data = data;
        };
        FightTriggerFrame.prototype.onUnLoad = function () {
        };
        FightTriggerFrame.prototype.onShow = function () {
            this.mLayoutNode.visible = true;
            this.refreshBySkillIndex(-1);
        };
        FightTriggerFrame.prototype.onHide = function () {
            this.mLayoutNode.visible = false;
        };
        FightTriggerFrame.prototype.initAction = function (new_action) {
            new_action.action = "";
            new_action.name = "";
            new_action.during = 0;
            new_action.startTime = -1;
            new_action.startEvent = null; //{"action1", "attack"}
            new_action.finishEvent = null; //{"action1", "attack"}
            for (var i = 1; i <= ACTION_PARAM_COUNT; i++) {
                new_action["param" + i] = null;
            }
        };
        FightTriggerFrame.prototype.initSkillShow = function (skillShow, index, name, maxTime) {
            skillShow.index = index;
            skillShow.name = name;
            skillShow.maxTime = maxTime;
            skillShow.action_1 = [];
            skillShow.action_2 = [];
            skillShow.action_3 = [];
        };
        FightTriggerFrame.prototype.refreshBySkillIndex = function (index) {
            if (index < 0) {
                this.skillShow = {};
                this.initSkillShow(this.skillShow);
            }
            else {
                var skillShowConfig = GameConfig.FightActionConfig[index];
                if (skillShowConfig == null) {
                    MsgSystem.addTagTips(String.format("技能 :%s 不存在！", tostring(index)));
                    return;
                }
                //拷贝一份出来
                this.skillShow = JsUtil.objectCopy(skillShowConfig);
            }
            this.mElemList["edit_skillname"].text = this.skillShow.name || "";
            this.mElemList["edit_skillid"].text = checkNull(this.skillShow.index, "") + "";
            this.mElemList["edit_time"].text = this.skillShow.maxTime || "";
            this.curActionList = this.skillShow.action_1; //当前actionList
            this.curAction = null; //当前选中Action
            this.refresh(false);
        };
        FightTriggerFrame.prototype.getSaveButton = function () {
            for (var i = 0; i < this.saveButtonList.length; i++) {
                var v = this.saveButtonList[i];
                if (v.visible == false) {
                    //clear Event
                    v.labelColor = gui.Color.white;
                    v.visible = true;
                    return v;
                }
            }
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "button", _a["title"] = "", _a["image"] = "countbutton_default", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 0, _a["h"] = 0, _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, mElemList, this);
            var newBtn = mElemList["button"];
            this.saveButtonList.push(newBtn);
            return newBtn;
            var _a;
        };
        FightTriggerFrame.prototype.getSaveLabel = function () {
            for (var i = 0; i < this.saveLabelList.length; i++) {
                var v = this.saveLabelList[i];
                if (v.visible == false) {
                    v.visible = true;
                    return v;
                }
            }
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = eui.Label, _a["name"] = "label", _a["title"] = "", _a["image"] = "", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 0, _a["h"] = 0, _a["event_name"] = null, _a["fun_index"] = null, _a)
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, mElemList, this);
            var newLabel = mElemList["label"];
            this.saveLabelList.push(newLabel);
            return newLabel;
            var _a;
        };
        FightTriggerFrame.prototype.refresh = function (reorder) {
            if (reorder == null)
                reorder = true;
            for (var i = 0; i < this.saveButtonList.length; i++) {
                var btn = this.saveButtonList[i];
                btn.visible = false;
            }
            for (var i = 0; i < this.saveLabelList.length; i++) {
                var label = this.saveLabelList[i];
                label.visible = false;
            }
            this.action2BtnMap = {};
            if (reorder) {
                SortFightActionList(this.curActionList);
            }
            var timeStamp = -999;
            var startY = 0;
            var itemH = 30;
            //如果没有所选，则取第一个
            if (this.curAction == null) {
                this.curAction = this.curActionList[0];
            }
            var scrollView = this.mElemList["group_scroller"];
            for (var i = 0; i < this.curActionList.length; i++) {
                var action = this.curActionList[i];
                if (action.startTime != timeStamp) {
                    timeStamp = action.startTime;
                    var label = this.getSaveLabel();
                    label.text = timeStamp + "ms";
                    label.x = 0;
                    label.y = i * itemH;
                    label.width = 80;
                    label.height = itemH;
                    scrollView.addChild(label);
                }
                var actionTitle = GetActionTitleByType(action.action);
                if (!StringUtil.isEmpty(action.name)) {
                    actionTitle = action.name + actionTitle;
                }
                var button = this.getSaveButton();
                button.name = "action_" + i;
                button.label = actionTitle;
                button.x = 75;
                button.y = i * itemH;
                button.width = 130;
                button.height = itemH;
                button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAction, this);
                scrollView.addChild(button);
                if (this.curAction == action) {
                    button.labelColor = gui.Color.red;
                }
                this.action2BtnMap[action] = button;
            }
            // var w, h = scrollView:GetWidth(), scrollView:GetHeight()	
            // scrollView:SetViewWH(w, itemH * #this.curActionList)
            // if this.curAction then
            // 	var button = this.action2BtnMap[this.curAction]
            // 	scrollView:ScrollToXY(0, button:GetY(), true)
            // end
            if (this.curAction) {
                this.mFightEditor.actionEditor.showWnd();
                this.mFightEditor.actionEditor.doCommand("refreshWithData", this.curAction); //当前action
            }
            else {
                this.mFightEditor.actionEditor.hideWnd();
            }
        };
        FightTriggerFrame.prototype.createSkillShow = function (index) {
            var maxTime = tonumber(this.mElemList["edit_time"].text) || MaxShowTime;
            var name = this.mElemList["edit_skillname"].text;
            var skillShow = {};
            this.initSkillShow(skillShow, index, name, maxTime);
            skillShow.name = name;
            var bExsitPropertyAction = false;
            for (var i = 0; i < this.skillShow.action_1.length; i++) {
                var v = this.skillShow.action_1[i];
                if (!StringUtil.isEmpty(v.action)) {
                    skillShow.action_1.push(v);
                }
                if (v.action == "POWER") {
                    bExsitPropertyAction = true;
                }
            }
            for (var i = 0; i < this.skillShow.action_2.length; i++) {
                var v = this.skillShow.action_2[i];
                if (!StringUtil.isEmpty(v.action)) {
                    skillShow.action_2.push(v);
                }
                if (v.action == "POWER") {
                    bExsitPropertyAction = true;
                }
            }
            for (var i = 0; i < this.skillShow.action_3.length; i++) {
                var v = this.skillShow.action_3[i];
                if (!StringUtil.isEmpty(v.action)) {
                    skillShow.action_3.push(v);
                }
                if (v.action == "POWER") {
                    bExsitPropertyAction = true;
                }
            }
            if (skillShow.action_1.length == 0 &&
                skillShow.action_2.length == 0 &&
                skillShow.action_3.length == 0) {
                MsgSystem.addTagTips("技能表现没有动作!");
                return null;
            }
            if (bExsitPropertyAction == false) {
                MsgSystem.addTagTips("技能没有#yellow响应属性!");
                return null;
            }
            return skillShow;
        };
        ////////////////////////////////////////
        FightTriggerFrame.prototype.onSelectIdDrop = function (event) {
            var cb = this.mElemList["combox_skill"];
            var data = cb.data;
            //cb.setTitle(data[event.data.itemIndex].content ) ;
            //cb.hide();
            var value = data[event.data.itemIndex].content;
            var index = StringUtil.stringMatch(value, /(\d+)_.+/)[0];
            this.refreshBySkillIndex(tonumber(index) || 0);
        };
        FightTriggerFrame.prototype.onClickLoad = function (event) {
            var str = this.mElemList["edit_skillid"].text;
            if (str == "") {
                this.refreshBySkillIndex(-1);
                return;
            }
            var index = tonumber(str);
            if (index == null) {
                MsgSystem.addTagTips("请输入技能ID");
                return;
            }
            this.refreshBySkillIndex(index);
        };
        FightTriggerFrame.prototype.onClickPlay = function (event) {
            var skillShow = this.createSkillShow(0);
            if (skillShow == null) {
                return;
            }
            this.mFightEditor.testSkillShow(skillShow);
        };
        FightTriggerFrame.prototype.onClickSave = function (event) {
            var index = tonumber(this.mElemList["edit_skillid"].text);
            if (index == null) {
                MsgSystem.addTagTips("请输入技能ID");
                return;
            }
            var skillShow = this.createSkillShow(index);
            if (skillShow == null) {
                return;
            }
            //var skillShow = {}
            //skillShow[index] = skillShow
            //skillShow[89999] = skillShow
            GameConfig.FightActionConfig[index] = skillShow;
            //var jsonStr = JsUtil.JsonEncode(GameConfig.FightActionConfig);
            var jsonStr = tooljson.encode(GameConfig.FightActionConfig);
            //保存操作
            var blob = new Blob([jsonStr], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "fightAction.json");
            MsgSystem.confirmDialog_YES("保存成功!");
            this.initSelectIdDrop();
            //检查冗余
            this.checkSkillList();
        };
        FightTriggerFrame.prototype.isSkillClientNotExsit = function (skillId) {
            //return ServerSkillInfo[skillId] and not FightActionConfig[skillId]
        };
        FightTriggerFrame.prototype.checkSkillList = function () {
            // local list = {}
            // for _, v in pairs(ServerMonster) do
            // 	for i, skillId in pairs(v.SkillList) do
            // 		if self:isSkillClientNotExsit(skillId) then
            // 			table.insert(list, {v.Id, skillId})
            // 		end
            // 	end
            // 	if self:isSkillClientNotExsit(skillId) then
            // 		table.insert(list, {v.Id, v.OrdinarySkillId})
            // 	end
            // end
            // for _, v in pairs(PetConfig) do
            // 	for i, skillId in pairs(v.SkillList) do
            // 		if self:isSkillClientNotExsit(skillId) then
            // 			table.insert(list, {v.Id, skillId})
            // 		end
            // 	end
            // end
            // for _, v in pairs(list) do
            // 	Log.Warning(string.format(Localize_cns("FIGHT_NOT_EXSIT_SKILL_EDIT"), v[2], v[1]))
            // end
        };
        FightTriggerFrame.prototype.onCheckActionList = function (event) {
            var windowName = event.target.name;
            if (windowName == "btn_action_1") {
                this.curActionList = this.skillShow.action_1;
            }
            else if (windowName == "btn_action_2") {
                this.curActionList = this.skillShow.action_2;
            }
            else if (windowName == "btn_action_3") {
                this.curActionList = this.skillShow.action_3;
            }
            this.curAction = null;
            this.refresh(false);
        };
        FightTriggerFrame.prototype.onClickAction = function (event) {
            var name = event.target.name;
            var index = tonumber(StringUtil.stringMatch(name, /action_(\d+)/)[0]);
            var curAction = this.curActionList[index];
            TLog.Assert(curAction);
            if (this.curAction) {
                this.action2BtnMap[this.curAction].labelColor = gui.Color.white;
            }
            this.curAction = curAction;
            this.refresh(false);
        };
        FightTriggerFrame.prototype.onAddAction = function (event) {
            var new_action = {};
            this.initAction(new_action);
            this.curActionList.push(new_action);
            this.curAction = new_action;
            this.refresh();
        };
        FightTriggerFrame.prototype.onRemoveAction = function (event) {
            var _this = this;
            if (this.curAction == null) {
                //Log.Error("onRemoveAction this.curAction == null")
                return;
            }
            //删除了当前所选，会以上一个action做新的当前所选
            var lastAction = null;
            this.curActionList.forEach(function (v, i) {
                if (v == _this.curAction) {
                    _this.curActionList.splice(i, 1);
                    return true;
                }
                lastAction = v;
            });
            if (lastAction == null) {
                lastAction = this.curActionList[0];
            }
            this.curAction = lastAction;
            this.refresh();
        };
        return FightTriggerFrame;
    }(BaseWnd));
    tool.FightTriggerFrame = FightTriggerFrame;
    __reflect(FightTriggerFrame.prototype, "tool.FightTriggerFrame");
})(tool || (tool = {}));
//# sourceMappingURL=FightTriggerFrame.js.map