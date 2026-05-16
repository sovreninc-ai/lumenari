# Quick Start — setup de 60 segundos

Três parágrafos, um por plataforma. Escolha o seu, cole, teste.

---

## Claude (claude.ai ou Claude na API)

Crie um novo Project. Nomeie-o "Recruiter Co-Pilot". No campo **Instructions** do Project, cole o conteúdo completo de `optimization-pack.md`. Salve. Todo chat naquele Project agora roda em modo recrutador — redator de JD, escritor de outreach, construtor de kit de entrevista, gerador de string boolean. Para uso pontual, cole o optimization pack como primeira mensagem num novo chat. Bônus: jogue suas JDs de alta performance existentes e os outreach mais respondidos na knowledge base do Project — a IA vai referenciar a voz real e a marca do seu time ao escrever os novos.

**Teste:** Inicie um novo chat no Project e cole o prompt de teste abaixo.

---

## ChatGPT (Custom GPT ou chat pontual)

Para um Custom GPT (Plus ou Team): vá em "My GPTs" → "Create a GPT" → "Configure". No campo **Instructions**, cole `custom-gpt-instructions.md`. Nomeie-o "Recruiter Co-Pilot". Descrição: "JDs sem jargão, outreach que recebe respostas, kits de entrevista, strings boolean". Salve. Para uso pontual, cole `optimization-pack.md` como primeira mensagem em qualquer thread padrão.

**Teste:** Abra seu novo GPT e cole o prompt de teste abaixo.

---

## Gemini, Cursor, Codex (ou qualquer outra IA)

Para **Gemini Advanced**, crie um novo Gem. Cole o optimization pack no campo de instruções do Gem, salve e use esse Gem para trabalho de recrutamento. Para **Cursor**, este kit é menos aplicável (Cursor é para código), mas se você escreve JDs como MDX num repo de página de carreiras, cole o optimization pack em `.cursorrules`. Para **Codex / GitHub Copilot Chat / qualquer outra IA**, cole o optimization pack como primeira mensagem numa conversa nova e re-cole no início de qualquer thread nova.

**Teste:** Use o prompt de teste abaixo para confirmar o setup.

---

## Prompt de teste colável

```
Estou contratando um Senior Full-Stack Engineer numa SaaS de 30 pessoas em Série B. Remote-first, US + Canadá. Stack: TypeScript, React, Node, Postgres na AWS. Faixa salarial: USD $170-210K base + 0,05-0,15% equity. O hiring manager escreveu uma JD e acho que está ruim. Aqui está o que ele mandou:

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

Eu preciso:
1. Um lint de viés do que ele mandou (frases sinalizadas específicas e por quê)
2. Uma JD completa reescrita usando o formato do kit
3. Um template de outreach para cold-DM em engenheiros sêniores (3 linhas no máximo na abertura)
4. Uma string boolean para LinkedIn Recruiter para engenheiros sêniores com TypeScript + React + Node que entregaram em startups
```

Você deve receber de volta: um pass de lint que sinaliza "passionate", "rock star", "fast-paced", "10x developer", "wear many hats", "Bachelor's degree required", "10+ years", "work hard play hard" e "like a family" — com fixes específicos para cada. Depois uma JD limpa de ~500 palavras com faixa salarial, "o que você vai fazer" com resultados reais, um processo de entrevista real e uma seção de arranjo de trabalho. Depois um outreach de três linhas que nomeia uma razão de fato real para a mensagem. Depois uma string boolean com as cláusulas explicadas, mais 2 variantes se a primeira retornar poucos ou muitos resultados.

Se você receber de volta uma JD com "rock star" ainda nela, ou outreach sem faixa de comp mencionada, o optimization pack não está carregado. Re-cole.
