import { Function as LambdaFn, Runtime, S3Code } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs";


export interface LambdaResourcesProps {
    readonly lambdaArtifacts: Bucket;
    readonly artifactsKey: string;
}

export class LambdaResources extends Construct {
    public readonly lambdaFunction: LambdaFn;

    constructor(scope: Construct, id: string, props: LambdaResourcesProps) {
        super(scope, id);

        this.lambdaFunction = new LambdaFn(this, 'HelloWorldFunction', {
            functionName: 'HelloFunction',
            handler: 'index.handler',
            runtime: Runtime.NODEJS_20_X,
            code: S3Code.fromBucket(props.lambdaArtifacts, props.artifactsKey),
            description: Date.now().toString(),
        });

    }
}