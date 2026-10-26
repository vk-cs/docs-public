# {heading(Slow disk performance)[id=iaas-slow-disk]}

{include(/en/_includes/_translated_by_ai_en.md)}

Disk performance can be affected by the following factors:

- background processes of the operating system;
- backup mechanisms;
- automatic updates (relevant for Windows);
- running third-party software.

### {heading(Solution)[id=iaas-slow-disk-decision]}

1. Make sure that the factors listed above are absent.
1. Collect disk performance statistics using one of the methods:

   - `disk utilization` — using the `iostat` [utility](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html);
   - `load average` — [using](https://www.digitalocean.com/community/tutorials/load-average-in-linux) `top`.

1. Compare the obtained metrics with the {linkto(../../../../computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla)[text=guaranteed disk performance]} provided by {var(cloud)}. If significant deviations are observed, contact [technical support](/en/contacts).

   {note:info}
   To increase performance, you can {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-chance-disk-type)[text=change the disk type]}.
   {/note}