Before processing text into TTS format, we recommend:
- Remove special characters and Latin characters. Cloud Voice is not always able to correctly pronounce the phrase in Latin.
- Numerals and abbreviations are best written in text. For example, "Sokolnikov Square - 5 sq. km, and Monaco - about 2". It would be more correct to issue it like this: “Sokolnikov Square is five square kilometers, and Monaco is about two.”
- Put in quotation marks the letters that you need to pronounce separately. For example: "City with the letter "O"". Add vowels to consonants: “Be”, “Ve”, “Ge”.
- Avoid complex sentences with an abundance of turns. It is better to divide the sentence into several simple ones.

## Accuracy of pronunciation
To improve the accuracy of text recognition, you can use special characters:
 | Sign | What does |
 | --- | --- |
 | ` | stress. Placed before a vowel. |
 | ^ | Intonation. Placed before and after the word. |
 | . | Pause. Placed after the word. |
 | { and } | Transcription. Placed before and after the word. Example: {Mercedes}{Mercedes\`eu} |

### Accent

Sometimes there may be an error in emphasis. For example, "Once Lev Nikolayevich Tolstoy challenged Ivan Sergeevich Turgenev to a duel." In such a case, we recommend using "\`".

Get:

"Once Lev Nikolayevich Tolst\`oy challenged Ivan Sergeevich Turgenev to a duel."
 
There may also be an error with accents in words with "ё". It is important not to miss this letter when writing the text, otherwise instead of "Blinded" you get "Blinded".
 
### Intonation

If you want to emphasize a particular word, use "^".

 | Was | Became |
 | --- | --- |
 | Russia has its own Rome." Emphasis on the word "Rome". | "Russia has ^its own^ Rome." Emphasis on the word "own". |

### Pause

If you want to add pauses to your speech, you can separate the sentence with a period.

 | Was | Became |
 | --- | --- |
 | "Who was there just not: lions, tigers, giraffes, monkeys." | “Who was not there. Lions. Tigers. Giraffes. Monkeys". |
 If Cloud Voice does not pause between sentences, then this is solved by a simple line break. Example:
 “And you can also control the music with your voice.
 By the way! Completely forgot".

### Transcription

Sometimes synthesis reads words incorrectly. For example, in a word, the letters “O” and “G” are emphasized too strongly, so that a “Vologda dialect” appears. To make the word sound more familiar, it has to be written with “kavota” errors. Another example is Peter (city). Cloud Voice pronounces it as "Peter". To fix this, we write a transcription with an intentional error: "P'itir".

Since in the application, in addition to the voice, there is also a text answer - errors are unacceptable.

In this case, we write both versions of the word. Moreover, the word is first written as it should look in the text, and then as it should be written for speech synthesis. And enclose them in curly brackets. It turns out: I saw {someone}{kavot} strange.
We do the same with foreign words that synthesis can read incorrectly: which is better {Mercedes}{Merced\`es} or {BMW}{Beemv\`e}?

### Problem cases

Basically, problems can arise when the Latin alphabet is used. For example, **black** reads like "black" and is pronounced quickly, which together gives consonance with another word. You can correct this error using the symbol **- (hyphen)**: "**b-lek**".

Unforeseen situations can also arise with Russian words. For example, “Happy New Year! Your ** Yul'a ** and Marusya. There is an accent here, but even if it is present, “** Yula **” is pronounced. You can fix it in the way described above.

Difficulties may arise with reading a foreign combination of letters **th**: theater, feather, the etc. Such words are pronounced with a Russian accent. To make speech closer to the pronunciation of native speakers, use the transcription through the letters ** "f" **, ** "v" ** and ** "d" **:
 - **th**eatre → **f**`ie-ta
 -fea**th**er → f`e**v**ar
 - **the** (national) → **te** (national)