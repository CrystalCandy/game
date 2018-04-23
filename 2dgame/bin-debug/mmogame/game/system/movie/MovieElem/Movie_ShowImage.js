/*
作者:
lintianfeng

创建时间：
2014.2.18(周二)

意图：
    显示图片

公共接口：

*/
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
var Movie_ShowImage = (function (_super) {
    __extends(Movie_ShowImage, _super);
    function Movie_ShowImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_ShowImage.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.max_time = args[0].time || 3000;
        this.time = 0;
        this.imageName = args[0].image;
        this.clear = args[0].clear || false;
        this.isBG = args[0].bOnce || false;
        this.ImgMoveType = args[0].ImgMoveType || null;
        this.ImgMoveTime = args[0].ImgMoveTime || 1000;
        this.ImgEffectID = args[0].ImgEffectID || null;
        //modify:yangguiming暂时不支持场景图
        this.isBG = false;
    };
    Movie_ShowImage.prototype.onBegin = function () {
        //TLog.Debug("Movie_ShowImage onBegin ",this.isBG)
        if (this.isBG == true) {
            SceneManager.getInstance().setBgImage(null);
            SceneManager.getInstance().setBgImage("data/ui/image/movie/" + this.imageName + ".jpg");
        }
        else {
            var wnd = WngMrg.getInstance().getWindow("FullImageFrame");
            //TLog.Debug("afdfa",this.ImgEffectID)
            var effectList_1 = splitString(this.ImgEffectID, ',');
            //TLog.Debug_r(effectList)
            //io.read()
            wnd.setImageName(this.imageName, this.ImgMoveType, this.ImgMoveTime, effectList_1);
            if (wnd.isVisible() && wnd.isLoadComplete()) {
                wnd.refreshFrame();
            }
            else {
                wnd.showWnd();
            }
        }
        if (this.max_time == 0) {
            this.finish();
        }
    };
    Movie_ShowImage.prototype.onTick = function (delay) {
        this.time = this.time + delay;
        if (this.time > this.max_time) {
            this.finish();
        }
    };
    Movie_ShowImage.prototype.destory = function () {
        if (this.isBG == true) {
            SceneManager.getInstance().setBgImage(null);
        }
        else {
            WngMrg.getInstance().hideWindow("FullImageFrame");
        }
    };
    Movie_ShowImage.prototype.onFinish = function () {
        this.hideImage();
    };
    Movie_ShowImage.prototype.hideImage = function () {
        if (this.clear == true) {
            if (this.isBG == true) {
                SceneManager.getInstance().setBgImage(null);
            }
            else {
                WngMrg.getInstance().hideWindow("FullImageFrame");
            }
        }
    };
    return Movie_ShowImage;
}(Movie_Elem));
__reflect(Movie_ShowImage.prototype, "Movie_ShowImage");
//# sourceMappingURL=Movie_ShowImage.js.map