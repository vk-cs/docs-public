Docker CE allows working with Docker images and managing containers. To do this, the [Docker CLI commands](https://docs.docker.com/engine/reference/commandline/cli/) are used. The Docker command comprises options and subcommands:

```bash
docker [OPTIONS] SUBCOMMAND
```

To view the Docker CLI help, run the commands:

```bash
docker --help
```

```bash
docker SUBCOMMAND --help
```

See the [official documentation](https://docs.docker.com/) for more details about working with Docker.

## Before you begin

Make sure that:

- You have an access to the terminal of the host, on which Docker CE is installed.
- You can use `sudo` on that host to run the commands on behalf of superuser (`root`).

## Working with images

Containers are created from the Docker images. By default, Docker pulls images from the [Docker Hub](https://docs.docker.com/docker-hub/) (it is a [Docker registry](https://docs.docker.com/registry/)).

The Ubuntu OS image will be used as example to demonstrate how to work with images:

1. View available Ubuntu images in Docker Hub:

   ```bash
   sudo docker search ubuntu
   ```

   The command's output will contain the list of images, which satisfy the search criteria.

   <details>
   <summary>Example output</summary>

   ```text
   NAME                             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
   ubuntu                           Ubuntu is a Debian-based Linux operating sys…   15748     [OK]
   websphere-liberty                WebSphere Liberty multi-architecture images …   293       [OK]
   open-liberty                     Open Liberty multi-architecture images based…   59        [OK]
   neurodebian                      NeuroDebian provides neuroscience research s…   99        [OK]
   ubuntu-debootstrap               DEPRECATED; use "ubuntu" instead                50        [OK]
   ubuntu-upstart                   DEPRECATED, as is Upstart (find other proces…   112       [OK]
   ubuntu/nginx                     Nginx, a high-performance reverse proxy & we…   83

   ...
   ```

   </details>

1. Pull the `ubuntu` image:

   ```bash
   sudo docker pull ubuntu
   ```

   The command's output will contain the information about the pulling progress.

   <details>
   <summary>Example output</summary>

   ```text
   Using default tag: latest
   latest: Pulling from library/ubuntu
   2ab09b027e7f: Pull complete
   Digest: sha256:67211c14fa74f070d27cc59d69a7fa9aeff8e28ea118ef3babc295a0428a6d21
   Status: Downloaded newer image for ubuntu:latest
   docker.io/library/ubuntu:latest
   ```

   </details>

1. Make sure that the image was pulled by viewing the pulled images:

   ```bash
   sudo docker images
   ```

   The command's output will contain the list of pulled images.

   <details>
   <summary>Example output</summary>

   ```text
   REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
   ubuntu        latest    08d22c0ceb15   2 weeks ago     77.8MB
   hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
   ```

   </details>

## Creating and running container

To create and run a container, which uses the pulled image, employ the `docker run` command. This command is a [combination](https://docs.docker.com/engine/reference/commandline/run/) of the `docker create` and the `docker start` commands.

The operation will be demonstrated for the previously pulled `ubuntu` image:

1. Create and run the container:

   ```bash
   sudo docker run -it ubuntu
   ```

   After running the container, you will get access to the container's terminal (TTY) with the bash session (this is achieved with `-it` options). As a result, you will get the bash command line prompt, which looks like:

   ```text
   root@8502eb90112b:/#
   ```

   In this example output, `8502eb90112b` is an identifier of the created container.

1. To check that the container is operational, install [Node.js](https://nodejs.org/en/about) into it.

   1. Run the command:

      ```bash
      apt update && apt install nodejs -y
      ```

   1. View the information about installed Node.js version:

      ```bash
      node -v
      ```

      Example output:

      ```text
      v12.22.9
      ```

1. Exit the container's bash command line:

   ```bash
   exit
   ```

   The container will be stopped.

## Managing containers

1. To manage containers it is necessary to obtain their identifiers. To do this, view the list of the containers:

   <tabs>
   <tablist>
   <tab>The list of all containers</tab>
   <tab>The list of the running containers</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo docker ps -a
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker ps
   ```

   </tabpanel>
   </tabs>

   <details>
   <summary>Example docker ps -a output</summary>

   ```text
   CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                       PORTS     NAMES
   8502eb90112b   ubuntu        "/bin/bash"   11 minutes ago   Exited (127) 7 seconds ago             sharp_tharp
   794ef863c235   hello-world   "/hello"      19 hours ago     Exited (0) 19 hours ago                dazzling_keldysh
   ```

   </details>

   A container identifier is listed in the `CONTAINER ID` column.

1. Manage a container, using its identifier:

   <tabs>
   <tablist>
   <tab>Start container</tab>
   <tab>Stop container</tab>
   <tab>Remove container</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo docker start <container identifier>
   ```

   Example command to start the `ubuntu` container with the `8502eb90112b` identifier:

   ```bash
   sudo docker start 8502eb90112b
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker stop <container identifier>
   ```

   Example command to stop the `ubuntu` container with the `8502eb90112b` identifier:

   ```bash
   sudo docker stop 8502eb90112b
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker rm <container identifier>
   ```

   It is impossible to remove the running container. Either stop it first, or do removal with the `--force` option.

   Example command to remove the `ubuntu` container with the `8502eb90112b` identifier:

   ```bash
   sudo docker rm 8502eb90112b
   ```

   </tabpanel>
