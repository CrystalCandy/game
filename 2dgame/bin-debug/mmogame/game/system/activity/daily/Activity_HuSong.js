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
// TypeScript file
var Activity_HuSong = (function (_super) {
    __extends(Activity_HuSong, _super);
    function Activity_HuSong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_HuSong.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    Activity_HuSong.prototype.destory = function () {
        // UnRegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // UnRegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
    };
    Activity_HuSong.prototype.onPrepareResource = function () {
        // RegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // RegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
        this.messageWndHandleIndex = (_a = {},
            _a["G2C_EnterEscortActivity"] = [this.onRecvHuSong, [["EscortFrame", "updateWnd"], ["OdysseyEscortFrame", "updateWnd"], ["ActivityListFrame", "updateWnd"]], true],
            _a["G2C_EscortList"] = [this.onRecvHuSongList, [["EscortFrame", "updateWnd"]], true],
            _a["G2C_RandEscortIndex"] = [this.onRecvHuSongIndex, [["OdysseyEscortFrame", "updateWnd"]], true],
            _a["G2C_RobberEscortRecordList"] = [this.onRecvRobberRecordList, [["InterceptRecordFrame", "updateWnd"]], true],
            _a["G2C_PutEscortPrizeInfo"] = [this.onRecvPrize, [["EscortFrame", "onShowPrize"]], true],
            _a);
        var _a;
    };
    Activity_HuSong.prototype.onClear = function () {
        this.husongInfo = {};
        this.husongList = [];
        this.robberList = [];
        this.prizeInfo = {};
    };
    Activity_HuSong.prototype.onRecvHuSong = function (message) {
        this.husongInfo = {};
        this.husongInfo = message;
        return true;
    };
    Activity_HuSong.prototype.onRecvHuSongList = function (message) {
        this.husongList = [];
        for (var k in message) {
            var v = message[k];
            var tempConfig = {};
            tempConfig["id"] = v[0];
            tempConfig["name"] = v[1];
            tempConfig["time"] = v[2];
            tempConfig["index"] = v[3];
            tempConfig["banghui"] = v[4];
            tempConfig["force"] = v[5];
            tempConfig["robbered"] = v[6];
            table_insert(this.husongList, tempConfig);
        }
        //this.husongList = message
        return true;
    };
    Activity_HuSong.prototype.onRecvRobberRecordList = function (message) {
        this.robberList = [];
        for (var k in message) {
            var v = message[k];
            var tempConfig = {};
            tempConfig["id"] = v[0];
            tempConfig["name"] = v[1];
            tempConfig["time"] = v[2];
            tempConfig["index"] = v[3];
            tempConfig["winFlag"] = v[4];
            tempConfig["revengeFlag"] = v[5];
            tempConfig["faction"] = v[6];
            tempConfig["force"] = v[7];
            table_insert(this.robberList, tempConfig);
        }
        return true;
    };
    Activity_HuSong.prototype.onRecvHuSongIndex = function (message) {
        this.husongInfo["index"] = message;
        return true;
    };
    Activity_HuSong.prototype.onRecvPrize = function (message) {
        this.prizeInfo = {};
        this.prizeInfo["recordList"] = [];
        var recordList = message[0];
        for (var k = 0; k < size_t(recordList); k++) {
            var record = recordList[k];
            var tempConfig = {};
            tempConfig["name"] = record[0];
            tempConfig["winFlag"] = record[1];
            table_insert(this.prizeInfo["recordList"], tempConfig);
        }
        this.prizeInfo["prizeRatio"] = message[1];
        return true;
    };
    ///------------- 取数据
    Activity_HuSong.prototype.getActInfo = function () {
        return this.husongInfo;
    };
    Activity_HuSong.prototype.getHuSongList = function () {
        return this.husongList;
    };
    Activity_HuSong.prototype.getRobberRecordList = function () {
        return this.robberList;
    };
    Activity_HuSong.prototype.getHusongPrize = function () {
        return this.prizeInfo;
    };
    //护送橙镖的次数
    Activity_HuSong.prototype.getConvoyNum = function () {
        return this.husongInfo.chengTwice;
    };
    return Activity_HuSong;
}(ActivityBase));
__reflect(Activity_HuSong.prototype, "Activity_HuSong");
//# sourceMappingURL=Activity_HuSong.js.map