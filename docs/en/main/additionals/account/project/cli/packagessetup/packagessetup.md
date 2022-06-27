The following individual clients have been deprecated in favor of the generic openstack-client. Instead of installing and learning all of these clients, it is recommended that you install and use the OpenStack client.

In some cases, it is necessary to install a separate project client because the functionality of the OpenStack client may not be sufficient. To install a single client package, replace the `PROJECT` name in this `pip install` command with the following list:

```
# pip install python-PROJECTclient
```

- cinder - block storage API and extensions
- glance - API images
- heat - orchestration API
- manila - Shared file systems file storage API
- neutron - networking API
- nova - Cloud Computing (VM) API and Extensions
- sahara - big data processing API
- trove - database API
