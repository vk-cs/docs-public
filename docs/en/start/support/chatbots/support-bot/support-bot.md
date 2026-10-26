# {heading(AI consultant {var(cloud)})[id=support-bot]}

{include(/en/_includes/_translated_by_ai_en.md)}

VK Tech Support is a bot in MAX and Telegram that allows you to manage technical support requests. Using the bot, you can:

- create new requests;
- receive notifications in the chat about changes in your requests;
- find out the current status of requests;
- add comments to requests and view technical support comments;
- return a completed request to work if the issue has not been resolved;
- rate the quality of request handling.

To use these features, register with the chat bot.

## {heading(Registration in the chat bot)[id=support-bot-reg]}

1. Go to the [VK Tech technical support portal](https://support.mcs.mail.ru/).
1. Sign in with the username and password received upon registration on the portal.

{tabs}

{tab(MAX)}

{include(../../../../_includes/_max-support-bot.md)[tags=registration_max_bot]}

{/tab}

{tab(Telegram)}

{include(../../../../_includes/_tg-support-bot.md)[tags=registration_tg_bot]}

{/tab}

{/tabs}

## {heading(Creating a technical support request)[id=support-bot-creatе-request]}

{tabs}

{tab(MAX)}

{include(../../../../_includes/_max-support-bot.md)[tags=create_request_max_bot]}

{/tab}

{tab(Telegram)}

{include(../../../../_includes/_tg-support-bot.md)[tags=create_request_tg_bot]}

{/tab}

{/tabs}

## {heading(Managing requests)[id=support-bot-manage-request]}

Using the bot, you can work with requests and interact with technical support.

1. To request a list of requests, select **List of open requests** from the menu or type the `/tickets` command in the input field.

    The bot will display a list of active requests with their numbers, subjects, and current statuses.

1. To view more detailed information about a request, select its number.

    Additional information about the selected request will be displayed:

    - the customer's email address to which the technical support response will be duplicated;
    - the email address of the request initiator;
    - the current priority;
    - the exact creation time.

Once a request is completed, a notification will arrive in the chat. The bot will offer options for your next action:

{tabs}

{tab(Rate the completion)}

1. Select **Rate the completion**.
1. Rate your satisfaction with the request completion on a five-point scale.
1. (Optional) Write a comment.

{note:info}

After the rating is submitted, the request will automatically change to the **Closed** status, and work on it will be stopped.

{/note}

{/tab}

{tab(Return to work)}

1. Select **Return to work**.
1. Select the **Yes** option.
1. In the text field that opens, write the reason for the return.

{/tab}

{tab(View the request)}

1. Select **View the request**.
1. Review the information about the request.

{/tab}

{/tabs}

## {heading(Using the technical support chat bot in a group)[id=support-bot-use]}

You can add the chat bot to any group in MAX or Telegram. This allows you to quickly create technical support requests directly from messages in the group.

{tabs}

{tab(MAX)}

1. Go to the desired group in MAX.
1. Open the list of group members and add the VK Tech Support bot to it.
1. To allow the bot to register technical support requests, grant it group administrator rights:

   1. Switch to the group editing mode.
   1. Find the VK Tech Support bot in the list of members.
   1. Click ![ ](../../../../assets/more-icon.svg "inline").
   1. Select **Assign as administrator**.
   1. (Optional) Edit the rights for the new administrator.
   1. Click **Done** or **Save**.

1. Configure the chat bot for operation in the group.

   1. Type the `/main` command in the input field.
   1. Select the desired service from the list offered by the bot.

   The bot connection and configuration for use in the group are complete.

{/tab}

{tab(Telegram)}

1. Go to the desired group in Telegram.
1. Open the list of group members and add the VK Tech Support bot to it.
1. To allow the bot to register technical support requests, grant it group administrator rights:

   1. Switch to the group editing mode.
   1. Select **Administrators**.
   1. Select **Add administrator** or click the corresponding button.
   1. Select the member — VK Tech Support.
   1. (Optional) Edit the rights for the new administrator.
   1. Click **Done** or **Save**.

1. Configure the chat bot for operation in the group.

   1. On the group page, type the `/config@vk_tech_support_bot` command in the input field.
   1. Select the desired service from the list offered by the bot.

   The bot connection and configuration for use in the group are complete.

{/tab}

{/tabs}

Create technical support requests in the group in one of the following ways:

- Describe the issue in a message (at least 10 characters) and include a mention of the bot: `@vk_tech_support_bot`.
- Reply to a message describing the issue — your own or another group member's — and include a mention of the bot: `@vk_tech_support_bot`.

{note:info}

Only group members who have registered with the technical support chat bot can create requests. Other members will be prompted by the bot to register when attempting to create a request.

{/note}

When the status of created requests changes, the bot will send notifications to the group and to the personal messages of the request author.