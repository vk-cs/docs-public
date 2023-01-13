<info>

Connection is only possible if [pre-configured Docker Registry service](../../concepts/preconfigured-features/addons#docker-registry) was selected during cluster creation.

</info>

1. Get the necessary information to use the registry:

   1. Go to [personal account](https://mcs.mail.ru/app/) VK Cloud.
   1. Select the project and region where the desired cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Click the name of the cluster you want. A page with information will open.
   1. Open the **Docker Registry access** tab at the end of the page.

      Copy the values of `URL`, `username` and `password`.

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
   docker login <URL of Docker registry> --username <username for Docker registry>
   ```

   Enter the password for the Docker registry.

Now you can do any operations with the registry, for example, to push Docker images there.

Read more about registry operations in [official Docker documentation](https://docs.docker.com/registry/).
