import { App } from "aws-cdk-lib";
import { AppStagingSynthesizer } from "@aws-cdk/app-staging-synthesizer-alpha";
import { FinchDemo } from "./lambda-asset";

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App({
  defaultStackSynthesizer: AppStagingSynthesizer.defaultResources({
    appId: "finch-cdk-demo",
    imageAssetVersionCount: 1,
  }),
});

new FinchDemo(app, "finch-cdk-demo-dev", { env: devEnv });
app.synth();
