{var(cloud)} supports three balancing methods:

- `LEAST_CONNECTIONS` — the backend with the fewest established connections is used.
- `ROUND_ROBIN` — all backends are iterated through sequentially.
- `SOURCE_IP` — a backend is selected randomly and assigned to the session for a specific client IP address.

{includetag(concepts)}
The balancing method is selected when {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules)[text=adding a balancing rule]} in the management console.
{/includetag}
{includetag(faq)}
The balancing method is selected when {linkto(../../../networks/balancing/instructions/manage-rules#balancing-manage-rules)[text=adding a balancing rule]} in the management console.
{/includetag}
