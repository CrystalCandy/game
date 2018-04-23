# -*- coding: utf-8 -*-
import tinify
import os, os.path

#yangguiming
#126.com
tinify.key = "lD9cOgVnddQk4quLEkLPN2DOvglOZFW1"
#hotmail.com
#tinify.key = "tH3S-9Gisn7U70OGZq1xZfc4XKCZuFVB"






def walk_dir(path):
    allcount = 0
    for root , dirs, files in os.walk(path, False):
      for file_name in files:
        if file_name.find("requests") == -1 and file_name.find("tinify") == -1:
          if file_name.endswith(".png") or file_name.endswith(".jpg"):
            allcount = allcount + 1

    index = 0
    for root , dirs, files in os.walk(path, False):
      for file_name in files:
        if file_name.find("requests") == -1 and file_name.find("tinify") == -1:
          if file_name.endswith(".png") or file_name.endswith(".jpg"):
            file_path= os.path.join(root,file_name)
            index = index + 1
            do_tinypng(file_path, index, allcount)
            #os.remove(file_path)
          

def do_tinypng(imagepath, cur, all):
    print "do_tinypng:%s(%d/%d)" % (imagepath, cur, all)
    dirpath = os.path.dirname(imagepath)
    filename = os.path.basename(imagepath)
    filename_noposfix = filename[0: filename.rfind(".") ]
    
    source = tinify.from_file(imagepath)
    source.to_file(imagepath)

if __name__ == "__main__":
    cur_path = os.sys.path[0]
    walk_dir(cur_path)
    os.system("pause")