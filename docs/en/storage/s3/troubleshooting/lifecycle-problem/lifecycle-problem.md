# {heading(Lifecycle rules are not applied)[id=s3-lifecycle-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../concepts/lifecycle#s3-concepts-lifecycle)[text=Lifecycle]} rules are configured for automatic object deletion, but objects are not deleted after the specified period expires.

This issue may occur if the object key specified in the rules contains typos.

### {heading(Solution)[id=s3-lifecycle-problem-resolve]}

1. Make sure that the {linkto(../../concepts/about#s3-concepts-about-object-key)[text=object key]} specified in the rule exactly (case-sensitively) matches the object key in the bucket.
1. If the object key is specified correctly, wait 24–48 hours for the rule to be applied. This delay is normal service behavior, not an error.
1. If the issue persists, contact [technical support](/en/contacts).