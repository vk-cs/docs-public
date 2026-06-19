# {heading(Spark-тапсырмасын іске қосу кезіндегі қате: The node was low on resource: ephemeral-storage)[id=ephemeral_storage_error]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Мәселе)[id=ephemeral_storage_error_problem]}

Spark-тапсырмасын іске қосқан кезде мына қате пайда болады:

```console
The node was low on resource: ephemeral-storage
```

Қате кластер түйіндерінде уақытша диск кеңістігінің (ephemeral storage) жетіспеуінен туындайды. Көбінесе бұл өңделетін датасеттің үлкен көлемімен немесе worker-түйіндер санының жеткіліксіздігімен байланысты.

## {heading(Шешім)[id=ephemeral_storage_error_solving]}

Мәселенің шешімі {linkto(../large_dataset#large_dataset_solving)[text=100 ГБ-тан асатын датасетті өңдеу кезіндегі қате]} нұсқаулығында сипатталған.