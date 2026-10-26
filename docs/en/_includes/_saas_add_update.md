{includetag(service_config)}

```json
{
    "services": [
    {
    <SERVICE_PARAMETERS>,
    "preview": {
        "parameters": [
            {
            "name": "<OPTION_NAME_1>" // Name of the first pricing option
            },
            {
            "name": "<OPTION_NAME_2>" // Name of the second pricing option
            },
            ...
        ]
        },
    "plans": [
        { // Description of the first pricing plan
            <PLAN_PARAMETERS>,
            "display": {
            },
            "billing": {
            },
            "schemas": {
            }
        },
        { // Description of the second pricing plan
            <PLAN_PARAMETERS>,
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

Here:

* `<SERVICE_PARAMETERS>` — [service parameters](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/saas-param).
* The `preview` and `plans` sections together define the appearance of the [pricing plan matrix](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix). The matrix will display all pricing plans specified in the `plans` section and the pricing options specified in the `preview` section.
* The `parameters` array of the `preview` section contains the names of pricing options and can be empty. These names are used only in the configuration JSON file. In the marketplace interface, pricing options will be displayed with the names specified in the [schemas section](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/schemas-section) by the `description` parameter of these options.
* The `plans` section describes pricing plans and their options, and for each plan contains the following blocks:

  * `<PLAN_PARAMETERS>` — [plan parameters](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/saas-plan).
  * [The display section](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/display-section) describes the pricing plan configuration wizard.
  * [The billing section](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/billing-section) contains information about the cost and billing method of the plan and its options.
  * [The schemas section](/en/tools-for-using-services/vendor-account/reference/saas-apps-reference/schemas-section) lists the pricing options of the plan.

{cut(Example of a configuration JSON file)}

```json
{
  "services": [
    {
      "id": "04527a41-XXXX-57e1aecb3ebc",
      "revision": "v. 1.0",
      "name": "VK Testers",
      "short_description": "A crowdtesting program with a community of thousands of beta testers and its own platform for working with data",
      "full_description": "We offer a convenient bug tracker for organizing the testing process:\n   - Process automation via API\n   - Flexible project configuration\n   - Integration with external task trackers\n   - Distribution of test builds\n   - Desktop and mobile versions of the bug tracker",
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
                      "hint": "The ability to split the customer's employees into separate groups with different permissions in the selected products. The tool allows you to structure access and tested products by combining them into groups according to specified criteria, which increases the level of control.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Number of members",
                      "hint": "The number of employees of the customer's company who can use the testing infrastructure and process reports from VK Testers testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Number of checklists per product",
                      "hint": "A checklist is a list of actions to be performed when testing a product. A larger number of checklists allows for better structuring of the checks performed by VK Testers participants.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Access to the open API",
                      "hint": "The open API helps integrate the testing platform into the work of solutions already in use at your company. An increased daily request limit allows you to support more integrations simultaneously.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Notifications about new reports",
                      "hint": "Configuring instant notifications for company employees when new reports appear.",
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
                      "hint": "The ability to split the customer's employees into separate groups with different permissions in the selected products. The tool allows you to structure access and tested products by combining them into groups according to specified criteria, which increases the level of control.",
                      "minimum": 0,
                      "default": 0
                    },
                    "members": {
                      "type": "integer",
                      "description": "Number of members",
                      "hint": "The number of employees of the customer's company who can use the testing infrastructure and process reports from VK Testers testers.",
                      "minimum": 0,
                      "default": 0
                    },
                    "checklists_per_product": {
                      "type": "integer",
                      "description": "Number of checklists per product",
                      "hint": "A checklist is a list of actions to be performed when testing a product. A larger number of checklists allows for better structuring of the checks performed by VK Testers participants.",
                      "minimum": 0,
                      "default": 0
                    },
                    "api_requests_daily_limit": {
                      "type": "integer",
                      "description": "Access to the open API",
                      "hint": "The open API helps integrate the testing platform into the work of solutions already in use at your company. An increased daily request limit allows you to support more integrations simultaneously.",
                      "minimum": 0,
                      "default": 0
                    },
                    "report_notifications": {
                      "type": "boolean",
                      "description": "Notifications about new reports",
                      "hint": "Configuring instant notifications for company employees when new reports appear.",
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

1. [Go to](https://msk.cloud.vk.ru/app/services/marketplace) the **Marketplace** section of the VK Cloud management console.
1. Click the **All solutions** button.
1. Click your service's card and go to the **Pricing plans** tab.
1. Make sure the configuration wizard for each pricing plan is displayed correctly.
1. Connect the service.
1. Update the service instance:

   1. Change the values of the pricing options of the current pricing plan.
   1. Switch to a new pricing plan.

1. Test the main user scenarios of the service.
1. [Delete](/en/applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-delete) the service instance.

{/includetag}
