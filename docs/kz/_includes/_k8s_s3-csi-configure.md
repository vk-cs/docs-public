1. Қажет болса өңдеңіз:

   - таңдалған нұсқа;
   - қолданба атауы;
   - қосымша орнатылатын имен кеңістігінің атауы.

1. S3 үйлесімді жадымен жұмыс істеу үшін аддон кодын орнатыңыз. Ол үшін `secret` блогына қажетті мәндерді қосыңыз:
   
   ```console
   secret:
    ...
    # S3 Access Key ID
    accessKey: "<ACCESS_KEY_ID>"
    # S3 Secret Key
    secretKey: "<SECRET_KEY>"
    # The endpoint of the S3 service to be used. You can provide a custom S3 endpoint address.
    # Defaults to the VK Object Storage URL.
    endpoint: "{{ <URL_ҚОЙМАЛАР> }}"
    # The S3 service region to be used.
    region: "<АЙМАҚ>"
   ```
   Мұнда: 
   
   - `<ACCESS_KEY_ID>` және `<SECRET_KEY>` — Vk Cloud Storage есептік жазбасын жасау кезінде алынған мәндер.
   - `<URL_ҚОЙМАЛАР>` — S3 үйлесімді API сақтау нүктесі. Егер сіз Vk Cloud Storage қолдансаңыз, бұл параметрді көрсетудің қажеті жоқ, себебі ол әдепкі бойынша орнатылады.
   - `<АЙМАҚ>` — нысанды сақтау аймағы. Егер сіз VK Cloud Storage қолдансаңыз, бұл параметрді көрсетудің қажеті жоқ. Басқа нысан қоймалары үшін бұл параметр жеткізушінің ресми құжаттамасында міндетті екенін тексеріңіз.

1. Қажет болса {linkto(#k8s-install-advanced-s3-csi-edit-code)[text=енгізіңіз]} қосымшаның теңшелім кодына қосымша өзгерістер.

   {note:warn}
   Дұрыс орнатылмаған теңшеу коды қондырманы орнату немесе дұрыс жұмыс істемеу кезінде қателіктерге әкелуі мүмкін.
   {/note}