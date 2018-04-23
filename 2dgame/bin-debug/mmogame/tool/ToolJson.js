var tooljson;
(function (tooljson) {
    function encodeString(s) {
        s = s.replace(/\\/g, '\\\\');
        s = s.replace(/\"/g, '\\"');
        s = s.replace(/\'/g, '\\');
        s = s.replace(/\r/g, '\\r');
        s = s.replace(/\n/g, '\\n');
        s = s.replace(/\t/g, '\\t');
        return s;
    }
    function isEncodable(o) {
        var t = typeof o;
        return (t == 'string' || t == 'boolean' || t == 'number' || t == 'object') || (t == 'function' && o == null);
    }
    function encode(v, deep) {
        if (deep == null) {
            deep = 0;
        }
        // Handle null values
        if (v == null) {
            return "null";
        }
        var vtype = typeof v;
        // Handle strings
        if (vtype == 'string') {
            return '"' + encodeString(v) + '"'; // Need to handle encoding in string
        }
        // Handle booleans
        if (vtype == 'number' || vtype == 'boolean') {
            return tostring(v);
        }
        // Handle tables
        if (vtype == 'object') {
            var rval = [];
            // Consider arrays separately
            var bArray = Array.isArray(v);
            if (bArray) {
                for (var i = 0; i < v.length; i++) {
                    //table.insert(rval, encode(v[i], deep + 1))
                    rval.push(encode(v[i], deep + 1));
                }
            }
            else {
                //排序输出
                var sort_key = Object.keys(v).sort();
                //for _,key in base.pairs(sort_key) do
                for (var sk = 0; sk < sort_key.length; sk++) {
                    var key = sort_key[sk];
                    var i = key;
                    var j = v[key];
                    if (isEncodable(i) && isEncodable(j)) {
                        var str = null;
                        // if(base.type(i) == "number"){
                        // 	str = encodeString(i)+ ':' + encode(j, deep + 1) //数字
                        // }else{
                        str = '"' + encodeString(i) + '":' + encode(j, deep + 1); //字符串
                        //}
                        if (deep == 0) {
                            str = "\r\n" + str;
                        }
                        rval.push(str);
                    }
                }
            }
            if (bArray) {
                return '[' + rval.join(',') + ']\r\n';
            }
            else {
                return '{' + rval.join(',') + '}\r\n';
            }
        }
        // Handle null values
        if (vtype == 'function' && v == null) {
            return 'null';
        }
        TLog.Assert(false, 'encode attempt to encode unsupported type ' + vtype + ':' + tostring(v));
    }
    tooljson.encode = encode;
})(tooljson || (tooljson = {}));
//# sourceMappingURL=ToolJson.js.map