# Quick Start — 60-second setup

तीन paragraphs, हर platform के लिए एक। अपना चुनें, paste करें, test करें।

---

## Claude (claude.ai या Claude API में)

Claude में एक new Project create करें। इसे "SEO Content Strategist" नाम दें। Project के **Instructions** field में, `optimization-pack.md` के पूरे contents paste करें। Save करें। उस Project में हर chat अब senior SEO strategist के रूप में run होती है — outliner, article writer, meta + schema generator, refresh advisor। One-off use के लिए, optimization pack को एक new chat में पहले message के रूप में paste करें। Bonus: अपने top-performing existing articles को Project के knowledge base में drop करें; AI internal links suggest करते समय आपकी actual URL structure और tone reference करेगा।

**Test करें:** Project में एक new chat start करें और नीचे दिया गया test prompt paste करें।

---

## ChatGPT (Custom GPT या one-off chat)

Custom GPT के लिए (Plus या Team): "My GPTs" → "Create a GPT" → "Configure" पर जाएँ। **Instructions** field में, `custom-gpt-instructions.md` paste करें। इसे "SEO Content Strategist" नाम दें। Description: "Outlines, longform, meta, schema, और refresh playbook — strategist-grade, freelancer-grade नहीं।" Web browsing enable करें अगर आप चाहते हैं कि यह live SERPs पढ़े (वरना आपको top 10 manually paste करना होगा)। Save करें और chat करें। One-off use के लिए, किसी भी standard thread में `optimization-pack.md` को पहले message के रूप में paste करें।

**Test करें:** अपना new GPT open करें और नीचे दिया गया test prompt paste करें।

---

## Gemini, Cursor, Codex (या कोई और AI)

**Gemini Advanced** के लिए, एक new Gem create करें। Optimization pack को Gem के instructions field में paste करें, save करें, और SEO work के लिए उस Gem का use करें। Gemini का live web access यहाँ useful है — जब आप पूछें, इसे current SERPs pull करने दें। **Cursor** के लिए, अगर आप static-site content (MDX, hugo, आदि) के लिए अपने code editor में SEO help चाहते हैं, optimization pack को `.cursorrules` में paste करें। **Codex / GitHub Copilot Chat / किसी और AI** के लिए, optimization pack को एक fresh conversation में पहले message के रूप में paste करें और किसी भी new thread के start पर इसे फिर से paste करें।

**Test करें:** Setup confirm करने के लिए नीचे दिए prompt का use करें।

---

## Paste-able test prompt

```
मैं एक SaaS comparison blog चलाता हूँ। Mid-six-figures monthly traffic, DA ~52।

Primary keyword: "best CRM for solopreneurs"
Estimated volume: ~1,900/mo
SERP top 3 हैं:
1. Zapier का blog (commercial listicle, 4,200 words, 12 tools reviewed)
2. HubSpot का blog (informational + soft-promotional, 2,800 words)
3. एक Substack writer का personal review (1,400 words, 90 दिनों में 5 tools tested, बहुत strong POV)

मैं specifically #3 को outrank करना चाहता हूँ — personal-review angle ही gap है।

मुझे दें:
1. Intent classification + SERP read
2. H1, H2s, internal link suggestions के साथ full outline
3. Meta title + meta description
4. Schema recommendation
5. E-E-A-T angle पर एक paragraph: इसे कौन byline करे, मुझे क्या experience injection चाहिए?

ज़रूरत हो तो placeholders use करें।
```

आपको वापस मिलना चाहिए: intent commercial के रूप में classified (एक note के साथ कि #3 का personal-review angle differentiator है), एक tight outline (शायद 7-9 H2s, featured-snippet-ready section openers के साथ), 3-5 named internal-link suggestions, spec में meta, Article + FAQPage schema recommended, और एक frank note कि यह तभी काम करता है अगर आपने actually 90 दिनों तक CRMs test किए — वरना kit एक writer hire करने की suggest करेगा जिसने किया हो, या किसी ऐसे के साथ partner करने को कहेगा जिसके पास receipts हों।

अगर आपको एक generic listicle outline बिना intent classification और SERP read के मिले, optimization pack loaded नहीं है। Re-paste करें।
