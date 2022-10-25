The `exporters` module contains tools for exporting data to external systems via a queue.

It has only one function to get the exporter object by its name:
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

The exporter object itself does not have a rich interface, providing only the function of sending a dictionary to the queue:
```python
class Exporter:

    def send(self, msg: Dict):
        pass
```

An example of sending values to the queue using this module:
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
