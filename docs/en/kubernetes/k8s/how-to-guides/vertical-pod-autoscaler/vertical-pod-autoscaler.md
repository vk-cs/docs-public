# {heading(Using Vertical Pod Autoscaler)[id=k8s-vertical-pod-autoscaler]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../concepts/addons-and-settings/addons#k8s-addons-vpa)[text=Vertical Pod Autoscaler]} (VPA) is a tool for automatically configuring resources (CPU and RAM) for Kubernetes containers. To fully explore how it works, use it with the Updater component in `Recreate` mode. In this mode, VPA:

1. Creates {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=resource request]} recommendations for already existing pods.
1. Deletes these pods and recreates them with the recommended values.

## {heading(Preparation steps)[id=k8s-vertical-pod-autoscaler-prepare]}

{include(/en/_includes/_create-test-cluster.md)[tags=magnum]}
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Install and configure]} `kubectl` if you have not already done so.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-vpa#k8s-install-advanced-vpa)[text=Install the VPA add-on]}, if you have not already done so.
1. (Optional) {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Install the Kube Prometheus Stack add-on]}, if you have not already done so. You will be able to use it to view VPA dashboards.

   When installing the add-on, {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring-edit-code)[text=edit]} its code by adding metrics for VPA dashboard configuration to the `kube-state-metrics` component:

   {cut(Metrics for VPA dashboard configuration)}
   
   ```yaml

# to kube-state-metrics

# begin
     rbac:
       extraRules:
         - apiGroups: ["autoscaling.k8s.io"]
           resources: ["verticalpodautoscalers"]
           verbs: ["list", "watch"]
     customResourceState:
       enabled: true
       config:
         kind: CustomResourceStateMetrics
         spec:
           resources:
             - groupVersionKind:
                 group: autoscaling.k8s.io
                 kind: "VerticalPodAutoscaler"
                 version: "v1"
               labelsFromPath:
                 verticalpodautoscaler: [metadata, name]
                 namespace: [metadata, namespace]
                 target_api_version: [spec, targetRef, apiVersion]
                 target_kind: [spec, targetRef, kind]
                 target_name: [spec, targetRef, name]
               metrics:

# Labels
                 - name: "verticalpodautoscaler_labels"
                   help: "VPA container recommendations. Kubernetes labels converted to Prometheus labels"
                   each:
                     type: Info
                     info:
                       labelsFromPath:
                         name: [metadata, name]

# Memory Information
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_target"
                   help: "VPA container recommendations for memory. Target resources the VerticalPodAutoscaler recommends for the container."
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [target, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_lowerbound"
                   help: "VPA container recommendations for memory. Minimum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [lowerBound, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_upperbound"
                   help: "VPA container recommendations for memory. Maximum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [upperBound, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_uncappedtarget"
                   help: "VPA container recommendations for memory. Target resources the VerticalPodAutoscaler recommends for the container ignoring bounds"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [uncappedTarget, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"

# CPU Information
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_target"
                   help: "VPA container recommendations for cpu. Target resources the VerticalPodAutoscaler recommends for the container."
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [target, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_lowerbound"
                   help: "VPA container recommendations for cpu. Minimum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [lowerBound, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_upperbound"
                   help: "VPA container recommendations for cpu. Maximum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [upperBound, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_uncappedtarget"
                   help: "VPA container recommendations for cpu. Target resources the VerticalPodAutoscaler recommends for the container ignoring bounds"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [uncappedTarget, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
     selfMonitor:
       enabled: true

# end
   ```
   {/cut}

## {heading(1. Create a Deployment workload controller)[id=k8s-vertical-pod-autoscaler-create-deployment]}

