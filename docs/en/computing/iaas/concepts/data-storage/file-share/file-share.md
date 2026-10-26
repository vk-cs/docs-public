# {heading(File storage)[id=iaas-file-share]}

{include(/en/_includes/_translated_by_ai_en.md)}

File storage is a virtual file system that can be connected to multiple virtual machines and used for shared data access. When {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-create#iaas-fs-create)[text=creating file storage]}, a network access protocol is specified (NFS or CIFS).

{note:info}
File storage can only be accessed from virtual machines within the {var(cloud)} project.
{/note}

The file storage size is set at creation time. If necessary, the file storage size can be increased; it cannot be reduced.

File storage supports snapshot creation and restore from snapshot operations.