var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UiUtil = (function () {
    function UiUtil() {
    }
    // public constructor() {
    // }
    UiUtil.getCnsText = function (text) {
        return text;
    };
    UiUtil._createLabel = function (component) {
        var label = new eui.Label;
        component.addChild(label);
        label.percentWidth = 100;
        label.percentHeight = 100;
        return label;
    };
    UiUtil._createImage = function (component, source, scale) {
        if (scale == null) {
            scale = false;
        }
        var image = null;
        if (source != null) {
            image = new gui.Grid9Image;
            image.autoScale9Grid = scale;
            image.source = source;
        }
        if (image) {
            image.percentWidth = 100;
            image.percentHeight = 100;
            component.addChild(image);
        }
        return image;
    };
    //----------------------------------------------------------------------
    // private static getDefaultSkinName(component:eui.Component):void{
    // 	if(component.skin == null){
    // 		var theme = egret.getImplementation("eui.Theme");
    // 		if (theme) {
    // 			let skinName = theme.getSkinName(component);
    // 			if(skinName){
    // 				component.skinName = skinName;
    // 			}
    // 		}
    // 	}
    // }
    // //搜索皮肤的控件，type为类类型
    // private static getSkinElem(component:eui.Component, type:any):any{
    // 	var children = component.skin.$elementsContent
    // 	if(children){
    // 		//for(var i = children.length - 1; i>=0;i-- ){
    // 		for(var i = 0; i < children.length; i++){
    // 			var child = children[i]
    // 			if(child instanceof type){
    // 				return child;
    // 			}
    // 		}
    // 	}
    // 	return null;
    // }
    UiUtil._setComponetProperty = function (component, v, prop) {
        if (component == null)
            return;
        if (v[prop] != null) {
            component[prop] = v[prop];
        }
    };
    UiUtil._setComponetProperty2 = function (component, v, prop1, prop2) {
        if (component == null)
            return;
        if (v[prop2] != null) {
            component[prop1] = v[prop2];
        }
    };
    //需要预加载的控件
    // private static _initDefaultSkin(component:eui.Component){
    // 	if(component instanceof eui.Button){
    // 		this.getDefaultSkinName(component);
    // 	}
    // }
    UiUtil._initComponentPosAndSize = function (component, v) {
        //position		
        this._setComponetProperty(component, v, "x");
        this._setComponetProperty(component, v, "y");
        this._setComponetProperty(component, v, "bottom");
        this._setComponetProperty(component, v, "top");
        this._setComponetProperty(component, v, "left");
        this._setComponetProperty(component, v, "right");
        this._setComponetProperty(component, v, "horizontalCenter");
        this._setComponetProperty(component, v, "verticalCenter");
        //size
        this._setComponetProperty2(component, v, "width", "w");
        this._setComponetProperty2(component, v, "height", "h");
        this._setComponetProperty(component, v, "percentWidth");
        this._setComponetProperty(component, v, "percentHeight");
        if (component.width == 0 && component.height == 0 &&
            isNaN(component.percentWidth) && isNaN(component.percentHeight)) {
            var source = "";
            if (component instanceof gui.Button) {
                source = component.source;
            }
            // else if(component instanceof eui.Image){
            // 	source = <string>component.source
            // }
            if (source != null && source != "") {
                var info = IGlobal.imageSet.getImageInfo(source);
                if (info) {
                    component.width = info.sourceW;
                    component.height = info.sourceH;
                }
            }
        }
    };
    UiUtil._initComponentImage = function (component, v) {
        if (component == null || v.image == null)
            return;
        //设置皮肤
        this._setComponetProperty(component, v, "skinName");
        //九宫格
        this._setComponetProperty2(component, v, "autoScale9Grid", "autoScale");
        //设置image
        if (component instanceof eui.Image) {
            this._setComponetProperty2(component, v, "source", "image");
            //<p>设置为 <code>BitmapFillMode.CLIP</code>时，位图将在边缘处被截断。</p>
            //<p>设置为 <code>BitmapFillMode.REPEAT</code>时，位图将重复以填充区域。</p>
            //<p>设置为 <code>BitmapFillMode.SCALE</code>时，位图将拉伸以填充区域。</p>
            this._setComponetProperty(component, v, "fillMode");
            //设置弹跳按钮
        }
        else if (component instanceof gui.Button) {
            var comp = (component);
            //背景
            if (comp.backgroupImage == null) {
                var img = this._createImage(comp, v.image, false);
                if (v.autoScale) {
                    img.autoScale9Grid = true;
                }
                comp.backgroupImage = img;
                comp.setChildIndex(comp.backgroupImage, 0);
            }
            this._setComponetProperty(comp.backgroupImage, v, "fillMode");
            //设置进度条
        }
        else if (component instanceof gui.ProgressBar) {
            var comp = component;
            //背景
            if (comp.backgroupImage == null) {
                comp.backgroupImage = this._createImage(comp, v.image, v.autoScale);
                comp.setChildIndex(comp.backgroupImage, 0);
            }
            //进度条
            if (comp.thumb == null) {
                comp.thumb = this._createImage(comp, v.thumbImage, v.bScaleThumb);
            }
        }
        else if (component instanceof eui.ToggleButton) {
            var skinName = component.skinName;
            if (skinName == null) {
                var toggleSkin = new eui.Skin;
                //底图
                var t = new eui.Image;
                t.percentHeight = 100;
                t.percentWidth = 100;
                t.source = v.image;
                toggleSkin["_Image1"] = t;
                //文本
                var l = new eui.Label();
                toggleSkin["labelDisplay"] = l;
                l.horizontalCenter = 0;
                l.verticalCenter = 0;
                toggleSkin.elementsContent = [t, l];
                toggleSkin.skinParts = ["labelDisplay"];
                toggleSkin.states = [
                    new eui.State("up", []),
                    new eui.State("down", [
                        new eui.SetProperty("_Image1", "source", v.image_down)
                    ]),
                    new eui.State("disabled", [])
                ];
                component.skinName = toggleSkin;
            }
        }
        ////设置进度条
        //else if(component instanceof eui.ToggleButton){
        //	let comp = <eui.ToggleButton>component;
        //	comp.
        //	//背景
        //	if(comp.backgroupImage == null){
        //		comp.backgroupImage = this._createImage(comp, v.image, v.autoScale);
        //		comp.setChildIndex(comp.backgroupImage, 0);
        //	}
        //	//进度条
        //	if(comp.thumb == null){
        //		comp.thumb = this._createImage(comp, v.thumbImage, v.bScaleThumb);
        //	}
        //}		
    };
    UiUtil._initComponentTextCns = function (component, v) {
        if (component == null)
            return;
        if (component["_init_cns_"] == true)
            return;
        component["_init_cns_"] = true;
        if (component instanceof eui.Button) {
            var comp = (component);
            if (comp.labelDisplay != null) {
                var text = comp.labelDisplay.text;
                comp.labelDisplay.text = this.getCnsText(text);
            }
        }
        else if (component instanceof eui.TextInput) {
            component.prompt = this.getCnsText(component.prompt);
        }
        else if (component instanceof eui.EditableText) {
            component.prompt = this.getCnsText(component.prompt);
        }
        if (component instanceof egret.TextField) {
            component.text = this.getCnsText(component.text);
        }
    };
    UiUtil._initComponentText = function (component, v) {
        if (component == null)
            return;
        if (component instanceof eui.Button) {
            var comp = (component);
            if (comp.labelDisplay == null) {
                comp.labelDisplay = this._createLabel(comp);
            }
            this._initComponentText(comp.labelDisplay, v);
        }
        else if (component instanceof eui.TextInput) {
            this._initComponentText(component.textDisplay, v);
            this._setComponetProperty(component, v, "prompt");
        }
        else if (component instanceof eui.EditableText) {
            this._setComponetProperty(component, v, "prompt");
        }
        if (component instanceof egret.TextField) {
            //fontname
            if (v.font) {
                IGlobal.fontSet.updateTextField(v.font, component);
            }
            //var text:egret.TextField = component;
            this._setComponetProperty2(component, v, "textColor", "color");
            this._setComponetProperty2(component, v, "text", "title");
        }
    };
    UiUtil._initComponentMix = function (component, v, elemlist) {
        //杂七杂八的初始化
        if (component instanceof eui.RadioButton) {
            //设置groupName
            this._setComponetProperty(component, v, "groupName");
            //设置group
            this._setComponetProperty(component, v, "group");
            //设置value
            this._setComponetProperty(component, v, "value");
        }
        if (component instanceof eui.Rect) {
            this._setComponetProperty2(component, v, "fillColor", "color");
            this._setComponetProperty2(component, v, "fillAlpha", "alpha");
        }
        if (component instanceof eui.Scroller) {
            if (v.viewport && elemlist[v.viewport]) {
                component.viewport = elemlist[v.viewport];
            }
        }
    };
    UiUtil._initComponent = function (component, v, elemlist, thisObj, parentComponent_) {
        if (v.w == 0)
            v.w = NaN;
        if (v.h == 0)
            v.h = NaN;
        if (v.name) {
            if (v.preFixName) {
                v.name = checkNull(v.preFixName, "") + v.name;
            }
        }
        //设置名字
        this._setComponetProperty(component, v, "name");
        //this._initDefaultSkin(component);
        //初始化图片
        this._initComponentImage(component, v);
        //初始化位置尺寸
        this._initComponentPosAndSize(component, v);
        //初始化字体信息
        this._initComponentTextCns(component, v); //cns
        this._initComponentText(component, v);
        //控件相关的初始化
        this._initComponentMix(component, v, elemlist);
        //事件
        if (v.event_name && v.fun_index) {
            component.addEventListener(v.event_name, v.fun_index, thisObj);
        }
        //触摸自己
        this._setComponetProperty(component, v, "touchEnabled");
        //触摸子节点
        this._setComponetProperty(component, v, "touchChildren");
        this._setComponetProperty(component, v, "enabled");
        if (v.messageFlag) {
            component.touchEnabled = false;
            component.touchChildren = false;
        }
        this._setComponetProperty(component, v, "visible");
        //父节点（通过布局文件初始化的，parentComponent_为null）
        //if(parentComponent_){
        var parent = elemlist[v.parent] != null ? elemlist[v.parent] : parentComponent_;
        if (parent != null) {
            if (parent.addChild) {
                parent.addChild(component);
            }
            else {
                //某些parent（例如eui.Image）没有addChild接口，为了布局方便，以parent的x,y去对位
                var offx = v.x || 0;
                var offy = v.y || 0;
                if (parent.x != null && parent.y != null) {
                    this.setXY(component, offx + parent.x, offy + parent.y);
                    parent.parent.addChild(component);
                    // if(parent.parent == parentComponent_){
                    // 	this.setXY(component, v.x + parent.x, v.y + parent.y)
                    // }else{
                    // 	//如果不是一个坐标系，则先转换到 parentComponent_坐标系下
                    // 	let rect:egret.Rectangle = parent.getTransformedBounds(parentComponent_);
                    // 	this.setXY(component, v.x + rect.x, v.y + rect.y)
                    // }
                    // parentComponent_.addChild(component)
                }
            }
        }
        //}
        elemlist[v.name] = component;
    };
    UiUtil.createComponent = function (classDefinition) {
        TLog.Assert(classDefinition != null, "UiUtil.createComponent");
        return new classDefinition;
    };
    UiUtil.createElem = function (infolist, layerNode, elemlist, thisObj, parent) {
        var _this = this;
        var parentComponent = parent ? parent : layerNode;
        infolist.forEach(function (v) {
            //var component = layerNode.getComponent(v.name); 
            var component = _this.createComponent(v.index_type);
            TLog.Assert(component != null, "UiUtil.createElem");
            _this._initComponent(component, v, elemlist, thisObj, parentComponent);
        });
    };
    UiUtil.initElem = function (infolist, layerNode, elemlist, thisObj) {
        var _this = this;
        infolist.forEach(function (v) {
            var component = layerNode[v.name];
            if (component == null) {
                TLog.Debug("initElem component error", v.name);
            }
            TLog.Assert(component != null, "UiUtil.initElem");
            _this._initComponent(component, v, elemlist, thisObj);
        });
    };
    UiUtil.initElemWithComponent = function (layerNode, elemlist, thisObj, preFixName) {
        var skin = layerNode.skin;
        if (skin) {
            var elemInfo = [];
            for (var _i = 0, _a = skin.skinParts; _i < _a.length; _i++) {
                var name_1 = _a[_i];
                elemInfo.push((_b = {}, _b["name"] = name_1, _b["event_name"] = null, _b["fun_index"] = null, _b["preFixName"] = preFixName, _b));
            }
            UiUtil.initElem(elemInfo, layerNode, elemlist, this);
            for (var _c = 0, _d = skin.skinParts; _c < _d.length; _c++) {
                var name_2 = _d[_c];
                if (layerNode[name_2] && preFixName) {
                    layerNode[preFixName + name_2] = layerNode[name_2];
                    layerNode[name_2] = null;
                }
            }
        }
        var _b;
    };
    UiUtil.initElemWithSkinPath = function (name, mLayoutPath, layerNode, elemlist, thisObj, mParentGroup) {
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Component, _a["name"] = name, _a["image"] = "", _a["skinName"] = mLayoutPath, _a),
        ];
        UiUtil.createElem(elemInfo, layerNode, elemlist, thisObj, mParentGroup);
        UiUtil.initElemWithComponent(elemlist[name], elemlist, thisObj, name);
        var _a;
    };
    //调试用的
    UiUtil.forTestDrawBg = function (component, color) {
        if (color == null) {
            color = gui.Color.green;
        }
        var rect = new eui.Rect;
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        rect.fillColor = color;
        rect.fillAlpha = 0.2;
        component.addChild(rect);
        rect.touchEnabled = false;
    };
    UiUtil.updateProgress = function (p, curVal, maxVal, labelFunction, animTime) {
        if (curVal == null || maxVal == null)
            return;
        TLog.Assert(!isNaN(curVal) && !isNaN(maxVal));
        if (maxVal <= 0)
            return;
        var progress = CastType(p);
        progress.slideDuration = checkNull(animTime, 0); //设置动画时间
        progress.minimum = 0;
        progress.maximum = maxVal;
        progress.value = curVal;
        progress.labelFunction = labelFunction;
    };
    UiUtil.setXY = function (w, x, y) {
        w.x = x;
        w.y = y;
    };
    UiUtil.setWH = function (w, width, height) {
        w.width = width;
        w.height = height;
    };
    UiUtil.setFrameSize = function (w, width, height, x, y) {
        w.x = x;
        w.y = y;
        w.width = width;
        w.height = height;
    };
    UiUtil.moveToFront = function (w) {
        var parent = w.parent;
        if (parent) {
            parent.addChildAt(w, -1);
        }
    };
    UiUtil.moveToBack = function (w) {
        var parent = w.parent;
        if (parent) {
            parent.addChildAt(w, 0);
        }
    };
    UiUtil.setLayerIndex = function (child, index) {
        if (child.parent == null)
            return;
        if (index == null) {
            index = -1;
        }
        child.parent.setChildIndex(child, index);
    };
    UiUtil.registerTouchOutsideEvent = function (callback, thisObj, excludeList, testRect) {
        if (testRect == null) {
            testRect = false;
        }
        for (var i = 0; i < this.touchOutListenerList.length; i++) {
            var info_1 = this.touchOutListenerList[i];
            if (info_1.callback == callback && info_1.obj == thisObj) {
                TLog.Throw("registerTouchOutsideEvent error");
                return;
            }
        }
        var onMouseDown = function (args) {
            var isExclude = false;
            if (testRect) {
                var stageX = args.touchEvent.stageX;
                var stageY = args.touchEvent.stageY;
                isExclude = UiUtil.isExcludeChildWithRect(stageX, stageY, excludeList);
            }
            else {
                var target = args.touchEvent.target;
                isExclude = UiUtil.isExcludeChild(target, excludeList);
            }
            if (isExclude) {
                callback.call(thisObj, args);
            }
        };
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, onMouseDown, this);
        var info = {};
        info.callback = callback;
        info.obj = thisObj;
        info.realCallback = onMouseDown;
        this.touchOutListenerList.push(info);
    };
    //注销点击控件外的响应
    UiUtil.unRegisterTouchOutsideEvent = function (callback, thisObj) {
        for (var i = 0; i < this.touchOutListenerList.length; i++) {
            var info = this.touchOutListenerList[i];
            if (info.callback == callback && info.obj == thisObj) {
                UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, info.realCallback, this);
                this.touchOutListenerList.splice(i, 1);
                break;
            }
        }
    };
    //列表中不包含child，则返回true
    UiUtil.isExcludeChild = function (child, parentList) {
        for (var _i = 0, parentList_1 = parentList; _i < parentList_1.length; _i++) {
            var p = parentList_1[_i];
            if (p && p.contains(child))
                return false;
        }
        return true;
    };
    //列表中不包含child，则返回true（检查的是区域）
    UiUtil.isExcludeChildWithRect = function (stageX, stageY, parentList) {
        for (var _i = 0, parentList_2 = parentList; _i < parentList_2.length; _i++) {
            var p = parentList_2[_i];
            if (core.EgretUtil.hitTestRect(p, stageX, stageY)) {
                return false;
            }
        }
        return true;
    };
    UiUtil.setVisible = function (node, visible, include) {
        node.visible = visible;
        if (include != null) {
            node.includeInLayout = include;
        }
    };
    UiUtil.createGroup = function (name, w, h, parent) {
        var group = new eui.Group;
        group.name = name;
        group.width = w;
        group.height = h;
        if (parent) {
            parent.addChild(group);
        }
        return group;
    };
    //灰化按钮，但是还可以点击
    UiUtil.grayComponent = function (component, bGray) {
        gui.GrayComponent(component, bGray);
    };
    UiUtil.getListDataSouce = function (list) {
        if (list.dataProvider == null)
            return [];
        var arrayColletion = list.dataProvider;
        return arrayColletion.source;
    };
    UiUtil.updateList = function (list, datalist, reset) {
        reset = !!reset;
        if (list.dataProvider == null) {
            list.dataProvider = new eui.ArrayCollection(datalist);
        }
        var arrayColletion = list.dataProvider;
        if (datalist.length == 0 || reset == true) {
            arrayColletion.source = datalist;
        }
        else {
            arrayColletion.removeAll();
            arrayColletion.replaceAll(datalist);
        }
    };
    //垂直滚动
    UiUtil.updateScrollerV = function (scroller, pos) {
        var viewport = scroller.viewport;
        if (viewport == null)
            return;
        viewport.validateNow();
        if (pos < 0) {
            viewport.scrollV = viewport.contentHeight - scroller.height;
            if (viewport.scrollV < 0)
                viewport.scrollV = 0;
        }
        else {
            viewport.scrollV = pos;
        }
    };
    //水平滚动
    UiUtil.updateScrollerH = function (scroller, pos) {
        var viewport = scroller.viewport;
        if (viewport == null)
            return;
        viewport.validateNow();
        if (pos < 0) {
            viewport.scrollH = viewport.contentWidth - scroller.width;
            if (viewport.scrollH < 0)
                viewport.scrollH = 0;
        }
        else {
            viewport.scrollH = pos;
        }
    };
    //注册点击控件外的响应
    UiUtil.touchOutListenerList = [];
    return UiUtil;
}());
__reflect(UiUtil.prototype, "UiUtil");
//# sourceMappingURL=UiUtil.js.map