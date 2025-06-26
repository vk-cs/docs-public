## Как увеличить размер дисков на узлах кластера в личном кабинете? 

<!--- заменить на кат, когда вопросов станет больше, чем один --->

Изменить размер диска для уже созданного worker-узла невозможно. 

Чтобы увеличить доступное дисковое пространство:

1. [Создайте новую группу worker-узлов](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#dobavit_gruppu_worker_uzlov) с нужным размером диска.
1. Перенесите нагрузку на новую группу узлов. Подробнее в [официальной документации](https://kubernetes.io/docs/home/) Kubernetes.
1. Проверьте работоспособность сервисов.
1. [Удалите старую группу worker-узлов](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#udalit_gruppu_uzlov).