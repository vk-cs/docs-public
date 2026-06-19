# {heading(Подключение к кластеру с помощью Kubernetes Dashboard)[id=k8s-k8s-dashboard]}

Kubernetes Dashboard — это универсальный веб-интерфейс для кластеров Kubernetes, который доступен во всех кластерах {var(cloud)}. Он позволяет пользователям управлять как самим кластером, так и работающими в нем приложениями. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

{ifdef(public)}
Способ подключения к Kubernetes Dashboard зависит от IP-адреса кластера:

* Если кластеру назначен внешний IP-адрес, то можно подключиться с любого хоста, имеющего доступ в интернет.
* Если кластеру назначен только внутренний IP-адрес, то можно подключиться только с хоста в {var(cloud)} — виртуальной машины, которая находится в той же подсети, что и кластер.

Для подключения к Kubernetes Dashboard на хосте должен быть установлен браузер.

## {heading(Подготовительные шаги)[id=k8s-k8s-dashboard-before-work]}

1. {linkto(../kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключаться к кластеру с помощью `kubectl`.

1. На хосте, с которого планируется подключаться к кластеру, установите `kauthproxy`, если утилита еще не установлена:

   1. Загрузите архив нужной версии со [страницы релизов](https://github.com/int128/kauthproxy/releases):

      * для Linux: `kauthproxy_linux_....zip`;
      * для macOS: `kauthproxy_darwin_....zip`;
      * для Windows: `kauthproxy_windows_....zip`.

   1. Распакуйте архив.

   1. Поместите исполняемый файл в директорию, которая содержится в переменной окружения `PATH`, например:

      * в `/usr/local/bin` для Linux/macOS;
      * в `C:\` для Windows.

## {heading(Подключение к кластеру)[id=k8s-k8s-dashboard-connect-to-cluster]}

{tabs}

{tab(Версия Kubernetes 1.23 и выше)}

1. На хосте в отдельной сессии терминала выполните команду:

   ```console
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   {note:warn}
   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Kubernetes Dashboard пропадет.
   {/note}

1. Введите пароль от личного кабинета {var(cloud)}, если он не вписан в файл конфигурации kubeconfig.

   `kauthproxy` будет периодически повторно запрашивать этот пароль.

   Откроется браузер, и вы будете направлены в веб-интерфейс Kubernetes Dashboard.

{/tab}

{tab(Версия Kubernetes 1.22 и ниже)}

1. Получите секрет:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)} под аккаунтом пользователя, который будет подключаться к кластеру.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Получить Secret для входа в Kubernetes Dashboard**.
   1. Нажмите кнопку **Скопировать**.

      Секрет будет скопирован в буфер обмена.

1. На хосте в отдельной сессии терминала выполните команду:

   ```console
   kauthproxy -n kube-system https://kubernetes-dashboard.svc
   ```

   {note:warn}
   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Kubernetes Dashboard пропадет.
   {/note}

   Откроется браузер, и вы будете направлены на страницу авторизации Kubernetes Dashboard.

1. Выберите опцию **Token** и вставьте скопированный ранее секрет.

1. Нажмите кнопку **Sign In**.

   Откроется веб-интерфейс Kubernetes Dashboard.

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
## {heading(Подключение к кластеру версии Kubernetes 1.27 и выше)[id=k8s-k8s-dashboard-connect-to-cluster]}

1. {linkto(../kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. На Портале самообслуживания нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API** и скопируйте значение **Токен для доступа к API**.
1. На хосте в отдельной сессии терминала выполните одну из команд в зависимости от настроек двухфакторной аутентификации:

   {tabs}

   {tab(Включена двухфакторная аутентификация)}
   ```console
   kubectl-auth_proxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```
   {/tab}

   {tab(Отключена двухфакторная аутентификация)}
   ```console
   kubectl-auth_proxy -n kubernetes-dashboard https://kubernetes-dashboard.svc --token $<ТОКЕН>
   ```
   {/tab}

   {/tabs}

   Здесь `<ТОКЕН>` — значение токена для доступа к API.

1. Введите пароль от учетной записи пользователя Портала самообслуживания, если он не вписан в файл конфигурации `kubeconfig`.

Откроется браузер, и вы будете направлены в веб-интерфейс Kubernetes Dashboard.
{/ifndef}