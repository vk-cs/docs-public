# {heading(Connecting to a mobile application on Android)[id=captcha-connect-android]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Download VK Капча SDK:

   {tabs}

   {tab(Maven)}

   1. Add the Maven repository to `dependencyResolutionManagement` or `settings.gradle.kts`:

      ```kotlin
      dependencyResolutionManagement {
          repositories {
              maven(url = "https://artifactory-external.vkpartner.ru/artifactory/vkid-sdk-android/")
          }
      }
      ```

   1. Add the library to your application module's `build.gradle.kts`:

      ```kotlin
      dependencies {
          implementation("com.vk.id.captcha:vkid-captcha:<VERSION>")
      }
      ```
      Here `<VERSION>` is the VK Капча SDK version for Android (`0.0.13`).

   1. In your application's `Android Manifest`, override the `authority` of the provider that initializes the SDK:

      ```xml
      <application>
          <provider
              android:name="com.vk.id.captcha.init.SdkInitContentProvider"
              android:authorities="your.unique.authority"
              android:exported="false"
              tools:replace="authorities" />
      </application>
      ```

   {/tab}

   {/tabs}

1. Get a link from the backend to launch the captcha widget.

1. (Optional) Configure the captcha localization language. Use the {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-lang)[text=SDK method]} `VKCaptcha.setLocale()`.

1. Display the captcha to the user. Use the {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-show)[text=SDK method]} `VKCaptcha.openCaptcha()`.

1. Handle the captcha completion result using the {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-result)[text=interface]} `VKCaptchaResultListener`:

   - If a successful captcha completion token is returned, send it to the backend for validation.

     {note:info}
     If you need to get the successful captcha completion token again, use the {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-token)[text=SDK method]} `VKCaptcha.getToken()`.
     {/note}

   - If the user closed the captcha, nothing is sent to the backend. Determine what will happen in the frontend in this case.

Kotlin code example:

```kotlin
import com.vk.id.captcha.api.VKCaptcha
import com.vk.id.captcha.api.listener.VKCaptchaResultListener
import com.vk.id.captcha.api.data.VKCaptchaResult
import android.net.Uri

class CaptchaHandler {

    fun handleCaptcha(captchaUrl: String) {
        val listener = object : VKCaptchaResultListener {
            override fun onResult(result: VKCaptchaResult) {
                when (result) {
                    is VKCaptchaResult.Success -> {
                        val token = result.token
                        repeatRequest(token)
                    }
                    is VKCaptchaResult.Error -> {
                        // Error handling or captcha closure
                    }
                }
            }
        }

        val uri = Uri.parse(captchaUrl)
        val domain = "${uri.scheme}://${uri.host}"

        VKCaptcha.openCaptcha(
            domain = domain,
            redirectUri = captchaUrl,
            listener = listener
        )
    }

    private fun repeatRequest(token: String) {
        // Repeat request with token
    }
}
```