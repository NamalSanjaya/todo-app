terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region                  = "ap-southeast-1"
  shared_config_files      = ["C:/Users/{username}/.aws/config"]
  shared_credentials_files = ["C:/Users/{username}/.aws/credentials"]
  profile                 = "todoapp-user"
}
