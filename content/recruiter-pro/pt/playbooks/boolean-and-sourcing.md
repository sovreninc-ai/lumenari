# Playbook de Boolean e Sourcing

A maioria do sourcing é ruim porque a string boolean é ruim. A maioria dos booleans é ruim porque trata todos os candidatos como se eles vivessem no LinkedIn da mesma forma. Este playbook conserta ambos — o construtor de string para cada plataforma e o playbook de sourcing para qual plataforma encontra qual senioridade para qual família de cargo.

---

## Parte 1 — Anatomia de string boolean

Todo bom boolean tem quatro movimentos:

1. **Skills/títulos MUST-have** — obrigatórios, geralmente strings entre aspas, juntados com AND
2. **Skills OPCIONAIS** — ampliam a rede, juntados com OR
3. **EXCLUSÕES** — o que você não quer, com NOT
4. **Sinais de CONTEXTO** — tipo de empresa, indicadores de senioridade, localização

### Operadores que funcionam em todo lugar

- `AND` — ambos os termos precisam estar presentes
- `OR` — qualquer um dos termos
- `NOT` (ou `-` na maioria dos mecanismos de busca) — excluir
- `"frase entre aspas"` — match exato (trata espaços como parte do termo)
- `(parênteses)` — agrupar operadores

### Operadores específicos de plataforma

- LinkedIn Recruiter tem filtros como campos (Title, Skills, Company, etc.) que você liga na UI, NÃO na string de busca
- Busca pública do LinkedIn suporta boolean básico no campo de keywords mas é mais restrito
- Buscas X-ray do Google usam site:linkedin.com/in/ e boolean completo
- Busca do GitHub suporta filtros como `language:`, `location:`, `followers:>X`

---

## Parte 2 — Strings de LinkedIn Recruiter

LinkedIn Recruiter é o mais fácil porque a plataforma em si separa campos para você.

### O prompt

```
Você é o Recruiter Co-Pilot.

Construa uma busca de LinkedIn Recruiter.

**Vaga alvo:** [título]
**Senioridade:** [Entry/Mid/Senior/Staff/Principal]
**Skills must-have:** [lista]
**Skills opcionais:** [lista]
**Indústrias/tipos de empresa que quero:** [ex.: "B2B SaaS, Série A-C, 50-300 funcionários"]
**Indústrias/tipos de empresa que quero excluir:** [ex.: "consultoria enterprise, agências"]
**Localização:** [cidade + raio ou remote-anywhere]
**Preferência de tenure:** [ex.: "1+ ano na função atual"]

Me dê:
1. A string boolean para o campo de keywords
2. O que setar em cada campo de filtro (Title, Skills, Industry, Company, Location, Years of experience)
3. 2-3 variantes se minha primeira busca retornar muito ou pouco
4. Padrões comuns de falso positivo para ficar de olho
```

### Exemplo trabalhado — Senior Backend Engineer

> **Setup do LinkedIn Recruiter:**
>
> **Filtro de Title:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Filtro de Skills:** Node.js, TypeScript, PostgreSQL (exigir os três)
>
> **Boolean do campo de keywords:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Filtro de Industry:** Computer Software, Internet, Financial Services (ligue conforme relevante)
>
> **Filtro de Company:** EXCLUIR: agências, consultorias, grande enterprise (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini) se você só quer experiência em product company
>
> **Years of Experience:** 6+ (não faça gatekeeping em 10; qualidade sênior frequentemente emerge em 6-8 anos)
>
> **Location:** Conforme especificado
>
> **Variantes se muitos resultados:**
> - Adicione filtro de tenure: 1+ ano na empresa atual (filtra job-hoppers + para as pessoas que acabaram de ser contratadas por concorrentes)
> - Aperte o raio de localização
> - Adicione sinal de indústria específica (FinTech / HealthTech / etc.)
>
> **Variantes se poucos resultados:**
> - Largue uma das skills must-have, mantenha como preferida
> - Expanda para Mid-level (frequentemente qualidade sênior)
> - Afrouxe o filtro de empresa
>
> **Falsos positivos para ficar de olho:**
> - "Senior" no título em empresas onde senior significa 2 YOE (consultoria, agências)
> - Backend engineers que só fazem Python ou Java (sua stack é Node) — verifique no detalhe do perfil
> - Qualquer um com anel verde "open to work" E menos de 1 ano na empresa atual — pode ser job-hopper; pode ser forte candidato de layoff. Leia com cuidado.

### LinkedIn Recruiter — padrões boolean comuns

| Caso de uso | Exemplo de string |
|---|---|
| Encontrar pessoas que usam ferramentas específicas | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Encontrar pessoas que PALESTRAM em conferências | `(speaker OR keynote OR "spoke at")` |
| Encontrar contribuidores de OPEN SOURCE | `("open source" OR "OSS" OR github)` |
| Encontrar pessoas de uma família específica de empresa | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Excluir recrutadores e trainers | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Parte 3 — Busca pública do LinkedIn

Para quando você está fora do Recruiter ou suplementando.

### O formato

