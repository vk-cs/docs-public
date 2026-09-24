# {heading(Connecting to a mobile app on Android)[id=captcha-connect-android]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Download the VK Капча SDK:

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

   1. Connect the library in the app module's `build.gradle.kts`:

      ```kotlin
      dependencies {
          implementation("com.vk.id.captcha:vkid-captcha:<VERSION>")
      }
      ```
      Here `<VERSION>` is the version of the VK Капча SDK for Android (`0.0.13`).

   1. In your app's `Android Manifest`, override the `authority` of the provider that initializes the SDK:

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

1. Get the link for launching the captcha widget from the {linkto(../connect-backend#captcha-connect-backend)[text=backend]}.

1. (Optional) Configure the captcha localization language. Use the SDK method {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-lang)[text=VKCaptcha.setLocale()]}.

1. Display the captcha to the user. Use the SDK method {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-show)[text=VKCaptcha.openCaptcha()]}.

1. Handle the captcha completion result using the {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-result)[text=VKCaptchaResultListener]} interface:

   - If a successful captcha completion token is returned, send it to the backend for validation.

     {note:info}
     If you need to get the successful captcha completion token again, use the SDK method {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-token)[text=VKCaptcha.getToken()]}.
     {/note}

   - If the user closed the captcha, nothing is sent to the backend. Determine what will happen in the frontend in this case.

Example Kotlin code:

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
                        // Handling an error or captcha closure
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