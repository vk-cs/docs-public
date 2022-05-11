Модуль `context` позволяет получить информацию о правиле и теге, в котором произошло событие.

Текущий контекст можно получить через функцию `context.current()`.
```python
class TagTypeEnum(Enum):

    undefined = 0
    event = 1
    state = 2
    node = 3
    device = 4
    agent = 5
    aggregate = 6

class ValueTypeEnum(Enum):

    integer = 1
    float = 2
    boolean = 3
    string = 4
    location = 5
    timestamp = 6

class TagState:

  received_at: int
  timestamp: int
  value: Any

class Tag:
    
    id: int
    name: str
    full_name: str
    type: TagTypeEnum
    attrs: Dict[str, str]
    children: List['Tag']
    parent: Optional['Tag']
    value_type: Optional[ValueTypeEnum]
    state: Optional[TagState]

    def get_child(name) -> Optional['Tag']:
      """
      Возвращает потомка тега по его имени или None, если такового нет
      """

class Rule:

    id: int
    name: str

class Message:

    type: ValueTypeEnum
    value: Any
    timestamp: datetime

class Context:
    
    rule: Rule
    msg: Message
    tag: Tag
    root_tag: Tag
    
    
def current() -> Context:
    pass
```

Пример получения текущего контекста:
```python
from coiiot_sdk import context
ctx = context.current()
```

Через контекст можно получить доступ к тегу. Важными характеристиками тега являются свойства `children` и `parent`, с помощью которых можно перемещаться по дереву тегов. Например, можно написать правило для нахождения родителя тега:
```python
from coiiot_sdk import user_logs, context

logger = user_logs.get_logger()
ctx = context.current()

parent = ctx.tag.parent
logger.info(f"{parent.name}")
```

А таким образом можно найти дочерний тег по его имени:
```python
from coiiot_sdk import user_logs, context

logger = user_logs.get_logger()
ctx = context.current()

tag = ctx.tag.get_child("needle")

if tag is not None:
	logger.info(f"name={tag.name} id={tag.id}")
```

Также всегда можно получить доступ к корневому тегу через свойство контекста `root_tag`.

Следующее правило находит имя корневого тега:
```python
from coiiot_sdk import context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

logger.info(ctx.root_tag.name)
```
