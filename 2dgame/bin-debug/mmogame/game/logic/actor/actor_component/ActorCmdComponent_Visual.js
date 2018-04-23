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
var SHADOW_PATH = "ui/image/map/shadow.png";
var ActorCmdComponent_Visual = (function (_super) {
    __extends(ActorCmdComponent_Visual, _super);
    function ActorCmdComponent_Visual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorCmdComponent_Visual.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addCommandHandler(ActorCommand.SetShadowVisible, this.onHandleCommand_SetShadowVisible);
    };
    //子类复写 析构函数
    ActorCmdComponent_Visual.prototype.destory = function () {
        this.clearShadow();
    };
    ActorCmdComponent_Visual.prototype.onAsynTextureSucceed = function (key, texture, res) {
        if (key == SHADOW_PATH) {
            this.textureRes = res;
            this.textureRes.retain();
            this.createShadow();
        }
    };
    ActorCmdComponent_Visual.prototype.clearShadow = function () {
        core.TextureManager.getInstance().cancelTextureAsyn(SHADOW_PATH, this);
        if (this.mShadowNode) {
            this.realActor.removeDisplayeNode(this.mShadowNode);
            this.mShadowNode.$setBitmapData(null);
            this.mShadowNode = null;
        }
        if (this.textureRes) {
            this.textureRes.release();
            this.textureRes = null;
        }
    };
    ActorCmdComponent_Visual.prototype.createShadow = function () {
        if (this.textureRes == null) {
            core.TextureManager.getInstance().loadTextureAsyn(SHADOW_PATH, this);
            return;
        }
        if (this.mShadowNode == null) {
            this.mShadowNode = new egret.Bitmap;
            this.realActor.addDisplayeNode(map.SpriteDisplayNodeType.eDisplayNode_Shadow, this.mShadowNode);
        }
        this.mShadowNode.$setBitmapData(this.textureRes.getData());
        this.mShadowNode.anchorOffsetX = this.mShadowNode.width / 2;
        this.mShadowNode.anchorOffsetY = this.mShadowNode.height / 2;
    };
    ActorCmdComponent_Visual.prototype.onHandleCommand_SetShadowVisible = function (param1, param2) {
        var visible = param1;
        if (visible) {
            this.createShadow();
        }
        else {
            this.clearShadow();
        }
    };
    return ActorCmdComponent_Visual;
}(ActorCmdComponent));
__reflect(ActorCmdComponent_Visual.prototype, "ActorCmdComponent_Visual", ["core.TextureCallback"]);
//# sourceMappingURL=ActorCmdComponent_Visual.js.map