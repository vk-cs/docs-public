## Billing

The VK CS platform provides several types of storage to suit individual needs:

**Hotbox** tariff - suitable for storing hot data. You can store and quickly distribute media and any other frequently downloaded content through it without speed limits.

" **Icebox** " tariff - suitable for storing files of infrequent use: archives, backups, etc. It is designed to store rarely used data that can be quickly accessed when needed.

" **Backup** " tariff is used to store backup files of virtual machines and databases.

For each type, there are prices for data processing and storage:

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(0%); width: 100%;" width="370"><tbody><tr><td height="19" style="text-align: center; background-color: rgb(239, 239, 239); width: 24.4246%;" width="25.405405405405407%">Operation</td><td style="text-align: center; background-color: rgb(239, 239, 239); width: 25.1918%;" width="25.135135135135137%">Hotbox</td><td style="text-align: center; background-color: rgb(239, 239, 239); width: 25.0383%;" width="22.972972972972972%">Icebox</td><td style="text-align: center; background-color: rgb(239, 239, 239); width: 25.0127%;" width="26.486486486486488%">Backup</td></tr><tr><td height="19" style="width: 24.4246%;">Storage</td><td style="width: 25.1918%;">1.75 rubles / GB per month</td><td style="width: 25.0383%;">RUB 1.6 / GB per month</td><td style="width: 25.0127%;">3.75 rubles / GB per month</td></tr><tr><td height="19" style="width: 24.4246%;">Outgoing traffic (download)</td><td style="width: 25.1918%;">RUB 0.8 / GB</td><td style="width: 25.0383%;">RUB 1.6 / GB</td><td style="width: 25.0127%;">is free</td></tr><tr><td height="19" style="width: 24.4246%;">Incoming traffic (loading)</td><td style="width: 25.1918%;">is free</td><td style="width: 25.0383%;">is free</td><td style="width: 25.0127%;">is free</td></tr><tr><td height="19" style="width: 24.4246%;">Type 1 queries (PUT, META, LIST)</td><td style="width: 25.1918%;">RUB 0.295 per 1000 requests</td><td style="width: 25.0383%;">RUB 0.295 per 1000 requests</td><td style="width: 25.0127%;">is free</td></tr><tr><td height="19" style="width: 24.4246%;">Type 2 requests (GET, etc.)</td><td style="width: 25.1918%;">RUB 0.295 for 10,000 requests</td><td style="width: 25.0383%;">RUB 0.59 for 10,000 requests</td><td style="width: 25.0127%;">is free</td></tr><tr><td height="19" style="width: 24.4246%;">DELETE requests</td><td style="width: 25.1918%;">is free</td><td style="width: 25.0383%;">is free</td><td style="width: 25.0127%;">is free</td></tr></tbody></table>

\* All tariffs in the table are indicated with VAT

## Limits

Limits are technical restrictions that apply to the entire VK CS platform.

The Object Storage service is characterized by the following architectural limits:

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(7%); width: 93%;" width="300"><tbody><tr><td height="19" style="text-align: center; background-color: rgb(239, 239, 239); width: 40.654%;" width="47.333333333333336%">Parameter</td><td style="text-align: center; background-color: rgb(239, 239, 239); width: 59.346%;" width="52.666666666666664%">Quantity / volume</td></tr><tr><td class="currently-active" height="19" style="width: 40.654%;">Accounts</td><td align="right" style="text-align: left; width: 59.346%;">25</td></tr><tr><td height="19" style="width: 40.654%;">Buckets</td><td align="right" style="text-align: left; width: 59.346%;">25</td></tr><tr><td height="19" style="width: 40.654%;">Objects in a bucket</td><td style="width: 59.346%;">over 1.000.000.000</td></tr><tr><td height="19" style="width: 40.654%;">file size</td><td style="width: 59.346%;">32 GB for regular file, 320 TB for multipart</td></tr><tr><td height="19" style="width: 40.654%;">Bucket size</td><td style="width: 59.346%;">unlimited</td></tr><tr><td class="xl65" colspan="2" height="19" style="text-align: center; background-color: rgb(239, 239, 239);">Rate Limits</td></tr><tr><td height="19" style="width: 40.654%;">All operations</td><td style="width: 59.346%;">1000 rps</td></tr><tr><td height="19" style="width: 40.654%;">Listing Request</td><td style="width: 59.346%;">250 rps</td></tr></tbody></table>
