# Quick Start — Sales Cold Outreach + Follow-up

60 seconds से कम में running। अपना tool pick करें।

## Claude users

Claude open करें। एक new Project create करें। "Custom instructions" या "Project knowledge" में, `optimization-pack.md` के पूरे contents paste करें। `frameworks/`, `templates/`, और `playbooks/` से files upload करें ताकि Claude के पास reference हो। Project में एक new conversation start करें। पहला message: Claude को एक sentence में अपना ICP बताएँ, आप कौन सा artifact चाहते हैं, और prospect-specific signal। Example: "ICP: Series A SaaS पर VPs of Engineering, 50-200 employees। Cold email। Signal: उन्होंने 3 weeks पहले [VC] द्वारा led एक B round raised। Value: हम CI/CD spend को flaky test reruns कम करके cut करते हैं।"

## ChatGPT users

ChatGPT open करें। "Explore GPTs" → "Create a GPT" click करें (Plus required)। "Instructions" में, `custom-gpt-instructions.md` के पूरे contents paste करें। "Conversation starters" में, उस file के bottom पर पाँच use करें। "Knowledge" में, `frameworks/`, `templates/`, और `playbooks/` से markdown files upload करें। GPT को private save करें। Open करें। पहला message: ICP + artifact + signal, ऊपर Claude example जैसा ही।

अगर Plus नहीं है, एक regular chat के top पर `optimization-pack.md` paste करें। Same outcome, कोई persistence नहीं।

## Gemini, Codex, Cursor, या कोई और AI tool

Tool open करें। एक new conversation start करें। अपने पहले message के रूप में `optimization-pack.md` के पूरे contents paste करें। Add करें: "Acknowledge you've loaded this and ask me for ICP, artifact, and signal." एक बार यह करे, आप set हैं।

Gemini Gems के लिए: एक new Gem create करें, `optimization-pack.md` को instructions में paste करें, save करें, default chat के बजाय Gem use करें।

---

## Test करें कि काम कर रहा है

एक बार आपने system prompt load कर लिया, यह paste करें:

```
Test run.

ICP: Series A SaaS companies पर VPs of Engineering, 50-200 employees, US-based, React frontends building.
Prospect: Sarah Chen, VP Engineering at Beacon Labs। Signal: उन्होंने 4 दिन पहले LinkedIn पर post किया कि उनकी team की CI/CD pipeline एक bottleneck है उनकी engineering team double करने के बाद।
Value: हम flaky-test reruns 60% कम करते हैं, जो CI minutes और उनके साथ आने वाली on-call pages cut करता है।
Proof: Linear और Vercel customers हैं।
CTA: 15 min next Tuesday या Wednesday।
Constraint: 75 words से कम, subject line 40 characters से कम।

Cold email लिखें।
```

अगर आपको एक email वापस मिले जो:
- Sarah की specific LinkedIn post CI/CD pain के बारे में reference करती है
- Value को "transform" या "revolutionize" के बिना plain language में state करती है
- Proposed times के साथ एक single ask रखती है
- 75 words से कम में आती है
- एक "two things you might want to change" block के साथ end होती है

...kit सही से loaded है। अगर email "Hope this finds you well" या "I wanted to reach out" से शुरू होती है, system prompt load नहीं हुआ — conversation के top पर इसे फिर से paste करने की try करें।
