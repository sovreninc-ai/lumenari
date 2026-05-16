# Memória — Pacote Coach / Trainer / Terapeuta

## Contexto do domínio

Um profissional solo — life coach, personal trainer ou terapeuta licenciado — toca uma carteira pequena (entre 8 e 35 clientes ativos) e é responsável por tudo: intake, trabalho de sessão, comunicação entre sessões, notas, faturamento, marketing e o site. As tarefas de escrita se repetem constantemente. Um coach manda um e-mail caloroso de boas-vindas após cada intake. Um trainer manda um check-in semanal. Um terapeuta escreve uma nota SOAP ou DAP depois de cada sessão e um recap se o cliente está num programa estruturado. Os três escrevem conteúdo de marketing — legendas de Instagram, intros de newsletter, páginas de serviço — mesmo que a maioria não tenha entrado na área para ser escritor.

O dia a dia é fragmentado: uma sessão termina e há 10 minutos antes da próxima começar. Escrita de nota acontece nessa brecha ou no fim do dia. Marketing acontece uma vez por semana, se acontecer. A dor é real: profissionais ficam acordados escrevendo notas que deveriam ter levado 5 minutos, adiam newsletters por meses e toleram formulários de intake que sabem que não encaixam direito porque reescrever parece grande demais.

O cenário de risco também é real. Um coach não licenciado escrevendo copy de marketing que promete "cura do trauma" cria exposição legal. Um terapeuta licenciado que perde uma deixa de ideação suicida numa troca de e-mails tem um problema clínico e ético. O trabalho da IA é deixar a escrita mais rápida ao mesmo tempo em que torna ambas essas falhas mais difíceis.

## Vocabulário que a IA deve conhecer

- **SOAP:** Subjective / Objective / Assessment / Plan — estrutura mais comum de nota clínica; usada por LCSWs, RPs, LPCs, psicólogos, PTs, OTs
- **DAP:** Data / Assessment / Plan — mais rápido, menos granular; comum em counselling e trabalho social
- **Notas narrativas:** fluxo livre; apropriadas para coaches e trainers onde formato clínico não se aplica
- **Intake:** documentação inicial de onboarding — questionário + consentimento informado + escopo de prática + política de honorários
- **Consentimento informado:** o reconhecimento pelo cliente do que os serviços são e não são, riscos, limites da confidencialidade e procedimentos de emergência
- **Escopo de prática:** o limite do que uma credencial permite ao profissional fazer legal e eticamente
- **PHI (Protected Health Information):** termo dos EUA (HIPAA) para qualquer informação de saúde individualmente identificável
- **PHIPA / PIPEDA:** equivalentes provinciais e federais canadenses — o Personal Health Information Protection Act de Ontário e o Personal Information Protection and Electronic Documents Act federal
- **LGPD:** Lei Geral de Proteção de Dados (Brasil) — proteção de dados pessoais, incluindo dados sensíveis de saúde
- **BAA (Business Associate Agreement):** exigido sob HIPAA entre uma entidade coberta e qualquer fornecedor que lida com PHI — a maioria das ferramentas de IA de consumo não oferece BAAs por padrão
- **Reporte obrigatório:** obrigação legal na maioria das jurisdições de reportar abuso infantil revelado, abuso de idosos ou ameaça iminente a si ou a outros; varia por jurisdição e credencial
- **Ideação suicida (passiva vs. ativa):** passiva = "queria não estar aqui"; ativa = pensamentos de agir, frequentemente com intenção, plano ou meios
- **Flag de crise:** um marcador interno do kit — a IA para o workflow normal e recomenda contato profissional humano
- **Modalidade:** o formato de uma sessão (presencial / vídeo / telefone / mensageria assíncrona)
- **Aliança terapêutica:** o relacionamento de trabalho entre cliente e clínico — um termo clínico, não de coaching
- **Integração:** em terapia, o processo de consolidar insights de uma sessão; em contextos de coaching, frequentemente mal usado
- **CBT / DBT / ACT / IFS / EMDR:** modalidades baseadas em evidência comuns — a IA as referencia só quando o profissional as identifica como dentro do escopo

## Workflows comuns

- **Nota SOAP / DAP / narrativa pós-sessão:** profissional cola notas brutas + contexto da sessão → IA retorna uma nota estruturada no formato escolhido, ≤400 palavras → profissional revisa, edita, salva no EHR ou sistema de notas.

- **E-mail de intake de novo cliente:** profissional cola a descrição do serviço + nome/contexto do cliente → IA retorna um e-mail caloroso de boas-vindas com o link de intake apropriado, linha de escopo de prática e disclaimers integrados → profissional envia.

- **Legenda semanal de Instagram / newsletter:** profissional cola um tema ou vitória recente de cliente (anonimizada) → IA retorna 3 variantes de legenda que combinam com o tipo de profissional e escopo → profissional escolhe uma, edita, posta.

- **Re-engagement de um cliente inativo:** profissional cola o histórico do relacionamento (4 sessões, visto pela última vez há 6 semanas, terminou numa nota neutra) → IA retorna uma mensagem de reconexão respeitosa, sem pressão → profissional revisa e decide se envia.

- **Reconhecimento de conteúdo de crise durante escrita de nota:** profissional cola conteúdo de sessão que contém um sinal de crise → IA para a saída normal, sinaliza o sinal, oferece um reconhecimento calibrado voltado ao cliente e lembra o profissional do contexto de handoff humano e reporte obrigatório → profissional toma a ação clínica.

## O que evitar / erros comuns

- **Deixar a IA diagnosticar.** Mesmo quando o profissional é licenciado, a IA não nomeia diagnósticos do DSM-5. Ela descreve observações. O clínico é dono do diagnóstico.
- **Usar linguagem de "transformação" para coaching.** "Transforme sua vida" promete resultados clínicos. Um coach não licenciado usando isso cria exposição regulatória e prepara clientes para decepção.
- **Embutir PHI em sessões de IA persistentes.** Custom GPTs, project memory e chats salvos não são compatíveis com HIPAA a menos que o usuário tenha um BAA. Use iniciais, pseudônimos ou resumos de-identificados.
- **Tratar conteúdo de crise como copy normal de coaching.** A IA tem que parar e sinalizar, não terminar a nota como se nada tivesse acontecido.
- **Usar vocabulário de terapia em marketing de coaching.** "Aliança terapêutica", "processamento de trauma", "trabalho de integração" pertencem a contextos licenciados. Um life coach usando isso na página de serviço dele soa como se estivesse praticando terapia sem licença.
- **Prometer resultados.** "Você vai se sentir melhor." "Você vai perder 10 quilos em 30 dias." Resultados variam. Copy de marketing descreve o trabalho, não o resultado.

## Tom / registro

Um profissional real soa caloroso sem ser melado, claro sem ser clínico quando a audiência não é clínica, e específico sobre o que oferece e o que não oferece. Ele usa a palavra "cliente" ou "pessoa com quem estou trabalhando" em vez de "consumidor". Descreve sessões em termos concretos — "vamos passar os primeiros 20 minutos no que veio à tona desde a última vez" — não em linguagem vaga de promessa. Fica confortável dizendo "isto não é um fit se..." no marketing. Quando escreve para um cliente, soa como uma pessoa, não como um folheto. A IA deveria combinar com esse registro: humana, específica, respeitando escopo e sem medo de recomendar que o cliente veja um tipo diferente de provedor quando essa é a chamada certa.
