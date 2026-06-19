# {heading(Настройки кластера)[id=k8s-settings]}

В кластерах Cloud Containers уже применены определенные настройки, перечисленные ниже.

## {heading(Режим работы kube-proxy)[id=k8s-settings-kube-proxy-mode]}

Сетевой прокси Kubernetes выполняется на каждом узле, обеспечивая доступ к IP-адресам сервисов и других ресурсов Kubernetes.

Этот прокси может работать в [нескольких режимах](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/#options), они перечислены в описании настройки `--proxy-mode`. В кластерах Cloud Containers прокси работает в режиме `iptables`. Этот режим работы влияет:

- {linkto(../../../how-to-guides/load-balancer#k8s-load-balancer)[text=на поведение балансировщиков нагрузки]};
- {linkto(../../../how-to-guides/dns/local-dns-cache#k8s-local-dns-cache)[text=на поведение и настройки локального кеширующего DNS-сервера]}.

## {heading(Настройки лимитов для подов)[id=k8s-settings-requests-and-limits]}

При работе с подами {linkto(../../../reference/resource-limiting#k8s-resource-limiting)[text=рекомендуется указывать]} в их конфигурационных файлах параметры `requests` и `limits` для контейнеров, входящих в этот под.

Если эти параметры не указаны, в кластерах Cloud Containers для соответствующих контейнеров автоматически применяются значения:

- `requests`: 100m CPU и 64 МБ выделяемой памяти.
- `limits`: 500m CPU и 512 МБ выделяемой памяти.

Это позволяет избежать ситуации, когда некорректно работающий контейнер исчерпает все вычислительные ресурсы отдельного worker-узла или даже всего кластера.

## {heading(Преднастроенные шаблоны и ограничения Gatekeeper)[id=k8s-settings-templates-and-limitations]}

В сервисе Cloud Containers в кластерах Kubernetes действуют {linkto(../../security-policies#k8s-security-policies-default)[text=политики безопасности по умолчанию]}, которые обеспечивают базовую защиту кластеров от нескольких распространенных уязвимостей. Удалить или изменить политики по умолчанию нельзя.

Подробнее об политиках и рекомендациях по работе с ними читайте в разделе {linkto(../../security-policies#k8s-security-policies)[text=Политики безопасности]}.