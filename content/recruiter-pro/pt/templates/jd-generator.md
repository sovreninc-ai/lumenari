# Gerador de JD com Linting Anti-Viés

A maioria das JDs é ruim porque hiring managers escrevem em 20 minutos, copiam metade de outra JD e nunca leem como um candidato leria. Este template conserta. Ele roda um linter anti-viés primeiro, depois produz uma JD que respeita como candidatos de fato leem.

---

## Como este template funciona

Dois passes:

1. **Pass de lint.** Sinaliza toda frase problemática no brief ou no draft existente da JD. Mostra o lint + o fix no topo do output.
2. **Draft da JD.** Uma JD limpa, estruturada, usando o formato padrão do optimization pack.

Você pode rodar só o lint numa JD que um hiring manager te mandou (o caso de uso mais útil em agências e times in-house).

---

## O prompt

```
Você é o Recruiter Co-Pilot.

Gere uma job description.

**Título da vaga:** [título exato]
**Senioridade:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**Família de cargo:** [Engenharia / Produto / Design / Vendas / GTM / Ops / Finanças / etc.]
**Estágio + tamanho da empresa:** [ex.: Série B, 80 pessoas, $30M ARR]
**O que fazemos:** [uma frase]
**Por que estamos contratando esta vaga:** [uma frase — crescimento, substituição, time novo, função nova]
**Localização + arranjo de trabalho:** [Remoto / Híbrido X dias em [cidade] / Presencial (cidade)]

**Faixa salarial:**
- Base: [baixo] - [alto] [moeda]
- Equity: [faixa, se aplicável]
- Bônus/comissão: [estrutura, se aplicável]

**Top 3 coisas que a pessoa vai ser dona (concretas, não vagas):**
1. [resultado]
2. [resultado]
3. [resultado]

**Top 3 skills/experiência necessárias (resultados, não gatekeeping):**
1.
2.
3.

**Nice-to-have (opcional):**
- [3-4 coisas]

**O time onde vai entrar (headcount real, manager nomeado se possível):**
[descrição]

**Processo de entrevista (seu processo real, não um template):**
[número de rodadas, quem vão encontrar, formato]

**Qualquer coisa que vale sinalizar:**
[ex.: "ainda não temos um engenheiro sênior — você vai definir a régua", ou "o codebase é mais antigo do que gostaríamos"]

Draft existente (se há):
[cole — para o pass de lint]
```

---

## O que você recebe de volta — exemplo completo

Para uma vaga de Senior Full-Stack Engineer numa SaaS em Série B:

### Pass de lint (do draft do hiring manager)

> **Pass de lint no draft original:**
>
> - `"passionate"` → corte. Paixão é um sentimento, não um entregável.
> - `"rock star"` → corte. Com gênero (puxa masculino, afasta candidatas sêniores), além de cringe corporativo.
> - `"fast-paced, dynamic team"` → corte. Código para "somos desorganizados". Substitua por expectativas concretas de ritmo.
> - `"10x developer"` → corte. Sem sentido, afasta engenheiros sêniores reflexivos.
> - `"thrives in ambiguity"` → suavize ou seja específico. Engenheiros sêniores esperam ALGUMA estrutura; a frase frequentemente é código para "não sabemos o que queremos".
> - `"wear many hats"` → corte. Código para "não temos um time". Se verdade, diga honestamente.
> - `"Bachelor's degree in Computer Science required"` → largue ou mude para "Bachelor's degree OU experiência equivalente". Engenheiros sêniores com 10 anos de trabalho demonstrável não deveriam ser barrados por um diploma de CC.
> - `"10+ years of experience"` → reconsidere. A vaga não exige 10 anos; trabalho de qualidade sênior com 6-8 anos é comum. Substitua por "trabalho demonstrado em nível sênior em múltiplas funções".
> - `"work hard and play hard"` → corte. Codificado como jovem + grindy. Afasta candidatos mais velhos e pais.
> - `"we're like a family here"` → corte. Vago e frequentemente um sinal de problemas de fronteira. Substitua por normas concretas de time.
> - `"competitive salary"` → substitua pela faixa salarial real. Não-negociável.

### A JD reescrita

