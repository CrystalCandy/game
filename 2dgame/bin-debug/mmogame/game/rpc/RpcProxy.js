// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RpcProxy = (function () {
    function RpcProxy() {
    }
    RpcProxy.initProxy = function (jsonData) {
        this.dataMethodMap = jsonData["method"];
        this.dataTypeMap = jsonData["type"];
        this.typeVaryMap = jsonData["typeVary"] || {};
        //继承RPC类型
        var inheritInfo = jsonData["typeInherit"];
        if (inheritInfo) {
            for (var child in inheritInfo) {
                var parent_1 = inheritInfo[child];
                //可能A继承B，B继承C，找出继承顺序链
                var orderInheritList = [];
                JsUtil.arrayInstert(orderInheritList, parent_1);
                while (inheritInfo[parent_1]) {
                    parent_1 = inheritInfo[parent_1];
                    JsUtil.arrayInstert(orderInheritList, parent_1);
                }
                //向child插入parent的变量
                var childTypeList = this.dataTypeMap[child];
                for (var _i = 0, orderInheritList_1 = orderInheritList; _i < orderInheritList_1.length; _i++) {
                    var parent_2 = orderInheritList_1[_i];
                    var parentTypeList = this.dataTypeMap[parent_2];
                    for (var _ = 0; _ < parentTypeList.length; _++) {
                        var dataType_1 = parentTypeList[_];
                        JsUtil.arrayInstert(childTypeList, dataType_1);
                    }
                }
            }
        }
        this.initWriteValueHandler();
        this.initReadValueHandler();
        this.isdump = GAME_DEBUG && IGlobal.config.getBoolean("dumpmsg", true);
    };
    RpcProxy.initWriteValueHandler = function () {
        this.writeValueHanlder[RpcProxy.TYPE_BOOLEAN] = function (writer, value) {
            writer.writeBoolean(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_UINT8] = function (writer, value) {
            writer.writeUChar(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_UINT16] = function (writer, value) {
            writer.writeUShort(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_UINT32] = function (writer, value) {
            writer.writeUInt(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_INT8] = function (writer, value) {
            writer.writeChar(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_INT16] = function (writer, value) {
            writer.writeShort(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_INT32] = function (writer, value) {
            writer.writeInt(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_FLOAT] = function (writer, value) {
            writer.writeFloat(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_DOUBLE] = function (writer, value) {
            writer.writeDouble(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_STRING] = function (writer, value) {
            writer.writeString(value);
        };
        this.writeValueHanlder[RpcProxy.TYPE_TABLE] = function (writer, value) {
            writer.writeString(table_save(value));
        };
    };
    RpcProxy.initReadValueHandler = function () {
        this.readValueHanlder[RpcProxy.TYPE_BOOLEAN] = function (reader) {
            return reader.readBoolean();
        };
        this.readValueHanlder[RpcProxy.TYPE_UINT8] = function (reader) {
            return reader.readChar();
        };
        this.readValueHanlder[RpcProxy.TYPE_UINT16] = function (reader) {
            return reader.readUShort();
        };
        this.readValueHanlder[RpcProxy.TYPE_UINT32] = function (reader) {
            return reader.readUInt();
        };
        this.readValueHanlder[RpcProxy.TYPE_INT8] = function (reader) {
            return reader.readChar();
        };
        this.readValueHanlder[RpcProxy.TYPE_INT16] = function (reader) {
            return reader.readShort();
        };
        this.readValueHanlder[RpcProxy.TYPE_INT32] = function (reader) {
            return reader.readInt();
        };
        this.readValueHanlder[RpcProxy.TYPE_FLOAT] = function (reader) {
            return reader.readFloat();
        };
        this.readValueHanlder[RpcProxy.TYPE_DOUBLE] = function (reader) {
            return reader.readDouble();
        };
        this.readValueHanlder[RpcProxy.TYPE_STRING] = function (reader) {
            return reader.readString();
        };
        this.readValueHanlder[RpcProxy.TYPE_TABLE] = function (reader) {
            var tableStr = reader.readString();
            return table_load(tableStr);
        };
    };
    RpcProxy.call = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var methodSign = this.dataMethodMap[method];
        TLog.Assert(methodSign != null, "RpcProxy.call %s not exsit", method);
        //console.log("call=======================>");
        var paramTypes = splitString(methodSign, ";");
        // if (paramTypes.length != args.length) {
        //     TLog.Error("RpcProxy.call params error: %s, %s", paramTypes.toString(), args.toString());
        //     return;
        // }
        //如果是debug，检查参数是否规范
        if (GAME_DEBUG) {
            for (var i = 0; i < paramTypes.length; i++) {
                var type_1 = paramTypes[i];
                TLog.Assert(this.checkParamType(type_1, args[i]), "RpcProxy.call method:%s param%d:%s error", method, i + 1, this.paramToString(args[i]));
            }
        }
        var dispatcher = GameNetDispatcher.getInstance();
        dispatcher.sendPacketCallback(this.packMessage, this, [method, paramTypes, args]);
    };
    //返回序列化字节流
    RpcProxy.callForStream = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var methodSign = this.dataMethodMap[method];
        TLog.Assert(methodSign != null, "RpcProxy.call %s not exsit", method);
        var paramTypes = splitString(methodSign, ";");
        // if (paramTypes.length != args.length) {
        //     TLog.Error("RpcProxy.call params error: %s, %s", paramTypes.toString(), args.toString());
        //     return;
        // }
        //如果是debug，检查参数是否规范
        if (GAME_DEBUG) {
            for (var i = 0; i < paramTypes.length; i++) {
                var type_2 = paramTypes[i];
                TLog.Assert(this.checkParamType(type_2, args[i]), "RpcProxy.call method:%s param%d:%s error", method, i + 1, this.paramToString(args[i]));
            }
        }
        var stream = new BinaryStream;
        this.packMessage(stream, [method, paramTypes, args]);
        return stream;
    };
    RpcProxy.unpackMessage = function (reader) {
        var method = reader.readString();
        var methodSign = this.dataMethodMap[method];
        if (methodSign == null) {
            TLog.Error("RpcProxy.unpackMessage %s not exsit", method);
            return;
        }
        //TLog.Assert(methodSign != null, "RpcProxy.unpackMessage %s not exsit", method)
        var paramTypes = splitString(methodSign, ";");
        var retArgs = [];
        this.readArgs(paramTypes, reader, retArgs);
        if (this.isdump) {
            TLog.Debug("======dump Rpc recv:%s beign======", method);
            TLog.Debug(JsUtil.JsonEncode(retArgs));
            TLog.Debug("======dump Rpc recv:%s end======", method);
        }
        if (RpcLogic[method] == null) {
            TLog.Error("unpackMessage method:%s not exsit", method);
            return;
        }
        var hanlder = RpcLogic[method];
        hanlder.apply(this, retArgs);
    };
    RpcProxy.unpackUpdateMessage = function (reader) {
        var method = reader.readString();
        var methodSign = this.dataMethodMap[method];
        TLog.Assert(methodSign != null, "RpcProxy.unpackMessage %s not exsit", method);
        var dataTypeList = this.dataTypeMap[methodSign]; //自定义类型
        //自定义类
        //let paramTypes = []
        //let nameParams = []
        var retArgs = [];
        var gid = reader.readUInt();
        var count = reader.readUShort();
        for (var i = 0; i < count; i++) {
            var index = reader.readUShort() - 1; //lua 
            var dataType_2 = dataTypeList[index]; //id:unit或者names:string[]
            var paramSign = dataType_2.split(":");
            TLog.Assert(paramSign.length == 2);
            var value = this.readSingleArg(paramSign[1], reader);
            retArgs[paramSign[0]] = value;
            //nameParams.push(paramSign[0])
            //paramTypes.push(paramSign[1])  //参数类型
        }
        //this.readArgs(paramTypes, reader, retArgs)
        //let args = {}
        //for(let i = 0; i < nameParams.length; i ++){
        //    let name = nameParams[i]
        //    args[name] = retArgs[i]
        //}
        //let paramTypes: string[] = splitString(methodSign, ";")
        //let retArgs = []
        //this.readArgs(paramTypes, reader, retArgs)
        if (this.isdump) {
            TLog.Debug("======dump RpcUpdate recv:%s beign======", method);
            TLog.Debug(JsUtil.JsonEncode(retArgs));
            TLog.Debug("======dump RpcUpdate recv:%s end======", method);
        }
        if (RpcLogic[method] == null) {
            TLog.Error("unpackUpdateMessage method:%s not exsit", method);
            return;
        }
        var hanlder = RpcLogic[method];
        hanlder.apply(this, [gid, retArgs]);
    };
    RpcProxy.packMessage = function (writer, userData) {
        var method = userData[0];
        var paramTypes = userData[1];
        var args = userData[2];
        writer.writeUnsignedShort(opCodes.C2G_RPC_CALL); //rpc code
        writer.writeString(method);
        this.writeArgs(paramTypes, args, writer);
        if (this.isdump) {
            TLog.Debug("======dump Rpc send:%s beign======", method);
            TLog.Debug(JsUtil.JsonEncode(args));
            TLog.Debug("======dump Rpc send:%s end======", method);
        }
    };
    //=====================================================================================
    //检查参数类型
    RpcProxy.paramToString = function (param) {
        if (typeof param == "object") {
            return JsUtil.JsonEncode(param);
        }
        return param + "";
    };
    RpcProxy.checkParamType = function (type, value) {
        if (value == null)
            return false;
        var pos = type.indexOf("[]");
        if (pos != -1) {
            type = type.substring(0, pos);
            var valArray = value;
            TLog.Assert(Array.isArray(valArray));
            if (valArray.length > 0)
                return this.checkParamType(type, valArray[0]);
            else
                return true;
        }
        var dataTypeList = this.dataTypeMap[type]; //自定义类型
        if (dataTypeList != null) {
            var bVaryType = this.typeVaryMap[type] != null;
            for (var i = 0; i < dataTypeList.length; i++) {
                var dataType_3 = dataTypeList[i]; //id:unit或者names:string[]
                var paramSign = splitString(dataType_3, ":");
                TLog.Assert(paramSign.length == 2);
                if (bVaryType) {
                    var argsVal = value[i]; //索引取值
                    if (argsVal) {
                        if (this.checkParamType(paramSign[2], argsVal) == false) {
                            TLog.Error("===checkParamType error name:%s value:%s===", paramSign[1], tostring(argsVal));
                            return false;
                        }
                    }
                }
                else {
                    var argsVal = value[paramSign[0]]; //变量取值
                    if (this.checkParamType(paramSign[1], argsVal) == false) {
                        TLog.Error("===checkParamType error name:%s value:%s===", paramSign[1], tostring(argsVal));
                        return false;
                    }
                }
            }
        }
        else if (type == RpcProxy.TYPE_BOOLEAN) {
            return typeof (value) == "boolean";
        }
        else if (type == RpcProxy.TYPE_STRING) {
            return typeof (value) == "string";
        }
        return true;
    };
    //=====================================================================================
    //写入消息
    RpcProxy.writeSingleArg = function (type, value, writer) {
        //原子类型
        var packFunc = this.writeValueHanlder[type];
        if (packFunc) {
            packFunc.call(this, writer, value);
        }
        else {
            //自定义类
            var dataTypeList = this.dataTypeMap[type];
            TLog.Assert(dataTypeList != null, "RpcProxy:writeSingleArg type:%s ! exsit", type); //找不到类型，表示没有配置type字段，就报错吧
            if (this.typeVaryMap[type] == null) {
                var args = [];
                var paramTypes = [];
                for (var i = 0; i < dataTypeList.length; i++) {
                    var dataType_4 = dataTypeList[i]; //id:unit或者names:string[]
                    var paramSign = splitString(dataType_4, ":");
                    TLog.Assert(paramSign.length == 2);
                    JsUtil.arrayInstert(args, value[paramSign[0]]); //参数值
                    JsUtil.arrayInstert(paramTypes, paramSign[1]); //参数类型
                }
                this.writeArgs(paramTypes, args, writer);
            }
            else {
                //不定参数类型，传入{key:value}
                var count = size_t(value);
                writer.writeUShort(count);
                for (var k in value) {
                    var v = value[k];
                    var dataType_5 = dataTypeList[k]; //id:unit或者names:string[]
                    var paramSign = splitString(dataType_5, ":");
                    TLog.Assert(paramSign.length == 2);
                    writer.writeUInt(tonumber(k) + 1); //索引(lua从1开始)
                    var packFunc_1 = this.writeValueHanlder[paramSign[1]];
                    TLog.Assert(packFunc_1 != null);
                    packFunc_1.call(this, writer, v); //原子类型
                }
            }
        }
    };
    RpcProxy.writeArgs = function (paramTypes, args, writer) {
        for (var i = 0; i < paramTypes.length; i++) {
            var type_3 = paramTypes[i];
            var pos = type_3.indexOf("[]");
            if (pos != -1) {
                type_3 = type_3.substring(0, pos);
                var valArray = args[i];
                TLog.Assert(Array.isArray(valArray));
                //写入数组
                writer.writeUShort(valArray.length);
                for (var j = 0; j < valArray.length; j++) {
                    this.writeSingleArg(type_3, valArray[j], writer);
                }
            }
            else {
                this.writeSingleArg(type_3, args[i], writer);
            }
        }
    };
    //=====================================================================================
    //读取消息
    RpcProxy.readSingleArg = function (type, reader) {
        //原子类型
        var readFunc = this.readValueHanlder[type];
        if (readFunc) {
            return readFunc.call(this, reader);
        }
        else {
            //自定义类
            var dataTypeList = this.dataTypeMap[type];
            TLog.Assert(dataTypeList != null, "RpcProxy:readSingleArg type:%s ! exsit", type); //找不到类型，表示没有配置type字段，就报错吧
            var retClass = {};
            if (this.typeVaryMap[type] == null) {
                var paramTypes = [];
                var nameParams = [];
                var retArgs = [];
                for (var i = 0; i < dataTypeList.length; i++) {
                    var dataType_6 = dataTypeList[i]; //id:unit或者names:string[]
                    var paramSign = splitString(dataType_6, ":");
                    TLog.Assert(paramSign.length == 2);
                    JsUtil.arrayInstert(nameParams, paramSign[0]); //参数值
                    JsUtil.arrayInstert(paramTypes, paramSign[1]); //参数类型
                }
                this.readArgs(paramTypes, reader, retArgs);
                for (var i = 0; i < nameParams.length; i++) {
                    var name_1 = nameParams[i];
                    retClass[name_1] = retArgs[i];
                }
            }
            else {
                var count = reader.readUShort();
                for (var i = 0; i < count; i++) {
                    var k = reader.readUInt();
                    TLog.Assert(k < dataTypeList.length);
                    var dataType_7 = dataTypeList[k - 1];
                    var paramSign = splitString(dataType_7, ":");
                    TLog.Assert(paramSign.length == 2);
                    var readFunc_1 = this.readValueHanlder[paramSign[1]];
                    retClass[paramSign[0]] = readFunc_1.call(this, reader);
                }
            }
            return retClass;
        }
    };
    RpcProxy.readArgs = function (paramTypes, reader, retArgs) {
        for (var i = 0; i < paramTypes.length; i++) {
            var type_4 = paramTypes[i];
            var pos = type_4.indexOf("[]");
            if (pos != -1) {
                type_4 = type_4.substring(0, pos);
                var arrLen = reader.readUShort();
                var arr = [];
                if (arrLen > 0) {
                    for (var j = 0; j < arrLen; j++) {
                        var ret = this.readSingleArg(type_4, reader);
                        arr.push(ret);
                    }
                }
                retArgs.push(arr);
            }
            else {
                retArgs.push(this.readSingleArg(type_4, reader));
            }
        }
    };
    RpcProxy.getDataTypeMap = function () {
        return RpcProxy.dataTypeMap;
    };
    //布尔
    RpcProxy.TYPE_BOOLEAN = "bool";
    //带符号的和不带符号的整型
    RpcProxy.TYPE_UINT8 = "uint8";
    RpcProxy.TYPE_UINT16 = "uint16";
    RpcProxy.TYPE_UINT32 = "uint32";
    RpcProxy.TYPE_INT8 = "int8";
    RpcProxy.TYPE_INT16 = "int16";
    RpcProxy.TYPE_INT32 = "int32";
    //浮点
    RpcProxy.TYPE_FLOAT = "float";
    RpcProxy.TYPE_DOUBLE = "double";
    //字符串
    RpcProxy.TYPE_STRING = "string";
    RpcProxy.TYPE_TABLE = "table";
    RpcProxy.dataMethodMap = null;
    RpcProxy.dataTypeMap = null;
    RpcProxy.typeVaryMap = null;
    RpcProxy.writeValueHanlder = {};
    RpcProxy.readValueHanlder = {};
    RpcProxy.isdump = false;
    return RpcProxy;
}());
__reflect(RpcProxy.prototype, "RpcProxy");
//# sourceMappingURL=RpcProxy.js.map