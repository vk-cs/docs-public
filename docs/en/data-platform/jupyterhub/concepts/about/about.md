# {heading(About the service)[id=jupyterhub_info]}

{include(/en/_includes/_translated_by_ai_en.md)}

JupyterHub is a tool for creating a multi-user environment based on Jupyter Notebook. It allows you to run multiple separate Jupyter Notebook sessions for different users via a web interface and manage them. For more information about JupyterHub, see the [official documentation](https://jupyterhub.readthedocs.io/en/stable/).

The JupyterHub service provides an environment for running data experiments. It includes a set of popular libraries and a pre-configured environment for GPU. It supports simultaneous operation of multiple users.

Key features of JupyterHub:

- Flexible configuration:

    - support for various compute backends;
    - the ability to use Docker containers;
    - custom image configuration;
    - integration with data storage systems.

- Educational capabilities:

    - creating virtual classrooms;
    - managing assignments and projects;
    - tracking learning progress;
    - collaborative work on projects.

- Extensibility:

    - support for plugins and extensions;
    - the ability to customize the interface;
    - integration with CI/CD tools;
    - support for various programming languages.

A JupyterHub instance can only be created in the {linkto(../../instructions/create#jupyterhub_create)[text=Cluster]} configuration (consisting of several nodes). This solution is suitable for processing large volumes of data and provides high performance and fault tolerance: the failure of one node will not cause the instance to stop operating.