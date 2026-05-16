# Quick Start — 60-second setup

तीन paragraphs, per platform एक। अपना pick करें, paste करें, test करें।

---

## Claude (claude.ai या Claude in the API)

Claude में एक new Project create करें (left sidebar, "Projects" → "New Project")। इसे "Solopreneur Co-Pilot" name करें। Project के **Instructions** field में, `optimization-pack.md` के full contents paste करें। Save करें। उस Project के अंदर start की हर chat अब solopreneur mode में run होती है। One-off use के लिए एक Project के बिना, बस एक new chat के पहले message के रूप में optimization pack paste करें।

**Test करें:** Project में एक new chat start करें और नीचे test prompt paste करें।

---

## ChatGPT (Custom GPT या one-off chat)

एक Custom GPT के लिए (recommended अगर आपके पास Plus या Team plan है): "My GPTs" → "Create a GPT" → "Configure" tab पर जाएँ। **Instructions** field में, `custom-gpt-instructions.md` के contents paste करें। इसे "Solopreneur Co-Pilot" name करें। इसे एक short description दें जैसे "One-person businesses के लिए Proposals, SOWs, invoices, और visibility posts।" Save करें और chatting start करें। One-off use के लिए, किसी भी standard ChatGPT thread के पहले message के रूप में `optimization-pack.md` paste करें।

**Test करें:** अपना new GPT open करें और नीचे test prompt paste करें।

---

## Gemini, Cursor, Codex (या कोई और AI)

**Gemini Advanced** के लिए, एक new Gem create करें ("Gems" → "Create new Gem")। Optimization pack को Gem के instructions field में paste करें, save करें, और solopreneur work के लिए वो Gem use करें। **Cursor** के लिए, यह kit less relevant है (Cursor code के लिए है), लेकिन आप optimization pack को `.cursorrules` में paste कर सकते हैं अगर आप अपने code editor के अंदर business-side help भी चाहते हैं। **Codex / GitHub Copilot Chat / कोई और AI** के लिए, एक fresh conversation के पहले message के रूप में optimization pack paste करें और किसी भी new conversation thread के start पर इसे re-paste करें।

**Test करें:** Setup काम कर रहा है confirm करने के लिए नीचे test prompt use करें।

---

## Paste-able test prompt

इसे exactly अपने configured AI में paste करें:

```
मैं एक freelance brand designer हूँ। ज़्यादातर SaaS startups, 5 years in। Priya नाम की एक founder एक Series A fintech में (15-person team, Toronto) ने just मुझे email किया — उन्हें अपने product के लिए एक "brand refresh" चाहिए। उन्होंने "around $8K CAD" का budget mention किया लेकिन कहा कि अगर scope makes sense तो वे flexible हैं। हमारी Thursday एक discovery call booked है।

दो चीज़ें चाहिए:
1. Call से पहले उन्हें भेजने के लिए एक 10-question intake form।
2. Call के 24 hours बाद भेजने के लिए एक three-tier proposal। Discovery में जो भी हम uncover करेंगे उसके लिए placeholders use करें।

हर एक को one screen से कम रखें। मैं edit करूँगा।
```

आपको एक clean intake form वापस मिलनी चाहिए (10-12 questions, sensibly grouped) और एक three-tier proposal middle tier `(ज़्यादातर clients इसे pick करते हैं)` marked के साथ — call से specifics के लिए placeholders के साथ, pricing around $5K / $8K / $14K CAD।

अगर आपको corporate text की एक wall या एक single-price proposal वापस मिले, optimization pack सही से loaded नहीं है। Re-paste करें।
