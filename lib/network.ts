import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import {InterfaceVpcEndpointAwsService, SubnetType, Vpc} from "aws-cdk-lib/aws-ec2";

export class NetworkStack extends Stack {
  public vpc: Vpc

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    this.vpc = new Vpc(this, 'VPC', {
      //cidr: '10.0.60.0/16',
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'Public',
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: 'Postgres',
          cidrMask: 24,
          subnetType: SubnetType.ISOLATED,
        },
      ],
    })
    this.vpc.addInterfaceEndpoint('SecretsManagerEndpoint', {
      service: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    })
  }
}