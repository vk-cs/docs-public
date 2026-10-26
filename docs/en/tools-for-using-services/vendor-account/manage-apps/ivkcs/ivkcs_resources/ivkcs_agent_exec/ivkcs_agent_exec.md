# {heading(The ivkcs_agent_exec resource)[id=ivkcs_agent_exec]}

{include(/en/_includes/_translated_by_ai_en.md)}

The arguments of the `ivkcs_agent_exec` resource are given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — Arguments of the ivkcs_agent_exec resource)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|
`uuid`
|
Service deployment identifier
|string
| ![](../../../../../../assets/check.svg "inline")

|
`name`
|
Common name for the scripts described in the `step` argument
|string
| ![](../../../../../../assets/check.svg "inline")

|
`hosts`
|
List of hostnames where the script will be executed
|list, list elements — string
| ![](../../../../../../assets/check.svg "inline")

|
`step`
|
Describes the scripts that will be run by the agents on the hosts. Defines the order of script execution
|list, the structure of a single element is given in the table below
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

The arguments of a single `step` element are given in {linkto(#tab_arguments1)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments1]} — Arguments of a single step element)[align=right;position=above;id=tab_arguments1;number={const(numb_tab_arguments1)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation upon value change

|
`index`
|
Script index that determines the execution order
|
integer
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|
`type`
|
Script language. Possible values:

* `bash`
* `python`

|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|
`options`
|
Script execution parameters
|
set, list arguments — in {linkto(#tab_script_options)[text=table %number]}
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`content`
|
Script body
|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

The `options` arguments for describing script options are given in {linkto(#tab_script_options)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_script_options]} — Script options)[align=right;position=above;id=tab_script_options;number={const(numb_tab_script_options)}]}
[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Default value

|
`environment_variables`
|
List of environment variables additional to the system environment variables
|
list, list elements — string in the format `<ENVIRONMENT_VARIABLE_NAME>=<VALUE>`
|
—

|
`exit_codes`
|
Expected script exit codes.

If an exit code indicating successful script execution is received, the script is assigned the `success` status.

If an exit code indicating script termination with an error is received, the script will be run again. If, as a result of all retry attempts, the script terminates with an error, the script status is `failed`

The retry parameters are set in the options:

* `attempts`
* `attempt_pause`

|
list, list elements — integer
|
`0, -1`.

Code `0` — the script completed successfully.

Code `-1` — with an error

|
`halt_codes`
|
Script exit codes for which the script will not be run again
|
list, list elements — integer
|
`125`

|
`stop_signal`
|
Signal sent to the script if its execution timeout is exceeded — `SIGTERM`.

The timeout is set in the `timeout` option
|
integer
|
`15`

|
`stop_timeout`
|
Timeout counted from the moment the `SIGTERM` signal is received. When the timeout expires, the process is forcibly terminated — `SIGKILL`.

Example values:

* `1m`.
* `15s`.
* `1h`

|
string
|
`5s`

|
`cwd`
|
Directory for script execution
|
string
|
`/tmp`

|
`user`
|
User on whose behalf the script will be run.

{note:warn}

If the specified user is not found, the script will be run as the default user.

{/note}
|
string
|
`root`

|
`group`
|
User group on whose behalf the script will be run.

{note:warn}

If the specified user group is not found, the script will be run as the default group.

{/note}
|
string
|
`root`

|
`timeout`
|
Script execution timeout. If the script does not complete within the timeout, the `SIGTERM` signal is sent to it (set in the `stop_signal` option).

The value is set in the same format as the `stop_timeout` option
|
string
|
`60s`

|
`attempts`
|
Number of attempts to rerun the script if exit codes indicating script termination with an error are received (set in the `exit_codes` option).

{note:warn}

Codes from the `halt_codes` list do not cause the script to be rerun.

{/note}
|
integer
|
`3`

|
`attempt_pause`
|
Duration of the pause between script reruns.

The value is set in the same format as the `stop_timeout` option
|
string
|
`5s`

|
`pause_before`
|
Duration of the pause before the script is started.

The value is set in the same format as the `stop_timeout` option
|
string
|
`0`

|
`pause_after`
|
Duration of the pause after the script completes.

The value is set in the same format as the `stop_timeout` option
|
string
|
`0`

|
`store_result`
|
Whether to save the script execution result to the host disk
|
boolean
|
true

|
`structured_result_file`
|
Path to the file with the formatted script result
|
string
|
—

|
`once`
|
Determines whether the script will be executed only once or at every redeployment of the service.

If set to `true`, the script will be executed only during the initial service deployment
|
boolean
|
`false`
|===
{/caption}

For each script described in `step`, the `ivkcs_agent_exec` resource returns the `hash` attribute (string format), which contains the script hash to be passed to the configuration management service. Using the received values, the configuration management service compares the current and target (described in the Terraform manifest) state of the hosts.