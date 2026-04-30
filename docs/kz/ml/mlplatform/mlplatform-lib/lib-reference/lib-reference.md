{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер келесі операцияларды орындауға мүмкіндік береді:

- JupyterHub, MLflow және MLflow Deploy инстанстарын жасауға қажетті ақпаратты алу.
- JupyterHub, MLflow және MLflow Deploy инстанстарын жасау және оларды басқару.
- MLflow Deploy инстанстарында ML-модельдерді өрістету және олардың жұмысқа қабілеттілігін тексеру.
- ML-модельдердің болжамдарын алу.

## get_flavors

JupyterHub, MLflow, MLflow Deploy инстанстарын жасауға қолжетімді барлық [ВМ конфигурация шаблондарының](/kz/computing/iaas/concepts/vm/flavor) тізімін алу.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Қолжетімді ВМ конфигурация шаблондарының тізімі. Тізімнің әрбір элементі келесі ақпаратты қамтиды:

- шаблон ID-і;
- шаблон атауы;
- жедел жад көлемі;
- CPU ядроларының саны;
- қосымша спецификациялар.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_flavors(**kwargs
           ) -> List[mlplatform_client.serializers.nova.NovaFlavor]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех шаблонов конфигурации
   flavors = mlp.get_flavors()
   print(flavors)
   ```

   Сәтті орындалса, JupyterHub, MLflow, MLflow Deploy инстанстарын жасауға қолжетімді барлық конфигурация шаблондары туралы ақпарат шығарылады. Шығыстың бір бөлігінің мысалы:

   ```txt
    [
    ---------------
    Flavor Info:
    ---------------
    id: 00bbf595-XXXX
    name: STD2-16-32
    ram: 32768
    vcpus: 16
    extra_specs: 
        cpu_sockets: 2
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    ---------------
    Flavor Info:
    ---------------
    id: 04db9642-XXXX
    name: STD2-6-24
    ram: 24576
    vcpus: 6
    extra_specs: 
        cpu_sockets: 1
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    # конец фрагмента
   ```

{/cut}

## get_internal_networks

Жобада қолжетімді барлық [стандартты желілердің](/kz/networks/vnet/concepts/net-types#standartty_zheli) тізімін алу.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Жобаның стандартты желілерінің тізімі. Тізімнің әрбір элементі ID-ді, атауды, [SDN](/kz/networks/vnet/concepts/sdn) және желінің басқа параметрлерін қамтиды.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_internal_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех стандартных сетей
   networks = mlp.get_internal_networks()
   print(networks)
   ```

   Сәтті орындалса, барлық қолжетімді стандартты желілер туралы ақпарат шығарылады. Шығыстың бір бөлігінің мысалы:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 1996dbe9-XXXX
    name: first_net
    admin_state_up: True
    created_at: 2024-05-18 14:57:35+00:00
    updated_at: 2024-06-18 12:58:47+00:00
    sdn: neutron
    external: False, 
    ---------------
    Network Info:
    ---------------
    id: 2a443a80-XXXX
    name: second_net
    admin_state_up: True
    created_at: 2023-12-11 06:59:00+00:00
    updated_at: 2023-12-11 12:32:24+00:00
    sdn: neutron
    external: False, 
    # конец фрагмента
   ```

{/cut}

## get_external_networks

Жобада қолжетімді барлық [сыртқы желілердің](/kz/networks/vnet/concepts/net-types#external_net) тізімін алу.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Жобаның сыртқы желілерінің тізімі. Тізімнің әрбір элементі ID-ді, атауды, [SDN](/kz/networks/vnet/concepts/sdn) және желінің басқа параметрлерін қамтиды.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_external_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех внешних сетей
   ext_networks = mlp.get_external_networks()
   print(ext_networks)
   ```

   Сәтті орындалса, барлық қолжетімді сыртқы желілер туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 298117ae-XXXX
    name: ext-net
    admin_state_up: True
    created_at: 2017-03-27 13:50:05+00:00
    updated_at: 2024-03-29 13:25:58+00:00
    sdn: neutron
    external: True]
   ```

{/cut}

## create_jupyter_hub

JupyterHub инстансын жасау.

{note:info}

Cloud ML Platform аясында JupyterHub инстансы ML-модельдерді әзірлеу және оқыту үшін пайдаланылады.

{/note}

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`instance_name`

(міндетті)
|`str`
|JupyterHub инстансының атауы

|`domain_name`

(міндетті емес)
|`str`
|Инстанстың домендік атауы. Егер көрсетілмесе, автоматты түрде жасалады.

Домендік атауға қойылатын талаптар:

- ең үлкен ұзындығы — 63 таңба;
- тек цифрларды, кіші латын әріптерін және `.`, `-` арнайы таңбаларын қамтуы мүмкін;
- `-` арнайы таңбасымен басталмауы және аяқталмауы тиіс

|`jh_admin_name`

(міндетті)
|`str`
|Инстанс әкімшісінің логині

|`jh_admin_password`

(міндетті)
|`str`
|Инстанс әкімшісінің құпиясөзі.

Құпиясөзге қойылатын талаптар:

- кемінде 8 таңбадан тұруы тиіс;
- тек цифрларды, `!`,`#`,`$`,`%`,`&`,`(`,`)`,`*`,`+`,`,`,`.`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,`^`,`_`,`{`,<code>&#124;</code>,`}`,`~`,`-` арнайы таңбаларын, сондай-ақ бас және кіші латын әріптерін қамтуы мүмкін

|`flavor`

(міндетті)
|`str`
|Инстанс ВМ-ын жасауға арналған конфигурация шаблонының идентификаторы.

Конфигурация шаблондарының тізімін және олардың идентификаторларын [get_flavors](#get_flavors) әдісі арқылы алуға болады

|`volumes`

(міндетті)
|`List[MLPlatformVolumeIn]`
|Инстанс дискілерінің тізімі.

Әрбір диск `MLPlatformVolumeIn` класының объектісімен сипатталады, оның өрістері:

- `size`: диск көлемі, ГБ (түрі `int`).
- `volume_type`: [диск түрі](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types). Рұқсат етілген мәндер — `VolumeType.ceph_ssd` және `VolumeType.high_iops`.
- `availability_zone`: [қолжетімділік аймағы](/kz/start/concepts/architecture#az). Рұқсат етілген мәндер — `AvailabilityZone.GZ1` және `AvailabilityZone.MS1`.

{note:warn}

Тек бір дискісі бар JupyterHub инстанстарына қолдау көрсетіледі.

{/note}

Диск сипаттамасының мысалы:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(міндетті)
|`MLPlatformNetworkIn`
|Инстанс қосылатын желі.

Желі `network_id` өрісі бар `MLPlatformVolumeIn` класының объектісімен сипатталады, бұл өріс желі идентификаторын қамтиды. Жобаның стандартты және сыртқы желілерінің тізімдерін және олардың идентификаторларын [get_internal_networks](#get_internal_networks) және [get_external_networks](#get_external_networks) әдістері арқылы алуға болады.

Желі сипаттамасының мысалы:

```python
MLPlatformNetworkIn(network_id="net-12345")
```

|`s3fs_bucket`

(міндетті емес)
|`str`
|Инстансқа қосылатын бакет атауы.

Егер жоқ бакет атауы көрсетілсе, көрсетілген атаумен жаңа бакет жасалады.

Жаңа бакет атауына қойылатын талаптар:

- тұтастай алғанда S3 сервисі үшін бірегей болуы тиіс (тек жоба шегінде ғана емес);
- 4-тен 63-ке дейін таңбаны қамтуы тиіс;
- тек цифрларды, кіші латын әріптерін және `.`, `-` арнайы таңбаларын қамтуы мүмкін;
- тек кіші латын әріптерімен немесе цифрлармен басталып, солармен аяқталуы тиіс
|===

### Қайтарылатын мән

Жасалған JupyterHub инстансы туралы ақпараты бар `VmDetailInfo` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
create_jupiter_hub(instance_name: str,
                   domain_name: Optional[str] = None,
                   jh_admin_name: str,
                   jh_admin_password: str,
                   flavor: str, 
                   volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
                   networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
                   s3fs_bucket: Optional[str] = None,
                   **kwargs
                  ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс JupyterHub
   jh = mlp.create_jupyter_hub(
       instance_name="jh-test",
       jh_admin_name="admin",
       jh_admin_password="Admin123@",
       flavor=FLAVOR_ID,
       s3fs_bucket=<имя бакета>,  # Опционально
       volumes=[MLPlatformVolumeIn(
           size=50,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       )
    )
    print(jh)

   ```

   Сәтті орындалса, жасалып жатқан JupyterHub инстансы туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-XXXX
    name: jh-test
    status: CREATING
    flavor_id: 00bbf595-XXXX
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   `create_jupyter_hub` әдісі шақырылғаннан кейін инстанс жасау процесінде болады, сондықтан кейбір параметрлер анықталмайды, мысалы: домендік атау және IP мекенжайы.

{/cut}

## attach_s3_bucket_to_jh

Бакетті JupyterHub инстансына қосу.

{note:info}

Бір инстансқа тек бір бакетті ғана қосуға болады.

{/note}

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`jh_id`

(міндетті)
|`str`
|JupyterHub инстансының идентификаторы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың идентификаторларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`s3fs_bucket`

(міндетті)
|`str`
|Инстансқа қосылатын бакет атауы.

Егер жоқ бакет атауы көрсетілсе, көрсетілген атаумен жаңа бакет жасалады.

Жаңа бакет атауына қойылатын талаптар:

- тұтастай алғанда S3 сервисі үшін бірегей болуы тиіс (тек жоба шегінде ғана емес);
- 4-тен 63-ке дейін таңбаны қамтуы тиіс;
- тек цифрларды, кіші латын әріптерін және `.`, `-` арнайы таңбаларын қамтуы мүмкін;
- тек кіші латын әріптерімен немесе цифрлармен басталып, солармен аяқталуы тиіс
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
attach_s3_bucket_to_jh(
                       jh_id: str,
                       s3fs_bucket: str,
                       **kwargs
                      ) -> None
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Подключить бакет 
   mlp.attach_s3_bucket_to_jh(jh_id=<ID инстанса JupyterHub>,
                              s3fs_bucket="jh-bucket-1234")
   ```

   Қосылған бакет көрсетілген идентификаторы бар JupyterHub инстансында `/shared/s3fs` бумасы ретінде қолжетімді болады.

{/cut}

## create_mlflow

Бар JupyterHub инстансына қосылған MLflow инстансын жасау.

{note:info}

Cloud ML Platform аясында MLflow инстансы ML-модельдерді және олардың параметрлерін сақтау үшін пайдаланылады.

{/note}

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`instance_name`

(міндетті)
|`str`
|MLflow инстансының атауы

|`jh_id`

(міндетті)
|`str`
|MLflow инстансы қосылатын бар JupyterHub инстансының идентификаторы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың идентификаторларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`domain_name`

(міндетті емес)
|`str`
|Инстанстың домендік атауы. Егер көрсетілмесе, автоматты түрде жасалады.

Домендік атауға қойылатын талаптар:

- ең үлкен ұзындығы — 63 таңба;
- тек цифрларды, кіші латын әріптерін және `.`, `-` арнайы таңбаларын қамтуы мүмкін;
- `-` арнайы таңбасымен басталмауы және аяқталмауы тиіс

|`flavor`

(міндетті)
|`str`
|Инстанс ВМ-ын жасауға арналған конфигурация шаблонының идентификаторы.

Конфигурация шаблондарының тізімін және олардың идентификаторларын [get_flavors](#get_flavors) әдісі арқылы алуға болады

|`volumes`

(міндетті)
|`List[MLPlatformVolumeIn]`
|Инстанс дискілерінің тізімі.

Әрбір диск `MLPlatformVolumeIn` класының объектісімен сипатталады, оның өрістері:

- `size`: диск көлемі, ГБ (түрі `int`).
- `volume_type`: [диск түрі](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types). Рұқсат етілген мәндер — `VolumeType.ceph_ssd` және `VolumeType.high_iops`.
- `availability_zone`: [қолжетімділік аймағы](/kz/start/concepts/architecture#az). Рұқсат етілген мәндер — `AvailabilityZone.GZ1` және `AvailabilityZone.MS1`.

{note:warn}

Тек бір дискісі бар MLflow инстанстарына қолдау көрсетіледі.

{/note}

Диск сипаттамасының мысалы:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(міндетті)
|`MLPlatformNetworkIn`
|Инстанс қосылатын желі. Ол MLflow инстансы қосылатын JupyterHub инстансының желісімен сәйкес келуі тиіс.

Желі `network_id` өрісі бар `MLPlatformVolumeIn` класының объектісімен сипатталады, бұл өріс желі идентификаторын қамтиды. Жобаның стандартты және сыртқы желілерінің тізімдерін және олардың идентификаторларын [get_internal_networks](#get_internal_networks) және [get_external_networks](#get_external_networks) әдістері арқылы алуға болады.

Желі сипаттамасының мысалы:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(міндетті)
|`bool`
|MLflow инстансын демо режимінде жасау:

- `True` — инстанс демо режимінде жасалады. Инстанс ВМ-ында жергілікті SQLite дерекқоры жасалады.
- `False` — инстанс PRO режимінде жасалады. [Cloud Databases](/kz/dbs/dbaas) сервисінде MLflow инстансында қолжетімді PostgreSQL дерекқоры жасалады.

Әдепкі мәні: `True`.

{note:warn}

ML-модельдерді және олардың нәтижелерін сақтау үшін демо режимін функционалмен танысу мақсатында ғана пайдалану ұсынылады

{/note}
|===

### Қайтарылатын мән

Жасалған MLflow инстансы туралы ақпараты бар `VmDetailInfo` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
create_mlflow(instance_name: str,
              jh_id: str,
              domain_name: Optional[str] = None,              
              flavor: str,
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
              is_mlflow_demo_mode: bool = True,
              **kwargs
             ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс MLflow
   mlflow = mlp.create_mlflow(
       instance_name="mlflow-test",
       jh_id="6178700a-ХХХХ", # Инстанс JupyterHub уже должен быть создан
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow)
   ```

   Сәтті орындалса, жасалып жатқан MLflow инстансы туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
    ---------------
    MLflow Detail Info:
    ---------------
    id: f8258286-ХХХХ
    name: mlflow-test
    status: CREATING
    flavor_id: 1b624937-ХХХХ
    created_dt: 2024-08-02T11:02:27.752687Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: MLFLOW
    mlflow_jh_instance_id: 6178700a-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: jh_default_admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   `create_mlflow` әдісі шақырылғаннан кейін инстанс жасау процесінде болады, сондықтан кейбір параметрлер анықталмайды, мысалы: домендік атау және IP мекенжайы.

{/cut}

## create_deploy

Бар MLflow немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) инстансына қосылған MLflow Deploy инстансын жасау.

{note:info}

Cloud ML Platform аясында MLflow Deploy инстансы онда ML-модельдерді өрістету үшін пайдаланылады.

{/note}

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`instance_name`

(міндетті)
|`str`
|MLflow Deploy инстансының атауы

|`mlflow_id`

(міндетті)
|`str`
|MLflow Deploy инстансы қосылатын бар MLflow немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) инстансының идентификаторы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың идентификаторларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`username`

(міндетті)
|`str`
|JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің логині

|`password`

(міндетті)
|`str`
|JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің құпиясөзі

|`domain_name`

(міндетті емес)
|`str`
|Инстанстың домендік атауы. Егер көрсетілмесе, автоматты түрде жасалады.

Домендік атауға қойылатын талаптар:

- ең үлкен ұзындығы — 63 таңба;
- тек цифрларды, кіші латын әріптерін және `.`, `-` арнайы таңбаларын қамтуы мүмкін;
- `-` арнайы таңбасымен басталмауы және аяқталмауы тиіс

|`flavor`

(міндетті)
|`str`
|Инстанс ВМ-ын жасауға арналған конфигурация шаблонының идентификаторы.

Конфигурация шаблондарының тізімін және олардың идентификаторларын [get_flavors](#get_flavors) әдісі арқылы алуға болады

|`volumes`

(міндетті)
|`List[MLPlatformVolumeIn]`
|Инстанс дискілерінің тізімі.

Әрбір диск `MLPlatformVolumeIn` класының объектісімен сипатталады, оның өрістері:

- `size`: диск көлемі, ГБ (түрі `int`).
- `volume_type`: [диск түрі](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types). Рұқсат етілген мәндер — `VolumeType.ceph_ssd` және `VolumeType.high_iops`.
- `availability_zone`: [қолжетімділік аймағы](/kz/start/concepts/architecture#az). Рұқсат етілген мәндер — `AvailabilityZone.GZ1` және `AvailabilityZone.MS1`.

{note:warn}

Тек бір дискісі бар MLflow Deploy инстанстарына қолдау көрсетіледі.

{/note}

Диск сипаттамасының мысалы:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(міндетті)
|`MLPlatformNetworkIn`
|Инстанс қосылатын желі. Ол MLflow Deploy инстансы қосылатын JupyterHub немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) инстансының желісімен сәйкес келуі тиіс.

Желі `network_id` өрісі бар `MLPlatformVolumeIn` класының объектісімен сипатталады, бұл өріс желі идентификаторын қамтиды. Жобаның стандартты және сыртқы желілерінің тізімдерін және олардың идентификаторларын [get_internal_networks](#get_internal_networks) және [get_external_networks](#get_external_networks) әдістері арқылы алуға болады.

Желі сипаттамасының мысалы:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(міндетті)
|`bool`
|MLflow Deploy инстансын демо режимінде жасау:

- `True` — инстанс демо режимінде жасалады.
- `False` — инстанс PRO режимінде жасалады.

Әдепкі мәні: `True`.

{note:warn}

MLflow Deploy инстансының жұмыс режимі ол қосылатын MLflow немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) инстансының жұмыс режимімен сәйкес келуі тиіс.

{/note}
|===

### Қайтарылатын мән

Жасалған MLflow Deploy инстансы туралы ақпараты бар `VmDetailInfo` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
create_deploy(instance_name: str,
              mlflow_id: str, 
              username: str, 
              password: str, 
              domain_name: Optional[str] = None, 
              flavor: str, 
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn], 
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn, 
              is_mlflow_demo_mode: bool = True, 
              **kwargs
              ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс MLflow Deploy
   mlflow_deploy = mlp.create_deploy(
       instance_name="mlflow-deploy-test",
       mlflow_id="f8258286-ХХХХ", # Инстанс MLflow уже должен быть создан
       username="admin",
       password="Admin123@",
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow_deploy)
   ```

   Сәтті орындалса, жасалып жатқан MLflow Deploy инстансы туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
    ---------------
    MLflow Deploy Detail Info:
    ---------------
    id: b27fdd89-XXXX
    name: mlflow-deploy-test
    status: CREATING
    flavor_id: 1b624937-XXXX
    created_dt: 2024-08-05T08:48:45.698165Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: DEPLOY
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: f8258286-XXXX
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]

   ```

   `create_deploy` әдісі шақырылғаннан кейін инстанс жасау процесінде болады, сондықтан кейбір параметрлер анықталмайды, мысалы: домендік атау және IP мекенжайы.

{/cut}

## get_all_instances_info

Cloud ML Platform-тың барлық инстанстарының тізімін алу: JupyterHub, MLflow және MLflow Deploy.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Жобада бар барлық JupyterHub, MLflow және MLflow Deploy инстанстары туралы ақпараты бар `VmDetailInfo` класы объектілерінің тізімі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_all_instances_info(**kwargs
                      ) -> List[mlplatform_client.serializers.gateway.VmDetailInfo]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

   Сәтті орындалса, жобада бар Cloud ML Platform-тың барлық инстанстары туралы ақпарат шығарылады. Шығыстың бір бөлігінің мысалы:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    # конец фрагмента
    ```

{/cut}

## get_instance_info

Cloud ML Platform (JupyterHub, MLflow, MLflow Deploy) инстансы туралы ақпаратты оның идентификаторы бойынша алу.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`instance_id`

(міндетті)
|`str`
|Cloud ML Platform инстансының идентификаторы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың идентификаторларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

Көрсетілген идентификаторы бар Cloud ML Platform инстансы туралы ақпараты бар `VmDetailInfo` класының объектісі.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_instance_info(instance_id: str,
                  **kwargs
                 ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   
   # Получить и вывести на экран информацию о втором инстансе в списке
   INSTANCE_ID = instances[1].id
   instance_info = mlp.get_instance_info(instance_id=INSTANCE_ID)
   print(instance_info)
   ```

   Сәтті орындалса, көрсетілген идентификаторы бар инстанс туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    ```

{/cut}

## delete_instance

Cloud ML Platform инстансын жою (JupyterHub, MLflow немесе MLflow Deploy).

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`instance_id`

(міндетті)
|`str`
|Cloud ML Platform инстансының идентификаторы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың идентификаторларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
delete_instance(instance_id: str,
                **kwargs
               ) -> None
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Әкімші` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   print(instances)
   
   # Удалить первый инстанс в списке
   INSTANCE_ID = instances[0].id
   mlp.delete_instance(instance_id=INSTANCE_ID)
   
   # Получить и вывести на экран список инстансов еще раз для проверки
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

   Cloud ML Platform инстанстарының тізімі екі рет шығарылады:

   - жоюға дейінгі инстанстар тізімі;
   - жойғаннан кейінгі инстанстар тізімі.

   Сәтті орындалса, екінші тізімде жойылған инстанс болмайды.

{/cut}

## create_deployment

Қашықтағы ML-модельді өрістетуді жасау.

{note:info}

Өрістету ішінде оралған ML-моделі бар Docker контейнері ретінде жасалады және MLflow Deploy инстансында іске қосылады. Контейнерге қолжеткізу REST API арқылы қамтамасыз етіледі.

{/note}

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`deploy_server_name`

(міндетті)
|`str`
|Қашықтағы ML-модель өрістетілетін MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`deployment_name`

(міндетті)
|`str`
|Қашықтағы ML-модель өрістетуінің атауы

|`model_uri`

(міндетті)
|`str`
|MLflow инстансының артефакттар қоймасындағы ML-модельдің URI-і

|`username`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің логині

|`password`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің құпиясөзі

|`model_username`

(міндетті)
|`str`
|Қашықтағы ML-модель әдістеріне, яғни [predict_model](#predict_model) және [ping_model](#ping_model) әдістеріне қол жеткізуге арналған пайдаланушы логині

|`model_password`

(міндетті)
|`str`
|Қашықтағы ML-модель әдістеріне қол жеткізуге арналған пайдаланушы құпиясөзі

|`port_out`

(міндетті)
|`int`
|Қашықтағы ML-модель қолжетімді болатын MLflow Deploy инстансының порты.

Егер `None` мәні көрсетілсе, 62000–65000 диапазонындағы бірінші бос порт таңдалады
|===

### Қайтарылатын мән

Жасалған ML-модель өрістетуі туралы ақпараты бар `DeployOut` класының объектісі: оның атауы, мәртебесі және басқа параметрлері.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
create_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  model_uri: str, 
                  username: str, 
                  password: str, 
                  model_username: str, 
                  model_password: str, 
                  port_out: int = None, 
                  **kwargs
                 ) -> mlplatform_client.serializers.deployment.DeployOut
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындап, рұқсат токені бойынша кітапханада авторизациядан өтіңіз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [JupyterHub](../../jupyterhub/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. [MLflow](../../mlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. ML-модельді жасап, оны оқытыңыз, егер бұл әлі жасалмаса.
1. [MLflow Deploy](../../deploymlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   # Создать развертывание ML-модели
   deployment = mlp.create_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name="test_deployment_1", 
       model_uri="mlflow-artifacts:/2/bc303eb8eXXXX/artifacts/model", 
       username="admin", 
       password="Admin123@", 
       model_username="user123", 
       model_password="Password123!",
       port_out = None
   )
   print(deployment)

   ```

   Сәтті орындалса, жасалған ML-модель өрістетуі туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
   2024-08-08 04:57:50,907 [ WARNING ]  Time-consuming operation was started, need to wait 2-3 mins or above

   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

   Өрістетуді жасауға дайындық туралы — [MLflow Client көмегімен инстансты басқару](../../deploymlflow/how-to-guides/manage-mlflow-client) бөлімінде.

{/cut}

## list_deployments

MLflow Deploy инстансында қолжетімді барлық ML-модель өрістетулерінің тізімін алу.

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`deploy_server_name`

(міндетті)
|`str`
|MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`username`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің логині

|`password`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің құпиясөзі
|===

### Қайтарылатын мән

Көрсетілген инстанста қолжетімді ML-модель өрістетулері туралы ақпараты бар `DeployOut` класы объектілерінің тізімі: олардың атаулары, мәртебелері және басқа параметрлері.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
list_deployments(deploy_server_name: str,
                 username: str,
                 password: str, 
                 **kwargs
                ) -> List[mlplatform_client.serializers.deployment.DeployOut]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test", # Инстанс MLflow Deploy должен существовать
       username="admin", 
       password="Admin123@"
   )
   print(deployments)

   ```

   Сәтті орындалса, инстанста қолжетімді ML-модель өрістетулері туралы ақпараты бар тізім шығарылады. Шығыс мысалы:

   ```txt
   [
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations, 
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment
   status: running
   port: 62000
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: 
   predict_ref: ]
   ```

{/cut}

## get_deployment

ML-модель өрістетуі туралы ақпаратты оның атауы бойынша алу.

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`deploy_server_name`

(міндетті)
|`str`
|MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`deployment_name`

(міндетті)
|`str`
|Қашықтағы ML-модель өрістетуінің атауы.

Барлық өрістетулердің тізімін және олардың атауларын [list_deployments](#list_deployments) әдісі арқылы алуға болады

|`username`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің логині

|`password`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің құпиясөзі
|===

### Қайтарылатын мән

Көрсетілген ML-модель өрістетуі туралы ақпараты бар `DeployOut` класының объектісі: оның атауы, мәртебесі және басқа параметрлері.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_deployment(deploy_server_name: str,
               deployment_name: str, 
               username: str, 
               password: str, 
               **kwargs
              ) -> mlplatform_client.serializers.deployment.DeployOut
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Инстанс MLflow Deploy должен существовать и на нем должно быть доступно хотя бы одно развертывание

   # Получить список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )

   # Получить и вывести на экран информацию о первом развертывании в списке
   DEPLOYMENT_NAME = deployments[0].name
   deployment_info = mlp.get_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@"
   )
   print(deployment_info)

   ```

   Сәтті орындалса, көрсетілген MLflow Deploy инстансындағы тізімдегі бірінші ML-модель өрістетуі туралы ақпарат шығарылады. Шығыс мысалы:

   ```txt
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

{/cut}

## delete_deployment

ML-модель өрістетуін жою.

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`deploy_server_name`

(міндетті)
|`str`
|MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`deployment_name`

(міндетті)
|`str`
|ML-модель өрістетуінің атауы.

Барлық өрістетулердің тізімін және олардың атауларын [list_deployments](#list_deployments) әдісі арқылы алуға болады

|`username`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің логині

|`password`

(міндетті)
|`str`
|MLflow Deploy инстансы байланыстырылған JupyterHub инстансы немесе [MLflow Standalone](../../concepts/mlflow-modes#standalone) әкімшісінің құпиясөзі
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
delete_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  username: str, 
                  password: str, 
                  **kwargs
                 ) -> None
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Инстанс MLflow Deploy должен существовать и на нем должно быть доступно хотя бы одно развертывание
   
   # Получить и вывести на экран список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@" 
   )
   print(deployments)

   # Удалить первое развертывание в списке
   DEPLOYMENT_NAME = deployments[0].name
   mlp.delete_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@" 
   )
   
   # Повторно получить и вывести на экран список развертываний
   deployments_after_deletion = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )
   print(deployments_after_deletion)

   ```

   ML-модель өрістетулерінің тізімі екі рет шығарылады:

   - жоюға дейінгі өрістетулер тізімі;
   - жойғаннан кейінгі өрістетулер тізімі.

   Сәтті орындалса, екінші тізімде жойылған өрістету болмайды.

{/cut}

## ping_model

Қашықтағы ML-модельдің жұмысқа дайындығын тексеру.

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`deploy_server_name`

(міндетті)
|`str`
|ML-модель өрістетілген MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`deployment_name`

(міндетті)
|`str`
|Қашықтағы ML-модель өрістетуінің атауы.

Барлық өрістетулердің тізімін және олардың атауларын [list_deployments](#list_deployments) әдісі арқылы алуға болады

|`model_username`

(міндетті)
|`str`
|[create_deployment](#create_deployment) әдісін шақырғанда көрсетілген қашықтағы ML-модель әдістеріне қол жеткізуге арналған пайдаланушы логині

|`model_password`

(міндетті)
|`str`
|[create_deployment](#create_deployment) әдісін шақырғанда көрсетілген қашықтағы ML-модель әдістеріне қол жеткізуге арналған пайдаланушы құпиясөзі
|===

### Қайтарылатын мән

Егер модель жұмысқа дайын болса, жаңа жолдың `\n` символы.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
ping_model(deploy_server_name: str,
           deployment_name: str, 
           model_username: str, 
           model_password: str, 
           **kwargs
          ) -> str
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындап, рұқсат токені бойынша кітапханада авторизациядан өтіңіз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [JupyterHub](../../jupyterhub/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. [MLflow](../../mlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. ML-модельді жасап, оны оқытыңыз, егер бұл әлі жасалмаса.
1. [MLflow Deploy](../../deploymlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. [create_deployment](#create_deployment) әдісі арқылы MLflow Deploy инстансында ML-модельді өрістетіңіз.
1. Python скриптін орындаңыз:

   ```python
   # Проверить готовность ML-модели к работе
   result = mlp.ping_model(deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment_1", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   Сәтті орындалса, бос жол шығарылады.

   ML-модельді пайдалануға дайындық туралы — [MLflow Client көмегімен инстансты басқару](../../deploymlflow/how-to-guides/manage-mlflow-client) бөлімінде.

{/cut}

## predict_model

Берілген кіріс деректері үшін ML-модельдің болжамын алу.

Токеннің қажетті рөлі: `Пайдаланушы` немесе `Әкімші`. [Токен рөлдері туралы толығырақ](../lib-authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттамасы

|`data`

(міндетті)
|`Dict`
|ML-модельге арналған кіріс деректері

|`deploy_server_name`

(міндетті)
|`str`
|ML-модель өрістетілген MLflow Deploy инстансының атауы.

Cloud ML Platform-тың барлық инстанстарының тізімін және олардың атауларын [get_all_instances_info](#get_all_instances_info) әдісі арқылы алуға болады

|`deployment_name`

(міндетті)
|`str`
|Қашықтағы ML-модель өрістетуінің атауы.

Барлық өрістетулердің тізімін және олардың атауларын [list_deployments](#list_deployments) әдісі арқылы алуға болады

|`model_username`

(міндетті)
|`str`
|[create_deployment](#create_deployment) әдісін шақырғанда көрсетілген қашықтағы ML-модель әдістеріне қол жеткізуге арналған пайдаланушы логині

|`model_password`

(міндетті)
|`str`
|[create_deployment](#create_deployment) әдісін шақырғанда көрсетілген қашықтағы ML-модель әдістеріне қол жеткізуге арналған пайдаланушы құпиясөзі
|===

### Қайтарылатын мән

Берілген кіріс деректері үшін `Dict[str, Any]` форматындағы ML-модель болжамы.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
predict_model(data: Dict,
              deploy_server_name: str, 
              deployment_name: str, 
              model_username: str, 
              model_password: str, 
              **kwargs
             ) -> Dict[str, Any]
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін рұқсат токенінің мәні Python скриптінің мысалында көрсетілген.

production-ортада жұмыс істегенде токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../lib-authz).

{/note}

1. [Кітапхананы орнатыңыз](../lib-install), егер бұл әлі жасалмаса.
1. [Рұқсат токенін жасаңыз](../lib-authz), оған `Пайдаланушы` рөлін беріп, егер бұл әлі жасалмаса.
1. Python скриптін орындап, рұқсат токені бойынша кітапханада авторизациядан өтіңіз:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [JupyterHub](../../jupyterhub/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. [MLflow](../../mlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. ML-модельді жасап, оны оқытыңыз, егер бұл әлі жасалмаса.
1. [MLflow Deploy](../../deploymlflow/instructions/create) инстансын жасаңыз, егер бұл әлі жасалмаса.
1. [create_deployment](#create_deployment) әдісі арқылы MLflow Deploy инстансында ML-модельді өрістетіңіз.
1. Python скриптін орындаңыз:

   ```python
   # Определить входные данные для ML-модели
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],
                     [0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]
                    ]}

   # Получить и вывести на экран предсказание ML-модели
   result = mlp.predict_model(data=data,
       deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   Сәтті орындалса, ML-модельдің болжамы шығарылады. Шығыс мысалы:

   ```txt
   {'predictions': [262.3591008044226, 215.47878674779508]}
   ```

   ML-модельді пайдалануға дайындық туралы — [MLflow Client көмегімен инстансты басқару](../../deploymlflow/how-to-guides/manage-mlflow-client) бөлімінде.

{/cut}
