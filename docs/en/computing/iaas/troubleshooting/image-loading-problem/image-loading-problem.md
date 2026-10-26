# {heading(Cannot upload a VM image)[id=iaas-image-loading-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

Problems with uploading a virtual machine image may occur due to the following reasons:

- the uploaded file is too large;
- the file format is not compatible with {var(cloud)};
- the limit on the total volume of images has been exhausted.

### {heading(Solution)[id=iaas-image-loading-problem-decision]}

1. Make sure the uploaded file format is RAW. If your image is in a different format, {linkto(../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=convert it]}.
1. Make sure the size of the uploaded file does not exceed 500 GB. {ifdef(public)}If you need to upload a larger image, use the {linkto(../../../../storage/s3/how-to-guides/load-large-image#s3-load-large-image)[text=instruction]}{/ifdef}.
1. Try to {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=upload the image]} using OpenStack CLI.
1. If the problem persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.

{ifdef(public)}
{note:info}
The limit on the total volume of uploaded images is 2 TB. To increase the limit, contact [technical support](/en/contacts).
{/note}
{/ifdef}