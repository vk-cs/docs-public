# {heading(Подключение к мобильному приложению на Android)[id=captcha-connect-android]}

1. Загрузите VK Капча SDK:

   {tabs}

   {tab(Maven)}

   1. Добавьте репозиторий Maven в `dependencyResolutionManagement` или `settings.gradle.kts`:

      ```kotlin
      dependencyResolutionManagement {
          repositories {
              maven(url = "https://artifactory-external.vkpartner.ru/artifactory/vkid-sdk-android/")
          }
      }
      ```

   1. Подключите библиотеку в `build.gradle.kts` модуля приложения:

      ```kotlin
      dependencies {
          implementation("com.vk.id.captcha:vkid-captcha:<ВЕРСИЯ>")
      }
      ```
      Здесь `<ВЕРСИЯ>` — версия VK Капча SDK для Android (`0.0.13`).

   1. В `Android Manifest` вашего приложения переопределите `authority` провайдера, который инициализирует SDK:

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

1. Получите от бэкенда ссылку для запуска виджета капчи.

1. (Опционально) Настройте язык локализации капчи. Воспользуйтесь {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-lang)[text=методом SDK]} `VKCaptcha.setLocale()`.

1. Отобразите капчу пользователю. Воспользуйтесь {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-show)[text=методом SDK]} `VKCaptcha.openCaptcha()`.

1. Обработайте результат прохождения капчи, используя {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-result)[text=интерфейс]} `VKCaptchaResultListener`:

   - Если вернулся токен успешного прохождения капчи, отправьте его бэкенду для валидации.

     {note:info}
     Если нужно получить токен успешного прохождения капчи повторно, используйте {linkto(../../concepts/reference-sdk/reference-sdk-android#reference-sdk-android-token)[text=метод SDK]} `VKCaptcha.getToken()`.
     {/note}

   - Если пользователь закрыл капчу, бэкенду ничего не отправляется. Определите, что будет происходить во фронтенде в этом случае.

Пример кода на Kotlin:

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
                        // Обработка ошибки или закрытия капчи
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
        // Повторный запрос с токеном
    }
}
```