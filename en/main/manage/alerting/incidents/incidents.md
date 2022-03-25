An incident is a fixation of the event of a metric value falling under the condition specified in the trigger. It contains information about the trigger, the time of the event, the value of the metric and all its labels.

There are three incident statuses:
- Opened — opened incident
- Closed — closed by user or automatically (for incidents with an interval)
- Acknowledged — marked by the user as accepted/processed

To change the incident status, go to the "Alerting" page in the "Monitoring" section.

1. Go to the "Incidents" tab.
2. In the incident table, select the incident whose status you want to change.
3. In the "Status" column, select the new incident status:
- Open → In progress
- Open → Closed
- At work → Private

### Re-creating incidents

If an incident has been created, but the metric value continues to fall under the condition in the trigger,
the incident is active and no new incidents are created.

If the metric value ceases to fall under the condition, then the incident ceases to be active. In the future, if the value starts falling under the condition again, a new incident will be created.

For triggers with a comparison interval, the value should stop falling under the condition
during the interval, and only then the incident ceases to be active.