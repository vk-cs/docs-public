You can connect to the Docker registry if the appropriate [addon](../../concepts/addons-and-settings/addons) is installed in the cluster.

When [installing](../../operations/addons/advanced-installation/install-advanced-registry/) an addon, a standard load balancer with a floating IP address is created for it. Therefore, you can connect to the Docker registry from any host that has Internet access.

## Preparatory steps

1. [Make sure](../../operations/addons/manage-addons#viewing-addons) that the Docker registry addon (`docker-registry`) is installed in the cluster.
1. [Get the data](../../operations/addons/advanced-installation/install-advanced-registry#getting-data-to-access-the-registry) to access the Docker registry.

## Connecting to the Docker Registry

On the host from which you plan to connect to the registry:

1. [Install Docker Engine](https://docs.docker.com/engine/install/) if not already installed. There is a choice of either Docker Desktop or a server-side version of Docker Engine without a GUI.

   Docker Engine must be installed on the host from which the registry will be used. Perform the next steps on that host.

1. Add the Docker registry to the list of trusted registries:

   1. Add the `insecure-registries` parameter with the address of the Docker registry endpoint to the Docker `daemon.json` configuration file.

      The address is specified in the format `<URL of Docker registry>:<Docker Registry port>`.

      ```json
      {
        ...

        { "insecure-registries": [
          "https://192.0.2.2:5000"
        ],

        ...
      }
      ```

      The location of this file for different Docker Engine installations is given in [official Docker documentation](https://docs.docker.com/config/daemon/#configure-the-docker-daemon).

   1. Restart the Docker Engine.

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
      <tab>macOS</tab>
      </tablist>
      <tabpanel>

      - For the server version of the Docker Engine, run one of the commands to restart:

        ```bash
        sudo systemd restart docker
        ```

        ```bash
        sudo service docker restart
        ```

      - For Docker Desktop, use [GUI](https://docs.docker.com/desktop/settings/linux/#docker-engine).

      </tabpanel>
      <tabpanel>

      Use [GUI](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      <tabpanel>

      Use [GUI](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      </tabs>

1. Log in into the registry:

   ```bash
   docker login <URL of Docker registry> --username <login for Docker registry>
   ```

   Enter the password for the Docker registry.

Now you can do any operations with the registry, for example, to push Docker images there.

Read more about registry operations in [official Docker documentation](https://docs.docker.com/registry/).
