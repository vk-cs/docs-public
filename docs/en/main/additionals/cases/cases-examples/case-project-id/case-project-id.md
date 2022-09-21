After May 27, 2020, the authorization and authentication service will switch to a new way of identifying projects.

If you are using the API, the openstack-client command line client, or the local utility to configure the Terraform infrastructure, you need to start using the project ID (OS_PROJECT_ID) instead of the project name (OS_PROJECT_NAME) by May 27th.

The value of OS_PROJECT_ID and other project parameters can be viewed inside your personal account: [https://mcs.mail.ru/app/project/keys/](https://mcs.mail.ru/app/project/keys/%C2% A0)

Examples of the correct use of the parameter:

### API

```
curl --location --request POST 'https://infra.mail.ru:5000/v3/auth/tokens' \
--header 'Content-Type: application/json' \
--data-raw '{
    "auth": {
        identity: {
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
        scope: {
            "project": {
                "id": "YOUR PROJECT ID"
            }
        }
    }
}'
```

### Terraform provider

terraform.tf:

```
provider "openstack" {
    provider "openstack" {
    # the user name to login with
    user_name = "YOUR USER NAME"

    # the password to login with
    password = "YOUR PASSWORD"

    # the identifier of the project to login with
    tenant_id = "YOUR PROJECT ID"

    # the domain identifier where the user is located
    user_domain_id = "users"

    # an API endpoint to connect to VK Cloud identity service
    auth_url = "https://infra.mail.ru:5000/v3/"

    # use octavia to manage load balancers
    use_octavia = true
}


```

### OpenStackClient command line

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
