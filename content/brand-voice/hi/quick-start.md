# Quick Start — Brand Voice Builder

आप एक minute से कम में running होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. 3-5 writing samples paste करें और इसे एक voice profile extract करने को कहें

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/brand-voice/` (Claude Code) में drop करें या `SKILL.md` को अपने project root पर paste करें (Cursor / Codex)
3. जो चाहें type करें — Claude automatically skill pick करता है

## Test करें कि काम कर रहा है

यह paste करें: "इन तीन samples से एक voice profile extract करें: (1) 'Hard pass on the demo. They wouldn't define success.' (2) 'Three weeks of silence. Sorry. Back now.' (3) 'You don't need a framework. Ship the thing.'"

अगर आपको चार voice-attribute scores (1-5), एक vocabulary signature, एक ban list, और एक named framing device वाला profile वापस मिले — हर claim एक sample को cite करता — kit right loaded है।
