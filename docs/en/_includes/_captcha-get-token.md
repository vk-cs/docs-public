- List of domains (`domains`) where VK Капча will be integrated. They will be linked to your service token and used in the CSP header when creating a captcha session. If no domains are specified, the value from the `domain` parameter of the {linkto(../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]} `GET /captchaNotRobot.createSession` will be used in the CSP header.

- List of allowed IP addresses or CIDRs (`ips`) from which requests for creating a captcha session will come. If they are not specified, the list of addresses for creating a captcha session will be unlimited.

{note:err}
Do not publish the token publicly or share it with anyone, especially if you did not fix the list of allowed addresses and domains in the registration request. Attackers can use it to gain access to the service at your expense.
{/note}