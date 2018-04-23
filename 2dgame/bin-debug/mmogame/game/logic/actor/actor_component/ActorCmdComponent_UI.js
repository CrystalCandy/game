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
//测试矩形区域
var TEST_UI_RECT = false;
var ActorCmdComponent_UI = (function (_super) {
    __extends(ActorCmdComponent_UI, _super);
    function ActorCmdComponent_UI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorCmdComponent_UI.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mFrameList = {};
        // this.addCommandHandler(ActorCommand.SetName, this.onHandleCommand_SetName)
        // this.addCommandHandler(ActorCommand.ShowCombatNumber, this.onHandleCommand_ShowCombatNumber)
        // this.addCommandHandler(ActorCommand.ShowCombatAutoHpSlot, this.onHandleCommand_ShowCombatAutoHpSlot)
        this.addCommandHandler(ActorCommand.AddChatBubble, this.onHandleCommand_AddChatBubble);
        this.addCommandHandler(ActorCommand.HideChatBubble, this.onHandleCommand_HideChatBubble);
        //this.addCommandHandler(ActorCommand.SetHourGlassVisible, this.onHandleCommand_SetHourGlassVisible)
        this.addCommandHandler(ActorCommand.SetFactionName, this.onHandleCommand_SetFactionName);
        this.addCommandHandler(ActorCommand.SetName, this.onHandleCommand_SetName);
        this.addCommandHandler(ActorCommand.SetNameColor, this.onHandleCommand_SetNameColor);
        this.addCommandHandler(ActorCommand.SetNameFont, this.onHandleCommand_SetNameFont);
        this.addCommandHandler(ActorCommand.SetHpSlot, this.onHandleCommand_SetHpSlot);
        this.addCommandHandler(ActorCommand.SetHpSlotVisible, this.onHandleCommand_SetHpSlotVisible);
        this.addCommandHandler(ActorCommand.SetFightStateVisible, this.onHandleComman_SetFightStateVisible);
        // this.addCommandHandler(ActorCommand.SetCaptainIconVisible, this.onHandleCommand_SetCaptainIconVisible)
        // this.addCommandHandler(ActorCommand.SetTeammateIconVisible, this.onHandleCommand_SetTeammateIconVisible)
        this.addCommandHandler(ActorCommand.SetMoreIcon, this.onHandleCommand_SetMoreVisible);
        this.addCommandHandler(ActorCommand.SetStateIcon, this.onHandleCommand_SetStateIcon);
        this.addCommandHandler(ActorCommand.SetChengHaoTitle, this.onHandleCommand_SetChengHaoTitle);
        this.addCommandHandler(ActorCommand.showSkillName, this.onHandleCommand_showSkillName);
        this.addCommandHandler(ActorCommand.SetCombatMarkVisible, this.onHandleCommand_SetCombatMarkVisible);
        this.addCommandHandler(ActorCommand.ShowCombatNumber, this.onHandleCommand_ShowCombatNumber);
        this.addCommandHandler(ActorCommand.ShowCombatAutoHpSlot, this.onHandleCommand_ShowCombatAutoHpSlot);
        this.addCommandHandler(ActorCommand.ShowFloatText, this.onHandleCommand_ShowFloatText);
        //this.addCommandHandler(ActorCommand.ShowAwardModel, this.onHandleCommand_ShowAwardModel)
        //////设置头顶倒计时
        this.addCommandHandler(ActorCommand.setTimeCountDown, this.onHandleCommand_setTimeCountDown);
    };
    //子类复写 析构函数
    ActorCmdComponent_UI.prototype.destory = function () {
        for (var k in this.mFrameList) {
            var v = this.mFrameList[k];
            v.deleteObj();
        }
        this.releaseGuiNode();
    };
    ActorCmdComponent_UI.prototype.onAppearChange = function () {
        var boundRect = this.owner.getContentSize();
        if (this.guiNode && boundRect.width != 0 && boundRect.height != 0) {
            this.guiNode.width = boundRect.width;
            this.guiNode.height = boundRect.height;
            //锚点在底部中心
            this.guiNode.anchorOffsetX = this.guiNode.width / 2;
            this.guiNode.anchorOffsetY = this.guiNode.height;
        }
    };
    //---------------------------------------------------------------------------
    ActorCmdComponent_UI.prototype.getGuiNode = function () {
        if (this.guiNode == null) {
            this.guiNode = new eui.Group;
            this.guiNode.width = 100;
            this.guiNode.height = 100;
            this.guiNode.anchorOffsetX = this.guiNode.width / 2;
            this.guiNode.anchorOffsetY = this.guiNode.height;
            this.realActor.addDisplayeNode(map.SpriteDisplayNodeType.eDisplayNode_UI, this.guiNode);
            if (TEST_UI_RECT) {
                UiUtil.forTestDrawBg(this.guiNode, gui.Color.black);
            }
        }
        return this.guiNode;
    };
    ActorCmdComponent_UI.prototype.releaseGuiNode = function () {
        if (this.guiNode && this.guiNode.parent) {
            this.realActor.removeDisplayeNode(this.guiNode);
        }
        this.guiNode = null;
    };
    ActorCmdComponent_UI.prototype.setFrameRootLayer = function (logicFrame, node) {
        //获取头顶rootWindow
        logicFrame.setRootLayer(node);
        //logicFrame.doCommand("setTestUIRect", TEST_UI_RECT)
    };
    ActorCmdComponent_UI.prototype.getUpperFrame = function () {
        if (this.mFrameList.upperFrame == null) {
            this.mFrameList.upperFrame = WngMrg.getInstance().createWindow("CharacterUpperFrame");
            this.setFrameRootLayer(this.mFrameList.upperFrame, this.getGuiNode());
        }
        this.mFrameList.upperFrame.showWnd();
        return this.mFrameList.upperFrame;
    };
    ActorCmdComponent_UI.prototype.getFightFrame = function () {
        if (this.mFrameList.fightFrame == null) {
            this.mFrameList.fightFrame = WngMrg.getInstance().createWindow("CharacterFightFrame");
            this.setFrameRootLayer(this.mFrameList.fightFrame, this.getGuiNode());
            this.mFrameList.fightFrame.setOwner(this.owner);
        }
        return this.mFrameList.fightFrame;
    };
    //---------------------------------------------------------------------------
    ActorCmdComponent_UI.prototype.onHandleCommand_SetName = function (param1, param2) {
        var name = param1;
        if (StringUtil.isEmpty(name) && this.mFrameList.updateFrame == null)
            return;
        this.getUpperFrame().setNameTitle(name, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_ShowCombatNumber = function (param1, param2) {
        var number_info = param1;
        var all_time = param2 / 1000;
        // if (this.mFrameList.fightFrame == null) {
        //     this.mFrameList.fightFrame = WngMrg.getInstance().createWindow("CharacterFightFrame")
        //     this.setFrameRootLayer(this.mFrameList.fightFrame, this.getGuiNode())
        // }
        var fightFrame = this.getFightFrame();
        fightFrame.setOwner(this.owner);
        fightFrame.showWnd();
        fightFrame.showCombatInfo(number_info, all_time);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_ShowCombatAutoHpSlot = function (param1, param2) {
        var percent = param1;
        var combat_side = param2;
        var upperFrame = this.getUpperFrame();
        upperFrame.showCombatAutoHpSlot(percent, combat_side);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////-
    ActorCmdComponent_UI.prototype.onHandleCommand_AddChatBubble = function (param1, param2) {
        var content = param1;
        if (this.mFrameList.chatBubbleFrame == null) {
            this.mFrameList.chatBubbleFrame = WngMrg.getInstance().createWindow("ChatBubbleFrame");
            this.setFrameRootLayer(this.mFrameList.chatBubbleFrame, this.getGuiNode());
        }
        //this.mFrameList.chatBubbleFrame.setPlayerOwner(this.owner)
        this.mFrameList.chatBubbleFrame.setShowMsg(content, this.owner, param2);
        //this.mFrameList.chatBubbleFrame.showWnd()
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_HideChatBubble = function (param1, param2) {
        if (this.mFrameList.chatBubbleFrame) {
            this.mFrameList.chatBubbleFrame.hideWnd();
        }
    };
    // onHandleCommand_SetHourGlassVisible(param1, param2) {
    //     let visible = param1
    //     if (this.mFrameList.hourGlassFrame == null) {
    //         this.mFrameList.hourGlassFrame = WngMrg.getInstance().createWindow("HourGlassFrame")
    //         this.setFrameRootLayer(this.mFrameList.hourGlassFrame, this.getGuiNode())
    //     }
    //     if (visible) {
    //         this.mFrameList.hourGlassFrame.setOwner(this.owner)
    //         this.mFrameList.hourGlassFrame.showWnd()
    //     } else {
    //         this.mFrameList.hourGlassFrame.hideWnd()
    //     }
    // }
    ActorCmdComponent_UI.prototype.onHandleCommand_SetFactionName = function (name, font) {
        if (this.mFrameList.upperFrame == null) {
            return;
        }
        var bottomFrame = this.getUpperFrame();
        bottomFrame.setFactionNameTitle(name, font);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetNameColor = function (param1, param2) {
        var bottomFrame = this.getUpperFrame();
        bottomFrame.setNameColor(param1, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetNameFont = function (param1, param2) {
        var bottomFrame = this.getUpperFrame();
        bottomFrame.setNameFont(param1);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetHpSlot = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setHpSlot(param1);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetHpSlotVisible = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setHpSlotVisible(param1);
    };
    ActorCmdComponent_UI.prototype.onHandleComman_SetFightStateVisible = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setFightStateVisible(param1, param2);
    };
    // onHandleCommand_SetCaptainIconVisible(param1, param2) {
    //     let upperFrame = this.getUpperFrame()
    //     upperFrame.setCaptainIconVisible(param1, param2)
    // }
    // onHandleCommand_SetTeammateIconVisible(param1, param2) {
    //     let upperFrame = this.getUpperFrame()
    //     upperFrame.setTeammateIconVisible(param1, param2)
    // }
    ActorCmdComponent_UI.prototype.onHandleCommand_SetMoreVisible = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setMoreIcon(param1, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetStateIcon = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setStateIcon(param1, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetChengHaoTitle = function (chengHaoId) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setChengHaoTitle(chengHaoId);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_setTimeCountDown = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setTimeCountDown(param1, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_showSkillName = function (param1, param2) {
        var skillId = param1;
        if (this.mFrameList.skillNameFrame == null) {
            this.mFrameList.skillNameFrame = WngMrg.getInstance().createWindow("CombatUseSkillFrame");
            this.setFrameRootLayer(this.mFrameList.skillNameFrame, this.getGuiNode());
        }
        this.mFrameList.skillNameFrame.setSkillId(skillId);
        this.mFrameList.skillNameFrame.showWnd();
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_SetCombatMarkVisible = function (param1, param2) {
        var upperFrame = this.getUpperFrame();
        upperFrame.setCombatMaikVisible(param1, param2);
    };
    ActorCmdComponent_UI.prototype.onHandleCommand_ShowFloatText = function (param1, param2) {
        var text_info = param1;
        var fightFrame = this.getFightFrame();
        fightFrame.setOwner(this.owner);
        fightFrame.showWnd();
        fightFrame.showFloatText(text_info, -1);
    };
    return ActorCmdComponent_UI;
}(ActorCmdComponent));
__reflect(ActorCmdComponent_UI.prototype, "ActorCmdComponent_UI");
//# sourceMappingURL=ActorCmdComponent_UI.js.map