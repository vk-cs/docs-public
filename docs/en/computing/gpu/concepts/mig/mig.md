# {heading(Hardware GPU partitioning with MIG)[id=gpu-concepts-mig]}

{include(/en/_includes/_translated_by_ai_en.md)}

_MIG (Multi-Instance GPU)_ allows you to partition the memory and compute resources of a single GPU into _MIG devices_ — logical GPUs with a dedicated share of compute resources and memory, isolated at the hardware level according to the {linkto(#gpu-concepts-mig-profiles)[text=MIG profile]} used.

{var(cloud)} supports working with MIG in the {linkto(../../../../kubernetes/k8s/concepts/about#k8s-about)[text=Managed Containers]} service. MIG devices are created through the {linkto(../../../../kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-gpu-operator)[text=GPU Operator addon]}, after which they can be assigned to individual pods. For more information about configuring the addon, see the {linkto(../../how-to-guides/gpu-operator#gpu-operator)[text=%text]} guide.

### {heading(Limitations)[id=gpu-concepts-mig-limitations]}

- Supported only on certain GPU models. For each supported model, there is a fixed set of {linkto(#gpu-concepts-mig-profiles)[text=MIG profiles]} from which you can create a configuration with its own set of MIG devices.
- You can change the MIG configuration only when none of the MIG devices are in use. To do this, delete the pods that use them in the {linkto(../../../../kubernetes/k8s/concepts/about#k8s-about)[text=Managed Containers]} cluster. After the configuration is changed, recreate the pods according to the new configuration.

## {heading(MIG profiles)[id=gpu-concepts-mig-profiles]}

The resources available to a MIG profile are specified in its name in the `Xg.Ygb` format:

- `Xg` defines the available share of compute resources — _slices_. Here, `X` is their number.
- `Ygb` indicates the available video memory (VRAM). Here, `Y` is the memory size in gigabytes.

Some MIG profiles have the `+me` (media extensions) suffix with extended quotas for using media processing technologies: NVDEC, hardware acceleration for JPEG processing, OFA (Optical Flow Accelerator).

## {heading(H200 profiles)[id=gpu-concepts-mig-h200]}

- `1g.18gb` — Jupyter environments for developers, inference of small neural networks (up to 10–14 billion parameters in INT8), computer vision tasks (object recognition), audio processing.
- `1g.18gb+me` — H200 profile with an additional quota for media processing using OFA. Similar quotas are available in the `7g.141gb` configuration.
- `1g.35gb` — more complex models of up to 30 billion parameters in INT8 and datasets, or a larger video memory reserve than `1g.18gb`.
- `2g.35gb` — inference of medium-sized LLMs (14–30 billion parameters), decoding streaming video using NVDEC.
- `3g.71gb` / `4g.71gb` — inference of large models (from 70 billion parameters in INT8), full fine-tuning, batch processing of large data arrays.
- `7g.141gb` — maximum resources for a single task: the heaviest models, fine-tuning of models with 100+ billion parameters in INT4.

INT8 and INT4 are model weight quantization formats that save memory:

- INT8 — 1 byte per parameter: a model with 7 billion parameters takes about 7 GB.
- INT4 — 0.5 bytes per parameter: a model with 7 billion parameters takes about 3.5 GB.

Detailed specifications are available in the vendor's [official documentation](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/supported-mig-profiles.html#h200-mig-profiles).

{cut(Available combinations with full H200 utilization)}

{note:info}
In combinations with `1g.18gb`, one such MIG profile can be replaced with `1g.18gb+me`.
{/note}

- `7g.141gb`

- `4g.71gb` + `3g.71gb`
- `4g.71gb` + `2g.35gb` + `1g.18gb`
- `4g.71gb` + `2g.35gb` + `1g.35gb`
- `4g.71gb` + `3 × 1g.18gb`
- `4g.71gb` + `1g.35gb` + `2 × 1g.18gb`
- `4g.71gb` + `2 × 1g.35gb` + `1g.18gb`

- `2 × 3g.71gb` + `1g.18gb`
- `2 × 3g.71gb` + `1g.35gb`
- `3g.71gb` + `2g.35gb` + `2 × 1g.18gb`
- `3g.71gb` + `2g.35gb` + `1g.35gb` + `1g.18gb`
- `3g.71gb` + `2g.35gb` + `2 × 1g.35gb`
- `3g.71gb` + `4 × 1g.18gb`
- `3g.71gb` + `1g.35gb` + `3 × 1g.18gb`
- `3g.71gb` + `2 × 1g.35gb` + `2 × 1g.18gb`
- `3g.71gb` + `3 × 1g.35gb` + `1g.18gb`
- `3g.71gb` + `4 × 1g.35gb`

- `3 × 2g.35gb` + `1g.18gb`
- `3 × 2g.35gb` + `1g.35gb`
- `2 × 2g.35gb` + `3 × 1g.18gb`
- `2 × 2g.35gb` + `1g.35gb` + `2 × 1g.18gb`
- `2 × 2g.35gb` + `2 × 1g.35gb` + `1g.18gb`
- `2 × 2g.35gb` + `3 × 1g.35gb`

- `2g.35gb` + `5 × 1g.18gb`
- `2g.35gb` + `1g.35gb` + `4 × 1g.18gb`
- `2g.35gb` + `2 × 1g.35gb` + `3 × 1g.18gb`
- `2g.35gb` + `3 × 1g.35gb` + `2 × 1g.18gb`
- `2g.35gb` + `4 × 1g.35gb` + `1g.18gb`

- `7 × 1g.18gb`
- `1g.35gb` + `6 × 1g.18gb`
- `2 × 1g.35gb` + `5 × 1g.18gb`
- `3 × 1g.35gb` + `4 × 1g.18gb`
- `4 × 1g.35gb` + `3 × 1g.18gb`

{/cut}
