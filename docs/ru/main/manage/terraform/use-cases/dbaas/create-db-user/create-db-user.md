<warn>

Прежде всего убедитесь, что вы [установили Terraform](../../../quick-start) и [создали файл main.tf](../../../quick-start/configuration) с необходимыми провайдерами.

</warn>

Для безопасной работы с чувствительными данными, такими как пароль пользователя, можно воспользоваться переменными Terraform. Для этого объявите переменную c параметром `sensitive = true`. Для таких переменных Terraform будет скрывать вывод в консоль.

``` bash
variable "db_user_password" {
  type      = string
  sensitive = true
}
```

В описании ресурса `vkcs_db_user` используйте ее в качестве значения соответствующего поля:

``` bash
password = var.db_user_password
```

Чтобы задать значение переменной, используйте один их вариантов ([подробнее](https://learn.hashicorp.com/tutorials/terraform/sensitive-variables)):

- Создать файл `secret.tfvars`. Записать `db_user_password="YOUR_DB_PASSWORD"` в него и передать его в качестве аргумента команды `terraform apply -var-file="secret.tfvars"`. Таким образом, чувствительные данные будут храниться отдельно от остальной конфигурации.
- Задать через переменную окружения с префиксом `TF_VAR`. Terraform автоматически их подхватит и применит в конфигурации:

  - **Mac or Linux**: `export TF_VAR_db_user_password=YOUR_DB_PASSWORD`
  - **Windows**: `$Env:TF_VAR_db_usernamedb_user_password = "YOUR_DB_PASSWORD"`

Пример создания базы данных и пользователя:

``` bash
variable "db_user_password" {
  type      = string
  sensitive = true
}

resource "vkcs_db_database" "db-database" {
  name        = "testdb"
  dbms_id = vkcs_db_instance.db-instance.id
  charset     = "utf8"
  collate     = "utf8_general_ci"
}

resource "vkcs_db_user" "db-user" {
  name        = "testuser"
  password    = var.db_user_password

  dbms_id = vkcs_db_instance.db-instance.id

  databases   = [vkcs_db_database.db-database.name]
}
```
