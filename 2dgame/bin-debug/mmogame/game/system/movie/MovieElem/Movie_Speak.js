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
  2014.1.04(周六)

意图：
    说话窗口，上下黑框

公共接口：

*/
var Movie_Speak = (function (_super) {
    __extends(Movie_Speak, _super);
    function Movie_Speak() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_Speak.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playId = args[0].var;
        this.text = args[0].text;
        this.hideBust = args[0].bOnce || null;
        this.modelOffx = args[0].modelOffx;
        this.modelOffy = args[0].modelOffy;
        this.max_time = args[0].showTime || 3000;
        this.filp = checkNull(args[0].filp, false); //半身像是否正反
        this.time = 0;
        //TLog.Debug("init",args[0].bOnce)
    };
    Movie_Speak.prototype.onBegin = function () {
        this.showFrame();
    };
    Movie_Speak.prototype.onTick = function (delay) {
        //this.time = this.time + delay
        //if(this.time > this.max_time ){
        //	this.finish()
        //}
    };
    Movie_Speak.prototype.destory = function () {
    };
    Movie_Speak.prototype.onFinish = function () {
        //WngMrg.getInstance().hideWindow("MovieDramaFrame")
        //let window = WngMrg.getInstance().getWindow("MovieDramaFrame")
        //window.hideDialog()
        //window.hideWnd()
    };
    //////////////////////////////////////////////////////
    Movie_Speak.prototype.showFrame = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (!player) {
            return;
        }
        //TLog.Debug("dir",player.getDir())
        var modeId;
        var dir = player.getDir();
        var name = player.getProperty("name");
        if (player.classname == "FightActor") {
            var _a = GetFightActorConfig(player), config = _a[0], _ = _a[1];
            modeId = GetActorModel(player.getProperty("entry"), player.getProperty("sexId"));
            if (config && config.Name) {
                name = config.Name;
            }
        }
        else {
            modeId = player.getProperty("body");
            if (this.playId == "hero") {
                modeId = "player";
                //let info = LoginSystem.getInstance().GetsaveLoginName()
                //TLog.Debug_r(info)
                //TLog.Debug("name",name,GetHeroPropertyInfo("name"))
                //io.read()
            }
        }
        //TLog.Debug("showFrame modeId",modeId, this.playId,name,player.classname)
        //let window = WngMrg.getInstance().getWindow("MovieDramaFrame")
        //window.showSpeaking(name, this.text, modeId, dir, this.hideBust, this.modelOffx, this.modelOffy, this.filp)
    };
    return Movie_Speak;
}(Movie_Elem));
__reflect(Movie_Speak.prototype, "Movie_Speak");
//# sourceMappingURL=Movie_Speak.js.map