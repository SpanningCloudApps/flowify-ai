security_group_name="FlowifySg"
security_group_description="Flowify Security Group"
vpc_id="vpc-0d00b3f577c4e3bf9"
ssh_port=22
key_pair_name="FlowifyKeyPair"
ami_id="ami-01c647eace872fc02"
instance_type="t2.medium"
subnet_id="subnet-056d6c9dbb2b8f49b"
instance_name="FlowifyInstance1"
security_group_id="sg-0624ca135de0d8548"
bucket_name="flowify-ai"

valid_options=(
  "--help"
  "--deploy-landing"
  "--create-s3"
  "--cleanup-ec2"
  "--run-ec2"
)

function array_contains() {
  local array="$1[@]"
  local seeking=$2
  local in=1
  for element in "${!array}"; do
    if [[ $seeking == $element* ]]; then
      return 0
    fi
  done
  return 1
}

function check_options_are_valid() {
  for option in "${options[@]}"; do
    if ! array_contains valid_options ${option}; then
      echo "Command does not contain option: ${option}"
      get_help_message
      exit
    fi
  done
}

function get_help_message() {
  cat <<EOF
Usage:
  ./run-service-local.sh - prepare the local environment.
  ./run-service-local.sh [options]

Options:
  --help                       Prints this message

  --deploy-landing             Deploys frontend landing page
  --create-s3                  Creates s3 bucket that server frontend
  --run-ec2                    Creates ec2 instance and runs our service
  --cleanup-ec2                Removes created ec2 instance
EOF
}

function run_ec2() {
  pushd "${AI_HOME}/infrastructure"

  aws ec2 authorize-security-group-ingress \
    --group-id "${security_group_id}" \
    --protocol tcp \
    --port "${ssh_port}" \
    --profile flowify \
    --cidr "0.0.0.0/0" \
    --output text

  # Create a key pair
  aws ec2 create-key-pair \
    --key-name "${key_pair_name}" \
    --query 'KeyMaterial' \
    --profile flowify \
    --output text > "${key_pair_name}.pem"

  # Secure the key pair file
  chmod 400 "${key_pair_name}.pem"

  # Launch an EC2 instance
  aws ec2 run-instances \
    --image-id "${ami_id}" \
    --instance-type "${instance_type}" \
    --key-name "${key_pair_name}" \
    --security-group-ids "${security_group_id}" \
    --subnet-id "${subnet_id}" \
    --user-data file://user_data.sh \
    --profile flowify \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=${instance_name}}]" \
    --output text

  echo "EC2 instance is being created. Please check the AWS Management Console for the status."

  popd
}

function cleanup() {
  # Terminate the EC2 instance
  instance_id=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=$instance_name" \
    --query 'Reservations[0].Instances[0].InstanceId' \
    --profile flowify \
    --output text)

  if [ -n "$instance_id" ]; then
    aws ec2 terminate-instances --instance-ids "$instance_id" --profile flowify
    echo "Terminating EC2 instance $instance_id..."
  else
    echo "EC2 instance $instance_name not found."
  fi

  # Delete the key pair
  aws ec2 delete-key-pair --key-name "$key_pair_name" --profile flowify
  rm -f "$key_pair_name.pem"
  echo "Deleted key pair: $key_pair_name"

  echo "Cleanup completed."
}

function create_s3() {

  # Create the S3 bucket
  aws s3api create-bucket \
      --bucket $bucket_name \
      --profile flowify

  # Enable public access for the bucket
  aws s3api put-public-access-block \
      --bucket $bucket_name \
      --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
      --profile flowify

  # Set the bucket policy to make it public
  cat <<EOF > bucket-policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$bucket_name/*"
        }
    ]
}
EOF

  # Apply the bucket policy to make the bucket public
  aws s3api put-bucket-policy \
      --bucket $bucket_name \
      --policy file://bucket-policy.json \
      --profile flowify

  # Optionally, configure the bucket for static website hosting
  aws s3 website s3://$bucket_name/ --index-document index.html --profile flowify

  # Display the S3 bucket URL
  echo "S3 Bucket URL: http://$bucket_name.s3-website-us-east-1.amazonaws.com"

  # Clean up the temporary bucket policy file
  rm bucket-policy.json
}

function deploy_landing() {
  pushd "${AI_HOME}/landing"
    npm install
    npm run build
    aws s3 sync "${AI_HOME}/landing/dist" s3://${bucket_name} --profile flowify
  popd
}

function main() {
  options=("$@")
  if array_contains options "--run-ec2"; then
    run_ec2
  fi

  if array_contains options "--cleanup-ec2"; then
    cleanup
  fi

  if array_contains options "--create-s3"; then
    create_s3
  fi

  if array_contains options "--deploy-landing"; then
    deploy_landing
  fi
}

main "${@}"
