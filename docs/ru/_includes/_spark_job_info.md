[cols="1,1,5", options="header", width=100%]
|===
|Поле
|Тип
|Описание

|`job_name`
|`str`
|Имя задания

|`status`
|`str`
|Статус задания. В случае успеха — `SUBMITTED`

|`created at`
|Дата и время в формате [RFC3339](https://www.ietf.org/rfc/rfc3339.txt)
|Время создания задания

|`ui_url`
|`str`
|Ссылка на Spark History Server, где отображается ход выполнения задания
|===
