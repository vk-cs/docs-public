Kubernetes Dashboard — это универсальный веб-интерфейс для кластеров Kubernetes. Он позволяет пользователям управлять как самим кластером, так и работающими в нем приложениями. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

## Подготовительные шаги

1. [Убедитесь](../kubectl#proverka-podklyucheniya-k-klasteru), что вы можете подключаться к кластеру с помощью `kubectl`.

1. Установите `kauthproxy`, если утилита еще не установлена:

   1. Загрузите архив нужной версии со [страницы релизов](https://github.com/int128/kauthproxy/releases):

      - для Linux: `kauthproxy_linux_....zip`;
      - для macOS: `kauthproxy_darwin_....zip`;
      - для Windows: `kauthproxy_windows_....zip`.

   1. Распакуйте архив.

   1. Поместите исполняемый файл в директорию, которая содержится в переменной окружения `PATH`, например:

      - в `/usr/local/bin` для Linux/macOS;
      - в `C:\` для Windows.

## Подключение к кластеру

<tabs>
<tablist>
<tab>Версия Kubernetes 1.22 и ниже</tab>
<tab>Версия Kubernetes 1.23 и выше<tab>
</tablist>
<tabpanel>

1. Получите секрет:

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud под аккаунтом пользователя, который будет подключаться к кластеру.
   1. Выберите проект и регион, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Раскройте меню нужного кластера и выберите пункт **Получить Secret для входа в Kubernetes Dashboard**.
   1. Нажмите кнопку **Скопировать**.

      Секрет будет скопирован в буфер обмена.

1. В отдельной сессии терминала выполните команду:

   - Для Kubernetes 1.22:

     ```bash
     kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
     ```

   - Для Kubernetes 1.21 и ниже:

     ```bash
     kauthproxy -n kube-system https://kubernetes-dashboard.svc
     ```

   <warn>

   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Kubernetes Dashboard пропадет.

   </warn>

   Откроется браузер, и вы будете направлены на страницу авторизации Kubernetes Dashboard.

1. Выберите опцию **Token** и вставьте скопированный ранее секрет.

1. Нажмите кнопку **Sign In**.

   Откроется веб-интерфейс Kubernetes Dashboard.

</tabpanel>
<tabpanel>

1. В отдельной сессии терминала выполните команду:

   ```bash
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   <warn>

   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Kubernetes Dashboard пропадет.

   </warn>

1. Введите пароль от личного кабинета VK Cloud, если он не вписан в файл конфигурации kubeconfig.

   `kauthproxy` будет периодически повторно запрашивать этот пароль.

   Откроется браузер, и вы будете направлены в веб-интерфейс Kubernetes Dashboard.

</tabpanel>
</tabs>
