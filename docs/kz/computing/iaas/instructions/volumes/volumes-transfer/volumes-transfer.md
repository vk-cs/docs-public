# {heading(Дискіні жобалар арасында жылжыту)[id=iaas-volumes-transfer]}

{include(/kz/_includes/_translated_by_ai.md)}

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобаға [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Дискіні жылжыту қажет жобада авторизациядан өтіңіз.
1. Жылжыту қажет дискіні [ВМ-ден ажыратыңыз](../../../instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk).
1. Дискілер тізімін қараңыз:

   ```console
   openstack volume list --long
   ```

1. Диск ВМ-ден ажыратылғанына көз жеткізіңіз (`Status`: `available`).
1. Дискінің ID-сін көшіріп алыңыз.
1. Дискіні жылжытуға сұрау жасаңыз:

   ```console
   openstack volume transfer request create <ID_ДИСКА>
   ```

1. `auth_key` авторизация кілтін және `id` сұрау идентификаторын көшіріп алыңыз.
1. Дискілер тізімін қарап, жылжытылатын дискінің күйі `awaiting-transfer` болып өзгергеніне көз жеткізіңіз:

   ```console
   openstack volume list
   ```

1. Дискіні жылжыту қажет жобаға авторизациядан өтіңіз.
1. `auth_key` авторизация кілтін және `id` идентификаторын көрсетіп, дискіні жылжытуға сұрауды қабылдаңыз:

   ```console
   openstack volume transfer request accept --auth-key <КЛЮЧ_АВТОРИЗАЦИИ> <ID_ЗАПРОСА>
   ```

1. Дискінің жобада пайда болғанына көз жеткізіңіз:

   ```console
   openstack volume show <ID_ДИСКА>
   ```

**Дискіні көшіру сұрауларымен жұмыс істеуге арналған қосымша командалар**

- Көшіру сұрауларының тізімін қарау:

  ```console
  openstack volume transfer request list
  ```

- Көшіру сұрауын жою:

  ```console
  openstack volume transfer request delete <ID_ЗАПРОСА>
  ```

{/tab}

{/tabs}
