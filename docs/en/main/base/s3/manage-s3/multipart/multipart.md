VK CS provides a mechanism for working with large files that might be too large to upload a file to a bucket one time using the GUI or CLI.

Multiple (multipart) loading allows you to load one object as a set of parts. Each piece is a contiguous piece of object data. You can load these parts of the object independently and in any order. If the transfer of a part is unsuccessful, you can re-transmit that part without affecting other parts. After all the parts of the object are loaded, VK CS assembles these parts and creates the object. Generally, when an object reaches 100MB in size, it is a good idea to consider using multipart loading instead of loading the object in one operation.

Using a composite load has the following benefits:

- Improved performance - You can load parts in parallel to improve performance.
- Fast recovery for any network problem - The smaller chunk size minimizes the impact of a failed boot restart due to a network error.
- Pause and Resume Object Loading - You can download portions of an object over time. After a multipart download is initiated, there is no expiration date; you must explicitly complete or cancel a compound load.
- Start loading before the final size of the object is known - you can load the object as it is created.
