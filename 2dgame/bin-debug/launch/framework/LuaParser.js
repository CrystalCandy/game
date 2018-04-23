// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LuaParser = (function () {
    function LuaParser() {
    }
    // public static decodeObj(str:string, strPos?:number) : any{
    // }
    LuaParser.transformWord = function (str) {
        if ("true" == str) {
            return true;
        }
        else if ("false" == str) {
            return false;
        }
        else if ("nil" == str) {
            return null;
        }
        TLog.Throw("LuaParser.transformWord %s", str);
    };
    LuaParser.decodeObj = function (str, strPos, obj) {
        var key = null;
        var index = 0;
        var isBeginKey = false;
        var checkAssign = false; //检查赋值"="
        for (var pos = strPos; pos < str.length;) {
            var s = str.charAt(pos);
            var code = str.charCodeAt(pos);
            if (s == " " || s == ",") {
                pos++;
                continue;
            }
            if (checkAssign) {
                checkAssign = false;
                TLog.Assert(s == "=", "LuaParser.decodeObj:%s can not =", str);
                pos++;
                continue;
            }
            if (s == "[") {
                isBeginKey = true;
            }
            else if (s == "]") {
                isBeginKey = false;
                checkAssign = true;
            }
            else if (code >= 48 && code <= 57 || code == 45) {
                var b = pos;
                var numStr = s;
                while (true) {
                    b = b + 1;
                    var nextCode = str.charCodeAt(b);
                    if (!(nextCode >= 48 && nextCode <= 57 || nextCode == 46))
                        break;
                    var nextS = str.charAt(b);
                    numStr = numStr + nextS;
                }
                if (isBeginKey) {
                    key = numStr;
                }
                else {
                    var v = JsUtil.parseFloat(numStr);
                    TLog.Assert(JsUtil.isNaN(v) == false, "LuaParser.decodeObj%s number error", str);
                    if (key) {
                        obj[key] = v;
                        key = null;
                    }
                    else {
                        obj[index] = v;
                        index++;
                    }
                }
                pos = b;
                continue;
            }
            else if (s == "\"" || s == "\'") {
                var b = StringUtil.stringSeach(str, s, pos + 1);
                TLog.Assert(b != -1, "LuaParser.decodeObj%s can not find \" ", str);
                var v = str.substring(pos + 1, b);
                //找到另外一个字符串
                if (isBeginKey) {
                    key = v;
                }
                else {
                    if (key) {
                        obj[key] = v;
                        key = null;
                    }
                    else {
                        obj[index] = v;
                        index++;
                    }
                }
                pos = b + 1;
                continue;
            }
            else if (s == "{") {
                var v = this.parse(str, pos);
                if (key) {
                    obj[key] = v;
                    key = null;
                }
                else {
                    obj[index] = v;
                    index++;
                }
                pos = this.lastObjectPos + 1;
                continue;
            }
            else if (s == "}") {
                this.lastObjectPos = pos;
                break;
            }
            else {
                //指定的几种关键词才能作为value
                var resultWord = null;
                var checkWordList = ["false", "true", "nil"];
                //检查是否作为key
                if (key == null) {
                    var resultPos = StringUtil.stringSeach(str, "\s*=", pos); //查找key
                    if (resultPos != -1) {
                        var resultStr = str.substring(pos, resultPos);
                        if (JsUtil.arrayExsit(checkWordList, resultStr)) {
                            resultWord = resultStr;
                        }
                        else {
                            key = resultStr;
                            checkAssign = true; //检查等号
                            pos = resultPos;
                            continue;
                        }
                    }
                }
                //检查是否作为value,必须是指定关键字
                if (resultWord == null) {
                    for (var i = 0; i < checkWordList.length; i++) {
                        var word = checkWordList[i];
                        var resultPos = StringUtil.stringSeach(str, word, pos);
                        if (resultPos == pos) {
                            resultWord = word;
                            break;
                        }
                    }
                }
                if (resultWord) {
                    //TLog.Assert(key != null, "LuaParser.decodeObj%s key error ", str)
                    var v = this.transformWord(resultWord);
                    if (key) {
                        obj[key] = v;
                        key = null;
                    }
                    else {
                        obj[index] = v;
                        index++;
                    }
                    pos = pos + resultWord.length; //新的位置查找
                    continue;
                }
                //格式错误了
                TLog.Throw("LuaParser.decodeObj%s error ", str);
            }
            pos++;
        }
    };
    LuaParser.parse = function (str, strPos) {
        if (str == "")
            return null;
        if (strPos == null)
            strPos = 0;
        var obj = {};
        for (var pos = strPos; pos < str.length;) {
            var s = str.charAt(pos);
            var code = str.charCodeAt(pos);
            if (s == " ") {
                pos++;
                continue;
            }
            if (s == "{") {
                this.decodeObj(str, pos + 1, obj);
                //如果有0索引，将数组转成Array
                if (obj[0]) {
                    var isArray = true;
                    var keylist = Object.keys(obj);
                    for (var i = 0; i < keylist.length; i++) {
                        var v = keylist[i];
                        if (isNaN(tonumber(v))) {
                            isArray = false;
                            break;
                        }
                    }
                    if (isArray) {
                        var sortkeylist = keylist.sort(function (a, b) {
                            var aVal = Number(a);
                            var bVal = Number(b);
                            //TLog.Assert(!isNaN(aVal) && !isNaN(bVal) && aVal >= 0 && bVal >= 0)
                            return aVal - bVal;
                        });
                        if (sortkeylist.length > 0) {
                            var listObj = [];
                            for (var i = 0; i < sortkeylist.length; i++) {
                                var key = sortkeylist[i];
                                listObj[i] = obj[key];
                            }
                            obj = listObj;
                        }
                    }
                }
                //TLog.Assert(lastObjectPos != -1, "LuaParser.decode%s error ", str)
                break;
            }
            else {
                TLog.Throw("LuaParser.parse %s", str);
            }
        }
        return obj;
    };
    LuaParser.lastObjectPos = -1;
    return LuaParser;
}());
__reflect(LuaParser.prototype, "LuaParser");
//# sourceMappingURL=LuaParser.js.map