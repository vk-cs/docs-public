# {heading(Public DNS оқиғалары)[id=event-log-dns]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Public DNS Cloud Audit жүйесіне жіберетін оқиғалар:

[cols="2,2,2", options="header"]
|===
|Әдіс және эндпоинт
|Сипаттамасы
|Әрекет атауы

3+|**DNS**

|POST<br>`/v2/dns/`
|Берілген параметрлермен жаңа DNS зонасын жасау
|`ACTION_DNS_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}`
|DNS зонасының параметрлерін оның идентификаторы бойынша өзгерту
|`ACTION_DNS_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}`
|DNS зонасын оның идентификаторы бойынша өшіру
|`ACTION_DNS_DELETE`

3+|**A Record**

|POST<br>`/v2/dns/{DnsUuid}/a/`
|DNS зонасы үшін берілген параметрлермен A типті жазбаны жасау
|`ACTION_ARECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|A-жазбаның параметрлерін өзгерту
|`ACTION_ARECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|A типті жазбаны оның идентификаторы бойынша өшіру
|`ACTION_ARECORD_DELETE`

3+|**AAAA Record**

|POST<br>`/v2/dns/{DnsUuid}/aaaa/`
|DNS зонасы үшін берілген параметрлермен AAAA типті жазбаны жасау
|`ACTION_AAAA_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|AAAA-жазбаның параметрлерін өзгерту
|`ACTION_AAAA_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|AAAA-жазбаны оның идентификаторы бойынша өшіру
|`ACTION_AAAA_RECORD_DELETE`

3+|**CNAME Record**

|POST<br>`/v2/dns/{DnsUuid}/cname/`
|DNS зонасы үшін берілген параметрлермен CNAME типті жазбаны жасау
|`ACTION_CNAME_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|CNAME-жазбаның параметрлерін өзгерту
|`ACTION_CNAME_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|CNAME-жазбаны оның идентификаторы бойынша өшіру
|`ACTION_CNAME_RECORD_DELETE`

3+|**NS Record**

|POST<br>`/v2/dns/{DnsUuid}/ns/`
|DNS зонасы үшін берілген параметрлермен NS типті жазбаны жасау
|`ACTION_NS_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|NS-жазбаның параметрлерін өзгерту
|`ACTION_NS_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|NS-жазбаны оның идентификаторы бойынша өшіру
|`ACTION_NS_RECORD_DELETE`

3+|**SRV Record**

|POST<br>`/v2/dns/{DnsUuid}/srv/`
|DNS зонасы үшін SRV типті жазбаны жасау
|`ACTION_SRV_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|SRV-жазбаның параметрлерін өзгерту
|`ACTION_SRV_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|SRV-жазбаны оның идентификаторы бойынша өшіру
|`ACTION_SRV_RECORD_DELETE`

3+|**TXT Record**

|POST<br>`/v2/dns/{DnsUuid}/txt/`
|DNS зонасы үшін берілген параметрлермен TXT типті жазбаны жасау
|`ACTION_TXT_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|TXT-жазбаның параметрлерін өзгерту
|`ACTION_TXT_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|TXT-жазбаны оның идентификаторы бойынша өшіру
|`ACTION_TXT_RECORD_DELETE`

3+|**Namespace**

|POST<br>`/v2/namespaces/`
|Атаулар кеңістігін жасау
|`ACTION_NAMESPACE_CREATE`

|PUT<br>`/v2/namespaces/{NamespaceUuid}`
|Атаулар кеңістігін өзгерту
|`ACTION_NAMESPACE_UPDATE`

|DELETE<br>`/v2/namespaces/{NamespaceUuid}`
|Атаулар кеңістігін идентификатор бойынша өшіру
|`ACTION_NAMESPACE_DELETE`

3+|**Purge DNS**

|POST<br>`/v2/purge_dns/`
|PurgeDns жасау
|`ACTION_PURGE_DNS_CREATE`

|PUT<br>`/v2/purge_dns/{PurgeDnsUuid}`
|PurgeDns өзгерту
|`ACTION_PURGE_DNS_UPDATE`

|DELETE<br>`/v2/purge_dns/{PurgeDnsUuid}`
|PurgeDns өшіру
|`ACTION_PURGE_DNS_DELETE`
|===