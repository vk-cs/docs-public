The `cron_context` module allows you to get information about the rule and the schedule by which the launch was made. The module is only available in rules with type `cron`.

The current context can be obtained via the `cron_context.current(`) function.
```python
class Rule:

    id: int
    name: str

class Schedule:

    id: int
    name: str

class Message:
    
    timestamp: datetime

class Context:
    
    rule: Rule
    schedule: Schedule
    msg: Message
    
    
def current() -> Context:
    pass
```

An example of obtaining the current context:
```python
from coiiot_sdk import cron_context
ctx = cron_context.current() # Further can be addressed to ctx.rule, ctx.schedule, ctx.msg

```

Through the context, you can access the schedule and find out the start time of the rule:
```python
from coiiot_sdk import user_logs, cron_context

logger = user_logs.get_logger()
ctx = cron_context.current()

logger.info(f"name={ctx.schedule.name} id={ctx.schedule.id} timestamp={ctx.message.timestamp}")
```
