# {heading(Spark task startup error: The node was low on resource: ephemeral-storage)[id=ephemeral_storage_error]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=ephemeral_storage_error_problem]}

When starting a Spark task, the following error appears:

```console
The node was low on resource: ephemeral-storage
```

The error occurs due to a lack of temporary disk space (ephemeral storage) on the cluster nodes. In most cases, this is related to the large size of the dataset being processed or an insufficient number of worker nodes.

## {heading(Solution)[id=ephemeral_storage_error_solving]}

The solution to the problem is described in the instruction {linkto(../large_dataset#large_dataset_solving)[text=Error when processing a dataset larger than 100 GB]}.