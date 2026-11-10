# {heading(Cloud Airflow)[id=dlh_airflow]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

{linkto(../../../../airflow/concepts/about#airflow_info)[text=Cloud Airflow]} – бұл деректер ағындарының оркестраторы және жоғары өнімді, масштабталатын нақты уақыттағы қосымшалар үшін ETL және ELT процестерін іске қосуды басқару құралы. DLH архитектурасына қойманы {linkto(../../architecture#dlh_data_processing_models)[text=PULL-моделі]} бойынша деректер көздерімен интеграциялау қажет болған жағдайда қосымша опция ретінде енгізіледі.

Компонент келесі функцияларды орындайды:

- DLH-та ETL және ELT процестерін іске қосуды басқару.
- Құрылымдалмаған деректер көздерін файл алмасу режимінде S3-қоймасымен тікелей интеграциялау.
- IN немесе OUT периодтық операцияларының орындалу кестесін құру.
- ETL және ELT процестерінің орындалуын мониторингтеу және диагностикалық хабарламаларды жіберу.
- {linkto(../iceberg#dlh_iceberg)[text=Cloud Iceberg Metastore]} компонентінің API арқылы S3-қоймасынан деректерді оқу.