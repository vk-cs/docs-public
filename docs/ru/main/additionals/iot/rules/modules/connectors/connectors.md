Этот модуль содержит функцию `get_http_connector(name)`, которая нужна для получения объекта HTTP-коннектора.

HTTP-коннектор позволяет делать запросы к внешним системам.
```python
class BadParamsError(Exception):
    pass

class ConnectorNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass

class NonHTTPConnectorError(Exception):
    pass


def get_http_connector(name: str) -> HTTPConnector:
	pass
```

HTTP-коннектор позволяет делать `get`, `post`, `put`, `patch`, `delete` запросы к внешним системам:
```python
Headers = Dict[str, str]
Params = Dict[str, str]


class HTTPResponse:
	status_code:  int
	headers:      Headers
	text:         str
	json:         Any

class HTTPConnector:

    def get(self,
            path: Union[str, None] = None,
            params: Union[Params, None] = None,
            headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def post(self,
             path: Union[str, None] = None,
             data: Union[Any, None] = None,
             headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def put(self,
            path: Union[str, None] = None,
            data: Union[Any, None] = None,
            headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def patch(self,
              path: Union[str, None] = None,
              data: Union[Any, None] = None,
              headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def delete(self,
               path: Union[str, None] = None,
               headers: Union[Headers, None] = None) -> HTTPResponse:

        pass
```
Пример использования HTTP-коннектора:
```python
from coiiot_sdk import connectors, context

connector = connectors.get_http_connector("custom-resource")

ctx = context.current()
connector.get(path=f"/v1/clients/{ctx.msg.value}/root_tag")
```
