#!/usr/bin/python coding=utf-8

from publish_config import *

import sys
import os, os.path
import shutil
import re
import zipfile


import json
import getopt



def os_is_win32():
    return sys.platform == 'win32'

def os_is_mac():
    return sys.platform == 'darwin'

def _convert_path_to_cmd(path):
    """ Convert path which include space to correct style which bash(mac) and cmd(windows) can treat correctly.
        eg: on mac: convert '/usr/xxx/apache-ant 1.9.3' to '/usr/xxx/apache-ant\ 1.9.3'
        eg: on windows: convert '"c:\apache-ant 1.9.3"\bin' to '"c:\apache-ant 1.9.3\bin"'
    """
    ret = path
    if os_is_mac():
        ret = path.replace("\ ", " ").replace(" ", "\ ")

    if os_is_win32():
        ret = "\"%s\"" % (path.replace("/", "\\"))

    return ret

def os_rmtree_safe(filepath):
    if os.path.exists(filepath):
      shutil.rmtree(filepath,True)

def os_remove_safe(filepath):
    if os.path.exists(filepath):
        os.remove(filepath)

def os_copytree_safe(srcPath, dstPath):
  # if not os.path.exists(dstPath):
  #   os.makedirs(dstPath)
  shutil.copytree(srcPath, dstPath)

def os_copy_file_safe( srcPath, dstPath):
  srcPath = _convert_path_to_cmd(srcPath)
  dstPath = _convert_path_to_cmd(dstPath)
  
  os.system("xcopy %s %s /E /y /i" % (srcPath, dstPath) )


########################################################
def zip_dir(dirList, rule_callback, resPath, zipfilename):
    filelist = []
    
    for _, dirname in enumerate(dirList):
      if os.path.isfile(dirname):
          filelist.append(dirname)
      else :
          #print dirname
          for root, dirs, files in os.walk(dirname):
              for name in files:
                  if rule_callback == None or rule_callback(root, name):
                    filelist.append(os.path.join(root, name))
    
     
    zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
    for tar in filelist:
        #print tar
        arcname = tar[len(resPath):]
        #print arcname
        zf.write(tar,arcname)
    zf.close()
    
    for tar in filelist:
      os_remove_safe(tar)

#登陆资源打包
login_res_list = [

  "ui/ui_theme.thm.json",
  
  #UI文件
  # "layouts/itemRender/LoginServerItemLayout.exml",
  "layouts/login/LoginCreateRoleLayout.exml",
  "layouts/login/LoginLayout.exml",
  "layouts/login/LoginRegisterLayout.exml",
  "layouts/login/LoginServerListLayout.exml",

  "ui/imageset/00_tongYong01.json",
  "ui/imageset/27_dengLu.json",
  # "ui/imageset/00_tongYong03.json",
  # "ui/imageset/32_dengLu.json",
  "ui/anim/loading.json",

  #表单文件(Config_Common)
  "data/config/Cns/cns.csv",
  "data/config/Cns/net_msg.csv",
  "data/config/xml_keyword.csv",
  "data/config/image_set.csv",
  "data/config/image_set_list.csv",
  "data/config/ui_anim.csv",
  "data/config/name.csv",
  "data/config/Badwords/FilterWords.csv",
  "data/config/Badwords/ForbidName.csv",

  "data/config/protocol/RPCProtocol.json",
]


#表单配置 layouts  ui
def rulecallback_ui(root, filename):
  filename = "/" + filename

  for _, resPath in enumerate(login_res_list):
    if resPath.find(filename) != -1:
      return False
  #print "rulecallback_ui", filename
  if filename.find(".json") != -1 or filename.find(".exml") != -1:
    return True
  return False


#表单、地图配置 data/config  data/map
def rulecallback_config(root, filename):
  for _, resPath in enumerate(login_res_list):
    if resPath.find(filename) != -1:
      return False


  prefixlist = [".json", ".csv", ".dat", ".xml"]
  for _, v in enumerate(prefixlist):
    if filename.find(v) != -1:
      return True
  return False


#表单、地图配置 data/config  data/map
# def rulecallback_armature(root, filename):
#   prefixlist = [".json", ".dbbin"]
#   for _, v in enumerate(prefixlist):
#     if filename.find(v) != -1:
#       return True
#   return False;  

