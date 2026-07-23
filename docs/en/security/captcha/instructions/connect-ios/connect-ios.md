# {heading(Connecting to a mobile app on iOS)[id=captcha-connect-ios]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Download VK Капча SDK:

   {tabs}

   {tab(Swift Package Manager)}

   1. Add the library to the dependencies in the `Package.swift` file:

      ```swift
      dependencies: \[ 
        .package(url: "https://github.com/VKCOM/vkid-captcha-ios-sdk", .upToNextMajor(from: "<VERSION>"))
      \]
      ```
      Here `<VERSION>` is the VK Капча SDK version for iOS Swift Package Manager (`0.1.0`)

   1. [Download](https://artifactory-external.vkpartner.ru/artifactory/vk-id-captcha/ios/VKCaptchaSDK-0.1.0.zip) the ZIP archive and extract it.

   1. Add the `VKCaptchaSDKResources.bundle` file from the archive to your project.

   {/tab}

   {tab(CocoaPods)}

   1. Add the library to the `Podfile`:

      ```ruby
      `source 'https://github.com/VKCOM/vkid-captcha-ios-sdk.git' `
      `pod 'VKCaptchaSDK', '~> <VERSION>'`
      ```
      Here `<VERSION>` is the VK Капча SDK version for iOS CocoaPods (`0.1.1`).

   1. Run the command in the directory containing the `Podfile`:

      ```console
      pod install --repo-update
      ```

   {/tab}

   {/tabs}

1. Get the link for launching the captcha widget from the backend.

1. Create a captcha configuration. Use the {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-init)[text=configuration object]} `VKCaptchaConfiguration(url:)`.

1. Display the captcha to the user. Use the {linkto(../../concepts/reference-sdk/reference-sdk-ios#reference-sdk-ios-show)[text=SDK method]} `VKCaptcha.getCaptchaViewController(completion:)`.

1. Handle the captcha completion result:

   - If the method returned a successful captcha completion token, send it to the backend for validation.
   - If the user closed the captcha, nothing is sent to the backend. Determine what should happen on the frontend in this case.

Swift code example:

```swift
import VKCaptchaSDK

struct APIResponse: Decodable {
   let captchaUrl: String?
}

func handleCaptcha(captchaUrl: URL) {
   let config = VKCaptchaConfiguration(url: captchaUrl) // The link for launching the captcha widget, obtained from the backend, contains a session token
   let captcha = VKCaptcha(configuration: config)

   let vc = captcha.getCaptchaViewController { [weak self] result in
      switch result {
         case .success(let token):
            self?.repeatRequest(with: token)
         case .failure:
                 // Handling captcha closure
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
         // Handling a successful response without captcha
         return
      }

      DispatchQueue.main.async { [weak self] in
         self?.handleCaptcha(captchaUrl: captchaUrl)
      }
   }.resume()
}
```