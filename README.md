# Todo Application
## Prerequisites
1.  [Terraform](https://www.terraform.io/)
* Download : https://developer.hashicorp.com/terraform/downloads
* Install  : https://phoenixnap.com/kb/how-to-install-terraform

## Setup Instructions
### 1. Clone the todo-app github repository
```
git clone https://github.com/NamalSanjaya/todo-app.git
```
### 2. Configure Named AWS Profile
```
aws configure --profile todoapp-user
```
**Following Questions will be asked**  
 a. AWS Access Key ID : Need to create access key from AWS console (See the following example).  
 b. AWS Secret Access Key :  Need to create access key from AWS console (See the following example).  
 c. Default region name : ap-southeast-1  
 d. Default output format : text  
  
**Example - Configure Named AWS Profile**  
1. Obtaining access key   
I. Go to `AWS Console` and click on `Security credentials`
<img src="https://github.com/NamalSanjaya/todo-app/assets/68647363/4ed28382-ed6e-4174-a037-36dee51eb22b" alt="sec_aws_console2" width="400" height="200">


  II. Go to `Access keys` section and click `Create access key`  
  III. Select `Command Line Interface (CLI)` option, check the `confirmation` checkbox then click on `Next` button.    
  IV. Click on `Create access key` button. (Setting description tags are not required)  


2. Create AWS CLI profile
<img src="https://github.com/NamalSanjaya/todo-app/assets/68647363/038ffc93-2b65-4347-a9eb-63b0d5c9fe21" alt="create_aws_profile" width="500" height="200">

### 3. Update `scripts/terraform/providers.tf` file  
Change following parameters in aws provider block.  
* shared_config_files : ["C:/Users/{username}/.aws/config"]
* shared_credentials_files : ["C:/Users/{username}/.aws/credentials"]

Change the `username` with your logged in username

### 4. Execute Terraform Scripts
a. Go to `scripts/terraform/` in repository.  
b. Open up the terminal and apply following commands.  
 This will Initializing the backend.   
```
terraform init
```
This will provision the required resources in AWS and start the frontend and backend services.    
```
terraform apply
```

Now you have successfully deployed the todo application.  

## Usage  
hhhh




  







