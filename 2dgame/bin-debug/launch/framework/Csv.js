// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
function readCSV(text, csv_config) {
    //return csv.instance.readCSV(text, 2, true, );
    return readCSVEx(text, 2, true, csv_config);
}
function readCSVEx(text, startLine, head, csv_config) {
    return csv.instance.readCSV(text, startLine, head, csv_config);
}
var csv;
(function (csv_1) {
    var conv_map = {
        n: genNumber,
        n1: genNumber,
        s: genString,
        t: genTable,
        t1: genTableEx,
        // t2:genTableEx2,
        f0: genFunction0,
        f1: genFunction1,
        f2: genFunction2,
        f3: genFunction3,
        c: null,
        b: genBoolean,
        kn: genNumber,
        ks: genString,
    };
    function genFunction0(s) {
        if (s == "")
            return null;
        return eval("(function(){return " + s + "})");
        //return TLog.Assert(loadstring("return function() return " +s +" }"))()
    }
    function genFunction1(s) {
        if (s == "")
            return null;
        return eval("(function(a){return " + s + "})");
        //return TLog.Assert(loadstring("return function(a) return " +s +" }"))()
    }
    function genFunction2(s) {
        if (s == "")
            return null;
        return eval("(function(a, b){return " + s + "})");
        //return TLog.Assert(loadstring("return function(a,b) return " +s +" }"))()
    }
    function genFunction3(s) {
        return eval("(function(a, b, c){return " + s + "})");
        //return TLog.Assert(loadstring("return function(a,b,c) return " +s +" }"))()
    }
    function genBoolean(s) {
        var val = tonumber(s);
        if (val == null || val == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    function genNumber(s) {
        return tonumber(s, 0);
    }
    function genString(s) {
        return s;
    }
    function genTable(s) {
        return LuaParser.parse("{" + s + "}");
    }
    function genTableEx(s) {
        if (s == "")
            return null;
        return LuaParser.parse("{" + s + "}");
    }
    var CsvReader = (function () {
        function CsvReader() {
        }
        CsvReader.prototype.clear = function () {
            delete this.mText;
        };
        CsvReader.prototype.isEof = function () {
            return this.mCurrentPos > this.mTextLen - 1;
        };
        CsvReader.prototype.readLine = function () {
            if (this.isEof())
                return "";
            var bufSize = 64;
            var newLineFound = false;
            var buffList = [];
            while (!newLineFound && !this.isEof()) {
                var str = this.mText.substr(this.mCurrentPos, bufSize);
                var posR = str.indexOf("\r");
                var posN = str.indexOf("\n");
                var pos = -1;
                if (posN != -1 && posR != -1) {
                    pos = Math.min(posR, posN);
                }
                else if (posN != -1) {
                    pos = posN;
                }
                else if (posR != -1) {
                    pos = posR;
                }
                if (pos > -1) {
                    newLineFound = true;
                    var s = str.substring(0, pos);
                    buffList.push(s);
                    if (str.charAt(pos + 1) == "\n") {
                        pos = pos + 1;
                    }
                    this.mCurrentPos = this.mCurrentPos + pos + 1;
                }
                else {
                    var size = Math.min(str.length, bufSize);
                    buffList.push(str);
                    this.mCurrentPos = this.mCurrentPos + size;
                }
            }
            var result = buffList.join("");
            return result;
        };
        CsvReader.prototype.getFieldInfo = function (field) {
            var pos = field.indexOf("_");
            var isKey = false;
            var name = null;
            var datatype = null;
            if (pos != -1) {
                var reg = /(.+)_(\w+)/;
                var resultList = field.match(reg);
                name = resultList[1];
                datatype = resultList[2];
                if (datatype == "kn" || datatype == "ks") {
                    isKey = true;
                }
            }
            else {
                name = field;
                datatype = "n";
                //do return name, conv_map["n"], isKey end
            }
            return { name: name, func: conv_map[datatype], isKey: isKey };
        };
        CsvReader.prototype.fromCSV = function (s, head) {
            //需要补一个逗号最后
            // if(s.lastIndexOf(",") != s.length -1){
            //     s = s + ",";
            // }
            s = s + ',';
            var t = {};
            var fieldstart = 0;
            var val = null;
            var name = null;
            var conv_func = null;
            var key = null;
            var key1 = null;
            var isKey = false;
            var index = 1;
            var idKey = 1;
            var reg = /\"(\")?/g;
            do {
                if (s.charAt(fieldstart) == '"') {
                    //var i = s.indexOf("\"", fieldstart);
                    //设置搜索开始位置
                    reg.lastIndex = fieldstart + 1; //设置新搜索地址
                    //例如"[1]=""abc"", ", 每次要配对"" 
                    var i = -1;
                    var result = null;
                    do {
                        result = reg.exec(s);
                        if (result == null)
                            break;
                        var c = result[1];
                        if (c != '"')
                            break;
                    } while (true);
                    if (result) {
                        i = result.index;
                    }
                    if (i == -1) {
                        throw Error("unmatched \"");
                    }
                    var f = s.substring(fieldstart + 1, i);
                    val = f.replace(/\"\"/g, '"');
                    if (head) {
                        if (head[index]) {
                            var info = this.getFieldInfo(head[index]);
                            name = info.name;
                            conv_func = info.func;
                            isKey = info.isKey;
                            var conValue = null;
                            if (conv_func) {
                                conValue = conv_func(val);
                                if (isKey) {
                                    if (key != null) {
                                        key1 = conValue;
                                    }
                                    else {
                                        key = conValue;
                                    }
                                }
                            }
                            t[name] = conValue;
                        }
                        index++;
                    }
                    else {
                        t[idKey++] = val;
                    }
                    fieldstart = s.indexOf(",", i) + 1;
                }
                else {
                    var nexti = s.indexOf(',', fieldstart);
                    val = s.substring(fieldstart, nexti);
                    if (head) {
                        if (head[index]) {
                            var info = this.getFieldInfo(head[index]);
                            name = info.name;
                            conv_func = info.func;
                            isKey = info.isKey;
                            var conValue = null;
                            if (conv_func) {
                                conValue = conv_func(val);
                                if (isKey) {
                                    if (key != null) {
                                        key1 = conValue;
                                    }
                                    else {
                                        key = conValue;
                                    }
                                }
                            }
                            t[name] = conValue;
                        }
                        index++;
                    }
                    else {
                        t[idKey++] = val;
                    }
                    fieldstart = nexti + 1;
                }
            } while (fieldstart <= s.length - 1);
            return { data: t, key: key, key1: key1 };
        };
        CsvReader.prototype.readCSV = function (text, startLine, table_head, csv_config) {
            this.mText = text;
            this.mTextLen = text.length;
            this.mCurrentPos = 0;
            //TLog.Debug("readCSV length:%d", this.mTextLen);
            var csv = csv_config == null ? {} : csv_config;
            var count = 0;
            var first_line = true;
            var head = null;
            var row = null;
            var key = null;
            var key1 = null;
            var data = null;
            var csvinfo = null;
            var idKey = 1;
            while (!this.isEof()) {
                var line = this.readLine();
                count++;
                if (line == "" || count < startLine || line.charAt(0) == "#") {
                    continue;
                }
                if (line.match(/^,+$/g) != null) {
                    continue;
                }
                if (table_head) {
                    if (first_line) {
                        csvinfo = this.fromCSV(line);
                        head = csvinfo.data;
                    }
                    else {
                        csvinfo = this.fromCSV(line, head);
                        data = csvinfo.data;
                        key = csvinfo.key;
                        key1 = csvinfo.key1;
                        if (key != null) {
                            if (key1 != null) {
                                if (csv[key] == null)
                                    csv[key] = {};
                                csv[key][key1] = data;
                            }
                            else {
                                csv[key] = data;
                            }
                        }
                        else {
                            csv[idKey] = data;
                            idKey++;
                        }
                    }
                }
                else {
                    csvinfo = this.fromCSV(line);
                    csv[idKey] = csvinfo.data;
                    idKey++;
                }
                first_line = false;
            }
            return csv;
        };
        return CsvReader;
    }());
    csv_1.CsvReader = CsvReader;
    __reflect(CsvReader.prototype, "csv.CsvReader");
    csv_1.instance = new CsvReader();
})(csv || (csv = {}));
//# sourceMappingURL=Csv.js.map