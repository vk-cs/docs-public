{cut(Как увеличить размер дисков на узлах кластера в личном кабинете?)}

Изменить размер диска для уже созданного worker-узла невозможно.

Чтобы увеличить доступное дисковое пространство:

1. [Создайте новую группу worker-узлов](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#add_group) с нужным размером диска.
1. Перенесите нагрузку на новую группу узлов. Подробнее в [официальной документации](https://kubernetes.io/docs/home/) Kubernetes.
1. Проверьте работоспособность сервисов.
1. [Удалите старую группу worker-узлов](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#udalit_gruppu_uzlov).

{/cut}

{cut(Может ли балансировщик сервиса Kubernetes получать IP-адреса клиентов?)}

Да, может. 

Используйте аддон [ingress-nginx](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-ingress). При установке аддона эта настройка по умолчанию включена.

Если вы используете компонент Ingress NGINX без установки аддона ingress-nginx, в конфигурации (ConfigMap) Ingress примените аннотацию `use-proxy-protocol`:

```console
annotations:
     nginx.ingress.kubernetes.io/use-proxy-protocol: "true"
```

Аннотация `use-proxy-protocol` включает прокси-протокол. Это позволит получать IP-адреса клиентов, передаваемые через прокси-серверы и балансировщики нагрузки.

{/cut}

{cut(Можно ли отключить автоматическую подстановку ограничений для подов через Limit Range?)}

Limit Range — это политика, которая применяется при создании пода. Отключить ее нельзя, но вы можете [установить](/ru/kubernetes/k8s/concepts/addons-and-settings/settings#nastroyki_limitov_dlya_podov) собственные значения `requests` и `limits` в конфигурационных файлах контейнеров, входящих в под.
{/cut}

{cut(Есть ли возможность добавлять узлы с ОС Windows в управляемый кластер?)}

Добавление узлов на базе OC Windows не поддерживается.
{/cut}