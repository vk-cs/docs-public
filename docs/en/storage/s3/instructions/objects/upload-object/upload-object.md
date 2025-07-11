The created bucket can be loaded with files that are saved as an Cloud Storage object. Objects are composed of file data and metadata describing the object. The bucket can contain an unlimited number of objects.

You can upload any type of file - images, backups, data, movies, etc. - to the bucket. The maximum size of a regular file that can be uploaded to a bucket is 32 GB. For files that exceed this size, you must use the multipart upload and store method. For a comfortable download of a file larger than 1 GB, it is recommended to use the AWS S3 CLI or Cloud Storage REST API.

## Loading from VK Cloud Panel

To load objects, go to the created bucket in the "Buckets" section of the "Object Storage" service.

{note:info}

To load folders through the VK Cloud Panel interface, they must be dragged into the loading window using the Drag & Drop function. You can drag and drop files to upload files or select them using the Select Files button. The drag and drop functionality is only supported for Chrome and Firefox browsers.

{/note}

When loading a folder, Cloud Storage loads all files and subfolders from the specified folder into the bucket. It then assigns a key object name, which is a combination of the downloaded file name and the folder name. For example, if you download a folder named / images that contains two files, sample1.jpg and sample2.jpg, Cloud Storage downloads the files and then assigns the appropriate key names, images / sample1.jpg and images / sample2.jpg. Key names include the folder name as a prefix. The VK Cloud panel displays only the part of the key name that follows the last "/". For example, in the images folder, the images / sample1.jpg and images / sample2.jpg objects appear as sample1.jpg and sample2.jpg.

If an object with a key name that already exists in the bucket is loaded, Cloud Storage replaces the existing object.

## Booting from AWS CLI

S3 CLI provides several options for loading objects:

The following command copies the file to the specified bucket and sets the key:

```console
 aws s3 cp test.txt s3: //mybucket/test2.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

For the convenience of loading files from a local directory, you can apply synchronization of objects, the keys of which will be automatically generated after the completion of loading objects into the specified bucket.

If objects already exist in the bucket, then the files are subject to synchronization:

- The size of which is different from the size of the object Cloud Storage
- Local file last modified time is newer than Cloud Storage object last modified time
- Local file does not exist in the specified bucket

```console
 aws s3 sync <local_path> s3: // <package_name> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

A complete description of copying and moving objects and files is available in the [official S3 CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis).
