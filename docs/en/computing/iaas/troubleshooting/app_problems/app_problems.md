# {heading(Application operation problems)[id=iaas-app-problems]}

{include(/en/_includes/_translated_by_ai_en.md)}

An application hosted on a VM has started experiencing problems. Example: files have stopped uploading.

The problems can be caused by various reasons.

### {heading(Solution)[id=iaas-app-problems-decision]}

1. Check the VM status in the {ifdef(public)}[{var(cloud)} management console](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text={var(cloud)} management console]}{/ifdef} in the **Cloud Computing** → **Virtual Machines** section. Make sure the VM status is `Active`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Check]} the security groups. Make sure there is a rule that allows incoming traffic to the required port.
1. Analyze the application logs.
1. Check if the VM has enough resources: free disk space, CPU and RAM.
1. Check the access permissions for the directories.