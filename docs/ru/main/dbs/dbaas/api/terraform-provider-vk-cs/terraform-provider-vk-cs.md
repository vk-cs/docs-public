## Начало работы с Terraform

Перед продолжением убедитесь, что:

- вы [установили Terraform](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation) и [создали файл main.tf](https://mcs.mail.ru/docs/ru/dbs/dbaas/api/terraform-for-dbaas) с необходимыми Terraform провайдерами.
- Если не создан инстанс базы данных, то следуйте [инструкции](Создание инстанса БД) и подготовьте файл `database_instance.tf`.

## Создание БД и пользователя

Для безопасной работы с чувствительными данными, такими как пароль пользователя, можно воспользоваться переменными Terraform.
Для этого объявите переменную c параметром `sensitive = true`. Для таких переменных Terraform будет скрывать вывод в консоль.

``` bash
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

В описании ресурса `mcs_db_user` используйте ее в качестве значения соответствующего поля:

``` bash
password = var.db_user_password
```

Для того, чтобы задать значение переменной можно использовать один их следующих вариантов. Подробнее об этом можно прочитать [здесь](https://learn.hashicorp.com/tutorials/terraform/sensitive-variables).

- Создать файл `secret.tfvars`. Записать `db_user_password="YOUR_DB_PASSWORD"` в него и передать его в качестве аргумента команды `terraform apply -var-file="secret.tfvars"`. Таким образом, чувствительные данные будут храниться от остальной конфигурации.
- Задать через переменную окружения с префиксом TF_VAR. Terrafrom автоматически их подхватит и применит в конфигурации:
  - **Mac or Linux**: `export TF_VAR_db_user_password=YOUR_DB_PASSWORD`
  - **Windows**: `$Env:TF_VAR_db_usernamedb_user_password = "YOUR_DB_PASSWORD"`

Пример создания базы данных и пользователя:

``` bash
variable "db_user_password" {
  type      = string
  sensitive = true
}

resource "mcs_db_database" "db-database" {
  name        = "testdb"
  dbms_id = mcs_db_instance.db-instance.id
  charset     = "utf8"
  collate     = "utf8_general_ci"
}

resource "mcs_db_user" "db-user" {
  name        = "testuser"
  password    = var.db_user_password

  dbms_id = mcs_db_instance.db-instance.id

  databases   = [mcs_db_database.db-database.name]
}
```
