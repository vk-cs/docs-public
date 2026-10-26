
{include(/en/_includes/_translated_by_ai_en.md)}

The `schemas` section in the [service configuration JSON file](../../../instructions/manage-saas-apps/saas-add#service_config) describes the [tariff options](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) of a specific plan. The section has the following structure:

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

Here:

* The `service_instance` section describes the plan's tariff options and defines the way funds are charged for paid options.

  * The `service_instance.create` section describes free and prepaid tariff options that will be active in the tariff plan configuration wizard when connecting the service.
  * The `service_instance.update` section describes free and prepaid tariff options that will be active in the tariff plan configuration wizard when updating the service's tariff plan.
  * The `service_instance.resource_usages` section describes postpaid tariff options. All options from this section must be [described in the broker](../../../instructions/manage-saas-apps/saas-add).

* The `service_binding` section describes the creation of service bindings.

{note:warn}

Within a single tariff plan, you can describe:

* either only the `service_instance.create` and `service_instance.update` sections (both or just one);
* or only the `service_instance.resource_usages` section.

{/note}

All sections inside `schemas` are mandatory to declare in the JSON file. The sections can be empty.

For a SaaS application, all [tariff option types](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) are supported except `datasource`. Tariff option parameters are described using JSON schemas. The same parameters are used as the [tariff option parameters for an image-based application](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/iboption#iboption_schema). Examples of describing different option types and their display in the store interface for an image-based application are provided in the section [Filling in YAML files of tariff options](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ibservice_configure/ibopt_fill_in).

The cost of paid options and the change step for an option of the `integer` type are specified in the [billing section](../billing-section).

Requirements for option names:

* If SaaS application metrics are collected using the [pull model](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_pull), the option name in the JSON file must match the value of the `kind` parameter [specified in the broker method](../../../instructions/manage-saas-apps/saas-add) for submitting the report to Marketplace.
* If metrics are collected using the [push model](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#billing_push), the option name in the JSON file must match the value of the `param` parameter in the API request for submitting metrics.

### Examples of describing different option types in JSON format

{cut(Example of the schemas section for free and prepaid tariff options)}

```json
"schemas": {
            "service_instance": {
              "create": {
                "parameters": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "properties": {
                    "int_const": {  // Tariff option-constant of the integer type
                      "type": "integer",
                      "description": "System disk size",
                      "hint": "In GB",
                      "const": 20
                    },
                    "int_enum": {  // Tariff option of the integer type with value selection from a list
                      "type": "integer",
                      "description": "Number of servers in the cluster",
                      "enum": [3, 5, 7],
                      "default": 5
                    },
                    "int_step_1": {  // Tariff option of the integer type with a change step of 1
                      "type": "integer",
                      "description": "Number of participants",
                      "hint": "The number of the customer's employees who can use the testing infrastructure and process reports from VK Testers testers.",
                      "default": 20,
                      "minimum": 20
                    },
                    "int_step_user": {  // Tariff option of the integer type with a change step specified in the billing section
                      "type": "integer",
                      "description": "Volume of uploaded builds",
                      "hint": "Test builds of applications can be uploaded to the platform for distribution to the customer's employees and VK Testers testers. The larger the storage, the more versions of your products can be saved on the testing platform. Supported platforms: iOS, Android, Windows, MacOS, Linux.",
                      "default": 0
                    },
                    "string_const": {  // Tariff option-constant of the string type
                      "type": "string",
                      "description": "Administrator login",
                      "const": "admin@example.ru"
                    },
                    "string_input": {  // Tariff option of the string type with value input
                      "type": "string",
                      "description": "Administrator email",
                      "hint": "Email for issuing an SSL certificate"
                    },
                    "string_enum": {  // Tariff option of the string type with value selection from a list
                      "type": "string",
                      "description": "OS type",
                      "hint": "Operating system",
                      "enum": ["Ubuntu 20.4", "Windows 8.1", "Windows 10"],
                      "default": "Windows 8.1"
                    },
                    "boolean_const": {  // Tariff option-constant of the boolean type
                      "type": "boolean",
                      "description": "Premium support",
                      "hint": "24/7 technical support",
                      "const": false
                    },
                    "boolean": {  // Tariff toggle option of the boolean type
                      "type": "boolean",
                      "description": "Update notifications",
                      "hint": "Whether to receive email notifications about new versions of the service.",
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

{cut(Example of the schemas section for postpaid tariff options)}

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
                      "description": "Storage in the Cyberprotect data center for Cloud Backup products",
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