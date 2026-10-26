# {heading(Limited Floating IP address allocation in a specific subnet)[id=vnet-ip-create-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

Public IP addresses are allocated from the platform's shared pools. The problem occurs when a specific subnet has run out of free addresses.

### {heading(Solution)[id=vnet-ip-create-problem-resolve]}

Try creating a Floating IP address in another {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} or contact [technical support](/en/contacts) to expand the quota or address pool.