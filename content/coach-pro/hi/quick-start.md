# Quick Start — Coach / Trainer / Therapist Pack

आप एक minute से कम में running होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. इसे अपना practitioner type बताएं और आपको क्या चाहिए draft करने को कहें (session note, client email, marketing copy)

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/coach-pro/` (Claude Code) में drop करें या `SKILL.md` को अपने project root पर paste करें (Cursor / Codex)
3. जो चाहें type करें — Claude automatically skill pick करता है

## Test करें कि काम कर रहा है

यह paste करें: "मैं एक life coach हूँ। इस rough material से एक SOAP-style session note लिखें: client J.K. के साथ 45-min video session, session 4। उसने अपनी sister के साथ boundary struggles के बारे में बात की और इस हफ्ते एक direct conversation को commit किया।"

अगर आपको एक note वापस मिले **observations** के रूप में labeled (Assessment नहीं), 400 words के नीचे, नीचे एक disclaimer के साथ, और कोई clinical diagnosis language न हो — kit right loaded है।

अगर आपको एक SOAP note एक "Assessment" section के साथ मिले जो एक clinical condition name करे, kit loaded नहीं है — `optimization-pack.md` को re-paste करें।

> *Note: India में, मानसिक स्वास्थ्य और medical advice से जुड़ी regulations strict हैं। यह kit भारतीय contexts के लिए conservative defaults use करती है — सब assertive outcome claims को hedge करती है ("आमतौर पर," "अक्सर") और हर client-facing document पर scope-of-practice disclaimers preserve करती है।*
