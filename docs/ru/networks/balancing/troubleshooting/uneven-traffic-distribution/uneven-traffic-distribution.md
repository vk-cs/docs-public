# {heading(Неравномерное распределение трафика)[id=vnet-uneven-traffic-distribution]}

Неравномерное распределение трафика может быть связано с алгоритмом балансировки.

### {heading(Решение)[id=vnet-uneven-traffic-distribution-resolve]}

Если выбран алгоритм `SOURCE_IP`, запросы от одного клиента всегда идут на один сервер. Для равномерного распределения используйте алгоритм `ROUND_ROBIN` или `LEAST_CONNECTIONS`.
