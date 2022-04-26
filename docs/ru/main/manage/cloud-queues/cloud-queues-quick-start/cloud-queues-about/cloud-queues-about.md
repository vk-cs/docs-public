VK Cloud Solutions Queues предлагает безопасный, надежный и доступный сервис очередей, который позволяет интегрировать и разделять распределенные программные системы и компоненты.

## Преимущества использования VK Cloud Solutions Queues

- Безопасность — вы контролируете, кто может отправлять сообщения и получать сообщения из очереди Cloud Queues.
- Надежность — чтобы обеспечить безопасность ваших сообщений, Cloud Queues хранит их на нескольких серверах. Стандартные очереди поддерживают как минимум однократную доставку сообщений, а очереди FIFO поддерживают однократную обработку сообщений.
- Доступность — Cloud Queues использует избыточную инфраструктуру для обеспечения одновременного доступа к сообщениям и высокой доступности для создания и использования сообщений.
- Масштабируемость — Cloud Queues может обрабатывать каждый буферизованный запрос независимо, прозрачно масштабируясь для обработки любого увеличения или пиков нагрузки без каких—либо дополнительных действий по обеспечению стабильности.
- Настройка — ваши очереди не обязательно должны быть одинаковыми — например, вы можете установить задержку по умолчанию для очереди.;

## Типы очередей

В следующей таблице описаны возможности стандартных очередей и очередей FIFO.

<table style="width: 100%;">
   <tbody>
      <tr>
         <td style="width: 50%; background—color: rgb(239, 239, 239);"><strong>Стандартная очередь</strong></td>
         <td style="width: 50%; background—color: rgb(239, 239, 239);"><strong>Очередь FIFO</strong></td>
      </tr>
      <tr>
         <td style="width: 50.0000%;">
            <p style="margin: 0px 0px 1em; padding: 0px; line—height: 1.5em;"><strong>Неограниченная пропускная способность</strong> — стандартные очереди поддерживают практически неограниченное количество вызовов API в секунду, по действиям API ( SendMessage, ReceiveMessage или DeleteMessage).</p>
            <p style="margin: 1em 0px; padding: 0px; line—height: 1.5em;"><strong>Доставка&nbsp;</strong>по крайней мере один раз — сообщение доставляется хотя бы один раз, но иногда доставляется более одной копии сообщения.</p>
            <p style="margin: 1em 0px 0px; padding: 0px; line—height: 1.5em;"><strong>Упорядочивание с максимальной эффективностью</strong> — иногда сообщения могут доставляться в порядке, отличном от того, в котором они были отправлены.</p>
            <br>
         </td>
         <td style="width: 50.0000%;">
            <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">Высокая пропускная</span> способность — при использовании пакетной обработки FIFO очереди поддерживают до 3000 транзакций в секунду по методам API ( <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">SendMessageBatch</span>, <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">ReceiveMessage&nbsp;</span>или <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">DeleteMessageBatch</span>). 3000 транзакций представляют собой 300 вызовов API, каждый с пакетом из 10 сообщений. Чтобы запросить увеличение квоты, отправьте запрос в службу поддержки. Без пакетирования FIFO очереди поддерживают до 300 API вызовов в секунду по методам API ( <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">SendMessage</span>, <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">ReceiveMessage</span>или <span style="text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">DeleteMessage</span>).
            <p style="margin: 0px 0px 1em; padding: 0px; line—height: 1.5em;"><strong>Однократная обработка</strong> — сообщение доставляется один раз и остается доступным до тех пор, пока потребитель не обработает и не удалит его. Дубликаты не помещаются в очередь.</p>
            <p style="margin: 1em 0px 0px; padding: 0px; line—height: 1.5em;"><strong>Доставка в порядке очереди</strong>. Порядок отправки и получения сообщений строго сохраняется.</p>
            <br>
         </td>
      </tr>
      <tr>
         <td style="width: 50.0000%;">
            <p style="margin: 0px 0px 1em; padding: 0px; line—height: 1.5em;">Отправляйте данные между приложениями, когда важна пропускная способность, например:</p>
            <div style="margin—bottom: 1em; orphans: 2; text—align: start; text—indent: 0px; widows: 2; text—decoration—thickness: initial; text—decoration—style: initial; text—decoration—color: initial;">
               <ul style="padding: 0px 0px 0px 2.5rem; margin: 0px; list—style—position: outside; list—style—type: disc;" type="disc">
                  <li style="line—height: 1.5em; padding—left: 0.5rem;">
                     <p>Отделите текущие запросы пользователей от интенсивной фоновой работы: позвольте пользователям загружать медиафайлы, изменяя их размер или кодируя.</p>
                  </li>
                  <li>
                     <p>Распределите задачи по нескольким рабочим узлам: обработайте большое количество запросов на проверку кредитных карт.</p>
                  </li>
                  <li style="padding—top: 0.5em; line—height: 1.5em; padding—left: 0.5rem;">
                     <p>Пакетные сообщения для обработки в будущем: запланировать добавление нескольких записей в базу данных.</p>
                  </li>
               </ul>
            </div>
            <br>
         </td>
         <td style="width: 50.0000%;">
            <p>Отправляйте данные между приложениями, когда важен порядок событий, например:</p>
            <div>
               <ul>
                  <li>
                     <p>Убедитесь, что команды, вводимые пользователем, выполняются в правильном порядке.</p>
                  </li>
                  <li>
                     <p>Отображайте правильную цену продукта, отправляя изменения цен в правильном порядке.</p>
                  </li>
                  <li>
                     <p>Запретить студенту записаться на курс до регистрации учетной записи.</p>
                  </li>
               </ul>
            </div>
            <br>
         </td>
      </tr>
   </tbody>
</table>

## Стоимость

Во время бета — запуска сервис полностью бесплатный.

По окончании периода бета — запуска сервис будет предлагаться по следующим ценам за количество запросов:

- 0 — 1,000,000 — бесплатно

- 1 миллион — 100 миллионов — 29,99 руб за 1,000,000 запросов

- 100 миллионов — 10 миллиардов — 27.49 руб за 1,000,000 запросов

- Более 10 миллиардов запросов — свяжитесь с нами чтобы узнать цену.

Расчет будет производиться ежемесячно, в указанную цену включен НДС.
