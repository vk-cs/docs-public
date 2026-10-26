
{include(/en/_includes/_translated_by_ai_en.md)}

A separate YAML file is created for each tariff option, containing:

- a root section;
- a schema section;
- a billing section.

The general structure of tariff option parameters in a YAML file:

```yaml

# Root level
actions: 
  - ...
  - ...

# schema section, tariff option parameters
schema:
  description: ""
  hint: ""
  type: ""
  tag: ""

  default:         # uses the format specified in schema.type
  minimum:         # only for schema.type = integer
  maximum:         # only for schema.type = integer
  pattern:         # only for schema.type = string
  minLength:       # only for schema.type = string
  maxLength:       # only for schema.type = string
  enum: []         # an array of integer or string, depending on schema.type
  const: 

  datasource:
    type: ""
    value_is: ""

    filter:
      vcpus:       # only for schema.datasource.type = flavor
         minimum:
         maximum:
      ram:         # only for schema.datasource.type = flavor
         minimum:
         maximum:
      kind: ""     # only for schema.datasource.type = network
      shared:      # only for schema.datasource.type = network
      disk_class:  # only for schema.datasource.type = volume_type
        enum: []

# billing section, tariff option billing
billing:
  base: 
  cost: 

  unit:
    size: 
    measurement: ""
```

## {heading(Parameters in the configuration root)[id=yaml-root]}

[cols="2,5", options="header"]
|===
|Name
|Description

|`actions`
|
This parameter defines the [billing method](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) of the option.

Format: `string`.

Possible values:

- For free or prepaid billing — one or both values:

  - `create` — the option will be active when the service is connected.
  - `update` — the option will be active when the tariff plan is updated.

   If the option is active, the user will be able to change its value.

- For postpaid billing — `resource_usages`

|===

## {heading(Parameters of the schema section)[id=iboption_schema]}

`schema` — a mandatory section where the main parameters of the tariff option are specified.

[cols="1,5", options="header"]
|===
|Name
|Description

|`description`
|The name of the tariff option. It is displayed above the input field or the toggle switch.

Format: `string`, up to 255 characters.

Compatible with any types of tariff options.

Full path: `schema` → `description`
|`hint`

(optional)
|A hint describing the tariff option. It is displayed when the cursor hovers over the hint icon next to the tariff option name.

Format: `string`, up to 255 characters.

Compatible with any types of tariff options.

Full path: `schema` → `hint`

|`type`
|The type of the tariff option.

Format: `string`.

Possible values:

- `string` — a text value;
- `integer` — a numeric value;
- `boolean` — a toggle switch.

Full path: `schema` → `type`

|`tag`
|A tag — allows linking several options together.

Format: `string`.

It is used for the datasource tariff option that sets the disk size.

Full path: `schema` → `tag`

|`default`
|The default value of the tariff option.

The format specified in `schema.type` is used.

If `schema.type` = `integer`, the `default` value cannot be less than `minimum` or greater than `maximum`.

When using a predefined list of values `enum: []`, one of the values from this list must be specified in `default`.

When using the `datasource` section, the `default` value can only be specified for:
- `schema.datasource.type` = `az`. Possible values: `ms1` or `gz1`.
- `schema.datasource.type` = `volume_type`. One of the values specified in the `schema.datasource.filter.disk_class.enum` array is specified.

If the `base` parameter is used in the `billing` section, the `default` value is overridden by the formula `billing.base + schema.default * billing.unit.size`.

Full path: `schema` → `default`

|`minimum`

(optional)
|The minimum value of the tariff option.

Format: `integer`.

It is used for the tariff option type `schema.type` = `integer`.

If the `base` parameter is used in the `billing` section, the `minimum` value is overridden by the formula `billing.base + schema.minimum * billing.unit.size`.

Full path: `schema` → `minimum`

|`maximum`

(optional)
|The maximum value of the tariff option.

Format: `integer`.

It is used for the tariff option type `schema.type` = `integer`.

If the `base` parameter is used in the `billing` section, the `maximum` value is overridden by the formula `billing.base + schema.maximum * billing.unit.size`.

Full path: `schema` → `maximum`

|`pattern`

(optional)
|A regular expression (regex) pattern that the tariff option value must match.

Format: `string`.

It is used for the tariff option type `schema.type` = `string`.

Full path: `schema` → `pattern`

|`minLength`

(optional)
|The minimum number of characters for the tariff option value.

Format: `integer`.

It is used for the tariff option type `schema.type` = `string`.

Full path: `schema` → `minLength`

|`maxLength`

(optional)
|The maximum number of characters for the tariff option value.

Format: `integer`.

It is used for the tariff option type `schema.type` = `string`.

Full path: `schema` → `maxLength`

|`enum`
|A list of values from which the user will be able to select one.

The `integer` or `string` format is used, depending on the one specified in `schema.type`.

Incompatible with the `minimum`, `maximum`, `pattern`, `minLength`, `maxLength` parameters.

When using `enum`, one of the values from this list must be specified in `schema.default`

Full path: `schema` → `enum`

|`const`
|Sets a fixed value of the tariff option that cannot be changed.

The format specified in `schema.type` is used.

Incompatible with the `default`, `minimum`, `maximum`, `pattern`, `minLength`, `maxLength`, `enum` parameters.

Full path: `schema` → `const`

|===

## {heading(Parameters of the datasource section)[id=iboption_datasource]}

`datasource` — an additional section within the `schema` section. It is used to create a tariff option with the configuration of VK Cloud cloud resources: a virtual machine, a network, a subnet, and a disk.

[cols="1,5", options="header"]
|===
|Name
|Description

|`type`
|The type of the VK Cloud entity.

Format: `string`.

Possible values:

