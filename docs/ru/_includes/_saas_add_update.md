{includetag(service_config)}

```json
{
    "services": [
    {
    <ПАРАМЕТРЫ_СЕРВИСА>,
    "preview": {
        "parameters": [
            {
            "name": "<ИМЯ_ОПЦИИ_1>" // Имя первой тарифной опции
            },
            {
            "name": "<ИМЯ_ОПЦИИ_2>" // Имя второй тарифной опции
            },
            ...
        ]
        },
    "plans": [
        { // Описание первого тарифного плана
            <ПАРАМЕТРЫ_ПЛАНА>,
            "display": {
            },
            "billing": {
            },
            "schemas": {
            }
        },
        { // Описание второго тарифного плана
            <ПАРАМЕТРЫ_ПЛАНА>,
            "display": {
            },
            "billing": {
            },
            "schemas": {
            }
        },
        ...
        ]
    }
    ]
}
```

Здесь:

* `<ПАРАМЕТРЫ_СЕРВИСА>` — [параметры сервиса](../../reference/saas-apps-reference/saas-param).
* Секции `preview` и `plans` вместе определяют вид [матрицы тарифных планов](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix). В матрице будут отображаться все тарифные планы, указанные в секции `plans`, и тарифные опции, указанные в секции `preview`.
* Массив `parameters` секции `preview` содержит имена тарифных опций, может быть пустым. Эти имена используются только в конфигурационном JSON-файле. В интерфейсе магазина тарифные опции будут отображаться с именами, заданными в [секции schemas](../../reference/saas-apps-reference/schemas-section) параметром `description` этих опций.
* Секция `plans` описывает тарифные планы и их опции и для каждого плана содержит следующие блоки:

  * `<ПАРАМЕТРЫ_ПЛАНА>` — [параметры плана](../../reference/saas-apps-reference/saas-plan).
  * [Секция display](../../reference/saas-apps-reference/display-section) описывает мастер конфигурации тарифного плана.
  * [Секция billing](../../reference/saas-apps-reference/billing-section) содержит информацию о стоимости и способе тарификации плана и его опций.
  * [Секция schemas](../../reference/saas-apps-reference/schemas-section) перечисляет тарифные опции плана.

{cut(Пример конфигурационного JSON-файла)}

