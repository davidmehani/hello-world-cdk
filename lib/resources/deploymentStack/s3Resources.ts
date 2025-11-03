import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
dotenv.config();

export interface S3ResourcesProps {

}

export class S3Resources extends Construct {
    public readonly lambdaArtifactsBucket: Bucket;

    constructor(scope: Construct, id: string, props: S3ResourcesProps) {
        super(scope, id);

        this.lambdaArtifactsBucket = new Bucket(this, 'LambdaArtifacts', {
            bucketName: `${process.env.API_BUCKET_NAME}`,
            versioned: true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            encryption: BucketEncryption.S3_MANAGED,
            removalPolicy: RemovalPolicy.DESTROY,  // Not for production
        });
    }
}