# {heading(iOS мобильді қосымшасына қосылу)[id=captcha-connect-ios]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. VK Капча SDK жүктеп алыңыз:

   {tabs}

   {tab(Swift Package Manager)}

   1. `Package.swift` файлында кітапхананы тәуелділіктерге қосыңыз:

      ```swift
      dependencies: \[ 
        .package(url: "https://github.com/VKCOM/vkid-captcha-ios-sdk", .upToNextMajor(from: "<ВЕРСИЯ>"))
      \]
      ```
      Мұнда `<ВЕРСИЯ>` — iOS Swift Package Manager арналған VK Капча SDK нұсқасы (`0.1.0`)

   1. [Жүктеп алыңыз](https://artifactory-external.vkpartner.ru/artifactory/vk-id-captcha/ios/VKCaptchaSDK-0.1.0.zip) ZIP-архивті және оны тарқатыңыз.

   1. Жобаңызға архивтен `VKCaptchaSDKResources.bundle` файлын қосыңыз.

   {/tab}

   {tab(CocoaPods)}

   1. Кітапхананы `Podfile` файлына қосыңыз:

      ```ruby
      `source 'https://github.com/VKCOM/vkid-captcha-ios-sdk.git' `
      `pod 'VKCaptchaSDK', '~> <ВЕРСИЯ>'`
      ```
      Мұнда `<ВЕРСИЯ>` — iOS CocoaPods арналған VK Капча SDK нұсқасы (`0.1.1`).

   1. `Podfile` файлы орналасқан каталогта командаға орындаңыз:

      ```console
      pod install --repo-update
      ```

   {/tab}

   {/tabs}

1. {linkto(../connect-backend#captcha-connect-backend)[text=Бэкендтен]} капча виджетін іске қосуға арналған сілтемені алыңыз.

1. Капча конфигурациясын жасаңыз. Ол үшін {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-init)[text=VKCaptchaConfiguration(url:)]} конфигурациялық нысанын пайдаланыңыз.

1. Капчаны пайдаланушыға көрсетіңіз. Ол үшін SDK-ның {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-show)[text=VKCaptcha.getCaptchaViewController(completion:)]} әдісін пайдаланыңыз.

1. Капчадан өту нәтижесін өңдеңіз:

   - Егер әдіс капчадан сәтті өту токенін қайтарса, оны валидациялау үшін бэкендке жіберіңіз.
   - Егер пайдаланушы капчаны жапса, бэкендке ештеңе жіберілмейді. Бұл жағдайда фронтендте не болатынын анықтаңыз.

Swift тіліндегі код мысалы:

```swift
import VKCaptchaSDK

struct APIResponse: Decodable {
   let captchaUrl: String?
}

func handleCaptcha(captchaUrl: URL) {
   let config = VKCaptchaConfiguration(url: captchaUrl) // Бэкендтен алынған капча виджетін іске қосу сілтемесі сессиялық токенді қамтиды
   let captcha = VKCaptcha(configuration: config)

   let vc = captcha.getCaptchaViewController { [weak self] result in
      switch result {
         case .success(let token):
            self?.repeatRequest(with: token)
         case .failure:
                 // Капчаны жабу өңдеуі
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
         // Капчасыз сәтті жауапты өңдеу
         return
      }

      DispatchQueue.main.async { [weak self] in
         self?.handleCaptcha(captchaUrl: captchaUrl)
      }
   }.resume()
}
```