# {heading(Арналған түйіндер тобына аддонды орнату)[id=k8s-install-private-dedicated-workers]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. {var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}.
1. **Кластеры Kubernetes** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Кластерде аддондар орналасатын арналған түйіндер тобы бар екенін тексеріңіз. Мұндай топ болмаса, {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=оны қосыңыз]}.
1. Бұл түйіндер тобы үшін, егер бұрын жасалмаса, мыналарды орнатыңыз:

   * Белгі (label): кілті `addonNodes`, мәні `dedicated`.
   * Шектеу (taint): эффектісі `NoSchedule`, кілті `addonNodes`, мәні `dedicated`.

1. Кластер үшін қажетті аддонды таңдап, орнату параметрлерін көрсетіңіз. Аддон кодында `tolerations` өрістері үшін келесі ерекшеліктерді және `nodeSelector` өрістері үшін түйіндер селекторларын орнатыңыз:

   ```console
   tolerations:
     - key: "addonNodes"
       operator: "Equal"
       value: "dedicated"
       effect: "NoSchedule"

   nodeSelector:
     addonNodes: dedicated
   ```

1. **Аддонды орнату** түймесін басыңыз. Аддонды орнату ұзақ уақыт алуы мүмкін.