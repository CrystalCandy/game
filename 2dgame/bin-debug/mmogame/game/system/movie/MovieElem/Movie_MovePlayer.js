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
var Movie_MovePlayer = (function (_super) {
    __extends(Movie_MovePlayer, _super);
    function Movie_MovePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SPEED_RATIO = 10;
        return _this;
    }
    Movie_MovePlayer.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playId = args[0].var;
        this.speed = args[0].speed || 1;
        this.bCamera = args[0].camera;
        this.saveSpeed = 1;
        this.dir = args[0].dir || null;
        //坐标系类型
        this.coorType = args[0].coor || "map"; //"map"/"view"
        if (this.coorType == "map") {
            var mapPos = SceneManager.getInstance().cellXYtoMapXY(args[0].x, args[0].y);
            this.mapX = mapPos.x;
            this.mapY = mapPos.y;
        }
        else {
            this.mapX = args[0].x;
            this.mapY = args[0].y;
        }
    };
    Movie_MovePlayer.prototype.onBegin = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (!player) {
            this.finish();
            return;
        }
        if (this.bCamera) {
            SceneManager.getInstance().cameraLinkActor(player);
        }
        this.saveSpeed = player.getMoveSpeed();
        player.setMoveSpeed(this.speed * this.SPEED_RATIO);
        var beginPos = SceneManager.getInstance().getCameraViewBeginXY();
        var begin_x = beginPos.x;
        var begin_y = beginPos.y;
        if (this.coorType == "view") {
            this.mapX = this.mapX + begin_x;
            this.mapY = this.mapY + begin_y;
        }
        //if(player.isVisible()==false ){
        //player.setVisible(true)
        //}
        player.wantToGo(this.mapX, this.mapY, true);
        //TLog.Debug("Movie_MovePlayer.onBegin",this.playId)
    };
    Movie_MovePlayer.prototype.onTick = function (delay) {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        var pos = player.getMapXY();
        var x = pos.x, y = pos.y;
        //TLog.Debug("Movie_MovePlayer.onTic",x,y,this.mapX,this.mapY,this.playId)
        if (this.mapX > x - 20 && this.mapX < x + 20) {
            if (this.mapY > y - 20 && this.mapY < y + 20) {
                this.finish();
            }
        }
    };
    Movie_MovePlayer.prototype.destory = function () {
    };
    Movie_MovePlayer.prototype.onFinish = function () {
        //TLog.Debug("Movie_MovePlayer.onFinish",this.playId)
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        //TLog.Debug_r(player)
        if (!player) {
            return;
        }
        player.setMoveSpeed(this.saveSpeed);
        player.moveStop();
        player.setMapXY(this.mapX, this.mapY);
        if (this.dir) {
            player.setDir(this.dir);
        }
        if (this.bCamera) {
            SceneManager.getInstance().cameraUnLinkActor();
            var mapPos = player.getMapXY();
            SceneManager.getInstance().lookAtCenter(mapPos.x, mapPos.y);
        }
    };
    return Movie_MovePlayer;
}(Movie_Elem));
__reflect(Movie_MovePlayer.prototype, "Movie_MovePlayer");
//# sourceMappingURL=Movie_MovePlayer.js.map