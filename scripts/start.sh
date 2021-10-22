#!/bin/bash
cd /home/ubuntu/pick-me-up/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')


export CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_ID --query Parameters[0].Value | sed 's/"//g')

export CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

export GOOGLEINFO_URL=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLEINFO_URL --query Parameters[0].Value | sed 's/"//g')

export GRANT_TYPE=$(aws ssm get-parameters --region ap-northeast-2 --names GRANT_TYPE --query Parameters[0].Value | sed 's/"//g')

export OAUTH_URL=$(aws ssm get-parameters --region ap-northeast-2 --names OAUTH_URL --query Parameters[0].Value | sed 's/"//g')

export 	REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
