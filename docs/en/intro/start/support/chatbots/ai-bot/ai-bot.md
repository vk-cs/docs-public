An AI consultant for VK Cloud is a Telegram bot based on artificial intelligence. It answers questions about VK Cloud platform services based on their public documentation. The bot understands natural speech, and you can communicate with it as with a person.

The AI consultant works only with public documentation and does not have access to internal systems of VK Cloud. For example, it will not be able to answer questions about the status of your technical support request.

## {heading(How to use AI consultant)[id=using_ai_bot]}

1.	Go to the AI consultant via [direct link](https://t.me/vk_cloud_support_bot) or find it in Telegram by searching `@vk_cloud_support_bot` or `ИИ-консультант VK Cloud`.

1.	Ask the bot a question as if you were asking a human. The more detailed you describe what you are interested in, the more accurately the bot can answer.

    To get the most useful and complete answer, follow these guidelines:

    * Ask one question at a time. If you ask several questions in one message, there is a chance that the bot will not be able to find answers to all questions at the same time in the documentation.
    * If possible, indicate which VK Cloud service the question relates to. This will provide the bot with additional context and make its response more accurate.
    * The bot uses the terminology accepted in the public documentation of VK Cloud. If possible, use the same terminology in your questions.

        Example: answers to questions about Arenadata DB will be more relevant than to questions about Greenplum. The [Arenadata DB](/en/dbs/adb) service is indeed based on Greenplum, but in the documentation it is called exactly Arenadata DB.

    * Avoid slang and abbreviations, as the bot may not understand them.

    <warn>

    To protect confidential information, do not use personal data, logins and passwords in your questions. Such information is not required for the AI ​consultant to work.

    </warn>

    <details>
    <summary>Examples of questions the bot handles well</summary>

    * How to create a virtual machine using terraform?
    * How to set up security groups?

    </details>

    <details>
    <summary>An example of a question that the bot will answer inaccurately</summary>

    Consider the question: "scaling a cluster". What difficulties will the bot face when answering?

    * There are many different clusters in VK Cloud: a Kubernetes cluster, a Spark cluster, clusters of different databases, an Arenadata DB cluster, etc. The bot does not know which cluster the user means.

        If you specify the required service in the question, the bot's answer will be more accurate. Example: "scaling a Kubernetes cluster".

    * The bot does not know what exactly the user wants to know about cluster scaling.

        If you specify the question in detail, the bot will find the most relevant information on this question in the VK Cloud documentation. Examples of detailing:

        * How to scale a Kubernetes cluster in my management console?
        * How to set up automatic scaling of a Kubernetes cluster?
        * For which databases is cluster scaling supported?

    </details>

1. To make sure the answer is correct, check the documentation links attached to it. If all links are irrelevant, the answer will not be complete and accurate enough. In this case, try to clarify the question: describe the problem in more detail, specify the subject area, and use more precise terms.

    <details>
    <summary>Example of an irrelevant answer</summary>

    You asked about a VM or a database, and the links show that the AI ​consultant only used documentation for the 1C GRM service or Marketplace. Most likely, these are not the sections that are needed to answer your question. Try to clarify the question.

    </details>

1. Rate the usefulness of the answer by clicking one of the buttons provided. Your feedback will help improve the AI consultant.

If the AI consultant was unable to help you, please contact technical support using the contact information provided in the chat.

## What can AI consultant do?

* Search for information in the VK Cloud documentation taking into account the context of the question. The AI consultant provides detailed answers and links to the used documentation sections.
* Write Terraform scripts to solve various problems, such as creating a Kubernetes cluster, for example.
* Provide advice on issues related to using VK Cloud services. For example, the bot will help you deal with errors when connecting to virtual machines.
* Explain how to build and implement solutions based on the VK Cloud platform. For example, the bot can tell you how to build a Lakehouse solution or how to make your application fault-tolerant.
* Provide instructions on how to publish your applications in the VK Cloud marketplace.

## {heading(How AI consultant works)[id=how_bot_works]}

The AI consultant uses an [LLM](https://en.wikipedia.org/wiki/Large_language_model) (Large Language Model) — a neural linguistic network trained on a large amount of data to understand and process texts in natural languages. To interact with the LLM, the AI ​​consultant uses the [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) method (Retrieval Augmented Generation), i.e. supplements the user's question with *context* — a set of texts obtained as a result of searching for relevant information in the VK Cloud public documentation.

Preliminary, the text of the VK Cloud documentation is divided into *chunks* (articles or their parts expressing a complete thought or chain of thoughts). Each chunk is assigned an *embedding* — an ordered set of numbers calculated according to a specific algorithm. Read more about embeddings in the [article](https://www.nkj.ru/open/36052/).

What happens next:

1. The user asks the AI ​​consultant a question.
1. The embedding of the question is calculated and the embeddings in the VK Cloud documentation that are closest to it “in meaning” are selected.
1. A context is formed from the text of the chunks that correspond to the selected embeddings.
1. The context is combined with the user's question and passed to the LLM input.
1. The LLM returns an answer that is displayed in the chat.

## About protection against improper use

The LLM can solve a wider range of tasks than the tasks of the AI ​​consultant, for example, generate a marketing text or help a student or schoolchild with homework. To prevent the misuse of the AI ​​consultant, a multi-level protection system has been developed, which is based on an ML model (machine learning model). A sign that the protection has been triggered is the bot message: “Reword the question”.

If you think your question is correct and the protection worked falsely, report this to the bot administrator. This will help to additionally train the ML model and reduce the number of false positives.
