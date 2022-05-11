Модуль `exporters` содержит инструменты для экспорта данных во внешние системы через очередь.

В нем есть только одна функция для получения объекта-экспортёра по его имени:
```python
class BadParamsError(Exception):
    pass

class ExporterNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass

def get_by_name(name: str) -> Exporter:
	pass
```

Сам объект-экспортер не отличается богатым интерфейсом, предоставляя лишь функцию отправки словаря в очередь:
```python
class Exporter:

    def send(self, msg: Dict):
        pass
```

Пример отправки значений в очередь с использованием данного модуля:
```python
from coiiot_sdk import exporters, context

exporter = exporters.get_by_name("test_exporter")
ctx = context.current()

exporter.send({
    "tag": ctx.tag.full_name,
    "value": ctx.msg.value,
    "timestamp": ctx.msg.timestamp,
})
```
