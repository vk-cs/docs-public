Под (pod) является минимальной вычислительной единицей, которую можно запустить в кластере Kubernetes.

Под обеспечивает работу одного или нескольких контейнеров приложений:

- Обычно под состоит из одного контейнера, являясь оберткой над ним. Это наиболее распространенный сценарий использования подов в кластере Kubernetes.
- Более редкий случай: под может состоять из нескольких контейнеров. Эти контейнеры могут взаимодействовать друг с другом и разделяют между собой ресурсы, назначенные поду (например, хранилище).

  {note:info}

  - Не рекомендуется использовать поды из нескольких контейнеров без явной необходимости.
  - Для стабильной работы кластера рекомендуется [ограничивать потребление вычислительных ресурсов](../resource-limiting) контейнером пода.
  
  {/note}

С точки зрения Kubernetes, один под — один экземпляр приложения. Если нужно иметь несколько экземпляров приложения для обеспечения отказоустойчивости, воспользуйтесь [контроллерами рабочей нагрузки](https://kubernetes.io/docs/concepts/workloads/controllers/) (workload controllers), которые позволяют реплицировать поды и контролировать их жизненный цикл. Пример такого контроллера — [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).
