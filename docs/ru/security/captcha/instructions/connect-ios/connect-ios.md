# {heading(Подключение к мобильному приложению на iOS)[id=captcha-connect-ios]}

1. Загрузите VK Капча SDK:

   {tabs}

   {tab(Swift Package Manager)}

   1. Добавьте библиотеку в зависимости в файле `Package.swift`:

      ```swift
      dependencies: \[ 
        .package(url: "https://github.com/VKCOM/vkid-captcha-ios-sdk", .upToNextMajor(from: "<ВЕРСИЯ>"))
      \]
      ```
      Здесь `<ВЕРСИЯ>` — версия VK Капча SDK для iOS Swift Package Manager (`0.1.0`)

   1. [Скачайте](https://artifactory-external.vkpartner.ru/artifactory/vk-id-captcha/ios/VKCaptchaSDK-0.1.0.zip) ZIP-архив и распакуйте его.

   1. Добавьте в ваш проект файл `VKCaptchaSDKResources.bundle` из архива.

   {/tab}

   {tab(CocoaPods)}

   1. Добавьте библиотеку в файл `Podfile`:

      ```ruby
      `source 'https://github.com/VKCOM/vkid-captcha-ios-sdk.git' `
      `pod 'VKCaptchaSDK', '~> <ВЕРСИЯ>'`
      ```
      Здесь `<ВЕРСИЯ>` — версия VK Капча SDK для iOS CocoaPods (`0.1.1`).

   1. Выполните команду в директории с файлом `Podfile`:

      ```console
      pod install --repo-update
      ```

   {/tab}

   {/tabs}

1. Получите от бэкенда ссылку для запуска виджета капчи.

1. Создайте конфигурацию капчи. Воспользуйтесь {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-init)[text=конфигурационным объектом]} `VKCaptchaConfiguration(url:)`.

1. Отобразите капчу пользователю. Воспользуйтесь {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-show)[text=методом SDK]} `VKCaptcha.getCaptchaViewController(completion:)`.

1. Обработайте результат прохождения капчи:

   - Если метод вернул токен успешного прохождения капчи, отправьте его бэкенду для валидации.
   - Если пользователь закрыл капчу, бэкенду ничего не отправляется. Определите, что будет происходить во фронтенде в этом случае.

Пример кода на Swift:

```swift
import VKCaptchaSDK

struct APIResponse: Decodable {
   let captchaUrl: String?
}

func handleCaptcha(captchaUrl: URL) {
   let config = VKCaptchaConfiguration(url: captchaUrl) // Ссылка для запуска виджета капчи, полученная от бэкенда, содержит сессионный токен
   let captcha = VKCaptcha(configuration: config)

   let vc = captcha.getCaptchaViewController { [weak self] result in
      switch result {
         case .success(let token):
            self?.repeatRequest(with: token)
         case .failure:
                 // Обработка закрытия капчи
                 break
      }
   }

   present(vc, animated: true)
}

func performAction() {
   URLSession.shared.dataTask(with: url) { data, _, _ in
   guard let data = data,
           let response = try? JSONDecoder().decode(APIResponse.self, from: data),
      let captchaUrlString = response.captchaUrl,
              let captchaUrl = URL(string: captchaUrlString) else {
         // Обработка успешного ответа без капчи
         return
      }

      DispatchQueue.main.async { [weak self] in
         self?.handleCaptcha(captchaUrl: captchaUrl)
      }
   }.resume()
}
```