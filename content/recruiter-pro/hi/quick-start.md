# Quick Start — 60-second setup

तीन paragraphs, हर platform के लिए एक। अपना चुनें, paste करें, test करें।

---

## Claude (claude.ai या Claude API में)

एक new Project create करें। इसे "Recruiter Co-Pilot" नाम दें। Project के **Instructions** field में, `optimization-pack.md` के पूरे contents paste करें। Save करें। उस Project में हर chat अब recruiter mode में चलती है — JD writer, outreach drafter, interview-kit builder, Boolean string generator। One-off use के लिए, optimization pack को एक new chat में पहले message के रूप में paste करें। Bonus: अपने existing high-performing JDs और सबसे ज़्यादा-reply पाने वाले outreach को Project के knowledge base में drop करें — AI new ones draft करते समय आपकी team की actual voice और brand reference करेगा।

**Test करें:** Project में एक new chat start करें और नीचे का test prompt paste करें।

---

## ChatGPT (Custom GPT या one-off chat)

Custom GPT के लिए (Plus या Team): "My GPTs" → "Create a GPT" → "Configure" पर जाएँ। **Instructions** field में, `custom-gpt-instructions.md` paste करें। इसे "Recruiter Co-Pilot" नाम दें। Description: "बिना jargon के JDs, replies पाने वाला outreach, interview kits, Boolean strings।" Save करें। One-off use के लिए, किसी भी standard thread में `optimization-pack.md` को पहले message के रूप में paste करें।

**Test करें:** अपना new GPT open करें और नीचे का test prompt paste करें।

---

## Gemini, Cursor, Codex (या कोई और AI)

**Gemini Advanced** के लिए, एक new Gem create करें। Optimization pack को Gem के instructions field में paste करें, save करें, और recruiting work के लिए उस Gem का use करें। **Cursor** के लिए, यह kit कम applicable है (Cursor code के लिए है), लेकिन अगर आप careers-page repo में MDX के रूप में JDs लिखते हैं, optimization pack को `.cursorrules` में paste करें। **Codex / GitHub Copilot Chat / किसी और AI** के लिए, optimization pack को एक fresh conversation में पहले message के रूप में paste करें और किसी भी new thread के start पर इसे फिर से paste करें।

**Test करें:** Setup confirm करने के लिए नीचे का test prompt use करें।

---

## Paste-able test prompt

```
मैं एक 30-person Series B SaaS में Senior Full-Stack Engineer hire कर रहा हूँ। Remote-first, US + Canada. Stack: TypeScript, React, Node, Postgres on AWS। Salary band: USD $170-210K base + 0.05-0.15% equity। Hiring manager ने एक JD लिखा और मुझे लगता है यह bad है। यहाँ है जो उन्होंने भेजा:

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

मुझे चाहिए:
1. उन्होंने जो भेजा उसका bias lint (specific flagged phrases और क्यों)
2. Kit के format को use करते हुए एक complete rewritten JD
3. Senior engineers को cold-DM करने का outreach template (opener में 3 lines max)
4. Senior engineers के लिए TypeScript + React + Node के साथ startups में ship कर चुके लोगों का LinkedIn Recruiter Boolean string
```

आपको वापस मिलना चाहिए: एक lint pass जो "passionate," "rock star," "fast-paced," "10x developer," "wear many hats," "Bachelor's degree required," "10+ years," "work hard play hard," और "like a family" को flag करे — हर एक के लिए specific fixes के साथ। फिर एक clean ~500-word JD salary band, real "what you'll do" outcomes, एक actual interview process, और एक working arrangement section के साथ। फिर एक three-line outreach जो message के लिए एक real-feeling reason name करे। फिर एक Boolean string clauses explained के साथ, plus 2 variants अगर पहला बहुत कम या बहुत ज़्यादा results return करे।

अगर आपको एक JD मिले जिसमें "rock star" अभी भी हो, या outreach बिना comp band mention के, optimization pack loaded नहीं है। Re-paste करें।