def do_zip_resource(resPath):
  
  config_list = {
    "login":{
        "pathlist": login_res_list,
        "rule":None,
        "output": "config_login.zip"
      },

    "ui":{
        "pathlist":["layouts", "ui"],
        "rule":rulecallback_ui,
        "output": "config_ui.zip"
      },
    "config":{
        "pathlist":["data/config", "data/map"],
        "rule":rulecallback_config,
        "output": "config.zip"
      }
    #  ,
    # "armature":{
    #     "pathlist":["data/armature"],
    #     "rule":rulecallback_armature,
    #     "output": "config_model.zip"
    #   }
  }
  
  
  #登陆资源
  for _, name in enumerate(config_list):
    config = config_list[name]
    pathlist = []
    
    for _, path in enumerate(config["pathlist"]):
      pathlist.append(resPath+path) 
    zip_dir(pathlist, config["rule"], resPath, resPath+config["output"])
    
  os_rmtree_safe("%s/data/config"%resPath)
  os_rmtree_safe("%s/layouts"%resPath)
  

def do_mergeJs(binpath):
  if BUILD_NAVTVE == True:
    return

  os.chdir(binpath)

  with open(PROJECT_PATH + 'egretProperties.json') as json_file:
      egretProperties = json.load(json_file)
      egret_version = egretProperties["egret_version"]
  print "===========egret_version:" + egret_version

  tool_path = "%s/%s/tools/commands/" % (EGRET_TOOL_PATH, egret_version)

  os_copy_file_safe(CURRENT_PATH+"mergeJSManifest.js", tool_path)
  os.system("egret mergeJSManifest")
  os_remove_safe(tool_path + "mergeJSManifest.js")
  os_rmtree_safe(binpath + "libs")

def do_crossDomain(binpath):
  if BUILD_NAVTVE == True:
    return

  os.chdir(binpath)

  with open(PROJECT_PATH + 'egretProperties.json') as json_file:
      egretProperties = json.load(json_file)
      egret_version = egretProperties["egret_version"]
  #print "===========egret_version:" + egret_version

  tool_path = "%s/%s/tools/commands/" % (EGRET_TOOL_PATH, egret_version)

  os_copy_file_safe(CURRENT_PATH+"crossdomain.js", tool_path)
  os.system("egret crossdomain")
  os_remove_safe(tool_path + "crossdomain.js")
  


def do_build():
  os.chdir(PROJECT_PATH)
  if not BUILD_NAVTVE:
    os.system("egret build")
  else:
    os.system("egret build --runtime native")


def do_publish():
  os.chdir(PROJECT_PATH)
  if not BUILD_NAVTVE:
    os.system("egret publish --version %s --runtime html5" % PUBLISH_VERSION)
  else:
    os.system("egret publish --version %s --runtime native" % PUBLISH_VERSION)
  
def do_backupresouce():
  os_rmtree_safe( CURRENT_PATH+"resourcetemp/")
  os_copytree_safe(PROJECT_PATH+"resource/", CURRENT_PATH+"resourcetemp/")

def do_restoreresource():
  os_rmtree_safe(PROJECT_PATH+ "resource/")
  os_copytree_safe(CURRENT_PATH+"resourcetemp/", PROJECT_PATH+"resource/")
  os_rmtree_safe(CURRENT_PATH+"resourcetemp/")  

if __name__ == '__main__':

  BUILD_NAVTVE = False
  isCrossDomain = False

  opts, args = getopt.getopt(sys.argv[1:], "nc", ["native","cross"])
  for op, value in opts:
    if op == "-n":
        BUILD_NAVTVE = True
    elif op == "-c":
        isCrossDomain = True
  
  print "BUILD_NAVTVE",BUILD_NAVTVE, "IsCrossDomain", isCrossDomain
  
  publish_outpath = PUBLISH_BINPATH
  if BUILD_NAVTVE == False:
    publish_outpath = publish_outpath + "web/%s/" % PUBLISH_VERSION
  else:
    publish_outpath = publish_outpath + "native/%s/" % PUBLISH_VERSION

  #备份resource目录
  #do_backupresouce()
  #编译
  do_build()
  #资源打包
  do_zip_resource(PROJECT_PATH + "resource/")
  #发布
  do_publish()
  
  #合并js
  do_mergeJs(publish_outpath)
  #处理跨域图片
  if isCrossDomain:
    do_crossDomain(publish_outpath)

  # 恢复目录
  # do_restoreresource()
  # os.system("pause")