O campo de keywords do LinkedIn aceita boolean mas é mais restrito. Sem parênteses aninhados além de dois níveis. Frases entre aspas funcionam.

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

Combinado com os filtros de localização e empresa atual na UI, isto chega surpreendentemente longe.

### Buscas X-ray Google (quando a busca do LinkedIn está bloqueada)

O X-ray do Google te dá resultados que o LinkedIn pode esconder de usuários deslogados.

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Variantes:

- Adicione `-intitle:"profiles"` para pular páginas de diretório do LinkedIn
- Adicione `"open to work"` para encontrar pessoas que sinalizaram abertura
- Adicione `"intern"` para NÃO excluir — o negativo `-intern` filtra perfis junior

---

## Parte 4 — Sourcing no GitHub

GitHub é onde engenheiros sêniores de fato vivem. O sinal está no código, não na bio.

### Padrões de busca

**Por linguagem + localização:**
```
location:Toronto language:typescript followers:>50
```

**Por contribuição de open-source para um repo específico:**
- Vá ao repo
- Clique em "Insights" → "Contributors"
- Ordene por commits no último ano
- Cross-referencie perfis dos top contributors em busca de sinais de contratação

**Por atividade recente:**
```
location:"San Francisco" language:rust followers:>100
```
Depois filtre por "Most followed" ou olhe o gráfico de contribuições para atividade recente.

**Encontrar pessoas que escreveram tutoriais ou longform:**
- Busque no Twitter/X por repos do GitHub: `from:@person github.com/`
- Ou use Google: `site:github.com "tutorial" "production" "we built"`

### O que procurar num perfil do GitHub

- Pinned repos com READMEs que LEEM bem — sinal de engenheiro com skill de comunicação
- Atividade recente (contribuições nos últimos 3 meses)
- Uma mistura de projetos próprios + contribuições OSS para projetos conhecidos
- Followers > 50 é um sinal suave de presença na comunidade
- Bio que nomeia uma empresa atual (economiza um cross-reference)

### O que NÃO é sinal

- Contagem alta de repos sozinha — a maioria é fork
- Badges "AWS Certified" na bio — sinais de papel
- Stars nos projetos sem commits em 2 anos

---

## Parte 5 — O playbook de sourcing

Onde encontrar quais senioridades para quais famílias de cargo. A resposta honesta é sempre "depende", mas o playbook estreita.

### Engenharia

| Senioridade | Fonte primária | Fonte secundária | O que funciona |
|---|---|---|---|
| Junior | LinkedIn (recém-formados + bootcamp) | Redes de alumni de bootcamp (Bloc, App Academy, Lambda, etc.) | Outreach direto, mas espere taxas de resposta menores |
| Mid | LinkedIn Recruiter | GitHub (contributors ativos) | Referencie projetos específicos no outreach |
| Senior | GitHub > LinkedIn | Speakers de conferência, contributors OSS | Outreach em tom de par, especificidade técnica obrigatória |
| Staff/Principal | Indicações + GitHub + Twitter/X | LinkedIn raramente funciona — ignoram InMails | Contrate alguém que eles respeitam; a apresentação calorosa é 10x o InMail |

Para engenheiros senior+: pare de fazer sourcing no LinkedIn primeiro. Comece pelo conteúdo PRÓPRIO deles — posts de blog, contribuições OSS, talks em conferência. O LinkedIn deles é o último lugar que atualizam.

### Design (Produto / Marca)

| Senioridade | Fonte primária | Fonte secundária | O que funciona |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Alumni de bootcamp | Especificidade de portfólio |
| Mid | Dribbble + Figma Community + LinkedIn | Comunidade de design do Twitter | Elogie trabalho específico |
| Senior | Sites pessoais + Dribbble + Twitter | LinkedIn (baixa prioridade) | Referencie o trabalho real, não a vaga |
| Director | Indicações + Twitter | LinkedIn | Só apresentações calorosas |

Designers mantêm portfólios, não LinkedIn. O portfólio É a fonte.

### Vendas (AE, SDR, CS)

| Senioridade | Fonte primária | Fonte secundária | O que funciona |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Eventos de networking | Transparência de comp, plano de crescimento |
| Mid AE | LinkedIn (altamente ativo aqui) | RepVue (para pesquisa de encaixe de ICP) | Território específico + faixa de comp |
| Senior AE | LinkedIn + indicações | Slacks da indústria (RevGenius, Pavilion) | Dados de attainment de quota + especificidades do produto |
| VP/CRO | Indicações + rede de investidores | Executive search pesado | Apresentação calorosa é obrigatória; cold outreach é 1-2% |

LinkedIn é onde vendas vive. A identidade profissional inteira deles está lá.

### Operações / G&A

| Senioridade | Fonte primária | Fonte secundária | O que funciona |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (para ops) | Grupos da indústria (ex.: People Geeks para RH) | Descrição específica de escopo |
| Senior | LinkedIn + indicações + Pavilion | Comunidades da indústria | Conversa franca sobre estado inicial |
| Director/VP | Indicações + executive search | LinkedIn (baixo ROI) | Apresentações de rede |

Pessoas de ops frequentemente se escondem no LinkedIn porque são constantemente recrutadas. Comunidades têm sinal maior.

