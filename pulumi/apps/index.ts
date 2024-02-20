import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as k8s from "@pulumi/kubernetes";

// Setup stack configuration
const stackName = pulumi.getStack();
const pulumiConfig = new pulumi.Config();
const baseEnv = pulumiConfig.get('baseEnv');
const baseOrg = pulumiConfig.get('baseOrg');
const env = `${stackName}`

// Reference base stack outputs
const envBaseStack = new pulumi.StackReference(`${baseOrg}/base/${baseEnv}`);
const clusterName = envBaseStack.getOutput("eksClusterName");
const kubeconfig = envBaseStack.getOutput("kubeconfig");

// Setup Kubernetes access
const k8sProvider = new k8s.Provider(`${stackName}-k8sProvider`, {
    kubeconfig: kubeconfig,
});

// Deploy the apps environment
const nsName = env;
const envNamespace = new k8s.core.v1.Namespace(`${env}-envNamespace`,{
    metadata: {
        name: nsName,
    },
}, { provider: k8sProvider });

// Create an IAM role for the Fargate profile.
const fargatePodExecutionRole = new aws.iam.Role(`${env}-apps-fargatePodExecutionRole`, {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: "eks-fargate-pods.amazonaws.com",
    }),
});

// Attach the necessary policies to the role.
const podExecutionRolePolicyAttachment = new aws.iam.RolePolicyAttachment(`${env}-apps-fargatePodExecutionRolePolicyAttachment`, {
    role: fargatePodExecutionRole,
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSFargatePodExecutionRolePolicy",
});

// Once the role is created, we can create a Fargate Profile.
const fargateProfile = new aws.eks.FargateProfile(`${env}-apps-fargateProfile`, {
    clusterName: clusterName,
    podExecutionRoleArn: fargatePodExecutionRole.arn,
    selectors: [{
        namespace: `${nsName}`,
    }],
}, { dependsOn: [podExecutionRolePolicyAttachment] });


// Deploy the apps
const nginxHelmRelease = new k8s.helm.v3.Release(`${env}-nginx`, {
    chart: "nginx",
    version: "15.10.3",
    repositoryOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
    namespace: `${nsName}`,
    values: {
        tolerations: [
            {
                key: "eks.amazonaws.com/compute-type",
                operator: "Equal",
                value: "fargate",
                effect: "NoSchedule",
            }
        ],
    },
}, { provider: k8sProvider, dependsOn: envNamespace });
