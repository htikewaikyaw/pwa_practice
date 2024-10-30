### AWS Profile Configuration
- https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

### Lambda Layer Reference
- https://repost.aws/questions/QUzGvCBqo5T9CaW6eSoHsmJw/errortype-runtime-importmoduleerror
- https://docs.aws.amazon.com/lambda/latest/dg/adding-layers.html

## Installation Necessary Packages
```
npm i -g typescript@latest
```
```
npm i -g aws-cdk@latest
```

## aws-cdk configuation
### cdk-initialization
```
mkdir prject-name
```
```
cd project-name
```
```
cdk init app --language=typescript
```
### Add following to tsconfig.json
```
"esModuleInterop": true, 
```

### bootstrap
```
cdk bootstrap --profile your_profile_name
```
```
cdk bootstrap (aws configure only)
```
### build
```
npm run build
```
### deploy
```
cdk deploy --profile your_name
```
```
cdk deploy (aws configure only)
```
### Transaction
```
https://node-postgres.com/features/transactions
```


### pg problem possible solutions
```
https://github.com/brianc/node-pg-copy-streams
```
```
https://www.postgresql.org/docs/current/sql-copy.html
```
```
https://repost.aws/questions/QUxFZX1IjdQtKyFqPkeW-fEw/lambda-takes-a-file-from-s3-and-sends-it-to-a-postgres-rds-table
```
### Lambda Layer(If required)
- https://repost.aws/questions/QUzGvCBqo5T9CaW6eSoHsmJw/errortype-runtime-importmoduleerror
- https://docs.aws.amazon.com/lambda/latest/dg/adding-layers.html

```
mkdir nodejs
```
```
cd mkdir nodejs
```
```
cd nodejs
```
```
npm init -y
```
```
npm i pg@latest
```
```
npm i pg-copy-streams@latest
```
```
npm i xlsx
```
```
npm i dotenv
```
```

```
### Application Packages
```
npm i -D @types/aws-lambda@latest
```
```
npm i @aws-sdk/client-s3@latest
```
```
npm i pg@latest
```
```
npm i -D @types/pg
```
```
npm i pg-copy-streams@latest
```
```
npm i -D @types/pg-copy-streams
```
```
npm i dotenv
```
```
npm i xlsx
```
```
npm i uuid
```
```
npm i -D @types/uuid
```
### dynamo dy
```
npm i @aws-sdk/client-dynamodb
```
```
npm i @aws-sdk/lib-dynamodb
```