### Produto (PM, Liderança de Produto)

| Senioridade | Fonte primária | Fonte secundária | O que funciona |
|---|---|---|---|
| APM/Mid | LinkedIn | Comunidade Mind the Product | Especificidades de produto, plano de crescimento |
| Senior | LinkedIn + Mind the Product + círculo Lenny's Newsletter | Twitter (PMs ativos postam aqui) | Especificidade de domínio |
| Director/VP | Indicações + alumni Reforge | LinkedIn (baixa prioridade) | Apresentações calorosas |

PMs em funções sêniores são frequentemente muito online — Twitter, Substacks, aparições em podcast. Referencie o que compartilharam publicamente.

---

## Parte 6 — Onde encontrar candidatos diversos (sem ficar fazendo dog-whistle)

Esta seção é para os recrutadores tentando ampliar o funil sem performance bullshit.

### O princípio

Pipelines diversos vêm de fazer sourcing em lugares que não são suas fontes padrão. Não vêm de strings de busca que filtram por categorias protegidas (ilegal na maioria das jurisdições, mesmo se a plataforma deixe você tentar).

### Comunidades que ajudam

- **Engenharia:** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Design:** People of Craft (designers POC), Hexagon (mulheres+ em design)
- **Vendas:** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Produto:** Women in Product, redes de Product Manager dentro de comunidades maiores

A maioria tem job boards, workspaces Slack e calendários de evento. Você vai conseguir 10x mais sinal postando uma vaga em uma dessas especificamente do que rodando outra busca no LinkedIn.

### O que NÃO fazer

- Buscar "diversidade" ou "mulheres" no LinkedIn — isto é ilegal em muitos lugares e não funciona nem onde é legal
- Filtrar fotos de candidatos por diversidade visível — ilegal, enviesado, e os dados são pouco confiáveis de qualquer forma
- Usar nomes como proxy para etnia — extremamente enviesado e frequentemente errado
- Boilerplate "somos um local de trabalho inclusivo" no rodapé de uma JD que do contrário está cheia de linguagem "rockstar ninja" — candidatos enxergam isso na hora

### O que funciona

- Faça sourcing nas comunidades listadas acima
- Tenha um local de trabalho de fato inclusivo (licença parental, trabalho flexível, ERGs reais, liderança diversa) e deixe suas JDs refletirem honestamente
- Pague equitativamente (publique faixas salariais; pay-banding por nível de cargo, não por agressividade de negociação)
- Acompanhe diversidade no funil em cada estágio — sourced, screened, entrevistado, oferta, aceito. O drop-off te diz onde você está quebrado.

---

## Parte 7 — Cadência de sourcing + métricas de outreach

### Números realistas

Para uma vaga de engenheiro sênior numa empresa em Série B com marca decente:

- Lista de sourcing de 50 candidatos
- Taxa de resposta de outreach: 15-25% (mensagem de 3 linhas com comp + razão específica)
- Conversão para phone screen: 50% das respostas
- Conversão para primeira entrevista: 50% dos screens
- Oferta: 1-2 dos 50 originais

Se sua taxa de resposta está abaixo de 10%, o problema quase sempre é:
- Outreach genérico (sem razão específica para este candidato)
- Sem faixa de comp declarada
- Subject line ("Oportunidade empolgante em...")
- Outreach fora de marca para a senioridade (outreach em tom de template para um Staff Engineer)

Se sua taxa de resposta está acima de 30%, você pode estar fazendo sourcing muito estreito. Amplie a pool.

### Cadência de outreach

- Dia 1: Primeira mensagem
- Dia 5-7: Um follow-up (ângulo diferente — ex.: primeira mensagem liderou com o espaço do problema; follow-up lidera com o time)
- Dia 14: Follow-up final (curto — "ainda aqui, ainda interessado, sem stress se não é o momento certo")
- Depois pare. Três mensagens, depois deixe a porta aberta.

Depois de três, você é um chato. Recrutadores que vão além de três queimam a marca para todos contratando naquela empresa.

---

## Erros comuns de boolean e sourcing que o kit vai sinalizar

- **ANDs demais.** Cada AND estreita. 5+ cláusulas AND geralmente retornam menos de 50 resultados, a maioria não é o que você quer.
- **Sem cláusulas NOT.** Você vai se afogar em trainers, recrutadores e consultores. Sempre exclua.
- **Buscas só por título.** "Senior Backend Engineer" varia muito entre empresas. Busque por skills + resultados também.
- **Buscar no LinkedIn por engenheiros senior+.** O LinkedIn deles está parado. Faça sourcing no GitHub, rosters de conferência, listas de contributors OSS.
- **Sem qualificador de localização numa vaga remota.** Mesmo "remote-anywhere" geralmente tem restrições de fuso horário. Filtre por fuso, não só por remoto.
- **Fazer sourcing nos mesmos 50 perfis do LinkedIn que todo outro recrutador está fazendo sourcing.** Se sua pool é a primeira página de uma busca genérica no LinkedIn, você está competindo com 10 outros recrutadores. Vá mais fundo.
