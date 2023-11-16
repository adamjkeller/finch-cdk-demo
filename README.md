# Finch CDK Demo

## Overview

## Prerequisites

1. Install [Finch](https://github.com/runfinch/finch)
2. Install [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install)
3. Install [jq](https://stedolan.github.io/jq/download/)

## Walkthrough

The AWS CDK can bundle assets, and a common way to bundle artifacts is to use container images.
While some folks use Docker to build their images, other folks may prefer to use other clients to build their container images.
Let's walk through how folks can do this using the AWS CDK.

1. The first step is to set the CDK_DOCKER environment variable.
   This will tell the cdk which client to use for building the container image.

   ```bash
   export CDK_DOCKER=$(which finch)
   ```

2. Next, let's log into the ECR public registry.

   ```bash
   aws ecr-public get-login-password --region us-east-1 | finch login --username AWS --password-stdin public.ecr.aws
   ```

3. Now let's deploy our stack!
   Some things to note here:

   - When we run cdk deploy, the CDK will build our container image using the finch client.
   - The CDK will then push the image to the ECR public registry.
   - The CDK will then deploy our lambda function using the image that was just pushed to the ECR public registry as it's source.

   ```bash
    cdk deploy --require-approval never --all --outputs-file outputs.json
   ```

4. Now let's invoke our lambda function!

   ```bash
    aws lambda invoke --function-name $(jq -r '.[].LambdaFunctionArn' outputs.json) response.json
   ```

   View the response body:

   ```bash
    cat response.json | jq -r '.body'
   ```

5. That's it! We can see that the cdk built our container image using Finch, pushed it to Amazon ECR, and then deployed our lambda function using that image.

6. Clean up

   ```bash
    cdk destroy --force --all
   ```
