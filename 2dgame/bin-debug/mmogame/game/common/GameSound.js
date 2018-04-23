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
var GameSound = (function (_super) {
    __extends(GameSound, _super);
    function GameSound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    GameSound.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mCurMusicName = "";
    };
    //子类复写 析构函数
    GameSound.prototype.destory = function () {
    };
    GameSound.prototype.playEffect = function (name) {
        //wp不支持声音
        if (egret.Capabilities.os == "Windows Phone") {
            return;
        }
        if (this.getEffectStatus() == false)
            return;
        if (!name) {
            return;
        }
        IGlobal.soundManager.playEffect("data/sound/effect/" + name);
    };
    GameSound.prototype.resetEffect = function () {
    };
    GameSound.prototype.unloadAllEffect = function () {
    };
    GameSound.prototype.playMusic = function (name, loop) {
        //wp不支持声音
        if (egret.Capabilities.os == "Windows Phone") {
            return;
        }
        if (this.getMusicStatus() == false)
            return;
        if (!name) {
            return;
        }
        IGlobal.soundManager.playMusic("data/sound/music/" + name, loop);
        this.mCurMusicName = name;
    };
    GameSound.prototype.setEffectVolume = function (vol) {
    };
    GameSound.prototype.setMusicVolume = function (vol) {
    };
    GameSound.prototype.stopEffect = function () {
        IGlobal.soundManager.stop();
    };
    GameSound.prototype.stopMusic = function () {
        IGlobal.soundManager.stop();
    };
    GameSound.prototype.getCurMusicName = function () {
        return this.mCurMusicName;
    };
    GameSound.prototype.getMusicStatus = function () {
        return IGlobal.setting.getCommonSetting(UserSetting.TYPE_BOOLEAN, "musicOn", true);
    };
    // 获取音效状态
    GameSound.prototype.getEffectStatus = function () {
        return IGlobal.setting.getCommonSetting(UserSetting.TYPE_BOOLEAN, "effectOn", true);
    };
    // 设置音乐状态
    GameSound.prototype.setMusicStatus = function (bOpen, recordMusic) {
        //if(! recordMusic ){
        IGlobal.setting.setCommonSetting(UserSetting.TYPE_BOOLEAN, "musicOn", bOpen);
        //}	
        // 播放当前音乐
        if (!bOpen) {
            this.stopMusic();
        }
        else {
            this.playMusic(this.mCurMusicName);
        }
    };
    // 设置音效状态
    GameSound.prototype.setEffectStatus = function (bOpen, recordMusic) {
        //if (!recordMusic) {
        IGlobal.setting.setCommonSetting(UserSetting.TYPE_BOOLEAN, "effectOn", bOpen);
        //}
        if (!bOpen) {
            this.stopEffect();
        }
        // else {
        // 	gb.audio.SetEffectState(Core.IAudio.eAudioState_Begin)
        // }
    };
    return GameSound;
}(TClass));
__reflect(GameSound.prototype, "GameSound");
//# sourceMappingURL=GameSound.js.map