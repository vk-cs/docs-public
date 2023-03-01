Module `user_logs` contains logging tools.
```python
class Logger:

    def error(self, msg: str):
        pass

    def info(self, msg: str):
        pass
```

Before you start using `logger`, it must first initialize:

```python
from coiiot_sdk import user_logs

logger = user_logs.get_logger()

logger.info("test info")
logger.error("test error")
```
