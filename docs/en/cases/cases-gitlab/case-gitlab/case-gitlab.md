[GitLab](https://about.gitlab.com/) is a tool for collaborating on software development projects. It provides storage and management of Git repositories, as well as code version control. GitLab automates CI/CD processes: building, testing, and deploying software. To launch and automatically execute CI/CD tasks, GitLab uses the GitLab Runner application.

Below is an example of installing the free versions of GitLab and GitLab Runner on a virtual machine running Ubuntu 22.04. The Docker containerization platform and its Docker Compose plugin are used as the installation tool.

## Preparatory steps

1. [Register](/en/additionals/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/operations/manage-net#creating_a_network) a network `network1` with internet access and a subnet with the address `10.0.0.0/24`.
1. [Create](/en/networks/vnet/operations/secgroups) a security group `gitlab` and add inbound permissions to it for the ports:

   - `80` (HTTP),
   - `443` (HTTPS),
   - `22` (SSH),
   - `35242` (SSH).

   Instead of `35242`, you can use any port that is not reserved by the operating system.

1. [Create a VM](/en/base/iaas/service-management/vm/vm-create) running Ubuntu 22.04.

   When selecting VM options, consider the [hardware requirements](https://docs.gitlab.com/ee/install/requirements.html) for installing GitLab and GitLab Runner.

   The following VM configuration is used as an example:

     - name: `OA-Ubuntu-docker`;
     - operating system: Ubuntu 22.04;
     - network: `network1` with subnet `10.0.0.0/24`;
     - [flavor](/en/base/iaas/concepts/about#flavors): `STD2-4-12`;
     - network HDD drive: 50 GB;
     - public IP address: assigned, further will be used `185.185.185.185`;
     - security groups: `default`, `gitlab`.

   <info>

   When creating a VM running Ubuntu, a user is automatically created with the `ubuntu` name and full rights to use `sudo`.

   </info>

1. (Optional) Assign a domain name to the VM to use for accessing GitLab. Do it in one of the following ways:

   - If you have a domain, add your VM to it.
   - If you do not have a domain, use, for example, [NoIP](https://www.noip.com/) — one of the services that provides dynamic DNS. For this, install a dynamic update client on the VM. More details in the [NoIP service documentation](https://www.noip.com/support/knowledgebase/installing-the-linux-dynamic-update-client-on-ubuntu).

    <details>
        <summary>What is the purpose of assigning a domain name?</summary>
        You can install GitLab on a VM that does not have a domain name. During installation, self-signed SSL certificates will be automatically issued for connecting to GitLab over HTTPS. However, you will not be able to issue a public SSL certificate for GitLab. As a result, when opening the login page of your GitLab server, users will see the warning: “The connection is not secure.”.

    </details>

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/vm-connect-nix) to the `OA-Ubuntu-docker` VM via SSH.
1. Check the status of your operating system firewall and disable it if it is active:

    ```bash
    sudo ufw status
    sudo ufw disable
    ```

    <info>

    There is no need for the operating system firewall, since the [VK Cloud firewall controls](/en/networks/vnet/concepts/traffic-limiting) the incoming and outbound traffic on the VM.

    </info>

1. [Install and configure Docker](/en/additionals/cases/cases-docker-ce/docker-ce-u18).
1. Install the [Docker Compose](https://docs.docker.com/compose/) plugin:

   1. Update the list of available Ubuntu packages and their versions:

        ```bash
        sudo apt-get update
        ```

   1. Install the latest version of the Docker Compose plugin:

        ```bash
        sudo apt-get install docker-compose-plugin
        ```

   1. Verify that the plugin is installed correctly by requesting its version:

        ```bash
        docker compose version
        ```

        Expected result:

        ```bash
        Docker Compose version vN.N.N
        ```

        Here `N.N.N` is the plugin version number.

## 1. Change the port for connecting to the VM via SSH

For access via SSH, GitLab by default uses port `22`, which is reserved by the operating system for connecting to the VM via SSH. To avoid conflict, change the system SSH port to another one.

1. Open the `/etc/ssh/sshd_config` file for editing:

    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

1. Replace the line `#Port 22` with `Port 35242`.

    <info>

    The number `35242` is used as an example. If you are going to use a different number, open it for SSH connections in the VM firewall settings. More details in the [Managing firewall rules](/en/networks/vnet/operations/secgroups) section.

    </info>

1. Save the file and exit the editor by pressing CTRL+O and then CTRL+X.

1. Restart the `sshd` service:

    ```bash
    sudo systemctl restart sshd
    ```

1. Close the current connection to the VM:

    ```bash
    exit
    ```

1. Connect to the `OA-Ubuntu-docker` VM via SSH using the new port:

    ```bash
    ssh -i <path to SSH key> ubuntu@185.185.185.185 -p 35242
    ```

    Instead of `185.185.185.185` you can use the fully qualified domain name of the VM if it exists.

## 2. Install GitLab and GitLab Runner using Docker Compose

1. Create directories for the GitLab persistent repository by sequentially running the commands:

    ```bash
    sudo mkdir -p /opt/gitlab
    sudo mkdir -p /opt/gitlab/config
    sudo mkdir -p /opt/gitlab/logs
    sudo mkdir -p /opt/gitlab/data
    sudo mkdir -p /opt/gitlab-runner
    sudo mkdir -p /opt/gitlab-runner/config
    sudo mkdir -p /opt/gitlab-runner/data
    ```

1. Create and open for editing a Docker Compose configuration file:

    ```bash
    sudo nano docker-compose.yml
    ```

1. Copy the following content into the editor window, replacing `185.185.185.185` with the external IP address of the VM or its fully qualified domain name:

    <details>
      <summary>Content of the docker-compose.yml file</summary>

      ```yaml
      version: '3.7'
      services:
        gitlab:
          container_name: gitlab
          image: 'gitlab/gitlab-ce:latest'
          restart: always
          hostname: '185.185.185.185'
          environment:
            GITLAB_OMNIBUS_CONFIG: |
              external_url 'https://185.185.185.185'
              # Add any other gitlab.rb configuration parameters here, each on its own line
          ports:
            - '80:80'
            - '443:443'
            - '22:22'
          volumes:
            - '/opt/gitlab/config:/etc/gitlab'
            - '/opt/gitlab/logs:/var/log/gitlab'
            - '/opt/gitlab/data:/var/opt/gitlab'

        gitlab-runner:
          container_name: gitlab-runner
          image: gitlab/gitlab-runner:latest
          restart: always
          volumes:
            - '/opt/gitlab-runner/data:/home/gitlab_ci_multi_runner/data'
            - '/opt/gitlab-runner/config:/etc/gitlab-runner'
            - '/var/run/docker.sock:/var/run/docker.sock:rw'
          environment:
            - CI_SERVER_URL=https://185.185.185.185/ci
      ```

    </details>

    <info>

    If necessary, specify additional settings below the `# Add…` comment line. The configuration parameters for the Docker Compose plugin are described in the [official Docker documentation](https://docs.docker.com/compose/compose-file/03-compose-file/).

    </info>

1. Save the file and exit the editor by pressing CTRL+O and then CTRL+X.
1. Launch the Docker Compose plugin:

    ```bash
    sudo docker compose up -d
    ```

    <details>
      <summary>Output upon successful operation</summary>

      ```txt
      [+] Running 13/13
      ✔ gitlab-runner 3 layers [⣿⣿⣿]      0B/0B      Pulled                 19.4s
      ✔ 527f5363b98e Pull complete                                            1.7s
      ✔ 5aa2f01642ad Pull complete                                            5.8s
      ✔ 112312283fb7 Pull complete                                            2.2s
      ✔ gitlab 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                 83.0s
      ✔ 3dd181f9be59 Pull complete                                            0.9s
      ✔ 5222e10cb5b3 Pull complete                                            0.7s
      ✔ b86fffbd1d96 Pull complete                                            0.6s
      ✔ a8f85f865bd2 Pull complete                                            1.0s
      ✔ fd086081fce9 Pull complete                                            1.2s
      ✔ 9c3df03dc259 Pull complete                                            1.4s
      ✔ 539bd3fbd6f5 Pull complete                                            1.5s
      ✔ fceb275916b3 Pull complete                                           13.3s
      [+] Running 3/3
      ✔ Network ubuntu_default   Created                                      1.4s
      ✔ Container gitlab         Started                                     49.4s
      ✔ Container gitlab-runner  Started                                     49.4s
      ```
    </details>  

## 3. Check the status of your GitLab container

Run the command:

```bash
sudo docker ps
```

Output upon successful operation:

```txt
CONTAINER ID   IMAGE                         COMMAND                  CREATED         STATUS                            PORTS                                                                                                         NAMES
1e6cee4fe37a   gitlab/gitlab-ce:latest       "/assets/wrapper"        4 minutes ago   Up 9 seconds (health: starting)   0.0.0.0:22->22/tcp, :::22->22/tcp, 0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   gitlab
882fc3fb80f5   gitlab/gitlab-runner:latest   "/usr/bin/dumb-init …"   4 minutes ago   Up 4 minutes                                                                                                                                    gitlab-runner
```

## 4. (Optional) Issue a public SSL certificate for the VM

If the VM on which GitLab is installed has a domain name, you can issue a public SSL certificate for your GitLab instance, for example from [Let’s Encrypt](https://letsencrypt.org/). More details in the [official GitLab documentation](https://docs.gitlab.com/omnibus/settings/ssl/).

## 5. Check the functionality of GitLab

1. Obtain and copy the automatically generated GitLab admin password:

    ```bash
    sudo cat /opt/gitlab/config/initial_root_password
    ```

    Output upon successful operation:

    ```txt
    # WARNING: This value is valid only in the following conditions
    #          1. If provided manually (either via `GITLAB_ROOT_PASSWORD` environment variable or via `gitlab_rails['initial_root_password']` setting in `gitlab.rb`, it was provided before database was seeded for the first time (usually, the first reconfigure run).
    #          2. Password hasn't been changed manually, either via UI or via command line.
    #
    #          If the password shown here doesn't work, you must reset the admin password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

    Password: /XR7tRH_ХХХХ=

    # NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
    ```

1. In the browser, go to `https://185.185.185.185`.

    Instead of `185.185.185.185` you can use the fully qualified domain name of the VM if it exists.

    The GitLab login page will open.

1. To log in, use the administrator login (`root`) and the copied password.

    The GitLab dashboard will open. The installation is complete, GitLab is ready for operation.

## Delete unused resources

Deployed virtual resources are charged. If you do not need them anymore:

- [Delete](/en/base/iaas/service-management/vm/vm-manage#deleting_a_vm) the `OA-Ubuntu-docker` VM.
- If necessary, [delete](/en/networks/vnet/operations/manage-floating-ip#removing_floating_ip_address_from_the_project) the floating IP address `185.185.185.185`.
