# {heading(Endpoints)[id=spark-endpoints]}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Spark provides endpoints for working with the service: Spark Connect and Spark Service. The endpoints are displayed on the service instance page on the **General information** tab.

## {heading(Spark Connect)[id=spark-endpoints-connect]}

The Spark Connect endpoint allows you to work with Spark as a remote execution environment, connect to Spark from Jupyter Notebook or an IDE, and execute code line by line. To connect the endpoint, specify it in the `SPARK_CONNECT_HOST` variable in your client script.

## {heading(Spark Service)[id=spark-endpoints-service]}

The Spark Service endpoint can be used in two ways:

- Viewing interactive logs of completed Spark jobs in the History Server service via a browser. To go to the service, click the endpoint on the **General information** tab. For more information about working with the service, see the instruction {linkto(../../instructions/interactive_logs#spark_interactive_logs)[text=Viewing interactive logs]}.
- Connecting to the Spark cluster from a Spark job script. To do this, specify the endpoint in the `HOST` variable in the job script.