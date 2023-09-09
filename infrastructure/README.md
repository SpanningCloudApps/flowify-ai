### Prereqisities

- AWS user
- AWS Credentioals for user


### Setup credentials

Run `aws configure --profile flowify`
Add generated credentials for profile
Region - us-east-1
Output - text

### Set infrastructure
Run `./infrastructure/deploy.sh`
This script will:
- Create key pait in file `FlowifyKeyPair.pem` in the same folder
- Adds ability to connect by ssh to the default security group
- Creates EC2 instance with default security group and generated key

### Remove infrastructure
Run cleanup function from the script

### SSH to the instance
Run the next command `ssh -i FlowifyKeyPair.pem ec2-user@54.174.144.2 `
IP adress you will be able to check using the next command (instance name could be extracted from script)
```
aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=$instance_name" \
    --profile flowify \
    --output text
```

Run `sudo su` after you logged in to the instance
Go to `~` directory, here will be hackathon-ai folder
Go to this folder and run ` ./scripts/run-service-local.sh --internal` to run all the services