- `flavor` — VM types available in the user's project of the cloud platform.
- `az` — availability zones of the cloud platform.
- `network` — networks available in the project of the cloud platform.
- `subnet` — subnets available in the project of the cloud platform.
- `volume_type` — disk type.

The list of options available to the user is generated automatically depending on the specified value. The user will be able to select one value from the list.

Full path: `schema` → `datasource` → `type`

|`value_is`
|The display type of the available options.

Format: `string`.

Possible values:

- `uuid` — show the network UUID;
- `name` — show the network name.

Full path: `schema` → `datasource` → `value_is`

|`filter`
|Restricting the available values based on the parameters of VK Cloud entities.

Format: `object`.

Depending on the value specified in `schema` → `datasource` → `type`, it can have different parameters:

- `vcpus` and `ram` for `datasource.type` = `flavor`;
- `kind` and `shared` for `datasource.type` = `network`;
- `disk_class` for `datasource.type` = `volume_type`.

Full path:  `schema` → `datasource` → `filter`

|`vcpus`
|Restricting the number of vCPUs (only for `datasource.type` = `flavor`).

Format: `object`.

It contains one or two values:

- `minimum` — the minimum number of vCPUs;
- `maximum` — the maximum number of vCPUs.

Full path: `schema` → `datasource` → `filter` → `vcpus`

|`minimum` (for `vcpus`)
|Restricting the minimum number of vCPUs. 

Format: `integer`.

The `minimum` value must be:
- greater than `0`;
- not greater than the `maximum` value for `vcpus` (if used).

Full path: `schema` → `datasource` → `filter` → `vcpus` → `minimum`

|`maximum` (for `vcpus`)
|Restricting the maximum number of vCPUs. 

Format: `integer`.

The `maximum` value must be:
- greater than `0`;
- not less than the `minimum` value for `vcpus` (if used).

Full path: `schema` → `datasource` → `filter` → `vcpus` → `maximum`

|`ram`
|Restricting the amount of RAM (only for `datasource.type` = `flavor`).

Format: `object`.

It contains one or two values:

- `minimum` — the minimum amount of RAM;
- `maximum` — the maximum amount of RAM.

Full path: `schema` → `datasource` → `filter` → `ram`

|`minimum` (for `ram`)
|Restricting the minimum amount of RAM. 

Format: `integer`.

The `minimum` value is specified in MB and must be:
- greater than `0`;
- not greater than the `maximum` value for `ram` (if used).

Full path: `schema` → `datasource` → `filter` → `ram` → `minimum`

|`maximum` (for `ram`)
|Restricting the maximum amount of RAM. 

Format: `integer`.

The `maximum` value is specified in MB and must be:
- greater than `0`;
- not less than the `minimum` value for `ram` (if used).

Full path: `schema` → `datasource` → `filter` → `ram` → `maximum`

|`kind`
|Which network type the user can use (only for `datasource.type` = `network`).

Format: `string`.

Possible values:

- `external` — external networks only;
- `internal` — internal networks only;
- `all` — all networks.

Full path: `schema` → `datasource` → `filter` → `kind`

|`shared`
|Enabling or disabling network sharing (only for `datasource.type` = `network`).

Format: `boolean`.

- `true` — the network is available for use by all projects;
- `false` — the network is available only in the user's project.

Full path: `schema` → `datasource` → `filter` → `shared`

|`disk_class`
|Which disk types are available to the user (only for `datasource.type` = `volume_type`). It is specified as a list in the `enum` parameter.

Format: `object`.

Full path: `schema` → `datasource` → `filter` → `disk_class`

|`enum`
|A list of `string` values of disk types available for the user to select.

Format: `list` / `array` / `sequence`.

Possible values:

- `ceph-ssd` — an SSD disk;
- `ceph-hdd` — an HDD disk;
- `high-iops` — a High-IOPS SSD disk (an SSD with enhanced performance).

Full path: `schema` → `datasource` → `filter` → `disk_class` → `enum`

|===

## {heading(Parameters of the billing section)[id=iboption_billing]}

`billing` — a section used to configure billing in prepaid and postpaid tariff options.

{note:warn}

The cost of the `datasource` tariff options is determined by VK Cloud pricing and cannot be changed.

{/note}

Tariff options of the following types can be paid:

* Numeric (`integer`, `number`). Both prepaid and postpaid [billing](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) is supported.
* Boolean (`boolean`). Prepaid [billing](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) is supported.

[cols="2,5", options="header"]
|===
|Name
|Description

|`base`
|The standard value of the tariff option included in the cost of the tariff plan.

Format: `integer`.

The standard value is the minimum value that the user can set.

If the parameter is not set, the standard value of the tariff option equals `0`

Full path: `billing` → `base`

|`cost`
|- For `schema.type` = `integer`: the cost of the tariff option change step. The step parameters are defined in the `unit` section.
- For `schema.type` = `boolean`: the cost of enabling the option.

Format: `float64`.

If the parameter equals `0`, changing the option is free of charge.

Full path: `billing` → `cost`

|===

## {heading(Parameters of the unit section)[id=iboption_datasource_unit]}

`unit` — an additional section within the `billing` section. It is used to configure the parameters of the change step of a prepaid or postpaid tariff option of the `integer` type.

[cols="2,5", options="header"]
|===
|Name
|Description

|`size`
|The size of the step by which the value of a tariff option of the `integer` type can be changed.

The value specified in this parameter is billed in accordance with the cost set in the `billig.cost` parameter.

For a postpaid option, the value `1` is specified.

Format: `integer`.

Full path: `billig` → `unit` → `size`

|`measurement`
|The units of measurement of the step specified in the `size` parameter

Format: `string` (up to 255 characters).

Full path: `billig` → `unit` → `measurement`

|===