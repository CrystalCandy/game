#!/usr/bin/python
# coding=utf-8

import sys
import os
import os.path
import time
import shutil

import json

from TinypngTool import *

CurrentPath = sys.path[0]
InputPath = os.path.join(CurrentPath, "in")
OutputPath = os.path.join(CurrentPath, "out")


MergeToolPath = "TextureMerger\TextureMerger.exe"
ModelConfig = {}

# ModelBodyPartOrder = {
#     "ride": -10,
#     "wing": -5,
#     "body": 0,
#     "cloth": 5,
#     "weapon": 10
# }

ModelBodyPartOrder = {
    "ride": {1:-10, 3:-10, 5:-5, 7:-5}, #方向:排序
    "ride2": {1:10, 3:10, 5:-10, 7:-10}, #方向:排序
    "ride3": {1:1, 3:1, 5:8, 7:8}, #方向:排序
    "wing": {1:-5, 3:-5, 5:10, 7:10}, #方向:排序
    "body": {1:0, 3:0, 5:0, 7:0}, #方向:排序
    "weapon": {1:5, 3:5, 5:5, 7:5}, #方向:排序
    	 	
    "effect": {1:-5, 3:-5, 5:-5, 7:-5}, #方向:排序
    "effect2": {1:5, 3:5, 5:5, 7:5}, #方向:排序
}

DefaultAnimInterval = 100
DefaultAnchorOffX = 160
DefaultAnchorOffY = 210

# 命名规则:
# idle_1_body_a_01（有套装）
# idle_1_body_01(没套装)

#######################################################################
# 是否合法的图
def is_valid_image(root, filename):
    prefixlist = [".png", ".jpg"]
    for _, v in enumerate(prefixlist):
        if filename.find(v) != -1:
            return True
    return False


def get_bodypart_order(partname):
    if partname in ModelBodyPartOrder:
        return ModelBodyPartOrder[partname]
    return None


def set_model_name(name):
    if not ModelConfig.has_key("name"):
        ModelConfig["name"] = name
    

def set_model_bodyparts(name, show, dir):
    if not ModelConfig.has_key("bodyparts"):
        ModelConfig["bodyparts"] = []

    curpartinfo = None
    for partinfo in ModelConfig["bodyparts"]:
        if partinfo["name"] == name:
            curpartinfo = partinfo
            break

    if curpartinfo is None:
        curpartinfo = {}
        curpartinfo["name"] = name
        curpartinfo["order"] = 0
        curpartinfo["shows"] = []
        curpartinfo["offx"] = DefaultAnchorOffX#偏移XY
        curpartinfo["offy"] = DefaultAnchorOffY
        curpartinfo["dirsOrder"] = get_bodypart_order(name)

        ModelConfig["bodyparts"].append(curpartinfo)

    shows = []
    if show != "":
        if show not in curpartinfo["shows"]:
            curpartinfo["shows"].append(show)

# 动作帧


def set_model_anims(name, dir, imagepaths):
    if not ModelConfig.has_key("anims"):
        ModelConfig["anims"] = []

    curaniminfo = None
    for animinfo in ModelConfig["anims"]:
        if animinfo["name"] == name:
            curaniminfo = animinfo
            break

    if curaniminfo is None:
        curaniminfo = {}
        curaniminfo["name"] = name
        curaniminfo["dirs"] = []
        curaniminfo["frameCount"] = len(imagepaths)
        curaniminfo["interval"] = DefaultAnimInterval
        ModelConfig["anims"].append(curaniminfo)

    if dir not in curaniminfo["dirs"]:
        curaniminfo["dirs"].append(dir)


# 动作帧事件
def set_model_anim_event(animname, eventName, eventIndex):
    for animinfo in ModelConfig["anims"]:
        if animinfo["name"] == name:
            animinfo["eventName"] = eventName
            animinfo["eventIndex"] = eventIndex


def set_model_textures(path):
    if not ModelConfig.has_key("textures"):
        ModelConfig["textures"] = []

    if path not in ModelConfig["textures"]:
        ModelConfig["textures"].append(path)

def do_model_config():
    for modelName in os.listdir(InputPath):
        fullpath = os.path.join(InputPath, modelName)
        if os.path.isdir(fullpath):
            do_model_config_interval(modelName)


