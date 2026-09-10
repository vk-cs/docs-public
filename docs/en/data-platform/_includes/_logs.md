<!-- Information about logging in Standalone -->

{includetag(logs_info)}

{var(data-p)} in the Standalone version collects logs from all deployed service instances and displays them separately for each instance on the **Logging** tab.

## {heading(Viewing instance logs)[id=logs_standalone_view]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the required service instance.
1. Go to the **Logging** tab.
1. Review the logs.
1. To view detailed information about a log entry, click the record in the log table.
1. If necessary, refresh the logs or enable auto-refresh every 5 minutes.

## {heading(Filtering instance logs)[id=logs_standalone_filtering]}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the required service instance.
1. Go to the **Logging** tab.
1. Click the **Filters** button and select filtering parameters:

   - **Status** — filter by log status. By default, events of all statuses are displayed. Possible values:

      - `All statuses` — all logs.
      - `Fatal` — information about critical errors that may cause {var(data-p)} to fail or result in data loss. Require immediate attention and remediation to avoid serious consequences.
      - `Debug` — information about the operation of {var(data-p)} or the service, needed for diagnostics and debugging.
      - `Error` — information about errors that will cause individual operations to fail, but are not critical for {var(data-p)} or the service. They need to be handled to restore functionality.
      - `Info` — information about the functioning of {var(data-p)} or the service. Examples: process startup or task completion.
      - `Warning` — information about potential issues that do not cause failures but may require intervention in the future. Examples: deprecated methods or unstable connections.

   - A fixed time period for which to display logs.
   - A custom time period for which to display logs. Set it manually using the calendar or the time scale.

   To reset filtering settings, click the **Reset filters** button.

{/includetag}
