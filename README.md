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

Change the `username` with your logged in username.  

![change_username](https://github.com/NamalSanjaya/todo-app/assets/68647363/4159ab1f-b97c-48db-92b2-ccb2f9ba5708)


### 4. Execute Terraform Scripts
a. Open up the terminal in the root of the repository.  
b. Go to `scripts/terraform/` directory.  
c. Apply following commands.    
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
### 1. Get the public Ip  
a. Open up the terminal in the root of the repository and go to `scripts/terraform/` directory.  
b. Apply the following command.    
```
terraform output -json
```
c. Get the value of `public_ip` field.  
![tf_output2](https://github.com/NamalSanjaya/todo-app/assets/68647363/e07b2040-4f9d-47e6-842a-52c8e4f38636)  


### 2. Create a user account  
Open the browser the go to following url.  
```
http://{public_ip}:3000/signup
```
Replace the `public_ip` with public ip you obtained from step 1 under Usage section.

### 3. Login to todo app.
Go to following url to login to the todo app
```
http://{public_ip}:3000/login
```

### 4. Create your first task
a. Click the plus (+) sign to create new task.  
b. Give a title and provide a description (optional) to click `Create` button.

Now you can view your created task. Following image show the todo-app demo.

![Screenshot (335)](https://github.com/NamalSanjaya/todo-app/assets/68647363/0f762337-3b5c-41c6-b9eb-71a6168b76dc)
