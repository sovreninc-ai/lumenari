# Quick Start — setup de 60 segundos

Três parágrafos, um por plataforma. Escolha o seu, cole, teste.

---

## Claude (claude.ai ou Claude na API)

Crie um novo Project no Claude. Nomeie-o "SEO Content Strategist". No campo **Instructions** do Project, cole o conteúdo completo de `optimization-pack.md`. Salve. Todo chat naquele Project agora roda como um SEO strategist sênior — outliner, redator de artigo, gerador de meta + schema, consultor de refresh. Para uso pontual, cole o optimization pack como primeira mensagem num novo chat. Bônus: jogue seus artigos existentes de melhor performance na knowledge base do Project; a IA vai referenciar sua estrutura real de URLs e tom ao sugerir internal links.

**Teste:** Inicie um novo chat no Project e cole o prompt de teste abaixo.

---

## ChatGPT (Custom GPT ou chat pontual)

Para um Custom GPT (Plus ou Team): vá em "My GPTs" → "Create a GPT" → "Configure". No campo **Instructions**, cole `custom-gpt-instructions.md`. Nomeie-o "SEO Content Strategist". Descrição: "Outlines, longform, meta, schema e playbook de refresh — nível estrategista, não nível freelancer". Habilite web browsing se você quer que ele leia SERPs ao vivo (caso contrário, você vai colar o top 10 manualmente). Salve e converse. Para uso pontual, cole `optimization-pack.md` como primeira mensagem em qualquer thread padrão.

**Teste:** Abra seu novo GPT e cole o prompt de teste abaixo.

---

## Gemini, Cursor, Codex (ou qualquer outra IA)

Para **Gemini Advanced**, crie um novo Gem. Cole o optimization pack no campo de instruções do Gem, salve e use esse Gem para trabalho de SEO. O acesso web ao vivo do Gemini é útil aqui — deixe ele puxar SERPs atuais quando você pedir. Para **Cursor**, cole o optimization pack em `.cursorrules` se você quer ajuda de SEO dentro do seu editor de código para conteúdo de static site (MDX, hugo, etc.). Para **Codex / GitHub Copilot Chat / qualquer outra IA**, cole o optimization pack como primeira mensagem numa conversa nova e re-cole no início de qualquer thread nova.

**Teste:** Use o prompt abaixo para confirmar o setup.

---

## Prompt de teste colável

```
Eu rodo um blog de comparação de SaaS. Tráfego mensal na casa dos seis dígitos médios, DA ~52.

Keyword primária: "best CRM for solopreneurs"
Volume estimado: ~1.900/mês
Top 3 da SERP são:
1. Blog do Zapier (listicle comercial, 4.200 palavras, 12 ferramentas avaliadas)
2. Blog da HubSpot (informacional + levemente promocional, 2.800 palavras)
3. Review pessoal de um escritor da Substack (1.400 palavras, 5 ferramentas testadas em 90 dias, POV muito forte)

Quero superar especificamente o #3 — o ângulo de review pessoal é a brecha.

Me dê:
1. Classificação de intenção + leitura da SERP
2. Outline completo com H1, H2s, sugestões de internal link
3. Meta title + meta description
4. Recomendação de schema
5. Um parágrafo sobre o ângulo de E-E-A-T: quem deveria assinar isto, que injeção de experiência eu preciso?

Use placeholders se precisar.
```

Você deve receber de volta: intenção classificada como comercial (com uma nota de que o ângulo de review pessoal do #3 é o diferenciador), um outline enxuto (provavelmente 7-9 H2s, com aberturas de seção prontas para featured snippet), 3-5 sugestões nomeadas de internal link, meta dentro da especificação, schema Article + FAQPage recomendado, e uma nota franca de que isto só funciona se VOCÊ realmente testou CRMs por 90 dias — caso contrário, o kit vai sugerir contratar um escritor que tenha feito isso, ou fazer parceria com alguém que tenha as receitas.

Se você receber de volta um outline genérico de listicle sem classificação de intenção e sem leitura de SERP, o optimization pack não está carregado. Re-cole.