1. Create a manifest file for a `Deployment` type [workload](https://kubernetes.io/docs/concepts/workloads/) controller for the `nginx` application:

   ```console
   kubectl apply -f -
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: nginx
     name: nginx
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: nginx
    strategy: {}
    template:
      metadata:
        labels:
          app: nginx
     spec:
       containers:
       - image: nginx
         name: nginx
         resources:
           requests:
             cpu: 50m
             memory: 50Mi
           limits:
             cpu: 100m
             memory: 100Mi
   ```
   Here, the `resources` block {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=requests]} 50 mebibytes of RAM and 50m of CPU for the pods and sets a limit of 100 mebibytes of RAM and 100m of CPU.

1. Set the `LoadBalancer` type for the `Deployment` controller:

   ```console
   kubectl expose deployment nginx --type=LoadBalancer --port 80
   ```

1. Wait a few minutes for the load balancer to start, and run the command to get its external IP address:

   ```console
   kubectl get services nginx
   ```
   
   Find the `EXTERNAL-IP` value in the output table:

   ```text
   NAME     TYPE             ...          EXTERNAL-IP             ...
   nginx    LoadBalancer     ...          100.70.146.28           ...
   ```

## {heading(2. Create a VPA add-on object with the Updater component in Recreate mode and run testing)[id=k8s-vertical-pod-autoscaler-create-vpa]}

1. Create a manifest file for the VPA add-on with the Updater component in `Recreate` mode (`updateMode: "Recreate"`):

   ```console
   kubectl apply -f -
   apiVersion: autoscaling.k8s.io/v1
   kind: VerticalPodAutoscaler
   metadata:
    name: nginx-vpa
   spec:
    targetRef:
      apiVersion: "apps/v1"
      kind:       Deployment
      name:       nginx
    updatePolicy:
      updateMode: "Recreate"
    resourcePolicy:
      containerPolicies:
        - containerName: "nginx"
          minAllowed:
            cpu: "250m"
            memory: "100Mi"
          maxAllowed:
            cpu: "2000m"
            memory: "2048Mi"
   ```
   
1. Run a load test on the application created earlier using the load balancer IP address:

   ```console
   hey -z 300s -c 1000 http://100.70.146.28
   ```

## {heading(3. View the results)[id=k8s-vertical-pod-autoscaler-results]}

1. View the VPA recommendations using the command:

   ```console
   kubectl describe vpa nginx-vpa
   ```

   In the command output, in the `Recommendation` block, you will see the VPA recommendations for the `Deployment` object, showing how the pod resources can be changed when they are subsequently created manually or via VPA. Example output:

   ```console
   Name:         nginx-vpa
   Namespace:    default
   Labels:       <none>
   Annotations:  <none>
   API Version:  autoscaling.k8s.io/v1
   Kind:         VerticalPodAutoscaler
   Metadata:
     Creation Timestamp:  2025-09-16T12:02:45Z
     Generation:          1
     Resource Version:    10112725
     UID:                 35866c72-60b4-4b7c-87e3-f79de17c4263
   Spec:
     Resource Policy:
       Container Policies:
         Container Name:  nginx
         Max Allowed:
           Cpu:     2000m
           Memory:  2048Mi
         Min Allowed:
           Cpu:     250m
           Memory:  100Mi
     Target Ref:
       API Version:  apps/v1
       Kind:         Deployment
       Name:         nginx
     Update Policy:
       Update Mode:  Recreate
   Status:
     Conditions:
       Last Transition Time:  2025-09-16T12:03:38Z
       Status:                True
       Type:                  RecommendationProvided
    Recommendation:
      Container Recommendations:
        Container Name:  nginx
        Lower Bound:
          Cpu:     250m
          Memory:  104857600
        Target:
          Cpu:     250m
          Memory:  104857600
        Uncapped Target:
          Cpu:     15m
          Memory:  104857600
        Upper Bound:
          Cpu:     250m
          Memory:  104857600
   Events:
     Type    Reason      Age   From         Message
     ----    ------      ----  ----         -------
     Normal  EvictedPod  100s  vpa-updater  VPA Updater evicted Pod nginx-76894897bc-tmc44 to apply resource recommendation.
     Normal  EvictedPod  40s   vpa-updater  VPA Updater evicted Pod nginx-76894897bc-vfm9n to apply resource recommendation.
   ```

   Here, in the `Recommendation` block:

   - `Lower Bound` — the minimum recommended resource value at which the pod can be guaranteed to remain operational. The lower bound protects the pod from a resource shortage that could lead to unstable operation or errors.
   - `Target` — the value that reflects the actual resource consumption.
   - `Uncapped Target` — the optimal resource value that VPA calculated based on the actual pod consumption. It may match the `Target` value.
   - `Upper Bound` — the maximum possible resource value recommended for the pod. The upper bound prevents excessive increases in allocated resources.

   When VPA operates with the Updater component in `Recreate` mode, the pod will be deleted and subsequently recreated if both of the following conditions are met simultaneously:

   - The pod consumption is below the `Lower Bound` value and 10% higher or lower than the `Target` value.
   - The pod consumption is above the `Upper Bound` value and 10% higher or lower than the `Target` value.

