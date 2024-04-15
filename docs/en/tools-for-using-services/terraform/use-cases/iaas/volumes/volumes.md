<warn>

Make sure you [installed and configured Terraform](../../../quick-start).

</warn>

## Create a disk volume

To create a disk volume, create a `volume.tf` file that describes the configuration of the volume to be created. Add the text from the example below and correct the settings for your volume. This example describes how to create a 1 GB disk volume of type `ceph-ssd` in the `GZ1` availability zone.

To create a disk volume, you need the `vkcs_blockstorage_volume` resource that provides a block storage volume. You can create, modify, and delete block storage volumes.

```hcl
resource "vkcs_blockstorage_volume" "volume" {
  name = "volume"
  description = "test volume"
  metadata = {
    foo = "bar"
  }
  size = 1
  availability_zone = "GZ1"
  volume_type = "ceph-ssd"
}
```

Here:

- `name`: the volume name.
- `description`: the volume description.
- `metadata`: the key value map for the volume metadata.
- `size`: (required) the volume size in gigabytes.
- `availability_zone`: (required) the name of the availability zone of the data centers storing the volume.
- `volume_type`: (required) the volume type.

### Apply changes

Add the text of the example to the `volume.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```

## Create а snapshot

To create a snapshot of the state of a disk volume, create a file `snapshot.tf` that describes the configuration of the snapshot to be created. Add the text from the examples below and adjust the settings for your infrastructure. This example describes how to create a snapshot of a disk volume with the resource ID `vkcs_blockstorage_volume.volume.id`.

To create a snapshot you need the `vkcs_blockstorage_snapshot` resource that a block storage snapshot. You can create, modify, and delete a snapshot of a block storage volume.

```hcl
resource "vkcs_blockstorage_snapshot" "snapshot" {
  volume_id = "${vkcs_blockstorage_volume.volume.id}"
  name = "snapshot"
  description = "test snapshot"
  metadata = {
    foo = "bar"
  }
}
```

Here:

- `volume_id`: (required) the ID of the volume for which the snapshot to be created.
- `name`: the snapshot name.
- `description`: the snapshot description.
- `metadata`: the key value map for the volume metadata.

### Apply changes

Add the text of the example to the `snapshot.tf` file and run the following commands:

```bash
terraform init
```
```bash
terraform apply
```
