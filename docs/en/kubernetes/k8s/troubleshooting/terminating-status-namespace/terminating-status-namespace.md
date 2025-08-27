The namespace is stuck in the `terminating` status and cannot be deleted.

This problem might be due to the fact that the deletion process is stuck or there are issues with cleaning up resources.

### Solution

1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.

1. Run the command to obtain the JSON file with the namespace description.
   
   For example, for the `test.json` file, run:
   
   ```console
   kubectl get ns <NAMESPACE_NAME> -o json > test.json
   ```

1. Delete the contents of the `spec` block in the JSON file.
   
   Once done, the `spec` block must look as follows:
   
   ```json
   "spec": { 
   }
   ```
1. Launch the proxy server: 
   
   ```console
   kubectl proxy
   ```

1. Delete the namespace via an API request or the `kubectl replace` command.
   
   For example, for the `test.json` file:

   {tabs}
   {tab(API request)}
   ```console
   curl -k -H "Content-Type: application/json" -X PUT --data-binary @test.json 127.0.0.1:8001/api/v1/namespaces/<NAMESPACE_NAME>/finalize
   ```
   {/tab}
   {tab(kubectl replace command)}
   This method is appropriate if you use the public Kubernetes API.

   ```console
   kubectl replace --raw "/api/v1/namespaces//finalize" -f test.json
   ```
   {/tab}
   {/tabs}