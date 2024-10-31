import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PwaPracticeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PwaPracticeQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const UserApiFunction = new lambda.Function(this, 'UserApi', {
      functionName:'UserApiFunction',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/pwa-practice/user/lambda'),
    });
    
    const OperationsApiFunction = new lambda.Function(this, 'OperationsApi', {
      functionName:'OperationsApiFunction',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/pwa-practice/operations/lambda'),
    });
    
  }
}
