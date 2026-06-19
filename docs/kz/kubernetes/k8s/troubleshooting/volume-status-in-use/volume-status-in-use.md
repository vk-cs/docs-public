{include(/kz/_includes/_translated_by_ai.md)}

Под қайта жасалған кезде `Volume status is in-use` қатесі тұрақты том ескі тораптан ажыратылып үлгермегенде пайда болады. Бұл Kubernetes пен OpenStack өзара әрекеттесуінің ерекшелігі. 

### Шешім

1. [Cinder CSI](/kz/kubernetes/k8s/concepts/storage#k8s-storage-csi) нұсқасын тексеріп, қажет болса жаңартыңыз.
1. Егер тұрақты том ұзақ уақыт бойы тұрып қалса, мәртебесін бұғаттан шығару үшін оны OpenStack CLI арқылы қолмен ажыратыңыз:
   ```console
   openstack server remove volume
   ```
