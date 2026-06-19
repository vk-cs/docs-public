# {heading(Не получается подключиться к Docker)[id=k8s-docker-connect-problem]}

При подключении к реестру Docker возникает ошибка: `x509: certificate signed by unknown authority`.

Проблема возникает, если невозможно проверить подлинность цифрового сертификата, используемого для {linkto(../../connect/docker-registry#k8s-docker-registry)[text=подключения к реестру Docker]}. Например, для подключения по умолчанию используется самоподписанный сертификат, созданный системой.

{note:info}
При {linkto(/ru/kubernetes/k8s/instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=создании кластера]} вы можете добавить адреса доверенных реестров Docker, с которых можно будет загружать и запускать образы контейнеров без проверки подлинности цифрового сертификата.
{/note}

### {heading(Решение)[id=k8s-docker-connect-problem-solution]}

1. Добавьте в конфигурационный файл Docker `daemon.json` параметр `insecure-registries` с адресом эндпоинта реестра Docker.

   Адрес задается в формате `<IP_АДРЕС_РЕЕСТРА_DOCKER>:<ПОРТ_РЕЕСТРА_DOCKER>`.

   Пример заполнения файла `daemon.json`:

   ```json
   {
     ...
     "insecure-registries": [
       "192.0.2.2:5000"
     ],
     ...
   }
   ```
       
1. Перезагрузите Docker Engine.
1. Если проблема сохраняется, [обратитесь в техническую поддержку](/ru/contacts).