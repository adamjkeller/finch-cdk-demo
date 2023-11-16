import { awscdk } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.109.0",
  defaultReleaseBranch: "main",
  name: "finch-cdk-demo",
  projenrcTs: true,
  deps: ["@aws-cdk/app-staging-synthesizer-alpha@^2.109.0-alpha.0"],
  dependabot: true,
  gitignore: ["outputs.json", "response.json"],
});
project.synth();