> **Senior Full-Stack Engineer**
>
> **Sobre a vaga**
>
> Você será o terceiro engenheiro sênior num time de sete, trabalhando ao longo da nossa stack TypeScript / React / Node / Postgres para entregar features que nossos clientes de fato nos pagam para usar. O dia a dia significa escrever código em produção, revisar PRs, ocasionalmente parear com pleno em problemas complicados, e ser dono de uma área principal do produto end-to-end.
>
> **O que você vai fazer**
>
> - Entregar features que tocam a stack completa — do schema do Postgres a componentes React
> - Ser dono de uma das nossas três áreas de produto (billing, integrações ou workflows) nos primeiros 90 dias
> - Definir a régua técnica num time que vai crescer de 7 para 12 engenheiros no próximo ano
> - Parear com o product manager e a designer em decisões de escopo, não só em implementação
> - Mentorar engenheiros pleno, com cerca de 20% do seu tempo nisso (mais se você quiser, menos se não)
>
> **O que estamos procurando**
>
> - Trabalho demonstrado em nível sênior ao longo de TypeScript / React no front e Node / Postgres no back
> - Você entregou em produção numa startup ou time rápido — você sabe o que "bom o bastante para enviar" significa
> - Você consegue dimensionar seu próprio trabalho a partir de um problema descrito em um parágrafo
> - Você escreve código que outros conseguem ler e revisar sem tradutor
> - Você trabalhou remotamente com um time em múltiplos fusos
>
> **Nice to have**
>
> - Experiência com AWS (estamos nela; feliz em te trazer ao nível se não tiver)
> - Background em B2B SaaS especificamente
> - Contribuições em open source ou um side project do qual você se orgulha
> - Conforto com infra como código (Terraform)
>
> **Remuneração**
>
> - Faixa salarial base: USD $170.000 - $210.000
> - Equity: 0,05% - 0,15%, vesting de 4 anos com cliff de 1 ano
> - Bônus: alvo de bônus anual de 10% atrelado aos OKRs da empresa
> - Benefícios: saúde/dental/visão completos (US: 100% empregado, 80% dependentes), estipêndio de $1.000/mês para home office, PTO ilimitado com mínimo de 3 semanas, 16 semanas de licença parental
>
> **Sobre o time**
>
> Sete engenheiros reportando ao [nome do Engineering Lead se público]. Fazemos sprints de 2 semanas, async-first com dois syncs curtos por semana. Sem rotação on-call ainda — temos um pequeno time de ops para isso. Codebase tem 4 anos, bem testado nas partes que importam, ficando mais limpo.
>
> **Como contratamos**
>
> 1. 30 min de intro comigo (o recrutador)
> 2. Entrevista técnica de 60 min com dois engenheiros — um problema real em que trabalhamos, sem LeetCode
> 3. Conversa de system design de 60 min
> 4. Reunião de 45 min com o engineering lead — cultura, estilo de trabalho, suas perguntas para nós
> 5. Duas chamadas curtas de referência
>
> Tempo total investido: cerca de 4 horas em 2-3 semanas. Tomamos decisões dentro de 5 dias úteis da rodada final.
>
> **Arranjo de trabalho**
>
> - Remote-first em US e Canadá
> - Horas core: 11h - 15h Eastern, com flex em torno disso
> - Nos encontramos pessoalmente duas vezes ao ano para um offsite de 3 dias da empresa (último foi na Cidade do México; o próximo é Lisboa)
> - Sem viagens obrigatórias além dos offsites

Essa JD tem ~480 palavras. Vai superar 90% das JDs na mesma caixa de entrada porque dá ao candidato o suficiente para tomar uma decisão real antes de se candidatar.

---

## Exemplo trabalhado — rodada só de lint

O usuário colou a JD original do hiring manager:

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

A IA retorna:

> **Pass de lint — 9 flags em 51 palavras. Recomendo uma reescrita completa.**
>
> 1. `passionate` — corte (vago, afasta candidatos sêniores)
> 2. `rock star` — corte (com gênero, cringe corporativo)
> 3. `fast-paced` — corte (código para "desorganizados")
> 4. `dynamic` — corte (não diz nada)
> 5. `10x developer` — corte (mito, afasta sêniores reflexivos)
> 6. `thrives in ambiguity` — sinalize (às vezes legítimo; geralmente código para "não sabemos o que queremos")
> 7. `wear many hats` — corte (código para "sem suporte de time")
> 8. `Bachelor's degree in CS required` — largue OU mude para "OU experiência equivalente"
> 9. `10+ years of experience` — reconsidere (frequentemente discriminatório; qualidade sênior frequentemente emerge em 6-8 anos)
> 10. `work hard and play hard` — corte (codificado por idade, codificado grindy)
> 11. `like a family` — corte (vago, às vezes sinal de fronteira)
> 12. `Competitive salary` — substitua pela faixa real
>
> Esta JD como está vai subperformar no pipeline de candidatos diversos e vai receber menos candidatos sêniores do que você gostaria. Quer que eu reescreva?

---

## Quando o linter não deve disparar

Algumas frases sinalizadas são legítimas em contexto. Exemplos:

- "Agressivo" está ok para "roadmap de produto agressivo" (uma coisa real) mas não para "personalidade agressiva" (sinal de contratação que puxa enviesado).
- "Família" está ok ao descrever políticas reais family-friendly (licença parental, dias de filho doente). NÃO está ok como "somos como uma família".
- "Recém-formado" está ok para programas de early careers explicitamente marcados como tal. NÃO está ok numa vaga Senior.

O linter vai marcar esses casos dependentes de contexto como "sinalize, não auto-substitua — confirme a intenção".

---

## Como usar isto com hiring managers

Um cenário comum: o hiring manager escreve a JD. Você acha que está ruim. Você não quer que ele se sinta atacado.

O pass de lint te dá uma forma não-confrontacional de empurrar de volta. Mostre a ele as frases sinalizadas com o PORQUÊ (apoiado por pesquisa: linguagem com gênero reduz candidatas mulheres em 11%; "10+ anos" filtra candidatos qualificados que têm 6-8 anos de trabalho de qualidade sênior; gatekeeping educacional encolhe o pipeline diverso).

Você não está dizendo ao hiring manager que a escrita dele é ruim. Você está mostrando os dados do que a linguagem faz à pool de candidatos. A maioria dos hiring managers atualiza com alegria assim que vê.

---

## Erros comuns que o kit vai sinalizar

- **Sem faixa salarial.** Sempre pergunta. Sempre inclui.
- **Sem seção "Como contratamos" real.** "Múltiplas rodadas" genérico é um flag — seja específico.
- **JD acima de 800 palavras.** Apare. JDs longas são indecisão.
- **"Bônus" listado na faixa mas não explicado.** Sempre diga a estrutura.
- **Faixas de equity muito largas.** "0,01% - 1%" não diz nada ao candidato. Aperte.
- **Seção "Nice to have" que tem os requisitos reais.** Não esconda must-haves em nice-to-haves; confunde candidatos e barra bons.
