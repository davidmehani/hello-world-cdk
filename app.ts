import { App } from 'aws-cdk-lib';
import { ApiStack } from './lib/stacks/apiStack';
import { FUNCTION_ARTIFACT_KEY } from './config/lambdaArtifactsConfig';
import { FrontendStack } from './lib/stacks/frontendStack';
import { DeploymentStack } from './lib/stacks/deploymentStack';

const app = new App();

const deploymentStack = new DeploymentStack(app, 'DeploymentStack', {});

const apiStack = new ApiStack(app, 'ApiStack', {
    artifactsKey: FUNCTION_ARTIFACT_KEY,
    deploymentStack: deploymentStack
});

const frontendStack = new FrontendStack(app, 'FrontendStack', {})

