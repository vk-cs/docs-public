# {heading(Public DNS оқиғалары)[id=event-log-dns]}

{include(/kz/_includes/_translated_by_ai.md)}

Public DNS Cloud Audit-ке жіберетін оқиғалар:

[cols="2,2,2", options="header"]
|===
|Әдіс және эндпоинт
|Сипаттама
|Әрекет атауы

3+|**DNS**

|POST<br>`/v2/dns/`
|Берілген параметрлермен жаңа DNS аймағын жасау
|`ACTION_DNS_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}`
|DNS аймағының параметрлерін оның идентификаторы бойынша өзгерту
|`ACTION_DNS_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}`
|DNS аймағын оның идентификаторы бойынша жою
|`ACTION_DNS_DELETE`

3+|**A Record**

|POST<br>`/v2/dns/{DnsUuid}/a/`
|DNS аймағы үшін берілген параметрлермен A түріндегі жазбаны жасау
|`ACTION_ARECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|A жазбасының параметрлерін өзгерту
|`ACTION_ARECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/a/{ARecordUuid}`
|A түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_ARECORD_DELETE`

3+|**AAAA Record**

|POST<br>`/v2/dns/{DnsUuid}/aaaa/`
|DNS аймағы үшін берілген параметрлермен AAAA түріндегі жазбаны жасау
|`ACTION_AAAA_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|AAAA жазбасының параметрлерін өзгерту
|`ACTION_AAAA_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/aaaa/{AaaaRecordUuid}`
|AAAA түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_AAAA_RECORD_DELETE`

3+|**CNAME Record**

|POST<br>`/v2/dns/{DnsUuid}/cname/`
|DNS аймағы үшін берілген параметрлермен CNAME түріндегі жазбаны жасау
|`ACTION_CNAME_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|CNAME жазбасының параметрлерін өзгерту
|`ACTION_CNAME_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/cname/{CnameRecordUuid}`
|CNAME түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_CNAME_RECORD_DELETE`

3+|**NS Record**

|POST<br>`/v2/dns/{DnsUuid}/ns/`
|DNS аймағы үшін берілген параметрлермен NS түріндегі жазбаны жасау
|`ACTION_NS_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|NS жазбасының параметрлерін өзгерту
|`ACTION_NS_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/ns/{NsRecordUuid}`
|NS түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_NS_RECORD_DELETE`

3+|**SRV Record**

|POST<br>`/v2/dns/{DnsUuid}/srv/`
|DNS аймағы үшін SRV түріндегі жазбаны жасау
|`ACTION_SRV_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|SRV жазбасының параметрлерін өзгерту
|`ACTION_SRV_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/srv/{SrvRecordUuid}`
|SRV түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_SRV_RECORD_UPDATE`

3+|**TXT Record**

|POST<br>`/v2/dns/{DnsUuid}/txt/`
|DNS аймағы үшін берілген параметрлермен TXT түріндегі жазбаны жасау
|`ACTION_TXT_RECORD_CREATE`

|PUT<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|TXT жазбасының параметрлерін өзгерту
|`ACTION_TXT_RECORD_UPDATE`

|DELETE<br>`/v2/dns/{DnsUuid}/txt/{TxtRecordUuid}`
|TXT түріндегі жазбаны оның идентификаторы бойынша жою
|`ACTION_TXT_RECORD_DELETE`

3+|**Namespace**

|POST<br>`/v2/namespaces/`
|Атау кеңістігін жасау
|`ACTION_NAMESPACE_CREATE`

|PUT<br>`/v2/namespaces/{NamespaceUuid}`
|Атау кеңістігін өзгерту
|`ACTION_NAMESPACE_UPDATE`

|DELETE<br>`/v2/namespaces/{NamespaceUuid}`
|Атау кеңістігін идентификаторы бойынша жою
|`ACTION_NAMESPACE_DELETE`

3+|**Purge DNS**

|POST<br>`/v2/purge_dns/`
|PurgeDns жасау
|`ACTION_PURGE_DNS_CREATE`

|PUT<br>`/v2/purge_dns/{PurgeDnsUuid}`
|PurgeDns өзгерту
|`ACTION_PURGE_DNS_UPDATE`

|DELETE<br>`/v2/purge_dns/{PurgeDnsUuid}`
|PurgeDns жою
|`ACTION_PURGE_DNS_DELETE`
|===
