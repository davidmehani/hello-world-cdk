import { AuthorizationType, Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { LambdaResources } from "./lambdaResources";

export interface ApiGatewayResourcesProps {
    readonly lambdaResources: LambdaResources;
}

export class ApiGatewayResources extends Construct {
    public readonly api: RestApi;
    
    constructor(scope: Construct, id: string, props: ApiGatewayResourcesProps) {
        super(scope, id);

        this.api = this.createApiGateway(props);
    }

    private createApiGateway(props: ApiGatewayResourcesProps): RestApi {
        const api = new RestApi(this, 'HelloApi', {
                restApiName: 'HelloApi',
                defaultCorsPreflightOptions: {
                    allowOrigins: Cors.ALL_ORIGINS,
                    allowMethods: Cors.ALL_METHODS,
                },
        });
        
        const resource = api.root.addResource('hello');
        const integration = new LambdaIntegration(props.lambdaResources.lambdaFunction, {
            proxy: true,
        });
        resource.addMethod('GET', integration, {
            authorizationType: AuthorizationType.NONE,
        });
        return api;
    }
}