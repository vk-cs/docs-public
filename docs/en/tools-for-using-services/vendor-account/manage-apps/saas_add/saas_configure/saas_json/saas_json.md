# {heading(JSON file structure)[id=saas_json]}

{include(/en/_includes/_translated_by_ai_en.md)}

Describe the SaaS application configuration for the broker. If the SaaS broker was created from a template, perform the following steps:

1. Create a `catalog_<SERVICE_NAME>.json` file.
1. In the JSON file, describe the service configuration using the following structure:

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

Where:

* `<SERVICE_PARAMETERS>` — service parameters (for more details, see the section {linkto(../saas_param#saas_param)[text=%text]}).
* The `preview` section — describes the tariff options for the tariff plan matrix (for more details, see the section {linkto(../saas_preview#saas_preview)[text=%text]}).
* The `plans` section — describes the tariff plans and their options (for more details, see the section [The plans section](../saas_plan)).

## {heading(Example JSON file for a SaaS application)[id=saas_example]}

```json
{
  "services": [
    {
      "id": "04527a41-XXXX-57e1aecb3ebc",
      "revision": "v. 1.0",
      "name": "VK Testers",
      "short_description": "A crowd testing program with a community of thousands of beta testers and its own platform for working with data",
      "full_description": "We offer a convenient bug tracker for organizing the testing process:\n   - Automation of processes via API\n   - Flexible project configuration\n   - Integration with external task trackers\n   - Distribution of test builds\n   - Desktop and mobile versions of the bug tracker",
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
          "description": "Free",
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
                "name": "Settings",
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
                  "measurement": "Requests per day"
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
                      "description": "Number of products",
                      "hint": "The maximum number of projects tested on the platform: reports and checklists are attached to products, and builds are uploaded to them.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Number of user groups",
                      "hint": "The ability to divide the customer's employees into separate groups with different permissions in the selected products. This tool allows structuring access rights and tested products by combining them into groups according to specified criteria, which improves the level of control.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Number of members",
                      "hint": "The number of the customer's employees who can use the testing infrastructure and process reports from VK Testers testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Number of checklists per product",
                      "hint": "A checklist is a list of actions to perform when testing a product. A greater number of checklists allows better structuring of the checks performed by VK Testers participants.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Access to the open API",
                      "hint": "The open API helps integrate the testing platform into the operation of solutions already existing in your company. An increased daily request limit allows maintaining more integrations simultaneously.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Notifications about new reports",
                      "hint": "Configuration of instant notifications for company employees about the appearance of new reports.",
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
                      "description": "Number of products",
                      "hint": "The maximum number of projects tested on the platform: reports and checklists are attached to products, and builds are uploaded to them.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0
                    },
                    "groups": {
                      "type": "integer",
                      "description": "Number of user groups",
                      "hint": "The ability to divide the customer's employees into separate groups with different permissions in the selected products. This tool allows structuring access rights and tested products by combining them into groups according to specified criteria, which improves the level of control.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Number of members",
                      "hint": "The number of the customer's employees who can use the testing infrastructure and process reports from VK Testers testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Number of checklists per product",
                      "hint": "A checklist is a list of actions to perform when testing a product. A greater number of checklists allows better structuring of the checks performed by VK Testers participants.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Access to the open API",
                      "hint": "The open API helps integrate the testing platform into the operation of solutions already existing in your company. An increased daily request limit allows maintaining more integrations simultaneously.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Notifications about new reports",
                      "hint": "Configuration of instant notifications for company employees about the appearance of new reports.",
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