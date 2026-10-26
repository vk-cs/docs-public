# {heading(Connecting to the service)[id=directconnect-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

To connect the Cloud Direct Connect service, you need to arrange a communication channel.

There are two options for arranging the communication channel:

- You arrange the communication channel yourself.
- The communication channel is arranged by the {var(cloud)} team.

{tabs}

{tab(Self-arranged connection)}

1. Review the technical requirements and limitations:

    {include(../../../_includes/_requirements.md)}

1. Choose the communication channel parameters:

    {include(../../../_includes/_prerequisites.md)}

1. Contact your telecom partner and arrange an L2 communication channel to {var(cloud)} using the required technology. The channel is built including cross-connects to the data center racks.

1. [Create a request](https://cloud.vk.ru/direct-connect) for a Direct Connect connection.
1. After the service is connected, {linkto(../how-to-guides/advanced-router#directconnect-advanced-router)[text=configure L3 Static / BGP routing]} in your {var(cloud)} project.

{/tab}

{tab(Arranged by the {var(cloud)} team)}

{note:warn}
Communication channel arrangement works involve third parties and are performed on a paid basis.
{/note}

1. Review the technical requirements and limitations:

    {include(../../../_includes/_requirements.md)}

1. Choose the communication channel parameters:

    {include(../../../_includes/_prerequisites.md)}

1. [Create a request](https://cloud.vk.ru/direct-connect/) for a Direct Connect connection and provide information about the exact coordinates of the points of presence of your infrastructure (where the connection is built), as well as the connection type and speed.
1. Wait until a {var(cloud)} representative contacts you to agree on the project and the connection cost.
1. Wait until a {var(cloud)} representative notifies you that the communication channels in the {var(cloud)} infrastructure have been connected.
1. {linkto(../how-to-guides/advanced-router#directconnect-advanced-router)[text=Configure]} L3 Static / BGP routing in your {var(cloud)} project.

{/tab}

{/tabs}