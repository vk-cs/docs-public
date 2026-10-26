# {heading(Fluent Bit)[id=k8s-install-private-logaas-integration]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Fluent Bit add-on allows you to organize log delivery from a Kubernetes cluster to the logging service.

The log sources are the kubelet services and pods located on the cluster nodes.

Regardless of the chosen installation option, the add-on will be installed as a DaemonSet on all cluster nodes, including master nodes.

## {heading(Installing the add-on)[id=k8s-install-advanced-logaas-integration-install]}

To install the Fluent Bit add-on:

1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go]} to the {var(cloud)} management console.
1. Go to the **Kubernetes Clusters** → **Kubernetes Clusters** section and click the name of the desired cluster.
1. Go to the **Add-ons** tab.
1. Click the **Install** button on the `logaas-integration` add-on card and click the **Install add-on** button.
1. If necessary, change:

   * The application name.
   * The name of the namespace where the add-on will be installed.
   * The add-on code.

     A detailed description of the code parameters is available [in the Fluent Bit repository](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml).

1. Click **Install add-on**. Installing the add-on may take a considerable amount of time.

If necessary, perform fine-tuning of the add-on using:

* Custom filters.

  Specify one or more rules for custom filters in the `customFilter` field in the add-on code, so that only logs with a specified minimum severity level are delivered to the logging service. These rules can be configured at the level of a specific namespace and at the level of specific pods in the namespace. Code example:

  ```console
  customFilter:
    - namespace: kube-system
      rules: # One rule for the namespace
      - min_level: WARN
      - min_level: ERROR
        podprefix: kube-internal
    - namespace: default
      rules: # Multiple rules for pods in the namespace
        - podprefix: test-pod
          min_level: WARN
        - podprefix: someapi
          min_level: DEBUG
  ```

  Where:

  * `namespace` — the name of the namespace.
  * `min_level` — the letter designation of the minimum severity level. Examples: WARN, ERROR, DEBUG.
  * `podprefix` — the prefix of the pod name.

* Custom templates

  Specify one or more rules for customRegexp custom templates in the add-on code to assign the desired severity level to logs bypassing the standard add-on mechanisms. If a part of a log entry matches the specified Lua pattern ([pattern](https://www.lua.org/manual/5.4/manual.html#6.4.1)), that entry is assigned the severity level specified in the rule. If there are no matches, the entry is assigned the severity level determined by the Fluent Bit parsers. This can be useful if the automatic level detection mechanism used in the add-on incorrectly detects the log level of a specific application.

  These rules apply at the level of a specific namespace and at the level of specific pods in the namespace. Code example:

  ```console
  - namespace: kube-system
    rules: # One rule for the namespace: configuring multiple levels
    - levels:
      - level: WARN
        reg_exp: "text message"
  - namespace: default
    rules: # Multiple rules for pods in the namespace: configuring multiple
    - podprefix: test-pod
      levels:
      - level: ERROR
        reg_exp: "text message"
      - level: WARN
        reg_exp: "json message"
    - podprefix: another-another-test-pod
      levels:
      - level: WARN
        reg_exp: "text message"
      - level: FATAL
        reg_exp: "some"
      - levels:
      - level: ERROR
        reg_exp: "text message"
      - level: INFO
        reg_exp: "some"
  ```

  Where:

  * `namespace` — the name of the namespace.
  * `level` — the letter designation of the minimum severity level. Examples: WARN, ERROR, DEBUG, INFO, FATAL.
  * `podprefix` — the prefix of the pod name.
  * `reg_exp` — the Lua pattern.

For more information on working with the add-on, see the official [Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit) documentation.