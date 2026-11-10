
{include(/kz/_includes/_translated_by_ai_kz.md)}

`schemas` секциясы [сервисді конфигурациялаудың JSON-файлында](../../../instructions/manage-saas-apps/saas-add#service_config) нақты жоспардың [тарифтік опцияларын](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) сипаттайды. Секцияның құрылымы мынадай:

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

* `service_instance` секциясы жоспардың тарифтік опцияларын сипаттайды және ақылы опциялар үшін ақша алу тәсілін анықтайды.

  * `service_instance.create` секциясы сервисді қосқан кезде тарифтік жоспарды конфигурациялау шеберінде белсенді болатын тегін және алдын ала төленетін тарифтік опцияларды сипаттайды.
  * `service_instance.update` секциясы сервисдің тарифтік жоспарын жаңартқан кезде тарифтік жоспарды конфигурациялау шеберінде белсенді болатын тегін және алдын ала төленетін тарифтік опцияларды сипаттайды.
  * `service_instance.resource_usages` секциясы кейін төленетін тарифтік опцияларды сипаттайды. Осы секциядан алынған барлық опциялар [брокерде сипатталған](../../../instructions/manage-saas-apps/saas-add) болуы тиіс.

* `service_binding` секциясы сервистік байланыстыруды (service binding) құруды сипаттайды.

{note:warn}

Бір тарифтік жоспар шегінде сипаттауға болады:

* немесе тек `service_instance.create` және `service_instance.update` секцияларын (екеуін немесе тек біреуін);
* немесе тек `service_instance.resource_usages` секциясын.

{/note}

`schemas` ішіндегі барлық секциялар JSON-файлында жариялау үшін міндетті. Секциялар бос болуы мүмкін.

SaaS-қосымшасы үшін `datasource` түрінен басқа барлық [тарифтік опция түрлеріне](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) қолдау көрсетіледі. Тарифтік опциялардың параметрлері JSON-схемалармен сипатталады. [Image-based қосымшасы үшін тарифтік опциялардың параметрлеріндегі](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/iboption#iboption_schema) сияқты параметрлер қолданылады. Әртүрлі типтегі опцияларды сипаттау мысалдары және олардың image-based қосымшасының дүкен интерфейсінде көрсетілуі [Тарифтік опциялардың YAML-файлдарын толтыру](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/ibopt_fill_in) бөлімінде келтірілген.

Ақылы опциялардың құны және `integer` типті опция үшін өзгерту қадамы [billing секциясында](../billing-section) көрсетіледі.

Опция атауларына қойылатын талап:

* Егер SaaS-қосымшасының метрикаларын жинау [pull-модель](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_pull) бойынша жүзеге асырылса, JSON-файлындағы опция атауы Marketplace-ке есеп беру үшін [брокер әдісінде көрсетілген](../../../instructions/manage-saas-apps/saas-add) `kind` параметрінің мәніне сәйкес болуы тиіс.
* Егер метрикаларды жинау [push-модель](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_push) бойынша жүзеге асырылса, JSON-файлындағы опция атауы метрикаларды жеткізуге арналған API-сұраныстағы `param` параметрінің мәніне сәйкес болуы тиіс.

### JSON форматындағы әртүрлі типтегі опцияларды сипаттау мысалдары

{cut(Тегін және алдын ала төленетін тарифтік опциялар үшін schemas секциясының мысалы)}

```json
"schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "int_const": {  // integer типті константа-тарифтік опция
                      "type": "integer",
                      "description": "Жүйелік дискінің көлемі",
                      "hint": "ГБ есебінде",
                      "const": 20
                    },
                    "int_enum": {  // Тізімнен мән таңдау мүмкіндігі бар integer типті тарифтік опция
                      "type": "integer",
                      "description": "Кластердеегі серверлер саны",
                      "enum": [3, 5, 7],
                      "default": 5
                    },
                    "int_step_1": {  // Өзгерту қадамы 1 болатын integer типті тарифтік опция
                      "type": "integer",
                      "description": "Уақыт бөлетіндер саны",
                      "hint": "Тапсырыс беруші компанияның тестілеу инфрақұрылымын пайдалана алатын және тестілеушілерден VK Testers есептерін өңдейтін қызметкерлерінің саны.",
                      "default": 20,
                      "minimum": 20
                    },
                    "int_step_user": {  // Өзгерту қадамы billing секциясында көрсетілген integer типті тарифтік опция
                      "type": "integer",
                      "description": "Жүктеп салынатын жинақтар көлемі",
                      "hint": "Платформаға тапсырыс берушінің қызметкерлеріне және VK Testers тестілеушілеріне тарату үшін қосымшалардың тестілік жинақтарын жүктеуге болады. Сақтау орны неғұрлым көп болса, платформада соғұрлым көп өнім нұсқаларын сақтауға болады. Қолдау көрсетілетін платформалар: iOS, Android, Windows, MacOS, Linux.",
                      "default": 0
                    },
                    "string_const": {  // string типті константа-тарифтік опция
                      "type": "string",
                      "description": "Әкімшінің логині",
                      "const": "admin@example.ru"
                    },
                    "string_input": {  // Мән енгізу мүмкіндігі бар string типті тарифтік опция
                      "type": "string",
                      "description": "Әкімшінің Email-і",
                      "hint": "SSL-сертификат шығару үшін Email"
                    },
                    "string_enum": {  // Тізімнен мән таңдау мүмкіндігі бар string типті тарифтік опция
                      "type": "string",
                      "description": "OS түрі",
                      "hint": "Операциялық жүйе",
                      "enum": ["Ubuntu 20.4", "Windows 8.1", "Windows 10"],
                      "default": "Windows 8.1"
                    },
                    "boolean_const": {  // boolean типті константа-тарифтік опция
                      "type": "boolean",
                      "description": "Premium қолдау",
                      "hint": "Тәулік бойы 24/7 техникалық қолдау",
                      "const": false
                    },
                    "boolean": {  // boolean типті қосқыш-тарифтік опция
                      "type": "boolean",
                      "description": "Жаңартулар туралы хабарламалар",
                      "hint": "Сервисдің жаңа нұсқалары туралы хабарламаларды поштаға алу керек пе.",
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
                      "description": "Бэкап Облачный өнімдері үшін Киберпротект ДҚ-да сақтау",
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