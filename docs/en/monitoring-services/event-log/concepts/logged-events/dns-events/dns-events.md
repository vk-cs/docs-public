Events that Public DNS sends to Cloud Audit:

[cols="2,2,2", options="header"]
|===
|Method and endpoint
|Description
|Action

3+|**DNS**

|POST<br>`/v2/dns/`
|Creating a new DNS zone with the specified parameters
|`ACTION_DNS_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}`
|Changing DNS zone parameters by its ID
|`ACTION_DNS_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}`
|Deleting a DNS zone by its ID
|`ACTION_DNS_DELETE`

3+|**A Record**

|POST<br>`/v2/dns/{DnsUuid}/a/`
|Creating an A-record with specified parameters for a DNS zone
|`ACTION_ARECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|Changing A-record parameters
|`ACTION_ARECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|Deleting an A-record by its ID
|`ACTION_ARECORD_DELETE`

3+|**AAAA Record**

|POST<br>`/v2/dns/{DnsUuid}/aaaa/`
|Creating an AAAA-record for a DNS zone using the specified parameters
|`ACTION_AAAA_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|Changing AAAA-record parameters
|`ACTION_AAAA_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|Deleting an AAAA-record by its ID
|`ACTION_AAAA_RECORD_DELETE`

3+|**CNAME Record**

|POST<br>`/v2/dns/{DnsUuid}/cname/`
|Creating a CNAME-record for a DNS zone using specified parameters
|`ACTION_CNAME_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|Changing CNAME-record parameters
|`ACTION_CNAME_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|Deleting a CNAME-record by its ID
|`ACTION_CNAME_RECORD_DELETE`

3+|**NS Record**

|POST<br>`/v2/dns/{DnsUuid}/ns/`
|Creating an NS-record for a DNS zone using specified parameters
|`ACTION_NS_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|Changing NS-record parameters
|`ACTION_NS_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|Deleting an NS-record by its ID
|`ACTION_NS_RECORD_DELETE`

3+|**SRV Record**

|POST<br>`/v2/dns/{DnsUuid}/srv/`
|Creating an SRV-record for a DNS zone
|`ACTION_SRV_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|Changing SRV-record parameters
|`ACTION_SRV_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|Removing an SRV-record by its ID
|`ACTION_SRV_RECORD_UPDATE`

3+|**TXT Record**

|POST<br>`/v2/dns/{DnsUuid}/txt/`
|Creating a TXT-record for a DNS zone using specified parameters
|`ACTION_TXT_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|Changing TXT-record parameters
|`ACTION_TXT_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|Deleting a TXT-record by its ID
|`ACTION_TXT_RECORD_DELETE`

3+|**Namespace**

|POST<br>`/v2/namespaces/`
|Creating a namespace
|`ACTION_NAMESPACE_CREATE`

|PUT<br>`/v2/namespaces/{NamespaceUuid}`
|Changing a namespace parameters
|`ACTION_NAMESPACE_UPDATE`

|DELETE<br>`/v2/namespaces/{NamespaceUuid}`
|Deleting a namespace by its ID
|`ACTION_NAMESPACE_DELETE`

3+|**PTR Record**

|POST<br>`/v2/reverse_dns/{ReverseDnsUuid}/ptr/`
|Creating a PTR-record for a DNS zone using specified parameters
|`ACTION_PTR_RECORD_CREATE`

|PUT<br>`/v2/reverse_dns/{ReverseDnsUuid}/ptr/{PTRRecordUuid}`
|Changing PTR-record parameters
|`ACTION_PTR_RECORD_UPDATE`

|DELETE<br>`/v2/reverse_dns/{ReverseDnsUuid}/ptr/{PTRRecordUuid}`
|Deleting a PTR-record by its ID
|`ACTION_PTR_RECORD_DELETE`

3+|**Purge DNS**

|POST<br>`/v2/purge_dns/`
|Creating a PurgeDns
|`ACTION_PURGE_DNS_CREATE`

|PUT<br>`/v2/purge_dns/{PurgeDnsUuid}`
|Changing a PurgeDns
|`ACTION_PURGE_DNS_UPDATE`

|DELETE<br>`/v2/purge_dns/{PurgeDnsUuid}`
|Deleting a PurgeDns
|`ACTION_PURGE_DNS_DELETE`

3+|**Reverse DNS**

|POST<br>`/v2/reverse_dns/`
|Creating a ReverseDns
|`ACTION_REVERSE_DNS_CREATE`

|PUT<br>`/v2/reverse_dns/{ReverseDnsUuid}`
|Changing a ReverseDns
|`ACTION_REVERSE_DNS_UPDATE`

|DELETE<br>`/v2/reverse_dns/{ReverseDnsUuid}`
|Deleting a ReverseDns
|`ACTION_REVERSE_DNS_DELETE`
|===
