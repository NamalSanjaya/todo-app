#!/bin/bash
sudo dnf update
repo_file="/etc/yum.repos.d/mongodb-org-7.0.repo"
content="[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc"
echo "$content" | sudo tee "$repo_file"
sudo yum install -y mongodb-org
sudo systemctl start mongod
sudo sed -i 's/^ *bindIp: .*/  bindIp: 0.0.0.0/' /etc/mongod.conf
sudo systemctl restart mongod

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
sudo dnf install git -y
cd ~
mkdir logs
git clone https://github.com/NamalSanjaya/todo-app.git
cd ~/todo-app/todo-runtime
npm install
nohup npm run start:dev > ~/logs/nest_server.log &
echo "nest server started....8000"
cd ~/todo-app/todo-frontend
npm install
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
PUBLIC_IP=`curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/public-ipv4`
nohup env REACT_APP_HOST_DOMAIN=$PUBLIC_IP npm start > ~/logs/react_app.log &
echo "react server started....3000"
echo "complete system deployed successfully."
