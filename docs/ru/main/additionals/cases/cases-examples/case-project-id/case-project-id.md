После 27 мая 2020 года сервис авторизации и аутентификации переходит на новый способ идентификации проектов.

Если вы используете API, клиент командной строки openstack-client или локальную утилиту для настройки инфраструктуры Terraform, вам нужно начать использовать идентификатор (OS_PROJECT_ID) проекта вместо его имени (OS_PROJECT_NAME) до 27 мая включительно.

Значение OS_PROJECT_ID и других параметров проекта можно посмотреть внутри личного кабинета: [https://mcs.mail.ru/app/project/keys/](https://mcs.mail.ru/app/project/keys/%C2%A0)

Примеры корректного использования параметра:

### **API**

```
curl --location --request POST 'https://infra.mail.ru:5000/v3/auth/tokens' \
--header 'Content-Type: application/json' \
--data-raw '{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "domain": {
                        "id": "users"
                    },
                    "name": "YOUR USER NAME",
                    "password": "YOUR PASSWORD"
                }
            }
        },
        "scope": {
            "project": {
                "id": "YOUR PROJECT ID"
            }
        }
    }
}'
```

### **Провайдер Terraform**

terraform.tf:

```
provider "openstack" {
    provider "openstack" {
    # the user name to login with
    user_name = "YOUR USER NAME"

    # the password to login with
    password = "YOUR PASSWORD"

    # the identifier of project to login with
    tenant_id = "YOUR PROJECT ID"

    # the domain identifier where the user is located
    user_domain_id = "users"

    # an API endpoint to connect to VK Cloud identity service
    auth_url = "https://infra.mail.ru:5000/v3/"

    # use octavia to manage load balancers
    use_octavia = true
}


```

### **Командная строка OpenStackClient**

openrc.sh:

```
#!/usr/bin/env bash

export OS_AUTH_URL=https://infra.mail.ru:5000/v3/

export OS_PROJECT_ID="YOUR PROJECT ID"
unset OS_PROJECT_NAME
unset OS_PROJECT_DOMAIN_ID

# unset v2.0 items in case set
unset OS_TENANT_ID
unset OS_TENANT_NAME

export OS_USERNAME="YOUR USER NAME"
export OS_USER_DOMAIN_NAME="users"

# With Keystone you pass the keystone password.
echo "Please enter your OpenStack Password for project $OS_PROJECT_ID as user $OS_USERNAME: "
read -sr OS_PASSWORD_INPUT
export OS_PASSWORD=$OS_PASSWORD_INPUT

export OS_INTERFACE=public
export OS_IDENTITY_API_VERSION=3
```
