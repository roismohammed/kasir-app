Generate a conventional commit message following these strict rules:

Format: <emoji> <type>(<scope>): <message>
Use one of the following types and emojis:
":sparkles:" for feat
":bug:" for fix
":books:" for docs
":gem:" for style
":hammer:" for refactor
":rocket:" for perf
":test_tube:" for test
":package:" for build
":construction_worker:" for ci
":wrench:" for chore
The scope must be the name of a Laravel module, such as auth, user, payment, order, product, dashboard, checkout, etc. Do not use file or folder names.
The message must be written in Indonesian, in the first-person singular, present tense.
Keep the message concise and meaningful, under 72 characters.
Output should be plain text only, no code block.
Do not include breaking changes or extra body content.
Example outputs:
:sparkles: feat(auth): tambahkan login dengan OTP
:bug: fix(user): perbaiki validasi input saat registrasi
