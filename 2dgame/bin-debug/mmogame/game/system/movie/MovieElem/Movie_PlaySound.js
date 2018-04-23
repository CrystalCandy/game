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
    lintianfeng
    
创建时间：
   2013.10.26(周六)

意图：
   

公共接口：
   
*/
var Movie_PlaySound = (function (_super) {
    __extends(Movie_PlaySound, _super);
    function Movie_PlaySound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_PlaySound.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.music = args[0].music;
        this.loop = args[0].loop;
        this.musicType = args[0].musicType || "music";
        this.volume = args[0].volume || 1;
        TLog.Debug("Movie_PlaySound.init", this.musicType, type(this.volume));
    };
    Movie_PlaySound.prototype.onBegin = function () {
        if (this.musicType == "music") {
            GameSound.getInstance().setMusicVolume(this.volume);
            GameSound.getInstance().playMusic(this.music, this.loop);
        }
        else {
            GameSound.getInstance().setEffectVolume(this.volume);
            GameSound.getInstance().playEffect(this.music);
        }
        this.finish();
    };
    Movie_PlaySound.prototype.destory = function () {
        //TLog.Debug("Movie_PlaySound.destory")
        if (this.musicType == "music") {
            GameSound.getInstance().stopMusic();
            GameSound.getInstance().setMusicVolume(1);
        }
        else {
            GameSound.getInstance().stopEffect();
            GameSound.getInstance().setEffectVolume(1);
        }
    };
    Movie_PlaySound.prototype.onFinish = function () {
    };
    return Movie_PlaySound;
}(Movie_Elem));
__reflect(Movie_PlaySound.prototype, "Movie_PlaySound");
//# sourceMappingURL=Movie_PlaySound.js.map