{include(/kz/_includes/_translated_by_ai.md)}

`schemas` секциясы [сервис конфигурациясының JSON-файлында](../../../manage-saas-apps/saas-add#service_config) нақты жоспардың [тарифтік опцияларын](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) сипаттайды. Секцияның құрылымы келесідей:

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

Мұнда:

* `service_instance` секциясы жоспардың тарифтік опцияларын сипаттайды және ақылы опциялар үшін ақшалай қаражатты есептен шығару тәсілін анықтайды.

  * `service_instance.create` секциясы сервис қосылған кезде тарифтік жоспарды конфигурациялау шеберінде белсенді болатын тегін және алдын ала төленетін тарифтік опцияларды сипаттайды.
  * `service_instance.update` секциясы сервис тарифтік жоспары жаңартылған кезде тарифтік жоспарды конфигурациялау шеберінде белсенді болатын тегін және алдын ала төленетін тарифтік опцияларды сипаттайды.
  * `service_instance.resource_usages` секциясы кейін төленетін тарифтік опцияларды сипаттайды. Осы секциядағы барлық опциялар [брокерде сипатталуы](../../../manage-saas-apps/saas-add) керек.

* `service_binding` секциясы сервистік байланыстарды жасауды сипаттайды.

{note:warn}

Бір тарифтік жоспар шеңберінде мыналар сипатталуы мүмкін:

* не тек `service_instance.create` және `service_instance.update` секциялары (екеуі де немесе тек біреуі);
* не тек `service_instance.resource_usages` секциясы.

{/note}

`schemas` ішіндегі барлық секциялар JSON-файлда міндетті түрде жариялануы керек. Секциялар бос болуы мүмкін.

SaaS-қосымшасы үшін `datasource` түрінен басқа [тарифтік опциялардың барлық түрлері](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) қолдау табады. Тарифтік опциялардың параметрлері JSON-схемалармен сипатталады. [image-based қосымшасы үшін тарифтік опция параметрлері](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/iboption#iboption_schema) сияқты дәл сол параметрлер пайдаланылады. Әртүрлі опция түрлерін сипаттау және олардың image-based қосымшасы үшін дүкен интерфейсінде көрсетілу мысалдары [Тарифтік опциялардың YAML-файлдарын толтыру](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/ibopt_fill_in) бөлімінде келтірілген.

Ақылы опциялардың құны және `integer` түріндегі опция үшін өзгерту қадамы [billing секциясында](../billing-section) көрсетіледі.

Опция атауларына қойылатын талап:

* Егер SaaS-қосымшасының метрикаларын жинау [pull-моделі](/kz/docs/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_pull) бойынша жүрсе, JSON-файлдағы опция атауы Marketplace-ке есепті жіберу үшін [брокер әдісінде](../../../manage-saas-apps/saas-add) көрсетілген `kind` параметрінің мәнімен сәйкес келуі керек.
* Егер метрикаларды жинау [push-моделі](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_push) бойынша жүзеге асырылса, JSON-файлдағы опция атауы метрикаларды жіберуге арналған API-сұраудағы `param` параметрінің мәнімен сәйкес келуі керек.

### JSON форматындағы әртүрлі опция түрлерін сипаттау мысалдары

{cut(Тегін және алдын ала төленетін тарифтік опциялар үшін schemas секциясының мысалы)}

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

{cut(Кейін төленетін тарифтік опциялар үшін schemas секциясының мысалы)}

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
