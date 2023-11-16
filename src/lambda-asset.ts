import { Stack, StackProps, Duration, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class FinchDemo extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Lambda container image asset
    const lambdaContainerImageAsset = lambda.Code.fromAssetImage(
      path.join(__dirname, "../assets/lambda-api-service"),
      {
        assetName: "finch-lambda-demo",
      }
    );

    // Lambda function leveraging the asset
    const demoFun = new lambda.Function(this, "myLambdaFunction", {
      code: lambdaContainerImageAsset,
      runtime: lambda.Runtime.FROM_IMAGE,
      handler: lambda.Handler.FROM_IMAGE,
      timeout: Duration.seconds(30),
    });

    new CfnOutput(this, "LambdaFunctionArn", {
      value: demoFun.functionArn,
    });
  }
}
