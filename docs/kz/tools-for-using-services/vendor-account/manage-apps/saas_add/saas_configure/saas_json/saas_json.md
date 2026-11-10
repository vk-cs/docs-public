# {heading(JSON-файлының құрылымы)[id=saas_json]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

SaaS-қосымшасының конфигурациясын брокер үшін сипаттаңыз. Егер SaaS-брокер шаблон бойынша жасалған болса, келесі әрекеттерді орындаңыз:

1. `catalog_<SERVICE_NAME>.json` файлын жасаңыз.
1. JSON-файлда сервис конфигурациясын келесі құрылым бойынша сипаттаңыз:

    ```json
    {
      "services": [
        {
        <SERVICE_PARAMETERS>,
        "preview": {
            "parameters": [
            ]
          },
        "plans": [
          ]
        }
      ]
    }
    ```

Мұнда:

* `<SERVICE_PARAMETERS>` — сервис параметрлері (көбірек білу — {linkto(../saas_param#saas_param)[text=%text]} бөлімінде).
* `preview` секциясы — тарифтік жоспарлар матрицасы үшін тарифтік опцияларды сипаттайды (көбірек білу — {linkto(../saas_preview#saas_preview)[text=%text]} бөлімінде).
* `plans` секциясы — тарифтік жоспарларды және олардың опцияларын сипаттайды (көбірек білу — [plans секциясы](../saas_plan) бөлімінде).

## {heading(SaaS-қосымшасы үшін JSON-файлының мысалы)[id=saas_example]}

```json
{
  "services": [
    {
      "id": "04527a41-XXXX-57e1aecb3ebc",
      "revision": "v. 1.0",
      "name": "VK Testers",
      "short_description": "Бета-тестілеушілердің мыңдаған қауымдастығы мен деректермен жұмыс істеуге арналған меншікті платформасы бар крауд-тестілеу бағдарламасы",
      "full_description": "Біз тестілеу процесін ұйымдастыру үшін ыңғайлы баг-трекерді ұсынамыз:\n   - API көмегімен процестерді автоматтандыру\n   - Жобаларды икемді баптау\n   - Сыртқы таск-трекерлермен интеграция\n   - Тестілік жинақтарды тарату\n   - Баг-трекердің десктоптық және мобильді нұсқалары",
      "singleton": false,
      "auto_bind": true,
      "icon": "https://vk.ru/images/bugs/vktesters_logo.svg",
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
                      "hint": "Платформада тестіленетін жобалардың шекті саны: өнімдерге есептер мен чек-тііздерілер бекітіледі, сонымен қатар жинақтар жүктеледі.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Пайдаланушылар топтарының саны",
                      "hint": "Тапсырыс берушінің қызметкерлерін таңдалған өнімдерде әртүрлі құқықтары бар жекелеген топтарға бөлу мүмкіндігі. Құрал қолжетімділіктер мен тестіленетін өнімдерді белгіленген критерийлер бойынша топтарға біріктіру арқылы құрылымдауға мүмкіндік береді, бұл бақылау деңгейін арттырады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Қатысушылар саны",
                      "hint": "Тапсырыс беруші компанияның тестілеу инфрақұрылымын пайдалана алатын және VK Testers тестілеушілерінен келген есептерді өңдейтін қызметкерлерінің саны.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Өнімге шаққандағы чек-тііздер саны",
                      "hint": "Чек-тііз — өнімді тестілеу кезінде орындау қажет әрекеттер тізімі. Чек-тііздер санының көбірек болуы VK Testers қатысушылары жүргізетін тексерістерді жақсырақ құрылымдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Ашық API-ға қолжетімділік",
                      "hint": "Ашық API тестілеу платформасын компанияңызда бар шешімдердің жұмысына енгізуге көмектеседі. Сұрауларға арналған арттырылған тәуліктік лимит бір уақытта көбірек интеграцияларды қолдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Жаңа есептер туралы хабарландырулар",
                      "hint": "Компания қызметкерлері үшін жаңа есептер пайда болғаны туралы лезде хабарландыруларды баптау.",
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
                      "hint": "Платформада тестіленетін жобалардың шекті саны: өнімдерге есептер мен чек-тііздерілер бекітіледі, сонымен қатар жинақтар жүктеледі.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Пайдаланушылар топтарының саны",
                      "hint": "Тапсырыс берушінің қызметкерлерін таңдалған өнімдерде әртүрлі құқықтары бар жекелеген топтарға бөлу мүмкіндігі. Құрал қолжетімділіктер мен тестіленетін өнімдерді белгіленген критерийлер бойынша топтарға біріктіру арқылы құрылымдауға мүмкіндік береді, бұл бақылау деңгейін арттырады.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Қатысушылар саны",
                      "hint": "Тапсырыс беруші компанияның тестілеу инфрақұрылымын пайдалана алатын және VK Testers тестілеушілерінен келген есептерді өңдейтін қызметкерлерінің саны.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Өнімге шаққандағы чек-тііздер саны",
                      "hint": "Чек-тііз — өнімді тестілеу кезінде орындау қажет әрекеттер тізімі. Чек-тііздер санының көбірек болуы VK Testers қатысушылары жүргізетін тексерістерді жақсырақ құрылымдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Ашық API-ға қолжетімділік",
                      "hint": "Ашық API тестілеу платформасын компанияңызда бар шешімдердің жұмысына енгізуге көмектеседі. Сұрауларға арналған арттырылған тәуліктік лимит бір уақытта көбірек интеграцияларды қолдауға мүмкіндік береді.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Жаңа есептер туралы хабарландырулар",
                      "hint": "Компания қызметкерлері үшін жаңа есептер пайда болғаны туралы лезде хабарландыруларды баптау.",
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