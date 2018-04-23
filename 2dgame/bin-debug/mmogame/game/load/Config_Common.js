// TypeScript file
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
var GameConfig;
(function (GameConfig) {
    //通用表单
    GameConfig.CnsConfig = {};
    GameConfig.NetMsgConfig = {};
    GameConfig.xmlKeyWordConfig = {};
    GameConfig.nameConfig = {};
    GameConfig.ImageSetListConfig = {};
    var ImageSetWorkUnit = (function (_super) {
        __extends(ImageSetWorkUnit, _super);
        function ImageSetWorkUnit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //子类复写 初始化函数
        ImageSetWorkUnit.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.path = params[0];
        };
        //子类复写 析构函数
        ImageSetWorkUnit.prototype.destory = function () {
        };
        ImageSetWorkUnit.prototype.onExcute = function () {
            IGlobal.imageSet.loadImageSet(this.path, this);
            return false;
        };
        ImageSetWorkUnit.prototype.onImageSetLoad = function (name) {
            this.notifyExcuteComplete();
        };
        return ImageSetWorkUnit;
    }(WorkUnit));
    GameConfig.ImageSetWorkUnit = ImageSetWorkUnit;
    __reflect(ImageSetWorkUnit.prototype, "GameConfig.ImageSetWorkUnit", ["gui.ImageSetLoadCallback"]);
    // export function LoadCsv(data:string, csv_config:any): void{
    //     //TLog.Assert(GameConfig[varName] !== undefined, "GameConfig[%s] not define", varName);
    //     //GameConfig[varName] = readCSV(data);
    //     TLog.Assert(csv_config != null, "LoadCsv");
    //     readCSV(data, csv_config);
    // }
    ////////////////////////////////////////////////////////////////////////////////////////////
    // function initCns(data:any){
    // 	GameConfig.loadCsvData(data, "CnsConfig");
    // }
    function _initNetMsg(data) {
        var tmpConfig = readCSV(data);
        for (var k in tmpConfig) {
            var v = tmpConfig[k];
            if (v.key != null && v.show != null && v.msg != null && v.transform != null) {
                var info = (_a = {}, _a["show"] = v.show, _a["msg"] = v.msg, _a["transform"] = v.transform, _a["count"] = v.count || 0, _a["priority"] = v.priority || 0, _a);
                var code = resultCode[v.key];
                if (code != null) {
                    //以字符串作索引，例如C2G_Move
                    GameConfig.NetMsgConfig[code.toString()] = info;
                    //以Id作索引，如C2G_Move==1000,就以1000做key
                    GameConfig.NetMsgConfig[v.key] = info;
                }
            }
        }
        var _a;
    }
    function _initLoginImageSetList(data, workQueue) {
        GameConfig.ImageSetListConfig = readCSV(data);
        for (var k in GameConfig.ImageSetListConfig) {
            var v = GameConfig.ImageSetListConfig[k];
            if (v.type == "login") {
                workQueue.addWorkUnit(ImageSetWorkUnit.newObj(v.filename));
            }
        }
    }
    function _initImageSet(data) {
        var imageset = readCSV(data);
        var area_info = gui.ImageInfo.newObj();
        for (var k in imageset) {
            var v = imageset[k];
            if (v.refname != "") {
                var image_info = IGlobal.imageSet.getImageInfo(v.refname);
                if (image_info == null) {
                    TLog.Error("name:%s refname:%s is null", v.name, v.refname);
                }
                else {
                    area_info.x = image_info.x;
                    area_info.y = image_info.y;
                    area_info.w = image_info.w;
                    area_info.h = image_info.h;
                    IGlobal.imageSet.insertInfo(v.name, image_info.fileName, area_info);
                }
            }
            else {
                area_info.x = v.x;
                area_info.y = v.y;
                area_info.w = v.w;
                area_info.h = v.h;
                IGlobal.imageSet.insertInfo(v.name, v.filename, area_info);
            }
        }
    }
    function _initAnimSet(data) {
        var AnimSetCsvTable = readCSV(data);
        for (var k in AnimSetCsvTable) {
            var v = AnimSetCsvTable[k];
            IGlobal.animSet.insertInfo(k, v.w, v.h, v.count, v.interval);
        }
    }
    function _initFilterWords(data) {
        var config = readCSV(data);
        var result_list = [];
        for (var k in config) {
            var v = config[k];
            result_list.push(v.content);
        }
        WordFilter.initFilterList(result_list);
    }
    function _initForbidName(data) {
        var config = readCSV(data);
        var result_list = [];
        for (var k in config) {
            var v = config[k];
            result_list.push(v.content);
        }
        WordFilter.initForbidName(result_list);
    }
    function _initRpcProtocol(data) {
        var jsonData = JsUtil.JsonDecode(data);
        RpcProxy.initProxy(jsonData);
        initRpcObjectField();
    }
    function initCommonCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/Cns/cns.csv", readCSV, this, GameConfig.CnsConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/Cns/net_msg.csv", _initNetMsg, this, GameConfig.NetMsgConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/xml_keyword.csv", readCSV, this, GameConfig.xmlKeyWordConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/image_set.csv", _initImageSet, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/image_set_list.csv", _initLoginImageSetList, this, workQueue));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ui_anim.csv", _initAnimSet, this, workQueue));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/name.csv", readCSV, this, GameConfig.nameConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/Badwords/FilterWords.csv", _initFilterWords, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/Badwords/ForbidName.csv", _initForbidName, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/protocol/RPCProtocol.json", _initRpcProtocol, this));
    }
    GameConfig.initCommonCsv = initCommonCsv;
})(GameConfig || (GameConfig = {}));
//# sourceMappingURL=Config_Common.js.map