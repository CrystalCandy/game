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
/*
作者:
    liuziming
    
创建时间：
   2017.03.21(周二)

意图：
   界面（公共）动画（特效、帧动画）提示
公共接口：
   
*/
var ScreenEffectTipsFrame = (function (_super) {
    __extends(ScreenEffectTipsFrame, _super);
    function ScreenEffectTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenEffectTipsFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.effectIdList = [];
    };
    ScreenEffectTipsFrame.prototype.onLoad = function () {
        this.viewIndex = 0;
        this.effectList = [];
        this.createFrame();
    };
    ScreenEffectTipsFrame.prototype.onUnLoad = function () {
    };
    ScreenEffectTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    ScreenEffectTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        for (var _ in this.effectList) {
            var elem = this.effectList[_];
            var effect = elem[0];
            var callback = elem[1];
            var thisObj = elem[2];
            var actorView = effect.actorView;
            if (actorView) {
                effect.leaveViewer(actorView);
            }
            effect.deleteObj();
            if (callback) {
                callback.call(thisObj);
            }
        }
        this.effectList = [];
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////-
    ScreenEffectTipsFrame.prototype.createFrame = function () {
        var frame = this.mLayoutNode;
        UiUtil.setXY(frame, 100, 300);
        UiUtil.setWH(frame, 440, 300);
        frame.setLayer(3 /* Top */);
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.touchChildren = false;
    };
    ScreenEffectTipsFrame.prototype.getActorView = function () {
        var actorView = null;
        //for(let i = 1; i <=  this.viewIndex;i++){
        actorView = this.mElemList["actorview" + this.viewIndex + 1];
        //	if(actorView ){
        //		if(actorView.IsVisible() == false ){
        //			break
        //		}else{
        //			actorView = null
        //		}
        //	}
        //}
        this.viewIndex = this.viewIndex + 1;
        if (actorView) {
            return actorView;
        }
        else {
            var width = 440, height = 300;
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.ActorView, _a["name"] = "actorview" + this.viewIndex, _a["title"] = null, _a["font"] = null, _a["image"] = null, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
            actorView = this.mElemList["actorview" + this.viewIndex];
        }
        return actorView;
        var _a;
    };
    ScreenEffectTipsFrame.prototype.refreshFrame = function () {
        var list = {};
        for (var _ = 0; _ < this.effectIdList.length; _++) {
            var elem = this.effectIdList[_];
            var effectId = elem[0];
            var callback = elem[1];
            var thisObj = elem[2];
            var actorView = this.getActorView();
            actorView.visible = (true);
            var effect = EffectManager.getInstance().createEffect(effectId, false);
            //effect.setShowTimes(1)
            effect.actorView = actorView;
            var listener = { this_index: this, function_index: this.onEffectFinish };
            effect.addAnimListener(listener);
            effect.enterViewer(actorView);
            JsUtil.arrayInstert(this.effectList, [effect, callback, thisObj]);
        }
        this.effectIdList = [];
    };
    //////////////////////////////////回调函数////////////////////////////
    ScreenEffectTipsFrame.prototype.onEffectFinish = function (notify, effect) {
        if (notify == "end") {
            //下一帧执行
            var actorView_1 = effect.actorView;
            actorView_1.visible = (false);
            var destroyEffect = function () {
                var exsit = false;
                for (var k in this.effectList) {
                    var elem = this.effectList[k];
                    var e = elem[0];
                    if (e == effect) {
                        exsit = true;
                        if (elem[1]) {
                            elem[1].call(elem[2]);
                        }
                        JsUtil.arrayRemove(this.effectList, k);
                        break;
                    }
                }
                if (exsit == true) {
                    effect.leaveViewer(actorView_1);
                    effect.deleteObj();
                }
            };
            var flag = true;
            for (var i = 1; i <= this.viewIndex; i++) {
                var actorView_2 = this.mElemList["actorview" + i];
                if (actorView_2 && actorView_2.visible == true) {
                    flag = false;
                    break;
                }
            }
            if (flag == true) {
                DelayEvecuteFunc(0, this.hideWnd, this);
            }
            else {
                DelayEvecuteFunc(0, destroyEffect, this);
            }
        }
    };
    ScreenEffectTipsFrame.prototype.onReplay = function (args) {
        return this.hideWnd();
    };
    ////////////////////////////////////公共接口////////////////////////////////
    ScreenEffectTipsFrame.prototype.showScreenEffect = function (effectId, callback, thisObj) {
        JsUtil.arrayInstert(this.effectIdList, [effectId, callback, thisObj]);
        if (this.isVisible() == true) {
            return this.refreshFrame();
        }
        else {
            return this.showWnd();
        }
    };
    return ScreenEffectTipsFrame;
}(BaseWnd));
__reflect(ScreenEffectTipsFrame.prototype, "ScreenEffectTipsFrame");
//# sourceMappingURL=ScreenEffectTipsFrame.js.map