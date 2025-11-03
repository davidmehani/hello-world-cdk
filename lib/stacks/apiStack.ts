import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaResources } from '../resources/apiStack/lambdaResources';
import { DdbResources } from '../resources/apiStack/ddbResources';
import { ApiGatewayResources } from '../resources/apiStack/apiGatewayResources';
import { DeploymentStack } from './deploymentStack';

export interface ApiStackProps extends StackProps {
  readonly artifactsKey: string;
  readonly deploymentStack: DeploymentStack;
}

export class ApiStack extends Stack {
  public readonly lambdaResources: LambdaResources;
  public readonly ddbResources: DdbResources;
  public readonly apiGatewayResources: ApiGatewayResources;
  
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    this.lambdaResources = new LambdaResources(this, 'LambdaResources', {
      lambdaArtifacts: props.deploymentStack.s3Resources.lambdaArtifactsBucket,
      artifactsKey: props.artifactsKey,
    });

    this.ddbResources = new DdbResources(this, 'DdbResources', {
      lambdaResources: this.lambdaResources,
    });

    this.apiGatewayResources = new ApiGatewayResources(this, 'ApiGatewayResources', {
      lambdaResources: this.lambdaResources,
    });
  }
}
