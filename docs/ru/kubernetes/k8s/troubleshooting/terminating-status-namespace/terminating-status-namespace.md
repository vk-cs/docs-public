Пространство имен не удаляется и остается в статусе `terminating`.

Это может быть связано с тем, что процесс удаления завис или возникли проблемы при очистке ресурсов.

### Решение

1. [Подключитесь к кластеру](../../connect/kubectl) с помощью `kubectl`.

1. Получите JSON-файл с описанием пространства имен.
   
   Пример команды для получения файла `test.json`:
   
   ```console
   kubectl get ns <НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЕН> -o json > test.json
   ```

1. Удалите содержимое блока `spec` в JSON-файле.
   
   Блок `spec` должен выглядеть так:
   
   ```json
   "spec": { 
   }
   ```
1. Запустите прокси-сервер:
   
   ```console
   kubectl proxy
   ```

1. Удалите пространство имен API-запросом или командой `kubectl replace`.
   
   Примеры удаления с помощью файла `test.json`:

   {tabs}
   {tab(API-запрос)}
   ```console
   curl -k -H "Content-Type: application/json" -X PUT --data-binary @test.json 127.0.0.1:8001/api/v1/namespaces/<НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЕН>/finalize
   ```
   {/tab}
   {tab(Команда kubectl replace)}
   Способ подходит, если вы используете общедоступный Kubernetes API.

   ```console
   kubectl replace --raw "/api/v1/namespaces//finalize" -f test.json
   ```
   {/tab}
   {/tabs}