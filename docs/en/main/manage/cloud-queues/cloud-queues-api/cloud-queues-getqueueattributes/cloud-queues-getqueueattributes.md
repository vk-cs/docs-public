The request gets attributes for the specified queue. 

Request Parameters
-----------------

**AttributeName.N**

A list of attributes to get information for.

The following attributes are supported:

* 'All` - Returns all values.
    
* 'ApproximateNumberOfMessages` - Returns the approximate number of messages available for retrieval from the queue.
    
* 'ApproximateNumberOfMessagesDelayed'\- Returns the approximate number of messages in the queue that are delayed and unavailable for immediate reading. This can happen if the queue is configured as a delayed queue or when a message has been sent with a delay parameter.
    
* 'ApproximateNumberOfMessagesNotVisible'\- Returns the approximate number of messages being transmitted. Messages are considered to be in the sending process if they have been sent to the client, but have not yet been deleted or have not reached the end of their visibility window.
    
* 'CreatedTimestamp'\- Returns the queue creation time in seconds.
    
* 'DelaySeconds` - Returns the default delay in the queue in seconds.
    
* 'LastModifiedTimestamp'\- Returns the time of the last queue change in seconds.
    
* 'MaximumMessageSize` - Returns the maximum number of bytes that a message can contain before VK CS SQS rejects it.
    
* 'MessageRetentionPeriod` - Returns the time in seconds during which VK CS SQS saves the message.
    
* 'Policy` - Returns the queue policy.
    
* 'QueueArn` - Returns the name of the VK CS (ARN) queue resource.
    
* 'ReceiveMessageWaitTimeSeconds'\- Returns the time in seconds during which the 'ReceiveMessage' action waits for the message to arrive.
    
* 'RedrivePolicy'\ is a string that includes parameters for the undelivered message queue function of the original queue in the form of a JSON object. 
    
    * 'deadLetterTargetArn'\ is the name of the VK CS resource (ARN) of the undelivered message queue, to which VK CS SQS moves messages after 'maxreceivecount' exceeds the value.
        
    * 'maxReceiveCount'\- How many times the message was delivered to the original queue before it was moved to the undelivered message queue. When the 'receivecount' for a message exceeds the `maxreceivecount' value for the queue, VK CS SQS moves the message to the undelivered message queue.
        
    
* 'VisibilityTimeout'\- Returns the visibility timeout for the queue. 
    

The following attributes apply only to server-side encryption :

* 'KmsMasterKeyId'\- Returns the ID of the AWS-managed client Master Key (CMK) for VK CS SQS or a custom CMK. 
    
* 'KmsDataKeyReusePeriodSeconds'\- Returns the time in seconds during which VK CS SQS can reuse the data key to encrypt or decrypt messages before calling AWS KMS again. 
    

The following attributes apply only to FIFO (first-in-first-out) queues :

* 'FIFOQueue'\- Returns information about whether the queue is FIFO.
    
* 'ContentBasedDeduplication'\- Returns whether content-based deduplication is enabled for the queue. 
    

Yes

Response Elements
---------------

The service returns the following item.

**Attribute**

Attribute.N.Name (key)

Attribute.N.Value (value)

A map of attributes with corresponding values.

Type: string for string matching

Valid keys: `All | Policy | VisibilityTimeout | MaximumMessageSize | MessageRetentionPeriod | ApproximateNumberOfMessages | ApproximateNumberOfMessagesNotVisible | CreatedTimestamp | LastModifiedTimestamp | QueueArn | ApproximateNumberOfMessagesDelayed | DelaySeconds | ReceiveMessageWaitTimeSeconds | RedrivePolicy | FifoQueue | ContentBasedDeduplication | KmsMasterKeyId | KmsDataKeyReusePeriodSeconds | DeduplicationScope | FifoThroughputLimit`

Mistakes
------

**InvalidAttributeName**

The specified attribute does not exist.

HTTP Status Code: 400

Examples
-------

#### example 1

In Example 1, all attribute values for the specified queue are requested. The structure of 'AUTHPARAMS' depends on the signature of the API request.

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=GetQueueAttributes
&AttributeName.1=All
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<GetQueueAttributesResponse>
  <GetQueueAttributesResult>
    <Attribute>
      <Name>ReceiveMessageWaitTimeSeconds</Name>
      <Value>2</Value>
    </Attribute>
    <Attribute>
      <Name>VisibilityTimeout</Name>
      <Value>30</Value>
    </Attribute>
    <Attribute>
      <Name>ApproximateNumberOfMessages</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>ApproximateNumberOfMessagesNotVisible</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>CreatedTimestamp</Name>
      <Value>1286771522</Value>
    </Attribute>
    <Attribute>
      <Name>LastModifiedTimestamp</Name>
      <Value>1286771522</Value>
    </Attribute>
    <Attribute>
      <Name>QueueArn</Name>
      <Value>arn:aws:sqs:us-east-2:123456789012:MyQueue</Value>
    </Attribute>
    <Attribute>
      <Name>MaximumMessageSize</Name>
      <Value>8192</Value>
    </Attribute>
    <Attribute>
      <Name>MessageRetentionPeriod</Name>
      <Value>345600</Value>
    </Attribute>
  </GetQueueAttributesResult>
  <ResponseMetadata>
    <RequestId>1ea71be5-b5a2-4f9d-b85a-945d8d08cd0b</RequestId>
  </ResponseMetadata>
</GetQueueAttributesResponse>
```

#### example 2

Example 2 requests three attribute values for the specified queue. The AUTHPARAMS structure depends on the API request signature. 

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/123456789012/MyQueue/
?Action=GetQueueAttributes
&Action=GetQueueAttributes
&AttributeName.1=VisibilityTimeout
&AttributeName.2=DelaySeconds
&AttributeName.3=ReceiveMessageWaitTimeSeconds
&Expires=2020-10-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<GetQueueAttributesResponse>
  <GetQueueAttributesResult>
    <Attribute>
      <Name>VisibilityTimeout</Name>
      <Value>30</Value>
    </Attribute>
    <Attribute>
      <Name>DelaySeconds</Name>
      <Value>0</Value>
    </Attribute>
    <Attribute>
      <Name>ReceiveMessageWaitTimeSeconds</Name>
      <Value>2</Value>
    </Attribute>
</GetQueueAttributesResponse>
```