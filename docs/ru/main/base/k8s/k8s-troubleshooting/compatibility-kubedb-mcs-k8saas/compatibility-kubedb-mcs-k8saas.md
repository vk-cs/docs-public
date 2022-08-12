## Проблема

Проблема масштабирования k8aas с использованием kubedb и команды:

```
1Resource CREATE failed: WaitConditionTimeout: resources[37].resources.minion_wait_condition: 0 of 1 received
```

#### Симптомы

- ВМ создаётся, но среди нод ее нет.
- Стек в статусе CREATE_FAILED.
- Контроллер менеджер работает "с тормозами".
- Не работают базовые компоненты k8s.

## Решение

#### Временное

Перезапуск мастер-ноды k8s помогает решить проблему кратковременно.

#### Постоянное

Вам нужно обратиться в [техническую поддержку VK Cloud](https://mcs.mail.ru/help/contact-us) для обновления сертификатов.

### Важно

Мы не гарантируем полную совместимость kubedb с k8saas VK Cloud, так как kubedb использует custom resource definition, на которые завязывается kube-apiserver.
