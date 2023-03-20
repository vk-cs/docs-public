<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщика [тарифицируется](/ru/main/networks/vnet/tariffs).

</warn>

## Установка аддона

При [установке](../../manage-addons#ustanovka-addona) аддона с настройками по умолчанию создается балансировщик нагрузки с плавающим IP-адресом, и Ingress-контроллер будет доступен из интернета.

Чтобы Ingress-контроллер не был доступен из интернета, укажите аннотацию, согласно которой будет создан внутренний балансировщик нагрузки. Для этого измените код настройки аддона при установке Ingress NGINX:

```yaml
...
service:
  annotations: {"loadbalancer.openstack.org/proxy-protocol": "true", "service.beta.kubernetes.io/openstack-internal-load-balancer": "true"}
...
```

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).

## Получение IP-адреса балансировщика

<info>

Если при добавлении аддона были выбраны имя сервиса, отличное от `ingress-nginx`, или пространство имен, отличное от `ingress-nginx`, скорректируйте приведенные ниже шаги.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Подключитесь к кластеру](../../../../connect/k8s-dashboard) с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `ingress-nginx`.
1. Перейдите в раздел меню **Service → Services**.
1. Найдите в списке сервисов `ingress-nginx-controller` типа `LoadBalancer`.

   В столбце **External Endpoints** будет отображен плавающий IP-адрес, назначенный балансировщику.

</tabpanel>
<tabpanel>

1. [Убедитесь](../../../../connect/kubectl#proverka-podklyucheniya-k-klasteru), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Выполните команду:

   ```bash
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   В столбце `EXTERNAL-IP` будет отображен плавающий IP-адрес, назначенный балансировщику.

</tabpanel>
</tabs>
