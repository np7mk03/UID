import argparse,configparser,grp, pwd,hashlib,os,re,sys,zlib
from math import ceil
from fnmatch import fnmatch
from datetime import datetime

argparser = argparse.ArgumentParser(description="The stupidest content tracker")
argparse = argparse.add_subparsers(title="Commands", dest="command")
argparse.required = True