```json
{
  "services": [
    {
      "id": "04527a41-XXXX-57e1aecb3ebc",
      "revision": "v. 1.0",
      "name": "VK Testers",
      "short_description": "Программа крауд-тестирования с многотысячным коммьюнити бета-тестировщиков и собственной платформой для работы с данными",
      "full_description": "Мы предлагаем удобный баг-трекер для организации процесса тестирования:\n   - Автоматизация процессов с помощью API\n   - Гибкая настройка проектов\n   - Интеграция с внешними таск-трекерами\n   - Дистрибуция тестовых сборок\n   - Десктопная и мобильная версии баг-трекера",
      "singleton": false,
      "auto_bind": true,
      "icon": "https://vk.com/images/bugs/vktesters_logo.svg",
      "help": "http://vk.cc/vktesters_po_faq",
      "bindable": true,
      "plan_updateable": true,
      "deactivatable": false,
      "bindings_retrievable": true,
      "instances_retrievable": true,
      "preview": {
        "parameters": [
          {
            "name": "api_requests_daily_limit"
          },
          {
            "name": "products"
          },
          {
            "name": "members"
          }
        ]
      },
      "plans": [
        {
          "id": "f6593bfb-c0b8-40a3-8b82-c05e07f6ae9a",
          "revision": "v. 2.0",
          "name": "free",
          "description": "Бесплатный",
          "free": true,
          "metadata": {
              "test_ns": ["test"],
              "prod_ns": ["vkcs_ru"]
          },
          "refundable": true,
          "billing_cycle_flat": "1 mons",
          "display": {
            "pages": [
              {
                "name": "Настройки",
                "index": 0,
                "groups": [
                  {
                    "name": "",
                    "index": 0,
                    "parameters": [
                      {
                        "name": "api_requests_daily_limit",
                        "index": 0
                      },
                      {
                        "name": "groups",
                        "index": 1
                      },
                      {
                        "name": "products",
                        "index": 2
                      },
                      {
                        "name": "members",
                        "index": 3
                      }
                    ]
                  }
                ]
              }
            ]
          }
          "billing": {
            "cost": 0,
            "options": {
              "products": {
                "base": 5,
                "cost": 100,
                "unit": {
                  "size": 10
                }
              },
              "groups": {
                "base": 0,
                "cost": 200,
                "unit": {
                  "size": 5
                }
              },
              "members": {
                "base": 5,
                "cost": 100,
                "unit": {
                  "size": 1
                }
              },
              "checklists_per_product": {
                "base": 2,
                "cost": 50,
                "unit": {
                  "size": 1
                }
              },
              "api_requests_daily_limit": {
                "base": 1000,
                "cost": 50,
                "unit": {
                  "size": 1000,
                  "measurement": "Запросы в сутки"
                }
              }
            }
          },
          "schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "products": {
                      "description": "Количество продуктов",
                      "hint": "Предельное количество тестируемых на платформе проектов: к продуктам прикрепляются отчеты и чек-листы, а также загружаются сборки.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Количество групп пользователей",
                      "hint": "Возможность разделения сотрудников заказчика на отдельные группы с различными правами в выбранных продуктах. Инструмент позволяет структурировать доступы и тестируемые продукты, объединяя их в группы по обозначенным критериям, что повышает уровень контроля.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Количество участников",
                      "hint": "Количество сотрудников компании заказчика, которые могут использовать инфраструктуру тестирования и обрабатывать отчеты от тестировщиков VK Testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Количество чек-листов на продукт",
                      "hint": "Чек-лист — список действий, которые нужно выполнить при тестировании продукта. Большее количество чек-листов позволяет лучше структурировать проводимые участниками VK Testers проверки.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Доступ к открытому API",
                      "hint": "Открытое API помогает встроить платформу тестирования в работу существующих в вашей компании решений. Увеличенный суточный лимит на запросы позволяет поддерживать больше интеграций одновременно.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Уведомления о новых отчетах",
                      "hint": "Настройка мгновенных уведомлений для сотрудников компании о появлении новых отчетов.",
                      "const": false
                    }
                  }
                }
              },
              "update": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "products": {
                      "description": "Количество продуктов",
                      "hint": "Предельное количество тестируемых на платформе проектов: к продуктам прикрепляются отчеты и чек-листы, а также загружаются сборки.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Количество групп пользователей",
                      "hint": "Возможность разделения сотрудников заказчика на отдельные группы с различными правами в выбранных продуктах. Инструмент позволяет структурировать доступы и тестируемые продукты, объединяя их в группы по обозначенным критериям, что повышает уровень контроля.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Количество участников",
                      "hint": "Количество сотрудников компании заказчика, которые могут использовать инфраструктуру тестирования и обрабатывать отчеты от тестировщиков VK Testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Количество чек-листов на продукт",
                      "hint": "Чек-лист — список действий, которые нужно выполнить при тестировании продукта. Большее количество чек-листов позволяет лучше структурировать проводимые участниками VK Testers проверки.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Доступ к открытому API",
                      "hint": "Открытое API помогает встроить платформу тестирования в работу существующих в вашей компании решений. Увеличенный суточный лимит на запросы позволяет поддерживать больше интеграций одновременно.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Уведомления о новых отчетах",
                      "hint": "Настройка мгновенных уведомлений для сотрудников компании о появлении новых отчетов.",
                      "const": false
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
        }
      ]
    }
  ]
}
```

{/cut}

{/includetag}

{includetag(test_service)}

1. [Перейдите](https://msk.cloud.vk.com/app/services/marketplace) в раздел **Магазин приложений** личного кабинета VK Cloud.
1. Нажмите кнопку **Все решения**.
1. Нажмите на карточку вашего сервиса и перейдите на вкладку **Тарифные планы**.
1. Убедитесь, что мастер конфигурации каждого тарифного плана отображается корректно.
1. Подключите сервис.
1. Обновите инстанс сервиса:

   1. Поменяйте значения тарифных опций текущего тарифного плана.
   1. Перейдите на новый тарифный план.

1. Проверьте основные пользовательские сценарии сервиса.
1. [Удалите](/ru/applications-and-services/marketplace/instructions/pr-instance-manage#udalenie_instansa_servisa) инстанс сервиса.

{/includetag}
