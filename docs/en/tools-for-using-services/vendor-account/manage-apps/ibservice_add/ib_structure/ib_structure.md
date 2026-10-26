# {heading(Service package structure)[id=ib_structure]}

{include(/en/_includes/_translated_by_ai_en.md)}

The file structure of a service package is determined by the version of the JSON file generator. The generator converts the files from the service package into a JSON file, which the broker needs to integrate an image-based application with the marketplace. The generator version is specified in the `version.yaml` file.

## {heading(JSON file generator 0.0.1)[id=ib_structure_file]}

To create a file structure for the JSON file generator 0.0.1:

1. Create the `<SERVICE_NAME>` service directory.
1. In the service directory, create a `version.yaml` file. Inside the file, in the `version` parameter, specify the generator version `0.0.1`:

   ```yaml
   version: 0.0.1
   ```

1. In the service directory, create the following directories and files:

   * The `full_description.md` file — contains the full description of the service.
   * The `service.yaml` file — describes the service parameters and its tariff plans.
   * The `images` directory — contains the file with the image of the service icon in the marketplace.

      * A file with the `png` or `svg` extension, used as the service icon (for more details, see the section {linkto(../../service_description#service_description_icon)[text=%text]}). The file name is used in the `icon` parameter when filling in the `service.yaml` file.

         The file size must not exceed 1 MB. The image size must be at least 62×62 pixels.

   * The `parameters` directory — contains files describing the options of all tariff plans of the service:

      * The `<OPTION_NAME>.yaml` files — describe the tariff plan options. Each individual file corresponds to one option. These options will be used when forming the file describing a specific tariff plan (the `plan.yaml` file in the directory of a specific plan).

   * The `plans` directory — contains all tariff plans of the service. Inside, there are separate directories for each plan:

      * Separate directories for each plan `<PLAN_NAME>` — contain files describing a specific tariff plan. One directory corresponds to one plan:

         * The `plan.yaml` file — describes the parameters of a specific tariff plan.
         * The `display.yaml` file — describes the tariff plan configuration wizard. The tariff plan configuration wizard will be displayed in the marketplace when connecting the service and updating the tariff plan.
         * The `deployment` directory — contains the Terraform manifest.

            * The `deploy.tf` file — a manifest describing the infrastructure and the deployment process of a specific tariff plan of the service in the cloud platform.
            * The `settings.yaml` file (optional) — settings for executing the manifest.

{note:warn}

For file and directory names, use Latin letters and underscores as separators. It is not recommended to use spaces in names.

{/note}

{cut(Service package file structure for the JSON file generator 0.0.1)}

```text
image_based_service
├── images
│   └── icon.png
├── parameters
│   ├── api_requests_daily_limit.yaml
│   ├── checklists_per_product.yaml
│   ├── export_issues.yaml
│   ├── groups.yaml
│   ├── members.yaml
│   └── report_notifications.yaml
├── plans
│   ├── advanced
│   ├── basic
│   └── free
│       └── deployment
│           ├── deploy.tf
│           ├── settings.yaml
│       ├── display.yaml
│       └── plan.yaml
├── full_description.md
├── service.yaml
└── version.yaml
```

{/cut}

{note:info}

The Terraform settings placed in the `deployment` directory can be described in multiple `.tf` manifests instead of a single `deploy.tf` file.

{/note}

{caption(Example of the contents of the `deployment` directory with multiple `.tf` manifests)[align=left;position=above]}
```text
image_based_service/plans/free/deployment
│
├── common.tf
├── compute.tf
├── network.tf
├── output.tf
├── secgroup.tf
└── variables.tf
```
{/caption}