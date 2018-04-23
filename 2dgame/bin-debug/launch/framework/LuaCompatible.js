// TypeScript file
//兼容lua函数接口
var bit;
(function (bit) {
    function bor() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length <= 1) {
            return params[0] || 0;
        }
        else {
            var ret = params[0] | params[1];
            for (var i = 2; i < params.length; i++) {
                ret = ret | params[i];
            }
            return ret;
        }
    }
    bit.bor = bor;
    function band() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (params.length <= 1) {
            return params[0] || 0;
        }
        else {
            var ret = params[0] & params[1];
            for (var i = 2; i < params.length; i++) {
                ret = ret & params[i];
            }
            return ret;
        }
    }
    bit.band = band;
    function rshift(d, s) {
        return d >> s;
    }
    bit.rshift = rshift;
    function bnot(d) {
        return ~d;
    }
    bit.bnot = bnot;
})(bit || (bit = {}));
/////////////////////////////////////////////////////////////////////////////////////////
function tonumber(v, def) {
    if (v == null)
        return def;
    if (typeof v == "number") {
        return v;
    }
    return JsUtil.toNumber(v, def);
}
function tostring(v) {
    if (v == null)
        return "null";
    return v.toString();
}
function size_t(m) {
    if (Array.isArray(m)) {
        return m.length;
    }
    else if (typeof m == "object") {
        //return Object.keys(m).length;
        var count = 0;
        for (var k in m) {
            count = count + 1;
        }
        return count;
    }
    return 0;
}
function checkNull(v, def) {
    if (v == null) {
        return def;
    }
    return v;
}
function splitString(str, sep) {
    if (str == null || str == "") {
        return [];
    }
    return str.split(sep);
}
/////////////////////////////////////////////////////////////////////////////////////////
function table_load(str, def) {
    if (str == "") {
        return def;
    }
    return JsUtil.JsonDecode(str);
}
function table_save(obj) {
    return JsUtil.JsonEncode(obj);
}
function table_remove(list, val) {
    return JsUtil.arrayRemoveVal(list, val);
}
function table_push(list, val) {
    JsUtil.arrayPush(list, val);
}
function table_insert(list, val, pos) {
    if (pos == null) {
        pos = list.length;
    }
    JsUtil.arrayInstert(list, pos, val);
}
function table_merge(list1, list2) {
    list2.forEach(function (v) {
        list1.push(v);
    });
    return list1;
}
function table_copy(t) {
    return JsUtil.objectCopy(t);
}
function table_concat(list, s) {
    return list.join(s);
}
function table_print(t) {
    TLog.Debug(JsUtil.JsonEncode(t));
}
function table_isExsit(list, obj) {
    // if(Array.isArray(list)){
    // 	return list.indexOf(obj) != -1;
    // }else{
    // }
    for (var k in list) {
        var v = list[k];
        if (v == obj)
            return true;
    }
    return false;
}
function table_sort(list, func) {
    list.sort(func);
}
//--将实例数据复制到obj1，obj1与obj2须属同一类
function table_class_copy(obj1, obj2) {
    if (obj1 == null || obj1.classname == null || obj2 == null || obj2.classname == null) {
        return false;
    }
    if (obj1.classname != obj2.classname) {
        return false;
    }
    return JsUtil.objectCopyEx(obj1, obj2);
}
//table表的key唯一，t[k]=v
function table_union(t1, t2) {
    if (!t1 || !t2) {
        return false;
    }
    for (var k in t2) {
        var v = t2[k];
        t1[k] = v;
    }
    return true;
}
//部分合并，把t2[key]赋值到t1[key1]，如果t1[key]不存在
function table_sub_union(t1, t2) {
    if (!t1 || !t2) {
        return false;
    }
    for (var k in t2) {
        var v = t2[k];
        if (t1[k] == null) {
            t1[k] = v;
        }
    }
    return true;
}
// 表的简单拷贝，key = true
function table_simplecopyvalue(object) {
    if (Array.isArray(object)) {
        return object.concat();
    }
    else {
        var new_tab = {};
        for (var k in object) {
            var v = object[k];
            new_tab[k] = object;
        }
        return new_tab;
    }
}
//属性转化
function table_effect(t) {
    var list = {};
    for (var i in t) {
        var key = t[i][0];
        var value = t[i][1];
        list[key] = value;
    }
    return list;
}
//属性相加
function table_effect_add(t1, t2) {
    for (var key in t1) {
        if (t2[key]) {
            t1[key] += t2[key];
        }
    }
    for (var key in t2) {
        if (t1[key] == null) {
            t1[key] = t2[key];
        }
    }
    return t1;
}
//属性相乘
function table_effect_mul(t, ratio) {
    for (var key in t) {
        t[key] *= ratio;
    }
    return t;
}
//属性相减
function table_effect_sub(t1, t2) {
    for (var key in t1) {
        if (t2 && t2[key]) {
            t1[key] -= t2[key];
        }
    }
    return t1;
}
//切割list，以count个为一组
function splitListByCount(srcList, count) {
    var dstList = [];
    var tempList = [];
    for (var i = 0; i < srcList.length; i++) {
        var v = srcList[i];
        JsUtil.arrayInstert(tempList, v);
        if (tempList.length == count) {
            JsUtil.arrayInstert(dstList, tempList);
            tempList = [];
        }
        //剩余的item也加入列表
        if (i == srcList.length - 1 && tempList.length > 0) {
            JsUtil.arrayInstert(dstList, tempList);
        }
    }
    return dstList;
}
function type(obj) {
    return typeof obj;
}
function unpack(args) {
    var argsKeys = Object.keys(args);
    if (argsKeys.length == 0)
        return [];
    //TLog.Debug(unpack(args),"////////////////-")
    argsKeys = argsKeys.sort(function (a, b) {
        return tonumber(a) - tonumber(b);
    });
    var sortArgsList = [];
    for (var _i = 0, argsKeys_1 = argsKeys; _i < argsKeys_1.length; _i++) {
        var key = argsKeys_1[_i];
        sortArgsList.push(args[key]);
    }
    return sortArgsList;
}
function print_r(info) {
    table_print(info);
}
//# sourceMappingURL=LuaCompatible.js.map