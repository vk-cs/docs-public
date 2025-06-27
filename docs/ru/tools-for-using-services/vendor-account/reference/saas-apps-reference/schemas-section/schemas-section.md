Секция `schemas` в [JSON-файле конфигурации сервиса](../../../manage-saas-apps/saas-add#service_config) описывает [тарифные опции](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) конкретного плана. Секция имеет следующую структуру:

```json
"schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              },
              "update": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              },
              "resource_usages": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              }
            },
            "service_binding": {
              "create": {
                "parameters": {
                  "type": "object",
                  "properties": {
                  }
                }
              }
            }
          }
```

Здесь:

* Секция `service_instance` описывает тарифные опции плана и определяет способ списания денежных средств для платных опций.

  * Секция `service_instance.create` описывает бесплатные и предоплатные тарифные опции, которые будут активными в мастере конфигурации тарифного плана при подключении сервиса.
  * Секция `service_instance.update` описывает бесплатные и предоплатные тарифные опции, которые будут активными в мастере конфигурации тарифного плана при обновлении тарифного плана сервиса.
  * Секция `service_instance.resource_usages` описывает постоплатные тарифные опции. Все опции из этой секции должны быть [описаны в брокере](../../../manage-saas-apps/saas-add#saas_broker).

* Секция `service_binding` описывает создание сервисных привязок.

<warn>

В рамках одного тарифного плана могут быть описаны:

* или только секции `service_instance.create` и `service_instance.update` (обе или только одна);
* или только секция `service_instance.resource_usages`.

</warn>

Все секции внутри `schemas` являются обязательными для объявления в JSON-файле. Секции могут быть пустыми.

Для SaaS-приложения поддерживаются все [типы тарифных опций](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types), кроме `datasource`. Параметры тарифных опций описываются JSON-схемами. Используются такие же параметры, как и [параметры тарифных опций для image-based приложения](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/iboption#iboption_schema). Примеры описания разных типов опций и их отображения в интерфейсе магазина для image-based приложения приведены в разделе [Заполнение YAML-файлов тарифных опций](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/ibopt_fill_in).

Стоимость платных опций и шаг изменения для опции типа `integer` указываются в [секции billing](../billing-section).

Требование к именам опций:

* Если сбор метрик SaaS-приложения происходит по [pull-модели](/ru/docs/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_pull), имя опции в JSON-файле должно совпадать co значением параметра `kind`, [указанным в методе брокера](../../../manage-saas-apps/saas-add#saas_broker) для передачи отчета в Marketplace.
* Если сбор метрик осуществляется по [push-модели](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_push), имя опции в JSON-файле должно совпадать co значением параметра `param` в API-запросе на передачу метрик.

### Примеры описания разных типов опций в формате JSON

{cut(Пример секции schemas для бесплатных и предоплатных тарифных опций)}

```json
"schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "int_const": {  // Тарифная опция-константа типа integer
                      "type": "integer",
                      "description": "Размер системного диска",
                      "hint": "В ГБ",
                      "const": 20
                    },
                    "int_enum": {  // Тарифная опция типа integer с выбором значения из списка
                      "type": "integer",
                      "description": "Количество серверов в кластере",
                      "enum": [3, 5, 7],
                      "default": 5
                    },
                    "int_step_1": {  // Тарифная опция типа integer с шагом изменения 1
                      "type": "integer",
                      "description": "Количество участников",
                      "hint": "Количество сотрудников компании заказчика, которые могут использовать инфраструктуру тестирования и обрабатывать отчеты от тестировщиков VK Testers.",
                      "default": 20,
                      "minimum": 20
                    },
                    "int_step_user": {  // Тарифная опция типа integer с шагом изменения, заданным в секции billing
                      "type": "integer",
                      "description": "Объем загружаемых сборок",
                      "hint": "На платформу можно загружать тестовые сборки приложений для раздачи сотрудникам заказчика и тестировщикам VK Testers. Чем больше хранилище, тем больше версий ваших продуктов можно сохранять на платформе тестирования. Поддерживаемые платформы: iOS, Android, Windows, MacOS, Linux.",
                      "default": 0
                    },
                    "string_const": {  // Тарифная опция-константа типа string
                      "type": "string",
                      "description": "Логин администратора",
                      "const": "admin@example.ru"
                    },
                    "string_input": {  // Тарифная опция типа string с вводом значения
                      "type": "string",
                      "description": "Email администратора",
                      "hint": "Email для выпуска SSL-сертификата"
                    },
                    "string_enum": {  // Тарифная опция типа string с выбором значения из списка
                      "type": "string",
                      "description": "OS тип",
                      "hint": "Операционная система",
                      "enum": ["Ubuntu 20.4", "Windows 8.1", "Windows 10"],
                      "default": "Windows 8.1"
                    },
                    "boolean_const": {  // Тарифная опция-константа типа boolean
                      "type": "boolean",
                      "description": "Premium поддержка",
                      "hint": "Техническая поддержка 24/7",
                      "const": false
                    },
                    "boolean": {  // Тарифная опция-переключатель типа boolean
                      "type": "boolean",
                      "description": "Уведомления об обновлениях",
                      "hint": "Получать ли на почту уведомления о новых версиях сервиса.",
                      "default": true
                    }
                  }
                }
              },
              "update": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              },
              "resource_usages": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              }
            },
            "service_binding": {
              "create": {
                "parameters": {
                  "type": "object",
                  "properties": {
                  }
                }
              }
            }
}
```

{/cut}

{cut(Пример секции schemas для постоплатных тарифных опций)}

```json
"schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              },
              "update": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                  }
                }
              },
              "resource_usages": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "storage": {
                      "description": "Хранение в ДЦ Киберпротект для продуктов Бэкап Облачный",
                      "type": "number"
                    }
                  }
                }
              }
            },
            "service_binding": {
              "create": {
                "parameters": {
                  "type": "object",
                  "properties": {
                  }
                }
              }
            }
          }
```

{/cut}
