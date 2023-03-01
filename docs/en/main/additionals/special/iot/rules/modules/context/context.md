The `context` module allows you to get information about the rule and tag in which the event occurred.

The current context can be obtained via the `context.current()` function.
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
      Returns the descendant of the tag according to his name or None, if there is no such
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

An example of obtaining the current context:
```python
from coiiot_sdk import context
ctx = context.current()
```

Through the context, you can access the tag. The important characteristics of a tag are the `children` and `parent` properties, with which you can navigate through the tag tree. For example, you can write a rule to find the parent of a tag:
```python
from coiiot_sdk import user_logs, context

logger = user_logs.get_logger()
ctx = context.current()

parent = ctx.tag.parent
logger.info(f"{parent.name}")
```

And so you can find a child tag according to his name:
```python
from coiiot_sdk import user_logs, context

logger = user_logs.get_logger()
ctx = context.current()

tag = ctx.tag.get_child("needle")

if tag is not None:
	logger.info(f"name={tag.name} id={tag.id}")
```

You can also access the root tag through the context property. `root_tag`.

The following rule finds the name of the root tag:
```python
from coiiot_sdk import context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

logger.info(ctx.root_tag.name)
```
