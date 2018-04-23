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
var Fight_EffectSceneAction = (function (_super) {
    __extends(Fight_EffectSceneAction, _super);
    function Fight_EffectSceneAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_EffectSceneAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.varName = checkNull(this.elemInfo.param1, ""); //定义变量
        this.effectId = this.elemInfo.param2;
        this.speed = checkNull(this.elemInfo.param3, 1);
        this.posType = checkNull(this.elemInfo.param4, "casterMid");
        this.offset_x = checkNull(this.elemInfo.param5, 0);
        this.offset_y = checkNull(this.elemInfo.param6, 0);
        this.bLastFrameDelay = checkNull(this.elemInfo.param7, false);
        this.bLastFrameLoop = checkNull(this.elemInfo.param8, false);
        //因为编辑器以攻击者在左边处理
        //所以如果角色是右边，就要调整偏移
        var pos = null;
        if (this.posType != "any") {
            pos = this.getOffsetByCaster(this.offset_x, this.offset_y);
        }
        else {
            pos = this.getAbsoluteXYByCaster(this.offset_x, this.offset_y);
        }
        this.offset_x = pos.x;
        this.offset_y = pos.y;
        this.setAutoSendAttack(true);
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_EffectSceneAction.prototype.getPosByType = function () {
        var pos = {};
        if (this.posType == "any") {
            pos = SceneManager.getInstance().screenXYtoMapXY(this.offset_x, this.offset_y);
        }
        else if (this.posType == "sceneMid") {
            var viewSize = SceneManager.getInstance().getCameraViewSize();
            pos = SceneManager.getInstance().screenXYtoMapXY(viewSize.w / 2, viewSize.h / 2);
            pos.x = pos.x + this.offset_x;
            pos.y = pos.y + this.offset_y;
        }
        else {
            if (this.casterActor == null) {
                return null;
            }
            var side = this.casterActor.getSide();
            var actor_list = GetFightActorList();
            var mapx = 0;
            var mapy = 0;
            var count = 0;
            if (this.posType == "targetMid") {
                for (var k in actor_list) {
                    var actor = actor_list[k];
                    if (actor.getSide() != side && actor.getPos() <= DEFAULT_FIGHT_ACTOR_COUNT * 2) {
                        var pos = actor.getPositionXY();
                        mapx = mapx + pos.x;
                        mapy = mapy + pos.y;
                        count = count + 1;
                    }
                }
            }
            else if (this.posType == "casterMid") {
                for (var k in actor_list) {
                    var actor = actor_list[k];
                    if (actor.getSide() == side && actor.getPos() <= DEFAULT_FIGHT_ACTOR_COUNT * 2) {
                        var pos = actor.getPositionXY();
                        mapx = mapx + pos.x;
                        mapy = mapy + pos.y;
                        count = count + 1;
                    }
                }
            }
            if (count == 0) {
                return null;
            }
            pos.x = mapx / count + this.offset_x;
            pos.y = mapy / count + this.offset_y;
        }
        pos = SceneManager.getInstance().mapXYtoCellXY(pos.x, pos.y);
        return pos;
    };
    Fight_EffectSceneAction.prototype.onPlay = function () {
        TLog.Assert(this.sceneEffect == null);
        var pos = this.getPosByType();
        if (!pos) {
            this.finish();
            return;
        }
        //自动析构，不用保存实例
        var listener = { this_index: this, function_index: this.handleAnimNotify };
        this.sceneEffect = EffectManager.getInstance().createSceneEffect(this.effectId, pos.x, pos.y, false, !this.bLastFrameDelay);
        this.sceneEffect.addAnimListener(listener);
        this.sceneEffect.setAnimSpeed(this.speed);
        this.sceneEffect.setDir(this.casterActor.getDir());
        if (this.casterActor == g_pauseSkillCaster) {
            this.sceneEffect.changeTopMapLayer();
        }
        //this.sceneeffect.changeMapLayer(this.casterActor.getMapLayer() )
        if (this.varName != "") {
            this.fightResult.addActionObject(this.varName, this.sceneEffect); //用于其他action使用
        }
    };
    Fight_EffectSceneAction.prototype.onFinish = function () {
        if (this.sceneEffect == null) {
            return;
        }
        if (this.varName != "") {
            this.fightResult.removeActionObject(this.varName, this.sceneEffect);
        }
        this.sceneEffect.deleteObj();
        this.sceneEffect = null;
    };
    Fight_EffectSceneAction.prototype.onTick = function (delay) {
    };
    return Fight_EffectSceneAction;
}(Fight_BaseAction));
__reflect(Fight_EffectSceneAction.prototype, "Fight_EffectSceneAction");
//# sourceMappingURL=Fight_EffectSceneAction.js.map