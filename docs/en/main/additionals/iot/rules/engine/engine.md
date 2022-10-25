The business rules engine is a distributed platform for executing custom code (business rules) in Python.

With business rules, you can do the following:

- Validation, transformation and routing of data flow from devices.
- Analytics on the flow of events from devices in quasi-real time.
- Integration with external systems via HTTP.
- Export data stream to external systems.

Business rules are divided into two types:

1. Reactive rules, which are designed to process the data stream from devices in quasi-real time.
2. Cron rules that run according to a given schedule.

## Create a rule

<tabs>
<tablist>
<tab>My Account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

To create a rule:

1. In your personal account, on the left panel, click "Rules".
2. Click the Add Rule button.
3. In the Basic information block:

    - Enter a name for the business rule.
    - In the "Identifier" field, specify the ID of the rule. The identifier can only consist of Latin letters, numbers, symbols "_" and ".".
    - Select pip rules from the list.

4. Check the "Rule is active" checkbox if you need to activate it.
5. Click Next Step.
6. Insert the rule code using the predefined [modules](../modules).
7. Click Add.

</tabpanel>
<tabpanel>

</tabpanel>
</tabs>

## Check result

Check that the rule works correctly. To do this, click "Test rule" → "Check".
