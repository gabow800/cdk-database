# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# Connect to database

Generate ssh keys and add public key in `~/.ssh/authorized_keys` in the bastion server.

Start an SSL tunnel in your local machine.

```bash
ssh ec2-user@<bastion-ip> -N -L 5432:<rds-proxy-domain>:5432
```

Connect to the database.

```bash
psql -U master -h localhost
```