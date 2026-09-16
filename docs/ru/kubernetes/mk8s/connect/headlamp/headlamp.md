# {heading(Подключение к кластеру с помощью Headlamp)[id=mk8s-headlamp]}

[Headlamp](https://headlamp.dev/) — это графический интерфейс (GUI) для управления кластерами Kubernetes в сервисе Managed Containers. Headlamp является более современным и гибким аналогом Lens, который позволяет просматривать и редактировать ресурсы кластера в браузере или локальном приложении без ручных команд `kubectl`.

Вы можете установить Headlamp двумя способами:

- Напрямую в кластер (режим [In-cluster](https://headlamp.dev/docs/latest/installation/in-cluster/)). В этом режиме Headlamp устанавливается в кластер Kubernetes в виде одного пода. Внутри этого пода Headlamp работает как прокси к Kubernetes API: браузер обращается к Headlamp, который обращается к API-серверу Kubernetes. В этом режиме вы можете настроить централизованный доступ к кластеру для группы пользователей без необходимости устанавливать приложение на устройство каждого из них.

- Локально на свой компьютер в качестве приложения (режим [Desktop](https://headlamp.dev/docs/latest/installation/desktop/)). В этом режиме при запуске Headlamp также фоново запускается локальный сервер Headlamp и веб-интерфейс в виде окна приложения. Этот режим отличается большей производительностью и лучше всего подходит для индивидуальной работы с кластером.

Подробнее в [официальной документации Headlamp](https://headlamp.dev/docs/latest/).

## {heading(Подготовительные шаги)[id=mk8s-headlamp-in-cluster-prep]}

{tabs}
{tab(Установка в кластер)}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=Создайте]} кластер, если это еще не сделано.
1. {linkto(../kubectl#mk8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключаться к кластеру с помощью `kubectl`.
1. На хосте, с которого планируется подключаться к кластеру, установите `kauthproxy`, если утилита еще не установлена:

    1. Загрузите архив нужной версии со [страницы релизов](https://github.com/int128/kauthproxy/releases):

        * для Linux: `kauthproxy_linux_....zip`;
        * для macOS: `kauthproxy_darwin_....zip`;
        * для Windows: `kauthproxy_windows_....zip`.

    1. Распакуйте архив.

    1. Поместите исполняемый файл в директорию, которая содержится в переменной окружения `PATH`, например:

        * для Linux и macOS: в `/usr/local/bin` ;
        * для Windows: в `C:\`.

1. На хосте, с которого планируется подключаться к кластеру, {linkto(../../install-tools/helm#mk8s-helm)[text=установите клиент Helm]}, если это еще не сделано.

{/tab}

{tab(Локальная установка)}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=Создайте]} кластер, если это еще не сделано.
1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Убедитесь]}, что активирован доступ по API.
1. Установите плагин `client-keystone-auth` для подключения к кластеру с использованием {linkto(../../concepts/access-management#mk8s-access-management)[text=Single Sign-On (SSO)]}:

   {include(/ru/_includes/_client-keystone-auth.md)}

{/tab}
{/tabs}

## {heading(Установка Headlamp)[id=mk8s-headlamp-install]}

{tabs}
{tab(Установка в кластер)}

1. Добавьте репозиторий Headlamp:

   ```console
   helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/
   helm repo update
   ```

1. Создайте пространство имен `headlamp` и установите в него Headlamp:

   ```console
   helm install my-headlamp headlamp/headlamp --namespace headlamp --create-namespace
   ```

1. Убедитесь, что под, на котором установился Headlamp, запущен:

   ```console
   kubectl get pods -n headlamp
   ```

   В выводе команды статус пода должен быть `Running`.

Другие способы установки Headlamp в кластер доступны в [официальной документации](https://headlamp.dev/docs/latest/installation/in-cluster/).

{/tab}

{tab(Локальная установка)}

Установите Headlamp на свое устройство одним из способов, описанных в [официальной документации](https://headlamp.dev/docs/latest/installation/desktop/).

{/tab}
{/tabs}

## {heading(Подключение к кластеру)[id=mk8s-headlamp-in-cluster-connect]}

{tabs}
{tab(Установка в кластер)}

1. На хосте в отдельной сессии терминала выполните команду:

   ```console
   kauthproxy -n headlamp http://my-headlamp.svc
   ```

   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Headlamp пропадет.

1. Введите пароль от личного кабинета {var(cloud)}, если он не вписан в файл конфигурации `kubeconfig`. `kauthproxy` будет периодически повторно запрашивать этот пароль.

После подключения откроется веб-интерфейс Headlamp.

{/tab}

{tab(Локальная установка)}

{include(/ru/_includes/_kubeconfig.md)[tags=headlamp]}

1. Укажите пароль для доступа к кластеру одним из способов:

   {tabs}

   {tab(kubeconfig)}

   Этот способ позволяет указать пароль для подключения к конкретному кластеру.

   Укажите пароль в файле конфигурации кластера:

    1. Откройте файл `config.yaml`.
    1. Снимите комментарий со строк, удалив `#`:

       ```yaml
       # - name: "OS_PASSWORD"
       #  value: "put your password here"
       ```
    1. Укажите тот пароль, который используете для авторизации в личном кабинете {var(cloud)}.

   {/tab}

   {tab(Временная переменная окружения)}

   Этот способ позволяет указать пароль в сессии терминала. Пароль может использоваться для подключения к нескольким кластерам, но только на время работы сессии.

   Откройте сессию терминала и укажите пароль в консоли:

   {tabs}

   {tab(Windows)}

      ```console
      $env:OS_PASSWORD = "<ПАРОЛЬ>"
      ```

   Здесь `<ПАРОЛЬ>` — ваш пароль для авторизации в личном кабинете {var(cloud)}.

   {/tab}

   {tab(Linux)}

      ```console
      export OS_PASSWORD=<ПАРОЛЬ>
      ```

   Здесь `<ПАРОЛЬ>` — ваш пароль для авторизации в личном кабинете {var(cloud)}.

   {/tab}

   {/tabs}

   {/tab}

   {tab(Постоянная переменная окружения)}

   Этот способ позволяет указать пароль в постоянных переменных пользователя. Пароль может использоваться для подключения к нескольким кластерам, независимо от сессии терминала.

   {tabs}

   {tab(Windows)}

    1. На хосте, с которого планируется подключение к кластеру, откройте **Пуск** → **Параметры**.
    1. Выберите в строке поиска **Изменение переменных среды текущего пользователя**.
    1. В окне **Переменные среды пользователя** добавьте новую переменную:

        * **Имя**: `OS_PASSWORD`;
        * **Значение**: ваш пароль для авторизации в личном кабинете {var(cloud)}.

   {/tab}

   {tab(Linux)}

    1. Откройте файл `~/.bashrc`.
    1. Добавьте в файл строку:

       ```console
       export OS_PASSWORD=<ПАРОЛЬ> 
       ```

       Здесь `<ПАРОЛЬ>` — ваш пароль для авторизации в личном кабинете {var(cloud)}.

    1. Сохраните изменения.

   {/tab}

   {tab(macOS)}

    1. Откройте файл `.bashrc` или `.zshrc`.
    1. Добавьте в файл строку:

       ```console
       export OS_PASSWORD=<ПАРОЛЬ> 
       ```

       Здесь `<ПАРОЛЬ>` — ваш пароль для авторизации в личном кабинете {var(cloud)}.
   
    1. Сохраните изменения.

   {/tab}

   {/tabs}

   {/tab}

   {/tabs}

1. Запустите приложение Headlamp. В нем автоматически откроется страница кластера, файл конфигурации которого вы скачали ранее. Если вы указали больше одного кластера, выберите нужный вручную.

{/tab}
{/tabs}
