{includetag(captcha-get-token)}
- A list of domains (`domains`) where VK Капча will be integrated. They will be associated with your service token and used in the CSP header when creating a CAPTCHA session. If domains are not specified, the value from the `domain` parameter of the {linkto(../../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=method]} `GET /captchaNotRobot.createSession` will be used in the CSP header.

- A list of allowed IP addresses or CIDRs (`ips`) from which requests for creating a CAPTCHA session will come. If they are not specified, the list of addresses for creating a CAPTCHA session will not be limited.

{note:err}
Do not publish the token publicly and do not share it with anyone, especially if you did not specify the list of allowed addresses and domains in the registration request. Using this token, attackers can gain access to the service at your expense.
{/note}
{/includetag}