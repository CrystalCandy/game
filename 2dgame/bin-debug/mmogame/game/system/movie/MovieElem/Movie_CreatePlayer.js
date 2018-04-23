/*
作者:
    lintianfeng
    
创建时间：
   2013.10.28(周一)

意图：
   

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
var Movie_CreatePlayer = (function (_super) {
    __extends(Movie_CreatePlayer, _super);
    function Movie_CreatePlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_CreatePlayer.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.body = args[0].id || 0; //即modelId
        this.x = args[0].x || 0;
        this.y = args[0].y || 0;
        this.name = args[0].name;
        this.id = args[0].var;
        this.dir = args[0].dir || 2;
        this.nameColor = args[0].nameColor || "springgreen";
        this.visible = args[0].visible;
    };
    Movie_CreatePlayer.prototype.destory = function () {
        //if(MovieSystem.getInstance().getPlayer(this.id) ){
        //	MovieSystem.getInstance().deletePlayer(this.id)
        //}
    };
    Movie_CreatePlayer.prototype.onBegin = function () {
        var info = {};
        //TLog.Debug("onBegin",this.id)
        if (this.id != "hero") {
            info.body = this.body;
            info.name = this.name;
            info.id = this.id;
        }
        else {
            info.body = GetHeroModel();
            info.name = GetHeroProperty("name");
            if (!info.name) {
                var loginInfo = LoginSystem.getInstance().getLoginRoleInfo();
                if (loginInfo && loginInfo.name) {
                    info.name = loginInfo.name;
                }
                else {
                    TLog.Error("loginInfo.name	null ");
                    info.name = "";
                }
                TLog.Debug("Movie_CreatePlayer getName ", info.name);
            }
            info.id = "hero";
            //info.cellx, info.celly=GetHero().getMapXY()
            //info.dir = hero.getDir()
            //TLog.Debug_r(GetHeroPropertyInfo())
        }
        info.cellx = this.x;
        info.celly = this.y;
        info.dir = this.dir;
        info.nameColor = this.nameColor;
        //TLog.Debug("Movie_CreatePlayer.onBegin",info.name)
        MovieSystem.getInstance().createPlayer(info, info.cellx, info.celly);
        if (this.visible == false) {
            var player = MovieSystem.getInstance().getPlayer(this.id);
            if (player) {
                player.setVisible(this.visible);
            }
        }
        this.finish();
    };
    //onTick( delay){
    //	
    //}
    Movie_CreatePlayer.prototype.onFinish = function () {
    };
    return Movie_CreatePlayer;
}(Movie_Elem));
__reflect(Movie_CreatePlayer.prototype, "Movie_CreatePlayer");
//# sourceMappingURL=Movie_CreatePlayer.js.map