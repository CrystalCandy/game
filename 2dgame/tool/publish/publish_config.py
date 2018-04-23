#!/usr/bin/python coding=utf-8
import sys
import os, os.path

BUILD_NAVTVE = False

PUBLISH_VERSION = "out"
EGRET_TOOL_PATH = "C:/Users/win10/AppData/Roaming/Egret/engine/"

#当前目录
CURRENT_PATH = sys.path[0] +"/" 

#工程目录
os.chdir(CURRENT_PATH + "../../")
PROJECT_PATH = os.getcwd() + "/"

#bin目录
PUBLISH_BINPATH = PROJECT_PATH + "bin-release/"