# {heading(No access to the port from an external network)[id=vnet-port-unavailability]}

{include(/en/_includes/_translated_by_ai_en.md)}

If the port is accessible from the internal network but inaccessible from the external one, the cause is the security group configuration.

Examples:

- Telnet uses port 23 by default. If no allow rule is configured for this port in the security group, Telnet will not be able to connect to it according to the "everything that is not allowed is denied" principle.
- An FTP server uses not only the control port (21/TCP), but also a range of ports for data transfer (for example, 50000-51000/TCP) specified in the FTP server settings. Security groups must allow access to all of these ports.

### {heading(Solution)[id=vnet-port-unavailability-resolve]}

Make sure that a rule allowing incoming traffic to the port from the source `0.0.0.0/0` is created for the port's security group.