def do_model_config_interval(modelName):
    global ModelConfig

    ModelConfig = {}
    
    inputModelPath = os.path.join(InputPath, modelName)
    outputModelPath = os.path.join(OutputPath, modelName)
    set_model_name(modelName)

    # 缓存当前目录下图片
    frameImagePathsCache = {}
    for root, dirs, files in os.walk(inputModelPath):
        for name in files:
            fullpath = os.path.join(root, name)
            relatePath = fullpath[len(inputModelPath) + 1:]
            pathlist = relatePath.split(os.path.sep)
            # modelName = pathlist[0]
            # del pathlist[0]

            # 当前目录下,所有的图片文件
            if root not in frameImagePathsCache:
                frameImagePathsCache[root] = []
                for filename in os.listdir(root):
                    if is_valid_image(root, filename):
                        frameImagePathsCache[root].append(filename)

            split_len = len(pathlist)

            animName = "idle"
            dirName = "0"  # 方向是整数
            showName = ""
            partName = "body"

            if split_len == 1:  # 01.png
                pass

            elif split_len == 2:  # idle/01.png
                animName = pathlist[0]
            elif split_len == 3:  # idle/1/01.png
                animName = pathlist[0]
                dirName = pathlist[1]
            elif split_len == 4:  # idle/1/body/01.png
                animName = pathlist[0]
                dirName = pathlist[1]
                partName = pathlist[2]
            elif split_len == 5:  # idle/1/body/a/01.png(套装)
                animName = pathlist[0]
                dirName = pathlist[1]
                partName = pathlist[2]
                showName = pathlist[3]

            set_model_anims(animName, int(dirName), frameImagePathsCache[root])
            set_model_bodyparts(partName, showName, int(dirName))

    # 获取生成的texture路径
    for filename in os.listdir(outputModelPath):
        if is_valid_image(outputModelPath, filename):
            set_model_textures(filename)

    jsonPath = os.path.join(outputModelPath, ModelConfig["name"] + "_ske.json")
    file = open(jsonPath, 'w')
    json.dump(ModelConfig, file, sort_keys=True,
              indent=2, separators=(",", ":"))
    file.close()

    # targetPath = os.path.join(OutputPath, ModelConfig["name"])
    # if os.path.exists(targetPath):
    #     shutil.rmtree(targetPath)

    # os.makedirs(targetPath)

    # for targetName in os.listdir(OutputPath):
    #     fullpath = os.path.join(OutputPath, targetName)
    #     if os.path.isfile(fullpath):
    #         shutil.move(fullpath, os.path.join(targetPath, targetName))

    #json.dump(ModelConfig, file, sort_keys=True, indent=None, separators=(",", ":"))
    # print json.dumps(ModelConfig, sort_keys=True, indent=4)

#######################################################################


def do_rename_frameimage(path):
    image_file_list = []

    for filename in os.listdir(path):
        fullpath = os.path.join(path, filename)
        if os.path.isfile(fullpath):
            if is_valid_image(path, filename):
                image_file_list.append(fullpath)
        else:
            do_rename_frameimage(fullpath)

    image_file_list.sort()

    index = 0
    for fullpath in image_file_list:
        file_path = os.path.split(fullpath)  # 最后斜杆分割字符串
        fold_path = file_path[0]
        # 获得后缀
        lists = file_path[1].split('.')
        file_ext = lists[-1]

        strIndex = "%02d" % index
        target_path = os.path.join(fold_path, strIndex + "." + file_ext)

        if os.path.exists(target_path) == False:
            os.rename(fullpath, target_path)
        index = index + 1

#######################################################################


