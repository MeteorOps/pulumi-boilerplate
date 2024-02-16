import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const stackName = pulumi.getStack();

// Allocate a new VPC with the default settings
const vpc = new awsx.ec2.Vpc(`${stackName}-vpc`);

const eksCluster = new eks.Cluster(`${stackName}-eksCluster`, {
    name: `${stackName}-eksCluster`,
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