import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const stackName = pulumi.getStack();
const pulumiConfig = new pulumi.Config();
const baseOrg = pulumiConfig.get('baseOrg');
const env = `${stackName}`;

// Allocate a new VPC with the default settings
const vpc = new awsx.ec2.Vpc(`${env}-vpc`);

const eksCluster = new eks.Cluster(`${env}-eksCluster`, {
    name: `${env}-eksCluster`,
    vpcId: vpc.vpcId,
    publicSubnetIds: vpc.publicSubnetIds,
    privateSubnetIds: vpc.privateSubnetIds,
    nodeAssociatePublicIpAddress: false,
    fargate: true,
}, {
    dependsOn: vpc
});

// Export a few properties to make them easy to use
export const vpcId = vpc.vpcId;
export const privateSubnetIds = vpc.privateSubnetIds;
export const publicSubnetIds = vpc.publicSubnetIds;
export const eksClusterName = eksCluster.eksCluster.name;
export const fargatePodExecutionRoleArn = eksCluster.eksCluster.roleArn;
export const kubeconfig = eksCluster.kubeconfig;
