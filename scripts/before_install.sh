#!/bin/bash
PROJECT_HOME=/home/ec2-user/heliumgas/next

shopt -s extglob
rm -rf "$PROJECT_HOME"/!(node_modules)
