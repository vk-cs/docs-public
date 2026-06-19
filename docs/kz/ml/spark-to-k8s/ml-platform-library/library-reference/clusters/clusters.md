# {heading(Cloud Spark кластерлерімен жұмыс істеу)[id=mlspark-library-reference-clusters]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл әдістер жобада қолжетімді Cloud Spark кластерлерін басқаруға мүмкіндік береді.

## {heading(get_clusters)[id=mlspark-library-reference-clusters-get_clusters]}

Қолжетімді барлық Cloud Spark кластерлерінің тізімін алу.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-get_clusters-arguments]}

Аргументтер жоқ.

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-get_clusters-result]}

Қолжетімді Cloud Spark кластерлері туралы ақпараты бар `K8sClusterInfo` класы объектілерінің тізімі.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-get_clusters-sinature]}

{cut(Әдіс сигнатурасы)}

```python
get_clusters(**kwargs
            ) -> List[mlplatform_client.serializers.spark_proxy.K8sClusterInfo]

```

{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
      from mlplatform_client import MLPlatform

      REFRESH_TOKEN = '<значение токена доступа>'

      mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
      clusters = mlp.get_clusters()

      print(clusters)
   ```

{/cut}

## {heading(get_cluster_info)[id=mlspark-library-reference-clusters-get_cluster_info]}

Идентификаторы бойынша Cloud Spark кластері туралы толық ақпарат алу.

Токеннің қажетті рөлі: `Администратор` немесе `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-get_cluster_info-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-get_cluster_info-result]}

Кластер туралы ақпараты бар `K8sClusterInfo` класының объектісі.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-get_cluster_info-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` немесе `Пользователь` рөлімен, егер бұл әлі жасалмаса.
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

## {heading(set_cluster_delete_time)[id=mlspark-library-reference-clusters-set_cluster_delete_time]}

Кластердің әрекетсіздік уақытын орнату, ол өткеннен кейін кластер автоматты түрде жойылады.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-set_cluster_delete_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады

|`minutes`

(міндетті)
|`int`
|Кластердің әрекетсіздігінің шекті уақыты, минутпен
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-set_cluster_delete_time-result]}

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `delete_after_inactive_min` өрісінде кластердің берілген шекті әрекетсіздік уақыты болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-set_cluster_delete_time-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
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

## {heading(remove_cluster_delete_time)[id=mlspark-library-reference-clusters-remove_cluster_delete_time]}

Кластердің шекті әрекетсіздік уақытын жою, ол өткеннен кейін кластер автоматты түрде жойылады.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-result]}

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `delete_after_inactive_min` өрісінде `None` мәні болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
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

## {heading(set_cluster_suspend_time)[id=mlspark-library-reference-clusters-set_cluster_suspend_time]}

Кластердің әрекетсіздік уақытын орнату, ол өткеннен кейін кластер автоматты түрде тоқтатылады.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады

|`minutes`

(міндетті)
|`int`
|Кластердің әрекетсіздігінің шекті уақыты, минутпен
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-result]}

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `suspend_after_inactive_min` өрісінде кластердің берілген шекті әрекетсіздік уақыты болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
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

## {heading(remove_cluster_suspend_time)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time]}

Кластердің шекті әрекетсіздік уақытын жою, ол өткеннен кейін кластер автоматты түрде тоқтатылады.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-result]}

`K8sClusterInfo` класының объектісі. Сәтті болған жағдайда объектінің `suspend_after_inactive_min` өрісінде `None` мәні болады.

{include(/kz/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
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

## {heading(stop)[id=mlspark-library-reference-clusters-stop]}

Кластерге барлық ағымдағы қосылымдарды аяқтау.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

{note:info}

Бұл әдісті орындау кезінде кластер тоқтатылмайды.

{/note}

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-stop-arguments]}

Аргументтер жоқ.

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-stop-result]}

Қайтарылатын мән жоқ.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-stop-signature]}

{cut(Әдіс сигнатурасы)}

```python
stop() 
```
{/cut}

{cut(Әдісті пайдалану мысалы)}

{note:err}

Қарапайымдылық үшін қол жеткізу токенінің мәні Python скриптінің мысалында көрсетілген.

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
1. Python скриптін орындаңыз:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.stop()
   ```

{/cut}

## {heading(wake_up_cluster)[id=mlspark-library-reference-clusters-wake_up_cluster]}

Кластерді белсендіру.

Токеннің қажетті рөлі: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Токен рөлдері туралы толығырақ]}.

{note:warn}

Тек тоқтатылған кластерді ғана белсендіруге болады.

{/note}

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-wake_up_cluster-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Сипаттама

|`cluster_id`

(міндетті)
|`str`
|Cloud Spark кластерінің идентификаторы.

Cloud Spark кластерлерінің тізімін және олардың идентификаторларын [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters) әдісі арқылы алуға болады
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-wake_up_cluster-result]}

Қайтарылатын мән жоқ.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-wake_up_cluster-signature]}

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

Production-ортада токендерді ашық түрде пайдаланбаңыз. Сезімтал деректермен жұмыс істеу үшін орта айнымалыларын, құпиялар қоймаларын немесе басқа құралдарды пайдаланыңыз. {linkto(../../authz#mlspark-library-authz)[text=Токендер туралы толығырақ]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Кітапхананы орнатыңыз]}, егер бұл әлі жасалмаса.
1. {linkto(../../authz#mlspark-library-authz)[text=Қол жеткізу токенін жасаңыз]} `Администратор` рөлімен, егер бұл әлі жасалмаса.
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
