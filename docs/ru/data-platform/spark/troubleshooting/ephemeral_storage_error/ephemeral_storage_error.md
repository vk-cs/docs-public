# {heading(Ошибка при запуске Spark-задачи: The node was low on resource: ephemeral-storage)[id=ephemeral_storage_error]}

## {heading(Проблема)[id=ephemeral_storage_error_problem]}

При запуске Spark-задачи появляется ошибка:

```console
The node was low on resource: ephemeral-storage
```

Ошибка возникает из-за нехватки временного дискового пространства (ephemeral storage) на узлах кластера. Чаще всего это связано с большим размером обрабатываемого датасета или недостаточным количеством worker-узлов.

## {heading(Решение)[id=ephemeral_storage_error_solving]}

Решение проблемы описано в инструкции {linkto(../large_dataset#large_dataset_solving)[text=Ошибка при обработке датасета более 100 ГБ]}.