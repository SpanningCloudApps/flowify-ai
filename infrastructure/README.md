# Prerequisites

Before you begin, ensure you have the following prerequisites:

- An AWS user account.
- AWS credentials for the user.

# Setting Up Credentials

1. Run the following command to configure AWS credentials for a profile named flowify:

    ```bash
    aws configure --profile flowify
    ```

2. Add the generated AWS credentials for the flowify profile.

3. Configure the following settings:

   - **Region:** us-east-1
   - **Output format:** text

# Deploying Infrastructure

To set up the required infrastructure, follow these steps:

1. Run the script `./infrastructure/deploy.sh`.

This script performs the following actions:
   - Creates an SSH key pair and saves it as `FlowifyKeyPair.pem` in the same folder.
   - Enables SSH access to the default security group.
   - Launches an EC2 instance with the default security group and the generated SSH key.

# Removing Infrastructure

To remove the infrastructure, run the cleanup function from the script.

# Accessing the EC2 Instance

To access the EC2 instance, follow these steps:

1. Use the following command to SSH into the instance, replacing `54.174.144.2` with the actual IP address of the instance:

    ```bash
    ssh -i FlowifyKeyPair.pem ec2-user@54.174.144.2
    ```

2. To find the IP address, use the following command, replacing $instance_name with the instance name obtained from the script:

    ```bash
    aws ec2 describe-instances \
        --filters "Name=tag:Name,Values=$instance_name" \
        --profile flowify \
        --output text
    ```

3. After successfully logging into the instance, switch to the root user by running:

    ```bash
    sudo su
    ```
4. Navigate to the ~ directory, where you will find the hackathon-ai folder.
5. Inside the `hackathon-ai` folder, execute the following command to start all the services:

    ```bash
    ./scripts/run-service-local.sh --internal
    ```

This setup will help you configure AWS credentials, deploy and remove infrastructure, and access the EC2 instance for running your services.
