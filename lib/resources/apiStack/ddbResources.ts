import { Construct } from 'constructs';
import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { LambdaResources } from './lambdaResources';
import { RemovalPolicy } from 'aws-cdk-lib';


export interface DdbResourcesProps {
    readonly lambdaResources: LambdaResources;
}

export class DdbResources extends Construct {
    public readonly table: Table;
    
    constructor(scope: Construct, id: string, props: DdbResourcesProps) {
        super(scope, id);

        this.table = this.createTable(props);
    }

    private createTable(props: DdbResourcesProps): Table {
        const table = new Table(this, 'HelloTable', {
            tableName: 'HelloTable',
            partitionKey: { name: 'id', type: AttributeType.STRING },
            removalPolicy: RemovalPolicy.DESTROY, // NOT for production
            billingMode: BillingMode.PAY_PER_REQUEST
        });
        table.grantFullAccess(props.lambdaResources.lambdaFunction);
        return table;
    }
}