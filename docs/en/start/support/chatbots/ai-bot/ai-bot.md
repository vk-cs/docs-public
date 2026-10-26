# {heading({var(cloud)} AI assistant)[id=support-ai-bot]}

{include(/en/_includes/_translated_by_ai_en.md)}

The AI assistant is a bot in MAX and Telegram based on artificial intelligence. It answers questions about the {var(cloud)} platform services, relying on the public documentation. The bot understands natural speech, and you can communicate with it as with a human.

The AI assistant works only with the public documentation and has no access to {var(cloud)} internal systems. For example, it cannot answer questions about the status of your requests to technical support.

## {heading(How to use the AI assistant)[id=support-ai-bot-using]}

1.	Go to the AI assistant via direct links [in MAX](https://max.ru/vk_tech_support_bot) or [in Telegram](https://t.me/vk_cloud_support_bot), or find it manually by entering `@vk_cloud_support_bot` or `VK Cloud AI assistant` in the search bar.

1.	Ask the bot a question as if you were talking to a human. The more detailed you describe what interests you, the more accurate the bot's answer will be.

      {note:info}
      The bot needs a few minutes to prepare an answer.
      {/note}

      To get the most useful and complete answer, follow these recommendations:

      * Ask questions one at a time. If you ask several questions in one message, the bot may fail to find answers to all of them in the documentation at once.
      * If possible, specify which {var(cloud)} service your question relates to. This gives the bot additional context and makes its answer more accurate.
      * The bot uses the terminology adopted in the {var(cloud)} public documentation. If possible, use the same terminology in your questions.

         Example: answers to questions about Arenadata DB will be more relevant than answers to questions about Greenplum. The {linkto(../../../../dbs/adb#adb-adb)[text=Arenadata DB]} service is indeed based on Greenplum, but in the documentation it is called Arenadata DB.

      * Avoid slang and abbreviations; the bot may not understand them. For example, the documentation for shared networks does not use the term "shared networks" (slang), and "legal entities" is not shortened to colloquial forms.

      {note:warn}
      To protect confidential information, do not use personal data, logins, and passwords in your questions. The AI assistant does not require such information to operate.
      {/note}

      {cut(Examples of questions the bot handles well)}

      * How to deploy a virtual machine using terraform?
      * How to configure security groups?

      {/cut}

      {cut(Example of a question the bot will answer inaccurately)}

      Consider the question: "cluster scaling". What difficulties will the bot face when answering?

      * {var(cloud)} has many different clusters: a Kubernetes cluster, a Spark cluster, clusters of various databases, an Arenadata DB cluster, etc. The bot does not know which cluster the user means.

         If you specify the required service in the question, the bot's answer will be more accurate. Example: "Kubernetes cluster scaling".

      * The bot does not know what exactly the user wants to learn about cluster scaling.

         If you make the question more detailed, the bot will find the most relevant information on this topic in the {var(cloud)} documentation. Examples of detailing:

         * How to scale a Kubernetes cluster in the management console?
         * How to configure automatic scaling of a Kubernetes cluster?
         * Which databases support cluster scaling?

      {/cut}

1. To make sure the answer is correct, check the documentation links attached to it. If all the links are irrelevant, the answer will not be complete and accurate enough. In this case, try to clarify the question: describe the problem in more detail and specify the subject area and terms.

    {cut(Example of an irrelevant answer)}

    You asked about a VM or a database, but the links show that the AI assistant used only the documentation for the 1С ГРМ service or Marketplace. Most likely, these are not the sections needed to answer your question. Try to clarify the question.

    {/cut}

1. Rate the usefulness of the answer by clicking one of the suggested buttons. Your feedback will help improve the AI assistant.

If the AI assistant could not help you, contact technical support using the contact information provided in the chat.

## {heading(What the AI assistant can do)[id=support-ai-bot-what-can-do]}

* Search for information in the {var(cloud)} documentation taking into account the context of the question. The AI assistant provides detailed answers and links to the source sections.
* Write Terraform scripts to solve various tasks, for example, to create a Kubernetes cluster.
* Advise on problems when using {var(cloud)} services. For example, the bot will help you deal with errors when connecting to virtual machines.
* Explain how to build and implement solutions based on the {var(cloud)} platform. For example, the bot can tell you how to build a Lakehouse solution or how to make an application fault-tolerant.
* Provide instructions on how to place applications in the {var(cloud)} store.

## {heading(How the AI assistant works)[id=support-ai-bot-how-works]}

The AI assistant uses an [LLM](https://ru.wikipedia.org/wiki/Большая_языковая_модель) (Large Language Model) — a neural linguistic network trained on a large amount of data to understand and process texts in natural languages. To interact with the LLM, the AI assistant uses the [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) (Retrieval Augmented Generation) method, i.e., it supplements the user's question with *context* — a set of texts obtained by searching for relevant information in the {var(cloud)} public documentation.

Preliminarily, the {var(cloud)} documentation text is split into *chunks* (articles or their parts expressing a complete thought or a chain of thoughts). Each chunk is associated with an *embedding* — an ordered set of numbers calculated by a specific algorithm. For more information about embeddings, see the [article](https://www.nkj.ru/open/36052/).

Here is what happens next:

1. The user asks the AI assistant a question.
1. The embedding of the question is calculated, and the embeddings in the {var(cloud)} documentation that are closest to it "in meaning" are selected.
1. The context is formed from the text of the chunks corresponding to the selected embeddings.
1. The context is combined with the user's question and passed to the LLM input.
1. The LLM returns an answer, which is displayed in the chat.

## {heading(About protection against misuse)[id=support-ai-bot-protection]}

An LLM can solve a wider range of tasks than those of the AI assistant, for example, generate a marketing text or help a student with homework. To prevent misuse of the AI assistant, a multi-level protection system has been developed, which is based on an ML model (a machine learning model). A sign that the protection has been triggered is a message from the bot asking you to rephrase the question or description of the problem.

If you believe your question is correct and the protection was triggered falsely, report it to the bot administrator. This will help further train the ML model and reduce the number of false triggers.