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
// TypeScript file
/*
作者:
    liuziming
    
创建时间：
   2017.01.10(周二)

意图：
   
公共接口：
   
*/
var RuleDescribeFrame = (function (_super) {
    __extends(RuleDescribeFrame, _super);
    function RuleDescribeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleDescribeFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/RuleDescribeLayout.exml"];
    };
    RuleDescribeFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    RuleDescribeFrame.prototype.onUnLoad = function () {
    };
    RuleDescribeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    RuleDescribeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.activity = null;
        this.templetParam = null;
    };
    ////////////////////////////////////////////////////////////////////-
    RuleDescribeFrame.prototype.createFrame = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.setDoModal(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickReturn, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickReturn, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.horizontalCenter = 0;
        this.mLayoutNode.verticalCenter = 0;
        var _a, _b;
        //this.mElemList = ui_util.SetLookAndFeelWindow("Frame/Template02", this.mRootFrame, 600, 880, 0, 0)
        //this.mElemList["return"]:SubscribeEvent(gui.Window.MouseUpEvent, this.onReturn, this)
        //let mElemInfo:any = {
        //									{["index_type"] : gui.ControlType.Label,						["name"] : "bg",  	["title"] : null ,   		["font"] : null,   ["scale_image"] : "ty_UIBg02",		["color"] : gui.Color.white,		["x"] : 30, ["y"] : 30,		["w"] : 540,["h"] : 710,	["event_name"] : gui.Window.MouseLongDownEvent, ["fun_index"] : null},
        //										{["index_type"] : gui.ControlType.Label,						["name"] : "title", ["parent"] : "bg", 	["title"] : Localize_cns("COMMON_TXT1") ,   		["font"] : "ht_28_cc",   ["scale_image"] : "",		["color"] : gui.Color.white,		["x"] : 0, ["y"] : 10,		["w"] : 540,["h"] : 30,	["event_name"] : gui.Window.MouseLongDownEvent, ["fun_index"] : null},
        //										{["index_type"] : gui.ControlType.RichDisplayer,		["name"] : "rd",  	["parent"] : "bg",	["title"] : null ,   		["font"] : null,   ["scale_image"] : "",		["color"] : gui.Color.white,		["x"] : 10, ["y"] : 50,		["w"] : 520,["h"] : 650,	["event_name"] : gui.Window.MouseLongDownEvent, ["fun_index"] : null},
        //									
        //									}
        //ui_util.CreateElem(mElemInfo, this.mRootFrame, this.mElemList, this)
        ////ui_util.CreateDrawRectPtr(this.mElemList["rd"], gui.Color32Half.green)
        //
        ////
        ////let name = "scrollWidget"
        ////let window = UIScrollList.newObj(this.mRootFrame)
        ////this.scroll = window
        ////
        ////let pos:any = {x : 20, y : 130, w : 605, h : 700}
        ////window.createScrollWidget(name, this.mElemList, pos)
        ////function AddRdContent(rd, content, ft, color, dis, rffont, setBottom, addNew){
        //	
        //let path = "SecondMenuFrame/data"
        //let window = this.mRootWindow.GetChildFromPath(path, string.len(path))
        //this.frameAction = FrameExplodeAction.newObj(this.mRootFrame, window, null, null, this.hideWnd, this)
    };
    RuleDescribeFrame.prototype.refreshFrame = function () {
        var rd = this.mElemList["rd"];
        rd.clear();
        var rules = GameConfig.RuleDescriptionConfig[this.activity];
        if (rules) {
            for (var k = 1; k < 100; k++) {
                var v = rules[k];
                if (v == null) {
                    break;
                }
                if (k == 1) {
                    if (v.title && v.title != "") {
                        this.mElemList["title"].text = (v.title);
                    }
                    else {
                        this.mElemList["title"].text = (Localize_cns("COMMON_TXT1"));
                    }
                }
                if (v.templet == 1) {
                    for (var _ = 0; _ < this.templetParam.length; _++) {
                        var pack = this.templetParam[_];
                        AddRdContent(rd, String.format(v.des, pack), "ht_20_cc", "oldlace", 6, "#oldlace", null, true);
                    }
                    AddRdContent(rd, "#br", null, null, null, null, null, true);
                }
                else {
                    AddRdContent(rd, v.des + "#br", "ht_20_cc", "oldlace", 6, "#oldlace", null, true);
                }
            }
        }
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    RuleDescribeFrame.prototype.onClickReturn = function (args) {
        return this.hideWnd();
    };
    RuleDescribeFrame.prototype.showWithActivity = function (activity, templetParam) {
        this.activity = activity;
        this.templetParam = templetParam;
        return this.showWnd();
    };
    return RuleDescribeFrame;
}(BaseWnd));
__reflect(RuleDescribeFrame.prototype, "RuleDescribeFrame");
//# sourceMappingURL=RuleDescribeFrame.js.map