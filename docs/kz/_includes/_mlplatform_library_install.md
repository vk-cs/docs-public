Python үшін Cloud ML Platform кітапханасын орнату үшін:

1. Python-мен жұмыс істеуге арналған ортаны кез келген ыңғайлы тәсілмен дайындаңыз:

   {tabs}

   {tab(VK Cloud көмегімен)}

   VK Cloud жобасында [JupyterHub инстансын жасаңыз](/kz/ml/mlplatform/jupyterhub/instructions/create). Оның құрамында JupyterHub блокнотынан (notebook) жұмыс істеуге болатын бапталған Python 3.x және pip бұрыннан бар.

   {/tab}

   {tab(Өз бетінше)}

    1. 3.9 немесе одан жоғары нұсқадағы Python және pip орнатыңыз.
    1. Қажет болса, Python үшін виртуалды ортаны (virtual environment) баптаңыз.

   Мысалы, [conda](https://conda.io/projects/conda/en/latest/index.html) құралын пайдалануға немесе осы қадамдарды қолмен орындауға болады.

   {/tab}

   {/tabs}

1. Кітапхананы орнатыңыз:

   {tabs}

   {tab(JupyterHub)}

    1. [JupyterHub инстансына қосылыңыз](/kz/ml/mlplatform/jupyterhub/instructions/connect).
    1. JupyterHub блокнотында келесі мазмұндағы ұяшықты жасап, оны орындаңыз:

       ```console
       %pip install https://mlplatform.hb.ru-kz.vkcloud-storage.ru/mlplatform_client.tar.gz
       ```

   {/tab}

   {tab(pip)}

   Команданы орындаңыз:

   ```console
   pip install https://mlplatform.hb.ru-kz.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   {/tab}

   {/tabs}

   Келтірілген сілтеме бойынша кітапхананың өзекті нұсқасы қолжетімді.