1. Track the pod state in real time by running the command:

   ```console
   kubectl get po --watch
   ```

   In the command output, you will see the result of VPA operation with `updateMode: "Recreate"`: VPA changed the resource request recommendations, and as a result, the `Deployment` object deleted the old pod and recreated it with the new parameters. Example output:

   ```console
   NAME                                        READY   STATUS              RESTARTS   AGE  
   metrics-scraper                             1/1     Running             0          29d  
   nginx-76894897bc-vfm9n                      1/1     Running             0          55s  
   nginx-76894897bc-wrbj7                      0/1     ContainerCreating   0          7s   
   vpa-admission-controller-5f84cf7bf5-9xr8p   1/1     Running             0          15m  
   vpa-recommender-8d8999979-8stct             1/1     Running             0          4d21h
   vpa-updater-6d48bdf676-p7vbj                1/1     Running             0          15m  
   nginx-76894897bc-wrbj7                      1/1     Running             0          12s
   nginx-76894897bc-vfm9n                      1/1     Running             0          108s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          108s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          108s
   nginx-76894897bc-mskzl                      0/1     Pending             0          0s  
   nginx-76894897bc-mskzl                      0/1     Pending             0          0s
   nginx-76894897bc-mskzl                      0/1     ContainerCreating   0          0s
   nginx-76894897bc-mskzl                      0/1     ContainerCreating   0          0s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-mskzl                      1/1     Running             0          11s
   ```

1. View the meta-information that the Admission Controller component adds when recreating a pod deleted by the Updater component. To do this, run the command:

   ```console
   kubectl describe po nginx-76894897bc-mskzl
   ```
   
   Example output:

   ```console
   Name:             nginx-76894897bc-mskzl
   Namespace:        default
   Priority:         0
   Service Account:  default
   Node:             k8s-test-129-prometheus-0/192.168.1.27
   Start Time:       Tue, 16 Sep 2025 15:04:54 +0300
   Labels:           app=nginx
                     pod-template-hash=76894897bc
   Annotations:      cni.projectcalico.org/containerID: 161f4da190ec19f47c835ec3b2078e8c65750468c0eca310cec5f1e47f92a49e
                     cni.projectcalico.org/podIP: 10.100.124.114/32
                     cni.projectcalico.org/podIPs: 10.100.124.114/32
                     vpaObservedContainers: nginx
                     vpaUpdates: Pod resources updated by nginx-vpa: container 0: cpu request, memory request, cpu limit, memory limit
   Status:           Running
   IP:               10.100.124.114
   ```

1. (Optional) View the add-on operation results in the Grafana dashboard:

   1. {linkto(../../connect/addons-ui#k8s-addons-ui-web-ui)[text=Connect]} to the Grafana web interface included in the Kube Prometheus Stack add-on.
   1. View the dashboards in the **Home → Dashboards → General → VPA Recommendations** section.

## {heading(Delete unused resources)[id=k8s-vertical-pod-autoscaler-delete]}

{include(/en/_includes/_delete-test-cluster.md)}