Модуль `user_logs` содержит инструменты для логирования.
```python
class Logger:

    def error(self, msg: str):
        pass

    def info(self, msg: str):
        pass
```

Перед тем, как начать использовать `logger`, его нужно сначала проинициализировать:
```python
from coiiot_sdk import user_logs

logger = user_logs.get_logger()

logger.info("test info")
logger.error("test error")
```
