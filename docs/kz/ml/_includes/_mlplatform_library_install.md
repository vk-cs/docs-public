Python үшін Cloud ML Platform кітапханасын орнату үшін:

1. Python-пен жұмыс істеуге арналған ортаны кез келген ыңғайлы тәсілмен дайындаңыз:

   {tabs}

   {tab(VK Cloud көмегімен)}

   VK Cloud жобасында [JupyterHub инстансын жасаңыз](/kz/ml/mlplatform/jupyterhub/instructions/create). Онда JupyterHub блокнотынан (notebook) жұмыс істеуге болатын бапталған Python 3.x және pip бар.

   {/tab}

   {tab(Өздігінен)}

   1. Python 3.9 немесе одан жоғары нұсқасын және pip орнатыңыз.
   1. Қажет болса, Python үшін виртуалды ортаны (virtual environment) баптаңыз.

   Мысалы, [conda](https://conda.io/projects/conda/en/latest/index.html) пайдалануға немесе осы қадамдарды қолмен орындауға болады.

   {/tab}

   {/tabs}

1. Кітапхананы орнатыңыз:

   {tabs}

   {tab(JupyterHub)}

   1. [JupyterHub инстансына қосылыңыз](/kz/ml/mlplatform/jupyterhub/instructions/connect).
   1. JupyterHub блокнотында келесі мазмұндағы ұяшықты жасап, орындаңыз:

      ```console
      %pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
      ```

   {/tab}

   {tab(pip)}

   Команданы орындаңыз:

   ```console
   pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   {/tab}

   {/tabs}

   Көрсетілген сілтеме бойынша кітапхананың өзекті нұсқасы қолжетімді.
