{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер жобада қолжетімді Cloud Spark кластерлерін басқаруға мүмкіндік береді.

## get_clusters

Қолжетімді барлық Cloud Spark кластерлерінің тізімін алу.

Токеннің қажетті рөлі: `Әкімші` немесе `Пайдаланушы`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Қолжетімді Cloud Spark кластерлері туралы ақпараты бар `K8sClusterInfo` класы объектілерінің тізімі.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_clusters(**kwargs
            ) -> List[mlplatform_client.serializers.spark_proxy.K8sClusterInfo]

```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` немесе `Пайдаланушы` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<значение токена доступа>'

      mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
      clusters = mlp.get_clusters()

      print(clusters)
   ```

{/cut}

## get_cluster_info

Идентификаторы бойынша Cloud Spark кластері туралы толық ақпарат алу.

Токеннің қажетті рөлі: `Әкімші` немесе `Пайдаланушы`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

Кластер туралы ақпараты бар `K8sClusterInfo` класының объектісі.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
get_cluster_info(cluster_id: str,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` немесе `Пайдаланушы` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster_info = mlp.get_cluster_info(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')

   print(cluster_info)
   ```

   Сәтті болған жағдайда кластер туралы ақпарат шығарылады.

{/cut}

## set_cluster_delete_time

Кластердің әрекетсіздік уақытын орнату, ол өткеннен кейін кластер автоматты түрде жойылады.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады

|`minutes`

(міндетті)
|`int`
|Кластердің әрекетсіздігінің шекті уақыты, минутпен
|===

### Қайтарылатын мән

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `delete_after_inactive_min` өрісінде кластердің берілген шекті әрекетсіздік уақыты болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
set_cluster_delete_time(cluster_id: str,
                        minutes: int,
                        **kwargs
                       ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.set_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=1440)

   print(cluster.delete_after_inactive_min)
   ```
   Сәтті болған жағдайда `1440` саны шығарылады.

{/cut}

## remove_cluster_delete_time

Кластердің шекті әрекетсіздік уақытын жою, ол өткеннен кейін кластер автоматты түрде жойылады.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `delete_after_inactive_min` өрісінде `None` мәні болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
remove_cluster_delete_time(cluster_id: str,
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.remove_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.delete_after_inactive_min)
   ```

   Сәтті болған жағдайда `None` мәні шығарылады.

{/cut}

## set_cluster_suspend_time

Кластердің әрекетсіздік уақытын орнату, ол өткеннен кейін кластер автоматты түрде тоқтатылады.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады

|`minutes`

(міндетті)
|`int`
|Кластердің әрекетсіздігінің шекті уақыты, минутпен
|===

### Қайтарылатын мән

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `suspend_after_inactive_min` өрісінде кластердің берілген шекті әрекетсіздік уақыты болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
set_cluster_suspend_time(cluster_id: str,
                         minutes: int,
                         **kwargs
                        ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```
{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.set_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=120)
   
   print(cluster.suspend_after_inactive_min)
   ```

   Сәтті болған жағдайда `120` саны шығарылады.

{/cut}

## remove_cluster_suspend_time

Кластердің шекті әрекетсіздік уақытын жою, ол өткеннен кейін кластер автоматты түрде тоқтатылады.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `suspend_after_inactive_min` өрісінде `None` мәні болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
remove_cluster_suspend_time(cluster_id: str,
                            **kwargs
                           ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   cluster = mlp.remove_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.suspend_after_inactive_min)
   ```

   Сәтті болған жағдайда `None` мәні шығарылады.

{/cut}

## stop

Кластерге барлық ағымдағы қосылымдарды аяқтау.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

{note:info}

Бұл әдісті орындау кезінде кластер тоқтатылмайды.

{/note}

### Әдіс аргументтері

Аргументтер жоқ.

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
stop() 
```
{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.stop()
   ```

{/cut}

## wake_up_cluster

Кластерді белсендіру.

Токеннің қажетті рөлі: `Әкімші`. [Токен рөлдері туралы толығырақ](../../authz).

{note:warn}

Тек тоқтатылған кластерді ғана белсендіруге болады.

{/note}

### Әдіс аргументтері

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Түрі
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#get_clusters) әдісі арқылы алуға болады
|===

### Қайтарылатын мән

Қайтарылатын мән жоқ.

### Әдіс сигнатурасы және пайдалану мысалы

{cut(Әдіс сигнатурасы)}

```python
wake_up_cluster(cluster_id: str,
                **kwargs
               )
```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. [Токендер туралы толығырақ](../../authz).

{/note}

1. [Кітапхананы орнатыңыз](../../install), егер бұл әлі жасалмаса.
1. [Қол жеткізу токенін жасаңыз](../../authz) `Әкімші` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.wake_up_cluster(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   ```

   Кластерді іске қосу басталады.

{/cut}
