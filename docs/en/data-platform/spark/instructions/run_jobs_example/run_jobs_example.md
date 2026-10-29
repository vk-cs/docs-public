# {heading(Example of Creating and Running a Spark Job)[id=run_jobs]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

This instruction shows how to create and run Spark jobs in Cloud Spark using a script for calculating Pi as an example. All actions are divided into steps:

1. {linkto(#run_jobs_install_client)[text=Installing the Spark client]}.
1. {linkto(#run_jobs_env)[text=Preparing the environment]}.
1. {linkto(#run_jobs_create_job)[text=Creating a Spark job script]}.
1. {linkto(#run_jobs_main)[text=Creating the main script for running a Spark job]}.
1. {linkto(#run_jobs_run)[text=Running the Spark job]}.

{note:info}
Before you start, make sure that the {linkto(../create#spark_create)[text=Cloud Spark]} service instance is deployed.
{/note}

## {heading(Step 1. Installing the Spark client)[id=run_jobs_install_client]}

Connection to Cloud Spark is performed only via a special Spark client. Use one of the following two methods to install it:

- If installation via pip is available, run:

  ```bash
  pip install mlplatform_client_on_prem --index-url=https://nexus.infra.devmail.ru/repository/mlplatform-pypi/simple/ --extra-index-url=https://nexus.infra.devmail.ru/repository/pypi-proxy/simple
  ```

- If installation via pip is not available, download, unpack, and install the client matching your OS and Python version using the links below.

  {cut(Files for downloading the Spark client)}

  - [CentOS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-centos.zip)
  - [CentOS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-centos.zip)
  - [CentOS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-centos.zip)
  - [RED OS, Python 3.8](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py38-latest-redos.zip)
  - [RED OS, Python 3.9](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py39-latest-redos.zip)
  - [RED OS, Python 3.10](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py310-latest-redos.zip)
  - [RED OS, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-redos.zip)
  - [AlmaLinux, Python 3.11](https://mlplatfrom_prod.hb.ru-msk.vkcloud-storage.ru/mlplatform_client/dist-py311-latest-almalinux.zip)

  {/cut}

## {heading(Step 2. Preparing the environment)[id=run_jobs_env]}

1. Set the environment variables:
    
   ```bash
   AWS_ACCESS_KEY_ID=<ACCESS_KEY>
   AWS_REGION=<S3_REGION>
   AWS_SECRET_ACCESS_KEY=<SECRET_KEY>
   BUCKET_NAME=<S3_BUCKET_NAME>
   KEYSTONE_PASSWORD=<DATA_PLATFORM_USER_PASSWORD>
   KEYSTONE_USERNAME=<DATA_PLATFORM_USER_EMAIL>
   ML_PLATFORM_HOST=<CLOUD_SPARK_ADDRESS>
   S3_ENDPOINT=<S3_ENDPOINT>
   ```

1. Create a separate directory for running the code, into which you will copy the scripts from this instruction. Inside the directory:
  1. Place the script files.
  1. Create a `/jobs` directory, into which you will place the Spark job from the instruction below.

   Example directory structure:

   ```bash
   └── spark_kafka
      ├── jobs
      │   └── job.py
      └── main.py
   ```

## {heading(Step 3. Creating a Spark job)[id=run_jobs_create_job]}

1. In the `/jobs` directory, create a file with the `.py` extension. Example: `job.py`.
1. Put the Spark job code in the file. Use the Pi calculation script as an example:

   ```Python
   import sys 
   from operator import add
   from random import random
   
   from pyspark.sql import SparkSession
   
   
   """ Usage: pi [partitions]"""
   spark = SparkSession.builder.appName("PythonPi").getOrCreate()
   
   partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
   n = 100000 * partitions
   
   
   def f(_: int) -> float:
   x, y = random() * 2 - 1, random() * 2 - 1  # noqa: S311
   return 1 if x**2 + y**2 <= 1 else 0
   
   
   count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
   print("Pi is roughly %f" % (4.0 * count / n))
   
   spark.stop()
   ```

## {heading(Step 4. Managing the Spark job run)[id=run_jobs_main]}

1. In the root of the main directory, create a `main.py` file.
1. Put the code of the main script for running the Spark job in the file. Use the script for running the Pi calculation job as an example:

   ```Python
   from mlplatform_client.v2 import BasicAuth, SparkCluster
   from mlplatform_client.v2.clients.spark import SparkClient
   from mlplatform_client.v2.utils import wait_job_running, wait_job_succeeded
    
   def spark_demo() -> None:

# Getting the cluster (since version 1.2.*)
   cluster = SparkCluster(
   SparkClient(
   host="https://spark.bzzzd23.data.bizmrg.com",
   auth=BasicAuth(username=username, password=password),
   skip_tls_verify=True,
   )
   )
   
       nodes = cluster.top_nodes_info().nodes_usage

# Building the application manifest 
       job_name = "demo-name" 
       manifest = cluster.jobs.get_default_manifest(job_name) 
       manifest.set_executor_settings({"instances": 1, "cores": 1})

# Configuring the application manifest

# manifest.set_spark_conf({"spark.hadoop.fs.s3a.endpoint.region": "RegionOne"}) 
       print("The spark-job manifest that will run on the cluster:") 
       print(manifest.to_yaml())

# Running the application 
       job = cluster.jobs.submit_pyjob(manifest, pyfile="jobs/custom_job.py") 
       print("Waiting for the spark-job to start:") 
       wait_job_running(job, delay=8) 
       print(job.info()) 
       print("spark-job logs:") 
       print(job.logs()) 
       print("Waiting for the spark-job to complete:") 
       wait_job_succeeded(job, delay=8) 
       print("Logs of the completed spark-job:") 
       logs = job.logs() 
       print(logs) 
       print("Result of the spark-pi calculation:") 
       for log in logs.logs.split("\n"): 
           if "Pi is roughly" in log: 
               print("-" * 30) 
               print(log) 
               print("-" * 30)

# Printing the list of all running applications 
       all_jobs = cluster.jobs.list() 
       print("List of all available spark-jobs:") 
       print(all_jobs)

# Getting information about cluster resource usage 
       top_nodes = cluster.top_nodes_info() 
       print("Information on the state of the cluster nodes:") 
       print(top_nodes)

# Deleting the spark job 
       print(f"Deleting the spark-job named {job_name}") 
       job.delete() 
       print("The spark-job has been deleted") 
   
   
   if __name__ == "__main__":
   spark_demo()
   ```

## {heading(Step 5. Running the Spark job)[id=run_jobs_run]}

Go to the console and run the main script:

```bash
python main.py
```

The console will display the following output:

```bash
Result of the spark-pi calculation:
------------------------------
Pi is roughly 3.127960
------------------------------
List of all available spark-jobs:
job_name: csv-to-iceberg-bb44746b, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-10-31T14:10:41.600987+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/csv-to-iceberg-bb44746b/jobs/
job_name: demo-name, status: K8sSparkJobStatus.SUBMITTED, created_at: 2025-11-12T12:17:47.835379+00:00 ui_url: https://spark.d6bllks6.data.bizmrg.com/demo-name/jobs/
...

Information on the state of the cluster nodes:

---------------
MagnumClusterNodesUsageInfo:
---------------
╭─────────────────────────────────────┬─────────────┬─────────────┬───────────────┬────────────────┬────────────────┬──────────────────╮
│ NAME                                │ CPU USAGE   │ CPU TOTAL   │ CPU USAGE %   │ MEMORY USAGE   │ MEMORY TOTAL   │ MEMORY USAGE %   │
├─────────────────────────────────────┼─────────────┼─────────────┼───────────────┼────────────────┼────────────────┼──────────────────┤
│ dp-xntsz8kr-authservice-d6bllks6-0  │ 46.84m      │ 1.93        │ 2.4%          │ 977.17M        │ 1.39G          │ 68.9%            │
│ dp-xntsz8kr-default-group-0         │ 168.12m     │ 5.92        │ 2.8%          │ 1.66G          │ 5.60G          │ 29.5%            │
│ dp-xntsz8kr-master-0                │ 240.67m     │ 5.92        │ 4.1%          │ 3.48G          │ 5.60G          │ 62.2%            │
│ dp-xntsz8kr-sparkconnect-d6bllks6-0 │ 60.09m      │ 9.9         │ 0.6%          │ 3.12G          │ 10.90G         │ 28.6%            │
│ dp-xntsz8kr-sparkhistory-d6bllks6-0 │ 53.47m      │ 1.93        │ 2.8%          │ 1.13G          │ 2.47G          │ 45.7%            │
│ dp-xntsz8kr-sparkproxy-d6bllks6-0   │ 55.27m      │ 1.93        │ 2.9%          │ 1.20G          │ 1.39G          │ 86.3%            │
╰─────────────────────────────────────┴─────────────┴─────────────┴───────────────┴────────────────┴────────────────┴──────────────────╯
Deleting the spark-job named demo-name
The spark-job has been deleted
```