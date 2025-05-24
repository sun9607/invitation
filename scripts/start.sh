#!/bin/bash
PROJECT_HOME=/home/ec2-user/heliumgas/next
sudo systemctl start nginx
cd "$PROJECT_HOME"
sudo -u ec2-user pm2 start ecosystem.config.cjs
