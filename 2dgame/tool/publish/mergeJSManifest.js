/// <reference path="../lib/types.d.ts" />
var FS = require('fs');
var file = require('../lib/FileUtil');
var mergeJSManifest = function(arg){
	trace('');
}

mergeJSManifest.prototype.execute = function () {
	//当前目录
	var cmdPath = egret.args.projectDir;

	//var mergeOtherLibs = true;

	//找index.html和相关的js库，main.min.js不参与
	// var indexHtml = cmdPath + "index.html";
	// if(!file.exists(indexHtml)){
	// 	trace('找不到index.html -_-#');
	// 	return 0;
	// }
	
	// //index.html的内容
	// var indexCode = file.read(indexHtml, true);
	// var key = '<script egret="lib" src="';//查找关键字
	// var key2 = '"></script>';
	// var key3 = '<!--other_libs_files_start-->';
	// var key4 = '<!--other_libs_files_end-->';

	// var arr = indexCode.split(key);
	
	// //找到所有的js文件
	// var jsFiles = [];
	// for(var i = 1; i < arr.length; i++){
	// 	var jsFile = arr[i];
	// 	var key2Index = jsFile.indexOf(key2);
	// 	if(key2Index != -1){
	// 		jsFile = jsFile.substr(0, key2Index);

	// 		if(!file.exists(cmdPath + jsFile)){
	// 			trace('找不到 '+jsFile+' -_-#');
	// 			return 0;
	// 		}
	// 		jsFiles.push(jsFile);
	// 	}
	// }

	// if(mergeOtherLibs){
	// 	var key3Index = indexCode.indexOf(key3);
	// 	var key4Index = indexCode.indexOf(key4);

	// 	if(key3Index == -1 || key4Index == -1){
	// 		trace('没有找到 other_libs_files 标识，忽略合并');
	// 	}else{
	// 		var otherLibsCode = indexCode.substring(key3Index +key3.length , key4Index);
	// 		var reg = new RegExp(' ', 'g');
	// 		otherLibsCode = otherLibsCode.replace(reg, '');
	// 		reg = new RegExp('\t', 'g');
	// 		otherLibsCode = otherLibsCode.replace(reg, '');
	// 		reg = new RegExp('"', 'g');
	// 		otherLibsCode = otherLibsCode.replace(reg, '');
	// 		reg = new RegExp("'", 'g');
	// 		otherLibsCode = otherLibsCode.replace(reg, '');
	// 		reg = new RegExp("/>", 'g');
	// 		otherLibsCode = otherLibsCode.replace(reg, '>');
			
	// 		//delete <!--xxx-->
	// 		var nx = otherLibsCode.indexOf('<!--');
	// 		while(nx != -1){
	// 			var endNx = otherLibsCode.indexOf('-->');
	// 			var str = otherLibsCode.substring(nx, endNx + '-->'.length);
	// 			otherLibsCode = otherLibsCode.replace(str, '');
	// 			nx = otherLibsCode.indexOf('<!--');
	// 		}

	// 		var key5 = 'src=';
	// 		var key6 = '.js>';

	// 		var tmpArr = otherLibsCode.split(key5);

	// 		for(var i = 0; i < tmpArr.length; i++){
	// 			var key6Index = tmpArr[i].indexOf(key6);

	// 			if(key6Index != -1){
	// 				jsFiles.push(tmpArr[i].substr(0, key6Index) + ".js");
	// 			}
	// 		}
	// 	}
	// }

	var manifestJsonPath = cmdPath + "manifest.json";
	if(!file.exists(manifestJsonPath)){
		trace('找不到manifest.json -_-#');
		return 0;
	}
	var manifestCode = file.read(manifestJsonPath, true);

	var manifestJson = JSON.parse(manifestCode);
	var jsFiles = manifestJson.initial

	if(jsFiles <= 1){
		trace('一共'+jsFiles.length+' 个JS文件，无需合并');
		return 0;
	}

	trace('预计可以合并 '+jsFiles.length+' 个JS文件');
	trace('开始处理...');

	
	var mergeedJS = '';

	for(var i=0;i < jsFiles.length; i++){
		var jsCode = file.read(cmdPath + jsFiles[i], true);

		mergeedJS += '\n //' + jsFiles[i]+ '\n' + jsCode + '\n'; 
	}

	file.save(cmdPath+'merged.js', mergeedJS);


	manifestJson.initial = []
	manifestJson.initial.push("merged.js")
	
	// //头尾的index.html代码
	// var key5 = '<!--modules_files_start-->';
	// var key6 = '<!--modules_files_end-->';
	// var pre = indexCode.substring(0, indexCode.indexOf(key5) + key5.length);
	// pre += '\n    <script src="merged.js"></script>\n    ';
	// pre += indexCode.substring(indexCode.indexOf(key6));

	// var key7  = '<!--other_libs_files_start-->';
	// var key8  = '<!--other_libs_files_end-->';
	// var tmp = pre.substring(pre.indexOf(key7) + key7.length, pre.indexOf(key8));
	// var tmpArr = tmp.split('\n');
	// tmp = '';
	// for(var i = 0; i < tmpArr.length; i++){
	// 	var line = tmpArr[i];
	// 	var reg = new RegExp(' ', 'g');
	// 	line = line.replace(reg, '');
	// 	reg = new RegExp('\t', 'g');
	// 	line = line.replace(reg, '');
	// 	reg = new RegExp('"', 'g');
	// 	line = line.replace(reg, '');
	// 	reg = new RegExp("'", 'g');
	// 	line = line.replace(reg, '');
	// 	reg = new RegExp("/>", 'g');
	// 	line = line.replace(reg, '>');
	// 	if(line.indexOf('<script') != -1 && line.indexOf('<!--<script') == -1){
			
	// 	}else{
	// 		tmp += tmpArr[i]+'\n';
	// 	}
	// }

	// tmp = tmp.substr(0, tmp.length-1);

	// var codeLast  = pre;

	// if(mergeOtherLibs){
	// 	codeLast = pre.substring(0, pre.indexOf(key7) + key7.length);
	// 	codeLast += tmp;
	// 	codeLast += pre.substring(pre.indexOf(key8));
	// }
	var codeLast = JSON.stringify(manifestJson, null, 1);
	file.save(cmdPath+'manifest.json', codeLast);

	trace('合并成功@@@@@');
	return 0;
};

var trace = console.log;

module.exports = mergeJSManifest;