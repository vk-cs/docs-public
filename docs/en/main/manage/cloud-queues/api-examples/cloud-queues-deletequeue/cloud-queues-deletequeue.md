The request deletes the queue specified in 'QueueUrl', regardless of its contents.

### Important

Be careful with the deletequeue action: when you delete a queue, all messages in it are no longer available.

When deleting a queue, the deletion process takes up to 60 seconds. Requests sent by you in this queue within 60 seconds can be executed successfully. For example, the request may be successful, but after 60 seconds the queue and the message you sent no longer exist.

When deleting a queue, you must wait at least 60 seconds before creating a queue with the same name.

## Request Parameters

**QueueUrl**

The URL of the VK Cloud SQS queue to be deleted.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Mistakes

#### Error response structure

In case of an unsuccessful request, VK Cloud SQS always returns the main element of the ErrorResponse response. This element contains the Error element and the RequestId element.

**Error** The element contains the following child elements:

- **Type** \- Indicates whether the error was a manufacturer's or consumer's error.
- **Code** \- Indicates the type of error.
- **Message** \- Indicates the error status in a readable format.
- **Detail**\- (Optional) Specifies additional information about the error.

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

## Examples

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=DeleteQueue
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<DeleteQueueResponse>
    <ResponseMetadata>
        <RequestId>6fde8d1e-52cd-4581-8cd9-c512f4c64223</RequestId>
    </ResponseMetadata>
</DeleteQueueResponse>
```
