from fabric.api import *

env.hosts = ['root@199.167.30.184:22']

def pull():
    with cd('/usr/share/nginx/www/sites/bibhas.in/'):
        run('git pull origin master')