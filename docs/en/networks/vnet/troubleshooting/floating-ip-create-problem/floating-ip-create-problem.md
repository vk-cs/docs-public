# {heading(Cannot add a Floating IP address)[id=vnet-floating-ip-create-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

An error occurs when adding a Floating IP address.

Possible causes:

- the project {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#nets)[text=quota]} for the number of external IP addresses is exhausted;
- the {linkto(../../concepts/net-types#external_net)[text=external network]} from which addresses are allocated has no free addresses.

### {heading(Solution)[id=vnet-floating-ip-create-problem-resolve]}

1. Check the project quotas for the number of addresses.

   If the quota is exhausted, request its increase from [technical support](mailto:support@mcs.mail.ru).

1. If the quota is not exhausted and the error persists, check whether an address is allocated from the external network pool:

   ```console
   openstack floating ip create <EXTERNAL_NETWORK_NAME_OR_ID>
   ```

   If no address is allocated, the command will terminate with an error. Contact [technical support](mailto:support@mcs.mail.ru) and provide the external network name and the error text.