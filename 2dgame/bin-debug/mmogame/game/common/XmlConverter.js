// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XmlConverter = (function () {
    function XmlConverter() {
    }
    XmlConverter._init = function () {
        var _this = this;
        JsUtil.objectForEach(GameConfig.xmlKeyWordConfig, function (v, k) {
            _this.XmlKeyWord[v.key] = v.value;
        });
        var key_len = [];
        for (var k in this.XmlKeyWord) {
            var len = k.length;
            var badd = true;
            for (var i = 0; i < key_len.length; i++) {
                if (len == key_len[i]) {
                    badd = false;
                    break;
                }
            }
            if (badd) {
                key_len.push(len);
            }
        }
        key_len.sort(function (a, b) {
            return b - a; //大到小排序
        });
        this.XmlKeyWordLenList = key_len;
        this.replaceArr = [];
        this.replaceArr.push([/</g, "&lt;"]);
        this.replaceArr.push([/>/g, "&gt;"]);
        this.replaceArr.push([/&/g, "&amp;"]);
        this.replaceArr.push([/\"/g, "&quot;"]);
        this.replaceArr.push([/\'/g, "&apos;"]);
    };
    XmlConverter.add_content = function (content, rd) {
        var str = null;
        if (rd._linkcontent) {
            str = String.format("<text name=\"%s\" color=\"%s\" link=\"%s\">%s</text>", rd.defalut_font, rd.default_color, rd._linkcontent, content);
            rd._linkcontent = null;
        }
        else {
            str = String.format("<text name=\"%s\" color=\"%s\">%s</text>", rd.defalut_font, rd.default_color, content);
        }
        return str;
    };
    XmlConverter.add_breakline = function (rd) {
        return "<br/>";
    };
    XmlConverter.add_keyword = function (content, rd) {
        var keyInfo = this.XmlKeyWord[content]; //得到内容      
        if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.STYLE) {
            if (!rd.no_change_font) {
                if (keyInfo.font) {
                    rd.defalut_font = keyInfo.font;
                } //默认字体
            }
            if (!rd.no_change_color) {
                if (keyInfo.color) {
                    rd.default_color = keyInfo.color;
                } //默认颜色
            }
            return null;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.IMAGE) {
            var img_txt = String.format("<image name=\"%s\"/>", keyInfo.name);
            return img_txt;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.FACE) {
            //let anim_txt = "<anim name=" .. keyInfo.anim_name .. " %s>#"..content.."</anim>"
            var anim_txt = String.format("<anim name=\"%s\">%s</anim>", keyInfo.anim_name, content);
            ;
            return anim_txt;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.SAVE_FONT) {
            rd._save_color = rd.default_color;
            rd._save_font = rd.defalut_font;
            return null;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.RESTORE_FONT) {
            rd.default_color = rd._save_color;
            rd.defalut_font = rd._save_font;
            return null;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.BR) {
            var br_txt = "<br />";
            return br_txt;
        }
        else if (keyInfo.type == this.FIELD_CHANNEL_KEYWORD.SPACE) {
            if (keyInfo.style == null) {
                return String.format("<hor_blank value=\"%d\" />", keyInfo.hor_blank);
            }
        }
        return this.add_content("#" + content, rd); //没有找到响应内容，则当普通文本
    };
    XmlConverter.add_link = function (content, rd) {
        if (!rd.link_parser) {
            return null;
        }
        var info = rd.link_parser(content, rd.showColor);
        if (!info || !info.link || !info.name) {
            return null;
        }
        var link = info.link;
        var name = info.name;
        var color = info.color || rd.default_color;
        rd.link_name = name;
        return String.format("<text name=\"%s\" color=\"%s\" link=\"%s\" >[%s]</text>", rd.defalut_font, color, link, name);
    };
    XmlConverter.filter_xml_content = function (content) {
        for (var i = 0; i < this.replaceArr.length; i++) {
            var k = this.replaceArr[i][0];
            var v = this.replaceArr[i][1];
            content = content.replace(k, v);
        }
        return content;
    };
    XmlConverter.parseText = function (content, rd) {
        if (this.s_init == false) {
            this.s_init = true;
            this._init();
        }
        content = this.filter_xml_content(content);
        rd = rd || {};
        rd.default_color = rd.default_color || "ublack";
        rd.defalut_font = rd.defalut_font || "ht_20_lc";
        rd._save_color = rd.default_color;
        rd._save_font = rd.defalut_font;
        rd.no_change_font = (rd.no_change_font == true);
        rd.no_planetex = (rd.no_planetex == true);
        rd.no_break_line = (rd.no_break_line == true);
        rd.getplanetxt = rd.getplanetxt || false;
        rd.no_change_color = (rd.no_change_color == true);
        var findbegin = 0;
        var wordbegin = 0;
        var xml = "";
        var planetxt = "";
        var pattern = String.format("[%s%s\r\n]", this.KeyWordSign, this.LinkSign);
        while (true) {
            var b = StringUtil.stringSeach(content, pattern, findbegin);
            if (b == -1) {
                var word = content.substring(wordbegin);
                if (word != "") {
                    xml = xml + this.add_content(word, rd);
                    planetxt = planetxt + word;
                }
                if (!rd.no_break_line) {
                    xml = xml + this.add_breakline(rd);
                    planetxt = planetxt + "\n";
                }
                break;
            }
            var sign = content.charAt(b);
            if (sign == "\n" || sign == '\r') {
                var word = content.substring(wordbegin, b);
                if (word != "") {
                    xml = xml + this.add_content(word, rd);
                    planetxt = planetxt + word;
                }
                if ((xml != "" || b == 0) && b != content.length - 1) {
                    xml = xml + this.add_breakline(rd);
                    planetxt = planetxt + "\n";
                }
                if (sign == "\r") {
                    var newline = content.charAt(b + 1);
                    if (newline == "\n") {
                        b = b + 1;
                    }
                }
                wordbegin = b + 1;
                findbegin = wordbegin;
            }
            else if (sign == this.KeyWordSign) {
                var key_len = -1; //关键字长度
                var keyword = null; //井号后的关键字
                var keyInfo = null; //关键字信息
                for (var i = 0; i < this.XmlKeyWordLenList.length; i++) {
                    var len = this.XmlKeyWordLenList[i];
                    keyword = content.substring(b + 1, b + len + 1);
                    keyInfo = this.XmlKeyWord[keyword];
                    if (keyInfo != null) {
                        key_len = len;
                        keyword = keyword;
                        break;
                    }
                }
                if (key_len > 0) {
                    var word = content.substring(wordbegin, b);
                    if (word != "") {
                        xml = xml + this.add_content(word, rd);
                        planetxt = planetxt + word;
                    }
                    //类型是STYLE而且关键字紧接符号“|”。如:#nor|'10007;1;云中子'|带有超链接的
                    var ret = this.add_keyword(keyword, rd);
                    if (ret) {
                        xml = xml + ret;
                    }
                    var link_sign = "|";
                    var lsign = content.charAt(b + key_len + 1);
                    if (link_sign == lsign) {
                        var tb = StringUtil.stringSeach(content, "[" + link_sign + "]", b + key_len + 2); //一定要是一对的
                        if (tb == -1) {
                            wordbegin = b + key_len + 1;
                        }
                        else {
                            var linkcontent = content.substring(b + key_len + 2, tb);
                            if (linkcontent != "") {
                                rd._linkcontent = linkcontent; //记录超链接信息
                            }
                            wordbegin = tb + 1; //另一端的'|'开始算
                        }
                        findbegin = wordbegin;
                    }
                    else {
                        wordbegin = b + key_len + 1;
                        findbegin = wordbegin;
                    }
                }
                else {
                    //找不到关键字
                    findbegin = findbegin + 1;
                }
            }
            else if (this.LinkSign == sign) {
                var word = content.substring(wordbegin, b);
                if (word != "") {
                    xml = xml + this.add_content(word, rd);
                    planetxt = planetxt + word;
                }
                var ob = StringUtil.stringSeach(content, "[" + this.LinkSign + "]", b + 1); //一定要是一对的
                if (ob == -1) {
                    ob = b;
                }
                else {
                    var word_1 = content.substring(b + 1, ob);
                    var link = this.add_link(word_1, rd);
                    if (link) {
                        xml = xml + link;
                        if (rd.link_name) {
                            planetxt = planetxt + String.format("[%s]", rd.link_name);
                            rd.link_name = null;
                        }
                    }
                }
                wordbegin = ob + 1;
                findbegin = wordbegin;
            }
            else {
                findbegin = findbegin + 1;
            }
        }
        if (rd.getplanetxt) {
            return planetxt;
        }
        else {
            return xml;
        }
    };
    XmlConverter.getLinkXml = function (link, content, color, font) {
        color = color || "white";
        font = font || "ht_20_lc";
        link = this.LinkSign + link + this.LinkSign;
        return String.format("<text name=\"%s\" color=\"%s\" link=\"%s\" >[%s]</text>", font, color, link, content);
    };
    XmlConverter.convertDynamicWord = function (text) {
        var pos = text.indexOf("##");
        if (pos < 0) {
            return text;
        }
        var strList = text.split("##");
        if (strList.length <= 2) {
            return text;
        }
        var length = strList.length;
        //双数的最后一条，拼接##
        if (length % 2 == 0) {
            var str = strList[length - 1];
            strList[length - 1] = "##" + str;
        }
        for (var i = 0; i < length; i++) {
            var str = strList[i];
            if (i % 2 == 1 && i != length - 1) {
                if (str != "") {
                    // let event = new GUITranslateWordEvent(RichDisplayer.RichDisplayerTranslateEvent, this);
                    // event.setTranslateWord(str);
                    // this.dispatchEvent(event);
                    // let transStr = event.getTranslateWord();
                    var transStr = TaskExecutor.getInstance().executeGetReplaceWord(str, 0);
                    if (transStr == "") {
                        //strList[i] = transStr;
                        return text;
                    }
                    else {
                        strList[i] = transStr;
                    }
                }
            }
        }
        return strList.join("");
    };
    XmlConverter.s_init = false;
    XmlConverter.XmlKeyWord = {};
    XmlConverter.XmlKeyWordLenList = [];
    //static LinkSign = String.fromCharCode(3);
    XmlConverter.LinkSign = String.fromCharCode(8);
    XmlConverter.KeyWordSign = "#";
    XmlConverter.replaceArr = [];
    XmlConverter.FIELD_CHANNEL_KEYWORD = (_a = {},
        _a["STYLE"] = 1,
        _a["IMAGE"] = 2,
        _a["FACE"] = 3,
        _a["SAVE_FONT"] = 6,
        _a["RESTORE_FONT"] = 7,
        _a["BR"] = 8,
        _a["SPACE"] = 9,
        _a);
    return XmlConverter;
}());
__reflect(XmlConverter.prototype, "XmlConverter");
var _a;
//# sourceMappingURL=XmlConverter.js.map