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
var CharacterAwardFrame = (function (_super) {
    __extends(CharacterAwardFrame, _super);
    function CharacterAwardFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterAwardFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    CharacterAwardFrame.prototype.onLoad = function () {
        var width = 350;
        var height = 60;
        this.mLayoutNode.width = width;
        this.mLayoutNode.height = height;
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.setLayer(0 /* Bottom */);
        var elemInfo = [
            (_a = {}, _a["index_type"] = gui.RichDisplayer, _a["name"] = "content", _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var rd = this.mElemList["content"];
        rd.setAlignFlag(gui.Flag.H_CENTER);
        var _a;
    };
    CharacterAwardFrame.prototype.onUnLoad = function () {
    };
    CharacterAwardFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    CharacterAwardFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    CharacterAwardFrame.prototype.refreshFrame = function () {
        var rd = this.mElemList["content"];
        var width = this.mLayoutNode.width, height = this.mLayoutNode.height;
        //rd.SetWH(width, height)
        rd.clear();
        var font = {};
        font.default_color = this.fontColor;
        font.defalut_font = "ht_20_cc_stroke";
        rd.addXmlString(XmlConverter.parseText(this.content, font));
        //height = rd.GetAllRowHeight()
        //height = height < 60 && 60 || height
        //let width = rd.GetLogicWidth()
        //rd.SetWH(width + 5, height + 10)
        //this.drawPtr1.targetArea.SetAbsoluteLTWH(0, 0, this.mRootFrame.GetWidth(), this.mRootFrame.GetHeight() - 5)
        //this.drawPtr2.targetArea.SetAbsoluteLTWH(this.mRootFrame.GetWidth() / 2 - 16, this.mRootFrame.GetHeight() - 9, 33, 9)
        //this.mRootFrame.setAlignFlag(Core.Flag.CENTER_BOTTOM, 0, -200)
        //this.mRootFrame.SetChanged()
        //rd.ShowLastRow()
        //TLog.Debug("11111111111111111")
        //
        //let frame = this.mRootFrame
        var layoutNode = this.mLayoutNode;
        var mapXY = this.owner.getMapXY();
        var mapPos = SceneManager.getInstance().mapXYtoScreenXY(mapXY.x, mapXY.y);
        var x = mapPos.x, y = mapPos.y;
        var ax = x - this.mLayoutNode.width / 2, ay = y - 40;
        // layoutNode.x = ax;
        // layoutNode.y = ay;
        // layoutNode.scaleX = 1
        // layoutNode.scaleY = 1
        var showTime = 150;
        var holdTime = 300;
        //var hideTime = 100
        var offx = 0;
        var offy = -30;
        egret.Tween.get(layoutNode).set({ x: ax, y: ay }).
            to({ x: ax + offx, y: ay + offy }, showTime).
            wait(holdTime).
            to({ x: ax + offx, y: ay + offy - 60 }, showTime).
            call(this.onCombatFrameFinishMove, this, [layoutNode]);
        // let scaleControler = ui_util.CreateControllerScale(frame, 1, 200, false, false)
        // let timeController1 = ui_util.CreateGuiControllerTime(frame, 500, false)
        // let alphaContrller = ui_util.CreateControllerAlpha(frame, 0, 400, false)
        // let controller1 = ui_util.GuiControllerSequence(frame, scaleControler, timeController1, alphaContrller)
        // let positionController = ui_util.CreateControllerPosition(frame,
        // 	gui.eGuiControllerMoveType_Inertional,
        // 	200, ax, ay, ax, ay - 30,
        // 	gui.eGuiControllerMoveXYType_Frame, false)
        // let timeController = ui_util.CreateGuiControllerTime(frame, 500, false)
        // let moveController = ui_util.CreateControllerPosition(frame, gui.eGuiControllerMoveType_Inertional, 500, ax, ay - 30, ax, ay - 30 - 40, gui.eGuiControllerMoveXYType_Frame, false)
        // let controller = ui_util.GuiControllerSequence(frame, positionController, timeController, moveController)
        // controller.SubscribeEvent(gui.IGuiController.FinishEvent, this.onCombatFrameFinishMove, this)
    };
    CharacterAwardFrame.prototype.onCombatFrameFinishMove = function (args) {
        return this.hideWnd();
    };
    ////////////////////////////////////////////////////////////////////
    CharacterAwardFrame.prototype.showAwardInfo = function (content, color, awardActor) {
        if (!awardActor || !content || content == "") {
            return;
        }
        this.content = content;
        this.fontColor = color;
        this.owner = awardActor;
        return this.showWnd();
    };
    return CharacterAwardFrame;
}(BaseWnd));
__reflect(CharacterAwardFrame.prototype, "CharacterAwardFrame");
//# sourceMappingURL=CharacterAwardFrame.js.map