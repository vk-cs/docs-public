1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

1. Display the events of the affected pod using the command:

   ```console
   kubectl describe pod <POD_NAME> -n <NAMESPACE> | sed -n '/Events/,$p'
   ```
1. Check whether the `Events` section contains similar records: