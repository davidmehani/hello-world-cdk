import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3Resources } from "../resources/deploymentStack/s3Resources";

export interface DeploymentStackProps extends StackProps {

}

export class DeploymentStack extends Stack {
    public readonly s3Resources: S3Resources;
    constructor(scope: Construct, id: string, props: DeploymentStackProps) {
        super(scope, id, props);

        this.s3Resources = new S3Resources(this, 'DeploymentBucket', {})
    }
}