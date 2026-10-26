# {heading(Failed to create a CNAME record for the root domain)[id=dns-cannot-create-cname]}

{include(/en/_includes/_translated_by_ai_en.md)}

When attempting to create a CNAME record for the root domain (second-level domain), an error occurs. According to DNS standards (RFC), a CNAME record cannot be created for the root domain (APEX, for example, `example.com`), only for subdomains (`www.example.com`).

### {heading(Solution)[id=dns-cannot-create-cname-decision]}

For the root domain, use an ALIAS (or ANAME) record if your DNS provider supports it. DNS from {var(cloud)} supports creating ALIAS records for such scenarios.