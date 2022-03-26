In response to a request via the VK API, CS SQS returns an XML data structure containing the results of the request. 

Structure of a successful response
--------------------------

If the request is successful, the main response element gets a name for the target action Responseappended (ActionNameResponse).

This element contains the following child elements:

* **ActionNameResult** \- Contains an element associated with the action. For example, the CreateQueueResult element contains a QueueUrl element, which in turn contains the URL of the created queue.
* **ResponseMetadata** \- Contains the RequestId, which in turn contains the UUID of the request.

Below is an example of a successful response in XML format:

```
<CreateQueueResponse
   xmlns=https://sqs.ru-east-2.mcs.mail.ru/doc/2019-12-07/
   xmlns:xsi=http://www.w3.org/2001/XMLSchema-instance
   xsi:type=CreateQueueResponse>
   <CreateQueueResult>
      <QueueUrl>https://sqs.ru-east-2.mcs.mail.ru/770098461991/queue2</QueueUrl>
   </CreateQueueResult>
   <ResponseMetadata>
      <RequestId>cb919c0a-9bce-4afe-9b48-9bdf2412bb67</RequestId>
   </ResponseMetadata>
</CreateQueueResponse>
```

Error Response structure
--------------------------

In case of an unsuccessful request, VK CS SQS always returns the main element of the ErrorResponse response. This element contains the Error element and the RequestId element.

**Error** The element contains the following child elements:

* **Type** \- Indicates whether the error was a manufacturer's or consumer's error.
* **Code** \- Indicates the type of error.
* **Message** \- Indicates the error status in a readable format.
* **Detail**\- (Optional) Specifies additional information about the error.

**RequestId** The element contains the UUID of the request.

Below is an example of an error response in XML format:

```
<ErrorResponse>
   <Error>
      <Type>Sender</Type>
      <Code>InvalidParameterValue</Code>
      <Message>
         Value (quename_nonalpha) for parameter QueueName is invalid.
         Must be an alphanumeric String of 1 to 80 in length.
      </Message>
   </Error>
   <RequestId>42d59b56-7407-4c4a-be0f-4c88daeea257</RequestId>
</ErrorResponse>
```