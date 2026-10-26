# {heading(SIEM connections)[id=event-log-siem-connections]}

{include(/en/_includes/_translated_by_ai_en.md)}

An SIEM connection is a channel for transmitting security event information from the Cloud Audit service to an external SIEM system, containing {linkto(../logged-events#event-log-logged-events)[text=logged events]} from {var(cloud)} cloud services.

In Cloud Audit, you can add several SIEM connections from one or more SIEM systems. However, only one of these connections can be active at any given time.

Each connection specifies:

- a data reception point on the SIEM system side: IP address and port;
- a data transfer protocol: TCP, UDP, or TCP over TLS;
- a format for transmitted messages: Syslog ([RFC5424](https://datatracker.ietf.org/doc/html/rfc5424)) or CEF (Common Event Format);
- (optionally) a filter for the events to be transmitted.

Before activating a connection, Cloud Audit checks the availability of the SIEM system using the specified parameters. For the check and subsequent data transfer to succeed, the SIEM system side must allow inbound traffic from the following IP addresses:

- `89.208.217.12/30`,
- `89.208.217.40/30`,
- `89.208.219.248/30`,
- `89.208.219.252/30`,
- `90.156.148.16/28`.

For more information on configuring SIEM connections, see the section {linkto(../../instructions/siem-integration#event-log-siem-connection)[text=%text]}.