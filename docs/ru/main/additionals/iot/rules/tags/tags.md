Модуль `tags` предоставляет следующие функции:
```python
def root() -> Tag:
  """
  Получение корневого тега
  """

def get(tag_id: int) -> Tag:
  """
  Получение тега по его id
  """

def get_child_by_name(tag_id: int, name: str) -> Tag:
  """
  Получение потомка с именем name у тега с id = tag_id
  """

def select_by_type(tag_type: TagTypeEnum) -> Iterator[Tag]:
  """
  Выборка тегов по типу
  """
```

Модуль также содержит классы ошибок, которые могут возникнуть при получении тегов:
```python
class TagNotFoundError(Exception):
    pass

class BadParamsError(Exception):
    pass

class UnknownError(Exception):
    pass
```

Пример работы с этими функциями:
```python
from coiiot_sdk import tags

root_tag = tags.root() # получение корневого тега

tag = None
tag_id = 100
try:
  tag = tags.get(tag_id) # получение тега с id=100
except tags.TagNotFoundError:
  pass

if tag is not None:
  # получение потомка с именем imchild у тега с id = 100
  child_tag = tags.get_child_by_name(tag_id, "imchild") 
```
