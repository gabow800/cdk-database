import {Stack, StackProps} from "aws-cdk-lib";
import {
    BastionHostLinux,
    InstanceClass,
    InstanceSize,
    InstanceType,
    Port,
    SecurityGroup,
    Vpc
} from "aws-cdk-lib/aws-ec2";
import {Construct} from "constructs";

export interface BastionStackProps extends StackProps {
    vpc: Vpc
    postgresEndpoint: string
    postgresSecurityGroup: SecurityGroup
}

export class BastionStack extends Stack {
    public bastion: BastionHostLinux
    public securityGroup: SecurityGroup

    constructor(scope: Construct, id: string, props: BastionStackProps) {
        super(scope, id, props)

        this.securityGroup = new SecurityGroup(this, 'EC2PostgresProxy', {
            vpc: props.vpc,
        })

        this.bastion = new BastionHostLinux(this, 'Bastion', {
            vpc: props.vpc,
            subnetSelection: {
                subnetGroupName: 'Public',
            },
            instanceName: 'bastion',
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            securityGroup: this.securityGroup,

        })
        this.bastion.connections.allowFromAnyIpv4(Port.tcp(22))


        props.postgresSecurityGroup.addIngressRule(this.securityGroup, Port.tcp(5432), 'Allow access from EC2 server.', true)
    }
}