## Описание

Kubernetes Dashboard — это универсальный веб-интерфейс для кластеров Kubernetes. Он позволяет пользователям управлять приложениями, работающими в кластере, и устранять их неполадки, а также управлять самим кластером.

## Подключение

<tabs>
<tablist>
<tab>Версия kubectl меньше v1.23</tab>
<tab>Версия kubectl v1.23+</tab>
</tablist>
<tabpanel>

1. Получите Secret для доступа к Kubernetes Dashboard кластера одним из перечисленных способов:

    1. С помощью интерфейса VK Cloud: перейдите к кластеру, в меню выберите пункт "Получить Secret для входа в Kubernetes dashboard".
    1. С помощью kubectl: выполните команду и скопируйте ее вывод.

        ```bash
        kubectl get secret $(kubectl get sa dashboard-sa -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode
        ```

2.  Запустите kubectl proxy:

    ```bash
    kubectl proxy
    ```

3.  Откройте браузер и перейдите по [ссылке](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/).

    Загрузится веб-интерфейс Kubernetes Dashboard.

4.  Вам будет предложено авторизоваться. Выберите опцию «Token».
5.  Вставьте токен, полученный на шаге 1, и нажмите «Sign In».

    Откроется Kubernetes Dashboard с правами суперадмина.

</tabpanel>
<tabpanel>

1. Установите client-keystone-auth по [инструкции](../../k8s-clusters/client-keystone-auth/).
1. Импортируйте [конфигурацию](../connect-k8s/).
1. Откройте командную строку и запустите команду приведенную ниже:

### Linux

```bash
kubectl auth-proxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
```

### Windows

```bash
kauthproxy --kubeconfig $Env:KUBECONFIG -n kube-system https://kubernetes-dashboard.svc
```

</tabpanel>
</tabs>
