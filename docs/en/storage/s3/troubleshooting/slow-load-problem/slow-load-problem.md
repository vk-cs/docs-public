# {heading(Slow upload of large files via AWS CLI)[id=s3-slow-load-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

Uploading files larger than 100 MB via AWS CLI occurs at a speed significantly below the bandwidth of the Internet channel.

When transferring files over a single TCP connection, the problem may occur due to high network latency. To make maximum use of the Internet channel bandwidth, upload a file in multiple threads simultaneously. To do this, use {linkto(../../concepts/features#s3-concepts-features-object-uploading)[text=multipart upload]} and choose the number of file parts uploaded simultaneously and their size that best suits your situation:

- Increasing the size of each part reduces the total number of API requests and service traffic, which reduces the total traffic volume.
- Increasing the number of parts uploaded in parallel reduces the total file upload time. However, this approach is limited by the capacity of your processor and the bandwidth of the Internet channel.

### {heading(Solution)[id=s3-slow-load-problem-resolve]}

1. Make sure that the `aws s3 cp` command is used to upload objects to a bucket via AWS CLI, not `aws s3api put-object`. The `aws s3 cp` command automatically uses multipart upload for objects whose size exceeds the value of the `multipart_threshold` parameter (8 MB by default).

1. Optimize the multipart upload settings:

   ```console
   aws configure set default.s3.<PARAMETER_NAME> <VALUE>
   ```

   Where:

   - `<PARAMETER_NAME>` — the name of the multipart upload parameter:

     - `multipart_threshold`: the minimum file size required for multipart upload (8 MB by default).
     - `multipart_chunksize`: the size of file parts during multipart upload (8 MB by default).
     - `max_concurrent_requests`: the number of file parts that will be uploaded in parallel (10 by default).

   - `<VALUE>` — the new value of the multipart upload parameter.

   {cut(Command examples)}

   ```console
   aws configure set default.s3.multipart_chunksize 16MB
   ```
   
   ```console
   aws configure set default.s3.max_concurrent_requests 20
   ```

   {/cut}

   {note:warn}
   The maximum number of object parts is 10000. When choosing the value of the `multipart_chunksize` parameter, make sure that the total number of parts for the largest file does not exceed this limit.
   {/note}