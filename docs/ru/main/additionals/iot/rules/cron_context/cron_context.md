Модуль `cron_context` позволяет получить информацию о правиле и расписании по которому был произведен запуск. Модуль доступен только в правилах с типом `cron`.

Текущий контекст можно получить через функцию `cron_context.current(`).
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

Пример получения текущего контекста:
```python
from coiiot_sdk import cron_context
ctx = cron_context.current() # Дальше можно обращаться к ctx.rule, ctx.schedule, ctx.msg

```

Через контекст можно получить доступ к расписанию и узнать время запуска правила:
```python
from coiiot_sdk import user_logs, cron_context

logger = user_logs.get_logger()
ctx = cron_context.current()

logger.info(f"name={ctx.schedule.name} id={ctx.schedule.id} timestamp={ctx.message.timestamp}")
```
