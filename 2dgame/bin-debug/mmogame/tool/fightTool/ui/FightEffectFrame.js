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
    var FightEffectFrame = (function (_super) {
        __extends(FightEffectFrame, _super);
        function FightEffectFrame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightEffectFrame.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.mFightEditor = params[0];
            this.mLayoutPaths = ["layouts/tool/FightEffectLayout.exml"];
            this.effectEntry = -1;
        };
        FightEffectFrame.prototype.onLoad = function () {
            this.mLayoutNode.skinName = this.mLayoutPaths[0];
            this.mLayoutNode.right = 0;
            this.mLayoutNode.bottom = 0;
            var elemInfo = [
                (_a = {}, _a["name"] = "btn_cancle", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
                (_b = {}, _b["name"] = "btn_ok", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickOk, _b),
                (_c = {}, _c["name"] = "combox_selectModel", _c["title"] = null, _c["event_name"] = gui.ComboBox.onClick, _c["fun_index"] = this.onModelDrop, _c),
                (_d = {}, _d["name"] = "actorview_effect", _d["title"] = null, _d["event_name"] = gui.ComboBox.onClick, _d["fun_index"] = null, _d["touchEnabled"] = false, _d),
            ];
            UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
            this.initCombox(this.mElemList["combox_selectModel"]);
            this.initModelTypeDrop();
            var _a, _b, _c, _d;
        };
        FightEffectFrame.prototype.initModelTypeDrop = function () {
            var data = [];
            var sort_keys = Object.keys(GameConfig.EffectConfig).sort(function (a, b) {
                return tonumber(a) - tonumber(b);
            });
            sort_keys.forEach(function (key) {
                var v = GameConfig.EffectConfig[key];
                var modelpath = GameConfig.ModelConfig[v.model].modelpath;
                if (modelpath != "") {
                    data.push({ bg: "itemBg4", content: v.Name });
                }
            });
            var cb = this.mElemList["combox_selectModel"];
            cb.data = data;
            cb.setTitle("模型选择");
        };
        FightEffectFrame.prototype.onUnLoad = function () {
        };
        FightEffectFrame.prototype.onShow = function () {
            this.mLayoutNode.visible = true;
            if (this.effect == null) {
                this.effect = Effect.newObj();
                this.effect.enterViewer(this.mElemList["actorview_effect"]);
            }
            //this.effectEntry = 10006
            this.refresh();
        };
        FightEffectFrame.prototype.onHide = function () {
            this.mLayoutNode.visible = false;
            this.mLayoutNode.setCanDrag(true);
            if (this.effect) {
                this.effect.leaveViewer(this.mElemList["actorview_effect"]);
                this.effect.deleteObj();
                this.effect = null;
            }
            this.callbackObject = null;
            this.callbackFunc = null;
            this.callbackData = null;
            this.effectEntry = -1;
        };
        FightEffectFrame.prototype.initCombox = function (cb) {
            //设置标题
            cb.setTitleHeight(20);
            cb.setTitleBackground("titleBackground");
            cb.setTitleFontSize(20);
            cb.setItemWidth(cb.width);
            cb.setItemHeight(25);
            cb.setItemFontSize(18);
            cb.setTitle("");
        };
        //---------------------------------------------------------------
        FightEffectFrame.prototype.getEffectIdByName = function (name) {
            for (var k in GameConfig.EffectConfig) {
                var v = GameConfig.EffectConfig[k];
                if (v.Name == name) {
                    return v.Id;
                }
            }
            return -1;
        };
        FightEffectFrame.prototype.refreshWithEffectName = function (name) {
            this.effectEntry = this.getEffectIdByName(name);
            this.refresh();
        };
        FightEffectFrame.prototype.refresh = function () {
            var cb = this.mElemList["combox_selectModel"];
            if (this.effectEntry < 0) {
                cb.setTitle("模型选择");
                this.mElemList["actorview_effect"].visible = false;
                return;
            }
            var effectRef = GameConfig.EffectConfig[this.effectEntry];
            if (effectRef == null) {
                TLog.Error("FightEffectView %s not exsit", this.effectEntry);
                return;
            }
            cb.setTitle(effectRef.Name);
            this.effect.loadModel(effectRef.model);
            this.effect.changeAction(null);
            //this.effect.changeActionWithIndex(0, 1.0, true)
            this.mElemList["actorview_effect"].visible = (true);
        };
        //---------------------------------------------------------------
        FightEffectFrame.prototype.onModelDrop = function (event) {
            var str = event.data.content;
            this.refreshWithEffectName(str);
        };
        FightEffectFrame.prototype.onClickOk = function () {
            if (this.callbackFunc) {
                this.callbackFunc.call(this.callbackObject, this.effectEntry, this.callbackData);
            }
            this.hideWnd();
        };
        FightEffectFrame.prototype.setCallback = function (object, func, userdata) {
            this.callbackObject = object;
            this.callbackFunc = func;
            this.callbackData = userdata;
        };
        return FightEffectFrame;
    }(BaseWnd));
    tool.FightEffectFrame = FightEffectFrame;
    __reflect(FightEffectFrame.prototype, "tool.FightEffectFrame");
})(tool || (tool = {}));
//# sourceMappingURL=FightEffectFrame.js.map