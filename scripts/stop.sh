#!/bin/bash
PROJECT_APP=heliumgas-next
sudo systemctl stop nginx
sudo -u ec2-user pm2 stop $PROJECT_APP 2> /dev/null || true
sudo -u ec2-user pm2 delete $PROJECT_APP 2> /dev/null || true
