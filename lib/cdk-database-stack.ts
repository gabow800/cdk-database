import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {NetworkStack} from "./network";
import {PostgresStack} from "./postgres";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkDatabaseQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const networkStack = new NetworkStack(this, 'NetworkStack', {});
    const postgresStack = new PostgresStack(this, 'PostgresStack', {
      vpc: networkStack.vpc,
    })

  }
}
