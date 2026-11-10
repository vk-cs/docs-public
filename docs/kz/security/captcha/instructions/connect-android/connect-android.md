# {heading(Android мобильді қосымшасына қосылу)[id=captcha-connect-android]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. VK Капча SDK жүктеп алыңыз:

   {tabs}

   {tab(Maven)}

   1. `dependencyResolutionManagement` немесе `settings.gradle.kts` ішіне Maven репозиторийін қосыңыз:

      ```kotlin
      dependencyResolutionManagement {
          repositories {
              maven(url = "https://artifactory-external.vkpartner.ru/artifactory/vkid-sdk-android/")
          }
      }
      ```

   1. Қосымша модулінің `build.gradle.kts` файлында кітапхананы қосыңыз:

      ```kotlin
      dependencies {
          implementation("com.vk.id.captcha:vkid-captcha:<ВЕРСИЯ>")
      }
      ```
      Мұнда `<ВЕРСИЯ>` — Android үшін VK Капча SDK нұсқасы (`0.0.13`).

   1. Қосымшаңыздың `Android Manifest` файлында SDK-ны инициализациялайтын провайдердің `authority` мәнін қайта анықтаңыз:

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

1. {linkto(../connect-backend#captcha-connect-backend)[text=бэкендтен]} капча виджетін іске қосуға арналған сілтемені алыңыз.

1. (Қалауыңыз бойынша) Капча локализациясының тілін баптаңыз. Бұл үшін SDK-ның {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-lang)[text=VKCaptcha.setLocale()]} әдісін пайдаланыңыз.

1. Капчаны пайдаланушыға көрсетіңіз. Бұл үшін SDK-ның {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-show)[text=VKCaptcha.openCaptcha()]} әдісін пайдаланыңыз.

1. Капчадан өту нәтижесін {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-result)[text=VKCaptchaResultListener]} интерфейсін пайдаланып өңдеңіз:

   - Егер капчадан сәтті өту токені қайтарылса, оны валидациялау үшін бэкендке жіберіңіз.

     {note:info}
     Егер капчадан сәтті өту токенін қайта алу қажет болса, SDK-ның {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-token)[text=VKCaptcha.getToken()]} әдісін пайдаланыңыз.
     {/note}

   - Егер пайдаланушы капчаны жапса, бэкендке ештеңе жіберілмейді. Бұл жағдайда фронтендте не болатынын анықтаңыз.

Kotlin тіліндегі код мысалы:

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
                        // Капчаны өңдеу қатесі немесе жабылуы
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
        // Токенмен қайталанатын сұрау
    }
}
```