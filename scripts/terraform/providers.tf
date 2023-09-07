terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region                  = "ap-southeast-1"
  shared_config_files      = ["C:/Users/Namal_106220/.aws/config"]
  shared_credentials_files = ["C:/Users/Namal_106220/.aws/credentials"]
  profile                 = "dev-camunda"
}
