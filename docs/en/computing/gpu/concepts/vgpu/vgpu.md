*vGPU* technology uses a special driver to share the resources of a physical GPU between multiple VMs with [Cloud GPU](/en/computing/gpu/concepts/about) support.

This technology benefits users who do not need full physical GPU allocation.

## {heading(Comparison with physical GPU)[id=comparison]}

[cols="1,2,2", options="header"]
|===
|Feature
|Physical GPU
|vGPU
|Cost efficiency
|The entire physical GPU is allocated and charged for, and cost reduction by resource limitation is not available
|Lower-cost configurations are available via partial allocation of GPU resources, and the configuration can be changed later if needed
|GPU allocation per VM
|100% of the total physical GPU resource
|Up to 100%, varies depending on internal resource allocation policies for physical GPUs
|Available VRAM
|100% of total physical GPU memory
|Up to 100%, depending on the [profile used](#profiles)
|OS configuration steps
|Only the installation of the graphics driver is required
|In addition to driver installation, the OS also needs to be configured to connect to the [license server](#licensing).
|===

## {heading(Profiles)[id=profiles]}

In addition to the standard characteristics (CPU, RAM, etc.), [the name of the flavor](/en/computing/iaas/concepts/about#name_of_vm_configuration_templates_cef204b0) with vGPU also includes the *vGPU profile*.

The vGPU profile contains two parts:

* Profile type, defined by a specific letter. Determines the type of tasks that will be processed by the GPU. Cloud GPU provides universal Q-series profiles. They are suitable for rendering the interface and advanced 3D projects, as well as for complex calculations (AI, ML, HPC) based on CUDA.
* Available video memory (VRAM) in GB.

For example, a flavor with 2 CPUs, 8 GB RAM, an L4 GPU, and 1 GB VRAM would be named `vGPU-2-8-L4-1Q`.

## {heading(Flavors)[id=flavors]}

Cloud GPU provides flavors with vGPU based on NVIDIA® L4.

| Flavor | CPU | RAM | GPU | Profile | VRAM, MB |
| :--- | :--- | :--- | :--- | :--- | :--- |
| vGPU-2-8-L4-1Q | 2   | 8   | L4  | 1Q  | 1024 |
| vGPU-2-8-L4-2Q | 2   | 8   | L4  | 2Q  | 2048 |
| vGPU-4-8-L4-2Q | 4   | 8   | L4  | 2Q  | 2048 |
| vGPU-4-16-L4-4Q | 4   | 16  | L4  | 4Q  | 4096 |
| vGPU-8-16-L4-8Q | 8   | 16  | L4  | 8Q  | 8192 |
| vGPU-16-32-L4-12Q | 16  | 32  | L4  | 12Q | 12288 |
| vGPU-32-64-L4-24Q | 32  | 64  | L4  | 24Q | 24576 |

## {heading(Licensing)[id=licensing]}

Cloud GPU uses NVIDIA® vGPU Virtual Workstation license for Q-series profiles.

The license check in VK Cloud is performed by the local NVIDIA® License Server. Depending on which OS image is used, additional configuration may be required:

- OS image provided by VK Cloud: no additional actions are required, as the licensing server is already configured.
- Custom VM image: additional system configuration is required to use vGPU.

If the check fails, the VM operates in trial mode for up to 20 minutes.