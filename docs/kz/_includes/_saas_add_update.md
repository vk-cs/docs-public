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

Мұнда:

* `<ПАРАМЕТРЫ_СЕРВИСА>` — [сервис параметрлері](../../reference/saas-apps-reference/saas-param).
* `preview` және `plans` секциялары бірге [тарифтік жоспарлар матрицасының](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix) көрінісін анықтайды. Матрицада `plans` секциясында көрсетілген барлық тарифтік жоспарлар және `preview` секциясында көрсетілген тарифтік опциялар бейнеленеді.
* `preview` секциясының `parameters` массиві тарифтік опциялардың атауларын қамтиды, бос болуы мүмкін. Бұл атаулар тек конфигурациялық JSON-файлында қолданылады. Дүкен интерфейсінде тарифтік опциялар осы опциялардың [schemas секциясындағы](../../reference/saas-apps-reference/schemas-section) `description` параметрімен берілген атаулармен көрсетіледі.
* `plans` секциясы тарифтік жоспарлар мен олардың опцияларын сипаттайды және әр жоспар үшін келесі блоктарды қамтиды:

  * `<ПАРАМЕТРЫ_ПЛАНА>` — [жоспар параметрлері](../../reference/saas-apps-reference/saas-plan).
  * [display секциясы](../../reference/saas-apps-reference/display-section) тарифтік жоспарды конфигурациялау шеберін сипаттайды.
  * [billing секциясы](../../reference/saas-apps-reference/billing-section) жоспар мен оның опцияларының құны және тарификациялау тәсілі туралы ақпаратты қамтиды.
  * [schemas секциясы](../../reference/saas-apps-reference/schemas-section) жоспардың тарифтік опцияларын тізімдейді.

{cut(Конфигурациялық JSON-файлдың мысалы)}

```json
{
  "services": [
    {
      "id": "04527a41-XXXX-57e1aecb3ebc",
      "revision": "v. 1.0",
      "name": "VK Testers",
      "short_description": "Көпмыңдық бета-тестілеушілер қауымдастығы және деректермен жұмыс істеуге арналған жеке платформасы бар крауд-тестілеу бағдарламасы",
      "full_description": "Біз тестілеу процесін ұйымдастыруға арналған ыңғайлы баг-трекерді ұсынамыз:\n   - API көмегімен процестерді автоматтандыру\n   - Жобаларды икемді баптау\n   - Сыртқы таск-трекерлермен интеграция\n   - Тестілік жинақтарды дистрибуциялау\n   - Баг-трекердің десктоп және мобильді нұсқалары",
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
          "description": "Тегін",
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
                "name": "Баптаулар",
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
                  "measurement": "Тәулігіне сұраулар"
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
                      "description": "Өнімдер саны",
                      "hint": "Платформада тестіленетін жобалардың шекті саны: өнімдерге есептер мен чек-парақтар бекітіледі, сондай-ақ жинақтар жүктеледі.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Пайдаланушылар топтарының саны",
                      "hint": "Тапсырыс беруші қызметкерлерін таңдалған өнімдерде әртүрлі құқықтары бар жеке топтарға бөлу мүмкіндігі. Құрал қолжетімділіктер мен тестіленетін өнімдерді көрсетілген критерийлер бойынша топтарға біріктіріп, құрылымдауға мүмкіндік береді, бұл бақылау деңгейін арттырады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Қатысушылар саны",
                      "hint": "Тапсырыс беруші компания қызметкерлерінің саны, олар тестілеу инфрақұрылымын пайдаланып, VK Testers тестілеушілерінен келіп түсетін есептерді өңдей алады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Бір өнімге шаққандағы чек-парақтар саны",
                      "hint": "Чек-парақ — өнімді тестілеу кезінде орындалуы тиіс әрекеттер тізімі. Чек-парақтардың көбірек болуы VK Testers қатысушылары жүргізетін тексерулерді жақсырақ құрылымдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Ашық API-ге қолжетімділік",
                      "hint": "Ашық API тестілеу платформасын компанияңыздағы қолданыстағы шешімдердің жұмысына енгізуге көмектеседі. Сұрауларға арналған тәуліктік лимиттің ұлғаюы бір уақытта көбірек интеграцияны қолдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Жаңа есептер туралы хабарландырулар",
                      "hint": "Компания қызметкерлері үшін жаңа есептердің пайда болуы туралы лезде хабарландыруларды баптау.",
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
                      "description": "Өнімдер саны",
                      "hint": "Платформада тестіленетін жобалардың шекті саны: өнімдерге есептер мен чек-парақтар бекітіледі, сондай-ақ жинақтар жүктеледі.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Пайдаланушылар топтарының саны",
                      "hint": "Тапсырыс беруші қызметкерлерін таңдалған өнімдерде әртүрлі құқықтары бар жеке топтарға бөлу мүмкіндігі. Құрал қолжетімділіктер мен тестіленетін өнімдерді көрсетілген критерийлер бойынша топтарға біріктіріп, құрылымдауға мүмкіндік береді, бұл бақылау деңгейін арттырады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Қатысушылар саны",
                      "hint": "Тапсырыс беруші компания қызметкерлерінің саны, олар тестілеу инфрақұрылымын пайдаланып, VK Testers тестілеушілерінен келіп түсетін есептерді өңдей алады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Бір өнімге шаққандағы чек-парақтар саны",
                      "hint": "Чек-парақ — өнімді тестілеу кезінде орындалуы тиіс әрекеттер тізімі. Чек-парақтардың көбірек болуы VK Testers қатысушылары жүргізетін тексерулерді жақсырақ құрылымдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Ашық API-ге қолжетімділік",
                      "hint": "Ашық API тестілеу платформасын компанияңыздағы қолданыстағы шешімдердің жұмысына енгізуге көмектеседі. Сұрауларға арналған тәуліктік лимиттің ұлғаюы бір уақытта көбірек интеграцияны қолдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Жаңа есептер туралы хабарландырулар",
                      "hint": "Компания қызметкерлері үшін жаңа есептердің пайда болуы туралы лезде хабарландыруларды баптау.",
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

1. [Өтіңіз](https://kz.cloud.vk.com/app/services/marketplace) VK Cloud жеке кабинетінің **Қолданбалар дүкені** бөліміне.
1. **Барлық шешімдер** батырмасын басыңыз.
1. Қызметіңіздің карточкасын басып, **Тарифтік жоспарлар** қойындысына өтіңіз.
1. Әр тарифтік жоспардың конфигурациялау шебері дұрыс көрсетілетініне көз жеткізіңіз.
1. Сервисті қосыңыз.
1. Сервис инстансын жаңартыңыз:

   1. Ағымдағы тарифтік жоспардың тарифтік опцияларының мәндерін өзгертіңіз.
   1. Жаңа тарифтік жоспарға өтіңіз.

1. Сервистің негізгі пайдаланушы сценарийлерін тексеріңіз.
1. [Жойыңыз](/kz/applications-and-services/marketplace/instructions/pr-instance-manage#udalenie_instansa_servisa) сервис инстансын.

{/includetag}
