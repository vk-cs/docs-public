# {heading(Tags)[id=iaas-tags]}

{include(/en/_includes/_translated_by_ai_en.md)}

A tag is a string used to classify virtual machines in {var(cloud)}. Tags allow you to group VMs, for example by environment, team, or purpose, and find the needed ones faster during {ifndef(private-cert)}[filtering](../../../instructions/vm/vm-filter){/ifndef}{ifdef(private-cert)}filtering{/ifdef}.

You can [assign](../../../instructions/vm/vm-manage#assigning_tags) a tag to a virtual machine by specifying its name and color. In the OpenStack CLI, a tag has the format `<NAME>^<COLOR>`, for example `env:prod^positive`. The color is specified by one of the following values:

- `validation` — purple;
- `negative` — red;
- `positive` — green;
- `neutral` — gray;
- `info` — blue;
- `light` — white;
- `warning` — orange.

The following restrictions apply to tags:

- a tag cannot be empty;
- the maximum length of a single tag is 60 characters, including the color designation;
- the characters `/` and `,` are forbidden;
- a single VM can have no more than 50 tags;
- tags are case-sensitive: for example, `Prod` and `prod` are different tags.
