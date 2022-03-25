Building an endpoint
-------------------------

To work with Cloud Queues, you need to use endpoint https://sqs.mcs.mail.ru/

Regional endpoints
---------------------------

Each Cloud Queues endpoint is independent. For example, if two queues are named myQueue and one has an endpoint sqs.ru-east-2.mcs.mail.ru, and the other is the endpoint sqs.mcs.mail.ru , these two queues do not exchange data with each other.

Below is an example of an endpoint that makes a request to create a queue.

```
https://sqs.mcs.mail.ru/   
?Action=CreateQueue
&DefaultVisibilityTimeout=40
&QueueName=MyQueue
&Version=2012-11-05
&AUTHPARAMS
```

### Important

Queue names and queue URLs are case sensitive. The structure of AUTHPARAMS depends on the signature of the API request. 

Executing a GET request
----------------------

The Cloud Queues GET request is structured as a URL that consists of the following:

* **Endpoint** - the resource that the request is valid for (queue name and URL ), for example: https://sqs.mcs.mail.ru/123456789012/MyQueue
* **Action** - the action you want to perform on the endpoint. Question mark (?) separates the endpoint from the action, for example: ?Action=SendMessage&MessageBody=Your%20Message%20Text
* **Parameters** - any query parameters - each parameter is separated by an ampersand (&), for example: &Version=2012-11-05&AUTHPARAMS

Below is an example of a GET request that sends a message to the VK CS SQS queue.

```
https://sqs.mcs.mail.ru/123456789012/MyQueue
?Action=SendMessage&MessageBody=Your message text
&Version=2012-11-05
&AUTHPARAMS
```

### Important

Queue names and queue URLs are case sensitive.

Since GET requests are URLs, you must URL-encode all parameter values. Since spaces cannot be used in URLs, each space is encoded as %20. (The rest of the example is not encoded in the URL for easier reading.)

Executing a POST request
-----------------------

The Cloud Queues POST Request sends the request parameters as a form in the body of the HTTP request.

Below is an example of an HTTP header with the Content-Type value application/x-www-form-urlencoded.

```
POST /123456789012/MyQueue HTTP/1.1
Host: sqs.mcs.mail.ru
Content-Type: application/x-www-form-urlencoded
```

The header is followed by a request that sends a message to the Cloud Queues queue. Each parameter is separated by an ampersand ( & ). 

```
Action=SendMessage
&MessageBody=Your+Message+Text
&Expires=2020-10-15T12:00:00Z
&Version=2012-11-05
&AUTHPARAMS
```

### Important

Content-Type requires only the HTTP header. AUTHPARAMS is the same as in the GET query. Your HTTP client can add other elements to the HTTP request depending on the version of the HTTP client.