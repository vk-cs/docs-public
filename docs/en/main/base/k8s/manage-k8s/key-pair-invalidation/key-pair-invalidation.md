Disabling a cluster key pair is a procedure for disabling access to an instance image for a user who has a private key from this key pair.

The key pair is SSH credentials entered into the images when they are launched. A key pair consists of a private key and a public key.

If someone has a copy of the private key and you want to prevent them from connecting to your cluster (for example, if they have left your organization), you can delete the public key in the instance and replace it with a new one, that is, disable the key pair of this cluster.

To start the disability procedure, open [personal account](https://mcs.mail.ru/app /) and follow the instructions:

1. In the "Kubernetes Clusters" tab of the "Containers" section, click the action menu icon next to the cluster in which you want to replace the key and select the "Disable" option.
    
2. In the window that opens, select the option to add a new public key instead of the deleted one:
    
    * "Upload a public ssh key" – import a public key from a user's computer.
        
    * "Create a new key" – generates a new key pair and binds the cluster to its public key. The download of the private key file will begin immediately after clicking the "Disable" button.
        
    * Choosing another available public key – you can link another public key available in the system.
        
3. Click Disable.