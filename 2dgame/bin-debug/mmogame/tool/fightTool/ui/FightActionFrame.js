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
    var FightActionFrame = (function (_super) {
        __extends(FightActionFrame, _super);
        function FightActionFrame() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.showDropElem = function (index, elems, title) {
                var elem = this.dropList[index];
                if (!elem) {
                    var elemInfo = [
                        (_a = {}, _a["index_type"] = gui.ComboBox, _a["name"] = index, _a["title"] = "", _a["color"] = gui.Color.black, _a["x"] = 85, _a["y"] = this.actionWindowStartY + 40 * index, _a["w"] = 110, _a["h"] = 30, _a["event_name"] = gui.ComboBox.onClick, _a["fun_index"] = this.onElemDropClick, _a),
                        (_b = {}, _b["index_type"] = eui.EditableText, _b["name"] = "show_" + index, _b["title"] = null, _b["prompt"] = "右击下拉", _b["font"] = "ht_20_cc", _b["color"] = gui.Color.black, _b["x"] = 85, _b["y"] = this.actionWindowStartY + 40 * index, _b["w"] = 80, _b["h"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
                    ];
                    UiUtil.createElem(elemInfo, this.mLayoutNode, this.dropList, this, this.mElemList["group_scroller"]);
                    elem = this.dropList[index];
                }
                this.initCombox(elem);
                elem.visible = true;
                //elem.setTitle(title || "");
                this.dropList["show_" + index].visible = true;
                this.dropList["show_" + index].text = checkNull(title, "") + "";
                var data = [];
                JsUtil.objectForEach(elems, function (v) {
                    data.push({ bg: "itemBg4", content: v[0] });
                });
                elem.data = data;
                var _a, _b;
            };
            return _this;
        }
        FightActionFrame.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.mFightEditor = params[0];
            this.mLayoutPaths = ["layouts/tool/FightActionLayout.exml"];
            this.curAction = null;
            this.lableList = {};
            this.editList = {};
            this.dropList = {};
            this.buttonList = {};
        };
        FightActionFrame.prototype.onLoad = function () {
            this.mLayoutNode.skinName = this.mLayoutPaths[0];
            this.mLayoutNode.right = 0;
            this.mLayoutNode.bottom = 0;
            this.mLayoutNode.setCanDrag(true);
            var elemInfo = [
                (_a = {}, _a["name"] = "list_actionList", _a["title"] = null, _a["event_name"] = eui.ItemTapEvent.ITEM_TAP, _a["fun_index"] = this.onListBoxClick, _a),
                (_b = {}, _b["name"] = "group_scroller", _b["title"] = null, _b["event_name"] = eui.ItemTapEvent.ITEM_TAP, _b["fun_index"] = null, _b),
                (_c = {}, _c["name"] = "btn_play", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickPlay, _c),
                (_d = {}, _d["name"] = "btn_ok", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickOk, _d),
                (_e = {}, _e["name"] = "edit_startTime", _e["title"] = null, _e["color"] = gui.Color.black, _e["prompt"] = "开始时间", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
                (_f = {}, _f["name"] = "edit_during", _f["title"] = null, _f["color"] = gui.Color.black, _f["prompt"] = MaxActionTime + " ms", _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
                (_g = {}, _g["name"] = "edit_name", _g["title"] = null, _g["color"] = gui.Color.black, _g["prompt"] = "事件名", _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = null, _g),
                (_h = {}, _h["name"] = "edit_startevent_action", _h["title"] = null, _h["color"] = gui.Color.black, _h["prompt"] = "动作名", _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = null, _h),
                (_j = {}, _j["name"] = "edit_startevent_event", _j["title"] = null, _j["color"] = gui.Color.black, _j["prompt"] = "事件名", _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = null, _j),
                (_k = {}, _k["name"] = "edit_finishevent_action", _k["title"] = null, _k["color"] = gui.Color.black, _k["prompt"] = "动作名", _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = null, _k),
                (_l = {}, _l["name"] = "edit_finishevent_event", _l["title"] = null, _l["color"] = gui.Color.black, _l["prompt"] = "事件名", _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = null, _l),
            ];
            UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
            this.initListBox();
            this.actionWindowStartY = 215;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        };
        FightActionFrame.prototype.onUnLoad = function () {
        };
        FightActionFrame.prototype.onShow = function () {
            this.mLayoutNode.visible = true;
        };
        FightActionFrame.prototype.onHide = function () {
            this.mLayoutNode.visible = false;
            this.curAction = null;
        };
        FightActionFrame.prototype.initListBox = function () {
            var list = this.mElemList["list_actionList"];
            var data = [];
            FIGHT_ACTION_TYPE.forEach(function (v) {
                data.push(v[0]);
            });
            UiUtil.updateList(list, data);
        };
        //----------------------------------------------------------------------
        FightActionFrame.prototype.refreshWithData = function (actionData) {
            if (this.curAction == actionData) {
                return;
            }
            //this.effectViewer:hide()
            this.curAction = actionData;
            this.curTabActionName = null;
            if (actionData) {
                this.curTabActionName = actionData.action;
            }
            this.refresh();
        };
        FightActionFrame.prototype.resetElem = function () {
            JsUtil.objectForEach(this.lableList, function (v) {
                v.visible = false;
            });
            JsUtil.objectForEach(this.editList, function (v) {
                v.visible = false;
            });
            JsUtil.objectForEach(this.dropList, function (v) {
                v.visible = false;
            });
            JsUtil.objectForEach(this.buttonList, function (v) {
                v.visible = false;
            });
        };
        FightActionFrame.prototype.resetCommonProperty = function () {
            this.mElemList["edit_startTime"].text = "";
            this.mElemList["edit_during"].text = "";
            this.mElemList["edit_name"].text = "";
            this.mElemList["edit_startevent_action"].text = "";
            this.mElemList["edit_startevent_event"].text = "";
            this.mElemList["edit_finishevent_action"].text = "";
            this.mElemList["edit_finishevent_event"].text = "";
        };
        FightActionFrame.prototype.showLableElem = function (index, name) {
            var elem = this.lableList[index];
            if (!elem) {
                var elemInfo = [
                    (_a = {}, _a["index_type"] = eui.Label, _a["name"] = index, _a["title"] = name, _a["font"] = "ht_20_lc", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = this.actionWindowStartY + 40 * index, _a["w"] = 90, _a["h"] = 30, _a["event_name"] = null, _a["fun_index"] = null, _a),
                ];
                UiUtil.createElem(elemInfo, this.mLayoutNode, this.lableList, this, this.mElemList["group_scroller"]);
                elem = this.lableList[index];
            }
            elem.text = name + "";
            elem.visible = true;
            var _a;
        };
        FightActionFrame.prototype.showButtonElem = function (index, data) {
            var elem = this.buttonList[index];
            if (!elem) {
                var elemInfo = [
                    (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg_" + index, _a["title"] = null, _a["image"] = "titleBackground", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.black, _a["x"] = 85, _a["y"] = this.actionWindowStartY + 40 * index, _a["w"] = 100, _a["h"] = 30, _a["event_name"] = null, _a["fun_index"] = null, _a),
                    (_b = {}, _b["index_type"] = eui.EditableText, _b["name"] = "show_" + index, _b["title"] = "", _b["prompt"] = "特效输入", _b["font"] = "ht_20_cc", _b["scale_image"] = "frame_bg", _b["color"] = gui.Color.black, _b["x"] = 85, _b["y"] = this.actionWindowStartY + 40 * index, _b["w"] = 100, _b["h"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
                    (_c = {}, _c["index_type"] = gui.Button, _c["name"] = index, _c["title"] = "选择", _c["font"] = "ht_20_cc", _c["color"] = gui.Color.black, _c["image"] = "countbutton_default", _c["x"] = 145, _c["y"] = this.actionWindowStartY + 40 * index, _c["w"] = 60, _c["h"] = 30, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onElemButtonClick, _c),
                ];
                UiUtil.createElem(elemInfo, this.mLayoutNode, this.buttonList, this, this.mElemList["group_scroller"]);
                elem = this.buttonList[index];
            }
            this.buttonList["bg_" + index].visible = true;
            this.buttonList["show_" + index].visible = true;
            this.buttonList["show_" + index].text = checkNull(data, "") + "";
            elem.visible = true;
            var _a, _b, _c;
        };
        FightActionFrame.prototype.showEditElem = function (index, data) {
            var elem = this.editList[index];
            if (!elem) {
                var elemInfo = [
                    (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg_" + index, _a["title"] = null, _a["image"] = "titleBackground", _a["font"] = "ht_20_cc", _a["color"] = gui.Color.black, _a["x"] = 85, _a["y"] = this.actionWindowStartY + 40 * index, _a["w"] = 100, _a["h"] = 20, _a["event_name"] = null, _a["fun_index"] = null, _a),
                    (_b = {}, _b["index_type"] = eui.EditableText, _b["name"] = index, _b["title"] = null, _b["prompt"] = "请输入", _b["font"] = "ht_20_lc", _b["color"] = gui.Color.black, _b["x"] = 85, _b["y"] = this.actionWindowStartY + 40 * index, _b["w"] = 100, _b["h"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
                ];
                UiUtil.createElem(elemInfo, this.mLayoutNode, this.editList, this, this.mElemList["group_scroller"]);
                //ui_util.CreateCrossScaleImagePtr(this.editList["bg_"+index], "frame_bg", true)
                //this.editList["bg_"+index].SetMoveFrontPass(true)
                elem = this.editList[index];
            }
            this.editList["bg_" + index].visible = true;
            elem.visible = true;
            this.editList[index].text = checkNull(data, "") + "";
            var _a, _b;
        };
        FightActionFrame.prototype.initCombox = function (cb) {
            //设置标题
            cb.setTitleHeight(20);
            cb.setTitleBackground("titleBackground");
            cb.setTitleFontSize(20);
            cb.setItemWidth(cb.width);
            cb.setItemHeight(25);
            cb.setItemFontSize(18);
            cb.setTitle("");
        };
        FightActionFrame.prototype.refresh = function (byClick) {
            this.resetElem();
            this.resetCommonProperty();
            var list = this.mElemList["list_actionList"];
            if (this.curTabActionName == null || this.curTabActionName == "") {
                list.selectedIndex = -1;
                return;
            }
            //设置通用属性
            if (this.curAction && this.curTabActionName == this.curAction.action) {
                this.mElemList["edit_name"].text = (this.curAction.name);
                this.mElemList["edit_during"].text = (this.curAction.during || MaxActionTime);
                this.mElemList["edit_startTime"].text = (this.curAction.startTime + "");
                if (this.curAction.startEvent) {
                    this.mElemList["edit_startevent_action"].text = (this.curAction.startEvent[0]);
                    this.mElemList["edit_startevent_event"].text = (this.curAction.startEvent[1]);
                }
                if (this.curAction.finishEvent) {
                    this.mElemList["edit_finishevent_action"].text = (this.curAction.finishEvent[0]);
                    this.mElemList["edit_finishevent_event"].text = (this.curAction.finishEvent[1]);
                }
            }
            var index = -1;
            for (var k = 0; k < FIGHT_ACTION_TYPE.length; k++) {
                var v = FIGHT_ACTION_TYPE[k];
                if (v[1] == this.curTabActionName) {
                    index = k;
                    break;
                }
            }
            var actionTypeInfo = FIGHT_ACTION_TYPE[index];
            var elemName = actionTypeInfo[0];
            var actionElems = FIGHT_ACTION_ELEM[this.curTabActionName] || [];
            var dropElems = FIGHT_ACTION_DROPMENU[this.curTabActionName];
            var buttonElems = FIGHT_ACTION_BUTTON[this.curTabActionName];
            for (var i = 0; i < actionElems.length; i++) {
                var v_1 = actionElems[i];
                var data = null;
                if (this.curAction && this.curTabActionName == this.curAction.action) {
                    data = this.curAction["param" + (i + 1)];
                }
                data = tonumber(data) || data;
                //显示前缀
                this.showLableElem(i, v_1);
                //显示下拉框，或者编辑框
                if (dropElems && dropElems[i]) {
                    for (var k_1 = 0; k_1 < dropElems[i].length; k_1++) {
                        var v_2 = dropElems[i][k_1];
                        if (v_2[1] == data) {
                            data = v_2[0];
                            break;
                        }
                    }
                    this.showDropElem(i, dropElems[i], data);
                }
                else if (buttonElems && buttonElems[i]) {
                    for (var k_2 = 0; k_2 < buttonElems[i][0].length; k_2++) {
                        var v_3 = buttonElems[i][0][k_2];
                        if (v_3[1] == data) {
                            data = v_3[0];
                            break;
                        }
                    }
                    this.showButtonElem(i, data);
                }
                else {
                    this.showEditElem(i, data);
                }
            }
            //刷新scrollview
            if (!byClick) {
                var index = list.dataProvider.getItemIndex(elemName); //显示内容
                list.selectedIndex = index;
            }
        };
        FightActionFrame.prototype.getReallyData = function (list, data) {
            for (var i = 0; i < list.length; i++) {
                var v = list[i];
                if (v[0] == data) {
                    return v[1];
                }
            }
            return data;
        };
        //根据类型，下标获取控件数据
        FightActionFrame.prototype.getData = function (index, elemType) {
            if (this.editList[index] && this.editList[index].visible) {
                return this.editList[index].text;
            }
            else if (this.dropList[index] && this.dropList[index].visible) {
                //获取dropMenu数据
                var set = FIGHT_ACTION_DROPMENU[elemType];
                if (!set || !set[index]) {
                    return "";
                }
                var data = this.dropList["show_" + index].text;
                return this.getReallyData(set[index], data);
            }
            else if (this.buttonList["show_" + index] && this.buttonList["show_" + index].visible) {
                var info = FIGHT_ACTION_BUTTON[elemType];
                if (!info || !info[index]) {
                    return "";
                }
                var elemInfo = info[index];
                var set = elemInfo[0];
                var type = elemInfo[1];
                var data = this.buttonList["show_" + index].text;
                var realData = this.getReallyData(set, data);
                return realData;
            }
            else {
                return "";
            }
        };
        FightActionFrame.prototype.checkActionData = function (testAction) {
            if (testAction == null) {
                return false;
            }
            if (StringUtil.isEmpty(this.curTabActionName)) {
                MsgSystem.addTagTips("请选择动作类型");
                return false;
            }
            var startTime = tonumber(this.mElemList["edit_startTime"].text, -1);
            var startActionName = this.mElemList["edit_startevent_action"].text;
            var startEventName = this.mElemList["edit_startevent_event"].text;
            // if(startTime== null){
            // 	startTime = -1;
            // }
            if (startTime < 0 && StringUtil.isEmpty(startActionName) && StringUtil.isEmpty(startEventName)) {
                MsgSystem.addTagTips("请输入开始时间或者触发事件");
                return false;
            }
            var during = tonumber(this.mElemList["edit_during"].text) || MaxActionTime;
            if (during <= 0) {
                MsgSystem.addTagTips("时长必须大于0！");
                return false;
            }
            var finishActionName = this.mElemList["edit_finishevent_action"].text;
            var finishEventName = this.mElemList["edit_finishevent_event"].text;
            testAction.action = this.curTabActionName;
            testAction.name = this.mElemList["edit_name"].text;
            testAction.during = during;
            testAction.startTime = startTime;
            testAction.startEvent = null;
            if (startActionName != "" && startEventName != "") {
                testAction.startEvent = [startActionName, startEventName];
            }
            testAction.finishEvent = null;
            if (finishActionName != "" && finishEventName != "") {
                testAction.finishEvent = [finishActionName, finishEventName];
            }
            for (var i = 1; i <= ACTION_PARAM_COUNT; i++) {
                testAction["param" + i] = this.getData(i - 1, this.curTabActionName) || "";
            }
            return true;
        };
        //////////////////////////////////////////////////////////////////////////////
        FightActionFrame.prototype.onListBoxClick = function (e) {
            //egret.log(e.item, e.itemRenderer, e.itemIndex)
            var selectedIndex = e.itemIndex;
            if (selectedIndex >= 0) {
                var info = FIGHT_ACTION_TYPE[selectedIndex];
                this.curTabActionName = info[1];
                this.refresh(true);
            }
        };
        FightActionFrame.prototype.onElemButtonClick = function (event) {
            var num = event.target.name;
            num = tonumber(num);
            if (null == num) {
                return;
            }
            var buttonTypeInfo = FIGHT_ACTION_BUTTON[this.curTabActionName];
            if (buttonTypeInfo == null || buttonTypeInfo[num] == null) {
                return;
            }
            var type = buttonTypeInfo[num][1];
            var effectName = this.buttonList["show_" + num].text;
            //执行特效相应 
            if (type == FIGHT_ACTION_BUTTON_TYPE.EFFECTVIEW) {
                if (this.mFightEditor.effectEditor.isVisible() == false) {
                    this.mFightEditor.effectEditor.showWnd();
                    //this.mFightEditor.effectEditor.doCommand("setCallback", this, this.onEffectViewCallback, num);
                    this.mFightEditor.effectEditor.setCallback(this, this.onEffectViewCallback, num);
                    this.mFightEditor.effectEditor.doCommand("refreshWithEffectName", effectName);
                }
                else {
                    this.mFightEditor.effectEditor.hideWnd();
                }
                // if(this.effectViewer.visible == false){
                // 		this.effectViewer.show()
                // 		this.effectViewer.setCallback(this, this.onEffectViewCallback, num)
                // 		this.effectViewer.refreshWithEffectName(effectName)
                // 	}else{
                // 		this.effectViewer.hide()
                // 	}
            }
        };
        FightActionFrame.prototype.onEffectViewCallback = function (effectId, index) {
            var name = "";
            var effectRef = GameConfig.EffectConfig[effectId];
            if (effectRef) {
                name = effectRef.Name;
            }
            this.buttonList["show_" + index].text = name + "";
        };
        FightActionFrame.prototype.onClickPlay = function () {
            var testAction = {};
            if (!this.checkActionData(testAction)) {
                return;
            }
            //测试
            var during = tonumber(this.mElemList["edit_during"].text) || MaxActionTime;
            var skillShow = {};
            this.mFightEditor.triggerEditor.initSkillShow(skillShow, 0, "", during);
            skillShow.action_1.push(testAction);
            this.mFightEditor.testSkillShow(skillShow);
        };
        FightActionFrame.prototype.onClickOk = function () {
            if (this.checkActionData(this.curAction) == false) {
                return;
            }
            this.mFightEditor.triggerEditor.refresh();
            MsgSystem.addTagTips("更新成功，注意保存！");
        };
        FightActionFrame.prototype.onElemDropClick = function (event) {
            var cb = event.currentTarget;
            //cb.hide();
            var data = cb.data;
            var str = data[event.data.itemIndex].content;
            var num = tonumber(cb.name);
            if (null == num) {
                return;
            }
            this.dropList["show_" + num].text = str + "";
        };
        return FightActionFrame;
    }(BaseWnd));
    tool.FightActionFrame = FightActionFrame;
    __reflect(FightActionFrame.prototype, "tool.FightActionFrame");
})(tool || (tool = {}));
//# sourceMappingURL=FightActionFrame.js.map