# {heading({var(s3)}: create a bucket in object storage and upload data to it)[id=onboarding-create-bucket]}

{include(/en/_includes/_translated_by_ai_en.md)}

[VK Object Storage](/en/storage/s3/concepts/about) is an object storage with S3 API support that provides reliable scalable storage and stable delivery speed for any objects regardless of the number of concurrent requests. {var(s3)} can be used for streaming media delivery, website hosting, and storing a wide variety of data.

Start working with the [VK Object Storage](https://cloud.vk.ru/storage/) service in any convenient way:

- Follow the {linkto(#onboarding-create-bucket-create)[text=instructions]}, create a bucket, upload an object to it, and grant access to the uploaded object via a link.
- Watch a short {linkto(#onboarding-create-bucket-video)[text=video]} in which an account that allows managing a bucket via API is created, a bucket is created and access to it is configured, and the bucket settings are demonstrated.
- Take a [lesson](https://cloud.vk.ru/cloud-native-courses/advanced/cloud-storage-s3/) from the free course. The theoretical part of the lesson covers the general characteristics, components, and functions of {var(s3)}. In the practical part, you will create a bucket and connect it to Wordpress for storing media files.
- Watch {linkto(#onboarding-create-bucket-webinars)[text=webinars]} about working with {var(s3)}.

{note:info}
The management console interface may differ from what is shown in the video and the lesson.
{/note}

## {heading(Create a bucket and place an object in it)[id=onboarding-create-bucket-create]}

After completing all the steps of this instruction, you will:

1. [Create](#create_account) an account for the {var(s3)} service.
1. [Create](#create_bucket) a bucket.
1. [Add](#create_public_object) an object with public ACL settings and grant access to it via a link.
1. [Verify](#access_check) access to the object.

{include(../../../../storage/s3/_includes/_create-bucket.md)[tags=bucket_onboarding_only,create-bucket; level=+1]}

## {heading(Video instruction)[id=video_bucket]}

This video shows how an account that allows managing a bucket via API is created, a bucket is created and access to it is configured, and the bucket settings in the {var(cloud)} management console are demonstrated.

{caption()[id=position=above;align=right;id=onboarding-create-bucket-video]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239414&hd=3)[type=vkvideo]}
{/caption}

## {heading(Training course)[id=onboarding-create-bucket-courses]}

Take a [lesson](https://cloud.vk.ru/cloud-native-courses/advanced/cloud-storage-s3/) from the free course.

The theoretical part of the lesson covers the general characteristics, components, and functions of {var(s3)}. In the practical part, you will create a bucket and connect it to Wordpress for storing media files.

## {heading(Webinars)[id=onboarding-create-bucket-webinars]}

### {heading(How to start working with object storage)[id=onboarding-create-bucket-begin]}

You will learn how to create buckets, manage access, protect information using built-in security mechanisms, and integrate {var(s3)} with other cloud products.

{cut(Webinar recording)}
{caption()[id=position=above;align=right;id=video_bucket_begin]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239395&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### {heading(How to build an efficient and resilient object storage)[id=onboarding-create-bucket-effective]}

The webinar will help you understand the technical features, architecture, data protection, and integration of {var(s3)} with other services.

{cut(Webinar recording)}
{caption()[id=position=above;align=right;id=video_bucket_effective]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239686&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### {heading(How to use object storage for storing 1C data)[id=onboarding-create-bucket-1c]}

The webinar covers the technical details of integrating {var(s3)} with 1C. Topics such as reliability, data protection, and reducing infrastructure costs are discussed.

{cut(Webinar recording)}
{caption()[id=position=above;align=right;id=video_bucket_1c]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239701&hd=3)[type=vkvideo]}
{/caption}
{/cut}