def do_merge_frameimge():
    if os.path.exists(OutputPath):
        shutil.rmtree(OutputPath)

    model_list = []
    temp_path = os.path.join(OutputPath, "temp")
    for root, dirs, files in os.walk(InputPath):
        for name in files:
            fullpath = os.path.join(root, name)
            relatePath = fullpath[len(InputPath) + 1:]

            pathlist = relatePath.split(os.path.sep)
            modelName = pathlist[0]
            del pathlist[0]
            
            if (modelName in model_list) == False:
                model_list.append(modelName)
            #targetName = "_".join(pathlist)

            split_len = len(pathlist)
            animName = "idle"
            dirName = "0"  # 方向是整数
            partName = "body"
            showName = ""
            frameName = ""

            if split_len == 1:  # 01.png
                frameName = pathlist[0]

            elif split_len == 2:  # idle/01.png
                animName = pathlist[0]
                frameName = pathlist[1]
            elif split_len == 3:  # idle/1/01.png
                animName = pathlist[0]
                dirName = pathlist[1]
                frameName = pathlist[2]
            elif split_len == 4:  # idle/1/body/01.png
                animName = pathlist[0]
                dirName = pathlist[1]
                partName = pathlist[2]
                frameName = pathlist[3]
            elif split_len == 5:  # idle/1/body/a/01.png(套装)
                animName = pathlist[0]
                dirName = pathlist[1]
                partName = pathlist[2]
                showName = pathlist[3]
                frameName = pathlist[4]

            if showName == "":
                targetName = "%s_%s_%s_%s" % (animName, dirName, partName, frameName)
            else:
                targetName = "%s_%s_%s_%s_%s" % (animName, dirName, partName, showName, frameName)

            output_dir = os.path.join(temp_path, modelName, animName)
            if os.path.exists(output_dir) == False:
                os.makedirs(output_dir)

            shutil.copy(fullpath, os.path.join(output_dir, targetName))
    
   
    for modelName in model_list:
        print "begin merge texture:" + modelName
        srcDirPath = os.path.join(temp_path, modelName)
        #根据动作切割图片
        for animName in os.listdir(srcDirPath):
            srcfullpath = os.path.join(srcDirPath, animName)
            print srcfullpath
            if os.path.isdir(srcfullpath):
                cmd = "%s -p %s -o %s" % (MergeToolPath, srcfullpath, os.path.join(OutputPath, modelName, modelName+"_"+animName + ".json"))
                os.system(cmd)
    
    shutil.rmtree(temp_path)
    #######################################################################
    # split_dirs = []
    # split_dirs.append(modelName)

    # targetDirPath = ""
    # imageSplitCount = 0
    # srcDirPath = os.path.join(temp_path, modelName)

    # MaxCountPerImage = 100

    # #如果图片量大于阈值，则切割子文件夹，用来输出image
    # for imagePath in os.listdir(srcDirPath):
    #     srcfullpath = os.path.join(srcDirPath, imagePath)
    #     if imageSplitCount > MaxCountPerImage:
    #         imageSplitCount = 0

    #         splitDirName = "%s%d" % (modelName , len(split_dirs))
    #         split_dirs.append(splitDirName)
    #         targetDirPath = os.path.join(temp_path, splitDirName)
    #         if not os.path.exists(targetDirPath):
    #             os.makedirs(targetDirPath)
        
    #     if targetDirPath != "":
    #         shutil.move(srcfullpath, os.path.join(targetDirPath, imagePath))

    #     imageSplitCount = imageSplitCount + 1

    # for splitDirName in split_dirs:
    #     outDirPath = os.path.join(temp_path, splitDirName)
    #     cmd = "%s -p %s -o %s" % (MergeToolPath, outDirPath, os.path.join(OutputPath, splitDirName + ".json"))
    #     os.system(cmd)
   
    #######################################################################
    # for modelname in os.listdir(temp_path):
    #     fullpath = os.path.join(temp_path, modelname)
    #     if os.path.isdir(fullpath):
    #         # TextureMerger\TextureMerger.exe -p C:\Users\win10\Desktop\FrameAnim\tool\ren -o C:\Users\win10\Desktop\FrameAnim\tool\out\ren.json
    #         cmd = "%s -p %s -o %s" % (MergeToolPath, fullpath,
    #                                   os.path.join(OutputPath, modelname + ".json"))
    #         os.system(cmd)
    #shutil.rmtree(temp_path)


if __name__ == '__main__':
    os.chdir(CurrentPath)

    print "begin modelconfig..."
    # 动作帧改名
    do_rename_frameimage(InputPath)

    # 合并图片
    do_merge_frameimge()

    # 生成模型信息
    do_model_config()

    #压缩图片
    print "begin tinypng..."
    do_tinypng_walkdir(OutputPath)

    print "success......."
    os.system("pause")
