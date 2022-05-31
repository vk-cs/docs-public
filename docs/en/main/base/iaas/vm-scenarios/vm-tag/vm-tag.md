Tags can be added to virtual machines — arbitrary combinations of characters that allow indexing instances or filtering by a specific tag.

## VK CS Control Panel

To manage tags [in VK CS personal account](http://mchs.mail.ru/app/services/info/servers/) should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" section.
2. In the context menu of the instance, in the "Tag Assignment" section, select existing tags or create a new one.
3. When creating a new tag, it is possible to choose the color and name of the tag.
4. It is possible to search for instances by tag.

## OpenStack CLI

Tags are managed in the openstack client using nova commands.

Adding a tag:

```bash
nova server-tag-add <instance ID> <tag>
```

Viewing Server tags:

```bash
nova server-tag-list <instance ID>
```

Deleting a tag:

```bash
nova server-tag-delete <instance ID> <tag>
```

Deleting all instance tags:

```bash
nova server-tag-delete-all <instance ID>
```
