resource "aws_vpc" "ns_todoapp_vpc" {
  cidr_block           = "10.123.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "NS_Todoapp_VPC"
  }
}

resource "aws_subnet" "ns_todoapp_public_subnet" {
  vpc_id                  = aws_vpc.ns_todoapp_vpc.id
  cidr_block              = "10.123.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-southeast-1a"

  tags = {
    Name = "NS_Todoapp_Public_SN"
  }
}

resource "aws_internet_gateway" "ns_todoapp_ig" {
  vpc_id = aws_vpc.ns_todoapp_vpc.id

  tags = {
    Name = "NS_Todoapp_IG"
  }
}

resource "aws_route_table" "ns_todoapp_public_rt" {
  vpc_id = aws_vpc.ns_todoapp_vpc.id

  tags = {
    Name = "NS_Todoapp_Public_RTB"
  }
}

resource "aws_route" "default_route" {
  route_table_id         = aws_route_table.ns_todoapp_public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.ns_todoapp_ig.id
}

resource "aws_route_table_association" "ns_todoapp_public_rt_assoc" {
  subnet_id      = aws_subnet.ns_todoapp_public_subnet.id
  route_table_id = aws_route_table.ns_todoapp_public_rt.id
}

resource "aws_security_group" "ns_todoapp_sg" {
  name        = "NS_Todoapp_SG"
  description = "NS Todo app security group"
  vpc_id      = aws_vpc.ns_todoapp_vpc.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"] 
  }
}

locals {
  user_data = <<EOF
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
sudo dnf install git -y
sudo yum install -y nodejs
mkdir /home/ec2-user/logs
cd /home/ec2-user
git clone https://github.com/NamalSanjaya/todo-app.git
cd /home/ec2-user/todo-app/todo-runtime
npm install
nohup npm run start:dev > /home/ec2-user/logs/nest_server.log &
echo "nest server started....8000"
cd /home/ec2-user/todo-app/todo-frontend
npm install
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
PUBLIC_IP=`curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/public-ipv4`
nohup env REACT_APP_HOST_DOMAIN=$PUBLIC_IP npm start > /home/ec2-user/logs/react_app.log &
echo "react server started....3000"
echo "complete system deployed successfully."
EOF
}

resource "tls_private_key" "ns_todoapp_secret_private_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}
resource "aws_key_pair" "ns_todoapp_secret_key_pair" {
  key_name   = "ns_todoapp_secret_key"
  public_key = tls_private_key.ns_todoapp_secret_private_key.public_key_openssh
}

resource "aws_instance" "ns_todoapp_instance" {
  instance_type          = "t2.medium"
  ami                    = "ami-0464f90f5928bccb8"
  vpc_security_group_ids = [aws_security_group.ns_todoapp_sg.id]
  subnet_id              = aws_subnet.ns_todoapp_public_subnet.id
  key_name      = aws_key_pair.ns_todoapp_secret_key_pair.key_name

  root_block_device {
    volume_type = "gp3"
    volume_size = 10
    delete_on_termination = true
  }

  user_data = local.user_data

  tags = {
    Name = "NS_Todoapp_Instance"
  }
}

output "public_ip" {
  value = aws_instance.ns_todoapp_instance.public_ip
}

# output "private_key" {
#   value = tls_private_key.ns_todoapp_secret_private_key.private_key_pem
#   sensitive = true
# }
